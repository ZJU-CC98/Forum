import QueueAnim from "rc-queue-anim";
import { OverPack } from "rc-scroll-anim";
import React from "react";

export default class extends React.Component<{ data; buttonNode }> {
  state = {
    showButton: false,
  };
  render() {
    const { data } = this.props;
    const buttonNode = this.props.buttonNode;
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
          <div style={{ marginTop: "1.5rem" }} key="annual-page2-3">
            你给他人评分
            <span className="annual-review-page2-topicCount">
              {data.sendRateCount}
            </span>
            次，
          </div>
          <div key="annual-page2-4">
            收到了他人给你的
            <span className="annual-review-page2-replyCount">
              {data.receiveRateCount}
            </span>
            次评分。
          </div>

          {data.sofaCount > 20 && (
            <div key="annual-page2-5">
              <div style={{ marginTop: "1.5rem" }}>你眼疾手快，</div>
              <div>
                抢到了
                <span className="annual-review-page2-replyCount">
                  {data.sofaCount}
                </span>
                次沙发。
              </div>
            </div>
          )}

          {data.sofaCount <= 20 && data.sofaCount > 0 && (
            <div key="annual-page2-6">
              <div style={{ marginTop: "1.5rem" }}>你手速尚可，</div>
              <div>
                抢到了
                <span className="annual-review-page2-replyCount">
                  {data.sofaCount}
                </span>
                次沙发。
              </div>
            </div>
          )}

          {data.sofaCount === 0 && (
            <div key="annual-page2-7">
              <div style={{ marginTop: "1.5rem" }}>你佛系水帖，</div>
              <div>从未抢到过沙发。</div>
            </div>
          )}
        </QueueAnim>
        {this.state.showButton && buttonNode}
      </div>
    );
  }
}
