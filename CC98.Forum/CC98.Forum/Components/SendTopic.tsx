import * as React from 'react'; import * as State from '../States/AppState';
import * as Utility from '../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { match } from "react-router";
export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}
export class SendTopic extends RouteComponent<{ topicid }, { content: string }, {}>{
    constructor(props) {
        super(props);
        this.state = ({ content:'' });
    }
    async sendTopic() {
        let url = `http://apitest.niconi.cc/topic/test`;
        let content = `Content=${this.state.content}&ContentType=Markdown&Title=`;
        let token = Utility.getLocalStorage("accessToken");
        let mes = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,

            },
           
        });
    }
    getInitialState(){
        return { value: '' };
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    render() {


        return <div style={{ width:"100%" ,display: "flex", flexDirection: "column" }}><div id="sendTopic">
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
                    <textarea id="sendTopic-input" name="sendTopic-input" value={this.state.content} onChange={this.handleChange.bind(this)}/>
                   
                </div>
            </form>

        </div><div className="row" style={{ justifyContent: "center", marginBottom:"1.25rem " }}>
                <div id="post-topic-button" onClick={this.sendTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复</div>
            </div>
        </div>;
    }
}