import * as React from 'react';
import * as Utility from '../../Utility';
import { PostManagement } from './Topic-PostManagement';
import { UbbContainer } from '../UbbContainer';
import { Link } from 'react-router-dom';
declare let editormd: any;
export class TopicContent extends React.Component<{ postid: number, topicid: number, content: string, signature: string, userId: number, contentType: number, masters: string[], update ,quote,userName,replyTime}, { likeState: number, likeNumber: number, dislikeNumber: number ,favState}> {
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.showJudgeUI = this.showJudgeUI.bind(this);
        this.quote = this.quote.bind(this);
        this.update = this.update.bind(this);
        this.setFav = this.setFav.bind(this);
        this.cancelFav = this.cancelFav.bind(this);
        this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
            likeState: 0,
            favState:false
        }
    }
    quote() {
        this.props.quote(this.props.content, this.props.userName, this.props.replyTime, 1);
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
        const favState = await Utility.getFavState(this.props.topicid);
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState ,favState:favState});
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
        $(UIId).css("display", "");
    }
    showJudgeUI() {
        const UIId = `#judge${this.props.postid}`;
        $(UIId).css("display", "");
    }
    setFav() {
        Utility.setFavoriteTopic(this.props.topicid);
        this.setState({ favState: true });
    }
    cancelFav() {
        Utility.deleteFavoriteTopic(this.props.topicid);
        this.setState({ favState:false});
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
                <div className="comment1">
                    <div id="commentlike" className="buttonFont" onClick={this.state.favState ? this.cancelFav : this.setFav} style={{cursor:"pointer"}}><button className="commentbutton"><i style={this.state.favState ? { color: "red" } : null} className="fa fa-star-o fa-lg"></i></button>   {this.state.favState ? "取消收藏" : "收藏文章"} </div>
                    <div id="commentliked" onClick={this.like.bind(this)} className="upup" style={{ marginRight: "0.7rem" }} ><i title="赞"  className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentdisliked" className="downdown" onClick={this.dislike.bind(this)} ><i title="踩" className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton" style={{cursor: "pointer" }} onClick={this.showJudgeUI}>   评分</div><div className="commentbutton">   编辑</div></div>

                    <div className="operation1" onClick={this.quote}>引用</div>
                    <Link className="operation1" to={curUserPostUrl}>只看此用户</Link>
                    <div className="operation1" id="postTopicManage" onClick={this.showManageUI} style={{ display: "none", cursor: "pointer" }}>管理</div>

                </div>
            </div>;
        } else {
            return <div className="content">
                <div className="substance">{content} </div>
                <div className="comment">
                    <div id="commentlike" style={{ marginRight: "0.7rem",cursor:"pointer" }} className="buttonFont" onClick={this.state.favState ? this.cancelFav : this.setFav}>

                        <button className="commentbutton"><i style={this.state.favState ? {color:"red"}:null} className="fa fa-star-o fa-lg"></i></button>  {this.state.favState ? "取消收藏" : "收藏文章"}
                        </div>
                    <div id="commentliked" className="upup" style={{ marginRight: "0.7rem" }}onClick={this.like.bind(this)}><i title="赞"  className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                    <div id="commentdisliked" className="downdown" onClick={this.dislike.bind(this)}><i title="踩" className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                    <div id="commentlike" className="buttonFont row"> <div className="commentbutton" style={{ cursor: "pointer" }} onClick={this.showJudgeUI}>   评分</div><div className="commentbutton">   编辑</div></div>

                    <div className="operation1">引用</div>
                    <Link className="operation1" to={curUserPostUrl}>只看此用户</Link>
                    <div className="operation1" id="postTopicManage" onClick={this.showManageUI} style={{ display: "none", cursor: "pointer" }}>管理</div>

                </div>
                <div className="signature" style={{ borderTop: "#eaeaea solid thin", paddingTop:"1rem" }}><UbbContainer code={this.props.signature} /></div>
             
            </div>;
        }
    }
}
