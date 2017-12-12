import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { UbbContainer } from '.././UbbContainer';
import { Constants } from './Topic';
import { UbbEditor } from '../UbbEditor';
import { TopicManagement } from './Topic-TopicManagement';
declare let moment: any;
declare let editormd: any;

export class SendTopic extends React.Component<{ topicid, boardId, boardInfo,onChange,content ,userId}, { content: string, mode: number, masters: string[]}>{
    constructor(props) {
        super(props);
        this.sendUbbTopic = this.sendUbbTopic.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.showManagement = this.showManagement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.close = this.close.bind(this);
        this.update = this.update.bind(this);
        this.state = ({ content: '', mode: 0, masters:[] });
    }
    update(value) {
        this.setState({ content: value });
    }
    onChange() {
        console.log("in sendtopic onchange");
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
        if (Utility.isMaster(this.props.boardInfo.masters))
            $("#topicManagementBTN").css("display", "");
        if (Utility.getLocalStorage("userInfo")) {
            const myId = Utility.getLocalStorage("userInfo").id;
            if ((Utility.getLocalStorage("userInfo").privilege === '全站贵宾' && myId === this.props.userId))
                $("#topicManagementBTN").css("display", "");
        }
        editormd.emoji.path = '/images/emoji/';
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
            emoji: true,
            toolbarIcons: function () {
                return [
                    "undo", "redo", "|", "emoji",
                    "bold", "del", "italic", "quote", "|",
                    "h1", "h2", "h3", "h4", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "image", "code", "table", "html-entities",
                ]
            },
        });
        const time = moment(this.props.content.replyTime).format('YYYY-MM-DD HH:mm:ss');
        const url = `/topic/${this.props.topicid}#${this.props.content.floor}`;
        const masters = this.props.boardInfo.masters;
        console.log("in sendtopic quote didmount");
        console.log(this.props.content.content);
        if (this.props.content) {
            if (this.state.mode === 1) {
                const str = `>**以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：**
${this.props.content.content}`;
                Constants.testEditor.appendMarkdown(str);

                this.setState({ masters: masters });
            } else {
                const str = `[quote][b]以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：
[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]${this.props.content.content}[/quote]`;
                this.setState({ masters: masters, content: this.state.content + str });
            }
        }
       
    
    }
    componentWillReceiveProps(newProps) {
        if (Utility.isMaster(newProps.boardInfo.masters))
            $("#topicManagementBTN").css("display", "");
        if (Utility.getLocalStorage("userInfo")) {
            const myId = Utility.getLocalStorage("userInfo").id;
            if ((Utility.getLocalStorage("userInfo").privilege === '全站贵宾' && myId === newProps.userId))
                $("#topicManagementBTN").css("display", "");
        }
        const time = moment(newProps.content.replyTime).format('YYYY-MM-DD HH:mm:ss');
        if (newProps.content) {
            if (this.state.mode === 1) {
                const str = `>**以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：**
${newProps.content.content}`;
                Constants.testEditor.appendMarkdown(str);
            } else {
                const url = `/topic/${this.props.topicid}#${newProps.content.floor}`;
                const str = `[quote][b]以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]
${newProps.content.content}[/quote]`;
                this.setState({ content: this.state.content+str });
            }
        }
    }
    componentDidUpdate() {
        editormd.emoji.path = '/images/emoji/';
        if (this.state.mode === 1) {
            Constants.testEditor = editormd("test-editormd", {
                width: "100%",
                height: 640,
                path: "/scripts/lib/editor.md/lib/",
                saveHTMLToTextarea: false,
                imageUpload: false,
                imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL: "http://apitest.niconi.cc/file/",
                emoji: true,
                toolbarIcons: function () {
                    return [
                        "undo", "redo", "|", "emoji", 
                        "bold", "del", "italic", "quote", "|",
                        "h1", "h2", "h3", "h4", "|",
                        "list-ul", "list-ol", "hr", "|",
                        "link", "image", "code", "table", "html-entities", 
                    ]
                },
            });
        }
    }
    async sendUbbTopic() {
        let url = `http://apitest.niconi.cc/topic/${this.props.topicid}/post`;
        let bodyInfo = {
            content: this.state.content,
            contentType: 0,
            title: ""
        }
        let body = JSON.stringify(bodyInfo);
        let token = Utility.getLocalStorage("accessToken");
        let headers = new Headers();
        headers.append("Authorization", token);
        headers.append("Content-Type", 'application/json');
        let mes = await fetch(url, {
            method: 'POST',
            headers,
            body
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
            let url = `http://apitest.niconi.cc/topic/${this.props.topicid}/post`;
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
            editormd.emoji.path = '/images/emoji/';
            if (this.state.mode === 1) {
                Constants.testEditor = editormd("test-editormd", {
                    width: "100%",
                    height: 640,
                    path: "/scripts/lib/editor.md/lib/",
                    saveHTMLToTextarea: false,
                    imageUpload: false,
                    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL: "http://apitest.niconi.cc/file/",
                    emoji: true,
                    toolbarIcons: function () {
                        return [
                            "undo", "redo", "|", "emoji",
                            "bold", "del", "italic", "quote", "|",
                            "h1", "h2", "h3", "h4", "|",
                            "list-ul", "list-ol", "hr", "|",
                            "link", "image", "code", "table", "html-entities",
                        ]
                    },
                });
            }
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
                <UbbEditor update={this.update} value={this.state.content}/>
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendUbbTopic} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复
                    </div>
                    </div></div>;
        }
        else {
            mode = '使用Markdown编辑';
            editor = <div id="sendTopic">
                <form>
                    <div id="test-editormd" className="editormd">
                        <textarea className="editormd-markdown-textarea" name="test-editormd-markdown-doc"   ></textarea>
                    </div>
                </form>
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复</div>


                </div>

            </div>;
        }
    
      
        let uploadInfo = null;
        if (this.state.mode === 1) {
            uploadInfo = <form method="post" encType="multipart/form-data">
                <input type="file" id="upload-files" style={{ display: "none" }} onChange={this.upload.bind(this)} />
                <div className="row"><div style={{ fontSize: "0.8rem" }}>在此上传本地图片</div>
                <label className="fa-upload" htmlFor="upload-files" style={{ fontFamily: "fontAwesome", cursor: "pointer" }}></label></div>
               
            </form>;
        }
        return <div id="sendTopicInfo" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <div className="row" style={{ justifyContent: this.state.mode === 1 ? "space-between" : "flex-end" }}>
                {uploadInfo}
                <div id="post-topic-changeMode" onClick={this.changeEditor.bind(this)} className="button blue" style={{ width: "16rem", height: "0.8rem", letterSpacing: "0.3125rem" }}>{this.state.mode === 1 ? "切换到Ubb编辑器" : "切换到Markdown编辑器"}
                </div></div>
            {editor}
            <button id="topicManagementBTN" style={{display:"none"}} onClick={this.showManagement}>管理</button>
            <TopicManagement topicId={this.props.topicid} update={this.onChange} boardId={this.props.boardId} updateTime={Date.now()} />
        </div>;
    }
}
