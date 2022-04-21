import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';
import { RootAction } from '../Store';

export class MessageInfo {
    systemCount? = 0;
	atCount? = 0;
	replyCount? = 0;
    messageCount? = 0;
}

export default (state = new MessageInfo(), Action: RootAction): MessageInfo => {
    switch(Action.type) {
        case ActionTypes.CHANGE_MESSAGE_COUNT: 
            return { ...state, ...Action.payload.message };
        default: 
            return state;
    }
}
