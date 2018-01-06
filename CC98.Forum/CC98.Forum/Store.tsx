// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import error, { ErrorStore } from './Reducers/Error';
import post, { TopicState } from './Reducers/Post';
import userInfo, { UserInfoStore } from './Reducers/UserInfo';
import * as UserCenterActions from './Actions/UserCenter';
import { getReturnOfExpression, getType } from 'react-redux-typescript';
import { routerReducer, RouterState, routerActions, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

/**
 * 全局store的类型定义
 */
export interface RootState {
    error: ErrorStore;
    post: TopicState;
    userInfo: UserInfoStore;
    router: RouterState
}

function values<T>(o: { [s: string]: T }): T[] {
    return Object.keys(o).map(key => o[key]);
};

const Actions = { ...UserCenterActions };
const returnOfActions = values(Actions).map(getReturnOfExpression);
const returnOgActionsType = values(Actions).map(getType);

/**
 * 全部actiontype的类型定义
 */
export type RootActionType = typeof returnOgActionsType[number];

/**
 * 全部action的类型定义
 */
export type RootAction = typeof returnOfActions[number];

/**
 * 合并reducer
 */
const reducer = combineReducers<RootState>({
    error,
    post,
    userInfo,
    router: routerReducer
});

export const history = createHistory();

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));