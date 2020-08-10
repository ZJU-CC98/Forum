// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import { FocusBoard } from '../../Props/FocusBoard';
import { FocusTopicSingle } from './FocusTopicSingle';
import { FocusTopicAreaState } from '../../States/FocusTopicAreaState';
import * as Utility from '../../Utility';
import Spin from 'antd/es/spin'
/**
 * 表示我关注的版面的主题列表
 */
export class FocusTopicArea extends React.Component<FocusBoard, FocusTopicAreaState> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage(`focusBoard_${this.props.id}`);
        if (!data) {
            data = [];
        }
        this.state = {
            data: data,
            from: 0,
            loading: true,
            buttonClassName: '',
            stop:false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    //回到顶部
    scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    }

    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    async componentDidMount() {
        this.getData(this.props);
    }

    async getData(props) {
        let data = await Utility.getFocusTopic(props.id, props.name, 0, this.context.router);

        if (data) {
            this.setState({ data: data, from: data.length });
            //缓存获取到的数据
            Utility.setStorage(`focusBoard_${props.id}`, data);
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
             * 查看新帖数目大于200条时不再继续加载
             * 或者加载时已经加载完了
             */
            if (this.state.stop || this.state.from > 199) {
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                return;
            }
            /**
            *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
            */
            this.setState({ loading: false });
            try {
                var newData = await Utility.getFocusTopic(this.props.id, this.props.name, this.state.from, this.context.router);
            } catch (err) {
                /**
                *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                */
                this.setState({ loading: true });
                return;
            }
            finally{
                if(newData.length === 0){
                    this.setState({stop:true});
                }
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
                Utility.setStorage(`focusBoard_${this.props.id}`, data);
            }
            this.setState({ loading: true });
            return;
        }
    }
    /**
     * 将主题排列好
     */
    render() { 
        return <div className="focus-topic-area">
            <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
            <div className="focus-topic-loading" id="focus-topic-loading"><Spin size="large" /></div>
            <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone">无法加载更多了，小水怡情，可不要沉迷哦~</div>
            <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
        </div>;
    }

}

/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item: FocusTopic) {
    return <FocusTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} floorCount={item.floorCount} />;
}