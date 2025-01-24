import QueueAnim from "rc-queue-anim";
import { OverPack } from "rc-scroll-anim";
import { year } from './index';
import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    return (
      <div
        className="annual-review-page annual-review-page-bg-cat"
        style={{ lineHeight: 1.25 }}
      >
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
          <div
            key="annual-page1-2"
            style={{ fontWeight: "bolder", marginTop: "2rem" }}
          >
            亲爱的CC98用户 {data.userInfo.name}：
          </div>
          <img
            key="annual-page1-3"
            style={{ borderRadius: "50%", marginTop: "0.5rem" }}
            width="60px"
            src={`${data.userInfo.portraitUrl}`}
          ></img>
          <div key="annual-page1-4">
            在过去的{year}年里，你有
            <span className="annual-review-page2-topicCount">
              {data.postDay}
            </span>
            天
          </div>

          <div
            key="annual-page1-5
          "
          >
            在CC98论坛上留下了痕迹。
          </div>

          <div style={{ marginTop: "1rem" }} key="annual-page1-6">
            你发表了
            <span className="annual-review-page2-topicCount">
              {data.topicCount}
            </span>
            个主题帖，
          </div>
          <div key="annual-page1-7">
            进行了
            <span className="annual-review-page2-replyCount">
              {data.replyCount}
            </span>
            次回复，
          </div>
          {data.favoriteTopicCount !== 0 && (
            <div key="annual-page3-4">
              <div>
                新收藏了
                <span className="annual-review-page2-topicCount">
                  {data.favoriteTopicCount}
                </span>
                个主题帖，
              </div>
            </div>
          )}
          {data.hotTopicCount !== 0 && (
            <div key="annual-page1-8">
              上了
              <span className="annual-review-page2-hotTopicCount">
                {data.hotTopicCount}
              </span>
              次十大热门话题。
            </div>
          )}
          {data.hotTopicCount === 0 && (
            <div
              key="annual-page1-9"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div>很遗憾，</div>
              <div>你的主题帖没上过十大热门话题。</div>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}
