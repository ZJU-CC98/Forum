import * as React from 'react';
import * as Utility from '../Utility';
import { UbbEditor } from './UbbEditor';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
export class Signin extends React.Component<{ history }, { signinInfo, content }>{
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.signin = this.signin.bind(this);
    this.state = {
      signinInfo: { lastSignInCount: 0, lastSignInTime: 0 }, content: ""
    }
  }
  async componentDidMount() {
    const signinInfo = await Utility.getSigninInfo();
    this.setState({ signinInfo: signinInfo });
  }
  update(value) {
    this.setState({ content: value });
  }
  async signin() {
    Utility.signin(this.state.content);
    const signInMes = await Utility.getGlobalConfig();
    const signInTopicId = signInMes.signInTopicId;
    const topicInfo = await Utility.getTopicInfo(signInTopicId);
    const count = topicInfo.replyCount;
    const page = Utility.getTotalPageof10(count);
    let floor = (count + 1) % 10;
    if (floor === 0) floor = 10;
    this.props.history.push(`/topic/${signInTopicId}/${page}#${floor}`);
    this.setState({ content: "" });
    //设定已签到状态和有效期
    let userInfo = Utility.getLocalStorage("userInfo");
    let workTime = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 86400000 - new Date().getTime()) / 1000;
    Utility.setLocalStorage(`signin_${userInfo.id}`, true, workTime);
  }
  render() {
    let info;
    if (this.state.signinInfo.hasSignedInToday) {
      //设定已签到状态和有效期
      let userInfo = Utility.getLocalStorage("userInfo");
      let workTime = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 86400000 - new Date().getTime()) / 1000;
      Utility.setLocalStorage(`signin_${userInfo.id}`, true, workTime);
      //设定已签到信息
      info = <div><div className="row" style={{ justifyContent: "center" }}>
        你上次的签到日期是{moment(this.state.signinInfo.lastSignInTime).format('YYYY-MM-DD HH:mm:ss')}
      </div>
        <div className="row" style={{ justifyContent: "center" }}>
          你已经连续签到了{this.state.signinInfo.lastSignInCount}天
            </div>
      </div>;
    } else {
      //设定未签到信息
      let userInfo = Utility.getLocalStorage("userInfo");
      Utility.removeLocalStorage(`signin_${userInfo.id}`);
      info = <div className="column">
        <div className="row">你今天还未签到</div>
        <div style={{ marginTop: "1.5rem" }}>
          <UbbEditor update={this.update} value={this.state.content} option={{ height: 10 }} />
          <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
            <div id="post-topic-button" onClick={this.signin} className="button blue" style={{ marginTop: "1.25rem", width: "6rem", height: "2rem", lineHeight: "2rem", letterSpacing: "0.3125rem" }}>签到
                    </div>
          </div>
        </div>
      </div>
    }
    return <div className="sign-in">
      <div className="row" style={{ width: "100%", justifyContent: "center" }}>
        论坛签到
      </div>
      <div className="row">
        签到功能是 CC98 论坛提供的一项娱乐功能。每个用户每天可以签到一次，并获得额外的论坛财富值奖励。如果连续多日签到，则奖励会不断增加。目前财富值的奖励情况如下表所示：
      </div>
      <div className="column" style={{ marginLeft: "2rem" }}>
        <div className="row">
          第 1 天： 600 到 1200 论坛财富值
        </div>
        <div className="row">
          第 2 天： 700 到 1400 论坛财富值
        </div>
        <div className="row">
          第 3 天： 800 到 1600 论坛财富值
        </div>
        <div className="row">
          第 4 天： 900 到 1800 论坛财富值
        </div>
        <div className="row">
          第 5 天及以后： 1000 到 2000 论坛财富值
        </div>
      </div>
      {info}
    </div>
  }
}

export const ShowSignin = withRouter(Signin);