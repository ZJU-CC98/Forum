import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { AdsComponent } from '../MainPage';
import * as moment from 'moment';
import { NoticeMessage } from "../NoticeMessage";
interface Props {
    topicInfo;
    boardInfo;
    tag1;
    tag2;
    isFav;
}
export class TopicInfo extends React.Component<Props, { tag1Name, tag2Name, isFollow, showImageState: boolean, followCount: number }>{
    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.state = { tag1Name: "", tag2Name: "", isFollow: this.props.isFav, showImageState: true, followCount: this.props.topicInfo.favoriteCount }
    }

    toggleImageState = () => {
        this.setState(prevState => ({
            showImageState: !prevState.showImageState
        }));
    }

    showAllImg = () => {
        let btns = document.getElementsByClassName("hiddenImage");
        for (let btnId in btns) {
            if (btns.hasOwnProperty(btnId)) {
                let btn: any = btns[btnId];
                btn.click();
            }
        }
        this.toggleImageState();
    }

    hideAllImg = () => {
        let btns = document.getElementsByClassName("visibleImage");
        for (let btnId in btns) {
            if (btns.hasOwnProperty(btnId)) {
                let btn: any = btns[btnId];
                btn.click();
            }
        }
        this.toggleImageState();
    }

    copyTopicUrl(props: Props) {
        const content = `【${props.boardInfo.name}】${props.topicInfo.title} https://www.cc98.org/topic/${props.topicInfo.id} 复制本链接到浏览器或者打开【CC98】微信小程序查看~`;
        Utility.copyToClipboard(content)
            .then(() => {
                Utility.noticeMessageShow("copySuccess");
            })
            .catch((err) => {
                Utility.noticeMessageShow("copyError");
                console.error(`Unable to copy text: ${content}`, err);
            });
    }

    async follow() {
        await Utility.setFavoriteTopic(this.props.topicInfo.id);
        this.setState({ isFollow: true, followCount: this.state.followCount + 1 });
    }
    async unFollow() {
        await Utility.deleteFavoriteTopic(this.props.topicInfo.id);
        this.setState({ isFollow: false, followCount: this.state.followCount - 1 });
    }
    async componentDidMount() {
        let t1 = "", t2 = "";
        if (this.props.tag1)
            t1 = await Utility.getTagNamebyId(this.props.tag1);
        if (this.props.tag2)
            t2 = await Utility.getTagNamebyId(this.props.tag2);
        this.setState({ tag1Name: t1, tag2Name: t2 });
    }

    async componentWillReceiveProps(newProps) {
        let t1 = "", t2 = "";
        if (newProps.tag1)
            t1 = await Utility.getTagNamebyId(newProps.tag1);
        if (newProps.tag2)
            t2 = await Utility.getTagNamebyId(newProps.tag2);
        this.setState({ tag1Name: t1, tag2Name: t2 });
    }
    onError(e) {
        e.preventDefault();
        e.target.src = `/static/images/_CC98协会.png`;
    }

    render() {
        const title = this.props.topicInfo.title || '';
        /* 过长字符串截断，65 是纯中文情况下的经验值 */
        const overflowLen = 65;

        const url = `/static/images/_${this.props.boardInfo.name}.png`;
        const boardUrl = `/board/${this.props.boardInfo.id}`;
        let tags = null;

        if (this.props.tag1 || this.props.tag2) {
            tags = <div id="tags"><div className="tagProp tagSize">标签： {this.state.tag1Name} {this.state.tag2Name}</div><div className="tagProp"></div></div>;
        }
        // 显示/收起所有图片按钮
        let toggleImageStateButton = this.state.showImageState ?
            <div
                className="followTopic"
                style={{ width: "6rem" }}
                onClick={this.hideAllImg}>
                收起所有图片
            </div>
            :
            <div
                className="followTopic"
                style={{ width: "6rem" }}
                onClick={this.showAllImg}>
                显示所有图片
            </div>

        return <div className="topicInfo-info">
            <div className="topicInfo-title">
                <div className="column" id="topicTitleProp" >
                    <div id="essay1" className="row" title={title.length > overflowLen ? title : undefined}>
                        {
                            title.length <= overflowLen ? title : title.slice(0, overflowLen) + ' ...'
                        }
                    </div>
                    <div className="row" id="essayProp">
                        {tags}
                        <div id="time"><div className="viewProp"><i className="fa fa-clock-o fa-lg fa-fw"></i></div> <div className="timeProp tagSize">{moment(this.props.topicInfo.time).format('YYYY-MM-DD HH:mm:ss')}</div></div>
                        <div id="viewtimes"><div className="viewProp"><i className="fa fa-eye fa-lg fa-fw"></i>  </div> <div className="timeProp tagSize">{this.props.topicInfo.hitCount}</div></div>
                        <div id="followCount"><div className="viewProp">{this.state.isFollow ? <i className="fa fa-star fa-lg fa-fw"></i> : <i className="fa fa-star-o fa-lg fa-fw"></i>} </div> <div className="timeProp tagSize">{this.state.followCount}</div></div>
                        <div className="followTopic" onClick={this.state.isFollow ? this.unFollow : this.follow}>
                            {this.state.isFollow ? "已收藏" : "收藏"}
                        </div>
                        {this.state.showImageState ?
                            <div
                                className="followTopic"
                                style={{ width: "6rem" }}
                                onClick={this.hideAllImg}>
                                收起所有图片
                            </div>
                            :
                            <div
                                className="followTopic"
                                style={{ width: "6rem" }}
                                onClick={this.showAllImg}>
                                显示所有图片
                            </div>}
                        <div
                            className="followTopic"
                            style={{ width: "6rem" }}
                            onClick={() => this.copyTopicUrl(this.props)}>
                            分享帖子链接
                        </div>
                    </div>
                </div>

                <div className="topicInfo-boardMessage">
                    <Link to={boardUrl}><div style={{ color: "#6b7178" }}>{this.props.boardInfo.name}</div></Link>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>{this.props.boardInfo.todayCount} / {this.props.boardInfo.topicCount}</div>
                </div>

            </div>
            <div className="topicInfo-ads">
                <AdsComponent />
            </div>
            <NoticeMessage text="已将分享内容复制到剪贴板" id="copySuccess" top="13.7%" left="45%" />
            <NoticeMessage text="将分享内容复制到剪贴板时出现错误" id="copyError" top="13.7%" left="45%" />
        </div>;
    }
}