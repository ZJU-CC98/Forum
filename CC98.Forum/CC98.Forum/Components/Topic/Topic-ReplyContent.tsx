import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
declare let editormd: any;
interface Props {
    postId;
    content;
    contentType;
}
export class ReplyContent extends React.Component<Props, { postId }> {
    constructor(props, content) {
        super(props, content);

        this.state = {
            postId: this.props.postId
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
                <div className="substance">{content}</div>        
            </div>;
    }
}
