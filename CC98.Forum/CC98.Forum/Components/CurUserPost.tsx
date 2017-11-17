import * as React from 'react';
import * as State from '../States/AppState';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';
import {
    Route,
    Link
} from 'react-router-dom';

import { match } from 'react-router';
import * as moment from 'moment';

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {

    constructor(props?, context?) {
        super(props, context);
    }
    get match(): match<TMatch> {
        return (this.props as any).match;
    }
}

export class CurUserPost extends RouteComponent<{}, { topicid, page, totalPage, userId }, { topicid, page, userId }> {
    constructor(props, context) {
        super(props, context);
        this.state = { page: 1, topicid: this.match.params.topicid, totalPage: 1, userId: 559244 };
    }
    async componentWillReceiveProps(newProps) {
        let page: number;
        if (!newProps.match.params.page) {
            page = 1;
        }
        else { page = parseInt(newProps.match.params.page); }
        const userId = newProps.match.params.userId;
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicid);
        console.log("kk" + newProps.match.params.userId);
        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userId: newProps.match.params.userId });
    }
    async componentDidMount() {
        let page: number;
        if (!this.match.params.page) {
            page = 1;
        }
        else { page = parseInt(this.match.params.page); }
        const totalPage = await this.getTotalPage.bind(this)(this.match.params.topicid);
        const userId = this.match.params.userId;
        console.log("this" + userId);
        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userId: userId });
    }
    async getTotalPage(topicid) {
        let token = Utility.getLocalStorage("accessToken");
        const replyCountResponse = await fetch(`http://apitest.niconi.cc/post/topic/user?topicid=${topicid}&userid=${this.match.params.userId}&from=0&size=1`, { headers: { 'Authorization': token } });
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson[0].count;
        if (replyCount > 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    }

    render() {
        let topic = null;
		if (this.state.page == 1) {
			topic = <PostTopic imgUrl="/images/ads.jpg" page={this.state.page} topicid={this.state.topicid} userId={this.state.userId} />;
		}    
			
        return <div className="center" style={{width:"80%"}} >
            <TopicPager userId={this.state.userId} page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
            {topic}
            <Route path="/topic/:topicid/user/:userId/:page?" component={Reply} />
            <TopicPagerDown userId={this.state.userId} page={this.state.page} topicid={this.state.topicid} totalPage={this.state.totalPage} />
        </div>
            ;

    }

}
export class Reply extends RouteComponent<{}, { contents }, { page, topicid, userId }>{
    constructor(props, content) {
        super(props, content);
        this.state = {
            contents: [],
        };

    }

