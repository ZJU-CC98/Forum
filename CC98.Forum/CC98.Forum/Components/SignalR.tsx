import SignalR from '../SignalR';
import * as React from 'react';

export class SignalRComponent extends React.Component<null, { name, message }> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        SignalR.sendMessage(this.state.name, this.state.message);
    }

    render() {
        return <div>
            <p>methodname: </p><input type="text" id="methodName" onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
            <p>message?: </p><input type="text" id="methodMessage" onChange={e => this.setState({ message: e.target.value })} value={this.state.message}/>
            <button type="button" onClick={this.handleSubmit}>submit</button>
        </div>
    }
}