import { MediaTopicContent } from './MediaTopicContent';
import { TopicContentType } from './TopicContentType';

/**
 * 可能错过帖子的信息
 */
export class RandomTopic {
    /**
    *主题的标题
    */
    title: string;
    /**
    *主题被点击的次数（阅读数）,由于太多，所以显示字符串k
    */
    hitCount: string;
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
    *主题的回复数（不包括第一次发言），由于太多，所以显示字符串k
    */
    replyCount: string;
    /**
   *主题的楼层数
   */
    floorCount: number;
    /**
    *主题作者的id。如果主题为匿名主题，则该参数为 null
    */
    userId: number;
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
    time: string;
    /**
    *主题被赞的次数
    */
    likeCount: number;
    /**
    *主题被踩的次数
    */
    dislikeCount: number;
    /**
    *最后回复用户
    */
    lastPostUser: string;
    /**
    *最后回复时间
    */
    lastPostTime: string;
    /**
    *标签1
    */
    tag1: string;
    /**
    *标签2
    */
    tag2: string;
    /**
     * 媒体主题的摘要信息
     */
    mediaContent: MediaTopicContent;
    /**
     * 主题内容的类型
     */
    contentType: TopicContentType;
} 