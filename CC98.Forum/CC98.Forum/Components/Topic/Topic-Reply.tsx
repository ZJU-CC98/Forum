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
import { PostManagement } from './Topic-PostManagement';
import { Judge } from './Topic-Judge';
import { ReplierSignature } from './Topic-ReplierSignature';
declare let moment: any;

export class Reply extends React.Component<{topicId,page,topicInfo,boardInfo,updateTime,quote}, { contents, masters }>{
    constructor(props, content) {   
        super(props, content);
        this.update = this.update.bind(this);
        this.quote = this.quote.bind(this);
        this.state = {
            contents: [],
            masters: [],
        };
    }
    quote(content, userName, replyTime, floor) {
        console.log("in reply quote" + content);
        this.props.quote(content, userName, replyTime, floor);
    }
    async update() {
        const page = this.props.page || 1;
        const storageId = `TopicContent_${this.props.topicId}_${page}`;
        const realContents = await Utility.getTopicContent(this.props.topicId, page, this.props.topicInfo.replyCount);
        const masters = this.props.boardInfo.masters;
        this.setState({ contents: realContents, masters: masters });
    }
    async componentDidMount() {
        const page = this.props.page || 1;
        const storageId = `TopicContent_${this.props.topicId}_${page}`;
        const realContents = await Utility.getTopicContent(this.props.topicId, page, this.props.topicInfo.replyCount);
        console.log(realContents);
        this.setState({ contents: realContents });
    }
    async componentWillReceiveProps(newProps) {
        const page = newProps.page || 1;
        const storageId = `TopicContent_${newProps.topicId}_${page}`;
        const realContents = await Utility.getTopicContent(newProps.topicId, page, newProps.topicInfo.replyCount);
        console.log(realContents);
        this.setState({ contents: realContents });

    }

    private generateContents(item: ContentState) {
        let privilege = null;
        if (Utility.getLocalStorage("userInfo"))
            privilege = Utility.getLocalStorage("userInfo").privilege;
        const id = item.floor % 10;
        return <div className="reply" id={id.toString()} >
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} isDeleted={item.isDeleted} content={item.content} quote={this.quote} traceMode={false} isHot={false} popularity={item.popularity} />
            <Judge userId={item.userId} postId={item.postId} update={this.update} topicId={item.topicId} />
            <PostManagement topicId={item.topicId} postId={item.postId} userId={item.userId} update={this.update} privilege={privilege} />
            <ReplyContent key={item.content} postid={item.postId} content={item.content} contentType={item.contentType} />
            <Award postId={item.postId} updateTime={Date.now()} />
            <ReplierSignature signature={item.signature} topicid={item.topicId} userId={item.userId} masters={this.state.masters} postid={item.postId} />
  
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
    popularity: number;
}