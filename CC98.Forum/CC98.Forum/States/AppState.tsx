/**
 * 表示应用程序的状态。
 */
export class AppState {

}
/**
 * 投票状态 
 */
export class TopicVoteState {

    votes: number;
    totalVotes: number;
    option: string;
    voted: boolean;
}
/**
 * 发帖内容状态
 */
export class PostTopicState {
    userName;
    topicMessage;
}
/**
 * 作者信息状态
 */
export class AuthorMessageState {
    imgUrl: string;
    userName: string;
    fansNumber: number;
    isFollowing;
    buttonInfo;
    buttonIsDisabled;
}
/**
 * 题目信息状态
 */
export class TopicTitleState {
    title: string;
    isTop: boolean;
    isNotice: boolean;
    tag: string;
    likeNumber: number;
    dislikeNumber: number;
    time: string;
    viewTimes: number;
}
/**
 * 文章内容
 */
export class ContentState {
    constructor(
    ) {

    }
    id: number;
    content: string;
    time: string;
    isDelete: boolean;
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
}
/**
 * 点赞信息状态
 */
export class TopicGoodState {
    imgUrl: string;
    userName: string;
    grade: number;
    reward: number;
    credit: string;
}
/**
 * 回复者状态
 */
export class ReplierState {
    userName: string;
    level: number;
    topicsNumber: number;
    replyTime: string;
    imgUrl: string;
    timeImgUrl: string;
}

export class ListHeadState {
    imgUrl: string;
    listName: string;
    todayTopics: number;
    totalTopics: number;
    adsUrl: string;
    listManager;
    isHidden: boolean;
    isEncrypted: boolean;
    isAnomynous: boolean;
    isLocked: boolean;
    isFollow: boolean;
}
export class ListNoticeState {
    notice: string;
}
export class ListTagState {
    tags: Object;
}

export class TopicTitleAndContentState {
	/*  constructor(title, authorName, lastReply) {
		  this.authorName = authorName;
		  this.lastReply = lastReply;
		    this.title = title;
	  }*/
    constructor() {
        //this.userName = userName;
        //this.title = title;
        //this.id = topicid;
        //this.userId = userId;
        //this.lastPostUser = lastPostUser;
        //this.lastPostTime = lastPostTime;
        //this.likeCount = likeCount;
        //this.dislikeCount = dislikeCount;
        //this.replyCount = replyCount;
        //this.highlightInfo = highlightInfo;
        //this.topState = topState;
        //this.state = state;
    }

    likeCount: number;
    dislikeCount: number;
    replyCount: number;
    userName: string;
    title: string;
    lastPostUser: string;
    lastPostTime: string;
    id: number;
    userId: number;
    highlightInfo: any;
    topState: number;
    state: number;
    hitCount: number;
    bestState: number;
    isVote: boolean;
    tag1: number;
    tag2: number;
}

/**
 * 定义页码列表组件的状态。
 */
export class ListPagerState {
	/**
	 * 当前要显示的页码。
	 */
    currentPage: number;
}
export class PagerState {
    constructor(page: number) {
        this.pageNumber = page;
    }
    pageNumber: number;
}
export class TopicState {
    constructor(userName: string,
        title: string,
        content: number,
        time: string,
        signature: string,
        userImgUrl: string,
        userId: number,
        likeNumber: number,
        dislikeNumber: number,
        postId: number,
        isAnonymous: boolean,
        contentType: number,
        isFollowing: boolean,
        fanCount: number,
        likeInfo,
        awardInfo,

    ) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.userId = userId;
        this.likeNumber = likeNumber;
        this.dislikeNumber = dislikeNumber;
        this.postId = postId;
        this.isAnonymous = isAnonymous;
        this.contentType = contentType;
        this.isFollowing = isFollowing;
        this.fanCount = fanCount;
        this.likeInfo = likeInfo;
        this.awardInfo = awardInfo;

    }
    userName: string;
    title: string;
    content: number;
    time: string;
    signature: string;
    userImgUrl: string;
    userId: number;
    likeNumber: number;
    dislikeNumber: number;
    postId: number;
    isAnonymous: boolean;
    contentType: number;
    isFollowing: boolean;
    fanCount: number;
    likeInfo;
    awardInfo;
}

/**
 * 登录状态 
 */
export class LoginState {
    loginOrNot: boolean;
}
/**
 * 已登录状态
 */
export class AlreadyLoginState {
    imgUrl: string;
    userName: string;
    messageNumber: number;
}

/**
 * 版面类
 */
export class Board {

    //属性
    name: string;
    todayPostCount: number;
    totalPostCount: number;
    id: number;
    masters: string;

