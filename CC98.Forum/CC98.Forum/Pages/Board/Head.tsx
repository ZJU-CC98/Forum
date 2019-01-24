import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBoard } from '@cc98/api';
import { Button } from 'antd';
import { AdsComponent } from '../../Components/MainPage';
import BigPaper from './Announcement';

interface Props {
  data: IBoard;
}
interface State {}
export default class extends React.Component<Props, State> {
  render() {
    const { data } = this.props;
    return (
      <div className="board-head-body">
        <Category data={data} />

        <BigPaper data={data} />

        <div className="board-head-bar">
          <div className="row">
            <Button className="board-head-button">发主题</Button>
            <Button
              className="board-head-button"
              style={{ marginLeft: '1rem' }}
            >
              发投票
            </Button>
          </div>
          <AdsComponent />
        </div>
      </div>
    );
  }
}

class Category extends React.Component<{ data: IBoard }, {}> {
  render() {
    const listUrl = `/list/${this.props.data.id}`;
    return (
      <div
        className="row"
        style={{
          alignItems: 'baseline',
          width: '100% ',
          justifyContent: 'flex-start',
          color: 'grey',
          fontSize: '0.75rem',
          marginBottom: '1rem'
        }}
      >
        <Link
          style={{ color: 'grey', fontSize: '1rem', marginRight: '0.5rem' }}
          to={'/'}
        >
          首页
        </Link>
        <i className="fa fa-chevron-right" />
        <Link
          style={{
            color: 'grey',
            fontSize: '1rem',
            marginRight: '0.5rem',
            marginLeft: '0.5rem'
          }}
          to="/boardlist"
        >
          版面列表
        </Link>
        <i className="fa fa-chevron-right" />
        <Link
          style={{ color: 'grey', fontSize: '1rem', marginLeft: '0.5rem' }}
          to={listUrl}
        >
          {this.props.data.name}
        </Link>
      </div>
    );
  }
}
