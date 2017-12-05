// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore, combineReducers, applyMiddleware } from 'redux';

import error from './Reducers/Error';
import post from './Reducers/Post';
import userInfo from './Reducers/UserInfo';

/**
 * 合并reducer
 * 在组件中使用相应的Store时带上这里的前缀
 */
const reducer = combineReducers({
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

export default createStore(reducer, applyMiddleware(logger));