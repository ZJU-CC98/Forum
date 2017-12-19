import * as React from 'react';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
import { Link } from 'react-router-dom';
declare let moment: any;
export class ReplierSignature extends React.Component<{ signature,postid ,topicid,masters,userId,likeInfo,quote,content,userInfo,replyTime,floor,lastUpdateTime,lastUpdateAuthor,boardId,isLZ}, {likeNumber,dislikeNumber,likeState}>{
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.showJudgeUI = this.showJudgeUI.bind(this);
        this.quote = this.quote.bind(this);
        this.edit = this.edit.bind(this);
        this.state = {
            likeNumber: this.props.likeInfo.likeCount,
            dislikeNumber: this.props.likeInfo.dislikeCount,
            likeState: this.props.likeInfo.likeState,
        }
    }
    quote() {
        this.props.quote(this.props.content, this.props.userInfo.name, this.props.replyTime, this.props.floor);
    }
    showManageUI() {
        const UIId = `#manage${this.props.postid}`;
        $(UIId).css("display", "");
    }
    showJudgeUI() {
        const UIId = `#judge${this.props.postid}`;    
        $(UIId).css("display", "");
    }
    edit() {

    }
    isAllowedtoEdit(userPrivilege) {
        if (Utility.getLocalStorage("userInfo")) {
            const myPrivilege = Utility.getLocalStorage("userInfo").privilege;
            if (myPrivilege === '管理员') return true;
            if (userPrivilege === '管理员') return false;
            if (Utility.isMaster(this.props.masters)) return true;
        } else {
            return false;
        }
      
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
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid);

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
        const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid);
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
    async componentDidMount() {
        const idLike = `#like${this.props.postid}`;
        const idDislike = `#dislike${this.props.postid}`;
        //const data = await Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router);
        if (this.state.likeState === 1) {
            $(idLike).css("color", "red");
        }
        else if (this.state.likeState === 2) {
            $(idDislike).css("color", "red");
        }
        const manageIcon = `icon${this.props.postid}`;
        const manageId = `#icon${this.props.postid}`;
        if (Utility.isMaster(this.props.masters) || (this.props.boardId == 144 && this.props.isLZ))
        $(manageId).css("display", "");
      //  this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
 
    render() {
        const manageIcon = `icon${this.props.postid}`;
        const idLike = `like${this.props.postid}`;
        const idDislike = `dislike${this.props.postid}`;
        let signature = <div className="signature" style={{ borderTop: "#8dc9db solid thin", width: "100%" }}><UbbContainer code={this.props.signature} /></div>;
        if (!this.props.signature) {
            signature = null;
        }
        let editIcon = null;
        const editUrl = `/editor/edit/${this.props.postid}`;
        if (this.isAllowedtoEdit(this.props.userInfo.privilege) || this.props.userInfo.name === Utility.getLocalStorage("userInfo").name) {
            editIcon = <Link to={editUrl}><div className="operation1" onClick={this.edit}>   编辑</div></Link>;
        }
        let lastUpdate = null;
        if (this.props.lastUpdateAuthor && this.props.lastUpdateTime) {
            const time = moment(this.props.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss');
            const name = this.props.userInfo.name === this.props.lastUpdateAuthor ? '作者' : this.props.lastUpdateAuthor;
            const str = `该帖最后由 ${name} 在 ${time} 编辑`;
            lastUpdate = str;
        }
        return <div className="column" style={{ marginTop:"1rem" }}>
            <div className="comment1">
                <div style={{ width: "40rem", marginLeft: "2rem", fontSize:"0.8rem" }}>
                    <span>发表于 {moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss')}</span><span style={{ marginLeft: "1rem" }}>{lastUpdate}</span></div>
                <div className="row" style={{ alignItems:"center" }}>
                <div id={idLike} className="upup" style={{ marginRight: "0.7rem" }} onClick={ this.like.bind(this) }><i title="赞"  className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                <div id={idDislike} className="downdown" onClick={this.dislike.bind(this)}><i title="踩"  className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                <div id="commentlike">
                    <div className="operation1" onClick={this.showJudgeUI}>   评分</div>
                    <div className="operation1" onClick={this.quote}>   引用</div>
                    {editIcon}
                    <div className="operation1" id={manageIcon} style={{ display: "none", cursor: "pointer" }} onClick={this.showManageUI}>管理</div>
                    </div>
                    </div>
            </div>
            <div className="row" style={{ width: "100%" }}>  {signature}
            </div>

        </div>;
    }
}