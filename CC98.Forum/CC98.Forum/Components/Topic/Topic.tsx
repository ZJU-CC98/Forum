import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { UbbEditor } from '../UbbEditor';
import { match } from "react-router";
import { UbbContainer } from '.././UbbContainer';
import * as Reducer from '../../reducers';
import { store} from '../../reducers';
import { Provider } from 'react-redux';
import * as Redux from 'redux'
import { ReduxReplyContent } from '../../reducers';
//import { TopicPager, TopicPagerDown, PageModel } from './Topic-Pager';
//import { PostTopic } from './Topic-PostTopic';
//import { HotReply, Reply } from './Topic-Post';
//import { SendTopic } from './Topic-SendTopic';
//import { Category } from './Topic-Category';
//import { PostManagement } from './Post-Management';
declare let moment: any;
declare let editormd: any;

export module Constants {
    export var testEditor;
}

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class Post extends RouteComponent<{}, { topicid, page, totalPage, userName }, { topicid, page, userName }> {
    constructor(props, context) {
        super(props, context);
       
        this.handleChange = this.handleChange.bind(this);
        this.state = { page: 1, topicid: this.match.params.topicid, totalPage: 1, userName: null };
    }
    componentDidUpdate() {
        scrollTo(0, 0);
    }
    async handleChange() {
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        const userName = this.match.params.userName;
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userName = newProps.match.params.userName;
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName });
    }

    async componentDidMount() {

        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage(this.match.params.topicid);
        const userName = this.match.params.userName;
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
    }
    async getTotalPage(topicId) {
        return Utility.getTotalReplyCount(topicId, this.context.router);
    }

    returnTopic() {
        return <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} />;

    }
    render() {
        let topic = null;
        let hotReply = null;
        if (this.state.page === 1) {
            topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={null} />;
            hotReply = <Route path="/topic/:topicid/:page?" component={HotReply} />;
        }
        return <div className="center" >
            <div className="row" style={{ width: "100%", justifyContent: 'space-between', borderBottom: '#EAEAEA solid thin', alignItems: "center" }}>
                <Category topicId={this.state.topicid} />
                <TopicPager page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} /></div>
            {topic}
            {hotReply}
        
                <Route path="/topic/:topicid/:page?" component={Reply} />
          
            <TopicPagerDown page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
            <SendTopic onChange={this.handleChange} topicid={this.state.topicid} />
        </div>
            ;

    }

}
export class TopicPager extends RouteComponent<{ page, topicid, totalPage }, { pager }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
    }
	/**
	 * 将页码转换为 UI 界面。
	 * @param pageNumber 要转换的页码。
	 * @returns {JSX.Element} 页码对应的 UI 元素。
	 */
    generatePageLink(pageNumber: number) {
        return <PageModel pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    }
    render() {
        return <div id="pager" >
            <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
        </div>
            ;
    }
}
export class TopicPagerDown extends RouteComponent<{ page, topicid, totalPage }, { pager }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
    }
	/**
	 * 将页码转换为 UI 界面。
	 * @param pageNumber 要转换的页码。
	 * @returns {JSX.Element} 页码对应的 UI 元素。
	 */


    generatePageLink(pageNumber: number) {

        return <PageModel pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    } t
    render() {
        return <div className="row" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ pageNumber, topicid, curPage, totalPage }, {}> {

    render() {
        let pageUrl: string;
        if (this.props.pageNumber > 0) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;
            } else {
                return <li className="page-item active"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;

            }

        } else if (this.props.pageNumber == -1) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.curPage - 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.curPage + 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -3) {
            pageUrl = `/topic/${this.props.topicid}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;&lsaquo;</Link></li>
                ;
        } else {
            pageUrl = `/topic/${this.props.topicid}/${this.props.totalPage}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;&rsaquo;</Link></li>
                ;
        }
    }
}

