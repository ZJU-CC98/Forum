import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;

    return (
      <div className="annual-review-page">
        <div style={{ fontWeight: "bolder", marginTop: '3rem' }}>
          亲爱的CC98用户 {data.userInfo.name}：
        </div>
        <img
          style={{ borderRadius: "50%", marginTop: "1rem" }}
          width={document.body.clientHeight * 0.1}
          src={`${data.userInfo.portraitUrl}`}
        ></img>
        <div>
          在过去的2019年里，你有
          <span className="annual-review-page2-topicCount">
            {data.postDay}
          </span>
          天
        </div>

        <div>在CC98论坛上留下了痕迹。</div>

        <div style={{ marginTop: '1rem' }}>
          你发表了
          <span className="annual-review-page2-topicCount">
            {data.topicCount}
          </span>
          个主题帖，
        </div>
        <div>
          进行了
          <span className="annual-review-page2-replyCount">
            {data.replyCount}
          </span>
          次回复，
        </div>
        {data.hotTopicCount !== 0 && (
          <div>
            上了
            <span className="annual-review-page2-hotTopicCount">
              {data.hotTopicCount}
            </span>
            次十大热门话题。
          </div>
        )}
        {data.hotTopicCount === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
            <div>很遗憾，</div>
            <div>你的主题帖没上过十大热门话题。</div>
          </div>
        )}


      </div>
    );
  }
}
