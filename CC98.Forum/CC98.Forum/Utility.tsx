import * as Prop from "./Props/AppProps"
import * as State from "./States/AppState"
import * as React from 'react';
import { TopicTitleAndContent } from "./Components/List"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';



/*export async function getData() {
    let hottopics: State.TopicTitleAndContentState[] = [];
    var response = await fetch('http://api.cc98.org/Topic/Hot');
    var data: State.TopicTitleAndContentState[] = await response.json();
    for (var i = 0; i < 10; i++) {
        hottopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id);
    }

    var items = hottopics.map(convertHotTopic);

    return items;
}*/

export async function getBoardTopicAsync(curPage,boardid) {
    var startPage = (curPage - 1) * 20;
    var endPage = curPage * 20 - 1;
    let boardtopics: State.TopicTitleAndContentState[] = [];
    let url = `http://api.cc98.org/Topic/Board/${boardid}`;
    var response = await fetch(url,
        { headers: { Range: "bytes=" + startPage + "-" + endPage } });
    var data: State.TopicTitleAndContentState[] = await response.json();
    var totalTopicCountResponse = await fetch(`http://api.cc98.org/Board/${boardid}`);
    var totalTopicCountJson = await totalTopicCountResponse.json();
    var totalTopicCount = totalTopicCountJson.totalTopicCount;
    var topicNumberInPage;
    if (curPage * 20 <= totalTopicCount) {
        topicNumberInPage = 20;
    } else if (curPage == 1 && totalTopicCount < 19) {
        topicNumberInPage = totalTopicCount;
    } else {
        topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
    }
    for (var i = 0; i < topicNumberInPage; i++) {
        boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id, data[i].authorId);
    }
    return boardtopics;

}
export async function getTopic(topicid: number) {

    var response = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: "bytes=" + 0 + "-" + 0 } });
    var data = await response.json();
    var hitCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    var hitCountJson = await hitCountResponse.json();
    var hitCount = hitCountJson.hitCount;
    var topicMessage: State.TopicState;
    var userMesResponse = await fetch(`http://api.cc98.org/User/${data[0].userId}`);
    var userMesJson = await userMesResponse.json();
    topicMessage = new State.TopicState(data[0].userName || '匿名', data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl, hitCount,data[0].userId);
    return topicMessage;
}
export async function getTopicContent(topicid: number, curPage: number) {
    var startPage = (curPage - 1) * 10;
    var endPage = curPage * 10 - 1;
    if (curPage != 1) {
        var topic = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: "bytes=" + startPage + "-" + endPage } });

    } else {
        var topic = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: "bytes=" + 1 + "-" + 9 } });

    }
    var replyCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    var replyCountJson = await replyCountResponse.json();
    var replyCount = replyCountJson.replyCount;
    var content = await topic.json();
    var post: State.ContentState[] = [];
    let topicNumberInPage;
    if (curPage != 1 && curPage * 10 <= replyCount) {
        topicNumberInPage = 10;
    } else if (curPage == 1 && replyCount >= 9) {
        topicNumberInPage = 9;
    } else if (curPage == 1 && replyCount < 9) {
        topicNumberInPage = replyCount;
    } else {
        topicNumberInPage = (replyCount - (curPage - 1) * 10);
    }
    for (let i = 0; i < topicNumberInPage; i++) {

        let userMesResponse = await fetch(`http://api.cc98.org/User/${content[i].userId}`);
        let userMesJson = await userMesResponse.json();

        post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode,content[i].userId);
    }

    return post;
}
export function convertHotTopic(item: State.TopicTitleAndContentState) {
    return <TopicTitleAndContent title={item.title} authorName={item.authorName} id={item.id} authorId={item.authorId} />
        ;
}
export function getPager(curPage, totalPage) {
    if (curPage == undefined) {
        curPage = 1;
    }
    let pages: number[] = [];
    if (totalPage == 1) {
        pages = [1];
    } else if (totalPage < 10 && totalPage > 1) {
        if (curPage == undefined || curPage == 1) {
            var i;
            for (i = 0; i < totalPage; i++) {
                pages[i] = i + 1;
            }
            pages[i] = -2;
            pages[i + 1] = -4;
        } else if (curPage == 2) {
            var i;
            for (i = 1; i <= totalPage; i++) {
                pages[i] = i;
            }
            pages[0] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        } else {
            var i;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
    } else {
        if (curPage + 5 <= totalPage) {
            if (curPage == undefined || curPage == 1) {
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, - 2, -4];
            } else if (curPage > 1 && curPage < 6) {
                pages = [-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 - 2, -4];
            } else {
                pages = [-3, -1, curPage - 4, curPage - 3, curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2, curPage + 3, curPage + 4, curPage + 5, - 2, -4];
            }
        } else if (curPage + 5 > totalPage && curPage != totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage, -2, -4];
        } else if (curPage == totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
        }
    }
    return pages;
}
export async function getCurUserTopicContent(topicid: number, curPage: number, userName: string) {

    var replyCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    var replyCountJson = await replyCountResponse.json();
    var replyCount = replyCountJson.replyCount;
    var topic = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: "bytes=" + 1 + "-" + replyCount } });
    var content = await topic.json();
    var post: State.ContentState[] = [];
    for (let i = 0, j = 0; i < replyCount; i++) {
        if (content[i].userName == userName) {
            let userMesResponse = await fetch(`http://api.cc98.org/User/${content[i].userId}`);
            let userMesJson = await userMesResponse.json();
            post[j] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode,content[i].userId);
            j++;
        }
    }


    return post;
}