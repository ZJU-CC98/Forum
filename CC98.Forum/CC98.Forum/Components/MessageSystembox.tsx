// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSystemProps } from '../Props/MessageSystemProps';
import { UbbContainer } from './UbbContainer'
declare let moment: any;

export class MessageSystembox extends React.Component<MessageSystemProps> {

    render() {
        let content;
        if (this.props.topicId) {
            let host = window.location.host;
            if (this.props.postId) {
                let a: any = this.props.postId / 10;
                let b = parseInt(a);
                let c = this.props.postId - b * 10;
                if (this.props.isRead) {
                    content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=gray]${this.props.content}[/color][color=blue]http://${host}/topic/${this.props.topicId}/${b}#${c}[/color][/url]`;
                }
                else {
                    content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=black][b]${this.props.content}[/b][/color][color=blue][b]http://${host}/topic/${this.props.topicId}/${b}#${c}[/b][/color][/url]`;
                }
            }
            else {
                if (this.props.isRead) {
                    content = `[url=http://${host}/topic/${this.props.topicId}][color=gray]${this.props.content}[/color][color=blue]http://${host}/topic/${this.props.topicId}[/color][/url]`;
                }
                else {
                    content = `[url=http://${host}/topic/${this.props.topicId}][color=black][b]${this.props.content}[/b][/color][color=blue][b]http://${host}/topic/${this.props.topicId}[/color][/b][/url]`;
                }
            }
        }
        else {
            if (this.props.isRead) {
                content = `[color=gray]${this.props.content}[/color]`;
            }
            else {
                content = `[color=black][b]${this.props.content}[/b][/color]`;
            }
        }
        console.log(content);
        return (<div className="message-system-box">
                    <div className="message-system-box-bar">
                            <div className="message-system-box-title">
                                {this.props.title}
                            </div>
                            <div className="message-system-box-date" >
                                {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>
                    <div className="message-system-box-content">
                        <UbbContainer code={content} />
                    </div>
                </div>);
    }
}