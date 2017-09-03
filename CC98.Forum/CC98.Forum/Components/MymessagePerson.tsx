// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MymessagePersonProps } from '../Props/MymessagePersonProps';

export class MymessagePerson extends React.Component<MymessagePersonProps> {
    
    render() {
        return (<div className='mymessage-message-person'>
            <img className='mymessage-message-pPortraitUrl' src={this.props.portraitUrl} />
            <div className='mymessage-message-pInfo'>
                <div className='mymessage-message-pName'>{this.props.name}</div>
                <div className='mymessage-message-pMessage'>[{this.props.title}]{this.props.content}</div>
                     </div>
                </div>);
    }
}