/**
 * 锁定理由预置（两层：通用预置 + 版面特殊预置）。
 *
 * 预置内容全部来自服务端，本文件不写死任何理由，只做拉取、缓存、同步读取与文本判定：
 * - 通用预置：/config/global 的 commonOperationReasons（全站一份）
 * - 版面预置：/board/{boardId} 的 commonOperationReasons（仅该版面）
 * 缓存放模块内存（每个页面会话一份）：通用层与每个版面各只成功拉一次，
 * 拉取失败不置「已拉取」，下次打开仍会重试；服务端未配置或拉取失败时两层都为空，
 * 管理弹窗退化为纯手写理由（不弹提示，避免每次开弹窗都打扰版主）。
 *
 * 数据结构：每条预置 = { label 简称, content 完整理由 }（由 API 的 name/description 映射）。
 * 候选列表展示简称，点选后把 content 整体填入理由输入框。
 *
 * 文本约定：
 * - 每条 content 不超过 50 个字符（与理由长度上限一致）
 * - 「【】」为待填写标记（如「请到【】版」），管理员需在括号内填入实际内容
 *
 * 与小程序版（cc98-mini-next/src/config/lockReasonPresets.ts + global.lockReasonPresets）保持同步。
 */
import { cc98Fetch, formAuthorizeHeader } from "../Utility/fetchUtility";

/** 单条锁定理由预置：label 供候选列表展示，content 为点选后填入的完整理由 */
export interface LockReasonPresetItem {
    label: string;
    content: string;
}

/** 指定版面的锁定理由预置（本版特殊层 + 通用层） */
export interface LockReasonPresets {
    general: LockReasonPresetItem[];
    board: LockReasonPresetItem[];
}

/** 服务端返回的理由条目（/config/global 与 /board/{id} 的 commonOperationReasons） */
interface ICommonOperationReason {
    name: string;
    description: string;
}

/** 通用层预置（/config/global） */
let generalOptions: LockReasonPresetItem[] = [];
/** 各版面专用预置，key 为 boardId */
const boardOptionsMap: Record<number, LockReasonPresetItem[]> = {};
/** 通用层是否已成功拉取 */
let generalLoaded = false;
/** 通用层是否请求中（防重复请求） */
let generalLoading = false;
/** 已成功拉取的版面 id */
const loadedBoards: number[] = [];
/** 请求中的版面 id（防重复请求） */
const loadingBoards: number[] = [];

/**
 * 服务端的 { name, description } 映射为预置条目 { label, content }；
 * 缺字段或空文本的条目忽略，简称未填时用完整理由兜底（避免候选项出现空条目）
 */
const toPresetItems = (
    reasons?: ICommonOperationReason[] | null
): LockReasonPresetItem[] =>
    (reasons || [])
        .filter(
            (reason) =>
                !!reason &&
                typeof reason.name === "string" &&
                typeof reason.description === "string" &&
                reason.description.length > 0
        )
        .map((reason) => ({
            label: reason.name.length > 0 ? reason.name : reason.description,
            content: reason.description,
        }));

/**
 * 拉取一个地址上的 commonOperationReasons
 * @returns 成功时返回映射后的条目（可能为空数组）；请求失败返回 null（调用方据此决定是否重试）
 */
async function fetchCommonOperationReasons(
    url: string
): Promise<LockReasonPresetItem[] | null> {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(url, { headers });
        if (response.status !== 200) {
            console.error("获取预置理由失败", url, response.status);
            return null;
        }
        const data = await response.json();
        return toPresetItems(data && data.commonOperationReasons);
    } catch (err) {
        console.error("获取预置理由失败", url, err);
        return null;
    }
}

/** 拉取通用预置（/config/global），本次会话成功后不再请求 */
async function loadGeneralOptions() {
    if (generalLoaded || generalLoading) return;
    generalLoading = true;
    try {
        const items = await fetchCommonOperationReasons("/config/global");
        if (items) {
            generalOptions = items;
            generalLoaded = true;
        }
    } finally {
        generalLoading = false;
    }
}

/** 拉取指定版面的专用预置（/board/{boardId}），每个版面本次会话只请求一次 */
async function loadBoardOptions(boardId: number) {
    if (!boardId || boardId < 0) return;
    if (
        loadedBoards.indexOf(boardId) !== -1 ||
        loadingBoards.indexOf(boardId) !== -1
    ) {
        return;
    }
    loadingBoards.push(boardId);
    try {
        const items = await fetchCommonOperationReasons(`/board/${boardId}`);
        if (items) {
            boardOptionsMap[boardId] = items;
            loadedBoards.push(boardId);
        }
    } finally {
        const index = loadingBoards.indexOf(boardId);
        if (index !== -1) loadingBoards.splice(index, 1);
    }
}

/**
 * 按需拉取锁定理由预置：通用层 + 当前帖子的版面层（两层并行，已拉取过的不再请求）
 * @param boardId 当前帖子的版面 id
 */
export async function loadLockReasonPresets(boardId: number) {
    await Promise.all([loadGeneralOptions(), loadBoardOptions(boardId)]);
}

/**
 * 获取指定版面的锁定理由预置（同步读取上面的缓存，数据未就绪时为空数组）
 * @param boardId 当前帖子的版面 id
 */
export function getLockReasonPresets(boardId: number): LockReasonPresets {
    return {
        general: generalOptions,
        board: boardOptionsMap[boardId] || [],
    };
}

/**
 * 判定理由中是否残留未填写的「【】」标记：
 * 预置理由里的「【】」是待填写占位（如「请到【】版」），管理员需补全后再提交；
 * 仅空括号「【】」视为未填写，括号内已填内容（如【家教】）视为已填写
 */
export function containsUnfilledPlaceholder(reason: string): boolean {
    return (reason || "").indexOf("【】") !== -1;
}

/**
 * 判定理由是否与某条预置一致：把理由中「【…】」内的内容去掉（保留空括号）后再与预置比对，
 * 使「请到【家教】版」与预置「请到【】版」视为同一条
 */
export function matchesLockReasonPreset(reason: string, boardId: number): boolean {
    const normalized = reason.replace(/【[^】]*】/g, "【】");
    const presets = getLockReasonPresets(boardId);
    return [...presets.general, ...presets.board].some(
        (preset) => preset.content === normalized
    );
}
