import * as React from 'react';
import { Select } from 'antd';
import { IBoard, ITagGroup } from '@cc98/api';
const Option = Select.Option;

interface Props {
  onChange: (type: number) => void;
  tags: ITagGroup[];
  handleTag1Change: (value: number) => void;
  handleTag2Change: (value: number) => void;
}
const Head: React.SFC<Props> = ({
  onChange,
  tags,
  handleTag1Change,
  handleTag2Change
}) => (
  <div className="board-postItem-head">
    <div className="board-postItem-head-left">
      <div className="board-postItem-head-left-part">
        <div className="board-postItem-head-option" onClick={() => onChange(0)}>
          全部
        </div>
        <div className="board-postItem-head-option" onClick={() => onChange(1)}>
          精华
        </div>
        <div className="board-postItem-head-option" onClick={() => onChange(2)}>
          保存
        </div>
      </div>
      <div className="board-postItem-head-left-part">
        {tags.length > 0 ? (
          <Select
            defaultValue={-1}
            style={{ width: 120 }}
            onChange={handleTag1Change}
          >
            <Option value={-1}>全部</Option>
            {tags[0].tags.map(item => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        ) : null}
        {tags.length > 1 ? (
          <Select
            defaultValue={-1}
            style={{ width: 120, marginLeft: 20 }}
            onChange={handleTag2Change}
          >
            <Option value={-1}>全部</Option>
            {tags[1].tags.map(item => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        ) : null}
      </div>
    </div>

    <div className="board-postItem-head-right">
      <div className="board-postItem-head-userName">作者</div>
      <div className="board-postItem-head-hitcount">点击</div>
      <div className="board-postItem-head-reply">回复</div>
      <div className="board-postItem-head-lastReply">最后回复</div>
    </div>
  </div>
);

export default Head;
