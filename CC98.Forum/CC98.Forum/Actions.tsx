// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { Action, ActionCreator } from 'redux';
import * as Appstate from './States/AppState';
import * as ActionTypes from './ActionTypes';

export const userLogIn:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_LOG_ON
});

export const userLogOff:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_LOG_OFF
});

export const changeUserInfo:ActionCreator<Action> = (newInfo: Appstate.UserInfo) => ({
    type: ActionTypes.CHANGE_USERINFO,
    newInfo
});

export const throwError:ActionCreator<Action> = (errorMessage: string) => ({
    type: ActionTypes.ERROR,
    errorMessage
});

export const changeCurrentVisitingUserPage:ActionCreator<Action> = (page: number, id: number) => ({
    type: ActionTypes.CHANGE_VISITING_USER,
    page,
    id
});

export const userNotFound:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_NOT_FOUND
});

export const userCenterLoading:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_CENTER_LOADING
});

export const userCenterLoaded:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_CENTER_LOADED
});

export const userCenterError:ActionCreator<Action> = (message: string) => ({
    type: ActionTypes.USER_CENTER_FETCH_ERROR,
    message
});

export const changeUserFavoriteBoards:ActionCreator<Action> = (boardsInfo: Appstate.UserFavoritesBoardInfo[]) => ({
    type: ActionTypes.CHANGE_USER_FAVORITE_BOARDS,
    boardsInfo
});

export const changeUserRecentPosts:ActionCreator<Action> = (posts: Appstate.UserRecentPost[]) => ({
    type: ActionTypes.CHANGE_USER_RECENT_POSTS,
    posts
});

export const usercenterPageLoadUnfinish:ActionCreator<Action> = () => ({
    type: ActionTypes.USER_CENTER_PAGE_LOAD_UNFINISH
});

export const usercenterPageLoadFinish:ActionCreator<Action> = (totalPage: number) => ({
    type: ActionTypes.USER_CENTER_PAGE_LOAD_FINISH,
    totalPage
});

export class AddAwardAction implements Redux.Action {
    type: string = ActionTypes.ADD_AWARD;
}