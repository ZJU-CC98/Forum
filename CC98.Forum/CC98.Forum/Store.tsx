// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore } from 'redux';
import reducer from './Reducer'
import * as Utility from './Utility';
import * as Appstate from './States/AppState';

/**
 * 应用的store
 */
class Store {
    /**
    * 表示用户是否登录
    */
    isLogOn:boolean = Utility.isLogOn();
    /**
    * 表示当前登录用户的用户信息
    */
    currentUserInfo: Appstate.UserInfo = Utility.getLocalStorage('userInfo') || new Appstate.UserInfo();
    /**
    * 表示当前登录用户发过的主题帖
    */
    currentUserPosts: Appstate.UserRecentPost[] = [];
    /**
    * 表示当前登录用户的粉丝
    */
    currentUserFans: Appstate.UserFanInfo[] = [];
    /**
    * 表示当前登录用户的关注
    */
    currentUserFollowers: Appstate.UserFanInfo[] = [];
};

const store = createStore(reducer,new Store());

export default store;