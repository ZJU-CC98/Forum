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
declare let moment: any;

export async function getBoardTopicAsync(curPage, boardid,router) {
    try {
        const token = getLocalStorage("accessToken");
        const startPage = (curPage - 1) * 20;
        const endPage = curPage * 20 - 1;

        const totalTopicCountResponse = await fetch(`http://apitest.niconi.cc/Board/${boardid}`);
        //找不到版面
        if (totalTopicCountResponse.status == 404) {
            router.history.replace('/status/NotFoundBoard');
        }
        if (totalTopicCountResponse.status === 500) {
            router.history.replace('/status/ServerError');
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
        //无权限进版面
        if (response.status === 401) {
            router.history.replace('/status/UnauthorizedBoard');
        }
        //版面不存在
        if (response.status === 404) {
            router.history.replace('/status/NotFoundBoard');
        }
        if (response.status === 500) {
            router.history.replace('/status/ServerError');
        }
        const data: State.TopicTitleAndContentState[] = await response.json();
        for (let i = 0; i < topicNumberInPage; i++) {
            boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].userName, data[i].id, data[i].userId, data[i].lastPostUser, data[i].lastPostTime);
        }

        return boardtopics;


    } catch (e) {
        router.history.replace("/status/Disconnected");
    }

}
export async function getTopic(topicid: number, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=0&size=1`, {
            headers
        });
        if (response.status === 404) {
            const str = await response.text();
            switch (str) {
                case 'topic_not_exists':
                    router.history.replace("/status/NotFoundTopic");
                    break;
                case 'topic_is_deleted':
                    router.history.replace("/status/TopicDeleted");
                    break;
                default:
                    router.history.replace("/status/NotFoundTopic");
            }
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const data = await response.json();

        const hitCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
        //两种情况 被删或者不存在
        if (hitCountResponse.status === 404) {
            const str = await hitCountResponse.text();
            switch (str) {
                case 'topic_not_exists':
                    router.history.replace("/status/NotFoundTopic");
                    break;
                case 'topic_is_deleted':
                    router.history.replace("/status/TopicDeleted");
                    break;
                default:
                    router.history.replace("/status/NotFoundTopic");
            }
        }
         if (hitCountResponse.status === 401) {
             router.history.replace("/status/UnauthorizedTopic");
        }
        if (hitCountResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const hitCountJson = await hitCountResponse.json();
        const hitCount = hitCountJson.hitCount;
        let topicMessage = null;
        if (data[0].isAnonymous != true) {
            const userMesResponse = await fetch(`http://apitest.niconi.cc/User/${data[0].userId}`);
            if (userMesResponse.status === 404) {
                router.history.replace("/status/NotFoundUser");
            }
            const userMesJson = await userMesResponse.json();
            topicMessage = new State.TopicState(data[0].userName, data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl || 'https://www.cc98.org/pic/anonymous.gif', hitCount, data[0].userId, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType);
        } else {
            topicMessage = new State.TopicState('匿名' + data[0].userName.toUpperCase(), data[0].title, data[0].content, data[0].time, '', 'https://www.cc98.org/pic/anonymous.gif', hitCount, null, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType);

}

            return topicMessage;

        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getTopicContent(topicid: number, curPage: number, router) {
    try {
        const startPage = (curPage - 1) * 10;
        const endPage = curPage * 10 - 1;
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const topic = curPage !== 1
            ? await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=${startPage}&size=10`, { headers })
            : await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=1&size=9`, { headers });
        if (topic.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        //两种
        if (topic.status === 404) {
            router.history.replace("/status/");
        }
        if (topic.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const replyCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
        if (replyCountResponse.status == 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (replyCountResponse.status == 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
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
                    if (userMesResponse.status === 404) {
                        window.location.href = "/status/NotFoundUser";
                    }
                        const userMesJson = await userMesResponse.json();
                        post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
                    
                } else {
                    let purl = 'https://www.cc98.org/pic/anonymous.gif';
                    post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);

                }

            }
            return post;
        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function like(topicid, postid, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/post/userlike?topicid=${topicid}&postid=${postid}`, { method: "POST", headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        } 
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
            const data = await response.json();
            return data;
        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function dislike(topicid, postid, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/post/userdislike?topicid=${topicid}&postid=${postid}`, { method: "POST", headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }

        if (response.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        } 
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
            const data = await response.json();
            return data;
        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getLikeStateAndCount(topicid, postid, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        // await fetch(`http://apitest.niconi.cc/Post/Topic/${topicid}?from=0&size=10`, { headers })
        const response = await fetch(`http://apitest.niconi.cc/likeState?topicid=${topicid}&postid=${postid}`, { headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }

        if (response.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
            const data = await response.json();
            return data;
        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getHotReplyContent(topicid: number, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Post/Topic/Hot/${topicid}`, { headers });
        //帖子不存在
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        //无权限进版面
         if (response.status === 401) {
             router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const content = await response.json();
        const post: State.ContentState[] = [];
        let topicNumberInPage: number = content.length;
        for (let i = 0; i < topicNumberInPage; i++) {
            if (content[i].isAnonymous != true) {
                const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${content[i].userName}`);
                if (userMesResponse.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userMesResponse.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                const userMesJson = await userMesResponse.json();
                post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
            } else {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
            }
        }
        return post;
    } catch (e) {
        router.history.replace("/status/Disconnected");
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
export async function getCurUserTopic(topicid: number, userId: number, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/post/Topic/user?topicid=${topicid}&userid=${userId}&from=0&size=1`, { headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const data = await response.json();
        const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${data[0].userName}`);
        if (userMesResponse.status === 404) {
            router.history.replace("/status/NotFoundUser");
        }
        if (userMesResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const userMesJson = await userMesResponse.json();
        data[0].userImgUrl = userMesJson.portraitUrl;
        return data[0];
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getCurUserTopicContent(topicid: number, curPage: number, userName: string, userId: number, router) {
    try {
        const topicMessage = await getTopic(topicid, router);
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
        if (topic.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (topic.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (topic.status === 500) {
            router.history.replace("/status/ServerError");
        }
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
            if (content[i].isAnonymous != true) {
                const userMesResponse = await fetch(`http://apitest.niconi.cc/user/name/${content[i].userName}`);
                if (userMesResponse.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userMesResponse.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                const userMesJson = await userMesResponse.json();

                post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId, userMesJson.privilege, content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);

            } else {
                let purl = 'https://www.cc98.org/pic/anonymous.gif';
                post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDeleted, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名' + content[i].userName.toUpperCase(), null, purl, '', null, "匿名用户", content[i].likeCount, content[i].dislikeCount, content[i].id, content[i].contentType);
            }
        }

        return post;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}

/**
 * 获取全站新帖
 * @param curPage
 */
export async function getAllNewTopic(curNum: number, router) {
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
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const newTopic = await response.json();
        for (let i in newTopic) {
            if (newTopic[i].userId) {
                //获取作者粉丝数目
                let userFan0 = await fetch(`http://apitest.niconi.cc/user/follow/fanCount?userid=${newTopic[i].userId}`);
                if (userFan0.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userFan0.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                let userFan1 = await userFan0.json();
                newTopic[i].fanCount = userFan1;
                //获取作者头像地址
                let userInfo0 = await fetch(`http://apitest.niconi.cc/user/basic/${newTopic[i].userId}`);
                if (userInfo0.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userInfo0.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                let userInfo1 = await userInfo0.json();
                newTopic[i].portraitUrl = userInfo1.portraitUrl;
                //获取所在版面名称
                newTopic[i].boardName = await getBoardName(newTopic[i].boardId, router);
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
        router.history.replace("/status/Disconnected");
    }
}

/**
 * 获取关注版面新帖
 * @param curPage
 */
export async function getFocusTopic(curNum: number, router) {
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
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const newTopic = await response.json();
        for (let i in newTopic) {
            if (newTopic[i].userId) {
                //获取作者粉丝数目
                let userFan0 = await fetch(`http://apitest.niconi.cc/user/follow/fanCount?userid=${newTopic[i].userId}`);
                if (userFan0.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userFan0.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                let userFan1 = await userFan0.json();
                newTopic[i].fanCount = userFan1;
                //获取作者头像地址
                let userInfo0 = await fetch(`http://apitest.niconi.cc/user/basic/${newTopic[i].userId}`);
                if (userInfo0.status === 404) {
                    router.history.replace("/status/NotFoundUser");
                }
                if (userInfo0.status === 500) {
                    router.history.replace("/status/ServerError");
                }
                let userInfo1 = await userInfo0.json();
                newTopic[i].portraitUrl = userInfo1.portraitUrl;
                //获取所在版面名称
                newTopic[i].boardName = await getBoardName(newTopic[i].boardId, router);
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
        router.history.replace("/status/Disconnected");
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
export async function getBoardName(boardId: number, router) {
    try {
        let boardName: string;

        boardName = getLocalStorage(`boardId_${boardId}`);

        if (!boardName) {
            const token = getLocalStorage("accessToken");
            const headers = new Headers();
            headers.append('Authorization', token);
            const url = `http://apitest.niconi.cc/board/${boardId}`;
            let res = await fetch(url, { headers });
            if (res.status === 404) {
                router.history.replace("/status/NotFoundBoard");
            }
            if (res.status === 500) {
                router.history.replace("/status/ServerError");
            }
            
            let data = await res.json();
            boardName = data.name;
            setLocalStorage(`boardId_${boardId}`, boardName);
        }


        return boardName;
    } catch (e) {
        router.history.replace("/status/Disconnected");
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
export async function getRecentContact(from: number, size: number, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        let response = await fetch(`http://apitest.niconi.cc/message/recentcontactusers?from=${from}&size=${size}`, { headers });
        if (response.status === 401) {
            //router.history.replace("/status/Loggout");
        }
        if (response.status === 500) {
            //router.history.replace("/status/ServerError");
        }
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
        if (response1.status === 404) {
            //router.history.replace("/status/NotFoundUser");
        }
        if (response1.status === 500) {
            //router.history.replace("/status/ServerError");
        }
        let recentContact = await response1.json();
        for (let i in recentContact) {
            recentContact[i].message = await getRecentMessage(recentContact[i].id, 0, 10, router);
        }
        console.log(recentContact);
        return recentContact;
    } catch (e) {
        //router.history.replace("/status/Disconnected");
    }
}

/*
* 获取最近N个联系人的信息
*/
export async function getRecentMessage(userId: number, from: number, size: number, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        let response0 = await fetch(`http://apitest.niconi.cc/message/${userId}?from=${from}&size=${size}`, { headers });
        if (response0.status === 401) {
            //router.history.replace("/status/Logout");
        }
        if (response0.status === 500) {
            //router.history.replace("/status/ServerError");
        }
        let response1 = await response0.json();
        console.log("直接获取到的Message");
        console.log(response1);
        let recentMessage = sortRecentMessage(response1);
        return recentMessage;
    } catch (e) {
        //router.history.replace("/status/Disconnected");
    }
}

/**
 * 处理最新消息列表，时间间隔短的消息只显示第一条消息的时间
 * @param recentMessage
 */
export function sortRecentMessage(recentMessage) {
    console.log("走远第0步");
    console.log(recentMessage);
    if (recentMessage == [] || !recentMessage) {
        console.log("要原样返回了");
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
                response = await fetch(`http://apitest.niconi.cc/user/basic/${chatManId}`);
                if (response.status === 404) {
                    //router.history.replace("/status/NotFoundUser");
                }
                if (response.status === 500) {
                    //router.history.replace("/status/ServerError");
                }
                chatMan = await response.json();
            }
            catch (e) {
                //router.history.replace("/status/Disconnected");
                flag = 0;
            }
            if (flag == 1) {
                chatMan.message = await getRecentMessage(chatManId, 0, 10, router);
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
                    response0 = await fetch(`http://apitest.niconi.cc/user/name/${chatManName}`);
                    if (response0.status === 404) {
                        //router.history.replace("/status/NotFoundUser");
                    }
                    if (response0.status === 500) {
                        //router.history.replace("/status/ServerError");
                    }
                    response1 = await response0.json();
                } catch (e) {
                    //router.history.replace("/status/Disconnected");
                    flag = 0;
                }
                if (flag == 1) {
                    let chatMan = { id: null, name: '', portraitUrl: '', message: [] };
                    chatMan.id = response1.id;
                    chatMan.name = response1.name;
                    chatMan.portraitUrl = response1.portraitUrl;
                    chatMan.message = await getRecentMessage(chatMan.id, 0, 10, router);
                    let chatContact = [chatMan];
                    recentContact = chatContact.concat(recentContact);
                }
            }
        }
    }
    return recentContact;
}


export async function getTotalReplyCount(topicid, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const replyCountResponse = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
        if (replyCountResponse.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (replyCountResponse.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (replyCountResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson.replyCount;
        if (replyCount >= 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getCategory(topicid, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Topic/${topicid}`, { headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const data = await response.json();
        const topicName = data.title;
        const boardId = data.boardId;
        const boardResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
        const boardData = await boardResponse.json();
        const boardName = boardData.name;
        const body = { boardId: boardId, topicId: topicid, boardName: boardName, title: topicName }
        return body;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getUserDetails(userName, router) {
    try {
        let url = `http://apitest.niconi.cc/user/name/${userName}`;
        let message = await fetch(url);
        if (message.status === 404) {
            router.history.replace("/status/NotFoundUser");
        }
        if (message.status === 500) {
            router.history.replace("/status/ServerError");
        }
        let data = await message.json();
        const body = { portraitUrl: data.portraitUrl, userName: data.name, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle }
        return body;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getLikeState(topicid, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const topic = await getTopic(topicid, router);
        const postid = topic.postid;
        const response = await fetch(`http://apitest.niconi.cc/post/likestate?topicid=${topicid}&postid=${postid}`, { headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        } else {
            const data = await response.json();
            return data;
        }
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function refreshLikeState(topicId, postId, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/post/likestate?topicid=${topicId}&postid=${postId}`, { headers });
        if (response.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (response.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (response.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        } 
        const data = await response.json();
        return data;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function sendTopic(topicId, router) {
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
        if (mes.status === 401) {
            router.history.replace("/status/Logout");
        }
        if (mes.status === 402) {
            router.history.replace("/status/ContentNeeded");
        }
        if (mes.status === 403) {
            router.history.replace("/status/OperationForbidden");
        }
        if (mes.status === 404) {
            router.history.replace("/status/NotFoundTopic");
        }
        if (mes.status === 500) {
            router.history.replace("/status/ServerError");
        }
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getListCategory(boardId, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const boardResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
        if (boardResponse.status === 404) {
            router.history.replace("/status/NotFoundBoard");
        }
        if (boardResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const boardData = await boardResponse.json();
        const boardName = boardData.name;
        return boardName;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getBoardMessage(boardId, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const url = `http://apitest.niconi.cc/Board/${boardId}`;
        const response = await fetch(url, { headers });
        if (response.status === 404) {
            router.history.replace("/status/NotFoundBoard");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getListTotalPage(boardId, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const totalTopicCountResponse = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
        if (totalTopicCountResponse.status === 404) {
            router.history.replace("/status/NotFoundBoard");
        }
        if (totalTopicCountResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const totalTopicCountJson = await totalTopicCountResponse.json();
        const totalTopicCount = totalTopicCountJson.topicCount;

        return (totalTopicCount - totalTopicCount % 20) / 20 + 1;
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getBasicBoardMessage(boardId, curPage, router) {
    try {
        const token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const response = await fetch(`http://apitest.niconi.cc/Board/${boardId}`, { headers });
        if (response.status === 404) {
            router.history.replace("/status/NotFoundBoard");
        }
        if (response.status === 500) {
            router.history.replace("/status/ServerError");
        }
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
        const totalPage = await getListTotalPage(boardid, router);
            const data = { bigPaper: bigPaper, totalPage: totalPage, page: page };
            return data;
        
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}
export async function getCurUserTotalReplyPage(topicId, userId, router) {
    try {
        let token = getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append('Authorization', token);
        const replyCountResponse = await fetch(`http://apitest.niconi.cc/post/topic/user?topicid=${topicId}&userid=${userId}&from=0&size=1`, { headers });
        if (replyCountResponse.status === 401) {
            router.history.replace("/status/UnauthorizedTopic");
        }
        if (replyCountResponse.status === 404) {
            router.history.replace("/status/NotFoundBoard");
        }
        if (replyCountResponse.status === 500) {
            router.history.replace("/status/ServerError");
        }
        const replyCountJson = await replyCountResponse.json();
        const replyCount = replyCountJson[0].count;
        if (replyCount > 10) {
            return (replyCount - replyCount % 10) / 10 + 1;
        } else {
            return 1;
        }
    } catch (e) {
        router.history.replace("/status/Disconnected");
    }
}

/**
 * 发送私信的函数
 * @param bodyContent
 */
export async function sendMessage(bodyContent: string,router) {
    let token = getLocalStorage("accessToken");
    let myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    myHeaders.append('content-type', 'application/json');
    let response = await fetch('http://apitest.niconi.cc/message/send', {
        method: 'POST',
        headers: myHeaders,
        body: bodyContent
    });
    if (response.status === 401) {
        router.history.replace("/status/Loggout");
    }
    if (response.status === 500) {
        router.history.replace("/status/ServerError");
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