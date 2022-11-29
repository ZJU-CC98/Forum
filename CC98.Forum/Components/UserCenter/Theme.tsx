import * as React from 'react';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { UserInfo } from '../../States/AppState';
import { connect } from 'react-redux';
import { RootState } from '../../Store';

//const themeList = ['系统默认', '冬季', '春季（浅）', '春季（深）', '夏季', '秋季（橙）', '秋季（红）', '双十一', '中秋（暗）', '中秋（亮）', '小雪（暗）', '小雪（亮）', '春节（暗）', '春节（亮）', '仲春', '端午', '清明', '秋色之空（暗）', '秋色之空（亮）', '冬3（暗）', '冬3（亮）'];

interface Props {
  userInfo: UserInfo;
  changeUserInfo: (userInfo: UserInfo) => void;
}

/**
 * 主题列表
 */
interface StyleList {
  /**主题的顺序 */
  order: number
  /**主题的名字 */
  name: string;
  /**按钮的样式 */
  style: React.CSSProperties
}

/**
 * 具体的主题按钮样式
 * 每次添加新主题时修改这里
 */
const buttonStyles: StyleList[] = [
  { order: 0, name: "系统默认", style: { backgroundColor: '#ffffff' } },
  { order: 1, name: "冬季", style: { backgroundImage: "url(/static/images/header-image-thumb/winter.jpg)" } },
  { order: 2, name: "春季（浅）", style: { backgroundImage: "url(/static/images/header-image-thumb/spring.jpg)" } },
  { order: 3, name: "春季（深）", style: { backgroundImage: "url(/static/images/header-image-thumb/spring.jpg)" } },
  { order: 4, name: "夏季", style: { backgroundImage: "url(/static/images/header-image-thumb/summer.jpg)" } },
  { order: 5, name: "秋季（橙）", style: { backgroundImage: "url(/static/images/header-image-thumb/autumn.jpg)" } },
  { order: 6, name: "秋季（红）", style: { backgroundImage: "url(/static/images/header-image-thumb/autumn.jpg)" } },
  { order: 7, name: "双十一交友", style: { backgroundImage: "url(/static/images/header-image-thumb/singleday.jpg)" } },
  { order: 8, name: "中秋（暗）", style: { backgroundImage: "url(/static/images/header-image-thumb/mid_autumn.jpg)" } },
  { order: 9, name: "中秋（亮）", style: { backgroundImage: "url(/static/images/header-image-thumb/mid_autumn.jpg)" } },
  { order: 10, name: "小雪（暗）", style: { backgroundImage: "url(/static/images/header-image-thumb/light_snow.jpg)" } },
  { order: 11, name: "小雪（亮）", style: { backgroundImage: "url(/static/images/header-image-thumb/light_snow.jpg)" } },
  { order: 12, name: "春节（暗）", style: { backgroundImage: "url(/static/images/header-image-thumb/spring_festival_dark.jpg)" } },
  { order: 13, name: "春节（亮）", style: { backgroundImage: "url(/static/images/header-image-thumb/spring_festival_light.jpg)" } },
  { order: 14, name: "仲春", style: { backgroundImage: "url(/static/images/header-image-thumb/zhongchun.jpg)" } },
  { order: 15, name: "端午", style: { backgroundImage: "url(/static/images/header-image-thumb/dragon_boat_festival.jpg)" } },
  { order: 16, name: "清明", style: { backgroundImage: "url(/static/images/header-image-thumb/qingming.jpg)" } },
  { order: 17, name: "秋色之空（暗）", style: { backgroundImage: "url(/static/images/header-image-thumb/autumn_2022.jpg)" } },
  { order: 18, name: "秋色之空（亮）", style: { backgroundImage: "url(/static/images/header-image-thumb/autumn_2022.jpg)" } },
  { order: 19, name: "冬3（暗）", style: { backgroundImage: "url(/static/images/header-image-thumb/winter_2022_dark.jpg)" } },
  { order: 20, name: "冬3（亮）", style: { backgroundImage: "url(/static/images/header-image-thumb/winter_2022.jpg)" } },
]

