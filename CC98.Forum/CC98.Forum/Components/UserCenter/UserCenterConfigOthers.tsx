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
        newInfo.CustomTitle = userInfo.customTitle;
        newInfo.EmailAddress = userInfo.emailAddress;
        newInfo.Gender = (userInfo.gender === 1) ? 1 : 0;
        newInfo.Introduction = userInfo.introduction;
        newInfo.QQ = userInfo.qq;
        newInfo.SignatureCode = userInfo.signatureCode;
        if (userInfo.birthday) {
            newInfo.birthdayYear = Number.parseInt(userInfo.birthday.slice(0, 4));
            newInfo.birthdayMouth = Number.parseInt(userInfo.birthday.slice(4, 6));
            newInfo.birthdayDay = Number.parseInt(userInfo.birthday.slice(6, 8));
        } else {
            newInfo.birthdayYear = 0;
            newInfo.birthdayMouth = 0;
            newInfo.birthdayDay = 0;
        }

        this.state = {
            userinfo: newInfo,
            isLoading: false,
            info: ""
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    handleGenderChange(value) {
        this.setState((prevState,props) => {
            return {
                userinfo: {
                    ...prevState.userinfo,
                    key: value
                }
            }
        });
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
                <select id="genderSelect" name="Gender" value={this.state.userinfo.Gender} onChange={(e) => { this.handleGenderChange(e.target.value) }}>
                    <option value={1}>男</option>
                    <option value={0}>女</option>
                </select>
            </div>
            <div className="config-birthday">
                <p>生日：</p>
                <p>年：</p><select id="birthdayYear">{yearsOption}</select>
                <p>月：</p><select id="birthdayMouth">{mouthsOption}</select>
                <p>日：</p><select id="birthdayDay">{daysOption}</select>
            </div>
            <div className="config-text">
                <p>QQ：</p>
                <input type="number" name="QQ" maxLength={20}></input>
            </div>
            <div className="config-text">
                <p>邮箱：</p>
                <input type="email" name="EmailAddress" maxLength={150}></input>
            </div>
            <div className="config-text">
                <p>自定义头衔：</p>
                <input type="text" name="CustomTitle" maxLength={50}></input>
            </div>
            <div className="config-introduction">
                <p>一句话介绍：</p>
                <input type="text" name="Introduction" maxLength={100}></input>
            </div>
            <div className="config-submit">
                <button type="button" disabled={this.state.isLoading}>保存信息</button>
                <p id="subminInfo">{this.state.info}</p>
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
    info: string;
}