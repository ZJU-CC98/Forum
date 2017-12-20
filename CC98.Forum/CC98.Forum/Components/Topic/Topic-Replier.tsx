import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponent } from '../RouteComponent';
import * as Utility from '../../Utility';
declare let moment: any;
export class Replier extends RouteComponent<{ userInfo, isAnonymous, topicid, floor, isDeleted, traceMode, isHot }, { traceMode, buttonIsDisabled, buttonInfo, isFollowing, fanCount, photoframe }, { topicid }>{
    constructor(props, content) {
        super(props, content);

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.changeTraceMode = this.changeTraceMode.bind(this);
        this.state = {
            traceMode: this.props.traceMode, buttonInfo: '关注',
            buttonIsDisabled: false,
            isFollowing: false, fanCount: this.props.userInfo.fanCount,
            photoframe: null
        };
    }

    changeTraceMode() {
        this.setState({ traceMode: this.state.traceMode === true ? false : true });
    }
    async unfollow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '...'
            });
            const token = Utility.getLocalStorage("accessToken");
            const userId = this.props.userInfo.id;
            const url = `/me/followee/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, {
                method: 'DELETE',
                headers
            });
            if (res.status === 200) {
                await Utility.updateUserInfo(this.props.userInfo.id);
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '关注',
                    isFollowing: false,
                    fanCount: this.props.userInfo.fanCount
                });
            } else {
                throw {};
            }
        } catch (e) {
            alert("网络错误");
        }
    }

    async follow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '...'
            });
            const token = Utility.getLocalStorage("accessToken");

            const userId = this.props.userInfo.id;
            const url = `/me/followee/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, {
                method: 'PUT',
                headers
            });
            if (res.status === 200) {
                await Utility.updateUserInfo(this.props.userInfo.id);
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '取关',
                    isFollowing: true,
                    fanCount: this.props.userInfo.fanCount + 1
                });
            } else {
                throw {};
            }
        } catch (e) {
            alert("网络错误");
        }
    }
    async componentDidMount() {
        //获取用户组
        const displayTitle = this.props.userInfo.displayTitle;
        //获取头像框html
        let phototframe = await this.getPhotoFrame(displayTitle);
        this.setState({
            photoframe: phototframe
        })
    }

    /**
     * 根据displayTitle返回头像框的HTML
     * @param displayTitle
     */
    async getPhotoFrame(displayTitle) {

        if (displayTitle) {
            let response = await fetch('/portrait.json');//获取头像框样式的配置
            let data = await response.json();
            console.log(data);
            let imageUrl; //头像框的链接
            //let style; //头像框的样式

            switch (displayTitle) {
                case "吉祥物": imageUrl = "/images/相框/_01版主.png"; break;
                case "版主": imageUrl = "/images/相框/_01版主.png"; break;
                case "编辑部部长": imageUrl = "/images/相框/_02编辑部.png"; break;
                case "编辑部成员": imageUrl = "/images/相框/_02编辑部.png"; break;
                case "技术组组长": imageUrl = "/images/相框/_03技术组.png"; break;
                case "技术组成员": imageUrl = "/images/相框/_03技术组.png"; break;
                case "论坛贵宾": imageUrl = "/images/相框/_04贵宾.png"; break;
                case "运营策划部部长": imageUrl = "/images/相框/_05策划部.png"; break;
                case "运营策划部成员": imageUrl = "/images/相框/_05策划部.png"; break;
                case "影音部部长": imageUrl = "/images/相框/_06影音部.png"; break;
                case "影音部成员": imageUrl = "/images/相框/_06影音部.png"; break;
                case "站务组组长": imageUrl = "/images/相框/_07站务组.png"; break;
                case "站务组成员": imageUrl = "/images/相框/_07站务组.png"; break;
                case "体育事业部部长": imageUrl = "/images/相框/_08体育部.png"; break;
                case "体育事业部成员": imageUrl = "/images/相框/_08体育部.png"; break;
                case "办公室主任": imageUrl = "/images/相框/_09办公室.png"; break;
                case "办公室成员": imageUrl = "/images/相框/_09办公室.png"; break;
                default: imageUrl = "/images/相框/_00普通.png"
            }

            return <img src={imageUrl} />
        }

    }

    render() {
        const url = `/user/id/${this.props.userInfo.id}`;
        const realUrl = encodeURI(url);
        const email = `/message/message?id=${this.props.userInfo.id}`;
        //用户头像
        let urlHtml = <a href={realUrl} style={{ display: "block", maxHeight: "7.5rem" }}><img className="userPortrait" src={this.props.userInfo.portraitUrl}></img></a>;

        if (this.props.isAnonymous == true) {
            urlHtml = <div style={{ display: "block", maxHeight: "7.5rem" }}><img className="userPortrait" src={this.props.userInfo.portraitUrl}></img></div>;
        }
        const curUserPostUrl = `/topic/${this.props.topicid}/user/id/${this.props.userInfo.id}`;
        const normalUrl = `/topic/${this.props.topicid}`;
        let topicNumber = '帖数';
        if (!this.props.userInfo.id) {
            topicNumber = '';
        }

        let userName = <Link style={{ color: "#fff" }} to={url}>{this.props.userInfo.name}</Link>;

        if (this.props.userInfo.privilege == "匿名" || this.props.userInfo.privilege === "匿名用户") {
            userName = <div style={{ color: "white" }} >{this.props.userInfo.name}</div>;
        }
        let emailButton;
        if (this.props.isAnonymous) emailButton = null;
        else emailButton = <button className="operation" ><Link to={email}>私信</Link></button>;
        let traceButton;
        if (this.props.isAnonymous) traceButton = null;
        else traceButton = <Link className="operation" to={this.state.traceMode === true ? normalUrl : curUserPostUrl} onClick={this.changeTraceMode}>{this.state.traceMode === true ? "返回" : "只看此用户"}</Link>;
        const hotInfo = <div style={{ color: "red", marginLeft: "1rem" }}><span>最热回复</span><span>(第</span><span>{this.props.floor}</span><span>楼)</span></div>;
        const normalInfo = <div style={{ marginLeft: "0.625rem" }}><span>第</span><span style={{ color: "red" }}>{this.props.floor}</span><span>楼</span></div>;
        let btn = null;
        if (Utility.getLocalStorage("userInfo")) {
            if (Utility.getLocalStorage("userInfo").name !== this.props.userInfo.name && !this.props.isAnonymous) {
                btn = <div className="column" style={{ width: "40%", alignItems: "flex-start", justifyContent: "flex-end", marginBottom: "2.5rem", marginLeft: "-1.5rem" }}>
                    <button className="replierBtn" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled} style={{ border: "none", marginBottom: "0.6rem" }}>{this.state.buttonInfo}</button>
                    <Link to={email}><button className="replierBtn">私信</button></Link>
                </div>;
            }
        }
        let lastLogOn;
        const curTime = new Date().getTime();
        const lastTime = new Date(this.props.userInfo.lastLogOnTime).getTime();
        const days = parseInt((Math.abs(lastTime - curTime) / 1000 / 60 / 60 / 24).toString());
        const hours = parseInt((Math.abs(lastTime - curTime) / 1000 / 60 / 60).toString());
        if (days > 365) lastLogOn = '一年前';
        else if (days > 30) lastLogOn = '一月前';
        else if (days > 7) lastLogOn = '一周前';
        else if (days > 1) lastLogOn = `${days}天前`;
        else if (hours > 1) lastLogOn = `${hours}小时前`;
        else lastLogOn = '一小时内';
        return <div className="userMessage">
            <div className="userGender">
                {this.props.userInfo.gender === 0 ? <i className="fa fa-venus" style={{ color: "#fff" }}></i> : <i className="fa fa-mars" style={{ color: "#fff" }}></i>}
            </div>

            <div style={{ width: "100%", justifyContent: "center", display: "flex", position: "relative" }}>
                <div style={{ zIndex: 100 }}>{urlHtml}</div>
                <div className="photoFrame">{this.state.photoframe}</div>
            </div>

            <div className="rpyClr" style={{ width: "100%", marginTop: "1rem", paddingLeft: "3rem" }}>
                {userName}
            </div>
            <div className="row" style={{ width: "100%" }}>
                <div className="column" style={{ width: "60%", alignItems: "flex-start", paddingLeft: "1.5rem" }}>
                    <div className="userMessageOpt">
                        帖数 {this.props.userInfo.postCount}
                    </div>
                    <div className="userMessageOpt">
                        粉丝 {this.state.fanCount}
                    </div>

                    <div className="userMessageOpt">
                        威望 {this.props.userInfo.prestige}
                    </div>

                    <div className="userMessageOpt">
                        风评 {this.props.userInfo.popularity}
                    </div>
                    <div className="userMessageOpt">
                        最后登录 {lastLogOn}
                    </div>
                </div>
                {btn}
            </div>
        </div>;

    }
}
/*return <div className="replyRoot">
            <div className="row" style={{ width: "100%", display: "flex", marginBottom: "0.625rem" }}>

                <div className="row mouse-userDetails" style={{ height: "15.625rem" }} >
                    <div className="authorImg" style={{ height: "6rem" }}>{urlHtml}</div>
                    <div className="userDetails" style={{ display: "none", position: "absolute" }}>
                        {userDetails}
                    </div>

                </div>
                <div className="column" id="rpymes" >
                    <div className="row" id="replierMes">
                        {this.props.isHot ? hotInfo : normalInfo}
                        <div className="rpyClr" style={{ marginLeft: "0.625rem" }}>{userName}</div>
                        <div id="topicsNumber" style={{ marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" }}>{topicNumber}&nbsp;<span style={{ color: "red" }}>{this.props.sendTopicNumber}</span> </div>
                    </div>
                    <div className="row" style={{ alignItems: "center", display: "flex", flexWrap: "nowrap" }}>
                        <div id="clockimg" style={{ marginLeft: "0.375rem" }}><i className="fa fa-clock-o fa-lg fa-fw" style={{ fontSize:"1rem" }}></i></div>
                        <div><span className="timeProp">{moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                        <div className="reputation">风评值：{this.props.popularity}
                            </div>
                    </div>
                </div>
                <div style={{ height: "6rem", marginRight:"2rem" }}>
                    <div id="operation"  >
                        <button className="operation" onClick={this.quote}>引用</button>
                        <button className="operation"><Link to="">编辑</Link></button>
                        {emailButton}
                        {traceButton}                 
                    </div>
                   </div>
            </div></div>;*/