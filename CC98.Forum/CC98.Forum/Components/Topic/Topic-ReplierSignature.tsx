import * as React from 'react';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
import { Link } from 'react-router-dom';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';
import { QuoteContext } from './Topic';
import { QuoteTraceContext } from './Topic-Trace'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment';
import * as Popover from 'antd/es/popover';
import * as Button from 'antd/es/button';
interface Props {
  postInfo;
  topicInfo;
  boardInfo;
  likeInfo;
  quote;
  userInfo;
  traceMode;
  changePmVisible;
  changeJudgeVisible;
  page;
}
interface withRouterProps extends RouteComponentProps<{}> { }
export default withRouter(class extends React.Component<withRouterProps & Props, { likeNumber, dislikeNumber, likeState }>{
  constructor(props, content) {
    super(props, content);
    this.showManageUI = this.showManageUI.bind(this);
    this.showJudgeUI = this.showJudgeUI.bind(this);
    this.quote = this.quote.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {
      likeNumber: this.props.likeInfo.likeCount,
      dislikeNumber: this.props.likeInfo.dislikeCount,
      likeState: this.props.likeInfo.likeState,
    }
  }
  quote() {
    this.props.quote(this.props.postInfo.content, this.props.userInfo.name, this.props.postInfo.time, this.props.postInfo.floor, this.props.postInfo.id);
  }
  showManageUI = () => {
    this.props.changePmVisible(true, this.props.postInfo);
  }
  showJudgeUI = () => {
    this.props.changeJudgeVisible(true, this.props.postInfo);
  }
  edit() {

  }
  isAllowedtoEdit(userPrivilege) {
    if (Utility.getLocalStorage("userInfo")) {
      const myPrivilege = Utility.getLocalStorage("userInfo").privilege;
      if (myPrivilege === '管理员') return true;
      if (userPrivilege === '管理员') return false;
      if (Utility.isMaster(this.props.boardInfo.boardMasters)) return true;
    } else {
      return false;
    }

  }
  async like() {
    const idLike = `#like${this.props.postInfo.id}`;
    const idDislike = `#dislike${this.props.postInfo.id}`;
    //取消赞
    if (this.state.likeState === 1) {
      await Utility.like(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idLike).css("color", "#8dc9db");
    }
    //踩改赞
    else if (this.state.likeState === 2) {
      await Utility.dislike(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      await Utility.like(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idLike).css("color", "red");
      $(idDislike).css("color", "#8dc9db");
    }
    //单纯赞
    else {
      await Utility.like(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idLike).css("color", "red");
    }
    const data = await Utility.refreshLikeState(this.props.topicInfo.id, this.props.postInfo.id);

    this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
  }

  async dislike() {
    const idLike = `#like${this.props.postInfo.id}`;
    const idDislike = `#dislike${this.props.postInfo.id}`;

    //取消踩
    if (this.state.likeState === 2) {
      await Utility.dislike(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idDislike).css("color", "#8dc9db");
    }
    //赞改踩
    else if (this.state.likeState === 1) {
      await Utility.like(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      await Utility.dislike(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idLike).css("color", "#8dc9db");
      $(idDislike).css("color", "red");
    }
    //单纯踩
    else {
      await Utility.dislike(this.props.topicInfo.id, this.props.postInfo.id, this.context.router);
      $(idDislike).css("color", "red");
    }
    const data = await Utility.refreshLikeState(this.props.topicInfo.id, this.props.postInfo.id);
    this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
  }
  async componentDidMount() {

    const idLike = `#like${this.props.postInfo.id}`;
    const idDislike = `#dislike${this.props.postInfo.id}`;
    //const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);
    if (this.state.likeState === 1) {
      $(idLike).css("color", "red");
    }
    else if (this.state.likeState === 2) {
      $(idDislike).css("color", "red");
    }
    const manageIcon = `icon${this.props.postInfo.id}`;
    const manageId = `#icon${this.props.postInfo.id}`;
    if (Utility.isMaster(this.props.boardInfo.boardMasters) || (this.props.boardInfo.id == 144 && this.props.postInfo.isLZ))
      $(manageId).css("display", "");

    // console.log("img = "+$("img").);
    //  this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
  }

  handlePosition = () => {
    let page = this.props.page;
    if (!this.props.page) page = 1;
    let url = `#sendTopicInfo`;
    this.props.history.push(url);
  }
  render() {

    const manageIcon = `icon${this.props.postInfo.id}`;
    const idLike = `like${this.props.postInfo.id}`;
    const idDislike = `dislike${this.props.postInfo.id}`

    /** 签名档 */
    let signature = (
      <div className="signature" >
        <UbbContainer
          isSignature
          code={this.props.userInfo.signatureCode}
          options={{
            ...new UbbCodeOptions(),
            allowExternalImage: false,
            allowMarkDown: false,
            maxImageCount: 1
          }} />
      </div>
    );

    if (!this.props.userInfo.signatureCode) {
      signature = null;
    }

    let editIcon = null;
    const editUrl = `/editor/edit/${this.props.postInfo.id}`;
    if (Utility.getLocalStorage("userInfo"))
      if (this.isAllowedtoEdit(this.props.userInfo.privilege) || this.props.postInfo.isMe) {

        editIcon = <Link to={editUrl}><div className="operation1" onClick={this.edit}>   编辑</div></Link>;
      }
    let lastUpdate = null;
    if (this.props.postInfo.lastUpdateAuthor && this.props.postInfo.lastUpdateTime) {
      const time = moment(this.props.postInfo.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss');
      const name = this.props.userInfo.name === this.props.postInfo.lastUpdateAuthor ? '作者' : this.props.postInfo.lastUpdateAuthor;
      const str = `该帖最后由 ${name} 在 ${time} 编辑`;
      lastUpdate = str;
    }
    const returnUrl = `/topic/${this.props.topicInfo.id}`;
    const traceUrl = `/topic/${this.props.topicInfo.id}/postid/${this.props.postInfo.id}`;
    let traceIcon = <div className="operation1"><Link to={this.props.traceMode ? returnUrl : traceUrl}>{this.props.traceMode ? "返回" : "追踪"}</Link></div>;

    let manageBtn = null;

    if (Utility.isMaster(this.props.boardInfo.boardMasters) == true || (this.props.boardInfo.id === 144 && Utility.getLocalStorage("userInfo") && Utility.getLocalStorage("userInfo").name === this.props.topicInfo.userName)) {
      manageBtn = <div className="operation1" id={manageIcon} style={{ cursor: "pointer" }} onClick={this.showManageUI}>管理</div>;
    }
    let judgeIcon = <div className="operation1" onClick={this.showJudgeUI}>   评分</div>;
    return <div className="column" style={{ marginTop: "1rem", width: "52rem", marginBottom: "0.5rem" }}>
      <div className="comment1">
        <div style={{ width: "40rem", marginLeft: "1.2rem", fontSize: "0.8rem" }}>
          <span>发表于 {moment(this.props.postInfo.time).format('YYYY-MM-DD HH:mm:ss')}</span><span style={{ marginLeft: "1rem" }}>{lastUpdate}</span></div>
        <div className="row" style={{ alignItems: "center" }}>
          <div id={idLike} className="upup" style={{ marginRight: "0.7rem" }} onClick={this.like.bind(this)}><i title="赞" className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
          <div id={idDislike} className="downdown" onClick={this.dislike.bind(this)}><i title="踩" className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
          <div id="commentlike">
            {judgeIcon}
            {window.location.pathname.indexOf('postid') === -1 ?
              <QuoteContext.Consumer>
                {(handleQuoteContextChange) => <div className="operation1" onClick={() => {
                  handleQuoteContextChange({ content: this.props.postInfo.content, userName: this.props.userInfo.name, replyTime: this.props.postInfo.time, floor: this.props.postInfo.floor, postId: this.props.postInfo.id });
                  this.handlePosition();
                }}>   引用</div>}
              </QuoteContext.Consumer> :
              <QuoteTraceContext.Consumer>
                {(handleQuoteContextChange) => <div className="operation1" onClick={() => {
                  handleQuoteContextChange({ content: this.props.postInfo.content, userName: this.props.userInfo.name, replyTime: this.props.postInfo.time, floor: this.props.postInfo.floor, postId: this.props.postInfo.id });
                  this.handlePosition();
                }}>   引用</div>}
              </QuoteTraceContext.Consumer>}


            {traceIcon}
            {editIcon}
            {manageBtn}
          </div>
        </div>
      </div>
      <div className="row" style={{ width: "100%", justifyContent: "center" }}>  {signature}
      </div>

    </div>;
  }
}
)