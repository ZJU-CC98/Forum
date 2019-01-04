import * as React from 'react';
import TopicList from './TopicList';
// import { IBoard } from '@cc98/api';
import { cc98Fetch } from '../../../Utility/fetchUtility';
import { RouteComponent } from '../../RouteComponent';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

interface Props {
  history: any;
}
interface State {
  data: any;
  topicCount: number;
}
interface Match {
  boardId: string;
  page?: string;
}
export default withRouter(
  class extends RouteComponent<Props, State, Match> {
    state = {
      data: null,
      topicCount: 0
    };
    async componentDidMount() {
      await this.getBoardInfo();
    }

    getBoardInfo = async () => {
      const { boardId } = this.match.params;
      const url = `/board/${boardId}`;
      const response = await cc98Fetch(url);
      const data = await response.json();
      const { topicCount } = data;
      this.setState({ data, topicCount });
    };

    onChange = pageNumber => {
      const { boardId } = this.match.params;
      this.props.history.push(`/board/${boardId}/${pageNumber}`);
    };

    render() {
      const { data, topicCount } = this.state;
      const { page } = this.match.params;
      const _page = page ? parseInt(page, 10) : 1;
      return (
        <>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            pageSize={20}
            total={topicCount}
            current={_page}
            onChange={this.onChange}
          />
          {data && <TopicList key={page} data={data} page={page} />}
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            pageSize={20}
            total={topicCount}
            current={_page}
            onChange={this.onChange}
          />
        </>
      );
    }
  }
);
