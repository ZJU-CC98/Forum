import * as React from 'react';
import { LogOn } from './LogOn';
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
export class UnauthorizedBoard extends React.Component<{}, {}>{
    render() {
        return <div>您没有权限进入这个版面</div>;
    }
}
export class UnauthorizedTopic extends React.Component<{}, {}>{
    render() {
        return <div>您没有权限进入这个帖子</div>;
    }
}
export class NotFoundBoard extends React.Component<{}, {}>{
    render() {
        return <div>版面不存在</div>;
    }
}
export class NotFoundTopic extends React.Component<{}, {}>{
    render() {
        return <div>帖子不存在</div>;
    }
}