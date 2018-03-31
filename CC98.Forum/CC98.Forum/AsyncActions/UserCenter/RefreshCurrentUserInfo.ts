import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { RootState } from '../../Store';
import * as Utility from '../../Utility';

/**
 * 刷新当前用户的个人信息
 * @author AsukaSong
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
}
