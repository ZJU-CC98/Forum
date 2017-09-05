import * as React from 'react';
import { HotTopic } from '../Props/AppProps'
import * as State from '../States/AppState'
import * as Props from '../Props/AppProps'
import * as Utility from '../Utility'

import { match } from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';
import { MessageMatch } from '../Match/Match'
import TopicTitleAndContentState = State.TopicTitleAndContentState;


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class List extends RouteComponent<{}, { page: number, totalPage: number, boardid: number }, { page: string, boardid: number }>  {

    constructor(props, context) {
        super(props, context);

        // 默认页码
        this.state = { page: 1, totalPage: 1, boardid: this.match.params.boardid };
    }
    async getTotalListPage(boardid) {
        var totalTopicCountResponse = await fetch(`http://api.cc98.org/Board/${boardid}`);
        var totalTopicCountJson = await totalTopicCountResponse.json();
        var totalTopicCount = totalTopicCountJson.totalTopicCount;
        return (totalTopicCount - totalTopicCount % 20) / 20 + 1;
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        // 未提供页码，防止出错不进行后续处理
        if (!newProps.match.params.page) {
            page = 1;
        }

        // 转换类型
        else { page = parseInt(newProps.match.params.page); }
        let boardid = this.match.params.boardid;
        let totalPage = await this.getTotalListPage(boardid);
        // 设置状态
        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
    }
    async componentDidMount() {
        let page: number;
        // 未提供页码，防止出错不进行后续处理
        if (!this.match.params.page) {
            page = 1;
        }
        // 转换类型
        else { page = parseInt(this.match.params.page); }
        let boardid = this.match.params.boardid;
        let totalPage = await this.getTotalListPage(boardid);
        // 设置状态
        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
    }
    render() {
        return <div id="listRoot" style={{ marginTop:"40px" }}>
            <ListHead key={this.state.page} boardid={this.state.boardid} />
            <ListNotice />
            <ListButtonAndPager page={this.state.page} totalPage={this.state.totalPage} boardid={this.state.boardid} />
            <ListTag />
            <Route path="/list/:boardid/:page?" component={ListContent} />
        </div>;
    }
}
export class ListHead extends RouteComponent<{ boardid }, State.ListHeadState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            imgUrl: '/images/ListImg.jpg',
            listName: '学术信息',
            todayTopics: 210,
            totalTopics: 12000,
            adsUrl: '/images/ads.jpg',
            listManager: [],
            isAnomynous: false,
            isEncrypted: false,
            isHidden: false,
            isLocked: false
        }
    }
    async componentDidMount() {
        let url = `http://api.cc98.org/Board/${this.props.boardid}`;
        let managersResponse = await fetch(url);
        let managerJson = await managersResponse.json();
        this.setState({ listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters })
    }
    async componentWillRecieveProps(newProps) {

        let url = `http://api.cc98.org/Board/${newProps.boardid}`;
        let managersResponse = await fetch(url);
        let managerJson = await managersResponse.json();
        this.setState({ listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters })
    }
     generateMasters(item) {
         let name = item.toString();
         let userName = encodeURIComponent( item.toString());
         let webUrl = `/user/name/${userName}`;
         return <div style={{ marginRight:"10px" }}><a href={webUrl}>{name}</a></div>;
    }
    render() {
        return <div className="column" style={{ width: '1140px', }}>
            <div className="row" style={{ flexDirection: 'row', justifyContent: 'space-between', width: '1140px' }}>
                <div style={{ flexgrow: '1', flexDirection: 'row', display: 'flex' }}>
                    <div id="ListImg" ><img src={this.state.imgUrl}></img></div>
                    <div className="column" style={{ marginTop: '20px', marginLeft: '10px' }}>

                        <div className="row" style={{ marginTop: '10px' }}><div>今日主题</div><div style={{ marginLeft: "10px" }}>{this.state.todayTopics}</div></div>
                        <div className="row" style={{ marginTop: '10px' }}><div>总主题</div><div style={{ marginLeft: "20px" }}>{this.state.totalTopics}</div></div>
                    </div>
                </div>
                <div className="column" style={{ flexgrow: '0' }}>
                    <div id="like"><button style={{ border: 'none', color: '#F5FAFC' }}>✰</button>  收藏版面</div>
                    <div ><img src={this.state.adsUrl} style={{ width: '250px', height: '60px' }}></img></div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '5px' }}>
                <span>版主 : </span><div className="row" style={{ marginLeft: '5px' }}>{this.state.listManager.map(this.generateMasters)}</div>
            </div>
        </div>;

    }
}
export class ListNotice extends RouteComponent<{}, State.ListNoticeState, {}> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
        }
    }
    render() {
        return <div className="notice" style={{ marginTop: '10px' }}>
            <div id="noticeName">
                <span style={{ marginLeft: '15px', marginTop: '7px', color: '#FFFFFF' }}>本版公告</span>

            </div>
            <span style={{ marginLeft: '15px', marginTop: '15px', marginRight: '15px' }}>{this.state.notice}</span>
        </div>;
    }
}

/**
 * 提供显示连续页码的交互效果。
 */
