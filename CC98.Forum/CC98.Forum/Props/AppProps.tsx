import { match } from "react-router";
import { MessageMatch } from '../Match/Match'
/**
 * 热门话题
 */
export class HotTopic {
    /**
     *作者
     */
    authorName: string;
    /**
     * 标题
     */
    title: string;
    id: number;
    authorId: number;
    lastPostUserName: string;
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