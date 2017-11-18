// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import {MessageSendReceiveProps} from '../Props/MessageSendReceiveProps';
import { UbbContainer } from './UbbContainer';
import * as moment from 'moment';

export class MessageReceiver extends React.Component<MessageSendReceiveProps> {

    render() {
        return (<div className="message-message-wc">
                <div className="message-message-wcTime">{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="message-message-wcReceiver">
                        <img className="message-message-wcPortraitUrl" src={this.props.receiverPortraitUrl} />
                        <div className="message-message-wcContent">
                            <div className="message-message-wcText" id={String(this.props.id)}><UbbContainer code={this.props.content}/></div>
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