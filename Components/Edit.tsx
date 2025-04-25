﻿import * as React from "react";
import * as Utility from "../Utility";
import { AppState } from "../States/AppState";
import * as $ from "jquery";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { match } from "react-router";
import { RouteComponent } from "./RouteComponent";
import { UbbEditor } from "./UbbEditor";
import { Constants } from "./Constant";
import store from "../Store";
import * as ErrorActions from "../Actions/Error";
import { Vote, props as VoteProps } from "./EditVoteIput";
import ReactMde, {
  ReactMdeTypes,
  ReactMdeCommands
} from "@cc98/hell-react-mde";
import * as Showdown from "showdown";
import CustomCommand from "./react-mde/ImageUploaderCommand";
import {
  Button,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Input,
  Radio
} from "antd";
import * as moment from "moment";
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

class EditForm extends RouteComponent<
  { history; form },
  {
    topicInfo;
    boardName;
    //tags;
    tagsV2;
    ready;
    mode;
    content;
    title;
    postInfo;
    tag1;
    tag2;
    fetchState;
    boardId;
    type;
    masters: string[];
    voteInfo: VoteProps["voteInfo"];
    mdeState;
    commands;
    notice;
    houseTmpVisible;
    /** 发帖版面的匿名状态，包括不可匿名，可选匿名和强制匿名 */
    anonymousState;
    /** 编辑帖子是否为匿名 */
    isAnonymous;
    /** 用户当前财富值 */
    wealth: number | string;
  },
  { mode: string; id: number }
