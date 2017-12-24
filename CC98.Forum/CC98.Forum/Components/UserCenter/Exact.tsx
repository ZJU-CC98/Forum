// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import ExactProfile from './ExactProfile';
import ExactActivities from './ExactActivities';
import ExactAvatar from './ExactAvatar'
import * as Utility from '../../Utility';
import { changeUserInfo } from '../../Actions';
import { connect } from 'react-redux';

/**
 * 用户中心主页
 */
class UserCenterExact extends React.Component<{userInfo, changeUserInfo}> {


    //组件加载时更新store与缓存中的状态
    async componentDidMount() {
        try {
            const token = await Utility.getToken();

            let headers = new Headers();
            headers.append("Authorization", token);
            let response1 = await Utility.cc98Fetch(`/me`, {
                headers
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
            <ExactAvatar userAvatarImgURL={this.props.userInfo.portraitUrl} />
            <ExactProfile userInfo={this.props.userInfo} />
            <ExactActivities />
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