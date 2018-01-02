import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';
/**
 * 帖子store
 */
export class TopicState {
    postTopic: PostTopicState;
    post: PostState;
    user: UserState;
    award: AwardState;
}
/**
 * 奖赏store
 */
class AwardState {
    AwardInfo;
    updateTime:string;
}
/**
 * 作者信息store
 */
class UserState {
    userName:string;
    userId: number;
    portraitUrl: string;
    isAnonymous: boolean;
    privilege: string;
}
/**
 * 主题信息store
 */
class PostTopicState {
    topicId: number;
    boardId: number;
    title: string;
    time: string;
    authorName: string;
    authorId: number;
    isAnonymous: boolean;
    lastPostTime: string;
    lastPostUser: string;
    lastPostContent: string;
    state: number;
    type: number;
    replyCount: number;
    totalVoteUserCount: number;
    topState: number;
    bestState: number;
    isVote: boolean;
    isPosterOnly: boolean;
    likeCount: number;
    dislikeCount: number;
    highLightInfo: { color:string, isBold:boolean, isItalic:boolean };
}
/**
 * 帖子信息store
 */
class PostState {
    id: number;
    boardId: number;
    userName: string;
    userId: number;
    title: string;
    content: string;
    time: string;
    length: number;
    ip: string;
    topicId: number;
    awardInfo;
    isAnonymous: boolean;
    isDeleted: boolean;
    likeCount: number;
    dislikeCount: number;
    isLZ: boolean;
    floor: number;
}
/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default async function post(state:TopicState = new TopicState(), action: Redux.Action) {
    switch (action.type) {
        case ActionTypes.ADD_AWARD:
            return {
                post: state.post, postTopic: state.postTopic, user: state.user, award: { updateTime: Date.now() }
            };
        default:
            return state;
    }
}