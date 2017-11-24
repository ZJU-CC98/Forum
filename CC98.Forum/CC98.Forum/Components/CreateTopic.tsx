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
export class CreateTopic extends RouteComponent<{}, { title,content,topicId ,ready}, {boardId}> {   //发帖
    constructor(props) {
        super(props);
        this.state = ({ topicId:null,title: '', content: '', ready:false});
    }
    ready() {
        this.setState({ ready: true });
    }
    async sendMdTopic(content1) {
        try {
            let url = `http://apitest.niconi.cc/topic/board/${this.match.params.boardId}`;
          //  let con = testEditor.getMarkdown();
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
        //let mode = 0;
        let mode = 1;
        if (mode === 0) {
            return <div className="column" style={{ justifyContent: "center", width: "80%" }}>
                <div className="createTopicBoardName"> 版面名称 > 发表主题</div>
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
                <InputUbbContent onChange={this.onUbbChange.bind(this)} />
                <div id="post-topic-button" onClick={this.sendUbbTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
            </div>;
        } else {
            return <div className="column" style={{ justifyContent: "center", width: "80%" }}>
                <div className="createTopicBoardName"> 版面名称 > 发表主题</div>
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
                <InputMdContent onChange={this.sendMdTopic.bind(this)} ready={this.state.ready} />
              
            </div>;
        }
      
    }
}
//  <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
export class InputTitle extends React.Component<{boardId,onChange}, { title: string }>{
    constructor(props) {
        super(props);
        this.state = ({ title: "" });
    }
    handleTitleChange(event) {
        this.props.onChange(event.target.value);
        console.log("value");
        console.log(event.target.value);
        this.setState({ title: event.target.value });
        console.log('finished');
    }

    render() {
        
        return <div className="column"><div className="createTopicTitle">
            <div className="createTopicListName">主题标题</div>
            <div className="createTopicListName">标签1</div>
           <div className="createTopicListName">标签2</div>
         
        </div>
            <form>
                <div>
                    <input value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                </div>
            </form>
            </div>;
    }
}
export class InputUbbContent extends React.Component<{ onChange }, { content }>{
    constructor(props) {
        super(props);
        this.state = ({ content: "" });
    }
    handleUbbChange(event) {
        this.props.onChange(event.target.value);
        this.setState({ content: event.target.value });
    }
    render() {
        return <div id="sendTopic">

            <div id="sendTopic-options">

                <ul className="editor__menu clearfix" id="wmd-button-row" >

                    <li title="加粗 <strong> Ctrl+B" className="wmd-button" id="wmd-bold-button" ><a className="editor__menu--bold" style={{ backgroundPosition: "0px 0px" }}></a></li>

                    <li title="斜体 <em> Ctrl+I" className="wmd-button" id="wmd-italic-button" style={{ left: " 25px" }}><a className="editor__menu--bold" style={{ backgroundPosition: " -20px 0px" }}></a></li>

                    <li className="editor__menu--divider wmd-spacer1" id="wmd-spacer1"></li>



                    <li title="链接 <a> Ctrl+L" className="wmd-button" id="wmd-link-button" style={{ left: "75px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-40px 0px" }}></a></li>
                    <li title="引用 <blockquote> Ctrl+Q" className="wmd-button" id="wmd-quote-button" style={{ left: " 100px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-60px 0px" }}></a></li>
                    <li title="代码 <pre><code> Ctrl+K" className="wmd-button" id="wmd-code-button" style={{ left: " 125px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-80px 0px" }}></a></li>
                    <li className="editor__menu--divider wmd-spacer1" id="wmd-spacer2"></li>
                    <li title="图片 <img> Ctrl+G" className="wmd-button" id="wmd-image-button" style={{ left: "150px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-100px 0px" }}></a></li>
                    <li className="editor__menu--divider wmd-spacer1" id="wmd-spacer2"></li>
                    <li title="数字列表 <ol> Ctrl+O" className="wmd-button" id="wmd-olist-button" style={{ left: " 200px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-120px 0px" }}></a></li>
                    <li title="普通列表 <ul> Ctrl+U" className="wmd-button" id="wmd-ulist-button" style={{ left: "225px" }}><a className="editor__menu--bold" style={{ backgroundPosition: " -140px 0px" }}></a></li>
                    <li title="标题 <h1>/<h2> Ctrl+H" className="wmd-button" id="wmd-heading-button" style={{ left: "250px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-160px 0px" }}></a></li>
                    <li title="分割线 <hr> Ctrl+R" className="wmd-button" id="wmd-hr-button" style={{ left: "275px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-180px 0px" }}></a></li>
                    <li className="editor__menu--divider wmd-spacer1" id="wmd-spacer3"></li>
                    <li title="撤销 - Ctrl+Z" className="wmd-button" id="wmd-undo-button" style={{ left: "325px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-200px 0px" }}></a></li>
                    <li title="重做 - Ctrl+Y" className="wmd-button" id="wmd-redo-button" style={{ left: "350px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-220px -20px" }}></a></li>
                    <li className="editor__menu--divider wmd-spacer1" id="wmd-spacer4"></li>

                    <li title="Markdown 语法" className="wmd-button" id="wmd-help-button" style={{ left: " 400px" }}><a className="editor__menu--bold" style={{ backgroundPosition: "-300px 0px" }}></a></li>
                </ul>
            </div>
            <form>
                <div >
                    <textarea id="sendTopic-input" name="sendTopic-input" value={this.state.content} onChange={this.handleUbbChange.bind(this)} />
                </div>
            </form>
         <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>

                

            </div></div>;
    }
} 
export class InputMdContent extends React.Component<{ ready,onChange}, {content}>{
    constructor(props) {
        super(props);
        this.state = ({ content: "" });
    }
    componentDidMount() {
        editormd("test-editormd", {
            width: "100%",
            height: 680,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false
        });
    }
    send() {
        const content = testEditor.getMarkdown();
        console.log("content" + content);
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