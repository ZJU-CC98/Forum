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
                        <img className="message-message-wcPortraitUrl" src={this.props.senderPortraitUrl} />
                        <div className="message-message-wcContent">
                            <div className="message-message-wcText" id={String(this.props.id)}><UbbContainer code={this.props.content}/></div>
                        </div>
                    </div>
                </div>);
    }
}