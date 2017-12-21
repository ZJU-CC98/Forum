
import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import { FocusTopicSingle } from '../Focus/FocusTopicSingle';
import { FocusTopicAreaState } from '../../States/FocusTopicAreaState';
import * as Utility from '../../Utility';
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
            loading: true
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
    
    /**
     * 处理滚动的函数
     */
    async handleScroll() {
        if (Utility.isBottom() && this.state.loading) {
            /**
            *查看新帖数目大于100条时不再继续加载
            */
            if (this.state.from >= 99) {
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
                let data = this.state.data
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === newData[0].id) {
                        break;
                    }
                }
                data = data.slice(0, i).concat(newData);
                this.setState({ data: data, from: data.length, loading: true });
                Utility.setStorage("AllNewTopic", data);
            }
        }
    }
    /**
     * 将主题排列好
     */
    render() {
        return (<div className="focus-root">
                    <div className="focus" >
                        <div className="focus-allNewTopic"><i className="fa fa-home" aria-hidden="true"></i>首页/全站新帖</div>
                        <div className="focus-topic-area">
                            <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                    <div className="focus-topic-loading" id="focus-topic-loading"><i style={{ marginTop: "1rem" }} className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>
                            <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">没有更多帖子啦~</div>
                        </div>
                    </div>
                </div>);
    }
}

/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} fanCount={item.fanCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} />;
}