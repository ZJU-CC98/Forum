// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MyMessageProps } from '../Props/MyMessageProps';

export class MyMessageResponsebox extends React.Component<MyMessageProps> {
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */

    render() {
        return (<div className="mymessage-response-box">
                    <div className="mymessage-response-box-left">
                        <img className="mymessage-response-img" src={this.props.chatPortraitUrl} />
                    </div>
                    <div className="mymessage-response-box-middle">
                        <div className="mymessage-response-box-middle-name">
                            {this.props.senderName}
                        </div>
                        <div className="mymessage-response-box-middle-title">
                            {this.props.title}
                        </div>
                        <div className="mymessage-response-box-middle-date" >
                            {this.props.sendTime}
                        </div>
                        <div className="mymessage-response-box-middle-content">
                            {this.props.content}
                        </div>
                    </div>
                    <div className="mymessage-response-box-right">查看</div>
                </div>
        );
    }
}