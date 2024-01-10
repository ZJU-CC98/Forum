import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as Actions from '../Actions/Message';
import { RootState, RootAction } from '../Store';
import * as Utility from '../Utility';
import { MessageInfo } from '../Reducers/Message';

export const refreshCurrentMessageCount: ActionCreator<ThunkAction<Promise<Action>, RootState, void, RootAction>> = (message: MessageInfo) => async (dispatch, getState) => {
    try {
        let headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch('/me/unread-count', {
            headers
        });
        let data = await res.json() as MessageInfo;
        Utility.setLocalStorage('messageCount', data);
        return dispatch(Actions.changeMessageCount(data));
    } catch(e) {
        console.error(e.message)
    }
}