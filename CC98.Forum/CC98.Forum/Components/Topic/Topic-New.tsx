
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
import Spin from 'antd/es/spin'
/**
 * 表示全站最新主题列表
 */
export class AllNewTopic extends React.Component<{}, FocusTopicAreaState> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("AllNewTopic");
        if (!data) {
            data = [];
        }
        this.state = {
            data: data,
            from: 0,
            loading: true,
            buttonClassName: ''
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    async componentDidMount() {
        let data = await Utility.getAllNewTopic(0, this.context.router);

        if (data) {
            //缓存获取到的数据                      
            Utility.setStorage("AllNewTopic", data);
            this.setState({ data: data, from: data.length });
        }

        //滚动条监听
        document.addEventListener('scroll', this.handleScroll);
    }

    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    async componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }
    //回到顶部
    scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    }

    /**
     * 处理滚动的函数
     */
    async handleScroll() {
        //控制回到顶部按钮出现
        if (window.pageYOffset > 234) {
            this.setState({
                buttonClassName: 'btn-show'
            });
        }
        //控制回到顶部按钮消失
        if (window.pageYOffset < 234) {
            this.setState(prevState => ({
                buttonClassName: prevState.buttonClassName === '' ? '' : 'btn-disappare'
            })
            );
        }
        //控制获取新帖
        if (Utility.isBottom() && this.state.loading) {
            /**
            *查看新帖数目大于100条时不再继续加载
            */
            if (this.state.from > 199) {
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                return;
            }
            /**
            *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
            */
            this.setState({ loading: false });
            try {
                var newData = await Utility.getAllNewTopic(this.state.from, this.context.router);
            } catch (err) {
                /**
                *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                */
                this.setState({ loading: true });
                return;
            }
            /**
            *如果正确获取到数据，则添加新数据，翻页+1，同时this.state.loading设置为true，后续才可以再次发送fetch请求
            */
            //拼接时防止出现重复帖子
            if (newData && newData.length > 0) {
                let data = this.state.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === newData[0].id) {
                        break;
                    }
                }
                data = data.slice(0, i).concat(newData);
                this.setState({ data: data, from: data.length, loading: true });
                Utility.setStorage(`AllNewTopic`, data);
            }
            else {
                this.setState({ loading: true });
                return;
            }
        }
    }
    /**
     * 将主题排列好
     */
    render() {
       
        return (<div className="focus-root">
            <DocumentTitle title={`查看新帖 - CC98论坛`} />
                <div className="focus" >
                    <Category />
                    <div className="focus-topic-area">
                        <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                        <div className="focus-topic-loading" id="focus-topic-loading">
                            <Spin size='large' /></div>
                        <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">无法加载更多了，小水怡情，可不要沉迷哦~</div>
                    <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
                </div>
            </div>
            </div>);
    }
}

/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} floorCount={item.floorCount} />;
}

/**
 * 导航器组件
 */
export class Category extends React.Component {

    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
                    <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to={"/"}>首页</Link>
                    <i className="fa fa-chevron-right"></i>
                    <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>查看新帖</div>
               </div>;
    }
}
