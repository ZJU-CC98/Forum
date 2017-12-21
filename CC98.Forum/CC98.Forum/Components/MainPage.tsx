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
export class RecommendedReadingComponent extends React.Component<{}, { recommendedReading: MainPageColumn[], index: number }> {

    constructor(props) {
        super(props);
        this.state = {
            recommendedReading: new Array<MainPageColumn>(),
            index: Math.floor(Math.random() * 5)    //0-4的随机数
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.convertButton = this.convertButton.bind(this);
    }

    async getRecommendedReading() {
        const recommendedReading: MainPageColumn[] = new Array<MainPageColumn>();
        const response = await Utility.cc98Fetch('/index/column/recommandationreading');
        const data = await response.json();
        for (let i = 0; i < 5; i++) {
            recommendedReading[i] = new MainPageColumn(data[i].imageUrl, data[i].title, data[i].url, data[i].content);
        }
        return recommendedReading;
    }

    async componentWillMount() {
        const x = await this.getRecommendedReading();
        this.setState({
            recommendedReading: x
        });
    }

    handleMouseEnter(index) {
        this.setState({
            index: index,
        })
    }

    //使用箭头函数传参 记得用到this的函数都要先bind
    convertButton(value: number, index: number, array: number[]) {
        let className: string = value ? "recommendedReadingButtonSelected" : "recommendedReadingButton";
        return <div className={className} onMouseEnter={() => { this.handleMouseEnter(index) }}></div>

    }

    //在componentWillMount前似乎会render一次 这时this.state还是初值  所以需要先判断一次
    render() {
        let recommendedReading = this.state.recommendedReading;
        let index = this.state.index;
        let styles = new Array(0, 0, 0, 0, 0);
        styles[index] = 1;
        let buttons = styles.map(this.convertButton);

        let imageUrl = recommendedReading.length ? recommendedReading[index].imageUrl : "";
        let title = recommendedReading.length ? recommendedReading[index].title : "";
        let url = recommendedReading.length ? recommendedReading[index].url : "";
        let content = recommendedReading.length ? recommendedReading[index].content : "";


        return <div className="recommendedReading">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">推荐阅读</div>
                </div>
            </div>
            <div className="recommendedReadingContent">
                <div className="recommendedReadingImage">
                    <img src={imageUrl} />
                </div>
                <div className="column" style={{ flexGrow: 1 }}>
                    <div className="recommendedReadingTitle"><a href={url} target="_blank">{title}</a></div>
                    <div className="recommendedReadingAbstract">{content}</div>
                    <div className="recommendedReadingButtons">{buttons}</div>
                </div>
            </div>
        </div>

    }
}

/**
 * 首页热门话题类
 * 用于首页的热门话题(十大），该类的对象（一条热门话题)需要标题，id，所在版面，及所在版面id等几个属性
 **/
export class HotTopicState {

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
export class HotTopicComponent extends React.Component<{}, { mainPageTopicState: HotTopicState[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        let data = Utility.getLocalStorage("mainHotTopics");
        if (!data) {
            data = [];
        }
        this.state = {
            mainPageTopicState: data
        };
    }

    async getTopicInfo() {
        const mainPageTopics: HotTopicState[] = [];
        const response = await Utility.cc98Fetch('/Topic/Hot');
        const data = await response.json();
        for (let i = 0; i < 10; i++) {
            mainPageTopics[i] = new HotTopicState(data[i].title, data[i].id, data[i].boardName, data[i].boardId);
        }
        Utility.setLocalStorage("mainHotTopics", mainPageTopics);
        return mainPageTopics;
    }

    async componentDidMount() {
        const x = await this.getTopicInfo();
        this.setState({
            mainPageTopicState: x,
        });
    }


    convertMainPageTopic(item: HotTopicState) {
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
 * 首页话题类
 * 用于首页左侧下方的几栏，该类的对象（一条主题)需要标题和id
 **/
export class MainPageTopicState {

    //属性
    title: string;
    id: number;

    //构造方法
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
}

/**
 * 首页话题组件
 * 需要列表名，fetchUrl和样式三个参数
 **/
export class MainPageTopicComponent extends React.Component<{ name: string, fetchUrl: string, style: string }, { mainPageTopic: MainPageTopicState[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        let data = Utility.getStorage("mainRecommendTopics");
        if (!data) { data = []; }
        this.state = {
            mainPageTopic: data
        };
    }

