// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserRecentPost } from '../States/AppState';

/**
 * 用户最近单个帖子组件
 */
export class UserCenterExactActivitiesPost extends React.Component<UserCenterExactActivitiesPostProps> {
    render() {
        return (
            <div className="user-post">
                <p>
                    <span className="user-post-board">{this.props.userRecentPost.board}</span>
                    <span className="user-post-date">{this.props.userRecentPost.date}</span>
                    <samp className="user-post-title">{this.props.userRecentPost.title}</samp>
                </p>
                <p className="user-post-approval">
                    <span className="fa-thumbs-o-up">{` ${this.props.userRecentPost.approval}`}</span>
                    <span className="fa-thumbs-o-down">{` ${this.props.userRecentPost.disapproval}`}</span>
                </p>
                <p className="user-post-content">{this.props.userRecentPost.content}</p>
            </div>    
        );
    }
}

interface UserCenterExactActivitiesPostProps {
    userRecentPost: UserRecentPost;
}


