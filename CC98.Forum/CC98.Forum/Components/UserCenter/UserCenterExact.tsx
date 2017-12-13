// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import { UserCenterExactProfile } from './UserCenterExactProfile';
import { UserCenterExactActivities } from './UserCenterExactActivities';
import { UserCenterExactAvatar } from './UserCenterExactAvatar'
import * as Utility from '../../Utility';
import { changeUserInfo } from '../../Actions';
import { connect } from 'react-redux';

/**
 * 用户中心主页
 */
class UserCenterExact extends React.Component<{userInfo, changeUserInfo}> {

    async componentDidMount() {
        try {
            const token = await Utility.getToken();

            let headers1 = new Headers();
            headers1.append("Authorization", token);
            let response1 = await fetch(`http://apitest.niconi.cc/user/${this.props.userInfo.id}`, {
                headers: headers1
            });
            let userInfo = await response1.json();
            Utility.setLocalStorage("userInfo", userInfo);
            this.props.changeUserInfo(userInfo);
        } catch (e) {
            console.log('用户中心错误');
        }
    }

    render() {        
        return (<div className="user-center-exact">
            <UserCenterExactAvatar userAvatarImgURL={this.props.userInfo.portraitUrl} />
            <UserCenterExactProfile userInfo={this.props.userInfo} />
            <UserCenterExactActivities />
        </div>);
    }
}

function mapState(state) {
    return {
        userInfo: state.userInfo.currentUserInfo
    };
}

function mapDispatch(dispatch) {
    return {
        changeUserInfo: (newInfo) => {
            dispatch(changeUserInfo(newInfo));
        }
    };
}

export default connect(mapState, mapDispatch)(UserCenterExact);