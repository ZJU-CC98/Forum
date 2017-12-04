import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { RouteComponent } from '../RouteComponent';
import { Replier } from './Topic-Replier';
import { ReplyContent } from './Topic-ReplyContent';
import { Award } from './Topic-Award';
import { PostManagement } from './Post-Management';
import { Judge } from './Topic-Judge';
declare let moment: any;

export class Reply extends RouteComponent<{}, { contents, masters }, { page, topicid, userName }>{
    constructor(props, content) {   
        super(props, content);
        this.update = this.update.bind(this);
        this.state = {
            contents: [],
            masters: [],
        };
    }
    async update() {
        const page = this.match.params.page || 1;
        const storageId = `TopicContent_${this.match.params.topicid}_${page}`;
        let realContents;
        realContents = await Utility.getTopicContent(this.match.params.topicid, page, this.context.router);
        const masters = await this.getMasters(this.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });
    }
    async getMasters(topicId) {
        return Utility.getMasters(topicId);
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

        realContents = await Utility.getTopicContent(newProps.match.params.topicid, page, this.context.router);
        const masters = await this.getMasters(newProps.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });

    }

    private generateContents(item: ContentState) {
        if (item.isDeleted) {
            return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin", backgroundColor: "#fff" }}>
                <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={null} topicid={item.topicId} userName={'98Deleter'} replyTime={item.time} floor={item.floor} userImgUrl={'http://www.cc98.org/images/policeM.png'} sendTopicNumber={9898} privilege={9898} />               
                <ReplyContent key={item.content} masters={this.state.masters} userId={item.userId} content={'该回复已被my cc98, my home'} signature={null} topicid={item.topicId} postid={item.postId} contentType={item.contentType} />
            </div>
            </div>;
        }
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin", backgroundColor:"#fff" }}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} />
            <Judge userId={item.userId} postId={item.postId} update={this.update} topicId={item.topicId} />
            <PostManagement topicId={item.topicId} postId={item.postId} userId={item.userId} update={this.update} privilege={item.privilege} />
            <ReplyContent key={item.content} masters={this.state.masters} userId={item.userId} content={item.content} signature={item.signature} topicid={item.topicId} postid={item.postId} contentType={item.contentType} />
            <Award postId={item.postId} updateTime={Date.now()} />
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