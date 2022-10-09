// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { ChangeUserInfo, UserInfo } from '../../States/AppState';
import * as Actions from '../../Actions/UserCenter';
import ConfigAvatar from './ConfigAvatar';
import ConfigSignature from './ConfigSignature';
import ConfigOthers from './ConfigOthers';
import { connect } from 'react-redux';
import { refreshCurrentUserInfo } from '../../AsyncActions/UserCenter';

interface Props {
    /**
     * store中的信息
     */
    userInfo: UserInfo;
    /** 
     * 刷新store中的状态
     */
    refreshUserInfo: () => void;
    changePage: () => void;
}
interface States {
    /**
     * 当前可修改的用户信息
     * 以修改API所需的参数表示
     */
    userInfo: Info;
    /**
     * 修改后的提示信息
     */
    info: string;
    /**
     * 是否在加载过程中
     * 防止多次提交
     */
    isLoading: boolean;
}

/**
 * 扩展一下修改用户所需信息API类
 * ChangeUserInfo是API需要的参数
 * 新增的属性用来方便的传递参数
 * API并不需要
 */
class Info extends ChangeUserInfo {
    /**
     * 用户出生年份
     * 0表示未填
     * 9999表示保密
     */
    birthdayYear: number;
    /**
     * 用户出生月份
     */
    birthdayMonth: number;
    /**
     * 用户出生日期
     */
    birthdayDay: number;
    /**
     * 用户当前可选的头衔id们
     */
    userTitleIds: number[];
}

/**
 * 用户中心页
 * 修改个人信息组件
 */
class Config extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        props.changePage();
        //由于修改API和获取API中的参数名不一致
        //统一转换为修改API所需的类型
        let myInfo: Info = {
            EmailAddress: props.userInfo.emailAddress,
            Gender: props.userInfo.gender,
            Introduction: props.userInfo.introduction,
            QQ: props.userInfo.qq,
            SignatureCode: props.userInfo.signatureCode,
            Birthday: props.userInfo.birthday,
            birthdayYear: props.userInfo.birthday ? Number.parseInt(props.userInfo.birthday.slice(0, 4)): 0,
            birthdayMonth: props.userInfo.birthday ? Number.parseInt(props.userInfo.birthday.slice(5, 7)): 0,
            birthdayDay: props.userInfo.birthday ? Number.parseInt(props.userInfo.birthday.slice(8, 10)) : 0,
            DisplayTitleId: props.userInfo.displayTitleId || 0,
            userTitleIds: props.userInfo.userTitleIds || []
        };
        this.state = {
            userInfo: myInfo,
            info: '',
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    /**
     * 重置个人信息
     * 点击重置按钮后触发
     */
    handleReset() {
        let info: UserInfo = this.props.userInfo;
        let userInfo: Info = {
            EmailAddress: info.emailAddress,
            Gender: info.gender,
            Introduction: info.introduction,
            QQ: info.qq,
            SignatureCode: info.signatureCode,
            Birthday: info.birthday,
            birthdayYear: info.birthday ? Number.parseInt(info.birthday.slice(0, 4)) : 0,
            birthdayMonth: info.birthday ? Number.parseInt(info.birthday.slice(5, 7)) : 0,
            birthdayDay: info.birthday ? Number.parseInt(info.birthday.slice(8, 10)) : 0,
            DisplayTitleId: info.displayTitleId,
            userTitleIds: info.userTitleIds|| []
        };
        this.setState({
            userInfo
        });
    }

    /**
     * 处理子组件提交的信息
     * @param key 要修改的属性名
     * @param value 修改后的新值
     */
    handleChange(key, value) {
        this.setState((prevState) =>({
            userInfo: {
                ...prevState.userInfo,
                [key]: value
            }
        }));
    }

    /**
     * 提交修改
     */
    async handleSubmit() {
        //禁用掉按钮，开始修改
        this.setState({
            isLoading: true,
            info: '修改中'
        });
        try {
            let newInfo: ChangeUserInfo = this.state.userInfo;
            //生日年月日分开处理，提交时合并
            newInfo.Birthday = this.state.userInfo.birthdayYear !== 0 ? `${this.state.userInfo.birthdayYear}-${this.state.userInfo.birthdayMonth}-${this.state.userInfo.birthdayDay}` : '';
            
            //检测信息是否正确
            if (newInfo.EmailAddress && !newInfo.EmailAddress.match(/[\S]+@[\S]+\.[\S]+/)) {
                throw new Error('请检查邮箱地址');
            }
            if (newInfo.QQ && (Number.parseInt(newInfo.QQ) <= 0 || Number.parseInt(newInfo.QQ).toString() !== newInfo.QQ)) {
                throw new Error('请检查QQ是否正确');
            }
            let birthDay = new Date(this.state.userInfo.birthdayYear + 10, this.state.userInfo.birthdayMonth - 1, this.state.userInfo.birthdayDay);
            if (this.state.userInfo.birthdayYear !== 0 && this.state.userInfo.birthdayYear!==9999 && birthDay.getTime() > Date.now()) {
                throw new Error('请检查生日是否正确');
            }

            const token = await Utility.getToken();
            const url = `/me`;

            let myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            myHeaders.append('Content-Type', 'application/json');
            let res = await Utility.cc98Fetch(url, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(newInfo)
            });

            if (res.status === 200) {
                //修改成功后刷新用户信息
                this.props.refreshUserInfo();
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
        return (
            <div className="user-center-config">
                <ConfigAvatar />
                <hr />
                <ConfigSignature signature={this.state.userInfo.SignatureCode} onchange={this.handleChange}/>
                <hr />
                <ConfigOthers userinfo={this.state.userInfo} handleChange={this.handleChange} />
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

function mapState(state){
    return {
        userInfo: state.userInfo.currentUserInfo
    };
}

function mapDispatch(dispatch) {
	return {
		refreshUserInfo: () => {
			dispatch(refreshCurrentUserInfo());
        },
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('config'));
        }
	};
}

export default connect(mapState, mapDispatch)(Config);