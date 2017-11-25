import * as React from 'react';
import { HotTopic } from '../Props/AppProps'
import * as State from '../States/AppState'
import * as Utility from '../Utility'
import { UbbContainer } from './UbbContainer';
import { match } from 'react-router';
import {
	Route,
	Link
} from 'react-router-dom';
import TopicTitleAndContentState = State.TopicTitleAndContentState;
declare let moment: any;

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

	constructor(props?, context?) {
		super(props, context);
	}
	get match(): match<TMatch> {
		return (this.props as any).match;
	}
}

export class List extends RouteComponent<{}, {bigPaper:string, page: number, totalPage: number, boardId: number }, { page: string, boardId: number }>  {

	constructor(props, context) {
		super(props, context);

        // 默认页码
        this.state = { page: 1, totalPage: 1, boardId: null, bigPaper:"" };
	}
    async getTotalListPage(boardId) {
        const page = await Utility.getListTotalPage(boardId, this.context.router);
        return page;
	}
    async componentWillReceiveProps(newProps) {

        const data = await Utility.getBasicBoardMessage(newProps.match.params.boardId, newProps.match.params.page, this.context.router);
     
        // 设置状态
        this.setState({ bigPaper: data.bigPaper, page: data.page, totalPage: data.totalPage, boardId: newProps.match.params.boardId });
	}
    async componentDidMount() {
   
        const data = await Utility.getBasicBoardMessage(this.match.params.boardId, this.match.params.page, this.context.router);
        // 设置状态
        this.setState({ bigPaper: data.bigPaper, page: data.page, totalPage: data.totalPage, boardId: this.match.params.boardId });
	}
	render() {
        return <div id="listRoot">
            <Category boardId={this.match.params.boardId} />
            <ListHead key={this.state.page} boardId={this.match.params.boardId} />
            <ListNotice bigPaper={this.state.bigPaper} />
			<ListButtonAndPager page={this.state.page} totalPage={this.state.totalPage} boardid={this.state.boardId} />
            <ListTag />
        
            <Route path="/list/:boardId/:page?" component={ListContent} />
            <PagerDown page={this.state.page} totalPage={this.state.totalPage} boardid={this.state.boardId}/>
		</div>;
	}
}
export class Category extends RouteComponent<{boardId }, { boardId, boardName }, {boardId,page}>{
    constructor(props) {
        super(props);
        this.state = ({ boardId: "",boardName: "" });
    }
    async componentDidMount() {
  
        const boardName = await Utility.getListCategory(this.props.boardId, this.context.router);
        this.setState({ boardId: this.props.boardId, boardName: boardName });
    }
    render() {
        const listUrl = `/list/${this.state.boardId}`;
        return <div className="row" style={{width:"100%", justifyContent: "flex-start", color: "blue", fontSize: "0.75rem" }}>&rsaquo;&rsaquo;<a style={{ color: "blue", fontSize: "0.75rem" }} href="/">首页</a>&nbsp;→&nbsp;<a style={{ color: "blue", fontSize: "0.75rem" }} href={listUrl} >{this.state.boardName}</a></div>;
    }
}
export class ListHead extends RouteComponent<{ boardId }, State.ListHeadState, {boardId}> {
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
		};
	}
    async componentDidMount() {
        const data = await Utility.getBoardMessage(this.props.boardId, this.context.router);
		this.setState({
			listName: data.name, todayTopics: data.todayCount, totalTopics: data.topicCount, listManager: data.boardMasters
		});
	}
    async componentWillRecieveProps(newProps) {
        const data = await Utility.getBoardMessage(newProps.boardId, this.context.router);
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
        return <div className="column" style={{width:"100%"}} >
			<div className="row" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<div style={{ flexgrow: '1', flexDirection: 'row', display: 'flex' }}>
					<div id="ListImg" ><img src={this.state.imgUrl}></img></div>
					<div className="column" style={{ marginTop: '1.25rem', marginLeft: '0.625rempx' }}>

						<div className="row" style={{ marginTop: '0.625rem' }}><div>今日主题</div><div style={{ marginLeft: '0.625rem' }}>{this.state.todayTopics}</div></div>
						<div className="row" style={{ marginTop: '0.625rem' }}><div>总主题</div><div style={{ marginLeft: '1.25rem' }}>{this.state.totalTopics}</div></div>
					</div>
				</div>
				<div className="column" style={{ flexgrow: '0' }}>
					<div id="like"><button style={{ border: 'none', color: '#F5FAFC' }}>✰</button>  收藏版面</div>
					<div ><img src={this.state.adsUrl} style={{ width: '15.625rem', height: '3.75rem' }}></img></div>
				</div>
			</div>
			<div className="row" style={{ marginTop: '0.3125rem' }}>
				<span>版主 : </span><div className="row" style={{ marginLeft: '0.3125rem' }}>{this.state.listManager.map(this.generateMasters)}</div>
			</div>
		</div>;

	}
}
export class ListNotice extends RouteComponent<{bigPaper:string}, State.ListNoticeState, {}> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
		};
	}
	render() {
        return <div className="notice" style={{ marginTop: '0.625rem' }}>
            <div style={{ backgroundColor:"#3399FE" }}>
				<div style={{ marginLeft: '0.9375rem', marginTop:'0.5rem',marginBottom:'0.5rem',fontSize:'1rem',color: '#FFFFFF' }}>本版公告</div>
            </div>
            <div className="substance"><UbbContainer code={this.props.bigPaper} /></div>
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
		};
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
        const createTopicUrl = `/createTopic/${this.props.boardid}`;
        return <div className="row" style={{ width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem",marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: '1.25rem' }}>
                <Link className="button orange" to={createTopicUrl}>发主题</Link>
				<button className="button green" style={{ marginLeft: '1.25rem' }}>发投票</button>
			</div>
			<div id="pager" >
				<div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
			</div>
		</div>;
	}
}
export class PagerDown extends React.Component<{ boardid: number, page: number, totalPage: number }, { pager }> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
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
        return <div className="row" style={{ width: '100%',  marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ boardid: number, pageNumber: number, curPage: number, totalPage: number }, {}> {

	render() {
		let pageUrl: string;
		if (this.props.pageNumber > 0) {
			pageUrl = `/list/${this.props.boardid}/${this.props.pageNumber}`;
			if (this.props.pageNumber !== this.props.curPage) {
				return <li className="page-item"><Link to={pageUrl} className="page-link" >{this.props.pageNumber}</Link></li>
					;
			} else {
				return <li className="page-item active"><Link to={pageUrl} className="page-link " >{this.props
					.pageNumber}</Link></li>
					;
			}


		} else if (this.props.pageNumber == -1) {
			pageUrl = `/list/${this.props.boardid}/${this.props.curPage - 1}`;
			return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;</Link></li>
				;
		} else if (this.props.pageNumber == -2) {
			pageUrl = `/list/${this.props.boardid}/${this.props.curPage + 1}`;
			return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;</Link></li>
				;
		}
		else if (this.props.pageNumber == -3) {
			pageUrl = `/list/${this.props.boardid}/1`;
			return <li className="page-item"> <Link className="page-link" to={pageUrl}>&laquo;</Link></li>
				;
		}
		else if (this.props.pageNumber == -4) {
			pageUrl = `/list/${this.props.boardid}/${this.props.totalPage}`;
			return <li className="page-item"><Link className="page-link" to={pageUrl}>&raquo;</Link></li>
				;
		}
	}
}
export class ListTag extends React.Component<{}> {

    render() {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: "0.3125rem", marginRight:"0.3125rem", borderTop: 'dashed #EAEAEA thin', marginTop: '1.5625rem', marginBottom: '25px' }}>
			<div className="row">  <button id="tagButton">全部</button>
				<button className="chooseTag">dota <span className="tagNumber">1234</span></button>
				<button className="chooseTag">csgo <span className="tagNumber">5687</span ></button></div>
		</div >;
	}
}
export class ListTopContent extends React.Component<{boardId}, {data}>{
    constructor(props, context) {
        super(props,context);
        this.state = { data:[]};
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
        />;
    }
    async componentDidMount() {
        const data =await Utility.GetTopTopics(this.props.boardId);
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
        const data = await Utility.GetBestTopics(this.props.boardId, this.props.curPage);
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
        />;
    }
    render() {
        return <div>{this.state.data.map(this.convertTopicToElement)}</div>;
    }
}
export class ListContent extends RouteComponent<{}, {class:number, items: TopicTitleAndContentState[] }, { page: string, boardId: number }> {
    //class 0全部 1精华 2保存
	constructor(props,context) {
        super(props, context);
        this.inAll = this.inAll.bind(this);
        this.inBest = this.inBest.bind(this);
        this.inSave = this.inSave.bind(this);
		this.state = { items: [] ,class:0};

    }
    inSave() {
        this.setState({ class: 2 });
    }
    inBest() {
        this.setState({ class: 1 });
    }
    inAll() {
        this.setState({ class: 0 });
    }
    async componentDidMount() {
  
        const data = await Utility.getBoardTopicAsync(1, this.match.params.boardId, this.context.router);
   
		this.setState({ items: data });
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
        const data = await Utility.getBoardTopicAsync(page, newProps.match.params.boardId, this.context.router);
		this.setState({ items: data });
	}


