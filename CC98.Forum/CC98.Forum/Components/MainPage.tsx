import * as React from 'react';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
import { Link } from 'react-router-dom';
import DocumentTitle from './DocumentTitle';
import { CountDown } from './CountDown'
/**
 * 全站公告组件
 **/
export class AnnouncementComponent extends React.Component<{ data }, {}> {
  render() {
    const data = this.props.data;
    if (data == "") return <div></div>
    else return <div className="announcement">
      <div className="mainPageTitle1">
        <div className="mainPageTitleRow" style={{ width: '100%' }}>
          <i className="fa fa-volume-up"></i>
          <div style={{ flexGrow: 1 }} className="mainPageTitleText">全站公告</div>
          {/*<CountDown endDate={new Date('05/26/2018 05:30 PM')} />*/}
        </div>
      </div>
      <div className="announcementContent"><UbbContainer code={data} /></div>
    </div>
  }
}

/**
 * 推荐阅读组件
 **/
export class RecommendedReadingComponent extends React.Component<{ data }, { index: number }> {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.convertButton = this.convertButton.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const length: number = nextProps.data.length;
    this.setState({
      index: Math.floor(Math.random() * length),
    })
  }

  handleMouseEnter(index) {
    this.setState({
      index: index,
    })
  }

  convertButton(value: number, index: number, array: number[]) {
    const className: string = value ? "recommendedReadingButtonSelected" : "recommendedReadingButton";
    return <div className={className} onMouseEnter={() => { this.handleMouseEnter(index) }}></div>
  }

  render() {
    const recommendedReading = this.props.data;
    const length = recommendedReading.length;     //推荐阅读的长度

    const index = this.state.index;
    let styles = new Array(length);
    styles.fill(0);     //将数组元素全部填充为0
    styles[index] = 1;      //选中下标的内容对应的数组元素值为1
    const buttons = styles.map(this.convertButton);

    const imageUrl = length ? recommendedReading[index].imageUrl : "";
    const url = length ? recommendedReading[index].url : "";
    const title = length ? recommendedReading[index].title : "";
    const content = length ? recommendedReading[index].content : "";

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
  boardId: number;

  //构造方法
  constructor(title, id, boardName, boardId) {
    this.title = title;
    this.id = id;
    this.boardName = boardName;
    this.boardId = boardId;
  }
}

/**
 * 热门话题组件
 **/
export class HotTopicComponent extends React.Component<{ data }, { mainPageTopicState: HotTopicState[] }> {

  convertMainPageTopic(item: HotTopicState) {
    if (!item.id) return <div>{item.title}</div>
    const boardUrl = `/board/${item.boardId}`;
    const topicUrl = `/topic/${item.id}/1`;
    return <div className="mainPageListRow">
      <div className="mainPageListBoardName"> <a href={boardUrl} target="_blank">[{item.boardName}]</a></div>
      <div className="mainPageListTitle"><a href={topicUrl} target="_blank">{item.title}</a></div>
    </div >;
  }

