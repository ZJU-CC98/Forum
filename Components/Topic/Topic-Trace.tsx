import * as React from 'react';
import * as Utility from '../../Utility';
import { Pager } from '../Pager';
import { RouteComponent } from '../RouteComponent';
import { SendTopic } from './Topic-SendTopic';
import { Reply } from './Topic-Reply';
import { TopicInfo } from './Topic-TopicInfo';
import { Category } from './Topic-Category';
export const QuoteTraceContext = React.createContext(context => { });
export class CurUserPost extends RouteComponent<
  { history },
  {
    topicId;
    page;
    totalPage;
    topicInfo;
    boardInfo;
    content;
    shouldRender;
    isFav;
    postId;
    quote;
  },
  { topicId; page; postId, userId }
  > {
  throttling: boolean;
  replyContentInstance: SendTopic;
  constructor(props, context) {
    super(props, context);
    this.quote = this.quote.bind(this);
    this.shouldRender = this.shouldRender.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      page: 1,
      topicId: this.match.params.topicId,
      totalPage: 1,
      postId: this.match.params.postId,
      topicInfo: { replyCount: 0 },
      boardInfo: { masters: [], id: 7 },
      content: '',
      shouldRender: false,
      isFav: false,
      quote: ''
    };
    this.throttling = false;
  }
  handleQuoteContextChange = context => {
    console.log('传进topic.tsx');
    console.log(context);
    this.setState({ quote: context });
  };
  quote(content, userName, replyTime, floor, postId) {
    const y = $('#sendTopicInfo').offset().top;
    let page = this.state.page;
    if (!this.state.page) page = 1;
    const url = `#sendTopicInfo`;
    this.props.history.push(url);
    this.setState({
      quote: {
        content: content,
        userName: userName,
        replyTime: replyTime,
        floor: floor,
        postId: postId
      }
    });
  }
  async handleChange() {
    console.log('handle')
    //const postInfo = await Utility.getPostInfo(this.match.params.postId);
    const userId = this.match.params.userId;
    const postId = this.match.params.postId;
    const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
    let page: number;
    if (!this.match.params.page) {
      page = 1;
    } else {
      page = parseInt(this.match.params.page);
    }
    const totalPage = await this.getTotalPage(
      this.state.topicInfo.replyCount,
      postId
    );
    this.setState({
      page: page,
      topicId: this.match.params.topicId,
      totalPage: totalPage,
      topicInfo: topicInfo
    });
  }
  async componentWillReceiveProps(newProps) {
    let page: number;
    if (!newProps.match.params.page) {
      page = 1;
    } else {
      page = parseInt(newProps.match.params.page);
    }
    if (page != this.match.params.page) {
      console.log('will')
      const userId = newProps.match.params.userId;
      const postId = newProps.match.params.postId;
      // const postInfo = await Utility.getPostInfo(this.match.params.postId);
      const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
      const boardId = topicInfo.boardId;
      const boardInfo = await Utility.getBoardInfo(boardId);
      const isFav = await Utility.getFavState(newProps.match.params.topicId);
      const totalPage = await this.getTotalPage(
        this.match.params.topicId,
        postId
      );
      this.setState({
        page: page,
        topicId: newProps.match.params.topicId,
        totalPage: totalPage,
        postId: newProps.match.params.postId,
        topicInfo: topicInfo,
        boardInfo: boardInfo,
        isFav: isFav
      });
    }
  }
  shouldRender(fetchState) {
    if (fetchState) {
      this.setState({ shouldRender: true });
    } else {
      this.setState({ shouldRender: false });
    }
  }
  async componentDidMount() {
    console.log('did')
    const postId = this.match.params.postId;
    let page: number;
    if (!this.match.params.page) {
      page = 1;
    } else {
      page = parseInt(this.match.params.page);
    }
    const topicInfo = await Utility.getTopicInfo(this.match.params.topicId);
    const boardId = topicInfo.boardId;
    const boardInfo = await Utility.getBoardInfo(boardId);
    const totalPage = await this.getTotalPage.bind(this)(
      this.match.params.topicId,
      postId
    );
    console.log('totalpage=' + totalPage);
    this.setState({
      page: page,
      topicId: this.match.params.topicId,
      totalPage: totalPage,
      topicInfo: topicInfo,
      boardInfo: boardInfo
    });
    window.addEventListener("keyup",this.handleKeyUp); //添加键盘事件监听
  }
  componentWillUnmount() {
    window.removeEventListener("keyup",this.handleKeyUp); //移除键盘事件监听
  }
  async getTotalPage(topicId, postId) {
    console.log(postId)
    const topicInfo = await Utility.getTopicInfo(topicId);
    const isAnonymous = topicInfo.isAnonymous;
    if (isAnonymous) {
      return await Utility.getTraceTopicsCount(topicId, postId);
    } else {
      return await Utility.getTraceTopicsCount(topicId, postId);
    }
  }
  handleKeyUp = async (event: any) => {
    if(event.target.tagName !== "BODY"){
      return; //如果焦点不在页面上，直接返回
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return; //如果不是方向键，直接返回
    }
    if (this.throttling) {
      console.info("切换过于频繁 触发节流");
      // 如果节流标志为true，表示事件正在处理中，直接返回
      return;
    }
    if(!this.replyContentInstance.isContentEmpty()){
      //输入内容不为空
      if(!window.confirm("您的输入内容尚未提交，是否翻页？")){
          return;
      }
    }
    this.throttling = true;
    let page = this.state.page;
    switch (event.key) {
        case "ArrowLeft":
            if (page > 1) {
                page--;
                const url = `/topic/${this.state.topicId}/postId/${this.state.postId}/${page}`;
               window.scroll({
                  top: 0,
                  left: 0,
              });
                this.props.history.push(url);
            }
            break;
        case "ArrowRight":
            if (page < this.state.totalPage) {
                page++;
                const url =  `/topic/${this.state.topicId}/postId/${this.state.postId}/${page}`;
                window.scroll({
                  top: 0,
                  left: 0,
              });
                this.props.history.push(url);
            }
            break;
        default:
            break;
    }
    // 使用setTimeout来清除节流标志
    setTimeout(() => {
      this.throttling = false;
    }, 1000); // 1000毫秒是节流的时间间隔
}
  render() {
    const url = `/topic/${this.match.params.topicId}/postId/${
      this.match.params.postId
      }/`;
    const pagerUrl = `/topic/${this.state.topicId}/`;
    return (
      <div className="center" style={{ width: '1140px' }}>
        <div
          className="row"
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Category
            topicInfo={this.state.topicInfo}
            boardInfo={this.state.boardInfo}
            topicId={this.match.params.topicId}
          />
          <Pager
            page={this.state.page}
            url={url}
            totalPage={this.state.totalPage}
          />
        </div>
        <TopicInfo
          topicInfo={this.state.topicInfo}
          tag1={this.state.topicInfo.tag1}
          tag2={this.state.topicInfo.tag2}
          boardInfo={this.state.boardInfo}
          isFav={this.state.isFav}
        />
        <QuoteTraceContext.Provider value={this.handleQuoteContextChange}>
          <Reply
            topicInfo={this.state.topicInfo}
            boardInfo={this.state.boardInfo}
            page={this.state.page}
            postId={this.state.postId}
            quote={this.quote}
            isTrace={true}
            isHot={false}
            topicId={this.match.params.topicId}
          />
        </QuoteTraceContext.Provider>
        <div
          className="row"
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem'
          }}
        >
          <Category
            topicInfo={this.state.topicInfo}
            boardInfo={this.state.boardInfo}
            topicId={this.match.params.topicId}
          />
          <Pager
            page={this.state.page}
            url={url}
            totalPage={this.state.totalPage}
          />
        </div>
        <SendTopic
          onChange={this.handleChange}
          boardInfo={this.state.boardInfo}
          content={this.state.quote}
          topicInfo={this.state.topicInfo}
          ref={replyContent => this.replyContentInstance = replyContent}
        />
      </div>
    );
  }
}

/**
 * 文章内容
 */
interface ContentState {
  id: number;
  content: string;
  time: string;
  isDeleted: boolean;
  floor: number;
  isAnonymous: boolean;
  lastUpdateAuthor: string;
  lastUpdateTime: string;
  topicId: number;
  userName: string;
  sendTopicNumber: number;
  userImgUrl: string;
  signature: string;
  userId: number;
  privilege: string;
  likeNumber: number;
  dislikeNumber: number;
  postId: number;
  contentType: number;
  popularity: number;
}
