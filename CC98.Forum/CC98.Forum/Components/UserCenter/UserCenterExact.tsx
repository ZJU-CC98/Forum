// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import { UserCenterExactProfile } from './UserCenterExactProfile';
import { UserCenterExactActivities } from './UserCenterExactActivities';
import { UserCenterExactAvatar } from './UserCenterExactAvatar'
import * as Utility from '../../Utility';

/**
 * 用户中心主页
 */
export class UserCenterExact extends React.Component<null, UserCenterExactState> {
    constructor(props) {
        super(props);

        const userInfo = Utility.getLocalStorage('userInfo');
        this.state = {
            userInfo: userInfo,
            userAvatarImgURL: userInfo.portraitUrl
        };
    }

    async componentDidMount() {
        try {
            const token = Utility.getLocalStorage('accessToken');

            let headers1 = new Headers();
            headers1.append("Authorization", token);
            let response1 = await fetch(`http://apitest.niconi.cc/user/${this.state.userInfo.id}`, {
                headers: headers1
            });
            let userInfo = await response1.json();
            Utility.setLocalStorage("userInfo", userInfo);
            this.setState({
                userInfo: userInfo,
                userAvatarImgURL: userInfo.portraitUrl
            });
        } catch (e) {
            console.log('用户中心错误');
        }
    }

    render() {        
        return (<div className="user-center-exact">
            <UserCenterExactAvatar userAvatarImgURL={this.state.userAvatarImgURL} />
            <UserCenterExactProfile userInfo={this.state.userInfo} />
            <UserCenterExactActivities />
        </div>);
    }
}

interface UserCenterExactState {
    /**
    * 用户信息
    */
    userInfo: UserInfo;
    /**
    * 用户头像链接地址
    */
    userAvatarImgURL: string;
}