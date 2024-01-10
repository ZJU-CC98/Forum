﻿import * as React from "react";
import * as State from "../../States/AppState";
import * as Utility from "../../Utility";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import * as $ from "jquery";
import { UbbContainer } from "../UbbContainer";
import { match } from "react-router";

import DocumentTitle from "../DocumentTitle";
import { Route, Link, Switch } from "react-router-dom";
import TopicTitleAndContentState = State.TopicTitleAndContentState;
import { BoardEvent } from "../../States/BoardEvent";
import { Pager } from "../Pager";
import {
  NotFoundTopic,
  UnauthorizedTopic,
  UnauthorizedBoard,
  ServerError
} from "../Status";
import { AdsComponent } from "../MainPage";
import { isLogOn } from "../../Utility";
import * as moment from "moment";
import Modal from "antd/es/modal";
import List from "antd/es/list";
import Button from "antd/es/button";
import message from "antd/es/message";
import Avatar from "antd/es/avatar";
import Spin from "antd/es/spin";

export class RouteComponent<
  TProps,
  TState,
  TMatch extends { [K in keyof TMatch]?: any }
> extends React.Component<TProps, TState> {
  constructor(props?, context?) {
    super(props, context);
  }
  get match(): match<TMatch> {
    return (this.props as any).match;
  }
}

export class BList extends RouteComponent<
  {},
  {
    page: number;
    boardId: number;
    boardInfo;
    fetchState;
    visible;
    tpList;
    loading;
    hasMore;
    isMaster;
  },
  { boardId: number }
