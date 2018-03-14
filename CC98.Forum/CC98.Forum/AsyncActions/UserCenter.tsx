import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from '../Store';
import * as Actions from '../Actions/UserCenter';
import { UserInfoStore } from '../Reducers/UserInfo';
import * as Appstate from '../States/AppState';
import { RootState } from '../Store';
import * as Utility from '../Utility';

/**
 * 刷新当前用户的个人信息
 */
export const refreshCurrentUserInfo: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch) => {
    try {
        const headers = await Utility.formAuthorizeHeader();
        const res = await Utility.cc98Fetch(`/me`, {
            headers,
        });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const userInfo: Appstate.UserInfo = await res.json();
        return dispatch(Actions.changeUserInfo(userInfo));
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取当前用户收藏的版面信息
 */
export const getCurrentUserFavoriteBoards: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const currentBoardIds = getState().userInfo.currentUserInfo.customBoards;
        const prevBoardIds = getState().userInfo.currentUserFavoriteBoards.map((item) => item.id);
        // 如果用户信息中的版面IDs和store中的信息不匹配则需要重新加载
        const shouldLoading = currentBoardIds.length !== prevBoardIds.length
            || prevBoardIds.some((item, index) => item !== currentBoardIds[index]);
        if (!shouldLoading) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 批量查询
        const query = getState().userInfo.currentUserInfo.customBoards.join('&id=');
        const url = `/board/?id=${query}`;
        const headers = await Utility.formAuthorizeHeader();
        const res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const boardsInfo: Appstate.UserFavoritesBoardInfo[] = await res.json();
        // 更新store中的状态，加载完毕
        dispatch(Actions.changeUserFavoriteBoards(boardsInfo));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户最近发过的主题
 * @param page 当前页数
 */
export const getRecentPosts: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const recentPosts = getState().userInfo.recentPosts;
        const hasTotal = getState().userInfo.hasTotal.myposts;
        // 如果未请求完所有帖子并且帖子总数小于请求的页数
        // 换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = recentPosts.length < (page - 1) * 10 + 1 && !hasTotal;
        // 当用户向前翻页，且翻页后的部分中存在undefined时
        // 仅当用户通过url定位页数后向前翻页才会出现的情况
        for (let j = (page - 1) * 10; j < Math.min(recentPosts.length, page * 10); j++) {
            if (!recentPosts[j]) {
                shouldLoad = true;
                break;
            }
        }
        if (!shouldLoad) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 请求11条信息
        const url = `/me/recent-topic?from=${(page - 1) * 10}&size=11`;
        const headers = await Utility.formAuthorizeHeader();
        const res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const posts: Appstate.UserRecentPost[] = await res.json();
        let i = posts.length === 11 ? 10 : posts.length;
        // 如果小于11条则总数加载完毕
        if (posts.length !== 11) {
            dispatch(Actions.usercenterPageLoadFinish(page));
        }
        // 显示其中10条
        while (i--) {
            // Store中记录所有的主题
            posts[i].boardName = await Utility.getBoardName(posts[i].boardId);
            recentPosts[(page - 1) * 10 + i] = posts[i];
        }
        dispatch(Actions.changeUserRecentPosts(recentPosts));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户收藏的主题
 * @param page 当前页数
 */
export const getFavoritePosts: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const recentPosts = getState().userInfo.currentUserFavoritePosts;
        const hasTotal = getState().userInfo.hasTotal.myfavoriteposts;
        // 如果未请求完所有帖子并且帖子总数小于请求的页数
        // 换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = recentPosts.length < (page - 1) * 10 + 1 && !hasTotal;
        // 当用户向前翻页，且翻页后的部分中存在undefined时
        // 仅当用户通过url定位页数后向前翻页才会出现的情况
        for (let i = (page - 1) * 10; i < Math.min(recentPosts.length, page * 10); i++) {
            if (!recentPosts[i]) {
                shouldLoad = true;
                break;
            }
        }
        if (!shouldLoad) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 请求11条信息
        const url = `/topic/me/favorite?from=${(page - 1) * 10}&size=11`;
        const headers = await Utility.formAuthorizeHeader();
        const res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const posts: Appstate.UserRecentPost[] = await res.json();
        let i = posts.length === 11 ? 10 : posts.length;
        // 如果小于11条则总数加载完毕
        if (posts.length !== 11) {
            dispatch(Actions.usercenterPageLoadFinish(page));
        }
        // 显示其中10条
        while (i--) {
            // Store中记录所有的主题
            recentPosts[(page - 1) * 10 + i] = posts[i];
        }
        dispatch(Actions.changeUserFavoritePosts(recentPosts));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户的粉丝信息
 * @param page 当前页数
 */
export const getUserFansInfo: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const store = getState().userInfo;
        // 没有粉丝
        if (store.currentUserInfo.fanCount === 0) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 如果未请求完所有帖子并且帖子总数小于请求的页数
        // 换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = store.currentUserFansInfo.length < (page - 1) * 10 + 1;
        // 当用户向前翻页，且之前的页数中存在未加载过的项
        if (!shouldLoad) {// 需要加载就不用判断了，节省资源
            for (let i = (page - 1) * 10; i <  Math.min(page * 10, store.currentUserFansInfo.length); i++) {
                if (!store.currentUserFansInfo[i]) {
                    shouldLoad = true;
                    break;
                }
            }
        }
        if (!shouldLoad) {
            return dispatch(Actions.userCenterLoaded());
        }
        let url = `/me/follower?from=${(page - 1) * 10}&size=10`;
        const headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const data: number[] = await res.json();
        // 当请求到空数组时，必然是因为用户通过url访问到了越界的长度
        if (data.length === 0) {
            dispatch(Actions.changeUserFansInfo([]));
            dispatch(Actions.usercenterPageLoadFinish(0));
            return dispatch(Actions.userCenterLoaded());
        }
        const query = data.join('&id=');
        url = `/user?id=${query}`;
        res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const fanData: Appstate.UserInfo[] = await res.json();
        const prevFans = store.currentUserFansInfo;
        fanData.forEach((item, index) => prevFans[index + (page - 1) * 10] = item);
        dispatch(Actions.changeUserFansInfo(prevFans));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户的关注信息
 * @param page 当前页数
 */
export const getUserFollowingsInfo: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const store = getState().userInfo;
        // 没有关注
        if (store.currentUserInfo.followCount === 0) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 如果未请求完所有帖子并且帖子总数小于请求的页数
        // 换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = store.currentUserFollowingInfo.length < (page - 1) * 10 + 1;
        // 当用户向前翻页，且之前的页数中存在未加载过的项
        if (!shouldLoad) {// 需要加载就不用判断了，节省资源
            for (let i = (page - 1) * 10; i <  Math.min(page * 10, store.currentUserFollowingInfo.length); i++) {
                if (!store.currentUserFollowingInfo[i]) {
                    shouldLoad = true;
                    break;
                }
            }
        }
        if (!shouldLoad) {
            return dispatch(Actions.userCenterLoaded());
        }
        let url = `/me/followee?from=${(page - 1) * 10}&size=10`;
        const headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const data: number[] = await res.json();
        // 当请求到空数组时，必然是因为用户通过url访问到了越界的长度
        if (data.length === 0) {
            dispatch(Actions.changeUserFollowingsInfo([]));
            dispatch(Actions.usercenterPageLoadFinish(0));
            return dispatch(Actions.userCenterLoaded());
        }
        const query = data.join('&id=');
        url = `/user?id=${query}`;
        res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const followData: Appstate.UserInfo[] = await res.json();
        const prevFollow = store.currentUserFollowingInfo;
        followData.forEach((item, index) => prevFollow[index + (page - 1) * 10] = item);
        dispatch(Actions.changeUserFollowingsInfo(prevFollow));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 给指定用户转账
 * @param userNames 要转账的用户名数组
 * @param wealth 转账数目
 * @param reason 理由
 */
export const sendWealthTo: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (userNames: string[], wealth: number, reason: string) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        // 清理上次转账可能遗留的信息
        dispatch(Actions.userCenterTransferWealthSuccess([]));
        const headers = await Utility.formAuthorizeHeader();
        headers.append('Content-Type', 'application/json');
        const url = '/me/transfer-wealth';
        const body: Appstate.TransferWealthInfo = {
            userNames,
            wealth,
            reason,
        };
        const res = await Utility.cc98Fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        // 服务器返回转账成功的用户名数组
        const successNames: string[] = await res.json();
        // 更新store中的信息，减掉相应的财富值
        const userInfo = getState().userInfo.currentUserInfo;
        userInfo.wealth -= successNames.length * wealth;
        dispatch(Actions.changeUserInfo(userInfo));
        dispatch(Actions.userCenterTransferWealthSuccess(successNames));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        dispatch(Actions.userCenterLoaded());
        return dispatch(Actions.userCenterError(e.message));
    }
};
