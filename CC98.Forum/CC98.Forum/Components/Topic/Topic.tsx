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
import { PostManagement } from './Post-Management';
import { TopicTitle } from './Topic-TopicTitle';
import { AuthorMessage } from './Topic-AuthorMessage';
import { TopicPagerDown, TopicPager } from './Topic-Pager';
import { PostTopic } from './Topic-Topic';
import { Reply } from './Topic-Reply';
declare let moment: any;
declare let editormd: any;


export module Constants {
    export var testEditor;
}
export class Post extends RouteComponent<{}, { topicid, page, totalPage, userName }, { topicid, page, userName }> {
    constructor(props, context) {
        super(props, context);
       
        this.handleChange = this.handleChange.bind(this);
        this.state = { page: 1, topicid: this.match.params.topicid, totalPage: 1, userName: null };
    }
    componentDidUpdate() {
        //scrollTo(0, 0);
    }
    async handleChange() {
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        const userName = this.match.params.userName;
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userName = newProps.match.params.userName;
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        console.log(this.state.page);
        console.log(newProps.match.params.page);
        if (this.state.page !== newProps.match.params.page)
            scrollTo(0, 0);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName });
    }

    async componentDidMount() {

        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        const userName = this.match.params.userName;
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
    }
    async getTotalPage(topicId) {
        return Utility.getTotalReplyCount(topicId, this.context.router);
    }

    returnTopic() {
        return <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} />;

    }
    render() {
        let topic = null;
        let hotReply = null;
        if (this.state.page === 1) {
            topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} />;
            hotReply = <Route path="/topic/:topicid/:page?" component={HotReply} />;
        }
        return <div className="center" >
            <div className="row" style={{ width: "100%", justifyContent: 'space-between',alignItems: "center" }}>
                <Category topicId={this.state.topicid} />
                <TopicPager page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} /></div>
            {topic}
            {hotReply}
        
                <Route path="/topic/:topicid/:page?" component={Reply} />
          
            <TopicPagerDown page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
            <SendTopic onChange={this.handleChange} topicid={this.state.topicid} />
        </div>
            ;

    }

}













