import * as React from 'react';
import { AppState } from '../States/AppState';
import { MainPageTopicState } from '../States/AppState';
import * as $ from 'jquery';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';

/**
 * 全站公告组件
 **/
export class Announcement extends React.Component<{}, { announcementContent: string }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            announcementContent: '加载中……'
        };
    }
    async getAnnouncement() {
        const response = await fetch('http://apitest.niconi.cc/config/global');
        const data = await response.json();
        const announcement: string = data.announcement;
        return announcement;
    }
    async componentDidMount() {
        const x = await this.getAnnouncement();
        this.setState({
            announcementContent: x,
        });
    }
    render() {
        return <div className="announcementContent"><UbbContainer code={this.state.announcementContent} /></div>
    }
}

/**
 * 推荐阅读组件
 **/
export class Recommended1 extends React.Component<{}, {}> {
    render() {

        $(document).ready(function () {
            const button = $('.recommended1Button');
            const content = $('.recommended1Content');

            const randomNum = Math.floor(Math.random() * 5);  //生成0-4的随机数
            content.eq(randomNum).css('display', 'flex');
            button.eq(randomNum).css('background-color', 'rgb(53,177,255)');

            button.mouseover(function () {
                const index = $(this).index();    //获取当前元素下标
                content.css('display', 'none');
                content.eq(index).css('display', 'flex');
                button.css('background-color', 'rgb(255,255,255)');
                button.eq(index).css('background-color', 'rgb(53,177,255)');
            });
        });

        return <div className="recommended1">
            <div className="column">
                <div className="recommended1Content">
                    <div className="recommended1Img"><img src="/images/recommended2Img.jpg" /></div>
                    <div className="column">
                        <div className="recommended1Title">推荐阅读标题1</div>
                        <div className="recommended1Abstract">推荐阅读摘要1</div>
                    </div>
                </div>
                <div className="recommended1Content">
                    <div className="recommended1Img"><img src="/images/recommended2Img.jpg" /></div>
                    <div className="column">
                        <div className="recommended1Title">推荐阅读标题2</div>
                        <div className="recommended1Abstract">推荐阅读摘要2</div>
                    </div>
                </div>
                <div className="recommended1Content">
                    <div className="recommended1Img"><img src="/images/recommended2Img.jpg" /></div>
                    <div className="column">
                        <div className="recommended1Title">推荐阅读标题3</div>
                        <div className="recommended1Abstract">推荐阅读摘要3</div>
                    </div>
                </div>
                <div className="recommended1Content">
                    <div className="recommended1Img"><img src="/images/recommended2Img.jpg" /></div>
                    <div className="column">
                        <div className="recommended1Title">推荐阅读标题4</div>
                        <div className="recommended1Abstract">推荐阅读摘要4</div>
                    </div>
                </div>
                <div className="recommended1Content">
                    <div className="recommended1Img"><img src="/images/recommended2Img.jpg" /></div>
                    <div className="column">
                        <div className="recommended1Title">推荐阅读标题5</div>
                        <div className="recommended1Abstract">推荐阅读摘要5</div>
                    </div>
                </div>
            </div>
            <div className="buttonRow">
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
            </div>
        </div>;
    }
}

/**
 * 首页话题类
 * 用于首页左侧的几个信息栏，该类的对象（一条主题)需要标题，id，所在版面，及所在版面id等几个属性
 **/
export class MainPageTopic {

    //属性
    title: string;
    id: number;
    boardName: string;
    boardid: number;

    //构造方法
    constructor(title, id, boardName, boardid) {
        this.title = title;
        this.id = id;
        this.boardName = boardName;
        this.boardid = boardid;
    }
}

/**
 * 热门话题组件
 **/
export class HotTopicComponent extends React.Component<{}, MainPageTopicState> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            mainPageTopicState: new Array<MainPageTopic>(),
        };
    }

    async getTopicInfo() {
        const mainPageTopics: MainPageTopic[] = [];
        const response = await fetch('http://apitest.niconi.cc/Topic/Hot');
        const data = await response.json();
        for (let i = 0; i < 10; i++) {
            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].id, data[i].boardName, data[i].boardId);
        }
        return mainPageTopics;
    }

    async componentDidMount() {
        const x = await this.getTopicInfo();
        this.setState({
            mainPageTopicState: x,
        });
    }


    convertMainPageTopic(item: MainPageTopic) {
        const boardUrl = `/list/${item.boardid}`;
        const topicUrl = `/topic/${item.id}`;
        return <div className="listRow">
            <div className="boardName"> <a href={boardUrl}>[{item.boardName}]</a></div >
            <div className="topicTitle"><a href={topicUrl}>{item.title}</a></div>
        </div >;
    }

    render() {
        return <div>{this.state.mainPageTopicState.map(this.convertMainPageTopic)}</div>;
    }
}

