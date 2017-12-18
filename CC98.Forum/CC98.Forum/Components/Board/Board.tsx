import * as React from 'react';
import { HotTopic } from '../../Props/AppProps'
import * as State from '../../States/AppState'
import * as Utility from '../../Utility'
import { UbbContainer } from '.././UbbContainer';
import { match } from 'react-router';
import {
    BrowserRouter as Router, 
    Route,
    Link,
    Switch
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
        this.setState({ boardInfo: boardInfo, boardId: this.match.params.boardId, fetchState: boardInfo });
    }
    render() {
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

        return  <div id="listRoot">

            <Category boardId={this.match.params.boardId} boardInfo={this.state.boardInfo} />
            <ListHead key={this.state.page} boardId={this.match.params.boardId} boardInfo={this.state.boardInfo} />
            <ListButtonAndAds boardInfo={this.state.boardInfo} adsUrl={null} />
            <Switch>
            <Route exact path="/list/:boardId/:page?" component={ListContent} />

            <Route exact path="/list/:boardId/best/:page?" component={ListBestContent} />
                <Route exact path="/list/:boardId/save/:page?" component={ListSaveContent} />
            </Switch>
        </div> ;
    }
}
/**
 
 */

export class Category extends React.Component<{ boardId, boardInfo }, {}>{
    render() {
        const listUrl = `/list/${this.props.boardId}`;
        return <div className="row" style={{ alignItems: "baseline", width: "100% ", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>          
            <a style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} href=" / ">首页</a>
            <i className="fa fa-chevron-right"></i>
            <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem" }} href={listUrl} >{this.props.boardInfo.name}</a>
        </div>;
    }
}
export class ListHead extends RouteComponent<{ boardId, boardInfo }, {}, { boardId }> {
    constructor(props, content) {
        super(props, content);
        const initFollow = Utility.isFollowThisBoard(this.props.boardId);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);       
    }
    async follow() {
        await Utility.followBoard(this.props.boardId);
        this.setState({ isFollow: true });
    }
    async unfollow() {
        await Utility.unfollowBoard(this.props.boardId);
        this.setState({ isFollow: false });
    }
    generateMasters(item) {
        const name = item.toString();
        const userName = encodeURIComponent(item.toString());
        const webUrl = `/user/name/${userName}`;
        return <div style={{ marginRight: '10px', fontSize: "0.75rem" }}><a style={{color:"#fff"}} href={webUrl}>{name}</a></div>;
    }
    render() {
        const url = `/images/_${this.props.boardInfo.name}.png`
        return <div className="row" style={{width:"100%"}}>
            <div className="boardMessage">
                <div className="row" style={{ height: "4rem", marginTop: "1.25rem" }}>
                    <img style={{ marginLeft:"1.25rem"}}src={url}></img>
                    <div className="boardMessageDetails">
                        <div className="row" style={{width:"100%"}}>
                            {this.props.boardInfo.name}
                        </div>
                        <div className="row" style={{ width: "100%", alignItems:"center" }}>
                        <div style={{ fontSize:"0.75rem",width:"4.5rem"}}>
                            {this.props.boardInfo.todayCount}/{this.props.boardInfo.topicCount}
                            </div>
                            <div className="boardFollow"onClick={this.props.boardInfo.isFollow ? this.unfollow : this.follow} >{this.props.boardInfo.isFollow ? "已关注" : "关注"} </div>
                        </div>
                    </div>
                </div>
                <div className="boardDescription">
                    <div>版面简介</div>
                    <div>{this.props.boardInfo.description}</div>
                </div>
                <div className="boardMasters">
                    <div>版主</div>
                    <div>{this.props.boardInfo.boardMasters.map(this.generateMasters)}</div>
                </div>
            </div>
            <div className="bigPaper" >
                <div className="bigPaperTitle">版面公告</div>
                <div><UbbContainer code={this.props.boardInfo.bigPaper} /></div>
            </div>
         </div>;

    }
}


/**
 * 提供显示连续页码的交互效果。
 */
