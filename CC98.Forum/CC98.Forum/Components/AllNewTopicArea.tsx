// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../Props/FocusTopic';
import { FocusTopicSingle } from './FocusTopicSingle';
import { FocusTopicAreaState } from '../States/FocusTopicAreaState';
import * as Utility from '../Utility';
/**
 * 表示全站最新主题列表
 */
export class AllNewTopicArea extends React.Component<{}, FocusTopicAreaState> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            curPage: 1,
            loading: true
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    async componentDidMount() {
        let data = await Utility.getAllNewTopic(this.state.curPage);
        this.setState({ data: data });

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
        if (isBottom() && this.state.loading) {
            /**
            *查看新帖数目大于100条时不再继续加载
            */
            if (this.state.curPage >= 5) {
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                return;
            }
            /**
            *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
            */
            this.setState({ loading: false });
            try {
                var newData = await Utility.getAllNewTopic(this.state.curPage + 1);
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
            this.setState({ data: this.state.data.concat(newData), curPage: this.state.curPage + 1, loading: true });
        }
    }
    /**
     * 将主题排列好
     */
    render() {
        return <div className="focus-topic-area">
            <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
            <div className="focus-topic-loading" id="focus-topic-loading"><img src="http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif"></img></div>
            <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">---------------------- 已加载100条新帖，无法加载更多 ----------------------</div>
        </div>;
    }

}

/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} fanCount={item.fanCount} />;
}


/**
*滚动条在Y轴上的滚动距离
*/
function getScrollTop() {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

/**
*文档的总高度
*/
function getScrollHeight() {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

/**
*浏览器视口的高度
*/
function getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

/**
*判断滚动条是否滚动到底部
*/

function isBottom() {
    /*
    *预留100px给“正在加载”的提示标志
    */
    if (getScrollTop() + getWindowHeight() + 100 > getScrollHeight()) {
        return true;
    }
    else {
        return false;
    }
}