export class PostTopic extends RouteComponent<{ userId, imgUrl, page, topicid }, { topicMessage, likeState, awardInfo, info, awardPage }, {}> {
    constructor(props, content) {
        super(props, content);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "", postid: 0 }
            , likeState: 0, awardInfo: [], info: [], awardPage: 1
        }
    }
    async update() {
        console.log("topic should update");
        this.setState({});
    }
    async nextPage() {
        const page = this.state.awardPage;
        const award = await Utility.getAwardInfo(this.state.topicMessage.postId, page + 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ info: awardInfo, awardPage: page + 1 });
    }
    async lastPage() {
        const id = `#awardPager${this.state.topicMessage.postId}`;
        const page = this.state.awardPage;
        if (this.state.awardPage === 1) {
            $(id).css("disabled", "true");
            return;
        }
        const award = await Utility.getAwardInfo(this.state.topicMessage.postId, page - 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);

        this.setState({ info: awardInfo, awardPage: page - 1 });
    }
    async generateAwardInfo(item) {
        const url = await Utility.getPortraitUrl(item.operatorName);
        return <AwardInfo postId={this.state.topicMessage.postId} userImgUrl={url} content={item.content} reason={item.reason} userName={item.operatorName} />;
    }
    async componentWillMount() {
        let topicMessage = await Utility.getTopic(this.props.topicid, this.context.router);

        const award = await Utility.getAwardInfo(topicMessage.postId, 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ topicMessage: topicMessage, awardInfo: award, info: awardInfo });
    }

    render() {
        const awardPagerId = `awardPager${this.state.topicMessage.postId}`;
        let awardPager = null;
        if (this.state.info.length !== 0) {

            awardPager = < div className="row" >
                <button className="awardPage" id={awardPagerId} onClick={this.lastPage}>上一页</button>
                <button className="awardPage" onClick={this.nextPage}>下一页</button>
            </div>;
        }

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
                        masters={this.state.topicMessage.masters}
                        update={this.update} />
                    <div className="column" style={{ width: "100%" }}>
                        {this.state.info}
                        {awardPager}
                    </div>
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
        const email = `/message/message?id=${this.props.authorId}`;
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
export class TopicContent extends RouteComponent<{ postid: number, topicid: number, content: string, signature: string, userId: number, contentType: number, masters: string[], update }, { likeState: number, likeNumber: number, dislikeNumber: number }, {}> {
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
            likeState: 0
        }
    }
    update() {
        this.props.update();
    }
    componentDidUpdate() {
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    }
    async componentDidMount() {
        const data = await Utility.getLikeState(this.props.topicid, this.context.router);
        if (data.likeState === 1) {
            $("#commentliked").css("color", "red");
        }
        else if (data.likeState === 2) {
            $("#commentdisliked").css("color", "red");
        }
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
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
    showManageUI() {

        const UIId = `#manage${this.props.postid}`;
        console.log("in manage");
        $(UIId).css("display", "");
    }
    render() {
        const divid = `doc-content${this.props.postid}`;
        let curUserPostUrl = `/topic/${this.props.topicid}/user/${this.props.userId}`;
        const ubbMode = <UbbContainer code={this.props.content} />;
        const mdMode = <div id={divid}>
            <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{this.props.content}</textarea>

        </div>;

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
                    <div className="operation1" id="postTopicManage" onClick={this.showManageUI} style={{ display: "none", cursor: "pointer" }}>管理</div>

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
                    <div className="operation1" id="postTopicManage" onClick={this.showManageUI} style={{ display: "none", cursor: "pointer" }}>管理</div>

                </div>
            </div>;
        }
    }
}
export class AwardInfo extends RouteComponent<{ postId, userImgUrl, content, userName, reason }, {}, {}> {
    constructor(props, content) {
        super(props, content);

    }
    render() {
        return <div className="good tagSize" >
            <div id="userImage"><img src={this.props.userImgUrl}></img> </div>
            <div id="userName"><span>{this.props.userName}</span></div>
            <div id="grades"><span id="grade">{this.props.content}</span></div>
            <div id="credit"><span>{this.props.reason}</span></div>
        </div>;
    }
}

