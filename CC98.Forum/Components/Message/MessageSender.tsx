// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSendReceiveProps } from '../../Props/MessageSendReceiveProps';
import { UbbContainer } from '../UbbContainer'
import * as moment from 'moment';
import * as Utility from '../../Utility';

export class MessageSender extends React.Component<MessageSendReceiveProps> {
    render() {
        let userUrl = `/user/id/${this.props.senderId}`;
        let timeClassName: string;
        if (this.props.showTime) { timeClassName = "message-message-wcTime" }
        else { timeClassName = "displaynone" }
        return (<div className="message-message-wc">
                <div className={timeClassName}>{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div className="message-message-wcSender">
                        <a href={userUrl} target="_blank"><img className="message-message-wcPortraitUrl" src={this.props.senderPortraitUrl} /></a>
                <div className="message-message-wcContent">
                    <div id={String(this.props.id)} className="message-message-wcText"><UbbContainer code={this.props.content} /></div>
                        </div>
                    </div>
                </div>);
    }
}
