"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var State = require("./States/AppState");
var React = require("react");
var List_1 = require("./Components/List");
var $ = require("jquery");
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
function getBoardTopicAsync(curPage, boardid) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, boardtopics, url, response, data, totalTopicCountResponse, totalTopicCountJson, totalTopicCount, topicNumberInPage, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startPage = (curPage - 1) * 20;
                    endPage = curPage * 20 - 1;
                    boardtopics = [];
                    url = "http://api.cc98.org/Topic/Board/" + boardid;
                    return [4 /*yield*/, fetch(url, { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + boardid)];
                case 3:
                    totalTopicCountResponse = _a.sent();
                    return [4 /*yield*/, totalTopicCountResponse.json()];
                case 4:
                    totalTopicCountJson = _a.sent();
                    totalTopicCount = totalTopicCountJson.totalTopicCount;
                    if (curPage * 20 <= totalTopicCount) {
                        topicNumberInPage = 20;
                    }
                    else if (curPage == 1 && totalTopicCount < 19) {
                        topicNumberInPage = totalTopicCount;
                    }
                    else {
                        topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
                    }
                    for (i = 0; i < topicNumberInPage; i++) {
                        boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id, data[i].authorId);
                    }
                    return [2 /*return*/, boardtopics];
            }
        });
    });
}
exports.getBoardTopicAsync = getBoardTopicAsync;
function getTopic(topicid) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, hitCountResponse, hitCountJson, hitCount, topicMessage, userMesResponse, userMesJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 0 + "-" + 0 } })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 3:
                    hitCountResponse = _a.sent();
                    return [4 /*yield*/, hitCountResponse.json()];
                case 4:
                    hitCountJson = _a.sent();
                    hitCount = hitCountJson.hitCount;
                    return [4 /*yield*/, fetch("http://api.cc98.org/User/" + data[0].userId)];
                case 5:
                    userMesResponse = _a.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 6:
                    userMesJson = _a.sent();
                    topicMessage = new State.TopicState(data[0].userName || '匿名', data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl, hitCount, data[0].userId);
                    return [2 /*return*/, topicMessage];
            }
        });
    });
}
exports.getTopic = getTopic;
function getTopicContent(topicid, curPage) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, topic, topic, replyCountResponse, replyCountJson, replyCount, content, post, topicNumberInPage, i, userMesResponse, userMesJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startPage = (curPage - 1) * 10;
                    endPage = curPage * 10 - 1;
                    if (!(curPage != 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    topic = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 1 + "-" + 9 } })];
                case 3:
                    topic = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 5:
                    replyCountResponse = _a.sent();
                    return [4 /*yield*/, replyCountResponse.json()];
                case 6:
                    replyCountJson = _a.sent();
                    replyCount = replyCountJson.replyCount;
                    return [4 /*yield*/, topic.json()];
                case 7:
                    content = _a.sent();
                    post = [];
                    if (curPage != 1 && curPage * 10 <= replyCount) {
                        topicNumberInPage = 10;
                    }
                    else if (curPage == 1 && replyCount >= 9) {
                        topicNumberInPage = 9;
                    }
                    else if (curPage == 1 && replyCount < 9) {
                        topicNumberInPage = replyCount;
                    }
                    else {
                        topicNumberInPage = (replyCount - (curPage - 1) * 10);
                    }
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < topicNumberInPage)) return [3 /*break*/, 12];
                    return [4 /*yield*/, fetch("http://api.cc98.org/User/" + content[i].userId)];
                case 9:
                    userMesResponse = _a.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 10:
                    userMesJson = _a.sent();
                    post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId);
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 8];
                case 12: return [2 /*return*/, post];
            }
        });
    });
}
exports.getTopicContent = getTopicContent;
function convertHotTopic(item) {
    return React.createElement(List_1.TopicTitleAndContent, { title: item.title, authorName: item.authorName, id: item.id, authorId: item.authorId });
}
exports.convertHotTopic = convertHotTopic;
function getPager(curPage, totalPage) {
    if (curPage == undefined) {
        curPage = 1;
    }
    var pages = [];
    if (totalPage == 1) {
        pages = [1];
    }
    else if (totalPage < 10 && totalPage > 1) {
        if (curPage == undefined || curPage == 1) {
            var i;
            for (i = 0; i < totalPage; i++) {
                pages[i] = i + 1;
            }
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else if (curPage == 2) {
            var i;
            for (i = 1; i <= totalPage; i++) {
                pages[i] = i;
            }
            pages[0] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else {
            var i;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
    }
    else {
        if (curPage + 5 <= totalPage) {
            if (curPage == undefined || curPage == 1) {
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -4];
            }
            else if (curPage > 1 && curPage < 6) {
                pages = [-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 - 2, -4];
            }
            else {
                pages = [-3, -1, curPage - 4, curPage - 3, curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2, curPage + 3, curPage + 4, curPage + 5, -2, -4];
            }
        }
        else if (curPage + 5 > totalPage && curPage != totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage, -2, -4];
        }
        else if (curPage == totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
        }
    }
    return pages;
}
exports.getPager = getPager;
function getCurUserTopicContent(topicid, curPage, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var replyCountResponse, replyCountJson, replyCount, topic, content, post, i, j, userMesResponse, userMesJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 1:
                    replyCountResponse = _a.sent();
                    return [4 /*yield*/, replyCountResponse.json()];
                case 2:
                    replyCountJson = _a.sent();
                    replyCount = replyCountJson.replyCount;
                    return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 1 + "-" + replyCount } })];
                case 3:
                    topic = _a.sent();
                    return [4 /*yield*/, topic.json()];
                case 4:
                    content = _a.sent();
                    post = [];
                    i = 0, j = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < replyCount)) return [3 /*break*/, 9];
                    if (!(content[i].userName == userName)) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetch("http://api.cc98.org/User/" + content[i].userId)];
                case 6:
                    userMesResponse = _a.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 7:
                    userMesJson = _a.sent();
                    post[j] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId);
                    j++;
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 5];
                case 9: return [2 /*return*/, post];
            }
        });
    });
}
exports.getCurUserTopicContent = getCurUserTopicContent;
function sendRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/message';
    var redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.sendRequest = sendRequest;
function systemRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/system';
    var redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.systemRequest = systemRequest;
function responseRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/response';
    var redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.responseRequest = responseRequest;
function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus');
}
exports.changeNav = changeNav;
/**
 * 获取全站新帖
 * @param curPage
 */
function getAllNewPost(curPage) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, newTopics0, newTopics1, _a, _b, _i, i, userInfo0, userInfo1, boardInfo0, boardInfo1, newTopics;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    startPage = (curPage - 1) * 20 + 1;
                    endPage = curPage * 20;
                    return [4 /*yield*/, fetch('https://api.cc98.org/Topic/New', { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    newTopics0 = _c.sent();
                    return [4 /*yield*/, newTopics0.json()];
                case 2:
                    newTopics1 = _c.sent();
                    _a = [];
                    for (_b in newTopics1)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    i = _a[_i];
                    if (!(newTopics1[i].authorName == null)) return [3 /*break*/, 4];
                    newTopics1[i].authorName = '匿名';
                    newTopics1[i].portraitUrl = 'https://www.cc98.org/pic/anonymous.gif';
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, fetch("https://api.cc98.org/User/" + newTopics1[i].authorId)];
                case 5:
                    userInfo0 = _c.sent();
                    return [4 /*yield*/, userInfo0.json()];
                case 6:
                    userInfo1 = _c.sent();
                    newTopics1[i].portraitUrl = userInfo1.portraitUrl;
                    _c.label = 7;
                case 7: return [4 /*yield*/, fetch("https://api.cc98.org/Board/" + newTopics1[i].boardId)];
                case 8:
                    boardInfo0 = _c.sent();
                    return [4 /*yield*/, boardInfo0.json()];
                case 9:
                    boardInfo1 = _c.sent();
                    newTopics1[i].boardName = boardInfo1.name;
                    /**
                    *这些数据是伪造的
                    */
                    newTopics1[i].likeCount = 6;
                    newTopics1[i].dislikeCount = 3;
                    newTopics1[i].fanCount = 28;
                    _c.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 3];
                case 11:
                    newTopics = newTopics1;
                    return [2 /*return*/, newTopics];
            }
        });
    });
}
exports.getAllNewPost = getAllNewPost;
function setStorage(key, value) {
    var v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = 'obj-' + v;
    }
    else {
        v = 'str-' + v;
    }
    sessionStorage.setItem(key, v);
}
exports.setStorage = setStorage;
function getStorage(key) {
    var v = sessionStorage.getItem(key);
    if (!v) {
        return;
    }
    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        return JSON.parse(v);
    }
    else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}
exports.getStorage = getStorage;
//# sourceMappingURL=Utility.js.map