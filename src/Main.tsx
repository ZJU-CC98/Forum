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
import App from './Components/App';
import ErrorBoundary from './Components/ErrorBoundary';
import { IndexedDB } from './IndexedDB/IndexedDB';
import { shouldUseIndexedDb } from './config';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import moment from 'moment'
moment.locale('zh-cn')
/**
 * 项目初始化代码
 */
async function initialize() {
  await Constants.loadConfig();
  if (shouldUseIndexedDb) await IndexedDB.start();

  // 输出一些没用的东西
  // console.info('%c       ', 'font-size: 100px; background: url(http://cdn.nyanit.com/nyan2.gif) no-repeat;');
  console.info('%cCC98 Durian', 'font-size: 80px; fontFamily: Big');

  // 显示应用程序核心内容
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <App />
        </LocaleProvider>
      </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
  );

  if (process.env.NODE_ENV === 'development') {
    const { whyDidYouUpdate } = require('why-did-you-update');
    //	whyDidYouUpdate(React);
  }
}

initialize();