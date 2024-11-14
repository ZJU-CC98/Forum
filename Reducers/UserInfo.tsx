// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from "../ActionTypes";
import * as Utility from "../Utility";
import * as Appstate from "../States/AppState";
import { RootAction } from "../Store";
import { addUserInfo } from "../IndexedDB/UserStorage";

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
  currentUserInfo: Appstate.UserInfo =
    Utility.getMyInfo() || new Appstate.UserInfo();
  /**
   * 表示当前访问的用户页的页面状态
   */
  currentVisitingUserPage: "exact" | "manage" = "exact";
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
  recentTopics: Appstate.UserRecentTopic[] = [];
  /**
   * 用户最近发过的回复
   */
  recentPosts: Appstate.UserRecentPost[] = [];
  /**
   * 用户的热门回复
   */
  hotPosts: Appstate.UserRecentPost[] = [];
  /**
   * 用户中心是否加载出错
   */
  isError: boolean = false;
  /**
   * 错误信息
   */
  errorMessage: string = "";
  /**
   * 当前用户收藏的版面
   */
  currentUserFavoriteBoards: Appstate.UserFavoritesBoardInfo[] = [];
  /**
   * 分页信息是否全部加载完
   */
  hasTotal: hasTotal = new hasTotal();
  /**
   * 分页信息总数
   */
  totalPage = new TotalPage();
  /**
   * 当前用户粉丝的用户信息数组
   */
  currentUserFansInfo: Appstate.UserInfo[] = [];
  /**
   * 当前用户关注的用户信息数组
   */
  currentUserFollowingInfo: Appstate.UserInfo[] = [];
  /**
   * 当前用户收藏的主题信息数组
   */
  currentUserFavoriteTopics: Appstate.UserRecentTopic[] = [];
  /**
   * 当前用户所在的页面
   */
  currentUserCenterPage:
    | "profile"
    | "config"
    | "mytopics"
    | "myposts"
    | "myfavoriteposts"
    | "myfavoriteboards"
    | "myfollowings"
    | "myfans" = "profile";
  /**
   * 转账成功的用户名数组
   */
  transferSuccessUsers: string[] = [];

  /**
   * 是否显示用户信息
   */
  showCardUser: boolean = true;


  constructor() {
    this.totalPage.myfollowings = Math.ceil(
      this.currentUserInfo.followCount / 10
    );
    this.totalPage.myfans = Math.ceil(this.currentUserInfo.fanCount / 10);
  }
}

class hasTotal {
  profile: boolean = false;
  mytopics: boolean = false;
  myposts: boolean = true;
  myfavoriteposts: boolean = false;
  myfollowings: boolean = true;
  myfans: boolean = true;
}

class TotalPage {
  profile: number = 1;
  mytopics: number = 1;
  myposts: number = 1;
  myfavoriteposts: number = 1;
  myfollowings: number;
  myfans: number;
}

