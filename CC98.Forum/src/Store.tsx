import { createBrowserHistory } from 'history';
import { createReduxHistoryContext, RouterState } from 'redux-first-history';
import { applyMiddleware, combineReducers, Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import * as ThunkActions from './AsyncActions';
import * as UserActions from './Actions/UserCenter';
import * as ErrorActions from './Actions/Error';
import * as MessageActions from './Actions/Message';
import { errorReducer, ErrorStore } from './Reducers/Error';
import { userInfoReducer, UserInfoStore } from './Reducers/UserInfo';
import { messageReducer, MessageInfo } from './Reducers/Message';

/**
 * 系统全局信息。
 */
export interface RootState {
    /**
     * 系统级错误。
     */
    error: ErrorStore;
    /**
     * 当前用户信息。
     */
    userInfo: UserInfoStore;
    /**
     * 系统消息。
     */
    message: MessageInfo;
    /**
     * 导航信息。
     */
    router: RouterState;
}

/**
 * 所有可用操作的集合。
 */
export const Actions: {
    /**
     * @param {string} key 操作名称。
     * @returns 操作方法。
     */
    [key: string]: any
} = { ...UserActions, ...ErrorActions, ...MessageActions };

/**
 * 所有可用的操作类型。
 */
type actionTypes = keyof typeof Actions
type thunkActionTypes = keyof typeof ThunkActions;

/**
 * 全部Action的类型定义
 */
export type RootAction = ReturnType<typeof Actions[actionTypes]>; 
export type RootThunkAction = ReturnType<typeof ThunkActions[thunkActionTypes]>;

/**
 * 浏览器历史记录全局对象。
 */
export const history = createBrowserHistory();

/**
 * 支持 Redux 的历史记录上下文对象。
 */
const reduxHistoryContext = createReduxHistoryContext({history});

/**
 * 系统总 Reducer。
 */
const rootReducer = combineReducers({
    error: errorReducer,
    router: reduxHistoryContext.routerReducer,
    userInfo: userInfoReducer,
    message: messageReducer,
}) as Reducer<RootState>;

/**
 * 为 Store 提供 thunk 和路由支持。
 */
const combinedMiddleware = applyMiddleware(thunk, reduxHistoryContext.routerMiddleware);

/**
 * 系统根存储数据。
 */
export const rootStore = configureStore({
    reducer: rootReducer,
    devTools: true,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(combinedMiddleware)
});
