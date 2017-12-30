import * as Utility from '../Utility';
import * as Actions from '../Actions';

export function refreshCurrentUserInfo() {
    return async dispatch => {
        let headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(`/me`, {
            headers
        });
        let userInfo = await res.json();
        dispatch(Actions.changeUserInfo(userInfo));
    }
}