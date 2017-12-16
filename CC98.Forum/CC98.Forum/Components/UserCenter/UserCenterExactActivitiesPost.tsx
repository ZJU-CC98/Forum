// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserRecentPost } from '../../States/AppState';
import { Link } from 'react-router-dom';
/**
 * 用户最近单个帖子组件
 */
export class UserCenterExactActivitiesPost extends React.Component<UserCenterExactActivitiesPostProps> {
    render() {
        return (
            <div className="user-post">
                <div className="user-post-info">
                    <Link className="user-post-board" to={`/list/${this.props.userRecentPost.boardId}`}>{this.props.userRecentPost.board}</Link>
                    <a className="user-post-date">{this.props.userRecentPost.date}</a>
                    <a className="user-post-title">{this.props.userRecentPost.title}</a>
                </div>
                <div className="user-post-content">
                    <p><Link to={`/topic/${this.props.userRecentPost.id}`}>{this.props.userRecentPost.content}</Link></p>
                    {this.props.userRecentPost.approval !== undefined ? <a className="fa-thumbs-o-up">{` ${this.props.userRecentPost.approval}`}</a> : null}
                    {this.props.userRecentPost.disapproval !== undefined ? <a className="fa-thumbs-o-down">{` ${this.props.userRecentPost.disapproval}`}</a> : null}
                </div>
            </div>    
        );
    }
}

interface UserCenterExactActivitiesPostProps {
    userRecentPost: UserRecentPost;
}