let themeList = []
for (let i of buttonStyles) {
  themeList.push(i.name)
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
  generateButton = (item: StyleList) => {
    return <button style={item.style} key={item.order} onClick={() => this.handleSubmit(item.order)} disabled={this.props.userInfo.theme === item.order}>{item.name}</button>
  }

  render() {
    return (
      <div className="user-theme">
        <div className="user-theme-info"><h2>切换皮肤</h2><p>当前皮肤：{themeList[this.props.userInfo.theme]}</p></div>
        <div className="user-theme-config">
          {/** 
          <button style={{ backgroundColor: '#ffffff', border: "solid 1px" }} key={0} onClick={() => this.handleSubmit(0)} disabled={this.props.userInfo.theme === 0}>系统默认</button>
          <button style={{ backgroundImage: "url(/static/images/header-image/autumn_2022.jpg)" }} key={1} onClick={() => this.handleSubmit(1)} disabled={this.props.userInfo.theme === 1}>冬季</button>
          <button style={{ backgroundColor: '#b1d396' }} key={2} onClick={() => this.handleSubmit(2)} disabled={this.props.userInfo.theme === 2}>春季（浅）</button>
          <button style={{ backgroundColor: '#95b675' }} key={3} onClick={() => this.handleSubmit(3)} disabled={this.props.userInfo.theme === 3}>春季（深）</button>
          <button style={{ backgroundColor: '#5198d8', color: "white" }} key={4} onClick={() => this.handleSubmit(4)} disabled={this.props.userInfo.theme === 4}>夏季</button>
          <button style={{ backgroundColor: '#F4A460' }} key={5} onClick={() => this.handleSubmit(5)} disabled={this.props.userInfo.theme === 5}>秋季（橙）</button>
          <button style={{ backgroundColor: '#B22222', color: "white" }} key={6} onClick={() => this.handleSubmit(6)} disabled={this.props.userInfo.theme === 6}>秋季（红）</button>
          <button style={{ backgroundColor: 'rgb(240,125,145)' }} key={7} onClick={() => this.handleSubmit(7)} disabled={this.props.userInfo.theme === 7}>双十一交友</button>
          <button style={{ backgroundColor: 'rgb(38,118,129)', color: "white" }} key={8} onClick={() => this.handleSubmit(8)} disabled={this.props.userInfo.theme === 8}>中秋（暗）</button>
          <button style={{ backgroundColor: 'rgb(52,150,159)', color: "white" }} key={9} onClick={() => this.handleSubmit(9)} disabled={this.props.userInfo.theme === 9}>中秋（亮）</button>
          <button style={{ backgroundColor: 'rgb(3, 57, 117)', color: "white" }} key={10} onClick={() => this.handleSubmit(10)} disabled={this.props.userInfo.theme === 10}>小雪（暗）</button>
          <button style={{ backgroundColor: 'rgb(122, 146, 194)', color: "white" }} key={11} onClick={() => this.handleSubmit(11)} disabled={this.props.userInfo.theme === 11}>小雪（亮）</button>
          <button style={{ backgroundColor: 'rgb(205,0,0)', color: "white" }} key={12} onClick={() => this.handleSubmit(12)} disabled={this.props.userInfo.theme === 12}>春节（暗）</button>
          <button style={{ backgroundColor: 'rgb(214,14,36)', color: "white" }} key={13} onClick={() => this.handleSubmit(13)} disabled={this.props.userInfo.theme === 13}>春节（亮）</button>
          <button style={{ backgroundColor: 'rgb(70, 141, 57)', color: "white" }} key={14} onClick={() => this.handleSubmit(14)} disabled={this.props.userInfo.theme === 14}>仲春</button>
          <button style={{ backgroundColor: 'rgb(53, 120, 188)', color: "white" }} key={15} onClick={() => this.handleSubmit(15)} disabled={this.props.userInfo.theme === 15}>端午</button>
          <button style={{ backgroundColor: 'rgb(106, 132, 113)', color: "white" }} key={16} onClick={() => this.handleSubmit(16)} disabled={this.props.userInfo.theme === 16}>清明</button>
          <button style={{ backgroundColor: 'rgb(183, 115, 65)', color: "white" }} key={17} onClick={() => this.handleSubmit(17)} disabled={this.props.userInfo.theme === 17}>秋色之空（暗）</button>
          <button style={{ backgroundColor: 'rgb(235, 142, 85)', color: "white" }} key={18} onClick={() => this.handleSubmit(18)} disabled={this.props.userInfo.theme === 18}>秋色之空（亮）</button>
          <button style={{ backgroundColor: 'rgb(125,85,119)', color: "white" }} key={19} onClick={() => this.handleSubmit(19)} disabled={this.props.userInfo.theme === 19}>冬3（暗）</button>
          <button style={{ backgroundColor: 'rgb(181, 127, 163)', color: "white" }} key={20} onClick={() => this.handleSubmit(20)} disabled={this.props.userInfo.theme === 20}>冬3（亮）</button>
        */}
          {buttonStyles.map(this.generateButton)}

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