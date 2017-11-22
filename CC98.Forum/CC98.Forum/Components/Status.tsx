import * as React from 'react';
import { LogOn } from './LogOn';
import * as Utility from '../Utility';
export class LogOut extends React.Component<{}, {}>{
    render() {
        return <div style={{
            display: "flex", flexDirection: "column"
        }}>
            <div>您当前未登录</div>
            <LogOn />
            </div>;
    }
}
export class TopicDeleted extends React.Component<{}, {}>{
    render() {
        return <div>帖子被删除</div>;
    }
}
export class Disconnected extends React.Component<{}, {}>{
    render() {
        return <div>网络连接中断</div>;
    }
}
export class UnauthorizedBoard extends React.Component<{}, {}>{
    render() {
        return <div>401您没有权限进入这个版面</div>;
    }
}
export class UnauthorizedTopic extends React.Component<{}, {}>{
    render() {
        return <div>401您没有权限进入这个帖子</div>;
    }
}
export class NotFoundBoard extends React.Component<{}, {}>{
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        console.log(this.context);
        console.log(this.context.router);
        console.log(this.context.router.history);
        this.context.router.history.push("/status/NotFoundTopic");
    }
    render() {
        return <div>404版面不存在</div>;
    }
}
export class NotFoundTopic extends React.Component<{}, {}>{
    render() {
        return <div>404帖子不存在</div>;
    }
}
export class NotFoundUser extends React.Component<{}, {}>{
    render() {
        return <div>404用户不存在</div>;
    }
}
export class ServerError extends React.Component<{}, {}>{
    render() {
        return <div>500服务器错误</div>;
    }
}
export class ContentNeeded extends React.Component<{}, {}>{
    render() {
        return <div>402需要输入内容</div>
    }
}
export class OperationForbidden extends React.Component<{}, {}>{
    render() {
        return <div>403操作被拒绝</div>
    }
}