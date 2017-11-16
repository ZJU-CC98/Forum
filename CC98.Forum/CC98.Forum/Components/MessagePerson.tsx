// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessagePersonProps } from '../Props/MessagePersonProps';

export class MessagePerson extends React.Component<MessagePersonProps> {
    
    render() {
        return (<div className="message-message-person">
            <img className="message-message-pPortraitUrl" src={this.props.portraitUrl} />
            <div className="message-message-pInfo">
                <div className="message-message-pName">{this.props.name}</div>
                <div className="message-message-pMessage">[{this.props.title}]{this.props.content}</div>
                     </div>
                </div>);
    }
}