    async getTopicInfo() {
        let data = Utility.getStorage("mainRecommendTopics");
        if (data) { return data; }
        else {
            const mainPageTopics: MainPageTopicState[] = [];
            const url = this.props.fetchUrl;
            const response = await Utility.cc98Fetch(url);   //该api要求提供返回主题的数量，这里需要返回10条
            data = await response.json();
            for (let i = 0; i < 10; i++) {
                mainPageTopics[i] = new MainPageTopicState(data[i].title, data[i].id);
            }
            Utility.setStorage("mainRecommendTopics", mainPageTopics);
            return mainPageTopics;
        }
    }

    async componentDidMount() {
        const x = await this.getTopicInfo();
        this.setState({
            mainPageTopic: x,
        });
    }

    convertMainPageTopic(item: MainPageTopicState) {
        const topicUrl = `/topic/${item.id}`;
        return <div className="mainPageListRow">
            <div className="mainPageListTitle"><Link to={topicUrl}>{item.title}</Link></div>
        </div>
    }

    render() {
        const style: string = this.props.style;
        if (style === "black") {
            return <div className="mainPageList">
                <div className="mainPageTitle2">
                    <div className="mainPageTitleRow">
                        <i className="fa fa-volume-up"></i>
                        <div className="mainPageTitleText">{this.props.name}</div>
                    </div>
                </div>
                <div className="mainPageListContent2">
                    {this.state.mainPageTopic.map(this.convertMainPageTopic)}
                </div>
            </div>
        } else if (style === "blue") {
            return <div className="mainPageList">
                <div className="mainPageTitle1">
                    <div className="mainPageTitleRow">
                        <i className="fa fa-volume-up"></i>
                        <div className="mainPageTitleText">{this.props.name}</div>
                    </div>
                </div>
                <div className="mainPageListContent1">
                    {this.state.mainPageTopic.map(this.convertMainPageTopic)}
                </div>
            </div>
        }
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
       
            //return isInternalLink;
        } else {
            console.log("这不是链接！");
        }
    }

