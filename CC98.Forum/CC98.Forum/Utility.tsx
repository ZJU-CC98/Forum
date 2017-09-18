import * as Prop from './Props/AppProps'
import * as State from './States/AppState'
import * as React from 'react';
import { TopicTitleAndContent } from './Components/List'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as $ from 'jquery'; 
import { FocusPost } from './Props/FocusPost';


/*export async function getData() {
    let hottopics: State.TopicTitleAndContentState[] = [];
    let response = await fetch('http://api.cc98.org/Topic/Hot');
    let data: State.TopicTitleAndContentState[] = await response.json();
    for (let i = 0; i < 10; i++) {
        hottopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id);
    }

    let items = hottopics.map(convertHotTopic);

    return items;
}*/

export async function getBoardTopicAsync(curPage,boardid) {
    const startPage = (curPage - 1) * 20;
    const endPage = curPage * 20 - 1;
    const boardtopics: State.TopicTitleAndContentState[] = [];
    const url = `http://api.cc98.org/Topic/Board/${boardid}`;
    const response = await fetch(url,
	    { headers: { Range: `bytes=${startPage}-${endPage}` } });
    const data: State.TopicTitleAndContentState[] = await response.json();
    const totalTopicCountResponse = await fetch(`http://api.cc98.org/Board/${boardid}`);
    const totalTopicCountJson = await totalTopicCountResponse.json();
    const totalTopicCount = totalTopicCountJson.totalTopicCount;
    let topicNumberInPage;
    if (curPage * 20 <= totalTopicCount) {
        topicNumberInPage = 20;
    } else if (curPage === 1 && totalTopicCount < 19) {
        topicNumberInPage = totalTopicCount;
    } else {
        topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
    }
    for (let i = 0; i < topicNumberInPage; i++) {
        boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id, data[i].authorId, data[i].lastPostInfo);
    }
    return boardtopics;

}
export async function getTopic(topicid: number) {

    const response = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: `bytes=${0}-${0}` } });
    const data = await response.json();
    const hitCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    const hitCountJson = await hitCountResponse.json();
    const hitCount = hitCountJson.hitCount;
	const userMesResponse = await fetch(`http://api.cc98.org/User/${data[0].userId}`);
    const userMesJson = await userMesResponse.json();
    const topicMessage = new State.TopicState(data[0].userName || '匿名', data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl, hitCount,data[0].userId);
    return topicMessage;
}
export async function getTopicContent(topicid: number, curPage: number) {
    const startPage = (curPage - 1) * 10;
	const endPage = curPage * 10 - 1;

	const topic = curPage !== 1
		? await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: `bytes=${startPage}-${endPage}` } })
		: await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: `bytes=${1}-${9}` } });

    const replyCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    const replyCountJson = await replyCountResponse.json();
    const replyCount = replyCountJson.replyCount;
    const content = await topic.json();
    const post: State.ContentState[] = [];
    let topicNumberInPage: number;
    if (curPage !== 1 && curPage * 10 <= replyCount) {
        topicNumberInPage = 10;
    } else if (curPage === 1 && replyCount >= 9) {
        topicNumberInPage = 9;
    } else if (curPage === 1 && replyCount < 9) {
        topicNumberInPage = replyCount;
    } else {
        topicNumberInPage = (replyCount - (curPage - 1) * 10);
    }
    for (let i = 0; i < topicNumberInPage; i++) {

        const userMesResponse = await fetch(`http://api.cc98.org/User/${content[i].userId}`);
        const userMesJson = await userMesResponse.json();

        post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode,content[i].userId);
    }

    return post;
}
export function convertHotTopic(item: State.TopicTitleAndContentState) {
    return <TopicTitleAndContent title={item.title} authorName={item.authorName} id={item.id} authorId={item.authorId} lastPostTime={item.lastPostInfo.time} lastPostUserName={item.lastPostInfo.userName} />
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
            let i;
            for (i = 0; i < totalPage; i++) {
                pages[i] = i + 1;
            }
            pages[i] = -2;
            pages[i + 1] = -4;
        } else if (curPage == 2) {
            let i;
            for (i = 1; i <= totalPage; i++) {
                pages[i] = i;
            }
            pages[0] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        } else {
            let i;
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

    const replyCountResponse = await fetch(`http://api.cc98.org/Topic/${topicid}`);
    const replyCountJson = await replyCountResponse.json();
    const replyCount = replyCountJson.replyCount;
    const topic = await fetch(`http://api.cc98.org/Post/Topic/${topicid}`, { headers: { Range: `bytes=${1}-${replyCount}` } });
    const content = await topic.json();
    const post: State.ContentState[] = [];
    for (let i = 0, j = 0; i < replyCount; i++) {
        if (content[i].userName == userName) {
            const userMesResponse = await fetch(`http://api.cc98.org/User/${content[i].userId}`);
            const userMesJson = await userMesResponse.json();
            post[j] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode,content[i].userId);
            j++;
        }
    }


    return post;
}
export function sendRequest() {
    //申请到的appID
    const appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    const c = 'http://localhost:58187/messagebox/message';
    const redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    const path = 'https://login.cc98.org/OAuth/Authorize?';
    const queryParams = [`client_id=${appId}`, 'response_type=token', 'scope=all', `redirect_uri=${redirectUri}`];
    const query = queryParams.join('&');
    const url = path + query;
    return url;
}

