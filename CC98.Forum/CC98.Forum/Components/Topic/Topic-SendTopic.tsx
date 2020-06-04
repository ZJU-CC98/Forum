import * as React from "react";
import * as Utility from "../../Utility";
import * as $ from "jquery";
import { UbbContainer } from ".././UbbContainer";
import { Constants } from "../Constant";
import { UbbEditor } from "../UbbEditor";
import TopicManagement from "./Topic-TopicManagement-v2";
import { NoticeMessage } from "../NoticeMessage";
import { Prompt } from "react-router-dom";
import Button from "antd/es/button";
import * as moment from "moment";
import ReactMde, {
  ReactMdeTypes,
  ReactMdeCommands,
} from "@cc98/hell-react-mde";
import * as Showdown from "showdown";
import CustomCommand from "./topic-react-mde/imageUploaderCommand";
import { RightTagHandler } from "../../Ubb/RightTagHandler";
import IPTable from "./Topic-IPData";
import { Util } from "bizcharts";
var xssFilter = require("showdown-xss-filter");

interface Props {
  boardInfo;
  onChange;
  content;
  topicInfo;
}

interface State {
  content: string;
  mode: number;
  masters: string[];
  buttonInfo;
  buttonDisabled;
  manageVisible;
  mdeState;
  commands;
  IPData;
  postCache: string;
  anonymouslyPostButtonInfo;
}

