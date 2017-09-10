import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppState } from '../States/AppState';
import { HotTopicState } from '../States/AppState';
import { HotTopic } from './HotTopic';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export class Recommended1 extends React.Component<{}, {}> {
    render() {
        return <div className="recommended1">
            <div className="recommended1Content">
                <div className="content1">
                    <div className="recommended1Img"><img src="images/recommended2Img.jpg" /></div>
                    <div className="coloum">
                        <div className="recommended1Title">推荐阅读标题1</div>
                        <div className="recommended1Abstract">推荐阅读摘要1</div>
                    </div>
                </div>
                <div className="content1">
                    <div className="recommended1Img"><img src="images/recommended2Img.jpg" /></div>
                    <div className="coloum">
                        <div className="recommended1Title">推荐阅读标题2</div>
                        <div className="recommended1Abstract">推荐阅读摘要2</div>
                    </div>
                </div>
                <div className="content1">
                    <div className="recommended1Img"><img src="images/recommended2Img.jpg" /></div>
                    <div className="coloum">
                        <div className="recommended1Title">推荐阅读标题3</div>
                        <div className="recommended1Abstract">推荐阅读摘要3</div>
                    </div>
                </div>
                <div className="content1">
                    <div className="recommended1Img"><img src="images/recommended2Img.jpg" /></div>
                    <div className="coloum">
                        <div className="recommended1Title">推荐阅读标题4</div>
                        <div className="recommended1Abstract">推荐阅读摘要4</div>
                    </div>
                </div>
                <div className="content1">
                    <div className="recommended1Img"><img src="images/recommended2Img.jpg" /></div>
                    <div className="coloum">
                        <div className="recommended1Title">推荐阅读标题5</div>
                        <div className="recommended1Abstract">推荐阅读摘要5</div>
                    </div>
                </div>
            </div>
            <div className="buttonRow">
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
                <div className="recommended1Button"></div>
            </div>
        </div>
    }
}

export class HotTopicComponent extends React.Component<{}, HotTopicState> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            hotTopicState: new Array<HotTopic>(),
        }

    }

    async getHotTopic() {
        let hotTopics: HotTopic[] = [];
        var response = await fetch('http://api.cc98.org/Topic/Hot');
        var data = await response.json();
        for (let i = 0; i < 10; i++) {
            hotTopics[i] = new HotTopic(data[i].title, data[i].boardName)
        }
        return hotTopics;
    }

    async componentDidMount() {
        var x = await this.getHotTopic();
        this.setState({
            hotTopicState: x,
        })
    }


    convertHotTopic(item: HotTopic) {
        return <div className="listRow">
            <div className="boardName" > [{item.boardName}]</div><div className="topicTitle">{item.title}</div>
        </div>
    }

    render() {
        return <div>{this.state.hotTopicState.map(this.convertHotTopic)}</div>
    }
}
/**
 * 网站的主页面对象。
 */
export class MainPage extends React.Component<{}, AppState> {
    render() {
        return <div className="mainPage">

            <div className="leftPart">
                <div className="announcement">
                    <div className="blueBar1">
                        <div className="listName">论坛公告</div>
                    </div>
                    <div className="announcementContent">
                        <div className="row"><div className="announcementDate">[2017.08.17]</div><div className="announcementText">公告1</div><div className="announcementLink1">★详情点击★</div></div>
                        <div className="row"><div className="announcementDate">[2017.08.17]</div><div className="announcementText">公告2</div><div className="announcementLink1">★详情点击★</div></div>
                        <div className="row"><div className="announcementDate">[2017.08.17]</div><div className="announcementText">公告3</div><div className="announcementLink1">★详情点击★</div></div>
                        <div className="row">
                            <div className="announcementLink2">★广播台点歌通道★</div>
                            <div className="announcementLink2">★CC98 Share★</div>
                            <div className="announcementLink2">★推荐阅读投稿★</div>
                            <div className="announcementLink2">★社团及学生组织用户认证申请★</div>
                            <div className="announcementLink2">★MyCC98 安卓客户端★</div>
                        </div>
                    </div>
                </div>
                <Recommended1 />
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">热门话题</div>
                            <div className="more">更多</div>
                        </div>
                        <div className="listContent">
                            <HotTopicComponent />
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">校园活动</div>
                            <div className="more">更多</div>
                        </div>
                        <div className="listContent">
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">★-----------------------------★</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">首页除了十大之外的部分还没施工好哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">其他部分的内容都是乱填哒</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">如果前辈你看不到十大的内容</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">那么可能是你忘了挂RVPN哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">★-----------------------------★</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">首页除了十大之外的部分还没施工好哦</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">其他部分的内容都是乱填哒</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">如果前辈你看不到十大的内容</div></div>
                            <div className="row"> <div className="boardName">[提示]</div><div className="topicTitle">那么可能是你忘了挂RVPN哦</div></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">学术信息</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">最热回复</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">最新动态</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">求职广场</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="list1">
                        <div className="blueBar2">
                            <div className="listName">实习兼职</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                    <div className="list2">
                        <div className="blueBar2">
                            <div className="listName">失物招领</div>
                            <div className="more">更多</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightPart">
                <div className="recommended2">
                    <div className="dashedBorder">
                        <div className="heading">推荐</div>
                    </div>
                    <div className="coloum">
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">广播台点歌通道</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">CC98抽卡游戏</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">CC98 share</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">推荐阅读投稿</div>
                        </div>
                        <div className="row">
                            <div className="recommended2Img"><img src="/images/recommended2Img.jpg"></img></div>
                            <div className="recommended2Title">社团及学生组织用户认证申请</div>
                        </div>
                    </div>
                </div>
                <div className="ad">
                    <img src="/images/ad.jpg"></img>
                </div>
                <div className="news">
                    <div className="dashedBorder">
                        <div className="heading">校园新闻</div>
                    </div>
                    <div className="newsContent">
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                        <div className="newsText">校论坛CC98倒闭啦</div>
                    </div>
                </div>
                <div className="boardRecommended">
                    <div className="heading">版面推荐</div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                    <div className="blueBackdrop"></div>
                </div>
            </div>

        </div>
    }

}

