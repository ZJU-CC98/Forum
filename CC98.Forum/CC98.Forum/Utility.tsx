import * as Prop from './Props/AppProps'
import * as State from './States/AppState'
import store, { Actions } from './Store';
import * as UserCenterActions from './Actions/UserCenter';
import * as ErrorActions from './Actions/Error';
import { TopicTitleAndContent } from './Components/Board/Board'
import { Constants } from './Components/Constant';
import { removeUserInfo as removeUserInfoInIndexDB } from './IndexedDB/UserStorage';


// lib

import * as React from 'react';
import * as $ from 'jquery';

import * as moment from 'moment';


// -------- TBC --------

import {
    setStorage,
    getStorage,
    removeStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
} from './Utility/storageUtility'

import {
    getToken,
    formAuthorizeHeader,
    cc98Fetch
} from './Utility/fetchUtility'


// 获取用户信息相关的代码均已重构
import { getUserInfo } from './Utility/Fetch/getUserInfo';
import { getUserInfo as getUserInfoByName } from './Utility/Fetch/getUserInfo';
import { getUsersInfo } from './Utility/Fetch/getUsersInfo';
export { getUserInfo } from './Utility/Fetch/getUserInfo';
export { getUserInfo as getUserInfoByName } from './Utility/Fetch/getUserInfo';
export { getUsersInfo } from './Utility/Fetch/getUsersInfo';
export { getUsersInfo as getUsersInfobyNames } from './Utility/Fetch/getUsersInfo';

