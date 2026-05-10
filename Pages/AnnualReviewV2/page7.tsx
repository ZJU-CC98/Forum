import React from "react";
import QueueAnim from "rc-queue-anim";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;

    return (
      <div className="annual-review-page annual-review-page-bg-cat">
        <QueueAnim
          key="queueAnim"
          delay={100}
          duration={1000}
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
          <div key="annual-page3-1">在CC98抽卡游戏中，</div>
          <div key="annual-page3-2-1">
            <div>
              迄今为止你共获得了：
              <QueueAnim
                animConfig={[
                  { opacity: [1, 0], translateY: [0, 50] },
                  { opacity: [1, 0], translateY: [0, -50] },
                ]}
              >
                <div key="annual-page3-2-1-1">
                  &nbsp;
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalMysteryCount}
                  </span>
                  张Mystery卡、
                </div>
                <div>
                  <span key="annual-page3-2-1-2">
                    &nbsp;
                    <span className="annual-review-page2-topicCount">
                      {data.cardDraw.totalSSRCount}
                    </span>
                    张SSR卡、
                  </span>
                  <span key="annual-page3-2-1-3">
                    &nbsp;
                    <span className="annual-review-page2-topicCount">
                      {data.cardDraw.totalSRCount}
                    </span>
                    张SR卡、
                  </span>
                </div>
                <div>
                  <span key="annual-page3-2-1-4">
                    &nbsp;
                    <span className="annual-review-page2-topicCount">
                      {data.cardDraw.totalRCount}
                    </span>
                    张R卡、
                  </span>
                  <span key="annual-page3-2-1-5">
                    &nbsp;
                    <span className="annual-review-page2-topicCount">
                      {data.cardDraw.totalNCount}
                    </span>
                    张N卡。
                  </span>
                </div>
              </QueueAnim>
            </div>
          </div>

          <div key="annual-page3-3">
            <div style={{ marginTop: "2rem" }}>其中在2025年，</div>
            <div>
              你消耗了
              <span className="annual-review-page2-hotTopicCount">
                {data.cardDraw.annualPayment}
              </span>
              财富值，
            </div>
            <div>
              获得了
              <span className="annual-review-page2-hotTopicCount">
                {data.cardDraw.annualCount}
              </span>
              张卡片。
            </div>
          </div>
        </QueueAnim>
      </div>
    );
  }
}
