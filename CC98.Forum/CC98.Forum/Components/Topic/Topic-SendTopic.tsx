import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { UbbContainer } from '.././UbbContainer';
import { Constants } from './Topic';
import { UbbEditor } from '../UbbEditor';
import { TopicManagement } from './Topic-TopicManagement';
declare let moment: any;
declare let editormd: any;

export class SendTopic extends React.Component<{ topicid, boardId, onChange }, { content: string, mode: number, masters: string[]}>{
    constructor(props) {
        super(props);
        this.sendUbbTopic = this.sendUbbTopic.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.showManagement = this.showManagement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.close = this.close.bind(this);
        this.update = this.update.bind(this);
        this.state = ({ content: '', mode: 1, masters:[] });
    }
    update(value) {
        this.setState({ content: value });
    }
    onChange() {
        this.props.onChange();
    }
    showManagement() {
        const UIId = `#manage${this.props.topicid}`;
        $(UIId).css("display", "");
    }
    close() {
        const UIId = `#manage${this.props.topicid}`;
        $(UIId).css("display", "none");
    }
    async componentDidMount() {
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
        });
        const masters = await Utility.getMasters(this.props.topicid);
        this.setState({ masters: masters });
    }
    componentDidUpdate() {
        if (this.state.mode === 1) {
            Constants.testEditor = editormd("test-editormd", {
                width: "100%",
                height: 640,
                path: "/scripts/lib/editor.md/lib/",
                saveHTMLToTextarea: false,
                imageUpload: false,
                imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL: "http://apitest.niconi.cc/file/",
            });
        }
    }
    async sendUbbTopic() {
        let url = `http://apitest.niconi.cc/post/topic/${this.props.topicid}`;
        let content = {
            content: this.state.content,
            contentType: 0,
            title: ""
        }
        let contentJson = JSON.stringify(content);
        let token = Utility.getLocalStorage("accessToken");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", 'application/json');
        let mes = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: contentJson
        }
        );
        if (mes.status === 401) {
            window.location.href = "/status/logout";
        }
        if (mes.status === 402) {
            window.location.href = "/status/contentneeded";
        }
        if (mes.status === 500) {
            window.location.href = "/status/servererror";
        }
        this.props.onChange();
        this.setState({ content: "" });
    }
    async sendMdTopic() {
        try {
            let url = `http://apitest.niconi.cc/post/topic/${this.props.topicid}`;
            let c = Constants.testEditor.getMarkdown();
            let content = {
                content: c,
                contentType: 1,
                title: ""
            }
            let contentJson = JSON.stringify(content);
            let token = Utility.getLocalStorage("accessToken");
            let myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", 'application/json');
            let mes = await fetch(url, {

                method: 'POST',

                headers: myHeaders,

                body: contentJson

            }
            );
            if (mes.status === 402) {
                alert("请输入内容");
            }
            Constants.testEditor.setMarkdown("");
            this.props.onChange();
            this.setState({ content: "" });
        } catch (e) {
            console.log("Error");
            console.log(e);
        }
    }
    changeEditor() {
        if (this.state.mode === 0) {

            this.setState({ mode: 1 });
        } else {
            this.setState({ mode: 0 });
        }
    }
    async upload(e) {
        const files = e.target.files;
        const res = await Utility.uploadFile(files[0]);
        const url = res.content;
        if (this.state.mode === 1) {
            const str = `![](http://apitest.niconi.cc${url})`;
            Constants.testEditor.appendMarkdown(str);
        } else {
            const str = `[img]http://apitest.niconi.cc${url}[/img]`;
            const ex = this.state.content;
            const cur = ex + str;
            this.setState({ content: cur });
        }
    }
    getInitialState() {
        return { value: '' };
    }
    handleChange(event) {

        this.setState({ content: event.target.value });
    }
    render() {

        let mode, editor;
        if (this.state.mode === 0) {
            mode = '使用UBB模式编辑';
            editor = <div>
                <UbbEditor update={this.update} />
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendUbbTopic} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复
                    </div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>切换到Markdown编辑器            </div> </div></div>;
        }
        else {
            mode = '使用Markdown编辑';
            editor = <div id="sendTopic">
                <form>
                    <div id="test-editormd" className="editormd">
                        <textarea className="editormd-markdown-textarea" name="test-editormd-markdown-doc" value={this.state.content}  ></textarea>
                    </div>
                </form>
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复</div>

                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>切换到UBB编辑器

                    </div>
                </div>

            </div>;
        }
        const privilege = Utility.getLocalStorage("userInfo").privilege;
        const myName = Utility.getLocalStorage("userInfo").name;
        console.log(privilege);
        if (privilege === '管理员' || privilege === '超级版主') {
            $("#topicManagementBTN").css("display", "");
        }

        if (this.state.masters) {
            for (let i = 0; i < this.state.masters.length; i++) {
                if (myName === this.state.masters[i]) {
                    $("#topicManagementBTN").css("display", "");
                }
            }
        }
    
        return <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <form method="post" encType="multipart/form-data">
                <input type="file" id="upload-files" onChange={this.upload.bind(this)} />
            </form>
            {editor}
            <button id="topicManagementBTN" style={{display:"none"}} onClick={this.showManagement}>管理</button>
            <TopicManagement topicId={this.props.topicid} update={this.onChange} boardId={this.props.boardId} updateTime={Date.now()} />
        </div>;
    }
}
