import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import store from './Store';
import { Provider } from 'react-redux';
import 'whatwg-fetch';

import { Constants } from './Components/Constant';
import { App } from './Components/App';

/**
 * 项目初始化代码
 */
async function initialize() {

	await Constants.loadConfig();

	// 显示应用程序核心内容
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')

	);
}

initialize();
