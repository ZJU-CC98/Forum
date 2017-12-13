import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserCenterNavigation } from './UserCenterNavigation';
import { UserCenterRouter } from './UserCenterRouter';
import { LogOut } from '../Status';

/**
 * 用户中心页面
 */
export class UserCenterBeforeConnect extends React.Component<{ isLogOn }> {
    render() {
        if (!this.props.isLogOn) {
            return <LogOut />;
        }
        return (
            <div className="user-center">
                <div className="user-center-content">
                    <div className="user-center-head">
                        <p>个人中心</p>
                    </div>
                    <div className="user-center-body">
                        <UserCenterNavigation />
                        <UserCenterRouter />
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * 将store中的isLogOn属性映射到UserCenterBeforeConnect的props的isLogOn
 * @param state
 */
function mapState(state) {
    return {
        isLogOn: state.userInfo.isLogOn
    };
}
/**
 * 连接UserCenterBeforeConnect与store，默认导出UserCenter替换掉原来的导出
 */
export const UserCenter = connect(mapState, null)(UserCenterBeforeConnect);