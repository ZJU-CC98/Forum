/**
* 媒体主题帖里的媒体摘要信息
*/
export class MediaTopicContent {
    /**
     * 缩略图：用于图片、视频和音频类型的主题帖
     */
    thumbnail: string[];
    /**
     * 时长：用于视频和音频类型的主题帖
     */
    duration: number;
    /**
     * 高度：用于视频类型的主题帖
     */
    height: number;
    /**
     * 宽度：用于视频类型的主题帖
     */
    width: number;
    audio: string;
    video: string;
}