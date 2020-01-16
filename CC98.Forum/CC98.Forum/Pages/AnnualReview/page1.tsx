import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;

    return (
      <div className="annual-review-page">
        <div style={{ fontWeight: "bolder" , marginTop: '2rem'}}>
          亲爱的CC98用户 {data.userInfo.name}
        </div>
        <img
          style={{ borderRadius: "50%", marginTop: "1rem" }}
          width={document.body.clientHeight * 0.1}
          src={`${data.userInfo.portraitUrl}`}
        ></img>
        <div>
          在过去的2019年里，你有
          <span className="annual-review-page2-topicCount">
            {data.postDay}天
          </span>
        </div>

        <div>在论坛留下了痕迹</div>

        <div style={{marginTop: '2rem'}}>
          你发表了
          <span className="annual-review-page2-topicCount">
            {data.topicCount}个
          </span>
          主题帖
        </div>
        <div>
          进行了
          <span className="annual-review-page2-replyCount">
            {data.replyCount}次
          </span>
          回复
        </div>
        {data.hotTopicCount !== 0 && (
          <div>
            上了
            <span className="annual-review-page2-hotTopicCount">
              {data.hotTopicCount}次
            </span>
            十大热门话题
          </div>
        )}
        {data.hotTopicCount === 0 && (
          <div>很遗憾，你的主题帖没上过十大热门话题</div>
        )}

    
      </div>
    );
  }
}
