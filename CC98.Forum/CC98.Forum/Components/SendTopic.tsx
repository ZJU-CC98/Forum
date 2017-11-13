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
export class SendTopic extends RouteComponent<{}, { content: string }, {}>{
    constructor(props) {
        super(props);
        this.state = ({ content: '' });
    }
    async sendTopic() {
        let url = `http://openid.cc98.org`;
        //let content = `Content=${this.state.content}&ContentType=Markdown&Title=`;
        let token = Utility.getLocalStorage("accessToken");
        let t = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1MDMzMDMsImV4cCI6MTUwOTUwNjkwMywiaXNzIjoiaHR0cDovL29wZW5pZC5jYzk4Lm9yZyIsImF1ZCI6Imh0dHA6Ly9vcGVuaWQuY2M5OC5vcmcvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiOWExZmQyMDAtODY4Ny00NGIxLTRjMjAtMDhkNTBhOTZlNWNkIiwic3ViIjoiNTU2NTUxIiwiYXV0aF90aW1lIjoxNTA5NTAzMzAzLCJpZHAiOiJsb2NhbCIsImp0aSI6ImU1YWZmNWQwM2QyZjk3Njc2NWYyYTQwMjk2YWVmOTM3Iiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbIkNDOTgiXX0.UgaVLvuUsdvnO7zp9YUo9BDs6_XYsC9noonNXOb2up6kKigWrMUZomq1tS8Xq6Gh52nHdSgiTtVVGZ9V4ZCAEkn0RCnpkwYZa7zDP3tuKqJL7gvnfsuDCsdvl59kXT9UUdtdWO7g8gC5ZFTmYXuQVAIayfSvxu4KLCzRZM8M7GmCejfsLGsEf-H6yJr-Pq2dMAoRtmetubmuc7W6PcY4l3UZqeuWh2f5yMuoljLc4MiGT2Cs4uqn6xOwqzEKA_lq5vljlSiM24jrbnoJDkdccSTolQYcRpohoTZwAP0wDraoDJEsmPhra8hPD9lmpC4XgykNSqdWSq8gD1ajVr6-XA';
        let myHeaders = new Headers();
        let c = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1MDI1MjIsImV4cCI6MTUwOTUwNjEyMiwiaXNzIjoiaHR0cHM6Ly9vcGVuaWQuY2M5OC5vcmciLCJhdWQiOiJodHRwczovL29wZW5pZC5jYzk4Lm9yZy9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiI0MmY4YWVhNi03YmRhLTQ4NTctZjk1OC0wOGQ1MTUyZjZlODUiLCJzdWIiOiI1MzM2MzMiLCJhdXRoX3RpbWUiOjE1MDk1MDI1MjEsImlkcCI6ImxvY2FsIiwianRpIjoiMjliNDU1YWJjNjkwNzJlYmJmY2JiYjY1OTFjMjdhZWUiLCJzY29wZSI6WyJvcGVuaWQiXSwiYW1yIjpbImlkc3J2Il19.NnxBKBOiWIyMkq2BKzUrVD5I4xpZVjl-rPZVavAgo8O8hbebOdOk3meWsyWHVaecciNnyYle3zIxvo9xOIznaWcHppkLpEPS0IZuZE3ze7bJlbzzGM5ektuLScaMuHJUqEVjHsG8L9KGJn02_3_O6dERGOdwnpoQD60l8cDibgdWSsQE94GfB0xTt4WN0ScRnmQvkSZg9o42FF1kq7kcmIsjpYQRblgISEjn-QoHU6p1XDnIVi--WWLFZoJzrYfhuM1I18d7os5tjQ4S8CVcmuxlWZlTwGuU-T3bDTGt9lGrCszgLtdm1hqsanZdteb7FG2TQJ5MdMW2L1la8sdGdg';
        let m = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1MDI1MjIsImV4cCI6MTUwOTUwNjEyMiwiaXNzIjoiaHR0cHM6Ly9vcGVuaWQuY2M5OC5vcmciLCJhdWQiOiJodHRwczovL29wZW5pZC5jYzk4Lm9yZy9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiI0MmY4YWVhNi03YmRhLTQ4NTctZjk1OC0wOGQ1MTUyZjZlODUiLCJzdWIiOiI1MzM2MzMiLCJhdXRoX3RpbWUiOjE1MDk1MDI1MjEsImlkcCI6ImxvY2FsIiwianRpIjoiMjliNDU1YWJjNjkwNzJlYmJmY2JiYjY1OTFjMjdhZWUiLCJzY29wZSI6WyJvcGVuaWQiXSwiYW1yIjpbImlkc3J2Il19.NnxBKBOiWIyMkq2BKzUrVD5I4xpZVjl-rPZVavAgo8O8hbebOdOk3meWsyWHVaecciNnyYle3zIxvo9xOIznaWcHppkLpEPS0IZuZE3ze7bJlbzzGM5ektuLScaMuHJUqEVjHsG8L9KGJn02_3_O6dERGOdwnpoQD60l8cDibgdWSsQE94GfB0xTt4WN0ScRnmQvkSZg9o42FF1kq7kcmIsjpYQRblgISEjn-QoHU6p1XDnIVi--WWLFZoJzrYfhuM1I18d7os5tjQ4S8CVcmuxlWZlTwGuU-T3bDTGt9lGrCszgLtdm1hqsanZdteb7FG2TQJ5MdMW2L1la8sdGdg'
        let p = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1MDM2NDcsImV4cCI6MTUwOTUwNzI0NywiaXNzIjoiaHR0cDovL29wZW5pZC5jYzk4Lm9yZyIsImF1ZCI6Imh0dHA6Ly9vcGVuaWQuY2M5OC5vcmcvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiOWExZmQyMDAtODY4Ny00NGIxLTRjMjAtMDhkNTBhOTZlNWNkIiwic3ViIjoiNTU2NTUxIiwiYXV0aF90aW1lIjoxNTA5NTAzNjQ3LCJpZHAiOiJsb2NhbCIsImp0aSI6IjExZTZjNjRjMjVmYmI3YzVlMThkM2U5OTZiM2ExYjk1Iiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbIkNDOTgiXX0.jIfLIMB43UATkulE9RgNJ95AuO93vq8_6BwHVXwxQRCNiMrQyYS17GdHgruRtrY0jA5BK2p8XKgfZBS5ocD_rf5Aazmo8TwVI3s2mrrew34Lz50t4CrPbisPvbJ5L3jj35Tcxizy8xwXF4dmyvUxP9nSm6vqykEZx_BW37Ee0QSkScNuauVVM3x4gaNt6X6kbrPnGRQ1vnBDLjb9OvAdL_Jw6Wwp-NHgd6PCoXn-xg6DElwIUXmxoyIU39AddFMRy7zFzPOqyu2AqcDTD_SZ3uNacbk31jfJ56XdWAO5FJD5TLkIT-0-bvguMPwmZI_JFsIqIruaDlI1jT5-kXi05A';
        let n = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1MDM3MzgsImV4cCI6MTUwOTUwNzMzOCwiaXNzIjoiaHR0cDovL29wZW5pZC5jYzk4Lm9yZyIsImF1ZCI6Imh0dHA6Ly9vcGVuaWQuY2M5OC5vcmcvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiOWExZmQyMDAtODY4Ny00NGIxLTRjMjAtMDhkNTBhOTZlNWNkIiwic3ViIjoiNTc4NTI1IiwiYXV0aF90aW1lIjoxNTA5NTAzNzM4LCJpZHAiOiJsb2NhbCIsImp0aSI6Ijc3NmViYTZiM2QwYjNjM2U4MmFmNjI2OWZhMmFjMTlkIiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbIkNDOTgiXX0.BY-ITokw9BlHxQ8uWB1GXN3iVJUS3Hrs4rTUyj_mjs56NxN1Uz5YLK-l0_2UwU9QgPNm3nvQ0kT1SmVNrup-02XgLeUMtsOevP65iwyrAH3OBFMnVOwBHr0nIpGeaq-_DfcrpX135Ac0iCJKdE-40OFUlHnfozJS3sPB6DQqEwKERPclm7jULdaSCDm5J0_vmkdJMDIysYfPQ_b1BMP48zPPwdFCxZYry6sal0nsRWFsZVhSsK63yZ8w-Mck7s8JxLFf3rEfR4Te1a4mQZEsPkQcNUm4Crp8OTfpIC0e4dF3YIpWHHkxTwFiCBabSnN32cnl3ieOmc9EImRKjRVhlg';
        let k = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0MTJEREQ3RTk0NTdBQzk0RUJBM0Q0QkVGNTAyNTU1MUU3RTEyQkIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiI1QkxkMS1sRmVzbE91ajFMNzFBbFZSNS1FcnMifQ.eyJuYmYiOjE1MDk1NDMxNjEsImV4cCI6MTUwOTU0Njc2MSwiaXNzIjoiaHR0cDovL29wZW5pZC5jYzk4Lm9yZyIsImF1ZCI6Imh0dHA6Ly9vcGVuaWQuY2M5OC5vcmcvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiOWExZmQyMDAtODY4Ny00NGIxLTRjMjAtMDhkNTBhOTZlNWNkIiwic3ViIjoiNTU2NTUxIiwiYXV0aF90aW1lIjoxNTA5NTQzMTYxLCJpZHAiOiJsb2NhbCIsImp0aSI6IjQyYWY4YjI5YzQyYmMyY2U3MzhjOGEwMWU5YjZmZTljIiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbIkNDOTgiXX0.J-T05gxAuWgTpIop4bf1Nk5STBAOfBdfJH6_NmV5LPfECtLE2RjA-JNzMqi7WfisRRb7WurPOs_t0Y5AFlOZi8992ZT7S6e1TqMFN6ldeWiTdw8rLCu-1bZwUcVjKXDk9X2_mXHyc3Na40xAM0w4mSmdwxg0X2gv-OmglVdNyPATTmY__mZltS7vf2ZVK06QFsKcCvDaOIi9SH0Q6LFnDamIaZwnwv2YVYGyvAHv_VySZrhWq0VpGAuWNOMSwOXy48ZhfYXLqSEXASRH8xdcpK7HKwW6h9uOGohKMNUi34DQ10rr-C6zWGqNtq-FBAYOqEoaYYGWSdrmOHinfEGO8w';
        myHeaders.append("Authorization", token);
        myHeaders.append("Accept", 'application/json');
        myHeaders.append("Content-Type", 'application/x-www-form-urlencoded');
        let mes = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: { 'token': token }
        });
    }
    getInitialState() {
        return { value: '' };
    }
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    render() {


        return <div style={{ width: "100%", display: "flex", flexDirection: "column" }}><div id="sendTopic">
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
                    <textarea id="sendTopic-input" name="sendTopic-input" value={this.state.content} onChange={this.handleChange.bind(this)} />

                </div>
            </form>

        </div><div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                <div id="post-topic-button" onClick={this.sendTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复</div>
            </div>
        </div>;
    }
}