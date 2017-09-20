// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export class Login extends React.Component<null, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    shake(element: HTMLElement) {
        element.classList.add('shake');
        setTimeout(() => { element.classList.remove('shake') }, 500);
        return element;
    }

    handleNameChange(e) {
        this.setState({
            loginName: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            loginPassword: e.target.value
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        if (!(this.state.loginName || this.state.loginPassword)) {
            this.setState({
                loginMessage: "请输入用户名和密码"
            });
            this.shake(document.getElementById('loginName')).focus();
            this.shake(document.getElementById('loginPassword'));
            return false;
        } else if (!this.state.loginName) {
            this.setState({
                loginMessage: "请输入用户名"
            });
            this.shake(document.getElementById('loginName')).focus();

            return false;
        } else if (!this.state.loginPassword) {
            this.setState({
                loginMessage: "请输入密码"
            });
            this.shake(document.getElementById('loginPassword')).focus();

            return false;
        }else {
            this.setState({
                loginMessage: "登陆中"
            });
        }
    }

    render() {
        return (
            <div className="login">
                <div>
                    <img src="/images/login.png" />
                    <div>
                        <img src="/images/login_welcome.png" />
                        <form onSubmit={this.handleLogin}>
                            <div className="login-form">
                                <p>用户名</p><input type="text" id="loginName" onChange={this.handleNameChange} value={this.state.loginName} />
                            </div>
                            <div className="login-form">
                                <p>密码</p><input type="password" id="loginPassword" onChange={this.handlePasswordChange} />
                            </div>
                            <p id="loginMessage">{this.state.loginMessage}</p>
                            <button type="submit">登陆账号</button>
                        </form>
                        <p><span>还没账号？我要 <a href="">注册</a></span></p>
                    </div>
                </div>
            </div>
            );
    }
}

/**
 * 登陆页状态
 */
class LoginState {
    /**
    * 用户名
    */
    loginName: string;
    /**
    * 密码
    */
    loginPassword: string;
    /**
    * 登陆信息
    */
    loginMessage: string;
}