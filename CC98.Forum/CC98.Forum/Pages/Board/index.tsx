import * as React from 'react';

import { getBoardInfo } from './action';
import { IBoard } from '@cc98/api';

import Head from './Head';
import Body from './Body';

interface Props {
  match: any;
}
interface State {
  data: IBoard | null;
}
export default class extends React.Component<Props, State> {
  state = { data: null };
  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getBoardInfo(id);
    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    const page = this.props.match.params.page;

    return data ? (
      <div className="board-body">
        <Head data={data} page={page || '1'} />
        <Body data={data} page={page || '1'} />
      </div>
    ) : null;
  }
}
