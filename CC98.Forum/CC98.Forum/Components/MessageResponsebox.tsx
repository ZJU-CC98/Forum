// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageProps } from '../Props/MessageProps';

export class MessageResponsebox extends React.Component<MessageProps> {
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */

    render() {
        return <div></div>;
        /*return (<div className="message-response-box">
                    <div className="message-response-box-left">
                        <img className="message-response-img" src={this.props.chatPortraitUrl} />
                    </div>
                    <div className="message-response-box-middle">
                        <div className="message-response-box-middle-name">
                            {this.props.senderName}
                        </div>
                        <div className="message-response-box-middle-title">
                            {this.props.title}
                        </div>
                        <div className="message-response-box-middle-date" >
                            {this.props.sendTime}
                        </div>
                        <div className="message-response-box-middle-content">
                            {this.props.content}
                        </div>
                    </div>
                    <div className="message-response-box-right">查看</div>
                </div>
        );*/
    }
}