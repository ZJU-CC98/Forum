// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { SearchTopicSingle } from './SearchTopicSingle';
import { SearchState } from '../../States/SearchState';
import * as Utility from '../../Utility';
import { FocusTopic } from '../../Props/FocusTopic';
import DocumentTitle from '../DocumentTitle';
import {
    BrowserRouter as Router,
    Route,
    Link,

    withRouter
} from 'react-router-dom';
/**
 * 表示搜索结果的帖子列表
 */
export class Search extends React.Component<{}, SearchState> {

    constructor(props) {
        super(props);
        this.state = {
            boardId: 0,
            boardName: '全站',
            words: [],
            data: [],
            from: 0,
            isLoadable: true,
            buttonClassName: ''
        }
        this.getMore = this.getMore.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    async getData(searchInfo: any, from: number) {
        let newTopic = await Utility.getSearchTopic(searchInfo.boardId, searchInfo.words, from, this.context.router);
        //搜索结果为0
        if (!newTopic || newTopic.length === 0) {
            this.showNoResult();
            this.setState({ isLoadable: false });
        }
        else if (newTopic == -1) {
            if (from === 0) {
                this.showError();
                this.setState({ isLoadable: false });
            }
            else {
                this.setState({ isLoadable: true });
                $('#focus-topic-getMore').css('display', 'flex');
                $('#focus-topic-loading').addClass('displaynone');
                return;
            }
        }
        else {
            //搜索结果小于20条，无法再获取新的了,添加新数据，this.state.isLoadable设置为false，后续不可以再次发送fetch请求
            if (newTopic.length < 20) {
                $('#focus-topic-getMore').css('display', 'none');
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                let data = this.state.data.concat(newTopic);
                this.setState({ boardName: searchInfo.boardName, data: data, from: data.length, isLoadable: false });
            }
            //搜索结果多于20条，还可以通过滚动条继续获取,this.state.isLoadable设置为true，后续可以再次发送fetch请求
            else {
                let data = this.state.data.concat(newTopic);
                this.setState({ boardName: searchInfo.boardName, data: data, from: data.length, isLoadable: true });
                $('#focus-topic-getMore').css('display', 'flex');
                $('#focus-topic-loading').addClass('displaynone');
            }
        }
    }

    async getNewData(searchInfo: any, from: number) {
        let newTopic = await Utility.getSearchTopic(searchInfo.boardId, searchInfo.words, from, this.context.router);
        //搜索结果为0
        if (!newTopic || newTopic.length === 0) {
            this.showNoResult();
            this.setState({ isLoadable: false });
        }
        else if (newTopic == -1) {
            if (from === 0) {
                this.showError();
                this.setState({ isLoadable: false });
            }
            else {
                this.setState({ isLoadable: true });
                $('#focus-topic-getMore').css('display', 'flex');
                $('#focus-topic-loading').addClass('displaynone');
                return;
            }
        }
        else {
            //搜索结果小于20条，无法再获取新的了,添加新数据，this.state.isLoadable设置为false，后续不可以再次发送fetch请求
            if (newTopic.length < 20) {
                $('#focus-topic-getMore').css('display', 'none');
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                this.setState({ boardName: searchInfo.boardName, data: newTopic, from: newTopic.length, isLoadable: false });
            }
            //搜索结果多于20条，还可以通过滚动条继续获取,this.state.isLoadable设置为true，后续可以再次发送fetch请求
            else {
                this.setState({ boardName: searchInfo.boardName, data: newTopic, from: newTopic.length, isLoadable: true });
                $('#focus-topic-getMore').css('display', 'flex');
                $('#focus-topic-loading').addClass('displaynone');
            }
        }
    }

    async keyWordSearch() {
        let keyword = location.href.match(/\/search\?boardId=(\d+)&keyword=(.*)/);
        //console.log("匹配结果", keyword);
        let searchInfo = { boardId: 0, boardName: '全站', words: null };
        if (!keyword) {
            //没有搜索条件
            console.log("没有搜索关键词？")
            this.showNoResult();
            this.setState({ isLoadable: false });
        }
        else {
            searchInfo.boardId = parseInt(keyword[1]);
            searchInfo.boardName = await Utility.getBoardName(parseInt(keyword[1]));
            let keyword2 = decodeURI(decodeURI(keyword[2]));
            console.log("有搜索关键词", keyword2);
            let words = keyword2.split(' ');
            //只取前5个关键词
            if (words.length > 5) {
                words = words.splice(5);
            }
            searchInfo.words = words;
        }
        Utility.setStorage("searchInfo", searchInfo);
        this.setState({ boardId: searchInfo.boardId, boardName: searchInfo.boardName, words: searchInfo.words});
        //显示“正在加载”的效果
        $('#focus-topic-getMore').css('display', 'none');
        $('#focus-topic-loading').removeClass('displaynone');
        this.getNewData(searchInfo, 0);
        //滚动条监听
        document.addEventListener('scroll', this.handleScroll);
    }

    async componentDidMount() {
        this.keyWordSearch();
    }

    async componentWillReceiveProps(nextProps) {
        console.log("进入componentWillReceiveProps");
        $('#focus-topic-area').removeClass('displaynone');
        $('#noResult').addClass('displaynone');
        $('#showError').addClass('displaynone');
        this.keyWordSearch();
    }

    async getMore() {
        if (this.state.isLoadable) {
            /**
            *发出第一条fetch请求前将this.state.isLoadable设置为false，防止后面重复发送fetch请求
            */
            $('#focus-topic-getMore').css('display','none');
            $('#focus-topic-loading').removeClass('displaynone');
            this.setState({ isLoadable: false });
            let searchInfo = Utility.getStorage("searchInfo");
            this.getData(searchInfo, this.state.from);
        }
    }

    /*async componentDidUpdate() {
        let searchInfo = Utility.getStorage("searchInfo");
        if (searchInfo && JSON.stringify(searchInfo.words) != JSON.stringify(this.state.words)) {
            let keyword = searchInfo.words.join(' ');
            window.location.href = `/search?boardId=${searchInfo.boardId}&keword=${keyword}`;
        }
    }*/

    showNoResult() {
        $('#focus-topic-area').addClass('displaynone');
        $('#noResult').removeClass('displaynone');
    }

    showError() {
        $('#focus-topic-area').addClass('displaynone');
        $('#showError').removeClass('displaynone');
    }

    //监听滚动时间控制回到顶部按钮样式
    handleScroll(e) {
        if (window.pageYOffset > 234) {
            this.setState({
                buttonClassName: 'btn-show'
            });
        }

        if (window.pageYOffset < 234) {
            this.setState(prevState => ({
                buttonClassName: prevState.buttonClassName === '' ? '' : 'btn-disappare'
            })
            );
        }
    }

    //回到顶部
    scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    }
    