export class Reply extends RouteComponent<{}, { contents, masters}, { page, topicid, userName }>{
    constructor(props, content) {

        super(props, content);
        this.state = {
            contents: [],
            masters: [],
        };

    }
    async getMasters(topicId) {
        return Utility.getMasters(topicId);
      //  store.dispatch()
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
        const masters = await this.getMasters(newProps.match.params.topicid);
        this.setState({ contents: realContents, masters: masters });

    }

    private generateContents(item: State.ContentState) {
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" }}>
            <Replier key={item.postId} isAnonymous={item.isAnonymous} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} privilege={item.privilege} />
            <Provider store={store}>
                <ReplyContent key={item.content} masters={this.state.masters} userId={item.userId} content={item.content} signature={item.signature} topicid={item.topicId} postid={item.postId} contentType={item.contentType} />
            </Provider>
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
        this.update = this.update.bind(this);
        this.state = {
            contents: [],
            masters: []
        };

    }
    update() {
        this.setState({});
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
        const realUrl = encodeURI(url);
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
                            <div style={{ fontFamily: "微软雅黑", color: "blue", marginRight: "0.63rem", width: "8rem" }}> {this.state.userName}</div>
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
export class ReplyContent extends RouteComponent<{ masters, userId, content, signature, topicid, postid, contentType }, {postId, likeNumber, dislikeNumber, likeState, awardInfo, info, awardPage }, {}> {
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.state = {
            likeNumber: 1,
            dislikeNumber: 1,
            likeState: 0,
            awardInfo: [],
            info: [],
            awardPage: 1,
            postId: this.props.postid
        }
    }
    async nextPage() {
        const page = this.state.awardPage;
        const award = await Utility.getAwardInfo(this.props.postid, page + 1);

        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);

        this.setState({ info: awardInfo, awardPage: page + 1 });
    }
    async lastPage() {
        const id = `#awardPager${this.props.postid}`;
        const page = this.state.awardPage;
        if (this.state.awardPage === 1) {
            $(id).css("disabled", "true");
            return;
        }
        const award = await Utility.getAwardInfo(this.props.postid, page - 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);

        this.setState({ info: awardInfo, awardPage: page - 1 });
    }
    showManageUI() {

        const UIId = `#manage${this.props.postid}`;

        $(UIId).css("display", "");
    }
    componentDidUpdate() {
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
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
        const award = await Utility.getAwardInfo(this.props.postid, 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        const divid = `doc-content${this.props.postid}`;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState, awardInfo: award, info: awardInfo });
    }
    async generateAwardInfo(item) {
        const url = await Utility.getPortraitUrl(item.operatorName);
        return <AwardInfo postId={this.props.postid} userImgUrl={url} content={item.content} reason={item.reason} userName={item.operatorName} />;
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
        const awardPagerId = `awardPager${this.props.postid}`;
        let awardPager = null;

        if (this.state.info.length !== 0) {
            awardPager = < div className="row" >
                <button className="awardPage" id={awardPagerId} onClick={this.lastPage}>上一页</button>
                <button className="awardPage" onClick={this.nextPage}>下一页</button>
            </div>;

        } else {
            $(".awardInfo").css("display", "none");
        }
        let signature = <div className="signature"><UbbContainer code={this.props.signature} /></div>;
        if (this.props.signature == "") {
            signature = null;
        }
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

                {signature}
                <div className="column awardInfo" style={{ borderTop: "2px dashed #EAEAEA" }}>
                    {this.state.info}
                    {awardPager}
                </div>
            </div></div>;
    }
}

