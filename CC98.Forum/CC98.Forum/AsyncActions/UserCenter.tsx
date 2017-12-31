import * as Utility from '../Utility';
import * as Actions from '../Actions';
import * as Appstate from '../States/AppState';
import { UserInfoStore } from '../Reducers/UserInfo';

export function refreshCurrentUserInfo() {
    return async dispatch => {
        try {
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(`/me`, {
                headers
            });
            let userInfo: Appstate.UserInfo = await res.json();
            dispatch(Actions.changeUserInfo(userInfo));
        } catch (e) {
            dispatch(Actions.userCenterError(e.message));
        }
    };
}

export function getCurrentUserFavoriteBoards() {
    return async (dispatch, getState) => {
        try{
            dispatch(Actions.userCenterLoading());
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(`/me`, {
                headers
            });
            let userInfo: Appstate.UserInfo = await res.json();
            dispatch(Actions.changeUserInfo(userInfo));
            if(userInfo.customBoards.length === 0){
                dispatch(Actions.changeUserFavoriteBoards([]));
                dispatch(Actions.userCenterLoaded());
                return ;
            }
            let store: UserInfoStore = getState().userInfo;
            const shouldLoading = userInfo.customBoards !== store.currentUserFavoriteBoards.map(item => item.id);
            if(!shouldLoading){
                dispatch(Actions.userCenterLoaded());
                return ;
            }
            const query = userInfo.customBoards.join('&id=');
            const url = `/board/?id=${query}`;
            res = await Utility.cc98Fetch(url, { headers });
            let boardsInfo : Appstate.UserFavoritesBoardInfo[] = await res.json();
            dispatch(Actions.changeUserFavoriteBoards(boardsInfo));
            dispatch(Actions.userCenterLoaded());
        } catch (e) {
            dispatch(Actions.userCenterError(e.message));
        }
    };
}

export function getRecentPosts(page: number) {
    return async (dispatch, getState) => {
        try {
            dispatch(Actions.userCenterLoading());
            const url = `/me/recent-topic?from=${(page - 1) * 10}&size=11`;
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(url, { headers });
            let posts: Appstate.UserRecentPost[] = await res.json();
            let store: UserInfoStore = getState().userInfo;
            let prevPosts = store.recentPosts;
            let i = posts.length === 11 ? 10 : posts.length;
            if(posts.length !== 11) {
                dispatch(Actions.usercenterPageLoadFinish(page));
            }
            while(i--){
                posts[i].board = await Utility.getBoardName(posts[i].boardId);
                prevPosts[(page - 1) * 10 + i] = posts[i];
            }
            dispatch(Actions.changeUserRecentPosts(prevPosts));
            dispatch(Actions.userCenterLoaded());
        } catch(e) {
            dispatch(Actions.userCenterError(e.message));
        }
    };
}