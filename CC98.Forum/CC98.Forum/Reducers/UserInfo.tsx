// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';
import * as Appstate from '../States/AppState';

/**
 * 用户中心用Store
 */
class UserInfo {
    /**
    * 表示用户是否登录
    */
    isLogOn: boolean = Utility.isLogOn();
    /**
     * 当前组件是否正在加载
     */
    isLoading: boolean = false;
    /**
    * 表示当前登录用户的用户信息
    */
    currentUserInfo: Appstate.UserInfo = Utility.getLocalStorage('userInfo') || new Appstate.UserInfo();
    /**
     * 表示当前访问的用户页的页面状态
     */
    currentVisitingUserPage: 'exact' | 'manage' = 'exact';
    /**
     * 表示当前访问的用户的id
     */
    currentVisitingUserId: number = 0;
    /*
     * 表示当前访问的用户是否存在
     */
    currentVisitingUserIsExisted: boolean = true;
    /**
     * 用户最近发过的主题
     */
    recentPosts: Appstate.UserRecentPost[] = [];
    
}

/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default (state = new UserInfo, action): UserInfo => {
    switch (action.type) {
        case ActionTypes.USER_LOG_ON:
            return { ...state, isLogOn: true };
        case ActionTypes.USER_LOG_OFF:
            return { ...state, isLogOn: false };
        case ActionTypes.CHANGE_USERINFO:
            Utility.setLocalStorage("userInfo", action.newInfo);
            return { ...state, currentUserInfo: action.newInfo };
        case ActionTypes.CHANGE_VISITING_USER:
            return { ...state, currentVisitingUserPage: action.page, currentVisitingUserId: action.id };
        case ActionTypes.USER_NOT_FOUND:
            return { ...state, currentVisitingUserIsExisted: false};
        default:
            return state;
    }
}