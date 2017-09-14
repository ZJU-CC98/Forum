"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 热门话题
 */
var HotTopic = (function () {
    function HotTopic(title, author, id, authorId, lastPostUserName, lastPostTime) {
        this.title = title;
        this.authorName = author;
        this.id = id;
        this.authorId = authorId;
        this.lastPostUserName = lastPostUserName;
        this.lastPostTime = lastPostTime;
    }
    return HotTopic;
}());
exports.HotTopic = HotTopic;
var ListPagerProps = (function () {
    function ListPagerProps() {
    }
    return ListPagerProps;
}());
exports.ListPagerProps = ListPagerProps;
var topicSet = (function () {
    function topicSet() {
    }
    return topicSet;
}());
exports.topicSet = topicSet;
//# sourceMappingURL=AppProps.js.map