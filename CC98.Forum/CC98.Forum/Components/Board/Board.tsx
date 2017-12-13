import * as React from 'react';
import { HotTopic } from '../../Props/AppProps'
import * as State from '../../States/AppState'
import * as Utility from '../../Utility'
import { UbbContainer } from '.././UbbContainer';
import { match } from 'react-router';
import {
    BrowserRouter as Router, 
    Route,
    Link
} from 'react-router-dom';
import TopicTitleAndContentState = State.TopicTitleAndContentState;
import { Pager } from '../Pager';
import { NotFoundTopic, UnauthorizedTopic, UnauthorizedBoard, ServerError } from '../Status';
declare let moment: any;

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class List extends RouteComponent<{}, { page:number, boardId: number,boardInfo,fetchState}, { boardId: number }>  {

    constructor(props, context) {
        super(props, context);

        // 默认页码
        this.state = {
            boardId: null, boardInfo: { bigPaper: "", masters: [], name: "" }, page: 1, fetchState:'ok'
        };
    }
  
    async componentWillReceiveProps(newProps) {

        const boardInfo = await Utility.getBoardInfo(newProps.match.params.boardId);

        // 设置状态
        this.setState({ boardInfo: boardInfo, boardId: this.match.params.boardId });
    }
    async componentWillMount() {

        const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
        // 设置状态
        console.log(boardInfo);
        this.setState({ boardInfo: boardInfo, boardId: this.match.params.boardId, fetchState: boardInfo });
    }
    render() {
        console.log(this.state.fetchState);
        switch (this.state.fetchState) {
            case 'ok':
                return <div></div>;
            case 'not found':
                return <NotFoundTopic />;
            case 'unauthorized':
                return <UnauthorizedBoard />;
            case 'server error':
                return <ServerError />
        }
        let bigPaper;
        if (!this.state.boardInfo.bigPaper) {
            bigPaper = null;
        } else {
            bigPaper = <ListNotice bigPaper={this.state.boardInfo.bigPaper} />;
        }
        return  <div id="listRoot">

            <Category boardId={this.match.params.boardId} boardInfo={this.state.boardInfo} />
            <ListHead key={this.state.page} boardId={this.match.params.boardId} />
            {bigPaper}
      

            <Route exact path="/list/:boardId/normal/:page?" component={ListContent} />

            <Route exact path="/list/:boardId/best/:page?" component={ListBestContent} />
                <Route exact path="/list/:boardId/save/:page?" component={ListSaveContent} />
        </div> ;
    }
}
/**
 
 */

export class Category extends React.Component<{ boardId, boardInfo }, {}>{
    //<i className="fa fa-window-maximize fa-lg"></i> 这是之前导航中的首页图标，因为不好看暂时去掉了
    //fa-lg, fa-2x, fa-3x, fa-4x, fa-5x 分别是将icon扩大到原来的133%, 2倍，3倍，4倍和5倍
    render() {
        const listUrl = `/list/${this.props.boardId}`;
        return <div className="row" style={{ alignItems: "baseline", width: "100% ", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>          
            <a style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} href=" / ">首页</a>
            <i className="fa fa-chevron-right"></i>
            <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem" }} href={listUrl} >{this.props.boardInfo.name}</a>
        </div>;
    }
}
export class ListHead extends RouteComponent<{ boardId }, State.ListHeadState, { boardId }> {
    constructor(props, content) {
        super(props, content);
        const initFollow = Utility.isFollowThisBoard(this.props.boardId);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
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
            isLocked: false,
            isFollow: initFollow
        };
    }
    async follow() {
        await Utility.followBoard(this.props.boardId);
        this.setState({ isFollow: true });
    }
    async unfollow() {
        await Utility.unfollowBoard(this.props.boardId);
        this.setState({ isFollow: false });
    }
    async componentDidMount() {
        const data = await Utility.getBoardInfo(this.props.boardId );
        this.setState({
            listName: data.name, todayTopics: data.todayCount, totalTopics: data.topicCount, listManager: data.boardMasters
        });
    }
    async componentWillRecieveProps(newProps) {
        const data = await Utility.getBoardInfo(newProps.boardId);
        this.setState({
            listName: data.name, todayTopics: data.todayCount, totalTopics: data.topicCount, listManager: data.boardMasters
        });
    }
    generateMasters(item) {
        const name = item.toString();
        const userName = encodeURIComponent(item.toString());
        const webUrl = `/user/name/${userName}`;
        return <div style={{ marginRight: '10px' }}><a href={webUrl}>{name}</a></div>;
    }
    render() {
        return <div className="column" style={{ width: "100%" }} >
            <div className="row" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ flexgrow: '1', flexDirection: 'row', display: 'flex' }}>
                    <div id="ListImg" ><img src={this.state.imgUrl}></img></div>
                    <div className="column" style={{ marginTop: '1.25rem', marginLeft: '0.625rem' }}>

                        <div className="row" style={{ marginTop: '0.625rem' }}><div>今日主题</div><div style={{ marginLeft: '0.625rem' }}>{this.state.todayTopics}</div></div>
                        <div className="row" style={{ marginTop: '0.625rem' }}><div>总主题</div><div style={{ marginLeft: '1.25rem' }}>{this.state.totalTopics}</div></div>
                    </div>
                </div>
                <div className="column" style={{ flexgrow: '0' }}>
                    <div id="like"><button onClick={this.state.isFollow ? this.unfollow : this.follow} className="followBoard">{this.state.isFollow?"取消关注":"关注版面"}</button>  </div>
                    <div ><img src={this.state.adsUrl} style={{ width: '15.625rem', height: '3.75rem' }}></img></div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '0.3125rem' }}>
                <span>版主 : </span><div className="row" style={{ marginLeft: '0.3125rem' }}>{this.state.listManager.map(this.generateMasters)}</div>
            </div>
        </div>;

    }
}
export class ListNotice extends RouteComponent<{ bigPaper: string }, State.ListNoticeState, {}> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
        };
    }
    render() {
        return <div className="notice" style={{ marginTop: '0.625rem' }}>
            <div style={{ backgroundColor: "#3399FE" }}>
                <div style={{ marginLeft: '0.9375rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1rem', color: '#FFFFFF' }}>本版公告</div>
            </div>
            <div className="substance"><UbbContainer code={this.props.bigPaper} /></div>
        </div>;
    }
}

