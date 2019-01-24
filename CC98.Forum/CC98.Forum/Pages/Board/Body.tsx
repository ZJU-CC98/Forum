import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponent } from '../../Components/RouteComponent';
import { IBoard, ITopic } from '@cc98/api';
import { getNormalTopics, getTopTopics } from './action';
import { Pagination } from 'antd';
import List from './PostList';
import Head from './ListHead';

interface Props {
  data: IBoard;
  page: string;
  history: any;
}

interface State {
  list: ITopic[];
  topList: ITopic[];
}
interface Match {}
class Body extends RouteComponent<Props, State, Match> {
  state = {
    list: [],
    topList: []
  };
  async componentDidMount() {
    const { page } = this.props;
    this.getTopTopics();
    this.getTopics(page);
  }
  getTopics = async page => {
    const { data } = this.props;
    const list = await getNormalTopics(data.id, page);
    // TODO 错误跳转
    this.setState({ list });
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

  render() {
    const { data } = this.props;
    const { list, topList } = this.state;
    const page = parseInt(this.props.page)

    const boardList = [].concat(topList).concat(list);

    return boardList.length === 0 ? null : (
      <>
        <Pagination
          className="board-pagination"
          showQuickJumper
          current={page}
          total={data.topicCount}
          pageSize={20}
          onChange={this.onChange}
        />
        <Head />
        <List list={boardList} />
        <Pagination
          className="board-pagination"
          showQuickJumper
          current={page}
          pageSize={20}
          total={data.topicCount}
          onChange={this.onChange}
        />
        ,
      </>
    );
  }
}
export default withRouter(Body);