export class ListTagAndPager extends React.Component<{ url:string,boardid: number, page: number, totalPage: number,tag }, { pager }> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
    }

    generateTagLayer(item) {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", borderTop: 'dashed #EAEAEA thin', marginBottom: "0.5rem" }}>
            <div className="row">  <button id="tagButton">全部</button>
                {item.tags.map(this.generateTagButton)}
            </div>
        </div >;
    }
    generateTagButton(item) {
        return <button className="chooseTag">{item}<span className="tagNumber"></span></button>;
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
        
        return <div className="row" style={{ width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div >
                {this.props.tag.map(this.generateTagLayer.bind(this))}            
            </div>
            <Pager page={this.props.page} url={this.props.url} totalPage={this.props.totalPage} />
        </div>;
    }
}


export class ListButtonAndAds extends React.Component<{boardInfo,adsUrl}> {
    
 
    render() {
        const adsUrl = `/images/ads.jpg`;
        const createTopicUrl = `/editor/post/${this.props.boardInfo.id}`;
        return <div className="row" style={{ width: "100%", height: "6.25rem", alignItems: "flex-end", justifyContent: "space-between", marginTop:"1rem" }}>
            <Link className="button bgcolor" to={createTopicUrl}>发主题</Link>
            <div><img style={{ width: "18.75rem", height: "6.25rem" }} src={adsUrl}></img></div>
        </div>;
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
        const normalTopicsUrl = `/list/${this.match.params.boardId}/`;
        return <div className="listContent ">
            <ListTagAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={normalTopicsUrl} tag={this.state.tags} />
            <div className="column" style={{width:"100%"}}>
                <div className="row" style={{ justifyContent: 'space-between', backgroundColor:"#79b8ca",color:"#fff"  }}>
                    <div className="row" style={{ alignItems: 'center'}} >

                    <div className="listContentTag">全部</div>
                    <div className="listContentTag"><Link to={bestTopicsUrl}>精华</Link></div>
                    <div className="listContentTag"><Link to={saveTopicsUrl}>保存</Link></div>
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
        const normalTopicsUrl = `/list/${this.match.params.boardId}/`;
        return <div className="listContent ">
            <ListTagAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={bestTopicsUrl} tag={this.state.tags} />
        
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag"><Link to={normalTopicsUrl} >全部</Link></div>
                    <div className="listContentTag">精华</div>
                    <div className="listContentTag"><Link to={saveTopicsUrl}>保存</Link></div>
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
        console.log(this.state.items);
        const topics = this.state.items.map(this.convertTopicToElement);
        const bestTopicsUrl = `/list/${this.match.params.boardId}/best/`;
        const saveTopicsUrl = `/list/${this.match.params.boardId}/save/`;
        const normalTopicsUrl = `/list/${this.match.params.boardId}/`;
        return <div className="listContent ">
            <ListTagAndPager page={curPage} totalPage={this.state.totalPage} boardid={this.match.params.boardId} url={saveTopicsUrl} tag={this.state.tags} />
            <div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag"><Link to={normalTopicsUrl} >全部</Link></div>
                    <div className="listContentTag">精华</div>
                    <div className="listContentTag"><Link to={saveTopicsUrl}>保存</Link></div>
                </div>
                <div className="row" style={{ alignItems: 'center' }}>
                    <div style={{ marginRight: '19.3rem' }}><span>作者</span></div>
                    <div style={{ marginRight: '7.6875rem' }}><span>最后回复</span></div>
                </div>
            </div>
            {topTopics}
            <div>{topics}</div>
            <Pager page={curPage} totalPage={this.state.totalPage} url={saveTopicsUrl} />
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
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start" }}><i style={{ color: "#B0B0B0" }} className="fa fa-envelope fa-lg"></i></div>
        } else if (this.props.topState === 2) {
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start"
            }}><i style={{ color: "orange" }} className="fa fa-chevron-circle-up fa-lg"></i></div>
        } else if (this.props.topState === 4) {
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start"
            }}><i style={{ color: "red" }} className="fa fa-arrow-circle-up fa-lg"></i></div>
        }
        if (this.props.replyCount > 100 && this.props.topState === 0) {
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start"
            }}><i style={{ color: "red" }} className="fa fa-envelope-open fa-lg"></i></div>
        }
        let curName;
        if (Utility.getLocalStorage("userInfo"))
            curName = Utility.getLocalStorage("userInfo").name;
        else
            curName = "";
        if (curName === this.props.userName) {
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start"
            }}><i style={{ color: "#FFC90E" }} className="fa fa-envelope fa-lg"></i></div>
        }
        //1是锁贴
        if (this.props.state === 1) {
            icon = <div style={{
                width: "1rem", justifyContent: "flex-start"
            }}><i style={{ color: "#B0B0B0" }} className="fa fa-lock fa-lg"></i></div>
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
                    <div style={{
                        display: "flex", marginLeft: "0.5rem", alignItems: "flex-end", overflow: "hidden",
                        textOverflow: "ellipsis",whiteSpace: "nowrap",maxWidth:"48%" }}>
                    <div className="row" style={{ alignItems: "center" }}>
                    {icon}
                       <div className="listTitle" id={titleId} style={{ marginLeft: '1rem', }}> <span>{this.props.title}</span></div>
                        </div>
                    <div style={{ display: "flex", fontSize: "0.75rem",marginLeft:"1rem" ,width:"auto"}}>
                        {this.state.pager.map(this.generateListPager.bind(this))}</div>
                </div>
                <div className="row" style={{ width: "50%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "-4px" }}>

                    <div style={{ width: "7.5rem", textAlign: "left" }}> <span ><a >{this.props.userName || '匿名'}</a></span></div>

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