> {
  constructor(props, context) {
    super(props, context);

    // 默认页码
    this.state = {
      boardId: null,
      boardInfo: { bigPaper: "", masters: [], name: "" },
      page: 1,
      fetchState: "ok",
      visible: false,
      tpList: [],
      loading: false,
      hasMore: true,
      isMaster: false
    };
  }
  componentDidMount() {
    const isMaster = Utility.isMaster(this.state.boardInfo.boardMasters);
    this.setState({ isMaster });
  }

  showModal = async () => {
    let res = await Utility.getTpUsers(this.match.params.boardId, 0, 5);
    this.setState({
      visible: true,
      tpList: res
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  async componentWillReceiveProps(newProps) {
    const boardInfo = await Utility.getBoardInfo(newProps.match.params.boardId);

    // 设置状态
    this.setState({ boardInfo: boardInfo, boardId: this.match.params.boardId });
  }
  async componentWillMount() {
    const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
    // 设置状态
    this.setState({
      boardInfo: boardInfo,
      boardId: this.match.params.boardId,
      fetchState: boardInfo
    });
  }
  cancelTp = async item => {
    const response = await Utility.cancelStopBoardPost(
      item.userId,
      this.match.params.boardId
    );
    if (response === "ok") {
      let data = await Utility.getTpUsers(this.match.params.boardId, 0, 5);
      this.setState({ tpList: data });
    } else {
      alert("操作失败,原因：" + response);
    }
  };
  render() {
    switch (this.state.fetchState) {
      case "ok":
        return <div></div>;
      case "not found":
        return <NotFoundTopic />;
      case "unauthorized":
        return <UnauthorizedBoard />;
      case "server error":
        return <ServerError />;
    }
    const recordTopicsUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div id="listRoot">
        <DocumentTitle title={`${this.state.boardInfo.name} - CC98论坛`} />
        <Category
          boardId={this.match.params.boardId}
          boardInfo={this.state.boardInfo}
        />
        <ListHead
          key={this.state.page}
          boardId={this.match.params.boardId}
          boardInfo={this.state.boardInfo}
        />
        <ListButtonAndAds boardInfo={this.state.boardInfo} adsUrl={null} />
        <Switch>
          <Route
            exact
            path="/board/:boardid/tags/:tag1Id/:tag2Id/:page?"
            component={ListTagsContent}
          />
          <Route
            exact
            path="/board/:boardId/tag/tag1/:tagId/:page?"
            component={ListTagContent}
          />
          <Route
            exact
            path="/board/:boardId/tag/tag2/:tagId/:page?"
            component={ListTagContent}
          />
          <Route
            exact
            path="/board/:boardId/best/:page?"
            component={ListBestContent}
          />
          <Route
            exact
            path="/board/:boardId/save/:page?"
            component={ListSaveContent}
          />
          <Route
            exact
            path="/board/:boardId/record/:page?"
            component={BoardRecord}
          />
          <Route exact path="/board/:boardId/:page?" component={ListContent} />
        </Switch>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Link to={recordTopicsUrl}>
            <Button type="primary">查看版面事件</Button>
          </Link>
          <Button
            style={{ marginLeft: "2rem" }}
            type="primary"
            onClick={this.showModal}
          >
            小黑屋
          </Button>
        </div>
        <Modal
          title="小黑屋"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={this.state.isMaster ? "60rem" : "45rem"}
        >
          <List
            dataSource={this.state.tpList}
            pagination={{
              onChange: async page => {
                const from = (page - 1) * 5;
                let data = await Utility.getTpUsers(
                  this.match.params.boardId,
                  from,
                  5
                );
                let res = this.state.tpList.concat(data);
                this.setState({ tpList: res });
              },
              pageSize: 5
            }}
            renderItem={(item: {
              userId: string;
              userName: string;
              days: string;
              expiredTime: string;
              operatorUserName: string;
            }) => (
              <List.Item key={item.userId}>
                <List.Item.Meta
                  title={
                    <a href={`https://cc98.org/user/${item.userId}`}>
                      {item.userName}
                    </a>
                  }
                  description={
                    <div>
                      <span>天数:{item.days}</span>
                      <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                        到期时间:
                        {moment(item.expiredTime).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                      <Button
                        onClick={this.cancelTp.bind(this, item)}
                        type="primary"
                        style={{ display: this.state.isMaster ? "" : "none" }}
                      >
                        解除tp
                      </Button>
                    </div>
                  }
                />
                <div>操作人:{item.operatorUserName}</div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </Modal>
      </div>
    );
  }
}
/**
 版面头部，包括版面图标、版面介绍、版主信息等
 */

export class Category extends React.Component<{ boardId; boardInfo }, {}> {
  render() {
    const listUrl = `/board/${this.props.boardId}`;
    return (
      <div
        className="row"
        style={{
          alignItems: "baseline",
          width: "100% ",
          justifyContent: "flex-start",
          color: "grey",
          fontSize: "0.75rem",
          marginBottom: "1rem"
        }}
      >
        <Link
          style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }}
          to={"/"}
        >
          首页
        </Link>
        <i className="fa fa-chevron-right"></i>
        <Link
          style={{
            color: "grey",
            fontSize: "1rem",
            marginRight: "0.5rem",
            marginLeft: "0.5rem"
          }}
          to="/boardlist"
        >
          版面列表
        </Link>
        <i className="fa fa-chevron-right"></i>
        <Link
          style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem" }}
          to={listUrl}
        >
          {this.props.boardInfo.name}
        </Link>
      </div>
    );
  }
}
export class ListHead extends RouteComponent<
  { boardId; boardInfo },
  {
    isFollow;
    isExtend: boolean;
    isEditing: boolean;
    curDesc: string;
    info: string;
  },
  { boardId }
> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      isFollow: Utility.isFollowThisBoard(this.props.boardId),
      isExtend: false,
      isEditing: false,
      curDesc: props.boardInfo.bigPaper,
      info: ""
    };
    const initFollow = Utility.isFollowThisBoard(this.props.boardId);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.generateMasters = this.generateMasters.bind(this);
  }
  async follow() {
    await Utility.followBoard(this.props.boardId);
    this.setState({ isFollow: true });
  }
  async unfollow() {
    await Utility.unfollowBoard(this.props.boardId);
    this.setState({ isFollow: false });
  }
  generateMasters(item) {
    const name = item.toString();
    const userName = encodeURIComponent(item.toString());
    const webUrl = `/user/name/${userName}`;
    return (
      <div style={{ marginRight: "10px", fontSize: "0.75rem" }}>
        <a
          style={{ color: this.state.isExtend ? "#fff" : "#000" }}
          href={webUrl}
        >
          {name}
        </a>
      </div>
    );
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      isFollow: Utility.isFollowThisBoard(newProps.boardInfo.isFollow)
    });
  }
  onError(e) {
    e.preventDefault();
    e.target.src = `/static/images/_CC98.png`;
  }

  changeBigPaper = async () => {
    try {
      const url = `/board/${this.props.boardId}/big-paper`;
      const token = await Utility.getToken();
      let headers = new Headers();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/json");
      let res = await Utility.cc98Fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({ content: this.state.curDesc })
      });
      if (res.status === 200) {
        this.setState({
          info: "修改成功"
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      this.setState({
        info: `修改失败 ${e.message}`
      });
    }
  };

  render() {
    const boardUrl = `/board/${this.props.boardId}`;
    const id = `boardImg_${this.props.boardId}`;
    const url = `/static/images/_${this.props.boardInfo.name}.png`;
    const isMaster = Utility.isMaster(this.props.boardInfo.boardMasters);
    let boardNameDiv = (
      <div className="row" style={{ width: "100%" }}>
        {this.props.boardInfo.name}
      </div>
    );
    if (this.props.boardInfo && this.props.boardInfo.name.length > 8) {
      boardNameDiv = (
        <div className="row" style={{ width: "100%", fontSize: "14px" }}>
          {this.props.boardInfo.name}
        </div>
      );
    }

    if (!this.state.isExtend) {
      return (
        <div
          className="row"
          style={{
            width: "100%",
            overflow: "hidden",
            maxHeight: "6rem",
            transition: "max-height 1s"
          }}
        >
          <Link to={boardUrl}>
            <div className="boardMessage">
              <div
                className="row"
                style={{ height: "4rem", marginTop: "1.25rem" }}
              >
                <img
                  style={{ marginLeft: "1.25rem" }}
                  onError={this.onError}
                  src={url}
                ></img>
                <div className="boardMessageDetails">
                  {boardNameDiv}
                  <div
                    className="row"
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <div style={{ fontSize: "0.75rem", width: "4.5rem" }}>
                      {this.props.boardInfo.todayCount}/
                      {this.props.boardInfo.topicCount}
                    </div>
                    <div
                      className="boardFollow"
                      onClick={
                        this.state.isFollow ? this.unfollow : this.follow
                      }
                    >
                      {this.state.isFollow ? "取关" : "关注"}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="bigPaper" style={{ display: "block" }}>
            {this.props.boardInfo.bigPaper ? (
              <button
                className="fa fa-angle-double-down"
                style={{
                  float: "right",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  border: "none"
                }}
                type="button"
                onClick={() => this.setState({ isExtend: true })}
              >
                展开
              </button>
            ) : isMaster ? (
              <button
                style={{ float: "right" }}
                type="button"
                onClick={() =>
                  this.setState({ isEditing: true, isExtend: true })
                }
              >
                编辑
              </button>
            ) : null}
            <div>
              <div>版面简介：{this.props.boardInfo.description}</div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  marginTop: ".5rem",
                  fontSize: "0.75rem"
                }}
              >
                版主：
                {this.props.boardInfo.boardMasters.map(this.generateMasters)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="row"
        style={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "50rem",
          transition: "max-height 1.5s"
        }}
      >
        <div className="boardMessage">
          <div className="row" style={{ height: "4rem", marginTop: "1.25rem" }}>
            <img
              style={{ marginLeft: "1.25rem" }}
              onError={this.onError}
              src={url}
            ></img>
            <div className="boardMessageDetails">
              <div className="row" style={{ width: "100%" }}>
                {this.props.boardInfo.name}
              </div>
              <div
                className="row"
                style={{ width: "100%", alignItems: "center" }}
              >
                <div style={{ fontSize: "0.75rem", width: "4.5rem" }}>
                  {this.props.boardInfo.todayCount}/
                  {this.props.boardInfo.topicCount}
                </div>
                <div
                  className="boardFollow"
                  onClick={this.state.isFollow ? this.unfollow : this.follow}
                >
                  {this.state.isFollow ? "取关" : "关注"}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="boardDescription">
            <div>{this.props.boardInfo.description}</div>
          </div>
          <div className="boardMasters">
            <div>版主</div>
            <div>
              {this.props.boardInfo.boardMasters.map(this.generateMasters)}
            </div>
          </div>
        </div>
        <div className="bigPaper" style={{ display: "block" }}>
          <button
            className="fa fa-angle-double-up"
            style={{
              float: "right",
              backgroundColor: "#fff",
              cursor: "pointer",
              border: "none"
            }}
            type="button"
            onClick={() => this.setState({ isExtend: false })}
          >
            收起
          </button>
          <div className="bigPaperTitle">
            {Utility.isMaster(this.props.boardInfo.boardMasters) ? (
              <button
                type="button"
                onClick={() => this.setState({ isEditing: true })}
              >
                编辑
              </button>
            ) : null}
            {this.state.isEditing ? (
              <button
                type="button"
                onClick={() => {
                  this.changeBigPaper();
                }}
              >
                提交
              </button>
            ) : null}
            <p>{this.state.info}</p>
          </div>
          {this.state.isEditing ? (
            <div>
              <textarea
                style={{ width: "50rem", height: "15rem", resize: "none" }}
                onChange={e => this.setState({ curDesc: e.target.value })}
              >
                {this.state.curDesc}
              </textarea>
            </div>
          ) : (
            <div style={{ maxWidth: "53.25rem" }}>
              <UbbContainer code={this.props.boardInfo.bigPaper} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * 提供显示连续页码的交互效果。
 */
export class ListTagAndPager extends React.Component<
  { url: string; boardid: number; page: number; totalPage: number; tag },
  {}
> {
  constructor(props, content) {
    super(props, content);
  }
  generateTagButton(item) {
    const url = `/board/${this.props.boardid}/tag/tag1/${item.id}`;
    return (
      <div>
        <Link to={url}>
          <button className="chooseTag">
            {item.name}
            <span className="tagNumber"></span>
          </button>
        </Link>
      </div>
    );
  }
  generateTag2Button(item) {
    const url = `/board/${this.props.boardid}/tag/tag2/${item.id}`;
    return (
      <div>
        <Link to={url}>
          <button className="chooseTag">
            {item.name}
            <span className="tagNumber"></span>
          </button>
        </Link>
      </div>
    );
  }
  render() {
    let tag1Btn = null;
    let tag2Btn = null;
    const url = `/board/${this.props.boardid}`;
    if (this.props.tag && this.props.tag.length >= 1) {
      tag1Btn = (
        <div
          style={{
            maxWidth: "35rem",
            lineHeight: "3rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: "0.3125rem",
            marginRight: "0.3125rem",
            borderTop: "dashed #EAEAEA thin",
            marginBottom: "0.5rem"
          }}
        >
          <div
            className="row"
            style={{ display: "flex", flexWrap: "wrap", maxWidth: "35rem" }}
          >
            <div>
              <button className="chooseTag">
                <Link to={url}>全部</Link>
              </button>
            </div>
            {this.props.tag[0].tags.map(this.generateTagButton.bind(this))}
          </div>
        </div>
      );
    }
    if (this.props.tag && this.props.tag.length === 2) {
      tag2Btn = (
        <div
          style={{
            maxWidth: "35rem",
            lineHeight: "3rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: "0.3125rem",
            marginRight: "0.3125rem",
            borderTop: "dashed #EAEAEA thin",
            marginBottom: "0.5rem"
          }}
        >
          <div
            className="row"
            style={{ display: "flex", flexWrap: "wrap", maxWidth: "35rem" }}
          >
            <div>
              <button className="chooseTag">
                <Link to={url}>全部</Link>
              </button>
            </div>
            {this.props.tag[1].tags.map(this.generateTag2Button.bind(this))}
          </div>
        </div>
      );
    }

    return (
      <div
        className="row"
        style={{
          width: "100%",
          marginLeft: "0.3125rem",
          marginRight: "0.3125rem",
          marginTop: "0.9375rem",
          marginBottom: "1rem",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        <div>
          {tag1Btn}

          {tag2Btn}
        </div>
        <Pager
          page={this.props.page}
          url={this.props.url}
          totalPage={this.props.totalPage}
        />
      </div>
    );
  }
}

export class ListButtonAndAds extends React.Component<{ boardInfo; adsUrl }> {
  clickListener() {
    let isLogon = false;
    let isVerified = true;
    let isLocked = false;
    if (Utility.getMyInfo()) isLogon = true;
    if (
      Utility.getMyInfo() &&
      !Utility.getMyInfo().isVerified
    )
      isVerified = false;
    if (
      Utility.getMyInfo() &&
      Utility.getMyInfo().lockState !== 0
    )
      isLocked = true;
    if (!isLogon) alert("请登陆！");
    else if (!isVerified)
      alert(
        "您的帐号未认证，无法发言，请先前往https://account.cc98.org 认证激活。"
      );
    else if (isLocked) alert("您的账号被全站禁言！");
  }

  render() {
    let sendInfo = null;
    let isLogOn = false;
    let isVerified = false;
    let isLocked = true;
    let tip = null;
    if (Utility.getMyInfo()) {
      isLogOn = true;
      if (!Utility.getMyInfo().isVerified) {
        isVerified = false;
        tip = (
          <div style={{ marginLeft: "1rem", color: "red" }}>
            您的帐号未认证，无法发言，请先前往{" "}
            <a href="https://account.cc98.org">https://account.cc98.org</a>{" "}
            认证激活。
          </div>
        );
      } else isVerified = true;
      if (Utility.getMyInfo().lockState !== 0) {
        isLocked = true;
        tip = (
          <div style={{ marginLeft: "1rem", color: "red" }}>您被全站禁言。</div>
        );
      } else isLocked = false;
    } else {
      tip = (
        <div style={{ marginLeft: "1rem", color: "red" }}>
          您还未登录，不能发帖，请先登录
        </div>
      );
    }

    const createTopicUrl = `/editor/postTopic/${this.props.boardInfo.id}`;
    if (this.props.boardInfo.canVote) {
      sendInfo = (
        <div>
          <Link className="button bgcolor" to={createTopicUrl}>
            发主题
          </Link>
          <Link
            style={{ marginLeft: "2rem" }}
            className="button bgcolor"
            to={`/editor/postVoteTopic/${this.props.boardInfo.id}`}
          >
            发投票
          </Link>
        </div>
      );
    } else
      sendInfo = (
        <Link className="button bgcolor" to={createTopicUrl}>
          发主题
        </Link>
      );

    if (isLocked || !isLogOn || !isVerified)
      sendInfo = (
        <div style={{ display: "flex", alignItems: "center" }}>{tip}</div>
      );

    return (
      <div
        className="row"
        style={{
          width: "100%",
          height: "6.25rem",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "1rem"
        }}
      >
        {sendInfo}
        <div style={{ height: "6.25rem" }}>
          {" "}
          <AdsComponent />
        </div>
      </div>
    );
  }
}
export class ListTopContent extends React.Component<{ boardId }, { data }> {
  constructor(props, context) {
    super(props, context);
    this.state = { data: [] };
  }
  private convertTopicToElement(item: TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentDidMount() {
    const data = await Utility.GetTopTopics(this.props.boardId);
    this.setState({ data: data });
  }
  render() {
    return <div>{this.state.data.map(this.convertTopicToElement)}</div>;
  }
}

export class BestTopics extends React.Component<
  { boardId; curPage },
  { data }
> {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  async componentDidMount() {
    const data = await Utility.getBestTopics(
      this.props.boardId,
      this.props.curPage
    );
    this.setState({ data: data });
  }
  private convertTopicToElement(item: TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  render() {
    return <div>{this.state.data.map(this.convertTopicToElement)}</div>;
  }
}
export class ListContent extends RouteComponent<
  {},
  { items; totalPage: number; boardInfo; tags; fetchState },
  { page; boardId: number }
> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      totalPage: 0,
      boardInfo: { masters: [], topicCount: 1 },
      fetchState: "ok",
      tags: []
    };
  }
  async componentDidMount() {
    let page = this.match.params.page;
    if (!page) page = 1;
    const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
    const data = await Utility.getBoardTopicAsync(
      page,
      this.match.params.boardId,
      boardInfo.topicCount
    );
    const totalPage = this.getTotalListPage(boardInfo.topicCount);
    const tags = await Utility.getBoardTag(this.match.params.boardId);
    this.setState({
      items: data,
      totalPage: totalPage,
      boardInfo: boardInfo,
      fetchState: data,
      tags: tags
    });
  }
  private convertTopicToElement(item) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    const p = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!p) {
      page = 1;
    }

    // 转换类型
    else {
      page = parseInt(p);
    }
    const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
    const totalPage = this.getTotalListPage(boardInfo.topicCount);
    const data = await Utility.getBoardTopicAsync(
      page,
      newProps.match.params.boardId,
      boardInfo.topicCount
    );
    this.setState({ items: data, totalPage: totalPage });
  }

  getTotalListPage(count) {
    const page = Utility.getListTotalPage(count);
    return page;
  }

  getCheckValue() {
    function getCaption(obj) {
      var index = obj.lastIndexOf("_");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    }
    let targets = [];
    $(".opTitleCheckboxValue").each(function() {
      if ($(this).is(":checked")) {
        targets.push("id=" + getCaption($(this).attr("id")));
      }
    });
    let str = targets.join("&");
    return str;
  }

  lockUI() {
    $("#deleteUI").css("display", "none");
    $("#lockUI").css("display", "");
    $(".opTitleCheckbox").css("display", "flex");
  }
  deleteUI() {
    $("#lockUI").css("display", "none");
    $("#deleteUI").css("display", "");
    $(".opTitleCheckbox").css("display", "flex");
  }
  manageUI() {
    $("#manageUI").css("display", "");
  }
  async lock() {
    let days = $("#opDays").val();
    let reason = $("#opReason").val();
    if (reason == "自定义") {
      reason = $("#hideReason").val();
    }
    let target = this.getCheckValue();
    var status = await Utility.mutliLock(days, reason, target);
    if (status == 200)
      document.location.href = `/board/${this.match.params.boardId}`;
  }
  async delete() {
    let reason = $("#opReason").val();
    if (reason == "自定义") {
      reason = $("#hideReason1").val();
    }
    let target = this.getCheckValue();
    var status = await Utility.mutliDelete(reason, target);
    if (status == 200)
      document.location.href = `/board/${this.match.params.boardId}`;
  }
  changeReason() {
    let value = $("#opReason").val();
    if (value == "自定义") {
      $("#hideReason").css("display", "");
    } else {
      $("#hideReason").css("display", "none");
    }
  }
  changeDeleteReason() {
    let value = $("#opReason").val();
    if (value == "自定义") {
      $("#hideReason1").css("display", "");
    } else {
      $("#hideReason1").css("display", "none");
    }
  }
  tpList = () => {};
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;
    let topTopics = null;
    if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
      topTopics = (
        <div>
          <ListTopContent boardId={this.match.params.boardId} />
        </div>
      );
    }
    const topics = (this.state.items || []).map(this.convertTopicToElement);

    const bestTopicsUrl = `/board/${this.match.params.boardId}/best/`;
    const saveTopicsUrl = `/board/${this.match.params.boardId}/save/`;
    const normalTopicsUrl = `/board/${this.match.params.boardId}/`;

    let reasonUI = (
      <div>
        <ControlLabel>处理理由</ControlLabel>
        <select
          id="opReason"
          onChange={this.changeReason.bind(this)}
          className="react-bootstrap-select"
        >
          <option className="react-bootstrap-option" value="重复发帖">
            重复发帖
          </option>
          <option className="react-bootstrap-option" value="管理要求">
            管理要求
          </option>
          <option className="react-bootstrap-option" value="已解决">
            已解决
          </option>
          <option className="react-bootstrap-option" value="内容不符">
            内容不符
          </option>
          <option className="react-bootstrap-option" value="违反版规">
            违反版规
          </option>
          <option className="react-bootstrap-option" value="自定义">
            自定义
          </option>
        </select>
        <input
          id="hideReason"
          className="react-bootstrap-text"
          style={{ display: "none" }}
        />
      </div>
    );
    let deleteReasonUI = (
      <div>
        <ControlLabel>处理理由</ControlLabel>
        <select
          id="opReason"
          onChange={this.changeDeleteReason.bind(this)}
          className="react-bootstrap-select"
        >
          <option className="react-bootstrap-option" value="重复发帖">
            重复发帖
          </option>
          <option className="react-bootstrap-option" value="管理要求">
            管理要求
          </option>
          <option className="react-bootstrap-option" value="已解决">
            已解决
          </option>
          <option className="react-bootstrap-option" value="内容不符">
            内容不符
          </option>
          <option className="react-bootstrap-option" value="违反版规">
            违反版规
          </option>
          <option className="react-bootstrap-option" value="自定义">
            自定义
          </option>
        </select>
        <input
          id="hideReason1"
          className="react-bootstrap-text"
          style={{ display: "none" }}
        />
      </div>
    );
    let dayUI = (
      <div>
        {" "}
        <ControlLabel>下沉天数</ControlLabel>
        <select id="opDays" className="react-bootstrap-select">
          <option value="7">7</option>
          <option value="30">30</option>
          <option value="98">98</option>
          <option value="1000">1000</option>
        </select>
      </div>
    );
    let lockUI = (
      <div id="lockUI" style={{ display: "none" }}>
        {reasonUI}
        {dayUI}
        <button
          type="button"
          id="mutlilock-btn"
          onClick={this.lock.bind(this)}
          className="react-bootstrap-button"
        >
          确认
        </button>
        <div id="mutlioptip"></div>
      </div>
    );
    let deleteUI = (
      <div id="deleteUI" style={{ display: "none" }}>
        {deleteReasonUI}
        <button
          type="button"
          id="mutlidelete-btn"
          onClick={this.delete.bind(this)}
          className="react-bootstrap-button"
        >
          确认
        </button>
        <div id="mutliopdtip"></div>
      </div>
    );
    let manageUI = (
      <div id="manageUI" style={{ display: "none" }}>
        <div
          onClick={this.lockUI.bind(this)}
          className="react-bootstrap-button"
        >
          批量锁沉
        </div>
        <div
          onClick={this.deleteUI.bind(this)}
          className="react-bootstrap-button"
        >
          批量删除
        </div>
        {lockUI}
        {deleteUI}
      </div>
    );
    let manageBtn = null;
    if (Utility.isMaster(this.state.boardInfo.boardMasters)) {
      manageBtn = (
        <Button type="primary" onClick={this.manageUI.bind(this)}>
          批量管理
        </Button>
      );
    }
    return (
      <div className="listContent ">
        <ListTagAndPager
          page={curPage}
          totalPage={this.state.totalPage}
          boardid={this.match.params.boardId}
          url={normalTopicsUrl}
          tag={this.state.tags}
        />
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="listContentTag">
                <Link to={normalTopicsUrl}>全部</Link>
              </div>
              <div className="listContentTag">
                <Link to={bestTopicsUrl}>精华</Link>
              </div>
              <div className="listContentTag">
                <Link to={saveTopicsUrl}>保存</Link>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div style={{ marginRight: "14rem" }}>
                <span>作者</span>
              </div>
              <div style={{ marginRight: "8rem" }}>
                <span>最后回复</span>
              </div>
            </div>
          </div>
          {topTopics}
          <div>{topics}</div>
        </div>
        <div className="row" style={{ marginTop: "0.5rem" }}>
          <div className="listContentBottom" style={{ flexGrow: 1 }}>
            <Pager
              page={curPage}
              totalPage={this.state.totalPage}
              url={normalTopicsUrl}
            />
          </div>

          {manageBtn}
        </div>
        {manageUI}
      </div>
    );
  }
}
export class ListTagContent extends RouteComponent<
  {},
  { items; totalPage: number; boardInfo; tags; fetchState; layer },
  { tagId: number; page; boardId: number }
> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      totalPage: 0,
      boardInfo: { masters: [], topicCount: 1 },
      fetchState: "ok",
      tags: [],
      layer: 1
    };
  }
  async componentDidMount() {
    let page = this.match.params.page;
    if (!page) page = 1;
    const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
    const tags = await Utility.getBoardTag(this.match.params.boardId);
    const layer = Utility.getTagLayer(this.match.params.tagId, tags);
    const data = await Utility.getTopicByOneTag(
      this.match.params.tagId,
      this.match.params.boardId,
      layer,
      page
    );
    const totalPage = this.getTotalListPage(data.count);

    this.setState({
      items: data.topics,
      totalPage: totalPage,
      boardInfo: boardInfo,
      fetchState: data,
      tags: tags,
      layer: layer
    });
  }
  private convertTopicToElement(item) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    const p = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!p) {
      page = 1;
    }

    // 转换类型
    else {
      page = parseInt(p);
    }
    const boardInfo = await Utility.getBoardInfo(newProps.match.params.boardId);
    const tags = await Utility.getBoardTag(newProps.match.params.boardId);
    const layer = Utility.getTagLayer(newProps.match.params.tagId, tags);
    const data = await Utility.getTopicByOneTag(
      newProps.match.params.tagId,
      newProps.match.params.boardId,
      layer,
      page
    );
    const totalPage = this.getTotalListPage(data.count);

    this.setState({
      items: data.topics,
      totalPage: totalPage,
      boardInfo: boardInfo,
      fetchState: data,
      tags: tags,
      layer: layer
    });
  }

  getTotalListPage(count) {
    const page = Utility.getListTotalPage(count);
    return page;
  }
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;
    let topTopics = null;
    if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
      topTopics = (
        <div>
          <ListTopContent boardId={this.match.params.boardId} />
        </div>
      );
    }
    const topics = (this.state.items || []).map(this.convertTopicToElement);

    const tagUrl = `/board/${this.match.params.boardId}/tag/tag${this.state.layer}/${this.match.params.tagId}/`;
    const normalTopicsUrl = `/board/${this.match.params.boardId}/`;
    const bestTopicsUrl = `/board/${this.match.params.boardId}/best/`;
    const saveTopicsUrl = `/board/${this.match.params.boardId}/save/`;
    const recordTopicsUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div className="listContent ">
        <ListTagAndPager
          page={curPage}
          totalPage={this.state.totalPage}
          boardid={this.match.params.boardId}
          url={tagUrl}
          tag={this.state.tags}
        />
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="listContentTag">
                <Link to={normalTopicsUrl}> 全部</Link>
              </div>
              <div className="listContentTag">
                <Link to={bestTopicsUrl}>精华</Link>
              </div>
              <div className="listContentTag">
                <Link to={saveTopicsUrl}>保存</Link>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div style={{ marginRight: "14rem" }}>
                <span>作者</span>
              </div>
              <div style={{ marginRight: "8rem" }}>
                <span>最后回复</span>
              </div>
            </div>
          </div>
          <div>{topics}</div>
        </div>
        <div className="listContentBottom">
          <Pager page={curPage} totalPage={this.state.totalPage} url={tagUrl} />
        </div>
      </div>
    );
  }
}
export class ListTagsContent extends RouteComponent<
  {},
  { items; totalPage: number; boardInfo; tags; fetchState },
  { tag1Id: number; tag2Id: number; page; boardId: number }
> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      totalPage: 0,
      boardInfo: { masters: [], topicCount: 1 },
      fetchState: "ok",
      tags: []
    };
  }
  async componentDidMount() {
    let page = this.match.params.page;
    if (!page) page = 1;
    const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
    const data = await Utility.getTopicByTwoTags(
      this.match.params.tag1Id,
      this.match.params.tag2Id,
      this.match.params.boardId,
      page
    );
    const tags = await Utility.getBoardTag(this.match.params.boardId);
    const totalPage = this.getTotalListPage(data.count);

    this.setState({
      items: data.topics,
      totalPage: totalPage,
      boardInfo: boardInfo,
      fetchState: data,
      tags: tags
    });
  }
  private convertTopicToElement(item) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    const p = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!p) {
      page = 1;
    }

    // 转换类型
    else {
      page = parseInt(p);
    }
    const boardInfo = await Utility.getBoardInfo(newProps.match.params.boardId);
    const tags = await Utility.getBoardTag(newProps.match.params.boardId);
    const data = await Utility.getTopicByTwoTags(
      newProps.match.params.tag1Id,
      newProps.match.params.tag2Id,
      newProps.match.params.boardId,
      page
    );
    const totalPage = this.getTotalListPage(data.count);

    this.setState({
      items: data.topics,
      totalPage: totalPage,
      boardInfo: boardInfo,
      fetchState: data,
      tags: tags
    });
  }

  getTotalListPage(count) {
    const page = Utility.getListTotalPage(count);
    return page;
  }
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;
    let topTopics = null;
    if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
      topTopics = (
        <div>
          <ListTopContent boardId={this.match.params.boardId} />
        </div>
      );
    }
    const topics = (this.state.items || []).map(this.convertTopicToElement);

    const tagUrl = `/board/${this.match.params.boardId}/tags/tag1/${this.match.params.tag1Id}/tag2/${this.match.params.tag2Id}/`;
    const normalTopicsUrl = `/board/${this.match.params.boardId}/`;
    const bestTopicsUrl = `/board/${this.match.params.boardId}/best/`;
    const saveTopicsUrl = `/board/${this.match.params.boardId}/save/`;
    const recordTopicsUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div className="listContent ">
        <ListTagAndPager
          page={curPage}
          totalPage={this.state.totalPage}
          boardid={this.match.params.boardId}
          url={tagUrl}
          tag={this.state.tags}
        />
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="listContentTag">
                <Link to={normalTopicsUrl}> 全部</Link>
              </div>
              <div className="listContentTag">
                <Link to={bestTopicsUrl}>精华</Link>
              </div>
              <div className="listContentTag">
                <Link to={saveTopicsUrl}>保存</Link>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div style={{ marginRight: "14rem" }}>
                <span>作者</span>
              </div>
              <div style={{ marginRight: "8rem" }}>
                <span>最后回复</span>
              </div>
            </div>
          </div>
          <div>{topics}</div>
        </div>
        <div className="listContentBottom">
          <Pager page={curPage} totalPage={this.state.totalPage} url={tagUrl} />
        </div>
      </div>
    );
  }
}

