import { match } from "react-router";
import { MessageMatch } from '../Match/Match'
/**
 * 热门话题
 */
export class HotTopic {
    /**
     *主题的作者。
     */
    authorName: string;
    /**
     * 主题的标题。
     */
    title: string;
    /**
     * 主题的标识。
     */
    id: number;
    /**
     * 主题的作者的标识。
     */
    authorId: number;
    /**
     * 主题最后发言用户的用户名。
     */
    lastPostUserName: string;
    /**
     * 主题最后发言用户的发言时间。
     */
    lastPostTime:string;
    constructor(title, author,id,authorId,lastPostUserName,lastPostTime) {
        this.title = title;
        this.authorName = author;
        this.id = id;
        this.authorId = authorId;
        this.lastPostUserName = lastPostUserName;
        this.lastPostTime = lastPostTime;
    }
}
export class ListPagerProps {
    pageNumber: number;
    match:match<MessageMatch>;
}
export class topicSet {
    items;
}