    render() {
        return (<div className="focus-root">
                    <DocumentTitle title={`搜索结果 - CC98论坛`} />
                    <div className="focus" >
                            <Category />
                            <div className="focus-topic-area" id="focus-topic-area">
                                    <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                                    <div className="focus-topic-getMore" onClick={this.getMore} id="focus-topic-getMore">
                                        <div>点击获取更多搜索结果~</div>
                                        <div>······</div>
                                    </div>
                                    <div className="focus-topic-loading displaynone" id="focus-topic-loading"><img src="http://file.cc98.org/uploadfile/2017/12/20/6514723843.gif"></img></div>
                                    <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone"> 没有更多帖子啦~</div>
                                    <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
                            </div>
                            <div id="noResult" className="noResult displaynone">
                                <img src="/static/images/searchNone.png" className="noResultPic"></img>
                                <div className="noResultText">-----------------------抱歉呢前辈，没有找到你想要的帖子哦~----------------------</div>
                            </div>
                            <div id="showError" className="resultErr displaynone">查询出错了，请刷新重试</div>
                        </div>
                </div>)
    }
}

function coverFocusPost(item: FocusTopic) {
    return <SearchTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} floorCount={item.floorCount} />;
}

export class Category extends React.Component {

    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to={"/"}>首页</Link>
            <i className="fa fa-chevron-right"></i>
            <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>搜索主题</div>
        </div>;
    }
}
