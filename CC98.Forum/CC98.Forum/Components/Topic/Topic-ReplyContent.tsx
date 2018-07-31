import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
import { VoteContent, voteInfo } from './VoteInfo';
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
    }
  

    componentDidUpdate() {
        const divid = `doc-content${this.props.postId}`;

        editormd.markdownToHTML(divid, {
            htmlDecode: false,
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
        this.getVote();
    }
    async componentDidMount() {
        const divid = `doc-content${this.props.postId}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: false,
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
        this.setState({});
        this.getVote();
    }

    async getVote() {
        if(this.props.floor !== 1 || !this.props.topicInfo.isVote) return null;
        try {
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(`/topic/${this.props.topicInfo.id}/vote`, {
                headers
            });
            let vote: voteInfo = await res.json();
            this.setState({
                vote
            });
        } catch(e) {

        }
    }

    render() {
    
        const divid = `doc-content${this.props.postId}`;
        let ubbUrlContent = Utility.atUserUbbUrl(this.props.content);
        const ubbMode = <UbbContainer code={ubbUrlContent} />;
        let mdUrlContent = Utility.atUserMdUrl(this.props.content);
        const mdMode = <div id={divid}>
            <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{mdUrlContent}</textarea>
        </div>;
        let content;
        //ubb      
        content = ubbMode;
        //md
        if (this.props.contentType === 1) {
            content = mdMode;
        }
      
        return  <div className="reply-content">
                {this.state.vote ? <VoteContent voteInfo={this.state.vote} /> : null}
                <div className="substance">{content}</div>        
            </div>;
    }
}
