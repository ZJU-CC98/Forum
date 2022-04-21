import * as ActionTypes from '../ActionTypes';
import { createAction } from './ActionCreator';
import { MessageInfo } from '../Reducers/Message';

export const changeMessageCount = createAction(ActionTypes.CHANGE_MESSAGE_COUNT, (message: MessageInfo) => ({
    type: ActionTypes.CHANGE_MESSAGE_COUNT, 
    payload: {
        message
    }
}));
