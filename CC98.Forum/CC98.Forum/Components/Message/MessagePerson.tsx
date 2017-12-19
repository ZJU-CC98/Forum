// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessagePersonProps } from '../../Props/MessagePersonProps';
import { UbbContainer } from '../UbbContainer'

export class MessagePerson extends React.Component<MessagePersonProps> {
    
    render() {
        let data = this.props.data;
        if (!data.lastContent) {
            data.lastContent = '';
        }
        else if (!data.isRead) {
            data.lastContent = `[b]${data.lastContent}[/b]`;
        }

        return (<div className="message-message-person">
                <img className="message-message-pPortraitUrl" src={data.portraitUrl} />
                        <div className="message-message-pInfo">
                <div className="message-message-pName">{data.name}</div>
                <div className="message-message-pMessage"><UbbContainer code={data.lastContent} /></div>
                        </div>
                </div>);
    }
}