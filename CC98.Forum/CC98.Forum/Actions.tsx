// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from './ActionTypes';

export const userLogIn = () => ({
    type: ActionTypes.USER_LOG_ON
});

export const userLogOff = () => ({
    type: ActionTypes.USER_LOG_OFF
});