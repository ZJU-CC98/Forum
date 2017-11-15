// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MyMessageProps } from '../Props/MyMessageProps';
import { UbbContainer } from './UbbContainer';
import * as moment from 'moment';

export class MyMessageReceiver extends React.Component<MyMessageProps> {

    render() {
        return (<div className="mymessage-message-wc">
                <div className="mymessage-message-wcTime">{moment(this.props.sendTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="mymessage-message-wcReceiver">
                        <img className="mymessage-message-wcPortraitUrl" src={this.props.chatPortraitUrl} />
                        <div className="mymessage-message-wcContent">
                            <div className="mymessage-message-wcText" id={String(this.props.id)}>【{this.props.title}】<UbbContainer code={this.props.content}/></div>
                        </div>
                        <div className="mymessage-message-wcRead1">
                            <div className="mymessage-message-wcRead2">
                                {this.props.isRead ? '已读' : '未读'}
                            </div>
                        </div>
                    </div>
                </div>);
    }
}