/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default (
  state = new UserInfoStore(),
  action: RootAction
): UserInfoStore => {
  switch (action.type) {
    case ActionTypes.USER_LOG_ON:
      return { ...state, isLogOn: true, ...new UserInfoStore() };
    case ActionTypes.USER_LOG_OFF:
      return { ...state, isLogOn: false };
    case ActionTypes.CHANGE_USERINFO:
      Utility.setLocalStorage("userInfo", action.payload.newInfo, 2592000);
      addUserInfo(action.payload.newInfo);
      return { ...state, currentUserInfo: action.payload.newInfo };
    case ActionTypes.CHANGE_VISITING_USER:
      return {
        ...state,
        currentVisitingUserPage: action.payload.page,
        currentVisitingUserId: action.payload.id,
      };
    case ActionTypes.USER_NOT_FOUND:
      return { ...state, currentVisitingUserIsExisted: false };
    case ActionTypes.USER_CENTER_LOADING:
      return { ...state, isLoading: true, isError: false };
    case ActionTypes.USER_CENTER_LOADED:
      return { ...state, isLoading: false };
    case ActionTypes.USER_CENTER_FETCH_ERROR:
      return { ...state, isError: true, errorMessage: action.payload.message };
    case ActionTypes.CHANGE_USER_FAVORITE_BOARDS:
      return { ...state, currentUserFavoriteBoards: action.payload.boardsInfo };
    case ActionTypes.CHANGE_USER_RECENT_TOPICS:
      return { ...state, recentTopics: action.payload.posts };
    case ActionTypes.CHANGE_USER_RECENT_POSTS:
      const newTotalPage = JSON.parse(JSON.stringify(state.totalPage));
      newTotalPage.myposts = action.payload.total;
      return {
        ...state,
        recentPosts: action.payload.posts,
        totalPage: newTotalPage,
      };
    case ActionTypes.CHANGE_USER_HOT_POSTS:
      return { ...state, hotPosts: action.payload.posts };
    case ActionTypes.USER_CENTER_PAGE_LOAD_FINISH:
      switch (state.currentUserCenterPage) {
        case "profile":
        case "myposts":
          return {
            ...state,
            hasTotal: { ...state.hasTotal, profile: true, myposts: true },
            totalPage: {
              ...state.totalPage,
              profile: action.payload.totalPage,
              myposts: action.payload.totalPage,
            },
          };
        default:
          return {
            ...state,
            hasTotal: {
              ...state.hasTotal,
              [state.currentUserCenterPage]: true,
            },
            totalPage: {
              ...state.totalPage,
              [state.currentUserCenterPage]: action.payload.totalPage,
            },
          };
      }
    case ActionTypes.USER_CENTER_PAGE_LOAD_UNFINISH:
      switch (state.currentUserCenterPage) {
        case "profile":
        case "myposts":
          return {
            ...state,
            hasTotal: { ...state.hasTotal, profile: false, myposts: false },
          };
        default:
          return {
            ...state,
            hasTotal: {
              ...state.hasTotal,
              [state.currentUserCenterPage]: false,
            },
          };
      }
    case ActionTypes.CHANGE_USER_FANS_INFO:
      return { ...state, currentUserFansInfo: action.payload.fansInfo };
    case ActionTypes.CHANGE_USER_FOLLOWINGS_INFO:
      return {
        ...state,
        currentUserFollowingInfo: action.payload.followingsInfo,
      };
    case ActionTypes.CHANGE_USER_FAVORITE_POSTS:
      return { ...state, currentUserFavoriteTopics: action.payload.posts };
    case ActionTypes.CHNAGE_USER_CENTER_PAGE:
      return { ...state, currentUserCenterPage: action.payload.page };
    case ActionTypes.USER_CENTER_FOLLOW_USER: {
      let userFollowingInfo = state.currentUserFollowingInfo;
      let currentUserFollowingInfo: Appstate.UserInfo[] = userFollowingInfo.map(
        (item) =>
          item.id === action.payload.userId
            ? { ...item, isFollowing: true }
            : item
      );
      let userFansInfo = state.currentUserFansInfo;
      let currentUserFansInfo: Appstate.UserInfo[] = userFansInfo.map((item) =>
        item.id === action.payload.userId
          ? { ...item, isFollowing: true }
          : item
      );
      return { ...state, currentUserFollowingInfo, currentUserFansInfo };
    }
    case ActionTypes.USER_CENTER_UNFOLLOW_USER: {
      let userFollowingInfo = state.currentUserFollowingInfo;
      let currentUserFollowingInfo: Appstate.UserInfo[] = userFollowingInfo.map(
        (item) =>
          item.id === action.payload.userId
            ? { ...item, isFollowing: false }
            : item
      );
      let userFansInfo = state.currentUserFansInfo;
      let currentUserFansInfo: Appstate.UserInfo[] = userFansInfo.map((item) =>
        item.id === action.payload.userId
          ? { ...item, isFollowing: false }
          : item
      );
      return { ...state, currentUserFollowingInfo, currentUserFansInfo };
    }
    case ActionTypes.USER_CENTER_SOLVE_ERROR:
      return { ...state, errorMessage: "", isError: false };
    case ActionTypes.USER_CENTER_TRANSFER_WEALTH_SUCCESS:
      return { ...state, transferSuccessUsers: action.payload.userNames };
    case ActionTypes.USER_CENTER_FAVORITE_GROUP_CHANGE:
      return {
        ...state,
        hasTotal: { ...state.hasTotal, myfavoriteposts: false },
      };
    case ActionTypes.CHANGE_USER_INFO_VISIBLE:
        return { ...state, showCardUser: action.payload.showCardUser };

    default:
      return state;
  }
};
