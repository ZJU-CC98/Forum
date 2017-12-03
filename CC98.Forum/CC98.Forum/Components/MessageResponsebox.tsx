// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseProps } from '../Props/MessageResponseProps';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
declare let moment: any;

export class MessageResponsebox extends React.Component<MessageResponseProps> {
    
    render() {
        let host = window.location.host;
        let a: any = this.props.postId / 10;
        let b = parseInt(a);
        let c = this.props.postId - b * 10;
        let content;
        let view;
        if (this.props.isRead) {
            content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=gray]有人在《${this.props.topicTitle}》中回复了你[/color][/url]`;
            view = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=gary]查看[/color][/url]`;
        }
        else {
            content = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=black][b]有人在《${this.props.topicTitle}》中回复了你[/b][/color][/url]`;
            view = `[url=http://${host}/topic/${this.props.topicId}/${b}#${c}][color=black][b]查看[/b][/color][/url]`;
        }
        return (<div className="message-response-box">
                    <div className="message-response-box-middle">
                        <div className="message-response-box-middle1">
                            <div className="message-response-box-middle-title">
                                {this.props.boardName}
                            </div>
                            <div className="message-response-box-middle-date" >
                                {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        </div>
                        <div className="message-response-box-middle-content">
                            <UbbContainer code={content}/>
                        </div>
                    </div>
                    <div className="message-response-box-right"> <UbbContainer code={view} /></div>
                </div>
        );
    }
}