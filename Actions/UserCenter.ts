import * as ActionTypes from '../ActionTypes';
import * as Appstate from '../States/AppState';
import { createAction } from './ActionCreator';

export const userLogIn = createAction(ActionTypes.USER_LOG_ON);

export const userLogOff = createAction(ActionTypes.USER_LOG_OFF);

export const usercenterPageLoadUnfinish = createAction(ActionTypes.USER_CENTER_PAGE_LOAD_UNFINISH);

export const userNotFound = createAction(ActionTypes.USER_NOT_FOUND);

export const userCenterLoading = createAction(ActionTypes.USER_CENTER_LOADING);

export const userCenterLoaded = createAction(ActionTypes.USER_CENTER_LOADED);

export const userCenterSolveError = createAction(ActionTypes.USER_CENTER_SOLVE_ERROR);

export const usercenterPageLoadFinish = createAction(ActionTypes.USER_CENTER_PAGE_LOAD_FINISH, (totalPage: number) => ({
    type: ActionTypes.USER_CENTER_PAGE_LOAD_FINISH,
    payload: { totalPage }
}));

export const changeUserInfo = createAction(ActionTypes.CHANGE_USERINFO, (newInfo: Appstate.UserInfo ) => ({
    type: ActionTypes.CHANGE_USERINFO,
    payload: { newInfo }
}));

export const changeCurrentVisitingUserPage = createAction(ActionTypes.CHANGE_VISITING_USER, (page: 'exact' | 'manage' = 'exact', id: number) => ({
    type: ActionTypes.CHANGE_VISITING_USER,
    payload: {
        page,
        id
    }
}));

export const userCenterError = createAction(ActionTypes.USER_CENTER_FETCH_ERROR, (message: string) => ({
    type: ActionTypes.USER_CENTER_FETCH_ERROR,
    payload: { message }
}));

export const changeUserFavoriteBoards = createAction(ActionTypes.CHANGE_USER_FAVORITE_BOARDS, (boardsInfo: Appstate.UserFavoritesBoardInfo[]) => ({
    type: ActionTypes.CHANGE_USER_FAVORITE_BOARDS,
    payload: { boardsInfo }
}));

export const changeUserRecentTopics = createAction(ActionTypes.CHANGE_USER_RECENT_TOPICS, (posts: Appstate.UserRecentTopic[]) => ({
    type: ActionTypes.CHANGE_USER_RECENT_TOPICS,
    payload: { posts }
}));

interface PostsAndTotal {
    posts: Appstate.UserRecentPost[]
    total: number
}

export const changeUserRecentPosts = createAction(ActionTypes.CHANGE_USER_RECENT_POSTS, (postsAndTotal: PostsAndTotal) => ({
    type: ActionTypes.CHANGE_USER_RECENT_POSTS,
    payload:  postsAndTotal 
}));

export const changeUserHotPosts = createAction(ActionTypes.CHANGE_USER_HOT_POSTS, (postsAndTotal: PostsAndTotal) => ({
    type: ActionTypes.CHANGE_USER_HOT_POSTS,
    payload:  postsAndTotal 
}));

export const changeUserFavoritePosts = createAction(ActionTypes.CHANGE_USER_FAVORITE_POSTS, (posts: Appstate.UserRecentTopic[]) => ({
    type: ActionTypes.CHANGE_USER_FAVORITE_POSTS,
    payload: { posts }
}));

export const changeUserFansInfo = createAction(ActionTypes.CHANGE_USER_FANS_INFO, (fansInfo: Appstate.UserInfo[]) => ({
    type: ActionTypes.CHANGE_USER_FANS_INFO,
    payload: { fansInfo }
}));

export const changeUserFollowingsInfo = createAction(ActionTypes.CHANGE_USER_FOLLOWINGS_INFO, (followingsInfo: Appstate.UserInfo[]) => ({
    type: ActionTypes.CHANGE_USER_FOLLOWINGS_INFO,
    payload: { followingsInfo }
}));

export const changeUserCenterPage = createAction(ActionTypes.CHNAGE_USER_CENTER_PAGE, (page: 'profile' | 'config' | 'mytopics' |'myposts' | 'myfavoriteposts' | 'myfavoriteboards' | 'myfollowings' | 'myfans') => ({
    type: ActionTypes.CHNAGE_USER_CENTER_PAGE,
    payload: { page }
}));

export const followUser = createAction(ActionTypes.USER_CENTER_FOLLOW_USER, (userId: number) => ({
    type: ActionTypes.USER_CENTER_FOLLOW_USER,
    payload: { userId }
}));

export const unfollowUser = createAction(ActionTypes.USER_CENTER_UNFOLLOW_USER, (userId: number) => ({
    type: ActionTypes.USER_CENTER_UNFOLLOW_USER,
    payload: { userId }
}));

export const userCenterTransferWealthSuccess = createAction(ActionTypes.USER_CENTER_TRANSFER_WEALTH_SUCCESS, (userNames: string[]) => ({
    type: ActionTypes.USER_CENTER_TRANSFER_WEALTH_SUCCESS,
    payload: { userNames }
}));

export const changeUserFavoriteTopicGroup = createAction(ActionTypes.USER_CENTER_FAVORITE_GROUP_CHANGE);


export const changeUserInfoVisible = createAction(ActionTypes.CHANGE_USER_INFO_VISIBLE, (showCardUser: boolean) => ({
    type: ActionTypes.CHANGE_USER_INFO_VISIBLE,
    payload: { showCardUser },
  }));