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
export class UnauthorizedOperation extends React.Component<{}, {}>{
    render() {
        return <div>401您没有权限进行此操作</div>;
    }
}
export class NotFoundBoard extends React.Component<{}, {}>{
    /*constructor(props, context) {
        super(props, context);
    }
    async componentDidMount() {
      
        console.log("finished");
    }*/
    render() {
        return <div>404版面不存在</div>;
    }
}
export class NotFoundTopic extends React.Component<{}, {}>{
   /* async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorization", token);
        headers.append("Content-Type", "application/json");
        const body = {
            isCanceling: false,
            isBold: true,
            isItalic: true,
            color: "red",
            duration:null
        }
        const str = JSON.stringify(body);
        const url = 'http://apitest.niconi.cc/topic/sethighlight?boardid=753&topicid=4740298'
        await fetch(url, { method: "PUT", headers, body: str });


    }*/
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
