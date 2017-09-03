import * as React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

import { UserCenterMyPostsExact } from './UserCenterMyPostsExact';
import { UserCenterMyPostsReplies } from './UserCenterMyPostsReplies';

/**
 * 用户中心我的主题组件
 */
export class UserCenterMyPosts extends React.Component {
    render() {
        return (
            <Router>
                <div className='user-center-myposts'>
                    <CustomLink to='/usercenter/myposts' label='主题' activeOnlyWhenExact={true} /> | <CustomLink to='/usercenter/myposts/replies' label='回复' activeOnlyWhenExact={false} />
                    <Route exact path='/usercenter/myposts' component={UserCenterMyPostsExact} />
                    <Route path='/usercenter/myposts/replies' component={UserCenterMyPostsReplies} />
                </div>
            </Router>
        );
    }
}

const CustomLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <Link className={match ? 'user-activities-active' : ''} to={to}>{label}</Link>
    )} />
);