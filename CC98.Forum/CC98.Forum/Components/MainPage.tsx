import * as React from 'react';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
import { Link } from 'react-router-dom';

/**
 * 全站公告组件
 * 为同时兼容新旧版98 临时调整了显示的内容
 **/
export class AnnouncementComponent extends React.Component<{}, { announcementContent: string }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            announcementContent: '加载中……'
        };
    }
    async getAnnouncement() {
        const response = await Utility.cc98Fetch('/config/global');
        const data = await response.json();
        const announcement: string = data.announcement;
        //return announcement;

        //这里开始是临时功能 只保留了公告中[list][/list]之间的内容
        const reg = /\[list\][\s\S]*?\[align=left\]/gim;
        const reg2 = /\[\*\]/gim;
        const reg3 = /red/gim;
        const newAnnouncement = announcement.match(reg);
        let x = newAnnouncement[0];
        x = x.replace("[list]", "");
        x = x.replace("[align=left]", "");
        x = x.replace(reg2, "");   //去掉了因未关闭暂时无法解析的[*]
        x = x.replace(reg3, "orchid");  //把恶心的大红色换成梦幻的紫色
        return x;
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
 * 推荐阅读内容
 **/
interface RecommendedReadingContent {
    imageUrl: string;
    title: string;
    abstract: string;
}

/**
 * 推荐阅读组件
 **/
export class RecommendedReadingComponent extends React.Component<{}, {}> {
    /*
    constructor(props) {
        super(props);
        this.state = {
            contents: "",
            showedContent: { imageUrl: "", title: "", abstract: "" },
            index: Math.floor(Math.random() * 5),    //生成0-4的随机数
        };
    }
    //获取推荐阅读内容
    componentWillMount() {
        let defaultContents: any = "";
        for (let i = 0; i < 5; i++) {
            defaultContents[i].imageUrl = "/images/推荐阅读.jpg";
            defaultContents[i].title = "推荐阅读标题" + i;
            defaultContents[i].abstract = "推荐阅读摘要" + i;
        }
        this.setState({
            contents: defaultContents
        })
    }
    */
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
                    <img src="/images/推荐阅读.jpg" />
                </div>
                <div className="column" style={{ flexGrow: 1 }}>
                    <div className="recommendedReadingTitle">推荐阅读标题</div>
                    <div className="recommendedReadingAbstract">推荐阅读内容</div>
                    <div className="recommendedReadingButtons">
                        <div className="recommendedReadingButton" />
                        <div className="recommendedReadingButton" />
                        <div className="recommendedReadingButton" />
                        <div className="recommendedReadingButton" />
                        <div className="recommendedReadingButton" />
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
export class HotTopicComponent extends React.Component<{}, { mainPageTopicState: MainPageTopic[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            mainPageTopicState: new Array<MainPageTopic>(),
        };
    }

    async getTopicInfo() {
        const mainPageTopics: MainPageTopic[] = [];
        const response = await Utility.cc98Fetch('/Topic/Hot');
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
        return <div className="mainPageListRow">
            <div className="mainPageListBoardName"> <Link to={boardUrl}>[{item.boardName}]</Link></div>
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
 **/
export class Shixijianzhi extends React.Component<{}, { mainPageTopicState: MainPageTopic[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            mainPageTopicState: new Array<MainPageTopic>(),
        };
    }

    async getTopicInfo() {
        const mainPageTopics: MainPageTopic[] = [];
        const url = '/Board/459/topic?from=0&size=10';
        const headers = new Headers();

        const response = await Utility.cc98Fetch(url,
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
        return <div className="mainPageListRow">
            <div className="mainPageListTitle"><Link to={topicUrl}>{item.title}</Link></div>
        </div>
    }

    render() {
        return <div className="mainPageList">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">实习兼职</div>
                </div>
                <div className="mainPageTitleText"><Link to="/list/459">更多</Link></div>
            </div>
            <div className="mainPageListContent2">
                {this.state.mainPageTopicState.map(this.convertMainPageTopic)}
            </div>
        </div>
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
 * 首页栏目类
 * 用于首页的栏目，包括推荐阅读、推荐功能以及校园新闻。
 * 该类的成员对象包括：图片url（校园新闻不需要），标题，url，以及摘要（仅推荐阅读需要）
 * 这部分栏目均设置在新窗口打开链接
 **/
export class MainPageColumn {

    //属性
    imageUrl: string;
    title: string;
    url: string;
    content: string;

    //构造方法
    constructor(imageUrl, title, url, content) {
        this.imageUrl = imageUrl;
        this.title = title;
        this.url = url;
        this.content = content;
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
                    <div className="recommendedFunctionImage"><img src="/images/推荐功能.jpg"></img></div>
                    <div className="recommendedFunctionTitle">广播台点歌通道</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/推荐功能.jpg"></img></div>
                    <div className="recommendedFunctionTitle">CC98抽卡游戏</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/推荐功能.jpg"></img></div>
                    <div className="recommendedFunctionTitle">CC98 share</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/推荐功能.jpg"></img></div>
                    <div className="recommendedFunctionTitle">推荐阅读投稿</div>
                </div>
                <div className="recommendedFunctionRow">
                    <div className="recommendedFunctionImage"><img src="/images/推荐功能.jpg"></img></div>
                    <div className="recommendedFunctionTitle">社团及学生组织用户申请</div>
                </div>
            </div>
        </div>
    }
}

/**
 * 校园新闻组件
 */
export class SchoolNewsComponent extends React.Component<{}, { schoolNews: MainPageColumn[] }>{
    constructor(props) {
        super(props);
        this.state = {
            schoolNews: new Array<MainPageColumn>(),
        };
    }

    async getSchoolNews() {
        const schoolnews: MainPageColumn[] = new Array<MainPageColumn>();
        const response = await Utility.cc98Fetch('/index/column/schoolnews');
        const data = await response.json();
        for (let i = 0; i < 10; i++) {
            schoolnews[i] = new MainPageColumn(data[i].imageUrl, data[i].title, data[i].url, data[i].content);
        }
        return schoolnews;
    }

    async componentWillMount() {
        const x = await this.getSchoolNews();
        this.setState({
            schoolNews: x
        });
    }

    convertSchoolNews(item: MainPageColumn) {
        return <div className="schoolNewsRow">
            <div className="schoolNewsTitle"><a href={item.url} target="view_window">{item.title}</a></div>
        </div>
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
                {this.state.schoolNews.map(this.convertSchoolNews)}
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
                    <Shixijianzhi />
                    <Shixijianzhi />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <HotTopicComponent />
                    <HotTopicComponent />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <Shixijianzhi />
                    <Shixijianzhi />
                </div>
            </div>
            <div className="rightPart">
                <RecommendedFunctionComponent />
                <SchoolNewsComponent />
                <div className="mainPageAd">
                    <img src="/images/首页广告.jpg" />
                </div>
            </div>
        </div>;
    }

}

