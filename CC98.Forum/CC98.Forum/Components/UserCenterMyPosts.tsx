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
            <UserCenterMyPostsExact />
        );
    }
}