// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { ChangeUserInfo } from '../../States/AppState';

import UserCenterConfigAvatar from './UserCenterConfigAvatar';
import { UserCenterConfigSignature } from './UserCenterConfigSignature';
import { UserCenterConfigPassword } from './UserCenterConfigPassword';
import { UserCenterConfigOthers } from './UserCenterConfigOthers';

export class UserCenterConfig extends React.Component<null, UserCenterConfigState> {
    constructor(props) {
        super(props);
        let info = Utility.getLocalStorage('userInfo');
        let myInfo: UserInfo = {
            EmailAddress: info.emailAddress,
            Gender: info.gender,
            Introduction: info.introduction,
            QQ: info.qq,
            SignatureCode: info.signatureCode,
            Birthday: info.birthday,
            birthdayYear: info.birthday ? Number.parseInt(info.birthday.slice(0, 4)): 0,
            birthdayMouth: info.birthday ? Number.parseInt(info.birthday.slice(5, 7)): 0,
            birthdayDay: info.birthday ? Number.parseInt(info.birthday.slice(8, 10)): 0
        };
        this.state = {
            userInfo: myInfo,
            info: '',
            isLoading: false
        };
        this.handleSignatureChange = this.handleSignatureChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset() {
        let info = Utility.getLocalStorage('userInfo');
        let userInfo: UserInfo = {
            EmailAddress: info.emailAddress,
            Gender: info.gender,
            Introduction: info.introduction,
            QQ: info.qq,
            SignatureCode: info.signatureCode,
            Birthday: info.birthday,
            birthdayYear: info.birthday ? Number.parseInt(info.birthday.slice(0, 4)) : 0,
            birthdayMouth: info.birthday ? Number.parseInt(info.birthday.slice(5, 7)) : 0,
            birthdayDay: info.birthday ? Number.parseInt(info.birthday.slice(8, 10)) : 0
        };
        this.setState({
            userInfo
        });
    }

    handleSignatureChange(str: string) {
        this.setState((prevState) => ({
            userInfo: {
                ...prevState.userInfo,
                SignatureCode: str
            }
        }));
    }

    handleChange(key, value) {
        this.setState((prevState) =>({
            userInfo: {
                ...prevState.userInfo,
                [key]: value
            }
        }));
    }

    async handleSubmit() {
        this.setState({
            isLoading: true,
            info: '修改中'
        });
        try {
            let newInfo: ChangeUserInfo = {
                Birthday: this.state.userInfo.birthdayYear !== 0 ? `${this.state.userInfo.birthdayYear}-${this.state.userInfo.birthdayMouth}-${this.state.userInfo.birthdayDay}` : '',
                EmailAddress: this.state.userInfo.EmailAddress,
                Gender: this.state.userInfo.Gender,
                Introduction: this.state.userInfo.Introduction,
                QQ: this.state.userInfo.QQ,
                SignatureCode: this.state.userInfo.SignatureCode
            };

            if (newInfo.EmailAddress && !newInfo.EmailAddress.match(/[\S]+@[\S]+\.[\S]+/)) {
                throw new Error('请检查邮箱地址');
            }
            if (newInfo.QQ && (Number.parseInt(newInfo.QQ) <= 0 || Number.parseInt(newInfo.QQ).toString() !== newInfo.QQ)) {
                throw new Error('请检查QQ是否正确');
            }

            const token = await Utility.getToken();
            const url = `http://apitest.niconi.cc/me`;

            let myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            myHeaders.append('Content-Type', 'application/json');
            let res = await fetch(url, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(newInfo)
            });

            if (res.status === 200) {
                let headers1 = new Headers();
                headers1.append("Authorization", token);
                let response1 = await fetch(`http://apitest.niconi.cc/user/${Utility.getLocalStorage('userInfo').id}`, {
                    headers: headers1
                });
                let userInfo = await response1.json();
                Utility.setLocalStorage("userInfo", userInfo);
                Utility.setLocalStorage(`userId_${userInfo.id}`, userInfo, 3600);
                Utility.setLocalStorage(`userName_${userInfo.name}`, userInfo, 3600);
                this.setState({
                    info: '修改成功',
                    isLoading: false
                });
                setTimeout((() => {
                    this.setState({
                        info: ''
                    });
                }), 1000);
            } else {
                throw new Error(res.status.toString());
            }
        } catch (e) {
            this.setState({
                info: e.message,
                isLoading: false
            });
        }
    }

    render() {
        return (<div className="user-center-config">
            <UserCenterConfigAvatar />
            <hr />
            <UserCenterConfigSignature signature={this.state.userInfo.SignatureCode} onchange={this.handleSignatureChange}/>
            <hr />
            <UserCenterConfigOthers userinfo={this.state.userInfo} handleChange={this.handleChange} />
            <hr />
            <div className="config-submit">
                <h2>提交修改</h2>
                <div className="config-buttons">
                    <button className="config-submit-button" type="button" disabled={this.state.isLoading} onClick={this.handleSubmit}>提交</button>
                    <button type="button" onClick={this.handleReset}>重置</button>
                </div>
                <p style={{height: this.state.info === '' ? '0' : '1rem', color: 'red' }}>{this.state.info}</p>
            </div>
        </div>);
    }
}

interface UserCenterConfigState {
    userInfo: UserInfo;
    info: string;
    isLoading: boolean;
}

class UserInfo extends ChangeUserInfo {
    birthdayYear: number;
    birthdayMouth: number;
    birthdayDay: number;
}