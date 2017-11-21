// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageProps } from '../Props/MessageProps';
import { MessageWindowState } from '../States/MessageWindowState';
import { MessageSender } from './MessageSender';
import { MessageReceiver } from './MessageReceiver';
import { MessageWindowProps } from '../Props/MessageWindowProps';
import * as Utility from '../Utility';

export class MessageWindow extends React.Component<MessageWindowProps, MessageWindowState>{

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleScroll = this.handleScroll.bind(this);
        this.getNewMessage = this.getNewMessage.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    async componentDidMount() {
        this.setState({ data: this.props.data.message });
        document.getElementById('messageContent').addEventListener('scroll', this.handleScroll);
    }

    /**
     * 父控件props刷新后调用这个展现新的联系人的私信内容
     * @param nextProps
     */
    async componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data.message });
    }

    /*
    *处理聊天窗口滚动栏的函数，滚到顶部继续加载私信内容
    */
    async handleScroll() {
        let scrollTop = $('#messageContent')[0].scrollTop; //滚动到的当前位置
        console.log(scrollTop);
        if (scrollTop == 0) {
            console.log("到顶啦");
            $('#wcLoadingImg').removeClass("displaynone");
            let oldData = this.state.data;
            //到顶了就继续获取10条私信
            let newData = await Utility.getRecentMessage(this.props.data.id, oldData.length, 10);
            //跟之前的拼接一下
            if (newData.length > 0) {
                let data = oldData.concat(newData);
                this.setState({ data: data });
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
            }
            else {
                console.log("没有");
                $('#wcLoadingImg').addClass("displaynone");
                $('#wcLoadingText').removeClass("displaynone");
            }
        }
    }

    /**
    *点击发送私信后，获取私信内容并刷新聊天界面
    */
    async getNewMessage() {
        //获取新私信信息
        let data = await Utility.getRecentMessage(this.props.data.id, 0, 10);

        //先看一下缓存里的旧私信信息
        let oldData = [];
        let recentContact = Utility.getStorage("recentContact");
        if (recentContact) {
            for (var i=0; i<recentContact.length; i++) {
                if (recentContact[i].id == this.props.data.id) {
                    oldData = recentContact[i].message;
                    //新旧私信信息拼接一下
                    if(oldData != []) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j].id == oldData[0].id) {
                                data = data.slice(0, j).concat(oldData);
                                console.log("获取到了新私信");
                                break;
                            }
                        }
                    }
                    //更新与该聊天对象的message
                    recentContact[i].message = data;
                    break;
                }
            }
            if(i == recentContact.length) {
                let chatMan = [this.props.data];
                chatMan[0].message = data;
                recentContact = chatMan.concat(recentContact);
            }
            //聊天对象是联系人列表第一个，只需要刷新聊天窗口
            if (i == 0) {
                //刷新状态
                Utility.setStorage("recentContact", recentContact);
                this.setState({ data: data });
            }
            else {
                //聊天对象不是联系人列表第一个，将该聊天对象提至联系人列表的最上方并刷新父级（同时刷新联系人列表和聊天窗口）
                let indexData = recentContact[i];
                recentContact.splice(i, 1);
                recentContact.unshift(indexData);

                //刷新状态
                Utility.setStorage("recentContact", recentContact);
                this.props.onChange();
            }
        }
    }


    /**
    *单条私信的的样式
    */
    coverMessageProps = (item: MessageProps) => {
        let userInfo = Utility.getLocalStorage("userInfo");
        let data = this.props.data;
        if (item.receiverId == userInfo.id) {
            //如果我是接收者调用这个样式，处于左边
            return <MessageReceiver id={item.id} senderName={data.name} receiverName={userInfo.name} senderPortraitUrl={data.portraitUrl} receiverPortraitUrl={userInfo.portraitUrl} content={item.content} isRead={item.isRead} time={item.time}/>;
        }
        else if(item.senderId == userInfo.id) {
            //如果我是发送者调用这个样式，处于右边
            return <MessageSender id={item.id} senderName={userInfo.name} receiverName={data.name} senderPortraitUrl={userInfo.portraitUrl} receiverPortraitUrl={data.portraitUrl} content={item.content} isRead={item.isRead} time={item.time} />;
        }
    };

    /**
    *发送私信内容的函数
    */
    async postMessage() {
        let token = Utility.getLocalStorage("accessToken");
        let bodyObj = { receiverId: this.props.data.id, content: $('#postContent').val() };
        let bodyContent = JSON.stringify(bodyObj);
        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);
        myHeaders.append('content-type', 'application/json');
        let messageId = await fetch('http://apitest.niconi.cc/message/send', {
            method: 'POST',
            headers: myHeaders,
	        body: bodyContent
        });
        //暂停0.2秒再执行
        setTimeout(this.getNewMessage, 200);
        //清空输入框
        $('#postContent').val('');
    };

    /*
    *举报按钮
    */
	report = () => {
        alert('举报他人恶意私信请到【论坛事务】按照格式发帖投诉，记得截图保留证据，管理员会及时进行处理！感谢您对CC98的支持！');
    };

    render() {
        console.log("4");
        let data = this.props.data;
        return (<div className="message-message-window">
                    <div className="message-message-wHeader">
                    <div className="message-message-wReport"></div>
                        <div className="message-message-wTitle">与 {data.name} 的私信</div>
                        <div className="message-message-wReport"><button onClick={this.report}>举报</button></div>
                    </div>
                    <div className="message-message-wContent" id="messageContent">
                        {this.state.data.map(this.coverMessageProps)}
                        <div className="message-message-wcLoading">
                            <img src="http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif" id="wcLoadingImg" className="displaynone"></img>
                            <div id="wcLoadingText" className="message-message-wcLoadingText displaynone">-----------已加载全部私信-----------</div>
                        </div>
                    </div>
                    <div className="message-message-wPost">
                        <textarea className="message-message-wPostArea" id="postContent"></textarea>
                        <button className="message-message-wPostBtn" onClick={this.postMessage}>回复</button>
                    </div>
                </div>);
    }
}


/*function sortArr(arr: MessageProps[]) {
    let s: number = -1;
    let e: number = -1;
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i].sendTime == arr[i + 1].sendTime && s == -1) {
            s = i;
        }
        else if (arr[i].sendTime != arr[i + 1].sendTime && s != -1) {
            e = i;
        }
        if (s != -1 && e != -1) {
            reverseArr(arr, s, e);
            s = -1;
            e = -1;
        }
    }
}

function reverseArr(arr: MessageProps[], s: number, e: number) {
    for (let i = s; i < e; i++) {
        [arr[i], arr[e]] = [arr[e], arr[i]];
        e--;
    }
}*/