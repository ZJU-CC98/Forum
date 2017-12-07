import * as React from 'react';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
export class ReplierSignature extends React.Component<{ signature,postid ,topicid,masters,userId}, {likeNumber,dislikeNumber,likeState}>{
    constructor(props, content) {
        super(props, content);
        this.showManageUI = this.showManageUI.bind(this);
        this.showJudgeUI = this.showJudgeUI.bind(this);
        this.state = {
            likeNumber: 1,
            dislikeNumber: 1,
            likeState: 0,
        }
    }
    showManageUI() {
        const UIId = `#manage${this.props.postid}`;
        $(UIId).css("display", "");
    }
    showJudgeUI() {
        const UIId = `#judge${this.props.postid}`;
    
        $(UIId).css("display", "");
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
        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
    }
 
    render() {
        const manageIcon = `icon${this.props.postid}`;
        const idLike = `like${this.props.postid}`;
        const idDislike = `dislike${this.props.postid}`;
        let signature = <div className="signature" style={{ borderTop: "#eaeaea solid thin",width:"100%" }}><UbbContainer code={this.props.signature} /></div>;
        if (this.props.signature == "") {
            signature = null;
        }
        return <div className="column">
            <div className="comment1">
                <div id={idLike} className="upup" style={{ marginRight: "0.7rem" }}><i title="赞" onClick={this.like.bind(this)} className="fa fa-thumbs-o-up fa-lg"></i><span className="commentProp"> {this.state.likeNumber}</span></div>
                <div id={idDislike} className="downdown"  ><i title="踩" onClick={this.dislike.bind(this)} className="fa fa-thumbs-o-down fa-lg"></i><span className="commentProp"> {this.state.dislikeNumber}</span></div>
                <div id="commentlike">
                    <div style={{ cursor: "pointer" }} className="commentbutton" onClick={this.showJudgeUI}>   评分</div>
                    <div className="operation1" id={manageIcon} style={{ display: "none", cursor: "pointer" }} onClick={this.showManageUI}>管理</div>
                </div>
            </div>
            <div className="row" style={{ width: "100%" }}>  {signature}
            </div>

        </div>;
    }
}