export class ListButtonAndPager extends React.Component<{ boardid: number, page: number, totalPage: number }, { pager }> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        }
    }

	/**
	 * 将页码转换为 UI 界面。
	 * @param pageNumber 要转换的页码。
	 * @returns {JSX.Element} 页码对应的 UI 元素。
	 */
    generatePageLink(pageNumber: number) {
        return <PageModel pageNumber={pageNumber} boardid={this.props.boardid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }

    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    }
    render() {
        return <div className="row" style={{ width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: "20px" }}>
                <button className="button orange">发主题</button>
                <button className="button green" style={{ marginLeft: "20px" }}>发投票</button>
            </div>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ boardid: number, pageNumber: number, curPage: number, totalPage: number }, {}> {

    render() {
        let last = '<';
        let next = '>';
        let start = '<<';
        let end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = `/list/${this.props.boardid}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link to={pageUrl} className="page-link" >{this.props.pageNumber}</Link></li>
                    ;
            } else {
                return <li className="page-item active"><Link to={pageUrl} className="page-link " >{this.props.pageNumber}</Link></li>
                    ;
            }


        } else if (this.props.pageNumber == -1) {
            var pageUrl = `/list/${this.props.boardid}/${this.props.curPage - 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{last}</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            var pageUrl = `/list/${this.props.boardid}/${this.props.curPage + 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{next}</Link></li>
                ;
        }
        else if (this.props.pageNumber == -3) {
            var pageUrl = `/list/${this.props.boardid}/1`;
            return <li className="page-item"> <Link className="page-link" to={pageUrl}>{start}</Link></li>
                ;
        }
        else if (this.props.pageNumber == -4) {
            var pageUrl = `/list/${this.props.boardid}/${this.props.totalPage}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{end}</Link></li>
                ;
        }
    }
}
export class ListTag extends React.Component<{}> {

    render() {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '1140px', borderTop: 'dashed #EAEAEA thin', marginTop: '25px', marginBottom: '25px' }}>
            <div className="row">  <button id="tagButton">全部</button>
                <button className="chooseTag">dota <span className="tagNumber">1234</span></button>
                <button className="chooseTag">csgo <span className="tagNumber">5687</span ></button></div>
        </div >;
    }
}

export class ListContent extends RouteComponent<{}, { items: TopicTitleAndContentState[] }, { page: string, boardid: number }> {

    constructor() {
        super();

        this.state = { items: [] };

    }
    async componentDidMount() {
        const data = await Utility.getBoardTopicAsync(1, this.match.params.boardid);
        this.setState({ items: data });
    }
    private convertTopicToElement(item: TopicTitleAndContentState) {

        return <TopicTitleAndContent key={item.title}
            title={item.title}
            authorName={item.authorName}
            id={item.id}
            authorId={item.authorId} />;
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        let p = newProps.match.params.page;
        // 未提供页码，防止出错不进行后续处理
        if (!p) {
            page = 1;
        }
        // 转换类型
        else { page = parseInt(p); }
        const data = await Utility.getBoardTopicAsync(page, this.match.params.boardid);
        this.setState({ items: data });
    }


    render() {

        return <div className="listContent ">
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ height: '40px', marginTop: "5px", alignItems: "center" }}>
                    <button className="listContentTag">全部</button>
                    <button className="listContentTag">精华</button>
                    <button className="listContentTag">最热</button>
                </div>
                <div className="row" style={{ height: '40px', alignItems: 'center' }}>
                    <div style={{ marginRight: '152px', marginLeft: '15px' }}><span>作者</span></div>
                    <div style={{ marginRight: '85px', marginLeft: '15px' }}><span>最后发表</span></div>
                </div>
            </div>
            <div>{this.state.items.map(this.convertTopicToElement)}</div>
        </div>;

    }
}

export class TopicTitleAndContent extends React.Component<HotTopic, State.TopicTitleAndContentState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            title: this.props.title,
            authorName: this.props.authorName,
            likeNumber: 123,
            unlikeNumber: 11,
            commentNumber: 214,
            lastReply: 'Dearkano 2017-2-2',
            id: this.props.id,
            authorId: this.props.authorId
        }
    }
    render() {

        let url = `/topic/${this.state.id}`;
        return <div id="changeColor">
            <div className="row topicInList" >
                <Link to={url}><div style={{ marginLeft: '20px', }}> <span >{this.state.title}</span></div></Link>
                <div className="row">
                    <div style={{ marginRight: '10px', marginLeft: '15px', width: '80px' }}> <span ><a >{this.state.authorName}</a></span></div>
                    <div className="row" style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <div id="liked"><i className="fa fa-thumbs-o-up fa-lg"></i><span className="timeProp tagSize">{this.state.likeNumber}</span></div>
                        <div id="disliked"><i className="fa fa-thumbs-o-down fa-lg"></i><span className="timeProp tagSize">{this.state.unlikeNumber}</span></div>
                        <div id="commentsAmount"><i className="fa fa-commenting-o fa-lg"></i><span className="timeProp tagSize">{this.state.commentNumber}</span></div>
                    </div>
                    <div id="lastReply"><span >{this.state.lastReply}</span></div>
                </div>
            </div>
        </div>;
    }
}