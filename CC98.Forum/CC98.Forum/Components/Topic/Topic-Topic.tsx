﻿import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { AuthorMessage } from './Topic-AuthorMessage';
import { TopicTitle } from './Topic-TopicTitle';
import { TopicContent } from './Topic-TopicContent';
import { Award } from './Topic-Award';
import { PostManagement } from './Post-Management';
import { Judge } from './Topic-Judge';
export class PostTopic extends React.Component<{ userId, imgUrl, page, topicid }, { topicMessage, likeState}> {
    constructor(props, content) {
        super(props, content);
        this.update = this.update.bind(this);
        this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "", postId: 0 }
            , likeState: 0
        }
    }
    async update() {
        let topicMessage = await Utility.getTopic(this.props.topicid, this.context.router);

        this.setState({ topicMessage: topicMessage });
    }
    async componentDidMount() {
        let topicMessage = await Utility.getTopic(this.props.topicid, this.context.router);

        this.setState({ topicMessage: topicMessage });
    }
    async componentWillReceiveProps(newProps) {
        let topicMessage = await Utility.getTopic(newProps.topicid, this.context.router);
        this.setState({ topicMessage: topicMessage });
    }
    render() {
        if (this.state.topicMessage != null) {
            if (this.state.topicMessage.userId == this.props.userId || this.props.userId == null) {
                return <div className="postRoot" id="1">
                    <div className="essay">
                        <AuthorMessage authorId={this.state.topicMessage.userId} authorName={this.state.topicMessage.userName} authorImgUrl={this.state.topicMessage.userImgUrl} isAnonymous={this.state.topicMessage.isAnonymous} isFollowing={this.state.topicMessage.isFollowing}
                            fanCount={this.state.topicMessage.fanCount} />
                        <TopicTitle Title={this.state.topicMessage.title} Time={this.state.topicMessage.time} HitCount={this.state.topicMessage.hitCount} />
                        <div id="ads"><img width="100%" src={this.props.imgUrl}></img></div>
                    </div>
                    <PostManagement topicId={this.props.topicid} postId={this.state.topicMessage.postId} userId={this.props.userId} update={this.update} privilege={this.state.topicMessage.privilege} />
                    <Judge userId={this.state.topicMessage.userId} postId={this.state.topicMessage.postId} update={this.update} topicId={this.props.topicid} />
                    <TopicContent postid={this.state.topicMessage.postId} content={this.state.topicMessage.content} signature={this.state.topicMessage.signature} topicid={this.props.topicid} userId={this.state.topicMessage.userId}
                        contentType={this.state.topicMessage.contentType}
                        masters={this.state.topicMessage.masters}
                        update={this.update} />
                    <div className="column" style={{ width: "100%" }}>
                        
                        <Award postId={this.state.topicMessage.postId} updateTime={Date.now()} />
                    </div>
                </div>;
            }
            else {
                return null;
            }
        } else {
            return null;
        }
    }
}