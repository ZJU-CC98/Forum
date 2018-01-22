// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageMessageState } from '../../States/MessageMessageState';
import { MessagePersonInfo } from '../../Props/MessagePersonInfo';
import { MessagePerson } from './MessagePerson';
import { MessageWindow } from './MessageWindow';
import * as Utility from '../../Utility';
import DocumentTitle from '../DocumentTitle';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageMessage extends React.Component<{}, MessageMessageState> {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            chatObj: null
        };
        //如果没有设置默认的state，render第一次渲染的时候state为空，MessageWindow组件会报错
        this.getMoreContact = this.getMoreContact.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        let token = Utility.getLocalStorage("accessToken");

        //获取到本人信息
        let myInfo = Utility.getLocalStorage("userInfo");


        //如果有未读消息则清空联系人缓存
        if ($('#unreadCount-messageCount1').attr('class') === 'message-counterNav') {
            Utility.removeStorage('recentContact');
        }

        //创建一个数组存储联系人信息
        let recentContact = Utility.getStorage('recentContact');

        if (!recentContact || recentContact.length === 0) {
            recentContact = await Utility.getRecentContact(0, 7, this.context.router);
            Utility.setStorage("recentContact", recentContact);
        }

        //对联系人列表重新排序，看是否有从其他页面发起的聊天
        recentContact = await Utility.sortContactList(recentContact, this.context.router);

        if (recentContact) {
            //默认第一个人为聊天对象
            this.setState({ data: recentContact, chatObj: recentContact[0] });
        }
        //默认选中第一个联系人
        let chatObj = this.state.chatObj
        if (chatObj) {
            $(`#${chatObj.name}`).addClass('message-message-pFocus');
        }
    }

    //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
    coverMessagePerson = (item: MessagePersonInfo) => {
        let self = this;
        let recentContact = Utility.getStorage('recentContact');
        async function changeChatName(){
            self.setState({ chatObj: item });
		    //给选中的聊天对象添加选中效果
		    $('.message-message-pList > div').removeClass('message-message-pFocus');
            $(`#contact_${item.id}`).addClass('message-message-pFocus');
            //如果选中该联系人，如果该联系人的最近一条私信为未读，则把最近一条私信设为已读，更新缓存并刷新界面
            for (let i in recentContact) {
                if (recentContact[i].id === item.id && recentContact[i].isRead === false) {
                        recentContact[i].isRead = true;
                        Utility.setStorage("recentContact", recentContact);
                        self.setState({ data: recentContact });
                }
            }
        };
        return <div onClick={changeChatName} id={`contact_${item.id}`}><MessagePerson data={item} /></div>;
    };

    /**
    *点击获取更多联系人
    */
    async getMoreContact() {
        if ($('#moreDone').css('display') == 'none') {
            $('#moreImg').removeClass('displaynone');
            $('#moreDot').addClass('displaynone');
            $('#moreShow').addClass('displaynone');
            let recentContact = Utility.getStorage("recentContact");
            let newContact = await Utility.getRecentContact(recentContact.length, 7, this.context.router);
            recentContact = recentContact.concat(newContact);
            this.setState({ data: recentContact });
            Utility.setStorage("recentContact", recentContact);

            if (newContact.length < 7) {
                $('#moreImg').addClass('displaynone');
                $('#moreDone').removeClass('displaynone');
            }
            else {
                $('#moreImg').addClass('displaynone');
                $('#moreDot').removeClass('displaynone');
                $('#moreShow').removeClass('displaynone');
            }
        }
    }

    //传递到MessageWindow里的方法，在MessageWindow里控制MessageMessage刷新界面
    async onChange() {
        let recentContact = Utility.getStorage("recentContact");
        this.setState({ data: recentContact, chatObj: recentContact[0] });
        //选中第一个联系人
        $('.message-message-pList > div').removeClass('message-message-pFocus');
        $(`#${this.state.chatObj.name}`).addClass('message-message-pFocus');
    }

	render() {
        //给我的私信添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#message').addClass('message-nav-focus');
        //先看state里有没有数组，防止报错
        let data = this.state.data;
        let chatObj = this.state.chatObj;
        //console.log("渲染联系人列表前的数据", data, chatObj);
        if (!data) {
            //console.log("条件1");
            return (<div className="message-message">
                <div className="message-message-people">
                    <div className="message-message-pTitle">近期私信</div>
                    <div className="message-message-pList">
                    </div>
                </div>
                <MessageWindow data={null} onChange={this.onChange} />
            </div>);
        }
        else if (data.length > 6) {
            //console.log("条件2");
            //创建联系人列表和聊天窗口
            return (<div className="message-message">
                <DocumentTitle title={`CC98论坛-我的私信`} />
                <div className="message-message-people">
                    <div className="message-message-pTitle">近期私信</div>
                    <div className="message-message-pList">
                        {data.map(this.coverMessagePerson)}
                        <div className="message-message-plMore" onClick={this.getMoreContact}>
                            <img id="moreImg" src="http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif" className="displaynone"></img>
                            <div id="moreDot">...</div>
                            <div id="moreShow">显示更多小伙伴~</div>
                            <div id="moreDone" className="displaynone">小伙伴们都出来了~</div>
                        </div>
                    </div>
                </div>
                <MessageWindow data={chatObj} onChange={this.onChange} />
            </div>);
        }
        else {
            //console.log("条件3");
            return (<div className="message-message">
                <div className="message-message-people">
                    <div className="message-message-pTitle">近期私信</div>
                    <div className="message-message-pList">
                        {data.map(this.coverMessagePerson)}
                    </div>
                </div>
                <MessageWindow data={chatObj} onChange={this.onChange} />
            </div>);
        }
    }
}