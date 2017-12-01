import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import store from './Store';
import { Provider } from 'react-redux';

import { App } from './Components/App';

// 显示应用程序核心内容
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')

);