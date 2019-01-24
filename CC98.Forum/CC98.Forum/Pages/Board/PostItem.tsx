import * as React from 'react';
import * as Utility from '../../Utility';
import { ITopic, IPost } from '@cc98/api';
import { Tag, Popover } from 'antd';
import dayjs from 'dayjs';
import { getTopic } from './action';

interface Props {
  data: ITopic;
  order: number;
}
const Item: React.SFC<Props> = ({ data, order }) => {
  // 普通帖子
  let icon = 'normal';

  // 自己发的
  let curName;
  if (Utility.getLocalStorage('userInfo'))
    curName = Utility.getLocalStorage('userInfo').name;
  if (data.userName === curName) {
    icon = 'my';
  }

  // 热门
  if (data.replyCount > 100) {
    icon = 'hot';
  }

  // 被锁
  if (data.state === 1) {
    icon = 'lock';
  }

  // 精华
  if (data.bestState === 1) {
    icon = 'star';
  }

  // 置顶
  switch (data.topState) {
    case 4:
      icon = 'top-red';
      break;
    case 2:
      icon = 'top-orange';
      break;
    default:
  }
  const iconSrc = `/static/images/icon/${icon}.png`;

  let bodyClass = '';
  // 决定奇偶斑马纹
  if (order % 2 === 0) {
    bodyClass = 'board-postItem-body board-postItem-body-even';
  } else {
    bodyClass = 'board-postItem-body board-postItem-body-odd';
  }

  // 气泡内容

  const content = <Card data={data} />;
  return (
    <Popover title={data.title} content={content}>
      <div className={bodyClass}>
        <div className="board-postItem-icon">
          <img src={iconSrc} />
        </div>

        <div className="board-postItem-title">{data.title}</div>

        <div className="board-postItem-right">
          <div className="board-postItem-userName">{data.userName}</div>

          <div className="board-postItem-tags">
            <div className="board-postItem-tag">
              <Tag color="blue">{data.hitCount}</Tag>
            </div>
            <div className="board-postItem-tag">
              <Tag color="cyan">{data.replyCount}</Tag>
            </div>
          </div>

          <div className="board-postItem-lastReply">
            <span>{data.lastPostUser}</span>/
            <span>{dayjs(data.lastPostTime).format('YY-MM-DD hh:mm')}</span>
          </div>
        </div>
      </div>
    </Popover>
  );
};

interface ChildProps {
  data: ITopic;
}
interface ChildState {
  posts: IPost[];
}
class Card extends React.Component<ChildProps, ChildState> {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data } = this.props;
    const posts = await getTopic(data.id);
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;
    return (
      <>
        {posts.map(item => (
          <PItem key={item.id} item={item} />
        ))}
      </>
    );
  }
}

const PItem: React.SFC<{ item: IPost }> = ({ item }) => (
  <div>
    <div>
      <div>{item.floor}L</div>
      <div>{item.userName}</div>
    </div>
    <div>{item.content}</div>
  </div>
);

export default Item;
