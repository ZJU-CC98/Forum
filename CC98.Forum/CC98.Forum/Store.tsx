// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import error, { ErrorStore } from './Reducers/Error';
import post, { TopicState } from './Reducers/Post';
import userInfo, { UserInfoStore } from './Reducers/UserInfo';
import * as Actions from './Actions';

interface StoreEnhancerState { }
export interface RootState extends StoreEnhancerState {
    error: ErrorStore;
    post: TopicState;
    userInfo: UserInfoStore;
  }
/**
 * 合并reducer
 * 在组件中使用相应的Store时带上这里的前缀
 */
const reducer = combineReducers<RootState>({
    error,
    post,
    userInfo
});
/**
 * 记录Action与Store
 * @param store
 */
const logger = store => next => action => {
    console.log(action.type);
    let result = next(action);
    console.log(store.getState());
    return result;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));