// re export
export * from './Utility/storageUtility'
export * from './Utility/fetchUtility'


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
        for (let i = 0; i < data.length; i++) {
            boardtopics[i] = {
                ...data[i], replyCount: data[i].replyCount || 0
            }
        }

        return boardtopics;


    } catch (e) {
        console.error(e);
        //store.dispatch(ErrorActions.throwError('Disconnected'));
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
        if (data[0].isAnonymous != true) {

            const userMesJson = await getUserInfo(data[0].userId);
            topicMessage = { ...data[0], userInfo: userMesJson, postId: data[0].id }
        } else {
            const anonymousUserName = `匿名${data[0].userName.toUpperCase()}`;
            let purl = '/static/images/心灵头像.gif';
            const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: "", postCount: 0 };
            topicMessage = { ...data[0], userInfo: userMesJson, postId: data[0].id }

        }

        return topicMessage;


    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export function getThisUserInfo(userId, usersInfo) {
    for (let i in usersInfo) {
        if (usersInfo[i]) {
            if (usersInfo[i].id === userId) {
                return usersInfo[i];
            }
        }
    }
    //查询失败
    let indexData = {

        id: userId, name: "ID不存在", portraitUrl: "/static/images/default_avatar_boy.png", birthday: "1993-03-25T00:00:00", fanCount: 0, followCount: 0, gender: 0, lastLogOnTime: "2007-12-26T02:26:00", popularity: 0, prestige: 0, signatureCode: '此ID已不存在，qmd无法显示'

    };
    return indexData;
}
export function getThisUserInfobyName(userName, usersName) {
    for (let i in usersName) {
        if (usersName[i].name === userName)
            return usersName[i];
    }
    //查询失败
    let indexData = {

        id: null, name: "ID不存在", portraitUrl: "/static/images/default_avatar_boy.png", birthday: "1993-03-25T00:00:00", fanCount: 0, followCount: 0, gender: 0, lastLogOnTime: "2007-12-26T02:26:00", popularity: 0, prestige: 0, signatureCode: '此ID已不存在，qmd无法显示'

    };
    return indexData;
}
export async function getTopicContent(topicid: number, curPage: number) {
    try {
        const startPage = (curPage - 1) * 10;
        const headers = await formAuthorizeHeader();
        const topic = await cc98Fetch(`/Topic/${topicid}/post?from=${startPage}&size=10`, { headers });
        const content = await topic.json();
        const post = [];
        let topicNumberInPage = content.length;
        //收集id
        const usersId = [];
        let usersInfo = [];
        if (content.length === 0) return [];
        for (let j = 0; j < topicNumberInPage; j++) {
            if (content[j].isAnonymous == false) {
                for (let i in content) {
                    usersId[i] = content[i].userId;
                }
                usersInfo = await getUsersInfo(usersId);
            }
        }
        for (let i = 0; i < topicNumberInPage; i++) {

            if (content[i].isAnonymous != true && content[i].isDeleted != true) {
                let thisUserInfo = getThisUserInfo(content[i].userId, usersInfo);
                post[i] = {
                    ...content[i], userInfo: thisUserInfo, postId: content[i].id
                }

            } else if (content[i].isAnonymous && !content[i].isDeleted) {
                let purl = '/static/images/心灵头像.gif';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;

                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {

                    ...content[i], userInfo: userMesJson, postId: content[i].id, isAnonymous: true
                }
            } else {
                const userMesJson = { name: '98Deleter', portraitUrl: '/static/images/deleter2.png', id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id, isAnonymous: false, isDeleted: true, content: "该贴已被my cc98, my home"
                }
            }
        }

        return post;

    } catch (e) {
        console.error(e);
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function like(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();
        headers.append("Content-Type", "application/json");
        const content = "1";
        const response = await cc98Fetch(`/post/${postid}/like`, { method: "PUT", headers, body: content });
        if (response.status === 401) {
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }
        if (response.status === 403) {
            // store.dispatch(ErrorActions.throwError('OperationForbidden'));
            return
        }
        if (response.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (response.status === 500) {
            store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const data = await response.json();
        return data;

    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function dislike(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();
        headers.append("Content-Type", "application/json");
        const content: string = "2";
        const response = await cc98Fetch(`/post/${postid}/like`, { method: "PUT", headers, body: content });
        if (response.status === 401) {
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }

        if (response.status === 403) {
            // store.dispatch(ErrorActions.throwError('OperationForbidden'));
            return
        }
        if (response.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (response.status === 500) {
            store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const data = await response.json();
        return data;

    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getLikeStateAndCount(topicid, postid, router) {
    try {
        const headers = await formAuthorizeHeader();

        const response = await cc98Fetch(`/post/${postid}/like`, { headers });
        if (response.status === 401) {
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }

        if (response.status === 403) {
            store.dispatch(ErrorActions.throwError('OperationForbidden'));
        }
        if (response.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (response.status === 500) {
            store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const data = await response.json();
        return data;

    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
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

            if (content[i].isAnonymous != true) {

                const userMesResponse = await cc98Fetch(`/user/name/${encodeURIComponent(content[i].userName)}`);
                const userMesJson = await userMesResponse.json();
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id
                }

            } else {

                let purl = '/static/images/心灵头像.gif';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;
                let anonymousLastReplierName = null;
                if (content[i].lastUpdateAuthor)
                    anonymousLastReplierName = `匿名${content[i].lastUpdateAuthor.toUpperCase()}`;
                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id
                }

            }
        }
        return post;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}


export function convertHotTopic(item: State.TopicTitleAndContentState) {
    return <TopicTitleAndContent key={item.id} {...item} />
        ;
}
export async function getCurUserTopic(topicid: number, userId: number) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/topic/user?topicid=${topicid}&userid=${userId}&from=0&size=1`, { headers });
        const data = await response.json();
        const userMesResponse = await cc98Fetch(`/user/name/${encodeURIComponent(data[0].userName)}`);
        const userMesJson = await userMesResponse.json();
        data[0].userInfo = userMesJson;
        return data[0];
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getCurUserTopicContent(topicid: number, curPage: number, userId: number) {
    try {
        const topicMessage = await getTopic(topicid);
        let start: number;
        let isUserPoster: boolean;
        start = (curPage - 1) * 10;


        const token = await getToken();
        const headers = new Headers();
        headers.append('Authorization', token);
        const topic = await cc98Fetch(`/Post/topic/user?topicid=${topicid}&userId=${userId}&from=${start}&size=10`, { headers });
        const content = await topic.json();

        let post = [];
        let topicNumberInPage: number = content.length;
        const replyCount = content[0].count;
        const userMesJson = await getUserInfo(content[0].userId);
        for (let i = 0; i < topicNumberInPage; i++) {
            if (content[i].isAnonymous != true) {
                post[i] = {
                    ...content[i], userInfo: userMesJson, postId: content[i].id
                }
            } else {
                let purl = '/static/images/_心灵之约.png';
                const anonymousUserName = `匿名${content[i].userName.toUpperCase()}`;
                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0 };
                post[i] = {
                    ...content[i], userInfo: userMesJson
                }
            }
        }
        return post;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}

/**
 * 获取全站新帖
 * @param curPage
 */
export async function getAllNewTopic(from: number, router) {
    //如果未登录,直接跳转至登录页面
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    try {
        /**
         * 一次性可以获取20个主题
         */
        var size = 20;
        if (from > 180) {
            size = 200 - from;
        }
        const headers = await formAuthorizeHeader();
        /**
         * 通过api获取到主题之后转成json格式
         */
        const response = await cc98Fetch(`/topic/new?from=${from}&size=${size}`, { headers });
        switch (response.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
            case 404:
            //store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            case 500:
            //store.dispatch(ErrorActions.throwError('ServerError'));
        }
        let newTopic = await response.json();
        //console.log("获取到的数据", newTopic);
        let aTopic = [];
        let aTopicId = [];
        let bTopic = [];
        for (let item of newTopic) {
            //时间转换
            item.time = transerRecentTime(item.time);
            item.lastPostTime = transerRecentTime(item.lastPostTime);

            //阅读数转换
            if (item.hitCount > 10000) {
                if (item.hitCount > 100000) {
                    let index = parseInt(`${item.hitCount / 10000}`);
                    item.hitCount = `${index}万`;
                }
                else {
                    let index = parseInt(`${item.hitCount / 1000}`) / 10;
                    item.hitCount = `${index}万`;
                }
            }
            //计算总楼层
            item.floorCount = item.replyCount + 1;
            //回复数转换
            if (item.replyCount > 10000) {
                if (item.replyCount > 100000) {
                    let index = parseInt(`${item.replyCount / 10000}`);
                    item.replyCount = `${index}万`;
                }
                else {
                    let index = parseInt(`${item.replyCount / 1000}`) / 10;
                    item.replyCount = `${index}万`;
                }
            }
            //标签转换
            if (item.tag1) {
                item.tag1 = await getTagNamebyId(item.tag1);
                if (item.tag2) {
                    item.tag2 = await getTagNamebyId(item.tag2);
                }
            }
            //处理匿名与非匿名主题，非匿名主题用户批量获取信息
            if(!item.isAnonymous){
                //获取所在版面名称
                item.boardName = await getBoardName(item.boardId);
                aTopic.push(item);
                aTopicId.push(item.userId);
            }
            else {
                item.portraitUrl = '/static/images/_心灵之约.png';
                item.userName = "匿名用户";
                item.boardName = await getBoardName(item.boardId);
                bTopic.push(item);
            }
        }
        //对于非匿名数据批量获取头像地址
        let usersInfo = await getBasicUsersInfo(aTopicId);
        for (let i in aTopic) {
            let thisUserInfo = getThisUserInfo(aTopic[i].userId, usersInfo);
            aTopic[i].portraitUrl = thisUserInfo.portraitUrl;
        };
        for (let i = 0, j = 0, k = 0; i < newTopic.length; i++) {
            //console.log(`进入循环`);
            if (j === aTopic.length) {
                newTopic[i] = bTopic[k];
                k++;
            }
            else if (newTopic[i].id === aTopic[j].id) {
                //console.log(`条件1 i=${i} j = ${j}`);
                newTopic[i] = aTopic[j];
                j++;
            }
            else {
                //console.log(`条件2 i=${i} k = ${k}`);
                newTopic[i] = bTopic[k];
                k++;
            }
        }
        //console.log("这里会执行吗");
        return newTopic;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}

/**
 * 获取关注帖子,borderId == -2 为收藏的帖子，boardId == -1为关注用户帖子, boardId === 0 为全部关注版面帖子, boardId > 0则为对应版面帖子
 * @param curPage
 */
export async function getFocusTopic(boardId: number, boardName: string, from: number, router) {
    //如果未登录,直接跳转至登录页面
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    try {
        /**
         * 一次性可以获取20个主题
         */
        var size = 20;
        if (from > 180) {
            size = 200 - from;
        }
        const headers = await formAuthorizeHeader();
        /**
         * 通过api获取到主题之后转成json格式
         */
        let response;
        if (boardId === -1) {
            response = await cc98Fetch(`/me/followee/topic?from=${from}&size=${size}`, { headers });
        }
        else if (boardId === 0) {
            response = await cc98Fetch(`/me/custom-board/topic?from=${from}&size=${size}`, { headers });
        }
        else if (boardId === -2){
            response = await cc98Fetch(`/topic/me/favorite?from=${from}&size=${size}&order=1`, { headers });
        }
        else {
            response = await cc98Fetch(`/board/${boardId}/topic?from=${from}&size=${size}`, { headers });
        }
        switch (response.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
            case 404:
            //store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            case 500:
            //store.dispatch(ErrorActions.throwError('ServerError'));
        }
        let newTopic = await response.json();
        let aTopic = [];
        let aTopicId = [];
        let bTopic = [];
        for (let item of newTopic) {
            //时间转换
            item.time = transerRecentTime(item.time);
            item.lastPostTime = transerRecentTime(item.lastPostTime);

            //阅读数转换
            if (item.hitCount > 10000) {
                if (item.hitCount > 100000) {
                    let index = parseInt(`${item.hitCount / 10000}`);
                    item.hitCount = `${index}万`;
                }
                else {
                    let index = parseInt(`${item.hitCount / 1000}`) / 10;
                    item.hitCount = `${index}万`;
                }
            }
            //计算总楼层
            item.floorCount = item.replyCount + 1;
            //回复数转换
            if (item.replyCount > 10000) {
                if (item.replyCount > 100000) {
                    let index = parseInt(`${item.replyCount / 10000}`);
                    item.replyCount = `${index}万`;
                }
                else {
                    let index = parseInt(`${item.replyCount / 1000}`) / 10;
                    item.replyCount = `${index}万`;
                }
            }
            //标签转换
            if (item.tag1) {
                item.tag1 = await getTagNamebyId(item.tag1);
                if (item.tag2) {
                    item.tag2 = await getTagNamebyId(item.tag2);
                }
            }
            //处理匿名与非匿名主题，非匿名主题批量获取信息
            if (!item.isAnonymous) {
                //获取所在版面名称
                item.boardName = await getBoardName(item.boardId);
                aTopic.push(item);
                aTopicId.push(item.userId);
            }
            else {
                item.portraitUrl = '/static/images/_心灵之约.png';
                item.userName = "匿名用户";
                item.boardName = await getBoardName(item.boardId);
                bTopic.push(item);
            }
        }
        //对于非匿名数据批量获取头像地址
        let usersInfo = await getBasicUsersInfo(aTopicId);
        for (let i in aTopic) {
            let thisUserInfo = getThisUserInfo(aTopic[i].userId, usersInfo);
            aTopic[i].portraitUrl = thisUserInfo.portraitUrl;
        };
        for (var i = 0, j = 0, k = 0; i < newTopic.length; i++) {
            if (j === aTopic.length) {
                newTopic[i] = bTopic[k];
                k++;
            }
            else if (newTopic[i].id === aTopic[j].id) {
                newTopic[i] = aTopic[j];
                j++;
            }
            else {
                newTopic[i] = bTopic[k];
                k++;
            }
        }
        return newTopic;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}


/*
* 根据boardId返回boardName
*/

import { boardInfo } from './Utility/boardInfoJson'
import { UserInfo } from './States/AppState';

export function syncGetBoardNameById(boardId) {

    for (let item of boardInfo) {
        if (boardId === item.id) {
            return item.name;
        }
    }
    return '未知版面'
}
export async function getBoardName(boardId: number) {

    for (let item of boardInfo) {
        if (boardId === item.id) {
            return item.name;
        }
    }

    const token = await getToken();
    const headers = new Headers();
    headers.append('Authorization', token);
    const url = `/board/${boardId}`;
    try {
        let res = await cc98Fetch(url, { headers });
        let data = await res.json();
        let boardName = data.name;
        return boardName;
    } catch (e) {
        return "未知版面";
    }
}

/*
* 返回用户是否登陆
*/

export function isLogOn(): boolean {
    const token = getLocalStorage("refresh_token");
    const userInfo = getLocalStorage("userInfo");
    return !!(token && userInfo);
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentContact(from: number, size: number, router) {
    //如果未登录,直接跳转至登录页面
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    try {
        const headers = await formAuthorizeHeader();
        let response = await cc98Fetch(`/message/recent-contact-users?from=${from}&size=${size}`, { headers });
        if (response.status === 401) {
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }

        if (response.status === 403) {
            store.dispatch(ErrorActions.throwError('OperationForbidden'));
        }
        if (response.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (response.status === 500) {
            store.dispatch(ErrorActions.throwError('ServerError'));
        }
        let recentContactId = await response.json();
        //console.log("最近联系人列表id", recentContactId);
        let userId = [];
        for (let i in recentContactId) {
            userId[i] = recentContactId[i].userId;
        }

        let usersInfo = await getBasicUsersInfo(userId);
        let recentContact = [];
        for (let i in recentContactId) {
            recentContact.push(getThisUserInfo(recentContactId[i].userId, usersInfo));
        };

        for (let i in recentContactId) {
            recentContact[i].message = [];
            recentContact[i].lastContent = recentContactId[i].lastContent;
            recentContact[i].isRead = recentContactId[i].isRead;
        }
        //console.log("最近联系人列表", recentContact);

        return recentContact;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError(('Disconnected')));
    }
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentMessage(userId: number, from: number, size: number, router) {
    //如果未登录,直接跳转至登录页面
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    try {
        const headers = await formAuthorizeHeader();
        let response = await cc98Fetch(`/message/user/${userId}?from=${from}&size=${size}`, { headers });
        if (response.status === 401) {
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }

        if (response.status === 403) {
            store.dispatch(ErrorActions.throwError('OperationForbidden'));
        }
        if (response.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (response.status === 500) {
            //store.dispatch(ErrorActions.throwError('ServerError'));
        }
        let response1 = await response.json();
        let recentMessage = sortRecentMessage(response1);
        return recentMessage;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError(('Disconnected')));
    }
}

/**
 * 处理最新消息列表，时间间隔短的消息只显示第一条消息的时间
 * @param recentMessage
 */
export function sortRecentMessage(recentMessage) {

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

        return recentMessage;
    }
}

/**
 * api返回的UTC时间格式转换成时间戳的函数
 * @param time
 */
export function transerTime(time) {
    let time1 = moment(time).format('YYYY-MM-DD HH:mm:ss');
    let timestamp = new Date(time1.replace(/-/g, '/')).getTime();
    return timestamp;
}

/**
 * api返回的UTC时间格式转换成"1分钟前，昨天18：45"这样的形式
 * @param time
 */
export function transerRecentTime(time) {
    let time1 = moment(time).format('YYYY/MM/DD HH:mm:ss');
    let thatDate = new Date(time1);
    let thatTime = thatDate.getTime();
    let thisDate = new Date();
    let thisTime = new Date().getTime();
    let delta = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() + 86400000 - thatTime) / 1000;
    let month: any = thatDate.getMonth() + 1;
    if (month < 10) { month = `0${month}`; }
    let date: any = thatDate.getDate();
    if (date < 10) { date = `0${date}`; }
    let hours: any = thatDate.getHours();
    if (hours < 10) { hours = `0${hours}`; }
    let min: any = thatDate.getMinutes();
    if (min < 10) { min = `0${min}`; }
    let sec: any = thatDate.getSeconds();
    if (sec < 10) { sec = `0${sec}`; }
    if (delta > 259200) {
        let strTime = `${thatDate.getFullYear()}-${month}-${date} ${hours}:${min}:${sec}`;
        return strTime;
    }
    else if (delta > 172800) {
        let strTime = `${hours}:${min}:${sec}`;
        return `前天 ${strTime}`;
    }
    else if (delta > 86400) {
        let strTime = `${hours}:${min}:${sec}`;
        return `昨天 ${strTime}`;
    }
    else if (thisTime - thatTime > 3600000) {
        let strTime = `${hours}:${min}:${sec}`;
        return `今天 ${strTime}`;
    }
    else if (thisTime - thatTime > 0) {
        let min0: any = (thisTime - thatTime) / 60000;
        min = parseInt(min0);
        return `${min}分钟前`;
    }
    else {
        let strTime = `${thatDate.getFullYear()}-${month}-${date} ${hours}:${min}:${sec}`;
        return strTime;
    }
}

/**
 * 对联系人列表重新排序，看是否有从其他页面发起的聊天
 * @param recentContact
 */
export async function sortContactList(recentContact, router) {
    //看url中是否携带id信息，如果有的话就作为第一个联系人
    let urlId = location.href.match(/id=(\d+)/);
    if (urlId) {
        let chatManId = parseInt(urlId[1]);
        //如果联系人为空，则查找该联系人信息并作为联系人数组的元素
        if (!recentContact || recentContact.length === 0) {
            let response;
            let chatMan;
            let flag = 1;
            try {
                response = await cc98Fetch(`/user/basic/${chatManId}`);
                if (response.status === 404) {
                    store.dispatch(ErrorActions.throwError(('NotFoundUser')));
                }
                if (response.status === 500) {
                    store.dispatch(ErrorActions.throwError(('ServerError')));
                }
                chatMan = await response.json();
            }
            catch (e) {
                store.dispatch(ErrorActions.throwError(('Disconnected')));
                flag = 0;
            }
            if (flag === 1) {
                chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                if (chatMan.message) {
                    chatMan.lastContent = chatMan.message[0];
                }
                chatMan.isRead = true;
                recentContact = [chatMan];
            }
        }
        else {
            //先看一下该聊天对象在不在联系人列表里
            for (var i = 0; i < recentContact.length; i++) {
                if (recentContact[i].id == chatManId) {
                    break;
                }
            }
            //如果恰好是联系人列表第一那就什么都不做
            if (i == 0) { recentContact[0].isRead = true; }
            //如果在列表里但不是第一个，就把他提到第一个
            else if (i < recentContact.length) {
                let indexData = recentContact[i];
                indexData.isRead = true;
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
                    if (response.status === 401) {
                        store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                    }
                    if (response.status === 403) {
                        store.dispatch(ErrorActions.throwError('OperationForbidden'));
                    }
                    if (response.status === 404) {
                        store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                    }
                    if (response.status === 500) {
                        store.dispatch(ErrorActions.throwError('ServerError'));
                    }
                    chatMan = await response.json();
                }
                catch (e) {
                    store.dispatch(ErrorActions.throwError(('Disconnected')));
                    flag = 0;
                }
                if (flag === 1) {
                    chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                    if (chatMan.message) {
                        chatMan.lastContent = chatMan.message[0];
                    }
                    chatMan.isRead = true;
                    let chatContact = [chatMan];
                    recentContact = chatContact.concat(recentContact);
                }
            }
        }
    }
    else { //看url中是否携带name信息，如果有的话就作为第一个联系人
        let urlName = location.href.match(/name=(\S+)/);
        if (urlName) {
            console.log("联系人姓名", urlName[1]);
            let chatManName = urlName[1];
            //如果联系人为空，则查找该联系人信息并作为联系人数组的元素
            if (!recentContact || recentContact.length === 0) {
                console.log("如果联系人为空，则查找该联系人信息并作为联系人数组的元素");
                let response0;
                let response1;
                let flag = 1;
                try {
                    response0 = await cc98Fetch(`/user/name/${encodeURIComponent(chatManName)}`);
                    switch (response0.status) {
                        case 401:
                            store.dispatch(ErrorActions.throwError('LogOut'));;
                        case 403:
                            store.dispatch(ErrorActions.throwError('OperationForbidden'));
                        case 404:
                            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                        case 500:
                            store.dispatch(ErrorActions.throwError('ServerError'));
                    }
                    response1 = await response0.json();
                } catch (e) {
                    store.dispatch(ErrorActions.throwError(('Disconnected')));
                    flag = 0;
                }
                if (flag == 1) {
                    let chatMan = { id: response1.id, name: response1.name, portraitUrl: response1.portraitUrl, message: [], lastContent: '', isRead: true };
                    chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                    if (chatMan.message) {
                        chatMan.lastContent = chatMan.message[0];
                    }
                    recentContact = [chatMan];
                }
            }
            else {
                //先看一下该聊天对象在不在联系人列表里
                console.log("先看一下该聊天对象在不在联系人列表里");
                for (var i = 0; i < recentContact.length; i++) {
                    if (recentContact[i].name == chatManName) {
                        break;
                    }
                }
                //如果恰好是联系人列表第一那就什么都不做
                if (i == 0) { }
                //如果在列表里但不是第一个，就把他提到第一个
                else if (i < recentContact.length) {
                    console.log("如果在列表里但不是第一个，就把他提到第一个");
                    let indexData = recentContact[i];
                    recentContact.splice(i, 1);
                    recentContact.unshift(indexData);
                }
                //如果不在联系人列表里，那就查找该人信息并作为列表第一个
                else {
                    console.log("如果不在联系人列表里，那就查找该人信息并作为列表第一个");
                    let response0;
                    let response1;
                    let flag = 1;
                    try {
                        response0 = await cc98Fetch(`/user/name/${encodeURIComponent(chatManName)}`);
                        switch (response0.status) {
                            case 401:
                                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));;
                            case 403:
                                store.dispatch(ErrorActions.throwError('OperationForbidden'));
                            case 404:
                                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                            case 500:
                                store.dispatch(ErrorActions.throwError('ServerError'));
                        }
                        response1 = await response0.json();
                    } catch (e) {
                        store.dispatch(ErrorActions.throwError(('Disconnected')));
                        flag = 0;
                    }
                    if (flag == 1) {
                        let chatMan = { id: response1.id, name: response1.name, portraitUrl: response1.portraitUrl, message: [], lastContent: '', isRead: true };
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
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        }
        if (replyCountResponse.status === 404) {
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        }
        if (replyCountResponse.status === 500) {
            store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson.replyCount;
        if (replyCount >= 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
*/

export async function getUserDetails(userId) {
    try {
        const data = await getUserInfo(userId);
        const body = { portraitUrl: data.portraitUrl, userName: data.name, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing }
        return body;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getLikeState(topicid, router) {
    try {
        const headers = await formAuthorizeHeader();
        const topic = await getTopic(topicid);
        const postId = topic.postId;
        const response = await cc98Fetch(`/post/${postId}/like`, { headers });
        switch (response.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));;
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const data = await response.json();
        return data;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function refreshLikeState(topicId, postId) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/${postId}/like`, { headers });
        switch (response.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
        }
        const data = await response.json();
        return data;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function sendTopic(topicId, router) {
    try {
        const url = `/post/topic/${topicId}`;
        const c = Constants.testEditor.getMarkdown();
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
        switch (mes.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('LogOut'));
            case 402:
                store.dispatch(ErrorActions.throwError('ContentNeeded'));
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
        }
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}


export function getListTotalPage(totalTopicCount) {
    return (totalTopicCount - totalTopicCount % 20) / 20 + 1;
}
export async function getCurUserTotalReplyPage(topicId, userId) {
    try {
        const headers = await formAuthorizeHeader();
        const replyCountResponse = await cc98Fetch(`/post/topic/user?topicid=${topicId}&userid=${userId}&from=0&size=1`, { headers });
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson[0].count;
        return replyCount % 10 === 0 ? replyCount / 10 :
            (replyCount - replyCount % 10) / 10 + 1;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getTraceTopicsCount(topicId, postId) {
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/topic/specific-user?topicid=${topicId}&postid=${postId}&from=0&size=1`, { headers });
        const data = await response.json();
        return data[0].count % 10 === 0 ? data[0].count / 10 : (data[0].count - data[0].count % 10) / 10 + 1;

    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getTraceTopics(topicId, postId, page) {
    const start = (page - 1) * 10;
    try {
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/topic/specific-user?topicid=${topicId}&postid=${postId}&from=${start}&size=10`, { headers });
        const data = await response.json();
        if (data[0] && data[0].isAnonymous) {
            let purl = '/static/images/心灵头像.gif';
            for (let i in data) {
                const anonymousUserName = `匿名${data[i].userName.toUpperCase()}`;
                const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0, fanCount: 0 };
                data[i].userInfo = userMesJson;
                data[i].postId = postId
            }
        } else {
            const userMesJson = await getUserInfo(data[0].userId);
            for (let i in data) {
                data[i].userInfo = userMesJson
                data[i].postId = postId
            }

        }
        console.log(data)
        return data;

    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
    }
}
export async function getAnonymousTraceTopics(topicId, postId, page) {
    try {
        const start = (page - 1) * 10;
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(`/post/topic/anonymous/user?topicid=${topicId}&postid=${postId}&from=${start}&size=10`, { headers });
        const data = await response.json();
        let purl = '/static/images/心灵头像.gif';
        const anonymousUserName = `匿名${data[0].userName.toUpperCase()}`;
        const userMesJson = { name: anonymousUserName, portraitUrl: purl, id: null, privilege: '匿名用户', popularity: 0, signatureCode: null, postCount: 0, fanCount: 0 };
        for (let i in data) {
            data[i].userInfo = userMesJson;
        }
        return data;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
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
        store.dispatch(ErrorActions.throwError('LogOut'));
    }
    if (response.status === 500) {
        store.dispatch(ErrorActions.throwError('ServerError'));
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
 * 成功时isSuccess为true，content为返回的地址
 * 失败时isSuccess为false，content为错误原因
 * @param file
 */
export async function uploadFile(file: File) {
    try {
        // if (file.size > 5242880) {
        //     throw new Error('文件过大');
        // }
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
            content: e.message as string
        };
    }
}
export function clickUploadIcon() {

    $("#upload-files").click();
}

export async function uploadEvent(e) {
    localStorage.setItem("react-mde-imageurl-status", "pending");
    const files = e.target.files;
    const res = await uploadFile(files[0]);
    if (res.isSuccess) {
        const url = res.content;
        localStorage.setItem("react-mde-imageurl-status", "success");
        localStorage.setItem("react-mde-imageurl", url);
        return url;
    } else {
        localStorage.setItem("react-mde-imageurl-status", "fail");
        return "";
    }

    // const baseUrl = getApiUrl();
    // const str = `![](${url})`;
    // console.log("in func "+str);
    // return url;
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
            throw new Error(await res.text());
        }
    } catch (e) {
        return e.message;
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
            throw new Error(res.statusText);
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
    //如果未登录,直接跳转至登录页面
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    if (words) {
        const headers = await formAuthorizeHeader();
        let keyword = words[0];
        for (let i in words) {
            if (i != '0') {
                keyword = `${keyword} ${words[i]}`;
            }
        }
        let size = 20;
        let newTopic;
        if (boardId === 0) {
            try {
                const response = await cc98Fetch(`/topic/search?keyword=${encodeURIComponent(keyword)}&size=${size}&from=${from}`, {
                    headers: headers
                });
                switch (response.status) {
                    case 401:
                        store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                    case 403:
                        store.dispatch(ErrorActions.throwError('TooFrequentSearch'));
                    case 404:
                    //store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                    case 500:
                    //store.dispatch(ErrorActions.throwError('ServerError'));
                }
                newTopic = await response.json();
            }
            catch (e) {
                return -1;
            }
        }
        else {
            try {
                const response = await cc98Fetch(`/topic/search/board/${boardId}?keyword=${encodeURIComponent(keyword)}&size=${size}&from=${from}`, {
                    headers: headers
                });
                if (response.status === 401) {
                    store.dispatch(ErrorActions.throwError('LogOut'));
                }
                if (response.status === 403) {
                    store.dispatch(ErrorActions.throwError('OperationForbidden'));
                }
                if (response.status === 404) {
                    store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                }
                if (response.status === 500) {
                    store.dispatch(ErrorActions.throwError('ServerError'));
                }
                newTopic = await response.json();
            } catch (e) {
                return -1;
            }
        }
        //如果有搜索结果就处理一下
        if (newTopic && newTopic.length != 0) {
            let aTopic = [];
            let aTopicId = [];
            let bTopic = [];
            for (let item of newTopic) {
                //时间转换
                item.time = transerRecentTime(item.time);
                item.lastPostTime = transerRecentTime(item.lastPostTime);

                //阅读数转换
                if (item.hitCount > 10000) {
                    if (item.hitCount > 100000) {
                        let index = parseInt(`${item.hitCount / 10000}`);
                        item.hitCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${item.hitCount / 1000}`) / 10;
                        item.hitCount = `${index}万`;
                    }
                }
                //计算总楼层
                item.floorCount = item.replyCount + 1;
                //回复数转换
                if (item.replyCount > 10000) {
                    if (item.replyCount > 100000) {
                        let index = parseInt(`${item.replyCount / 10000}`);
                        item.replyCount = `${index}万`;
                    }
                    else {
                        let index = parseInt(`${item.replyCount / 1000}`) / 10;
                        item.replyCount = `${index}万`;
                    }
                }
                //标签转换
                if (item.tag1) {
                    item.tag1 = await getTagNamebyId(item.tag1);
                    if (item.tag2) {
                        item.tag2 = await getTagNamebyId(item.tag2);
                    }
                }
                //处理匿名与非匿名主题，非匿名主题用户批量获取信息
                if (item.userId) {
                    //获取所在版面名称
                    item.boardName = await getBoardName(item.boardId);
                    aTopic.push(item);
                    aTopicId.push(item.userId);
                }
                else {
                    item.portraitUrl = '/static/images/_心灵之约.png';
                    item.userName = "匿名用户";
                    item.boardName = "心灵之约";
                    bTopic.push(item);
                }
            }
            //对于非匿名数据批量获取头像地址
            let usersInfo = await getBasicUsersInfo(aTopicId);
            for (let i in aTopic) {
                let thisUserInfo = getThisUserInfo(aTopic[i].userId, usersInfo);
                aTopic[i].portraitUrl = thisUserInfo.portraitUrl;
            };
            //合并成原来的数据
            for (var i = 0, j = 0, k = 0; i < newTopic.length; i++) {
                if (j === aTopic.length) {
                    newTopic[i] = bTopic[k];
                    k++;
                }
                else if (newTopic[i].id === aTopic[j].id) {
                    newTopic[i] = aTopic[j];
                    j++;
                }
                else {
                    newTopic[i] = bTopic[k];
                    k++;
                }
            }

            return newTopic;
        }
        //如果没有搜索结果就返回0
        else {
            return 0;
        }
    }
}

/**
 * 搜索指定关键词版面，版面名称或版面描述中包含关键词的结果都会返回
 * @param boardId
 * @param word
 * @param router
 */
export async function getSearchBoard(word: string, router) {
    if (word) {
        const url = `/board/search?keyword=${word}`;
        const response = await cc98Fetch(url);
        /*switch (response.status) {
            case 401:
                store.dispatch(ErrorActions.throwError('UnauthorizedBoard');
                return null;
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
                return null;
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundBoard');
                return null;
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
                return null;
        }*/
        const data = await response.json();
        return data;
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
                if (await response.text() === 'reward_wealth_limited')
                    return 'limited';
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
    if (value != 0) {
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
    const url = `/user/name/${encodeURIComponent(userName)}`;
    const response = await cc98Fetch(url);
    const data = await response.json();
    return data.portraitUrl;
}
export async function getBoards() {
    if (!localStorage.getItem("boardsInfo")) {
        const url = '/board/all';
        const response = await cc98Fetch(url);
        const data = await response.json();
        setLocalStorage("boardsInfo", data, 3600);
        return data
    } else {
        const boards = getLocalStorage('boardsInfo');
        return boards
    }
}
export async function getBoardId(boardName: string) {
    let boardInfo = getStorage('boardInfo') || await fetch('/static/boardinfo.json').then(res => res.json());
    setStorage('boardInfo', boardInfo);
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
    if (customBoards) {
        for (let item of customBoards) {
            if (item == boardId) {
                return true;
            }
        }
    }
    return false;
}

export async function followBoard(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/custom-board/${boardId}`;
    const response = await cc98Fetch(url, { method: "PUT", headers });
    await refreshUserInfo();
    removeStorage("focusBoardList");
}
/**
 * 刷新当前用户信息
 */
export async function refreshUserInfo() {
    if (getLocalStorage('refresh_token')) {
        let headers = await formAuthorizeHeader();
        let response = await cc98Fetch(`/me`, {
            headers
        });

        let userInfo = await response.json();
        store.dispatch(UserCenterActions.changeUserInfo(userInfo));
        setLocalStorage("userInfo", userInfo, 2592000);
    }
}
export async function unfollowBoard(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/custom-board/${boardId}`;
    const response = await cc98Fetch(url, { method: "DELETE", headers });
    await refreshUserInfo();
    removeStorage("focusBoardList");
}

/**
 * 获取系统通知
 * @param from 获取消息起点
 * @param size 一次性获取消息数量
 * @param router 路由器
 */
export async function getMessageSystem(from: number, size: number, router) {
    const myHeaders = await formAuthorizeHeader();
    try {
        let response = await cc98Fetch(`/notification/system?from=${from}&size=${size}`, { headers: myHeaders });
        switch (response.status) {
            case 401:
                //如果未登录,直接返回未登录
                if (!isLogOn()) {
                    store.dispatch(ErrorActions.throwError('LogOut'));
                    return null;
                }
                else {
                    store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                    return null;
                }
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
                return null;
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                return null;
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
                return null;
        }
        var newTopic = await response.json(); //先从api得到原始的系统消息数据
    } catch {
        return [];
    }

    //补充楼层信息
    for (let i in newTopic) {
        if (newTopic[i].postId) {
            newTopic[i].floor = newTopic[i].postBasicInfo.floor;
        }
        else {
            newTopic[i].floor = 0;
        }
    }
    //console.log("返回前数据", newTopic);
    return newTopic;
}

//获取回复我的通知
export async function getMessageResponse(from: number, size: number, router) {
    try {
        let result = [];
        const myHeaders = await formAuthorizeHeader();

        let response = await cc98Fetch(`/notification/reply?from=${from}&size=${size}`, { headers: myHeaders });
        switch (response.status) {
            case 401:
                //如果未登录,直接返回未登录
                if (!isLogOn()) {
                    store.dispatch(ErrorActions.throwError('LogOut'));
                    return [];
                }
                else {
                    store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                    return [];
                }
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
                return [];
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                return [];
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
                return [];
        }
        let newTopic = await response.json();
        //把postId、topicId分别统计存到一个数组里，然后批量查询一下
        let topicsId = [];
        for (let item of newTopic) {
            if (item.topicId) {
                topicsId.push(item.topicId);
            }
        }
        let topicsInfo = await getBasicTopicsInfo(topicsId);
        //补充帖子标题，版面id和版面名称信息
        if (newTopic) {
            for (let i in newTopic) {
                if (newTopic[i].topicId) {
                    let topicInfo = getThisTopicInfo(newTopic[i].topicId, topicsInfo);
                    newTopic[i].topicTitle = topicInfo.title;
                    newTopic[i].boardId = topicInfo.boardId;
                    newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
                }
                //获取楼层信息和回复者信息
                if (newTopic[i].postId) {
                    newTopic[i].floor = newTopic[i].postBasicInfo.floor;
                    newTopic[i].userId = newTopic[i].postBasicInfo.userId;
                    newTopic[i].userName = newTopic[i].postBasicInfo.userName;
                }
                else {
                    newTopic[i].floor = 1;
                    newTopic[i].userId = -1;
                    newTopic[i].userName = "有人";
                }
                result.push(newTopic[i]);
            }
        }
        return result;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
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
        switch (response.status) {
            case 401:
                //如果未登录,直接返回未登录
                if (!isLogOn()) {
                    store.dispatch(ErrorActions.throwError('LogOut'));
                    return [];
                }
                else {
                    store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                    return [];
                }
            case 403:
                store.dispatch(ErrorActions.throwError('OperationForbidden'));
                return [];
            case 404:
                store.dispatch(ErrorActions.throwError('NotFoundTopic'));
                return [];
            case 500:
                store.dispatch(ErrorActions.throwError('ServerError'));
                return [];
        }
        let newTopic = await response.json();
        //console.log("获取到的新@数据", newTopic);
        //把postId、topicId分别统计存到一个数组里，然后批量查询一下
        let topicsId = [];
        for (let item of newTopic) {
            if (item.topicId) {
                topicsId.push(item.topicId);
            }
        }
        let topicsInfo = await getBasicTopicsInfo(topicsId);
        //补充帖子标题，版面id和版面名称信息
        if (newTopic) {
            for (let i in newTopic) {
                if (newTopic[i].topicId) {
                    let topicInfo = getThisTopicInfo(newTopic[i].topicId, topicsInfo);
                    newTopic[i].topicTitle = topicInfo.title;
                    newTopic[i].boardId = topicInfo.boardId;
                    newTopic[i].boardName = await getBoardName(newTopic[i].boardId);
                }
                //获取楼层信息和回复者信息
                if (newTopic[i].postId) {
                    newTopic[i].floor = newTopic[i].postBasicInfo.floor;
                    newTopic[i].userId = newTopic[i].postBasicInfo.userId;
                    newTopic[i].userName = newTopic[i].postBasicInfo.userName;
                }
                else {
                    newTopic[i].floor = 1;
                    newTopic[i].userId = -1;
                    newTopic[i].userName = "有人";
                }
                result.push(newTopic[i]);
            }
        }
        return result;
    } catch (e) {
        //store.dispatch(ErrorActions.throwError('Disconnected'));
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
        case 400:
            return 'rateself';
        case 401:
            return 'not allowed';
        case 403:
            // if (await response.text() === 'you_cannot_rate')
            //     return 'not allowed';
            // else
                return 'already';
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
        case 400:
            return 'rateself';
        case 401:
            return 'not allowed';
        case 403:
            // if (await response.text() === 'you_cannot_rate')
            //     return 'not allowed';
            // else
                return 'already';
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
    const url = `/post/${postId}`;
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
    const url = `/board/${boardId}/stop-post-user/${userId}`;
    const response = await cc98Fetch(url, { method: "DELETE", headers });
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
    return 'ok';
}
export async function removeBoardTopTopic(topicId, boardId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const content = { "reason": reason };
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
    return 'ok';
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
    const bodyInfo = { "reason": reason };
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
    return 'ok';
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
    return 'ok';
}

export async function upTopic(topicId, boardId, reason) {
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const url = `/topic/${topicId}/up`;
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
    return 'ok';
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
    return 'ok';
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
    return 'ok';
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
    return 'ok';
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
    return 'ok';
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
    return 'ok';
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
            //如果未登录,直接返回未登录
            if (!isLogOn()) {
                store.dispatch(ErrorActions.throwError('LogOut'));
                return null;
            }
            else {
                store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
                return null;
            }
        case 403:
            store.dispatch(ErrorActions.throwError('OperationForbidden'));
            return null;
        case 404:
            store.dispatch(ErrorActions.throwError('NotFoundTopic'));
            return null;
        case 500:
            store.dispatch(ErrorActions.throwError('ServerError'));
            return null;
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
    if (data.canEntry === false) {

        return 'unauthorized';
    }
    return data;
}
export async function getPostInfo(postId) {
    const headers = await formAuthorizeHeader();
    const url = `/post/basic?id=${postId}`;
    const response = await cc98Fetch(url, { headers });
    switch (response.status) {
        case 404:
            return 'not found';
        case 500:
            return 'server error';
    }

    const data = await response.json();
    if (data.canEntry === false) {

        return 'unauthorized';
    }
    return data[0];
}
export function getTotalPageof10(replyCount) {
    const totalFloor = replyCount + 1;
    return totalFloor % 10 === 0 ? totalFloor / 10 : (totalFloor - totalFloor % 10) / 10 + 1;
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
        } else {
            return false;
        }
    }
    return false;
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
    return 'ok';
}
export async function setFavoriteTopic(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/favorite/${topicId}`;
    const reponse = await cc98Fetch(url, { method: "PUT", headers });
    return 'ok';
}
export async function deleteFavoriteTopic(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/me/favorite/${topicId}`;
    const reponse = await cc98Fetch(url, { method: "DELETE", headers });
    return 'ok';
}
export async function getFavState(topicId) {
    const headers = await formAuthorizeHeader();
    const url = `/topic/${topicId}/isfavorite`;
    const response = await cc98Fetch(url, { headers });
    const data = await response.json();
    return data;
}

export async function editPost(postId, contentType, title, content) {
    const headers = await formAuthorizeHeader();
    const url = `/post/${postId}`;
    const bodyInfo = { content: content, title: title, contentType: contentType };
    const body = JSON.stringify(bodyInfo);
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    return 'ok';
}

/**
 * 获取 API 的 URL 基础路径。
 */
export function getApiUrl(): string {
    return Constants.config.apiUrl;
}


export async function getTagInfo() {
    if (getLocalStorage("tagInfo")) {
        return getLocalStorage("tagInfo");
    } else {
        return await getNewTagInfo()
    }
}
export async function getNewTagInfo() {
    const url = `/config/global/alltag`;
        const headers = await formAuthorizeHeader();
        const response = await cc98Fetch(url, { headers });
        const data = await response.json();
        setLocalStorage("tagInfo", data);
        return data;
}
export async function getTagIdbyName(name) {
    const tagInfo = await getTagInfo();
    for (let item of tagInfo) {
        if (item.name === name) return item.id;
    }
    const newTagInfo = await getNewTagInfo()
    for (let item of newTagInfo) {
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
export async function getTopicByOneTag(tagId, boardId, layer, page) {
    const start = (page - 1) * 20;
    const url = `/topic/search/board/${boardId}/tag?tag${layer}=${tagId}&from=${start}&size=20`;
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    return await response.json();
}
export async function getTopicByTwoTags(tag1Id, tag2Id, boardId, page) {
    const start = (page - 1) * 20;
    const url = `/topic/search/board/${boardId}/tag?tag1=${tag1Id}&tag2=${tag2Id}&from=${start}&size=20`;
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    return await response.json();
}
export async function updateUserInfo(id, name) {
    const key = `userId_${id}`;
    const key1 = `userName_${name}`;
    removeLocalStorage(key);
    removeLocalStorage(key1);
    await removeUserInfoInIndexDB(id);
    await getUserInfo(id);
}
export function getTagLayer(tagId: number, tags) {
    for (let item of tags) {
        for (let tag of item.tags) {
            if (tag.id == tagId) return item.layer;
        }
    }
    return false;
}
export async function findIP(topicId) {
    const url = `/topic/${topicId}/look-ip`;
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    if (response.status === 200)
        return await response.json();
    else return [];
}
export async function moveTopic(topicId, boardId, reason) {
    const url = `/topic/${topicId}/moveto/${boardId}`;
    const headers = await formAuthorizeHeader();
    headers.append('Content-Type', 'application/json');
    const response = await cc98Fetch(url, { method: "PUT", headers, body: JSON.stringify({ reason }) });
    if (response.status === 200)
        return 'ok';
    else return 'error';
}

export async function getBasicUsersInfo(userIds: number[]) {
    let usersInfoNeeded = [];
    let finalUsersInfo = [];
    //检查本地是否有缓存
    for (let i = 0; i < userIds.length; i++) {
        let thisUserInfo = getLocalStorage(`userId_${userIds[i]}`);
        if (thisUserInfo) {
            finalUsersInfo.push(thisUserInfo);
        } else {
            usersInfoNeeded.push(userIds[i]);
        }
    }
    if (usersInfoNeeded.length === 0) {
        return finalUsersInfo;
    }
    else {
        let url = "/user/basic";
        for (let i = 0; i < usersInfoNeeded.length; i++) {
            if (i === 0) {
                url = `${url}?id=${usersInfoNeeded[i]}`;
            }
            else {
                url = `${url}&id=${usersInfoNeeded[i]}`;
            }
        }
        try {
            //合并查询和缓存的
            let response = await cc98Fetch(url);
            var data = await response.json();
            for (let i of data) {
                finalUsersInfo.push(i);
            }
            return finalUsersInfo;
        } catch (e) {
            return [];
        }
    }
}

//批量查询post的基础信息
export async function getBasicPostsInfo(postIds: any[]) {
    if (!postIds || postIds.length === 0) {
        return [];
    }
    const headers = await formAuthorizeHeader();
    let url = "/post/basic";
    for (let i = 0; i < postIds.length; i++) {
        if (i === 0) {
            url = `${url}?id=${postIds[i]}`;
        }
        else {
            url = `${url}&id=${postIds[i]}`;
        }
    }
    try {
        let response = await cc98Fetch(url, { headers });
        var data = await response.json();
        return data;
    } catch (e) {
        return [];
    }
}

//在postsId中查询postId，查到了就返回对应的信息，没有就设置一个默认的,post信息包括楼层信息和回复者信息
export function getThisPostInfo(postId, postIds) {
    for (let i in postIds) {
        if (postIds[i].id === postId) {
            return postIds[i];
        }
    }
    //查询失败
    let indexData = {
        id: postId, floor: 1, userId: -1, userName: "有人"
    };
    return indexData;
}

//批量查询topic的基础信息
export async function getBasicTopicsInfo(topicIds: any[]) {
    if (!topicIds || topicIds.length === 0) {
        return [];
    }
    const headers = await formAuthorizeHeader();
    let url = "/topic/basic";
    for (let i = 0; i < topicIds.length; i++) {
        if (i === 0) {
            url = `${url}?id=${topicIds[i]}`;
        }
        else {
            url = `${url}&id=${topicIds[i]}`;
        }
    }
    try {
        let response = await cc98Fetch(url, { headers });
        var data = await response.json();
        return data;
    } catch (e) {
        return [];
    }
}

//在topicsId中查询topicId，查到了就返回对应的信息，没有就设置一个默认的
export function getThisTopicInfo(topicId, topicIds) {
    for (let i in topicIds) {
        if (topicIds[i].id === topicId) {
            return topicIds[i];
        }
    }
    //查询失败
    let indexData = {
        id: topicId, title: "未知主题（该主题已被删除或者无权限获取）", boardId: 0
    };
    return indexData;
}

/*
*处理发帖回帖内容
*如果存在合法的@，则会返回一个字符串数组，包含至多10个合法的被@用户的昵称，否则返回false
*/
export function atHanderler(content: string) {
    try {
        const reg1 = /([\s\S]*)\[quotex?\][\s\S]*?\[\/quotex?\]([\s\S]*)/;
        const reg2 = /@[^ \n]{1,10}?[ ]+/g;
        const reg3 = /[^@ ]+/;
        //不检测引用内容中的@
        //console.log("处理前内容", content);
        let str;
        do {
            str = content.match(reg1);
            if (str) {
                content = `${content.match(reg1)[1]}${content.match(reg1)[2]}`;
            }
        } while (str);
        console.log("非引用内容", content);
        if (content === '') {
            return false
        }
        else if (content.match(reg2)) {   //如果match方法返回了非null的值（即数组），则说明内容中存在合法的@
            let atNum = content.match(reg2).length;  //合法的@数
            if (atNum > 10) atNum = 10;            //至多10个
            let ats: string[] = new Array();
            for (let i = 0; i < atNum; i++) {
                let anAt = content.match(reg2)[i];

                let aUserName = reg3.exec(anAt)[0];

                ats[i] = aUserName;
            }
            return ats;
        } else {
            return false;
        }
    } catch (e) {
        return content;
    }
}

/**
 * 给ubb模式下的@添加链接指向个人中心
 * @param content
 */
export function atUserUbbUrl(content: string) {
    try {
        const reg = /@[^ \n]{1,10}?[ ]+/g;
        const reg2 = /[^@ ]+/;
        if (content === '') {
            return content;
        }
        else if (content.match(reg)) {   //如果match方法返回了非null的值（即数组），则说明内容中存在合法的@
            let atNum = content.match(reg).length;  //合法的@数
            if (atNum > 10) atNum = 10;            //至多10个
            let ats: string[] = new Array();
            for (let i = 0; i < atNum; i++) {
                //提取@字符串
                let anAt = content.match(reg)[i];
                //提取@的用户名
                let aUserName = reg2.exec(anAt)[0];
                ats[i] = aUserName;
            }
            for (let i = 0; i < atNum; i++) {
                //给@用户名加上效果
                let atText = new RegExp(`@${ats[i]}[ ]`, "g");
                content = content.replace(atText, `[url="/user/name/${encodeURIComponent(ats[i])}"]@${ats[i]} [/url]`);
            }
            return content;
        } else {
            return content;
        }
    } catch (e) {
        return content;
    }
}

/**
 *  给markdown模式下的@添加链接指向个人中心
 * @param content
 */
export function atUserMdUrl(content: string) {
    try {
        const reg = /@[^ \n]{1,10}?[ ]+/g;
        const reg2 = /[^@ ]+/;
        if (content === '') {
            return content;
        }
        else if (content.match(reg)) {   //如果match方法返回了非null的值（即数组），则说明内容中存在合法的@
            let atNum = content.match(reg).length;  //合法的@数
            if (atNum > 10) atNum = 10;            //至多10个
            let ats: string[] = new Array();
            for (let i = 0; i < atNum; i++) {
                //提取@字符串
                let anAt = content.match(reg)[i];
                //提取@的用户名
                let aUserName = reg2.exec(anAt)[0];
                ats[i] = aUserName;
            }
            for (let i = 0; i < atNum; i++) {
                //给@用户名加上效果
                let atText = new RegExp(`@${ats[i]} `, "g");
                content = content.replace(atText, `[@${ats[i]} ](/user/name/${ats[i]})`);
            }
            return content;
        } else {
            return content;
        }
    } catch (e) {
        return content;
    }
}

/**
 * 判断是否存在引用内容
 * @param content
 */
export function quoteJudger(content: string) {
    const reg = new RegExp("\[(quotex?)\].*\[\/(quotex?)\]");
    if (content.match(reg) && (content.match(reg)[1] === content.match(reg)[2])) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 一键已读
 */
export async function readAll() {
    let path = location.pathname;
    let url = null;
    let unreadCount = store.getState().message;
    const headers = await formAuthorizeHeader();
    if (path === "/message/response") {
        if (unreadCount.replyCount === 0) {
            return null;
        }
        url = "/notification/read-all-reply";
    }
    else if (path === "/message/attme") {
        if (unreadCount.atCount === 0) {
            return null;
        }
        url = "/notification/read-all-at";
    }
    else if (path === "/message/system") {
        if (unreadCount.systemCount === 0) {
            return null;
        }
        url = "/notification/read-all-system";
    }
    else if (path === "/message") {
        if (unreadCount.replyCount === 0) {
            return null;
        }
        url = "/notification/read-all-reply";
    }
    else {
        return null;
    }
    const response = await cc98Fetch(url, { method: "PUT", headers, body: '' });
    store.dispatch(Actions.changeMessageCount({
        messageCount: 0,
        systemCount: 0,
        atCount: 0,
        replyCount: 0
    }))
    return null;
}

/**
 * 控制提示消息出现和消失
 */
export function noticeMessageShow(id: string) {
    $(`#${id}`).removeClass('displaynone');
    $(`#${id}`).removeClass('noticeDisplaynone');
    setTimeout(function () {
        $(`#${id}`).addClass('noticeDisplaynone');
    }, 1500);
}

declare let themeNames: string[];
/**
 * 切换主题
 */
export function changeTheme(theme: number) {
    $('#mainStylesheet').remove();
    document.getElementsByTagName('head')[0].innerHTML += '<link id="mainStylesheet" type="text/css" rel="stylesheet" href="/static/content/' + themeNames[theme] + '">';
}
export async function queryWealth(boardId) {
    const headers = await formAuthorizeHeader();
    const url = `/manage/reward-daily-record?boardId=${boardId}`;
    const response = await cc98Fetch(url, { headers });
    const json = await response.json();
    return json;
}


/**
 * @mingyigg
 * @param boardId
 * @param from
 * @param size
 */
export async function getBoardRecord(boardId: number, from: number, size: number) {
    const headers = await formAuthorizeHeader();
    const url = `/board/${boardId}/events?from=${from}&size=${size}`;
    const response = await cc98Fetch(url, { headers });
    const json = await response.json();
    console.log("版面事件记录", json);
    return json;
}
/**
 * 获取本周/月热门话题
 * @returns {data} 处理好的热门话题数据
 * @author adddna //基于明一gg的获取新帖
 */
export async function getMonthlyHotTopic(type: string) {
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(`/topic/hot-${type}`);

    switch (response.status) {
        case 401:
            store.dispatch(ErrorActions.throwError('UnauthorizedTopic'));
        case 403:
            store.dispatch(ErrorActions.throwError('OperationForbidden'));
        case 404:
        //store.dispatch(ErrorActions.throwError('NotFoundTopic'));
        case 500:
        //store.dispatch(ErrorActions.throwError('ServerError'));
    }

    let data = await response.json();

    let aTopic = [];
    let aTopicId = [];
    let bTopic = [];
    for (let item of data) {
        //时间转换
        item.time = transerRecentTime(item.time);
        item.lastPostTime = transerRecentTime(item.lastPostTime);

        //阅读数转换
        if (item.hitCount > 10000) {
            if (item.hitCount > 100000) {
                let index = parseInt(`${item.hitCount / 10000}`);
                item.hitCount = `${index}万`;
            }
            else {
                let index = parseInt(`${item.hitCount / 1000}`) / 10;
                item.hitCount = `${index}万`;
            }
        }
        //计算总楼层
        item.floorCount = item.replyCount + 1;
        //回复数转换
        if (item.replyCount > 10000) {
            if (item.replyCount > 100000) {
                let index = parseInt(`${item.replyCount / 10000}`);
                item.replyCount = `${index}万`;
            }
            else {
                let index = parseInt(`${item.replyCount / 1000}`) / 10;
                item.replyCount = `${index}万`;
            }
        }
        //标签转换
        if (item.tag1) {
            item.tag1 = await getTagNamebyId(item.tag1);
            if (item.tag2) {
                item.tag2 = await getTagNamebyId(item.tag2);
            }
        }
        //处理匿名与非匿名主题，非匿名主题用户批量获取信息
        if (item.userId) {
            //获取所在版面名称
            item.boardName = await getBoardName(item.boardId);
            aTopic.push(item);
            aTopicId.push(item.userId);
        }
        else {
            item.portraitUrl = '/static/images/_心灵之约.png';
            item.userName = "匿名用户";
            item.boardName = "心灵之约";
            bTopic.push(item);
        }
    }
    //对于非匿名数据批量获取头像地址
    let usersInfo = await getBasicUsersInfo(aTopicId);
    for (let i in aTopic) {
        let thisUserInfo = getThisUserInfo(aTopic[i].userId, usersInfo);
        aTopic[i].portraitUrl = thisUserInfo.portraitUrl;
    };
    for (let i = 0, j = 0, k = 0; i < data.length; i++) {
        if (j === aTopic.length) {
            data[i] = bTopic[k];
            k++;
        }
        else if (data[i].id === aTopic[j].id) {
            data[i] = aTopic[j];
            j++;
        }
        else {

            data[i] = bTopic[k];
            k++;
        }
    }
    return data;
}

export async function mutliLock(day, reason, target) {
    const url = `/topic/multi-lock?${target}`;
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(
        {
            reason: reason,
            value: day
        }
    )
    $("#mutlilock-btn").attr("disabled", "disabled");
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    if (response.status == 200) {
        $("#mutlilock-btn").removeAttr("disabled");
        $("#mutlioptip").text("操作成功");
    } else {
        $("#mutlilock-btn").removeAttr("disabled");
        $("#mutlioptip").text("操作失败");
    }
    return response.status;
}

export async function mutliDelete(reason, target) {
    const url = `/topic/multi-delete?${target}`;
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(
        {
            reason: reason,
        }
    )
    $("#mutlidelete-btn").attr("disabled", "disabled");
    const response = await cc98Fetch(url, { method: "PUT", headers, body });
    if (response.status == 200) {
        $("#mutlidelete-btn").removeAttr("disabled");
        $("#mutliopdtip").text("操作成功");
    } else {
        $("#mutlidelete-btn").removeAttr("disabled");
        $("#mutliopdtip").text("操作失败");
    }
    return response.status;
}


export async function getTpUsers(boardId, from, size) {
    const url = `/board/${boardId}/stop-post-user?from=${from}&size=${size}`;
    const headers = await formAuthorizeHeader();
    headers.append("Content-Type", "application/json");
    const response = await cc98Fetch(url, { headers });
    return await response.json();
}

export async function getAnnualReview() {
    if (!isLogOn()) {
        store.dispatch(ErrorActions.throwError('LogOut'));
        return null;
    }
    const url = '/me/annual-review'
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch(url, { headers });
    return await response.json();
}