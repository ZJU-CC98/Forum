// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";
import { MessageProps } from "../../Props/MessageProps";
import { MessageWindowState } from "../../States/MessageWindowState";
import { MessageSender } from "./MessageSender";
import { MessageReceiver } from "./MessageReceiver";
import { MessageWindowProps } from "../../Props/MessageWindowProps";
import * as Utility from "../../Utility";
import DocumentTitle from "../DocumentTitle";
import Store from "../../Store";
import { refreshCurrentMessageCount } from "../../AsyncActions/Message";

export class MessageWindow extends React.Component<
  MessageWindowProps,
  MessageWindowState
> {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getNewMessage = this.getNewMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.getMoreMessage = this.getMoreMessage.bind(this);
    this.triggerImageUpload = this.triggerImageUpload.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  async componentDidMount() {
    this.getData(this.props);
  }

  async getData(props) {
    //console.log("windows里的propsdata",props.data);
    if (props.data) {
      //console.log("存在props.data");
      let data = await Utility.getRecentMessage(
        props.data.id,
        0,
        10,
        this.context.router
      );
      //如果此时有未读私信,看有没有清除掉未读私信
      let unreadCount = Store.getState().message;
      if (unreadCount && unreadCount.messageCount != 0) {
        Store.dispatch(refreshCurrentMessageCount() as any);
      }
      if (data && data.length > 0) {
        let oldData = props.data.message;
        if (oldData && oldData.length > 0) {
          for (let i in data) {
            if (data[i].id == oldData[0].id) {
              data = data.slice(0, i).concat(oldData);
              data = Utility.sortRecentMessage(data);
              break;
            }
          }
        }
        //找到对应的联系人更新一下缓存信息里的message
        let recentContact = Utility.getStorage("recentContact");
        if (recentContact) {
          for (let i in recentContact) {
            if (recentContact[i].id == props.data.id) {
              recentContact[i].message = data;
              break;
            }
          }
          Utility.setStorage("recentContact", recentContact);
        }
        this.setState({ data: data.reverse() });
        if (data.length === 10) {
          $("#wcGetMore").removeClass("displaynone");
          $("#wcLoadingImg").addClass("displaynone");
          $("#wcLoadingText").addClass("displaynone");
        } else {
          $("#wcGetMore").addClass("displaynone");
          $("#wcLoadingImg").addClass("displaynone");
          $("#wcLoadingText").removeClass("displaynone");
        }
      }
    }
    //把聊天窗口滚动栏拉到最底部
    let scrollDiv = document.getElementById("messageContent");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  /**
   * 父控件props刷新后调用这个展现新的联系人的私信内容
   * @param nextProps
   */
  async componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }

  /*
   *处理聊天窗口滚动栏的函数，滚到顶部继续加载私信内容
   */
  async getMoreMessage() {
    $("#wcGetMore").addClass("displaynone");
    $("#wcLoadingImg").removeClass("displaynone");
    let oldData = this.state.data.reverse();
    let scrollDiv = document.getElementById("messageContent");
    let oldHeight = scrollDiv.scrollHeight;
    //到顶了就继续获取10条私信
    let newData = await Utility.getRecentMessage(
      this.props.data.id,
      oldData.length,
      10,
      this.context.router
    );
    //如果此时有未读私信,看有没有清除掉未读私信
    let unreadCount = Store.getState().message;
    if (unreadCount && unreadCount.messageCount != 0) {
      Store.dispatch(refreshCurrentMessageCount() as any);
    }
    //跟之前的拼接一下
    if (newData && newData.length > 0) {
      let data = oldData.concat(newData);
      data = Utility.sortRecentMessage(data);
      this.setState({ data: data.reverse() });
      //取出联系人缓存，更新对应的联系人的数据并缓存
      let recentContact = Utility.getStorage("recentContact");
      if (recentContact) {
        for (let i in recentContact) {
          if (recentContact[i].id == this.props.data.id) {
            recentContact[i].message = data;
            break;
          }
        }
        Utility.setStorage("recentContact", recentContact);
      }
      if (newData.length === 10) {
        $("#wcGetMore").removeClass("displaynone");
        $("#wcLoadingImg").addClass("displaynone");
      } else {
        $("#wcLoadingImg").addClass("displaynone");
        $("#wcLoadingText").removeClass("displaynone");
      }
    } else {
      $("#wcLoadingImg").addClass("displaynone");
      $("#wcLoadingText").removeClass("displaynone");
    }
    //保持滚动条在原来的位置
    let newHeight = scrollDiv.scrollHeight;
    scrollDiv.scrollTop = newHeight - oldHeight - 25;
  }

  /**
   *点击发送私信后，获取私信内容并刷新聊天界面
   */
  async getNewMessage() {
    //获取新私信信息
    let data = await Utility.getRecentMessage(
      this.props.data.id,
      0,
      10,
      this.context.router
    );

    //先看一下缓存里的旧私信信息
    let oldData = [];
    let recentContact = Utility.getStorage("recentContact");
    if (recentContact) {
      for (var i = 0; i < recentContact.length; i++) {
        if (recentContact[i].id == this.props.data.id) {
          oldData = recentContact[i].message;
          //新旧私信信息拼接一下
          if (oldData.length > 0) {
            for (var j = 0; j < data.length; j++) {
              if (data[j].id == oldData[0].id) {
                data = data.slice(0, j).concat(oldData);
                data = Utility.sortRecentMessage(data);
                break;
              }
            }
          }
          //更新与该聊天对象的message
          recentContact[i].message = data;
          recentContact[i].lastContent = data[0].content;
          break;
        }
      }
      //联系对象不在联系人列表里，说明是从别的页面发起的私信聊天，聊天对象已经在联系人列表最上面了，只需存缓存并刷新聊天窗口
      if (i == recentContact.length) {
        let chatMan = [this.props.data];
        chatMan[0].message = data;
        chatMan[0].lastContent = data[0].content;
        recentContact = chatMan.concat(recentContact);
        //刷新状态
        Utility.setStorage("recentContact", recentContact);
        this.props.onChange();
      }
      //聊天对象是联系人列表第一个，只需要刷新聊天窗口
      else if (i == 0) {
        //刷新状态
        Utility.setStorage("recentContact", recentContact);
        this.setState({ data: data.reverse() });
        this.props.onChange();
      } else {
        //聊天对象不是联系人列表第一个，将该聊天对象提至联系人列表的最上方并刷新父级（同时刷新联系人列表和聊天窗口）
        let indexData = recentContact[i];
        recentContact.splice(i, 1);
        recentContact.unshift(indexData);

        //刷新状态
        Utility.setStorage("recentContact", recentContact);
        this.props.onChange();
      }
    }

    //把聊天窗口滚动栏拉到最底部
    let scrollDiv = document.getElementById("messageContent");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  /**
   *单条私信的的样式
   */
  coverMessageProps = (item: MessageProps) => {
    let userInfo = Utility.getMyInfo();
    let data = this.props.data;
    if (item.receiverId == userInfo.id) {
      //如果我是接收者调用这个样式，处于左边
      return (
        <MessageReceiver
          id={item.id}
          senderName={data.name}
          senderId={data.id}
          receiverName={userInfo.name}
          receiverId={userInfo.id}
          senderPortraitUrl={data.portraitUrl}
          receiverPortraitUrl={userInfo.portraitUrl}
          content={item.content}
          isRead={item.isRead}
          time={item.time}
          showTime={item.showTime}
        />
      );
    } else if (item.senderId == userInfo.id) {
      //如果我是发送者调用这个样式，处于右边
      return (
        <MessageSender
          id={item.id}
          senderName={userInfo.name}
          senderId={userInfo.id}
          receiverName={data.name}
          receiverId={data.id}
          senderPortraitUrl={userInfo.portraitUrl}
          receiverPortraitUrl={data.portraitUrl}
          content={item.content}
          isRead={item.isRead}
          time={item.time}
          showTime={item.showTime}
        />
      );
    }
  };

  /**
   *处理文本输入框聚焦的函数，聚焦时移除提示文字
   */
  async handleFocus() {
    $("#wPostNotice").addClass("displaynone");
    $("#wPostError").addClass("displaynone");
    $("#postContent")[0].focus();
  }

  /**
   *处理鼠标移出文本输入框的函数，移出时显示文字提示
   */
  async handleBlur() {
    if ($("#postContent").val() == "") {
      if ($("#wPostNotice").css("display") == "none") {
        $("#wPostNotice").removeClass("displaynone");
      } else {
        $("#wPostNotice").addClass("displaynone");
      }
    }
  }

  /**
   * 触发图片上传按钮点击
   */
  async triggerImageUpload() {
    $("#upload-files").click();
  }

  /**
   * 处理图片上传
   */
  async handleImageUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const res = await Utility.uploadFile(files[0]);

    if (res.isSuccess) {
      // 将图片 URL 插入到文本框
      const textarea = document.getElementById('postContent') as HTMLTextAreaElement;
      const url = `[img]${res.content}[/img]`;
      textarea.value += url;
      // 清除提示文字
      $('#wPostNotice').addClass('displaynone');
    } else {
      alert('图片上传失败：' + res.content);
    }

    // 清空 input
    e.target.value = '';
  }

  /**
   *发送私信内容的函数
   */
  async postMessage() {
    let str: any = $("#postContent").val();
    if (str === "") {
      return;
    }
    let bodyObj = { receiverId: this.props.data.id, content: str };
    let bodyContent = JSON.stringify(bodyObj);
    let response = await Utility.sendMessage(bodyContent, this.context.router);
    if (response.status == 403) {
      $("#postContent").val("");
      $("#wPostError").removeClass("displaynone");
      return;
    }

    //暂停0.2秒再执行
    setTimeout(this.getNewMessage, 200);
    //清空输入框
    $("#postContent").val("");
  }

  /*
   *举报按钮
   */
  report = () => {
    alert(
      "举报他人恶意私信请到【论坛事务】按照格式发帖投诉，记得截图保留证据，管理员会及时进行处理！感谢您对CC98的支持！"
    );
  };

  render() {
    let data = this.props.data;
    if (data) {
      return (
        <div className="message-message-window">
          <DocumentTitle title={`与 ${data.name} 的私信-CC98论坛`} />
          <div className="message-message-wHeader">
            <div className="message-message-wReport"></div>
            <div className="message-message-wTitle">与 {data.name} 的私信</div>
            <div className="message-message-wReport displaynone">
              <button onClick={this.report}>举报</button>
            </div>
          </div>
          <div className="message-message-wContent" id="messageContent">
            <div className="message-message-wcLoading">
              <div
                id="wcGetMore"
                className="message-message-wcLoadingMore"
                onClick={this.getMoreMessage}
              >
                点击加载更多...
              </div>
              <img
                src="http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif"
                id="wcLoadingImg"
                className="displaynone"
              ></img>
              <div
                id="wcLoadingText"
                className="message-message-wcLoadingText displaynone"
              >
                没有更多消息了~
              </div>
            </div>
            {this.state.data.map(this.coverMessageProps)}
          </div>
          <div className="message-message-wPost">
            <textarea
              className="message-message-wPostArea"
              id="postContent"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            ></textarea>
            <div
              id="wPostNotice"
              className="message-message-wPostNotice"
              onClick={this.handleFocus}
            >
              请在这里填入您要发送的私信内容
            </div>
            <div
              id="wPostError"
              className="message-message-wPostError displaynone"
              onClick={this.handleFocus}
            >
              发送失败，可能的原因有：发送太快；受到全站禁言或以上的处罚；服务器故障或者正在维护。
            </div>
            <input
              id="upload-files"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.handleImageUpload}
            />
            <div className="message-message-wPostBtn-wrapper">
              <button
                className="message-message-wPostBtn"
                onClick={this.triggerImageUpload}
                type="button"
                style={{ marginRight: '10px' }}
              >
                上传图片
              </button>
              <button
                className="message-message-wPostBtn"
                onClick={this.postMessage}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="message-message-window">
          <div className="message-message-wHeader">
            <div className="message-message-wReport"></div>
            <div className="message-message-wTitle">无当前聊天对象</div>
            <div className="message-message-wReport displaynone">
              <button onClick={this.report}>举报</button>
            </div>
          </div>
          <div className="message-message-wContent" id="messageContent">
            <div className="message-message-wcLoading">
              <img
                src="http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif"
                id="wcLoadingImg"
                className="displaynone"
              ></img>
              <div
                id="wcLoadingText"
                className="message-message-wcLoadingText displaynone"
              >
                没有更多消息了~
              </div>
            </div>
          </div>
          <div className="message-message-wPost">
            <textarea
              className="message-message-wPostArea"
              id="postContent"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            ></textarea>
            <div
              id="wPostNotice"
              className="message-message-wPostNotice"
              onClick={this.handleFocus}
            >
              请在这里填入您要发送的私信内容
            </div>
            <div
              id="wPostError"
              className="message-message-wPostError displaynone"
              onClick={this.handleFocus}
            >
              发送失败，可能的原因有：发送太快；受到全站禁言或以上的处罚；服务器故障或者正在维护。
            </div>
            <input
              id="upload-files"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={this.handleImageUpload}
            />
            <div className="message-message-wPostBtn-wrapper">
              <button
                className="message-message-wPostBtn"
                onClick={this.triggerImageUpload}
                type="button"
                style={{ marginRight: '10px' }}
              >
                上传图片
              </button>
              <button
                className="message-message-wPostBtn"
                onClick={this.postMessage}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
