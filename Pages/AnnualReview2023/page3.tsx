import QueueAnim from "rc-queue-anim";
import React from "react";

export default class extends React.Component<{ data; buttonNode }> {
  state = {
    showButton: false,
  };
  render() {
    const { data } = this.props;
    const buttonNode = this.props.buttonNode;

    if (!data.mostReplyTopicCount && !data.mostViewTopicCount) {
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
            <div key="annual-page3-1">
              <div>
                在过去的一年里，
                <br />
                你还没有发过主题帖...
              </div>
            </div>
          </QueueAnim>{" "}
          {this.state.showButton && buttonNode}
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

          {data.mostReceiveLikePostCount !== 0 && (
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

          {data.favoriteTopicCount !== 0 && (
            <div key="annual-page3-4">
              <div style={{ marginTop: "2rem" }}>今年你把</div>
              <div>
                <span className="annual-review-page2-topicCount">
                  {data.favoriteTopicCount}
                </span>
                个帖子加入了收藏夹。
              </div>
            </div>
          )}
        </QueueAnim>
        {this.state.showButton && buttonNode}
      </div>
    );
  }
}
