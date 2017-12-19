import SignalR from '../SignalR';
import * as React from 'react';

export class SignalRComponent extends React.Component<null, { name }> {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        SignalR.sendMessage(this.state.name);
    }

    render() {
        return <div>
            <p>methodname: </p><input type="text" id="methodName" onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
            <button type="button" onClick={this.handleSubmit}>submit</button>
        </div>
    }
}