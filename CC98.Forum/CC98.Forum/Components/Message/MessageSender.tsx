// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSendReceiveProps } from '../../Props/MessageSendReceiveProps';
import { UbbContainer } from '../UbbContainer'
declare let moment: any;
import * as Utility from '../../Utility';

export class MessageSender extends React.Component<MessageSendReceiveProps> {
    render() {
        let userUrl = `/user/id/${this.props.senderId}`;
        let timeClassName: string;
        if (this.props.showTime) { timeClassName = "message-message-wcTime" }
        else { timeClassName = "displaynone" }
        let content = Utility.autoAddUrl(this.props.content);
        return (<div className="message-message-wc">
                <div className={timeClassName}>{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div className="message-message-wcSender">
                        <a href={userUrl} target="_blank"><img className="message-message-wcPortraitUrl" src={this.props.senderPortraitUrl} /></a>
                        <div className="message-message-wcContent">
                    <div id={String(this.props.id)} className="message-message-wcText"><UbbContainer code={content} /></div>
                        </div>
                        <div className="message-message-wcRead1">
                            <div className="message-message-wcRead2">
                                {this.props.isRead ? '已读' : '未读'}
                            </div>
                        </div>
                    </div>
                </div>);
    }
}
