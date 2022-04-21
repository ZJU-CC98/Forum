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

function generateListPager(item: number, id: number) {
  const url = `/topic/${id}/${item}`;
  if (item != -1) {
    return (
      <div style={{ marginRight: '0.3rem' }}>
        <Link style={{ color: '#79b8ca' }} to={url}>
          {item}
        </Link>
      </div>
    );
  } else {
    return <div style={{ marginRight: '0.3rem' }}>...</div>;
  }
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

  const content = <Card key={data.id} data={data} />;
  let c: any = '#000';
  let b: any = 'normal';
  let i: any = 'normal';
  if (data.highlightInfo) {
    if (data.highlightInfo.isBold) b = 'bold';
    if (data.highlightInfo.isItalic) i = 'italic';
    if (data.highlightInfo.color) c = data.highlightInfo.color;
  }

  const count = data.replyCount + 1;
  let totalPage =
    count % 10 === 0 ? count / 10 : (count - (count % 10)) / 10 + 1;

  const pager = [];
  if (totalPage === 1) {
    // pager to be []
  } else if (totalPage <= 7) {
    for (let i = 1; i <= totalPage; i++) pager.push(i);
  } else {
    pager.push(1, 2, 3, 4, -1, totalPage - 2, totalPage - 1, totalPage);
  }

  const tagInfo = JSON.parse(localStorage.getItem('tagInfo').slice(4));
  let tag1 = '',
    tag2 = '';

  for (let item of tagInfo) {
    if (item.id === data.tag1) tag1 = `[${item.name}]`;
    if (item.id === data.tag2) tag2 = `[${item.name}]`;
  }
  console.log(tag1);

  return (
    <Popover
      title={
        <Link style={{ lineHeight: '1rem' }} to={`/topic/${data.id}`}>
          {data.title}
        </Link>
      }
      content={content}
      mouseEnterDelay={1.5}
    >
      <div className={bodyClass}>
        <Tooltip title={iconText}>
          <div className="board-postItem-icon">
            <img src={iconSrc} />
          </div>
        </Tooltip>
        <div className="board-postItem-title" style={{ display: 'flex' }}>
          <Link
            to={`/topic/${data.id}`}
            style={{
              color: c,
              fontWeight: b,
              fontStyle: i,
              marginRight: '0.3rem',
              fontSize: '1rem'
            }}
          >
            {`${tag1}${tag2}${data.title}`}
          </Link>

          {/* <Tag style={{ marginLeft: '1rem' }} color="magenta">
          速览
        </Tag> */}
          {pager.map(page => generateListPager(page, data.id))}
        </div>

        <div className="board-postItem-right">
          {data.userName ? (
            <Link
              className="board-postItem-userName"
              to={`/user/id/${data.userId}`}
            >
              {data.userName}
            </Link>
          ) : (
            <div className="board-postItem-userName">匿名</div>
          )}
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
              <span>{moment(data.lastPostTime).format('YY-MM-DD HH:mm')}</span>
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
      <Link to={`/user/id/${item.userId}`}>
        <div className="board-postItem-card-username">{item.userName}</div>
      </Link>
    </div>
    <div className="board-postItem-card-content">
      <UbbContainer
        code={item.content}
        options={{ ...new UbbCodeOptions(), allowToolbox: true }}
      />
    </div>
  </div>
);

export default Item;