export class BoardRecord extends RouteComponent<
  {},
  {
    boardId: number;
    totalPage: number;
    curPage: number;
    tags;
    data: BoardEvent[];
  },
  { page; boardId: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      boardId: 135,
      totalPage: 1,
      curPage: 1,
      tags: null,
      data: []
    };
  }

  async componentWillReceiveProps(newProps) {
    let curPage = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!curPage) {
      curPage = 1;
    }
    let boardId = this.match.params.boardId;
    let data = await Utility.getBoardRecord(boardId, (curPage - 1) * 20, 20);
    let totalPage = parseInt(((data.count - 0.5) / 20 + 1).toString());
    let items = data.boardEvents;
    let tags = await Utility.getBoardTag(this.match.params.boardId);
    this.setState({
      boardId: boardId,
      totalPage,
      curPage: curPage,
      tags: tags,
      data: items
    });
  }

  async componentDidMount() {
    let boardId = this.match.params.boardId;
    let curPage = this.match.params.page;
    if (!curPage) curPage = 1;
    let data = await Utility.getBoardRecord(boardId, (curPage - 1) * 20, 20);
    let totalPage = parseInt(((data.count - 0.5) / 20 + 1).toString());
    let items = data.boardEvents;
    let tags = await Utility.getBoardTag(this.match.params.boardId);
    this.setState({
      boardId: boardId,
      totalPage,
      curPage: curPage,
      tags: tags,
      data: items
    });
  }

  private convertRecordToElement(item: BoardEvent) {
    return (
      <BoardRecordContent
        id={item.id}
        topicId={item.topicId}
        boardId={item.boardId}
        targetUserName={item.targetUserName}
        operatorUserName={item.operatorUserName}
        content={item.content}
        time={item.time}
        ip={item.ip}
        isDeleted={item.isDeleted}
      />
    );
  }
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;

    let topics = this.state.data.map(this.convertRecordToElement);
    let boardRecordUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div className="listContent ">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pager
            page={curPage}
            totalPage={this.state.totalPage}
            url={boardRecordUrl}
          />
        </div>
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div
                className="listContentTag"
                style={{
                  alignItems: "center",
                  width: "5rem",
                  textAlign: "center"
                }}
              >
                <span>对象</span>
              </div>
              <div
                className="listContentTag"
                style={{
                  alignItems: "center",
                  width: "46rem",
                  textAlign: "center"
                }}
              >
                <span>内容</span>
              </div>
              <div
                className="listContentTag"
                style={{
                  alignItems: "center",
                  width: "6rem",
                  textAlign: "center"
                }}
              >
                <span>时间</span>
              </div>
              <div
                className="listContentTag"
                style={{
                  alignItems: "center",
                  width: "11rem",
                  textAlign: "center"
                }}
              >
                <span>操作人</span>
              </div>
            </div>
          </div>
          <div>{topics}</div>
        </div>
        <Pager
          page={curPage}
          totalPage={this.state.totalPage}
          url={boardRecordUrl}
        />
      </div>
    );
  }
}

