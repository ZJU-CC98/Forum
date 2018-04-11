import 'es6-promise/auto';
import 'core-js/shim';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import store from './Store';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import 'blueimp-canvas-to-blob';

import { Constants } from './Components/Constant';
import { App } from './Components/App';
import { autoClearLocalStorage } from './Utility';

// 控制用户缓存
// 需要清理缓存时更新 version
const version = '3.2.0';
if(localStorage.getItem('version') !== version) {
	localStorage.clear();
	localStorage.setItem('version', version);
}

/**
 * 项目初始化代码
 */
async function initialize() {

	await Constants.loadConfig();

	// 输出一些没用的东西
	console.info('%c       ', 'font-size: 100px; background: url(http://cdn.nyanit.com/nyan2.gif) no-repeat;');
	console.info('%cCC98 Durian', 'font-size: 80px; fontFamily: Big');

	// 显示应用程序核心内容
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')

	);
}

initialize();
