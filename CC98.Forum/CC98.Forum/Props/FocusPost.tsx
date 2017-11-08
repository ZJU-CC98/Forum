// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/**
 * 表示我关注的某个版面的某个帖子
 */
export class FocusPost {
    /**
    *主题的标题
    */
    title: string;
    /**
    *主题被点击的次数（阅读数）
    */
    hitCount: number;
    /**
    *主题的ID值
    */
    id: number;
    /**
    *主题所在的版面的编号
    */
    boardId: number;
    /**
   *主题所在的版面的名称
   */
    boardName: string;
    /**
    *主题的回复数（不包括第一次发言）
    */
    replyCount: number;
    /**
    *主题作者的用户名。如果主题为匿名主题，则该参数为 null
    */
    userName: string;
    /**
    *主题作者的头像的图片url地址
    */
    portraitUrl: string;
    /**
    *主题的创建时间
    */
    time: Date;
    /**
    *主题被赞的次数
    */
    likeCount: number;
    /**
    *主题被踩的次数
    */
    dislikeCount: number;
    /**
    *主题的作者的粉丝数目
    */
    fanCount: number;
} 