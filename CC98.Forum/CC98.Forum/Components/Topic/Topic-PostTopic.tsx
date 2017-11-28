import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { RouteComponent } from './Topic';
import { match } from "react-router";
import { UbbContainer } from '.././UbbContainer';
import { PostManagement } from './Post-Management'
//import { AwardInfo } from './Topic-AwardInfo';
declare let moment: any;
declare let editormd: any;

export class PostTopic extends RouteComponent<{ userId, imgUrl, page, topicid }, { topicMessage, likeState }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "", postid: 0 }
            , likeState: 0
        }
    }
    async componentWillMount() {
        let topicMessage = await Utility.getTopic(this.props.topicid, this.context.router);
        this.setState({ topicMessage: topicMessage });
    }
    render() {
        if (this.state.topicMessage != null) {
            if (this.state.topicMessage.userId == this.props.userId || this.props.userId == null) {
                return <div className="root" id="1">
                    <div className="essay">
                        <AuthorMessage authorId={this.state.topicMessage.userId} authorName={this.state.topicMessage.userName} authorImgUrl={this.state.topicMessage.userImgUrl} isAnonymous={this.state.topicMessage.isAnonymous} isFollowing={this.state.topicMessage.isFollowing}
                            fanCount={this.state.topicMessage.fanCount} />
                        <TopicTitle Title={this.state.topicMessage.title} Time={this.state.topicMessage.time} HitCount={this.state.topicMessage.hitCount} />
                        <div id="ads"><img width="100%" src={this.props.imgUrl}></img></div>
                    </div>

                    <TopicContent postid={this.state.topicMessage.postId} content={this.state.topicMessage.content} signature={this.state.topicMessage.signature} topicid={this.props.topicid} userId={this.state.topicMessage.userId}
                        contentType={this.state.topicMessage.contentType}
                        masters={this.state.topicMessage.masters} />
                    <AwardInfo />
                </div>;
            }
            else {
                return null;
            }
        } else {
            return null;
        }
    }
}


