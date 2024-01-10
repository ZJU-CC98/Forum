// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { UserRecentPost } from "../../States/AppState";
import { Link } from "react-router-dom";
/**
 * 用户最近单个帖子组件
 */
export default class extends React.Component<UserCenterExactActivitiesPostProps> {
  render() {
    return (
      <div className="user-post">
        <div className="user-post-info">
          <a className="user-post-date">
            {this.props.userRecentPost.time.slice(0, 19).replace("T", " ")}
          </a>
          <a className="user-post-like-count">
            赞：{this.props.userRecentPost.likeCount}
          </a>
          <a className="user-post-like-count">
            踩：{this.props.userRecentPost.dislikeCount}
          </a>
          <Link
            className="user-post-board"
            to={`/board/${this.props.userRecentPost.boardId}`}
          >
            {this.props.userRecentPost.boardName}
          </Link>
        </div>
        <div className="user-post-content">
          <p>
            <Link
              to={`/topic/${this.props.userRecentPost.topicId}/${Math.floor((this.props.userRecentPost.floor - 1) / 10) + 1}#${this.props.userRecentPost.floor % 10}`}
            >
              {this.props.userRecentPost.content}
            </Link>
          </p>
          {/*this.props.userRecentPost.likeCount !== undefined ? <a className="fa-thumbs-o-up">{` ${this.props.userRecentPost.likeCount}`}</a> : null}
                    {this.props.userRecentPost.dislikeCount !== undefined ? <a className="fa-thumbs-o-down">{` ${this.props.userRecentPost.dislikeCount}`}</a> : null*/}
        </div>
      </div>
    );
  }
}

interface UserCenterExactActivitiesPostProps {
  userRecentPost: UserRecentPost;
}
