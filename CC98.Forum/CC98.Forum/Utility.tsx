import * as Prop from "./Props/AppProps"
import * as State from "./States/AppState"
import * as React from 'react';
import { TopicTitleAndContent } from "./Components/List"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as $ from 'jquery'; 
import { FocusPost } from './Props/FocusPost';


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
export function sendRequest() {
    //申请到的appID
    let appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    let c = 'http://localhost:58187/messagebox/message';
    let redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    let path = 'https://login.cc98.org/OAuth/Authorize?'
    let queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    let query = queryParams.join('&');
    let url = path + query;
    return url;
}

export function systemRequest() {
    //申请到的appID
    let appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    let c = 'http://localhost:58187/messagebox/system';
    let redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    let path = 'https://login.cc98.org/OAuth/Authorize?'
    let queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    let query = queryParams.join('&');
    let url = path + query;
    return url;
}

export function responseRequest() {
    //申请到的appID
    let appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    let c = 'http://localhost:58187/messagebox/response';
    let redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    let path = 'https://login.cc98.org/OAuth/Authorize?'
    let queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    let query = queryParams.join('&');
    let url = path + query;
    return url;
}
export function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus');
}
/**
 * 获取全站新帖
 * @param curPage
 */
export async function getAllNewPost(curPage: number) {
    /**
     * 一次性可以获取20个主题
     */
    let startPage: number = (curPage - 1) * 20 + 1;
    let endPage: number = curPage * 20;
    /**
     * 通过api获取到主题之后转成json格式，但此时没有作者头像的图片地址和版面名称
     */
    let newTopics0 = await fetch('https://api.cc98.org/Topic/New', { headers: { Range: `bytes=${startPage}-${endPage}` } });
    let newTopics1 = await newTopics0.json();
    for (let i in newTopics1) {
        /**
        *根据作者名字获取作者头像的图片地址
        */
        if (newTopics1[i].authorName == null) {
            newTopics1[i].authorName = '匿名';
            newTopics1[i].portraitUrl = 'https://www.cc98.org/pic/anonymous.gif';
        }
        else {
            let userInfo0 = await fetch(`https://api.cc98.org/User/${newTopics1[i].authorId}`);
            let userInfo1 = await userInfo0.json();
            newTopics1[i].portraitUrl = userInfo1.portraitUrl;
        }
        /**
         * 根据版面id获取版面名称
         */
        let boardInfo0 = await fetch(`https://api.cc98.org/Board/${newTopics1[i].boardId}`);
        let boardInfo1 = await boardInfo0.json();
        newTopics1[i].boardName = boardInfo1.name;
        /**
        *这些数据是伪造的
        */
        newTopics1[i].likeCount = 6;
        newTopics1[i].dislikeCount = 3;
        newTopics1[i].fanCount = 28;
    }
    /**
     * 将补充完善的数据赋值给newTopics，以便后续进行可视化
     */
    let newTopics: FocusPost[] = newTopics1;
    return newTopics;
}