    async componentWillReceiveProps(newProps) {
        const page = newProps.match.params.page || 1;
        const storageId = `TopicContent_${newProps.match.params.topicid}_${page}`;
        /* if (!Utility.getStorage(storageId)) {
             realContents = await Utility.getTopicContent(newProps.match.params.topicid, page);
             Utility.setStorage(storageId, realContents);
         }
         else {
             realContents = Utility.getStorage(storageId);
         }*/
        const url = `http://apitest.niconi.cc/user/${newProps.match.params.userId}`;
        const response = await fetch(url);

        const data = await response.json();
        const userName = data.name;

        const realContents = await Utility.getCurUserTopicContent(newProps.match.params.topicid, page, userName, newProps.match.params.userId);

        this.setState({ contents: realContents });

    }
    private generateContents(item: State.ContentState) {
        return <div className="reply" ><div style={{ marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" }}>
            <Replier key={item.id} userId={item.userId} topicid={item.topicId} userName={item.userName} replyTime={item.time} floor={item.floor} userImgUrl={item.userImgUrl} sendTopicNumber={item.sendTopicNumber} />
            <ReplyContent key={item.content} content={item.content} signature={item.signature} />
        </div>
        </div>;
    }
    render() {
        return <div className="center" style={{ width: "100%" }}>
            {this.state.contents.map(this.generateContents)}
        </div>
            ;
    }
}

export class Replier extends RouteComponent<{ userId, topicid, userName, replyTime, floor, userImgUrl, sendTopicNumber }, State.ReplierState, { topicid }>{
    constructor(props, content) {
        super(props, content);
        this.state = {
            imgUrl: "/images/authorImg.jpg",
            timeImgUrl: "/images/clock.jpg",
            userName: "VayneTian",
            replyTime: Date(),
            topicsNumber: 999,
            level: 2,
        }
    }
    render() {
        let url = `/user/${this.props.userId}`;
        let realUrl = encodeURIComponent(url);
        let curUserPostUrl = `/topic/${this.props.topicid}/user/${this.props.userId}`;
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
        let topicNumber = '帖数 ';
        if (!this.props.userId) {
            topicNumber = '';
        }
        let userDetails;
        if (this.props.userName != '匿名') {
            userDetails = <UserDetails userName={this.props.userName} />;
        } else {
            userDetails = null;
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
                        <div style={{ marginLeft: "0.625rem" }}>   <div style={{ marginLeft: "0.625rem" }}><span>第</span><span style={{color:"red"}}>{this.props.floor}</span><span>楼</span></div></div>
                        <div className="rpyClr" style={{ marginLeft: "0.625rem" }}><a href={url}>{this.props.userName}</a></div>
                        <div id="topicsNumber" style={{ marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" }}>{topicNumber}   <span style={{ color: "red" }}>{this.props.sendTopicNumber}</span> </div>
                    </div>
                    <div className="row" style={{ display: "flex", flexWrap: "nowrap" }}>
                        <div id="clockimg" style={{ marginLeft: "0.375rem" }}><i className="fa fa-clock-o fa-lg fa-fw"></i></div>
                        <div><span className="timeProp">{moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                    </div>
                </div>
                <div id="operation"  >
                    <button className="operation">引用</button>
                    <button className="operation">编辑</button>
                    <button className="operation">私信</button>
                    <button className="operation">举报</button>
                    <Link className="operation" to={curUserPostUrl}>只看此用户</Link>
                </div>
            </div></div>;
    }
}
export class UserDetails extends RouteComponent<{ userName }, { portraitUrl, userName }, {}>{
    constructor(props) {
        super(props);
        this.state = ({ portraitUrl: null, userName: null });
    }
    async componentDidMount() {
        if (this.props.userName != '匿名') {
            let url = `http://apitest.niconi.cc/user/name/${this.props.userName}`;
            let message = await fetch(url);
            let data = await message.json();
            this.setState({ portraitUrl: data.portraitUrl, userName: this.props.userName });
        }
    }
    render() {
        let url = `/user/name/${this.props.userName}`;
        let userUrl = encodeURIComponent(url);
        if (this.props.userName != '匿名') {
            return <div className='popup'>
                <div className='popup_title'>
                    <div className="row">
                        <div className="row authorImg" style={{ marginLeft: "10px", marginTop: "10px" }}>
                            <a href={userUrl}> <img src={this.state.portraitUrl}></img></a>
                        </div>
                        <div className="column" style={{ marginLeft: "25px", marginTop: "30px" }}>
                            <div className="row">
                                <div style={{ fontFamily: "微软雅黑", color: "blue", marginRight: "10px" }}> {this.state.userName}</div>   <div style={{ marginRight: "10px", fontSize: "14px" }}>   粉丝  </div><div style={{ color: "red", fontSize: "12px" }}>2333</div>
                            </div>
                            <div className="row" style={{ marginTop: "10px", fontSize: "14px" }}>
                                技术组组长
                        </div>
                        </div>
                        <div>
                            <button id="watch" style={{ width: "80px", backgroundColor: "#FF6A6A", marginRight: "10px", marginLeft: "25px", marginTop: "50px", height: "30px" }}>关注</button>
                        </div>
                    </div>

                </div>
            </div>;
        } else {
            return;
        }
    }
}
export class PostTopic extends RouteComponent<{ imgUrl, page, topicid, userId }, State.PostTopicState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            topicMessage: { title: '加载中...', time: '2017' },
            userName: ""
        };
    }
    async componentDidMount() {
        const topicMessage = await Utility.getTopic(this.props.topicid);
        const response = await fetch(`http://apitest.niconi.cc/user/${this.props.userId}`);
        const data = await response.json();
        const userName = data.name;
        this.setState({ topicMessage: topicMessage, userName: userName });
    }

    render() {
        if (this.state.userName === this.state.topicMessage.userName) {
            return <div className="root">
                <div className="essay">
                    <AuthorMessage authorName={this.state.topicMessage.userName} authorImgUrl={this.state.topicMessage.userImgUrl} />
                    <TopicTitle Title={this.state.topicMessage.title} Time={this.state.topicMessage.time} HitCount={this.state.topicMessage.hitCount} likeNumber={this.state.topicMessage.likeCount} dislikeNumber={this.state.topicMessage.dislikeCount}  />
                    <div id="ads"><img src={this.props.imgUrl}></img></div>
                </div>


                <TopicContent content={this.state.topicMessage.content} signature={this.state.topicMessage.signature} likeNumber={this.state.topicMessage.likeCount} dislikeNumber={this.state.topicMessage.dislikeCount} />
                <TopicGood />
                <TopicVote />
            </div>;
        } else {
            return null;
        }

    }
}

export class AuthorMessage extends RouteComponent<{ authorName: string, authorImgUrl: string }, State.AuthorMessageState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: this.props.authorImgUrl
        };
    }
    render() {
        const url = `/user/name/${this.props.authorName}`;
        return <div className="row" id="authormes">

            <div className="authorImg" ><a href={url}><img src={this.props.authorImgUrl}></img></a></div>
            <div className="column" style={{ marginRight:"1rem" }}>
                <div className="row authorFans" style={{ justifyContent: "space-between" }}>
                    <div id="authorName"><p><a href={url}>{this.props.authorName}</a></p></div>
                    <div id="fans" className="row"><div style={{ marginRight: "0.1875rem" }}>粉丝</div><div style={{ color: "#EE0000" }}>{this.state.fansNumber}</div></div>
                </div>

                <div className="row">
                    <button id="watch" style={{ marginLeft:"1rem" }}>关注</button>
                    <button id="email" style={{ marginLeft: "1rem" }}>私信</button>
                </div>
            </div>
        </div>;
    }
}
export class TopicTitle extends RouteComponent<{ likeNumber, dislikeNumber, Title, Time, HitCount }, State.TopicTitleState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            isNotice: true,
            isTop: true,
            title: "这是一个长长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊的标题",
            tag: "女装/开车",
            time: "2017.8.12",
            likeNumber: this.props.likeNumber,
            dislikeNumber: this.props.dislikeNumber,
            viewTimes: 2366
        }
    }
    componentDidMount() {
        this.setState({ likeNumber: this.props.likeNumber, dislikeNumber: this.props.dislikeNumber });
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
export class TopicContent extends RouteComponent<{ content: string, signature: string, likeNumber: number, dislikeNumber: number   }, { likeNumber: number, dislikeNumber: number }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
        }
    }
    componentDidMount() {
        this.setState({ likeNumber: this.props.likeNumber, dislikeNumber: this.props.dislikeNumber });
    }
    //<div className="signature">{this.state.Signature}</div>
    render() {
        if (this.props.signature == "") {
            return <div className="content">
                <div className="substance"><UbbContainer code={this.props.content} /> </div>
                <div className="comment1">
                    <div id="commentlike" className="buttonFont"><button className="commentbutton"><i className="fa fa-star-o fa-lg"></i></button>   收藏文章 </div>
                    <div id="commentliked"><i className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentunliked"><i className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton">   评分</div><div className="commentbutton">   编辑</div></div>
                </div>
            </div>;
        } else {
            return <div className="content">
                <div className="substance"><UbbContainer code={this.props.content} /> </div>
                <div className="signature"><UbbContainer code={this.props.signature} /></div>
                <div className="comment">
                    <div id="commentlike" className="buttonFont"><button className="commentbutton"><i className="fa fa-star-o fa-lg"></i></button>   收藏文章 </div>
                    <div id="commentliked"><i className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentunliked"><i className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton">   评分</div><div className="commentbutton">   编辑</div></div>
                </div>
            </div>;
        }
    }
}

