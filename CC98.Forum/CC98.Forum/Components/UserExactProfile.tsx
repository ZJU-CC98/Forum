// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../States/AppState';
import { UbbContainer } from './UbbContainer';
import * as Utility from '../Utility';

/**
 * 用户中心主页个人资料组件
 */
export class UserExactProfile extends React.Component<UserExactProfileProps, UserExactProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: false,
            buttonIsDisabled: false,
            buttonInfo: '关注'
        }
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    async follow() {        
        const token = Utility.getLocalStorage("accessToken");
        if (!token) {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '请先登录'
            });
            return;
        }

        const userId = this.props.userInfo.id;
        const url = `http://apitest.niconi.cc/user/follow/${userId}`;
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        });
        if (res.status === 200) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取消关注',
                isFollowing: true
            });
        } else {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }

    async unfollow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '取关中'
        });
        const token = Utility.getLocalStorage("accessToken");
        const userId = this.props.userInfo.id;
        const url = `http://apitest.niconi.cc/user/unfollow/${userId}`;

        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        if (res.status === 200) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '重新关注',
                isFollowing: false
            });
        } else {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    render() {
        return (
            <div className="user-profile">
                <div id="userId">
                    <p>{this.props.userInfo.name}</p>
                    <button type="button">私信</button>
                    <button type="button" onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>
                </div>
                <div id="userGenderAndBirthday">
                    <p>性别  {(this.props.userInfo.gender === 1) ? '男' : '女'} </p>
                    {this.props.userInfo.birthday === null ? '' : <p>生日  {this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T'))}</p>}
                </div>
                {this.props.userInfo.personalDescription ?
                    <div className="user-description">
                        <p>个人说明</p>
                        <img src={this.props.userInfo.photourl} />
                        <p>{this.props.userInfo.personalDescription}</p>
                    </div> : null
                }
                {this.props.userInfo.signatureCode ?
                    <div className="user-description">
                        <p>个性签名</p>
                        <UbbContainer code={this.props.userInfo.signatureCode} />
                    </div> : null
                }
            </div>
        );
    }
}

interface UserExactProfileProps {
    userInfo: UserInfo
}

interface UserExactProfileState {
    isFollowing: boolean;
    buttonIsDisabled: boolean;
    buttonInfo: string;
}