import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer as router, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from './node_modules/redux-thunk/es/index';

import * as UserActions from './Actions/UserCenter';
import error, { ErrorStore } from './Reducers/Error';
import post, { TopicState } from './Reducers/Post';
import userInfo, { UserInfoStore } from './Reducers/UserInfo';

function values<T>(o: { [s: string]: T }): T[] {
    return Object.keys(o).map((key) => o[key]);
}

/**
 * 全局store的类型定义
 */
export interface RootState {
    error: ErrorStore;
    post: TopicState;
    userInfo: UserInfoStore;
    router: RouterState;
}

function getReturn<T>( creator: (...args: any[]) => T): T { return };
const actionTypes = values(UserActions).map(getReturn);
export type RootAction = typeof actionTypes[number]; 

/**
 * 合并reducer
 */
const reducer = combineReducers<RootState>({
    error,
    post,
    router,
    userInfo,
});

export const history = createHistory();

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));
