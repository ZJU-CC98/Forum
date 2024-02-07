import React from "react";
import QueueAnim from "rc-queue-anim";

export default class extends React.Component<{ data; buttonNode }> {
  state = {
    showButton: false,
  };

  render() {
    const { data } = this.props;
    const buttonNode = this.props.buttonNode;

    // if (!data.mostReplyTopicCount && !data.mostViewTopicCount) {
    //     return (
    //       <div>
    //         <QueueAnim
    //           key="queueAnim"
    //           delay={400}
    //           animConfig={[
    //             { opacity: [1, 0], translateY: [0, 50] },
    //             { opacity: [1, 0], translateY: [0, -50] },
    //           ]}
    //           onEnd={() => {
    //             setTimeout(() => {
    //               this.setState({ showButton: true });
    //             }, 1000);
    //           }}
    //         >
    //           <div key="annual-page3-1">
    //             <div>
    //               在过去的一年里，
    //               <br />
    //               你还没有发过主题帖...
    //             </div>
    //           </div>
    //         </QueueAnim>{" "}
    //         {this.state.showButton && buttonNode}
    //       </div>
    //     );
    //   }
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
          <div key="annual-page3-1">在CC98抽卡游戏中，</div>
          <div key="annual-page3-2-1">
            <div>
              迄今为止你共获得了
              <QueueAnim
                animConfig={[
                  { opacity: [1, 0], translateY: [0, 50] },
                  { opacity: [1, 0], translateY: [0, -50] },
                ]}
              >
                <div key="annual-page3-2-1-1">
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalMysteryCount}
                  </span>
                  张Mystery
                </div>
                <div key="annual-page3-2-1-2">
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalSSRCount}
                  </span>
                  张SSR
                </div>
                <div key="annual-page3-2-1-3">
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalSRCount}
                  </span>
                  张SR
                </div>
                <div key="annual-page3-2-1-4">
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalRCount}
                  </span>
                  张R
                </div>
                <div key="annual-page3-2-1-5">
                  <span className="annual-review-page2-topicCount">
                    {data.cardDraw.totalNCount}
                  </span>
                  张N
                </div>
              </QueueAnim>
            </div>
            卡片
          </div>

          <div key="annual-page3-3">
            <div style={{ marginTop: "2rem" }}>其中在2023年</div>

            <div>
              你消耗了
              <span className="annual-review-page2-hotTopicCount">
                {data.cardDraw.annualPayment}
              </span>
              财富值
            </div>
            <div>
              获得了
              <span className="annual-review-page2-hotTopicCount">
                {data.cardDraw.annualCount}
              </span>
              张卡片
            </div>
          </div>
        </QueueAnim>
        {this.state.showButton && buttonNode}
      </div>
    );
  }
}