export class ReplyContent extends RouteComponent<{ content, signature }, { likeNumber, dislikeNumber }, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            likeNumber: 2424,
            dislikeNumber: 4433,
        }
    }

    render() {
        if (this.props.signature == "") {
            return <div className="root" style={{ marginTop: "-170px" }}>
                <div className="reply-content">
                    <div className="substance"><UbbContainer code={this.props.content} /></div>

                    <div className="comment1">

                        <div id="commentliked"><i className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                        <div id="commentunliked"><i className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                        <div id="commentlike"> <div className="commentbutton">   评分</div></div>
                    </div>
                </div></div>;
        }
        else {
            return <div className="root" style={{ marginTop: "-170px" }}>
                <div className="reply-content">
                    <div className="substance"><UbbContainer code={this.props.content} /></div>
                    <div className="comment">

                        <div id="commentliked"><i className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                        <div id="commentunliked"><i className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                        <div id="commentlike"> <div className="commentbutton">   评分</div></div>
                    </div>
                    <div className="signature"><UbbContainer code={this.props.signature} /></div>

                </div></div>;
        }
    }
}
export class TopicGood extends RouteComponent<{}, State.TopicGoodState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            userName: 'Mana',
            grade: 10,
            reward: 20,
            credit: '6666炒鸡赞',
            imgUrl: '/images/authorImg.jpg'
        };
    }
    render() {
        return <div className="good tagSize" style={{ marginLeft: '2px' }}>
            <div id="userImage"><img src={this.state.imgUrl} ></img> </div>
            <div id="userName"><span>{this.state.userName}</span></div>
            <div id="grades"><span>评分 </span><span id="grade">+{this.state.grade}</span></div>
            <div id="reward"><span>赏金 </span><span id="money">{this.state.reward}</span><span>论坛币</span></div>
            <div id="credit"><span>{this.state.credit}</span></div>
        </div>;
    }
}

