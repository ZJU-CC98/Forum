import * as React from "react";
import { RecommendedTopic } from "../../Props/RecommendedTopic";
import { RecommendedTopicSingle } from "../Focus/RecommendedTopicSingle";
import { RecommendedTopicAreaState } from "../../States/RecommendedTopicAreaState";
import * as Utility from "../../Utility";
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
} from "react-router-dom";
import DocumentTitle from "../DocumentTitle";
import Spin from "antd/es/spin";
//import pDebounce from "p-debounce";

/**
 * 表示全站最新主题列表
 */
export class AllRecommendedTopic extends React.Component<{}, RecommendedTopicAreaState> {
    isLoadable: boolean;
    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        let data = [];
        this.state = { data: data };
        this.isLoadable = true;
    }

    /**
     * 进入立即获取10条随机推荐主题的数据
     */
    async componentDidMount() {
        let data = Utility.getStorage("CurrentRecommendedTopics");

        if (!data) {
            this.isLoadable = false;
            try {
                data = await Utility.getRandomRecommendedTopic(10);
            } catch (err) {
                this.isLoadable = true;
                return;
            }
            Utility.setStorage("CurrentRecommendedTopics", data);
            this.setState({ data: data });
            this.isLoadable = true;
        }
        else {
            this.setState({ data: data });
        }
    }


    /**
     * 获取新帖子的函数
     */
    async getNewRandomRecommendedTopics() {
        //控制获取新帖
        if (this.isLoadable) {
            this.isLoadable = false;
            try {
                var newData = await Utility.getRandomRecommendedTopic(10);
            } catch (err) {
                this.isLoadable = true;
                return;
            }
            Utility.setStorage("LastRecommendedTopics", Utility.getStorage("CurrentRecommendedTopics"));
            Utility.setStorage("CurrentRecommendedTopics", newData);
            this.setState({ data: newData });
            document.getElementById('recommendation-last').hidden = false;
            this.isLoadable = true;
        }
    }

    /**
     * 获取上一批主题帖。使用完后隐藏上一批按钮。
     */
    async getLastRemcommendedTopics() {
        let data = Utility.getStorage("LastRecommendedTopics");
        if (data) {
            document.getElementById('recommendation-last').hidden = true;
            this.setState({ data: data });
            Utility.setStorage("CurrentRecommendedTopics", data);
            Utility.removeStorage("LastRecommendedTopics");
        }
    }

    /**
     * 将主题排列好
     */
    render() {
        return (
            <div className="focus-root">
                <DocumentTitle title={`随机精选 - CC98论坛`} />
                <div className="focus">
                    <Category />
                    <div className="recommendation-button-area">
                        <button className="recommendation-button" id="recommendation-refresh" onClick={() => this.getNewRandomRecommendedTopics()}>
                            <i className="fa fa-refresh fa-md"></i>换一换
                        </button>
                        <button className="recommendation-button" id="recommendation-last" hidden={true} onClick={() => this.getLastRemcommendedTopics()}>
                            <i className="fa fa-hand-o-left fa-md"></i>上一批
                        </button>
                    </div>
                    <div className="focus-topic-area">
                        <div className="focus-topic-topicArea">
                            {this.state.data.map(convertRecommendedTopic)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 单个主题数据转换成单个主题组件
 */
function convertRecommendedTopic(item: RecommendedTopic, index: number) {
    return (
        <RecommendedTopicSingle
            key={item.topic.id}
            topic={item.topic}
            content={item.content}
        />
    );
}

/**
 * 导航器组件
 */
export class Category extends React.Component {
    render() {
        return (
            <div
                className="row"
                style={{
                    alignItems: "baseline",
                    justifyContent: "flex-start",
                    color: "grey",
                    fontSize: "0.75rem",
                    marginBottom: "1rem",
                }}
            >
                <Link
                    style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }}
                    to={"/"}
                >
                    首页
                </Link>
                <i className="fa fa-chevron-right"></i>
                <div
                    style={{
                        color: "grey",
                        fontSize: "1rem",
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                    }}
                >
                    随机精选
                </div>
            </div>
        );
    }
}
