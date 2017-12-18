import * as React from 'react';
import * as Utility from '../../Utility';
import { AppState } from '../../States/AppState';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { match } from "react-router";
import { UbbEditor } from '../UbbEditor';
export module Constants {
    export var testEditor;
}
declare let editormd: any;
declare let testEditor: any;
/*
*拥有权限的账号发帖类型中增加一项校园活动
*拥有权限的账号才可以选择回复仅楼主可见
*只有特定的版面才可以选择回复仅特定用户可见
*/

/*
*react中用户在表单填入的内容，属于用户跟组件的互动，所以不能用this.props读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值
*这里单选框设置默认选中也有Bug，大概也是出于以上原因
*/

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class CreateTopic extends RouteComponent<{}, { title, content, topicId, ready, mode, boardName, tags }, { boardId }> {   //发帖
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.state = ({ topicId: null, title: '', content: '', ready: false, mode: 0, boardName: "", tags: [] });
    }
    async componentWillMount() {
        const token = Utility.getLocalStorage("accessToken");
        const url = `/Board/${this.match.params.boardId}`;
        const headers = new Headers();
        headers.append("Authorization", token);
        const response = await Utility.cc98Fetch(url, { headers });
        const data = await response.json();
        const boardName = data.name;
        //获取标签
        const tags = await Utility.getBoardTag(this.match.params.boardId);
        this.setState({ boardName: boardName, tags: tags });
    }
    ready() {
        this.setState({ ready: true });
    }
    changeEditor() {
        if (this.state.mode === 0) {
            this.setState({ mode: 1 });
        } else {
            this.setState({ mode: 0 });
        }
    }
    update(value) {
        this.setState({ content: value });
    }
    async sendMdTopic(content1) {
        try {
            let url = `/board/${this.match.params.boardId}/topic`;
            let content = {
                content: content1,
                contentType: 1,
                title: this.state.title
            }
            let contentJson = JSON.stringify(content);
            let token = Utility.getLocalStorage("accessToken");
            let myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", 'application/json');
            let mes = await Utility.cc98Fetch(url, {

                method: 'POST',

                headers: myHeaders,

                body: contentJson

            }
            );
            if (mes.status === 402) {
                alert("请输入内容");
            }
            //   testEditor.setMarkdown("");
            const topicId = await mes.text();
            window.location.href = `/topic/${topicId}`;
        } catch (e) {
            console.log("Error");
            console.log(e);
        }
    }
    async sendUbbTopic() {
        const url = `/board/${this.match.params.boardId}/topic`;
        const content = {
            content: this.state.content,
            contentType: 0,
            title: this.state.title
        }
        const contentJson = JSON.stringify(content);
        const token = Utility.getLocalStorage("accessToken");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", 'application/json');
        let response = await Utility.cc98Fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: contentJson
        }
        );
        //发帖成功，api返回topicid
        const topicId = await response.text();
        //根据返回的topicid，发送@信息       
        const atUsers = this.atHanderler(this.state.content);
        //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
        if (atUsers) {
            const atUsersJSON = JSON.stringify(atUsers);
            const url2 = `/notification/atuser?topicid=${topicId}`;
            let myHeaders2 = new Headers();
            myHeaders2.append("Content-Type", 'application/json');
            myHeaders2.append("Authorization", token);
            let response2 = await Utility.cc98Fetch(url2, {
                method: 'POST',
                headers: myHeaders2,
                body: atUsersJSON
            });
        }
        window.location.href = `/topic/${topicId}`;

    }
    /*
    *处理ubb模式下的发帖内容
    *如果存在合法的@，则会返回一个字符串数组，包含至多10个合法的被@用户的昵称，否则返回false
    */
    atHanderler(content: string) {
        const reg = new RegExp("@[^ \n]{1,10}?[ \n]", "gm");
        const reg2 = new RegExp("[^@ ]+");
        if (content.match(reg)) {   //如果match方法返回了非null的值（即数组），则说明内容中存在合法的@
            let atNum = content.match(reg).length;  //合法的@数
            if (atNum > 10) atNum = 10;            //至多10个
            let ats: string[] = new Array();
            /*被临时抛弃的方法*/
            /*
            for (let i = 0; i < 10; i++) {
                let anAt = reg.exec(content)[0];
                console.log(anAt);
                let aUserName = reg2.exec(anAt)[0];
                console.log(aUserName);
            }
            */
            for (let i = 0; i < atNum; i++) {
                let anAt = content.match(reg)[i];
                console.log(anAt);
                let aUserName = reg2.exec(anAt)[0];
                console.log(aUserName);
                ats[i] = aUserName;
            }
            console.log(ats);
            return ats;
        } else {
            console.log("不存在合法的@");
            return false;
        }
    }
    onTitleChange(title) {
        this.setState({ title: title });
    }
    onUbbChange(content) {
        this.setState({ content: content });
    }
    render() {
        const mode = this.state.mode;
        const url = `/list/${this.match.params.boardId}/normal`;
        if (mode === 0) {
            return <div className="createTopic">
                <Category url={url} boardName={this.state.boardName} />
                <InputTitle boardId={this.match.params.boardId} tags={this.state.tags} onChange={this.onTitleChange.bind(this)} />
                <div className="createTopicType">
                    <div className="createTopicListName">发帖类型</div>
                    <input type="radio" checked={true} name="type" value="normal" /> 普通
                    <input type="radio" name="type" value="academic" /> 学术信息
                    <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型）</div>
                </div>
                <div className="createTopicOption">
                    <div className="createTopicListName">选项</div>
                    <input type="radio" checked={true} name="option" value="all" />回复所有人可见
                    <input type="radio" name="option" value="host" />回复仅楼主可见
                    <input type="radio" name="option" value="special" />回复仅特定用户可见
                </div>
                <div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="button blue" style={{ width: "13.5rem" }}>切换到Markdown编辑器</div>
                </div>
                <UbbEditor update={this.update} value={this.state.content} />
                <div className="row" style={{ justifyContent: "center" }}>
                    <div id="post-topic-button" onClick={this.sendUbbTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", marginBottom: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
                </div>
            </div>;
        } else {
            return <div className="createTopic">
                <Category url={url} boardName={this.state.boardName} />
                <InputTitle boardId={this.match.params.boardId} tags={this.state.tags} onChange={this.onTitleChange.bind(this)} />
                <div className="createTopicType">
                    <div className="createTopicListName">发帖类型</div>
                    <input type="radio" checked={true} name="type" value="normal" /> 普通
                    <input type="radio" name="type" value="academic" /> 学术信息
                    <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型）</div>
                </div>
                <div className="createTopicOption">
                    <div className="createTopicListName">选项</div>
                    <input type="radio" checked={true} name="option" value="all" />回复所有人可见
                    <input type="radio" name="option" value="host" />回复仅楼主可见
                    <input type="radio" name="option" value="special" />回复仅特定用户可见
                </div>
                <div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="button blue" style={{ width: "13.5rem", letterSpacing: "0.3125rem" }}>切换到UBB编辑器</div>
                </div>
                <InputMdContent onChange={this.sendMdTopic.bind(this)} ready={this.state.ready} />
            </div>;
        }

    }
}

