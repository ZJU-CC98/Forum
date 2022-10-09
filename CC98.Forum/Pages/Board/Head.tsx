import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { IBoard } from '@cc98/api';
import { Button } from 'antd';
import { AdsComponent } from '../../Components/MainPage';
import BigPaper from './Announcement';

interface Props {
  data: IBoard;
  page:string;
}
interface State {}
export default class extends React.Component<Props, State> {
  render() {
    const { data, page } = this.props;
    let tip = null;
    let isLogOn = false;
    let isVerified = false;
    let isLocked = true;
    if (Utility.getLocalStorage('userInfo')) {
      isLogOn = true;
      if (!Utility.getLocalStorage('userInfo').isVerified) {
        isVerified = false;
        tip = <div style={{ marginLeft: "1rem", color: "red" }}>
        您的帐号未认证，无法发言，请先前往 
        <a href="https://account.cc98.org">https://account.cc98.org</a> 
        认证激活。
        </div>
      } else {
        isVerified = true;
      }

      if (Utility.getLocalStorage('userInfo').lockState !== 0) {
        isLocked = true;
        tip = (
          <div style={{ marginLeft: '1rem', color: 'red' }}>您被全站禁言。</div>
        );
      } else {
        isLocked = false;
      }
    } else {
      tip = (
        <div style={{ marginLeft: '1rem', color: 'red' }}>
          您还未登录，不能发帖，请先登录
        </div>
      );
    }

    return (
      <div className="board-head-body">
        <Category data={data} />

        <BigPaper key={page} data={data} isFirstPage={page==='1'} />

        <div className="board-head-bar">
          {isLogOn && isVerified && !isLocked ? (
            <div className="row">
              <Link to={`/editor/postTopic/${data.id}`}>
                <Button className="board-head-button">发主题</Button>
              </Link>
              <Link to={`/editor/postVoteTopic/${data.id}`}>
                <Button
                  className="board-head-button"
                  style={{ marginLeft: '1rem' }}
                >
                  发投票
                </Button>
              </Link>
            </div>
          ) : (
            tip
          )}
          <AdsComponent />
        </div>
      </div>
    );
  }
}

class Category extends React.Component<{ data: IBoard }, {}> {
  render() {
    const listUrl = `/board/${this.props.data.id}`;
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
