// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { SearchTopicSingle } from './SearchTopicSingle';
import { SearchState } from '../../States/SearchState';
import * as Utility from '../../Utility';
import { FocusTopic } from '../../Props/FocusTopic';

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
            loading: true
        }
        this.getMore = this.getMore.bind(this);
    }

    async getData(searchInfo: any, from: number) {
        let newTopic = await Utility.getSearchTopic(searchInfo.boardId, searchInfo.words, from, this.context.router);
        //搜索结果为0
        if (!newTopic || newTopic.length === 0) {
            this.showNoResult();
            this.setState({ loading: false });
        }
        else if (newTopic == -1) {
            if (from === 0) {
                this.showError();
                this.setState({ loading: false });
            }
            else {
                this.setState({ loading: true });
                $('#focus-topic-getMore').css('display','flex');
                $('#focus-topic-loading').addClass('displaynone');
                return;
            }
        }
        else {
            //搜索结果小于20条，无法再获取新的了,添加新数据，this.state.loading设置为false，后续不可以再次发送fetch请求
            if (newTopic.length < 20) {
                $('#focus-topic-getMore').css('display', 'none');
                $('#focus-topic-loading').addClass('displaynone');
                $('#focus-topic-loaddone').removeClass('displaynone');
                let data = this.state.data.concat(newTopic);
                this.setState({ boardName: searchInfo.boardName, data: data, from: data.length, loading: false });
            }
            //搜索结果多于20条，还可以通过滚动条继续获取,this.state.loading设置为true，后续可以再次发送fetch请求
            else {
                let data = this.state.data.concat(newTopic);
                this.setState({ boardName: searchInfo.boardName, data: data, from: data.length, loading: true });
                $('#focus-topic-getMore').css('display', 'flex');
                $('#focus-topic-loading').addClass('displaynone');
            }
        }
    }

    async componentDidMount() {
        let searchInfo = Utility.getStorage("searchInfo");
        //没有搜索条件
        if (!searchInfo) {
            this.showNoResult();
            this.setState({ loading: false });
        }
        else {
            this.setState({ boardId: searchInfo.boardId, boardName: searchInfo.boardname, words: searchInfo.words });
            $('#focus-topic-getMore').css('display', 'none');
            $('#focus-topic-loading').removeClass('displaynone');
            this.getData(searchInfo, 0);
        }
    }

    async getMore() {
        if (this.state.loading) {
            /**
            *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
            */
            $('#focus-topic-getMore').css('display','none');
            $('#focus-topic-loading').removeClass('displaynone');
            this.setState({ loading: false });
            let searchInfo = Utility.getStorage("searchInfo");
            this.getData(searchInfo, this.state.from);
        }
    }

    async componentDidUpdate() {
        let searchInfo = Utility.getStorage("searchInfo");
        if (JSON.stringify(searchInfo.words) != JSON.stringify(this.state.words)) {
            window.location.href = "/search";
        }
    }

    showNoResult() {
        $('#focus-topic-area').addClass('displaynone');
        $('#noResult').removeClass('displaynone');
    }

    showError() {
        $('#focus-topic-area').addClass('displaynone');
        $('#showError').removeClass('displaynone');
    }
    
    render() {
        return (<div className="focus-root">
                    <div className="focus" >
                            <div className="focus-allNewTopic"><i className="fa fa-home" aria-hidden="true"></i>搜索/{this.state.boardName}</div>
                            <div className="focus-topic-area" id="focus-topic-area">
                    <div className="focus-topic-topicArea">{this.state.data.map(coverFocusPost)}</div>
                    <div className="focus-topic-getMore" onClick={this.getMore} id="focus-topic-getMore">
                                        <div>点击获取更多搜索结果~</div>
                                        <div>······</div>
                                    </div>

                                    <div className="focus-topic-loading displaynone" id="focus-topic-loading"><img src="http://file.cc98.org/uploadfile/2017/12/20/6514723843.gif"></img></div>
                                    <div className="focus-topic-loaddone displaynone" id="focus-topic-loaddone"> 没有更多帖子啦~</div>
                            </div>
                            <div id="noResult" className="noResult displaynone">没有符合条件的搜索结果</div>
                            <div id="showError" className="noResult displaynone">查询出错了，请刷新重试</div>

                        </div>
                </div>)
    }
}

function coverFocusPost(item: FocusTopic) {
    return <SearchTopicSingle title={item.title} hitCount={item.hitCount} id={item.id} boardId={item.boardId} boardName={item.boardName} replyCount={item.replyCount} userId={item.userId} userName={item.userName} portraitUrl={item.portraitUrl} time={item.time} likeCount={item.likeCount} dislikeCount={item.dislikeCount} lastPostUser={item.lastPostUser} lastPostTime={item.lastPostTime} tag1={item.tag1} tag2={item.tag2} floorCount={item.floorCount} />;
}