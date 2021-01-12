// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { UserRecentTopic } from "../../States/AppState";
import { Link } from "react-router-dom";
/**
 * 用户最近单个帖子组件
 */
export default class extends React.Component<UserCenterExactActivitiesTopicProps> {
  render() {
    return (
      <div className="user-post">
        <div className="user-post-info">
          <Link
            className="user-post-board"
            to={`/board/${this.props.userRecentTopic.boardId}`}
          >
            {this.props.userRecentTopic.boardName}
          </Link>
          <a className="user-post-date">
            {this.props.userRecentTopic.time.slice(0, 19).replace("T", " ")}
          </a>
        </div>
        <div className="user-post-content">
          <p>
            <Link to={`/topic/${this.props.userRecentTopic.id}`}>
              {this.props.userRecentTopic.title}
            </Link>
          </p>
          {/*this.props.userRecentTopic.likeCount !== undefined ? <a className="fa-thumbs-o-up">{` ${this.props.userRecentTopic.likeCount}`}</a> : null}
                    {this.props.userRecentTopic.dislikeCount !== undefined ? <a className="fa-thumbs-o-down">{` ${this.props.userRecentTopic.dislikeCount}`}</a> : null*/}
        </div>
      </div>
    );
  }
}

interface UserCenterExactActivitiesTopicProps {
  userRecentTopic: UserRecentTopic;
}
