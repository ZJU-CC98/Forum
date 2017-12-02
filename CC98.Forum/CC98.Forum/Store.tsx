// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore } from 'redux';
import reducer from './Reducer'
import * as Utility from './Utility';
import * as Appstate from './States/AppState';
/**
 * 这些趁早移到/States里
 */
export class ReplyContentState {
    postId; likeNumber; dislikeNumber; likeState; awardInfo; info; awardPage;
}

/**
 * 应用的store
 */
export class Store {
    /**
    * 表示是否有错误
    */
    isError: boolean = false;
    /**
    * 表示错误信息
    */
    errorMessage: string = '';
    /**
    * 表示用户是否登录
    */
    isLogOn:boolean = Utility.isLogOn();
    /**
    * 表示当前登录用户的用户信息
    */
    currentUserInfo: Appstate.UserInfo = Utility.getLocalStorage('userInfo') || new Appstate.UserInfo();
    /**
    * 帖子数据包括帖子本身的数据以及所属版面的数据
    */
    post: ReplyContentState = new ReplyContentState();

};

const store = createStore(reducer,new Store());

export default store;