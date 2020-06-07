import * as React from 'react';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { UserInfo } from '../../States/AppState';
import { connect } from 'react-redux';
import { RootState } from '../../Store';

const themeList = ['系统默认', '冬季', '春季（浅色）', '春季（深色）', '夏季', '秋季（橙色）', '秋季（红色）', '双十一', '中秋（暗）', '中秋（亮）', '小雪（暗）', '小雪（亮）', '春节（暗）', '春节（亮）', '清明','端午'];

interface Props {
  userInfo: UserInfo;
  changeUserInfo: (userInfo: UserInfo) => void;
}

class Theme extends React.Component<Props> {
  handleSubmit = async (theme: number) => {
    try {
      let headers = await Utility.formAuthorizeHeader();
      const url = `/me/theme?id=${theme}`;
      let res = await Utility.cc98Fetch(url, {
        headers,
        method: 'PUT'
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        this.props.changeUserInfo({ ...this.props.userInfo, theme: theme });
        Utility.changeTheme(theme);
      }
    } catch (e) {
    }
  }

  render() {
    return (
      <div className="user-theme">
        <div className="user-theme-info"><h2>切换皮肤</h2><p>当前皮肤：{themeList[this.props.userInfo.theme]}</p></div>
        <div className="user-theme-config">
          <button style={{ backgroundColor: '#ffffff', border: "solid 1px" }} key={0} onClick={() => this.handleSubmit(0)} disabled={this.props.userInfo.theme === 0}>系统默认</button>
          <button style={{ backgroundColor: '#79b8ca' }} key={1} onClick={() => this.handleSubmit(1)} disabled={this.props.userInfo.theme === 1}>冬季</button>
          <button style={{ backgroundColor: '#b1d396' }} key={2} onClick={() => this.handleSubmit(2)} disabled={this.props.userInfo.theme === 2}>春季（浅色）</button>
          <button style={{ backgroundColor: '#95b675' }} key={3} onClick={() => this.handleSubmit(3)} disabled={this.props.userInfo.theme === 3}>春季（深色）</button>
          <button style={{ backgroundColor: '#5198d8' }} key={4} onClick={() => this.handleSubmit(4)} disabled={this.props.userInfo.theme === 4}>夏季</button>
        </div>
        <div className="user-theme-config">
          <button style={{ backgroundColor: '#F4A460' }} key={5} onClick={() => this.handleSubmit(5)} disabled={this.props.userInfo.theme === 5}>秋季（橙色）</button>
          <button style={{ backgroundColor: '#B22222' }} key={6} onClick={() => this.handleSubmit(6)} disabled={this.props.userInfo.theme === 6}>秋季（红色）</button>
          <button style={{ backgroundColor: 'rgb(240,125,145)' }} key={7} onClick={() => this.handleSubmit(7)} disabled={this.props.userInfo.theme === 7}>双十一交友</button>
          <button style={{ backgroundColor: 'rgb(38,118,129)' }} key={8} onClick={() => this.handleSubmit(8)} disabled={this.props.userInfo.theme === 8}>中秋（暗）</button>
          <button style={{ backgroundColor: 'rgb(52,150,159)' }} key={9} onClick={() => this.handleSubmit(9)} disabled={this.props.userInfo.theme === 9}>中秋（亮）</button>
        </div>
        <div className="user-theme-config">
          <button style={{ backgroundColor: 'rgb(3, 57, 117)' }} key={10} onClick={() => this.handleSubmit(10)} disabled={this.props.userInfo.theme === 10}>小雪（暗）</button>
          <button style={{ backgroundColor: 'rgb(122, 146, 194)' }} key={11} onClick={() => this.handleSubmit(11)} disabled={this.props.userInfo.theme === 11}>小雪（亮）</button>
          <button style={{ backgroundColor: 'rgb(205,0,0)' }} key={12} onClick={() => this.handleSubmit(12)} disabled={this.props.userInfo.theme === 12}>春节（暗）</button>
          <button style={{ backgroundColor: 'rgb(240,40,40)' }} key={13} onClick={() => this.handleSubmit(13)} disabled={this.props.userInfo.theme === 13}>春节（亮）</button>
          <button style={{ backgroundColor: 'rgb(70, 141, 57)' }} key={14} onClick={() => this.handleSubmit(14)} disabled={this.props.userInfo.theme === 14}>清明</button>
        </div>
        <div className="user-theme-config">
          <button style={{ backgroundColor: 'rgb(53, 120, 188)' }} key={15} onClick={() => this.handleSubmit(15)} disabled={this.props.userInfo.theme === 15}>端午</button>
        </div>
      </div>
    );
  }
}

function mapState(state: RootState) {
  return {
    userInfo: state.userInfo.currentUserInfo
  };
}

function mapDispatch(dispatch) {
  return {
    changeUserInfo: (userInfo: UserInfo) => {
      dispatch(Actions.changeUserInfo(userInfo));
    }
  };
}

export default connect(mapState, mapDispatch)(Theme);