import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer as router, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import * as ThunkActions from './AsyncActions';
import * as UserActions from './Actions/UserCenter';
import * as ErrorActions from './Actions/Error';
import * as MessageActions from './Actions/Message';
import error, { ErrorStore } from './Reducers/Error';
import userInfo, { UserInfoStore } from './Reducers/UserInfo';
import message, { MessageInfo } from './Reducers/Message';

/**
 * 全局store的类型定义
 */
export interface RootState {
    error: ErrorStore;
    userInfo: UserInfoStore;
    message: MessageInfo;
    router: RouterState;
}


export const Actions = { ...UserActions, ...ErrorActions, ...MessageActions };
type actionTypes = keyof typeof Actions
type thunkActionTypes = keyof typeof ThunkActions;

/**
 * 全部Action的类型定义
 */
export type RootAction = ReturnType<typeof Actions[actionTypes]>; 
export type RootThunkAction = ReturnType<typeof ThunkActions[thunkActionTypes]>;

/**
 * 合并reducer
 */
const reducer = combineReducers<RootState>({
    error,
    router,
    userInfo,
    message,
});

export const history = createHistory();

/**
 * 连接到redux开发者工具
 */
const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));
