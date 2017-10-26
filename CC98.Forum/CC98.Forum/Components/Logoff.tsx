// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export class LogOff extends React.Component<null, LogOffState> {
    constructor(props) {
        super(props);

        this.state = {
            logOffInfo: '登出中'
        };
    }

    componentDidMount() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');

        this.setState({
            logOffInfo: '登出成功 正在前往登录页'
        });

        setTimeout(() => {
            location.pathname = "/logon";
        },2000);        
    }

    render() {
        return (
            <div className="login">
                <div>
                    <img src="/images/login.png" />
                    <div>
                        <p className="LogOffInfo">{this.state.logOffInfo}</p>
                    </div>
                </div>
            </div>
        );
    }
}

interface LogOffState {
    logOffInfo: string;
}