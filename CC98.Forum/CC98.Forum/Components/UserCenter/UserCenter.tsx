import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import UserCenterRouter from './Router';
import { LogOut } from '../Status';

/**
 * 用户中心页面
 */
class UserCenterBeforeConnect extends React.Component<{ isLogOn }> {
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
                        <Navigation />
                        <UserCenterRouter />
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * 将store中的isLogOn属性映射到UserCenterBeforeConnect的props的isLogOn
 * @param state store
 */
function mapState(state) {
    return {
        isLogOn: state.userInfo.isLogOn
    };
}
/**
 * 连接UserCenterBeforeConnect与store，默认导出UserCenter替换掉原来的导出
 */
export default connect(mapState, null)(UserCenterBeforeConnect);