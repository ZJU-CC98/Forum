import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { ITopic, IPost } from '@cc98/api';
import { Tag, Popover, Tooltip, Spin } from 'antd';
import moment from 'moment';
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
  let c: any = '#000';
  let b: any = 'normal';
  let i: any = 'normal';
  if (data.highlightInfo) {
    if (data.highlightInfo.isBold) b = 'bold';
    if (data.highlightInfo.isItalic) i = 'italic';
    if (data.highlightInfo.color) c = data.highlightInfo.color;
  }
  return (
    <Popover title={data.title} content={content} mouseEnterDelay={1.5}>
      <div className={bodyClass}>
        <Tooltip title={iconText}>
          <div className="board-postItem-icon">
            <img src={iconSrc} />
          </div>
        </Tooltip>

        <Link
          className="board-postItem-title"
          to={`/topic/${data.id}`}
          style={{ color: c, fontWeight: b, fontStyle: i }}
        >
          <Tooltip title={data.title}>{data.title}</Tooltip>
        </Link>

        {/* <Tag style={{ marginLeft: '1rem' }} color="magenta">
          速览
        </Tag> */}

        <div className="board-postItem-right">
          <Link className="board-postItem-userName" to={`/user/${data.userId}`}>
            {data.userName || '匿名'}
          </Link>
          <div className="board-postItem-tags">
            <div className="board-postItem-tag">
              <Tag style={{ width: 60, textAlign: 'center' }} color="blue">
                {data.hitCount > 10000
                  ? `${(data.hitCount / 10000).toFixed(0)}万`
                  : data.hitCount}
              </Tag>
            </div>
            <div className="board-postItem-tag">
              <Tag style={{ width: 60, textAlign: 'center' }} color="cyan">
                {data.replyCount}
              </Tag>
            </div>
          </div>
          <Link
            to={`/topic/${data.id}/${Math.ceil((data.replyCount + 1) / 10)}`}
          >
            <div className="board-postItem-lastReply">
              <span>{data.lastPostUser}</span>/
              <span>{moment(data.lastPostTime).format('YY-MM-DD hh:mm')}</span>
            </div>
          </Link>
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
