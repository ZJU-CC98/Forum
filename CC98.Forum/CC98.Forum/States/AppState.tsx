import { MainPageTopic } from '../Components/MainPage';
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
    constructor(id: number,
        content: string,
        time: string,
        isDelete: boolean,
        floor: number,
        isAnonymous: boolean,
        lastUpdateAuthor: string,
        lastUpdateTime: string,
        topicId: number,
        userName: string,
        sendTopicNumber: number,
        userImgUrl: string,
        signature: string,
        userId: number,
        privilege: string,
        likeNumber: number,
        dislikeNumber: number,
        postid:number,
    ) {
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
        this.privilege = privilege;
        this.likeNumber = likeNumber;
        this.dislikeNumber = dislikeNumber;
        this.postid = postid;
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
    postid: number;
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
/**
 * 首页话题信息状态
 * 拥有一个属性mainPageTopicState，为MainPageTopic类数组，用于存放组件所需的主题信息（一般为10条）
 **/
export class MainPageTopicState {
    mainPageTopicState: MainPageTopic[];
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
}
export class ListNoticeState {
    notice: string;
}
export class ListTagState {
    tags: Object;
}

/**
 * 内容列表页面的状态。
 */
export class ListContentState {
	/**
	 * 当前要显示的页面。
	 */
    items: TopicTitleAndContentState[];
}
export class TopicTitleAndContentState {
	/*  constructor(title, authorName, lastReply) {
		  this.authorName = authorName;
		  this.lastReply = lastReply;
		    this.title = title;
	  }*/
    constructor(title, userName, topicid, userId, lastPostUser, lastPostTime) {
        this.userName = userName;
        this.title = title;
        this.id = topicid;
        this.userId = userId;
        this.lastPostUser = lastPostUser;
        this.lastPostTime = lastPostTime;
    }

    likeNumber: number;
    unlikeNumber: number;
    commentNumber: number;
    userName: string;
    title: string;
    lastPostUser: string;
    lastPostTime: string;
    id: number;
    userId: number;

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
        hitCount: number,
        userId: number,
        likeNumber: number,
        dislikeNumber: number,
        postid: number
    ) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.hitCount = hitCount;
        this.userId = userId;
        this.likeNumber = likeNumber;
        this.dislikeNumber = dislikeNumber;
        this.postid = postid;
    }
    userName: string;
    title: string;
    content: number;
    time: string;
    signature: string;
    userImgUrl: string;
    hitCount: number;
    userId: number;
    likeNumber: number;
    dislikeNumber: number;
    postid: number;
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
    gender: number;
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
    personalDescription: string;
    /**
    * 用户个性签名
    */
    signatureCode: string
}

/**
* 表示用户最近帖子
*/
export class UserRecentPost {
    /**
    * 帖子版面
    */
    board: string;
    /**
    * 发帖时间
    */
    date: string;
    /**
    * 帖子标题
    */
    title: string;
    /**
    * 用户名
    */
    name: string;
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
    approval: number;
    /**
    * 获得踩数
    */
    disapproval: number;

}

/**
 * 表示用户粉丝信息
 */
export class UserFanInfo {
    /**
    * 用户名
    */
    name: string;
    /**
    * 用户头像链接
    */
    avatarImgURL: string;
    /**
    * 用户发帖总数
    */
    posts: number;
    /**
    * 用户粉丝总数
    */
    fans: number;
}