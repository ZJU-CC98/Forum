import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';
import { VoteContent, voteInfo } from './VoteInfo';
const ReactMarkdown = require('react-markdown');
declare let editormd: any;
interface Props {
    postId;
    content;
    contentType;
    topicInfo;
    floor: number;
}
export class ReplyContent extends React.Component<Props, { postId, vote: voteInfo }> {
    constructor(props, content) {
        super(props, content);

        this.state = {
            postId: this.props.postId,
            vote: null
        }

        this.getVote = this.getVote.bind(this);
    }
    async componentDidMount() {
        if (this.props.floor === 1 && this.props.topicInfo.isVote && !this.state.vote) this.getVote();
    }

    async getVote() {
        try {
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(`/topic/${this.props.topicInfo.id}/vote`, {
                headers
            });
            let vote: voteInfo = await res.json();
            this.setState({
                vote
            });
        } catch (e) {

        }
    }

    render() {

        const divid = `doc-content${this.props.postId}`;
        let ubbUrlContent = Utility.atUserUbbUrl(this.props.content);
        const ubbMode = <UbbContainer code={ubbUrlContent} options={{ ...new UbbCodeOptions(), allowLightbox: true }} />;
        let mdUrlContent = Utility.atUserMdUrl(this.props.content);
        const mdMode = <div id={divid}>
            <ReactMarkdown source={this.props.content} />
        </div>;
        let content;
        //ubb      
        content = ubbMode;
        //md
        if (this.props.contentType === 1) {
            content = mdMode;
        }

        return <div className="reply-content">
            {this.state.vote ? <VoteContent topicInfo={this.props.topicInfo} getInfo={this.getVote} voteInfo={this.state.vote} /> : null}
            <div className="substance">{content}</div>
        </div>;
    }
}