export class ListBestContent extends RouteComponent<
  {},
  { items: TopicTitleAndContentState[]; totalPage: number; tags },
  { page; boardId: number }
> {
  constructor(props, context) {
    super(props, context);
    this.state = { items: [], totalPage: 0, tags: [] };
  }
  async componentDidMount() {
    let page = this.match.params.page;
    if (!page) page = 1;
    const data = await Utility.getBestTopics(page, this.match.params.boardId);
    const tags = await Utility.getBoardTag(this.match.params.boardId);
    const totalPage = data.totalPage;
    this.setState({
      items: data.boardtopics,
      totalPage: totalPage,
      tags: tags
    });
  }
  private convertTopicToElement(item: TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    const p = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!p) {
      page = 1;
    }
    // 转换类型
    else {
      page = parseInt(p);
    }
    const data = await Utility.getBestTopics(
      page,
      newProps.match.params.boardId
    );
    const totalPage = data.totalPage;
    this.setState({
      items: data.boardtopics,
      totalPage: totalPage
    });
  }
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;
    let topTopics = null;
    if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
      topTopics = (
        <div>
          <ListTopContent boardId={this.match.params.boardId} />
        </div>
      );
    }
    const topics = (this.state.items || []).map(this.convertTopicToElement);
    const bestTopicsUrl = `/board/${this.match.params.boardId}/best/`;
    const saveTopicsUrl = `/board/${this.match.params.boardId}/save/`;
    const normalTopicsUrl = `/board/${this.match.params.boardId}/`;
    const recordTopicsUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div className="listContent ">
        <ListTagAndPager
          page={curPage}
          totalPage={this.state.totalPage}
          boardid={this.match.params.boardId}
          url={bestTopicsUrl}
          tag={this.state.tags}
        />
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="listContentTag">
                <Link to={normalTopicsUrl}>全部</Link>
              </div>
              <div className="listContentTag">
                <Link to={bestTopicsUrl}>精华</Link>
              </div>
              <div className="listContentTag">
                <Link to={saveTopicsUrl}>保存</Link>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div style={{ marginRight: "14rem" }}>
                <span>作者</span>
              </div>
              <div style={{ marginRight: "8rem" }}>
                <span>最后回复</span>
              </div>
            </div>
          </div>
          {topTopics}
          <div>{topics}</div>
        </div>
        <div className="listContentBottom">
          <Pager
            page={curPage}
            totalPage={this.state.totalPage}
            url={bestTopicsUrl}
          />
          <Link to={recordTopicsUrl}>
            <div className="boardRecordBtn">查看版面事件</div>
          </Link>
        </div>
      </div>
    );
  }
}
export class ListSaveContent extends RouteComponent<
  {},
  { items: TopicTitleAndContentState[]; totalPage: number; tags },
  { page; boardId: number }