/**
 * 提供显示连续页码的交互效果。
 */
export class ListButtonAndPager extends React.Component<{ url:string,boardid: number, page: number, totalPage: number }, { pager }> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
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
        const createTopicUrl = `/createTopic/${this.props.boardid}`;
        return <div className="row" style={{ width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: '1.25rem' }}>
                <Link className="button orange" to={createTopicUrl}>发主题</Link>
                <button className="button green" style={{ marginLeft: '1.25rem' }}>发投票</button>
            </div>
            <Pager page={this.props.page} url={this.props.url} totalPage={this.props.totalPage} />
        </div>;
    }
}


export class ListTag extends React.Component<{tags}> {
    generateTagLayer(item) {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", borderTop: 'dashed #EAEAEA thin', marginTop: '1.5625rem', marginBottom: '25px' }}>
            <div className="row">  <button id="tagButton">全部</button>    
                {item.tags.map(this.generateTagButton)}
            </div>
        </div >;
    }
    generateTagButton(item) {
        return <button className="chooseTag">{item}<span className="tagNumber"></span></button>;
    }
    render() {
        return <div className="column" style={{ width: "100%" }}>{this.props.tags.map(this.generateTagLayer.bind(this))}</div>;
    }
}
export class ListTopContent extends React.Component<{ boardId }, { data }>{
    constructor(props, context) {
        super(props, context);
        this.state = { data: [] };
    }
    private convertTopicToElement(item: TopicTitleAndContentState) {
        return <TopicTitleAndContent key={item.id}
            title={item.title}
            userName={item.userName}
            id={item.id}
            userId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUser={item.lastPostUser}
            likeCount={item.likeCount}
            dislikeCount={item.dislikeCount}
            replyCount={item.replyCount}
            highlightInfo={item.highlightInfo}
            topState={item.topState}
            state={item.state}
            hitCount={item.hitCount}
        />;
    }
    async componentDidMount() {
        const data = await Utility.GetTopTopics(this.props.boardId);
        this.setState({ data: data });
    }
    render() {
        return <div>{this.state.data.map(this.convertTopicToElement)}</div>;
    }
}
export class BestTopics extends React.Component<{ boardId, curPage }, { data }>{
    constructor(props) {
        super(props);
        this.state = ({ data: [] });
    }
    async componentDidMount() {
        const data = await Utility.getBestTopics(this.props.boardId, this.props.curPage);
        this.setState({ data: data });
    }
    private convertTopicToElement(item: TopicTitleAndContentState) {

        return <TopicTitleAndContent key={item.id}
            title={item.title}
            userName={item.userName}
            id={item.id}
            userId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUser={item.lastPostUser}
            likeCount={item.likeCount}
            dislikeCount={item.dislikeCount}
            replyCount={item.replyCount}
            highlightInfo={item.highlightInfo}
            topState={item.topState}
            state={item.state}
            hitCount={item.hitCount}
        />;
    }
    render() {
        return <div>{this.state.data.map(this.convertTopicToElement)}</div>;
    }
}
export class ListContent extends RouteComponent<{}, { items,totalPage:number,boardInfo,tags,fetchState}, { page: string, boardId: number }> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [], totalPage: 0, boardInfo: { masters: [], topicCount: 1 }, fetchState:"ok",tags:[]
        };
    }
    async componentDidMount() {
        const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
        const data = await Utility.getBoardTopicAsync(1, this.match.params.boardId, boardInfo.topicCount);
        const totalPage = this.getTotalListPage(boardInfo.topicCount);
        const tags = await Utility.getBoardTag(this.match.params.boardId);
        this.setState({ items: data, totalPage: totalPage, boardInfo: boardInfo ,fetchState:data,tags:tags});
    }
    private convertTopicToElement(item) {

        return <TopicTitleAndContent key={item.id}
            title={item.title}
            userName={item.userName}
            id={item.id}
            userId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUser={item.lastPostUser}
            likeCount={item.likeCount}
            dislikeCount={item.dislikeCount}
            replyCount={item.replyCount}
            highlightInfo={item.highlightInfo}
            topState={item.topState}
            state={item.state}
            hitCount={item.hitCount}
        />;
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        const p = newProps.match.params.page;
        // 未提供页码，防止出错不进行后续处理
        if (!p) {
            page = 1;
        }
        
        // 转换类型
        else { page = parseInt(p); }
        const boardInfo = await Utility.getBoardInfo(this.match.params.boardId);
        const totalPage = this.getTotalListPage(this.state.boardInfo.topicCount);
        const data = await Utility.getBoardTopicAsync(page, newProps.match.params.boardId, boardInfo.topicCount);
        this.setState({ items: data,totalPage:totalPage});
    }

     getTotalListPage(count) {
        const page =  Utility.getListTotalPage(count);
        return page;
    }
    render() {
    
        const curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        let topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = <div><ListTopContent boardId={this.match.params.boardId} /></div>;
        }
        const topics = this.state.items.map(this.convertTopicToElement);
     
        const bestTopicsUrl = `/list/${this.match.params.boardId}/best/`;
        const saveTopicsUrl = `/list/${this.match.params.boardId}/save/`;
        const normalTopicsUrl = `/list/${this.match.params.boardId}/normal/`;
        return <div className="listContent ">
            <ListButtonAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={normalTopicsUrl} />
            <ListTag tags={this.state.tags} />
            <div className="column" style={{width:"100%",border:"#eaeaea solid thin"}}>
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag">全部</div>
                    <div className="listContentTag"><a href={bestTopicsUrl}>精华</a></div>
                    <div className="listContentTag"><a href={saveTopicsUrl}>保存</a></div>
                </div>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div style={{ marginRight: '19.3rem' }}><span>作者</span></div>
                    <div style={{ marginRight: '7.6875rem' }}><span>最后回复</span></div>
                </div>
            </div>
            {topTopics}
                <div>{topics}</div>
                </div>
            <Pager page={curPage} totalPage={this.state.totalPage}  url={normalTopicsUrl} />
        </div>;

    }
}
export class ListBestContent extends RouteComponent<{}, { items: TopicTitleAndContentState[], totalPage: number,tags }, { page: string, boardId: number }> {
    constructor(props, context) {
        super(props, context);
        this.state = { items: [], totalPage: 0,tags:[] };
    }
    async componentDidMount() {
        const data = await Utility.getBestTopics( 1,this.match.params.boardId);
        const tags = await Utility.getBoardTag(this.match.params.boardId);
        const totalPage = data.totalPage;
        this.setState({
            items: data.boardtopics, totalPage: totalPage,tags:tags
        });;
    }
    private convertTopicToElement(item: TopicTitleAndContentState) {

        return <TopicTitleAndContent key={item.id}
            title={item.title}
            userName={item.userName}
            id={item.id}
            userId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUser={item.lastPostUser}
            likeCount={item.likeCount}
            dislikeCount={item.dislikeCount}
            replyCount={item.replyCount}
            highlightInfo={item.highlightInfo}
            topState={item.topState}
            state={item.state}
            hitCount={item.hitCount}
        />;
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        const p = newProps.match.params.page;
        // 未提供页码，防止出错不进行后续处理
        if (!p) {
            page = 1;
        }
        // 转换类型
        else { page = parseInt(p); }
        const data = await Utility.getBestTopics(page, newProps.match.params.boardId);
        const totalPage = data.totalPage;
        this.setState({
            items: data.boardtopics, totalPage: totalPage
        });
    }
    render() {
        const curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        let topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = <div><ListTopContent boardId={this.match.params.boardId} /></div>;
        }
        const topics = this.state.items.map(this.convertTopicToElement);
        const bestTopicsUrl = `/list/${this.match.params.boardId}/best/`;
        const saveTopicsUrl = `/list/${this.match.params.boardId}/save/`;
        const normalTopicsUrl = `/list/${this.match.params.boardId}/normal/`;
        return <div className="listContent ">
            <ListButtonAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={bestTopicsUrl} />
            <ListTag tags={this.state.tags} />
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag"><a href={normalTopicsUrl} >全部</a></div>
                    <div className="listContentTag">精华</div>
                    <div className="listContentTag"><a href={saveTopicsUrl}>保存</a></div>
                </div>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div style={{ marginRight: '19.3rem' }}><span>作者</span></div>
                    <div style={{ marginRight: '7.6875rem' }}><span>最后回复</span></div>
                </div>
            </div>
            {topTopics}
            <div>{topics}</div>
            <Pager page={curPage} totalPage={this.state.totalPage}  url={bestTopicsUrl} />
        </div>;

    }
} export class ListSaveContent extends RouteComponent<{}, { items: TopicTitleAndContentState[], totalPage: number,tags }, { page: string, boardId: number }> {
    constructor(props, context) {
        super(props, context);
        this.state = { items: [], totalPage: 0,tags:[] };
    }
    async componentDidMount() {
        const data = await Utility.getSaveTopics(1, this.match.params.boardId);
        const totalPage = data.totalPage;
        const tags = await Utility.getBoardTag(this.match.params.boardId);
        this.setState({ items: data.boardtopics, totalPage: totalPage,tags:tags });
    }
    private convertTopicToElement(item: TopicTitleAndContentState) {

        return <TopicTitleAndContent key={item.id}
            title={item.title}
            userName={item.userName}
            id={item.id}
            userId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUser={item.lastPostUser}
            likeCount={item.likeCount}
            dislikeCount={item.dislikeCount}
            replyCount={item.replyCount}
            highlightInfo={item.highlightInfo}
            topState={item.topState}
            state={item.state}
            hitCount={item.hitCount}
        />;
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        const p = newProps.match.params.page;
        // 未提供页码，防止出错不进行后续处理
        if (!p) {
            page = 1;
        }
        // 转换类型
        else { page = parseInt(p); }
        const data = await Utility.getSaveTopics(page, newProps.match.params.boardId);
        this.setState({ items: data.boardtopics });
    }
    render() {
        const curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        let topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = <div><ListTopContent boardId={this.match.params.boardId} /></div>;
        }
        const topics = this.state.items.map(this.convertTopicToElement);
        const bestTopicsUrl = `/list/${this.match.params.boardId}/best/`;
        const saveTopicsUrl = `/list/${this.match.params.boardId}/save/`;
        const normalTopicsUrl = `/list/${this.match.params.boardId}/normal/`;
        return <div className="listContent ">
            <ListButtonAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={normalTopicsUrl} />
            <ListTag tags={this.state.tags} />
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="column" style={{ width: "100%" }} id="boardTopics">
                <div className="row" style={{ alignItems: 'center' }} >
                    <div className="listContentTag"><a href={normalTopicsUrl}>全部</a></div>
                    <div className="listContentTag"><a href={bestTopicsUrl}>精华</a></div>
                    <div className="listContentTag">保存</div>
                </div>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div style={{ marginRight: '19.3rem' }}><span>作者</span></div>
                    <div style={{ marginRight: '7.6875rem' }}><span>最后回复</span></div>
                </div>
            </div>
            {topTopics}
                <div>{topics}</div>
                </div>
            <Pager page={curPage} totalPage={this.state.totalPage}  url={normalTopicsUrl} />
        </div>;

    }
}

