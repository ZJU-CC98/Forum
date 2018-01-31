// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
/**
 * text:显示的文字
 * id:给这个消息提示框一个id
 * top: 消息提示距顶部的距离
 * left:消息提示距左边的距离
 */
export class NoticeMessage extends React.Component<{ text: string; id: string; top: string; left: string }> {
    render() {
        return <div className="noticeSuccess displaynone" id={this.props.id} style={{ position: 'fixed', top: this.props.top, left: this.props.left }}>{this.props.text}</div>;
    }
}