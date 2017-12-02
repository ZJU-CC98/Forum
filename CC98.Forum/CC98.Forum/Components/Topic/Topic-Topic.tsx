import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { AuthorMessage } from './Topic-AuthorMessage';
import { TopicTitle } from './Topic-TopicTitle';
import { TopicContent } from './Topic-TopicContent';
export class PostTopic extends React.Component<{ userId, imgUrl, page, topicid }, { topicMessage, likeState, awardInfo, info, awardPage }> {
    constructor(props, content) {
        super(props, content);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "", postid: 0 }
            , likeState: 0, awardInfo: [], info: [], awardPage: 1
        }
    }
    async update() {
        console.log("topic should update");
        this.setState({});
    }
    async nextPage() {
        const page = this.state.awardPage;
        const award = await Utility.getAwardInfo(this.state.topicMessage.postId, page + 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ info: awardInfo, awardPage: page + 1 });
    }
    async lastPage() {
        const id = `#awardPager${this.state.topicMessage.postId}`;
        const page = this.state.awardPage;
        if (this.state.awardPage === 1) {
            $(id).css("disabled", "true");
            return;
        }
        const award = await Utility.getAwardInfo(this.state.topicMessage.postId, page - 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);

        this.setState({ info: awardInfo, awardPage: page - 1 });
    }
    async generateAwardInfo(item) {
        const url = await Utility.getPortraitUrl(item.operatorName);
        return <AwardInfo postId={this.state.topicMessage.postId} userImgUrl={url} content={item.content} reason={item.reason} userName={item.operatorName} />;
    }
    async componentWillMount() {
        let topicMessage = await Utility.getTopic(this.props.topicid, this.context.router);

        const award = await Utility.getAwardInfo(topicMessage.postId, 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ topicMessage: topicMessage, awardInfo: award, info: awardInfo });
    }

    render() {
        const awardPagerId = `awardPager${this.state.topicMessage.postId}`;
        let awardPager = null;
        if (this.state.info.length !== 0) {

            awardPager = < div className="row" >
                <button className="awardPage" id={awardPagerId} onClick={this.lastPage}>上一页</button>
                <button className="awardPage" onClick={this.nextPage}>下一页</button>
            </div>;
        }

        if (this.state.topicMessage != null) {
            if (this.state.topicMessage.userId == this.props.userId || this.props.userId == null) {
                return <div className="root" id="1">
                    <div className="essay">
                        <AuthorMessage authorId={this.state.topicMessage.userId} authorName={this.state.topicMessage.userName} authorImgUrl={this.state.topicMessage.userImgUrl} isAnonymous={this.state.topicMessage.isAnonymous} isFollowing={this.state.topicMessage.isFollowing}
                            fanCount={this.state.topicMessage.fanCount} />
                        <TopicTitle Title={this.state.topicMessage.title} Time={this.state.topicMessage.time} HitCount={this.state.topicMessage.hitCount} />
                        <div id="ads"><img width="100%" src={this.props.imgUrl}></img></div>
                    </div>

                    <TopicContent postid={this.state.topicMessage.postId} content={this.state.topicMessage.content} signature={this.state.topicMessage.signature} topicid={this.props.topicid} userId={this.state.topicMessage.userId}
                        contentType={this.state.topicMessage.contentType}
                        masters={this.state.topicMessage.masters}
                        update={this.update} />
                    <div className="column" style={{ width: "100%" }}>
                        {this.state.info}
                        {awardPager}
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