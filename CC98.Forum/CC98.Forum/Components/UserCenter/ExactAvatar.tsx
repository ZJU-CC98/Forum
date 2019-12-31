// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { UserInfo } from '../../States/AppState';
import { Link } from 'react-router-dom';

interface State {
  displayTitles: DispalyTitle[];
  url: string;
}

interface DispalyTitle {
  id: number;
  name: string;
}

//用户中心主页用户头像与徽章组件
export default class extends React.Component<UserCenterExactAvatarProps, State> {
  state: State = {
    displayTitles: [],
    url: ''
  }

  componentDidMount() {
    this.getTitle();
  }

  async getTitle() {
    try {
      const url = '/config/global/all-user-title';
      let res = await Utility.cc98Fetch(url);
      let data = await res.json() as DispalyTitle[];
      this.setState({
        displayTitles: data
      }, this.getPortraitPhotoURL);
    } catch (e) {

    }
  }

  async getPortraitPhotoURL() {
    let res = await fetch('/static/portrait.json');
    let data = await res.json()
    let title = this.state.displayTitles.filter(item => this.props.userInfo.displayTitleId === item.id)[0]
    if (title) {
      let imageUrl: string;
      if (this.props.userInfo.displayTitleId === 82) {
        imageUrl = data.吉祥物.imageUrl;
        this.setState({
          url: imageUrl
        })
      }
      else if (this.props.userInfo.displayTitleId === 18) {
        imageUrl = data.版主.imageUrl;
        this.setState({
          url: imageUrl
        })
      }
      else if (this.props.userInfo.displayTitleId === 22) {
        imageUrl = data.版主.imageUrl;
        this.setState({
          url: imageUrl
        })
      }
      else if (this.props.userInfo.displayTitleId === 32) {
        imageUrl = data.站务组.imageUrl;
        this.setState({
          url: imageUrl
        })
      }
      else if (this.props.userInfo.displayTitleId === 21) {
        imageUrl = data.站务组.imageUrl;
        this.setState({
          url: imageUrl
        })
      }
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }} className="user-avatar">
        <img className="user-avatar-img" src={this.props.userInfo.portraitUrl} />
        {this.state.url ? <img style={{ width: '13.32rem', position: 'absolute', top: '-1.45rem' }} src={this.state.url} /> : null}
        <div className="user-badge">
          {this.state.displayTitles && this.props.userInfo.userTitleIds ?
            this.state.displayTitles.filter(item => this.props.userInfo.userTitleIds.indexOf(item.id) !== -1).map(item => [18, 81].indexOf(item.id) === -1 ?
              <p style={{ color: 'red' }}>{item.name}</p> :
              null) :
            null
          }
          {this.props.userInfo.boardMasterTitles.map(item => item.boardMasterLevel === 10 ?
            <p key={item.boardId}> {/* 站务主管*/}
              <Link to={`/boardList#${item.boardName}`}>{item.boardName}</Link>
              <span style={{ color: 'red' }}>{item.title}</span>
            </p> :
            <p key={item.boardId}> {/* 站务主管*/}
              <Link to={`/board/${item.boardId}`}>{item.boardName}</Link>
              <span>{item.title}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
}

interface UserCenterExactAvatarProps {
  /**
  * 用户信息
  */
  userInfo: UserInfo;
}