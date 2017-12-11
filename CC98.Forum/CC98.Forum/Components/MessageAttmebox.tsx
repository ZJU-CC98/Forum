// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseProps } from '../Props/MessageResponseProps';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
declare let moment: any;

export class MessageAttmebox extends React.Component<MessageResponseProps> {

    render() {
        let host = window.location.host;
        let boardName = `[url=http://${host}/list/${this.props.boardId}/normal][color=dodgerblue]${this.props.boardName}[/color][/url]`;
        let a: any = (this.props.floor / 10) + 1;
        let b = parseInt(a);
        let c = this.props.floor + 10 - b * 10;
        let content;
        if (this.props.isRead) {
            content = `[url=http://${host}/user/name/${this.props.userName}][color=gray]${this.props.userName}[/color][/url] [color=gray]在《${this.props.topicTitle}》中@了你。[/color][url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=blue]http://${host}/topic/${this.props.topicId}[/color][/url]`;
        }
        else {
            content = `[url=http://${host}/user/name/${this.props.userName}][color=black][b]${this.props.userName}[/b][/color][/url] [color=black][b]在《${this.props.topicTitle}》中@了你。[/b][/color][url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=blue][b]http://${host}/topic/${this.props.topicId}[/b][/color][/url]`;
        }
        return (<div className="message-response-box">
            <div className="message-response-box-middle">
                <div className="message-response-box-middle1">
                    <div className="message-response-box-middle-title">
                        <UbbContainer code={boardName} />
                    </div>
                    <div className="message-response-box-middle-date" >
                        {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                </div>
                <div className="message-response-box-middle-content">
                    <UbbContainer code={content} />
                </div>
            </div>
        </div>
        );
    }
}