export class TopicVote extends RouteComponent<{}, State.TopicVoteState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            option: '我认为他说的很对',
            votes: 60,
            totalVotes: 220,
            voted: false,
        };
    }
    render() {
        return <div className="vote" style={{ marginLeft: '2px' }}>
            <div className="row"><input id="checkbox" type="checkbox" /> <span id="option" style={{ marginLeft: '15px' }}>{this.state.option} </span></div>
            <div className="row">
                <div className="progress">
                    <div className="voteResult"></div>
                </div>
                <span style={{ marginLeft: '15px' }}>{this.state.votes}</span>
                <span> ({this.state.votes / this.state.totalVotes * 100}%)</span>
            </div>
            <div style={{ marginLeft: '20px' }}>{this.state.voted ? <span>你已经投过票啦</span> : <button className="operation">投票</button>}</div>
        </div>;
    }
}
export class TopicPager extends RouteComponent<{ userId, page, topicid, totalPage, }, { pager }, {}> {
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

        return <PageModel userId={this.props.userId} pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        console.log('new=' + newProps.userId);
        this.setState({ pager: pages });
    }

    render() {
        return <div className="row" style={{ width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ pageNumber, topicid, curPage, totalPage, userId }, { userName }> {
    constructor(props) {
        super(props);
        this.state = ({ userName: "" });
    }
    async componentDidMount() {
        const response = await fetch(`http://apitest.niconi.cc/user/${this.props.userId}`);
        console.log("cc" + this.props.userId);
        const data = await response.json();
        const userName = data.name;
        this.setState({ userName: userName });
    }
    render() {
        const last = '<';
        const next = '>';
        const start = '<<';
        const end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;
            } else {
                return <li className="page-item active"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;

            }

        } else if (this.props.pageNumber == -1) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.curPage - 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{last}</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.curPage + 1}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{next}</Link></li>
                ;
        } else if (this.props.pageNumber == -3) {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/1`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{start}</Link></li>
                ;
        } else {
            var pageUrl = `/topic/${this.props.topicid}/user/${this.props.userId}/${this.props.totalPage}`;
            return <li className="page-item"><Link className="page-link" to={pageUrl}>{end}</Link></li>
                ;
        }
    }
}
export class TopicPagerDown extends RouteComponent<{ userId, page, topicid, totalPage }, { pager }, {}> {
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

        return <PageModel userId={this.props.userId} pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
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