> {
  constructor(props, context) {
    super(props, context);
    this.state = { items: [], totalPage: 0, tags: [] };
  }
  async componentDidMount() {
    let page = this.match.params.page;
    if (!page) page = 1;
    const data = await Utility.getSaveTopics(page, this.match.params.boardId);
    const totalPage = data.totalPage;
    const tags = await Utility.getBoardTag(this.match.params.boardId);
    this.setState({
      items: data.boardtopics,
      totalPage: totalPage,
      tags: tags
    });
  }
  private convertTopicToElement(item: TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} {...item} />;
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    const p = newProps.match.params.page;
    // 未提供页码，防止出错不进行后续处理
    if (!p) {
      page = 1;
    }
    // 转换类型
    else {
      page = parseInt(p);
    }
    const data = await Utility.getSaveTopics(
      page,
      newProps.match.params.boardId
    );
    this.setState({ items: data.boardtopics });
  }
  render() {
    const curPage = this.match.params.page
      ? parseInt(this.match.params.page)
      : 1;
    let topTopics = null;
    if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
      topTopics = (
        <div>
          <ListTopContent boardId={this.match.params.boardId} />
        </div>
      );
    }

    const topics = (this.state.items || []).map(this.convertTopicToElement);
    const bestTopicsUrl = `/board/${this.match.params.boardId}/best/`;
    const saveTopicsUrl = `/board/${this.match.params.boardId}/save/`;
    const normalTopicsUrl = `/board/${this.match.params.boardId}/`;
    const recordTopicsUrl = `/board/${this.match.params.boardId}/record/`;
    return (
      <div className="listContent ">
        <ListTagAndPager
          page={curPage}
          totalPage={this.state.totalPage}
          boardid={this.match.params.boardId}
          url={saveTopicsUrl}
          tag={this.state.tags}
        />
        <div className="column tagColumn">
          <div className="row board-topBar">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="listContentTag">
                <Link to={normalTopicsUrl}>全部</Link>
              </div>
              <div className="listContentTag">
                <Link to={bestTopicsUrl}>精华</Link>
              </div>
              <div className="listContentTag">
                <Link to={saveTopicsUrl}>保存</Link>
              </div>
            </div>
            <div className="row" style={{ alignItems: "center" }}>
              <div style={{ marginRight: "14rem" }}>
                <span>作者</span>
              </div>
              <div style={{ marginRight: "8rem" }}>
                <span>最后回复</span>
              </div>
            </div>
          </div>
          {topTopics}
          <div>{topics}</div>
        </div>
        <div className="listContentBottom">
          <Pager
            page={curPage}
            totalPage={this.state.totalPage}
            url={saveTopicsUrl}
          />
          <Link to={recordTopicsUrl}>
            <div className="boardRecordBtn">查看版面事件</div>
          </Link>
        </div>
      </div>
    );
  }
}