> {
  converter: Showdown.Converter;
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.changeEditor = this.changeEditor.bind(this);
    this.editUBB = this.editUBB.bind(this);
    this.changeAcademicType = this.changeAcademicType.bind(this);
    this.changeActivityType = this.changeActivityType.bind(this);
    this.changeNormalType = this.changeNormalType.bind(this);
    this.onVoteInfoChange = this.onVoteInfoChange.bind(this);
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    });
    this.state = {
      masters: [],
      //tags: [],
      tagsV2: { layers: 0, tags: [] },
      boardName: "",
      ready: false,
      mode: 0,
      content: "",
      title: "",
      postInfo: { floor: 0, title: "", content: "", contentType: 0 },
      tag1: "",
      tag2: "",
      fetchState: "ok",
      boardId: 1,
      type: 0,
      topicInfo: {},
      voteInfo: {
        voteItems: ["", ""],
        expiredDays: 0,
        maxVoteCount: 0,
        needVote: false
      },
      mdeState: "",
      commands: [],
      notice: true,
      houseTmpVisible: false,
      anonymousState: 0,
      isAnonymous: false,
      wealth: ""
    };
  }

  async componentDidMount() {
    const mode = this.match.params.mode;
    const id = this.match.params.id;
    const token = await Utility.getToken();
    const headers = new Headers();
    headers.append("Authorization", token);
    //let url, response, data, tags, tagsV2;
    let url, response, data, tagsV2;
    CustomCommand.editor = this;
    const getCommands: () => ReactMdeTypes.CommandGroup[] = () => [
      { commands: [CustomCommand] }
    ];
    const defaultCommands = ReactMdeCommands.getDefaultCommands();
    const myCommands = defaultCommands.concat(getCommands());
    myCommands[1].commands.length = 3;
    this.setState({ commands: myCommands });
    switch (mode) {
      case "postTopic":
      case "postVoteTopic":
        url = `/Board/${id}`;
        response = await Utility.cc98Fetch(url, { headers });
        data = await response.json();
        const boardName = data.name;
        const anonymousState = data.anonymousState;
        //获取标签
        //tags = await Utility.getBoardTag(id);
        tagsV2 = await Utility.getBoardTagV2(id);
        this.setState({
          boardName: boardName,
          //tags: tags,
          tagsV2: tagsV2,
          boardId: id,
          masters: data.boardMasters,
          anonymousState: anonymousState
        });
        break;
      case "edit":
        url = `/post/${id}/original`;
        response = await Utility.cc98Fetch(url, { headers });
        if (response.status === 403) {
          this.setState({ fetchState: "not allowed" });
        }
        data = await response.json();
        const topicInfo = await Utility.getTopicInfo(data.topicId);

        //2024/2/2 更新后 origin内容不再返回title 转由topicInfo.title获取
        data.title = topicInfo.title;

        let tag1Name = await Utility.getTagNamebyId(topicInfo.tag1);
        if (!tag1Name) tag1Name = "";
        let tag2Name = await Utility.getTagNamebyId(topicInfo.tag2);
        if (!tag2Name) tag2Name = "";
        let type = topicInfo.type;
        //tags = await Utility.getBoardTag(data.boardId);
        tagsV2 = await Utility.getBoardTagV2(data.boardId);

        Utility.setLocalStorage("contentCache", data.content);
        const cache = Utility.getLocalStorage("contentCache");
        console.log("cache after saving = " + cache);

        //console.log(tags);

        url = `/Board/${data.boardId}`;
        response = await Utility.cc98Fetch(url, { headers });
        let masters = (await response.json()).boardMasters;
        if (
          Utility.getMyInfo() &&
          !(
            Utility.isMaster(masters) ||
            (Utility.getMyInfo().userTitleIds || []).indexOf(
              91
            ) !== -1
          ) &&
          type === 1
        ) {
          type = 0;
        }
        const boardName1 = await Utility.getBoardName(data.boardId);
        if (data.contentType === 0) {
          this.setState({
            masters,
            postInfo: data,
            content: data.content,
            title: data.title,
            boardName: boardName1,
            boardId: data.boardId,
            type: type,
            //tags: tags,
            tagsV2: tagsV2,
            topicInfo: topicInfo,
            tag1: tag1Name,
            tag2: tag2Name,
            mode: 0,
            notice: topicInfo.notifyPoster,
            isAnonymous: data.isAnonymous
          });
        } else
          this.setState({
            masters,
            postInfo: data,
            content: data.content,
            title: data.title,
            boardName: boardName1,
            boardId: data.boardId,
            type: type,
            //tags: tags,
            tagsV2: tagsV2,
            topicInfo: topicInfo,
            tag1: tag1Name,
            tag2: tag2Name,
            mode: 1,
            mdeState: data.content,
            notice: topicInfo.notifyPoster,
            isAnonymous: data.isAnonymous
          });
        break;
    }
    //查询财富值余额
    let wealth;
    try {
      wealth = await Utility.getUserWealth();
    } catch (e) {
      wealth = "查询财富值余额失败，请前往个人中心查看";
    }
    this.setState({
      wealth: wealth
    });
  }
  handleValueChange = value => {
    this.setState({ mdeState: value });
  };

  changeNormalType() {
    this.setState({ type: 0 });
  }

  changeAcademicType() {
    this.setState({ type: 2 });
  }

  changeActivityType() {
    this.setState({ type: 1 });
  }

  ready() {
    this.setState({ ready: true });
  }

  changeEditor() {
    if (!confirm("切换编辑器会丢失您之前的编辑内容，确定要切换吗？")) {
      return;
    }
    if (this.state.mode === 0) {
      console.log("change mode to 1");
      this.setState({ mode: 1 });
    } else {
      console.log("change mode to 2");
      this.setState({ mode: 0 });
    }
  }

  update(value) {
    this.setState({ content: value });
  }
  /** 发送markdown主题 */
  sendMdTopic = async (isAnonymous: boolean) => {
    //投票帖禁止匿名
    let _isAnonymous = isAnonymous;
    if (
      (this.state.tagsV2.layers === 1 && !this.state.tag1) ||
      (this.state.tagsV2.layers === 2 && (!this.state.tag1 || !this.state.tag2))
    ) {
      alert("请选择标签");
      return;
    }
    if (this.match.params.mode === "postVoteTopic") {
      _isAnonymous = false;
      // 投票内容发布前检查合法性
      const info = Vote.isFormIllegal(this.state.voteInfo);
      if (info) {
        alert(info);
        return null;
      }
    }
    //检查标题
    if (this.state.title == "") {
      alert("请输入标题!");
    } else {
      try {
        let tag1Id, tag2Id;
        let url = `/board/${this.match.params.id}/topic`;
        let c = this.state.mdeState;
        let content;
        const type = this.state.type;
        tag1Id = await Utility.getTagIdbyName(this.state.tag1);
        tag2Id = await Utility.getTagIdbyName(this.state.tag2);
        if (tag1Id && !tag2Id) {
          content = {
            content: c,
            contentType: 1,
            title: this.state.title,
            tag1: tag1Id,
            type: this.state.type,
            notifyPoster: this.state.notice,
            isAnonymous: _isAnonymous,
            clientType: 1
          };
        } else if (tag2Id) {
          content = {
            content: c,
            contentType: 1,
            title: this.state.title,
            tag1: tag1Id,
            tag2: tag2Id,
            type: this.state.type,
            notifyPoster: this.state.notice,
            isAnonymous: _isAnonymous,
            clientType: 1
          };
        } else {
          content = {
            content: c,
            contentType: 1,
            title: this.state.title,
            type: this.state.type,
            notifyPoster: this.state.notice,
            isAnonymous: _isAnonymous,
            clientType: 1
          };
        }
        if (this.match.params.mode === "postVoteTopic") {
          // 投票内容
          content = {
            ...content,
            isVote: true,
            voteInfo: this.state.voteInfo
          };
        }
        let contentJson = JSON.stringify(content);
        let token = await Utility.getToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        let mes = await Utility.cc98Fetch(url, {
          method: "POST",

          headers: myHeaders,

          body: contentJson
        });
        if (mes.status === 402) {
          alert("请输入内容");
        }
        if (mes.status === 400) {
          let text = await mes.text()
          alert(`发帖失败，原因：${this.handlePostErrorText(text)}`);
        }
        if (mes.status === 403) {
          let text = await mes.text()
          alert(`发帖失败，原因：${this.handlePostErrorText(text)}`);
          return;
        }
        //   testEditor.setMarkdown("");
        const topicId = await mes.text();
        //根据返回的topicid，发送@信息
        const atUsers = Utility.atHanderler(c);
        //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
        if (atUsers) {
          const tempData = await Utility.getTopicContent(Number(topicId), 1);
          const firstFloor = tempData[0];
          const postId = firstFloor.id;
          const atUsersJSON = JSON.stringify(atUsers);
          const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
          let myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/json");
          myHeaders2.append("Authorization", token);
          let response2 = await Utility.cc98Fetch(url2, {
            method: "POST",
            headers: myHeaders2,
            body: atUsersJSON
          });
        }
        Utility.removeLocalStorage("contentCache");
        this.props.history.push(`/topic/${topicId}`);
      } catch (e) {
        console.log(e);
      }
    }
  };
  /** 发送ubb主题 */
  sendUbbTopic = async (isAnonymous: boolean) => {
    //投票帖禁止匿名
    let _isAnonymous = isAnonymous;
    console.log("------");
    console.log(this.state);
    if (
      (this.state.tagsV2.layers === 1 && !this.state.tag1) ||
      (this.state.tagsV2.layers === 2 && (!this.state.tag1 || !this.state.tag2))
    ) {
      alert("请选择标签");
      return;
    }
    if (this.match.params.mode === "postVoteTopic") {
      _isAnonymous = false;
      //投票内容发布前检查合法性
      const info = Vote.isFormIllegal(this.state.voteInfo);
      if (info) {
        alert(info);
        return null;
      }
    }
    //检查标题
    if (this.state.title == "") {
      alert("请输入标题！");
    } else {
      const url = `/board/${this.match.params.id}/topic`;
      let content;
      let tag1Id, tag2Id;
      //console.log(this.state);
      tag1Id = await Utility.getTagIdbyName(this.state.tag1);
      tag2Id = await Utility.getTagIdbyName(this.state.tag2);
      if (tag1Id && !tag2Id) {
        content = {
          content: this.state.content,
          contentType: 0,
          title: this.state.title,
          tag1: tag1Id,
          type: this.state.type,
          notifyPoster: this.state.notice,
          isAnonymous: _isAnonymous,
          clientType: 1
        };
      } else if (tag2Id) {
        content = {
          content: this.state.content,
          contentType: 0,
          title: this.state.title,
          tag1: tag1Id,
          tag2: tag2Id,
          type: this.state.type,
          notifyPoster: this.state.notice,
          isAnonymous: _isAnonymous,
          clientType: 1
        };
      } else {
        content = {
          content: this.state.content,
          contentType: 0,
          title: this.state.title,
          type: this.state.type,
          notifyPoster: this.state.notice,
          isAnonymous: _isAnonymous,
          clientType: 1
        };
      }
      if (this.match.params.mode === "postVoteTopic") {
        // 投票内容
        content = {
          ...content,
          isVote: true,
          voteInfo: this.state.voteInfo
        };
      }
      const contentJson = JSON.stringify(content);
      const token = await Utility.getToken();
      let myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      //我也不知道为什么markdown发帖那里的变量名叫mes，这里就变成response了
      let response = await Utility.cc98Fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: contentJson
      });
      if (response.status === 402) {
        alert("请输入内容");
      }
      if (response.status === 400) {
        let text = await response.text()
        //错误信息，如果返回的错误格式发生变化，可能会出现问题
        alert(`发帖失败，原因：${this.handlePostErrorText(text)}`);
      }

      if (response.status === 403) {
        let text = await response.text()
        alert(`发帖失败，原因：${this.handlePostErrorText(text)}`);
        return;
      }
      //发帖成功，api返回topicid
      const topicId = await response.text();
      console.log("topicid=" + topicId);
      if (topicId === "cannot_post_in_this_board")
        store.dispatch(ErrorActions.throwError("CannotPost"));
      else {
        //根据返回的topicid，发送@信息
        const atUsers = Utility.atHanderler(this.state.content);
        //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
        if (atUsers) {
          const tempData = await Utility.getTopicContent(Number(topicId), 1);
          const firstFloor = tempData[0];
          const postId = firstFloor.id;
          const atUsersJSON = JSON.stringify(atUsers);
          const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;

          let myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/json");
          myHeaders2.append("Authorization", token);
          let response2 = await Utility.cc98Fetch(url2, {
            method: "POST",
            headers: myHeaders2,
            body: atUsersJSON
          });
        }
        Utility.removeLocalStorage("contentCache");
        this.props.history.push(`/topic/${topicId}`);
      }
    }
  };

  handlePostErrorText = (text: string) => {
    switch (text) {
      case "board_not_exists":
        return "版面不存在";
      case "board_cannot_vote":
        return "版面无法投票";
      case "vote_topic_cannot_be_anonymous":
        return "投票贴不能匿名发表";
      case "wealth_not_enough_for_anonymous_topic":
        return "可选匿名的版面，匿名发主题所需的财富值不足";
      case "tag_id_error":
        return "版面标签错误";
      case "no_vote_info":
        return "投票信息错误";
      case "vote_item_error":
        return "投票项错误";
      case "max_vote_count_error":
        return "最大投票数错误";
      case "vote_expired_days_error":
        return "投票有效期错误";
      case "vote_items_error":
        return "投票项错误";
      case "cannot_entry_board":
        return "没有进入版面的权限";
      case "board_is_locked":
        return "版面已被锁定";
      case "cannot_post_school_event":
        return "没有权限发布校园活动类型的主题帖";
      case "user_state_is_abnormal":
        return "被全站禁言中或被锁定账号";
      case "last_post_in_10_seconds":
        return "距离上一次发言不足10秒";
      case "cannot_post_anonymous":
        return "因匿名发言被处以版面禁言处罚，该处罚未到期，无法在全站匿名发言";
      case "cannot_post_in_this_board":
        return "在该版面被禁言中";
      case "board_minimum_post_count_request":
        return "该版面发主题帖存在最小发帖数的限制";
      case "request_too_fast":
        return "请求过快";
      default:
        return "未知错误";
    }

  }

  sendOnymousUbbTopic = () => {
    this.sendUbbTopic(false);
  };

  sendAnonymousUbbTopic = () => {
    this.sendUbbTopic(true);
  };

  sendOnymousMdTopic = () => {
    this.sendMdTopic(false);
  };

  sendAnonymousMdTopic = () => {
    this.sendMdTopic(true);
  };

  /** 编辑ubb帖子
   * 
   *  240914 TODO未完成：
   *  两层标签时，如果编辑时切换了tag1，未选tag2，提交后按原tag1和tag2提交；
   *  最好应该无法提交，弹选标签的提示框。
   */
  async editUBB() {
    const url = `/post/${this.match.params.id}`;
    let tag1Id, tag2Id, content;
    //console.log(this.state);
    tag1Id = await Utility.getTagIdbyName(this.state.tag1);
    tag2Id = await Utility.getTagIdbyName(this.state.tag2);
    if (tag1Id && !tag2Id) {
      content = {
        content: this.state.content,
        contentType: 0,
        title: this.state.title,
        tag1: tag1Id,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    } else if (tag2Id) {
      content = {
        content: this.state.content,
        contentType: 0,
        title: this.state.title,
        tag1: tag1Id,
        tag2: tag2Id,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    } else {
      content = {
        content: this.state.content,
        contentType: 0,
        title: this.state.title,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    }

    const body = JSON.stringify(content);
    const token = await Utility.getToken();
    const headers = await Utility.formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const response = await Utility.cc98Fetch(url, {
      method: "PUT",
      headers,
      body
    });
    const floor = this.state.postInfo.floor;
    const pageFloor = floor % 10 === 0 ? 10 : floor % 10;
    const page =
      floor % 10 === 0 ? floor / 10 : (floor - (floor % 10)) / 10 + 1;
    Utility.removeLocalStorage("contentCache");
    const redirectUrl = `/topic/${this.state.postInfo.topicId}/${page}#${pageFloor}`;
    this.props.history.push(redirectUrl);
  }
  /** 编辑markdown帖子 
   *
   *  240914 TODO未完成：
   *  两层标签时，如果编辑时切换了tag1，未选tag2，提交后按原tag1和tag2提交；
   *  最好应该无法提交，弹选标签的提示框。
  */
  async editMd() {
    const url = `/post/${this.match.params.id}`;
    let c = this.state.mdeState;
    let content, tag1Id, tag2Id;
    tag1Id = await Utility.getTagIdbyName(this.state.tag1);
    tag2Id = await Utility.getTagIdbyName(this.state.tag2);
    if (tag1Id && !tag2Id) {
      tag1Id = await Utility.getTagIdbyName(this.state.tag1);
      content = {
        content: c,
        contentType: 1,
        title: this.state.title,
        tag1: tag1Id,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    } else if (tag2Id) {
      content = {
        content: c,
        contentType: 1,
        title: this.state.title,
        tag1: tag1Id,
        tag2: tag2Id,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    } else {
      content = {
        content: c,
        contentType: 1,
        title: this.state.title,
        type: this.state.type,
        notifyPoster: this.state.notice
      };
    }
    const body = JSON.stringify(content);
    const token = await Utility.getToken();
    const headers = await Utility.formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const response = await Utility.cc98Fetch(url, {
      method: "PUT",
      headers,
      body
    });
    const floor = this.state.postInfo.floor;
    const pageFloor = floor % 10 === 0 ? 10 : floor % 10;
    const page =
      floor % 10 === 0 ? floor / 10 : (floor - (floor % 10)) / 10 + 1;
    const redirectUrl = `/topic/${this.state.postInfo.topicId}/${page}#${pageFloor}`;
    Utility.removeLocalStorage("contentCache");
    this.props.history.push(redirectUrl);
  }

  onTitleChange(title, tag1, tag2) {
    //console.log("handle change");
    //console.log("tag1=" + tag1);
    if (title != "") this.setState({ title: title, tag1: tag1, tag2: tag2 });
    else this.setState({ tag1: tag1, tag2: tag2 });
  }
  onUbbChange(content) {
    this.setState({ content: content });
  }
  onVoteInfoChange(voteInfo: VoteProps["voteInfo"]) {
    this.setState({ voteInfo });
  }
  setValue = v => {
    this.setState({ mdeState: this.state.mdeState + v }, () => {
      this.setState({ mdeState: this.state.mdeState });
    });
  };
  notNotice = async () => {
    this.setState({ notice: !this.state.notice });
  };
  showModal = () => {
    this.setState({
      houseTmpVisible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      houseTmpVisible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      houseTmpVisible: false
    });
  };

  handleTmpForm = e => {
    console.log("====");
    console.log(e);
    console.log(e.validDate[0]);
    console.log();
    const content = `[table]
    [tr][th]序号[/th][th]信息项[/th][th]描述[/th][/tr]
    [tr][td]01[/td][td]有效日期[/td][td]${moment(e.validDate[0]).format(
      "YYYY-MM-DD"
    )}-${moment(e.validDate[1]).format("YYYY-MM-DD")}[/td][/tr]
    [tr][td]02[/td][td]类型[/td][td]${e.type || ""}[/td][/tr]
    [tr][td]03[/td][td]地区[/td][td]${e.district || ""}[/td][/tr]
    [tr][td]04[/td][td]小区名称[/td][td]${e.neighborhood || ""}[/td][/tr]
    [tr][td]05[/td][td]详细地址[/td][td]${e.address || ""}[/td][/tr]
    [tr][td]06[/td][td]联系方式[/td][td]${e.contact || ""}[/td][/tr]
    [tr][td]07[/td][td]价格[/td][td]${e.price || ""}[/td][/tr]
    [tr][td]08[/td][td]租期[/td][td]${e.rentDays || ""}[/td][/tr]
    [tr][td]09[/td][td]房户类型[/td][td]${e.houseType || ""}[/td][/tr]
    [tr][td]10[/td][td]出租户型[/td][td]${e.rentType || ""}[/td][/tr]
    [tr][td]11[/td][td]出租面积[/td][td]${e.area || ""}[/td][/tr]
    [tr][td]12[/td][td]可租期限[/td][td]${e.range || ""}[/td][/tr]
    [tr][td]13[/td][td]付款方式[/td][td]${e.paymentType || ""}[/td][/tr]
    [tr][td]14[/td][td]是否为隔间[/td][td]${e.isSingleRoom || ""}[/td][/tr]
    [tr][td]15[/td][td]独立电表[/td][td]${e.isElectricIsolated || ""}[/td][/tr]
    [tr][td]16[/td][td]水电缴费[/td][td]${e.waterElecValue || ""}[/td][/tr]
    [tr][td]17[/td][td]日常卫生[/td][td]${e.cleaning || ""}[/td][/tr]
    [tr][td]18[/td][td]维修物业[/td][td]${e.repairing || ""}[/td][/tr]
    [tr][td]19[/td][td]网络带宽[/td][td]${e.networking || ""}[/td][/tr]
    [tr][td]20[/td][td]退租方式[/td][td]${e.checkout || ""}[/td][/tr]
    [tr][td]21[/td][td]其他描述[/td][td]${e.otherDescriptions || ""}[/td][/tr]
    [tr][td]22[/td][td]其他要求[/td][td]${e.otherDemands || ""}[/td][/tr]
    [/table]`;
    this.setState({
      content: content + "\n\n" + this.state.content,
      houseTmpVisible: false
    });
  };

  render() {
    const contentCache = Utility.getLocalStorage("contentCache");
    const mode = this.match.params.mode;
    const id = this.match.params.id;
    const url = `/board/${this.state.boardId}`;
    let editor;
    let titleInput = null;
    //发主题或发投票模式
    if (mode === "postTopic" || mode === "postVoteTopic") {
      titleInput = (
        <InputTitle
          boardId={id}
          //tags={this.state.tags}
          tagsV2={this.state.tagsV2}
          onChange={this.onTitleChange.bind(this)}
          title={this.state.postInfo.title}
          tag1={0}
          tag2={0}
        />
      );
      //根据版面匿名状态显示相应的按钮
      let ubbButtons;
      let mdButtons;
      if (this.state.anonymousState === 0 || mode === "postVoteTopic") {
        ubbButtons = (
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              id="post-topic-button"
              onClick={this.sendOnymousUbbTopic}
              className="button blue"
            >
              发帖
            </button>
          </div>
        );
        mdButtons = (
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              id="post-topic-button"
              onClick={this.sendOnymousMdTopic}
              className="button blue"
            >
              发帖
            </button>
          </div>
        );
      } else if (this.state.anonymousState === 1) {
        ubbButtons = (
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              id="post-topic-button-anonymous"
              onClick={this.sendAnonymousUbbTopic}
              className="button grey"
            >
              匿名发帖
            </button>
          </div>
        );
        mdButtons = (
          <div className="row" style={{ justifyContent: "center" }}>
            <button
              id="post-topic-button-anonymous"
              onClick={this.sendAnonymousMdTopic}
              className="button grey"
            >
              匿名发帖
            </button>
          </div>
        );
      } else if (this.state.anonymousState === 2 || this.state.anonymousState === 3) {
        ubbButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div>
              <button
                id="post-topic-button"
                onClick={this.sendOnymousUbbTopic}
                className="button blue"
              >
                发帖
              </button>
              <button
                id="post-topic-button-anonymous"
                onClick={this.sendAnonymousUbbTopic}
                className="button grey"
              >
                匿名发帖
              </button>
            </div>
            <p>
              在本版面匿名发主题每次需消耗10000财富值。你当前的财富值余额为：
              {this.state.wealth}
            </p>
          </div>
        );
        mdButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div>
              <button
                id="post-topic-button"
                onClick={this.sendOnymousMdTopic}
                className="button blue"
              >
                发帖
              </button>
              <button
                id="post-topic-button-anonymous"
                onClick={this.sendAnonymousMdTopic}
                className="button grey"
              >
                匿名发帖
              </button>
            </div>
            <p>
              在本版面匿名发主题每次需消耗10000财富值。你当前的财富值余额为：
              {this.state.wealth}
            </p>
          </div>
        );
      }

      if (this.state.mode === 0) {
        editor = (
          <div>
            <div className="createTopicContent">
              <div className="createTopicListName">主题内容</div>
              <div style={{ color: "darkgray" }}>提示：CC98微信小程序现已支持上传时长不超过6分钟的视频。</div>
              <div
                id="post-topic-changeMode"
                onClick={this.changeEditor}
                className="hiddenImage"
                style={{ width: "12rem", marginTop: "0rem" }}
              >
                切换到Markdown编辑器
              </div>
            </div>
            <UbbEditor
              update={this.update}
              value={this.state.content}
              option={{ height: 20, submit: this.sendOnymousUbbTopic }}
            />
            {ubbButtons}
          </div>
        );
      } else {
        editor = (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="createTopicContent">
              <div className="createTopicListName">主题内容</div>
              <div style={{ color: "darkgray" }}>提示：CC98微信小程序现已支持上传时长不超过6分钟的视频。</div>
              <div
                id="post-topic-changeMode"
                onClick={this.changeEditor}
                className="hiddenImage"
                style={{ width: "12rem", marginTop: "0rem" }}
              >
                切换到UBB编辑器
              </div>
            </div>
            <ReactMde
              value={this.state.mdeState}
              onChange={this.handleValueChange}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              commands={this.state.commands}
              minEditorHeight={330}
              maxEditorHeight={500}
              buttonContentOptions={{
                iconProvider: name => {
                  console.log(name);
                  if (name === "heading")
                    return <i className={`fa fa-header`} />;

                  return <i className={`fa fa-${name}`} />;
                }
              }}
            />
            {mdButtons}
          </div>
        );
      }
    }
    //编辑模式
    else if (mode === "edit") {
      if (this.state.mode === 0) {
        editor = (
          <div>
            <div className="createTopicContent">
              <div className="createTopicListName">主题内容</div>
              <div style={{ color: "darkgray" }}>提示：CC98微信小程序现已支持上传时长不超过6分钟的视频。</div>
              <div
                id="post-topic-changeMode"
                onClick={this.changeEditor}
                className="hiddenImage"
                style={{ width: "12rem", marginTop: "0rem" }}
              >
                切换到Markdown编辑器
              </div>
            </div>
            <UbbEditor
              update={this.update}
              value={this.state.content}
              option={{ submit: this.editUBB.bind(this) }}
            />
            <div className="row" style={{ justifyContent: "center" }}>
              <button
                id="post-topic-button"
                onClick={this.editUBB}
                className="button blue"
              >
                编辑
              </button>
            </div>
          </div>
        );
      } else if (this.state.mode === 1) {
        editor = (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="createTopicContent">
              <div className="createTopicListName">主题内容</div>
              <div style={{ color: "darkgray" }}>提示：CC98微信小程序现已支持上传时长不超过6分钟的视频。</div>
              <div
                id="post-topic-changeMode"
                onClick={this.changeEditor}
                className="hiddenImage"
                style={{ width: "12rem", marginTop: "0rem" }}
              >
                切换到UBB编辑器
              </div>
            </div>
            <ReactMde
              value={this.state.mdeState}
              onChange={this.handleValueChange}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              commands={this.state.commands}
              minEditorHeight={330}
              maxEditorHeight={500}
              buttonContentOptions={{
                iconProvider: name => {
                  console.log(name);
                  if (name === "heading")
                    return <i className={`fa fa-header`} />;

                  return <i className={`fa fa-${name}`} />;
                }
              }}
            />
            <button
              id="post-topic-button"
              onClick={this.editMd.bind(this)}
              className="button blue"
            >
              编辑
            </button>
          </div>
        );
      }
      if (this.state.postInfo.floor === 1) {
        titleInput = (
          <InputTitle
            boardId={id}
            //tags={this.state.tags}
            tagsV2={this.state.tagsV2}
            onChange={this.onTitleChange.bind(this)}
            title={this.state.postInfo.title}
            tag1={this.state.topicInfo.tag1}
            tag2={this.state.topicInfo.tag2}
          />
        );
      }
    }
    console.log("默认type:" + this.state.type);
    let topicType = (
      <div className="createTopicType">
        <div className="createTopicListName">发帖类型</div>
        <input
          type="radio"
          name="type"
          value="普通"
          onClick={this.changeNormalType}
          checked={this.state.type === 0 ? true : false}
        />{" "}
        普通
        <input
          type="radio"
          name="type"
          value="学术通知"
          onClick={this.changeAcademicType}
          checked={this.state.type === 2 ? true : false}
        />{" "}
        学术通知
        <div style={{ color: "rgb(255,0,0)" }}>
          （活动帖和学术帖请选择正确的发帖类型）
        </div>
      </div>
    );

    //console.log(Utility.isMaster(this.state.masters));

    // issue #38 普通用户不显示校园活动
    if (
      Utility.getMyInfo() &&
      (Utility.isMaster(this.state.masters) ||
        (Utility.getMyInfo().userTitleIds || []).indexOf(91) !==
        -1)
    ) {
      topicType = (
        <div className="createTopicType">
          <div className="createTopicListName">发帖类型</div>
          <input
            type="radio"
            name="type"
            value="普通"
            onClick={this.changeNormalType}
            checked={this.state.type === 0 ? true : false}
          />{" "}
          普通
          <input
            type="radio"
            name="type"
            value="学术通知"
            onClick={this.changeAcademicType}
            checked={this.state.type === 2 ? true : false}
          />{" "}
          学术通知
          <input
            type="radio"
            name="type"
            value="校园活动"
            onClick={this.changeActivityType}
            checked={this.state.type === 1 ? true : false}
          />{" "}
          校园活动
          <div style={{ color: "rgb(255,0,0)" }}>
            （活动帖和学术帖请选择正确的发帖类型）
          </div>
        </div>
      );
    }

    // 开启消息提醒
    let noticeOption = (
      <div className="createTopicType">
        <div className="createTopicListName">高级选项</div>
        <input
          style={{ marginLeft: "5px" }}
          type="checkbox"
          name="option"
          value="notNotice"
          onClick={this.notNotice}
          checked={this.state.notice}
        />{" "}
        接收消息提醒
      </div>
    );

    if (this.state.postInfo.floor !== 1 && mode === "edit") {
      topicType = null;
      noticeOption = null;
    }

    // 住房信息模板
    let houseTemplate = null;
    if (Number(this.state.boardId) === 515) {
      houseTemplate = (
        <>
          <div style={{ marginBottom: "15px" }}>
            <Button
              style={{ width: "150px" }}
              type="primary"
              size="default"
              onClick={this.showModal}
            >
              住房信息模板
            </Button>
            <span style={{ color: "red", marginLeft: "10px" }}>
              (出租、合租、转租、出售等已有房源必填)
            </span>
          </div>

          <Tmp
            // TODO: remove ts-ignore
            // @ts-ignore
            visible={this.state.houseTmpVisible}
            submit={this.handleTmpForm}
          />
        </>
      );
    }

    return (
      <div className="createTopic">
        <Category url={url} boardName={this.state.boardName} mode={mode} />
        <TagNotice tagsV2={this.state.tagsV2} postInfo={this.state.postInfo} />
        {titleInput}
        {topicType}
        {noticeOption}
        {houseTemplate}
        {mode === "postVoteTopic" ? (
          <Vote
            voteInfo={this.state.voteInfo}
            onVoteInfoChange={this.onVoteInfoChange}
          />
        ) : null}
        {editor}
      </div>
    );
  }
}
export class TagNotice extends React.Component<{ tagsV2, postInfo }, { tagsV2, postInfo }> {
  constructor(props) {
    super(props);
    this.state = {
      tagsV2: this.props.tagsV2,
      postInfo: this.props.postInfo
    };
  }
  render() {
    //发新帖时postInfo.floor===0
    return this.props.tagsV2.layers === 2 && this.props.postInfo.floor < 2 ?
      (
        <div className="createTopicType">
          <div style={{ color: "rgb(255,0,0)" }}>
            【提示】↓↓↓ 该版面有两层标签，请先选择第1个标签，再选择第2个标签 ↓↓↓
          </div>
        </div>
      ) :
      null;
  }
}

/**
 * 编辑界面的导航器组件
 */
export class Category extends React.Component<
  { url: string; boardName: string; mode: string },
  { url: string; boardName: string }
> {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      boardName: ""
    };
  }
  //在子组件中，this.props的值不会自动更新，每当父组件的传值发生变化时，需要在子组件的的componentWillReceiveProps中去手动更新
  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.url,
      boardName: nextProps.boardName
    });
  }
  render() {
    let categoryText: string;
    if (this.props.mode === "postTopic") categoryText = "发表主题";
    else if (this.props.mode === "edit") categoryText = "编辑主题";
    else if (this.props.mode === "postVoteTopic") categoryText = "发表投票主题";
    return (
      <div
        className="row"
        style={{
          alignItems: "baseline",
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
            marginLeft: "0.5rem",
            marginRight: "0.5rem"
          }}
          to={this.state.url}
        >
          {this.state.boardName}
        </Link>
        <i className="fa fa-chevron-right"></i>
        <div
          style={{
            color: "grey",
            fontSize: "1rem",
            marginLeft: "0.5rem",
            marginRight: "0.5rem"
          }}
        >
          {categoryText}
        </div>
      </div>
    );
  }
}

