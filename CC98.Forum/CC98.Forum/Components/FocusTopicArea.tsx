// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../Props/FocusTopic';
import { FocusTopicSingle } from './FocusTopicSingle';
import { FocusBoardProps } from '../Props/FocusBoardProps'
import { FocusTopicAreaState } from '../States/FocusTopicAreaState';
import * as Utility from '../Utility';
/**
 * 表示我关注的版面的主题列表
 */
export class FocusTopicArea extends React.Component<{}, FocusTopicAreaState> {
    
    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardTopic");
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
        let data = await Utility.getFocusTopic(this.state.from, this.context.router);

        //先看一下有没有缓存的数据，如果有的话新数据跟缓存数据组合一下
        let oldData =  Utility.getStorage("focusBoardTopic");
        if(oldData) {
             for (var i = 0; i < data.length; i++) {
                // 最新的20 条数据跟之前的有重合就组合起来
                if (data[i].id == oldData[0].id) {
                    data = data.slice(0,i).concat(oldData);
                    break;
                }
             }
        } 

        //最多100条新帖
        if(data.length > 100) {
            data = data.slice(0,100);
        }

        this.setState({ data: data, from: data.length });
        //缓存获取到的数据
        Utility.setStorage("focusBoardTopic", data);

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
                var newData = await Utility.getFocusTopic(this.state.from, this.context.router);
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
            let data = this.state.data.concat(newData);
            this.setState({ data: data, from: data.length, loading: true });
            Utility.setStorage("focusBoardTopic", data);
        }
    }
    /**
     * 将主题排列好
     */
    render() {                                                                                           
        return <div className="focus-topic-area">
                    <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                    <div className="focus-topic-loading" id="focus-topic-loading"><img src="http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif"></img></div>
                    <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">已加载100条新帖，无法加载更多了~</div>
               </div>;
    }
    
}

/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} fanCount={item.fanCount} />;
}