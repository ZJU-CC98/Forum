// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MymessageProps } from '../Props/MymessageProps';

export class MymessageSystembox extends React.Component<MymessageProps> {
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */

    render() {
        return (<div className='mymessage-system-box'>
            <div className='mymessage-system-box-title'>
                {this.props.title}
            </div>
            <div className='mymessage-system-box-date' >
                {this.props.sendTime}
            </div>
            <div className="mymessage-system-box-content">
                {this.props.content}
            </div>
        </div>
        );
    }
}