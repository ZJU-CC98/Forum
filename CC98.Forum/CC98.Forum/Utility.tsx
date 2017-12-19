import * as Prop from './Props/AppProps'
import * as State from './States/AppState'
import * as React from 'react';
import store from './Store';
//import { browserHistory } from 'react-router';
import { TopicTitleAndContent } from './Components/Board/Board'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as $ from 'jquery';
import { changeUserInfo } from './Actions';

declare let editormd: any;
declare let testEditor: any;
declare let moment: any;
declare let urljoin: any;
export async function getBoardTopicAsync(curPage, boardId, totalTopicCount) {
    try {

        const startPage = (curPage - 1) * 20;
        const endPage = curPage * 20 - 1;
        const headers = await formAuthorizeHeader();
        let topicNumberInPage;
        if (curPage * 20 <= totalTopicCount) {
            topicNumberInPage = 20;
        } else if (curPage === 1 && totalTopicCount < 19) {
            topicNumberInPage = totalTopicCount;
        } else {
            topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
        }

        const boardtopics: State.TopicTitleAndContentState[] = [];
        const url = `/Board/${boardId}/topic?from=${startPage}&size=${topicNumberInPage}`;

        const response = await cc98Fetch(url,
            { headers });
        //无权限进版面
        switch (response.status) {
            case 401:
                return 'unauthorized';
            case 404:
                return 'not found';
        }
        const data: State.TopicTitleAndContentState[] = await response.json();
        for (let i = 0; i < topicNumberInPage; i++) {
            boardtopics[i] = {
                ...data[i], replyCount: data[i].replyCount || 0
            }
        }

        return boardtopics;


    } catch (e) {
        console.error(e);
        ////window.location.href = "/status/Disconnected";
    }

}
export async function getTopic(topicid: number) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/Topic/${topicid}/post?from=0&size=1`, {
            headers
        });
        const data = await response.json();
        let topicMessage = null;
        const likeInfo = await refreshLikeState(topicid, data[0].id);
        const awardInfo = await getAwardInfo(data[0].id);
        if (data[0].isAnonymous != true) {

            const userMesJson = await getUserInfo(data[0].userId);
            topicMessage = { ...data[0], userInfo: userMesJson, postId: data[0].id, likeInfo: likeInfo, awardInfo: awardInfo }
        } else {
            const anonymousUserName = `匿名${data[0].userName.toUpperCase()}`;
            let purl = 'https://www.cc98.org/pic/anonymous.gif';
            const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
            topicMessage = { ...data[0], userInfo: userMesJson, postId: data[0].id, isAnonymous: true, likeInfo: likeInfo, awardInfo: awardInfo }

        }

        return topicMessage;


    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function getTopicContent(topicid: number, curPage: number, replyCount: number) {
    try {
        const startPage = (curPage - 1) * 10;
        const endPage = curPage * 10 - 1;
        const headers = await formAuthorizeHeader();
        const topic = curPage !== 1
            ? await cc98Fetch(`/Topic/${topicid}/post?from=${startPage}&size=10`, { headers })
            : await cc98Fetch(`/Topic/${topicid}/post?from=1&size=9`, { headers });
        const content = await topic.json();
        const post = [];
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
            const likeInfo = await refreshLikeState(topicid, content[i].id);
            const awardInfo = await getAwardInfo(content[i].id);
            if (content[i].isAnonymous != true && content[i].isDeleted != true) {

                const userMesJson = await getUserInfo(content[i].userId);
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id, likeInfo: likeInfo, awardInfo: awardInfo
                }

            } else if (content[i].isAnonymous == true) {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;

                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {

                    ...content[i], userInfo: userMesJson, postId: content[i].id, isAnonymous: true, likeInfo: likeInfo, awardInfo: awardInfo
                }
            } else {
                const userMesJson = { name: '98Deleter', portraitUrl: 'http://www.cc98.org/images/policeM.png', id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], postId: content[i].id, isAnonymous: false, isDeleted: true, content: "该贴已被my cc98, my home", likeInfo: likeInfo, awardInfo: awardInfo
                }
            }
        }
        return post;

    } catch (e) {
        console.error(e);
        ////window.location.href = "/status/Disconnected";
    }
}
export async function like(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();
        headers.append("Content-Type", "application/json");
        const content = "1";
        const response = await cc98Fetch(`/post/${postid}/like`, { method: "PUT", headers, body: content });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const data = await response.json();
        return data;

    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function dislike(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();
        headers.append("Content-Type", "application/json");
        const content: string = "2";
        const response = await cc98Fetch(`/post/${postid}/like`, { method: "PUT", headers, body: content });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }

        if (response.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const data = await response.json();
        return data;

    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function getLikeStateAndCount(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();

        const response = await cc98Fetch(`/post/${postid}/like`, { headers });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }

        if (response.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const data = await response.json();
        return data;

    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function getHotReplyContent(topicid: number) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/Topic/${topicid}/hot-post`, { headers });
        const content = await response.json();
        const post = [];
        let topicNumberInPage: number = content.length;
        for (let i = 0; i < topicNumberInPage; i++) {
            const likeInfo = await refreshLikeState(topicid, content[i].id);
            const awardInfo = await getAwardInfo(content[i].id);
            if (content[i].isAnonymous != true) {

                const userMesResponse = await cc98Fetch(`/user/name/${content[i].userName}`);
                const userMesJson = await userMesResponse.json();
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id, likeInfo: likeInfo, awardInfo: awardInfo
                }

            } else {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;
                const anonymousLastReplierName = `匿名${content[i].lastUpdateAuthor.toUpperCase()}`;
                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id, likeInfo: likeInfo, awardInfo: awardInfo
                }
            }
        }
        return post;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export function getListPager(totalPage) {
    if (totalPage === 1) {
        return [];
    } else if (totalPage === 2) {
        return [1, 2];
    } else if (totalPage === 3) {
        return [1, 2, 3];
    } else if (totalPage === 4) {
        return [1, 2, 3, 4];
    } else if (totalPage === 5) {
        return [1, 2, 3, 4, 5];
    } else if (totalPage === 6) {
        return [1, 2, 3, 4, 5, 6];
    } else if (totalPage === 7) {
        return [1, 2, 3, 4, 5, 6, 7];
    } else {
        return [1, 2, 3, 4, -1, totalPage - 3, totalPage - 2, totalPage - 1];
    }
}
export function convertHotTopic(item: State.TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} title={item.title} userName={item.userName} id={item.id} userId={item.userId} lastPostTime={item.lastPostTime} lastPostUser={item.lastPostUser} likeCount={item.likeCount} dislikeCount={item.dislikeCount} replyCount={item.replyCount} highlightInfo={item.highlightInfo} topState={item.topState} state={item.state} hitCount={item.hitCount} />
        ;
}
export function getPager(curPage, totalPage) {
    if (!curPage) {
        curPage = 1;
    }
    let pages: number[] = [];
    if (totalPage == 1) {
        pages = [1];
    } else if (totalPage < 10 && totalPage > 1) {
        if (curPage == 1) {
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
            if (curPage == 1) {
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
export async function getCurUserTopic(topicid: number, userId: number, router) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/topic/user?topicid=${topicid}&userid=${userId}&from=0&size=1`, { headers });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const data = await response.json();
        const userMesResponse = await cc98Fetch(`/user/name/${data[0].userName}`);
        if (userMesResponse.status === 404) {
            //window.location.href = "/status/NotFoundUser";
        }
        if (userMesResponse.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const userMesJson = await userMesResponse.json();
        data[0].userImgUrl = userMesJson.portraitUrl;
        return data[0];
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
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

        const token = await getToken();
        const headers = new Headers();
        headers.append('Authorization', token);
        const topic = await cc98Fetch(`/Post/topic/user?topicid=${topicid}&userId=${userId}&from=${start}&size=10`, { headers });
        const content = await topic.json();

        let post = [];
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
            const likeInfo = await refreshLikeState(topicid, content[i].id);
            const awardInfo = await getAwardInfo(content[i].id);
            if (content[i].isAnonymous != true) {
                const userMesJson = await getUserInfo(content[i].userId);
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id, likeInfo: likeInfo, awardInfo: awardInfo
                }

            } else {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;
                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], userInfo: userMesJson, likeInfo: likeInfo, awardInfo: awardInfo
                }
            }
        }

        return post;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

/**
 * 获取全站新帖
 * @param curPage
 */
export async function getAllNewTopic(from: number, router) {
    try {
        /**
         * 一次性可以获取20个主题
         */
        var size = 20;
        if (from > 80) {
            size = 100 - from;
        }
        const headers = await formAuthorizeHeader();
        /**
         * 通过api获取到主题之后转成json格式
         */
        const response = await cc98Fetch(`/topic/new?from=${from}&size=${size}`, { headers });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        let newTopic = await response.json();

        for (let i in newTopic) {
            if (newTopic[i].userId) {
                //获取作者粉丝数目
                let userFan0 = await cc98Fetch(`/user/follower/count?userid=${newTopic[i].userId}`);
                if (userFan0.status === 404) {
                    //window.location.href = "/status/NotFoundUser";
                }
                if (userFan0.status === 500) {
                    //window.location.href = "/status/ServerError";
                }
                let userFan1 = await userFan0.json();
                newTopic[i].fanCount = userFan1;
                //获取作者头像地址
                let userInfo0 = await cc98Fetch(`/user/basic/${newTopic[i].userId}`);
                if (userInfo0.status === 404) {
                    //window.location.href = "/status/NotFoundUser";
                }
                if (userInfo0.status === 500) {
                    //window.location.href = "/status/ServerError";
                }
                let userInfo1 = await userInfo0.json();
                newTopic[i].portraitUrl = userInfo1.portraitUrl;
                //获取所在版面名称
                newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
                //阅读数转换
                if (newTopic[i].hitCount > 10000) {
                    if (newTopic[i].hitCount > 100000) {
                        let index = parseInt(`${newTopic[i].hitCount / 10000}`);
                        newTopic[i].hitCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${newTopic[i].hitCount / 1000}`) / 10;
                        newTopic[i].hitCount = `${index}万`;
                    }
                }
                //回复数转换
                if (newTopic[i].replyCount > 10000) {
                    if (newTopic[i].replyCount > 100000) {
                        let index = parseInt(`${newTopic[i].replyCount / 10000}`);
                        newTopic[i].replyCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${newTopic[i].replyCount / 1000}`) / 10;
                        newTopic[i].replyCount = `${index}万`;
                    }
                }
            }
            //匿名时粉丝数显示0
            else {
                newTopic[i].fanCount = 0;
                newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                newTopic[i].userName = "匿名用户";
                newTopic[i].boardName = "心灵之约";
            }
        }
        return newTopic;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

/**
 * 获取关注帖子,boardId == -1为关注用户帖子, boardId === 0 为全部关注版面帖子, boardId > 0则为对应版面帖子
 * @param curPage
 */
export async function getFocusTopic(boardId: number, boardName: string, from: number, router) {
    try {
        /**
         * 一次性可以获取20个主题
         */
        var size = 20;
        if (from > 80) {
            size = 100 - from;
        }
        const headers = await formAuthorizeHeader();
        /**
         * 通过api获取到主题之后转成json格式
         */
        let response;
        if (boardId === -1) {
            response = await cc98Fetch(`/me/followee/topic?from=${from}&size=${size}`, { headers });
        }
        else if(boardId === 0) {
            response = await cc98Fetch(`/me/custom-board/topic?from=${from}&size=${size}`, { headers });
        }
        else {
            response = await cc98Fetch(`/board/${boardId}/topic?from=${from}&size=${size}`, { headers });
        }
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        let newTopic = await response.json();
        console.log("最后回复", newTopic);
        for (let i in newTopic) {
            if (newTopic[i].userId) {
                //获取作者粉丝数目
                let userFan0 = await cc98Fetch(`/user/follower/count?userid=${newTopic[i].userId}`);
                if (userFan0.status === 404) {
                    //window.location.href = "/status/NotFoundUser";
                }
                if (userFan0.status === 500) {
                    //window.location.href = "/status/ServerError";
                }
                let userFan1 = await userFan0.json();
                newTopic[i].fanCount = userFan1;
                //获取作者头像地址
                let userInfo0 = await cc98Fetch(`/user/basic/${newTopic[i].userId}`);
                if (userInfo0.status === 404) {
                    //window.location.href = "/status/NotFoundUser";
                }
                if (userInfo0.status === 500) {
                    //window.location.href = "/status/ServerError";
                }
                let userInfo1 = await userInfo0.json();
                newTopic[i].portraitUrl = userInfo1.portraitUrl;
                //获取所在版面名称
                newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
                
                //阅读数转换
                if (newTopic[i].hitCount > 10000) {
                    if (newTopic[i].hitCount > 100000) {
                        let index = parseInt(`${newTopic[i].hitCount / 10000}`);
                        newTopic[i].hitCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${newTopic[i].hitCount / 1000}`) / 10;
                        newTopic[i].hitCount = `${index}万`;
                    }
                }
                //回复数转换
                if (newTopic[i].replyCount > 10000) {
                    if (newTopic[i].replyCount > 100000) {
                        let index = parseInt(`${newTopic[i].replyCount / 10000}`);
                        newTopic[i].replyCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${newTopic[i].replyCount / 1000}`) / 10;
                        newTopic[i].replyCount = `${index}万`;
                    }
                }
            }
            //匿名时粉丝数显示0
            else {
                newTopic[i].fanCount = 0;
                newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                newTopic[i].userName = "匿名用户";
                newTopic[i].boardName = "心灵之约";
            }
        }
        return newTopic;

    } catch (e) {
        ////window.location.href = "/status/Disconnected";
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
    if (key != 'all') {
        localStorage.removeItem(key);
    }
    else {
        localStorage.clear();
    }
    return;
}
export function removeStorage(key) {
    if (key != 'all') {
        sessionStorage.removeItem(key);
    }
    else {
        sessionStorage.clear();
    }
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
            const token = await getToken();
            const headers = new Headers();
            headers.append('Authorization', token);
            const url = `/board/${boardId}`;
            let res = await cc98Fetch(url, { headers });
            if (res.status === 404) {
                //window.location.href = "/status/NotFoundBoard";
            }
            if (res.status === 500) {
                //window.location.href = "/status/ServerError";
            }

            let data = await res.json();
            boardName = data.name;
            setLocalStorage(`boardId_${boardId}`, boardName);
        }


        return boardName;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

/*
* 返回用户是否登陆
*/

export function isLogOn(): boolean {
    const token = getLocalStorage("userName");

    return !!token;
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentContact(from: number, size: number, router) {
    try {
        const headers = await formAuthorizeHeader();
        console.log("开始获取联系人数据");
        let response = await cc98Fetch(`/message/recent-contact-users?from=${from}&size=${size}`, { headers });
        if (response.status === 401) {
            ////window.location.href="/status/Loggout");
        }
        if (response.status === 500) {
            ////window.location.href="/status/ServerError");
        }
        let recentContactId = await response.json();
        console.log("开始获取联系人id数组", recentContactId);
        let url = "/user/basic"
        for (let i in recentContactId) {
            if (i === "0") {
                url = `${url}?id=${recentContactId[i].userId}`;
            }
            else {
                url = `${url}&id=${recentContactId[i].userId}`;
            }
        }
        let response1 = await cc98Fetch(url);
        if (response1.status === 404) {
            ////window.location.href="/status/NotFoundUser");
        }
        if (response1.status === 500) {
            ////window.location.href="/status/ServerError");
        }
        let recentContact = await response1.json();
        for (let i in recentContact) {
            recentContact[i].message = [];
            recentContact[i].lastContent = recentContactId[i].lastContent;
        }
        console.log("接收到没有Message的列表");
        console.log(recentContact);
        return recentContact;
    } catch (e) {
        ////window.location.href="/status/Disconnected");
    }
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentMessage(userId: number, from: number, size: number, router) {
    try {
        const headers = await formAuthorizeHeader();
        let response0 = await cc98Fetch(`/message/user/${userId}?from=${from}&size=${size}`, { headers });
        if (response0.status === 401) {
            ////window.location.href="/status/Logout");
        }
        if (response0.status === 500) {
            ////window.location.href="/status/ServerError");
        }
        let response1 = await response0.json();
        console.log("直接获取到的Message");
        console.log(response1);
        let recentMessage = sortRecentMessage(response1);
        return recentMessage;
    } catch (e) {
        ////window.location.href="/status/Disconnected");
    }
}

/**
 * 处理最新消息列表，时间间隔短的消息只显示第一条消息的时间
 * @param recentMessage
 */
export function sortRecentMessage(recentMessage) {
    console.log(recentMessage);
    if (recentMessage == [] || !recentMessage) {
        return recentMessage;
    }
    else {
        for (let i = 0; i < recentMessage.length; i++) {
            if (i + 1 == recentMessage.length) {
                recentMessage[i].showTime = true;
            }
            else if (transerTime(recentMessage[i].time) - transerTime(recentMessage[i + 1].time) < 60000) {
                recentMessage[i].showTime = false;
            }
            else {
                recentMessage[i].showTime = true;
            }
        }
        console.log("返回的recentMessage");
        console.log(recentMessage);
        return recentMessage;
    }
}

/**
 * api返回的时间格式转换成时间戳的函数
 * @param time
 */
export function transerTime(time) {
    let timeStr = moment(time).format('YYYY-MM-DD HH:mm:ss')
    let timeDate = timeStr.replace(/-/g, '/');
    let timestamp = new Date(timeDate).getTime();
    return timestamp;
}

/**
 * 对联系人列表重新排序，看是否有从其他页面发起的聊天
 * @param recentContact
 */
export async function sortContactList(recentContact, router) {
    //看url中是否携带id信息，如果有的话就作为第一个联系人
    let urlId = location.href.match(/id=(\S+)/);
    if (urlId) {
        let chatManId = parseInt(urlId[1]);
        //先看一下该聊天对象在不在联系人列表里
        for (var i = 0; i < recentContact.length; i++) {
            if (recentContact[i].id == chatManId) {
                break;
            }
        }
        //如果恰好是联系人列表第一那就什么都不做
        if (i == 0) { }
        //如果在列表里但不是第一个，就把他提到第一个
        else if (i < recentContact.length) {
            let indexData = recentContact[i];
            recentContact.splice(i, 1);
            recentContact.unshift(indexData);
        }
        //如果不在联系人列表里，那就查找该人信息并作为列表第一个
        else {
            let response;
            let chatMan;
            let flag = 1;
            try {
                response = await cc98Fetch(`/user/basic/${chatManId}`);
                if (response.status === 404) {
                    ////window.location.href="/status/NotFoundUser");
                }
                if (response.status === 500) {
                    ////window.location.href="/status/ServerError");
                }
                chatMan = await response.json();
            }
            catch (e) {
                ////window.location.href="/status/Disconnected");
                flag = 0;
            }
            if (flag == 1) {
                chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                if (chatMan.message) {
                    chatMan.lastContent = chatMan.message[0];
                }
                let chatContact = [chatMan];
                recentContact = chatContact.concat(recentContact);
            }
        }
    }
    else { //看url中是否携带name信息，如果有的话就作为第一个联系人
        let urlName = location.href.match(/name=(\S+)/);
        if (urlName) {
            let chatManName = urlName[1];
            //先看一下该聊天对象在不在联系人列表里
            for (var i = 0; i < recentContact.length; i++) {
                if (recentContact[i].name == chatManName) {
                    break;
                }
            }
            //如果恰好是联系人列表第一那就什么都不做
            if (i == 0) { }
            //如果在列表里但不是第一个，就把他提到第一个
            else if (i < recentContact.length) {
                let indexData = recentContact[i];
                recentContact.splice(i, 1);
                recentContact.unshift(indexData);
            }
            //如果不在联系人列表里，那就查找该人信息并作为列表第一个
            else {
                let response0;
                let response1;
                let flag = 1;
                try {
                    response0 = await cc98Fetch(`/user/name/${chatManName}`);
                    if (response0.status === 404) {
                        ////window.location.href="/status/NotFoundUser");
                    }
                    if (response0.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    response1 = await response0.json();
                } catch (e) {
                    ////window.location.href="/status/Disconnected");
                    flag = 0;
                }
                if (flag == 1) {
                    let chatMan = { id: null, name: '', portraitUrl: '', message: [], lastContent: '' };
                    chatMan.id = response1.id;
                    chatMan.name = response1.name;
                    chatMan.portraitUrl = response1.portraitUrl;
                    chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                    if (chatMan.message) {
                        chatMan.lastContent = chatMan.message[0];
                    }
                    let chatContact = [chatMan];
                    recentContact = chatContact.concat(recentContact);
                }
            }
        }
    }
    return recentContact;
}


/*export async function getTotalReplyCount(topicid, router) {
    try {
        let token = await await getToken();
        const headers = new Headers();
        headers.append('Authorization', token);
        const replyCountResponse = await cc98Fetch(`/Topic/${topicid}`, { headers });
        if (replyCountResponse.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (replyCountResponse.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (replyCountResponse.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson.replyCount;
        if (replyCount >= 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
*/

export async function getUserDetails(userId) {
    try {
        const data = await getUserInfo(userId);
        const body = { portraitUrl: data.portraitUrl, userName: data.name, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing }
        return body;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function getLikeState(topicid, router) {
    try {
        const headers = await formAuthorizeHeader();
        const topic = await getTopic(topicid);
        const postId = topic.postId;
        const response = await cc98Fetch(`/post/${postId}/like`, { headers });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        } else {
            const data = await response.json();
            return data;
        }
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function refreshLikeState(topicId, postId) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/${postId}/like`, { headers });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (response.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const data = await response.json();
        return data;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function sendTopic(topicId, router) {
    try {
        const url = `/post/topic/${topicId}`;
        const c = testEditor.getMarkdown();
        const content = {
            content: c,
            contentType: 1,
            title: ""
        }
        const contentJson = JSON.stringify(content);
        const token = await getToken();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", 'application/json');
        const mes = await cc98Fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: contentJson
        }
        );
        if (mes.status === 401) {
            //window.location.href = "/status/Logout";
        }
        if (mes.status === 402) {
            //window.location.href = "/status/ContentNeeded";
        }
        if (mes.status === 403) {
            //window.location.href = "/status/OperationForbidden";
        }
        if (mes.status === 404) {
            //window.location.href = "/status/NotFoundTopic";
        }
        if (mes.status === 500) {
            //window.location.href = "/status/ServerError";
        }
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}


export function getListTotalPage(totalTopicCount) {
    return (totalTopicCount - totalTopicCount % 20) / 20 + 1;
}
export async function getCurUserTotalReplyPage(topicId, userId, router) {
    try {
        const headers = await formAuthorizeHeader();
        const replyCountResponse = await cc98Fetch(`/post/topic/user?topicid=${topicId}&userid=${userId}&from=0&size=1`, { headers });
        if (replyCountResponse.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (replyCountResponse.status === 404) {
            //window.location.href = "/status/NotFoundBoard";
        }
        if (replyCountResponse.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson[0].count;
        if (replyCount > 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

/**
 * 发送私信的函数
 * @param bodyContent
 */
export async function sendMessage(bodyContent: string, router) {
    const myHeaders = await formAuthorizeHeader();
    myHeaders.append('content-type', 'application/json');
    let response = await cc98Fetch('/message', {
        method: 'POST',
        headers: myHeaders,
        body: bodyContent
    });
    if (response.status === 401) {
        //window.location.href = "/status/Loggout";
    }
    if (response.status === 500) {
        //window.location.href = "/status/ServerError";
    }
    return response;
}

/**
*滚动条在Y轴上的滚动距离,为isBottom()服务
*/
export function getScrollTop() {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

/**
*文档的总高度，为isBottom()服务
*/
export function getScrollHeight() {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

/**
*浏览器视口的高度，为isBottom()服务
*/
export function getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

/**
*判断滚动条是否滚动到底部
*/

export function isBottom() {
    /*
    *预留100px给“正在加载”的提示标志
    */
    if (getScrollTop() + getWindowHeight() + 300 > getScrollHeight()) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 上传文件
 * @param file
 */
export async function uploadFile(file: File) {
    try {
        const url = `/file`;
        const myHeaders = await formAuthorizeHeader();
        let formdata = new FormData();
        formdata.append('files', file, file.name);
        formdata.append('contentType', "multipart/form-data");
        let res = await cc98Fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        });
        let data: string[] = await res.json();
        if (res.status === 200 && data.length !== 0) {
            return {
                isSuccess: true,
                content: data[0]
            };
        } else {
            throw {};
        }
    } catch (e) {
        return {
            isSuccess: false,
            content: ''
        };
    }
}
export function clickUploadIcon() {
    console.log("click");
    $("#upload-files").click();
}
export async function uploadEvent(e) {
    const files = e.target.files;
    const res = await uploadFile(files[0]);
    const url = res.content;
    const str = `![](${url})`;
    testEditor.appendMarkdown(str);
    console.log("upload and append");
}
/**
 * 关注指定id的用户
 * @param userId
 */
export async function followUser(userId: number) {
    try {
        const headers = await formAuthorizeHeader();
        const url = `/me/followee/${userId}`;

        let res = await cc98Fetch(url, {
            method: 'PUT',
            headers
        });
        if (res.status === 200) {
            return true;
        } else {
            throw {};
        }
    } catch (e) {
        return false;
    }
}

/**
 * 取关指定id的用户
 * @param userId
 */
export async function unfollowUser(userId: number) {
    try {
        const headers = await formAuthorizeHeader();
        const url = `/me/followee/${userId}`;

        let res = await cc98Fetch(url, {
            method: 'DELETE',
            headers
        });
        if (res.status === 200) {
            return true;
        } else {
            throw {};
        }
    } catch (e) {
        return false;
    }
}

export async function GetTopTopics(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/topic/toptopics?boardid=${boardId}`;
    const response = await cc98Fetch(url, { headers });
    const data: State.TopicTitleAndContentState[] = await response.json();
    let topics: State.TopicTitleAndContentState[] = [];
    for (let i = 0; i < data.length; i++) {
        topics[i] = { ...data[i], replyCount: data[i].replyCount || 0 };
    }
    for (let i = 0; i < topics.length - 1; i++) {
        for (let j = 0; j < topics.length - 1 - i; j++) {
            if (topics[j].topState <= topics[j + 1].topState) {
                let temp = topics[j];
                topics[j] = topics[j + 1];
                topics[j + 1] = temp;
            }
        }
    }
    return topics;
}
export async function getBestTopics(curPage, boardId) {
    const start = (curPage - 1) * 20;
    const url = `/topic/best/board/${boardId}?from=${start}&size=20`;
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    let boardtopics: State.TopicTitleAndContentState[] = [];
    for (let i = 0; i < data.topics.length; i++) {
        boardtopics[i] = { ...data.topics[i], replyCount: data.topics[i].replyCount || 0 };
    }
    const totalPage = data.count % 20 === 0 ? data.count / 20 : (data.count - data.count % 20) / 20 + 1;
    const obj = { boardtopics: boardtopics, totalPage: totalPage };
    return obj;
}
export async function getSaveTopics(curPage, boardId) {
    const start = (curPage - 1) * 20;
    const url = `/topic/save/board/${boardId}?from=${start}&size=20`;
    const token = await getToken();
    const headers = new Headers();
    headers.append("Authorization", token);
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    let boardtopics: State.TopicTitleAndContentState[] = [];
    for (let i = 0; i < data.topics.length; i++) {
        boardtopics[i] = { ...data.topics[i], replyCount: data.topics[i].replyCount || 0 };
    } const totalPage = data.count % 20 === 0 ? data.count / 20 : (data.count - data.count % 20) / 20 + 1;
    const obj = { boardtopics: boardtopics, totalPage: totalPage };
    return obj;
}

/**
 * 搜索指定关键词主题
 * @param boardId
 * @param words
 * @param from
 * @param rouer
 */
export async function getSearchTopic(boardId: number, words: string[], from: number, router) {
    console.log("开始获取搜索结果了");
    try {
        const myHeaders = await formAuthorizeHeader();
        let bodyCotent = JSON.stringify(words);

        myHeaders.append('content-type', 'application/json');
        let size = 20;
        let newTopic;
        if (boardId == 0) {
            const response = await cc98Fetch(`/topic/search?from=${from}&size=${size}`, {
                method: 'POST',
                headers: myHeaders,
                body: bodyCotent
            });
            if (response.status === 401) {
                //window.location.href = "/status/UnauthorizedTopic";
            }
            if (response.status === 500) {
                //window.location.href = "/status/ServerError";
            }
            newTopic = await response.json();
        }
        else {
            const response = await cc98Fetch(`/topic/search/board/${boardId}?from=${from}&size=${size}`, {
                method: 'POST',
                headers: myHeaders,
                body: bodyCotent
            });
            if (response.status === 401) {
                //window.location.href = "/status/UnauthorizedTopic";
            }
            if (response.status === 500) {
                //window.location.href = "/status/ServerError";
            }
            newTopic = await response.json();
        }
        //如果有搜索结果就处理一下
        if (newTopic && newTopic != []) {
            for (let i in newTopic) {
                if (newTopic[i].userId) {
                    //获取作者粉丝数目
                    let userFan0 = await cc98Fetch(`/user/follower/count?userid=${newTopic[i].userId}`);
                    if (userFan0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userFan0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    let userFan1 = await userFan0.json();
                    newTopic[i].fanCount = userFan1;
                    //获取作者头像地址
                    let userInfo0 = await cc98Fetch(`/user/basic/${newTopic[i].userId}`);
                    if (userInfo0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userInfo0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    let userInfo1 = await userInfo0.json();
                    newTopic[i].portraitUrl = userInfo1.portraitUrl;
                    //获取所在版面名称
                    newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
                    //阅读数转换
                    if (newTopic[i].hitCount > 10000) {
                        if (newTopic[i].hitCount > 100000) {
                            let index = parseInt(`${newTopic[i].hitCount / 10000}`);
                            newTopic[i].hitCount = `${index}万`;
                        }
                        else {
                            let index = parseInt(`${newTopic[i].hitCount / 1000}`) / 10;
                            newTopic[i].hitCount = `${index}万`;
                        }
                    }
                    //回复数转换
                    if (newTopic[i].replyCount > 10000) {
                        if (newTopic[i].replyCount > 100000) {
                            let index = parseInt(`${newTopic[i].replyCount / 10000}`);
                            newTopic[i].replyCount = `${index}万`;
                        }
                        else {
                            let index = parseInt(`${newTopic[i].replyCount / 1000}`) / 10;
                            newTopic[i].replyCount = `${index}万`;
                        }
                    }
                }
                //匿名时粉丝数显示0
                else {
                    newTopic[i].fanCount = 0;
                    newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                    newTopic[i].userName = "匿名用户";
                    newTopic[i].boardName = "心灵之约";
                }
            }
            return newTopic;
        }
        //如果没有搜索结果就返回null
        else {
            return 0;
        }
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function awardWealth(reason, value, postId) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const body = {
        operationType: 0,
        reason: reason,
        wealth: value
    }
    const str = JSON.stringify(body);
    const url = `/post/${postId}/operation`;
    if (value) {
        const response = await cc98Fetch(url, { method: "POST", headers, body: str });
        switch (response.status) {
            case 400:
                return 'wrong input';
            case 401:
                return 'unauthorized';
            case 404:
                return 'not found';
            case 500:
                return 'server error';
        }
    }
    return 'ok';
}
export async function deductWealth(reason, value, postId) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const body = {
        operationType: 1,
        reason: reason,
        wealth: value
    }
    const str = JSON.stringify(body);
    const url = `/post/${postId}/operation`;
    if (value!=0) {
        const response = await cc98Fetch(url, { method: "POST", headers, body: str });
        switch (response.status) {
            case 400:
                return 'wrong input';
            case 401:
                return 'unauthorized';
            case 404:
                return 'not found';
            case 500:
                return 'server error';
        }
    }
    return 'ok';
}
export async function getAwardInfo(postId) {
    const headers = await formAuthorizeHeader();
    const url = `/post/${postId}/awards`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}
export async function getPortraitUrl(userName) {
    const url = `/user/name/${userName}`;
    const response = await cc98Fetch(url);
    const data = await response.json();
    return data.portraitUrl;
}
export function getBoardId(boardName: string) {
    let boardInfo = [
        { id: "7", name: "王何宇老师答疑版" },
        { id: "20", name: "冯晓霞老师答疑版" },
        { id: "21", name: "何善蒙老师答疑版" },
        { id: "23", name: "肖少拥老师答疑版" },
        { id: "36", name: "王云武老师答疑版" },
        { id: "41", name: "楼学庆老师答疑版" },
        { id: "42", name: "杨起帆老师答疑版" },
        { id: "47", name: "陈越老师答疑版" },
        { id: "49", name: "方红光老师答疑版" },
        { id: "50", name: "徐镜春老师答疑版" },
        { id: "52", name: "陆汉权老师答疑版" },
        { id: "83", name: "魏宝刚老师的答疑版" },
        { id: "140", name: "古红英老师答疑版" },
        { id: "149", name: "李岩老师答疑版" },
        { id: "151", name: "孙建伶老师答疑版" },
        { id: "183", name: "陆魁军老师答疑版" },
        { id: "204", name: "冯雁老师答疑版" },
        { id: "205", name: "张引老师的答疑版" },
        { id: "207", name: "郑扣根老师答疑版" },
        { id: "208", name: "翁恺老师答疑版" },
        { id: "224", name: "钱抱清老师的答疑版" },
        { id: "279", name: "教师答疑区事务版" },
        { id: "292", name: "高晴老师答疑版" },
        { id: "311", name: "杨义群老师的答疑版" },
        { id: "323", name: "白洪欢老师答疑版" },
        { id: "325", name: "贾厚玉老师的答疑板" },
        { id: "375", name: "张重辉老师答疑版" },
        { id: "383", name: "张彤彧老师答疑版" },
        { id: "408", name: "陈建海老师答疑" },
        { id: "412", name: "精品课程C语言答疑中心" },
        { id: "423", name: "方宁老师答疑版" },
        { id: "427", name: "季江民老师答疑版块" },
        { id: "432", name: "陈平老师答疑版" },
        { id: "440", name: "丁展平老师答疑版" },
        { id: "442", name: "谈艺论戏" },
        { id: "446", name: "桥牌天地" },
        { id: "448", name: "张军老师答疑版" },
        { id: "451", name: "胡兰青老师答疑版" },
        { id: "452", name: "胡兰青老师答疑版" },
        { id: "454", name: "董亚波老师答疑版" },
        { id: "457", name: "史治国老师答疑版" },
        { id: "494", name: "方富民老师答疑版" },
        { id: "501", name: "外院朱晔老师答疑版" },
        { id: "513", name: "邢卫老师答疑版" },
        { id: "514", name: "周波老师答疑版" },
        { id: "535", name: "面向对象程序设计答疑中心" },
        { id: "540", name: "陆维敏老师答疑版" },
        { id: "546", name: "苏振华老师答疑版" },
        { id: "548", name: "姜晓红老师答疑版" },
        { id: "559", name: "吴江琴老师答疑版" },
        { id: "568", name: "杨万喜老师答疑版" },
        { id: "574", name: "胡敏老师的答疑版面" },
        { id: "575", name: "顾宗华老师答疑版" },
        { id: "578", name: "蒋文华老师答疑版" },
        { id: "579", name: "陈华钧老师答疑版" },
        { id: "588", name: "吕萍老师答疑版" },
        { id: "589", name: "黄正谦老师答疑版" },
        { id: "590", name: "王强老师答疑版" },
        { id: "595", name: "陈志坚老师答疑版" },
        { id: "599", name: "彭笑刚老师答疑版" },
        { id: "600", name: "楼辉老师答疑版" },
        { id: "601", name: "沈钦仙老师答疑版" },
        { id: "602", name: "孙凌云老师答疑版" },
        { id: "603", name: "孟涛老师答疑版" },
        { id: "615", name: "孟炳泉老师答疑版" },
        { id: "624", name: "计算机类通识课程答疑版" },
        { id: "626", name: "杨颖老师答疑版" },
        { id: "629", name: "陈实老师答疑版" },
        { id: "631", name: "管理学课程交流版" },
        { id: "632", name: "陈纯老师答疑版" },
        { id: "633", name: "近现代中国的人物研究答疑版" },
        { id: "634", name: "董平老师答疑版" },
        { id: "635", name: "戴俊飞老师答疑版" },
        { id: "640", name: "刘海风老师答疑版" },
        { id: "710", name: "沈语冰老师答疑版" },
        { id: "714", name: "王跃明老师答疑版" },
        { id: "723", name: "李浩然老师答疑版" },
        { id: "724", name: "胡吉明老师答疑版" },
        { id: "726", name: "董玮老师答疑版" },
        { id: "727", name: "王毅老师答疑版" },
        { id: "728", name: "陈文智老师答疑版" },
        { id: "733", name: "陈奇老师答疑版" },
        { id: "745", name: "刘新国老师答疑版" },
        { id: "751", name: "李啸风物理化学答疑版" },
        { id: "752", name: "雷勇老师答疑版" },
        { id: "761", name: "高在峰老师课程交流版" },
        { id: "68", name: "学习交流" },
        { id: "85", name: "English Corner" },
        { id: "102", name: "彼岸阳光" },
        { id: "263", name: "考研一族" },
        { id: "304", name: "二外天地" },
        { id: "318", name: "选课交流" },
        { id: "391", name: "和语瀛风" },
        { id: "401", name: "对外交流" },
        { id: "592", name: "学习天地区事务版" },
        { id: "593", name: "专业咨询" },
        { id: "594", name: "学习资源" },
        { id: "715", name: "在线答疑" },
        { id: "100", name: "校园信息" },
        { id: "197", name: "军训生活" },
        { id: "198", name: "新生宝典" },
        { id: "264", name: "浙大广电" },
        { id: "266", name: "校园动态区事务版" },
        { id: "372", name: "维权空间" },
        { id: "417", name: "毕业生" },
        { id: "450", name: "依依校情" },
        { id: "460", name: "声像浙大" },
        { id: "534", name: "团委学生会" },
        { id: "537", name: "寒假·2017" },
        { id: "539", name: "校园卡工作" },
        { id: "547", name: "青年志愿者" },
        { id: "570", name: "防火视窗" },
        { id: "571", name: "公益爱心" },
        { id: "581", name: "浙大研究生" },
        { id: "748", name: "创客在浙" },
        { id: "230", name: "ftp联盟" },
        { id: "235", name: "求职广场" },
        { id: "339", name: "失物招领" },
        { id: "357", name: "时事新闻" },
        { id: "392", name: "信息资讯区事务版" },
        { id: "459", name: "实习兼职" },
        { id: "473", name: "公务员考录" },
        { id: "515", name: "住房信息" },
        { id: "560", name: "证券投资" },
        { id: "572", name: "交通天下" },
        { id: "738", name: "学生资助" },
        { id: "101", name: "时尚空间" },
        { id: "147", name: "行者无疆" },
        { id: "157", name: "军事天地" },
        { id: "180", name: "数码世界" },
        { id: "229", name: "美食天地" },
        { id: "256", name: "恋车情结" },
        { id: "258", name: "宠物情缘" },
        { id: "261", name: "健康帖士" },
        { id: "272", name: "个性生活区事务版" },
        { id: "313", name: "模型世界" },
        { id: "316", name: "心理学与生活" },
        { id: "402", name: "气象万千" },
        { id: "518", name: "茶韵飘香" },
        { id: "545", name: "手工生活" },
        { id: "551", name: "绿色心情" },
        { id: "16", name: "自由贴图" },
        { id: "115", name: "星座物语" },
        { id: "135", name: "开怀一笑" },
        { id: "146", name: "mm图片" },
        { id: "148", name: "有间鬼屋" },
        { id: "155", name: "智力宝典" },
        { id: "173", name: "光影留痕" },
        { id: "192", name: "有家侦探社" },
        { id: "269", name: "休闲娱乐区事务版" },
        { id: "283", name: "舞动心灵" },
        { id: "353", name: "真我风采" },
        { id: "422", name: "gg图片" },
        { id: "430", name: "魔术与魔方" },
        { id: "549", name: "娱乐新闻" },
        { id: "15", name: "足球板块" },
        { id: "48", name: "台球世界" },
        { id: "86", name: "篮球板块" },
        { id: "99", name: "体育运动" },
        { id: "124", name: "板板一族" },
        { id: "128", name: "free skater" },
        { id: "203", name: "排球天地" },
        { id: "232", name: "我爱网球" },
        { id: "233", name: "乒乓世界" },
        { id: "236", name: "羽球之家" },
        { id: "273", name: "体育运动区事务版" },
        { id: "281", name: "精武门" },
        { id: "282", name: "跆拳道场" },
        { id: "288", name: "梦幻黄龙" },
        { id: "405", name: "精彩F1" },
        { id: "627", name: "伦敦奥运·2012" },
        { id: "731", name: "三好杯" },
        { id: "25", name: "天籁之音" },
        { id: "164", name: "如影随形" },
        { id: "169", name: "摇滚和独立音乐" },
        { id: "202", name: "网络资源" },
        { id: "234", name: "TV满屋" },
        { id: "257", name: "影视工作室" },
        { id: "260", name: "资源发布区" },
        { id: "270", name: "影音无限区事务版" },
        { id: "306", name: "综E在线" },
        { id: "308", name: "乱弹吉他" },
        { id: "314", name: "我的麦克风" },
        { id: "744", name: "NexusHD高清社区" },
        { id: "750", name: "戏剧联盟" },
        { id: "39", name: "软件荟萃" },
        { id: "84", name: "数字艺术" },
        { id: "103", name: "Web设计与开发" },
        { id: "104", name: "硬件天地" },
        { id: "105", name: "编程技术" },
        { id: "154", name: "Java俱乐部" },
        { id: "211", name: "网络技术" },
        { id: "212", name: "Linux天地" },
        { id: "226", name: "电脑医院" },
        { id: "268", name: "电脑技术区事务版" },
        { id: "9", name: "似水年华" },
        { id: "81", name: "情感空气" },
        { id: "114", name: "郁闷小屋" },
        { id: "152", name: "缘分天空" },
        { id: "182", name: "心灵之约" },
        { id: "186", name: "祝福许愿" },
        { id: "244", name: "清樽酹月" },
        { id: "276", name: "感性空间区事务版" },
        { id: "26", name: "读书时光" },
        { id: "144", name: "一路走来" },
        { id: "170", name: "史海拾贝" },
        { id: "271", name: "瞬间永恒区事务版" },
        { id: "312", name: "怪力乱神" },
        { id: "315", name: "98网事" },
        { id: "379", name: "月亮街" },
        { id: "406", name: "哲学思考" },
        { id: "749", name: "社科学术" },
        { id: "759", name: "曲苑杂坛" },
        { id: "760", name: "文学交流" },
        { id: "80", name: "生活点滴" },
        { id: "251", name: "代理专区(旧)" },
        { id: "399", name: "书海淘沙" },
        { id: "449", name: "代理审核" },
        { id: "562", name: "电脑数码" },
        { id: "563", name: "服饰美肤" },
        { id: "564", name: "交易代理区事务版" },
        { id: "569", name: "代理专区" },
        { id: "756", name: "电脑数码已完成交易" },
        { id: "58", name: "信电ISEE" },
        { id: "67", name: "管理学院" },
        { id: "145", name: "传媒与国际文化学院" },
        { id: "158", name: "E电园" },
        { id: "193", name: "生仪大家庭" },
        { id: "214", name: "不败光电" },
        { id: "217", name: "材化演绎" },
        { id: "241", name: "医学院" },
        { id: "246", name: "外语学院" },
        { id: "247", name: "动力机能" },
        { id: "278", name: "院系交流区事务版" },
        { id: "285", name: "碧水青禾" },
        { id: "294", name: "竺可桢学院" },
        { id: "307", name: "人文学院" },
        { id: "319", name: "光华法学院" },
        { id: "320", name: "生命科学学院" },
        { id: "321", name: "生工食品学院" },
        { id: "341", name: "药学院" },
        { id: "344", name: "环资经纬" },
        { id: "351", name: "天下为公" },
        { id: "352", name: "经济学院" },
        { id: "362", name: "教育杏坛" },
        { id: "363", name: "建工学院" },
        { id: "367", name: "理学院" },
        { id: "368", name: "计算机科学与技术学院" },
        { id: "371", name: "控制天下" },
        { id: "377", name: "动科天地CAS" },
        { id: "469", name: "航空航天学院" },
        { id: "582", name: "求是学院" },
        { id: "623", name: "海洋学院" },
        { id: "754", name: "我是工程师" },
        { id: "60", name: "MSTC Microsoft Technology Club" },
        { id: "72", name: "韩之恋韩语社" },
        { id: "129", name: "杭高毕业生专版" },
        { id: "165", name: "绿之源协会" },
        { id: "166", name: "棒垒球协会" },
        { id: "176", name: "Fantasy动漫社" },
        { id: "187", name: "科技探索者协会" },
        { id: "190", name: "学军中学" },
        { id: "194", name: "梵音剧社" },
        { id: "195", name: "法学研究会" },
        { id: "206", name: "浙大DFM街舞社" },
        { id: "209", name: "书院飘香" },
        { id: "210", name: "生命科学协会" },
        { id: "213", name: "墨语茗音" },
        { id: "215", name: "登山协会" },
        { id: "216", name: "梦想天堂" },
        { id: "219", name: "艺术插花协会" },
        { id: "222", name: "慈中家园" },
        { id: "225", name: "灵韵艺术团" },
        { id: "227", name: "博盟电脑俱乐部" },
        { id: "250", name: "奔向奥林匹克运动俱乐部" },
        { id: "253", name: "英语挑战者联盟CEO" },
        { id: "254", name: "学生旅游协会" },
        { id: "277", name: "社团风采区事务版" },
        { id: "287", name: "SCDA（就业与职业发展协会）" },
        { id: "297", name: "《紫金港》·星空文学" },
        { id: "303", name: "浙江大学国防协会" },
        { id: "305", name: "意灵读书者协会" },
        { id: "310", name: "心理学会" },
        { id: "322", name: "紫金港艺术团" },
        { id: "330", name: "学生社团联合会" },
        { id: "332", name: "紫金港证券投资社" },
        { id: "333", name: "摄协之家" },
        { id: "334", name: "红十字会学生分会" },
        { id: "335", name: "DV联盟" },
        { id: "336", name: "学生医学进展研究会" },
        { id: "337", name: "学生第一希望社" },
        { id: "340", name: "无我茶社" },
        { id: "347", name: "学生三农协会" },
        { id: "350", name: "创业协会" },
        { id: "354", name: "一方水土" },
        { id: "355", name: "辩论队与求是辩论社" },
        { id: "358", name: "浙大虫子" },
        { id: "359", name: "卡侬音乐" },
        { id: "361", name: "学生无极棋社" },
        { id: "369", name: "学生空手道协会" },
        { id: "373", name: "伊甸法国" },
        { id: "382", name: "文学联合会" },
        { id: "385", name: "【enactus(原SIFE)】浙大创行国际学生圈" },
        { id: "393", name: "爱心社" },
        { id: "395", name: "动物保护者协会" },
        { id: "396", name: "求是人俱乐部" },
        { id: "397", name: "邓研风采" },
        { id: "431", name: "学生校友联络协会" },
        { id: "434", name: "亦心·民韵舞社" },
        { id: "436", name: "杨式太极拳协会" },
        { id: "437", name: "社团百花园" },
        { id: "438", name: "文琴艺术总团" },
        { id: "439", name: "春秋社" },
        { id: "470", name: "腾讯创新俱乐部" },
        { id: "519", name: "机器人协会" },
        { id: "520", name: "心系西部协会" },
        { id: "558", name: "模拟联合国协会" },
        { id: "561", name: "ShARE" },
        { id: "566", name: "财商俱乐部" },
        { id: "573", name: "Power Of Voice" },
        { id: "576", name: "黑白剧社" },
        { id: "587", name: "HPA保健协会" },
        { id: "617", name: "浙江大学出国留学学生圈SOSA" },
        { id: "618", name: "成长互助训练营GCC" },
        { id: "628", name: "浙江大学学生E志者协会" },
        { id: "713", name: "未来企业家俱乐部FEC" },
        { id: "736", name: "浙江大学研究生创新创业中心CIE" },
        { id: "262", name: "天下一家" },
        { id: "461", name: "在浙之滨" },
        { id: "462", name: "天下一家区事务版" },
        { id: "467", name: "三湘四水" },
        { id: "468", name: "津门故里" },
        { id: "471", name: "齐鲁青未了" },
        { id: "472", name: "蓉汇贯川" },
        { id: "475", name: "三秦大地" },
        { id: "480", name: "八闽来风" },
        { id: "481", name: "江南西道" },
        { id: "482", name: "一皖情深" },
        { id: "483", name: "燕赵飞歌" },
        { id: "484", name: "吴韵汉风" },
        { id: "485", name: "辽地永宁" },
        { id: "486", name: "新上海滩" },
        { id: "489", name: "黑土风情" },
        { id: "491", name: "白山松水" },
        { id: "492", name: "巴渝人家" },
        { id: "493", name: "天山南北" },
        { id: "498", name: "晋善晋美" },
        { id: "502", name: "塞上风光" },
        { id: "503", name: "彩云之南" },
        { id: "504", name: "荆楚纵横" },
        { id: "505", name: "邦锦梅朵" },
        { id: "506", name: "粤来客栈" },
        { id: "507", name: "鼎豫中原" },
        { id: "511", name: "丝路花雨" },
        { id: "550", name: "皇城根儿" },
        { id: "596", name: "八桂飘香" },
        { id: "625", name: "黔山秀水" },
        { id: "642", name: "椰风海韵" },
        { id: "328", name: "网上冲浪" },
        { id: "329", name: "编程答疑" },
        { id: "346", name: "flash版" },
        { id: "394", name: "游戏编程" },
        { id: "499", name: "多媒体技术" },
        { id: "538", name: "Mac(苹果)专区" },
        { id: "591", name: ".NET 美学" },
        { id: "597", name: "脚本语言" },
        { id: "598", name: "iOS" },
        { id: "621", name: "魅族 Meizu" },
        { id: "622", name: "Android" },
        { id: "711", name: "Windows Phone" },
        { id: "91", name: "游戏广场" },
        { id: "274", name: "游戏广场区事务版" },
        { id: "296", name: "暴雪游戏" },
        { id: "30", name: "动漫讨论" },
        { id: "139", name: "恋声症候群" },
        { id: "191", name: "动漫资源" },
        { id: "223", name: "空蝉之恋" },
        { id: "239", name: "贴图工坊" },
        { id: "275", name: "动漫天地区事务版" },
        { id: "327", name: "动漫文区" },
        { id: "376", name: "ACG音乐区" },
        { id: "455", name: "周边百老汇" },
        { id: "245", name: "技术组工作室" },
        { id: "249", name: "编辑部工作室" },
        { id: "286", name: "坛庆策划" },
        { id: "605", name: "策划部工作室" },
        { id: "606", name: "体育部工作室" },
        { id: "607", name: "部长联席会议" },
        { id: "610", name: "意见与建议" },
        { id: "611", name: "通知通告" },
        { id: "613", name: "招贤纳士" },
        { id: "620", name: "赞助合作" },
        { id: "747", name: "Banner申请" },
        { id: "753", name: "CC98协会" },
        { id: "17", name: "论坛事务" },
        { id: "38", name: "站规修订" },
        { id: "40", name: "站务讨论" },
        { id: "116", name: "test" },
        { id: "136", name: "98博物馆" },
        { id: "184", name: "论坛帮助" },
        { id: "221", name: "版主会议厅" },
        { id: "267", name: "社科学术区事务版" },
        { id: "326", name: "集思广益" },
        { id: "400", name: "废弃版块" },
        { id: "404", name: "98足迹" },
        { id: "433", name: "网络安全" },
        { id: "614", name: "莫失莫忘" }
    ];
    let boardResult = [];
    //看是否包含
    for (let i in boardInfo) {
        if (boardInfo[i].name.indexOf(boardName) > -1) {
            boardResult.push({ id: boardInfo[i].id, name: boardInfo[i].name });
        }
    }
    return boardResult;
}
export function isFollowThisBoard(boardId) {
    if (!getLocalStorage("userInfo")) return false;
    const customBoards = getLocalStorage("userInfo").customBoards;
    for (let item of customBoards) {
        console.log(item);
        if (item == boardId) {
            console.log("版面匹配成功");
            return true;
        }
    }
    return false;
}

export async function followBoard(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/custom-board/${boardId}`;
    const response = await cc98Fetch(url, { method: "PUT", headers });
    refreshUserInfo();
    removeStorage("focusBoardList");
}
export async function refreshUserInfo() {

    let userName = getLocalStorage("userName");

    if (!userName) {

        let userInfo = getLocalStorage("userInfo");

        userName = userInfo.name;

    }

    const headers = await formAuthorizeHeader();

    let response = await cc98Fetch(`/user/name/${userName}`, {

        headers: headers

    });

    let userInfo = await response.json();
    store.dispatch(changeUserInfo(userInfo));
    setLocalStorage("userInfo", userInfo);
    setLocalStorage("userName", userInfo.name);
}
export async function unfollowBoard(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/custom-board/${boardId}`;
    const response = await cc98Fetch(url, { method: "DELETE", headers });
    refreshUserInfo();
    removeStorage("focusBoardList");
}
//获取系统通知
export async function getMessageSystem(from: number, size: number, router) {
    try {
        const myHeaders = await formAuthorizeHeader();
        let response = await cc98Fetch(`/notification/system?from=${from}&size=${size}`, { headers: myHeaders });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        let newTopic = await response.json();

        for (let i in newTopic) {
            if (newTopic[i].postId) {
                let response0 = await cc98Fetch(`/post/${newTopic[i].postId}/basic`, { headers: myHeaders });
                let response1 = await response0.json();
                newTopic[i].floor = response1.floor;
            }
            else {
                newTopic[i].floor = 0;
            }
        }
        return newTopic;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

//获取回复我的通知
export async function getMessageResponse(from: number, size: number, router) {
    try {
        let result = [];
        const myHeaders = await formAuthorizeHeader();
        console.log("from: number, size: number, router", from);
        let response = await cc98Fetch(`/notification/reply?from=${from}&size=${size}`, { headers: myHeaders });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        let newTopic = await response.json();
        //补充帖子标题，版面id和版面名称信息
        if (newTopic) {
            for (let i in newTopic) {
                let response0 = await cc98Fetch(`/topic/${newTopic[i].topicId}`, { headers: myHeaders });
                if (response0.status === 401) {
                    ////window.location.href = "/status/UnauthorizedTopic";
                }
                else if (response0.status === 500) {
                    ////window.location.href = "/status/ServerError";
                }
                else if (response0.status === 404) {
                    ////window.location.href = "/status/ServerError";
                }
                else {
                    let response1 = await response0.json();
                    newTopic[i].topicTitle = response1.title;
                    newTopic[i].boardId = response1.boardId;
                    newTopic[i].boardName = await getBoardName(response1.boardId);
                    if (newTopic[i].postId) {
                        let response2 = await cc98Fetch(`/post/${newTopic[i].postId}/basic`, { headers: myHeaders });
                        let response3 = await response2.json();
                        newTopic[i].floor = response3.floor;
                        newTopic[i].userId = response3.userId;
                        newTopic[i].userName = response3.userName;
                        result.push(newTopic[i]);
                    }
                }
            }
        }
        return result;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}

//获取@我的通知
export async function getMessageAttme(from: number, size: number, router) {
    try {
        let result = [];
        let token = await getToken();
        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);
        let response = await cc98Fetch(`/notification/at?from=${from}&size=${size}`, { headers: myHeaders });
        if (response.status === 401) {
            //window.location.href = "/status/UnauthorizedTopic";
        }
        if (response.status === 500) {
            //window.location.href = "/status/ServerError";
        }
        let newTopic = await response.json();
        //补充帖子标题，版面id和版面名称信息
        if (newTopic) {
            for (let i in newTopic) {
                let response0 = await cc98Fetch(`/topic/${newTopic[i].topicId}`, { headers: myHeaders });
                if (response0.status === 401) {
                    ////window.location.href = "/status/UnauthorizedTopic";
                }
                if (response0.status === 500) {
                    ////window.location.href = "/status/ServerError";
                }
                if (response0.status === 404) {
                    ////window.location.href = "/status/ServerError";
                }
                else {
                    let response1 = await response0.json();
                    newTopic[i].topicTitle = response1.title;
                    newTopic[i].boardId = response1.boardId;
                    newTopic[i].boardName = await getBoardName(response1.boardId);
                    if (!newTopic[i].postId) {
                        newTopic[i].floor = 1;
                        newTopic[i].userId = response1.userId;
                        newTopic[i].userName = response1.userName;
                    }
                    else {
                        let response2 = await cc98Fetch(`/post/${newTopic[i].postId}/basic`, { headers: myHeaders });
                        let response3 = await response2.json();
                        newTopic[i].floor = response3.floor;
                        newTopic[i].userId = response3.userId;
                        newTopic[i].userName = response3.userName;
                    }
                    result.push(newTopic[i]);
                }
            }
        }
        return result;
    } catch (e) {
        ////window.location.href = "/status/Disconnected";
    }
}
export async function plus1(topicId, postId, reason) {
    const url = `/post/${postId}/rating`;
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const bodyinfo = { value: 1, reason: reason };
    const body = JSON.stringify(bodyinfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return 'ok'
}
export async function minus1(topicId, postId, reason) {
    const url = `/post/${postId}/rating`;
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const bodyinfo = { value: -1, reason: reason };
    const body = JSON.stringify(bodyinfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return 'ok'
}
export async function addPrestige(postId, value, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const bodyinfo = { operationType: 0, prestige: value, reason: reason };
    const url = `/post/${postId}/operation`;
    const body = JSON.stringify(bodyinfo);
    if (value) {
        const response = await cc98Fetch(url, { method: "POST", headers, body });
        switch (response.status) {
            case 400:
                return 'wrong input';
            case 401:
                return 'unauthorized';
            case 404:
                return 'not found';
            case 500:
                return 'server error';
        }
    }
    return 'ok';
}
export async function deductPrestige(postId, value, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const bodyinfo = { operationType: 1, prestige: value, reason: reason };
    const url = `/post/${postId}/operation`;
    const body = JSON.stringify(bodyinfo);
    if (value) {
        const response = await cc98Fetch(url, { method: "POST", headers, body });
        switch (response.status) {
            case 400:
                return 'wrong input';
            case 401:
                return 'unauthorized';
            case 404:
                return 'not found';
            case 500:
                return 'server error';
        }
    }
    return 'ok';
}
export async function deletePost(topicId, postId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", 'application/json');
    const bodyinfo = { reason: reason };
    const url = `/post?topicid=${topicId}&postid=${postId}`;
    const response = await cc98Fetch(url, { method: "DELETE", headers, body: JSON.stringify(bodyinfo) });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return 'ok';
}
export async function stopBoardPost(postId, reason, days) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", 'application/json');
    const bodyinfo = { operationType: 1, reason: reason, stopPostDays: days };
    const url = `/post/${postId}/operation`;
    const response = await cc98Fetch(url, { method: "POST", headers, body: JSON.stringify(bodyinfo) });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return 'ok';
}
export async function cancelStopBoardPost(userId, boardId) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", 'application/json');
    const url = `/manage/punishment/cancelstopboardpost?userid=${userId}$boardid=${boardId}`;
    const response = await cc98Fetch(url, { method: "PUT", headers });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function addBoardTopTopic(topicId, boardId, topState, days, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const content = { 'topState': topState, 'duration': days, 'reason': reason };
    const response = await cc98Fetch(

        `/topic/${topicId}/top`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(content)
        }
    );
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function removeBoardTopTopic(topicId, boardId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const content = reason;
    const response = await cc98Fetch(

        `/topic/${topicId}/top`,
        {
            method: "DELETE",
            headers,
            body: JSON.stringify(content)
        }
    );
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
//获取特定类型的消息的总数，1为回复消息，2为@消息，3为系统消息

export async function getTotalPage(type: number) {
    const headers = await formAuthorizeHeader();

    let response = await cc98Fetch("/me/all-message-count", { headers });

    let totalPage = await response.json();

    switch (type) {

        case 1:

            return totalPage.replyCount;

        case 2:

            return totalPage.atCount;

        case 3:

            return totalPage.systemCount;

        default:

            break;

    }

}
export async function deleteTopic(topicId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "DELETE", headers, body }); switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function lockTopic(topicId, boardId, reason, days) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/lock`;
    const bodyInfo = { 'reason': reason, 'value': days };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function unLockTopic(topicId, boardId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/lock`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "DELETE", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function setBestTopic(topicId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/best`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function cancelBestTopic(topicId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/best`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "DELETE", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function setDisableHot(topicId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/not-hot`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function cancelDisableHot(topicId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/not-hot`;
    const bodyInfo = { 'reason': reason };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "DELETE", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}

//自动识别内容中的链接并添加ubb代码
export function autoAddUrl(v: string) {
    let flag = /(http|ftp|https)/g;
    let arr = v.match(flag);
    if (arr) {
        let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;
        let abb = v.match(reg);
        let result = v.replace(reg, `[url=${abb}][color=blue]${abb}[/color][/url]`).replace(/\n/g, "<br />");
        return result;
    }
    else {
        let reg = /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;
        let abb = v.match(reg);
        console.log(abb);
        let result = v.replace(reg, `[url="http://${abb}"][color=blue]${abb}[/color][/url]`).replace(/\n/g, "<br />");
        return result;
    }
}
export async function getToken() {
    if (getLocalStorage("userName") && getLocalStorage("password")) {
        if (!getLocalStorage("accessToken")) {
            let url = 'https://openid.cc98.org/connect/token';
            const requestBody = {
                'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
                'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
                'grant_type': 'password',
                'username': getLocalStorage("userName"),
                'password': getLocalStorage("password"),
                'scope': "cc98-api openid"
            }
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: $.param(requestBody)

            });
            const data = await response.json();
            const token = "Bearer " + encodeURIComponent(data.access_token);
            setLocalStorage("accessToken", token, data.expires_in);
        }
        return getLocalStorage("accessToken");
    } else {
        return null;
    }
}
export async function formAuthorizeHeader() {
    const token = await getToken();
    const headers = new Headers();
    headers.append("Authorization", token);
    return headers;
}
export async function signin(content) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/me/signin`;
    const response = await cc98Fetch(url, { method: "POST", headers, body: content });
}
export async function getSigninInfo() {
    const headers = await formAuthorizeHeader();
    const url = `/me/signin`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}
export async function getGlobalConfig() {
    const headers = await formAuthorizeHeader();
    const url = `/config/global`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}
export async function getTopicInfo(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/topic/${topicId}`;
    const response = await cc98Fetch(url, { headers });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }

    const data = await response.json();
    return data;
}
export async function getBoardInfo(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/board/${boardId}`;
    const response = await cc98Fetch(url, { headers });
    switch (response.status) {
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    const data = await response.json();
    console.log(data);
    if (data.canEntry === false) {

        return 'unauthorized';
    }
    return data;
}
export function getTotalPageof10(replyCount) {
    if (replyCount >= 10) {
        return (replyCount - replyCount % 10) / 10 + 1;
    } else {
        return 1;
    }
}
export async function getUserInfo(userId) {
    const key = `userId_${userId}`;
    if (getLocalStorage(key)) return getLocalStorage(key);
    const headers = await formAuthorizeHeader();
    const url = `/user/${userId}`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    const key1 = `userName_${data.name}`;
    setLocalStorage(key, data, 3600);
    setLocalStorage(key1, data, 3600);
    return data;
}
export async function getUserInfoByName(userName) {
    const key = `userName_${userName}`;
    if (getLocalStorage(key)) return getLocalStorage(key);
    const headers = await formAuthorizeHeader();
    const url = `/user/name/${userName}`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    const key1 = `userId_${data.id}`;
    setLocalStorage(key, data, 3600);
    setLocalStorage(key1, data, 3600);
    return data;
}
export function isMaster(masters) {
    if (getLocalStorage("userInfo")) {
        const privilege = getLocalStorage("userInfo").privilege;
        const myName = getLocalStorage("userInfo").name;
        const myId = getLocalStorage("userInfo").id;

        if (privilege === '管理员' || privilege === '超级版主') {
            return true;

        }

        if (masters) {
            for (let i = 0; i < masters.length; i++) {
                if (myName === masters[i]) {
                    return true;
                }
            }
        }
    }
}
export async function getBoardTag(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/board/${boardId}/tag`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}
export async function setHighlight(topicId, isBold, isItalic, color, duration, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/highlight`;
    const bodyInfo = {
         isBold: isBold, isItalic: isItalic, color: color, duration: duration, reason: reason 
    };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    switch (response.status) {
        case 401:
            return 'unauthorized';
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }
    return await response.json();
}
export async function setFavoriteTopic(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/favorite/${topicId}`;
    const reponse = await cc98Fetch(url, { method: "PUT", headers });
}
export async function deleteFavoriteTopic(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/favorite/${topicId}`;
    const reponse = await cc98Fetch(url, { method: "DELETE", headers });
}
export async function getFavState(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/topic/${topicId}/isfavorite`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}

//更新未读消息数量
export async function refreshUnReadCount() {
    const headers = await formAuthorizeHeader();
    const url = `/me/unread-count`;
    const response = await cc98Fetch(url, { headers });
    let unreadCount = await response.json();
    unreadCount.totalCount = unreadCount.systemCount + unreadCount.atCount + unreadCount.replyCount + unreadCount.messageCount;   
    if (unreadCount.totalCount > 0) {
        $('#unreadCount-totalCount').removeClass('displaynone');
        $('#unreadCount-totalCount1').removeClass('displaynone');
    }
    else {
        $('#unreadCount-totalCount').addClass('displaynone');
        $('#unreadCount-totalCount1').addClass('displaynone');
    }
    if (unreadCount.replyCount > 0) {
        $('#unreadCount-replyCount').removeClass('displaynone');
        $('#unreadCount-replyCount1').removeClass('displaynone');
    }
    else {
        $('#unreadCount-replyCount').addClass('displaynone');
        $('#unreadCount-replyCount1').addClass('displaynone');
    }
    if (unreadCount.atCount > 0) {
        $('#unreadCount-atCount').removeClass('displaynone');
        $('#unreadCount-atCount1').removeClass('displaynone');
    }
    else {
        $('#unreadCount-atCount').addClass('displaynone');
        $('#unreadCount-atCount1').addClass('displaynone');
    }
    if (unreadCount.systemCount > 0) {
        $('#unreadCount-systemCount').removeClass('displaynone');
        $('#unreadCount-systemCount1').removeClass('displaynone');
    }
    else {
        $('#unreadCount-systemCount').addClass('displaynone');
        $('#unreadCount-systemCount1').addClass('displaynone');
    }
    if (unreadCount.messageCount > 0) {
        $('#unreadCount-messageCount').removeClass('displaynone');
        $('#unreadCount-messageCount1').removeClass('displaynone');
    }
    else {
        $('#unreadCount-messageCount').addClass('displaynone');
        $('#unreadCount-messageCount1').addClass('displaynone');
    }
    setStorage("unreadCount", unreadCount);
    return unreadCount;
}
export async function editPost(postId, contentType, title, content) {
    const headers = await formAuthorizeHeader();
    const url = `/post/${postId}`;
    const bodyInfo = { content: content, title: title, contentType: contentType };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
}
export async function cc98Fetch(url, init?: RequestInit) {
    /*const response1 = await fetch("/config.production.json");
    let data;
    if (response1.status !== 404) {
        const data1 = await response1.json();
        const response2 = await fetch("/config.json");
        const data2 = await response2.json();
        data = { ...data2, ...data1 };
    } else {
        const response2 = await fetch("/config.json");
        data = await response2.json();
    }
    const baseUrl = data.apiUrl;
    console.log("base");
    console.log(baseUrl);*/
    const baseUrl = 'http://apitest.niconi.cc';
    const _url = `${baseUrl}${url}`;
    let response;
    if (init) {
        response = await fetch(_url, init);
    } else {
        response = await fetch(_url);
    }
    return response;
}
export function getApiUrl() {
    return 'http://apitest.niconi.cc';
}
export async function getTagInfo() {
    if (getLocalStorage("tagInfo")) {
        return getLocalStorage("tagInfo");
    } else {
        const url = `/config/global/alltag`;
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(url, { headers });
        const data = await response.json();
        setLocalStorage("tagInfo", data);
        return data;
    }
}
export async function getTagIdbyName(name) {
    const tagInfo = await getTagInfo();
    for (let item of tagInfo) {
        if (item.name === name) return item.id;
    }
    return false;
}
export async function getTagNamebyId(id) {
    const tagInfo = await getTagInfo();
    for (let item of tagInfo) {
        if (item.id === id) return item.name;
    }
    return false;
}
export async function getTopicByOneTag(tagId, boardId, page) {
    const start = (page - 1) * 10 ;
    const url = `/topic/search/board/${boardId}/tag?tag1=${tagId}&from=${start}&size=20`;
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    return await response.json();
}
export async function updateUserInfo(id) {
    const key = `userId_${id}`;
    const userInfo = await getUserInfo(id);
    const name = userInfo.name;
    const key1 = `userName_${name}`;
    removeLocalStorage(key);
    removeLocalStorage(key1);
    await getUserInfo(id);
}