// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MyMessageMessageState } from '../States/MyMessageMessageState';
import { MyMessagePersonProps } from '../Props/MyMessagePersonProps';
import { MyMessagePerson } from './MyMessagePerson';
import { MyMessageWindow } from './MyMessageWindow';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MyMessageMessage extends React.Component<{}, MyMessageMessageState> {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chatName: '系统',
            chatPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            myName: '系统',
            myPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            token: 'testAccessToken'
        };
        //如果没有设置默认的state，render第一次渲染的时候state为空，MyMessageWindow组件会报错
    }

    async componentWillMount() {
        let personNumber = 40;
        
        let token = location.href.match(/access_token=(\S+)/);
        let accessToken: string;
        if (token) {
            accessToken = token[1];
        };
        
        //获取到本人信息
        let response1 = await fetch('https://api.cc98.org/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        let myInfo = await response1.json(); 

        //创建一个数组存储联系人信息
        let people: MyMessagePersonProps[] = [];

        let startPage = -49;
        do {
            startPage += 49;
            //获取到最近50条收发短信信息
            let response2 = await fetch('https://api.cc98.org/Message?filter=both', {
                headers: {
                    Range: `bytes=${startPage}-${startPage + 49}`,
                    Authorization: `Bearer ${accessToken}`
                }
            });
            let data = await response2.json();
            //从最近50条收发短信中获取最多n位联系人，并存储在people中
            for (let i in data) {
                //系统消息统统筛掉
                if (data[i].title == '回复提示' || data[i].title == '@提示' || data[i].title == '转账通知' || data[i].title == '系统消息' || data[i].title == `用户：${myInfo.name} 在帖子中回复了你`) {
                }
               //如果是我发送的，看接收者在不在people里面，不在就存进去
                else if (data[i].senderName == myInfo.name) {
                    if (!contains(people, data[i].receiverName)) {
                        people.push({ name: data[i].receiverName, portraitUrl: '', title: data[i].title, content: data[i].content });
                    }
                }
                //如果不是我发送的，那肯定是我接收的。如果发送者为系统则名字不存在（false），直接筛掉，存在的话看在不在people里面，不在就存进去
                else if (data[i].senderName) {
                    if(!contains(people, data[i].senderName)) {
                        people.push({ name: data[i].senderName, portraitUrl: '', title: data[i].title, content: data[i].content });
                    }
                }
                if (people.length >= personNumber) {
                    break;
                }
            }
        } while (people.length < personNumber);

        
        //通过联系人姓名查询到联系人头像并存储到people中
        for (let i in people) {
            let response = await fetch(`https://api.cc98.org/User/Name/${people[i].name}`); //Stardust*这个带特殊符号的用户名会查询失败
            let person = await response.json();
            people[i].portraitUrl = person.portraitUrl;
        }
        this.setState({ data: people, chatName: people[0].name, chatPortraitUrl: people[0].portraitUrl, myName: myInfo.name, myPortraitUrl: myInfo.portraitUrl, token: accessToken });
        //默认选中第一个联系人
        $(`#${people[0].name}`).addClass('mymessage-message-pFocus');
    }

    //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
    coverMessagePerson = (item: MyMessagePersonProps) => {
	    const changeChatName = () => { 
		    this.setState({ chatName: item.name, chatPortraitUrl: item.portraitUrl });

		    //给选中的聊天对象添加选中效果
		    $('.mymessage-message-pList > div').removeClass('mymessage-message-pFocus');
		    $(`#${item.name}`).addClass('mymessage-message-pFocus');
	    };
	    return <div onClick={changeChatName} id={`${item.name}`}><MyMessagePerson name={item.name} portraitUrl={item.portraitUrl} title={item.title} content={item.content} /></div>;
	};

	render() {
        //给我的私信添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#message').addClass('mymessage-nav-focus'); 
        return (
            <div className="mymessage-message">
                <div className="mymessage-message-people">
                    <div className="mymessage-message-pTitle">近期私信</div>
                    <div className="mymessage-message-pList">{this.state.data.map(this.coverMessagePerson)}</div>
                </div>
                <MyMessageWindow chatName={this.state.chatName} chatPortraitUrl={this.state.chatPortraitUrl} myName={this.state.myName} myPortraitUrl={this.state.myPortraitUrl} token={this.state.token} />
            </div>
            );
    }
}

//查找数组arr中是否存在元素的名字为obj
function contains(arr , obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}