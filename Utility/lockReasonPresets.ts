/**
 * 锁定理由预置配置（两层：通用预置 + 版面特殊预置）。
 *
 * 当前为硬编码数据，计划后续改为从 API 获取：届时代码只需替换
 * getLockReasonPresets 的实现，文本结构与消费端（帖子管理弹窗）不变。
 *
 * 数据结构：每条预置 = { label 简称, content 完整理由 }。
 * 候选列表展示简称，点选后把 content 整体填入理由输入框。
 *
 * 文本约定：
 * - 每条 content 不超过 50 个字符（与理由长度上限一致）
 * - 「【】」为待填写标记（如「请到【】版」），管理员需在括号内填入实际内容
 *
 * 理由来源：CC98 帖 6669766 版主预置征集的整理结果 v4（2026-11-03）。
 * 与小程序版（cc98-mini-next/src/config/lockReasonPresets.ts）保持同步。
 */

/** 单条锁定理由预置：label 供候选列表展示，content 为点选后填入的完整理由 */
export interface LockReasonPresetItem {
    label: string;
    content: string;
}

/** 通用预置：任何版面的锁定操作都会展示 */
export const LOCK_REASON_GENERAL_PRESETS: LockReasonPresetItem[] = [
    { label: '中介/站外引流/拉群', content: '本帖含中介/站外引流/拉群信息，按版规锁沉。' },
    { label: '版面不符', content: '本帖内容不属于本版定位，请到【】版按版规重新发布。锁沉不属于处罚。' },
    { label: '格式不符', content: '本帖未按版规要求格式发布，缺【】内容，予以锁沉。' },
    { label: '已编辑', content: '楼主已编辑主帖，主楼无有效内容，本帖锁沉。' },
    { label: '应求沉', content: '应楼主本人要求，本帖锁定并下沉。' },
    { label: '标题已编辑', content: '楼主已编辑标题，本帖锁沉。' },
    { label: '旧贴挖坟', content: '本帖为长期无人回复的旧贴，被回复后顶起，已锁沉。如有问题请另发新帖。' },
    { label: '禁言关联锁沉', content: '发帖人因违反版规而被禁言，关联帖子锁定下沉' },
    { label: '低质重复讨论', content: '过于简单且版内已有大量重复讨论的帖子' },
    { label: '与已有帖重复', content: '本帖与已有相关帖子/专楼内容重复，本帖锁沉。请勿重复发布。' },
    { label: '歪楼锁沉主题', content: '后续严重歪楼，按版规对主题帖进行锁沉，不视为对楼主的处罚' },
];

/** 版面特殊预置：key 为版面 id（boardId），仅对应版面的锁定操作展示 */
export const LOCK_REASON_BOARD_PRESETS: Record<number, LockReasonPresetItem[]> = {
    // 论坛事务版
    17: [
        { label: '论坛事务格式错', content: '请严格按照论坛事务版规要求的格式进行发帖。此贴锁定并下沉，如有需求可按要求重新发帖。' },
        { label: '论坛事务公告', content: '论坛事务公告贴。' },
    ],
    // 日用交易版
    80: [
        { label: '未标明售价', content: '本帖未按照本版发帖要求标明售价，已锁沉。请阅读版规，补充售价后重发。' },
        { label: '交易应发专楼', content: 'XX交易请前往【日用交易】版置顶的“XX专楼”发布，本帖锁沉。' },
        { label: '出售帖需合并', content: '出售物品请尽量合并到一个帖子中，保留最先发布的交易帖，本帖锁沉。' },
    ],
    // 郁闷小屋版
    114: [
        { label: '小屋匿名违规', content: '小屋匿名管理参考心灵之约版规，不允许【】。本帖锁沉，请在合适版面发布实名主题。' },
        { label: '争议话题争吵（性别等）', content: '本帖涉及【】，且后续回复已开始争吵，本帖锁沉。' },
        { label: '无实质内容', content: '本帖无实质讨论内容（纯标题/水贴/一句话），已锁沉。请补充有效信息，或到本版置顶发泄楼发布。' },
        { label: '投票贴未报备', content: '本帖为投票贴，发布前需私信版主投票的主题、目的与时效性，请私信补充，版主回复同意后可解锁或发新帖。' },
    ],
    // 真我风采版
    353: [
        { label: '照片无可辨五官', content: '发布的照片需有可辨的五官信息，内容不符合版规。锁沉不属于处罚。' },
    ],
    // 实习兼职版
    459: [
        { label: '家教时薪过低', content: '低于家教对应年级课程的时薪要求。修改完成后，请在标题也写上时薪和具体年级，重新发帖' },
        { label: '兼职时薪过低', content: '低于对校外组织机构的兼职时薪要求，请与该单位确认。修改完成后，请重新发帖。' },
        { label: '实习缺公司名称', content: '招募实习生需补充明确公司名称等必要信息，且请在标题里注明公司名称。请修改后重新发布帖子。' },
        { label: '兼职缺用人方与薪酬', content: '招募兼职需明确用人方信息（如个人或组织机构），且明确薪酬和薪资计算方式。请修改后重新发布帖子。' },
        { label: '缺年级和时薪', content: '未按本版发帖格式填写必要信息（缺具体年级和时薪）。请读版规和置顶例，在标题和正文均补充后重发。' },
    ],
    // 住房信息版
    515: [
        { label: '出租帖格式错', content: '不符合版规中对出租帖格式的要求，请按版规编辑后再发' },
        { label: '房源帖重复', content: '此房源在有效期内已有重复内容的帖子' },
        { label: '年内发帖超限', content: '自然年内发布超过版规限制数量的帖子' },
    ],
    // 代理专区版
    569: [
        { label: '代理12小时未审核', content: '经提醒后12小时内未在代理审核专楼回帖，予以锁沉。' },
    ],
    // 每日优惠版
    764: [
        { label: '标题未标返利', content: '本帖未在标题标明发帖人有返利，已锁沉。请阅读版规，补充后重发。' },
        { label: '返利次数超限', content: '按版规，超过每月最大发帖人有返利次数，已锁沉。' },
        { label: '拉群未经审核', content: '本帖含未经版主审核的拉群信息，按版规锁沉。与版主审核后可恢复。' },
        { label: '拼单发日用交易', content: '需线下交易拼单请发日用交易。' },
    ],
};

/** 指定版面的锁定理由预置（本版特殊层 + 通用层） */
export interface LockReasonPresets {
    general: LockReasonPresetItem[];
    board: LockReasonPresetItem[];
}

/**
 * 获取指定版面的锁定理由预置
 * @param boardId 当前帖子的版面 id；API 就绪后仅替换本函数实现
 */
export function getLockReasonPresets(boardId: number): LockReasonPresets {
    return {
        general: LOCK_REASON_GENERAL_PRESETS,
        board: LOCK_REASON_BOARD_PRESETS[boardId] ?? [],
    };
}

/**
 * 判定理由是否与某条预置一致：把理由中「【…】」内的内容去掉（保留空括号）后再与预置比对，
 * 使「请到【家教】版」与预置「请到【】版」视为同一条
 */
export function matchesLockReasonPreset(reason: string, boardId: number): boolean {
    const normalized = reason.replace(/【[^】]*】/g, '【】');
    const presets = getLockReasonPresets(boardId);
    return [...presets.general, ...presets.board].some((preset) => preset.content === normalized);
}
