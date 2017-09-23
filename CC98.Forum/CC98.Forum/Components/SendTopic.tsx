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
export class SendTopic extends RouteComponent<{}, {}, {}>{

    async sendTopic() {
        let url = `http://api.cc98.org/Post/Topic/4728978`;
        let content = ' Content=aaaatest&ContentType=MarkDown' ;
        
        let mes = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': "Bearer A4Az37llRpk2X88lj1yGD
                uFR710ay_u2FOEjjcgwCC4teaEHdUm6-9Riph1efujX8nbh6l45WPXQmCAxribGiQGey2vr-Q5WpDJG5IQP_iMDgiXia7H0DDmQp1IcdlRNSlthcoNJVZMLvM3hMHfQucjlDkN4pMnkG7FWC53SjmffpxlDbZBfsgIPV1SLY0cdlb - wiOHUa - mn9lCr8iNuwwAmC4VvQ83uyA_XzgzeaEoCILNFfUrcXifySrnRGFaYbdXop7CRPVxddhgiqierb2Pf_xWBTE3gTZQRj4rRUpeXaC77CfWGh9h4jnQgnL5t_w9FnsJD12oLphHJE5rhV4HqTxaf49HCMk4VDomPEyOHptCPAXJ - 4pVca0Vv_NJ9TTAqLDW4ndE1xC_zXHgX87xMxsSxDREQ_4KgQm0LrP-CqtehvClrG7zKVMFwxCBz - V5DW1mtOouOmEf6ihjM8BFIjZn4oNyxS0uSp85gWTeIDiix5jSS4dWVjUe5xlzRGWklYhS96XIyoYMyCYoLG - cAp5Vny6WhpbsEIUsu0EnH6HDNQPkYwX - FQbYEgRrGBxZmaX_m - Q3aWftTjFLpzXQ0CC8oXSp4Ph8xiM_Zp - lZz7elYoCR9Iy2tDBUkLuZCMGUFwlxh5ue_8d94iAFXQ", 'ContentType': 'application/x-www-form-urlencoded' },
            body:content
        });
        console.log("已发送");
    }
    render() {

      /*  $(document).ready(function () {
            $("#post-topic-button").click(async function () {

            });
        });*/

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
                    <textarea id="sendTopic-input" name="sendTopic-input">
                    </textarea>
                </div>
            </form>

        </div>
            <div id="post-topic-button" onClick={this.sendTopic} className="button blue" style={{ marginTop: "20px", width: "70px", letterSpacing: "5px" }}>回复</div>
        </div>;
    }
}