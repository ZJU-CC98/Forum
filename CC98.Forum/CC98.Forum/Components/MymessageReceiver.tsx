// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MyMessageProps } from '../Props/MyMessageProps';

export class MyMessageReceiver extends React.Component<MyMessageProps> {
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */

    render() {
        return (<div className="mymessage-message-wc">
                    <div className="mymessage-message-wcTime">{this.props.sendTime}</div>
                    <div className="mymessage-message-wcReceiver">
                        <img className="mymessage-message-wcPortraitUrl" src={this.props.chatPortraitUrl} />
                        <div className="mymessage-message-wcContent">
              <div className="mymessage-message-wcText" id={String(this.props.id)}>【{this.props.title}】{this.props.content}</div>
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