    async postAd() {
        const url = `/index/column/24`;
        const content = {
            type: 4,
            title: "一个图片不一样的广告",
            url: "www.cc98.org",
            imageUrl: "/images/推荐功能.jpg",
            enable: true,
            days: 10,
        }
        const postForumIndexColumnInfo = JSON.stringify(content);
        const token = Utility.getLocalStorage("accessToken");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", 'application/json');
        let response = await Utility.cc98Fetch(url, {
            method: 'PUT',
            headers: myHeaders,
            body: postForumIndexColumnInfo,
        });
        console.log("发送成功！")
    }
    render() {
        return <div className="mainPageList">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">测试区</div>
                </div>
            </div>
            <div className="mainPageListContent2">
                <div>这里是可爱的adddna测试的地方~</div>
                <input name="testContent" type="text" id="loginName" onChange={this.handleChange} value={this.state.testContent} />
                <div>封印</div>
            </div>
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
export class RecommendedFunctionComponent extends React.Component<{}, { recommendedFuctions: MainPageColumn[] }>{
    constructor(props) {
        super(props);
        this.state = {
            recommendedFuctions: new Array<MainPageColumn>(),
        };
    }

    async getRecommendedFunction() {
        const recommendedFuction: MainPageColumn[] = new Array<MainPageColumn>();
        const response = await Utility.cc98Fetch('/index/column/recommandationfunction');
        const data = await response.json();
        for (let i = 0; i < 5; i++) {
            recommendedFuction[i] = new MainPageColumn(data[i].imageUrl, data[i].title, data[i].url, data[i].content);
        }
        return recommendedFuction;
    }

    async componentWillMount() {
        const x = await this.getRecommendedFunction();
        this.setState({
            recommendedFuctions: x
        });
    }

    convertRecommendedFunction(item: MainPageColumn) {
        return <div className="recommendedFunctionRow">
            <div className="recommendedFunctionImage"><img src={item.imageUrl}></img></div>
            <div className="recommendedFunctionTitle"><a href={item.url} target="_blank">{item.title}</a></div>
        </div>
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
                {this.state.recommendedFuctions.map(this.convertRecommendedFunction)}
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
            <div className="schoolNewsTitle"><a href={item.url} target="_blank">{item.title}</a></div>
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
 * 首页广告组件
 * 每30s切换一条
 */
export class AdsComponent extends React.Component<{}, { ads: MainPageColumn[], index: number }>{

    private timer: any;

    constructor(props) {
        super(props);
        this.state = {
            ads: new Array<MainPageColumn>(),
            index: 0,
        };
        this.changeIndex = this.changeIndex.bind(this);
    }

    async getAds() {
        const ads: MainPageColumn[] = new Array<MainPageColumn>();
        const response = await Utility.cc98Fetch('/config/global/advertisement');
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            ads[i] = new MainPageColumn(data[i].imageUrl, data[i].title, data[i].url, data[i].content);
        }
        return ads;
    }

    async componentWillMount() {
        const x = await this.getAds();
        const length = x.length;
        this.setState({
            ads: x,
            index: Math.floor(Math.random() * length)
        });
    }

    //设定定时器 每30s调用一次changeIndex()
    componentDidMount() {
        this.timer = setInterval(() => { this.changeIndex(this.state.index) }, 30000);
    }

    //当组件从页面上移除时移除定时器
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //根据当前广告角标返回下一角标
    changeIndex(index) {
        let total = this.state.ads.length;
        let nextIndex = index + 1;
        if (index >= total) nextIndex = 0;
        this.setState({
            index: nextIndex,
        })
    }

    render() {
        let ads = this.state.ads;
        let index = this.state.index;

        let url = ads.length ? ads[index].url : "";
        let imageUrl = ads.length ? ads[index].imageUrl : "";

        return <div >
            <Link to={url}><img src={imageUrl} style={{ width: "18.75rem", height: "6.25rem" }} /></Link>
        </div>;
    }
}

/**
 * 论坛统计组件
 **/
export class Count extends React.Component<{}, { data }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        let data = Utility.getLocalStorage("mainDataCount");
        if (!data) { data = []; }
        this.state = {
            data: data
        };
    }
    async getData() {
        const response = await Utility.cc98Fetch('/config/global');
        let data = await response.json();
        Utility.setLocalStorage("mainDataCount", data);
        return data;

    }
    async componentDidMount() {
        const x = await this.getData();
        this.setState({
            data: x,
        });
    }
    render() {
        const data = this.state.data;
        return <div className="schoolNews">
            <div className="mainPageTitle2">
                <div className="mainPageTitleRow">
                    <i className="fa fa-volume-up"></i>
                    <div className="mainPageTitleText">论坛统计</div>
                </div>
            </div>
            <div className="schoolNewsContent" style={{ height: "10rem" }}>
                <div className="mainPageCountRow">
                    <div className="mainPageCountTitle">今日帖数</div>
                    <div className="mainPageCountTitle">{data.todayCount}</div>
                </div>
                <div className="mainPageCountRow">
                    <div className="mainPageCountTitle">论坛总主题数</div>
                    <div className="mainPageCountTitle">{data.topicCount}</div>
                </div>
                <div className="mainPageCountRow">
                    <div className="mainPageCountTitle">论坛总回复数</div>
                    <div className="mainPageCountTitle">{data.postCount}</div>
                </div>
                <div className="mainPageCountRow">
                    <div className="mainPageCountTitle">总用户数</div>
                    <div className="mainPageCountTitle">{data.userCount}</div>
                </div>
                <div className="mainPageCountRow">
                    <div className="mainPageCountTitle">欢迎新用户</div>
                    <div className="mainPageCountTitle"><Link to={`/user/name/${data.lastUserName}`}>{data.lastUserName}</Link></div>
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
                    <MainPageTopicComponent name="校园活动" fetchUrl="/topic/school-event" style="blue" />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>

                    <MainPageTopicComponent name="学术信息" fetchUrl="/topic/academics" style="black" />
                    <MainPageTopicComponent name="学习园地" fetchUrl="/topic/study" style="black" />
                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <MainPageTopicComponent name="感性·情感" fetchUrl="/topic/emotion" style="blue" />
                    <MainPageTopicComponent name="跳蚤市场" fetchUrl="/topic/flea-market" style="blue" />

                </div>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <MainPageTopicComponent name="求职广场" fetchUrl="/topic/full-time-job" style="black" />
                    <MainPageTopicComponent name="实习兼职" fetchUrl="/topic/part-time-job" style="black" />
                </div>
            </div>
            <div className="rightPart">
                <RecommendedFunctionComponent />
                <SchoolNewsComponent />
                <AdsComponent />
                <Count />
            </div>
        </div>;
    }

}

