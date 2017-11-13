import * as React from 'react';
import { HotTopic } from '../Props/AppProps'
import * as State from '../States/AppState'
import * as Utility from '../Utility'
import * as moment from 'moment'; 
import { UbbContainer } from './UbbContainer';
import { match } from 'react-router';
import {
	Route,
	Link
} from 'react-router-dom';
import TopicTitleAndContentState = State.TopicTitleAndContentState;


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

	constructor(props?, context?) {
		super(props, context);
	}
	get match(): match<TMatch> {
		return (this.props as any).match;
	}
}

export class List extends RouteComponent<{}, {bigPaper:string, page: number, totalPage: number, boardid: number }, { page: string, boardid: number }>  {

	constructor(props, context) {
		super(props, context);

        // 默认页码
        this.state = { page: 1, totalPage: 1, boardid: this.match.params.boardid, bigPaper:"" };
	}
    async getTotalListPage(boardid) {
        const token = Utility.getLocalStorage("accessToken");
        const totalTopicCountResponse = await fetch(`http://apitest.niconi.cc/Board/${boardid}`, { headers: {'Authorization':token}});
		const totalTopicCountJson = await totalTopicCountResponse.json();
		const totalTopicCount = totalTopicCountJson.postCount;
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
		const boardid = this.match.params.boardid;
		const totalPage = await this.getTotalListPage(boardid);
		// 设置状态
		this.setState({ page: page, totalPage: totalPage, boardid: boardid });
	}
    async componentDidMount() {
   
        const token = Utility.getLocalStorage("accessToken");
        const response = await fetch(`http://apitest.niconi.cc/Board/${this.match.params.boardid}`, { headers: { 'Authorization': token } });
        const json = await response.json();
        let bigPaper:string = json.bigPaper;
		let page: number;
		// 未提供页码，防止出错不进行后续处理
		if (!this.match.params.page) {
			page = 1;
		}
		// 转换类型
		else { page = parseInt(this.match.params.page); }
		const boardid = this.match.params.boardid;
		const totalPage = await this.getTotalListPage(boardid);
        // 设置状态
        this.setState({ bigPaper: bigPaper,page: page, totalPage: totalPage, boardid: boardid});
	}
	render() {
        return <div id="listRoot">
            <Category boardId={this.state.boardid} />
            <ListHead key={this.state.page} boardid={this.state.boardid} />
            <ListNotice bigPaper={this.state.bigPaper} />
			<ListButtonAndPager page={this.state.page} totalPage={this.state.totalPage} boardid={this.state.boardid} />
			<ListTag />
            <Route path="/list/:boardid/:page?" component={ListContent} />
            <PagerDown page={this.state.page} totalPage={this.state.totalPage} boardid={this.state.boardid}/>
		</div>;
	}
}
export class Category extends React.Component<{boardId}, { boardId,  boardName }>{
    constructor(props) {
        super(props);
        this.state = ({ boardId: "",boardName: "" });
    }
    async componentDidMount() {
           let token=Utility.getLocalStorage("accessToken");
        const boardResponse = await fetch(`http://apitest.niconi.cc/Board/${this.props.boardId}` ,{headers:{'Authorization':token}});
        const boardData = await boardResponse.json();
        const boardName = boardData.name;
        this.setState({ boardId: this.props.boardId, boardName: boardName });
    }
    render() {
        const listUrl = `/list/${this.state.boardId}`;
        return <div className="row" style={{width:"100%", justifyContent: "flex-start", color: "blue", fontSize: "0.75rem" }}>&rsaquo;&rsaquo;<a style={{ color: "blue", fontSize: "0.75rem" }} href="/">首页</a>&nbsp;→&nbsp;<a style={{ color: "blue", fontSize: "0.75rem" }} href={listUrl} >{this.state.boardName}</a></div>;
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
		};
	}
    async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const url = `http://apitest.niconi.cc/Board/${this.props.boardid}`;
        const managersResponse = await fetch(url, { headers: {'Authorization':token} });
		const managerJson = await managersResponse.json();
		this.setState({
			listName: managerJson.name, todayTopics: managerJson.todayCount, totalTopics: managerJson.topicCount, listManager: managerJson.boardMasters
		});
	}
	async componentWillRecieveProps(newProps) {

        const token = Utility.getLocalStorage("accessToken");
        const url = `http://apitest.niconi.cc/Board/${this.props.boardid}`;
        const managersResponse = await fetch(url, { headers: { 'Authorization': token } });
        const managerJson = await managersResponse.json();
        this.setState({
            listName: managerJson.name, todayTopics: managerJson.todayCount, totalTopics: managerJson.topicCount, listManager: managerJson.boardMasters
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
        return <div className="row" style={{ width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem",marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
			<div style={{ marginBottom: '1.25rem' }}>
				<button className="button orange">发主题</button>
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

export class ListContent extends RouteComponent<{}, { items: TopicTitleAndContentState[] }, { page: string, boardid: number }> {

	constructor() {
		super();

		this.state = { items: [] };

	}
    async componentDidMount() {
   
        const data = await Utility.getBoardTopicAsync(1, this.match.params.boardid);
        console.log(data);
		this.setState({ items: data });
	}
	private convertTopicToElement(item: TopicTitleAndContentState) {
        return <TopicTitleAndContent key={item.title}
            title={item.title}
            authorName={item.userName}
            id={item.id}
            authorId={item.userId}
            lastPostTime={item.lastPostTime}
            lastPostUserName={item.lastPostUser} />;
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
		const data = await Utility.getBoardTopicAsync(page, this.match.params.boardid);
		this.setState({ items: data });
	}


	render() {

		return <div className="listContent ">
			<div className="row" style={{ justifyContent: 'space-between', }}>
                <div className="row" style={{ alignItems: 'center' }} >

                    <div className="listContentTag">全部</div>
					<div className="listContentTag">精华</div>
					<div className="listContentTag">最热</div>
				</div>
				<div className="row" style={{ alignItems: 'center' }}>
					<div style={{ marginRight: '17rem' }}><span>作者</span></div>
					<div style={{ marginRight: '7.6875rem'}}><span>最后发表</span></div>
				</div>
			</div>
			<div>{this.state.items.map(this.convertTopicToElement)}</div>
		</div>;

	}
}

export class TopicTitleAndContent extends React.Component<HotTopic, { title, authorName, likeNumber, dislikeNumber, commentNumber, lastPostUserName, lastPostTime, id, authorId }> {

    constructor(props, context) {

        super(props, context);

        this.state = {

            title: this.props.title,

            authorName: this.props.authorName,

            likeNumber: 123,

            dislikeNumber: 11,

            commentNumber: 214,

            lastPostUserName: this.props.lastPostUserName,

            lastPostTime: this.props.lastPostTime,

            id: this.props.id,

            authorId: this.props.authorId

        }

    }

    render() {



        let url = `/topic/${this.state.id}`;

        return <div id="changeColor">

            <div className="row topicInList" >

                <Link to={url}><div style={{ marginLeft: '1.25rem', }}> <span >{this.state.title}</span></div></Link>

                <div className="row" style={{ width: "44%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" }}>

                    <div style={{ width:"15rem", marginRight: '0.625rem', marginLeft: '1rem' }}> <span ><a >{this.state.authorName}</a></span></div>

                    <div className="row" style={{width:"25rem",  flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" }}>

                        <div id="liked" style={{ display: "flex" }}><i className="fa fa-thumbs-o-up fa-lg"></i><span className="timeProp tagSize">{this.state.likeNumber}</span></div>

                        <div id="disliked" style={{ display: "flex" }}><i className="fa fa-thumbs-o-down fa-lg"></i><span className="timeProp tagSize">{this.state.dislikeNumber}</span></div>

                        <div id="commentsAmount" style={{ display: "flex" }}><i className="fa fa-commenting-o fa-lg"></i><span className="timeProp tagSize">{this.state.commentNumber}</span></div>

                    </div>

                    <div id="lastReply" style={{ width: "15rem" }}><div>{this.state.lastPostUserName} </div></div>

                    <div style={{ width: "30rem", marginRight: "20px" }}><div style={{ wordBreak:"keepAll" }}>{moment(this.state.lastPostTime).format('YYYY-MM-DD HH:mm:ss')}</div></div>

                </div>

            </div>

        </div>;

    }

}