export class Category extends React.Component<{ url: string, boardName: string }, { url: string, boardName: string }>{
    constructor(props) {
        super(props);
        this.state = ({
            url: "",
            boardName: ""
        });
    }
    //在子组件中，this.props的值不会自动更新，每当父组件的传值发生变化时，需要在子组件的的componentWillReceiveProps中去手动更新
    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url,
            boardName: nextProps.boardName
        });
    }
    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <a style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} href="/">首页</a>
            <i className="fa fa-chevron-right"></i>
            <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} href={this.state.url} >{this.state.boardName}</a>
            <i className="fa fa-chevron-right"></i>
            <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>发表主题</div>
        </div>;
    }
}
//  <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>

export class InputTitle extends React.Component<{ boardId, onChange, tags }, { title: string }>{
    constructor(props) {
        super(props);
        this.state = ({ title: "" });
    }

    handleTitleChange(event) {
        this.props.onChange(event.target.value);
        this.setState({ title: event.target.value });
    }

    componentWillReceiveProps(newProps) {
        const tags = newProps.tags;
        const tagsNum = tags.length;

    }
    render() {
        return <div className="createTopicTitle">
            <div className="createTopicListName">主题标题</div>
            <div className="createTopicListName">标签1</div>
            <div className="createTopicListName">标签2</div>
            <input value={this.state.title} placeholder="请输入新主题的标题" onChange={this.handleTitleChange.bind(this)} />
        </div>
    }
}

export class InputMdContent extends React.Component<{ ready, onChange }, { content }>{
    constructor(props) {
        super(props);
        this.state = ({ content: "" });
    }
    componentDidUpdate() {
        editormd.emoji.path = '/images/emoji/';
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 680,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
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
    componentDidMount() {
        editormd.emoji.path = '/images/emoji/';
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 680,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
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
    send() {
        const content = Constants.testEditor.getMarkdown();
        this.props.onChange(content);
    }
    render() {

        return <div style={{ width: "100%", display: "flex", flexDirection: "column" }}><div id="sendTopic">
            <form>
                <div id="test-editormd" className="editormd">
                    <textarea className="editormd-markdown-textarea" name="test-editormd-markdown-doc"  ></textarea>
                </div>
            </form>
            <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                <div id="post-topic-button" className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }} onClick={this.send.bind(this)}>发帖</div>
            </div>
        </div>
        </div>;
    }
}