import React from "react";
import { syncGetBoardNameById } from "../../Utility";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

export default class extends React.Component<{ data }> {

  getBoardUrlById(boardId) {
    return "/board/" + boardId;
  }

  render() {
    const { data } = this.props;
    //最爱发言的版面
    let boards = null
    if (data.board1 || data.board2 || data.board3) {
      boards = (
        <>
          <div style={{ marginTop: "2rem" }}>你最爱发言的版面是：</div>
          <div>
            <a href={this.getBoardUrlById(data.board1)}>
              <span className="annual-review-page2-topicCount">
                {syncGetBoardNameById(data.board1)}
              </span>
            </a>
          </div>
          <div>
            {data.board2 && (
              <a href={this.getBoardUrlById(data.board2)}>
                <span className="annual-review-page2-replyCount">
                  {syncGetBoardNameById(data.board2)}
                </span>
              </a>
            )}
          </div>
          <div>
            {data.board3 && (
              <a href={this.getBoardUrlById(data.board3)}>
                <span className="annual-review-page2-hotTopicCount">
                  {syncGetBoardNameById(data.board3)}
                </span>
              </a>
            )}
          </div>
        </>
      );
    }
    else {
      boards = (
        <>
          <div>你在过去的一年中没有发言，</div>
          <div>新的一年要加油哦~</div>
        </>
      )
    }
   
    return (
      <div className="annual-review-page">
        {boards}
        {data.latestPostTime && (
          <div style={{ marginTop: '1rem' }}>
            在{" "}
            <span className="annual-review-page2-hotTopicCount">
              {moment(data.latestPostTime).format("LL")}
            </span>
            这天，
          </div>
        )}
        {data.latestPostTime && <div>你熬夜得最晚，</div>}

        {data.latestPostTime && (
          <div>
            {" "}
            <span className="annual-review-page2-topicCount">
              {moment(data.latestPostTime).format("a hh [:] mm")}
            </span>
            还在98发言。
          </div>
        )}
      </div>
    );
  }
}
