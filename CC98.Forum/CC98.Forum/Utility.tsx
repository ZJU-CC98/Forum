import * as Prop from './Props/AppProps'
import * as State from './States/AppState'
import * as React from 'react';
//import { browserHistory } from 'react-router';
import { TopicTitleAndContent } from './Components/List'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as $ from 'jquery';

declare let editormd: any;
declare let testEditor: any;

export async function getBoardTopicAsync(curPage, boardid) {
    try {
        const token = getLocalStorage("accessToken");
        const startPage = (curPage - 1) * 20;
        const endPage = curPage * 20 - 1;

        const totalTopicCountResponse = await fetch(`http://apitest.niconi.cc/Board/${boardid}`);
        if (totalTopicCountResponse.status == 404) {
            this.context.router.history.push('/status/NotFoundBoard');
        }

        const totalTopicCountJson = await totalTopicCountResponse.json();

        const totalTopicCount = totalTopicCountJson.topicCount;
        let topicNumberInPage;
        if (curPage * 20 <= totalTopicCount) {
            topicNumberInPage = 20;
        } else if (curPage === 1 && totalTopicCount < 19) {
            topicNumberInPage = totalTopicCount;
        } else {
            topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
        }

        const boardtopics: State.TopicTitleAndContentState[] = [];
        const url = `http://apitest.niconi.cc/Topic/Board/${boardid}?from=${startPage}&size=${topicNumberInPage}`;
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(url,
            { headers });
        if (response.status == 401) {
            
        }
        if (response.status == 404) {

        }
            const data: State.TopicTitleAndContentState[] = await response.json();
            for (let i = 0; i < topicNumberInPage; i++) {
                boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].userName , data[i].id, data[i].userId, data[i].lastPostUser, data[i].lastPostTime);
            }

            return boardtopics;
        
     
    } catch (e) {

        alert("网络中断");
    }

}
export async function getTopic(topicid: number) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=0&size=1`, {
            headers
        });
        if (response.status === 404) {
            console.log("bbb");
            const str = await response.text();
            console.log("aaa");
            console.log("ccc" + str);
            window.location.href = '/status/NotFoundTopic';
        } else {
            const data = await response.json();

            const hitCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
            if (hitCountResponse.status == 404) {
                window.location.href = '/status/NotFoundTopic';  
            }
            else if (hitCountResponse.status == 401) {
                window.location.href = '/status/UnauthorizedTopic';  
            }
            const hitCountJson = await hitCountResponse.json();
            const hitCount = hitCountJson.hitCount;
            let topicMessage = null;
            if (data[0].isAnonymous != true) {
                const userMesResponse = await fetch(`http://apitest.niconi.cc/User/${data[0].userId}`);
                const userMesJson = await userMesResponse.json();
                topicMessage = new State.TopicState(data[0].userName, data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl || 'https://www.cc98.org/pic/anonymous.gif', hitCount, data[0].userId, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType);
            } else {
                topicMessage = new State.TopicState('匿名' + data[0].userName.toUpperCase(), data[0].title, data[0].content, data[0].time, '', 'https://www.cc98.org/pic/anonymous.gif', hitCount, null, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType);
            }


            return topicMessage;
        }
    } catch (e) {
        alert("网络3中断");
    }
}
export async function getTopicContent(topicid: number, curPage: number) {
    try {
        const startPage = (curPage - 1) * 10;
        const endPage = curPage * 10 - 1;
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const topic = curPage !== 1
            ? await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=${startPage}&size=10`, { headers })
            : await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=1&size=9`, { headers });

        const replyCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });

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
            topicNumberInPage = (replyCount - (curPage - 1) * 10 + 1);
        }
        for (let i = 0; i < topicNumberInPage; i++) {
            if (content[i].isAnonymous != true) {

                const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${content[i].userName}`);
                const userMesJson = await userMesResponse.json();
                post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
            } else {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);

            }
        }
        return post;
    } catch (e) {
        alert("网络1中断");
    }
}
export async function like(topicid, postid) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/post/userlike?topicid=${topicid}&postid=${postid}`, { method: "POST", headers });
    const data = await response.json();
        return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function dislike(topicid, postid) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/post/userdislike?topicid=${topicid}&postid=${postid}`, { method: "POST", headers });
    const data = await response.json();
    return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getLikeStateAndCount(topicid, postid) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=0&size=10`, { headers })
    const response = await fetch(`http://apitest.niconi.cc/likeState?topicid=${topicid}&postid=${postid}`, { headers });
    const data = await response.json();
        return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getHotReplyContent(topicid: number) {
    try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/Post/Topic/Hot/${topicid}`, { headers });
    const content = await response.json();
    const post: State.ContentState[] = [];
    let topicNumberInPage: number = content.length;
    for (let i = 0; i < topicNumberInPage; i++) {
        if (content[i].isAnonymous !=true) {
            const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${content[i].userName}`);
            const userMesJson = await userMesResponse.json();
            post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
        } else {
            let purl = 'https://www.cc98.org/pic/anonymous.gif';
            post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
        }
    }
        return post;
    } catch (e) {
        alert("网络中断");
    }
}
export function convertHotTopic(item: State.TopicTitleAndContentState) {
    return <TopicTitleAndContent title={item.title} authorName={item.userName} id={item.id} authorId={item.userId} lastPostTime={item.lastPostTime} lastPostUserName={item.lastPostUser} />
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
        } else if (curPage != totalPage) {
            let i;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        } else {
            let i;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
        }
    } else {
        if (curPage + 5 <= totalPage) {
            if (curPage == undefined || curPage == 1) {
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, - 2, -4];
            } else if (curPage > 1 && curPage < 6) {
                pages = [-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, - 2, -4];
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
export async function getCurUserTopic(topicid: number, userId: number) {
    try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/post/Topic/user?topicid=${topicid}&userid=${userId}&from=0&size=1`, { headers });
    const data = await response.json();
    const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${data[0].userName}`);
    const userMesJson = await userMesResponse.json();
    data[0].userImgUrl = userMesJson.portraitUrl;
        return data[0];
    } catch (e) {
        alert("网络4中断");
    }
}
export async function getCurUserTopicContent(topicid: number, curPage: number, userName: string, userId: number) {
    try {
    const topicMessage = await getTopic(topicid);
    let start: number;
    let isUserPoster: boolean;
    if (topicMessage.userName === userName) {
        isUserPoster = true;
        if (curPage === 1)
            start = (curPage - 1) * 10 + 1;
        else
            start = (curPage - 1) * 10;
    } else {
        isUserPoster = false;
        start = (curPage - 1) * 10;
    }

    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const topic = await fetch(`http://apitest.niconi.cc/Post/Topic/user?topicid=${topicid}&userId=${userId}&from=${start}&size=10`, { headers });
    const content = await topic.json();


    let post: State.ContentState[] = [];
    let topicNumberInPage: number;
    const replyCount = content[0].count;

    if (curPage !== 1 && curPage * 10 <= replyCount) {
        topicNumberInPage = 10;
    } else if (curPage === 1 && replyCount >= 9 && isUserPoster == true) {
        topicNumberInPage = 9;
    } else if (curPage === 1 && replyCount >= 9 && isUserPoster == false) {
        topicNumberInPage = 10;
    } else if (curPage === 1 && replyCount < 9) {
        topicNumberInPage = replyCount;
    } else {
        topicNumberInPage = (replyCount - (curPage - 1) * 10);
    }

    for (let i = 0; i < topicNumberInPage; i++) {
        if (content[i].isAnonymous !=true) {
            const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${content[i].userName}`);
            const userMesJson = await userMesResponse.json();

            post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);

        } else {
            let purl = 'https://www.cc98.org/pic/anonymous.gif';
            post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
        }
    }

        return post;
    } catch (e) {
        alert("网络中断");
    }
}

/**
 * 获取全站新帖
 * @param curPage
 */
export async function getAllNewTopic(curNum: number) {
    try {
    /**
     * 一次性可以获取20个主题
     */
    var size = 20;
    if (curNum > 80) {
        size = 100 - curNum;
    }
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    /**
     * 通过api获取到主题之后转成json格式
     */
    const response = await fetch(`http://apitest.niconi.cc/topic/new?from=${curNum}&size=${size}`, { headers });
    const newTopic = await response.json();
    for (let i in newTopic) {
        if (newTopic[i].userId) {
            //获取作者粉丝数目
            let userFan0 = await fetch(`http://apitest.niconi.cc/user/follow/fanCount?userid=${newTopic[i].userId}`);
            let userFan1 = await userFan0.json();
            newTopic[i].fanCount = userFan1;
            //获取作者头像地址
            let userInfo0 = await fetch(`http://apitest.niconi.cc/user/basic/${newTopic[i].userId}`);
            let userInfo1 = await userInfo0.json();
            newTopic[i].portraitUrl = userInfo1.portraitUrl;
            //获取所在版面名称
            newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
        }
        //匿名时粉丝数显示0
        else {
            newTopic[i].fanCount = 0;
            newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
           
            newTopic[i].boardName = "心灵之约";
        }
    }
        return newTopic;
    } catch (e) {
        alert("网络中断");
    }
}

/**
 * 获取关注版面新帖
 * @param curPage
 */
export async function getFocusTopic(curNum: number) {
    try {
    /**
     * 一次性可以获取20个主题
     */
    var size = 20;
    if (curNum > 80) {
        size = 100 - curNum;
    }
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    /**
     * 通过api获取到主题之后转成json格式
     */
    const response = await fetch(`http://apitest.niconi.cc/topic/customboards/new?from=${curNum}&size=${size}`, { headers });
    const newTopic = await response.json();
    for (let i in newTopic) {
        if (newTopic[i].userId) {
            //获取作者粉丝数目
            let userFan0 = await fetch(`http://apitest.niconi.cc/user/follow/fanCount?userid=${newTopic[i].userId}`);
            let userFan1 = await userFan0.json();
            newTopic[i].fanCount = userFan1;
            //获取作者头像地址
            let userInfo0 = await fetch(`http://apitest.niconi.cc/user/basic/${newTopic[i].userId}`);
            let userInfo1 = await userInfo0.json();
            newTopic[i].portraitUrl = userInfo1.portraitUrl;
            //获取所在版面名称
            newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
        }
        //匿名时粉丝数显示0
        else {
            newTopic[i].fanCount = 0;
            newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
        
            newTopic[i].boardName = "心灵之约";
        }
    }
        return newTopic;
    
      } catch (e) {
    alert("网络中断");
}
}


//与缓存相关的函数
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
export function setLocalStorage(key, value, expireIn = 0) {
    let v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = `obj-${v}`;
    } else {
        v = `str-${v}`;
    }
    localStorage.setItem(key, v);
    
    if (expireIn !== 0) {
        const now = new Date().getTime();
        let expirationTime = now + expireIn * 1000;
        localStorage.setItem(`${key}_expirationTime`, expirationTime.toString().slice(0, expirationTime.toString().length - 3));
    } else {
        localStorage.removeItem(`${key}_expirationTime`);
    }
}
export function getLocalStorage(key) {
    let v = localStorage.getItem(key);
    let expirationTime = localStorage.getItem(`${key}_expirationTime`);
    if (expirationTime) {
        const now = new Date().getTime();
        const time = Number.parseInt(expirationTime) * 1000;

        if (now > time) {
            localStorage.removeItem(key);
            return;
        }
    }

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
export function removeLocalStorage(key) {
    localStorage.removeItem(key);
    return;
}
export function removeStorage(key) {
    sessionStorage.removeItem(key);
    return;
}

/*
* 根据boardId返回boardName
*/
export async function getBoardName(boardId: number) {
    try {
    let boardName: string;

    boardName = getLocalStorage(`boardId_${boardId}`);

    if (!boardName) {
        const url = `http://apitest.niconi.cc/board/${boardId}`;
        let res = await fetch(url);
        let data = await res.json();
        boardName = data.name;
        setLocalStorage(`boardId_${boardId}`, boardName);
    }


        return boardName;
    } catch (e) {
        alert("网络中断");
    }
}

/*
* 返回用户是否登陆
*/

export function isLogOn(): boolean {
    const token = getLocalStorage("accessToken");

    return !!token;
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentContact(from: number, size: number) {
    try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    let response = await fetch(`http://apitest.niconi.cc/message/recentcontactusers?from=${from}&size=${size}`, { headers });
    let recentContactId = await response.json();
    let url = "http://apitest.niconi.cc/user/basic"
    for (let i in recentContactId) {
        if (i == "0") {
            url = `${url}?id=${recentContactId[i]}`;
        }
        else {
            url = `${url}&id=${recentContactId[i]}`;
        }
    }
    let response1 = await fetch(url);
    let recentContact = await response1.json();
    for (let i in recentContact) {
        recentContact[i].message = await getRecentMessage(recentContact[i].id, 0, 10);
    }
    return recentContact;
    } catch (e) {
        alert("网络中断");
    }
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentMessage(userId: number, from: number, size: number) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        let response = await fetch(`http://apitest.niconi.cc/message/${userId}?from=${from}&size=${size}`, { headers });
        let recentMessage = await response.json();
        return recentMessage;
    } catch (e) {
        alert("网络中断");
    }
}

export async function getTotalReplyCount(topicid) {
        try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const replyCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
            const replyCountJson = await replyCountResponse.json();
            console.log("reply");
            console.log(replyCountJson);
    const replyCount = replyCountJson.replyCount;
    if (replyCount >= 10) {
        return (replyCount - replyCount % 10) / 10 + 1;
    } else {
        return 1;
        }
    } catch (e) {
        alert("网络2中断");
    }
}
export async function getCategory(topicid) {
    try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
    const data = await response.json();
    const topicName = data.title;
    const boardId = data.boardId;
    const boardResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
    const boardData = await boardResponse.json();
    const boardName = boardData.name;
    const body = { boardId: boardId, topicId: topicid, boardName: boardName, title: topicName }
        return body;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getUserDetails(userName) {
    try {
    let url = `http://apitest.niconi.cc/user/name/${userName}`;
    let message = await fetch(url);
    let data = await message.json();
    const body = { portraitUrl: data.portraitUrl, userName: data.name, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle }
        return body;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getLikeState(topicid) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const topic = await getTopic(topicid);
    const postid = topic.postid;
    const response = await fetch(`http://apitest.niconi.cc/post/likestate?topicid=${topicid}&postid=${postid}`, { headers });
    const data = await response.json();
        return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function refreshLikeState(topicId, postId) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const response = await fetch(`http://apitest.niconi.cc/post/likestate?topicid=${topicId}&postid=${postId}`, { headers });
    const data = await response.json();
        return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function sendTopic(topicId) {
    try {
    const url = `http://apitest.niconi.cc/post/topic/${topicId}`;
    const c = testEditor.getMarkdown();
    const content = {
        content: c,
        contentType: 1,
        title: ""
    }
    const contentJson = JSON.stringify(content);
    const token = getLocalStorage("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", 'application/json');
        const mes = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: contentJson
        }
        );
    } catch (e) {
        alert("网络中断");
    }
}
export async function getListCategory(boardId) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const boardResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
    const boardData = await boardResponse.json();
    const boardName = boardData.name;
        return boardName;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getBoardMessage(boardId) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const url = `http://apitest.niconi.cc/Board/${boardId}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
        return data;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getListTotalPage(boardId) {
    try {
    const token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const totalTopicCountResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
    const totalTopicCountJson = await totalTopicCountResponse.json();
    const totalTopicCount = totalTopicCountJson.topicCount;

        return (totalTopicCount - totalTopicCount % 20) / 20 + 1;
    } catch (e) {
        alert("网络中断");
    }
}
export async function getBasicBoardMessage(boardId, curPage) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
        console.log("basic");
        if (response.status == 200) {
            const json = await response.json();
            const bigPaper: string = json.bigPaper;
            let page: number;
            // 未提供页码，防止出错不进行后续处理
            if (!curPage) {
                page = 1;
            }
            // 转换类型
            else { page = parseInt(curPage); }
            const boardid = boardId;
            const totalPage = await getListTotalPage(boardid);
            const data = { bigPaper: bigPaper, totalPage: totalPage, page: page };
            return data;
        } else if (response.status == 401) {
            alert("未登录或无权限");
        }
    } catch (e) {
        alert("网络中断");
    }
}
export async function getCurUserTotalReplyPage(topicId, userId) {
    try {
    let token = getLocalStorage("accessToken");
    const headers = new Headers();
    headers.append('Authorization', token);
    const replyCountResponse = await fetch(`http://apitest.niconi.cc/post/topic/user?topicid=${topicId}&userid=${userId}&from=0&size=1`, { headers });
    const replyCountJson = await replyCountResponse.json();
    const replyCount = replyCountJson[0].count;
    if (replyCount > 10) {
        return (replyCount - replyCount % 10) / 10 + 1;
    } else {
        return 1;
        }
    } catch (e) {
        alert("网络5中断");
    }
}