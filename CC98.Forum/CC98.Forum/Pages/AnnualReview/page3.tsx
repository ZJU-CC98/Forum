import React from 'react'

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props
    if (!data.mostReplyTopicCount && !data.mostViewTopicCount) {
      return (
        <div className="annual-review-page">
          在过去的一年里，你还没有发过主题帖...
        </div>
      );
    }
    return <div className="annual-review-page">
      <div>在你一年发表的主题帖中，</div>
      {data.mostReplyTopicCount && (
        <>
          <div>
            收到最多回复的一次，
          </div>
          <div>
            共有
            <span className="annual-review-page2-topicCount">
              {data.mostReplyTopicCount}
            </span>
            个回复；
          </div>
        </>
      )}

      {
        data.mostViewTopicCount && (
          <>
            <div>
              点击量最多的一次，
            </div>
            <div>
              共有
             <span className="annual-review-page2-replyCount">
                {data.mostViewTopicCount}
              </span>
              次点击。
              </div>
          </>
        )
      }

      {
        data.mostReceiveLikePostCount !== 0 && (
          <div style={{ marginTop: '2rem' }}>
            你收获他人点赞最多的一个发言，
        </div>
        )}
      {
        data.mostReceiveLikePostCount !== 0 && (
          <div>
            共收到了
          <span className="annual-review-page2-hotTopicCount">
              {data.mostReceiveLikePostCount}
            </span>
            个赞。
        </div>
        )}
    </div>
  }

}