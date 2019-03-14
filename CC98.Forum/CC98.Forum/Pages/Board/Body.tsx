import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponent } from '../../Components/RouteComponent';
import { IBoard, ITopic, ITagGroup } from '@cc98/api';
import {
  getNormalTopics,
  getTopTopics,
  getBestTopics,
  getSaveTopics,
  getTags,
  getTagTopics
} from './action';
import { Pagination, Spin } from 'antd';
import List from './PostList';
import Head from './ListHead';
import Footer from './Footer'

interface Props {
  data: IBoard;
  page: string;
  history: any;
}

interface State {
  list: ITopic[];
  topList: ITopic[];
  type: number;
  topicCount: number;
  tags: ITagGroup[];
  tag1: number;
  tag2: number;
}
interface Match { }
class Body extends RouteComponent<Props, State, Match> {
  state = {
    list: [],
    topList: [],
    type: 0,
    topicCount: 0,
    tags: [],
    tag1: -1,
    tag2: -1
  };
  async componentDidMount() {
    const { page, data } = this.props;
    this.setState({ topicCount: data.topicCount });
    this.getTopTopics();
    this.getTopics(page);
    this.getBoardTags();
  }

  getBoardTags = async () => {
    const tags = await getTags(this.props.data.id);
    this.setState({ tags });
  };

  getTopics = async page => {
    const { data } = this.props;
    const { type, tag1, tag2 } = this.state;
    let list = [];
    let response = null;
    // 没有标签
    if (tag1 === -1 && tag2 === -1) {
      if (type === 0) {
        list = await getNormalTopics(data.id, page);
        this.setState({ list });
      } else if (type === 1) {
        response = await getBestTopics(data.id, page);
        list = response.topics;
        this.setState({ list, topicCount: response.count });
      } else {
        response = await getSaveTopics(data.id, page);
        list = response.topics;
        this.setState({ list, topicCount: response.count });
      }
    } else {
      response = await getTagTopics(data.id, page, tag1, tag2);
      list = response.topics;
      this.setState({ list, topicCount: response.count });
    }

    // TODO 错误跳转
  };

  getTopTopics = async () => {
    const { data } = this.props;
    const topList = await getTopTopics(data.id);
    // TODO 错误跳转
    this.setState({ topList });
  };

  onChange = page => {
    this.getTopics(page);
    const pathname = window.location.pathname;
    // 首先判断是不是第一页
    if (this.props.page === '1') {
      // 判断url有没有/1
      if (pathname.substr(pathname.lastIndexOf('/') + 1) === '1') {
        this.props.history.push(
          `${pathname.substr(0, pathname.lastIndexOf('/'))}/${page}`
        );
      } else {
        this.props.history.push(`${pathname}/${page}`);
      }
    } else {
      this.props.history.push(
        `${pathname.substr(0, pathname.lastIndexOf('/'))}/${page}`
      );
    }
  };

  changeType = (type: number) => {
    const { data, page } = this.props;
    this.setState({ type }, () => this.getTopics(page));
  };

  handleTag1Change = (tag1: number) => {
    this.setState({ tag1 }, () => this.getTopics(this.props.page));
  };

  handleTag2Change = (tag2: number) => {
    this.setState({ tag2 }, () => this.getTopics(this.props.page));
  };

  render() {
    const { data } = this.props;
    const { list, topList, topicCount, tags } = this.state;
    const page = parseInt(this.props.page);

    const boardList = page === 1 ?[].concat(topList).concat(list): [].concat(list);

    return boardList.length === 0 ? (
      <Spin size="large" />
    ) : (
        <>
          <div className="board-list-bar">
            <Pagination
              className="board-pagination"
              showQuickJumper
              current={page}
              total={topicCount}
              pageSize={20}
              onChange={this.onChange}
            />
          </div>
          <Head
            onChange={type => this.changeType(type)}
            tags={tags}
            handleTag1Change={this.handleTag1Change}
            handleTag2Change={this.handleTag2Change}
          />
          <List list={boardList} />
          <div className="board-list-bar">
            <Pagination
              className="board-pagination"
              showQuickJumper
              current={page}
              pageSize={20}
              total={topicCount}
              onChange={this.onChange}
            />
          </div>
          <Footer data={data} list={list} />
        </>
      );
  }
}
export default withRouter(Body);