    render() {
        const curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        let topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = <div><ListTopContent boardId={this.match.params.boardId} /></div>;
        }
        let topics;
        if (this.state.class === 0) {
            topics = this.state.items.map(this.convertTopicToElement);
        } else if (this.state.class === 1) {
            topics = <BestTopics boardId={this.match.params.boardId} curPage={curPage} />
        } else if (this.state.class === 2) {
          //  topics =
        }
		return <div className="listContent ">
			<div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag" onClick={this.inAll}>全部</div>
                    <div className="listContentTag" onClick={this.inBest}>精华</div>
					<div className="listContentTag">最热</div>
				</div>
				<div className="row" style={{ alignItems: 'center' }}>
					<div style={{ marginRight: '14.5rem' }}><span>作者</span></div>
					<div style={{ marginRight: '7.6875rem'}}><span>最后回复</span></div>
				</div>
            </div>
            {topTopics}
			<div>{topics}</div>
		</div>;

	}
}

export class TopicTitleAndContent extends React.Component<State.TopicTitleAndContentState, {pager}> {

    constructor(props, context) {
        super(props, context);
        this.state = ({ pager: [] });
    }
    componentWillMount() {
        const count = this.props.replyCount+1;
        const totalPage = (count-count%10) / 10 + 1;
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

        this.setState({});
    }
    generateListPager(item: number) {
        const url = `/topic/${this.props.id}/${item}`;
        if (item != -1) {
            return <div style={{ marginRight:"0.3rem" }}><a href={url}>{item}</a></div>;
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
            icon = <i style={{ color: "blue" }}className="fa fa-envelope fa-lg"></i>
        } else if (this.props.topState === 2) {
            icon = <i style={{ color: "orange" }}className="fa fa-chevron-circle-up fa-lg"></i>
        } else if (this.props.topState === 4) {
            icon = <i style={{ color: "red" }}className="fa fa-arrow-circle-up fa-lg"></i>
        }
        if (this.props.replyCount > 100 && this.props.topState===0) {
            icon = <i style={{color:"red"}}className="fa fa-envelope fa-lg"></i>
        }
        if (Utility.getLocalStorage("userInfo").name === this.props.userName) {
            icon = <i style={{ color: "#FFC90E" }} className="fa fa-envelope fa-lg"></i>
        }
        return <div id={colorId}>

            <div className="row topicInList" id={topicId}>
                <div style={{ display: "flex", marginLeft:"1rem" }}>
                    {icon}
                    <Link to={url}><div className="listTitle" id={titleId} style={{ marginLeft: '1.25rem', }}> {this.props.title}</div></Link>
                <div style={{  display:"flex" }}>
                        {this.state.pager.map(this.generateListPager.bind(this))}</div>
                    </div>
                <div className="row" style={{ width: "45%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" }}>

                    <div style={{ width:"8rem" }}> <span ><a >{this.props.userName}</a></span></div>

                    <div className="row" style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" ,width:"10rem"}}>

                        <div id="liked" style={{ display: "flex" }}><i className="fa fa-thumbs-o-up fa-lg"></i><span className="timeProp tagSize">{this.props.likeCount}</span></div>

                        <div id="disliked" style={{ display: "flex" }}><i className="fa fa-thumbs-o-down fa-lg"></i><span className="timeProp tagSize">{this.props.dislikeCount}</span></div>

                        <div id="commentsAmount" style={{ display: "flex" }}><i className="fa fa-commenting-o fa-lg"></i><span className="timeProp tagSize">{this.props.replyCount}</span></div>

                    </div>

                    <div id="lastReply" style={{ width: "8rem" }}><div>{this.props.lastPostUser} </div></div>

                    <div style={{ width: "12rem"}}><div style={{ wordBreak:"keepAll" }}>{moment(this.props.lastPostTime).format('YYYY-MM-DD HH:mm')}</div></div>

                </div>

            </div>

        </div>;

    }

}