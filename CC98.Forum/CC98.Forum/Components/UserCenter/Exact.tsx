// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import ExactProfile from './ExactProfile';
import ExactActivities from './ExactActivities';
import ExactAvatar from './ExactAvatar';
import * as Utility from '../../Utility';
import { refreshCurrentUserInfo } from '../../AsyncActions/UserCenter';
import * as Actions from '../../Actions/UserCenter';
import { connect } from 'react-redux';

interface Props {
    /**
     * 当前用户信息
     */
    userInfo: UserInfo;
    /**
     * 刷新用户信息
     */
    refreshCurrentUserInfo: () => void;
    changePage: () => void;
}
/**
 * 用户中心主页
 */
class UserCenterExact extends React.Component<Props> {

    //组件加载时更新store与缓存中的状态
    componentDidMount() {
        this.props.changePage();
        this.props.refreshCurrentUserInfo();
    }

    render() {        
        return (<div className="user-center-exact">
            <ExactAvatar userInfo={this.props.userInfo} />
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
        refreshCurrentUserInfo: () => {
            dispatch(refreshCurrentUserInfo());
        },
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('profile'));
        }
    };
}

export default connect(mapState, mapDispatch)(UserCenterExact);