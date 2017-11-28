import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { match } from "react-router";
import { UbbContainer } from '.././UbbContainer';
import { PostManagement } from './Post-Management';
import { RouteComponent } from './Topic';
declare let moment: any;
declare let editormd: any;

export class Reply extends RouteComponent<{}, { contents, masters }, { page, topicid, userName }>{
    constructor(props, content) {
        super(props, content);
        this.state = {
            contents: [],
            masters: []
        };

    }
    async getMasters(topicId) {
        return Utility.getMasters(topicId);
    }
    async componentWillReceiveProps(newProps) {
        const page = newProps.match.params.page || 1;
        const storageId = `TopicContent_${newProps.match.params.topicid}_${page}`;
        let realContents;
        /* if (!Utility.getStorage(storageId)) {
             realContents = await Utility.getTopicContent(newProps.match.params.topicid, page);
             Utility.setStorage(storageId, realContents);
         }
         else {
             realContents = Utility.getStorage(storageId);
         }*/
        realContents = await Utility.getTopicContent(newProps.match.params.topicid, page, this.context.router);
        const masters = this.getMasters(newProps.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });

    }

    private generateContents(item: State.ContentState) {
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" }}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} />
            <ReplyContent key={item.content} masters={this.state.masters} userId={item.userId} content={item.content} signature={item.signature} topicid={item.topicId} postid={item.postId} contentType={item.contentType} />
        </div>
        </div>;
    }
    render() {

        return <div className="center" style={{ width: "100%" }}>
            {this.state.contents.map(this.generateContents.bind(this))}
        </div>
            ;
    }
}
export class HotReply extends RouteComponent<{}, { masters, contents }, { page, topicid }>{
    constructor(props, content) {
        super(props, content);
        this.state = {
            contents: [],
            masters: []
        };

    }
    async getMasters(topicId) {
        return Utility.getMasters(topicId);
    }
    async componentWillReceiveProps(newProps) {

        const page = newProps.match.params.page || 1;
        if (page == 1) {
            const realContents = await Utility.getHotReplyContent(newProps.match.params.topicid, this.context.router);
            const masters = this.getMasters(newProps.match.params.topicid);
            this.setState({ contents: realContents, masters: masters });
        }


    }
    private generateContents(item: State.ContentState) {
        const floor = (item.floor % 10).toString();
        return <div className="reply" id={floor}><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" }}>
            <HotReplier key={item.id} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} isAnonymous={item.isAnonymous} />
            <ReplyContent key={item.content} masters={this.state.masters} userId={item.userId} content={item.content} signature={item.signature} topicid={item.topicId} postid={item.id} contentType={item.contentType} />
        </div>
        </div>;
    }

    render() {
        $(".header").scrollTop();
        return <div className="center" style={{ width: "100%" }}>
            {this.state.contents.map(this.generateContents)}
        </div>
            ;

    }
}
export class HotReplier extends RouteComponent<{ floor, userId, topicid, userName, replyTime, userImgUrl, sendTopicNumber, privilege, isAnonymous }, {}, { topicid }>{
    constructor(props, content) {
        super(props, content);
        this.state = {

        }
    }

    render() {
        const url = `/user/${this.props.userId}`;
        const realUrl = encodeURIComponent(url);
        const curUserPostUrl = `/topic/${this.props.topicid}/user/${this.props.userId}`;
        const email = `/message/message?id=${this.props.userId}`;
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
        } else if (this.props.privilege === "注册用户" || this.props.privilege == "匿名" || this.props.privilege === "匿名用户") {
            userName = <a style={{ color: "black" }} href={url}>{this.props.userName}</a>;
        } else if (this.props.privilege === "管理员") {
            userName = <a style={{ color: "red" }} href={url}>{this.props.userName}</a>;
        }
        return <div className="replyRoot">
            <div className="row" style={{ width: "100%", display: "flex", marginBottom: "0.625rem" }}>

                <div className="row mouse-userDetails" style={{ height: "15.625rem" }} >
                    <div className="authorImg" ><a href={realUrl}><img src={this.props.userImgUrl}></img></a></div>
                    <div className="userDetails" style={{ display: "none", position: "absolute", zindedx: "1" }}>
                        {userDetails}
                    </div>

