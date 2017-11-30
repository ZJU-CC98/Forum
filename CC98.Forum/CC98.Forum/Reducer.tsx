// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from './ActionTypes';
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOG_ON:
            return { ...state, isLogOn: true };
        case ActionTypes.USER_LOG_OFF:
            return { ...state, isLogOn: false };
        default:
            return state;
    }
}