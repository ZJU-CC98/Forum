import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';
import { VoteContent, voteInfo } from './VoteInfo';
var remark = require('remark');
var reactRenderer = require('remark-react');

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
        // const divid = `doc-content${this.props.postId}`;
        // editormd.markdownToHTML(divid, {
        //     htmlDecode: false,
        //     emoji: true,
        //     taskList: true,
        //     tex: true,
        //     flowChart: true,
        //     sequenceDiagram: true,
        //     codeFold: true,
        // });
    }

    // componentDidUpdate() {
    //     const divid = `doc-content${this.props.postId}`;
    //     editormd.markdownToHTML(divid, {
    //         htmlDecode: false,
    //         emoji: true,
    //         taskList: true,
    //         tex: true,
    //         flowChart: true,
    //         sequenceDiagram: true,
    //         codeFold: true,
    //     });
    // }
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

        const domId = `doc-content${this.props.postId}`;
        let ubbUrlContent = Utility.atUserUbbUrl(this.props.content);
        const ubbMode = <UbbContainer code={ubbUrlContent} options={{ ...new UbbCodeOptions(), allowLightbox: true }} />;
        let mdUrlContent = Utility.atUserMdUrl(this.props.content);

        // 鬼畜正则代码  兼容老版本md语法解析问题
        let parseContent = this.props.content.replace(/\n>[\s\S]*?\n\n/g, (v) => v.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')));
        if (parseContent[0] === '>') {
            const index = parseContent.indexOf('\n\n');
            if (index === -1) {
                parseContent = parseContent.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>'));
            } else {
                const substr = parseContent.substr(0, index);
                parseContent = substr.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')) + parseContent.substr(index + 1, parseContent.length);
            }
        }
        parseContent = parseContent.replace(/发言：\*\*\n/g, "发言：**\n\n");
        //不知道
        const mdMode = <div id={domId} style={{maxWidth:"52rem",overflow:"hidden",padding:"2px"}}>
            {remark().use(reactRenderer).processSync(parseContent).contents}
        </div>;
        // const mdMode = <div id={domId}>
        // <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{mdUrlContent}</textarea>
        // </div>;
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
