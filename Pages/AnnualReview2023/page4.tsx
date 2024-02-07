import React from "react";
import { syncGetBoardNameById } from "../../Utility";
import moment from "moment";
import "moment/locale/zh-cn";
import QueueAnim from "rc-queue-anim";

moment.locale("zh-cn");

export default class extends React.Component<{ data; buttonNode }> {
  state = {
    showButton: false,
  };

  getBoardUrlById(boardId) {
    return "/board/" + boardId;
  }

  render() {
    const { data } = this.props;
    const buttonNode = this.props.buttonNode;
    //最爱发言的版面
    let boards = null;
    if (data.board1 || data.board2 || data.board3) {
      boards = (
        <div key="annual-page4-1">
          <div style={{ marginTop: "2rem" }}>你最爱发言的版面是：</div>
          <div>
            <a href={this.getBoardUrlById(data.board1)} target="_blank">
              <span className="annual-review-page2-topicCount">
                {syncGetBoardNameById(data.board1)}
              </span>
            </a>
          </div>
          <div>
            {data.board2 && (
              <a href={this.getBoardUrlById(data.board2)} target="_blank">
                <span className="annual-review-page2-replyCount">
                  {syncGetBoardNameById(data.board2)}
                </span>
              </a>
            )}
          </div>
          <div>
            {data.board3 && (
              <a href={this.getBoardUrlById(data.board3)} target="_blank">
                <span className="annual-review-page2-hotTopicCount">
                  {syncGetBoardNameById(data.board3)}
                </span>
              </a>
            )}
          </div>
        </div>
      );
    } else {
      boards = (
        <div key="annual-page4-1">
          <div>你在过去的一年中没有发言，</div>
          <div>新的一年要加油哦~</div>
        </div>
      );
    }

    return (
      <div>
        <QueueAnim
          key="queueAnim"
          delay={800}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] },
          ]}
          onEnd={() => {
            setTimeout(() => {
              this.setState({ showButton: true });
            }, 1000);
          }}
        >
          {boards}
          {data.latestPostTime && (
            <div style={{ marginTop: "1rem" }} key="annual-page4-2">
              在{" "}
              <span className="annual-review-page2-hotTopicCount">
                {moment(data.latestPostTime).format("LL")}
              </span>
              这天，
            </div>
          )}
          {data.latestPostTime && (
            <div key="annual-page4-3">你熬夜得最晚，</div>
          )}

          {data.latestPostTime && (
            <div key="annual-page4-4">
              {" "}
              <span className="annual-review-page2-topicCount">
                {moment(data.latestPostTime).format("a hh [:] mm")}
              </span>
              还在98发言。
            </div>
          )}
          {data.latestPostTime && (
            <img
              key="annual-page4-5"
              src="static/images/CC98/CC9810.gif"
              style={{ width: "100px", marginTop: "1rem" }}
            />
          )}
        </QueueAnim>
        {this.state.showButton && buttonNode}
      </div>
    );
  }
}
