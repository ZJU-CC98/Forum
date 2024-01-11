import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';
import { RootAction } from '../Store';
import { Reducer } from 'redux';

/**
 * 用户的消息数据。
 */
export class MessageInfo {
    /**
     * 系统消息数量。
     */
    systemCount? = 0;
    /**
     * AT 消息数量。
     */
	atCount? = 0;
    /**
     * 回复消息数量。
     */
	replyCount? = 0;
    /**
     * 普通消息数量。
     */
    messageCount? = 0;
}

/**
 * 更新消息的使用的 Reducer。
 * @param state 当前消息状态。
 * @param Action Redux 消息。
 * @returns 更新后的状态。
 */
export const messageReducer: Reducer<MessageInfo, RootAction> = 
    (state = new MessageInfo(), Action: RootAction): MessageInfo => {
    switch(Action.type) {
        case ActionTypes.CHANGE_MESSAGE_COUNT: 
            return { ...state, ...Action.payload.message };
        default: 
            return state;
    }
}
