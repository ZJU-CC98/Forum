// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { createStore } from 'redux';
import reducer from './Reducer'
import * as Utility from './Utility';

const appStore = {
    isLogOn: false
};

const store = createStore(reducer, appStore);

export default store;