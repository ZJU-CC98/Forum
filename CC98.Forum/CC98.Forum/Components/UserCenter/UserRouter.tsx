// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route
} from 'react-router-dom';
import { UserInfo } from '../../States/AppState';
import { UserExactProfile } from './UserExactProfile';
import { UserRouterActivities } from './UserRouterActivities';
import { UserCenterExactAvatar } from './UserCenterExactAvatar'
import * as Utility from '../../Utility';

export class UserRouter extends React.Component {
    render() {
        return (<div className="user-center-router">
            <Route path="/user/" component={UserExact} />
        </div>);
    }
}

class UserExact extends React.Component<null, UserCenterExactState> {

    async componentDidMount() {
        try {
            let myHeaders;
            if (Utility.isLogOn()) {
                myHeaders = {
                    'Authorization':  await Utility.getToken()
                };
            }

            let response: Response;
            if (!location.pathname.split('/')[2]) {
                return 0;
            }
            if (location.pathname.split('/')[2] === 'name') {
                response = await fetch(`http://apitest.niconi.cc/User/Name/${location.pathname.split('/')[3]}`, {
                    headers: myHeaders
                });
            } else {
                response = await fetch(`http://apitest.niconi.cc/User/${location.pathname.split('/')[2]}`, {
                    headers: myHeaders
                });
            }
            if (response.status !== 200) {
                throw {};
            }
            const data = await response.json();
            this.setState({
                userInfo: data,
                userAvatarImgURL: data.portraitUrl,
                responseState: response.status
            });
        } catch (e) {
            console.log('加载失败');
        }
    }

    render() {
        let element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (<div className="user-center-exact">
                <UserCenterExactAvatar userAvatarImgURL={this.state.userAvatarImgURL} />
                <UserExactProfile userInfo={this.state.userInfo} />
                <UserRouterActivities id={this.state.userInfo.id} />
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