/**
 * 编辑界面的标签
 * 用于特定版面的发主题/编辑主题
 * TODO:尚未完成
 */
export class Tags extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div></div>;
  }
}

/**
 * 编辑界面的标题
 * 用于发主题/编辑主题
 * TODO:尚未完成
 */
export class InputTitle extends React.Component<
  //{ boardId; onChange; tags; tagsV2; title; tag1; tag2 },
  //{ title: string; tags; tagsV2; tag1; tag2; hasEvent: boolean }
  { boardId; onChange; tagsV2; title; tag1; tag2 },
  { title: string; tagsV2; tag1; tag2; hasEvent: boolean }
> {
  constructor(props) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.generateTagOption = this.generateTagOption.bind(this);
    this.state = {
      title: this.props.title,
      //tags: this.props.tags,
      tagsV2: this.props.tagsV2,
      tag1: "",
      tag2: "",
      hasEvent: false
    };
  }

  handleTitleChange(event) {
    let tag1, tag2;
    if (this.state.tagsV2.layers === 0) {
      this.props.onChange(event.target.value, "", "");
      this.setState({ title: event.target.value });
    } else if (this.state.tagsV2.layers === 1) {
      tag1 = $(".tagBoxSelect").text();
      this.props.onChange(event.target.value, tag1, "");
      this.setState({ title: event.target.value });
    } else {
      tag1 = $(".tagBoxSelect").text();
      tag2 = $(".tagBoxSelect1").text();

      this.props.onChange(event.target.value, tag1, tag2);
      this.setState({ title: event.target.value });
    }
  }
  handleTagChange() {
    const tag1 = $(".tagBoxSelect").text();
    const tag2 = $(".tagBoxSelect1").text();
    //console.log("tagtext");
    //console.log($(".tagBoxSelect1").text());
    this.props.onChange("", tag1, tag2);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.title && !this.state.title) {
      //this.setState({ title: newProps.title, tags: newProps.tags, tagsV2: newProps.tagsV2 });
      this.setState({ title: newProps.title, tagsV2: newProps.tagsV2 });
    }
    else {
      //this.setState({ tags: newProps.tags, tagsV2: newProps.tagsV2 });
      this.setState({ tagsV2: newProps.tagsV2 });
    }
  }

  componentDidMount() {
    //如果有默认tags就绑定事件
    // if (this.state.tags.length > 0) {
    //   this.bindEvent();
    // }
    if (this.state.tagsV2.layers > 0) {
      this.bindEvent();
    }
  }

  componentDidUpdate() {
    //如果没绑定过事件则绑定事件
    if (!this.state.hasEvent) {
      this.bindEvent();
    }
  }

  bindEvent = async () => {
    const tagBoxSelect = $(".tagBoxSelect");
    //获取不到元素的时候不绑定事件
    if (tagBoxSelect.length === 0) {
      return;
    } else {
      //获取到则标记已绑定过事件
      this.setState({
        hasEvent: true
      });
    }
    const downArrow = $(".downArrow");
    const tagBoxSub = $(".tagBoxSub");
    //const tagBoxLi = tagBoxSub.find("li");

    $(document).on("click", function () {
      tagBoxSub.css("display", "none");
    });

    tagBoxSelect.on("click", function () {
      //console.log("click1");
      if (tagBoxSub.css("display") === "block")
        tagBoxSub.css("display", "none");
      else tagBoxSub.css("display", "block");
      return false; //阻止事件冒泡
    });

    downArrow.on("click", function () {
      if (tagBoxSub.css("display") === "block")
        tagBoxSub.css("display", "none");
      else tagBoxSub.css("display", "block");
      return false; //阻止事件冒泡
    });

    // tagBoxLi.on("click", function () {
    //   console.log('on click tagBoxLi:');
    //   tagBoxSelect.text($(this).text());
    // });

    // tagBoxLi.on("mouseover", function () {
    //   this.className = "hover";
    // });

    // tagBoxLi.on("mouseout", function () {
    //   this.className = "";
    // });

    const tagBoxSelect1 = $(".tagBoxSelect1");
    const downArrow1 = $(".downArrow1");
    const tagBoxSub1 = $(".tagBoxSub1");
    //const tagBoxLi1 = tagBoxSub1.find("li");
    $(document).on("click", function () {
      tagBoxSub1.css("display", "none");
    });

    tagBoxSelect1.on("click", function () {
      if (tagBoxSub1.css("display") === "block")
        tagBoxSub1.css("display", "none");
      else tagBoxSub1.css("display", "block");
      return false; //阻止事件冒泡
    });

    downArrow1.on("click", function () {
      if (tagBoxSub1.css("display") === "block")
        tagBoxSub1.css("display", "none");
      else tagBoxSub1.css("display", "block");
      return false; //阻止事件冒泡
    });

    // tagBoxLi1.on("click", function () {
    //   console.log('on click tagBoxLi1:');
    //   tagBoxSelect1.text($(this).text());
    // });

    // tagBoxLi1.on("mouseover", function () {
    //   this.className = "hover";
    // });

    // tagBoxLi1.on("mouseout", function () {
    //   this.className = "";
    // });
    let tag1 = "", tag2 = "";
    if (this.props.tag1 !== 0) {
      tag1 = await Utility.getTagNamebyId(this.props.tag1);
    }
    if (this.props.tag2 !== 0) {
      tag2 = await Utility.getTagNamebyId(this.props.tag2);
    }
    if (this.props.title && !this.state.title) {
      this.setState({
        title: this.props.title,
        //tags: this.props.tags,
        tagsV2: this.props.tagsV2,
        tag1: tag1,
        tag2: tag2
      });
    }
    else {
      //this.setState({ tags: this.props.tags, tagsV2: this.props.tagsV2, tag1: tag1, tag2: tag2 });
      this.setState({ tagsV2: this.props.tagsV2, tag1: tag1, tag2: tag2 });
    }
  };

  generateTagOption(item, layers = 1, isTag2 = false) {
    //console.log(`generateTagOption: ${item.name}`);
    let that = this;
    return <li onClick={function () {
      //当有2层标签时，tag1变化后将tag2重置
      const tagBoxSelect = $(".tagBoxSelect");
      if (layers === 1) {
        tagBoxSelect.text(item.name);
      } else {
        const tagBoxSelect1 = $(".tagBoxSelect1");
        if (isTag2) {
          tagBoxSelect1.text(item.name);
        } else {
          tagBoxSelect.text(item.name);
          tagBoxSelect1.text("");
        }
      }

      that.handleTagChange();
    }}>{item.name}</li>;
  }

  render() {
    let drop1 = null;
    let drop2 = null;
    const tagBoxSelect = $(".tagBoxSelect");
    const tagBoxSelect1 = $(".tagBoxSelect1");
    console.log('render begin:');
    // console.log(this.state.tagsV2);
    // console.log(`layers:${this.state.tagsV2.layers}`);
    console.log(`tagBoxSelect: ${tagBoxSelect.text()}`);
    console.log(`tagBoxSelect1: ${tagBoxSelect1.text()}`);
    // const findTag = this.state.tagsV2.tags.find(i => i.name === "test");
    // console.log(findTag ? findTag : '未找到tag: test');
    console.log('render end.');

    if (this.state.tagsV2.layers > 0) {
      drop1 = (
        <ul className="tagBoxSub">
          {this.state.tagsV2.tags.map(i => this.generateTagOption(i, this.state.tagsV2.layers, false))}
        </ul>
      );
    }
    if (this.state.tagsV2.layers === 2) {
      if (tagBoxSelect.text()) {
        drop2 = (<ul className="tagBoxSub1">
          {this.state.tagsV2.tags.find(i => i.name === tagBoxSelect.text())
            .subTags.map(i => this.generateTagOption(i, this.state.tagsV2.layers, true))}
        </ul>);
      } else if (this.state.tag1) {
        drop2 = (<ul className="tagBoxSub1">
          {this.state.tagsV2.tags.find(i => i.name === this.state.tag1)
            .subTags.map(i => this.generateTagOption(i, this.state.tagsV2.layers, true))}
        </ul>);
      } else {
        drop2 = (<ul className="tagBoxSub1"></ul>);
      }
    }
    let tagInfo = null;
    if (this.state.tagsV2.layers === 2) {
      let defaultTag1 = "";
      let defaultTag2 = "";
      if (this.state.tag1) defaultTag1 = this.state.tag1;
      if (this.state.tag2) defaultTag2 = this.state.tag2;
      tagInfo = (
        <div className="row">
          <div className="row">
            <div className="tagBoxSelect">{defaultTag1}</div>
            <div className="downArrow">
              <img src="/static/images/downArrow.png" width="12" height="12" />
            </div>
            {drop1}
          </div>
          <div className="row">
            <div className="tagBoxSelect1">{defaultTag2}</div>
            <div className="downArrow1">
              <img src="/static/images/downArrow.png" width="12" height="12" />
            </div>
            {drop2}
          </div>
        </div>
      );
    } else if (this.state.tagsV2.layers == 1) {

      /*if (this.state.tags.length > 0)
        drop1 = (
          <ul className="tagBoxSub">
            {this.state.tags[0].tags.map(this.generateTagOption)}
          </ul>
        );
      if (this.state.tags.length === 2)
        drop2 = (
          <ul className="tagBoxSub1">
            {this.state.tags[1].tags.map(this.generateTagOption)}
          </ul>
        );
      let tagInfo = null;
      if (this.state.tags.length === 2) {
        let defaultTag1 = "";
        let defaultTag2 = "";
        if (this.state.tag1) defaultTag1 = this.state.tag1;
        if (this.state.tag2) defaultTag2 = this.state.tag2;
        tagInfo = (
          <div className="row">
            <div className="row">
              <div className="tagBoxSelect">{defaultTag1}</div>
              <div className="downArrow">
                <img src="/static/images/downArrow.png" width="12" height="12" />
              </div>
              {drop1}
            </div>
            <div className="row">
              <div className="tagBoxSelect1">{defaultTag2}</div>
              <div className="downArrow1">
                <img src="/static/images/downArrow.png" width="12" height="12" />
              </div>
              {drop2}
            </div>
          </div>
        );
      } else if (this.state.tags.length == 1) {*/



      let defaultTag1 = "";
      if (this.state.tag1) defaultTag1 = this.state.tag1;
      tagInfo = (
        <div className="row">
          <div className="tagBoxSelect">{defaultTag1}</div>
          <div className="downArrow">
            <img src="/static/images/downArrow.png" width="12" height="12" />
          </div>
          {drop1}
        </div>
      );
    }
    return (
      <div className="createTopicTitle">
        <div className="createTopicListName">主题标题</div>
        {tagInfo}
        <input
          value={this.state.title}
          placeholder="请输入新主题的标题"
          onChange={this.handleTitleChange.bind(this)}
        />
      </div>
    );
  }
}

