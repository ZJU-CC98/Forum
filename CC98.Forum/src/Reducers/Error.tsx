// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { Reducer } from 'redux';
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
    'TooFrequentSearch' |
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
 * 处理错误使用的 Reducer。
 * @param state 原有状态。
 * @param action Redux 操作信息。
 * @returns 新的状态。
 */
export const errorReducer: Reducer<ErrorStore, RootAction> = 
    (state = new ErrorStore(), action: RootAction): ErrorStore => {
        switch (action.type) {
            case ActionTypes.THROW_ERROR:
                return { ...state, isError: true, errorMessage: action.payload.message };
            case ActionTypes.SOLVE_ERROR:
                return { ...state, isError: false };
            default:
                return state;
        }
    }
