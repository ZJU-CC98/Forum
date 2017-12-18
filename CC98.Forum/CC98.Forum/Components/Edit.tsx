import * as React from 'react';
import * as Utility from '../Utility';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { match } from "react-router";
import { RouteComponent } from 'RouteComponent';
import { UbbEditor } from 'UbbEditor';

export module Constants {
    export var testEditor;
}
declare let editormd: any;
declare let testEditor: any;

export class Edit extends RouteComponent<{}, {}, { mode: string, id1: number, id2: any }> {
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        const mode = this.match.params.mode;
        if (mode === "topic") {
            const boardId = this.match.params.id1;
            const topicId = this.match.params.id2;
            const url = "";
            const boardName = "版面名称";
            if (!topicId) { //发新主题
                return <div className="createTopic">
                    <Category url={url} boardName={boardName} />
                    <div className="createTopicTitle">
                        <div className="createTopicListName">主题标题</div>
                        <Tags />
                        <Title />
                    </div>
                    <Type />
                    <Options />
                    <Editor />
                </div>;
            } else {    //编辑主题
                <div className="createTopic">
                    <Category url={url} boardName={boardName} />
                    <div className="createTopicTitle">
                        <div className="createTopicListName">主题标题</div>
                        <Tags />
                        <Title />
                    </div>
                    <Type />
                    <Options />
                    <Editor />
                </div>;
            }
        } else if (mode === "post") {
            const topicId = this.match.params.id1;
            const postId = this.match.params.id2;
            const url = "";
            const boardName = "版面名称";
            if (!postId) { //发新回复
                return <div className="createTopic">
                    <Category url={url} boardName={boardName} />
                    <Editor />
                </div>;
            } else {    //编辑回复
                <div className="createTopic">
                    <Category url={url} boardName={boardName} />
                    <Editor />
                </div>;
            }
        }
    }
}

/**
 * 编辑界面的导航器组件
 */
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

/**
 * 编辑界面的标签
 * 用于特定版面的发主题/编辑主题
 * TODO:尚未完成
 */
export class Tags extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div></div>
    }
}

/**
 * 编辑界面的标题
 * 用于发主题/编辑主题
 * TODO:尚未完成
 */
export class Title extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div></div>
    }
}

/**
 * 编辑界面的发帖类型
 * 用于发主题/编辑主题
 * TODO:尚未完成
 */
export class Type extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div className="createTopicType">
            <div className="createTopicListName">发帖类型</div>
            <input type="radio" checked={true} name="type" value="normal" /> 普通
            <input type="radio" name="type" value="academic" /> 学术信息
            <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型)</div>
        </div>
    }
}


/**
 * 编辑界面的选项
 * 用于发主题/编辑主题
 * 所有版面仅管理员可以设置仅楼主可见
 * TODO:尚未完成
 */
export class Options extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div className="createTopicOption">
            <div className="createTopicListName">选项</div>
            <input type="radio" checked={true} name="option" value="all" />回复所有人可见
            <input type="radio" name="option" value="host" />回复仅楼主可见
            <input type="radio" name="option" value="special" />回复仅特定用户可见
            </div>
    }
}

/**
 * 编辑界面的编辑器
 * 用于发主题/编辑主题/回帖/编辑回帖
 * TODO:尚未完成
 */
export class Editor extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div>这里是编辑器</div>
    }
}