export class TopicTitleAndContent extends React.Component<
  State.TopicTitleAndContentState,
  { pager; tag1; tag2 }
> {
  constructor(props, context) {
    super(props, context);
    this.state = { pager: [], tag1: "", tag2: "" };
  }
  componentWillMount() {
    if (typeof this.props.replyCount === "number") {
      const count = this.props.replyCount + 1;
      let totalPage =
        count % 10 === 0 ? count / 10 : (count - (count % 10)) / 10 + 1;

      const pager = [];
      if (totalPage === 1) {
        // pager to be []
      } else if (totalPage <= 7) {
        for (let i = 1; i <= totalPage; i++) pager.push(i);
      } else {
        pager.push(1, 2, 3, 4, -1, totalPage - 2, totalPage - 1, totalPage);
      }

      const titleId = `#title${this.props.id}`;
      this.setState({ pager: pager });
    }
  }
  async componentDidMount() {
    if (typeof this.props.replyCount === "number") {
      const titleId = `#title${this.props.id}`;
      if (this.props.highlightInfo != null) {
        if (this.props.highlightInfo.isBold == true) {
          $(titleId).css("font-weight", "bold");
        }
        if (this.props.highlightInfo.isItalic == true) {
          $(titleId).css("font-style", "italic");
        }
        if (this.props.highlightInfo.color != null) {
          $(titleId).css("color", this.props.highlightInfo.color);
        }
      }
    }

    let tag1 = await Utility.getTagNamebyId(this.props.tag1);
    let tag2 = await Utility.getTagNamebyId(this.props.tag2);

    let newState = {
      tag1: tag1 ? tag1 : "",
      tag2: tag2 ? tag2 : ""
    };

    this.setState(newState);
  }

  generateListPager(item: number) {
    const url = `/topic/${this.props.id}/${item}`;
    if (item != -1) {
      return (
        <div style={{ marginRight: "0.3rem" }}>
          <Link style={{ color: "#79b8ca" }} to={url}>
            {item}
          </Link>
        </div>
      );
    } else {
      return <div style={{ marginRight: "0.3rem" }}>...</div>;
    }
  }
  render() {
    if (typeof this.props.replyCount === "number") {
      let colorId;
      if (this.props.topState === 0) {
        colorId = "changeColor";
      } else {
        colorId = "changeTopColor";
      }
      const topicId = `topic${this.props.id}`;
      let url = `/topic/${this.props.id}`;
      const titleId = `title${this.props.id}`;
      let icon;

      //自己
      let curName;
      if (Utility.getMyInfo())
        curName = Utility.getMyInfo().name;
      else curName = "";
      //普通
      if (this.props.topState === 0) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i
              style={{ color: "#B0B0B0" }}
              className="fa fa-envelope fa-lg"
            ></i>
          </div>
        );
      }
      //自己发的
      if (curName === this.props.userName) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i
              style={{ color: "#FFC90E" }}
              className="fa fa-envelope fa-lg"
            ></i>
          </div>
        );
      }
      //热
      if (this.props.replyCount > 100 && this.props.topState === 0) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i
              style={{ color: "red" }}
              className="fa fa-envelope-open fa-lg"
            ></i>
          </div>
        );
      }
      //锁
      //1是锁贴
      if (this.props.state === 1) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i style={{ color: "#B0B0B0" }} className="fa fa-lock fa-lg"></i>
          </div>
        );
      }
      let hitCount: any = this.props.hitCount;
      if (this.props.hitCount > 100000) {
        hitCount =
          (
            (this.props.hitCount - (this.props.hitCount % 10000)) /
            10000
          ).toString() + "万";
      } else if (this.props.hitCount > 10000) {
        hitCount = (this.props.hitCount / 10000).toFixed(1).toString() + "万";
      }
      //精华
      if (this.props.bestState === 1) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i style={{ color: "#FF1493" }} className="fa fa-star fa-lg"></i>
          </div>
        );
      }

      //置顶
      if (this.props.topState === 2) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i
              style={{ color: "orange" }}
              className="fa fa-chevron-circle-up fa-lg"
            ></i>
          </div>
        );
      } else if (this.props.topState === 4) {
        icon = (
          <div
            style={{
              width: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <i
              style={{ color: "red" }}
              className="fa fa-arrow-circle-up fa-lg"
            ></i>
          </div>
        );
      }

      // 投票贴
      // if(this.props.isVote) {
      //     icon = <div style={{
      //         width: "1rem", justifyContent: "flex-start"
      //     }}><i style={{ color: "#B0B0B0" }} className="fa fa-pie-chart fa-lg"></i></div>
      // }
      let c: any = "#000";
      let b: any = "normal";
      let i: any = "normal";
      if (this.props.highlightInfo) {
        if (this.props.highlightInfo.isBold) b = "bold";
        if (this.props.highlightInfo.isItalic) i = "italic";
        if (this.props.highlightInfo.color) c = this.props.highlightInfo.color;
      }
      let checkbox = null;
      if (this.props.topState === 0) {
        let tid = `topic_${this.props.id}`;
        checkbox = (
          <div
            className="opTitleCheckbox"
            style={{
              alignContent: "center",
              display: "none"
            }}
          >
            <input id={tid} className="opTitleCheckboxValue" type="checkbox" />
          </div>
        );
      }

      let title = "";

      if (this.state.tag2 && !this.props.topState)
        title = `[${this.state.tag2}]${title}`;
      if (this.state.tag1 && !this.props.topState)
        title = `[${this.state.tag1}]${title}`;
      if (this.props.isVote) title = `[投票]${title}`;

      return (
        <div style={{ display: "flex" }} id={colorId}>
          {checkbox}
          <Link to={url}>
            <div className="rofw topicInList" id={topicId}>
              <div className="listTitleAndPager">
                <div className="row listTitleAndIcon">
                  {icon}
                  <div
                    className="listTitle"
                    id={titleId}
                    style={{
                      marginLeft: "1rem",
                      color: c,
                      fontWeight: b,
                      fontStyle: i
                    }}
                  >
                    <span className="listTitleTag" style={{}}>
                      {title}
                    </span>
                    {this.props.title}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "0.75rem",
                    marginLeft: "1rem",
                    width: "auto"
                  }}
                >
                  {this.state.pager.map(this.generateListPager.bind(this))}
                </div>
              </div>
              <div
                className="row"
                style={{
                  width: "28rem",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: "-4px"
                }}
              >
                <div style={{ width: "7.5rem", textAlign: "left" }}>
                  {" "}
                  <span>{this.props.userName || "匿名"}</span>
                </div>

                <div className="row topicIcon">
                  <div
                    id="disliked"
                    style={{ display: "flex", width: "4.5rem" }}
                  >
                    <i className="fa fa-eye fa-lg"></i>
                    <span className="timeProp tagSize">{hitCount}</span>
                  </div>

                  <div
                    id="commentsAmount"
                    style={{ display: "flex", width: "3.5rem" }}
                  >
                    <i className="fa fa-commenting-o fa-lg"></i>
                    <span className="timeProp tagSize">
                      {this.props.replyCount}
                    </span>
                  </div>
                </div>

                <div className="lastReply">
                  <span>
                    {this.props.lastPostUser}/
                    {moment(this.props.lastPostTime).format("YY-MM-DD HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    } else {
      console.log("does not exist");
      console.log(this.props);
      return null;
    }
  }
}

