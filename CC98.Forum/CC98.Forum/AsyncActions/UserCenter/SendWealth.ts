import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { RootState } from '../../Store';
import * as Utility from '../../Utility';

/**
 * 给指定用户转账
 * @param userNames 要转账的用户名数组
 * @param wealth 转账数目
 * @param reason 理由
 * @author AsukaSong
 */
export const sendWealth: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (userNames: string[], wealth: number, reason: string) => async (dispatch, getState) => {
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
}
