import React from "react";
import QueueAnim from "rc-queue-anim";

export default class extends React.Component<{ data }> {
  state = {
    showButton: false,
  };

  render() {
    const { data } = this.props;

    return (
      <div className="annual-review-page annual-review-page-bg-rabbit">
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
          <div key="annual-page7-1">在CC98竞猜游戏中，</div>
          <div key="annual-page7-2">
            <div>
              本年度你共参与了
              <span className="annual-review-page2-topicCount">
                {data.bet.totalCount}
              </span>
              场竞猜，
            </div>
          </div>
          <div key="annual-page7-3">
            <div>
              <div>
                胜利
                <span className="annual-review-page2-topicCount">
                  {data.bet.winCount}
                </span>
                场、
              </div>
              <div>
                失败
                <span className="annual-review-page2-topicCount">
                  {data.bet.loseCount}
                </span>
                场、
              </div>
              <div>
                走水
                <span className="annual-review-page2-topicCount">
                  {data.bet.drawCount}
                </span>
                场，
              </div>
            </div>
            <div>
              胜率为
              <span className="annual-review-page2-topicCount">
                {((data.bet.winCount / data.bet.totalCount) * 100).toFixed(1)}%
              </span>
              。
            </div>
          </div>

          {data.bet.profit >= 0 && (
            <div key="annual-page7-4-1">
              <div>
                共投注了
                <span className="annual-review-page2-hotTopicCount">
                  {data.bet.payment}
                </span>
                财富值，
              </div>
              <div>
                赢得了
                <span className="annual-review-page2-hotTopicCount">
                  {data.bet.profit}
                </span>
                财富值，不错呀！
              </div>
            </div>
          )}
          {data.bet.profit < 0 && (
            <div key="annual-page7-4-1">
              <div>
                共投注了
                <span className="annual-review-page2-hotTopicCount">
                  {data.bet.payment}
                </span>
                财富值
              </div>
              <div>
                损失了
                <span className="annual-review-page2-hotTopicCount">
                  {data.bet.profit}
                </span>
                财富值，不要灰心哦~
              </div>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}