export class BoardRecordContent extends React.Component<BoardEvent> {
  constructor(props, context) {
    super(props, context);
    this.ipOver = this.ipOver.bind(this);
    this.ipOut = this.ipOut.bind(this);
  }

  ipOver() {
    console.log("进入悬浮");
    if (this.props.ip !== "*") {
      console.log(this.props.ip);
      $(`#ip_${this.props.id}`).removeClass("displaynone");
    }
  }

  ipOut() {
    console.log("退出悬浮");
    $(`#ip_${this.props.id}`).addClass("displaynone");
  }

  render() {
    let targetUserName;
    if (this.props.targetUserName) {
      targetUserName = (
        <a href={`/user/name/${this.props.targetUserName}`} target="_blank">
          {this.props.targetUserName}
        </a>
      );
    } else if (!this.props.targetUserName && this.props.boardId != 182) {
      targetUserName = "不适用";
    } else {
      targetUserName = "匿名用户";
    }
    return (
      <div className="boardRecord" id="changeColor">
        <div className="boardRecord-1">{targetUserName}</div>
        <div className="boardRecord-2">
          <a href={`/topic/${this.props.topicId}`} target="_blank">
            {this.props.content}
          </a>
        </div>
        <div className="boardRecord-3">
          {moment(this.props.time).format("YY-MM-DD HH:mm")}
        </div>
        <div
          className="boardRecord-4"
          onMouseOver={this.ipOver}
          onMouseOut={this.ipOut}
        >
          <a href={`/user/name/${this.props.operatorUserName}`} target="_blank">
            {this.props.operatorUserName}
          </a>
        </div>
        <div className="boardRecord-ip displaynone" id={`ip_${this.props.id}`}>
          {this.props.ip}
        </div>
      </div>
    );
  }
}
