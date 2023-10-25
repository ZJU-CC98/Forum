// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { UserRecentTopic } from "../../States/AppState";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Menu } from "antd";
import { deleteFavoriteTopic,setFavoriteTopic} from "../../Utility";
import Modal from "antd/es/modal";
import MyFavoritesAddModalcontent from "./MyFavoritesAdd";

type Props = UserCenterExactActivitiesTopicProps& {updateinfo: () => void};
const {confirm}=Modal;

/**
 * 用户最近单个收藏帖子组件
 */
export default class extends React.Component<Props> {

  handleChangeGroup = async (topicid: number) => {
    let select = 0;
    confirm({
      title: "选择收藏分组",
      content: <MyFavoritesAddModalcontent option={(e)=>{select=e}}/>,
      onOk: async (e) => {
        console.log(select);
        try {
          await setFavoriteTopic(topicid, select);
          this.props.updateinfo();
        } catch (error) {
          console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  }


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
          <div style={{ transform: "translate(-50px, 0)" }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <div
                      onClick={async () => {
                        console.log("取消收藏", this.props.userRecentTopic.id);
                        await deleteFavoriteTopic(this.props.userRecentTopic.id);
                        this.props.updateinfo();
                      }}
                    >
                      取消收藏
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                  <div
                      onClick={async () => {
                        console.log("移动分组", this.props.userRecentTopic.id);
                        await this.handleChangeGroup(this.props.userRecentTopic.id);
                      }}
                    >
                      移动分组
                    </div>
                  </Menu.Item>
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Icon type="unordered-list" />
                &nbsp;操作
              </a>
            </Dropdown>
          </div>
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
