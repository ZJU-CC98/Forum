import * as React from 'react';
import { AppState } from '../States/AppState';
import { MainPageTopicState } from '../States/AppState';
import * as $ from 'jquery';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
import { Link } from 'react-router-dom';

/**
 * 全站公告组件
 **/
export class AnnouncementComponent extends React.Component<{}, { announcementContent: string }> {

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
        return <div className="announcement">
            <div className="mainPageTitle1">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">全站公告</div>
                </div>
            </div>
            <div className="announcementContent"><UbbContainer code={this.state.announcementContent} /></div>
        </div>
    }
}

/**
 * 推荐阅读组件
 **/
export class RecommendedReadingComponent extends React.Component<{}, {}> {

    render() {
        return <div className="recommendedReading">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">推荐阅读</div>
                </div>
            </div>
            <div className="recommendedReadingContent">
                <div className="recommendedReadingImage">
                    <img src="/images/recommended2Img.jpg" />
                </div>
                <div className="column" style={{ flexGrow: 1 }}>
                    <div className="recommendedReadingTitle">推荐阅读标题</div>
                    <div className="recommendedReadingAbstract">推荐阅读内容</div>
                    <div className="recommendedReadingButtons">
                        <div>推荐阅读按钮</div>
                    </div>
                </div>
            </div>
        </div>
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
        const boardUrl = `/list/${item.boardid}/normal/`;
        const topicUrl = `/topic/${item.id}`;
        return <div className="mainPageListRow">
            <div className="mainPageListBoardName"> <Link to={boardUrl}>[{item.boardName}]</Link></div >
            <div className="mainPageListTitle"><Link to={topicUrl}>{item.title}</Link></div>
        </div >;
    }

    render() {
        return <div className="mainPageList">
            <div className="mainPageTitle1">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">热门话题</div>
                </div>
            </div>
            <div className="mainPageListContent1">
                {this.state.mainPageTopicState.map(this.convertMainPageTopic)}
            </div>
        </div>
    }
}

/**
 * 实习兼职组件
 * 首页重画后尚未更新
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
        const url = 'http://apitest.niconi.cc/Board/459/topic?from=0&size=10';
        const headers = new Headers();

        const response = await fetch(url,
            { headers });   //该api要求提供返回主题的数量，这里需要返回10条
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

/**
 * 测试用组件~
 **/
export class Test extends React.Component<{}, { testContent: string }>{
    constructor(props) {
        super(props);
        this.state = {
            testContent: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.urlTextHanderler = this.urlTextHanderler.bind(this);
    }

    handleChange(e) {
        this.setState({
            testContent: e.target.value
        });
    }

    async urlTextHanderler() {
        const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/gim;
        const reg2 = /cc98\.org/i;
        const reg3 = /zju\.edu\.cn/i;
        const reg4 = /nexushd\.org/i;
        const url = this.state.testContent;
        const matchResult = url.match(reg);
        if (matchResult) {
            const domainName = matchResult[0];
            let isInternalLink = reg2.test(domainName) || reg3.test(domainName) || reg4.test(domainName);
            console.log(isInternalLink);
            //return isInternalLink;
        } else {
            console.log("这不是链接！");
        }
    }
    render() {
        return <div>
            <div>这里是可爱的adddna测试的地方~</div>
            <input name="testContent" type="text" id="loginName" onChange={this.handleChange} value={this.state.testContent} />
            <div onClick={this.urlTextHanderler}>点这里测试输入的内容是否是内链</div>
        </div>
    }
}

/**
 * 推荐功能组件
 */
export class RecommendedFunctionComponent extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className="recommendedFunction">
            <div className="mainPageTitle1">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">推荐功能</div>
                </div>
            </div>
            <div className="recommendedFunctionContent">
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/recommended2Img.jpg"></img></div>
                    <div className="recommendedFunctionTitle">CC98抽卡游戏</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/recommended2Img.jpg"></img></div>
                    <div className="recommendedFunctionTitle">CC98 share</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/recommended2Img.jpg"></img></div>
                    <div className="recommendedFunctionTitle">推荐阅读投稿</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/recommended2Img.jpg"></img></div>
                    <div className="recommendedFunctionTitle">社团及学生组织用户申请</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/recommended2Img.jpg"></img></div>
                    <div className="recommendedFunctionTitle">广播台点歌通道</div>
                </div>
            </div>
        </div>
    }
}

/**
 * 校园新闻组件
 */
export class SchoolNewsComponent extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className="schoolNews">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">校园新闻</div>
                </div>
            </div>
            <div className="schoolNewsContent">
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
                <div className="schoolNewsRow">
                    <div className="schoolNewsTitle">[公告] 浙江杭州 Dead论坛 CC98 倒闭啦 王八蛋站长带着小姨子主席逃跑了!</div>
                </div>
            </div>
        </div>
    }
}

/**
 * 主页
 */
export class MainPage extends React.Component<{}, AppState> {
    render() {
        return <div className="mainPage">
            <div className="leftPart">
                <AnnouncementComponent />
                <RecommendedReadingComponent />
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <HotTopicComponent />
                    <HotTopicComponent />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <HotTopicComponent />
                    <HotTopicComponent />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <HotTopicComponent />
                    <HotTopicComponent />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <HotTopicComponent />
                    <HotTopicComponent />
                </div>
            </div>
            <div className="rightPart">
                <RecommendedFunctionComponent />
                <SchoolNewsComponent />
                <div className="mainPageAd">
                    <img src="/images/首页广告.jpg"/>
                </div>
            </div>
        </div>;
    }

}

