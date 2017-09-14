"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表示应用程序的状态。
 */
var AppState = /** @class */ (function () {
    function AppState() {
    }
    return AppState;
}());
exports.AppState = AppState;
/**
 * 投票状态
 */
var TopicVoteState = /** @class */ (function () {
    function TopicVoteState() {
    }
    return TopicVoteState;
}());
exports.TopicVoteState = TopicVoteState;
/**
 * 发帖内容状态
 */
var PostTopicState = /** @class */ (function () {
    function PostTopicState() {
    }
    return PostTopicState;
}());
exports.PostTopicState = PostTopicState;
/**
 * 作者信息状态
 */
var AuthorMessageState = /** @class */ (function () {
    function AuthorMessageState() {
    }
    return AuthorMessageState;
}());
exports.AuthorMessageState = AuthorMessageState;
/**
 * 题目信息状态
 */
var TopicTitleState = /** @class */ (function () {
    function TopicTitleState() {
    }
    return TopicTitleState;
}());
exports.TopicTitleState = TopicTitleState;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState(id, content, time, isDelete, floor, isAnonymous, lastUpdateAuthor, lastUpdateTime, topicId, userName, sendTopicNumber, userImgUrl, signature, userId) {
        this.userName = userName;
        this.id = id;
        this.content = content;
        this.time = time;
        this.isAnonymous = isAnonymous;
        this.isDelete = isDelete;
        this.floor = floor;
        this.lastUpdateAuthor = lastUpdateAuthor;
        this.lastUpdateTime = lastUpdateTime;
        this.topicId = topicId;
        this.sendTopicNumber = sendTopicNumber;
        this.userImgUrl = userImgUrl;
        this.signature = signature;
        this.userId = userId;
    }
    return ContentState;
}());
exports.ContentState = ContentState;
/**
 * 点赞信息状态
 */
var TopicGoodState = /** @class */ (function () {
    function TopicGoodState() {
    }
    return TopicGoodState;
}());
exports.TopicGoodState = TopicGoodState;
/**
 * 回复者状态
 */
var ReplierState = /** @class */ (function () {
    function ReplierState() {
    }
    return ReplierState;
}());
exports.ReplierState = ReplierState;
var HotTopicState = /** @class */ (function () {
    function HotTopicState() {
    }
    return HotTopicState;
}());
exports.HotTopicState = HotTopicState;
var ListHeadState = /** @class */ (function () {
    function ListHeadState() {
    }
    return ListHeadState;
}());
exports.ListHeadState = ListHeadState;
var ListNoticeState = /** @class */ (function () {
    function ListNoticeState() {
    }
    return ListNoticeState;
}());
exports.ListNoticeState = ListNoticeState;
var ListTagState = /** @class */ (function () {
    function ListTagState() {
    }
    return ListTagState;
}());
exports.ListTagState = ListTagState;
/**
 * 内容列表页面的状态。
 */
var ListContentState = /** @class */ (function () {
    function ListContentState() {
    }
    return ListContentState;
}());
exports.ListContentState = ListContentState;
var TopicTitleAndContentState = /** @class */ (function () {
    /*  constructor(title, authorName, lastReply) {
          this.authorName = authorName;
          this.lastReply = lastReply;
          this.title = title;
      }*/
    function TopicTitleAndContentState(title, authorName, topicid, authorId) {
        this.authorName = authorName;
        this.title = title;
        this.id = topicid;
        this.authorId = authorId;
    }
    return TopicTitleAndContentState;
}());
exports.TopicTitleAndContentState = TopicTitleAndContentState;
/**
 * 定义页码列表组件的状态。
 */
var ListPagerState = /** @class */ (function () {
    function ListPagerState() {
    }
    return ListPagerState;
}());
exports.ListPagerState = ListPagerState;
var PagerState = /** @class */ (function () {
    function PagerState(page) {
        this.pageNumber = page;
    }
    return PagerState;
}());
exports.PagerState = PagerState;
var TopicState = /** @class */ (function () {
    function TopicState(userName, title, content, time, signature, userImgUrl, hitCount, userId) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.hitCount = hitCount;
        this.userId = userId;
    }
    return TopicState;
}());
exports.TopicState = TopicState;
/**
 * 登录状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());
exports.LoginState = LoginState;
/**
 * 已登录状态
 */
var AlreadyLoginState = /** @class */ (function () {
    function AlreadyLoginState() {
    }
    return AlreadyLoginState;
}());
exports.AlreadyLoginState = AlreadyLoginState;
/**
 * 版面类
 */
var Board = /** @class */ (function () {
    //构造方法
    function Board(name, todayPostCount, totalPostCount, boardID, master) {
        this.name = name;
        this.todayPostCount = todayPostCount;
        this.totalPostCount = totalPostCount;
        this.id = boardID;
        this.masters = master;
    }
    return Board;
}());
exports.Board = Board;
var BoardState = /** @class */ (function () {
    function BoardState() {
    }
    return BoardState;
}());
exports.BoardState = BoardState;
/**
* 用户信息
*/
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
* 表示用户最近帖子
*/
var UserRecentPost = /** @class */ (function () {
    function UserRecentPost() {
    }
    return UserRecentPost;
}());
exports.UserRecentPost = UserRecentPost;
/**
 * 表示用户粉丝信息
 */
var UserFanInfo = /** @class */ (function () {
    function UserFanInfo() {
    }
    return UserFanInfo;
}());
exports.UserFanInfo = UserFanInfo;
//# sourceMappingURL=AppState.js.map