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