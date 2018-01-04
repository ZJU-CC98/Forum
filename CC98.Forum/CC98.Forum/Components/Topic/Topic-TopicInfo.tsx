import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { AdsComponent } from '../MainPage';
declare let moment: any;
interface Props {
    topicInfo;
    boardInfo;
    tag1;
    tag2;
    isFav;
}
export class TopicInfo extends React.Component<Props, { tag1Name, tag2Name, isFollow }>{
    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.state = { tag1Name: "", tag2Name: "", isFollow: this.props.isFav }
    }
    async follow() {
        await Utility.setFavoriteTopic(this.props.topicInfo.id);
        this.setState({ isFollow: true });
    }
    async unFollow() {
        await Utility.deleteFavoriteTopic(this.props.topicInfo.id);
        this.setState({ isFollow: false });
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
        const url = `/static/images/_${this.props.boardInfo.name}.png`;
        const boardUrl = `/list/${this.props.boardInfo.id}`;
        let tags = null;

        if (this.props.tag1 || this.props.tag2) {
            tags = <div id="tags"><div className="tagProp tagSize">标签： {this.state.tag1Name} {this.state.tag2Name}</div><div className="tagProp"></div></div>;
        }
        return <div className="topicInfo-info">
            <div className="topicInfo-title">
                <div className="column" id="topicTitleProp" >
                    <div id="essay1" className="row">
                        {this.props.topicInfo.title}

                    </div>
                    <div className="row" id="essayProp">
                        {tags}
                        <div id="time"><div className="viewProp"><i className="fa fa-clock-o fa-lg fa-fw"></i></div> <div className="timeProp tagSize">{moment(this.props.topicInfo.time).format('YYYY-MM-DD HH:mm:ss')}</div></div>
                        <div id="viewtimes"><div className="viewProp"><i className="fa fa-eye fa-lg fa-fw"></i>  </div> <div className="timeProp tagSize">{this.props.topicInfo.hitCount}</div></div>
                        <div className="followTopic" onClick={this.state.isFollow ? this.unFollow : this.follow}>
                            {this.state.isFollow ? "已收藏" : "收藏"}
                        </div>
                    </div>
                </div>

                <div className="topicInfo-boardMessage">
                    <Link to={boardUrl}><div style={{color:"#6b7178"}}>{this.props.boardInfo.name}</div></Link>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>{this.props.boardInfo.todayCount} / {this.props.boardInfo.topicCount}</div>
                </div>

            </div>
            <div className="topicInfo-ads">
                <AdsComponent />
            </div>
        </div>;
    }
}