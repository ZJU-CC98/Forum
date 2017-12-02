// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';

/**
 * 帖子用Store
 */
class ReplyContentState {
    postId;
    likeNumber;
    dislikeNumber;
    likeState;
    awardInfo;
    info;
    awardPage;
}

/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default async function post(state = new ReplyContentState(), action: Redux.Action) {
    switch (action.type) {
        case ActionTypes.ADD_AWARD:
            const award = await Utility.getAwardInfo(state.postId, 1);
            const info = award.map(this.generateAwardInfo.bind(this));
            const awardInfo = await Promise.all(info);
            return {
                ...state, info: awardInfo, awardInfo: award
            };
        default:
            return state;
    }
}