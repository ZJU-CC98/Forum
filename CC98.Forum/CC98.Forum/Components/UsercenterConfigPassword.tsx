// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export class UserCenterConfigPassword extends React.Component {
    render() {
        return (<div className="user-center-config-password">
            <p>修改密码</p>
            <div className="password-inputs">
                <p>原密码</p><input type="password" id="oldPassword"></input>
                <p>新密码</p><input type="password" id="newPassword"></input>
                <p>确认密码</p><input type="password" id="confirmPassword"></input>
                <button type="button">提交密码</button>
            </div>
            <p id="passwordChangeMesssage"></p>
        </div>);
    }
}