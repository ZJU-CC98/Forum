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
        let url = `https://api.cc98.org/Post/Topic/${this.props.topicid}`;
        console.log(url);
        let content = `Content=${this.state.content}&ContentType=Markdown&Title=`;
        console.log(content);
        let mes = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer _cWbRJFA8il7ccX7oJ5njc4JPF0h9Rxg898Qtbo7Wk-OdUfndezg44KIsCte7JKUMMwmAOEJ_-QDhJIKEO0nuySMYcHLuB6HGZP6K6SFpQDOw6HFAUfPkkTyXRCFXJStGyFhjTtU6H30bd7PhssahB-jAm4cQIJ7m-20a6FXNOGCH3XRN8fjdrNYR6zCz82q1TTM8bxkQkhBUHKM7864K3sK9hWfU9xQRsNy4q-1LBejm_tZtVITNqEDtmi372aFz4fZUsX2n5qSg4LTeI4GV84kMtX8f_UZamTw39wDdUXyvCtecf4NgrPSvOOos0sp-fDULlme29qoUscPod6rAahEFE_GxXRTJdol4b6gZdkfQsTutrc6aUtvhWsFIHLj9GX38XqTvbZTF1FmSBrjJmVqQS3Ha_MPn9rO7JkpsaFkDUgJjkRz3LuZr2L_wnzNSuvrEjibrzF3p3t5oaCoz7XUQF5B1n1G7xiQ7n52_vYt2Ye-0YW6R9YSwjqDg8L6zWTU2QCAlUA_hAZc-gDQI_s-IlGXrAK-INCNUK8dDwjsZVB1mIFKhBQ5MgbrxOGU85Hdctn2SypIFIypAuZjDI7FelHanTPsPvXuDH4m4uRoXP2GR9ahyv_79NVf077j',

            },
            body: content
        });
    }
    getInitialState(){
        return { value: '' };
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    render() {


        return <div style={{ display: "flex", flexDirection: "column" }}><div id="sendTopic">
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

        </div><div className="row" style={{ justifyContent: "center" }}>
                <div id="post-topic-button" onClick={this.sendTopic.bind(this)} className="button blue" style={{ marginTop: "20px", width: "70px", letterSpacing: "5px" }}>回复</div>
            </div>
        </div>;
    }
}