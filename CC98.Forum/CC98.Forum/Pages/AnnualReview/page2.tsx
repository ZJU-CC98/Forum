import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    return (
      <div className="annual-review-page">
        <div>
          你送出了
          <span className="annual-review-page2-topicCount">
            {data.sendLikeCount}个
          </span>
          赞
        </div>
        <div>
          收到他人给你的
          <span className="annual-review-page2-replyCount">
            {data.receiveLikeCount}个
          </span>
          赞
        </div>

        <div style={{ marginTop: "2rem" }}>
          你给他人评分
          <span className="annual-review-page2-topicCount">
            {data.sendRateCount}次
          </span>
        </div>
        <div>
          收到了他人给你的
          <span className="annual-review-page2-replyCount">
            {data.receiveRateCount}次
          </span>
          评分
        </div>

        {data.sofaCount > 0 && (
          <>
            <div style={{marginTop: '2rem'}}>你眼疾手快</div>
            <div>
              抢到了
              <span className="annual-review-page2-replyCount">
                {data.sofaCount}次
              </span>
              沙发
            </div>
          </>
        )}

        {data.sofaCount === 0 && (
          <>
            <div style={{marginTop: '2rem'}}>你从未抢到过沙发</div>
            <div>2020年，给自己一个目标</div>
            <div>抢到一次沙发</div>
          </>
        )}
      </div>
    );
  }
}