  render() {
    // 数据库计算新的十大需要一定时间，这时API去查询更新，就会查到空的十大（返回一个空数组）
    // 因此这里检查获得的十大是否为空数组，如果是，则显示上一次获取非空十大时的缓存
    let data = this.props.data;
    if (data === []) {
      const hotTopic = Utility.getLocalStorage("mainPageHotTopic")
      const defaultData = {
        title: "数据库正在计算新的十大数据，请前辈等会再来~",
        id: 0,
        boardName: "错误提示",
        boardId: 0
      }
      data = hotTopic ? hotTopic : [defaultData]
    }
    return <div className="mainPageList">
      <div className="mainPageTitle1">
        <div className="mainPageTitleRow">
          <i className="fa fa-volume-up"></i>
          <div className="mainPageTitleText">热门话题</div>
        </div>
        <div className="mainPageTitleRow">
          <div className="mainPageTitleText"><a href="/topic/hot-weekly" target="_blank">本周</a></div>
          <div className="mainPageTitleText"><a href="/topic/hot-monthly" target="_blank">本月</a></div>
          <div className="mainPageTitleText"><a href="/topic/hot-history" target="_blank">历史上的今天</a></div>
        </div>
      </div>
      <div className="mainPageListContent1">
        {data.map(this.convertMainPageTopic)}
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
 * 首页话题更多参数
 * 拥有名称和链接两个属性
 */
export class MainPageTopicMoreProps {
  name: string;
  url: string;

  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

}

/**
 * 首页话题组件
 * 需要列表名，fetchUrl和样式三个参数
 **/
export class MainPageTopicComponent extends React.Component<{ data, name: string, fetchUrl: string, style: string, mores: MainPageTopicMoreProps[] }, {}>{

  convertMainPageTopic(item: MainPageTopicState) {
    const topicUrl = `/topic/${item.id}/1`;
    return <div className="mainPageListRow">
      <div className="mainPageListTitle"><a href={topicUrl} target="_blank">{item.title}</a></div>
    </div>
  }

  render() {

    let moresHTML = this.props.mores.map((item) => {
      return <div className="mainPageTitleText"><a href={item.url} target="_blank">{item.name}</a></div>
    })

    const style: string = this.props.style;

    if (style === "black") {
      return <div className="mainPageList">
        <div className="mainPageTitle2">
          <div className="mainPageTitleRow">
            <i className="fa fa-volume-up"></i>
            <div className="mainPageTitleText">{this.props.name}</div>
          </div>
          <div className="mainPageTitleRow">{moresHTML}</div>
        </div>
        <div className="mainPageListContent2">
          {this.props.data.map(this.convertMainPageTopic)}
        </div>
      </div>
    } else if (style === "blue") {
      return <div className="mainPageList">
        <div className="mainPageTitle1">
          <div className="mainPageTitleRow">
            <i className="fa fa-volume-up"></i>
            <div className="mainPageTitleText">{this.props.name}</div>
          </div>
          <div className="mainPageTitleRow">{moresHTML}</div>
        </div>
        <div className="mainPageListContent1">
          {this.props.data.map(this.convertMainPageTopic)}
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
      //console.log("这不是链接！");
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
    //console.log("发送成功！")
  }
  async signIn() {
    const url = `/me/signin`;

    const token = Utility.getLocalStorage("accessToken");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", 'application/json');
    myHeaders.append("Content-Type", "application/json");

    let content = "日常";
    const response = await Utility.cc98Fetch(url, { method: "POST", headers: myHeaders, body: content });
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
        <div>封印封印</div>
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
export class RecommendedFunctionComponent extends React.Component<{ data }, {}>{

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
        {this.props.data.map(this.convertRecommendedFunction)}
      </div>
    </div>
  }
}

/**
 * 校园新闻组件
 */
export class SchoolNewsComponent extends React.Component<{ data }, {}>{

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
        {this.props.data.map(this.convertSchoolNews)}
      </div>
    </div>
  }
}

/**
 * 首页广告组件
 * 每20s切换一条
 */
export class AdsComponent extends React.Component<{}, { ads: MainPageColumn[], index: number }>{

  private timer: any;

  constructor(props) {
    super(props);
    let data = Utility.getStorage('mainAds');
    if (!data) { data = new Array<MainPageColumn>(); }
    this.state = {
      ads: data,
      index: 0,
    };
    this.changeIndex = this.changeIndex.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.convertButton = this.convertButton.bind(this);
  }

  async getAds() {
    let ads: MainPageColumn[] = Utility.getStorage('mainAds');
    if (ads) { return ads }
    else {
      ads = new Array<MainPageColumn>();
      const response = await Utility.cc98Fetch('/config/global/advertisement');
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        ads[i] = new MainPageColumn(data[i].imageUrl, data[i].title, data[i].url, data[i].content);
      }
      Utility.setStorage('mainAds', ads);
      return ads;
    }
  }

  async componentWillMount() {
    const x = await this.getAds();
    const length = x.length;
    this.setState({
      ads: x,
      index: Math.floor(Math.random() * length)
    });
  }

  //设定定时器 每20s调用一次changeIndex()
  componentDidMount() {
    this.timer = setInterval(() => { this.changeIndex(this.state.index) }, 20000);
  }

  //当组件从页面上移除时移除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //根据当前广告角标返回下一角标
  changeIndex(index) {
    let total = this.state.ads.length;
    let nextIndex = index + 1;
    if (nextIndex >= total) nextIndex = 0;
    this.setState({
      index: nextIndex,
    })
  }

  //绑定鼠标进入事件
  handleMouseEnter(index) {
    this.setState({
      index: index,
    })
  }

  convertButton(value: number, index: number, array: number[]) {
    let className: string = value ? "adButtonSelected" : "adButton";
    return <div key={index} className={className} onMouseEnter={() => { this.handleMouseEnter(index) }}></div>
  }

  render() {
    let ads = this.state.ads;
    let index = this.state.index;

    let length = ads.length;
    let styles = new Array(length);
    styles.fill(0);     //将数组元素全部填充为0
    styles[index] = 1;      //选中下标的内容对应的数组元素值为1
    let buttons = styles.map(this.convertButton);

    let url = ads.length ? ads[index].url : "";
    let imageUrl = ads.length ? ads[index].imageUrl : "";

    return <div style={{ position: 'relative', width: '18.75rem', height: '6.25rem' }}>
      <div><a href={url} target="_blank"><img src={imageUrl} style={{ width: '18.75rem', height: '6.25rem' }} /></a></div>
      <div className="adButtons" style={{ position: 'absolute', left: '50%', marginLeft: '-8rem', bottom: '0.25rem' }}>{buttons}</div>
    </div>;
  }
}

/**
 * 论坛统计组件
 **/
export class MainPageCountComponent extends React.Component<{ data }, {}> {

  render() {
    const data = this.props.data;
    return <div className="mainPageCount">
      <div className="mainPageTitle1">
        <div className="mainPageTitleRow">
          <i className="fa fa-volume-up"></i>
          <div className="mainPageTitleText">论坛统计</div>
        </div>
      </div>
      <div className="mainPageCountContent">
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">今日帖数</div>
          <div className="mainPageCountTitle">{data.todayCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">今日主题数</div>
          <div className="mainPageCountTitle">{data.todayTopicCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">论坛总主题数</div>
          <div className="mainPageCountTitle">{data.topicCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">论坛总回复数</div>
          <div className="mainPageCountTitle">{data.postCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">在线用户数</div>
          <div className="mainPageCountTitle">{data.onlineUserCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">总用户数</div>
          <div className="mainPageCountTitle">{data.userCount || 0}</div>
        </div>
        <div className="mainPageCountRow">
          <div className="mainPageCountTitle">欢迎新用户</div>
          <div className="mainPageCountTitle"><Link to={`/user/name/${encodeURIComponent(data.lastUserName)}`}>{data.lastUserName}</Link></div>
        </div>
      </div>
    </div>

  }
}

/**
 * 推荐版面组件
 */
export class RecommendedBoardComponent extends React.Component<{}, {}>{
  render() {
    return <div></div>
  }
}

/**
 *首页统计类
 *包括今日帖数，总主题数，总回复数，总用户数，最新用户
 */
export class MainPageCountProps {

  //属性
  todayCount: number;
  todayTopicCount:number;
  topicCount: number;
  postCount: number;
  onlineUserCount: number;
  userCount: number;
  lastUserName: string;

  //构造方法
  constructor(todayCount,todayTopicCount, topicCount, postCount, onlineUserCount, userCount, lastUserName) {
    this.todayCount = todayCount;
    this.todayTopicCount = todayTopicCount;
    this.topicCount = topicCount;
    this.postCount = postCount;
    this.onlineUserCount = onlineUserCount;
    this.userCount = userCount;
    this.lastUserName = lastUserName;
  }
}

/**
 * 小程序二维码
 */
export class QRCode extends React.Component<{}, {}>{
  render() {
    return <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
      }}
    >
      <div className="mainPageTitle2">
        <div className="mainPageTitleRow">
          <i className="fa fa-volume-up"></i>
          <div className="mainPageTitleText">CC98小程序</div>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }} >
        <img style={{ width: "100%" }} src="/static/images/QRCode.png"></img>
      </div>
    </div>
  }
}

/**
 * 主页
 */
export class MainPage extends React.Component<{}, { data }> {

  constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
    super(props);       //super 表示调用基类（Component系统类型）构造方法  
    let data = {
      academics: [],
      announcement: "",
      emotion: [],
      fleaMarket: [],
      fullTimeJob: [],
      hotTopic: [],
      lastUserName: "",
      partTimeJob: [],
      postCount: 0,
      recommendationFunction: [],
      recommendationReading: [],
      schoolEvent: [],
      schoolNews: [],
      study: [],
      todayCount: 0,
      topicCount: 0,
      userCount: 0
    };
    this.state = {
      data: data
    };
  }

  async getData() {
    let data = Utility.getLocalStorage("mainPageData");
    if (!data) {
      const response = await Utility.cc98Fetch('/config/index');
      data = await response.json();
      let hotTopicData = data.hotTopic;
      //若获取到的首页数据中的十大数据为空，则不缓存首页数据，这样用户立即刷新页面就可以获取最新的十大数据
      //当然，该次获取的十大数据为空，这则由十大组件处理（显示之前缓存的十大数据）
      //若获取了正常的首页数据（十大不为空），则缓存60s，这样可以避免用户短时间内频繁访问首页产生大量请求
      if (hotTopicData && hotTopicData.length) {
        Utility.setLocalStorage("mainPageData", data, 60);
        Utility.setLocalStorage("mainPageHotTopic", data);
      }
      return data;
    } else {
      return data
    }
  }

  async componentDidMount() {
    const x = await this.getData();
    this.setState({
      data: x,
    });
  }

  render() {

    let data = this.state.data;

    let study: MainPageTopicMoreProps[] = new Array({ name: "学习", url: "/board/68" }, { name: "外语", url: "/board/304" }, { name: "考研", url: "/board/263" }, { name: "出国", url: "/board/102" });
    let emotion: MainPageTopicMoreProps[] = new Array({ name: "缘分", url: "/board/152" }, { name: "小屋", url: "/board/114" }, { name: "感性", url: "/board/81" });
    let fleaMarket: MainPageTopicMoreProps[] = new Array({ name: "数码", url: "/board/562" }, { name: "生活", url: "/board/80" }, { name: "服饰", url: "/board/563" });
    let fullTimeJob: MainPageTopicMoreProps[] = new Array({ name: "更多", url: "/board/235" });
    let partTimeJob: MainPageTopicMoreProps[] = new Array({ name: "更多", url: "/board/459" });

    let count: MainPageCountProps = new MainPageCountProps(data.todayCount,data.todayTopicCount, data.topicCount, data.postCount, data.onlineUserCount, data.userCount, data.lastUserName);

    return <div className="mainPage">
      <DocumentTitle title={`CC98论坛`} />
      <div className="leftPart">
        <AnnouncementComponent data={data.announcement} />
        <RecommendedReadingComponent data={data.recommendationReading} />
        <div className="row" style={{ justifyContent: "space-between" }}>
          <HotTopicComponent data={data.hotTopic} />
          <MainPageTopicComponent data={data.schoolEvent} name="校园活动" fetchUrl="/topic/school-event" style="blue" mores={[]} />
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <MainPageTopicComponent data={data.academics} name="学术信息" fetchUrl="/topic/academics" style="black" mores={[]} />
          <MainPageTopicComponent data={data.study} name="学习园地" fetchUrl="/topic/study" style="black" mores={study} />
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <MainPageTopicComponent data={data.emotion} name="感性·情感" fetchUrl="/topic/emotion" style="blue" mores={emotion} />
          <MainPageTopicComponent data={data.fleaMarket} name="跳蚤市场" fetchUrl="/topic/flea-market" style="blue" mores={fleaMarket} />
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <MainPageTopicComponent data={data.fullTimeJob} name="求职广场" fetchUrl="/topic/full-time-job" style="black" mores={fullTimeJob} />
          <MainPageTopicComponent data={data.partTimeJob} name="实习兼职" fetchUrl="/topic/part-time-job" style="black" mores={partTimeJob} />
        </div>
      </div>
      <div className="rightPart">
        <RecommendedFunctionComponent data={data.recommendationFunction} />
        <SchoolNewsComponent data={data.schoolNews} />
        <AdsComponent />
        <MainPageCountComponent data={count} />
        <QRCode />
      </div>
    </div>;
  }

}
