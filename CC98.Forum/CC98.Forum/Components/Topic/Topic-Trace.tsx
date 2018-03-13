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
export class CurUserPost extends RouteComponent<{}, { topicId, page, totalPage,  topicInfo, boardInfo, content, shouldRender,isFav,postId }, { topicId, page,postId }> {
    constructor(props, context) {
        super(props, context);
        this.quote = this.quote.bind(this);
        this.shouldRender = this.shouldRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            page: 1, topicId: this.match.params.topicId, totalPage: 1, postId: this.match.params.postId, topicInfo: { replyCount: 0 }, boardInfo: { masters: [], id: 7 }, content: "", shouldRender: false, isFav: false
        };
    }
    quote(content) {
        this.setState({ content: content });
    }
    async handleChange() {
        const postInfo = await Utility.getPostInfo(this.match.params.postId);
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.state.topicInfo.replyCount,postInfo);
        this.setState({ page: page, topicId: this.match.params.topicId, totalPage: totalPage, topicInfo: topicInfo });
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userId = newProps.match.params.userId;
        const postInfo = await Utility.getPostInfo(this.match.params.postId);
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
        const boardId = topicInfo.boardId;
        const boardInfo = await Utility.getBoardInfo(boardId);
        const isFav = await Utility.getFavState(newProps.match.params.topicId);
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicId,postInfo);
        this.setState({ page: page, topicId: newProps.match.params.topicId, totalPage: totalPage, postId: newProps.match.params.postId, topicInfo: topicInfo, boardInfo: boardInfo ,isFav:isFav});
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
        const postInfo = await Utility.getPostInfo(this.match.params.postId);
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
        const boardId = topicInfo.boardId;
        const boardInfo = await Utility.getBoardInfo(boardId);
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicId, postInfo);
        console.log("totalpage=" + totalPage);
        this.setState({ page: page, topicId: this.match.params.topicId, totalPage: totalPage, topicInfo: topicInfo, boardInfo: boardInfo });
    }
    async getTotalPage(topicId, postInfo) {
        const topicInfo = await Utility.getTopicInfo(topicId);
        const isAnonymous = topicInfo.isAnonymous;
        if (isAnonymous) {
            return await Utility.getAnonymousTraceTopicsCount(topicId, postInfo.id);
        } else {
            return await Utility.getCurUserTotalReplyPage(topicId, postInfo.userId);
        }
       

    }

    render() {
        const url = `/topic/${this.match.params.topicId}/postId/${this.match.params.postId}/`;
        const pagerUrl = `/topic/${this.state.topicId}/`;
            return <div className="center" style={{ width: "1140px" }} >
                <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center" }}>
                    <Category topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} topicId={this.match.params.topicId} />
                    <Pager page={this.state.page} url={url} totalPage={this.state.totalPage} />
                </div>
                <TopicInfo topicInfo={this.state.topicInfo} tag1={this.state.topicInfo.tag1} tag2={this.state.topicInfo.tag2} boardInfo={this.state.boardInfo} isFav={this.state.isFav} />
                <Reply topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} page={this.state.page} postId={this.state.postId} quote={this.quote} isTrace={true} isHot={false} topicId={this.match.params.topicId} />
                <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center", marginTop: "1rem" }}>
                    <Category topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} topicId={this.match.params.topicId} />
                    <Pager page={this.state.page} url={url} totalPage={this.state.totalPage} />
                </div>
                <SendTopic onChange={this.handleChange} boardInfo={this.state.boardInfo} content={this.state.content} topicInfo={this.state.topicInfo} />
            </div>
                ;

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
    popularity: number;
}