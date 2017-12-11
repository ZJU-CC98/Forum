import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as Redux from 'redux';
import { UbbEditor } from '../UbbEditor';
import { RouteComponent } from '../RouteComponent';
import { UbbContainer } from '.././UbbContainer';
import { Replier } from './Topic-Replier';
import { ReplyContent } from './Topic-ReplyContent';
import { Provider } from 'react-redux';
import { AwardInfo } from './Topic-AwardInfo';
import { UserDetails } from './Topic-UserDetails';
import { HotReplier } from './Topic-HotReplier';
import { HotReply } from './Topic-HotReply';
import { TopicContent } from './Topic-TopicContent';
import { SendTopic } from './Topic-SendTopic';
import { Category } from './Topic-Category';
import { TopicTitle } from './Topic-TopicTitle';
import { AuthorMessage } from './Topic-AuthorMessage';
import { Pager } from '../Pager';
import { PostTopic } from './Topic-Topic';
import { Reply } from './Topic-Reply';
import { NotFoundTopic, UnauthorizedTopic } from '../Status';

declare let moment: any;
declare let editormd: any;


export module Constants {
    export var testEditor;
}
export class Post extends RouteComponent<{}, { topicid, page, totalPage, userName,boardId,topicInfo,boardInfo,fetchState }, { topicid, page, userName }> {
    constructor(props, context) {
        super(props, context);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            page: 1, topicid: this.match.params.topicid, totalPage: 1, userName: null, boardId: 7, topicInfo: { replyCount: 0 }, boardInfo: { masters: [], id: 7 }, fetchState:'ok'
        };
    }
    update() {
        this.setState({});
    }
    async handleChange() {
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.state.topicInfo.replyCount);
        const userName = this.match.params.userName;
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName ,topicInfo:topicInfo});
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userName = newProps.match.params.userName;
       
        if (this.state.page !== newProps.match.params.page)
            scrollTo(0, 0);
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const boardId = topicInfo.boardId;
        const boardInfo = await Utility.getBoardInfo(boardId);
        const totalPage = this.getTotalPage(topicInfo.replyCount);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName, boardId: boardId, topicInfo: topicInfo, boardInfo: boardInfo });
    }

    async componentWillMount() {

        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }    
        const userName = this.match.params.userName;
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        if (typeof topicInfo !== 'string') {
            const boardId = topicInfo.boardId;
            const boardInfo = await Utility.getBoardInfo(boardId);
            const totalPage = this.getTotalPage(topicInfo.replyCount);
            this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName, boardId: boardId, topicInfo: topicInfo, boardInfo: boardInfo, fetchState: topicInfo });
        } else {
            this.setState({ fetchState: topicInfo });
        }
        
    }
    getTotalPage(count) {
        return Utility.getTotalPageof10(count);
    }


    render() {
        switch (this.state.fetchState) {
            case 'ok':
                return <div></div>;
            case 'not found':
                return <NotFoundTopic />;
            case 'unauthorized':
                return <UnauthorizedTopic />;
        }
        let topic = null;
        let hotReply = null;
        if (this.state.page === 1) {
            topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo}/>;
            hotReply = <HotReply topicInfo={this.state.topicInfo} page={this.match.params.page} topicId={this.match.params.topicid} boardInfo={this.state.boardInfo} />
        }
        const pagerUrl = `/topic/${this.state.topicid}/`;
        return <div className="center" >
            <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center" }}>
                <Category topicId={this.state.topicid} topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} />
                <Pager page={this.state.page} url={pagerUrl} totalPage={this.state.totalPage} />
            </div>
            {topic}
            {hotReply}

            <Reply topicInfo={this.state.topicInfo} page={this.match.params.page} topicId={this.match.params.topicid} boardInfo={this.state.boardInfo} updateTime={Date.now()} />

            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}><Pager page={this.state.page} url={pagerUrl} totalPage={this.state.totalPage} /></div>
            <SendTopic onChange={this.handleChange} topicid={this.state.topicid} boardId={this.state.boardId} boardInfo={this.state.boardInfo} />
            
        </div>
            ;

    }

}













