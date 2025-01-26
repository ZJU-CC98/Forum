import QueueAnim from "rc-queue-anim";
import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;

    if (!data.mostReplyTopicCount && !data.mostViewTopicCount) {
      return (
        <div className="annual-review-page annual-review-page-bg-cat">
          <QueueAnim
            key="queueAnim"
            delay={100}
            interval={200}
            animConfig={[
              { opacity: [1, 0], translateY: [0, 50] },
              { opacity: [1, 0], translateY: [0, -50] },
            ]}
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div key="annual-page3-1">
              <div>
                在过去的一年里，
                <br />
                你没有发过主题帖...
              </div>
            </div>
          </QueueAnim>
        </div>
      );
    }
    return (
      <div className="annual-review-page annual-review-page-bg-cat">
        <QueueAnim
          key="queueAnim"
          delay={100}
          interval={200}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] },
          ]}
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div key="annual-page3-1">在你一年发表的主题帖中，</div>
          {data.mostReplyTopicCount !== 0 && (
            <div key="annual-page3-2-1">
              <div>收到最多回复的一次，</div>
              <div>
                共有
                <span className="annual-review-page2-topicCount">
                  {data.mostReplyTopicCount}
                </span>
                个回复；
              </div>
            </div>
          )}

          {data.mostViewTopicCount !== 0 && (
            <div key="annual-page3-2-2">
              <div>点击量最多的一次，</div>
              <div>
                共有
                <span className="annual-review-page2-replyCount">
                  {data.mostViewTopicCount}
                </span>
                次点击。
              </div>
            </div>
          )}

          {/* {data.mostReceiveLikePostCount !== 0 && (
            <div key="annual-page3-3">
              <div style={{ marginTop: "2rem" }}>
                你收获他人点赞最多的一个发言，
              </div>

              <div>
                共收到了
                <span className="annual-review-page2-hotTopicCount">
                  {data.mostReceiveLikePostCount}
                </span>
                个赞。
              </div>
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
          )} */}

          {/* {data.favoriteTopicCount !== 0 && (
            <div key="annual-page3-4">
              <div style={{ marginTop: "2rem" }}>今年你把</div>
              <div>
                <span className="annual-review-page2-topicCount">
                  {data.favoriteTopicCount}
                </span>
                个主题贴加入了收藏夹。
              </div>
            </div>
          )} */}
        </QueueAnim>
      </div>
    );
  }
}
