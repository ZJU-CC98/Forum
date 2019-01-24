import * as React from 'react';

export default () => (
  <div className="board-postItem-head">
    <div className="board-postItem-head-left">
      <div className="board-postItem-head-option">全部</div>
      <div className="board-postItem-head-option">精华</div>
      <div className="board-postItem-head-option">保存</div>
    </div>
    <div className="board-postItem-head-right">
      <div className="board-postItem-head-userName">作者</div>
      <div className="board-postItem-head-hitcount">点击</div>
      <div className="board-postItem-head-reply">回复</div>
      <div className="board-postItem-head-lastReply">最后回复</div>
    </div>
  </div>
);
