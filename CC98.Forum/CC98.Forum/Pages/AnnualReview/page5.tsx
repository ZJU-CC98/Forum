import React from "react";
import { Tag } from "antd";
import { syncGetBoardNameById } from "../../Utility";
export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    let boards = null
    if (data.board1 || data.board2 || data.board3) {
        boards = (
          <>
            <div style={{ marginTop: "2rem" }}>你最爱发言的版面是</div>
            <div>
              <span className="annual-review-page2-topicCount">
                {syncGetBoardNameById(data.board1)}
              </span>
            </div>
            <div>
              {data.board2 && (
                <span className="annual-review-page2-replyCount">
                  {syncGetBoardNameById(data.board2)}
                </span>
              )}
            </div>
            <div>
              {data.board3 && (
                <span className="annual-review-page2-hotTopicCount">
                  {syncGetBoardNameById(data.board3)}
                </span>
              )}
            </div>
          </>
        );
      }
    return (
      <div className="annual-review-page">
         {boards}
      </div>
    );
  }
}