export class SendTopic extends RouteComponent<{ topicid, onChange, }, { content: string, mode: number }, {}>{
    constructor(props) {
        super(props);
        this.sendUbbTopic = this.sendUbbTopic.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.update = this.update.bind(this);
        this.state = ({ content: '', mode: 1 });
    }
    update(value) {
        this.setState({ content: value });
    }
    componentDidMount() {
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
        });
    }
    componentDidUpdate() {
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
        });

    }
    async sendUbbTopic() {
        let url = `http://apitest.niconi.cc/post/topic/${this.props.topicid}`;
        let content = {
            content: this.state.content,
            contentType: 0,
            title: ""
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
        this.props.onChange();
        this.setState({ content: "" });
    }
    async sendMdTopic() {
        try {
            let url = `http://apitest.niconi.cc/post/topic/${this.props.topicid}`;
            let c = Constants.testEditor.getMarkdown();
            let content = {
                content: c,
                contentType: 1,
                title: ""
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
            Constants.testEditor.setMarkdown("");
            this.props.onChange();
            this.setState({ content: "" });
        } catch (e) {
            console.log("Error");
            console.log(e);
        }
    }
    changeEditor() {
        if (this.state.mode === 0) {

            this.setState({ mode: 1 });
        } else {
            this.setState({ mode: 0 });
        }
    }
    async upload(e) {
        const files = e.target.files;
        const res = await Utility.uploadFile(files[0]);
        const url = res.content;
        if (this.state.mode === 1) {
            const str = `![](http://apitest.niconi.cc${url})`;
            Constants.testEditor.appendMarkdown(str);
        } else {
            const str = `[img]http://apitest.niconi.cc${url}[/img]`;
            const ex = this.state.content;
            const cur = ex + str;
            this.setState({ content: cur });
        }
    }
    getInitialState() {
        return { value: '' };
    }
    handleChange(event) {

        this.setState({ content: event.target.value });
    }
    render() {

        let mode, editor;
        if (this.state.mode === 0) {
            mode = '使用UBB模式编辑';
            editor = <div>
                <UbbEditor update={this.update} />
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendUbbTopic} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复
                    </div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>切换到Markdown编辑器            </div> </div></div>;
        }
        else {
            mode = '使用Markdown编辑';
            editor = <div id="sendTopic">
                <form>
                    <div id="test-editormd" className="editormd">
                        <textarea className="editormd-markdown-textarea" name="test-editormd-markdown-doc" value={this.state.content}  ></textarea>
                    </div>
                </form>
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>回复</div>

                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>切换到UBB编辑器

                    </div>
                </div>

            </div>;
        }
        return <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <form method="post" encType="multipart/form-data">
                <input type="file" id="upload-files" onChange={this.upload.bind(this)} />
            </form>
            {editor}
        </div>;
    }
}
export class PostManagement extends React.Component<{ userId, postId }, { wealth, prestige, reason, tpdays, UI, tips }>{
    constructor(props) {
        super(props);
        this.wealthInput = this.wealthInput.bind(this);
        this.prestigeInput = this.prestigeInput.bind(this);
        this.reasonInput = this.reasonInput.bind(this);
        this.tpdaysInput = this.tpdaysInput.bind(this);
        this.confirm = this.confirm.bind(this);
        this.showAwardUI = this.showAwardUI.bind(this);
        this.showPunishUI = this.showPunishUI.bind(this);
        this.showDeleteUI = this.showDeleteUI.bind(this);
        this.state = { wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award", tips: "" }
    }
    showAwardUI() {
        this.setState({ UI: "Award" });
    }
    showPunishUI() {
        this.setState({ UI: "Punish" });
    }
    showDeleteUI() {
        this.setState({ UI: "Delete" });
    }
    confirm() {
        if ($("input[name='reason']:checked").val()) {
            Utility.awardWealth($("input[name='reason']:checked").val(), this.state.wealth, this.props.postId);
            const UIId = `#manage${this.props.postId}`;
            $(UIId).css("display", "none");
            store.dispatch({ 'type': 'add-award' });
            store.subscribe(this.render);
        } else {
            if (this.state.reason === "") {
                console.log("请输入原因！");
                this.setState({ tips: "请输入原因！" });
                return false;
            } else {
                Utility.awardWealth(this.state.reason, this.state.wealth, this.props.postId);
                const UIId = `#manage${this.props.postId}`;
                $(UIId).css("display", "none");
                this.setState({ reason: "" });
                 store.dispatch({ 'type': 'add-award' });
            store.subscribe(this.render);
            }
        }

    }
    wealthInput(e) {
        this.setState({ wealth: e.target.value });
    }
    prestigeInput(e) {
        this.setState({ prestige: e.target.value });
    }
    reasonInput(e) {
        this.setState({ reason: e.target.value });
    }
    tpdaysInput(e) {
        this.setState({ tpdays: e.target.value });
    }
    render() {
        let UI;
        const awardUI = <div className="column" id="award">
            <div className="row manageOperation">
                <div className="manageObject">财富值</div>
                <input type="text" value={this.state.wealth} onChange={this.wealthInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">威望</div>
                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />
            </div>
            <div className="column manageOperation">
                <div className="manageObject">原因</div>
                <div className="row">
                    <div className="row">
                        <input type="radio" name="reason" value="好文章" /><div>好文章</div>
                    </div>
                    <div className="row">
                        <input type="radio" name="reason" value="有用资源" /><div>有用资源</div>
                    </div>
                    <div className="row">
                        <input type="radio" name="reason" value="热心回复" /><div>热心回复</div></div>
                </div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                <div>{this.state.tips}</div>
            </div>
        </div>;
        const punishUI = <div className="column" id="punish" >
            <div className="row manageOperation">
                <div className="manageObject">扣威望</div>
                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">禁止发言(天)</div>
                <input type="text" value={this.state.tpdays} onChange={this.tpdaysInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">原因</div>

                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                <div>{this.state.tips}</div>
            </div>
        </div>;
        const deleteUI = <div className="column" id="punish" >
            <div className="row manageOperation">
                <div className="manageObject">删除原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
            </div>
        </div>;
        const UIId = `manage${this.props.postId}`;
        UI = awardUI;
        if (this.state.UI === "Award") UI = awardUI;
        if (this.state.UI === "Punish") UI = punishUI;
        if (this.state.UI === "Delete") UI = deleteUI;
        return <div style={{ display: "none" }} id={UIId} className="postManagement">
            <div className="manageUI">
                <div className="row manageOptions">
                    <div className="manageOptions-icon" onClick={this.showAwardUI} style={{ color: "#FF7F00" }}>奖励</div>
                    <div className="manageOptions-icon" onClick={this.showPunishUI} style={{ color: "red" }}>惩罚</div>
                    <div className="manageOptions-icon" onClick={this.showDeleteUI}>删除</div>
                </div>
            </div>
            {UI}
            <button onClick={this.confirm} className="confirmManagement">确认</button>
        </div>;
    }
}
export class Category extends React.Component<{ topicId }, { boardId, topicId, boardName, title }>{
    constructor(props) {
        super(props);
        this.state = ({ boardId: "", topicId: "", boardName: "", title: "" });
    }
    async componentDidMount() {
        const body = await Utility.getCategory(this.props.topicId, this.context.router);
        this.setState({ boardId: body.boardId, topicId: body.topicId, boardName: body.boardName, title: body.title });
    }
    render() {
        const listUrl = `/list/${this.state.boardId}/normal`;
        const topicUrl = `/topic/${this.state.topicId}`;
        return <div style={{ color: "grey", fontSize: "1rem" }}><i className="fa fa-window-maximize fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href="/">首页</a><i className="fa fa-arrow-right fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href={listUrl} >{this.state.boardName}</a><i className="fa fa-arrow-right fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis", width: "10rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href={topicUrl}>{this.state.title}</a></div>;
    }
}