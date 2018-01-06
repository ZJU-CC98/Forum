import * as Utility from '../Utility';
import * as Actions from '../Actions/UserCenter';
import * as Appstate from '../States/AppState';
import { UserInfoStore } from '../Reducers/UserInfo';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../Store';

/**
 * 刷新当前用户的个人信息
 */
export const refreshCurrentUserInfo:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch:Dispatch<RootState>) => {
    try {
        let headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(`/me`, {
            headers
        });
        if(res.status !== 200) throw new Error(res.statusText);
        let userInfo: Appstate.UserInfo = await res.json();
        return dispatch(Actions.changeUserInfo(userInfo));
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取当前用户收藏的版面信息
 */
export const getCurrentUserFavoriteBoards:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch, getState) => {
    try{
        dispatch(Actions.userCenterLoading());
        const currentBoardIds = getState().userInfo.currentUserInfo.customBoards;
        const prevBoardIds = getState().userInfo.currentUserFavoriteBoards.map(item => item.id);
        //如果用户信息中的版面IDs和store中的信息不匹配则需要重新加载
        const shouldLoading = currentBoardIds.length !== prevBoardIds.length || prevBoardIds.some((item, index) => item !== currentBoardIds[index]);
        if(!shouldLoading){
            return dispatch(Actions.userCenterLoaded());;
        }
        //批量查询
        const query = getState().userInfo.currentUserInfo.customBoards.join('&id=');
        const url = `/board/?id=${query}`;
        let headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let boardsInfo : Appstate.UserFavoritesBoardInfo[] = await res.json();
        //更新store中的状态，加载完毕
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
export const getRecentPosts:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        //请求11条信息
        const url = `/me/recent-topic?from=${(page - 1) * 10}&size=11`;
        let headers = await Utility.formAuthorizeHeader(),
            res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let posts: Appstate.UserRecentPost[] = await res.json(),
            prevPosts = getState().userInfo.recentPosts,
            i = posts.length === 11 ? 10 : posts.length;
        //如果小于11条则总数加载完毕
        if(posts.length !== 11) {
            dispatch(Actions.usercenterPageLoadFinish(page));
        }
        //显示其中10条
        while(i--){
            posts[i].board = await Utility.getBoardName(posts[i].boardId);
            //store中记录所有的主题
            prevPosts[(page - 1) * 10 + i] = posts[i];
        }
        dispatch(Actions.changeUserRecentPosts(prevPosts));
        return dispatch(Actions.userCenterLoaded());
    } catch(e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户收藏的主题
 * @param page 当前页数
 */
export const getFavoritePosts:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        //请求11条信息
        const url = `/topic/me/favorite?from=${(page - 1) * 10}&size=11`;
        let headers = await Utility.formAuthorizeHeader(),
            res = await Utility.cc98Fetch(url, { headers });
            if(res.status !== 200) throw new Error(res.statusText);
        let posts: Appstate.UserRecentPost[] = await res.json(),
            store: UserInfoStore = getState().userInfo,
            prevPosts = store.currentUserFavoritePosts,
            i = posts.length === 11 ? 10 : posts.length;
        //如果小于11条则总数加载完毕
        if(posts.length !== 11) {
            dispatch(Actions.usercenterPageLoadFinish(page));
        }
        //显示其中10条
        while(i--){
            posts[i].board = await Utility.getBoardName(posts[i].boardId);
            //store中记录所有的主题
            prevPosts[(page - 1) * 10 + i] = posts[i];
        }
        dispatch(Actions.changeUserFavoritePosts(prevPosts));
        return dispatch(Actions.userCenterLoaded());
    } catch(e) {
        return dispatch(Actions.userCenterError(e.message));
    }
};

/**
 * 获取用户的粉丝信息
 * @param page 当前页数
 */
export const getUserFansInfo:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const store = getState().userInfo;
        if(!store.hasTotal.myfans) {
            let fanCount: number = store.currentUserInfo.fanCount;
            dispatch(Actions.usercenterPageLoadFinish(fanCount % 10 === 0 ? fanCount / 10 : Math.floor((fanCount / 10)) + 1));
            //没有粉丝
            if(fanCount === 0) {
                dispatch(Actions.changeUserFansInfo([]));
                return dispatch(Actions.userCenterLoaded());
            }
        }
        let url = `/me/follower?from=${(page - 1) * 10}&size=10`;
        const headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let data: number[] = await res.json();
        //当请求到空数组时，必然是因为用户通过url访问到了越界的长度
        if (data.length === 0) {
            dispatch(Actions.changeUserFansInfo([]));
            dispatch(Actions.usercenterPageLoadFinish(0));
            return dispatch(Actions.userCenterLoaded());
        }
        const query = data.join('&id=');
        url = `/user?id=${query}`;
        res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let fanData: Appstate.UserInfo[] = await res.json();
        let prevFans = store.currentUserFansInfo;
        fanData.forEach((item, index) => prevFans[index + (page - 1) * 10] = item);
        dispatch(Actions.changeUserFansInfo(prevFans));
        return dispatch(Actions.userCenterLoaded());
    } catch(e) {
        return dispatch(Actions.userCenterError(e.message))
    }
}

