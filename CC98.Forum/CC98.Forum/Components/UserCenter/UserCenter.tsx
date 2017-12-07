import * as React from 'react';
import { connect } from 'react-redux';
import { throwError } from '../../Actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserCenterNavigation } from './UserCenterNavigation';
import { UserCenterRouter } from './UserCenterRouter';

/**
 * 用户中心页面
 */
export class UserCenterBeforeConnect extends React.Component<{ isLogOn, throwError }> {
    render() {
        if (!this.props.isLogOn) {
            this.props.throwError('LogOut');
            return <div></div>;
        }
        return (
            <div className="user-center">
                <div className="user-center-content">
                    <div className="user-center-head">
                        <p>个人中心</p>
                    </div>
                    <Router>
                        <div className="user-center-body">
                            <UserCenterNavigation />
                            <UserCenterRouter />
                        </div>
                    </Router>
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
 * 把dispatch(throwError(errorMessage))赋给props中的throwError
 * 其中throwError(errorMessage)是action的构造函数
 * 用类方法定义的action我就不知道怎么dispatch了
 * @param dispatch
 */
function mapDispatch(dispatch) {
    return {
        throwError: (errorMessage) => {
            dispatch(throwError(errorMessage));
        }
    };
}
/**
 * 连接UserCenterBeforeConnect与store，默认导出UserCenter替换掉原来的导出
 */
export const UserCenter = connect(mapState, mapDispatch)(UserCenterBeforeConnect);