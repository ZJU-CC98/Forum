import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';
import store from './Store';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import 'blueimp-canvas-to-blob';
import 'es6-promise/auto';

import { Constants } from './Components/Constant';
import { App } from './Components/App';

/**
 * 项目初始化代码
 */
async function initialize() {

	await Constants.loadConfig();

	//输出一些没用的东西
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

/**
 * 兼容性检查
 */
if (!('flex' in document.documentElement.style)) {
	document.getElementById('root').innerHTML = "\
		<div style='width: 100%; text-align: left; font-size: 30px; position: fixed; top: 10%; left:10%;'>\
			<div style='font-size: 40px;'>抱歉，CC98在您的浏览器上无法正常显示</div>\
			<br/>\
			<div> 请使用较新版本的IE、Chrome、Edge、FireFox、Safari等主流现代浏览器</div >\
			<br/>\
			<div style='font-size: 20px;'>浏览器最新版下载链接\
			<br/>\
			<br/>\
			<a href='https://www.google.com/chrome/' target='_blank' class='unSupportA'>Chrome浏览器</a>\
			<a href='http://www.firefox.com.cn/' target='_blank' style='margin-left: 40px;' class='unSupportA'>FireFox浏览器</a>\
			<a href='https://www.microsoft.com/zh-cn/download/internet-explorer.aspx' target='_blank' style='margin-left: 40px;' class='unSupportA'>IE浏览器</a>\
			</div>\
			<br/>\
			<br/>\
			<div>若您使用的是国产浏览器，请切换到“极速模式”或“高速模式”，勿使用“兼容模式”</div>\
			<br/>\
			<div style='font-size: 20px;'>不同浏览器切换“极速模式”教程请点击以下对应链接\
			<br/>\
			<br/>\
			<a href='https://jingyan.baidu.com/article/fcb5aff77f0f19edaa4a71a1.html' target='_blank' class='unSupportA'>360浏览器</a>\
			<a href='https://jingyan.baidu.com/article/e75057f21f6dd3ebc81a8972.html' target='_blank' style='margin-left: 46px;' class='unSupportA'>QQ浏览器</a>\
			<a href='https://www.kafan.cn/edu/60454086.html' target='_blank' style='margin-left: 46px;' class='unSupportA'>搜狗浏览器</a>\
			<br/>\
			<br/>\
			<a href = 'https://zhidao.baidu.com/question/743803842371080452.html' target = '_blank' class='unSupportA'>猎豹浏览器</a>\
			<a href='https://jingyan.baidu.com/article/90808022c36ad2fd90c80f6c.html' target='_blank' style='margin-left: 40px;' class='unSupportA'>傲游浏览器</a>\
			<a href='http://www.downxia.com/zixun/6730.html' target='_blank' style='margin-left: 40px;' class='unSupportA'>百度浏览器</a>\
			</div>\
			<br/>\
			<br/>\
			<div> 如果仍未解决，请联系 contact@cc98.org</div>\
		</div > ";
} else {
	initialize();
}