/**
 * 获取用户的关注信息
 * @param page 当前页数
 */
export const getUserFollowingsInfo:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const store = getState().userInfo;
        if(!store.hasTotal.myfollowings) {
            let followCount: number = store.currentUserInfo.followCount;
            dispatch(Actions.usercenterPageLoadFinish(followCount % 10 === 0 ? followCount / 10 : Math.floor((followCount / 10)) + 1));
            //没有粉丝
            if(followCount === 0) {
                dispatch(Actions.changeUserFollowingsInfo([]));
                return dispatch(Actions.userCenterLoaded());
            }
        }
        let url = `/me/followee?from=${(page - 1) * 10}&size=10`;
        const headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let data: number[] = await res.json();
        //当请求到空数组时，必然是因为用户通过url访问到了越界的长度
        if (data.length === 0) {
            dispatch(Actions.changeUserFollowingsInfo([]));
            dispatch(Actions.usercenterPageLoadFinish(0));
            return dispatch(Actions.userCenterLoaded());
        }
        const query = data.join('&id=');
        url = `/user?id=${query}`;
        res = await Utility.cc98Fetch(url, { headers });
        if(res.status !== 200) throw new Error(res.statusText);
        let followData: Appstate.UserInfo[] = await res.json();
        let prevFollow = store.currentUserFollowingInfo;
        followData.forEach((item, index) => prevFollow[index + (page - 1) * 10] = item);
        dispatch(Actions.changeUserFollowingsInfo(prevFollow));
        return dispatch(Actions.userCenterLoaded());
    } catch(e) {
        return dispatch(Actions.userCenterError(e.message))
    }
}

/**
 * 给指定用户转账
 * @param userNames 要转账的用户名数组
 * @param wealth 转账数目
 * @param reason 理由
 */
export const sendWealthTo:ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (userNames: string[], wealth: number, reason: string) => async (dispatch, getState) => {
    try{
        dispatch(Actions.userCenterLoading());
        //清理上次转账可能遗留的信息
        dispatch(Actions.userCenterTransferWealthSuccess([]));
        let headers = await Utility.formAuthorizeHeader();
        headers.append('Content-Type', 'application/json');
        const url = '/me/transfer-wealth';
        let body: Appstate.TransferWealthInfo = {
            userNames,
            wealth,
            reason
        };
        let res = await Utility.cc98Fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        if(!res.ok){
            throw new Error(res.statusText);
        }
        //服务器返回转账成功的用户名数组
        let successNames: string[] = await res.json();
        //更新store中的信息，减掉相应的财富值
        let userInfo = getState().userInfo.currentUserInfo;
        userInfo.wealth -= successNames.length * wealth;
        dispatch(Actions.changeUserInfo(userInfo));
        dispatch(Actions.userCenterTransferWealthSuccess(successNames));
        return dispatch(Actions.userCenterLoaded());
    } catch(e) {
        dispatch(Actions.userCenterLoaded());
        return dispatch(Actions.userCenterError(e.message));
    }
};
