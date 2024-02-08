import QueueAnim from "rc-queue-anim";
import { OverPack } from "rc-scroll-anim";
import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    return (
      <div className="annual-review-page annual-review-page-bg-cat">
        <QueueAnim
          key="queueAnim"
          delay={100}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] },
          ]}
          interval={200}
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: "1.5rem" }} key="annual-page2-1">
            你一共送出了
            <span className="annual-review-page2-topicCount">
              {data.sendLikeCount}
            </span>
            个赞。
          </div>
          {data.mostSendLikeUser && (
            <div key="annual-page2-1-1">
              你最欣赏的用户是
              <span className="annual-review-page2-topicCount">
                {data.mostSendLikeUser.userName}
              </span>
              ，
              <div>
                <img
                  key="annual-page1-3"
                  style={{ borderRadius: "50%", marginTop: "0.5rem" }}
                  width="60px"
                  src={`${data.mostSendLikeUser.portraitUrl}`}
                ></img>
              </div>
              给Ta点了
              <span className="annual-review-page2-topicCount">
                {data.mostSendLikeUser.likeCount}
              </span>
              个赞。
            </div>
          )}
          <div key="annual-page2-2">
            你一共收到了他人的
            <span className="annual-review-page2-replyCount">
              {data.receiveLikeCount}
            </span>
            个赞。
          </div>
          {data.mostReceiveLikeUser && (
            <div key="annual-page2-2-1">
              用户
              <span className="annual-review-page2-topicCount">
                {data.mostReceiveLikeUser.userName}
              </span>
              是你的首席鼓励师，
              <div>
                <img
                  key="annual-page1-3"
                  style={{ borderRadius: "50%", marginTop: "0.5rem" }}
                  width="60px"
                  src={`${data.mostReceiveLikeUser.portraitUrl}`}
                ></img>
              </div>
              Ta给你点了
              <span className="annual-review-page2-topicCount">
                {data.mostReceiveLikeUser.likeCount}
              </span>
              个赞。
            </div>
          )}

        </QueueAnim>
      </div>
    );
  }
}
