import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import { UbbContainer } from '.././UbbContainer';
import {
    Route,
    Link
} from 'react-router-dom';

import { match } from 'react-router';
import { ReplyContent } from './Topic-ReplyContent';
import { Replier } from './Topic-Replier';
import { PostTopic } from './Topic-Topic';
import { Award } from './Topic-Award';
import { ReplierSignature } from './Topic-ReplierSignature';
import { PostManagement } from './Topic-PostManagement';
import { Judge } from './Topic-Judge';
declare let moment: any;

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class CurUserPost extends RouteComponent<{}, { topicid, page, totalPage, userId,topicInfo,boardInfo }, { topicid, page, userId }> {
    constructor(props, context) {
        super(props, context);
        this.state = { page: 1, topicid: this.match.params.topicid, totalPage: 1, userId: 559244, topicInfo: { replyCount: 0 }, boardInfo: null};
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userId = newProps.match.params.userId;
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicid);
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const boardId = topicInfo.boardId;
        const boardInfo = Utility.getBoardInfo(boardId);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userId: newProps.match.params.userId, topicInfo: topicInfo, boardInfo: boardInfo });
    }
    async componentDidMount() {
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicid);
        const userId = this.match.params.userId;
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const boardId = topicInfo.boardId;
        const boardInfo = Utility.getBoardInfo(boardId);
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userId: userId, topicInfo: topicInfo, boardInfo: boardInfo });
    }
    async getTotalPage(topicId) {
        return await Utility.getCurUserTotalReplyPage(topicId, this.match.params.userId, this.context.router);
    }

    render() {
        let topic = null;
        if (this.state.page == 1) {
            topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={this.state.userId} topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} />;
		}    
			
        return <div className="center" style={{width:"1140px"}} >
            <TopicPager userId={this.state.userId} page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
            {topic}
            <Route path="/topic/:topicid/user/:userId/:page?" component={Reply} />
            <TopicPagerDown userId={this.state.userId} page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
        </div>
            ;

    }

}
export class Reply extends RouteComponent<{}, { masters,contents }, { page, topicid, userId }>{
    constructor(props, content) {
        super(props, content);
        this.update = this.update.bind(this);
        this.state = {
            contents: [],
            masters:[]
        };

    }
    async getMasters(topicId) {
        return Utility.getMasters(topicId);
    }
    async update() {
        const page = this.match.params.page || 1;
        const storageId = `TopicContent_${this.match.params.topicid}_${page}`;
        let realContents;
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorization", token);

        const url = `http://apitest.niconi.cc/user/${this.match.params.userId}`;
        const response = await fetch(url, { headers });
        const data = await response.json();
        const userName = data.name;
        realContents = await Utility.getCurUserTopicContent(this.match.params.topicid, page, userName, this.match.params.userId, this.context.router);
        const masters = this.getMasters(this.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });
    }
    async componentWillReceiveProps(newProps) {
        const page = newProps.match.params.page || 1;
        const storageId = `TopicContent_${newProps.match.params.topicid}_${page}`;
        let realContents;
        /* if (!Utility.getStorage(storageId)) {
             realContents = await Utility.getTopicContent(newProps.match.params.topicid, page);
             Utility.setStorage(storageId, realContents);
         }
         else {
             realContents = Utility.getStorage(storageId);
         }*/
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorization", token);

        const url = `http://apitest.niconi.cc/user/${newProps.match.params.userId}`;
        const response = await fetch(url, { headers });
        const data = await response.json();
        const userName = data.name;
        realContents = await Utility.getCurUserTopicContent(newProps.match.params.topicid, page, userName, newProps.match.params.userId, this.context.router);
        const masters = this.getMasters(newProps.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });
            }
    private generateContents(item: ContentState) {
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" }}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} isDeleted={item.isDeleted} />
            <Judge userId={item.userId} postId={item.postId} update={this.update} topicId={item.topicId} />
            <PostManagement topicId={item.topicId} postId={item.postId} userId={item.userId} update={this.update} privilege={item.privilege} />
            <ReplyContent key={item.content}content={item.content}  postid={item.postId} contentType={item.contentType} />
            <Award postId={item.postId} updateTime={Date.now()} />
            <ReplierSignature signature={item.signature} topicid={item.topicId} userId={item.userId} masters={this.state.masters} postid={item.postId} />
        </div>
        </div>;
    }
    render() {
        return <div className="center" style={{ width: "100%" }}>
            {this.state.contents.map(this.generateContents.bind(this))}
        </div>
            ;
    }
}


export class TopicPager extends RouteComponent<{ userId, page, topicid, totalPage, }, { pager }, {}> {
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

        return <PageModel userId={this.props.userId} pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        console.log('new=' + newProps.userId);
        this.setState({ pager: pages });
    }

    render() {
        return <div className="row" style={{ width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ pageNumber, topicid, curPage, totalPage, userId }, { userName }> {
    constructor(props) {
        super(props);
        this.state = ({ userName: "" });
    }
    async componentDidMount() {
        const response = await fetch(`http://apitest.niconi.cc/user/${this.props.userId}`);
        console.log("cc" + this.props.userId);
        const data = await response.json();
        const userName = data.name;
        this.setState({ userName: userName });
    }
    render() {
        const last = '<';
        const next = '>';
        const start = '<<';
        const end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;
            } else {
                return <li className="page-item active"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;

            }

        } else if (this.props.pageNumber == -1) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.curPage - 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{last}</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.curPage + 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{next}</Link></li>
                ;
        } else if (this.props.pageNumber == -3) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/1`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{start}</Link></li>
                ;
        } else {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.totalPage}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{end}</Link></li>
                ;
        }
    }
}
export class TopicPagerDown extends RouteComponent<{ userId, page, topicid, totalPage }, { pager }, {}> {
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

        return <PageModel userId={this.props.userId} pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    } t
    render() {
        return <div className="row" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}

/**
 * 文章内容
 */
export class ContentState {
    constructor(
    ) {

    }
    id: number;
    content: string;
    time: string;
    isDeleted: boolean;
    floor: number;
    isAnonymous: boolean;
    lastUpdateAuthor: string;
    lastUpdateTime: string;
    topicId: number;
    userName: string;
    sendTopicNumber: number;
    userImgUrl: string;
    signature: string;
    userId: number;
    privilege: string;
    likeNumber: number;
    dislikeNumber: number;
    postId: number;
    contentType: number;
}