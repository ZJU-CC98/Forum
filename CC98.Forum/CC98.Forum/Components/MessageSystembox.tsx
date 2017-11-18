// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageProps } from '../Props/MessageProps';

export class MessageSystembox extends React.Component<MessageProps> {
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */

    render() {
        return <div></div>;
        /*return (<div className="message-system-box">
            <div className="message-system-box-title">
                {this.props.title}
            </div>
            <div className="message-system-box-date" >
                {this.props.sendTime}
            </div>
            <div className="message-system-box-content">
                {this.props.content}
            </div>
        </div>
        );*/
    }
}