export class AuthorMessage extends RouteComponent<{ isAnonymous: boolean, authorName: string, authorId: number, authorImgUrl: string, isFollowing: boolean, fanCount }, State.AuthorMessageState, {}> {
    constructor(props, content) {
        super(props, content);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: this.props.authorImgUrl,
            buttonInfo: '关注',
            isFollowing: false,
            buttonIsDisabled: false
        };
    }
    async unfollow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '取关中'
            });
            const token = Utility.getLocalStorage("accessToken");
            const userId = this.props.authorId;
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

            const userId = this.props.authorId;
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
    componenDidMount() {


        if (this.state.isFollowing === true) {
            this.setState({ buttonInfo: "取消关注", isFollowing: true });
        } else {
            this.setState({ buttonInfo: "关注", isFollowing: false });
        }
    }
    render() {
        const email = `/message/message/${this.props.authorId}`;
        const url = `/user/${this.props.authorId}`;
        let urlHtml = <a href={url}><img src={this.props.authorImgUrl}></img></a>;
        let userHtml = <div id="authorName"><p><a href={url}>{this.props.authorName}</a></p></div>;
        if (this.props.isAnonymous == true) {
            urlHtml = <img src={this.props.authorImgUrl}></img>;
            userHtml = <div id="authorName"><p>{this.props.authorName}</p></div>
        }
        if (this.props.isAnonymous === true) {
            $(".email").css("display", "none");
            $(".follow").css("display", "none");
            $(".authorFans").css("margin-top", "1rem");
            $("#fans").css("display", "none");
            $("#authorMes").css("width", "14rem");
        }
        return <div className="row" id="authormes">

            <div className="authorImg" >{urlHtml}</div>
            <div className="column" style={{ marginRight: "1rem" }}>
                <div className="row authorFans" style={{ justifyContent: "space-between" }}>
                    {userHtml}

                    <div id="fans" className="row"><div style={{ marginRight: "0.1875rem" }}>粉丝</div><div style={{ color: "#EE0000" }}>{this.props.fanCount}</div></div>
                </div>

                <div className="row">
                    <button className="follow" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>
                    <button className="email"><a href={email}>私信</a></button>
                </div>
            </div>
        </div>;
    }
}
export class TopicTitle extends RouteComponent<{ Title, Time, HitCount }, State.TopicTitleState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            isNotice: true,
            isTop: true,
            title: "这是一个长长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊的标题",
            tag: "女装/开车",
            time: "2017.8.12",
            likeNumber: 1,
            dislikeNumber: 1,
            viewTimes: 2366
        }
    }

    returnProps(isTop, isNotice, title) {
        if (isTop == true && isNotice == false) {
            return <div id="title1" className="row" style={{ justifyContent: "flex-start" }}>

                <div id="essayTitle">{title}</div>
            </div>;
        } else if (isTop == false && isNotice == true) {
            return <div id="title1" className="row" style={{ justifyContent: "flex-start" }}>

                <div id="essayTitle">{title}</div>
            </div>;
        } else if (isTop == true && isNotice == true) {
            return <div id="title1" className="row" style={{ justifyContent: "flex-start" }}>

                <div id="essayTitle">{title}</div>
            </div>;
        } else {
            return <div id="title1" className="row" style={{ justifyContent: "flex-start" }}>
                <div id="essayTitle">{title}</div>
            </div>;
        }
    }
    render() {
        return <div id="title">
            <div className="column" id="topicTitleProp" >
                <div id="essay1" className="row">
                    {this.returnProps(this.state.isTop, this.state.isNotice, this.props.Title)}

                </div>
                <div className="row" id="essayProp">
                    <div id="tags"><div className="tagProp tagSize">标签： {this.state.tag}</div><div className="tagProp"></div></div>
                    <div id="time"><div className="viewProp"><i className="fa fa-clock-o fa-lg fa-fw"></i></div> <div className="timeProp tagSize">{moment(this.props.Time).format('YYYY-MM-DD HH:mm:ss')}</div></div>
                    <div id="viewtimes"><div className="viewProp"><i className="fa fa-eye fa-lg fa-fw"></i>  </div> <div className="timeProp tagSize">{this.props.HitCount}次</div></div>
                </div>
            </div>

        </div>;
    }
}
export class TopicContent extends RouteComponent<{ postid: number, topicid: number, content: string, signature: string, userId: number, contentType: number, masters: string[] }, { likeState: number, likeNumber: number, dislikeNumber: number }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
            likeState: 0
        }
    }
    async componentDidMount() {
        const data = await Utility.getLikeState(this.props.topicid, this.context.router);
        if (data.likeState === 1) {
            $("#commentliked").css("color", "red");
        }
        else if (data.likeState === 2) {
            $("#commentdisliked").css("color", "red");
        }

        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    async like() {
        //取消赞
        if (this.state.likeState === 1) {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $("#commentliked").css("color", "black");
        }
        //踩改赞
        else if (this.state.likeState === 2) {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $("#commentliked").css("color", "red");
            $("#commentdisliked").css("color", "black");
        }
        //单纯赞
        else {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            $("#commentliked").css("color", "red");
        }
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);

        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    async dislike() {
        //取消踩
        if (this.state.likeState === 2) {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $("#commentdisliked").css("color", "black");
        }
        //赞改踩
        else if (this.state.likeState === 1) {
            await Utility.like(this.props.topicid, this.props.postid, this.context.router);
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $("#commentliked").css("color", "black");
            $("#commentdisliked").css("color", "red");
        }
        //单纯踩
        else {
            await Utility.dislike(this.props.topicid, this.props.postid, this.context.router);
            $("#commentdisliked").css("color", "red");
        }
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    render() {
        const divid = `doc-content${this.props.postid}`;
        let curUserPostUrl = `/topic/${this.props.topicid}/user/${this.props.userId}`;
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
        let content = ubbMode;
        //ubb

        if (this.props.contentType === 1) {

            content = mdMode;

        }
        if (Utility.getLocalStorage("userInfo")) {
            const privilege = Utility.getLocalStorage("userInfo").privilege;
            const myName = Utility.getLocalStorage("userInfo").name;
            const myId = Utility.getLocalStorage("userInfo").id;

            if (privilege === '管理员' || privilege === '超级版主' || (privilege === '全站贵宾' && myId === this.props.userId)) {
                $("#postTopicManage").css("display", "");
            }

            if (this.props.masters) {
                for (let i = 0; i < this.props.masters.length; i++) {
                    if (myName === this.props.masters[i]) {
                        $("#postTopicManage").css("display", "");
                    }
                }
            }
        }
        if (this.props.signature == "") {
            return <div className="content">
                <div className="substance">{content}</div>
                <PostManagement postId={this.props.postid} userId={this.props.userId} />
                <div className="comment1">
                    <div id="commentlike" className="buttonFont"><button className="commentbutton"><i className="fa fa-star-o fa-lg" ></i></button>   收藏文章 </div>
                    <div id="commentliked" className="upup" style={{ marginRight: "0.7rem" }} ><i title="赞" onClick={this.like.bind(this)} className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentdisliked" className="downdown" ><i title="踩" onClick={this.dislike.bind(this)} className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton">   评分</div><div className="commentbutton">   编辑</div></div>

                    <div className="operation1">引用</div>
                    <Link className="operation1" to={curUserPostUrl}>只看此用户</Link>
                    <div className="operation1" id="postTopicManage" style={{ display: "none", cursor: "pointer" }}>管理</div>

                </div>
            </div>;
        } else {
            return <div className="content">
                <div className="substance">{content} </div>
                <PostManagement postId={this.props.postid} userId={this.props.userId} />
                <div className="signature"><UbbContainer code={this.props.signature} /></div>
                <div className="comment">
                    <div id="commentlike" style={{ marginRight: "0.7rem" }} className="buttonFont"><button className="commentbutton"><i className="fa fa-star-o fa-lg"></i></button>   收藏文章 </div>
                    <div id="commentliked" className="upup" style={{ marginRight: "0.7rem" }}><i title="赞" onClick={this.like.bind(this)} className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentdisliked" className="downdown"><i title="踩" onClick={this.dislike.bind(this)} className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton">   评分</div><div className="commentbutton">   编辑</div></div>

                    <div className="operation1">引用</div>
                    <Link className="operation1" to={curUserPostUrl}>只看此用户</Link>
                    <div className="operation1" id="postTopicManage" style={{ display: "none", cursor: "pointer" }}>管理</div>

                </div>
            </div>;
        }
    }
}
export class AwardInfo extends RouteComponent<{}, State.TopicGoodState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            userName: "Mana",
            grade: 10,
            reward: 20,
            credit: "6666炒鸡赞",
            imgUrl: "/images/authorImg.jpg"
        }
    }
    render() {
        return <div className="good tagSize" >
            <div id="userImage"><img src={this.state.imgUrl}></img> </div>
            <div id="userName"><span>{this.state.userName}</span></div>
            <div id="grades"><span>评分 </span><span id="grade">+{this.state.grade}</span></div>
            <div id="reward"><span>赏金 </span><span id="money">{this.state.reward}</span><span>论坛币</span></div>
            <div id="credit"><span>{this.state.credit}</span></div>
        </div>;
    }
}