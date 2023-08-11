import * as React from "react";
import { FocusTopic } from "../../Props/FocusTopic";
import { FocusTopicSingle } from "../Focus/FocusTopicSingle";
import { CardTopicSingle } from "../Focus/CardTopicSingle";
import { NewTopicAreaState } from "../../States/NewTopicAreaState";
import * as Utility from "../../Utility";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import DocumentTitle from "../DocumentTitle";
import Spin from "antd/es/spin";
import { UserInfo } from "../../States/AppState";
import { userInfo } from "os";
//import pDebounce from "p-debounce";

/**
 * 表示全站最新主题列表
 */
export class AllNewTopic extends React.Component<{}, NewTopicAreaState> {
  isLoadable: boolean;
  mediaOnly: boolean;
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.isLoadable = true;
    this.mediaOnly = false;
    let keyStr = this.mediaOnly ? "AllNewMediaTopic" : "AllNewTopic";
    //先看一下有没有缓存的帖子数据
    var data = Utility.getStorage(keyStr);
    if (!data) {
      data = [];
    }
    let userInfo = Utility.getLocalStorage<UserInfo>("userInfo");
    //console.log(userInfo);

    this.state = {
      data: data,
      from: 0,
      buttonClassName: "",
      userInfo: userInfo
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleFetchNewTopics = this.handleFetchNewTopics.bind(this);
  }

