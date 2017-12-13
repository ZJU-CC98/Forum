import * as React from 'react';
import * as Utility from '../../Utility';
import { RouteComponent } from '../RouteComponent';
import { Replier } from './Topic-Replier';
import { ReplyContent } from './Topic-ReplyContent';
import { Award } from './Topic-Award';
import { Judge } from './Topic-Judge';
import { PostManagement } from './Topic-PostManagement';
import { ReplierSignature } from './Topic-ReplierSignature';
export class HotReply extends React.Component<{ topicId, boardInfo, topicInfo, page, updateTime,quote}, { masters, contents }>{
    constructor(props, content) {
        super(props, content);
        this.update = this.update.bind(this);
        this.quote = this.quote.bind(this);
        this.state = {
            contents: [],
            masters: []
        };

    }
    quote(content, userName, replyTime, floor) {
        this.props.quote(content, userName, replyTime, floor);
    }
    update() {
        this.setState({});
    }
    async componentWillReceiveProps(newProps) {

        const page = newProps.page || 1;
        if (page == 1) {
            const realContents = await Utility.getHotReplyContent(newProps.topicId);
            const masters = newProps.boardInfo.masters;
            this.setState({ contents: realContents, masters: masters });
        }


    }
    private generateContents(item: ContentState) {
        const floor = (item.floor % 10).toString();
        return <div className="reply" id={floor}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} isDeleted={item.isDeleted} content={item.content} quote={this.quote} traceMode={false} isHot={true} popularity={item.popularity} />
            <Judge userId={item.userId} postId={item.postId} update={this.update} topicId={item.topicId} />
            <PostManagement topicId={item.topicId} postId={item.postId} userId={item.userId} update={this.update} privilege={item.privilege} />
            <ReplyContent key={item.content} content={item.content} postid={item.id} contentType={item.contentType} />
            <Award postId={item.postId} updateTime={Date.now()} />
            <ReplierSignature signature={item.signature} topicid={item.topicId} userId={item.userId} masters={this.state.masters} postid={item.postId} />

        </div>;
    }

    render() {
        $(".header").scrollTop();
        return <div className="center" style={{ width: "100%" }}>
            {this.state.contents.map(this.generateContents)}
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