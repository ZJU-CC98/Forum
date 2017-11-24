// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import { UbbContainer } from '../UbbContainer';
import * as Utility from '../../Utility';

/**
 * 用户中心主页个人资料组件
 */
export class UserExactProfile extends React.Component<UserExactProfileProps, UserExactProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: this.props.userInfo.isFollowing,
            buttonIsDisabled: false,
            buttonInfo: this.props.userInfo.isFollowing ? '取消关注' :'关注'
        }
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    async follow() {
        try {
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
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'POST',
                headers
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '取消关注',
                    isFollowing: true
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }
    getPrivilegeColor() {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    }
    async unfollow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '取关中'
        });
        let state = await Utility.unfollowUser(Number.parseInt(this.props.userInfo.id));

        if (state === true) {
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
                    <div id="userId"><p>{this.props.userInfo.name}      <span style={{ fontSize: '12px', color: this.getPrivilegeColor() }}>{this.props.userInfo.privilege}</span></p>
                    <button type="button" onClick={() => { location.href = `/message/message?id=${this.props.userInfo.id}`; }}>私信</button>
                    <button type="button" id={this.state.isFollowing ? 'unfollow' : ''} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button></div>
                </div>
                <div id="userGenderAndBirthday">
                    <p>性别：  {(this.props.userInfo.gender === 1) ? '男' : '女'} </p>
                    {this.props.userInfo.birthday === null ? null : <p>生日：  {this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T'))}</p>}
                    {this.props.userInfo.emailAddress ? <p>邮箱：  {this.props.userInfo.emailAddress}</p> : null}
                    {this.props.userInfo.qq ? <p>QQ：  {this.props.userInfo.qq}</p> : null}
                    {this.props.userInfo.postCount ? <p>发帖数：  {this.props.userInfo.postCount}</p> : null}
                    {this.props.userInfo.prestige ? <p>威望：  {this.props.userInfo.prestige}</p> : null}
                    {this.props.userInfo.displayTitle ? <p>用户组：  {this.props.userInfo.displayTitle}</p> : null}
                    {this.props.userInfo.registerTime ? <p>注册时间：  {this.props.userInfo.registerTime.replace('T', ' ')}</p> : null}
                    {this.props.userInfo.lastLogOnTime ? <p>最后登录时间：  {this.props.userInfo.lastLogOnTime.replace('T', ' ')}</p> : null}
                </div>
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