  async getAndSetTopic(from: number) {
    this.isLoadable = false;
    let t1 = new Date().getTime();
    let data = await Utility.getAllNewTopic(from, this.mediaOnly);
    if (data) {
      //缓存获取到的数据
      let keyStr = this.mediaOnly ? "AllNewMediaTopic" : "AllNewTopic";
      Utility.setStorage(keyStr, data);
      this.setState({ data: data, from: data.length });
    }
    let t2 = new Date().getTime();
    let timeSpan = t2 - t1;
    if (timeSpan < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - timeSpan));
    }
    this.isLoadable = true;
  }

  /**
   * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
   */
  async componentDidMount() {

    //todo: 从服务器获取用户设置信息并切到对应页面
    this.mediaOnly = false;
    this.classicMode();

    //获取新帖触发事件监听
    document.addEventListener("wheel", this.handleFetchNewTopics, {
      passive: true,
    });
    document.addEventListener("touchmove", this.handleFetchNewTopics, {
      passive: true,
    });
    document.addEventListener("scroll", this.handleFetchNewTopics, {
      passive: true,
    });
    //滚动条事件监听
    document.addEventListener("scroll", this.handleScroll);


  }

  /**
   * 移除DOM时，为滚动条和获取新帖移除相关监听事件
   */
  async componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("scroll", this.handleFetchNewTopics);
    document.removeEventListener("touchmove", this.handleFetchNewTopics);
    document.removeEventListener("wheel", this.handleFetchNewTopics);
  }
  //回到顶部
  scrollToTop() {
    $("body,html").animate({ scrollTop: 0 }, 500);
  }

  /**
   * 处理滚动的函数
   */
  async handleScroll() {
    //控制回到顶部按钮出现
    if (window.pageYOffset > 234) {
      this.setState({
        buttonClassName: "btn-show",
      });
    }
    //控制回到顶部按钮消失
    if (window.pageYOffset < 234) {
      this.setState((prevState) => ({
        buttonClassName:
          prevState.buttonClassName === "" ? "" : "btn-disappare",
      }));
    }
  }

  /**
   * 获取新帖子的函数
   */
  async handleFetchNewTopics() {
    //控制获取新帖
    //console.log("new topic, is loadable=" + this.isLoadable);
    if (Utility.isBottom() && this.isLoadable) {
      /**
       *查看新帖数目大于100条时不再继续加载
       */
      if (this.state.from > 199) {
        $("#focus-topic-loading").addClass("displaynone");
        $("#focus-topic-loaddone").removeClass("displaynone");
        return;
      }
      /**
       *发出第一条fetch请求前将this.isLoadable设置为false，防止后面重复发送fetch请求
       */
      this.isLoadable = false;
      try {
        const debouncedFn = Utility.pDebounce(Utility.getAllNewTopic, 1000);
        var newData: any = await debouncedFn(this.state.from, this.mediaOnly);
        //var newData = await Utility.getAllNewTopic(this.state.from);
      } catch (err) {
        /**
         *如果出错，直接结束这次请求，同时将this.isLoadable设置为true，后续才可以再次发送fetch请求
         */
        this.isLoadable = true;
        return;
      }
      /**
       *如果正确获取到数据，则添加新数据，翻页+1，同时this.isLoadable设置为true，后续才可以再次发送fetch请求
       */
      //拼接时防止出现重复帖子
      if (newData && newData.length > 0) {
        let data = this.state.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id === newData[0].id) {
            break;
          }
        }
        data = data.slice(0, i).concat(newData);
        this.setState({ data: data, from: data.length }, () => {
          this.isLoadable = true;
        });
        let keyStr = this.mediaOnly ? "AllNewMediaTopic" : "AllNewTopic";
        Utility.setStorage(keyStr, data);
      } else {
        this.isLoadable = true;
        return;
      }
    }
  }

  async classicMode() {
    if (this.isLoadable) {
      $("#classic-mode-area").show();
      $("#card-mode-area").hide();
      $("#new-topic-classic-button").addClass("focus-hover");
      $("#new-topic-card-button").removeClass("focus-hover");
      $("#new-topic-media-only-button").removeClass("focus-hover");
      this.mediaOnly = false;
      await this.getAndSetTopic(0);
    }
  }

  async cardMode() {
    if (this.isLoadable) {
      $("#classic-mode-area").hide();
      $("#card-mode-area").show();
      $("#new-topic-classic-button").removeClass("focus-hover");
      $("#new-topic-card-button").addClass("focus-hover");
      $("#new-topic-media-only-button").removeClass("focus-hover");
      this.mediaOnly = false;
      await this.getAndSetTopic(0);
    }
  }

  async mediaOnlyMode() {
    if (this.isLoadable) {
      $("#classic-mode-area").hide();
      $("#card-mode-area").show();
      $("#new-topic-classic-button").removeClass("focus-hover");
      $("#new-topic-card-button").removeClass("focus-hover");
      $("#new-topic-media-only-button").addClass("focus-hover");
      this.mediaOnly = true;
      await this.getAndSetTopic(0);
    }
  }

  getCountString(i: number): string {
    if (i > 99999) {
      return `${Math.floor(i / 10000)}万`;
    }
    else if (i > 9999) {
      let w = Math.floor(i / 10000);
      let q = Math.floor(i % 10000 / 1000);
      return `${w}.${q}万`;
    }
    return Math.floor(i).toString();
  }

  /**
   * 将主题排列好
   */
  render() {
    let postCountStr = this.state.userInfo.postCount.toString();

    return (
      <div className="focus-root">
        <DocumentTitle title={`查看新帖 - CC98论坛`} />
        <div className="focus">
          <Category />
          <div className="focus-board-area">
            <button className="focus-board new-topic focus-hover" id="new-topic-classic-button" onClick={() => { this.classicMode() }}>
              经典模式
            </button>
            <button className="focus-board new-topic" id="new-topic-card-button" onClick={() => { this.cardMode() }}>
              卡片模式
            </button>
            <button className="focus-board new-topic" id="new-topic-media-only-button" onClick={() => { this.mediaOnlyMode() }}>
              只看媒体
            </button>
          </div>

          <div className="focus-topic-area" id="classic-mode-area">
            <div className="focus-topic-topicArea">
              {this.state.data.map(convertFocusPost)}
            </div>
            {/* <div className="focus-topic-loading" id="focus-topic-loading">
              <Spin size="large" />
            </div>
            <div
              className="focus-topic-loaddone displaynone"
              id="focus-topic-loaddone"
            >
              无法加载更多了，小水怡情，可不要沉迷哦~
            </div>
            <button
              type="button"
              id="scrollToTop"
              className={this.state.buttonClassName}
              onClick={this.scrollToTop}
            >
              回到顶部
            </button> */}
          </div>

          <div className="card-topic-area" id="card-mode-area">
            <div className="card-topic-area-left">
              <div className="card-user">
                <div className="card-user-background"></div>
                <div className="card-user-portrait">
                  <img src={this.state.userInfo.portraitUrl} />
                  <a href="../usercenter" target="_blank">{this.state.userInfo.name}</a>
                </div>
                <div className="card-user-stats">
                  <div className="card-user-stats-item">
                    <a href="../usercenter" target="_blank">{this.getCountString(this.state.userInfo.postCount)}</a>
                    帖数
                  </div>
                  <div className="card-user-stats-item">
                    <a href="../usercenter/myfollowings" target="_blank">{this.state.userInfo.followCount}</a>
                    关注
                  </div>
                  <div className="card-user-stats-item">
                    <a href="../usercenter/myfans" target="_blank">{this.state.userInfo.fanCount}</a>
                    粉丝
                  </div>
                  <div className="card-user-stats-item">
                    <a href="../usercenter/myposts/ishot/1/1" target="_blank">{this.getCountString(this.state.userInfo.receivedLikeCount)}</a>
                    获赞
                  </div>
                </div>
              </div>

              <div className="card-board">
                <div className="card-board-title">版面列表</div>
              </div>
            </div>
            <div className="card-topic-area-middle">
              {this.state.data.map(convertCardPost)}
            </div>
            <div className="card-topic-area-right"></div>
          </div>

          <div className="focus-topic-loading" id="focus-topic-loading">
            <Spin size="large" />
          </div>
          <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">
            无法加载更多了，小水怡情，可不要沉迷哦~
          </div>
          <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>
            回到顶部
          </button>
        </div>
      </div>
    );
  }
}

