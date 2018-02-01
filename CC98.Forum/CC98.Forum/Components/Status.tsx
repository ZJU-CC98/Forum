import * as React from 'react';
import LogOn from './LogOn';
import { Link } from 'react-router-dom';
import * as Utility from '../Utility';
import DocumentTitle from './DocumentTitle';
export class LogOut extends React.Component<{}, {}>{
    render() {
        //return <div style={{
        //    display: "flex", flexDirection: "column"
        //}}>
        //    <div>您当前未登录</div>
        //    <Link to="/logon"><button>登录</button></Link>
        //</div>;
        return <div className="errorState" >
            <DocumentTitle title={`您未登录 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/401.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">您当前未登录</div>
            <div className="row returnIndexBtn" ><Link to="/logon" >点我登录</Link></div>
        </div>
    }
}
export class TopicDeleted extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <DocumentTitle title={`帖子被删除了 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/404.png"></img>
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
        return <div>
            <DocumentTitle title={`网络中断 - CC98论坛`} />
            <div>网络连接中断</div>
        </div>;
    }
}
export class UnauthorizedBoard extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <DocumentTitle title={`您没有权限进入这个版面 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/401.png"></img>
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
            <DocumentTitle title={`您没有权限进入这个主题 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/401.png"></img>
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
            <DocumentTitle title={`您没有权限执行这个操作 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/401.png"></img>
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
            <DocumentTitle title={`版面不存在 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/404.png"></img>
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
            <DocumentTitle title={`帖子不存在 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/404.png"></img>
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
            <DocumentTitle title={`用户不存在 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/404.png"></img>
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
            <DocumentTitle title={`服务器发送错误 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/500.png"></img>
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
        return <div>
            <DocumentTitle title={`请输入内容 - CC98论坛`} />
            <div className="errorText">402需要输入内容</div>
            </div>
    }
}
export class OperationForbidden extends React.Component<{}, {}>{
    render() {
        return <div className="errorState" >
            <DocumentTitle title={`操作失败或被拒绝 - CC98论坛`} />
            <div>
                <img className="errorIcon" src="/static/images/403.png"></img>
            </div>
            <div className="errorTitle">糟糕！好像出错了</div>
            <div className="errorText">操作失败或被拒绝</div>
            <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
        </div>
            ;
    }
}
export const PageNotFound = () => (
    <div className="errorState" >
        <DocumentTitle title={`页面不存在 - CC98论坛`} />
        <div>
            <img className="errorIcon" src="/static/images/404.png"></img>
        </div>
        <div className="errorTitle">糟糕！好像出错了</div>
        <div className="errorText">页面不存在</div>
        <div className="row returnIndexBtn" ><Link to="/" >返回首页</Link></div>
    </div>
)


export class UnSupport extends React.Component {
    render() {
        return <div style={{ width: '100%', fontSize: '40px', textAlign: 'center', position: 'fixed', top: '30%' }}>
            <div>你正在使用的浏览器无法正常浏览CC98</div>
            <div>请更新你的浏览器版本或者使用“极速模式”浏览CC98</div>
        </div>
    }
}