/**
 * 编辑界面的选项
 * 用于发主题/编辑主题
 * 所有版面仅管理员可以设置仅楼主可见
 * TODO:尚未完成
 */
export class Options extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="createTopicOption">
        <div className="createTopicListName">选项</div>
        <input type="radio" checked={true} name="option" value="all" />
        回复所有人可见
        <input type="radio" name="option" value="host" />
        回复仅楼主可见
        <input type="radio" name="option" value="special" />
        回复仅特定用户可见
      </div>
    );
  }
}

class TmpForm extends React.Component<any, any> {
  state = {
    elecRadio: "",
    waterElecRadio: "",
    elecValue: "",
    waterElecValue: "",
    visible: this.props.visible
  };
  componentWillReceiveProps(newProps) {
    //  if(newProps.visible !== this.props.visible){
    this.setState({ visible: newProps.visible });
    //}
  }
  onWaterElecChange = e => {
    this.setState({
      waterElecRadio: e.target.value
    });
  };
  onElecChange = e => {
    this.setState({
      elecRadio: e.target.value
    });
  };
  onHandleSubmit = e => {
    e.preventDefault();
    const ref: any = this.refs.tmpForm;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (this.state.elecRadio === "其他")
          values.isElectricIsolated = this.state.elecValue;
        if (this.state.waterElecRadio === "其他")
          values.waterElecValue = this.state.waterElecValue;
        this.props.submit(values);
        this.setState({ visible: false });
      }
    });
  };
  onCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "Please select time!" }]
    };
    return (
      <Modal
        title="住房信息模板"
        visible={this.state.visible}
        onOk={this.onHandleSubmit}
        onCancel={this.onCancel}
      >
        <Form
          ref="tmpForm"
          style={{ maxHeight: "500px", overflowY: "scroll" }}
          {...formItemLayout}
          onSubmit={this.onHandleSubmit}
        >
          <Form.Item label="有效时间">
            {getFieldDecorator(
              "validDate",
              rangeConfig
            )(
              <RangePicker
                renderExtraFooter={() => "不能大于2周，到期可编辑"}
              />
            )}
          </Form.Item>
          <Form.Item label="类型" hasFeedback>
            {getFieldDecorator("type", {
              rules: [{ required: true, message: "请选择类型!" }]
            })(
              <Select placeholder="请选择类型">
                <Option value="整租">整租</Option>
                <Option value="合租">合租</Option>
                <Option value="转租">转租</Option>
                <Option value="出售">出售</Option>
                <Option value="其他">其他</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="地区">
            {getFieldDecorator("district", {
              rules: [{ required: true, message: "请输入地区!" }]
            })(
              <Input placeholder="例如：紫金港 / 玉泉 / 文一西路xx路交叉口处 / 上海的xx路附近" />
            )}
          </Form.Item>
          <Form.Item label="小区名称">
            {getFieldDecorator("neighborhood", {
              rules: [{ required: true, message: "请输入小区名称!" }]
            })(<Input placeholder="例如：港湾家园" />)}
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator("address", {
              rules: [{ required: true, message: "请输入详细地址!" }]
            })(<Input placeholder="例如：余杭塘路866号港湾家园X幢X单元X号" />)}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator("contact", {
              rules: [{ required: true, message: "请输入联系方式!" }]
            })(
              <Input placeholder="例如：张房东 电话18888888888 / 李女士 微信1234abc" />
            )}
          </Form.Item>
          <Form.Item label="价格">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入价格!" }]
            })(<Input placeholder="例如：2000元/月" />)}
          </Form.Item>
          <Form.Item label="租期">
            {getFieldDecorator("rentDays", {
              rules: [{ required: true, message: "请输入租期!" }]
            })(<Input placeholder="例如：6个月起租" />)}
          </Form.Item>
          <Form.Item label="房户类型">
            {getFieldDecorator("houseType", {
              rules: [{ required: true, message: "请输入房户类型!" }]
            })(
              <Input placeholder="例如：4室0厅1阳1卫1厨（指包括要出租的房间数量，加上公用的区域，私用的不算入）" />
            )}
          </Form.Item>
          <Form.Item label="出租类型">
            {getFieldDecorator("rentType", {
              rules: [{ required: true, message: "请输入出租类型!" }]
            })(
              <Input placeholder="（指本次出租的房间）例如： 单间（独卫带阳台）/ 单间（独卫）/  单间 " />
            )}
          </Form.Item>
          <Form.Item label="出租面积">
            {getFieldDecorator("area", {
              rules: [{ required: true, message: "请输入出租面积!" }]
            })(<Input placeholder="（指本次出租的房间）例如：20平米" />)}
          </Form.Item>
          <Form.Item label="可租期限">
            {getFieldDecorator("range", {
              rules: [{ required: true, message: "请输入可租期限!" }]
            })(
              <Input placeholder="例如：到2017年11月7日 / 长期 （指合约可以签到什么时候）" />
            )}
          </Form.Item>
          <Form.Item label="付款方式">
            {getFieldDecorator("paymentType", {
              rules: [{ required: true, message: "请输入付款方式!" }]
            })(<Input placeholder=" 例如：押1付1  /  押1付2" />)}
          </Form.Item>
          <Form.Item label="是否为隔间">
            {getFieldDecorator("isSingleRoom", {
              rules: [{ required: true, message: "请输入是否为隔间!" }]
            })(
              <Radio.Group>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="独立电表">
            {getFieldDecorator("isElectricIsolated", {
              rules: [{ required: true, message: "请输入电表方式!" }]
            })(
              <Radio.Group onChange={this.onElecChange}>
                <Radio value="是">是</Radio>
                <Radio value="否">否</Radio>
                <Radio value="空调独立电表">空调独立电表</Radio>
                <Radio value="其他">
                  其他
                  {this.state.elecRadio === "其他" ? (
                    <Input
                      onChange={e =>
                        this.setState({ elecValue: e.target.value })
                      }
                      style={{ width: 100, marginLeft: 10 }}
                    />
                  ) : null}
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="水电缴费">
            {getFieldDecorator("waterElecValue", {
              rules: [{ required: true, message: "请输入水电缴费!" }]
            })(
              <Radio.Group onChange={this.onWaterElecChange}>
                <Radio value="每月一付">每月一付</Radio>
                <Radio value="每季一付">每季一付</Radio>
                <Radio value="退租结算">退租结算</Radio>
                <Radio value="其他">
                  其他
                  {this.state.elecRadio === "其他" ? (
                    <Input
                      onChange={e =>
                        this.setState({ waterElecValue: e.target.value })
                      }
                      style={{ width: 100, marginLeft: 10 }}
                    />
                  ) : null}
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="日常卫生">
            {getFieldDecorator("cleaning", {
              //    rules: [{ required: true, message: "请输入日常卫生!" }]
            })(<Input placeholder="例如：自理 / 每周1次" />)}
          </Form.Item>
          <Form.Item label="维修物业">
            {getFieldDecorator("repairing", {
              //     rules: [{ required: true, message: "请输入维修物业!" }]
            })(<Input placeholder="例如：合租统一由房东承担、整租自行商议" />)}
          </Form.Item>
          <Form.Item label="网络带宽">
            {getFieldDecorator("networking", {
              //       rules: [{ required: true, message: "请输入网络带宽!" }]
            })(<Input placeholder="例如：有，电信20M宽带 / 无，自理" />)}
          </Form.Item>
          <Form.Item label="退租方式">
            {getFieldDecorator("checkout", {
              //        rules: [{ required: true, message: "请输入退租方式!" }]
            })(<Input placeholder="例如：合同到期，退还钥匙取回全额押金" />)}
          </Form.Item>

          <Form.Item label="其他描述">
            {getFieldDecorator("otherDescriptions", {
              rules: [{ required: false }]
            })(
              <TextArea
                rows={4}
                placeholder="此处添加任何合适的描述，可以包括家具设备、地理优势、水电网物业详细、入住情况、朝向等相关信息描述"
              />
            )}
          </Form.Item>
          <Form.Item label="其他要求">
            {getFieldDecorator("otherDemands", {
              rules: [{ required: false }]
            })(
              <TextArea
                rows={4}
                placeholder="例如：无 / 由于XXX原因，希望找一个男生/女生/上班族/不接受情侣/……"
              />
            )}
          </Form.Item>
          <Form.Item>
            图片请点击下方编辑器的图片上传按钮上传，其他未尽内容请在下方编辑器输入。
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export const Tmp = Form.create()(TmpForm);
export const ShowEdit = withRouter(EditForm);