/**
 * 单个主题数据转换成单个主题组件
 */
function convertFocusPost(item: FocusTopic, index: number) {
  return (
    <FocusTopicSingle
      key={item.id}
      title={item.title}
      hitCount={item.hitCount}
      id={item.id}
      boardId={item.boardId}
      boardName={item.boardName}
      replyCount={item.replyCount}
      userId={item.userId}
      userName={item.userName}
      portraitUrl={item.portraitUrl}
      time={item.time}
      likeCount={item.likeCount}
      dislikeCount={item.dislikeCount}
      lastPostUser={item.lastPostUser}
      lastPostTime={item.lastPostTime}
      tag1={item.tag1}
      tag2={item.tag2}
      floorCount={item.floorCount}
      contentType={item.contentType}
      mediaContent={item.mediaContent}
    />
  );
}

/**
 * 单个主题数据转换成单个卡片主题组件
 */
function convertCardPost(item: FocusTopic, index: number) {
  return (
    <CardTopicSingle
      key={item.id}
      title={item.title}
      hitCount={item.hitCount}
      id={item.id}
      boardId={item.boardId}
      boardName={item.boardName}
      replyCount={item.replyCount}
      userId={item.userId}
      userName={item.userName}
      portraitUrl={item.portraitUrl}
      time={item.time}
      likeCount={item.likeCount}
      dislikeCount={item.dislikeCount}
      lastPostUser={item.lastPostUser}
      lastPostTime={item.lastPostTime}
      tag1={item.tag1}
      tag2={item.tag2}
      floorCount={item.floorCount}
      contentType={item.contentType}
      mediaContent={item.mediaContent}
    />
  );
}

/**
 * 导航器组件
 */
export class Category extends React.Component {
  render() {
    return (
      <div
        className="row"
        style={{
          alignItems: "baseline",
          justifyContent: "flex-start",
          color: "grey",
          fontSize: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <Link
          style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }}
          to={"/"}
        >
          首页
        </Link>
        <i className="fa fa-chevron-right"></i>
        <div
          style={{
            color: "grey",
            fontSize: "1rem",
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
          }}
        >
          查看新帖
        </div>
      </div>
    );
  }
}
