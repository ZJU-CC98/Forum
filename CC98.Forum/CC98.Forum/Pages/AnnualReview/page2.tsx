import React from "react";

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    return (
      <div className="annual-review-page">
        <div style={{ marginTop: "1rem" }}>
          你送出了
          <span className="annual-review-page2-topicCount">
            {data.sendLikeCount}
          </span>
          个赞，
        </div>
        <div>
          收到他人给你的
          <span className="annual-review-page2-replyCount">
            {data.receiveLikeCount}
          </span>
          个赞。
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          你给他人评分
          <span className="annual-review-page2-topicCount">
            {data.sendRateCount}
          </span>
          次，
        </div>
        <div>
          收到了他人给你的
          <span className="annual-review-page2-replyCount">
            {data.receiveRateCount}
          </span>
          次评分。
        </div>

        {data.sofaCount > 20 && (
          <>
            <div style={{ marginTop: '1.5rem' }}>你眼疾手快，</div>
            <div>
              抢到了
              <span className="annual-review-page2-replyCount">
                {data.sofaCount}
              </span>
              次沙发。
            </div>
          </>
        )}

        {data.sofaCount <= 20 && data.sofaCount > 0 &&(
          <>
            <div style={{ marginTop: '1.5rem' }}>你手速尚可，</div>
            <div>
              抢到了
              <span className="annual-review-page2-replyCount">
                {data.sofaCount}
              </span>
              次沙发。
            </div>
          </>
        )}

        {data.sofaCount === 0 && (
          <>
            <div style={{ marginTop: '1.5rem' }}>你佛系水帖，</div>
            <div>从未抢到过沙发。</div>
          </>
        )}
      </div>
    );
  }
}
