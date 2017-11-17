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
        let element;
        console.log(this.props.userRecentPost.isAnonymous);
        if (this.props.userRecentPost.name !== localStorage.getItem("userName").slice(4) && !this.props.userRecentPost.isAnonymous) {
            element = (<div>
                <a className="fa-thumbs-o-up">{` ${this.props.userRecentPost.approval}`}</a>
                <a className="fa-thumbs-o-down">{` ${this.props.userRecentPost.disapproval}`}</a>
                </div>);
        }


        return (
            <div className="user-post">
                <div className="user-post-info">
                    <a className="user-post-board" href={`/list/${this.props.userRecentPost.boardId}`}>{this.props.userRecentPost.board}</a>
                    <a className="user-post-date">{this.props.userRecentPost.date}</a>
                    <a className="user-post-title">{this.props.userRecentPost.title}</a>
                </div>
                <div className="user-post-content">
                    <p><a href={`/topic/${this.props.userRecentPost.id}`}>{this.props.userRecentPost.content}</a></p>
                    {element}
                </div>
            </div>    
        );
    }
}

interface UserCenterExactActivitiesPostProps {
    userRecentPost: UserRecentPost;
}


