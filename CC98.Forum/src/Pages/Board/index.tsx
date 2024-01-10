import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { getBoardInfo } from './action';
import { IBoard } from '@cc98/api';

import * as Utility from '../../Utility'
import Head from './Head';
import Body from './Body';
import { RouteComponent } from '../../Components/RouteComponent';

interface Props {
  history: any;
}
interface State {
  data: IBoard | null;
}
interface Match {
  id: string;
  page: string;
}
export default withRouter(
  class extends RouteComponent<Props, State, Match> {
    state = { data: null };
    async componentDidMount() {
      await Utility.getTagInfo()
      const { params } = this.match;
      const { id } = params;
      const data = await getBoardInfo(id);
      if (data === 'not found') {
        this.props.history.push('/error/404');
      } else if (data === 'unauthorized') {
        this.props.history.push('/error/401');
      } else if (data === 'server error') {
        this.props.history.push('/error/500');
      } else {
        this.setState({ data });
      }
    }
    render() {
      const { data } = this.state;
      const page = this.match.params.page;

      return data ? (
        <div className="board-body">
          <Head data={data} page={page || '1'} />
          <Body data={data} page={page || '1'} />
        </div>
      ) : null;
    }
  }
);
