// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from '../ActionTypes';
import * as Utility from '../Utility';
import * as Appstate from '../States/AppState';
import { RootAction } from '../Store'

/**
 * 用户中心用Store
 */
export class UserInfoStore {
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
    /**
     * 用户中心是否加载出错
     */
    isError: boolean = false;
    /**
     * 错误信息
     */
    errorMessage: string = '';
    /**
     * 当前用户收藏的版面
     */
    currentUserFavoriteBoards: Appstate.UserFavoritesBoardInfo[] = Utility.getLocalStorage('currentUserFavoriteBoards') || [];
    /** 
     * 分页信息是否全部加载完
     */
    hasTotal: boolean = false;
    /**
     * 分页信息总数
     */
    totalPage: number = 1;
}

/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default (state = new UserInfoStore(), action: RootAction): UserInfoStore => {
    switch (action.type) {
        case ActionTypes.USER_LOG_ON:
            return { ...state, isLogOn: true, ...new UserInfoStore()};
        case ActionTypes.USER_LOG_OFF:
            Utility.removeLocalStorage('userInfo');
            Utility.removeLocalStorage('currentUserFavoriteBoards');
            return { ...state, isLogOn: false };
        case ActionTypes.CHANGE_USERINFO:
            Utility.setLocalStorage("userInfo", action.newInfo);
            return { ...state, currentUserInfo: action.newInfo };
        case ActionTypes.CHANGE_VISITING_USER:
            return { ...state, currentVisitingUserPage: action.page, currentVisitingUserId: action.id };
        case ActionTypes.USER_NOT_FOUND:
            return { ...state, currentVisitingUserIsExisted: false };
        case ActionTypes.USER_CENTER_LOADING: 
            return { ...state, isLoading: true, isError: false };
        case ActionTypes.USER_CENTER_LOADED: 
            return { ...state, isLoading: false };
        case ActionTypes.USER_CENTER_FETCH_ERROR: 
            return { ...state, isError: true, errorMessage: action.message };
        case ActionTypes.CHANGE_USER_FAVORITE_BOARDS: 
            Utility.setLocalStorage("currentUserFavoriteBoards", action.boardsInfo);
            return { ...state, currentUserFavoriteBoards: action.boardsInfo };
        case ActionTypes.CHANGE_USER_RECENT_POSTS: 
            return { ...state, recentPosts: action.posts };
        case ActionTypes.USER_CENTER_PAGE_LOAD_UNFINISH: 
            return { ...state, hasTotal: false };
        case ActionTypes.USER_CENTER_PAGE_LOAD_FINISH: 
            return { ...state, hasTotal: true, totalPage: action.totalPage };
        default:
            return state;
    }
}