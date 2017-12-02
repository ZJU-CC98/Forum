// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from './ActionTypes';
import { combineReducers } from 'redux';
import * as Utility from './Utility';
import { post } from './reducers';
import { Store } from './Store';

export default (state, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOG_ON:
            return { ...state, isLogOn: true };
        case ActionTypes.USER_LOG_OFF:
            return { ...state, isLogOn: false };
        case ActionTypes.CHANGE_USERINFO:
            Utility.setLocalStorage("userInfo", action.newInfo);
            return { ...state, currentUserInfo: action.newInfo }
        case ActionTypes.ERROR:
            return { ...state, isError: true, errorMessage: action.errorMessage }
        case ActionTypes.ADD_AWARD:
            return;
        default:
            return state;
    }
}

// 不太懂 combineReducers 的原理
//export default combineReducers({
//    main, post
//});