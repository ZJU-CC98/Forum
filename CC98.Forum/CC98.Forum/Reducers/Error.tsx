// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as ActionTypes from '../ActionTypes';
import { RootAction } from '../Store';

export type errorKeys = 
    'LogOut' | 
    'TopicDeleted' | 
    'Disconnected' | 
    'UnauthorizedBoard' | 
    'UnauthorizedTopic' | 
    'UnauthorizedOperation' | 
    'NotFoundBoard' | 
    'NotFoundTopic' | 
    'CannotPost' | 
    'NotFoundUser' | 
    'ServerError' | 
    'ContentNeeded' | 
    'OperationForbidden' | 
    'PageNotFound' | 
    ''
;

/**
 * 错误用的Store
 */
export class ErrorStore {
    /**
    * 表示是否有错误
    */
    isError: boolean = false;
    /**
    * 表示错误信息
    */
    errorMessage: errorKeys = '';
}

/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
export default (state = new ErrorStore(), action: RootAction): ErrorStore => {
    switch (action.type) {
        case ActionTypes.THROW_ERROR:
            return { ...state, isError: true, errorMessage: action.payload.message };
        case ActionTypes.SOLVE_ERROR:
            return { ...state, isError: false };
        default:
            return state;
    }
}
