import * as React from 'react';
import LogOn from './LogOn';
import { Link } from 'react-router-dom';
import * as Utility from '../Utility';
import DocumentTitle from './DocumentTitle';

export const LogOut = () => (
  <div className="errorState">
    <DocumentTitle title={`您未登录 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/401.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">您当前未登录</div>
    <div className="row returnIndexBtn">
      <Link to="/logon">点我登录</Link>
    </div>
  </div>
);

export const TopicDeleted = () => (
  <div className="errorState">
    <DocumentTitle title={`帖子被删除了 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/404.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">帖子被删除</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const Disconnected = () => (
  <div>
    <DocumentTitle title={`网络中断 - CC98论坛`} />
    <div>网络连接中断</div>
  </div>
);

export const UnauthorizedBoard = () => (
  <div className="errorState">
    <DocumentTitle title={`您没有权限进入这个版面 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/401.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">您没有权限进入这个版面或未登陆</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
    <div className="row returnIndexBtn">
      <Link to="/logon">点我登录</Link>
    </div>
  </div>
);

export const UnauthorizedTopic = () => (
  <div className="errorState">
    <DocumentTitle title={`您没有权限进入这个主题 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/401.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">您没有权限进入这个主题</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const UnauthorizedOperation = () => (
  <div className="errorState">
    <DocumentTitle title={`您没有权限执行这个操作 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/401.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">您没有权限进行这个操作</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const NotFoundBoard = () => (
  <div className="errorState">
    <DocumentTitle title={`版面不存在 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/404.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">版面不存在</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const NotFoundTopic = () => (
  <div className="errorState">
    <DocumentTitle title={`帖子不存在 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/404.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">帖子不存在</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const CannotPost = () => (
  <div className="errorState">
    <DocumentTitle title={`您还不能发帖 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/403.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">
      你无法在本版发帖，可能的原因有：权限不足、未达到发帖门槛、版面已锁定、账号受到处罚等。
    </div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const NotFoundUser = () => (
  <div className="errorState">
    <DocumentTitle title={`用户不存在 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/404.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">用户不存在</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const ServerError = () => (
  <div className="errorState">
    <DocumentTitle title={`服务器发送错误 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/500.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">服务器发送错误</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const ContentNeeded = () => (
  <div>
    <DocumentTitle title={`请输入内容 - CC98论坛`} />
    <div className="errorText">402需要输入内容</div>
  </div>
);

export const OperationForbidden = () => (
  <div className="errorState">
    <DocumentTitle title={`操作失败或被拒绝 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/403.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">操作失败或被拒绝</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const PageNotFound = () => (
  <div className="errorState">
    <DocumentTitle title={`页面不存在 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/404.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">页面不存在</div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);

export const TooFrequentSearch = () => (
  <div className="errorState">
    <DocumentTitle title={`操作失败或被拒绝 - CC98论坛`} />
    <div>
      <img className="errorIcon" src="/static/images/403.webp" />
    </div>
    <div className="errorTitle">糟糕！好像出错了</div>
    <div className="errorText">可能的原因有：</div>
    <div className="errorText">1. 你没有权限进行该操作；</div>
    <div className="errorText">
      2. 你的请求过快。出于服务器性能考虑，目前设定为10秒内最多搜索一次。
    </div>
    <div className="row returnIndexBtn">
      <Link to="/">返回首页</Link>
    </div>
  </div>
);
