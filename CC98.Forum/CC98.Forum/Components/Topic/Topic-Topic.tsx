import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { Award } from './Topic-Award';
import { PostManagement } from './Topic-PostManagement';
import { Judge } from './Topic-Judge';
import { Replier } from './Topic-Replier';
import { ReplyContent } from './Topic-ReplyContent';
import { ReplierSignature } from './Topic-ReplierSignature';
export class PostTopic extends React.Component<{ boardInfo,topicInfo,userId, imgUrl, page, topicid,quote,isTrace }, { topicMessage,masters}> {
    constructor(props, content) {
        super(props, content);
        this.update = this.update.bind(this);
        this.quote = this.quote.bind(this);
        this.state = {
            topicMessage: {
                title: "加载中...", time: "", content: "", signature: "", postId: 0, likeInfo: { likeCount: 0, dislikeCount: 0, likeState: 0 }, awardInfo: []
            }, masters: []
        };
    }
    quote(content, userName, replyTime, floor) {
        this.props.quote(content, userName, replyTime, floor);
    }
    async update() {
        let topicMessage = await Utility.getTopic(this.props.topicid);

        this.setState({ topicMessage: topicMessage });
    }
    async componentDidMount() {
        const topicMessage = await Utility.getTopic(this.props.topicid);
        const masters = this.props.boardInfo.boardMasters;
        this.setState({ topicMessage: topicMessage,masters:masters });
    }

    render() {
        let privilege = null;
        if (Utility.getLocalStorage("userInfo"))
            privilege = Utility.getLocalStorage("userInfo").privilege;
        let likeInfo = { likeCount: this.state.topicMessage.likeCount, dislikeCount: this.state.topicMessage.dislikeCount, likeState: this.state.topicMessage.likeState };
        if (this.state.topicMessage.userInfo!= null) {
    
                return <div className="reply" id={'1'} >
                    <Replier key={this.state.topicMessage.postId} userInfo={this.state.topicMessage.userInfo} isAnonymous={this.state.topicMessage.isAnonymous} topicid={this.state.topicMessage.topicId} floor={this.state.topicMessage.floor} isDeleted={this.state.topicMessage.isDeleted}  traceMode={false} isHot={false} />
                    <div className="column" style={{ justifyContent: "space-between", width: "80%" }}>
                        <Judge userId={this.state.topicMessage.userId} postId={this.state.topicMessage.postId} update={this.update} topicId={this.state.topicMessage.topicId} />
                        <PostManagement topicId={this.state.topicMessage.topicId} postId={this.state.topicMessage.postId} userId={this.state.topicMessage.userId} update={this.update} privilege={privilege} boardId={this.props.boardInfo.id} />
                        <ReplyContent key={this.state.topicMessage.content} postid={this.state.topicMessage.postId} content={this.state.topicMessage.content} contentType={this.state.topicMessage.contentType} />
                        <Award postId={this.state.topicMessage.postId} updateTime={Date.now()} awardInfo={this.state.topicMessage.awards} />
                        <ReplierSignature signature={this.state.topicMessage.userInfo.signatureCode} topicid={this.state.topicMessage.topicId} userId={this.state.topicMessage.userId} masters={this.state.masters} postid={this.state.topicMessage.postId} likeInfo={this.state.topicMessage.likeInfo}
                            userInfo={this.state.topicMessage.userInfo}
                            content={this.state.topicMessage.content}
                            floor={this.state.topicMessage.floor}
                            quote={this.quote} traceMode={this.props.isTrace}
                            replyTime={this.state.topicMessage.time}
                            lastUpdateAuthor={this.state.topicMessage.lastUpdateAuthor}
                            lastUpdateTime={this.state.topicMessage.lastUpdateTime} boardId={this.props.boardInfo.id} isLZ={this.state.topicMessage.isLZ} />
                    </div>
                    <div className="reply-floor">1</div>
                </div>;
           
        } else {
            return null;
        }
    }
}
/* <div className="postRoot" id="1">
                    <div className="essay">
                        <AuthorMessage authorId={this.state.topicMessage.topicMessage.userId} authorName={this.state.topicMessage.topicMessage.userName} authorImgUrl={this.state.topicMessage.topicMessage.userImgUrl} isAnonymous={this.state.topicMessage.topicMessage.isAnonymous} isFollowing={this.state.topicMessage.topicMessage.isFollowing}
                            fanCount={this.state.topicMessage.topicMessage.fanCount} />
                        <TopicTitle Title={this.state.topicMessage.topicMessage.title} Time={this.state.topicMessage.topicMessage.time} HitCount={this.props.topicInfo.hitCount} />
                        <div id="ads"><img width="100%" src={this.props.imgUrl}></img></div>
                    </div>
                    <PostManagement topicId={this.props.topicid} postId={this.state.topicMessage.topicMessage.postId} userId={this.props.userId} update={this.update} privilege={this.state.topicMessage.topicMessage.privilege} />
                    <Judge userId={this.state.topicMessage.topicMessage.userId} postId={this.state.topicMessage.topicMessage.postId} update={this.update} topicId={this.props.topicid} />
                    <TopicContent postid={this.state.topicMessage.topicMessage.postId} content={this.state.topicMessage.topicMessage.content} signature={this.state.topicMessage.topicMessage.signature} topicid={this.props.topicid} userId={this.state.topicMessage.topicMessage.userId}
                        contentType={this.state.topicMessage.topicMessage.contentType}
                        masters={this.props.boardInfo.masters}
                        update={this.update} quote={this.quote} replyTime={this.state.topicMessage.topicMessage.time} userName={this.state.topicMessage.topicMessage.userName} likeInfo={this.state.topicMessage.topicMessage.likeInfo} />
                    <div className="column" style={{ width: "100%" }}>

                        <Award postId={this.state.topicMessage.topicMessage.postId} updateTime={Date.now()} awardInfo={this.state.topicMessage.topicMessage.awardInfo} />
                    </div>
                </div>;*/