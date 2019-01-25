import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { ITopic, IPost } from '@cc98/api';
import { Tag, Popover, Tooltip, Spin } from 'antd';
import dayjs from 'dayjs';
import { getShortTopic } from './action';
import { UbbContainer } from '../../Components/UbbContainer';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';

interface Props {
  data: ITopic;
  order: number;
}
const Item: React.SFC<Props> = ({ data, order }) => {
  // 普通帖子
  let icon = 'normal';
  let iconText = '普通帖子';

  // 自己发的
  let curName;
  if (Utility.getLocalStorage('userInfo'))
    curName = Utility.getLocalStorage('userInfo').name;
  if (data.userName === curName) {
    icon = 'my';
    iconText = '我的帖子';
  }

  // 热门
  if (data.replyCount > 100) {
    icon = 'hot';
    iconText = '热帖';
  }

  // 被锁
  if (data.state === 1) {
    icon = 'lock';
    iconText = '已被锁定';
  }

  // 精华
  if (data.bestState === 1) {
    icon = 'star';
    iconText = '精华';
  }

  // 置顶
  switch (data.topState) {
    case 4:
      icon = 'top-red';
      iconText = '全站置顶';
      break;
    case 2:
      icon = 'top-orange';
      iconText = '版面置顶';
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
    <Link to={`/topic/${data.id}`}>
      <div className={bodyClass}>
        <Tooltip title={iconText}>
          <div className="board-postItem-icon">
            <img src={iconSrc} />
          </div>
        </Tooltip>

        <Tooltip title={data.title}>
          <div className="board-postItem-title">{data.title}</div>
        </Tooltip>
        <Popover title={data.title} content={content}>
          <Tag style={{ marginLeft: '1rem' }} color="magenta">
            速览
          </Tag>
        </Popover>

        <div className="board-postItem-right">
          <div className="board-postItem-userName">{data.userName}</div>

          <div className="board-postItem-tags">
            <div className="board-postItem-tag">
              <Tag style={{ width: 50, textAlign: 'right' }} color="blue">
                {data.hitCount > 10000
                  ? `${(data.hitCount / 10000).toFixed(1)}万`
                  : data.hitCount}
              </Tag>
            </div>
            <div className="board-postItem-tag">
              <Tag style={{ width: 30, textAlign: 'right' }} color="cyan">
                {data.replyCount}
              </Tag>
            </div>
          </div>

          <div className="board-postItem-lastReply">
            <span>{data.lastPostUser}</span>/
            <span>{dayjs(data.lastPostTime).format('YY-MM-DD hh:mm')}</span>
          </div>
        </div>
      </div>
    </Link>
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
    const posts = await getShortTopic(data.id);
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;
    return posts.length === 0 ? (
      <Spin size="large" />
    ) : (
      <div className="board-postItem-cards">
        {posts.map(item => (
          <PItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

const PItem: React.SFC<{ item: IPost }> = ({ item }) => (
  <div className="board-postItem-card-body">
    <div className="board-postItem-card-information">
      <div>{item.floor}L</div>
      <div className="board-postItem-card-username">{item.userName}</div>
    </div>
    <div className="board-postItem-card-content">
      <UbbContainer
        code={item.content}
        options={{ ...new UbbCodeOptions(), allowLightbox: true }}
      />
    </div>
  </div>
);

export default Item;