/**
 * 实习兼职组件，注意组件类名开头需大写!
 **/
export class Shixijianzhi extends React.Component<{}, MainPageTopicState>{

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            mainPageTopicState: new Array<MainPageTopic>(),
        };
    }

    async getTopicInfo() {
        const mainPageTopics: MainPageTopic[] = [];
        const url = 'http://apitest.niconi.cc/Topic/Board/459';
        const response = await fetch(url,
            { headers: { Range: 'bytes=0-9' } });   //该api要求提供返回主题的数量，这里需要返回10条
        const data = await response.json();
        for (let i = 0; i < 10; i++) {
            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].id, data[i].boardName, data[i].boardId);
        }
        return mainPageTopics;
    }

    async componentDidMount() {
        const x = await this.getTopicInfo();
        this.setState({
            mainPageTopicState: x,
        });
    }

    convertMainPageTopic(item: MainPageTopic) {
        const topicUrl = `/topic/${item.id}`;
        return <div className="listRow">
            <div className="topicTitle"><a href={topicUrl}>{item.title}</a></div>
        </div >;
    }

    render() {
        return <div>{this.state.mainPageTopicState.map(this.convertMainPageTopic)}</div>;
    }
}
/*
 测试用组件~
 */
export class Test extends React.Component<{}, AppState>{

    async test() {
        let url = 'http://apitest.niconi.cc/user/follow/fancount?userid=5298';
        let token = Utility.getLocalStorage("accessToken");
        console.log(token);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/x-www-form-urlencoded');
        myHeaders.append("Authorization", token);
        let response = await fetch(url, {
            method: "GET",
            headers: myHeaders,
            body: { 'token': token }
        });
        let data = await response.json();
        data += 1;
        console.log(data);
    }
    render() {
        return <div onClick={this.test}>这里是萌萌的adddna测试的地方~</div>
    }
}

/**
 * 网站的主页面对象。
 */
export class MainPage extends React.Component<{}, AppState> {
    render() {
        return <div className="mainPage">

            <div className="leftPart">
                <div className="announcement">
                    <div className="blueBar1">
                        <div className="listName">论坛公告</div>
                    </div>
                    <Announcement />
                </div>
                <Recommended1 />
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">热门话题</div>
                            <div className="more">更多</div>
                        </div>
                        <div className="listContent1">
                            <HotTopicComponent />
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">校园活动</div>
                            <div className="more">更多</div>
                        </div>
                        <div className="listContent1">
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">★-----------------------------★</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">首页除了十大之外的部分还没施工好哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">其他部分的内容都是乱填哒</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">如果前辈你看不到十大的内容</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">那么可能是你忘了挂RVPN哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">★-----------------------------★</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">首页除了十大之外的部分还没施工好哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">其他部分的内容都是乱填哒</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">如果前辈你看不到十大的内容</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">那么可能是你忘了挂RVPN哦</div></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">学术信息</div>
                            <div className="more">更多</div>
                        </div>
                        <Test />
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">最热回复</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">最新动态</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">求职广场</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">实习兼职</div>
                            <div className="more">更多</div>
                        </div>
                        <div className="listContent1">
                            <Shixijianzhi />
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">失物招领</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightPart">
                <div className="recommended2">
                    <div className="dashedBorder">
                        <div className="heading">推荐</div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">广播台点歌通道</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">CC98抽卡游戏</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">CC98 share</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">推荐阅读投稿</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">社团及学生组织用户认证申请</div>
                        </div>
                    </div>
                </div>
                <div className="ad">
                    <img src="/images/ad.jpg"></img>
                </div>
                <div className="news">
                    <div className="dashedBorder">
                        <div className="heading">校园新闻</div>
                    </div>
                    <div className="newsContent">
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                    </div>
                </div>
                <div className="boardRecommended">
                    <div className="heading">版面推荐</div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                </div>
            </div>

        </div>;
    }

}

