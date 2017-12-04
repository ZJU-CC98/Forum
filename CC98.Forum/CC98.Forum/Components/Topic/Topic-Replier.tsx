import * as React from 'react';
import { Link} from 'react-router-dom';
import { RouteComponent } from '../RouteComponent';
import { UserDetails } from './Topic-UserDetails';
declare let moment: any;
export class Replier extends RouteComponent<{ isAnonymous, userId, topicid, userName, replyTime, floor, userImgUrl, sendTopicNumber, privilege }, {}, { topicid }>{
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const url = `/user/${this.props.userId}`;
        const realUrl = encodeURI(url);
        const email = `/message/message?id=${this.props.userId}`;
        let urlHtml = <a href={realUrl}><img src={this.props.userImgUrl}></img></a>;
        if (this.props.isAnonymous == true) {
            urlHtml = <img src={this.props.userImgUrl}></img>;
        }
        const curUserPostUrl = `/topic/${this.props.topicid}/user/${this.props.userId}`;
        $(document).ready(function () {
            $(".authorImg").mouseenter(function (event: JQuery.Event) {
                const currentImage = event.currentTarget;
                $(currentImage).next(".userDetails").show();
            });
            $(".mouse-userDetails").mouseleave(function (event: JQuery.Event) {
                const currentImage = event.currentTarget;
                $(currentImage).find(".userDetails").hide();
            });

        });
        let topicNumber = '帖数';
        if (!this.props.userId) {
            topicNumber = '';
        }
        let userDetails;
        if (this.props.isAnonymous != true) {
            userDetails = <UserDetails userName={this.props.userName} userId={this.props.userId} />;
        } else {
            userDetails = null;
        }
        let userName;

        if (this.props.privilege === "超级版主") {
            userName = <a style={{ color: "pink" }} href={url}>{this.props.userName}</a>;
        } else if (this.props.privilege === "全站贵宾") {
            userName = <a style={{ color: "blue" }} href={url}>{this.props.userName}</a>;
        } else if (this.props.privilege === "注册用户") {
            userName = <a style={{ color: "black" }} href={url}>{this.props.userName}</a>;
        } else if (this.props.privilege == "匿名" || this.props.privilege === "匿名用户") {
            userName = <div style={{ color: "black" }} >{this.props.userName}</div>;
        } else if (this.props.privilege === "管理员") {
            userName = <a style={{ color: "red" }} href={url}>{this.props.userName}</a>;
        } else {
            userName = this.props.userName;
        }
        return <div className="replyRoot">
            <div className="row" style={{ width: "100%", display: "flex", marginBottom: "0.625rem" }}>

                <div className="row mouse-userDetails" style={{ height: "15.625rem" }} >
                    <div className="authorImg" style={{ height: "6rem", borderBottom:"#eaeaea solid thin" }}>{urlHtml}</div>
                    <div className="userDetails" style={{ display: "none", position: "absolute" }}>
                        {userDetails}
                    </div>

                </div>
                <div className="column" id="rpymes" >
                    <div className="row" id="replierMes">
                        <div style={{ marginLeft: "0.625rem" }}><span>第</span><span style={{ color: "red" }}>{this.props.floor}</span><span>楼</span></div>
                        <div className="rpyClr" style={{ marginLeft: "0.625rem" }}>{userName}</div>
                        <div id="topicsNumber" style={{ marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" }}>{topicNumber}&nbsp;<span style={{ color: "red" }}>{this.props.sendTopicNumber}</span> </div>
                    </div>
                    <div className="row" style={{ display: "flex", flexWrap: "nowrap" }}>
                        <div id="clockimg" style={{ marginLeft: "0.375rem" }}><i className="fa fa-clock-o fa-lg fa-fw"></i></div>
                        <div><span className="timeProp">{moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    </div>
                </div>
                <div style={{ height: "6rem", borderBottom:"#eaeaea solid thin" }}>
                <div id="operation"  >
                    <Link className="operation" to="">引用</Link>
                    <Link className="operation" to="">编辑</Link>
                    <Link className="operation" to={email}>私信</Link>
                    <Link className="operation" to="">举报</Link>
                    <Link className="operation" to={curUserPostUrl}>只看此用户</Link>
                    </div>
                   </div>
            </div></div>;
    }
}