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
          <div style={{ marginTop: "1rem" }} key="annual-page2-1">
            你送出了
            <span className="annual-review-page2-topicCount">
              {data.sendLikeCount}
            </span>
            个赞，
          </div>
          {data.mostSendLikeUser && (
            <div key="annual-page2-1-1">
              <div>
                你最欣赏的用户是
                <span className="annual-review-page2-topicCount">
                  {data.mostSendLikeUser.userName}
                </span>
              </div>
              <div>
                <img
                  key="annual-page1-3"
                  style={{ borderRadius: "50%", marginTop: "0.5rem" }}
                  width="60px"
                  src={`${data.mostSendLikeUser.portraitUrl}`}
                ></img>
              </div>
              总共给Ta点了{data.mostSendLikeUser.likeCount}个赞
            </div>
          )}
          <br />
          <div key="annual-page2-2">
            收到他人给你的
            <span className="annual-review-page2-replyCount">
              {data.receiveLikeCount}
            </span>
            个赞。
          </div>
          {data.mostReceiveLikeUser && (
            <div key="annual-page2-2-1">
              <div>
                用户
                <span className="annual-review-page2-topicCount">
                  {data.mostReceiveLikeUser.userName}
                </span>
                是你的首席鼓励师
              </div>
              <div>
                <img
                  key="annual-page1-3"
                  style={{ borderRadius: "50%", marginTop: "0.5rem" }}
                  width="60px"
                  src={`${data.mostReceiveLikeUser.portraitUrl}`}
                ></img>
              </div>
              Ta总共给你点了{data.mostSendLikeUser.likeCount}个赞
            </div>
          )}

        </QueueAnim>
      </div>
    );
  }
}
