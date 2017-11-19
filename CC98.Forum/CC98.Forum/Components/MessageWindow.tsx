// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageProps } from '../Props/MessageProps';
import { MessageWindowState } from '../States/MessageWindowState';
import { MessageSender } from './MessageSender';
import { MessageReceiver } from './MessageReceiver';
import { MessagePersonProps } from '../Props/MessagePersonProps';
import * as Utility from '../Utility';

export class MessageWindow extends React.Component<MessagePersonProps, MessageWindowState>{

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleScroll = this.handleScroll.bind(this);
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

    async handleScroll() {
        let scrollTop = $('messageContent').scrollTop(); //滚动到的当前位置
        console.log(screenTop);
        if (scrollTop == 0) {
            console.log("到顶啦");
            let data = this.state.data; 
            //到顶了就继续获取10条私信
            let newData = await Utility.getRecentMessage(this.props.data.id, data.length, 10);
            //跟之前的拼接一下
            data = data.concat(newData);
            this.setState({ data: data });
            //取出联系人缓存，更新对应的联系人的数据并缓存
            let recentContact = Utility.getStorage("recentContact");
            for (let i in recentContact) {
                if (recentContact[i].id == this.props.data.id) {
                    recentContact[i].message = data;
                    break;
                }
            }
            Utility.setStorage("recentContact", recentContact);
        }
    }


    /**
    *单条私信的的样式
    */
    coverMessageProps = (item: MessageProps) => {
        console.log("5");
        let userInfo = Utility.getLocalStorage("userInfo");
        let data = this.props.data;
        if (item.receiverId == userInfo.id) {
            //如果我是接收者调用这个样式，处于左边
            return <MessageReceiver id={item.id} senderName={data.name} receiverName={userInfo.name} senderPortraitUrl={data.portraitUrl} receiverPortraitUrl={userInfo.portraitUrl} content={item.content} isRead={item.isRead} time={item.time}/>;
        }
        else {
            //如果我是发送者调用这个样式，处于右边
            return <MessageSender id={item.id} senderName={userInfo.name} receiverName={data.name} senderPortraitUrl={userInfo.portraitUrl} receiverPortraitUrl={data.portraitUrl} content={item.content} isRead={item.isRead} time={item.time} />;
        }
    };

    /**
    *发送私信内容的函数
    */
	postMessage = () => {
        /*const bodyObj = { receiverName: this.props.chatName, title: '你好', content: $('#myMessageContent').val() };
        const bodyContent = JSON.stringify(bodyObj);
        const messageId = fetch('https://api.cc98.org/Message', {
	        method: 'POST',
	        headers: { Authorization: `${this.props.token}`, 'content-type': 'application/json'},
	        body: bodyContent
        });
        //重新获取数据并渲染
        console.log($('#myMessageContent').val());
        //这里写法有点奇怪，但是这样写才能暂停0.2秒再执行this.getMessageData，不能在setTimeout的第一个函数里直接调用this.getMessageData,那样会立即执行
        const self = this;
        setTimeout(function () { self.getMessageData(self.props) }, 200);
        //清空输入框
        $('#myMessageContent').val('');
        */
    };

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
                    <div className="message-message-wContent" id="messageContent">{this.state.data.map(this.coverMessageProps)}<div className="message-message-wcLoading"><img src="http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif"></img></div></div>
                    <div className="message-message-wPost">
                        <textarea className="message-message-wPostArea" id="myMessageContent"></textarea>
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