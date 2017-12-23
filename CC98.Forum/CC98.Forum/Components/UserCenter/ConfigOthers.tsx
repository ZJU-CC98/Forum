// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { ChangeUserInfo } from '../../states/AppState';
import * as Utility from '../../Utility';

export default class extends React.Component<{ userinfo: UserInfo, handleChange: Function }, State> {
    constructor(props) {
        super(props);
        this.state = {
            displayTitles: []
        };
    }
    async componentDidMount() {
        try {
            const url = '/config/global/all-user-title';
            let res = await Utility.cc98Fetch(url);
            let data = await res.json();
            this.setState({
                displayTitles: data
            });
        } catch (e) {

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
                <select id="genderSelect" name="Gender" value={this.props.userinfo.Gender} onChange={(e) => { this.props.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>
                    <option value={1}>男</option>
                    <option value={0}>女</option>
                </select>
            </div>
            <div className="config-birthday">
                <p>生日：</p>
                <select id="birthdayYear" name="birthdayYear" value={this.props.userinfo.birthdayYear} onChange={(e) => { this.props.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{yearsOption}</select><p>年</p>
                <select id="birthdayMouth" name="birthdayMouth" value={this.props.userinfo.birthdayMouth} disabled={this.props.userinfo.birthdayYear === 0} onChange={(e) => { this.props.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{mouthsOption}</select><p>月</p>
                <select id="birthdayDay" name="birthdayDay" value={this.props.userinfo.birthdayDay} disabled={this.props.userinfo.birthdayYear === 0} onChange={(e) => { this.props.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>{daysOption}</select><p>日</p>
            </div>
            {this.state.displayTitles.length > 0 ?
                <div className="config-gender">
                    <p>头衔：</p>
                    <select style={{width: 'auto'}} name="DisplayTitleId" value={this.props.userinfo.DisplayTitleId} onChange={(e) => { this.props.handleChange(e.target.name, Number.parseInt(e.target.value)) }}>
                        <option value={0}>不显示</option>
                        {this.props.userinfo.userTitleIds.map(item => {
                            let title = this.state.displayTitles.filter(title => title.id === item);
                            if (title.length > 0) {
                                return <option value={item}>{title[0].name}</option>
                            }
                        })}
                    </select>
                </div> : null
            }
            <div className="config-text">
                <p>QQ：</p>
                <input type="text" name="QQ" value={this.props.userinfo.QQ} maxLength={20} onChange={(e) => { this.props.handleChange(e.target.name, e.target.value) }}></input>
            </div>
            <div className="config-text">
                <p>邮箱：</p>
                <input type="email" name="EmailAddress" value={this.props.userinfo.EmailAddress} maxLength={150} onChange={(e) => { this.props.handleChange(e.target.name, e.target.value) }}></input>
            </div>
            <div className="config-introduction">
                <p>个人简介：</p>
                <div>
                    <textarea name="Introduction" value={this.props.userinfo.Introduction} maxLength={100} onChange={(e) => { this.props.handleChange(e.target.name, e.target.value) }}></textarea>
                    <p>*不超过100字</p>
                </div>
            </div>
        </div>);
    }
}

class UserInfo extends ChangeUserInfo {
    birthdayYear: number;
    birthdayMouth: number;
    birthdayDay: number;
    userTitleIds: number[];
}

class State {
    displayTitles: DispalyTitle[]
}

class DispalyTitle {
    id: number;
    name: string;
}