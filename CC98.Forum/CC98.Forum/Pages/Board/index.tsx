import * as React from 'react';
import { getBoardInfo } from './action';
import {IBoard} from '@cc98/api';

interface Props {
  id: string;
}
export default class extends React.Component<Props> {
  state: {data: IBoard};
  async componentDidMount() {}
  render() {
    return <></>;
  }
}
