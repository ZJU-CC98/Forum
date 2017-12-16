import * as React from 'react';
import { LogOn } from './LogOn';
import { Link } from 'react-router-dom';
import * as Utility from '../Utility';
export class LogOut extends React.Component<{}, {}>{
    render() {
        return <div style={{
            display: "flex", flexDirection: "column"
        }}>
            <div>您当前未登录</div>
            <Link to="/logon"><button>登录</button></Link>
        </div>;
    }
}
export class TopicDeleted extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/404.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">帖子被删除</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
            </div>
       ;
    }
}
export class Disconnected extends React.Component<{}, {}>{
    render() {
        return <div>网络连接中断</div>;
    }
}
export class UnauthorizedBoard extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/401.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">您没有权限进入这个版面</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class UnauthorizedTopic extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/401.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">您没有权限进入这个主题</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>

        </div>
            ;
    }
}
export class UnauthorizedOperation extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/401.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">您没有权限进行这个操作</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class NotFoundBoard extends React.Component<{}, {}>{

    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/404.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">版面不存在</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class NotFoundTopic extends React.Component<{}, {}>{

    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/404.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">帖子不存在</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class NotFoundUser extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/404.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">用户不存在</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class ServerError extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/500.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">服务器发送错误</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export class ContentNeeded extends React.Component<{}, {}>{
    render() {
        return <div className="errorText">402需要输入内容</div>
    }
}
export class OperationForbidden extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <div>
                <img className="errorIcon" src="/images/403.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">操作失败或被拒绝</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
