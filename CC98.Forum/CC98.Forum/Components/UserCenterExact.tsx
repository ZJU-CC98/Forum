// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../States/AppState';
import { UserCenterExactProfile } from './UserCenterExactProfile';
import { UserCenterExactActivities } from './UserCenterExactActivities';
import { UserCenterExactAvatar } from './UserCenterExactAvatar'
import * as Utility from '../Utility';

/**
 * 用户中心主页
 */
export class UserCenterExact extends React.Component<null, UserCenterExactState> {

    async componentDidMount() {
        let userInfo = Utility.getLocalStorage('userInfo');

        console.log(userInfo);

        this.setState({
            userInfo: userInfo,
            userAvatarImgURL: userInfo.portraitUrl
        });
    }

    render() {
        let element;
        if (this.state !== null) {
            element = (<div className="user-center-exact">
                <UserCenterExactAvatar userAvatarImgURL={this.state.userAvatarImgURL} />
                <UserCenterExactProfile userInfo={this.state.userInfo} />
                <UserCenterExactActivities />
            </div>);
        } else {
            element = <p>加载中</p>;
        }
        return element;
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
    /**
    * 加载状态
    */
    responseState: number;
}