    //构造方法
    constructor(name, todayPostCount, totalPostCount, boardID, master) {
        this.name = name;
        this.todayPostCount = todayPostCount;
        this.totalPostCount = totalPostCount;
        this.id = boardID;
        this.masters = master;
    }
}
export class BoardState {
    thisBoardState: Board;
}

/**
* 用户信息
*/
export class UserInfo {
    /**
    * 用户名
    */
    name: string;
    /**
    * 用户性别
    */
    gender: 0 | 1;
    /**
    * 用户生日
    */
    birthday: string;
    /**
    * 用户个人简介图片
    */
    photourl: string;
    /**
    * 用户个人简介
    */
    introduction: string;
    /**
    * 用户个性签名
    */
    signatureCode: string;
    /**
    * id
    */
    id: number;
    /**
    * 当前用户是否关注了该用户
    */
    isFollowing: boolean;
    /**
    * 邮箱地址
    */
    emailAddress: string;
    /**
    * qq
    */
    qq: string;
    /**
    * 发帖数
    */
    postCount: number;
    /**
    * 威望
    */
    prestige: number;
    /**
    * 显示的用户组
    */
    displayTitle: string;
    /**
    * 全站权限等级
    */
    privilege: string;
    /**
    * 注册时间
    */
    registerTime: string;
    /**
    * 最后登录时间
    */
    lastLogOnTime: string;
    /**
    * 自定义头衔
    */
    customTitle: string;
    /**
     * 用户锁定状态，0正常  1锁定  2屏蔽  3全站TP
     */
    lockState: 0 | 1 | 2 | 3;
    /**
     * 风评
     */
    popularity: number;
    /**
     * 用户拥有的头衔ID们
     */
    userTitleIds: number[];
    /**
     * 当前显示的头衔ID
     */
    displayTitleId: number;
    /**
     * 粉丝数
     */
    fanCount: number;
    /**
     * 财富值
     */
    wealth: number;
    /**
     * 用户头像地址
     */
    portraitUrl: string;
    /**
     * 用户关注的版面id数组
     */
    customBoards: number[];
    /**
     * 用户关注数
     */
    followCount: number;
    /**
     * 用户选择的主题
     */
    theme: number;
    /**
     * 等级（已经废弃
     */
    levelTitle: string;
    /**
     * 用户版主头衔信息
     */
    boardMasterTitles: BoardMasterTitle[];
    /**
     * 被删除的数量
     */
    deleteCount: number;
    /**
     * 获得的赞
     */
    receivedLikeCount: number;
}

/**
* 表示用户最近帖子
*/
export class UserRecentPost {
    /**
    * 帖子版面
    */
    boardName: string;
    /**
    * 发帖时间
    */
    time: string;
    /**
    * 帖子标题
    */
    title: string;
    /**
    * 用户名
    */
    userName: string;
    /**
    * 用户名
    */
    isAnonymous: boolean;
    /**
    * 帖子id
    */
    id: number;
    /**
    * 帖子版面id
    */
    boardId: number;
    /**
    * 帖子内容
    */
    content: string;
    /**
    * 获得赞数
    */
    likeCount: number;
    /**
    * 获得踩数
    */
    dislikeCount: number;
}
/**
* 用户收藏的版面信息
*/
export class UserFavoritesBoardInfo {
    /**
    * 版主名数组
    */
    boardMasters: string[];
    /**
    * 今日主题
    */
    todayCount: number;
    /**
    * 总主题
    */
    topicCount: number;
    /**
    * ID
    */
    id: number;
    /**
    * 版面名
    */
    name: string;
}

/**
* 修改用户信息所要提交的body
*/
export class ChangeUserInfo {
    /**
    * 性别 男=1 女=0
    */
    Gender: 0 | 1;
    /**
    * QQ
    */
    QQ: string;
    /**
    * 邮箱地址
    */
    EmailAddress: string;
    /**
    * 个性签名
    */
    SignatureCode: string;
    /**
    * 个人简介
    */
    Introduction: string;
    /**
    * 生日
    */
    Birthday: string;
    /**
     * 
     */
    DisplayTitleId: number;
}

/**
 * 转账时要提供的body
 */
export class TransferWealthInfo {
    /**
     * 用户名数组，最多10个
     */
    userNames: string[];
    /**
     * 要转账的数目
     */
    wealth: number;
    /**
     * 理由
     */
    reason: string;
}

export class BoardMasterTitle {
    /**
     * 用户id
     */
    userId: number;
    /**
     * 用户名
     */
    userName: string;
    /**
     * 版面id
     */
    boardId: number;
    /**
     * 版面名
     */
    boardName: string;
    /**
     * 头衔名
     */
    title: string;
    /**
     * 不知道有什么用
     */
    boardMasterLevel: number;
}
