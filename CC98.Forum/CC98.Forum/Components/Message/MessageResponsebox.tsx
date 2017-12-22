// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseProps } from '../../Props/MessageResponseProps';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
declare let moment: any;

export class MessageResponsebox extends React.Component<MessageResponseProps> {
    
    render() {
        let host = window.location.host;
        let boardName = `[url=http://${host}/list/${this.props.boardId}][color=dodgerblue]${this.props.boardName}[/color][/url]`;
        let a: any = (this.props.floor / 10) + 1;
        let b = parseInt(a);
        let c = this.props.floor + 10 - b * 10;
        let pageNum = `${b}#${c}`;
        if (c === 0) {
            pageNum = `${b - 1}#10`;
        }
        let content;
        if (this.props.isRead) {
            let userName;
            if (this.props.userId > 0) {
                userName = `[url=http://${host}/user/name/${this.props.userName}][color=gray]${this.props.userName}[/color][/url]`;
            }
            else {
                userName = `[color=gray]${this.props.userName}[/color]`;
            }
            let title = `[url=http://${host}/topic/${this.props.topicId}/${pageNum}][color=blue]${this.props.topicTitle}[/color][/url]`;
            content = ` ${userName} [color=gray]在《${title}》中回复了你。[/color]`;
        }
        else {
            let userName;
            if (this.props.userId > 0) {
                userName = `[url=http://${host}/user/name/${this.props.userName}][color=gray][b]${this.props.userName}[/b][/color][/url]`;
            }
            else {
                userName = `[color=gray][b]${this.props.userName}[/b][/color]`;
            }
            let title = `[url=http://${host}/topic/${this.props.topicId}/${pageNum}][color=blue]${this.props.topicTitle}[/color][/url]`;
            content = ` ${userName} [color=gray][b]在《${title}》中回复了你。[/b][/color]`;
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
                            <UbbContainer code={content}/>
                        </div>
                    </div>
                </div>
        );
    }
}