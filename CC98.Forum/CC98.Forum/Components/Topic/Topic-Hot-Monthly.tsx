import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import { FocusTopicSingle } from '../Focus/FocusTopicSingle';
import { FocusTopicAreaState } from '../../States/FocusTopicAreaState';
import * as Utility from '../../Utility';
import {
    BrowserRouter as Router,
    Route,
    Link,

    withRouter
} from 'react-router-dom';
import DocumentTitle from '../DocumentTitle';

/**
 * 导航器组件
 */
export class Category extends React.Component {

    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to={"/"}>首页</Link>
            <i className="fa fa-chevron-right"></i>
            <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>本月热门话题</div>
        </div>;
    }
}

/**
* 单个主题数据转换成单个热门话题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} floorCount={item.floorCount} />;
}

/**
 * 30日热门话题
 */
export class MonthlyHotTopic extends React.Component<{}, FocusTopicAreaState> {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            from: 0,
            loading: true,
            buttonClassName: ''
        };
    }

    async componentDidMount() {
        //更新一下未读消息数目
        Utility.refreshHoverUnReadCount();

        let data = await Utility.getMonthlyHotTopic("monthly");
        this.setState({
            data: data,
        });
    }

    render() {
        return (<div className="focus-root">
            <DocumentTitle title={`本月热门话题 - CC98论坛`} />
            <div className="focus" >
                <Category />
                <div className="focus-topic-area">
                    <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                </div>
            </div>
        </div>);
    }
}