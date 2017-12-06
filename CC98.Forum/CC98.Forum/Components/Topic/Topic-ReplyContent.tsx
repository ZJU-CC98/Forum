import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
declare let editormd: any;
export class ReplyContent extends React.Component<{postid,content,  contentType}, { postId }> {
    constructor(props, content) {
        super(props, content);

        this.state = {
            postId: this.props.postid
        }
    }
  

    componentDidUpdate() {
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    }
    async componentDidMount() {
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
        this.setState({});
    }
    render() {
        const divid = `doc-content${this.props.postid}`;
        const ubbMode = <UbbContainer code={this.props.content} />;
        const mdMode = <div id={divid}>
            <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{this.props.content}</textarea>
        </div>;
        let content;
        //ubb      
        content = ubbMode;
        //md
        if (this.props.contentType === 1) {
            content = mdMode;
        }
      
        return <div className="root" style={{ marginTop: "-170px" }}>
            <div className="reply-content">
                <div className="substance">{content}</div>        
            </div></div>;
    }
}
