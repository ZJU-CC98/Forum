import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponent } from '../RouteComponent';
import * as Utility from '../../Utility';
import * as moment from 'moment';
interface Props {
  userInfo;
  isAnonymous;
  topicInfo;
  traceMode;
  isHot;
}
export class Replier extends RouteComponent<Props, { traceMode, buttonIsDisabled, buttonInfo, isFollowing, fanCount, photoframe }, { topicid }>{
  constructor(props, content) {

    super(props, content);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.changeTraceMode = this.changeTraceMode.bind(this);
    this.state = {
      traceMode: this.props.traceMode, buttonInfo: this.props.userInfo.isFollowing ? '取关' : '关注',
      buttonIsDisabled: false,
      isFollowing: this.props.userInfo.isFollowing, fanCount: this.props.userInfo.fanCount,
      photoframe: null,
    };
  }

  changeTraceMode() {
    this.setState({ traceMode: this.state.traceMode === true ? false : true });
  }
  async unfollow() {
    try {
      this.setState({
        buttonIsDisabled: true,
        buttonInfo: '...'
      });
      const token = Utility.getLocalStorage("accessToken");
      const userId = this.props.userInfo.id;
      const url = `/me/followee/${userId}`;
      const headers = new Headers();
      headers.append('Authorization', token);
      let res = await Utility.cc98Fetch(url, {
        method: 'DELETE',
        headers
      });
      if (res.status === 200) {
        await Utility.updateUserInfo(this.props.userInfo.id, this.props.userInfo.name);
        this.setState({
          buttonIsDisabled: false,
          buttonInfo: '关注',
          isFollowing: false,
          fanCount: this.props.userInfo.fanCount
        });
      } else {
        throw {};
      }
    } catch (e) {
      alert("网络错误");
    }
  }

  async follow() {
    try {
      this.setState({
        buttonIsDisabled: true,
        buttonInfo: '...'
      });
      const token = Utility.getLocalStorage("accessToken");

      const userId = this.props.userInfo.id;
      const url = `/me/followee/${userId}`;
      const headers = new Headers();
      headers.append('Authorization', token);
      let res = await Utility.cc98Fetch(url, {
        method: 'PUT',
        headers
      });
      if (res.status === 200) {
        await Utility.updateUserInfo(this.props.userInfo.id, this.props.userInfo.name);
        this.setState({
          buttonIsDisabled: false,
          buttonInfo: '取关',
          isFollowing: true,
          fanCount: this.props.userInfo.fanCount + 1
        });
      } else {
        throw {};
      }
    } catch (e) {
      alert("网络错误");
    }
  }
  async componentDidMount() {
    /** 用户组 */
    const displayTitleId = this.props.userInfo.displayTitleId;
    //获取头像框JSX.Element
    let photoframe = await this.getPhotoFrame(displayTitleId);
    this.setState({
      photoframe: photoframe
    })
  }