export function systemRequest() {
    //申请到的appID
    const appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    const c = 'http://localhost:58187/messagebox/system';
    const redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    const path = 'https://login.cc98.org/OAuth/Authorize?';
    const queryParams = [`client_id=${appId}`, 'response_type=token', 'scope=all', `redirect_uri=${redirectUri}`];
    const query = queryParams.join('&');
    const url = path + query;
    return url;
}

export function responseRequest() {
    //申请到的appID
    const appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    const c = 'http://localhost:58187/messagebox/response';
    const redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    const path = 'https://login.cc98.org/OAuth/Authorize?';
    const queryParams = [`client_id=${appId}`, 'response_type=token', 'scope=all', `redirect_uri=${redirectUri}`];
    const query = queryParams.join('&');
    const url = path + query;
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
    const startPage: number = (curPage - 1) * 20 + 1;
    const endPage: number = curPage * 20;
    /**
     * 通过api获取到主题之后转成json格式，但此时没有作者头像的图片地址和版面名称
     */
    const newTopics0 = await fetch('https://api.cc98.org/Topic/New', { headers: { Range: `bytes=${startPage}-${endPage}` } });
    const newTopics1 = await newTopics0.json();
    for (let i in newTopics1) {
        /**
        *根据作者名字获取作者头像的图片地址
        */
        if (newTopics1[i].authorName == null) {
            newTopics1[i].authorName = '匿名';
            newTopics1[i].portraitUrl = 'https://www.cc98.org/pic/anonymous.gif';
        }
        else {
            const userInfo0 = await fetch(`https://api.cc98.org/User/${newTopics1[i].authorId}`);
            const userInfo1 = await userInfo0.json();
            newTopics1[i].portraitUrl = userInfo1.portraitUrl;
        }
        /**
         * 根据版面id获取版面名称
         */
        const boardInfo0 = await fetch(`https://api.cc98.org/Board/${newTopics1[i].boardId}`);
        const boardInfo1 = await boardInfo0.json();
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
    const newTopics: FocusPost[] = newTopics1;
    return newTopics;
}
export function setStorage(key, value) {
    let v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = `obj-${v}`;
    } else {
        v = `str-${v}`;
    }
    sessionStorage.setItem(key, v);
}
export function getStorage(key) {
    let v = sessionStorage.getItem(key);
    if (!v) {
        return;
    }
    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}