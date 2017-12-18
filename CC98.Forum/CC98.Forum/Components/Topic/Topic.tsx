import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import * as Redux from 'redux';
import { UbbEditor } from '../UbbEditor';
import { RouteComponent } from '../RouteComponent';
import { UbbContainer } from '.././UbbContainer';
import { Replier } from './Topic-Replier';
import { ReplyContent } from './Topic-ReplyContent';
import { Provider } from 'react-redux';
import { AwardInfo } from './Topic-AwardInfo';
import { SendTopic } from './Topic-SendTopic';
import { Category } from './Topic-Category';
import { Pager } from '../Pager';
import { PostTopic } from './Topic-Topic';
import { Reply } from './Topic-Reply';
import { NotFoundTopic, UnauthorizedTopic, ServerError } from '../Status';
import { TopicInfo } from './Topic-TopicInfo';

declare let moment: any;
declare let editormd: any;


export module Constants {
    export var testEditor;
}

export class Test1 extends React.Component {
    render() {
        console.log(this.context.router);
        return <div></div>;
    }
}
export class Post extends RouteComponent<{history}, { topicid, page, totalPage, userName, boardId, topicInfo, boardInfo, fetchState, quote, shouldRender }, { topicid, page, userName }> {
    constructor(props, context) {
        super(props, context);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.quote = this.quote.bind(this);
        this.state = {
            page: 1, shouldRender: true, topicid: this.match.params.topicid, totalPage: 1, userName: null, boardId: 7, topicInfo: { replyCount: 0 }, boardInfo: { masters: [], id: 7 }, fetchState: 'ok', quote: ""
        };
    }
    quote(content, userName, replyTime, floor) {
        const y = $("#sendTopicInfo").offset().top;
        scrollTo(0, y);
        this.setState({ quote: { content: content, userName: userName, replyTime: replyTime, floor: floor } });
    }
    update() {

        this.setState({});
    }
    async handleChange() {
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const newPage = topicInfo.replyCount % 10 === 0 ? topicInfo.replyCount / 10 : (topicInfo.replyCount - topicInfo.replyCount % 10) / 10 + 1;
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(topicInfo.replyCount);
        const userName = this.match.params.userName;
        const floor = topicInfo.replyCount % 10+1;
        if (page !== newPage) {
            page = newPage;
            const url = `/topic/${topicInfo.id}/${page}#${floor}`;
            this.props.history.push(url);
        }
        this.setState({topicInfo:topicInfo});
      
    }
    async componentWillReceiveProps(newProps) {
        //page 是否变了
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userName = newProps.match.params.userName;
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const boardId = topicInfo.boardId;
        const boardInfo = await Utility.getBoardInfo(boardId);
        const totalPage = this.getTotalPage(topicInfo.replyCount);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName, boardId: boardId, topicInfo: topicInfo, boardInfo: boardInfo });
    }
    async componentDidMount() {
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const userName = this.match.params.userName;
        const topicInfo = await Utility.getTopicInfo(this.match.params.topicid);
        const boardId = topicInfo.boardId;
        const boardInfo = await Utility.getBoardInfo(boardId);
        const totalPage = this.getTotalPage(topicInfo.replyCount);
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName, boardId: boardId, topicInfo: topicInfo, boardInfo: boardInfo, fetchState: topicInfo });


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
            case 'server error':
                return <ServerError />
        }
        let topic = null;
        let hotReply = null;
        let topicInfo = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topicInfo = <TopicInfo topicInfo={this.state.topicInfo} tag={null} boardInfo={this.state.boardInfo} adsUrl={'/images/ads.jpg'} />
            topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} quote={this.quote} />;
            hotReply = <Reply topicInfo={this.state.topicInfo} DateTime={Date.now()}page={this.match.params.page} topicId={this.match.params.topicid} boardInfo={this.state.boardInfo} quote={this.quote} isTrace={false} isHot={true} userId={null} />
        }
        const pagerUrl = `/topic/${this.state.topicid}/`;
        let topicHtml = <div className="center" >
            <div className="row" style={{ width: "100%", justifyContent: 'space-between', alignItems: "center" }}>
                <Category topicId={this.state.topicid} topicInfo={this.state.topicInfo} boardInfo={this.state.boardInfo} />
                <Pager page={this.state.page} url={pagerUrl} totalPage={this.state.totalPage} />
            </div>
            {topicInfo}
            {topic}
            {hotReply}
            <Reply topicInfo={this.state.topicInfo} DateTime={Date.now()} page={this.match.params.page} topicId={this.match.params.topicid} boardInfo={this.state.boardInfo} quote={this.quote} isHot={false} isTrace={false} userId={null} />

            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", marginTop: "3rem" }}><Pager page={this.state.page} url={pagerUrl} totalPage={this.state.totalPage} /></div>
            <SendTopic onChange={this.handleChange} topicid={this.state.topicid} boardId={this.state.boardId} boardInfo={this.state.boardInfo} content={this.state.quote} userId={this.state.topicInfo.userId} />

        </div>
            ;
        return topicHtml;
        /*  if (this.state.shouldRender) {
          
          } else {
              return <img src="/images/waiting.gif"/>;
          }*/


    }

}
export const ShowTopic = withRouter(Post);













