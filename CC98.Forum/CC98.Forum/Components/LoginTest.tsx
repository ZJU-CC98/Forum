import * as React from 'react'; import * as State from '../States/AppState';
import * as Utility from '../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { match } from "react-router";

export class LoginTest extends React.Component<null, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    async login() {
        let url = 'http://openid.cc98.org/connect/token';

        /*
        请求的正文部分，密码模式需要5个参数，其中client_id和client_secret来自申请的应用，grant_type值固定为"password"
        */
        const requestBody = {
            'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
            'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
            'grant_type': 'password',
            'username': this.state.loginName,
            'password': this.state.loginPassword
        }

        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',//在fetch API里这不是默认值，需要手动添加
            },
            body: $.param(requestBody)

        });
        let data = await response.json();
        console.log(data);
    } catch(e) {    //捕捉到例外，开始执行catch语句，否则跳过
        alert(e.error);     //这行好像没什么用……暂时还不会处理不同的error……
        console.log("Oops, error", e);
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
                loginMessage: '请输入用户名和密码'
            });
            this.shake(document.getElementById('loginName')).focus();
            this.shake(document.getElementById('loginPassword'));
            return false;
        } else if (!this.state.loginName) {
            this.setState({
                loginMessage: '请输入用户名'
            });
            this.shake(document.getElementById('loginName')).focus();

            return false;
        } else if (!this.state.loginPassword) {
            this.setState({
                loginMessage: '请输入密码'
            });
            this.shake(document.getElementById('loginPassword')).focus();

            return false;
        } else {
            this.setState({
                loginMessage: '登陆中'
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
                            <button type="submit" onClick={this.login.bind(this)}>登陆账号</button>
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