                </div>
                <div className="column" id="rpymes" >
                    <div className="row" id="replierMes">
                        <div style={{ color: "red", marginLeft: "1rem" }}><span>最热回复</span><span>(第</span><span>{this.props.floor}</span><span>楼)</span></div>
                        <div className="rpyClr" style={{ marginLeft: "0.625rem" }}>{userName}</div>
                        <div id="topicsNumber" style={{ marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" }}>{topicNumber}&nbsp;<span style={{ color: "red" }}>{this.props.sendTopicNumber}</span> </div>
                    </div>
                    <div className="row" style={{ display: "flex", flexWrap: "nowrap" }}>
                        <div id="clockimg" style={{ marginLeft: "0.375rem" }}><i className="fa fa-clock-o fa-lg fa-fw"></i></div>
                        <div><span className="timeProp">{moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    </div>
                </div>
                <div id="operation"  >
                    <Link className="operation" to="">引用</Link>
                    <Link className="operation" to="">编辑</Link>
                    <Link className="operation" to={email}>私信</Link>
                    <Link className="operation" to="">举报</Link>
                    <Link className="operation" to={curUserPostUrl}>只看此用户</Link>
                </div>
            </div></div>;
    }
}
export class Replier extends RouteComponent<{ isAnonymous, userId, topicid, userName, replyTime, floor, userImgUrl, sendTopicNumber, privilege }, {}, { topicid }>{
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const url = `/user/${this.props.userId}`;
        const realUrl = encodeURIComponent(url);
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
        }
        return <div className="replyRoot">
            <div className="row" style={{ width: "100%", display: "flex", marginBottom: "0.625rem" }}>

                <div className="row mouse-userDetails" style={{ height: "15.625rem" }} >
                    <div className="authorImg" >{urlHtml}</div>
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
                <div id="operation"  >
                    <Link className="operation" to="">引用</Link>
                    <Link className="operation" to="">编辑</Link>
                    <Link className="operation" to={email}>私信</Link>
                    <Link className="operation" to="">举报</Link>
                    <Link className="operation" to={curUserPostUrl}>只看此用户</Link>
                </div>
            </div></div>;
    }
}
export class UserDetails extends RouteComponent<{ userName, userId }, { portraitUrl, userName, fanCount, displayTitle, birthday, gender, prestige, levelTitle, buttonIsDisabled, buttonInfo, isFollowing }, {}>{
    constructor(props) {
        super(props);
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
        this.state = ({
            portraitUrl: null, userName: null, fanCount: null, displayTitle: null, birthday: null, gender: null, prestige: null, levelTitle: null, buttonInfo: '关注',
            buttonIsDisabled: false,
            isFollowing: false
        });
    }
    async unfollow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '取关中'
            });
            const token = Utility.getLocalStorage("accessToken");
            const userId = this.props.userId;
            const url = `http://apitest.niconi.cc/user/unfollow/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'DELETE',
                headers
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '重新关注',
                    isFollowing: false
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    async follow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '关注中'
            });
            const token = Utility.getLocalStorage("accessToken");

            const userId = this.props.userId;
            const url = `http://apitest.niconi.cc/user/follow/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'POST',
                headers
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '取消关注',
                    isFollowing: true
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }

    async componentDidMount() {
        const data = await Utility.getUserDetails(this.props.userName, this.context.router);
        this.setState({ portraitUrl: data.portraitUrl, userName: data.userName, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing, buttonInfo: data.isFollowing ? '取消关注' : '关注' });
    }
    render() {
        let title = this.state.displayTitle;
        if (this.state.displayTitle === null) {
            title = this.state.levelTitle;
        }
        const year = moment(this.state.birthday).format("YYYY");
        let birthday;
        if (year === "9999") {
            birthday = moment(this.state.birthday).format("MM-DD");
        } else {
            birthday = moment(this.state.birthday).format("YYYY-MM-DD");
        }
        if (this.state.birthday == null) {
            birthday = '保密';
        }
        let gender;
        if (this.state.gender === 0) {
            gender = <i style={{ color: "pink" }} className="fa fa-venus fa-lg fa-fw"></i>;
        } else {
            gender = <i style={{ color: "blue" }} className="fa fa-mars fa-lg fa-fw"></i>;
        }
        const url = `/user/name/${this.props.userName}`;
        const userUrl = encodeURI(url);
        const urlHtml = <a href={userUrl}> <img src={this.state.portraitUrl}></img></a>;
        return <div className='popup'>
            <div className='popup_title'>
                <div className="row">
                    <div className="row authorImg" style={{ marginLeft: "10px", marginTop: "10px" }}>
                        {urlHtml}
                    </div>
                    <div className="column" style={{ marginLeft: "1.6rem", marginTop: "2rem" }}>
                        <div className="row">
                            <div style={{ fontFamily: "微软雅黑", color: "blue", marginRight: "0.63rem" }}> {this.state.userName}</div>
                            <div style={{ marginRight: "0.63rem", fontSize: "1rem" }}>   粉丝  </div>
                            <div style={{ color: "red", fontSize: "1rem" }}>{this.state.fanCount}</div>
                        </div>
                        <div className="row" style={{ marginTop: "0.63rem", fontSize: "0.87rem" }}>
                            {title}
                        </div>

                    </div>

                    <div>
                        <button className="followuser" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>

                    </div>
                </div>
                <div className="row" style={{ fontSize: "0.87rem" }}>
                    <div style={{ marginLeft: "7.2rem" }}>威望&nbsp;{this.state.prestige}</div><div style={{ marginLeft: "1rem" }}>生日&nbsp;{birthday}</div>
                    <div style={{ marginLeft: "1rem" }}>{gender}</div>
                </div>
            </div>
        </div>;
    }
}
export class ReplyContent extends RouteComponent<{ masters, userId, content, signature, topicid, postid, contentType }, { likeNumber, dislikeNumber, likeState }, {}> {
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.state = {
            likeNumber: 1,
            dislikeNumber: 1,
            likeState: 0
        }
    }
    showManageUI() {

        const UIId = `#manage${this.props.postid}`;

        $(UIId).css("display", "");
    }
    async componentDidMount() {

        const idLike = `#like${this.props.postid}`;
        const idDislike = `#dislike${this.props.postid}`;
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);
        if (data.likeState === 1) {
            $(idLike).css("color", "red");
        }
        else if (data.likeState === 2) {
            $(idDislike).css("color", "red");
        }
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    async like() {
        const idLike = `#like${this.props.postid}`;
        const idDislike = `#dislike${this.props.postid}`;
        //取消赞
        if (this.state.likeState === 1) {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $(idLike).css("color", "black");
        }
        //踩改赞
        else if (this.state.likeState === 2) {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $(idLike).css("color", "red");
            $(idDislike).css("color", "black");
        }
        //单纯赞
        else {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $(idLike).css("color", "red");
        }
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);

        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    async dislike() {
        const idLike = `#like${this.props.postid}`;
        const idDislike = `#dislike${this.props.postid}`;

        //取消踩
        if (this.state.likeState === 2) {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $(idDislike).css("color", "black");
        }
        //赞改踩
        else if (this.state.likeState === 1) {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $(idLike).css("color", "black");
            $(idDislike).css("color", "red");
        }
        //单纯踩
        else {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $(idDislike).css("color", "red");
        }
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    render() {
        const idLike = `like${this.props.postid}`;
        const idDislike = `dislike${this.props.postid}`;
        const divid = `doc-content${this.props.postid}`;
        const ubbMode = <UbbContainer code={this.props.content} />;
        const mdMode = <div id={divid}>
            <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{this.props.content}</textarea>
        </div>;

        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });

        let content;
        //ubb      
        content = ubbMode;
        //md
        if (this.props.contentType === 1) {
            content = mdMode;

        }

        const manageIcon = `icon${this.props.postid}`;
        const manageId = `#icon${this.props.postid}`;
        if (Utility.getLocalStorage("userInfo")) {
            const privilege = Utility.getLocalStorage("userInfo").privilege;
            const myName = Utility.getLocalStorage("userInfo").name;
            const myId = Utility.getLocalStorage("userInfo").id;

            if (privilege === '管理员' || privilege === '超级版主' || (privilege === '全站贵宾' && myId === this.props.userId)) {
                $(manageId).css("display", "");
            }

            if (this.props.masters) {
                for (let i = 0; i < this.props.masters.length; i++) {
                    if (myName === this.props.masters[i]) {
                        $(manageId).css("display", "");
                    }
                }
            }
        }
        if (this.props.signature == "") {
            return <div className="root" style={{ marginTop: "-170px" }}>
                <div className="reply-content">
                    <div className="substance">{content}</div>
                    <PostManagement postId={this.props.postid} userId={this.props.userId} />
                    <div className="comment1">

                        <div id={idLike} className="upup" style={{ marginRight: "0.7rem" }}><i title="赞" onClick={this.like.bind(this)} className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                        <div id={idDislike} className="downdown"  ><i title="踩" onClick={this.dislike.bind(this)} className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                        <div id="commentlike"> <div className="commentbutton">   评分</div>
                            <div className="operation1" id={manageIcon} style={{ display: "none", cursor: "pointer" }} onClick={this.showManageUI}>管理</div>

                        </div>
                    </div>
                </div></div>;
        }
        else {
            return <div className="root" style={{ marginTop: "-170px" }}>
                <div className="reply-content">
                    <div className="substance">{content}</div>
                    <PostManagement postId={this.props.postid} userId={this.props.userId} />
                    <div className="comment">

                        <div id={idLike} className="upup" style={{ marginRight: "0.7rem", }}><i title="赞" onClick={this.like.bind(this)} className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                        <div id={idDislike} className="downdown" ><i title="踩" onClick={this.dislike.bind(this)} className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                        <div id="commentlike"> <div className="commentbutton">   评分</div>
                            <div className="operation1" id={manageIcon} style={{ display: "none", cursor: "pointer" }} onClick={this.showManageUI}>管理</div>

                        </div>
                    </div>
                    <div className="signature"><UbbContainer code={this.props.signature} /></div>

                </div></div>;
        }
    }
}