export class TopicTitleAndContent extends React.Component<State.TopicTitleAndContentState, { pager }> {

    constructor(props, context) {
        super(props, context);
        this.state = ({ pager: [] });
    }
    componentWillMount() {
        const count = this.props.replyCount+1 ;
        let totalPage = count/10===0?count/10:(count - count % 10) / 10 + 1;
        const pager = Utility.getListPager(totalPage);
        const titleId = `#title${this.props.id}`;
        this.setState({ pager: pager });
    }
    componentDidMount() {
        const titleId = `#title${this.props.id}`;
        if (this.props.highlightInfo != null) {
            if (this.props.highlightInfo.isBold == true) {
                $(titleId).css("font-weight", "bold");
            }
            if (this.props.highlightInfo.isItalic == true) {
                $(titleId).css("font-style", "italic");
            }
            if (this.props.highlightInfo.color != null) {
                $(titleId).css("color", this.props.highlightInfo.color);
            }
        }
    }
    generateListPager(item: number) {
        console.log("listpage=" + item);
        const url = `/topic/${this.props.id}/${item}`;
        if (item != -1) {
            return <div style={{ marginRight: "0.3rem" }}><Link style={{ color: "red" }} to={url}>{item}</Link></div>;
        } else {
            return <div style={{ marginRight: "0.3rem" }}>...</div>;
        }
    }
    render() {
        let colorId;
        if (this.props.topState === 0) {
            colorId = "changeColor";
        } else {
            colorId = "changeTopColor";
        }
        const topicId = `topic${this.props.id}`;
        let url = `/topic/${this.props.id}`;
        const titleId = `title${this.props.id}`;
        let icon;
        if (this.props.topState === 0) {
            icon = <i style={{ color: "#B0B0B0" }} className="fa fa-envelope fa-lg"></i>
        } else if (this.props.topState === 2) {
            icon = <i style={{ color: "orange" }} className="fa fa-chevron-circle-up fa-lg"></i>
        } else if (this.props.topState === 4) {
            icon = <i style={{ color: "red" }} className="fa fa-arrow-circle-up fa-lg"></i>
        }
        if (this.props.replyCount > 100 && this.props.topState === 0) {
            icon = <i style={{ color: "red" }} className="fa fa-envelope-open fa-lg"></i>
        }
        let curName;
        if (Utility.getLocalStorage("userInfo"))
            curName = Utility.getLocalStorage("userInfo").name;
        else
            curName = "";
        if (curName === this.props.userName) {
            icon = <i style={{ color: "#FFC90E" }} className="fa fa-envelope fa-lg"></i>
        }
        //1是锁贴
        if (this.props.state === 1) {
            icon = <i style={{ color: "#B0B0B0" }} className="fa fa-lock fa-lg"></i>
        }
        let hitCount: any = this.props.hitCount;
        if (this.props.hitCount > 100000) {
            hitCount = ((this.props.hitCount - this.props.hitCount % 10000) / 10000).toString() + '万';
        } else if (this.props.hitCount > 10000) {
            hitCount = (this.props.hitCount / 10000).toFixed(1).toString() + '万';
        }
        return <div id={colorId}>
            <Link to={url}>
            <div className="row topicInList" id={topicId}> 
                <div style={{ display: "flex", marginLeft: "0.5rem", alignItems: "flex-end" }}>
                    <div className="row" style={{ alignItems: "center" }}>
                    {icon}
                       <div className="listTitle" id={titleId} style={{ marginLeft: '0.5rem', }}> {this.props.title}</div>
                        </div>
                    <div style={{ display: "flex", fontSize: "0.75rem",marginLeft:"1rem" }}>
                        {this.state.pager.map(this.generateListPager.bind(this))}</div>
                </div>
                <div className="row" style={{ width: "50%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "-4px" }}>

                    <div style={{ width: "8rem", textAlign: "center" }}> <span ><a >{this.props.userName || '匿名'}</a></span></div>

                    <div className="row" style={{ width: "10rem" }}>

                        <div id="liked" style={{ display: "flex", width: "2rem" }}><i className="fa fa-thumbs-o-up fa-lg"></i><span className="timeProp tagSize">{this.props.likeCount}</span></div>

                        <div id="disliked" style={{ display: "flex", width: "4.5rem" }}><i className="fa fa-eye fa-lg"></i><span className="timeProp tagSize">{hitCount}</span></div>

                        <div id="commentsAmount" style={{ display: "flex", width: "3.5rem" }}><i className="fa fa-commenting-o fa-lg"></i><span className="timeProp tagSize">{this.props.replyCount}</span></div>

                    </div>

                    <div id="lastReply" style={{ width: "8rem", textAlign: "center" }}><div>{this.props.lastPostUser} </div></div>

                    <div style={{ width: "12rem", textAlign: "center" }}><div style={{ wordBreak: "keepAll" }}>{moment(this.props.lastPostTime).format('YY-MM-DD HH:mm')}</div></div>

                </div>

            </div>
                </Link>
        </div>;

    }

}