// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import { UserCenterExactActivitiesPosts } from './UserCenterExactActivitiesPosts';
import { UserCenterExactActivitiesReplies } from './UserCenterExactActivitiesReplies';

/**
 * 用户中心主页近期动态组件
 */
export class UserCenterExactActivities extends React.Component {
    render() {
        return (
            <div className="user-activities">
                <p>近期动态</p>
                <Router>
                    <div>
                        <CustomLink to={`${location.pathname}`} label='主题' activeOnlyWhenExact={true} /> | <CustomLink to={`${location.pathname}/replies`} label='回复' activeOnlyWhenExact={false} />
                        <Route exact path={`${location.pathname}`} component={UserCenterExactActivitiesPosts} />
                        <Route path={`${location.pathname}/replies`} component={UserCenterExactActivitiesReplies} />
                    </div>
                </Router>
            </div>
        );
    }
}

const CustomLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <Link className={match ? 'user-activities-active' : ''} to={to}>{label}</Link>
    )} />
);