// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { ChangeUserInfo } from '../../states/AppState';
import * as Utility from '../../Utility';

export class UserCenterConfigOthers extends React.Component<null, UserCenterConfigOthersState> {
    constructor(props) {
        super(props);

        const userInfo = Utility.getLocalStorage('userInfo');
        let newInfo = new Userinfo();
        newInfo.EmailAddress = userInfo.emailAddress;
        newInfo.Gender = (userInfo.gender === 1) ? 1 : 0;
        newInfo.Introduction = userInfo.introduction;
        newInfo.QQ = userInfo.qq;
        newInfo.SignatureCode = userInfo.signatureCode;
        if (userInfo.birthday) {
            newInfo.birthdayYear = Number.parseInt(userInfo.birthday.slice(0, 4));
            newInfo.birthdayMouth = Number.parseInt(userInfo.birthday.slice(5, 7));
            newInfo.birthdayDay = Number.parseInt(userInfo.birthday.slice(8, 10));
        } else {
            newInfo.birthdayYear = 0;
            newInfo.birthdayMouth = 0;
            newInfo.birthdayDay = 0;
        }

        this.state = {
            userinfo: newInfo,
            isLoading: false,
            info: "",
            selectDisabled: newInfo.birthdayYear === 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(key,value) {
        this.setState((prevState) => {
            if (key === 'birthdayYear') {
                return {
                    userinfo: {
                        ...prevState.userinfo,
                        [key]: value
                    },
                    selectDisabled: value === 0
                }                
            }
            return {
                userinfo: {
                    ...prevState.userinfo,
                    [key]: value
                }
            }
        });
    }

    async handleSubmit() {
        this.setState({
            isLoading: true,
            info: '修改中'
        });
        try {
            let newInfo = new ChangeUserInfo();
            newInfo.Birthday = this.state.userinfo.birthdayYear !== 0 ? `${this.state.userinfo.birthdayYear}-${this.state.userinfo.birthdayMouth}-${this.state.userinfo.birthdayDay}` : '';
            newInfo.EmailAddress = this.state.userinfo.EmailAddress;
            newInfo.Gender = this.state.userinfo.Gender;
            newInfo.Introduction = this.state.userinfo.Introduction;
            newInfo.QQ = this.state.userinfo.QQ;
            newInfo.SignatureCode = this.state.userinfo.SignatureCode;

            const token = Utility.getLocalStorage('accessToken');
            const url = `http://apitest.niconi.cc/user`;

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
                this.setState({
                    info: '修改成功',
                    isLoading: false
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                info: '修改失败',
                isLoading: false
            });
        }
    }

    render() {
        let array = [], i = 0;

        //年
        i = 100;
        while (i--) {
            array.unshift(i+1920);
        }
        let yearsOption = array.map((item) => (<option value={item}>{item}</option>));
        yearsOption.unshift(<option value={9999}>保密</option>);
        yearsOption.unshift(<option value={0}>未选择</option>);
        array = [];

        //月
        i = 12;
        while (i--) {
            array.unshift(i+1);
        }
        let mouthsOption = array.map((item) => (<option value={item}>{item}</option>));
        mouthsOption.unshift(<option value={0}>未选择</option>);
        array = [];

        //日
        i = 31;
        while (i--) {
            array.unshift(i+1);
        }
        let daysOption = array.map((item) => (<option value={item}>{item}</option>));
        daysOption.unshift(<option value={0}>未选择</option>);

        return (<div className="user-center-config-others">
            <h2>其他设置</h2>
            <div className="config-gender">
                <p>性别：</p>
                <select id="genderSelect" name="Gender" value={this.state.userinfo.Gender} onChange={(e) => { this.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>
                    <option value={1}>男</option>
                    <option value={0}>女</option>
                </select>
            </div>
            <div className="config-birthday">
                <p>生日：</p>
                <select id="birthdayYear" name="birthdayYear" value={this.state.userinfo.birthdayYear} onChange={(e) => { this.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{yearsOption}</select><p>年</p>
                <select id="birthdayMouth" name="birthdayMouth" value={this.state.userinfo.birthdayMouth} disabled={this.state.selectDisabled} onChange={(e) => { this.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{mouthsOption}</select><p>月</p>
                <select id="birthdayDay" name="birthdayDay" value={this.state.userinfo.birthdayDay} disabled={this.state.selectDisabled} onChange={(e) => { this.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{daysOption}</select><p>日</p>
            </div>
            <div className="config-text">
                <p>QQ：</p>
                <input type="number" name="QQ" value={this.state.userinfo.QQ} maxLength={20} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}></input>
            </div>
            <div className="config-text">
                <p>邮箱：</p>
                <input type="email" name="EmailAddress" value={this.state.userinfo.EmailAddress} maxLength={150} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}></input>
            </div>
            <div className="config-introduction">
                <p>一句话介绍：</p>
                <input type="text" name="Introduction" value={this.state.userinfo.Introduction} maxLength={100} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}></input>
            </div>
            <div className="config-submit">
                <p id="subminInfo">{this.state.info}</p>
                <button type="button" disabled={this.state.isLoading} onClick={this.handleSubmit}>保存信息</button>
            </div>
        </div>);
    }
}

class Userinfo extends ChangeUserInfo {
    birthdayYear: number;
    birthdayMouth: number;
    birthdayDay: number;
}

interface UserCenterConfigOthersState {
    userinfo: Userinfo
    isLoading: boolean;
    selectDisabled: boolean;
    info: string;
}