import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { RootState } from '../../Store';
import * as Utility from '../../Utility';

/**
 * 获取当前用户收藏的版面信息
 * @author AsukaSong
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
}