  /**
   * 根据displayTitle返回头像框的HTML
   * @param displayTitleId
   */
  async getPhotoFrame(displayTitleId: number) {

    const url = `/user/id/${this.props.userInfo.id}`;
    const realUrl = encodeURI(url);//头像所用的url，链接到用户中心
    if (this.props.isAnonymous == true) {
      return <div style={{ width: "100%", justifyContent: "center", display: "flex", position: "relative" }}>
        <div style={{ zIndex: 100 }}>

          <img className="userPortrait" src={this.props.userInfo.portraitUrl}></img>

        </div>
      </div>;
    }


    else if (displayTitleId) {
      //获取头像框样式的配置
      let response = await fetch('/static/portrait.json');
      let data = await response.json();
      /** 头像框图片链接 */
      let imageUrl;
      /** 头像框默认样式 */
      let style = data.普通.style;

      switch (displayTitleId) {
        case 82: style = data.吉祥物.style; imageUrl = data.吉祥物.imageUrl; break;
        case 18: style = data.版主.style; imageUrl = data.版主.imageUrl; break;
        case 22: style = data.版主.style; imageUrl = data.版主.imageUrl; break;
        case 85: style = data.编辑部.style; imageUrl = data.编辑部.imageUrl; break;
        case 29: style = data.编辑部.style; imageUrl = data.编辑部.imageUrl; break;
        case 37: style = data.技术组.style; imageUrl = data.技术组.imageUrl; break;
        case 23: style = data.技术组.style; imageUrl = data.技术组.imageUrl; break;
        case 28: style = data.贵宾.style; imageUrl = data.贵宾.imageUrl; break;
        case 16: style = data.贵宾.style; imageUrl = data.贵宾.imageUrl; break;
        case 84: style = data.策划部.style; imageUrl = data.策划部.imageUrl; break;
        case 34: style = data.策划部.style; imageUrl = data.策划部.imageUrl; break;
        case 96: style = data.影音部.style; imageUrl = data.影音部.imageUrl; break;
        case 99: style = data.影音部.style; imageUrl = data.影音部.imageUrl; break;
        case 32: style = data.站务组.style; imageUrl = data.站务组.imageUrl; break;
        case 21: style = data.站务组.style; imageUrl = data.站务组.imageUrl; break;
        case 86: style = data.体育部.style; imageUrl = data.体育部.imageUrl; break;
        case 35: style = data.体育部.style; imageUrl = data.体育部.imageUrl; break;
        case 94: style = data.办公室.style; imageUrl = data.办公室.imageUrl; break;
        case 93: style = data.办公室.style; imageUrl = data.办公室.imageUrl; break;
        case 91: style = data.认证用户.style; imageUrl = data.认证用户.imageUrl; break;
        default: imageUrl = data.普通.imageUrl;
      }

      /** 头像框阴影 */
      let shadow = {};
      //已有的头像框
      if (
        displayTitleId === 82 ||
        displayTitleId === 18 ||
        displayTitleId === 22 ||
        displayTitleId === 32 ||
        displayTitleId === 21 ||
        displayTitleId === 28 ||
        displayTitleId === 16 ||
        displayTitleId === 37 ||
        displayTitleId === 23 ||
        displayTitleId === 29 ||
        displayTitleId === 85 ||
        displayTitleId === 84 ||
        displayTitleId === 34 ||
        displayTitleId === 94 ||
        displayTitleId === 93 ||
        displayTitleId === 35 ||
        displayTitleId === 86 ||
        displayTitleId === 96 ||
        displayTitleId === 99 ||
        displayTitleId === 91
      )
        shadow = { boxShadow: "0 0 0" };    //目前的头像框暂时没有阴影

      return (
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            position: "relative"
          }}
        >
          <div style={{ zIndex: 100 }}>
            <a href={realUrl} style={{ display: "block", maxHeight: "5rem" }}>
              <img
                className="userPortrait"
                src={this.props.userInfo.portraitUrl}
                style={shadow}
                onError={this.handleImageErrored.bind(this)}
              />
            </a>
          </div>
          <div className="photoFrame">
            <img src={imageUrl} style={style} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            position: "relative"
          }}
        >
          <div style={{ zIndex: 100 }}>
            <a href={realUrl} style={{ display: "block", maxHeight: "7.5rem" }}>
              <img
                className="userPortrait"
                src={this.props.userInfo.portraitUrl} onError={this.handleImageErrored.bind(this)}
              />
            </a>
          </div>
        </div>
      )
    }
  }
  /** 处理显示错误的头像 */
  async handleImageErrored(e) {
    e.preventDefault();
    e.target.src = "/static/images/default_avatar_boy.png"//将错误的头像url替换为默认头像url
  }

  render() {
    let urlHtml;
    if (!this.props.isAnonymous) {
      const url = `/user/id/${this.props.userInfo.id}`;
      const realUrl = encodeURI(url);
      //用户头像
      urlHtml = <a href={realUrl} style={{ display: "block", maxHeight: "7.5rem" }}><img className="userPortrait" src={this.props.userInfo.portraitUrl} ></img></a>;
    }


    if (this.props.isAnonymous == true) {
      urlHtml = <div style={{ display: "block", maxHeight: "7.5rem" }}><img className="userPortrait" src={this.props.userInfo.portraitUrl}></img></div>;
    }
    let topicNumber = '帖数';
    if (!this.props.userInfo.id) {
      topicNumber = '';
    }

    let userName = <div style={{ color: "#fff" }} className="userMessage-userName">{this.props.userInfo.name}</div>;
    if (!this.props.isAnonymous) {
      const url = `/user/id/${this.props.userInfo.id}`;
      const realUrl = encodeURI(url);
      userName = <Link style={{ color: "#fff" }} className="userMessage-userName" to={realUrl}>{this.props.userInfo.name}</Link>;
    }


    if (this.props.userInfo.privilege == "匿名" || this.props.userInfo.privilege === "匿名用户") {
      userName = <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ color: "white", fontSize: "1rem", fontWeight: "bold", marginLeft: "1rem", marginTop: "-0.8rem" }} >{this.props.userInfo.name}</div>
        <div className="userMessageAnonymous">别问我是谁</div>
      </div>;
    }
    let traceButton;

    const hotInfo = <div style={{ color: "red", marginLeft: "1rem" }}><span>最热回复</span><span>(第</span><span>{this.props.topicInfo.floor}</span><span>楼)</span></div>;
    const normalInfo = <div style={{ marginLeft: "0.625rem" }}><span>第</span><span style={{ color: "red" }}>{this.props.topicInfo.floor}</span><span>楼</span></div>;
    let btn = null;
    if (Utility.getLocalStorage("userInfo")) {
      if (Utility.getLocalStorage("userInfo").name !== this.props.userInfo.name && !this.props.isAnonymous) {
        const email = `/message/message?id=${this.props.userInfo.id}`;
        btn = <div className="row userMessageBtn" >
          <div style={{ marginLeft: "0.85rem" }}><button className="replierBtn" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button></div>
          <div style={{ marginLeft: "0.5rem" }}> <Link to={email}><button className="replierBtn">私信</button></Link></div>
        </div>;
      }
    }
    let lastLogOn;
    const curTime = new Date().getTime();
    const lastTime = new Date(this.props.userInfo.lastLogOnTime).getTime();
    const days = parseInt((Math.abs(lastTime - curTime) / 1000 / 60 / 60 / 24).toString());
    const hours = parseInt((Math.abs(lastTime - curTime) / 1000 / 60 / 60).toString());
    let fanCount = this.state.fanCount;
    if (days > 365) lastLogOn = '一年前';
    else if (days > 30) lastLogOn = '一月前';
    else if (days > 7) lastLogOn = '一周前';
    else if (days > 1) lastLogOn = `${days}天前`;
    else if (hours > 1) lastLogOn = `${hours}小时前`;
    else lastLogOn = '1小时内';
    let userDetailMessage = null;
    if (!this.props.isAnonymous) {
      userDetailMessage =
        <div className="column" style={{ width: "60%", alignItems: "flex-start", paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <div className="userMessageOpt">
            帖数 {this.props.userInfo.postCount}
          </div>
          <div className="userMessageOpt">
            粉丝 {fanCount}
          </div>

          <div className="userMessageOpt">
            威望 {this.props.userInfo.prestige}
          </div>

          <div className="userMessageOpt">
            风评 {this.props.userInfo.popularity}
          </div>
          <div className="userMessageOpt">
            最后登录 {lastLogOn}
          </div>
        </div>;


    }

    let gender = <div className="userGender">
      {this.props.userInfo.gender === 0 ? <i className="fa fa-venus" style={{ color: "#fff" }}></i> : <i className="fa fa-mars" style={{ color: "#fff" }}></i>}
    </div>;
    if (this.props.isAnonymous == true) {
      gender = null;

    }

    return <div className="userMessage">

      <div className="column userMessage-left">
        {userName}
        {userDetailMessage}
      </div>

      <div className="column userMessage-right">
        {gender}
        {this.state.photoframe}
        {btn}
      </div>





    </div>;

  }
}
/*return <div className="replyRoot">
            <div className="row" style={{ width: "100%", display: "flex", marginBottom: "0.625rem" }}>

                <div className="row mouse-userDetails" style={{ height: "15.625rem" }} >
                    <div className="authorImg" style={{ height: "6rem" }}>{urlHtml}</div>
                    <div className="userDetails" style={{ display: "none", position: "absolute" }}>
                        {userDetails}
                    </div>

                </div>
                <div className="column" id="rpymes" >
                    <div className="row" id="replierMes">
                        {this.props.isHot ? hotInfo : normalInfo}
                        <div className="rpyClr" style={{ marginLeft: "0.625rem" }}>{userName}</div>
                        <div id="topicsNumber" style={{ marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" }}>{topicNumber}&nbsp;<span style={{ color: "red" }}>{this.props.sendTopicNumber}</span> </div>
                    </div>
                    <div className="row" style={{ alignItems: "center", display: "flex", flexWrap: "nowrap" }}>
                        <div id="clockimg" style={{ marginLeft: "0.375rem" }}><i className="fa fa-clock-o fa-lg fa-fw" style={{ fontSize:"1rem" }}></i></div>
                        <div><span className="timeProp">{moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                        <div className="reputation">风评值：{this.props.popularity}
                            </div>
                    </div>
                </div>
                <div style={{ height: "6rem", marginRight:"2rem" }}>
                    <div id="operation"  >
                        <button className="operation" onClick={this.quote}>引用</button>
                        <button className="operation"><Link to="">编辑</Link></button>
                        {emailButton}
                        {traceButton}
                    </div>
                   </div>
            </div></div>;*/