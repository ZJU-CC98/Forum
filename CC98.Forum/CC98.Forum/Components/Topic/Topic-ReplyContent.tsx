import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { RouteComponent } from '../RouteComponent';
import { PostManagement } from './Post-Management';
import { UbbContainer } from '../UbbContainer';
declare let editormd: any;
export class ReplyContent extends RouteComponent<{ masters, userId, content, signature, topicid, postid, contentType }, { postId, likeNumber, dislikeNumber, likeState, awardInfo, info, awardPage }, {}> {
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
