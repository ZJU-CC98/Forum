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
import { Award } from './Topic-Award';
import { ReplierSignature } from './Topic-ReplierSignature';
import { PostManagement } from './Topic-PostManagement';
import { Judge } from './Topic-Judge';
import { Pager } from '../Pager';
import { RouteComponent } from '../RouteComponent';
import { SendTopic } from './Topic-SendTopic';
import { Reply } from './Topic-Reply';
import { TopicInfo } from './Topic-TopicInfo';
import { Category } from './Topic-Category';
declare let moment: any;
export class CurUserPost extends RouteComponent<{}, { topicid, page, totalPage, userId, topicInfo, boardInfo, content, shouldRender,isFav }, { topicid, page, userId }> {
    constructor(props, context) {
        super(props, context);
        this.quote = this.quote.bind(this);
        this.shouldRender = this.shouldRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            page: 1, topicid: this.match.params.topicid, totalPage: 1, userId: this.match.params.userId, topicInfo: { replyCount: 0 }, boardInfo: { masters: [], id: 7 }, content: "", shouldRender: false, isFav: false
        };
    }
    quote(content) {
        this.setState({ content: content });
    }
    async handleChange() {

        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.state.topicInfo.replyCount);
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, topicInfo: topicInfo });
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
        const boardInfo = await Utility.getBoardInfo(boardId);
        const isFav = await Utility.getFavState(newProps.match.params.topicid);  
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userId: newProps.match.params.userId, topicInfo: topicInfo, boardInfo: boardInfo ,isFav:isFav});
    }
    shouldRender(fetchState) {
        if (fetchState) {
            this.setState({ shouldRender: true });
        }
        else {
            this.setState({ shouldRender: false });
        }
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
        const boardInfo = await Utility.getBoardInfo(boardId);
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userId: userId, topicInfo: topicInfo, boardInfo: boardInfo });
    }
    async getTotalPage(topicId) {
        return await Utility.getCurUserTotalReplyPage(topicId, this.match.params.userId, this.context.router);
    }

    render() {
        const url = `/topic/${this.match.params.topicid}/user/${this.match.params.userId}/`;
        const pagerUrl = `/topic/${this.state.topicid}/`;
            return <div className="center" style={{ width: "1140px" }} >
                <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center" }}>
                    <Category topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} />
                    <Pager page={this.state.page} url={url} totalPage={this.state.totalPage} />
                </div>
                <TopicInfo topicInfo={this.state.topicInfo} tag1={this.state.topicInfo.tag1} tag2={this.state.topicInfo.tag2} boardInfo={this.state.boardInfo} isFav={this.state.isFav} />
                <Reply topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} page={this.state.page} userId={this.state.userId} quote={this.quote} isTrace={true} isHot={false} topicId={this.match.params.topicid} />
                <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center", marginTop: "1rem" }}>
                    <Category topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} />
                    <Pager page={this.state.page} url={url} totalPage={this.state.totalPage} />
                </div>
                <SendTopic onChange={this.handleChange} boardInfo={this.state.boardInfo} content={this.state.content} userId={this.state.userId} topicInfo={this.state.topicInfo} />
            </div>
                ;

    }

}
/*export class Reply extends React.Component<{ topicId, page, topicInfo, boardInfo,userId,quote }, { masters,contents }>{
    constructor(props, content) {
        super(props, content);
        this.update = this.update.bind(this);
        this.quote = this.quote.bind(this);
        this.state = {
            contents: [],
            masters:[]
        };

    }
    quote() {
        this.props.quote(this.state.contents);
    }
    async update() {
        const page = this.props.page || 1;
        const storageId = `TopicContent_${this.props.topicId}_${page}`;
        let realContents;
        const data = await Utility.getUserInfo(this.props.userId);
        const userName = data.name;
        realContents = await Utility.getCurUserTopicContent(this.props.topicId, page, userName, this.props.userId);
        const masters = this.props.boardInfo.masters;
        this.setState({ contents: realContents, masters: masters });
    }
    async componentWillReceiveProps(newProps) {
        const page = newProps.page || 1;
        const storageId = `TopicContent_${newProps.topicId}_${page}`;
        let realContents;         
        const data = await Utility.getUserInfo(this.props.userId);
        const userName = data.name;
        realContents = await Utility.getCurUserTopicContent(newProps.topicId, page, userName, newProps.userId);
        const masters = this.props.boardInfo.masters;
        this.setState({ contents: realContents, masters: masters });
            }
    private generateContents(item: ContentState) {
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin", backgroundColor: "#fff" }}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} isDeleted={item.isDeleted} quote={this.quote} content={item.content} traceMode={true} isHot={false} popularity={item.popularity} />
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
}*/

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
    popularity: number;
}