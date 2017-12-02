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
*这里单选框设置默认选中也有些bug未修复，可能是出于以上原因
*/

/*
*编辑器基本复制了回帖的，很多功能尚未实现
*另外这个编辑器还没做好
*/
/*
*不明白handleChange是做什么的QAQ
*/
export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}
export class CreateTopic extends RouteComponent<{}, { title, content, topicId, ready, mode, boardName }, { boardId }> {   //发帖
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.state = ({ topicId: null, title: '', content: '', ready: false, mode: 0, boardName: "" });
    }
    async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const url = `http://apitest.niconi.cc/Board/${this.match.params.boardId}`;
        const headers = new Headers();
        headers.append("Authorization", token);
        const response = await fetch(url, { headers });
        const data = await response.json();
        const boardName = data.name;
        this.setState({ boardName: boardName });
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
            let url = `http://apitest.niconi.cc/topic/board/${this.match.params.boardId}`;
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
            let mes = await fetch(url, {

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
        let url = `http://apitest.niconi.cc/topic/board/${this.match.params.boardId}`;
        let content = {
            content: this.state.content,
            contentType: 0,
            title: this.state.title
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
        const topicId = await mes.text();
        window.location.href = `/topic/${topicId}`;
    }
    onTitleChange(title) {
        this.setState({ title: title });
    }
    onUbbChange(content) {
        this.setState({ content: content });
    }
    render() {
        const mode = this.state.mode;
        const url = `/list/${this.match.params.boardId}`;
        if (mode === 0) {
            return <div className="createTopic">
                <div className="createTopicBoardName"> <a href={url}>{this.state.boardName} ></a>> 发表主题</div>
                <InputTitle boardId={this.match.params.boardId} onChange={this.onTitleChange.bind(this)} />
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
                <UbbEditor update={this.update} />
                <div className="row" style={{ justifyContent: "center" }}>
                    <div id="post-topic-button" onClick={this.sendUbbTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", marginBottom: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
                </div>
            </div>;
        } else {
            return <div className="createTopic">
                <div className="createTopicBoardName"> <a href={url}>{this.state.boardName} ></a>> 发表主题</div>
                <InputTitle boardId={this.match.params.boardId} onChange={this.onTitleChange.bind(this)} />
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
//  <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
export class InputTitle extends React.Component<{ boardId, onChange }, { title: string }>{
    constructor(props) {
        super(props);
        this.state = ({ title: "" });
    }
    handleTitleChange(event) {
        this.props.onChange(event.target.value);
        this.setState({ title: event.target.value });
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
    componentDidMount() {
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 680,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false
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