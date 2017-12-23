import * as React from 'react';
import {
    Link,
    withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
/**
 * 用户详情页
 * 导航栏组件
 */
class UserNavigationBeforeConnect extends React.Component<{ isManager, currentVisitingUserPage , id }> {
    render() {
        return (<div className="user-center-navigation" id="userCenterNavigation">
            <ul>
                <li><Link to={`/user/id/${this.props.id}`} className={this.props.currentVisitingUserPage === 'exact' ? "user-center-navigation-active fa-home" : "fa-home"}><span style={{width: '0.5rem'}}></span>主页</Link></li>
                <hr />
                {this.props.isManager === '管理员' ? <li><Link to={`/user/id/${this.props.id}/manage`} className={this.props.currentVisitingUserPage === 'manage' ? "user-center-navigation-active fa-cog" : "fa-cog"}><span style={{ width: '0.5rem' }}></span>管理</Link></li> : null}
            </ul>
        </div>);
    }
}

function mapState(state) {
    return {
        isManager: state.userInfo.currentUserInfo.privilege,
        currentVisitingUserPage: state.userInfo.currentVisitingUserPage,
        id: state.userInfo.currentVisitingUserId
    };
}

export default connect(mapState, null)(UserNavigationBeforeConnect);