export class SendTopic extends React.Component<Props, State> {
  converter: Showdown.Converter;
  constructor(props) {
    super(props);
    this.sendUbbTopic = this.sendUbbTopic.bind(this);
    this.changeEditor = this.changeEditor.bind(this);
    this.showManagement = this.showManagement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    let initContent = "";
    if (
      Utility.getLocalStorage("temporaryContent-" + this.props.topicInfo.id)
    ) {
      initContent = Utility.getLocalStorage(
        "temporaryContent-" + this.props.topicInfo.id
      );
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      extensions: [xssFilter],
    });
    this.state = {
      content: initContent,
      mode: 0,
      masters: [],
      buttonDisabled: false,
      buttonInfo: "回复",
      manageVisible: false,
      mdeState: initContent,
      commands: [],
      IPData: [],
      postCache: "",
      anonymouslyPostButtonInfo: "匿名回复",
    };
  }
  // handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
  // 	console.log(mdeState);
  //     this.setState({mdeState,content:mdeState.markdown.toString()});
  // }
  handleValueChange = (value) => {
    this.setState({ mdeState: value });
  };
  showManageUI = (v) => {
    this.setState({ manageVisible: v });
  };
  handleCancel = () => {
    this.setState({ manageVisible: false });
  };
  update(value) {
    this.setState({ content: value });
  }

  onChange() {
    this.props.onChange();
  }
  showManagement() {
    this.setState({ manageVisible: true });
  }
  close() {
    const UIId = `#manage${this.props.topicInfo.id}`;
    $(UIId).css("display", "none");
  }
  /** 存取缓存使用的字符串 */
  cachestr = `post-cache-${this.props.topicInfo.id}`;
  /** 为发帖失败准备的缓存 */
  cacheForPost() {
    Utility.setLocalStorage(this.cachestr, this.state.content);
  }
  /** 获取缓存 */
  getCache = () => {
    this.setState({
      postCache: Utility.getLocalStorage(this.cachestr),
    });
  };
  /** 清除缓存 */
  cleancache = () => {
    Utility.removeLocalStorage(this.cachestr);
    this.setState({
      postCache: "",
    });
  };
  componentWillUnmount() {
    if (this.state.content) {
      Utility.setLocalStorage(
        "temporaryContent-" + this.props.topicInfo.id,
        this.state.content
      );
    } else if (this.state.mdeState) {
      Utility.setLocalStorage(
        "temporaryContent-" + this.props.topicInfo.id,
        this.state.mdeState
      );
    } else {
      Utility.removeLocalStorage("temporaryContent-" + this.props.topicInfo.id);
    }

    // remove the event listener
    window.onbeforeunload = null;
  }

  componentDidMount() {
    CustomCommand.editor = this;
    const getCommands: () => ReactMdeTypes.CommandGroup[] = () => [
      { commands: [CustomCommand] },
    ];
    const defaultCommands = ReactMdeCommands.getDefaultCommands();
    const myCommands = defaultCommands.concat(getCommands());
    myCommands[1].commands.length = 3;
    this.setState({ commands: myCommands });
    // confirm before user close the window
    // when there's content in the editor
    // should be removed before the component unmounts
    window.onbeforeunload = () => {
      if (this.state.content) return "您还有内容未发布，确认离开吗？";
      return null;
    };

    const time = moment(this.props.content.replyTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const url = `/topic/${this.props.topicInfo.id}#${this.props.content.floor}`;
    const masters = this.props.boardInfo.masters;
    if (this.props.content) {
      if (this.state.mode === 1) {
        const str = `> **以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：**\n\n > ${this.props.content.content}
`;

        this.setState({ masters: masters, content: str, mdeState: str });
      } else {
        const str = `
[quote][b]以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：
[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]${this.props.content.content}[/quote]
`;
        this.setState({ masters: masters, content: str });
      }
    }
  }
  componentWillReceiveProps(newProps) {
    const time = moment(newProps.content.replyTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    if (newProps.content.userName) {
      if (this.state.mode === 1) {
        const str = `>**以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：**
${newProps.content.content}
`;

        this.setState({ content: str, mdeState: str });
      } else {
        let floor = newProps.content.floor,
          page,
          url;
        if (floor > 10) {
          page = parseInt(((floor - 1) / 10).toString()) + 1;
          floor = floor % 10;
          url = `/topic/${this.props.topicInfo.id}/${page}#${
            floor === 0 ? 10 : floor
          }`;
        } else {
          url = `/topic/${this.props.topicInfo.id}#${newProps.content.floor}`;
        }
        const str = `[quote][b]以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]
${newProps.content.content}[/quote]
`;
        this.setState({ content: str });
      }
    } else {
      this.setState({ content: "", mdeState: "" });
    }
  }

  /** 发送UBB主题 */
  async sendUbbTopic(isAnonymous: boolean) {
    this.setState({
      buttonDisabled: true,
      buttonInfo: "...",
      anonymouslyPostButtonInfo: "...",
    });
    const url = `/topic/${this.props.topicInfo.id}/post`;
    let bodyInfo;
    try {
      if (Utility.quoteJudger(this.state.content)) {
        bodyInfo = {
          content: this.state.content,
          contentType: 0,
          title: "",
          parentId: this.props.content.postId,
          isAnonymous: isAnonymous,
        };
      } else {
        bodyInfo = {
          content: this.state.content,
          contentType: 0,
          title: "",
          isAnonymous: isAnonymous,
        };
      }
      const body = JSON.stringify(bodyInfo);
      const token = await Utility.getToken();
      const headers = new Headers();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/json");
      const mes = await Utility.cc98Fetch(url, {
        method: "POST",
        headers,
        body,
      });
      if (mes.status === 402) {
        Utility.noticeMessageShow("postNone");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
        this.cacheForPost();
      } else if (mes.status === 403) {
        Utility.noticeMessageShow("postFast");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
        this.cacheForPost();
      } else if (mes.status === 400) {
        Utility.noticeMessageShow("noEnoughMoney");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
        this.cacheForPost();
      } else if (mes.status === 200) {
        const atUsers = Utility.atHanderler(this.state.content);
        //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
        if (atUsers) {
          const postId = await mes.text();
          const topicId = this.props.topicInfo.id;
          const atUsersJSON = JSON.stringify(atUsers);
          const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
          let myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/json");
          myHeaders2.append("Authorization", token);
          let response2 = await Utility.cc98Fetch(url2, {
            method: "POST",
            headers: myHeaders2,
            body: atUsersJSON,
          });
        }

        Utility.removeLocalStorage(
          "temporaryContent-" + this.props.topicInfo.id
        );
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
        this.props.onChange();
      }
    } catch (e) {
      this.cacheForPost();
      Utility.noticeMessageShow("other");
      this.setState({
        buttonDisabled: false,
        buttonInfo: "请刷新",
        anonymouslyPostButtonInfo: "请刷新",
      });
      //console.log('post error');
      //console.log(e);
    }
  }

  /**发送md主题 */
  sendMdTopic = async (isAnonymous: boolean) => {
    this.setState({
      buttonDisabled: true,
      buttonInfo: "...",
      anonymouslyPostButtonInfo: "...",
    });
    const url = `/topic/${this.props.topicInfo.id}/post`;
    try {
      let c = this.state.mdeState;
      //console.log(c);
      const content = {
        content: c,
        contentType: 1,
        title: "",
        isAnonymous: isAnonymous,
      };
      const contentJson = JSON.stringify(content);
      const token = Utility.getLocalStorage("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      const mes = await Utility.cc98Fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: contentJson,
      });
      if (mes.status === 402) {
        this.cacheForPost();
        Utility.noticeMessageShow("postNone");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
      } else if (mes.status === 400) {
        Utility.noticeMessageShow("noEnoughMoney");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
        this.cacheForPost();
      } else if (mes.status === 403) {
        this.cacheForPost();
        Utility.noticeMessageShow("postFast");
        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
      } else if (mes.status === 200) {
        const atUsers = Utility.atHanderler(c);
        //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
        if (atUsers) {
          const postId = await mes.text();
          const topicId = this.props.topicInfo.id;
          const atUsersJSON = JSON.stringify(atUsers);
          const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
          let myHeaders2 = new Headers();
          myHeaders2.append("Content-Type", "application/json");
          myHeaders2.append("Authorization", token);
          let response2 = await Utility.cc98Fetch(url2, {
            method: "POST",
            headers: myHeaders2,
            body: atUsersJSON,
          });
        }
        Utility.removeLocalStorage("temporaryContent");
        this.props.onChange();

        this.setState({
          buttonDisabled: false,
          buttonInfo: "回复",
          anonymouslyPostButtonInfo: "匿名回复",
        });
      }
    } catch (e) {
      this.cacheForPost();
      Utility.noticeMessageShow("other");
      this.setState({
        buttonDisabled: false,
        buttonInfo: "请刷新",
        anonymouslyPostButtonInfo: "请刷新",
      });
      //console.log('post error');
      //console.log(e);
    }
  };
  /** 实名发送UBB内容 */
  postUbbContent = () => {
    this.sendUbbTopic(false);
  };

  /** 匿名发送UBB内容 */
  postAnonymousUbbContent = () => {
    if (this.props.boardInfo.anonymousState !== 1) {
        if (!confirm("你真的要匿名吗？")) return;
      }

    this.sendUbbTopic(true);
  };

  /** 实名发送Markdown内容 */
  postMdContent = () => {
    this.sendMdTopic(false);
  };

  /** 匿名发送Markdown内容 */
  postAnonymousMdContent = () => {
    if (this.props.boardInfo.anonymousState !== 1) {
      if (!confirm("你真的要匿名吗？")) return;
    }

    this.sendMdTopic(true);
  };

  showIP = async () => {
    const IPData = await Utility.findIP(this.props.topicInfo.id);
    this.setState({ IPData });
  };
  closeIP = () => this.setState({IPData: []})
  changeEditor() {
    if (this.state.mode === 0) {
      this.setState({ mode: 1 });
    } else {
      this.setState({ mode: 0 });
    }
  }

  getInitialState() {
    return { value: "" };
  }

  setValue = (v) => {
    this.setState({ mdeState: this.state.mdeState + v }, () => {
      this.setState({ mdeState: this.state.mdeState });
    });
  };
  render() {
    //发帖时间超过365天提示
    const s1 = new Date();
    const s2 = new Date(this.props.topicInfo.time);
    const s = s1.getTime() - s2.getTime();
    const f = (s / 1000 / 60 / 60 / 24).toFixed(0);
    let ft = null;
    if (Number(f) > 365) {
      ft = (
        <div className="row" style={{ color: "red" }}>
          提示：该贴发布于{f}天前，如无必要请勿回复。
        </div>
      );
    }
    let mode, editor;
    //查询财富值余额
    let wealth;
    try {
      wealth = Utility.getLocalStorage("userInfo").wealth;
    } catch (e) {
      wealth = "查询财富值余额失败，请前往个人中心查看";
    }
    //版面匿名状态，包括不可匿名、强制匿名（心灵）以及可选匿名
    //不可匿名为0，强制匿名为1，可选匿名为2
    const anonymousState = this.props.boardInfo.anonymousState;
    let ubbButtons;
    let markdownButtons;
    //不可匿名版面
    if (anonymousState === 0) {
      ubbButtons = (
        <button
          id="post-topic-button"
          onClick={this.postUbbContent}
          disabled={this.state.buttonDisabled}
          className="button blue"
        >
          {this.state.buttonInfo}
        </button>
      );
      markdownButtons = (
        <button
          id="post-topic-button-md"
          onClick={this.postMdContent}
          disabled={this.state.buttonDisabled}
          className="button blue"
        >
          {this.state.buttonInfo}
        </button>
      );
    } else if (anonymousState === 1) {
      ubbButtons = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            id="post-topic-button-anonymous"
            onClick={this.postAnonymousUbbContent}
            disabled={this.state.buttonDisabled}
            className="button grey"
          >
            {this.state.anonymouslyPostButtonInfo}
          </button>
          <p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
        </div>
      );
      markdownButtons = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            id="post-topic-button-md-anonymous"
            onClick={this.postAnonymousMdContent}
            disabled={this.state.buttonDisabled}
            className="button grey"
          >
            {this.state.anonymouslyPostButtonInfo}
          </button>
          <p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
        </div>
      );
    } else if (anonymousState === 2) {
      if (this.props.topicInfo.isAnonymous && this.props.topicInfo.isMe) {
        ubbButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              id="post-topic-button-anonymous"
              onClick={this.postAnonymousUbbContent}
              disabled={this.state.buttonDisabled}
              className="button grey"
            >
              {this.state.anonymouslyPostButtonInfo}
            </button>
            <p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
          </div>
        );
        markdownButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              id="post-topic-button-md-anonymous"
              onClick={this.postAnonymousMdContent}
              disabled={this.state.buttonDisabled}
              className="button grey"
            >
              {this.state.anonymouslyPostButtonInfo}
            </button>
            <p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
          </div>
        );
      } else {
        ubbButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <button
                id="post-topic-button"
                onClick={this.postUbbContent}
                disabled={this.state.buttonDisabled}
                className="button blue"
              >
                {this.state.buttonInfo}
              </button>
              <button
                id="post-topic-button-anonymous"
                onClick={this.postAnonymousUbbContent}
                disabled={this.state.buttonDisabled}
                className="button grey"
              >
                {this.state.anonymouslyPostButtonInfo}
              </button>
            </div>
            <p>
              在本版面匿名回复每次需消耗2000财富值。你当前的财富值余额为：
              {wealth}
            </p>
          </div>
        );
        markdownButtons = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <button
                id="post-topic-button-md"
                onClick={this.postMdContent}
                disabled={this.state.buttonDisabled}
                className="button blue"
              >
                {this.state.buttonInfo}
              </button>
              <button
                id="post-topic-button-md-anonymous"
                onClick={this.postAnonymousMdContent}
                disabled={this.state.buttonDisabled}
                className="button grey"
              >
                {this.state.anonymouslyPostButtonInfo}
              </button>
            </div>
            <p>
              在本版面匿名回复每次需消耗2000财富值。你当前的财富值余额为：
              {wealth}
            </p>
          </div>
        );
      }
    }
    //根据ubb或markdown模式，显示相应的编辑器和按钮
    if (this.state.mode === 0) {
      mode = "使用UBB模式编辑";
      editor = (
        <div>
          {ft}
          <UbbEditor
            update={this.update}
            value={this.state.content}
            option={{ height: 20, submit: this.postUbbContent }}
          />
          <div
            className="row"
            style={{ justifyContent: "center", marginBottom: "1.25rem " }}
          >
            {ubbButtons}
          </div>
        </div>
      );
    } else {
      mode = "使用Markdown编辑";
      //console.log("react mde")
      //console.log(this.state.mdeState)
      editor = (
        <div>
          <div>
            {ft}
            <ReactMde
              value={this.state.mdeState}
              onChange={this.handleValueChange}
              generateMarkdownPreview={(markdown) => {
                console.log(this.converter.makeHtml(markdown));
                return Promise.resolve(this.converter.makeHtml(markdown));
              }}
              commands={this.state.commands}
              minEditorHeight={330}
              maxEditorHeight={500}
              buttonContentOptions={{
                iconProvider: (name) => {
                  console.log(name);
                  if (name === "heading")
                    return <i className={`fa fa-header`} />;
                  return <i className={`fa fa-${name}`} />;
                },
              }}
            />
          </div>
          <div
            className="row"
            style={{ justifyContent: "center", marginTop: "5rem " }}
          >
            {markdownButtons}
          </div>
        </div>
      );
    }
    //管理按钮
    let manageBTN = null;
    if (Utility.isMaster(this.props.boardInfo.boardMasters))
      manageBTN = (
        <div>
          <Button type="primary" onClick={this.showManagement}>
            管理
          </Button>
          <Button
            type="primary"
            onClick={this.showIP}
            style={{ marginLeft: "2rem" }}
          >
            查看IP
          </Button>
        </div>
      );
    //缓存按钮
    let cachebutton = null;
    if (Utility.getLocalStorage(this.cachestr)) {
      cachebutton = (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              id="post-topic-cache-button"
              onClick={this.getCache}
              className="button blue"
              style={{
                width: "12rem",
                height: "2rem",
                lineHeight: "0.8rem",
                marginBottom: "1rem",
              }}
            >
              获取本帖缓存的内容
            </button>
            <button
              id="post-topic-cache-button-clean"
              onClick={this.cleancache}
              className="button blue"
              style={{
                width: "4rem",
                height: "2rem",
                lineHeight: "0.8rem",
                marginBottom: "1rem",
              }}
            >
              清空
            </button>
          </div>
          <input
            id="cache-text"
            type="text"
            style={{ marginBottom: "1rem" }}
            onChange={this.getCache}
            value={this.state.postCache}
          />
        </>
      );
    }

    return (
      <div
        id="sendTopicInfo"
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <div className="row" style={{ justifyContent: "flex-end" }}>
          <div
            id="post-topic-changeMode"
            className="changeEditor"
            onClick={this.changeEditor.bind(this)}
            style={{ width: "14rem", marginBottom: "0.5rem" }}
          >
            {this.state.mode === 1 ? "切换到Ubb编辑器" : "切换到Markdown编辑器"}
          </div>
        </div>
        {editor}
        {cachebutton}
        {manageBTN}
        {this.state.manageVisible && (
          <TopicManagement
            update={this.onChange}
            boardId={this.props.boardInfo.id}
            topicInfo={this.props.topicInfo}
            onCancel={this.handleCancel}
            visible={this.state.manageVisible}
          />
        )}
        {this.state.IPData.length !== 0 && (
          <IPTable IPData={this.state.IPData} changeStatus={this.closeIP}/>
        )}
        <NoticeMessage
          text="出现了意料之外的错误，请刷新重试，可读取之前的缓存"
          id="other"
          top="26%"
          left="38%"
        />
        <NoticeMessage
          text="回复失败, 10s之内仅可进行一次回帖，请耐心等待"
          id="postFast"
          top="26%"
          left="38%"
        />
        <NoticeMessage
          text="回复失败, 请输入内容"
          id="postNone"
          top="26%"
          left="44%"
        />
        <NoticeMessage
          text="你的财富值余额不足，匿名回复每次需要2000财富值"
          id="noEnoughMoney"
          top="26%"
          left="38%"
        />
        <NoticeMessage
          text="操作成功"
          id="operationSuccess"
          top="26%"
          left="44%"
        />
        <Prompt
          message={(location) =>
            (this.state.content &&
              location.pathname.indexOf(this.props.topicInfo.id)) === -1
              ? "确定要离开吗？"
              : true
          }
        />
      </div>
    );
  }
}
