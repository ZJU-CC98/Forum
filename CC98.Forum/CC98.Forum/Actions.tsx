// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Redux from 'redux';
import * as Appstate from './States/AppState';
import * as ActionTypes from './ActionTypes';

export const userLogIn = () => ({
    type: ActionTypes.USER_LOG_ON
});

export const userLogOff = () => ({
    type: ActionTypes.USER_LOG_OFF
});

export const changeUserInfo = (newInfo: Appstate.UserInfo) => ({
    type: ActionTypes.CHANGE_USERINFO,
    newInfo
});

export const throwError = (errorMessage: string) => ({
    type: ActionTypes.ERROR,
    errorMessage
});

export const changeCurrentVisitingUserPage = (page, id) => ({
    type: ActionTypes.CHANGE_VISITING_USER,
    page,
    id
});

export const userNotFound = () => ({
    type: ActionTypes.USER_NOT_FOUND
});

export const userCenterLoading = () => ({
    type: ActionTypes.USER_CENTER_LOADING
});

export const userCenterLoaded = () => ({
    type: ActionTypes.USER_CENTER_LOADED
});

export const userCenterError = (message: string) => ({
    type: ActionTypes.USER_CENTER_FETCH_ERROR,
    message
});

export const changeUserFavoriteBoards = (boardsInfo: Appstate.UserFavoritesBoardInfo[]) => ({
    type: ActionTypes.CHANGE_USER_FAVORITE_BOARDS,
    boardsInfo
});

export class AddAwardAction implements Redux.Action {
    type: string = ActionTypes.ADD_AWARD;
}