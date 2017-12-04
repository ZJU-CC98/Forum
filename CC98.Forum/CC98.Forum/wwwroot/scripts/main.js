/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var State = __webpack_require__(5);
var React = __webpack_require__(0);
//import { browserHistory } from 'react-router';
var Board_1 = __webpack_require__(15);
function getBoardTopicAsync(curPage, boardid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, startPage, endPage, totalTopicCountResponse, totalTopicCountJson, totalTopicCount, topicNumberInPage, boardtopics, url, headers, response, data, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    token = getLocalStorage("accessToken");
                    startPage = (curPage - 1) * 20;
                    endPage = curPage * 20 - 1;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + boardid)];
                case 1:
                    totalTopicCountResponse = _a.sent();
                    //找不到版面
                    if (totalTopicCountResponse.status == 404) {
                        //window.location.href = '/status/NotFoundBoard';
                    }
                    if (totalTopicCountResponse.status === 500) {
                        //window.location.href = '/status/ServerError';
                    }
                    return [4 /*yield*/, totalTopicCountResponse.json()];
                case 2:
                    totalTopicCountJson = _a.sent();
                    totalTopicCount = totalTopicCountJson.topicCount;
                    topicNumberInPage = void 0;
                    if (curPage * 20 <= totalTopicCount) {
                        topicNumberInPage = 20;
                    }
                    else if (curPage === 1 && totalTopicCount < 19) {
                        topicNumberInPage = totalTopicCount;
                    }
                    else {
                        topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
                    }
                    boardtopics = [];
                    url = "http://apitest.niconi.cc/Topic/Board/" + boardid + "?from=" + startPage + "&size=" + topicNumberInPage;
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 3:
                    response = _a.sent();
                    //无权限进版面
                    if (response.status === 401) {
                        //window.location.href = '/status/UnauthorizedBoard';
                    }
                    //版面不存在
                    if (response.status === 404) {
                        //window.location.href = '/status/NotFoundBoard';
                    }
                    if (response.status === 500) {
                        //window.location.href = '/status/ServerError';
                    }
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    for (i = 0; i < topicNumberInPage; i++) {
                        boardtopics[i] = __assign({}, data[i], { replyCount: data[i].replyCount || 0 });
                    }
                    return [2 /*return*/, boardtopics];
                case 5:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getBoardTopicAsync = getBoardTopicAsync;
function getTopic(topicid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, str, data, hitCountResponse, str, hitCountJson, hitCount, boardId, boardResponse, boardData, masters, topicMessage, userMesResponse, userMesJson, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Post/Topic/" + topicid + "?from=0&size=1", {
                            headers: headers
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 404)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    str = _a.sent();
                    switch (str) {
                        case 'topic_not_exists':
                            //window.location.href = "/status/NotFoundTopic";
                            break;
                        case 'topic_is_deleted':
                            //window.location.href = "/status/TopicDeleted";
                            break;
                        default:
                    }
                    _a.label = 3;
                case 3:
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Topic/" + topicid, { headers: headers })];
                case 5:
                    hitCountResponse = _a.sent();
                    if (!(hitCountResponse.status === 404)) return [3 /*break*/, 7];
                    return [4 /*yield*/, hitCountResponse.text()];
                case 6:
                    str = _a.sent();
                    switch (str) {
                        case 'topic_not_exists':
                            //window.location.href = "/status/NotFoundTopic";
                            break;
                        case 'topic_is_deleted':
                            //window.location.href = "/status/TopicDeleted";
                            break;
                        default:
                    }
                    _a.label = 7;
                case 7:
                    if (hitCountResponse.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (hitCountResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, hitCountResponse.json()];
                case 8:
                    hitCountJson = _a.sent();
                    hitCount = hitCountJson.hitCount;
                    boardId = hitCountJson.boardId;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/board/" + boardId, { headers: headers })];
                case 9:
                    boardResponse = _a.sent();
                    return [4 /*yield*/, boardResponse.json()];
                case 10:
                    boardData = _a.sent();
                    masters = boardData.boardMasters;
                    topicMessage = null;
                    if (!(data[0].isAnonymous != true)) return [3 /*break*/, 13];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/User/" + data[0].userId, { headers: headers })];
                case 11:
                    userMesResponse = _a.sent();
                    if (userMesResponse.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    return [4 /*yield*/, userMesResponse.json()];
                case 12:
                    userMesJson = _a.sent();
                    topicMessage = new State.TopicState(data[0].userName, data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl || 'https://www.cc98.org/pic/anonymous.gif', hitCount, data[0].userId, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType, data[0].isFollowing, userMesJson.fanCount, masters);
                    return [3 /*break*/, 14];
                case 13:
                    topicMessage = new State.TopicState('匿名' + data[0].userName.toUpperCase(), data[0].title, data[0].content, data[0].time, '', 'https://www.cc98.org/pic/anonymous.gif', hitCount, null, data[0].likeCount, data[0].dislikeCount, data[0].id, data[0].isAnonymous, data[0].contentType, data[0].isFollowing, -9898, masters);
                    _a.label = 14;
                case 14: return [2 /*return*/, topicMessage];
                case 15:
                    e_2 = _a.sent();
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
exports.getTopic = getTopic;
function getTopicContent(topicid, curPage, router) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, token, headers, topic, _a, replyCountResponse, replyCountJson, replyCount, content, post, topicNumberInPage, i, userMesResponse, userMesJson, purl, anonymousUserName, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 14, , 15]);
                    startPage = (curPage - 1) * 10;
                    endPage = curPage * 10 - 1;
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    if (!(curPage !== 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Post/Topic/" + topicid + "?from=" + startPage + "&size=10", { headers: headers })];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("http://apitest.niconi.cc/Post/Topic/" + topicid + "?from=1&size=9", { headers: headers })];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    topic = _a;
                    if (topic.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    //两种
                    if (topic.status === 404) {
                        //window.location.href = "/status/";
                    }
                    if (topic.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Topic/" + topicid, { headers: headers })];
                case 5:
                    replyCountResponse = _b.sent();
                    if (replyCountResponse.status == 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (replyCountResponse.status == 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    return [4 /*yield*/, replyCountResponse.json()];
                case 6:
                    replyCountJson = _b.sent();
                    replyCount = replyCountJson.replyCount;
                    return [4 /*yield*/, topic.json()];
                case 7:
                    content = _b.sent();
                    post = [];
                    topicNumberInPage = void 0;
                    if (curPage !== 1 && curPage * 10 <= replyCount) {
                        topicNumberInPage = 10;
                    }
                    else if (curPage === 1 && replyCount >= 9) {
                        topicNumberInPage = 9;
                    }
                    else if (curPage === 1 && replyCount < 9) {
                        topicNumberInPage = replyCount;
                    }
                    else {
                        topicNumberInPage = (replyCount - (curPage - 1) * 10 + 1);
                    }
                    i = 0;
                    _b.label = 8;
                case 8:
                    if (!(i < topicNumberInPage)) return [3 /*break*/, 13];
                    if (!(content[i].isAnonymous != true)) return [3 /*break*/, 11];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + content[i].userName)];
                case 9:
                    userMesResponse = _b.sent();
                    if (userMesResponse.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    return [4 /*yield*/, userMesResponse.json()];
                case 10:
                    userMesJson = _b.sent();
                    post[i] = __assign({}, content[i], userMesJson, { postId: content[i].id, userImgUrl: userMesJson.portraitUrl, sendTopicNumber: userMesJson.postCount, privilege: userMesJson.privilege, signature: userMesJson.signatureCode });
                    return [3 /*break*/, 12];
                case 11:
                    purl = 'https://www.cc98.org/pic/anonymous.gif';
                    anonymousUserName = "\u533F\u540D" + content[i].userName.toUpperCase();
                    post[i] = __assign({}, content[i], { userName: anonymousUserName, userImgUrl: purl, userId: null, signature: null, sendTopicNumber: null, postId: content[i].id, privilege: '匿名用户', isAnonymous: true });
                    _b.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 8];
                case 13:
                    console.log(post);
                    return [2 /*return*/, post];
                case 14:
                    e_3 = _b.sent();
                    console.error(e_3);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
exports.getTopicContent = getTopicContent;
function like(topicid, postid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/userlike?topicid=" + topicid + "&postid=" + postid, { method: "POST", headers: headers })];
                case 1:
                    response = _a.sent();
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_4 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.like = like;
function dislike(topicid, postid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/userdislike?topicid=" + topicid + "&postid=" + postid, { method: "POST", headers: headers })];
                case 1:
                    response = _a.sent();
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_5 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.dislike = dislike;
function getLikeStateAndCount(topicid, postid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/likeState?topicid=" + topicid + "&postid=" + postid, { headers: headers })];
                case 1:
                    response = _a.sent();
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_6 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getLikeStateAndCount = getLikeStateAndCount;
function getHotReplyContent(topicid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, content, post, topicNumberInPage, i, userMesResponse, userMesJson, purl, anonymousUserName, anonymousLastReplierName, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Post/Topic/Hot/" + topicid, { headers: headers })];
                case 1:
                    response = _a.sent();
                    //帖子不存在
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    //无权限进版面
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    content = _a.sent();
                    post = [];
                    topicNumberInPage = content.length;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < topicNumberInPage)) return [3 /*break*/, 8];
                    if (!(content[i].isAnonymous != true)) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + content[i].userName)];
                case 4:
                    userMesResponse = _a.sent();
                    if (userMesResponse.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    return [4 /*yield*/, userMesResponse.json()];
                case 5:
                    userMesJson = _a.sent();
                    post[i] = __assign({}, content[i], userMesJson);
                    return [3 /*break*/, 7];
                case 6:
                    purl = 'https://www.cc98.org/pic/anonymous.gif';
                    anonymousUserName = "\u533F\u540D" + content[i].userName.toUpperCase();
                    anonymousLastReplierName = "\u533F\u540D" + content[i].lastUpdateAuthor.toUpperCase();
                    post[i] = __assign({}, content[i], { userName: anonymousUserName, userImgUrl: purl, userId: null, lastUpdateAuthor: anonymousLastReplierName, signature: null, sendTopicNumber: null });
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/, post];
                case 9:
                    e_7 = _a.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getHotReplyContent = getHotReplyContent;
function getListPager(totalPage) {
    if (totalPage === 1) {
        return [];
    }
    else if (totalPage === 2) {
        return [1, 2];
    }
    else if (totalPage === 3) {
        return [1, 2, 3];
    }
    else if (totalPage === 4) {
        return [1, 2, 3, 4];
    }
    else if (totalPage === 5) {
        return [1, 2, 3, 4, 5];
    }
    else if (totalPage === 6) {
        return [1, 2, 3, 4, 5, 6];
    }
    else if (totalPage === 7) {
        return [1, 2, 3, 4, 5, 6, 7];
    }
    else {
        return [1, 2, 3, 4, -1, totalPage - 3, totalPage - 2, totalPage - 1];
    }
}
exports.getListPager = getListPager;
function convertHotTopic(item) {
    return React.createElement(Board_1.TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
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
            var i = void 0;
            for (i = 0; i < totalPage; i++) {
                pages[i] = i + 1;
            }
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else if (curPage == 2) {
            var i = void 0;
            for (i = 1; i <= totalPage; i++) {
                pages[i] = i;
            }
            pages[0] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else if (curPage != totalPage) {
            var i = void 0;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else {
            var i = void 0;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
        }
    }
    else {
        if (curPage + 5 <= totalPage) {
            if (curPage == undefined || curPage == 1) {
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -4];
            }
            else if (curPage > 1 && curPage < 6) {
                pages = [-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -4];
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
function getCurUserTopic(topicid, userId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, userMesResponse, userMesJson, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/Topic/user?topicid=" + topicid + "&userid=" + userId + "&from=0&size=1", { headers: headers })];
                case 1:
                    response = _a.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + data[0].userName)];
                case 3:
                    userMesResponse = _a.sent();
                    if (userMesResponse.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userMesResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userMesResponse.json()];
                case 4:
                    userMesJson = _a.sent();
                    data[0].userImgUrl = userMesJson.portraitUrl;
                    return [2 /*return*/, data[0]];
                case 5:
                    e_8 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getCurUserTopic = getCurUserTopic;
function getCurUserTopicContent(topicid, curPage, userName, userId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var topicMessage, start, isUserPoster, token, headers, topic, content, post, topicNumberInPage, replyCount, i, userMesResponse, userMesJson, purl, anonymousUserName, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, getTopic(topicid, router)];
                case 1:
                    topicMessage = _a.sent();
                    start = void 0;
                    isUserPoster = void 0;
                    if (topicMessage.userName === userName) {
                        isUserPoster = true;
                        if (curPage === 1)
                            start = (curPage - 1) * 10 + 1;
                        else
                            start = (curPage - 1) * 10;
                    }
                    else {
                        isUserPoster = false;
                        start = (curPage - 1) * 10;
                    }
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Post/Topic/user?topicid=" + topicid + "&userId=" + userId + "&from=" + start + "&size=10", { headers: headers })];
                case 2:
                    topic = _a.sent();
                    if (topic.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (topic.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (topic.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, topic.json()];
                case 3:
                    content = _a.sent();
                    post = [];
                    topicNumberInPage = void 0;
                    replyCount = content[0].count;
                    if (curPage !== 1 && curPage * 10 <= replyCount) {
                        topicNumberInPage = 10;
                    }
                    else if (curPage === 1 && replyCount >= 9 && isUserPoster == true) {
                        topicNumberInPage = 9;
                    }
                    else if (curPage === 1 && replyCount >= 9 && isUserPoster == false) {
                        topicNumberInPage = 10;
                    }
                    else if (curPage === 1 && replyCount < 9) {
                        topicNumberInPage = replyCount;
                    }
                    else {
                        topicNumberInPage = (replyCount - (curPage - 1) * 10);
                    }
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < topicNumberInPage)) return [3 /*break*/, 9];
                    if (!(content[i].isAnonymous != true)) return [3 /*break*/, 7];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + content[i].userName)];
                case 5:
                    userMesResponse = _a.sent();
                    if (userMesResponse.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    return [4 /*yield*/, userMesResponse.json()];
                case 6:
                    userMesJson = _a.sent();
                    post[i] = __assign({}, content[i], userMesJson, { postId: content[i].id, userImgUrl: userMesJson.portraitUrl, sendTopicNumber: userMesJson.postCount });
                    return [3 /*break*/, 8];
                case 7:
                    purl = 'https://www.cc98.org/pic/anonymous.gif';
                    anonymousUserName = "\u533F\u540D" + content[i].userName.toUpperCase();
                    post[i] = __assign({}, content[i], { userName: anonymousUserName, userImgUrl: purl, userId: null, signature: null, sendTopicNumber: null });
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/, post];
                case 10:
                    e_9 = _a.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getCurUserTopicContent = getCurUserTopicContent;
/**
 * 获取全站新帖
 * @param curPage
 */
function getAllNewTopic(from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var size, token, headers, response, newTopic, _a, _b, _i, i, userFan0, userFan1, userInfo0, userInfo1, _c, index, index, index, index, e_10;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 12, , 13]);
                    size = 20;
                    if (from > 80) {
                        size = 100 - from;
                    }
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/new?from=" + from + "&size=" + size, { headers: headers })];
                case 1:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    newTopic = _d.sent();
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    i = _a[_i];
                    if (!newTopic[i].userId) return [3 /*break*/, 9];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/follow/fanCount?userid=" + newTopic[i].userId)];
                case 4:
                    userFan0 = _d.sent();
                    if (userFan0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userFan0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userFan0.json()];
                case 5:
                    userFan1 = _d.sent();
                    newTopic[i].fanCount = userFan1;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/basic/" + newTopic[i].userId)];
                case 6:
                    userInfo0 = _d.sent();
                    if (userInfo0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userInfo0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userInfo0.json()];
                case 7:
                    userInfo1 = _d.sent();
                    newTopic[i].portraitUrl = userInfo1.portraitUrl;
                    //获取所在版面名称
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(newTopic[i].boardId, router)];
                case 8:
                    //获取所在版面名称
                    _c.boardName = _d.sent();
                    //阅读数转换
                    if (newTopic[i].hitCount > 10000) {
                        if (newTopic[i].hitCount > 100000) {
                            index = parseInt("" + newTopic[i].hitCount / 10000);
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].hitCount / 1000) / 10;
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                    }
                    //回复数转换
                    if (newTopic[i].replyCount > 10000) {
                        if (newTopic[i].replyCount > 100000) {
                            index = parseInt("" + newTopic[i].replyCount / 10000);
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].replyCount / 1000) / 10;
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                    }
                    return [3 /*break*/, 10];
                case 9:
                    newTopic[i].fanCount = 0;
                    newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                    newTopic[i].userName = "匿名用户";
                    newTopic[i].boardName = "心灵之约";
                    _d.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 3];
                case 11: return [2 /*return*/, newTopic];
                case 12:
                    e_10 = _d.sent();
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.getAllNewTopic = getAllNewTopic;
/**
 * 获取某个关注版面帖子
 * @param curPage
 */
function getFocusBoardTopic(boardId, boardName, from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var size, token, headers, response, newTopic, _a, _b, _i, i, userFan0, userFan1, userInfo0, userInfo1, _c, index, index, index, index, e_11;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 17, , 18]);
                    size = 20;
                    if (from > 80) {
                        size = 100 - from;
                    }
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    response = void 0;
                    if (!(boardId == 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/followusers?from=" + from + "&size=" + size, { headers: headers })];
                case 1:
                    response = _d.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/board/" + boardId + "?from=" + from + "&size=" + size, { headers: headers })];
                case 3:
                    response = _d.sent();
                    _d.label = 4;
                case 4:
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 5:
                    newTopic = _d.sent();
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 6;
                case 6:
                    if (!(_i < _a.length)) return [3 /*break*/, 16];
                    i = _a[_i];
                    if (!newTopic[i].userId) return [3 /*break*/, 14];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/follow/fanCount?userid=" + newTopic[i].userId)];
                case 7:
                    userFan0 = _d.sent();
                    if (userFan0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userFan0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userFan0.json()];
                case 8:
                    userFan1 = _d.sent();
                    newTopic[i].fanCount = userFan1;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/basic/" + newTopic[i].userId)];
                case 9:
                    userInfo0 = _d.sent();
                    if (userInfo0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userInfo0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userInfo0.json()];
                case 10:
                    userInfo1 = _d.sent();
                    newTopic[i].portraitUrl = userInfo1.portraitUrl;
                    if (!(boardId == 0)) return [3 /*break*/, 12];
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(newTopic[i].boardId, router)];
                case 11:
                    _c.boardName = _d.sent();
                    return [3 /*break*/, 13];
                case 12:
                    newTopic[i].boardName = boardName;
                    _d.label = 13;
                case 13:
                    //阅读数转换
                    if (newTopic[i].hitCount > 10000) {
                        if (newTopic[i].hitCount > 100000) {
                            index = parseInt("" + newTopic[i].hitCount / 10000);
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].hitCount / 1000) / 10;
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                    }
                    //回复数转换
                    if (newTopic[i].replyCount > 10000) {
                        if (newTopic[i].replyCount > 100000) {
                            index = parseInt("" + newTopic[i].replyCount / 10000);
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].replyCount / 1000) / 10;
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                    }
                    return [3 /*break*/, 15];
                case 14:
                    newTopic[i].fanCount = 0;
                    newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                    newTopic[i].userName = "匿名用户";
                    newTopic[i].boardName = "心灵之约";
                    _d.label = 15;
                case 15:
                    _i++;
                    return [3 /*break*/, 6];
                case 16: return [2 /*return*/, newTopic];
                case 17:
                    e_11 = _d.sent();
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.getFocusBoardTopic = getFocusBoardTopic;
/**
 * 获取全部关注版面帖子
 */
function getFocusTopic(from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var size, token, headers, response, newTopic, _a, _b, _i, i, userFan0, userFan1, userInfo0, userInfo1, _c, index, index, index, index, e_12;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 12, , 13]);
                    size = 20;
                    if (from > 80) {
                        size = 100 - from;
                    }
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/customboards?from=" + from + "&size=" + size, { headers: headers })];
                case 1:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    newTopic = _d.sent();
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    i = _a[_i];
                    if (!newTopic[i].userId) return [3 /*break*/, 9];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/follow/fanCount?userid=" + newTopic[i].userId)];
                case 4:
                    userFan0 = _d.sent();
                    if (userFan0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userFan0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userFan0.json()];
                case 5:
                    userFan1 = _d.sent();
                    newTopic[i].fanCount = userFan1;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/basic/" + newTopic[i].userId)];
                case 6:
                    userInfo0 = _d.sent();
                    if (userInfo0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userInfo0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userInfo0.json()];
                case 7:
                    userInfo1 = _d.sent();
                    newTopic[i].portraitUrl = userInfo1.portraitUrl;
                    //获取所在版面名称
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(newTopic[i].boardId, router)];
                case 8:
                    //获取所在版面名称
                    _c.boardName = _d.sent();
                    //阅读数转换
                    if (newTopic[i].hitCount > 10000) {
                        if (newTopic[i].hitCount > 100000) {
                            index = parseInt("" + newTopic[i].hitCount / 10000);
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].hitCount / 1000) / 10;
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                    }
                    //回复数转换
                    if (newTopic[i].replyCount > 10000) {
                        if (newTopic[i].replyCount > 100000) {
                            index = parseInt("" + newTopic[i].replyCount / 10000);
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].replyCount / 1000) / 10;
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                    }
                    return [3 /*break*/, 10];
                case 9:
                    newTopic[i].fanCount = 0;
                    newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                    newTopic[i].userName = "匿名用户";
                    newTopic[i].boardName = "心灵之约";
                    _d.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 3];
                case 11: return [2 /*return*/, newTopic];
                case 12:
                    e_12 = _d.sent();
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.getFocusTopic = getFocusTopic;
//与缓存相关的函数
function setStorage(key, value) {
    var v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = "obj-" + v;
    }
    else {
        v = "str-" + v;
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
function setLocalStorage(key, value, expireIn) {
    if (expireIn === void 0) { expireIn = 0; }
    var v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = "obj-" + v;
    }
    else {
        v = "str-" + v;
    }
    localStorage.setItem(key, v);
    if (expireIn !== 0) {
        var now = new Date().getTime();
        var expirationTime = now + expireIn * 1000;
        localStorage.setItem(key + "_expirationTime", expirationTime.toString().slice(0, expirationTime.toString().length - 3));
    }
    else {
        localStorage.removeItem(key + "_expirationTime");
    }
}
exports.setLocalStorage = setLocalStorage;
function getLocalStorage(key) {
    var v = localStorage.getItem(key);
    var expirationTime = localStorage.getItem(key + "_expirationTime");
    if (expirationTime) {
        var now = new Date().getTime();
        var time = Number.parseInt(expirationTime) * 1000;
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
    }
    else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}
exports.getLocalStorage = getLocalStorage;
function removeLocalStorage(key) {
    if (key != 'all') {
        localStorage.removeItem(key);
    }
    else {
        localStorage.clear();
    }
    return;
}
exports.removeLocalStorage = removeLocalStorage;
function removeStorage(key) {
    if (key != 'all') {
        sessionStorage.removeItem(key);
    }
    else {
        sessionStorage.clear();
    }
    return;
}
exports.removeStorage = removeStorage;
/*
* 根据boardId返回boardName
*/
function getBoardName(boardId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var boardName, token, headers, url, res, data, e_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    boardName = void 0;
                    boardName = getLocalStorage("boardId_" + boardId);
                    if (!!boardName) return [3 /*break*/, 3];
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    url = "http://apitest.niconi.cc/board/" + boardId;
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    res = _a.sent();
                    if (res.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (res.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    boardName = data.name;
                    setLocalStorage("boardId_" + boardId, boardName);
                    _a.label = 3;
                case 3: return [2 /*return*/, boardName];
                case 4:
                    e_13 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getBoardName = getBoardName;
/*
* 返回用户是否登陆
*/
function isLogOn() {
    var token = getLocalStorage("accessToken");
    return !!token;
}
exports.isLogOn = isLogOn;
/*
* 获取最近N个联系人的信息
*/
function getRecentContact(from, size, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, recentContactId, url, i, response1, recentContact, i, e_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/message/recentcontactusers?from=" + from + "&size=" + size, { headers: headers })];
                case 1:
                    response = _a.sent();
                    if (response.status === 401) {
                        ////window.location.href="/status/Loggout");
                    }
                    if (response.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    recentContactId = _a.sent();
                    url = "http://apitest.niconi.cc/user/basic";
                    for (i in recentContactId) {
                        if (i == "0") {
                            url = url + "?id=" + recentContactId[i];
                        }
                        else {
                            url = url + "&id=" + recentContactId[i];
                        }
                    }
                    return [4 /*yield*/, fetch(url)];
                case 3:
                    response1 = _a.sent();
                    if (response1.status === 404) {
                        ////window.location.href="/status/NotFoundUser");
                    }
                    if (response1.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    return [4 /*yield*/, response1.json()];
                case 4:
                    recentContact = _a.sent();
                    for (i in recentContact) {
                        recentContact[i].message = [];
                    }
                    console.log(recentContact);
                    return [2 /*return*/, recentContact];
                case 5:
                    e_14 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getRecentContact = getRecentContact;
/*
* 获取最近N个联系人的信息
*/
function getRecentMessage(userId, from, size, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response0, response1, recentMessage, e_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/message/" + userId + "?from=" + from + "&size=" + size, { headers: headers })];
                case 1:
                    response0 = _a.sent();
                    if (response0.status === 401) {
                        ////window.location.href="/status/Logout");
                    }
                    if (response0.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    return [4 /*yield*/, response0.json()];
                case 2:
                    response1 = _a.sent();
                    console.log("直接获取到的Message");
                    console.log(response1);
                    recentMessage = sortRecentMessage(response1);
                    return [2 /*return*/, recentMessage];
                case 3:
                    e_15 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getRecentMessage = getRecentMessage;
/**
 * 处理最新消息列表，时间间隔短的消息只显示第一条消息的时间
 * @param recentMessage
 */
function sortRecentMessage(recentMessage) {
    console.log(recentMessage);
    if (recentMessage == [] || !recentMessage) {
        return recentMessage;
    }
    else {
        for (var i = 0; i < recentMessage.length; i++) {
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
exports.sortRecentMessage = sortRecentMessage;
/**
 * api返回的时间格式转换成时间戳的函数
 * @param time
 */
function transerTime(time) {
    var timeStr = moment(time).format('YYYY-MM-DD HH:mm:ss');
    var timeDate = timeStr.replace(/-/g, '/');
    var timestamp = new Date(timeDate).getTime();
    return timestamp;
}
exports.transerTime = transerTime;
/**
 * 对联系人列表重新排序，看是否有从其他页面发起的聊天
 * @param recentContact
 */
function sortContactList(recentContact, router) {
    return __awaiter(this, void 0, void 0, function () {
        var urlId, chatManId, i, indexData, response, chatMan, flag, e_16, _a, chatContact, urlName, chatManName, i, indexData, response0, response1, flag, e_17, chatMan, _b, chatContact;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    urlId = location.href.match(/id=(\S+)/);
                    if (!urlId) return [3 /*break*/, 10];
                    chatManId = parseInt(urlId[1]);
                    //先看一下该聊天对象在不在联系人列表里
                    for (i = 0; i < recentContact.length; i++) {
                        if (recentContact[i].id == chatManId) {
                            break;
                        }
                    }
                    if (!(i == 0)) return [3 /*break*/, 1];
                    return [3 /*break*/, 9];
                case 1:
                    if (!(i < recentContact.length)) return [3 /*break*/, 2];
                    indexData = recentContact[i];
                    recentContact.splice(i, 1);
                    recentContact.unshift(indexData);
                    return [3 /*break*/, 9];
                case 2:
                    response = void 0;
                    chatMan = void 0;
                    flag = 1;
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/basic/" + chatManId)];
                case 4:
                    response = _c.sent();
                    if (response.status === 404) {
                        ////window.location.href="/status/NotFoundUser");
                    }
                    if (response.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    return [4 /*yield*/, response.json()];
                case 5:
                    chatMan = _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_16 = _c.sent();
                    ////window.location.href="/status/Disconnected");
                    flag = 0;
                    return [3 /*break*/, 7];
                case 7:
                    if (!(flag == 1)) return [3 /*break*/, 9];
                    _a = chatMan;
                    return [4 /*yield*/, getRecentMessage(chatMan.id, 0, 10, router)];
                case 8:
                    _a.message = _c.sent();
                    if (chatMan.message) {
                        chatMan.lastContent = chatMan.message[0];
                    }
                    chatContact = [chatMan];
                    recentContact = chatContact.concat(recentContact);
                    _c.label = 9;
                case 9: return [3 /*break*/, 19];
                case 10:
                    urlName = location.href.match(/name=(\S+)/);
                    if (!urlName) return [3 /*break*/, 19];
                    chatManName = urlName[1];
                    //先看一下该聊天对象在不在联系人列表里
                    for (i = 0; i < recentContact.length; i++) {
                        if (recentContact[i].name == chatManName) {
                            break;
                        }
                    }
                    if (!(i == 0)) return [3 /*break*/, 11];
                    return [3 /*break*/, 19];
                case 11:
                    if (!(i < recentContact.length)) return [3 /*break*/, 12];
                    indexData = recentContact[i];
                    recentContact.splice(i, 1);
                    recentContact.unshift(indexData);
                    return [3 /*break*/, 19];
                case 12:
                    response0 = void 0;
                    response1 = void 0;
                    flag = 1;
                    _c.label = 13;
                case 13:
                    _c.trys.push([13, 16, , 17]);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + chatManName)];
                case 14:
                    response0 = _c.sent();
                    if (response0.status === 404) {
                        ////window.location.href="/status/NotFoundUser");
                    }
                    if (response0.status === 500) {
                        ////window.location.href="/status/ServerError");
                    }
                    return [4 /*yield*/, response0.json()];
                case 15:
                    response1 = _c.sent();
                    return [3 /*break*/, 17];
                case 16:
                    e_17 = _c.sent();
                    ////window.location.href="/status/Disconnected");
                    flag = 0;
                    return [3 /*break*/, 17];
                case 17:
                    if (!(flag == 1)) return [3 /*break*/, 19];
                    chatMan = { id: null, name: '', portraitUrl: '', message: [], lastContent: '' };
                    chatMan.id = response1.id;
                    chatMan.name = response1.name;
                    chatMan.portraitUrl = response1.portraitUrl;
                    _b = chatMan;
                    return [4 /*yield*/, getRecentMessage(chatMan.id, 0, 10, router)];
                case 18:
                    _b.message = _c.sent();
                    if (chatMan.message) {
                        chatMan.lastContent = chatMan.message[0];
                    }
                    chatContact = [chatMan];
                    recentContact = chatContact.concat(recentContact);
                    _c.label = 19;
                case 19: return [2 /*return*/, recentContact];
            }
        });
    });
}
exports.sortContactList = sortContactList;
function getTotalReplyCount(topicid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, replyCountResponse, replyCountJson, replyCount, e_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Topic/" + topicid, { headers: headers })];
                case 1:
                    replyCountResponse = _a.sent();
                    if (replyCountResponse.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (replyCountResponse.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (replyCountResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, replyCountResponse.json()];
                case 2:
                    replyCountJson = _a.sent();
                    replyCount = replyCountJson.replyCount;
                    if (replyCount >= 10) {
                        return [2 /*return*/, (replyCount - replyCount % 10) / 10 + 1];
                    }
                    else {
                        return [2 /*return*/, 1];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_18 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTotalReplyCount = getTotalReplyCount;
function getCategory(topicid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, topicName, boardId, boardResponse, boardData, boardName, body, e_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Topic/" + topicid, { headers: headers })];
                case 1:
                    response = _a.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    topicName = data.title;
                    boardId = data.boardId;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + boardId, { headers: headers })];
                case 3:
                    boardResponse = _a.sent();
                    return [4 /*yield*/, boardResponse.json()];
                case 4:
                    boardData = _a.sent();
                    boardName = boardData.name;
                    body = { boardId: boardId, topicId: topicid, boardName: boardName, title: topicName };
                    return [2 /*return*/, body];
                case 5:
                    e_19 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getCategory = getCategory;
function getUserDetails(userName, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, url, message, data, body, e_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    url = "http://apitest.niconi.cc/user/name/" + userName;
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    message = _a.sent();
                    if (message.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                        return [2 /*return*/, null];
                    }
                    if (message.status === 500) {
                        //window.location.href = "/status/ServerError";
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, message.json()];
                case 2:
                    data = _a.sent();
                    body = { portraitUrl: data.portraitUrl, userName: data.name, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing };
                    return [2 /*return*/, body];
                case 3:
                    e_20 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserDetails = getUserDetails;
function getLikeState(topicid, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, topic, postId, response, data, e_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, getTopic(topicid, router)];
                case 1:
                    topic = _a.sent();
                    postId = topic.postId;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/likestate?topicid=" + topicid + "&postid=" + postId, { headers: headers })];
                case 2:
                    response = _a.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 403) {
                        //window.location.href = "/status/OperationForbidden";
                    }
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundTopic";
                    }
                    if (!(response.status === 500)) return [3 /*break*/, 3];
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_21 = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getLikeState = getLikeState;
function refreshLikeState(topicId, postId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, e_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/likestate?topicid=" + topicId + "&postid=" + postId, { headers: headers })];
                case 1:
                    response = _a.sent();
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_22 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.refreshLikeState = refreshLikeState;
function sendTopic(topicId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var url, c, content, contentJson, token, myHeaders, mes, e_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = "http://apitest.niconi.cc/post/topic/" + topicId;
                    c = testEditor.getMarkdown();
                    content = {
                        content: c,
                        contentType: 1,
                        title: ""
                    };
                    contentJson = JSON.stringify(content);
                    token = getLocalStorage("accessToken");
                    myHeaders = new Headers();
                    myHeaders.append("Authorization", token);
                    myHeaders.append("Content-Type", 'application/json');
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: myHeaders,
                            body: contentJson
                        })];
                case 1:
                    mes = _a.sent();
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
                    return [3 /*break*/, 3];
                case 2:
                    e_23 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.sendTopic = sendTopic;
function getListCategory(boardId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, boardResponse, boardData, boardName, e_24;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + boardId, { headers: headers })];
                case 1:
                    boardResponse = _a.sent();
                    if (boardResponse.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (boardResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, boardResponse.json()];
                case 2:
                    boardData = _a.sent();
                    boardName = boardData.name;
                    return [2 /*return*/, boardName];
                case 3:
                    e_24 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getListCategory = getListCategory;
function getBoardMessage(boardId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, url, response, data, e_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    url = "http://apitest.niconi.cc/Board/" + boardId;
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_25 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getBoardMessage = getBoardMessage;
function getListTotalPage(boardId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, totalTopicCountResponse, totalTopicCountJson, totalTopicCount, e_26;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + boardId, { headers: headers })];
                case 1:
                    totalTopicCountResponse = _a.sent();
                    if (totalTopicCountResponse.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (totalTopicCountResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, totalTopicCountResponse.json()];
                case 2:
                    totalTopicCountJson = _a.sent();
                    totalTopicCount = totalTopicCountJson.topicCount;
                    return [2 /*return*/, (totalTopicCount - totalTopicCount % 20) / 20 + 1];
                case 3:
                    e_26 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getListTotalPage = getListTotalPage;
function getBasicBoardMessage(boardId, curPage, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, json, bigPaper, page, boardid, totalPage, data, e_27;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + boardId, { headers: headers })];
                case 1:
                    response = _a.sent();
                    if (response.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    bigPaper = json.bigPaper;
                    page = void 0;
                    // 未提供页码，防止出错不进行后续处理
                    if (!curPage) {
                        page = 1;
                    }
                    else {
                        page = parseInt(curPage);
                    }
                    boardid = boardId;
                    return [4 /*yield*/, getListTotalPage(boardid, router)];
                case 3:
                    totalPage = _a.sent();
                    data = { bigPaper: bigPaper, totalPage: totalPage, page: page };
                    return [2 /*return*/, data];
                case 4:
                    e_27 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getBasicBoardMessage = getBasicBoardMessage;
function getCurUserTotalReplyPage(topicId, userId, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, replyCountResponse, replyCountJson, replyCount, e_28;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/post/topic/user?topicid=" + topicId + "&userid=" + userId + "&from=0&size=1", { headers: headers })];
                case 1:
                    replyCountResponse = _a.sent();
                    if (replyCountResponse.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (replyCountResponse.status === 404) {
                        //window.location.href = "/status/NotFoundBoard";
                    }
                    if (replyCountResponse.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, replyCountResponse.json()];
                case 2:
                    replyCountJson = _a.sent();
                    replyCount = replyCountJson[0].count;
                    if (replyCount > 10) {
                        return [2 /*return*/, (replyCount - replyCount % 10) / 10 + 1];
                    }
                    else {
                        return [2 /*return*/, 1];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_28 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getCurUserTotalReplyPage = getCurUserTotalReplyPage;
/**
 * 发送私信的函数
 * @param bodyContent
 */
function sendMessage(bodyContent, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, myHeaders, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    myHeaders.append('content-type', 'application/json');
                    return [4 /*yield*/, fetch('http://apitest.niconi.cc/message/send', {
                            method: 'POST',
                            headers: myHeaders,
                            body: bodyContent
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/Loggout";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.sendMessage = sendMessage;
/**
*滚动条在Y轴上的滚动距离,为isBottom()服务
*/
function getScrollTop() {
    var scrollTop = 0;
    var bodyScrollTop = 0;
    var documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
exports.getScrollTop = getScrollTop;
/**
*文档的总高度，为isBottom()服务
*/
function getScrollHeight() {
    var scrollHeight = 0;
    var bodyScrollHeight = 0;
    var documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
exports.getScrollHeight = getScrollHeight;
/**
*浏览器视口的高度，为isBottom()服务
*/
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    }
    else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
exports.getWindowHeight = getWindowHeight;
/**
*判断滚动条是否滚动到底部
*/
function isBottom() {
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
exports.isBottom = isBottom;
/**
 * 上传文件
 * @param file
 */
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, myHeaders, formdata, res, data, e_29;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "http://apitest.niconi.cc/file";
                    token = getLocalStorage('accessToken');
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    formdata = new FormData();
                    formdata.append('files', file, file.name);
                    formdata.append('contentType', "multipart/form-data");
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: myHeaders,
                            body: formdata
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (res.status === 200 && data.length !== 0) {
                        return [2 /*return*/, {
                                isSuccess: true,
                                content: data[0]
                            }];
                    }
                    else {
                        throw {};
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_29 = _a.sent();
                    return [2 /*return*/, {
                            isSuccess: false,
                            content: ''
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;
/**
 * 关注指定id的用户
 * @param userId
 */
function followUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, url, headers, res, e_30;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = getLocalStorage("accessToken");
                    url = "http://apitest.niconi.cc/user/follow/" + userId;
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: headers
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status === 200) {
                        return [2 /*return*/, true];
                    }
                    else {
                        throw {};
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_30 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.followUser = followUser;
/**
 * 取关指定id的用户
 * @param userId
 */
function unfollowUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, url, headers, res, e_31;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = getLocalStorage("accessToken");
                    url = "http://apitest.niconi.cc/user/unfollow/" + userId;
                    headers = new Headers();
                    headers.append('Authorization', token);
                    return [4 /*yield*/, fetch(url, {
                            method: 'DELETE',
                            headers: headers
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status === 200) {
                        return [2 /*return*/, true];
                    }
                    else {
                        throw {};
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_31 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.unfollowUser = unfollowUser;
function GetTopTopics(boardId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, url, response, data, topics, i, i, j, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    url = "http://apitest.niconi.cc/topic/toptopics?boardid=" + boardId;
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    topics = [];
                    for (i = 0; i < data.length; i++) {
                        topics[i] = __assign({}, data[i], { replyCount: data[i].replyCount || 0 });
                    }
                    for (i = 0; i < topics.length - 1; i++) {
                        for (j = 0; j < topics.length - 1 - i; j++) {
                            if (topics[j].topState <= topics[j + 1].topState) {
                                console.log("in");
                                temp = topics[j];
                                topics[j] = topics[j + 1];
                                topics[j + 1] = temp;
                            }
                        }
                    }
                    console.log(topics);
                    return [2 /*return*/, topics];
            }
        });
    });
}
exports.GetTopTopics = GetTopTopics;
function getBestTopics(curPage, boardId) {
    return __awaiter(this, void 0, void 0, function () {
        var start, url, token, headers, response, data, boardtopics, i, totalPage, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = (curPage - 1) * 20;
                    url = "http://apitest.niconi.cc/topic/best/board/" + boardId + "?from=" + start + "&size=20";
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    boardtopics = [];
                    for (i = 0; i < data.topics.length; i++) {
                        boardtopics[i] = __assign({}, data.topics[i], { replyCount: data.topics[i].replyCount || 0 });
                    }
                    totalPage = data.count % 20 === 0 ? data.count / 20 : (data.count - data.count % 20) / 20 + 1;
                    obj = { boardtopics: boardtopics, totalPage: totalPage };
                    return [2 /*return*/, obj];
            }
        });
    });
}
exports.getBestTopics = getBestTopics;
function getSaveTopics(curPage, boardId) {
    return __awaiter(this, void 0, void 0, function () {
        var start, url, token, headers, response, data, boardtopics, i, totalPage, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = (curPage - 1) * 20;
                    url = "http://apitest.niconi.cc/topic/save/board/" + boardId + "?from=" + start + "&size=20";
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    boardtopics = [];
                    for (i = 0; i < data.length; i++) {
                        boardtopics[i] = __assign({}, data.topics[i], { replyCount: data.topics[i].replyCount || 0 });
                    }
                    totalPage = data.count % 20 === 0 ? data.count / 20 : (data.count - data.count % 20) / 20 + 1;
                    obj = { boardtopics: boardtopics, totalPage: totalPage };
                    return [2 /*return*/, obj];
            }
        });
    });
}
exports.getSaveTopics = getSaveTopics;
/**
 * 搜索指定关键词主题
 * @param boardId
 * @param words
 * @param from
 * @param rouer
 */
function getSearchTopic(boardId, words, from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, bodyCotent, myHeaders, size, newTopic, response, response, _a, _b, _i, i, userFan0, userFan1, userInfo0, userInfo1, _c, index, index, index, index, e_32;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("开始获取搜索结果了");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 19, , 20]);
                    token = getLocalStorage("accessToken");
                    bodyCotent = JSON.stringify(words);
                    console.log("下面是body");
                    console.log(bodyCotent);
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    myHeaders.append('content-type', 'application/json');
                    size = 20;
                    newTopic = void 0;
                    if (!(boardId == 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/search?from=" + from + "&size=" + size, {
                            method: 'POST',
                            headers: myHeaders,
                            body: bodyCotent
                        })];
                case 2:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    newTopic = _d.sent();
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/search/board/" + boardId + "?from=" + from + "&size=" + size, {
                        method: 'POST',
                        headers: myHeaders,
                        body: bodyCotent
                    })];
                case 5:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 6:
                    newTopic = _d.sent();
                    _d.label = 7;
                case 7:
                    if (!(newTopic && newTopic != [])) return [3 /*break*/, 17];
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 8;
                case 8:
                    if (!(_i < _a.length)) return [3 /*break*/, 16];
                    i = _a[_i];
                    if (!newTopic[i].userId) return [3 /*break*/, 14];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/follow/fanCount?userid=" + newTopic[i].userId)];
                case 9:
                    userFan0 = _d.sent();
                    if (userFan0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userFan0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userFan0.json()];
                case 10:
                    userFan1 = _d.sent();
                    newTopic[i].fanCount = userFan1;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/basic/" + newTopic[i].userId)];
                case 11:
                    userInfo0 = _d.sent();
                    if (userInfo0.status === 404) {
                        //window.location.href = "/status/NotFoundUser";
                    }
                    if (userInfo0.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, userInfo0.json()];
                case 12:
                    userInfo1 = _d.sent();
                    newTopic[i].portraitUrl = userInfo1.portraitUrl;
                    //获取所在版面名称
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(newTopic[i].boardId, router)];
                case 13:
                    //获取所在版面名称
                    _c.boardName = _d.sent();
                    //阅读数转换
                    if (newTopic[i].hitCount > 10000) {
                        if (newTopic[i].hitCount > 100000) {
                            index = parseInt("" + newTopic[i].hitCount / 10000);
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].hitCount / 1000) / 10;
                            newTopic[i].hitCount = index + "\u4E07";
                        }
                    }
                    //回复数转换
                    if (newTopic[i].replyCount > 10000) {
                        if (newTopic[i].replyCount > 100000) {
                            index = parseInt("" + newTopic[i].replyCount / 10000);
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                        else {
                            index = parseInt("" + newTopic[i].replyCount / 1000) / 10;
                            newTopic[i].replyCount = index + "\u4E07";
                        }
                    }
                    return [3 /*break*/, 15];
                case 14:
                    newTopic[i].fanCount = 0;
                    newTopic[i].portraitUrl = "http://www.cc98.org/pic/anonymous.gif";
                    newTopic[i].userName = "匿名";
                    newTopic[i].boardName = "心灵之约";
                    _d.label = 15;
                case 15:
                    _i++;
                    return [3 /*break*/, 8];
                case 16: return [2 /*return*/, newTopic];
                case 17: return [2 /*return*/, 0];
                case 18: return [3 /*break*/, 20];
                case 19:
                    e_32 = _d.sent();
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.getSearchTopic = getSearchTopic;
function getMasters(topicId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, response, data, boardId, boardResponse, boardData, masters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/Topic/" + topicId, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    boardId = data.boardId;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/board/" + boardId, { headers: headers })];
                case 3:
                    boardResponse = _a.sent();
                    return [4 /*yield*/, boardResponse.json()];
                case 4:
                    boardData = _a.sent();
                    masters = boardData.boardMasters;
                    return [2 /*return*/, masters];
            }
        });
    });
}
exports.getMasters = getMasters;
function awardWealth(reason, value, postId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, body, str, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append("Content-Type", "application/json");
                    body = {
                        reason: reason,
                        value: value
                    };
                    str = JSON.stringify(body);
                    url = "http://apitest.niconi.cc/manage/bonus/wealth?postid=" + postId;
                    return [4 /*yield*/, fetch(url, { method: "PUT", headers: headers, body: str })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.awardWealth = awardWealth;
function getAwardInfo(postId, page) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, start, size, url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    start = (page - 1) * 10;
                    size = 10;
                    url = "http://apitest.niconi.cc/post/awards?postid=" + postId + "&from=" + start + "&size=" + size;
                    return [4 /*yield*/, fetch(url, { headers: headers })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getAwardInfo = getAwardInfo;
function getPortraitUrl(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://apitest.niconi.cc/user/name/" + userName;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.portraitUrl];
            }
        });
    });
}
exports.getPortraitUrl = getPortraitUrl;
function getBoardId(boardName) {
    var boardInfo = [
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
    var boardResult = [];
    //看是否包含
    for (var i in boardInfo) {
        if (boardInfo[i].name.indexOf(boardName) > -1) {
            boardResult.push({ id: boardInfo[i].id, name: boardInfo[i].name });
        }
    }
    return boardResult;
}
exports.getBoardId = getBoardId;
function isFollowThisBoard(boardId) {
    var customBoards = getLocalStorage("userInfo").customBoards;
    if (!customBoards)
        return false;
    for (var _i = 0, customBoards_1 = customBoards; _i < customBoards_1.length; _i++) {
        var item = customBoards_1[_i];
        if (item === boardId)
            return true;
    }
    return false;
}
exports.isFollowThisBoard = isFollowThisBoard;
function followBoard(boardId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    url = "http://apitest.niconi.cc/me/addcustomboard/" + boardId;
                    return [4 /*yield*/, fetch(url, { method: "POST", headers: headers })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.followBoard = followBoard;
function unfollowBoard(boardId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    url = "http://apitest.niconi.cc/me/removecustomboard/" + boardId;
                    return [4 /*yield*/, fetch(url, { method: "DELETE", headers: headers })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.unfollowBoard = unfollowBoard;
//获取系统通知
function getMessageSystem(from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, myHeaders, size, response, newTopic, e_33;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("开始获取系统通知了");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    token = getLocalStorage("accessToken");
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    size = 10;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/notification/system?from=" + from + "&size=" + size, { headers: myHeaders })];
                case 2:
                    response = _a.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    newTopic = _a.sent();
                    console.log(newTopic);
                    return [2 /*return*/, newTopic];
                case 4:
                    e_33 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getMessageSystem = getMessageSystem;
//获取回复我的通知
function getMessageResponse(from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, myHeaders, size, response, newTopic, _a, _b, _i, i, response0, response1, _c, e_34;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("开始获取回复我的通知了");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 10, , 11]);
                    token = getLocalStorage("accessToken");
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    size = 10;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/notification/reply?from=" + from + "&size=" + size, { headers: myHeaders })];
                case 2:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    newTopic = _d.sent();
                    console.log(newTopic);
                    if (!newTopic) return [3 /*break*/, 9];
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    i = _a[_i];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/" + newTopic[i].topicId, { headers: myHeaders })];
                case 5:
                    response0 = _d.sent();
                    return [4 /*yield*/, response0.json()];
                case 6:
                    response1 = _d.sent();
                    console.log(response1);
                    newTopic[i].topicTitle = response1.title;
                    newTopic[i].boardId = response1.boardId;
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(response1.boardId, router)];
                case 7:
                    _c.boardName = _d.sent();
                    _d.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/, newTopic];
                case 10:
                    e_34 = _d.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getMessageResponse = getMessageResponse;
//获取回复我的通知
function getMessageAttme(from, router) {
    return __awaiter(this, void 0, void 0, function () {
        var token, myHeaders, size, response, newTopic, _a, _b, _i, i, response0, response1, _c, e_35;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("开始获取@我的通知了");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 10, , 11]);
                    token = getLocalStorage("accessToken");
                    myHeaders = new Headers();
                    myHeaders.append('Authorization', token);
                    size = 10;
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/notification/at?from=" + from + "&size=" + size, { headers: myHeaders })];
                case 2:
                    response = _d.sent();
                    if (response.status === 401) {
                        //window.location.href = "/status/UnauthorizedTopic";
                    }
                    if (response.status === 500) {
                        //window.location.href = "/status/ServerError";
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    newTopic = _d.sent();
                    console.log(newTopic);
                    if (!newTopic) return [3 /*break*/, 9];
                    _a = [];
                    for (_b in newTopic)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    i = _a[_i];
                    return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/" + newTopic[i].topicId, { headers: myHeaders })];
                case 5:
                    response0 = _d.sent();
                    return [4 /*yield*/, response0.json()];
                case 6:
                    response1 = _d.sent();
                    console.log(response1);
                    newTopic[i].topicTitle = response1.title;
                    newTopic[i].boardId = response1.boardId;
                    _c = newTopic[i];
                    return [4 /*yield*/, getBoardName(response1.boardId, router)];
                case 7:
                    _c.boardName = _d.sent();
                    _d.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/, newTopic];
                case 10:
                    e_35 = _d.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getMessageAttme = getMessageAttme;
function plus1(topicId, postId, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, headers, bodyinfo, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://apitest.niconi.cc/post/userrating?topicid=" + topicId + "&postid=" + postId;
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append("Content-Type", "application/json");
                    bodyinfo = { value: 1, reason: reason };
                    body = JSON.stringify(bodyinfo);
                    return [4 /*yield*/, fetch(url, { method: "PUT", headers: headers, body: body })];
                case 1:
                    response = _a.sent();
                    console.log("plus1");
                    return [2 /*return*/];
            }
        });
    });
}
exports.plus1 = plus1;
function minus1(topicId, postId, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, headers, bodyinfo, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://apitest.niconi.cc/post/userrating?topicid=" + topicId + "&postid=" + postId;
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append("Content-Type", "application/json");
                    bodyinfo = { value: -1, reason: reason };
                    body = JSON.stringify(bodyinfo);
                    return [4 /*yield*/, fetch(url, { method: "PUT", headers: headers, body: body })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.minus1 = minus1;
function addPrestige(postId, value, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, bodyinfo, url, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append("Content-Type", "application/json");
                    bodyinfo = { value: value, reason: reason };
                    url = "http://apitest.niconi.cc/manage/bonus/prestige?postid=" + postId;
                    body = JSON.stringify(bodyinfo);
                    return [4 /*yield*/, fetch(url, { method: "PUT", headers: headers, body: body })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPrestige = addPrestige;
function deletePost(topicId, postId, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var token, headers, bodyinfo, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getLocalStorage("accessToken");
                    headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append("Content-Type", 'application/json');
                    bodyinfo = { reason: reason };
                    url = "http://apitest.niconi.cc/manage/post?topicid=" + topicId + "&postid=" + postId;
                    return [4 /*yield*/, fetch(url, { method: "DELETE", headers: headers, body: JSON.stringify(bodyinfo) })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deletePost = deletePost;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 提供 UBB 处理上下文所需要的相关数据。
 */
var UbbCodeContextData = /** @class */ (function () {
    function UbbCodeContextData() {
    }
    return UbbCodeContextData;
}());
exports.UbbCodeContextData = UbbCodeContextData;
/**
 * 处理 UBB 编码时可用于存储相关信息的上下文对象。
 */
var UbbCodeContext = /** @class */ (function () {
    /**
     * 初始化一个上下文对象的新实例。
     * @param engine 引擎对象。
     * @param options 处理选项。
     */
    function UbbCodeContext(engine, options) {
        this._engine = engine;
        this._options = options;
    }
    Object.defineProperty(UbbCodeContext.prototype, "engine", {
        /**
         * 获取关联到本次处理上下文的处理引擎对象。
         * @returns {UbbCodeEngine} 关联到本次处理上下文的处理引擎对象。
         */
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeContext.prototype, "options", {
        /**
         * 获取处理 UBB 需要注意的选项。
         * @returns {UbbCodeOptions} 处理 UBB 需要注意的选项。
         */
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeContext.prototype, "data", {
        /**
         * 获取上下文相关的数据。
         * @returns {UbbCodeContextData} 上下文相关的数据。
         */
        get: function () {
            return this._engine.data;
        },
        enumerable: true,
        configurable: true
    });
    return UbbCodeContext;
}());
exports.UbbCodeContext = UbbCodeContext;
/**
 * 控制 UBB 编码的选项。在 UBB 编码过程中，需要考虑这些选项。
 */
var UbbCodeOptions = /** @class */ (function () {
    function UbbCodeOptions() {
        /**
         * 是否自动检测 URL 并添加链接效果。
         */
        this.autoDetectUrl = true;
        /**
         * 是否允许外部链接。
         */
        this.allowExternalUrl = true;
        /**
         * 是否允许显示图像。
         */
        this.allowImage = true;
        /**
         * 是否允许多媒体资源，如视频，音频，Flash 等。
         */
        this.allowMediaContent = true;
        /**
         * 是否允许自动播放多媒体资源。
         */
        this.allowAutoPlay = true;
        /**
         * UBB 处理中的兼容性控制选项。
         */
        this.compatibility = UbbCompatiblityMode.Recommended;
    }
    return UbbCodeOptions;
}());
exports.UbbCodeOptions = UbbCodeOptions;
/**
 * 定义 UBB 呈现时使用的兼容性模式。
 */
var UbbCompatiblityMode;
(function (UbbCompatiblityMode) {
    /**
     * 使用最低级别兼容性，尽可能保持 UBB 代码的原始含义，即使可能会带来显示效果问题。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["Transitional"] = 0] = "Transitional";
    /**
     * 如果能在不改变语义的情况下使用较新的呈现技术，则使用新技术；如果不能保证语义一致则不进行更改。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["Recommended"] = 1] = "Recommended";
    /**
     * 强制使用对现代浏览器更友好的新技术呈现，即使可能在一定程度上改变语义。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["EnforceMorden"] = 2] = "EnforceMorden";
})(UbbCompatiblityMode = exports.UbbCompatiblityMode || (exports.UbbCompatiblityMode = {}));
/**
         * 定义符号的类型。
         */
var TokenType;
(function (TokenType) {
    /**
     * 一串文本。
     */
    TokenType[TokenType["String"] = 0] = "String";
    /**
     * 项目之间的分隔符。
     */
    TokenType[TokenType["ItemSeperator"] = 1] = "ItemSeperator";
    /**
     * 单个项目内名称和值的分隔符。
     */
    TokenType[TokenType["NameValueSeperator"] = 2] = "NameValueSeperator";
})(TokenType || (TokenType = {}));
/**
 * 表示一个符号。
 */
var Token = /** @class */ (function () {
    /**
     * 初始化一个符号对象的新实例。
     * @param type 符号的类型。
     * @param value 符号的值。
     */
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    /**
     * 创建一个表示一串文本的符号。
     * @param value 文本的值内容。
     */
    Token.stringValue = function (value) {
        return new Token(TokenType.String, value);
    };
    /**
     * 获取表示项目分隔符的符号。
     */
    Token.itemSeperator = new Token(TokenType.ItemSeperator, null);
    /**
     * 获取表示值分隔符的符号。
     */
    Token.nameValueSeperator = new Token(TokenType.NameValueSeperator, null);
    return Token;
}());
/**
 * 定义 UBB 片段的类型。
 */
var UbbSegmentType;
(function (UbbSegmentType) {
    /**
     * 纯文字片段。
     */
    UbbSegmentType[UbbSegmentType["Text"] = 0] = "Text";
    /**
     * 标签片段。
     */
    UbbSegmentType[UbbSegmentType["Tag"] = 1] = "Tag";
})(UbbSegmentType || (UbbSegmentType = {}));
/**
 * 表示 UBB 内容的一个片段。
 */
var UbbSegment = /** @class */ (function () {
    /**
     * 初始化一个 UBB 片段的新实例。
     * @param parent 新片段的上级。
     */
    function UbbSegment(parent) {
        this._parent = parent;
    }
    Object.defineProperty(UbbSegment.prototype, "parent", {
        /**
         * 获取该对象的上级片段。
         * @returns {UbbSegment} 该对象的上级片段。
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    ;
    return UbbSegment;
}());
/**
 * 表示 UBB 的文字片段。
 */
var UbbTextSegment = /** @class */ (function (_super) {
    __extends(UbbTextSegment, _super);
    /**
     * 创建一个新的 UbbTextSegment 对象。
     * @param text 新片段包含的文字。
     */
    function UbbTextSegment(text, parent) {
        var _this = _super.call(this, parent) || this;
        _this._text = text;
        return _this;
    }
    Object.defineProperty(UbbTextSegment.prototype, "type", {
        get: function () { return UbbSegmentType.Text; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTextSegment.prototype, "text", {
        /**
         * 获取片段中包含的文字。
         * @returns {string} 片段中包含的文字。
         */
        get: function () { return this._text; },
        enumerable: true,
        configurable: true
    });
    ;
    UbbTextSegment.prototype.clone = function (newParent) {
        return new UbbTextSegment(this._text, newParent);
    };
    return UbbTextSegment;
}(UbbSegment));
/**
 * 表示 UBB 的标签片段。
 */
var UbbTagSegment = /** @class */ (function (_super) {
    __extends(UbbTagSegment, _super);
    function UbbTagSegment(tagData, parent) {
        var _this = _super.call(this, parent) || this;
        /**
         * 标签片段是否关闭。
         */
        _this._isClosed = false;
        /**
         * 标签中包含的子标签数据。
         */
        _this._subSegments = [];
        _this._tagData = tagData;
        return _this;
    }
    Object.defineProperty(UbbTagSegment.prototype, "type", {
        get: function () { return UbbSegmentType.Tag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagSegment.prototype, "isClosed", {
        /**
         * 获取一个值，指示标签是否关闭。
         * @returns {boolean}
         */
        get: function () { return this._isClosed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTagSegment.prototype, "tagData", {
        get: function () { return this._tagData; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTagSegment.prototype, "subSegments", {
        get: function () { return this._subSegments; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * 强制关闭一个标签，并将标签挂接到新的上级标签。
     * @param segment 要关闭的标签。
     * @param newParent 新的上级标签。
     * @returns {UbbSegment[]} 产生的新的标签的集合。
     */
    UbbTagSegment.forceClose = function (segment, newParent) {
        // 文字标签无需关闭
        if (segment.type === UbbSegmentType.Text) {
            newParent._subSegments.push(segment.clone(newParent));
        }
        else {
            // 已经关闭的标签也无需关闭
            var seg = segment;
            if (seg.isClosed) {
                newParent._subSegments.push(segment.clone(newParent));
            }
            else {
                console.warn('标签 %s 没有正确关闭，已经被转换为纯文字。', seg.tagData.tagName);
                // 未关闭标签，自己将被转换为纯文字
                newParent._subSegments.push(new UbbTextSegment(seg.tagData.startTagString, segment.parent));
                // 自己的下级将被递归强制关闭，并提升为和自己同级
                for (var _i = 0, _a = seg._subSegments; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    UbbTagSegment.forceClose(sub, newParent);
                }
            }
        }
    };
    /**
     * 关闭该标签，并强制处理所有未关闭的下级标签。
     */
    UbbTagSegment.prototype.close = function () {
        // 复制自己的下级并清空数组。
        var subs = this._subSegments;
        this._subSegments = [];
        for (var _i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
            var item = subs_1[_i];
            UbbTagSegment.forceClose(item, this);
        }
        // 设置关闭状态
        this._isClosed = true;
    };
    UbbTagSegment.prototype.clone = function (newParent) {
        var result = new UbbTagSegment(this._tagData, newParent);
        result._content = this._content;
        result._isClosed = this._isClosed;
        for (var _i = 0, _a = this._subSegments; _i < _a.length; _i++) {
            var item = _a[_i];
            result._subSegments.push(item.clone(result));
        }
        return result;
    };
    /**
     * 获取标签的内部内容，不包括标签自身。
     */
    UbbTagSegment.prototype.getContentText = function () {
        var subContents = [];
        for (var _i = 0, _a = this._subSegments; _i < _a.length; _i++) {
            var subItem = _a[_i];
            if (subItem.type === UbbSegmentType.Text) {
                subContents.push(subItem.text);
            }
            else {
                subContents.push(subItem.getFullText());
            }
        }
        return subContents.join('');
    };
    /**
     * 获取标签的全部文字内容。
     */
    UbbTagSegment.prototype.getFullText = function () {
        return this.tagData.startTagString + this.getContentText() + this.tagData.endTagString;
    };
    return UbbTagSegment;
}(UbbSegment));
/**
 * 定义 UBB 标签中包含的数据。
 */
var UbbTagData = /** @class */ (function () {
    function UbbTagData(orignalString, parameters) {
        if (!parameters) {
            throw new Error('参数不能为空。');
        }
        this._originalString = orignalString;
        this._parameters = parameters;
        // 填充命名参数
        this._namedParameters = {};
        for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
            var item = parameters_1[_i];
            if (item.name) {
                this._namedParameters[item.name] = item.value;
            }
        }
    }
    Object.defineProperty(UbbTagData.prototype, "orignalString", {
        /**
         * 获取标签包含的原始文字。
         * @returns {string} 标签包含的原始文字。
         */
        get: function () { return this._originalString; },
        enumerable: true,
        configurable: true
    });
    ;
    UbbTagData.parse = function (tagString) {
        // 空字符串处理
        if (!tagString) {
            return null;
        }
        var tokens = getAllTokens(tagString);
        // 无法分割标签
        if (tokens.length === 0) {
            return null;
        }
        var result = convertTokens(tokens);
        return new UbbTagData(tagString, result);
        /**
         * 提取字符串中的所有符号。
         */
        function getAllTokens(tokenString) {
            var index = 0;
            /**
             * 从字符串中扫描获得下一个完整的语义符号。
             * @returns {string} 下一个完整的语义符号。
             */
            function scanToken(lastTokenType) {
                /**
                 * 从当前位置开始扫描字符串，直到找到对应的结束字符。
                 * @returns {string} 从当前位置开始到相同字符结束的字符串。
                 */
                function scanQuoted() {
                    // 开始字符串。
                    var quoteMark = tokenString[index];
                    var endMarkLocation = tokenString.indexOf('"', index + 1);
                    // 找不到结束符号
                    if (endMarkLocation < 0) {
                        console.error('UBB: 解析标签字符串 %s 时无法找到位置 %d 处 %s 对应的结束字符串。', tokenString, index, quoteMark);
                        endMarkLocation = tokenString.length;
                    }
                    var start = index + 1;
                    index = endMarkLocation + 1;
                    return tokenString.substring(start, endMarkLocation);
                }
                while (true) {
                    // 超过范围。
                    if (index >= tokenString.length) {
                        return null;
                    }
                    var c = tokenString[index];
                    if (/\s/i.test(c)) {
                        index++;
                        continue;
                    }
                    else if (c === ',') {
                        index++;
                        return Token.itemSeperator;
                    }
                    else if (c === '=') {
                        index++;
                        return Token.nameValueSeperator;
                    }
                    else if (c === '"' || c === '\'') {
                        return Token.stringValue(scanQuoted());
                    }
                    else {
                        var start = index;
                        // 根据最后一个标记的类型，本次标记的终止符会有所变化
                        var matchExp = lastTokenType === TokenType.ItemSeperator ? /[=,]/i : /,/i;
                        // 寻找下个分隔符
                        var nextSeperator = tokenString.substring(index + 1).match(matchExp);
                        if (nextSeperator) {
                            // 结束位置
                            var endMarkLocation = nextSeperator.index + index + 1;
                            index = endMarkLocation;
                            return Token.stringValue(tokenString.substring(start, endMarkLocation));
                        }
                        else {
                            index = tokenString.length;
                            return Token.stringValue(tokenString.substring(start));
                        }
                    }
                }
            }
            var allTokens = [];
            var lastTokenType = TokenType.ItemSeperator;
            while (true) {
                var newToken = scanToken(lastTokenType);
                if (newToken) {
                    allTokens.push(newToken);
                    lastTokenType = newToken.type;
                }
                else {
                    break;
                }
            }
            return allTokens;
        }
        /**
         * 将令牌转换为参数集合。
         * @param tokens 要转换的令牌的数组。
         */
        function convertTokens(tokens) {
            var parameters = [];
            if (!tokens || tokens.length === 0) {
                console.error('UBB: 无法将标签字符串 %s 解析为参数的集合。', tagString);
                return parameters;
            }
            var lastName = null;
            var lastValue = null;
            var lastTokenType = TokenType.ItemSeperator;
            for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                var token = tokens_1[_i];
                switch (token.type) {
                    case TokenType.ItemSeperator:
                        parameters.push(new UbbTagParameter(lastName, lastValue));
                        lastName = null;
                        lastValue = null;
                        lastTokenType = TokenType.ItemSeperator;
                        break;
                    case TokenType.NameValueSeperator:
                        if (lastTokenType !== TokenType.String) {
                            throw new Error('名称值分隔符只能出现在值之后。');
                        }
                        lastName = lastValue;
                        lastValue = null;
                        lastTokenType = TokenType.NameValueSeperator;
                        break;
                    default:
                        if (lastTokenType === TokenType.String) {
                            throw new Error('不能连续出现多个值。');
                        }
                        lastValue = token.value;
                        lastTokenType = TokenType.String;
                        break;
                }
            }
            // 添加最后一个值
            parameters.push(new UbbTagParameter(lastName, lastValue));
            // 第一个项目需要特殊处理，默认是名称而非值
            if (!parameters[0].name) {
                parameters[0] = new UbbTagParameter(parameters[0].value, null);
            }
            return parameters;
        }
    };
    Object.defineProperty(UbbTagData.prototype, "tagName", {
        /**
         * 获取标签的名称。
         * @returns {string} 标签的名称。
         */
        get: function () {
            return this._parameters[0].name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagData.prototype, "startTagString", {
        /**
         * 获取标签的开始标记字符串。
         * @returns {string} 标签的开始标记字符串。
         */
        get: function () {
            return "[" + this.orignalString + "]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagData.prototype, "endTagString", {
        /**
         * 获取标签的结束标记字符串。
         * @returns {string} 标签的结束标记字符串。
         */
        get: function () {
            return "[/" + this.tagName + "]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagData.prototype, "mainValue", {
        /**
         * 获取标签的主要值，也即紧跟在标签名称和等号后的值。
         * @returns {string} 标签的主要值。
         */
        get: function () {
            return this._parameters[0].value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取给定参数的值。
     * @param indexOrName 要获取的参数的索引或者名称。
     * @returns {string} 给定位置参数的值。
     */
    UbbTagData.prototype.value = function (indexOrName) {
        if (typeof indexOrName === 'number') {
            return this._parameters[indexOrName].value;
        }
        else if (typeof indexOrName === 'string') {
            return this._namedParameters[indexOrName];
        }
        else {
            throw new Error('参数必须是字符串或者数字。');
        }
    };
    /**
     * 获取给定参数的名称。
     * @param index 要获取的参数的索引。
     * @returns {string} 给定位置参数的名称。
     */
    UbbTagData.prototype.name = function (index) {
        return this._parameters[index].name;
    };
    Object.defineProperty(UbbTagData.prototype, "parameterCount", {
        /**
         * 获取当前标签中包含的参数的个数。
         */
        get: function () {
            return this._parameters.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取给定的参数。
     * @param index 要获取的参数的索引。
     * @returns {UbbTagParameter} 给定位置的参数。
     */
    UbbTagData.prototype.parameter = function (index) {
        return this._parameters[index];
    };
    return UbbTagData;
}());
exports.UbbTagData = UbbTagData;
/**
 * 表示 UBB 标签中单个参数的内容。
 */
var UbbTagParameter = /** @class */ (function () {
    /**
     * 初始化一个对象的新实例。
     * @param name 新参数的名称。
     * @param value 新参数的值。
     */
    function UbbTagParameter(name, value) {
        this._name = name;
        this._value = value;
    }
    Object.defineProperty(UbbTagParameter.prototype, "name", {
        /**
         * 获取参数的名称。如果参数没有名称，则该属性为 null。
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagParameter.prototype, "value", {
        /**
         * 获取参数的值。如果该参数没有值，则该属性为 null。
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return UbbTagParameter;
}());
/**
 * 定义 UBB 处理程序的基类。
 */
var UbbTagHandler = /** @class */ (function () {
    function UbbTagHandler() {
    }
    /**
     * 在解析完成处理标签内部的内容后，将标签本身作为文本处理。
     * @param tagData 标签相关的数据。
     * @param content 标签的内容。
     */
    UbbTagHandler.renderTagAsString = function (tagData, content) {
        return [
            tagData.startTagString,
            content,
            tagData.endTagString
        ];
    };
    return UbbTagHandler;
}());
exports.UbbTagHandler = UbbTagHandler;
/**
 * 定义基于文字的 UBB 标签处理程序的基类。
 */
var TextTagHandler = /** @class */ (function (_super) {
    __extends(TextTagHandler, _super);
    function TextTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextTagHandler.prototype.exec = function (tagSegment, context) {
        return this.execCore(tagSegment.getContentText(), tagSegment.tagData, context);
    };
    return TextTagHandler;
}(UbbTagHandler));
exports.TextTagHandler = TextTagHandler;
/**
 * 定义递归处理内容的标签处理程序的基类。
 */
var RecursiveTagHandler = /** @class */ (function (_super) {
    __extends(RecursiveTagHandler, _super);
    function RecursiveTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecursiveTagHandler.prototype.exec = function (tagSegment, context) {
        var result = [];
        for (var _i = 0, _a = tagSegment.subSegments; _i < _a.length; _i++) {
            var subSeg = _a[_i];
            result.push(context.engine.execSegment(subSeg, context));
        }
        return this.execCore(result, tagSegment.tagData, context);
    };
    return RecursiveTagHandler;
}(UbbTagHandler));
exports.RecursiveTagHandler = RecursiveTagHandler;
/**
 * 定义 UBB 处理程序列表。
 */
var UbbHandlerList = /** @class */ (function () {
    function UbbHandlerList() {
        /**
         * 命名的内部标签处理器列表。
         */
        this._namedTagHandlerList = {};
        /**
         * 未命名的内部标签处理程序列表。
         */
        this._unnamedTagHanlderList = [];
    }
    /**
     * 获取给定标签名称的处理程序。
     * @param supportedTagNames 标签名称。
     * @returns {UbbTagHandler} 标签处理程序。
     */
    UbbHandlerList.prototype.getHandler = function (tagName) {
        // 首先寻找命名的标签处理程序
        var namedTagHandler = this._namedTagHandlerList[tagName];
        // 找到
        if (namedTagHandler) {
            return namedTagHandler;
        }
        // 寻找未命名的标签处理程序
        for (var _i = 0, _a = this._unnamedTagHanlderList; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.supportedTagNames.test(tagName)) {
                return handler;
            }
        }
        // 找不到任何标签处理程序
        return null;
    };
    /**
     * 注册一个给定的标签处理程序。
     * @param tagHandlerClass 处理程序对象的类型。
     */
    UbbHandlerList.prototype.register = function (tagHandlerClass) {
        // ReSharper disable once InconsistentNaming
        this.registerInstance(new tagHandlerClass());
    };
    /**
     * 注册一个给定的处理程序实例。
     * @param tagHandler 要注册的标签处理器。
     */
    UbbHandlerList.prototype.registerInstance = function (tagHandler) {
        if (!tagHandler || !tagHandler.supportedTagNames) {
            throw new Error('参数 tagHandler 无效，或者未提供正确的标签名称。');
        }
        if (typeof tagHandler.supportedTagNames === 'string') {
            this.registerNamedCore([tagHandler.supportedTagNames], tagHandler);
        }
        else if (tagHandler.supportedTagNames instanceof Array) {
            this.registerNamedCore(tagHandler.supportedTagNames, tagHandler);
        }
        else {
            this.registerUnnamedCore(tagHandler);
        }
    };
    /**
     * 注册命名处理程序的核心方法。
     * @param tagNames 处理程序关联的一个或多个标签名。
     * @param tagHandler 处理程序对象。
     */
    UbbHandlerList.prototype.registerNamedCore = function (tagNames, tagHandler) {
        for (var _i = 0, tagNames_1 = tagNames; _i < tagNames_1.length; _i++) {
            var tagName = tagNames_1[_i];
            if (tagName in this._namedTagHandlerList) {
                console.error('标签 %s 的处理程序已经被注册。', tagName);
            }
            else {
                this._namedTagHandlerList[tagName] = tagHandler;
            }
        }
    };
    /**
     * 注册未命名处理程序的核心方法。
     * @param tagHandler 处理程序对象。
     */
    UbbHandlerList.prototype.registerUnnamedCore = function (tagHandler) {
        this._unnamedTagHanlderList.push(tagHandler);
    };
    return UbbHandlerList;
}());
/**
 * 提供处理 UBB 程序的核心方法。
 */
var UbbCodeEngine = /** @class */ (function () {
    function UbbCodeEngine() {
        /**
         * 获取该引擎中注册的处理程序。
         */
        this._tagHandlers = new UbbHandlerList();
        /**
         * 引擎保存的上下文数据。
         */
        this._data = new UbbCodeContextData();
    }
    Object.defineProperty(UbbCodeEngine.prototype, "tagHandlers", {
        /**
         * 该引擎中注册的处理程序。
         */
        get: function () {
            return this._tagHandlers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeEngine.prototype, "data", {
        /**
         * 获取引擎保存的上下文数据。
         * @returns {UbbCodeContextData} 引擎保存的上下文数据。
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * 获取给定标签名称的处理程序。
     * @param supportedTagNames 给定的标签名称。
     * @returns {UbbTagHandler} 给定标签名称的处理程序。
     */
    UbbCodeEngine.prototype.getHandler = function (tagName) {
        return this._tagHandlers.getHandler(tagName);
    };
    /**
     * 执行 UBB 解析的核心函数。
     * @param content 要解析的内容。
     * @param options 解析使用的相关选项。
     * @returns {string} 解析后的 HTML 代码。
     */
    UbbCodeEngine.prototype.exec = function (content, options) {
        var context = new UbbCodeContext(this, options);
        return this.execCore(content, context);
    };
    /**
     * 尝试找到关闭标记对应的开始标记，并关闭该标记。
     * @param supportedTagNames 标记名称。
     * @param parent 该标记的第一个上级。
     * @returns {UbbTagSegment} 新的上级标签。
     */
    UbbCodeEngine.tryHandleEndTag = function (tagName, parent) {
        var p = parent;
        // 循环找到合适的上级，并关闭上级
        while (p && p.tagData) {
            if (p.tagData.tagName === tagName) {
                p.close();
                return p.parent;
            }
            p = p.parent;
        }
        // 没有找到任何上级
        console.warn('UBB: 找不到结束标签 %s 的开始标签，该标签将被作为一般文字处理。', tagName);
        parent.subSegments.push(new UbbTextSegment("[/" + tagName + "]", parent));
        return parent;
    };
    /**
     * 构建标签的核心方法。
     * @param content 包含多个标签的字符串。
     * @param parent 字符串的上级容器。
     */
    UbbCodeEngine.buildSegmentsCore = function (content, parent) {
        var regExp = /([\s\S]*?)\[(.+?)]/gi;
        while (true) {
            var startIndex = regExp.lastIndex;
            var tagMatch = regExp.exec(content);
            // 未找到标记，则这是最后一个标签。
            if (!tagMatch) {
                // 提取最后一段内容，如果找到，附加到最后
                var remainContent = content.substring(startIndex);
                if (remainContent) {
                    parent.subSegments.push(new UbbTextSegment(remainContent, parent));
                }
                return;
            }
            var beforeText = tagMatch[1], tagString = tagMatch[2];
            // 添加前面的文字。
            if (beforeText) {
                parent.subSegments.push(new UbbTextSegment(beforeText, parent));
            }
            // 检测是否是结束标记
            var endTagMatch = tagString.match(/^\/(.+)$/i);
            if (endTagMatch) {
                var endTagName = endTagMatch[1];
                parent = UbbCodeEngine.tryHandleEndTag(endTagName, parent);
            }
            else {
                try {
                    // 提取新的标签数据
                    var tagData = UbbTagData.parse(tagString);
                    var newTag = new UbbTagSegment(tagData, parent);
                    parent.subSegments.push(newTag);
                    // 新上级
                    parent = newTag;
                    continue;
                }
                catch (error) {
                    // 提取数据失败，则视为没有匹配
                    console.warn('标签字符串 %s 解析失败，将被视为普通文字。', tagString);
                    parent.subSegments.push(new UbbTextSegment("[" + tagString + "]", parent));
                }
            }
        }
    };
    /**
     * 执行 UBB 处理的核心函数。
     * @param content 要处理的内容。
     * @param context UBB 处理上下文。
     * @returns {JSX.Element} 处理完成的 HTML 内容。
     */
    UbbCodeEngine.prototype.execCore = function (content, context) {
        var root = new UbbTagSegment(null, null);
        UbbCodeEngine.buildSegmentsCore(content, root);
        root.close();
        var result = [];
        for (var _i = 0, _a = root.subSegments; _i < _a.length; _i++) {
            var item = _a[_i];
            result.push(this.execSegment(item, context));
        }
        return result;
    };
    UbbCodeEngine.prototype.execSegment = function (segment, context) {
        if (segment.type === UbbSegmentType.Text) {
            return segment.text;
        }
        else {
            var tag = segment;
            var handler = this.getHandler(tag.tagData.tagName);
            if (!handler) {
                console.warn('没有找到标签 %s 的处理程序，将被视为一般文字。', tag.tagData.tagName);
                return tag.getFullText();
            }
            return handler.exec(tag, context);
        }
    };
    return UbbCodeEngine;
}());
exports.UbbCodeEngine = UbbCodeEngine;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactRouterDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(51);
/**
 * 定义 UBBContainer 组件需要使用的属性。
 */
var UbbContainerProps = /** @class */ (function () {
    function UbbContainerProps() {
    }
    return UbbContainerProps;
}());
exports.UbbContainerProps = UbbContainerProps;
/**
 * 提供用于解析 UBB 的核心组件。
 */
var UbbContainer = /** @class */ (function (_super) {
    __extends(UbbContainer, _super);
    function UbbContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UbbContainer.prototype.render = function () {
        // 获取引擎对象，如果不使用引擎对象则创建一个默认的
        var engine = this.props.engine || Ubb.createEngine();
        // 获取选项，如果不设置选项则创建一个默认的
        var options = this.props.options || new Ubb.UbbCodeOptions();
        var ubbHtml = engine.exec(this.props.code || '', options);
        //打开回车与空格00
        var style = {
            whiteSpace: 'pre-wrap',
            width: "100%"
        };
        // 注意兼容性设置， HTML4 不支持 article 标签
        if (options.compatibility === Ubb.UbbCompatiblityMode.Transitional) {
            return React.createElement("blockquote", { style: style }, ubbHtml);
        }
        else {
            return React.createElement("article", { style: style }, ubbHtml);
        }
    };
    return UbbContainer;
}(React.Component));
exports.UbbContainer = UbbContainer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表示应用程序的状态。
 */
var AppState = /** @class */ (function () {
    function AppState() {
    }
    return AppState;
}());
exports.AppState = AppState;
/**
 * 投票状态
 */
var TopicVoteState = /** @class */ (function () {
    function TopicVoteState() {
    }
    return TopicVoteState;
}());
exports.TopicVoteState = TopicVoteState;
/**
 * 发帖内容状态
 */
var PostTopicState = /** @class */ (function () {
    function PostTopicState() {
    }
    return PostTopicState;
}());
exports.PostTopicState = PostTopicState;
/**
 * 作者信息状态
 */
var AuthorMessageState = /** @class */ (function () {
    function AuthorMessageState() {
    }
    return AuthorMessageState;
}());
exports.AuthorMessageState = AuthorMessageState;
/**
 * 题目信息状态
 */
var TopicTitleState = /** @class */ (function () {
    function TopicTitleState() {
    }
    return TopicTitleState;
}());
exports.TopicTitleState = TopicTitleState;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState() {
    }
    return ContentState;
}());
exports.ContentState = ContentState;
/**
 * 点赞信息状态
 */
var TopicGoodState = /** @class */ (function () {
    function TopicGoodState() {
    }
    return TopicGoodState;
}());
exports.TopicGoodState = TopicGoodState;
/**
 * 回复者状态
 */
var ReplierState = /** @class */ (function () {
    function ReplierState() {
    }
    return ReplierState;
}());
exports.ReplierState = ReplierState;
/**
 * 首页话题信息状态
 * 拥有一个属性mainPageTopicState，为MainPageTopic类数组，用于存放组件所需的主题信息（一般为10条）
 **/
var MainPageTopicState = /** @class */ (function () {
    function MainPageTopicState() {
    }
    return MainPageTopicState;
}());
exports.MainPageTopicState = MainPageTopicState;
var ListHeadState = /** @class */ (function () {
    function ListHeadState() {
    }
    return ListHeadState;
}());
exports.ListHeadState = ListHeadState;
var ListNoticeState = /** @class */ (function () {
    function ListNoticeState() {
    }
    return ListNoticeState;
}());
exports.ListNoticeState = ListNoticeState;
var ListTagState = /** @class */ (function () {
    function ListTagState() {
    }
    return ListTagState;
}());
exports.ListTagState = ListTagState;
/**
 * 内容列表页面的状态。
 */
var ListContentState = /** @class */ (function () {
    function ListContentState() {
    }
    return ListContentState;
}());
exports.ListContentState = ListContentState;
var TopicTitleAndContentState = /** @class */ (function () {
    /*  constructor(title, authorName, lastReply) {
          this.authorName = authorName;
          this.lastReply = lastReply;
            this.title = title;
      }*/
    function TopicTitleAndContentState() {
        //this.userName = userName;
        //this.title = title;
        //this.id = topicid;
        //this.userId = userId;
        //this.lastPostUser = lastPostUser;
        //this.lastPostTime = lastPostTime;
        //this.likeCount = likeCount;
        //this.dislikeCount = dislikeCount;
        //this.replyCount = replyCount;
        //this.highlightInfo = highlightInfo;
        //this.topState = topState;
        //this.state = state;
    }
    return TopicTitleAndContentState;
}());
exports.TopicTitleAndContentState = TopicTitleAndContentState;
/**
 * 定义页码列表组件的状态。
 */
var ListPagerState = /** @class */ (function () {
    function ListPagerState() {
    }
    return ListPagerState;
}());
exports.ListPagerState = ListPagerState;
var PagerState = /** @class */ (function () {
    function PagerState(page) {
        this.pageNumber = page;
    }
    return PagerState;
}());
exports.PagerState = PagerState;
var TopicState = /** @class */ (function () {
    function TopicState(userName, title, content, time, signature, userImgUrl, hitCount, userId, likeNumber, dislikeNumber, postId, isAnonymous, contentType, isFollowing, fanCount, masters) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.hitCount = hitCount;
        this.userId = userId;
        this.likeNumber = likeNumber;
        this.dislikeNumber = dislikeNumber;
        this.postId = postId;
        this.isAnonymous = isAnonymous;
        this.contentType = contentType;
        this.isFollowing = isFollowing;
        this.fanCount = fanCount;
        this.masters = masters;
    }
    return TopicState;
}());
exports.TopicState = TopicState;
/**
 * 登录状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());
exports.LoginState = LoginState;
/**
 * 已登录状态
 */
var AlreadyLoginState = /** @class */ (function () {
    function AlreadyLoginState() {
    }
    return AlreadyLoginState;
}());
exports.AlreadyLoginState = AlreadyLoginState;
/**
 * 版面类
 */
var Board = /** @class */ (function () {
    //构造方法
    function Board(name, todayPostCount, totalPostCount, boardID, master) {
        this.name = name;
        this.todayPostCount = todayPostCount;
        this.totalPostCount = totalPostCount;
        this.id = boardID;
        this.masters = master;
    }
    return Board;
}());
exports.Board = Board;
var BoardState = /** @class */ (function () {
    function BoardState() {
    }
    return BoardState;
}());
exports.BoardState = BoardState;
/**
* 用户信息
*/
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
* 表示用户最近帖子
*/
var UserRecentPost = /** @class */ (function () {
    function UserRecentPost() {
    }
    return UserRecentPost;
}());
exports.UserRecentPost = UserRecentPost;
/**
 * 表示用户粉丝信息
 */
var UserFanInfo = /** @class */ (function () {
    function UserFanInfo() {
    }
    return UserFanInfo;
}());
exports.UserFanInfo = UserFanInfo;
/**
* 用户收藏的版面信息
*/
var UserFavoritesBoardInfo = /** @class */ (function () {
    function UserFavoritesBoardInfo() {
    }
    return UserFavoritesBoardInfo;
}());
exports.UserFavoritesBoardInfo = UserFavoritesBoardInfo;
/**
* 修改用户信息所要提交的body
*/
var ChangeUserInfo = /** @class */ (function () {
    function ChangeUserInfo() {
    }
    return ChangeUserInfo;
}());
exports.ChangeUserInfo = ChangeUserInfo;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes = __webpack_require__(10);
exports.userLogIn = function () { return ({
    type: ActionTypes.USER_LOG_ON
}); };
exports.userLogOff = function () { return ({
    type: ActionTypes.USER_LOG_OFF
}); };
exports.changeUserInfo = function (newInfo) { return ({
    type: ActionTypes.CHANGE_USERINFO,
    newInfo: newInfo
}); };
exports.throwError = function (errorMessage) { return ({
    type: ActionTypes.ERROR,
    errorMessage: errorMessage
}); };
var AddAwardAction = /** @class */ (function () {
    function AddAwardAction() {
        this.type = ActionTypes.ADD_AWARD;
    }
    return AddAwardAction;
}());
exports.AddAwardAction = AddAwardAction;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登录用
 */
exports.USER_LOG_ON = 'USER_LOG_ON';
exports.USER_LOG_OFF = 'USER_LOG_OFF';
/**
 * 用户信息用
 */
exports.GET_USER_POSTS = 'GET_USER_POSTS';
exports.CHANGE_USERINFO = 'CHANGE_USERINFO';
/**
 * 抛出错误
 */
exports.ERROR = 'ERROR';
/**
 * 帖子
 */
exports.ADD_AWARD = 'ADD_AWARD';


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
/**
 * 用户最近单个帖子组件
 */
var UserCenterExactActivitiesPost = /** @class */ (function (_super) {
    __extends(UserCenterExactActivitiesPost, _super);
    function UserCenterExactActivitiesPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivitiesPost.prototype.render = function () {
        return (React.createElement("div", { className: "user-post" },
            React.createElement("div", { className: "user-post-info" },
                React.createElement("a", { className: "user-post-board", href: "/list/" + this.props.userRecentPost.boardId }, this.props.userRecentPost.board),
                React.createElement("a", { className: "user-post-date" }, this.props.userRecentPost.date),
                React.createElement("a", { className: "user-post-title" }, this.props.userRecentPost.title)),
            React.createElement("div", { className: "user-post-content" },
                React.createElement("p", null,
                    React.createElement("a", { href: "/topic/" + this.props.userRecentPost.id }, this.props.userRecentPost.content)),
                this.props.userRecentPost.approval ? React.createElement("a", { className: "fa-thumbs-o-up" }, " " + this.props.userRecentPost.approval) : null,
                this.props.userRecentPost.disapproval ? React.createElement("a", { className: "fa-thumbs-o-down" }, " " + this.props.userRecentPost.disapproval) : null)));
    };
    return UserCenterExactActivitiesPost;
}(React.Component));
exports.UserCenterExactActivitiesPost = UserCenterExactActivitiesPost;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(6);
var react_router_dom_1 = __webpack_require__(3);
var Topic_1 = __webpack_require__(16);
var Board_1 = __webpack_require__(15);
var Topic_Trace_1 = __webpack_require__(27);
var BoardList_1 = __webpack_require__(28);
var UserCenter_1 = __webpack_require__(29);
var Message_1 = __webpack_require__(31);
var Topic_New_1 = __webpack_require__(32);
var Focus_1 = __webpack_require__(33);
var Header_1 = __webpack_require__(34);
var Footer_1 = __webpack_require__(35);
var MainPage_1 = __webpack_require__(36);
var User_1 = __webpack_require__(37);
var LogOn_1 = __webpack_require__(18);
var Topic_CreateTopic_1 = __webpack_require__(38);
var Status = __webpack_require__(39);
var Search_1 = __webpack_require__(40);
var SearchBoard_1 = __webpack_require__(41);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.match = props.match;
        return _this;
    }
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var AppBeforeConnect = /** @class */ (function (_super) {
    __extends(AppBeforeConnect, _super);
    function AppBeforeConnect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBeforeConnect.prototype.render = function () {
        var errorElement;
        if (this.props.isError) {
            switch (this.props.errorMessage) {
                case 'LogOut':
                    errorElement = React.createElement(Status.LogOut, null);
                    break;
                case 'UnauthorizedBoard':
                    errorElement = React.createElement(Status.UnauthorizedBoard, null);
                    break;
                case 'UnauthorizedTopic':
                    errorElement = React.createElement(Status.UnauthorizedTopic, null);
                    break;
                case 'NotFoundTopic':
                    errorElement = React.createElement(Status.NotFoundTopic, null);
                    break;
                case 'NotFoundBoard':
                    errorElement = React.createElement(Status.NotFoundBoard, null);
                    break;
                case 'NotFoundUser':
                    errorElement = React.createElement(Status.NotFoundUser, null);
                    break;
                case 'ServerError':
                    errorElement = React.createElement(Status.ServerError, null);
                    break;
                case 'OperationForbidden':
                    errorElement = React.createElement(Status.OperationForbidden, null);
                    break;
                case 'Disconnected':
                    errorElement = React.createElement(Status.Disconnected, null);
                    break;
                case 'TopicDeleted':
                    errorElement = React.createElement(Status.TopicDeleted, null);
                    break;
            }
        }
        return React.createElement("div", { style: { width: "100%" } },
            React.createElement(react_router_dom_1.BrowserRouter, null, !this.props.isError ? (React.createElement("div", { style: { backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" } },
                React.createElement(Header_1.Header, null),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: MainPage_1.MainPage }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/:page?", component: Topic_1.Post }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/user/:userId/:page?", component: Topic_Trace_1.CurUserPost }),
                React.createElement(react_router_dom_1.Route, { path: "/list/:boardId/:type?/:page?", component: Board_1.List }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/boardlist", component: BoardList_1.BoardList }),
                React.createElement(react_router_dom_1.Route, { path: "/usercenter", component: UserCenter_1.UserCenter }),
                React.createElement(react_router_dom_1.Route, { path: "/message", component: Message_1.Message }),
                React.createElement(react_router_dom_1.Route, { path: "/focus", component: Focus_1.Focus }),
                React.createElement(react_router_dom_1.Route, { path: "/newtopics", component: Topic_New_1.AllNewTopic }),
                React.createElement(react_router_dom_1.Route, { path: "/user", component: User_1.User }),
                React.createElement(react_router_dom_1.Route, { path: "/logon", component: LogOn_1.LogOn }),
                React.createElement(react_router_dom_1.Route, { path: "/search", component: Search_1.Search }),
                React.createElement(react_router_dom_1.Route, { path: "/searchBoard", component: SearchBoard_1.SearchBoard }),
                React.createElement(react_router_dom_1.Route, { path: "/createtopic/:boardId", component: Topic_CreateTopic_1.CreateTopic }),
                React.createElement(Footer_1.Footer, null))) : React.createElement("div", { style: { backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" } },
                React.createElement(Header_1.Header, null),
                errorElement,
                React.createElement(Footer_1.Footer, null))));
    };
    return AppBeforeConnect;
}(React.Component));
function mapState(state) {
    return {
        isError: state.error.isError,
        errorMessage: state.error.errorMessage
    };
}
exports.App = react_redux_1.connect(mapState, function () { return (null); })(AppBeforeConnect);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
/**
 * 我关注的某个版面的单个主题
 */
var FocusTopicSingle = /** @class */ (function (_super) {
    __extends(FocusTopicSingle, _super);
    function FocusTopicSingle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusTopicSingle.prototype.render = function () {
        var topicUrl = "/topic/" + this.props.id;
        var boardUrl = "/list/" + this.props.boardId + "/normal";
        return (React.createElement("div", { className: "focus-topic" },
            React.createElement(PortaritrUrl, { userId: this.props.userId, portraitUrl: this.props.portraitUrl }),
            React.createElement("div", { className: "focus-topic-info1" },
                React.createElement("div", { className: "focus-topic-authorInfo" },
                    React.createElement(UserName, { userId: this.props.userId, userName: this.props.userName }),
                    React.createElement("div", { className: "focus-topic-redText" }, this.props.fanCount),
                    React.createElement("div", { className: "focus-topic-blackText" }, "\u7C89\u4E1D")),
                React.createElement("div", { className: "focus-topic-title" },
                    React.createElement("a", { href: topicUrl, target: "_blank" }, this.props.title))),
            React.createElement("div", { className: "focus-topic-info2" },
                React.createElement("div", { className: "focus-topic-board" },
                    React.createElement("a", { href: boardUrl, target: "_blank" }, this.props.boardName),
                    "\u00A0\u00A0/\u00A0\u00A0",
                    moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')),
                React.createElement("div", { className: "focus-topic-response" },
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-thumbs-o-up", "aria-hidden": "true" }),
                        this.props.likeCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-thumbs-o-down", "aria-hidden": "true" }),
                        this.props.dislikeCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-commenting-o", "aria-hidden": "true" }),
                        this.props.replyCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-eye", "aria-hidden": "true" }),
                        this.props.hitCount)))));
    };
    return FocusTopicSingle;
}(React.Component));
exports.FocusTopicSingle = FocusTopicSingle;
//返回可点击或者不可点击的头像
var PortaritrUrl = /** @class */ (function (_super) {
    __extends(PortaritrUrl, _super);
    function PortaritrUrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortaritrUrl.prototype.render = function () {
        if (this.props.userId) {
            var userUrl = "/user/" + this.props.userId;
            return (React.createElement("a", { href: userUrl, target: "_blank" },
                React.createElement("img", { className: "focus-topic-portraitUrl", src: this.props.portraitUrl })));
        }
        else {
            return React.createElement("img", { className: "focus-topic-portraitUrl", src: this.props.portraitUrl });
        }
    };
    return PortaritrUrl;
}(React.Component));
exports.PortaritrUrl = PortaritrUrl;
//返回可点击或者不可点击的用户名
var UserName = /** @class */ (function (_super) {
    __extends(UserName, _super);
    function UserName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserName.prototype.render = function () {
        if (this.props.userId) {
            var userUrl = "/user/" + this.props.userId;
            return (React.createElement("a", { href: userUrl, target: "_blank", className: "focus-topic-blackText" },
                React.createElement("div", { className: "focus-topic-blackText" }, this.props.userName)));
        }
        else {
            return React.createElement("div", { className: "focus-topic-blackText" }, this.props.userName);
        }
    };
    return UserName;
}(React.Component));
exports.UserName = UserName;
var PortaritrUrlProps = /** @class */ (function () {
    function PortaritrUrlProps() {
    }
    return PortaritrUrlProps;
}());
exports.PortaritrUrlProps = PortaritrUrlProps;
var UserNameProps = /** @class */ (function () {
    function UserNameProps() {
    }
    return UserNameProps;
}());
exports.UserNameProps = UserNameProps;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UserCenterPageCount = /** @class */ (function (_super) {
    __extends(UserCenterPageCount, _super);
    function UserCenterPageCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterPageCount.prototype.render = function () {
        var _this = this;
        var elements = [], i;
        var currentStyle = {
            backgroundColor: '#ccc'
        };
        if (this.props.totalPage <= 7) {
            i = this.props.totalPage;
            while (i--) {
                elements.unshift(i + 1);
            }
            elements = elements.map(function (item, index) {
                return React.createElement("li", null,
                    React.createElement("a", { href: "" + _this.props.href + item },
                        React.createElement("button", { type: "button", style: (item == _this.props.currentPage) ? currentStyle : {} }, item)));
            });
        }
        else if (this.props.currentPage - 1 <= 3) {
            i = 7;
            while (i--) {
                elements.unshift(i + 1);
            }
            elements = elements.map(function (item, index) { return (React.createElement("li", null,
                React.createElement("a", { href: "" + _this.props.href + item },
                    React.createElement("button", { type: "button", style: (item == _this.props.currentPage) ? currentStyle : {} }, item)))); });
            elements.push(React.createElement("li", null,
                React.createElement("button", { disabled: true }, "\u00B7\u00B7\u00B7")));
            elements.push(React.createElement("li", null,
                React.createElement("a", { href: "" + this.props.href + this.props.totalPage },
                    React.createElement("button", { type: "button" }, this.props.totalPage))));
        }
        else if (this.props.totalPage - this.props.currentPage <= 3) {
            i = 7;
            while (i--) {
                elements.unshift(i - 6 + this.props.totalPage);
            }
            elements = elements.map(function (item, index) { return (React.createElement("li", null,
                React.createElement("a", { href: "" + _this.props.href + item },
                    React.createElement("button", { type: "button", style: (item == _this.props.currentPage) ? currentStyle : {} }, item)))); });
            elements.unshift(React.createElement("li", null,
                React.createElement("button", { disabled: true }, "\u00B7\u00B7\u00B7")));
            elements.unshift(React.createElement("li", null,
                React.createElement("a", { href: this.props.href + "1" },
                    React.createElement("button", { type: "button" }, 1))));
        }
        else {
            i = 7;
            while (i--) {
                elements.unshift(i - 3 + this.props.currentPage);
            }
            elements = elements.map(function (item, index) { return (React.createElement("li", null,
                React.createElement("a", { href: "" + _this.props.href + item },
                    React.createElement("button", { type: "button", disabled: item == _this.props.currentPage, style: (item == _this.props.currentPage) ? currentStyle : {} }, item)))); });
            elements.push(React.createElement("li", null,
                React.createElement("button", { disabled: true }, "\u00B7\u00B7\u00B7")));
            elements.push(React.createElement("li", null,
                React.createElement("a", { href: "" + this.props.href + this.props.totalPage },
                    React.createElement("button", { type: "button" }, this.props.totalPage))));
            elements.unshift(React.createElement("li", null,
                React.createElement("button", { disabled: true }, "\u00B7\u00B7\u00B7")));
            elements.unshift(React.createElement("li", null,
                React.createElement("a", { href: this.props.href + "1" },
                    React.createElement("button", { type: "button" }, 1))));
        }
        return (React.createElement("div", { id: "userCenterPageCount" },
            React.createElement("ul", null, elements)));
    };
    return UserCenterPageCount;
}(React.Component));
exports.UserCenterPageCount = UserCenterPageCount;
var UserCenterPageCountProps = /** @class */ (function () {
    function UserCenterPageCountProps() {
    }
    return UserCenterPageCountProps;
}());


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UbbContainer_1 = __webpack_require__(4);
var react_router_dom_1 = __webpack_require__(3);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props, context) {
        var _this = _super.call(this, props, context) || this;
        // 默认页码
        _this.state = { boardId: null, bigPaper: "", page: 1 };
        return _this;
    }
    List.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBasicBoardMessage(newProps.match.params.boardId, newProps.match.params.page, this.context.router)];
                    case 1:
                        data = _a.sent();
                        // 设置状态
                        this.setState({ bigPaper: data.bigPaper, page: data.page, boardId: newProps.match.params.boardId });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBasicBoardMessage(this.match.params.boardId, this.match.params.page, this.context.router)];
                    case 1:
                        data = _a.sent();
                        // 设置状态
                        this.setState({ bigPaper: data.bigPaper, page: data.page, boardId: this.match.params.boardId });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.render = function () {
        return React.createElement("div", { id: "listRoot" },
            React.createElement(Category, { boardId: this.match.params.boardId }),
            React.createElement(ListHead, { key: this.state.page, boardId: this.match.params.boardId }),
            React.createElement(ListNotice, { bigPaper: this.state.bigPaper }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/list/:boardId/normal/:page?", component: ListContent }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/list/:boardId/best/:page?", component: ListBestContent }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/list/:boardId/save/:page?", component: ListSaveContent }));
    };
    return List;
}(RouteComponent));
exports.List = List;
/**
 
 */
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ boardId: "", boardName: "" });
        return _this;
    }
    Category.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boardName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getListCategory(this.props.boardId, this.context.router)];
                    case 1:
                        boardName = _a.sent();
                        this.setState({ boardId: this.props.boardId, boardName: boardName });
                        return [2 /*return*/];
                }
            });
        });
    };
    //<i className="fa fa-window-maximize fa-lg"></i> 之前导航中的首页图标，因为不好看暂时去掉了
    //fa-lg, fa-2x, fa-3x, fa-4x, fa-5x 分别是将icon扩大到原来的133%, 2倍，3倍，4倍和5倍
    Category.prototype.render = function () {
        var listUrl = "/list/" + this.state.boardId;
        return React.createElement("div", { className: "row", style: { alignItems: "baseline", width: "100% ", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" } },
            React.createElement("a", { style: { color: "grey", fontSize: "1rem", marginRight: "0.5rem" }, href: " / " }, "\u9996\u9875"),
            React.createElement("i", { className: "fa fa-chevron-right" }),
            React.createElement("a", { style: { color: "grey", fontSize: "1rem", marginLeft: "0.5rem" }, href: listUrl }, this.state.boardName));
    };
    return Category;
}(RouteComponent));
exports.Category = Category;
var ListHead = /** @class */ (function (_super) {
    __extends(ListHead, _super);
    function ListHead(props, content) {
        var _this = _super.call(this, props, content) || this;
        var initFollow = Utility.isFollowThisBoard(_this.props.boardId);
        _this.follow = _this.follow.bind(_this);
        _this.unfollow = _this.unfollow.bind(_this);
        _this.state = {
            imgUrl: '/images/ListImg.jpg',
            listName: '学术信息',
            todayTopics: 210,
            totalTopics: 12000,
            adsUrl: '/images/ads.jpg',
            listManager: [],
            isAnomynous: false,
            isEncrypted: false,
            isHidden: false,
            isLocked: false,
            isFollow: initFollow
        };
        return _this;
    }
    ListHead.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.followBoard(this.props.boardId)];
                    case 1:
                        _a.sent();
                        this.setState({ isFollow: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.unfollowBoard(this.props.boardId)];
                    case 1:
                        _a.sent();
                        this.setState({ isFollow: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBoardMessage(this.props.boardId, this.context.router)];
                    case 1:
                        data = _a.sent();
                        this.setState({
                            listName: data.name, todayTopics: data.todayCount, totalTopics: data.topicCount, listManager: data.boardMasters
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.componentWillRecieveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBoardMessage(newProps.boardId, this.context.router)];
                    case 1:
                        data = _a.sent();
                        this.setState({
                            listName: data.name, todayTopics: data.todayCount, totalTopics: data.topicCount, listManager: data.boardMasters
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.generateMasters = function (item) {
        var name = item.toString();
        var userName = encodeURIComponent(item.toString());
        var webUrl = "/user/name/" + userName;
        return React.createElement("div", { style: { marginRight: '10px' } },
            React.createElement("a", { href: webUrl }, name));
    };
    ListHead.prototype.render = function () {
        return React.createElement("div", { className: "column", style: { width: "100%" } },
            React.createElement("div", { className: "row", style: { flexDirection: 'row', justifyContent: 'space-between' } },
                React.createElement("div", { style: { flexgrow: '1', flexDirection: 'row', display: 'flex' } },
                    React.createElement("div", { id: "ListImg" },
                        React.createElement("img", { src: this.state.imgUrl })),
                    React.createElement("div", { className: "column", style: { marginTop: '1.25rem', marginLeft: '0.625rem' } },
                        React.createElement("div", { className: "row", style: { marginTop: '0.625rem' } },
                            React.createElement("div", null, "\u4ECA\u65E5\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: '0.625rem' } }, this.state.todayTopics)),
                        React.createElement("div", { className: "row", style: { marginTop: '0.625rem' } },
                            React.createElement("div", null, "\u603B\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: '1.25rem' } }, this.state.totalTopics)))),
                React.createElement("div", { className: "column", style: { flexgrow: '0' } },
                    React.createElement("div", { id: "like" },
                        React.createElement("button", { onClick: this.state.isFollow ? this.unfollow : this.follow, className: "followBoard" }, this.state.isFollow ? "取消关注" : "关注版面"),
                        "  "),
                    React.createElement("div", null,
                        React.createElement("img", { src: this.state.adsUrl, style: { width: '15.625rem', height: '3.75rem' } })))),
            React.createElement("div", { className: "row", style: { marginTop: '0.3125rem' } },
                React.createElement("span", null, "\u7248\u4E3B : "),
                React.createElement("div", { className: "row", style: { marginLeft: '0.3125rem' } }, this.state.listManager.map(this.generateMasters))));
    };
    return ListHead;
}(RouteComponent));
exports.ListHead = ListHead;
var ListNotice = /** @class */ (function (_super) {
    __extends(ListNotice, _super);
    function ListNotice(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
        };
        return _this;
    }
    ListNotice.prototype.render = function () {
        return React.createElement("div", { className: "notice", style: { marginTop: '0.625rem' } },
            React.createElement("div", { style: { backgroundColor: "#3399FE" } },
                React.createElement("div", { style: { marginLeft: '0.9375rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1rem', color: '#FFFFFF' } }, "\u672C\u7248\u516C\u544A")),
            React.createElement("div", { className: "substance" },
                React.createElement(UbbContainer_1.UbbContainer, { code: this.props.bigPaper })));
    };
    return ListNotice;
}(RouteComponent));
exports.ListNotice = ListNotice;
/**
 * 提供显示连续页码的交互效果。
 */
var ListButtonAndPager = /** @class */ (function (_super) {
    __extends(ListButtonAndPager, _super);
    function ListButtonAndPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    ListButtonAndPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, url: this.props.url, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    ListButtonAndPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    ListButtonAndPager.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    ListButtonAndPager.prototype.render = function () {
        var createTopicUrl = "/createTopic/" + this.props.boardid;
        return React.createElement("div", { className: "row", style: { width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { style: { marginBottom: '1.25rem' } },
                React.createElement(react_router_dom_1.Link, { className: "button orange", to: createTopicUrl }, "\u53D1\u4E3B\u9898"),
                React.createElement("button", { className: "button green", style: { marginLeft: '1.25rem' } }, "\u53D1\u6295\u7968")),
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return ListButtonAndPager;
}(React.Component));
exports.ListButtonAndPager = ListButtonAndPager;
var PagerDown = /** @class */ (function (_super) {
    __extends(PagerDown, _super);
    function PagerDown(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    PagerDown.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, url: this.props.url, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    PagerDown.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    PagerDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    PagerDown.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '100%', marginTop: '0.9375rem', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return PagerDown;
}(React.Component));
exports.PagerDown = PagerDown;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var pageUrl;
        if (this.props.pageNumber > 0) {
            pageUrl = "" + this.props.url + this.props.pageNumber;
            if (this.props.pageNumber !== this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link" }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link " }, this.props
                        .pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            pageUrl = "" + this.props.url + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039"));
        }
        else if (this.props.pageNumber == -2) {
            pageUrl = "" + this.props.url + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A"));
        }
        else if (this.props.pageNumber == -3) {
            pageUrl = this.props.url + "1";
            return React.createElement("li", { className: "page-item" },
                " ",
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u00AB"));
        }
        else if (this.props.pageNumber == -4) {
            pageUrl = "" + this.props.url + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u00BB"));
        }
        else {
            return null;
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
var ListTag = /** @class */ (function (_super) {
    __extends(ListTag, _super);
    function ListTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListTag.prototype.render = function () {
        return React.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginLeft: "0.3125rem", marginRight: "0.3125rem", borderTop: 'dashed #EAEAEA thin', marginTop: '1.5625rem', marginBottom: '25px' } },
            React.createElement("div", { className: "row" },
                "  ",
                React.createElement("button", { id: "tagButton" }, "\u5168\u90E8"),
                React.createElement("button", { className: "chooseTag" },
                    "dota ",
                    React.createElement("span", { className: "tagNumber" }, "1234")),
                React.createElement("button", { className: "chooseTag" },
                    "csgo ",
                    React.createElement("span", { className: "tagNumber" }, "5687"))));
    };
    return ListTag;
}(React.Component));
exports.ListTag = ListTag;
var ListTopContent = /** @class */ (function (_super) {
    __extends(ListTopContent, _super);
    function ListTopContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { data: [] };
        return _this;
    }
    ListTopContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
    };
    ListTopContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.GetTopTopics(this.props.boardId)];
                    case 1:
                        data = _a.sent();
                        this.setState({ data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListTopContent.prototype.render = function () {
        return React.createElement("div", null, this.state.data.map(this.convertTopicToElement));
    };
    return ListTopContent;
}(React.Component));
exports.ListTopContent = ListTopContent;
var BestTopics = /** @class */ (function (_super) {
    __extends(BestTopics, _super);
    function BestTopics(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ data: [] });
        return _this;
    }
    BestTopics.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBestTopics(this.props.boardId, this.props.curPage)];
                    case 1:
                        data = _a.sent();
                        this.setState({ data: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    BestTopics.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
    };
    BestTopics.prototype.render = function () {
        return React.createElement("div", null, this.state.data.map(this.convertTopicToElement));
    };
    return BestTopics;
}(React.Component));
exports.BestTopics = BestTopics;
var ListContent = /** @class */ (function (_super) {
    __extends(ListContent, _super);
    function ListContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { items: [], totalPage: 0 };
        return _this;
    }
    ListContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBoardTopicAsync(1, this.match.params.boardId, this.context.router)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.getTotalListPage(this.match.params.boardId)];
                    case 2:
                        totalPage = _a.sent();
                        this.setState({ items: data, totalPage: totalPage });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
    };
    ListContent.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, p, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = newProps.match.params.page;
                        // 未提供页码，防止出错不进行后续处理
                        if (!p) {
                            page = 1;
                        }
                        else {
                            page = parseInt(p);
                        }
                        return [4 /*yield*/, Utility.getBoardTopicAsync(page, newProps.match.params.boardId, this.context.router)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.getTotalListPage = function (boardId) {
        return __awaiter(this, void 0, void 0, function () {
            var page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getListTotalPage(boardId, this.context.router)];
                    case 1:
                        page = _a.sent();
                        return [2 /*return*/, page];
                }
            });
        });
    };
    ListContent.prototype.render = function () {
        var curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        var topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = React.createElement("div", null,
                React.createElement(ListTopContent, { boardId: this.match.params.boardId }));
        }
        var topics = this.state.items.map(this.convertTopicToElement);
        var bestTopicsUrl = "/list/" + this.match.params.boardId + "/best/";
        var saveTopicsUrl = "/list/" + this.match.params.boardId + "/save/";
        var normalTopicsUrl = "/list/" + this.match.params.boardId + "/normal/";
        return React.createElement("div", { className: "listContent " },
            React.createElement(ListButtonAndPager, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: normalTopicsUrl }),
            React.createElement(ListTag, null),
            React.createElement("div", { className: "row", style: { justifyContent: 'space-between', } },
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { className: "listContentTag" }, "\u5168\u90E8"),
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: bestTopicsUrl }, "\u7CBE\u534E")),
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: saveTopicsUrl }, "\u4FDD\u5B58"))),
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { style: { marginRight: '14rem' } },
                        React.createElement("span", null, "\u4F5C\u8005")),
                    React.createElement("div", { style: { marginRight: '7.6875rem' } },
                        React.createElement("span", null, "\u6700\u540E\u56DE\u590D")))),
            topTopics,
            React.createElement("div", null, topics),
            React.createElement(PagerDown, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: normalTopicsUrl }));
    };
    return ListContent;
}(RouteComponent));
exports.ListContent = ListContent;
var ListBestContent = /** @class */ (function (_super) {
    __extends(ListBestContent, _super);
    function ListBestContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { items: [], totalPage: 0 };
        return _this;
    }
    ListBestContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBestTopics(1, this.match.params.boardId)];
                    case 1:
                        data = _a.sent();
                        totalPage = data.totalPage;
                        this.setState({
                            items: data.boardtopics, totalPage: totalPage
                        });
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ListBestContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
    };
    ListBestContent.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, p, data, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = newProps.match.params.page;
                        // 未提供页码，防止出错不进行后续处理
                        if (!p) {
                            page = 1;
                        }
                        else {
                            page = parseInt(p);
                        }
                        return [4 /*yield*/, Utility.getBestTopics(page, newProps.match.params.boardId)];
                    case 1:
                        data = _a.sent();
                        totalPage = data.totalPage;
                        this.setState({
                            items: data.boardtopics, totalPage: totalPage
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListBestContent.prototype.render = function () {
        var curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        var topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = React.createElement("div", null,
                React.createElement(ListTopContent, { boardId: this.match.params.boardId }));
        }
        var topics = this.state.items.map(this.convertTopicToElement);
        var bestTopicsUrl = "/list/" + this.match.params.boardId + "/best/";
        var saveTopicsUrl = "/list/" + this.match.params.boardId + "/save/";
        var normalTopicsUrl = "/list/" + this.match.params.boardId + "/normal/";
        return React.createElement("div", { className: "listContent " },
            React.createElement(ListButtonAndPager, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: bestTopicsUrl }),
            React.createElement(ListTag, null),
            React.createElement("div", { className: "row", style: { justifyContent: 'space-between', } },
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: normalTopicsUrl }, "\u5168\u90E8")),
                    React.createElement("div", { className: "listContentTag" }, "\u7CBE\u534E"),
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: saveTopicsUrl }, "\u4FDD\u5B58"))),
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { style: { marginRight: '14rem' } },
                        React.createElement("span", null, "\u4F5C\u8005")),
                    React.createElement("div", { style: { marginRight: '7.6875rem' } },
                        React.createElement("span", null, "\u6700\u540E\u56DE\u590D")))),
            topTopics,
            React.createElement("div", null, topics),
            React.createElement(PagerDown, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: bestTopicsUrl }));
    };
    return ListBestContent;
}(RouteComponent));
exports.ListBestContent = ListBestContent;
var ListSaveContent = /** @class */ (function (_super) {
    __extends(ListSaveContent, _super);
    function ListSaveContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { items: [], totalPage: 0 };
        return _this;
    }
    ListSaveContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getSaveTopics(1, this.match.params.boardId)];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        totalPage = data.totalPage;
                        this.setState({ items: data.boardtopics, totalPage: totalPage });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListSaveContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.id, title: item.title, userName: item.userName, id: item.id, userId: item.userId, lastPostTime: item.lastPostTime, lastPostUser: item.lastPostUser, likeCount: item.likeCount, dislikeCount: item.dislikeCount, replyCount: item.replyCount, highlightInfo: item.highlightInfo, topState: item.topState, topicState: item.topicState, hitCount: item.hitCount });
    };
    ListSaveContent.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, p, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = newProps.match.params.page;
                        // 未提供页码，防止出错不进行后续处理
                        if (!p) {
                            page = 1;
                        }
                        else {
                            page = parseInt(p);
                        }
                        return [4 /*yield*/, Utility.getSaveTopics(page, newProps.match.params.boardId)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data.boardtopics });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListSaveContent.prototype.render = function () {
        var curPage = this.match.params.page ? parseInt(this.match.params.page) : 1;
        var topTopics = null;
        if (parseInt(this.match.params.page) === 1 || !this.match.params.page) {
            topTopics = React.createElement("div", null,
                React.createElement(ListTopContent, { boardId: this.match.params.boardId }));
        }
        var topics = this.state.items.map(this.convertTopicToElement);
        var bestTopicsUrl = "/list/" + this.match.params.boardId + "/best/";
        var saveTopicsUrl = "/list/" + this.match.params.boardId + "/save/";
        var normalTopicsUrl = "/list/" + this.match.params.boardId + "/normal/";
        return React.createElement("div", { className: "listContent " },
            React.createElement(ListButtonAndPager, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: normalTopicsUrl }),
            React.createElement(ListTag, null),
            React.createElement("div", { className: "row", style: { justifyContent: 'space-between', } },
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: normalTopicsUrl }, "\u5168\u90E8")),
                    React.createElement("div", { className: "listContentTag" },
                        React.createElement("a", { href: bestTopicsUrl }, "\u7CBE\u534E")),
                    React.createElement("div", { className: "listContentTag" }, "\u4FDD\u5B58")),
                React.createElement("div", { className: "row", style: { alignItems: 'center' } },
                    React.createElement("div", { style: { marginRight: '14rem' } },
                        React.createElement("span", null, "\u4F5C\u8005")),
                    React.createElement("div", { style: { marginRight: '7.6875rem' } },
                        React.createElement("span", null, "\u6700\u540E\u56DE\u590D")))),
            topTopics,
            React.createElement("div", null, topics),
            React.createElement(PagerDown, { page: curPage, totalPage: this.state.totalPage, boardid: this.match.params.boardId, url: normalTopicsUrl }));
    };
    return ListSaveContent;
}(RouteComponent));
exports.ListSaveContent = ListSaveContent;
var TopicTitleAndContent = /** @class */ (function (_super) {
    __extends(TopicTitleAndContent, _super);
    function TopicTitleAndContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = ({ pager: [] });
        return _this;
    }
    TopicTitleAndContent.prototype.componentWillMount = function () {
        var count = this.props.replyCount + 1;
        var totalPage = (count - count % 10) / 10 + 1;
        if (count % 10 === 0)
            totalPage = count / 10;
        var pager = Utility.getListPager(totalPage);
        var titleId = "#title" + this.props.id;
        this.setState({ pager: pager });
    };
    TopicTitleAndContent.prototype.componentDidMount = function () {
        var titleId = "#title" + this.props.id;
        if (this.props.highlightInfo != null) {
            if (this.props.highlightInfo.isBold == true) {
                $(titleId).css("font-weight", "bold");
            }
            if (this.props.highlightInfo.isItalic == true) {
                $(titleId).css("font-style", "italic");
            }
            if (this.props.highlightInfo.color != null) {
                $(titleId).css("color", this.props.highlightInfo.color);
            }
        }
        this.setState({});
    };
    TopicTitleAndContent.prototype.generateListPager = function (item) {
        var url = "/topic/" + this.props.id + "/" + item;
        if (item != -1) {
            return React.createElement("div", { style: { marginRight: "0.3rem" } },
                React.createElement("a", { style: { color: "red" }, href: url }, item));
        }
        else {
            return React.createElement("div", { style: { marginRight: "0.3rem" } }, "...");
        }
    };
    TopicTitleAndContent.prototype.render = function () {
        var colorId;
        if (this.props.topState === 0) {
            colorId = "changeColor";
        }
        else {
            colorId = "changeTopColor";
        }
        var topicId = "topic" + this.props.id;
        var url = "/topic/" + this.props.id;
        var titleId = "title" + this.props.id;
        var icon;
        if (this.props.topState === 0) {
            icon = React.createElement("i", { style: { color: "#B0B0B0" }, className: "fa fa-envelope fa-lg" });
        }
        else if (this.props.topState === 2) {
            icon = React.createElement("i", { style: { color: "orange" }, className: "fa fa-chevron-circle-up fa-lg" });
        }
        else if (this.props.topState === 4) {
            icon = React.createElement("i", { style: { color: "red" }, className: "fa fa-arrow-circle-up fa-lg" });
        }
        if (this.props.replyCount > 100 && this.props.topState === 0) {
            icon = React.createElement("i", { style: { color: "red" }, className: "fa fa-envelope-open fa-lg" });
        }
        var curName = Utility.getLocalStorage("userInfo").name;
        if (!curName)
            curName = "";
        if (curName === this.props.userName) {
            icon = React.createElement("i", { style: { color: "#FFC90E" }, className: "fa fa-envelope fa-lg" });
        }
        //1是锁贴
        if (this.props.topicState === 1) {
            icon = React.createElement("i", { style: { color: "#B0B0B0" }, className: "fa fa-lock fa-lg" });
        }
        var hitCount = this.props.hitCount;
        if (this.props.hitCount > 100000) {
            hitCount = ((this.props.hitCount - this.props.hitCount % 10000) / 10000).toString() + '万';
        }
        else if (this.props.hitCount > 10000) {
            hitCount = (this.props.hitCount / 10000).toFixed(1).toString() + '万';
        }
        return React.createElement("div", { id: colorId },
            React.createElement("div", { className: "row topicInList", id: topicId },
                React.createElement("div", { style: { display: "flex", marginLeft: "0.5rem", alignItems: "flex-end" } },
                    icon,
                    React.createElement(react_router_dom_1.Link, { to: url },
                        React.createElement("div", { className: "listTitle", id: titleId, style: { marginLeft: '0.5rem', } },
                            " ",
                            this.props.title)),
                    React.createElement("div", { style: { display: "flex", fontSize: "0.75rem", marginBottom: "-2px", marginLeft: "1rem" } }, this.state.pager.map(this.generateListPager.bind(this)))),
                React.createElement("div", { className: "row", style: { width: "50%", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "-4px" } },
                    React.createElement("div", { style: { width: "8rem", textAlign: "center" } },
                        " ",
                        React.createElement("span", null,
                            React.createElement("a", null, this.props.userName || '匿名'))),
                    React.createElement("div", { className: "row", style: { width: "10rem" } },
                        React.createElement("div", { id: "liked", style: { display: "flex", width: "2rem" } },
                            React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.props.likeCount)),
                        React.createElement("div", { id: "disliked", style: { display: "flex", width: "4.5rem" } },
                            React.createElement("i", { className: "fa fa-eye fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, hitCount)),
                        React.createElement("div", { id: "commentsAmount", style: { display: "flex", width: "3.5rem" } },
                            React.createElement("i", { className: "fa fa-commenting-o fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.props.replyCount))),
                    React.createElement("div", { id: "lastReply", style: { width: "8rem", textAlign: "center" } },
                        React.createElement("div", null,
                            this.props.lastPostUser,
                            " ")),
                    React.createElement("div", { style: { width: "12rem", textAlign: "center" } },
                        React.createElement("div", { style: { wordBreak: "keepAll" } }, moment(this.props.lastPostTime).format('YY-MM-DD HH:mm'))))));
    };
    return TopicTitleAndContent;
}(React.Component));
exports.TopicTitleAndContent = TopicTitleAndContent;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(3);
var RouteComponent_1 = __webpack_require__(9);
var Topic_HotReply_1 = __webpack_require__(80);
var Topic_SendTopic_1 = __webpack_require__(82);
var Topic_Category_1 = __webpack_require__(83);
var Topic_Pager_1 = __webpack_require__(84);
var Topic_Topic_1 = __webpack_require__(22);
var Topic_Reply_1 = __webpack_require__(89);
var Constants;
(function (Constants) {
})(Constants = exports.Constants || (exports.Constants = {}));
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.state = { page: 1, topicid: _this.match.params.topicid, totalPage: 1, userName: null };
        return _this;
    }
    Post.prototype.componentDidUpdate = function () {
        scrollTo(0, 0);
    };
    Post.prototype.handleChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, totalPage, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        userName = this.match.params.userName;
                        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, userName, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        userName = newProps.match.params.userName;
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, totalPage, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        userName = this.match.params.userName;
                        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.getTotalPage = function (topicId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Utility.getTotalReplyCount(topicId, this.context.router)];
            });
        });
    };
    Post.prototype.returnTopic = function () {
        return React.createElement(Topic_Topic_1.PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid, userId: null });
    };
    Post.prototype.render = function () {
        var topic = null;
        var hotReply = null;
        if (this.state.page === 1) {
            topic = React.createElement(Topic_Topic_1.PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid, userId: null });
            hotReply = React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/:page?", component: Topic_HotReply_1.HotReply });
        }
        return React.createElement("div", { className: "center" },
            React.createElement("div", { className: "row", style: { width: "100%", justifyContent: 'space-between', alignItems: "center" } },
                React.createElement(Topic_Category_1.Category, { topicId: this.state.topicid }),
                React.createElement(Topic_Pager_1.TopicPager, { page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage })),
            topic,
            hotReply,
            React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/:page?", component: Topic_Reply_1.Reply }),
            React.createElement(Topic_Pager_1.TopicPagerDown, { page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            React.createElement(Topic_SendTopic_1.SendTopic, { onChange: this.handleChange, topicid: this.state.topicid }));
    };
    return Post;
}(RouteComponent_1.RouteComponent));
exports.Post = Post;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UbbContainer_1 = __webpack_require__(4);
var ReplyContent = /** @class */ (function (_super) {
    __extends(ReplyContent, _super);
    function ReplyContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.showManageUI = _this.showManageUI.bind(_this);
        _this.showJudgeUI = _this.showJudgeUI.bind(_this);
        _this.state = {
            likeNumber: 1,
            dislikeNumber: 1,
            likeState: 0,
            postId: _this.props.postid
        };
        return _this;
    }
    ReplyContent.prototype.showManageUI = function () {
        var UIId = "#manage" + this.props.postid;
        $(UIId).css("display", "");
    };
    ReplyContent.prototype.showJudgeUI = function () {
        var UIId = "#judge" + this.props.postid;
        console.log(UIId);
        $(UIId).css("display", "");
    };
    ReplyContent.prototype.componentDidUpdate = function () {
        var divid = "doc-content" + this.props.postid;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    };
    ReplyContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idLike, idDislike, data, divid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idLike = "#like" + this.props.postid;
                        idDislike = "#dislike" + this.props.postid;
                        return [4 /*yield*/, Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data.likeState === 1) {
                            $(idLike).css("color", "red");
                        }
                        else if (data.likeState === 2) {
                            $(idDislike).css("color", "red");
                        }
                        divid = "doc-content" + this.props.postid;
                        editormd.markdownToHTML(divid, {
                            htmlDecode: "style,script,iframe",
                            emoji: true,
                            taskList: true,
                            tex: true,
                            flowChart: true,
                            sequenceDiagram: true,
                            codeFold: true,
                        });
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    ReplyContent.prototype.like = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idLike, idDislike, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idLike = "#like" + this.props.postid;
                        idDislike = "#dislike" + this.props.postid;
                        if (!(this.state.likeState === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 1:
                        _a.sent();
                        $(idLike).css("color", "black");
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.state.likeState === 2)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 4:
                        _a.sent();
                        $(idLike).css("color", "red");
                        $(idDislike).css("color", "black");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 6:
                        _a.sent();
                        $(idLike).css("color", "red");
                        _a.label = 7;
                    case 7: return [4 /*yield*/, Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router)];
                    case 8:
                        data = _a.sent();
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    ReplyContent.prototype.dislike = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idLike, idDislike, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idLike = "#like" + this.props.postid;
                        idDislike = "#dislike" + this.props.postid;
                        if (!(this.state.likeState === 2)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 1:
                        _a.sent();
                        $(idDislike).css("color", "black");
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.state.likeState === 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 4:
                        _a.sent();
                        $(idLike).css("color", "black");
                        $(idDislike).css("color", "red");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 6:
                        _a.sent();
                        $(idDislike).css("color", "red");
                        _a.label = 7;
                    case 7: return [4 /*yield*/, Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router)];
                    case 8:
                        data = _a.sent();
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    ReplyContent.prototype.render = function () {
        var idLike = "like" + this.props.postid;
        var idDislike = "dislike" + this.props.postid;
        var divid = "doc-content" + this.props.postid;
        var ubbMode = React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content });
        var mdMode = React.createElement("div", { id: divid },
            React.createElement("textarea", { name: "editormd-markdown-doc", style: { display: 'none' } }, this.props.content));
        var content;
        //ubb      
        content = ubbMode;
        //md
        if (this.props.contentType === 1) {
            content = mdMode;
        }
        var manageIcon = "icon" + this.props.postid;
        var manageId = "#icon" + this.props.postid;
        if (Utility.getLocalStorage("userInfo")) {
            var privilege = Utility.getLocalStorage("userInfo").privilege;
            var myName = Utility.getLocalStorage("userInfo").name;
            var myId = Utility.getLocalStorage("userInfo").id;
            if (privilege === '管理员' || privilege === '超级版主' || (privilege === '全站贵宾' && myId === this.props.userId)) {
                $(manageId).css("display", "");
            }
            if (this.props.masters) {
                for (var i = 0; i < this.props.masters.length; i++) {
                    if (myName === this.props.masters[i]) {
                        $(manageId).css("display", "");
                    }
                }
            }
        }
        var signature = React.createElement("div", { className: "signature", style: { borderTop: "#eaeaea solid thin" } },
            React.createElement(UbbContainer_1.UbbContainer, { code: this.props.signature }));
        if (this.props.signature == "") {
            signature = null;
        }
        return React.createElement("div", { className: "root", style: { marginTop: "-170px" } },
            React.createElement("div", { className: "reply-content" },
                React.createElement("div", { className: "substance" }, content),
                React.createElement("div", { className: "comment1" },
                    React.createElement("div", { id: idLike, className: "upup", style: { marginRight: "0.7rem" } },
                        React.createElement("i", { title: "赞", onClick: this.like.bind(this), className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: idDislike, className: "downdown" },
                        React.createElement("i", { title: "踩", onClick: this.dislike.bind(this), className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike" },
                        " ",
                        React.createElement("div", { style: { cursor: "pointer" }, className: "commentbutton", onClick: this.showJudgeUI }, "   \u8BC4\u5206"),
                        React.createElement("div", { className: "operation1", id: manageIcon, style: { display: "none", cursor: "pointer" }, onClick: this.showManageUI }, "\u7BA1\u7406"))),
                signature));
    };
    return ReplyContent;
}(React.Component));
exports.ReplyContent = ReplyContent;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var LogOnExact_1 = __webpack_require__(115);
var Logoff_1 = __webpack_require__(116);
/**
 * 用户中心页面
 */
var LogOn = /** @class */ (function (_super) {
    __extends(LogOn, _super);
    function LogOn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogOn.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Route, { path: "/logon", exact: true, component: LogOnExact_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/logon/logoff", component: Logoff_1.LogOff }))));
    };
    return LogOn;
}(React.Component));
exports.LogOn = LogOn;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
var ImageTagHandler = /** @class */ (function (_super) {
    __extends(ImageTagHandler, _super);
    function ImageTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'img'; },
        enumerable: true,
        configurable: true
    });
    ;
    ImageTagHandler.prototype.execCore = function (content, tagData, context) {
        var imageUri = content;
        var title = tagData.value('title');
        var isShowedValue = parseInt(tagData.value('img'));
        // 不允许显示图像
        if (!context.options.allowImage) {
            return React.createElement(Image, { imageUri: imageUri, title: title, isShowed: false });
        }
        //[img=1]默认不显示图片，[img]或[img=0]默认显示图片
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            if (isShowedValue === 1) {
                return React.createElement(Image, { imageUri: imageUri, title: title, isShowed: false });
            }
            else {
                return React.createElement("figure", null,
                    React.createElement(Image, { imageUri: imageUri, title: title, isShowed: true }),
                    React.createElement("figcaption", null, title));
            }
        }
        else {
            if (isShowedValue === 1) {
                return React.createElement(Image, { imageUri: imageUri, title: title, isShowed: false });
            }
            else {
                return React.createElement(Image, { imageUri: imageUri, title: title, isShowed: true });
            }
        }
    };
    return ImageTagHandler;
}(Ubb.TextTagHandler));
exports.ImageTagHandler = ImageTagHandler;
/*
 *图片组件
 *用于控制图片是否默认显示
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isShowed: _this.props.isShowed
        };
        _this.toggleIsShowed = _this.toggleIsShowed.bind(_this); //别再忘了bind了！！  “bind一般放在构造过程中” ——樱桃
        return _this;
    }
    Image.prototype.toggleIsShowed = function () {
        console.log("显示图片！");
        this.setState(function (prevState) { return ({
            isShowed: !prevState.isShowed //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }); });
    };
    Image.prototype.render = function () {
        if (this.state.isShowed) {
            return React.createElement("img", { style: { maxWidth: '100%' }, src: this.props.imageUri, alt: this.props.title });
        }
        else {
            return React.createElement("div", { className: "hiddenImage", onClick: this.toggleIsShowed }, "\u70B9\u51FB\u67E5\u770B\u56FE\u7247");
        }
    };
    return Image;
}(React.Component));
exports.Image = Image;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UserDetails = /** @class */ (function (_super) {
    __extends(UserDetails, _super);
    function UserDetails(props) {
        var _this = _super.call(this, props) || this;
        _this.unfollow = _this.unfollow.bind(_this);
        _this.follow = _this.follow.bind(_this);
        _this.state = ({
            portraitUrl: null, userName: null, fanCount: null, displayTitle: null, birthday: null, gender: null, prestige: null, levelTitle: null, buttonInfo: '关注',
            buttonIsDisabled: false,
            isFollowing: false
        });
        return _this;
    }
    UserDetails.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, url, headers, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '取关中'
                        });
                        token = Utility.getLocalStorage("accessToken");
                        userId = this.props.userId;
                        url = "http://apitest.niconi.cc/user/unfollow/" + userId;
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'DELETE',
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '重新关注',
                                isFollowing: false
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '取关失败',
                            isFollowing: true
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDetails.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, url, headers, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '关注中'
                        });
                        token = Utility.getLocalStorage("accessToken");
                        userId = this.props.userId;
                        url = "http://apitest.niconi.cc/user/follow/" + userId;
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '取消关注',
                                isFollowing: true
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '关注失败',
                            isFollowing: false
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDetails.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getUserDetails(this.props.userName, this.context.router)];
                    case 1:
                        data = _a.sent();
                        this.setState({ portraitUrl: data.portraitUrl, userName: data.userName, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing, buttonInfo: data.isFollowing ? '取消关注' : '关注' });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDetails.prototype.render = function () {
        var title = this.state.displayTitle;
        if (this.state.displayTitle === null) {
            title = this.state.levelTitle;
        }
        var year = moment(this.state.birthday).format("YYYY");
        var birthday;
        if (year === "9999") {
            birthday = moment(this.state.birthday).format("MM-DD");
        }
        else {
            birthday = moment(this.state.birthday).format("YYYY-MM-DD");
        }
        if (this.state.birthday == null) {
            birthday = '保密';
        }
        var gender;
        if (this.state.gender === 0) {
            gender = React.createElement("i", { style: { color: "pink" }, className: "fa fa-venus fa-lg fa-fw" });
        }
        else {
            gender = React.createElement("i", { style: { color: "blue" }, className: "fa fa-mars fa-lg fa-fw" });
        }
        var url = "/user/name/" + this.props.userName;
        var userUrl = encodeURI(url);
        var urlHtml = React.createElement("a", { href: userUrl },
            " ",
            React.createElement("img", { src: this.state.portraitUrl }));
        return React.createElement("div", { className: 'popup' },
            React.createElement("div", { className: 'popup_title' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "row authorImg", style: { marginLeft: "10px", marginTop: "10px" } }, urlHtml),
                    React.createElement("div", { className: "column", style: { marginLeft: "1.6rem", marginTop: "2rem" } },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { style: { fontFamily: "微软雅黑", color: "blue", marginRight: "0.63rem", width: "8rem" } },
                                " ",
                                this.state.userName),
                            React.createElement("div", { style: { marginRight: "0.63rem", fontSize: "1rem" } }, "   \u7C89\u4E1D  "),
                            React.createElement("div", { style: { color: "red", fontSize: "1rem" } }, this.state.fanCount)),
                        React.createElement("div", { className: "row", style: { marginTop: "0.63rem", fontSize: "0.87rem" } }, title)),
                    React.createElement("div", null,
                        React.createElement("button", { className: "followuser", id: this.state.isFollowing ? '' : 'follow', onClick: this.state.isFollowing ? this.unfollow : this.follow, disabled: this.state.buttonIsDisabled }, this.state.buttonInfo))),
                React.createElement("div", { className: "row", style: { fontSize: "0.87rem" } },
                    React.createElement("div", { style: { marginLeft: "7.2rem" } },
                        "\u5A01\u671B\u00A0",
                        this.state.prestige),
                    React.createElement("div", { style: { marginLeft: "1rem" } },
                        "\u751F\u65E5\u00A0",
                        birthday),
                    React.createElement("div", { style: { marginLeft: "1rem" } }, gender))));
    };
    return UserDetails;
}(React.Component));
exports.UserDetails = UserDetails;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
/**
 * 组件状态
 */
var UbbEditorState = /** @class */ (function () {
    function UbbEditorState() {
    }
    return UbbEditorState;
}());
/**
 * UBB编辑器组件
 */
var UbbEditor = /** @class */ (function (_super) {
    __extends(UbbEditor, _super);
    function UbbEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: '',
            selectionEnd: 0,
            selectionStart: 0,
            clicked: false,
            extendValue: '',
            extendTagName: ''
        };
        _this.handleExtendValueChange = _this.handleExtendValueChange.bind(_this);
        _this.handleTextareaChange = _this.handleTextareaChange.bind(_this);
        _this.handleTextareaBlur = _this.handleTextareaBlur.bind(_this);
        _this.handleButtonClick = _this.handleButtonClick.bind(_this);
        return _this;
    }
    UbbEditor.prototype.handleExtendButtonClick = function (tagName) {
        this.setState(function (prevState) { return ({
            extendTagName: prevState.extendTagName !== tagName ? tagName : ''
        }); });
        this.input.focus();
    };
    UbbEditor.prototype.handleExtendValueChange = function (value) {
        this.setState({
            extendValue: value
        });
    };
    UbbEditor.prototype.handleTextareaChange = function (value) {
        this.props.update(value);
        this.setState({
            value: value
        });
    };
    UbbEditor.prototype.handleTextareaBlur = function (start, end) {
        this.setState({
            selectionEnd: end,
            selectionStart: start
        });
    };
    UbbEditor.prototype.handleUpload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.uploadFile(file)];
                    case 1:
                        res = _a.sent();
                        this.handleButtonClick('img', "http://apitest.niconi.cc/" + res.content);
                        return [2 /*return*/];
                }
            });
        });
    };
    UbbEditor.prototype.handleButtonClick = function (name, value) {
        if (value === void 0) { value = ''; }
        var shouldReplaceSelection = ['video', 'audio', 'img'].indexOf(name) !== -1;
        var hasDefaultSelection = ['url'].indexOf(name) !== -1;
        this.setState(function (prevState) {
            var before = prevState.value.slice(0, prevState.selectionStart), selected = prevState.value.slice(prevState.selectionStart, prevState.selectionEnd), after = prevState.value.slice(prevState.selectionEnd, prevState.value.length);
            if (shouldReplaceSelection) {
                before = before + "[" + name + "]";
                selected = value;
                after = "[/" + name + "]" + after;
            }
            else if (hasDefaultSelection) {
                before = before + "[" + name + (value ? "=" + value : '') + "]";
                selected = selected || value;
                after = "[/" + name + "]" + after;
            }
            else {
                before = before + "[" + name + (value ? "=" + value : '') + "]";
                after = "[/" + name + "]" + after;
            }
            return {
                value: before + selected + after,
                selectionStart: before.length,
                selectionEnd: before.length + selected.length,
                clicked: true,
                extendTagName: '',
                extendValue: ''
            };
        });
    };
    UbbEditor.prototype.componentDidUpdate = function () {
        if (this.state.clicked) {
            this.content.focus();
            this.content.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
            this.setState({
                clicked: false
            });
        }
    };
    UbbEditor.prototype.render = function () {
        var _this = this;
        var size = ['', 1, 2, 3, 4, 5, 6, 7];
        var color = ['颜色', 'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
        var textarea = (React.createElement("textarea", { onInput: function () { return (''); }, value: this.state.value, onChange: function (e) { _this.handleTextareaChange(e.target.value); }, onBlur: function (e) {
                var target = e.target;
                _this.handleTextareaBlur(target.selectionStart, target.selectionEnd);
            }, ref: function (textarea) {
                _this.content = textarea;
            } }));
        return (React.createElement("div", { className: "ubb-editor" },
            React.createElement("div", { className: "editor-buttons" },
                React.createElement("div", { className: "editor-buttons-styles" },
                    React.createElement("button", { className: "fa-bold", type: "button", title: "加粗", onClick: function () { _this.handleButtonClick('b'); } }),
                    React.createElement("button", { className: "fa-italic", type: "button", title: "斜体", onClick: function () { _this.handleButtonClick('i'); } }),
                    React.createElement("button", { className: "fa-underline", type: "button", title: "下划线", onClick: function () { _this.handleButtonClick('u'); } }),
                    React.createElement("button", { className: "fa-align-left", type: "button", title: "左对齐", onClick: function () { _this.handleButtonClick('align', 'left'); } }),
                    React.createElement("button", { className: "fa-align-center", type: "button", title: "居中", onClick: function () { _this.handleButtonClick('align', 'center'); } }),
                    React.createElement("button", { className: "fa-align-right", type: "button", title: "右对齐", onClick: function () { _this.handleButtonClick('align', 'right'); } })),
                React.createElement("div", { className: "editor-buttons-selects" },
                    React.createElement("p", { className: "fa-text-height" }),
                    React.createElement("select", { onChange: function (e) { _this.handleButtonClick('size', e.target.value); e.target.value = 0; }, value: 0 }, size.map(function (value, index) { return (React.createElement("option", { value: index, disabled: index === 0, style: { display: index === 0 ? 'none' : '' } }, value)); })),
                    React.createElement("p", { className: "fa-text-height" }),
                    React.createElement("select", { onChange: function (e) { _this.handleButtonClick('color', e.target.value); e.target.value = "颜色"; }, value: "颜色" }, color.map(function (value, index) { return (React.createElement("option", { value: value, disabled: index === 0, style: { backgroundColor: value, display: index === 0 ? 'none' : '' } })); }))),
                React.createElement("div", { className: "editor-buttons-extends" },
                    React.createElement("button", { className: "fa-link", type: "button", title: "插入url", onClick: function () { _this.handleExtendButtonClick('url'); } }),
                    React.createElement("button", { className: "fa-picture-o", type: "button", title: "插入图片", onClick: function () { _this.handleExtendButtonClick('img'); } }),
                    React.createElement("button", { className: "fa-film", type: "button", title: "插入视频", onClick: function () { _this.handleExtendButtonClick('video'); } }),
                    React.createElement("button", { className: "fa-music", type: "button", title: "插入音频", onClick: function () { _this.handleExtendButtonClick('audio'); } }))),
            React.createElement("div", { className: "ubb-extend", style: { height: this.state.extendTagName ? '2rem' : '0rem' } },
                React.createElement("p", null, "\u8BF7\u8F93\u5165\u5730\u5740\uFF1A"),
                React.createElement("input", { type: "text", value: this.state.extendValue, onChange: function (e) { _this.handleExtendValueChange(e.target.value); }, ref: function (it) { _this.input = it; } }),
                this.state.extendTagName === 'img' ? React.createElement("label", { className: "fa-upload", htmlFor: "upload" }) : null,
                React.createElement("button", { className: "fa-check", type: "button", onClick: function () { _this.handleButtonClick(_this.state.extendTagName, _this.state.extendValue); } }),
                React.createElement("button", { className: "fa-remove", type: "button", onClick: function () { _this.setState({ extendTagName: '' }); } }),
                React.createElement("input", { type: "file", id: "upload", accept: "image/*", style: { display: 'none' }, onChange: function (e) { _this.handleUpload(e.target.files[0]); } })),
            React.createElement("div", { className: "ubb-content" }, textarea)));
    };
    return UbbEditor;
}(React.Component));
exports.UbbEditor = UbbEditor;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var Topic_AuthorMessage_1 = __webpack_require__(85);
var Topic_TopicTitle_1 = __webpack_require__(86);
var Topic_TopicContent_1 = __webpack_require__(87);
var Topic_Award_1 = __webpack_require__(23);
var Post_Management_1 = __webpack_require__(24);
var Topic_Judge_1 = __webpack_require__(25);
var PostTopic = /** @class */ (function (_super) {
    __extends(PostTopic, _super);
    function PostTopic(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.update = _this.update.bind(_this);
        _this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "", postId: 0 },
            likeState: 0
        };
        return _this;
    }
    PostTopic.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({});
                return [2 /*return*/];
            });
        });
    };
    PostTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topicMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getTopic(this.props.topicid, this.context.router)];
                    case 1:
                        topicMessage = _a.sent();
                        this.setState({ topicMessage: topicMessage });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostTopic.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var topicMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getTopic(newProps.topicid, this.context.router)];
                    case 1:
                        topicMessage = _a.sent();
                        this.setState({ topicMessage: topicMessage });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostTopic.prototype.render = function () {
        if (this.state.topicMessage != null) {
            if (this.state.topicMessage.userId == this.props.userId || this.props.userId == null) {
                return React.createElement("div", { className: "postRoot", id: "1" },
                    React.createElement("div", { className: "essay" },
                        React.createElement(Topic_AuthorMessage_1.AuthorMessage, { authorId: this.state.topicMessage.userId, authorName: this.state.topicMessage.userName, authorImgUrl: this.state.topicMessage.userImgUrl, isAnonymous: this.state.topicMessage.isAnonymous, isFollowing: this.state.topicMessage.isFollowing, fanCount: this.state.topicMessage.fanCount }),
                        React.createElement(Topic_TopicTitle_1.TopicTitle, { Title: this.state.topicMessage.title, Time: this.state.topicMessage.time, HitCount: this.state.topicMessage.hitCount }),
                        React.createElement("div", { id: "ads" },
                            React.createElement("img", { width: "100%", src: this.props.imgUrl }))),
                    React.createElement(Post_Management_1.PostManagement, { topicId: this.props.topicid, postId: this.state.topicMessage.postId, userId: this.props.userId, update: this.update }),
                    React.createElement(Topic_Judge_1.Judge, { userId: this.state.topicMessage.userId, postId: this.state.topicMessage.postId, update: this.update, topicId: this.props.topicid }),
                    React.createElement(Topic_TopicContent_1.TopicContent, { postid: this.state.topicMessage.postId, content: this.state.topicMessage.content, signature: this.state.topicMessage.signature, topicid: this.props.topicid, userId: this.state.topicMessage.userId, contentType: this.state.topicMessage.contentType, masters: this.state.topicMessage.masters, update: this.update }),
                    React.createElement("div", { className: "column", style: { width: "100%" } },
                        React.createElement(Topic_Award_1.Award, { postId: this.state.topicMessage.postId, updateTime: Date.now() })));
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    return PostTopic;
}(React.Component));
exports.PostTopic = PostTopic;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var Topic_AwardInfo_1 = __webpack_require__(88);
var Award = /** @class */ (function (_super) {
    __extends(Award, _super);
    function Award(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.nextPage = _this.nextPage.bind(_this);
        _this.lastPage = _this.lastPage.bind(_this);
        _this.state = { info: [], awardPage: 1 };
        return _this;
    }
    Award.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var award, info, awardInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getAwardInfo(this.props.postId, 1)];
                    case 1:
                        award = _a.sent();
                        info = award.map(this.generateAwardInfo.bind(this));
                        return [4 /*yield*/, Promise.all(info)];
                    case 2:
                        awardInfo = _a.sent();
                        this.setState({ info: awardInfo });
                        return [2 /*return*/];
                }
            });
        });
    };
    Award.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var award, info, awardInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getAwardInfo(newProps.postId, 1)];
                    case 1:
                        award = _a.sent();
                        info = award.map(this.generateAwardInfo.bind(this));
                        return [4 /*yield*/, Promise.all(info)];
                    case 2:
                        awardInfo = _a.sent();
                        this.setState({ info: awardInfo, awardPage: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    Award.prototype.generateAwardInfo = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getPortraitUrl(item.operatorName)];
                    case 1:
                        url = _a.sent();
                        return [2 /*return*/, React.createElement(Topic_AwardInfo_1.AwardInfo, { postId: this.props.postId, userImgUrl: url, content: item.content, reason: item.reason, userName: item.operatorName })];
                }
            });
        });
    };
    Award.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, award, info, awardInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = this.state.awardPage;
                        return [4 /*yield*/, Utility.getAwardInfo(this.props.postId, page + 1)];
                    case 1:
                        award = _a.sent();
                        info = award.map(this.generateAwardInfo.bind(this));
                        return [4 /*yield*/, Promise.all(info)];
                    case 2:
                        awardInfo = _a.sent();
                        this.setState({ info: awardInfo, awardPage: page + 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    Award.prototype.lastPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, page, award, info, awardInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = "#awardPager" + this.props.postId;
                        page = this.state.awardPage;
                        if (this.state.awardPage === 1) {
                            $(id).css("disabled", "true");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Utility.getAwardInfo(this.props.postId, page - 1)];
                    case 1:
                        award = _a.sent();
                        info = award.map(this.generateAwardInfo.bind(this));
                        return [4 /*yield*/, Promise.all(info)];
                    case 2:
                        awardInfo = _a.sent();
                        this.setState({ info: awardInfo, awardPage: page - 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    Award.prototype.render = function () {
        var lastPageId = "lastPage" + this.props.postId;
        var awardPagerId = "awardPager" + this.props.postId;
        var awardPagerJQID = "#awardPager" + this.props.postId;
        var awardInfoJQID = "#awardInfo" + this.props.postId;
        var awardInfoID = "awardInfo" + this.props.postId;
        var awardPager = null;
        $(awardInfoJQID).css("display", "");
        if (this.state.info.length !== 0) {
            awardPager = React.createElement("div", { className: "awardPager", id: awardPagerId },
                React.createElement("button", { className: "awardPage", id: lastPageId, onClick: this.lastPage }, "\u4E0A\u4E00\u9875"),
                React.createElement("button", { className: "awardPage", onClick: this.nextPage }, "\u4E0B\u4E00\u9875"));
            if (this.state.info.length < 10) {
                $(awardPagerJQID).css("display", "none");
                $(awardInfoJQID).css("display", "");
            }
        }
        else {
            $(awardInfoJQID).css("display", "none");
        }
        return React.createElement("div", { className: "column awardInfo", id: awardInfoID },
            this.state.info,
            awardPager);
    };
    return Award;
}(React.Component));
exports.Award = Award;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var $ = __webpack_require__(7);
var PostManagement = /** @class */ (function (_super) {
    __extends(PostManagement, _super);
    function PostManagement(props) {
        var _this = _super.call(this, props) || this;
        _this.wealthInput = _this.wealthInput.bind(_this);
        _this.prestigeInput = _this.prestigeInput.bind(_this);
        _this.reasonInput = _this.reasonInput.bind(_this);
        _this.tpdaysInput = _this.tpdaysInput.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.showAwardUI = _this.showAwardUI.bind(_this);
        _this.showPunishUI = _this.showPunishUI.bind(_this);
        _this.showDeleteUI = _this.showDeleteUI.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.state = { wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award", tips: "" };
        return _this;
    }
    PostManagement.prototype.showAwardUI = function () {
        this.setState({ UI: "Award" });
    };
    PostManagement.prototype.showPunishUI = function () {
        this.setState({ UI: "Punish" });
    };
    PostManagement.prototype.showDeleteUI = function () {
        this.setState({ UI: "Delete" });
    };
    PostManagement.prototype.confirm = function () {
        switch (this.state.UI) {
            case 'Award':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                        Utility.awardWealth($("input[name='reason']:checked").val(), this.state.wealth, this.props.postId);
                        if (this.state.prestige !== 0)
                            Utility.addPrestige(this.props.postId, this.state.prestige, $("input[name='reason']:checked").val());
                    }
                    else {
                        Utility.awardWealth(this.state.reason, this.state.wealth, this.props.postId);
                        if (this.state.prestige !== 0)
                            Utility.addPrestige(this.props.postId, this.state.prestige, this.state.reason);
                    }
                    var UIId = "#manage" + this.props.postId;
                    $(UIId).css("display", "none");
                    this.props.update();
                }
                else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'Punish':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                    }
                    else {
                        if (this.state.reason) {
                        }
                        else {
                            this.setState({ tips: "请输入原因！" });
                        }
                    }
                    var UIId = "#manage" + this.props.postId;
                    $(UIId).css("display", "none");
                    this.props.update();
                }
                else {
                    this.setState({ tips: "请选一个选项！" });
                }
                break;
            case 'Delete':
                if (this.state.reason) {
                    Utility.deletePost(this.props.topicId, this.props.postId, this.state.reason);
                    var UIId = "#manage" + this.props.postId;
                    $(UIId).css("display", "none");
                    this.props.update();
                }
                else {
                    this.setState({ tips: "请输入原因！" });
                }
        }
    };
    PostManagement.prototype.wealthInput = function (e) {
        this.setState({ wealth: e.target.value });
    };
    PostManagement.prototype.prestigeInput = function (e) {
        this.setState({ prestige: e.target.value });
    };
    PostManagement.prototype.reasonInput = function (e) {
        this.setState({ reason: e.target.value });
    };
    PostManagement.prototype.tpdaysInput = function (e) {
        this.setState({ tpdays: e.target.value });
    };
    PostManagement.prototype.close = function () {
        var UIId = "#manage" + this.props.postId;
        $(UIId).css("display", "none");
    };
    PostManagement.prototype.render = function () {
        var UI;
        var awardUI = React.createElement("div", { className: "column", id: "award" },
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u8D22\u5BCC\u503C"),
                React.createElement("input", { type: "text", value: this.state.wealth, onChange: this.wealthInput })),
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u5A01\u671B"),
                React.createElement("input", { type: "text", value: this.state.prestige, onChange: this.prestigeInput })),
            React.createElement("div", { className: "column manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u539F\u56E0"),
                React.createElement("div", { className: "row", style: { justifyContent: "space-around" } },
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "好文章" }),
                        React.createElement("div", null, "\u597D\u6587\u7AE0")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "有用资源" }),
                        React.createElement("div", null, "\u6709\u7528\u8D44\u6E90")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "热心回复" }),
                        React.createElement("div", null, "\u70ED\u5FC3\u56DE\u590D"))),
                React.createElement("div", { className: "row" },
                    React.createElement("input", { type: "radio", name: "reason", value: "自定义" }),
                    React.createElement("div", null, "\u81EA\u5B9A\u4E49"),
                    React.createElement("input", { type: "text", value: this.state.reason, onChange: this.reasonInput })),
                React.createElement("div", null, this.state.tips)));
        var punishUI = React.createElement("div", { className: "column", id: "punish" },
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u6263\u5A01\u671B"),
                React.createElement("input", { type: "text", value: this.state.prestige, onChange: this.prestigeInput })),
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u7981\u6B62\u53D1\u8A00(\u5929)"),
                React.createElement("input", { type: "text", value: this.state.tpdays, onChange: this.tpdaysInput })),
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u539F\u56E0"),
                React.createElement("input", { type: "text", value: this.state.reason, onChange: this.reasonInput }),
                React.createElement("div", null, this.state.tips)));
        var deleteUI = React.createElement("div", { className: "column", id: "punish" },
            React.createElement("div", { className: "row manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u5220\u9664\u539F\u56E0"),
                React.createElement("input", { type: "text", value: this.state.reason, onChange: this.reasonInput })));
        var UIId = "manage" + this.props.postId;
        UI = awardUI;
        if (this.state.UI === "Award")
            UI = awardUI;
        if (this.state.UI === "Punish")
            UI = punishUI;
        if (this.state.UI === "Delete")
            UI = deleteUI;
        return React.createElement("div", { style: { display: "none" }, id: UIId, className: "postManagement" },
            React.createElement("div", { className: "manageUI" },
                React.createElement("div", { className: "row manageOptions" },
                    React.createElement("div", { className: "manageOptions-icon", onClick: this.showAwardUI, style: { color: "#FF7F00" } }, "\u5956\u52B1"),
                    React.createElement("div", { className: "manageOptions-icon", onClick: this.showPunishUI, style: { color: "red" } }, "\u60E9\u7F5A"),
                    React.createElement("div", { className: "manageOptions-icon", onClick: this.showDeleteUI }, "\u5220\u9664"))),
            UI,
            React.createElement("div", { className: "row" },
                React.createElement("button", { onClick: this.confirm, className: "confirmManagement" }, "\u786E\u8BA4"),
                React.createElement("button", { onClick: this.close, style: { marginRight: "2rem" }, className: "confirmManagement" }, "\u5173\u95ED")));
    };
    return PostManagement;
}(React.Component));
exports.PostManagement = PostManagement;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var $ = __webpack_require__(7);
var Judge = /** @class */ (function (_super) {
    __extends(Judge, _super);
    function Judge(props) {
        var _this = _super.call(this, props) || this;
        _this.showMinus1UI = _this.showMinus1UI.bind(_this);
        _this.showPlus1UI = _this.showPlus1UI.bind(_this);
        _this.reasonInput = _this.reasonInput.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.state = { reason: "", tips: "", UI: "plus1" };
        return _this;
    }
    Judge.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, UIId, UIId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!($("input[name='option']:checked").val() === 'plus1' || $("input[name='option']:checked").val() === 'minus1')) return [3 /*break*/, 16];
                        _a = this.state.UI;
                        switch (_a) {
                            case 'plus1': return [3 /*break*/, 1];
                            case 'minus1': return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 15];
                    case 1:
                        if (!$("input[name='reason']:checked").val()) return [3 /*break*/, 6];
                        UIId = "#judge" + this.props.postId;
                        if (!($("input[name='reason']:checked").val() !== '自定义')) return [3 /*break*/, 3];
                        console.log($("input[name='reason']:checked").val());
                        return [4 /*yield*/, Utility.plus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val())];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Utility.plus1(this.props.topicId, this.props.postId, this.state.reason)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        $(UIId).css("display", "none");
                        this.props.update();
                        return [3 /*break*/, 7];
                    case 6:
                        this.setState({ tips: "请输入原因！" });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 15];
                    case 8:
                        if (!$("input[name='reason']:checked").val()) return [3 /*break*/, 13];
                        UIId = "#judge" + this.props.postId;
                        if (!($("input[name='reason']:checked").val() !== '自定义')) return [3 /*break*/, 10];
                        return [4 /*yield*/, Utility.minus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val())];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, Utility.minus1(this.props.topicId, this.props.postId, this.state.reason)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        $(UIId).css("display", "none");
                        this.props.update();
                        return [3 /*break*/, 14];
                    case 13:
                        this.setState({ tips: "请输入原因！" });
                        _b.label = 14;
                    case 14: return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        this.setState({ tips: "请选择+1或-1" });
                        _b.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    Judge.prototype.reasonInput = function (e) {
        this.setState({ reason: e.target.value });
    };
    Judge.prototype.close = function () {
        var UIId = "#judge" + this.props.postId;
        $(UIId).css("display", "none");
    };
    Judge.prototype.showPlus1UI = function () {
        this.setState({ UI: "plus1" });
    };
    Judge.prototype.showMinus1UI = function () {
        this.setState({ UI: "minus1" });
    };
    Judge.prototype.render = function () {
        var plus1UI = React.createElement("div", { className: "column", id: "award" },
            React.createElement("div", { className: "column manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u539F\u56E0"),
                React.createElement("div", { className: "row", style: { justifyContent: "space-around", marginTop: "2rem" } },
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "所言极是" }),
                        React.createElement("div", null, "\u6240\u8A00\u6781\u662F")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "momo" }),
                        React.createElement("div", null, "momo")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "好人一生平安" }),
                        React.createElement("div", null, "\u597D\u4EBA\u4E00\u751F\u5E73\u5B89"))),
                React.createElement("div", { className: "row", style: { marginTop: "1rem", justifyContent: "space-around" } },
                    React.createElement("div", { className: "judgeOption" },
                        React.createElement("input", { type: "radio", name: "reason", value: "自定义" }),
                        React.createElement("div", null, "\u81EA\u5B9A\u4E49")),
                    React.createElement("input", { type: "text", value: this.state.reason, onChange: this.reasonInput })),
                React.createElement("div", null, this.state.tips)));
        var minus1UI = React.createElement("div", { className: "column", id: "award" },
            React.createElement("div", { className: "column manageOperation" },
                React.createElement("div", { className: "manageObject" }, "\u539F\u56E0"),
                React.createElement("div", { className: "row", style: { marginTop: "1rem", justifyContent: "space-around" } },
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "太不求是" }),
                        React.createElement("div", null, "\u592A\u4E0D\u6C42\u662F")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "呵呵" }),
                        React.createElement("div", null, "\u5475\u5475")),
                    React.createElement("div", { className: "row" },
                        React.createElement("input", { type: "radio", name: "reason", value: "被你暴击" }),
                        React.createElement("div", null, "\u88AB\u4F60\u66B4\u51FB"))),
                React.createElement("div", { className: "row", style: { marginTop: "1rem", justifyContent: "space-around" } },
                    React.createElement("div", { className: "judgeOption" },
                        React.createElement("input", { type: "radio", name: "reason", value: "自定义" }),
                        React.createElement("div", null, "\u81EA\u5B9A\u4E49")),
                    React.createElement("input", { type: "text", value: this.state.reason, onChange: this.reasonInput })),
                React.createElement("div", null, this.state.tips)));
        var UI;
        if (this.state.UI === "minus1")
            UI = minus1UI;
        else
            UI = plus1UI;
        var UIId = "judge" + this.props.postId;
        return React.createElement("div", { style: { display: "none" }, id: UIId, className: "postManagement" },
            React.createElement("div", { className: "judgeUI column" },
                React.createElement("div", { className: "row judgeName" }, "\u98CE\u8BC4\u503C"),
                React.createElement("div", { className: "row judgeOptions" },
                    React.createElement("div", { className: "judgeOption" },
                        React.createElement("input", { type: "radio", name: "option", value: "plus1", onClick: this.showPlus1UI }),
                        React.createElement("div", null, "\u98CE\u8BC4+1")),
                    React.createElement("div", { className: "judgeOption" },
                        React.createElement("input", { type: "radio", name: "option", value: "minus1", onClick: this.showMinus1UI }),
                        React.createElement("div", null, "\u98CE\u8BC4-1")))),
            UI,
            React.createElement("div", { className: "row" },
                React.createElement("button", { onClick: this.confirm, className: "confirmManagement" }, "\u786E\u8BA4"),
                React.createElement("button", { onClick: this.close, style: { marginRight: "2rem" }, className: "confirmManagement" }, "\u5173\u95ED")));
    };
    return Judge;
}(React.Component));
exports.Judge = Judge;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var RouteComponent_1 = __webpack_require__(9);
var Topic_UserDetails_1 = __webpack_require__(20);
var Replier = /** @class */ (function (_super) {
    __extends(Replier, _super);
    function Replier(props, content) {
        return _super.call(this, props, content) || this;
    }
    Replier.prototype.render = function () {
        var url = "/user/" + this.props.userId;
        var realUrl = encodeURI(url);
        var email = "/message/message?id=" + this.props.userId;
        var urlHtml = React.createElement("a", { href: realUrl },
            React.createElement("img", { src: this.props.userImgUrl }));
        if (this.props.isAnonymous == true) {
            urlHtml = React.createElement("img", { src: this.props.userImgUrl });
        }
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId;
        $(document).ready(function () {
            $(".authorImg").mouseenter(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).next(".userDetails").show();
            });
            $(".mouse-userDetails").mouseleave(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).find(".userDetails").hide();
            });
        });
        var topicNumber = '帖数';
        if (!this.props.userId) {
            topicNumber = '';
        }
        var userDetails;
        if (this.props.isAnonymous != true) {
            userDetails = React.createElement(Topic_UserDetails_1.UserDetails, { userName: this.props.userName, userId: this.props.userId });
        }
        else {
            userDetails = null;
        }
        var userName;
        if (this.props.privilege === "超级版主") {
            userName = React.createElement("a", { style: { color: "pink" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege === "全站贵宾") {
            userName = React.createElement("a", { style: { color: "blue" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege === "注册用户") {
            userName = React.createElement("a", { style: { color: "black" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege == "匿名" || this.props.privilege === "匿名用户") {
            userName = React.createElement("div", { style: { color: "black" } }, this.props.userName);
        }
        else if (this.props.privilege === "管理员") {
            userName = React.createElement("a", { style: { color: "red" }, href: url }, this.props.userName);
        }
        return React.createElement("div", { className: "replyRoot" },
            React.createElement("div", { className: "row", style: { width: "100%", display: "flex", marginBottom: "0.625rem" } },
                React.createElement("div", { className: "row mouse-userDetails", style: { height: "15.625rem" } },
                    React.createElement("div", { className: "authorImg", style: { height: "6rem", borderBottom: "#eaeaea solid thin" } }, urlHtml),
                    React.createElement("div", { className: "userDetails", style: { display: "none", position: "absolute" } }, userDetails)),
                React.createElement("div", { className: "column", id: "rpymes" },
                    React.createElement("div", { className: "row", id: "replierMes" },
                        React.createElement("div", { style: { marginLeft: "0.625rem" } },
                            React.createElement("span", null, "\u7B2C"),
                            React.createElement("span", { style: { color: "red" } }, this.props.floor),
                            React.createElement("span", null, "\u697C")),
                        React.createElement("div", { className: "rpyClr", style: { marginLeft: "0.625rem" } }, userName),
                        React.createElement("div", { id: "topicsNumber", style: { marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" } },
                            topicNumber,
                            "\u00A0",
                            React.createElement("span", { style: { color: "red" } }, this.props.sendTopicNumber),
                            " ")),
                    React.createElement("div", { className: "row", style: { display: "flex", flexWrap: "nowrap" } },
                        React.createElement("div", { id: "clockimg", style: { marginLeft: "0.375rem" } },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "timeProp" }, moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss'))))),
                React.createElement("div", { style: { height: "6rem", borderBottom: "#eaeaea solid thin" } },
                    React.createElement("div", { id: "operation" },
                        React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u5F15\u7528"),
                        React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u7F16\u8F91"),
                        React.createElement(react_router_dom_1.Link, { className: "operation", to: email }, "\u79C1\u4FE1"),
                        React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u4E3E\u62A5"),
                        React.createElement(react_router_dom_1.Link, { className: "operation", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237")))));
    };
    return Replier;
}(RouteComponent_1.RouteComponent));
exports.Replier = Replier;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(3);
var Topic_ReplyContent_1 = __webpack_require__(17);
var Topic_Replier_1 = __webpack_require__(26);
var Topic_Topic_1 = __webpack_require__(22);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var CurUserPost = /** @class */ (function (_super) {
    __extends(CurUserPost, _super);
    function CurUserPost(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { page: 1, topicid: _this.match.params.topicid, totalPage: 1, userId: 559244 };
        return _this;
    }
    CurUserPost.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, userId, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        userId = newProps.match.params.userId;
                        return [4 /*yield*/, this.getTotalPage.bind(this)(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        console.log("kk" + newProps.match.params.userId);
                        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userId: newProps.match.params.userId });
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, totalPage, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        return [4 /*yield*/, this.getTotalPage.bind(this)(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        userId = this.match.params.userId;
                        console.log("this" + userId);
                        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userId: userId });
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.getTotalPage = function (topicId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getCurUserTotalReplyPage(topicId, this.match.params.userId, this.context.router)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CurUserPost.prototype.render = function () {
        var topic = null;
        if (this.state.page == 1) {
            topic = React.createElement(Topic_Topic_1.PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid, userId: this.state.userId });
        }
        return React.createElement("div", { className: "center", style: { width: "1140px" } },
            React.createElement(TopicPager, { userId: this.state.userId, page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            topic,
            React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/user/:userId/:page?", component: Reply }),
            React.createElement(TopicPagerDown, { userId: this.state.userId, page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }));
    };
    return CurUserPost;
}(RouteComponent));
exports.CurUserPost = CurUserPost;
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            contents: [],
            masters: []
        };
        return _this;
    }
    Reply.prototype.getMasters = function (topicId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Utility.getMasters(topicId)];
            });
        });
    };
    Reply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, storageId, realContents, token, headers, url, response, data, userName, masters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page || 1;
                        storageId = "TopicContent_" + newProps.match.params.topicid + "_" + page;
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append("Authorization", token);
                        url = "http://apitest.niconi.cc/user/" + newProps.match.params.userId;
                        return [4 /*yield*/, fetch(url, { headers: headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        userName = data.name;
                        return [4 /*yield*/, Utility.getCurUserTopicContent(newProps.match.params.topicid, page, userName, newProps.match.params.userId, this.context.router)];
                    case 3:
                        realContents = _a.sent();
                        masters = this.getMasters(newProps.match.params.topicid);
                        this.setState({ contents: realContents, masters: masters });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.generateContents = function (item) {
        return React.createElement("div", { className: "reply" },
            React.createElement("div", { style: { marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" } },
                React.createElement(Topic_Replier_1.Replier, { key: item.postId, isAnonymous: item.isAnonymous, userId: item.userId, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber, privilege: item.privilege }),
                React.createElement(Topic_ReplyContent_1.ReplyContent, { key: item.content, masters: this.state.masters, userId: item.userId, content: item.content, signature: item.signature, topicid: item.topicId, postid: item.postId, contentType: item.contentType })));
    };
    Reply.prototype.render = function () {
        return React.createElement("div", { className: "center", style: { width: "100%" } }, this.state.contents.map(this.generateContents.bind(this)));
    };
    return Reply;
}(RouteComponent));
exports.Reply = Reply;
var TopicPager = /** @class */ (function (_super) {
    __extends(TopicPager, _super);
    function TopicPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { userId: this.props.userId, pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                console.log('new=' + newProps.userId);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPager;
}(RouteComponent));
exports.TopicPager = TopicPager;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ userName: "" });
        return _this;
    }
    PageModel.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/" + this.props.userId)];
                    case 1:
                        response = _a.sent();
                        console.log("cc" + this.props.userId);
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        userName = data.name;
                        this.setState({ userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    PageModel.prototype.render = function () {
        var last = '<';
        var next = '>';
        var start = '<<';
        var end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId + "/" + this.props.pageNumber;
            if (this.props.pageNumber != this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, last));
        }
        else if (this.props.pageNumber == -2) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, next));
        }
        else if (this.props.pageNumber == -3) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId + "/1";
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, start));
        }
        else {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, end));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
var TopicPagerDown = /** @class */ (function (_super) {
    __extends(TopicPagerDown, _super);
    function TopicPagerDown(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPagerDown.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { userId: this.props.userId, pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPagerDown.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPagerDown;
}(RouteComponent));
exports.TopicPagerDown = TopicPagerDown;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState() {
    }
    return ContentState;
}());
exports.ContentState = ContentState;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(5);
var Utility = __webpack_require__(1);
//链接到的地址是  /list/boardid
var BoardList = /** @class */ (function (_super) {
    __extends(BoardList, _super);
    function BoardList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            thisBoardState: [],
        };
        return _this;
    }
    BoardList.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boardNameList, board, response, data, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardNameList = [];
                        board = [];
                        if (!!Utility.getStorage('board_2')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch('http://apitest.niconi.cc/Board/Root')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 20; i++) {
                            board[i] = new AppState_1.Board(data[i].name, data[i].todayCount, data[i].postCount, data[i].id, data[i].boardMastersString);
                            Utility.setStorage("board_" + data[i].id.toString(), board[i]);
                            boardNameList[i] = "board_" + data[i].id.toString();
                        }
                        Utility.setStorage('boardList', boardNameList);
                        return [3 /*break*/, 4];
                    case 3:
                        boardNameList = Utility.getStorage('boardList');
                        for (i = 0; i < 20; i++) {
                            board[i] = Utility.getStorage(boardNameList[i]);
                        }
                        _a.label = 4;
                    case 4:
                        this.setState({
                            thisBoardState: board,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardList.prototype.generateRootBoard = function (item) {
        return React.createElement(RootBoard, { board: item });
    };
    BoardList.prototype.render = function () {
        return React.createElement("div", { className: "boardList" }, this.state.thisBoardState.map(this.generateRootBoard));
    };
    return BoardList;
}(React.Component));
exports.BoardList = BoardList;
var RootBoard = /** @class */ (function (_super) {
    __extends(RootBoard, _super);
    function RootBoard(props) {
        var _this = _super.call(this, props) || this;
        var boards = _this.props.board;
        if (boards.id === 2 || boards.id === 29 || boards.id === 35 || boards.id === 37) {
            _this.state = { isExpanded: false, };
        } //四个民工版默认状态为折叠
        else {
            _this.state = { isExpanded: true, };
        } //其他版默认状态为展开
        _this.toggleIsExpanded = _this.toggleIsExpanded.bind(_this); //JS的this是可变的，取决于调用方法的地方，bind方法用于此刻的this值
        return _this;
    }
    RootBoard.prototype.toggleIsExpanded = function () {
        this.setState(function (prevState) { return ({
            isExpanded: !prevState.isExpanded //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }); });
    };
    RootBoard.prototype.render = function () {
        var display = this.state.isExpanded ? "flex" : "none"; //根据 isExpanded 状态定义样式
        var buttonContent = this.state.isExpanded ? "-" : "+"; //根据 isExpanded 状态定义按钮内容
        var boards = this.props.board;
        if (boards.id === 758) {
            return React.createElement("div", { className: "anArea" },
                React.createElement("div", { className: "column", style: { border: '2px solid #e9e9e9' } },
                    React.createElement("div", { className: "row", style: { marginTop: '15px', marginBottom: '15px' } },
                        React.createElement("div", { className: "areaName" },
                            React.createElement("a", { href: "/list/758/normal" }, boards.name)),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters))));
        }
        else {
            return React.createElement("div", { className: "anArea" },
                React.createElement("div", { className: "column", style: { border: '2px solid #e9e9e9' } },
                    React.createElement("div", { className: "row", style: { marginTop: '15px', marginBottom: '15px' } },
                        React.createElement("div", { className: "areaName" }, boards.name),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters),
                        React.createElement("div", { className: "hideBoard", onClick: this.toggleIsExpanded },
                            " ",
                            buttonContent)),
                    React.createElement("div", { className: "hiddenContent", style: { display: display } },
                        " ",
                        React.createElement(ChildBoard, { boardid: boards.id }))));
        }
    };
    return RootBoard;
}(React.Component));
exports.RootBoard = RootBoard;
var ChildBoard = /** @class */ (function (_super) {
    __extends(ChildBoard, _super);
    function ChildBoard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            thisBoardState: []
        };
        return _this;
    }
    ChildBoard.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boards, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boards = [];
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/Board/" + this.props.boardid + "/Sub")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < data.length; i++) {
                            boards[i] = new AppState_1.Board(data[i].name, data[i].todayCount, data[i].postCount, data[i].id, data[i].masters);
                        }
                        this.setState({
                            thisBoardState: boards,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChildBoard.prototype.convertChildBoard = function (item) {
        return React.createElement("div", { className: "boardContent" },
            React.createElement("a", { href: "/list/" + item.id + "/normal" },
                React.createElement("div", { className: "greenBackdrop" })),
            React.createElement("a", { href: "/list/" + item.id + "/normal" },
                React.createElement("div", { className: "boardName2" }, item.name)),
            React.createElement("div", { className: "boardInfo" },
                "\u4ECA\u65E5\u53D1\u5E16 ",
                item.todayPostCount,
                " / \u603B\u4E3B\u9898\u6570 ",
                item.totalPostCount));
    };
    ChildBoard.prototype.convertNoImgChildBoard = function (item) {
        return React.createElement("div", { className: "noImgBoardContent" },
            React.createElement("a", { href: "/list/" + item.id + "/normal" },
                React.createElement("div", { className: "boardName2" }, item.name)));
    };
    ChildBoard.prototype.render = function () {
        if (this.props.boardid === 2 || this.props.boardid === 29 || this.props.boardid === 35 || this.props.boardid === 37) {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertNoImgChildBoard));
        }
        else {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertChildBoard));
        }
    };
    return ChildBoard;
}(React.Component));
exports.ChildBoard = ChildBoard;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(6);
var Actions_1 = __webpack_require__(8);
var react_router_dom_1 = __webpack_require__(3);
var UserCenterNavigation_1 = __webpack_require__(90);
var UserCenterRouter_1 = __webpack_require__(91);
/**
 * 用户中心页面
 */
var UserCenterBeforeConnect = /** @class */ (function (_super) {
    __extends(UserCenterBeforeConnect, _super);
    function UserCenterBeforeConnect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterBeforeConnect.prototype.render = function () {
        if (!this.props.isLogOn) {
            this.props.throwError('LogOut');
            return React.createElement("div", null);
        }
        return (React.createElement("div", { className: "user-center" },
            React.createElement("div", { className: "user-center-content" },
                React.createElement("div", { className: "user-center-head" },
                    React.createElement("p", null, "\u4E2A\u4EBA\u4E2D\u5FC3")),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: "user-center-body" },
                        React.createElement(UserCenterNavigation_1.UserCenterNavigation, null),
                        React.createElement(UserCenterRouter_1.UserCenterRouter, null))))));
    };
    return UserCenterBeforeConnect;
}(React.Component));
exports.UserCenterBeforeConnect = UserCenterBeforeConnect;
/**
 * 将store中的isLogOn属性映射到UserCenterBeforeConnect的props的isLogOn
 * @param state
 */
function mapState(state) {
    return {
        isLogOn: state.userInfo.isLogOn
    };
}
/**
 * 把dispatch(throwError(errorMessage))赋给props中的throwError
 * 其中throwError(errorMessage)是action的构造函数
 * 用类方法定义的action我就不知道怎么dispatch了
 * @param dispatch
 */
function mapDispatch(dispatch) {
    return {
        throwError: function (errorMessage) {
            console.log(errorMessage);
            dispatch(Actions_1.throwError(errorMessage));
        }
    };
}
/**
 * 连接UserCenterBeforeConnect与store，默认导出UserCenter替换掉原来的导出
 */
exports.UserCenter = react_redux_1.connect(mapState, mapDispatch)(UserCenterBeforeConnect);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
//用户中心主页用户头像与徽章组件
var UserCenterExactAvatar = /** @class */ (function (_super) {
    __extends(UserCenterExactAvatar, _super);
    function UserCenterExactAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactAvatar.prototype.render = function () {
        return (React.createElement("div", { className: "user-avatar" },
            React.createElement("img", { className: "user-avatar-img", src: this.props.userAvatarImgURL }),
            React.createElement("div", { className: "user-badge" })));
    };
    return UserCenterExactAvatar;
}(React.Component));
exports.UserCenterExactAvatar = UserCenterExactAvatar;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var MessageMessage_1 = __webpack_require__(97);
var MessageResponse_1 = __webpack_require__(102);
var MessageAttme_1 = __webpack_require__(104);
var MessageSystem_1 = __webpack_require__(106);
var react_router_dom_1 = __webpack_require__(3);
/**
 * 网站的主页面对象。
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        return (React.createElement("div", { className: "message-root" },
            React.createElement("div", { className: "message" },
                React.createElement("div", { className: "message-title" }, "\u6211\u7684\u6D88\u606F"),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: "message-content" },
                        React.createElement("div", { className: "message-nav" },
                            React.createElement("div", { id: "response" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/message/response" }, "\u56DE\u590D\u6211\u7684")),
                            React.createElement("div", { id: "attme" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/message/attme" }, "@ \u6211\u7684")),
                            React.createElement("div", { id: "system" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/message/system" }, "\u7CFB\u7EDF\u901A\u77E5")),
                            React.createElement("div", { id: "message" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/message/message" }, "\u6211\u7684\u79C1\u4FE1"))),
                        React.createElement(react_router_dom_1.Route, { path: "/message/response", component: MessageResponse_1.MessageResponse }),
                        React.createElement(react_router_dom_1.Route, { path: "/message/attme", component: MessageAttme_1.MessageAttme }),
                        React.createElement(react_router_dom_1.Route, { path: "/message/system", component: MessageSystem_1.MessageSystem }),
                        React.createElement(react_router_dom_1.Route, { path: "/message/message", component: MessageMessage_1.MessageMessage }))))));
    };
    return Message;
}(React.Component));
exports.Message = Message;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var FocusTopicSingle_1 = __webpack_require__(13);
var Utility = __webpack_require__(1);
/**
 * 表示全站最新主题列表
 */
var AllNewTopic = /** @class */ (function (_super) {
    __extends(AllNewTopic, _super);
    /**
     * 构造函数
     * @param props
     */
    function AllNewTopic(props) {
        var _this = _super.call(this, props) || this;
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("AllNewTopic");
        if (!data) {
            data = [];
        }
        _this.state = {
            data: data,
            from: 0,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    AllNewTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, oldData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getAllNewTopic(0, this.context.router)];
                    case 1:
                        data = _a.sent();
                        oldData = Utility.getStorage("AllNewTopic");
                        if (oldData) {
                            for (i = 0; i < data.length; i++) {
                                //最新的20条数据跟之前的有重合就组合起来
                                if (data[i].id == oldData[0].id) {
                                    data = data.slice(0, i).concat(oldData);
                                    break;
                                }
                            }
                        }
                        //最多100条新帖
                        if (data.length > 100) {
                            data = data.slice(0, 100);
                        }
                        //缓存获取到的数据                      
                        Utility.setStorage("AllNewTopic", data);
                        this.setState({ data: data, from: data.length });
                        //滚动条监听
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    AllNewTopic.prototype.componentWillUnmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.removeEventListener('scroll', this.handleScroll);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 处理滚动的函数
     */
    AllNewTopic.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utility.isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *查看新帖数目大于100条时不再继续加载
                        */
                        if (this.state.from >= 99) {
                            $('#focus-topic-loading').addClass('displaynone');
                            $('#focus-topic-loaddone').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getAllNewTopic(this.state.from, this.context.router)];
                    case 2:
                        newData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        /**
                        *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ loading: true });
                        return [2 /*return*/];
                    case 4:
                        data = this.state.data.concat(newData);
                        this.setState({ data: data, from: data.length, loading: true });
                        Utility.setStorage("AllNewTopic", data);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将主题排列好
     */
    AllNewTopic.prototype.render = function () {
        return (React.createElement("div", { className: "focus-root" },
            React.createElement("div", { className: "focus" },
                React.createElement("div", { className: "focus-allNewTopic" },
                    React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                    "\u9996\u9875/\u5168\u7AD9\u65B0\u5E16"),
                React.createElement("div", { className: "focus-topic-area" },
                    React.createElement("div", { className: "focus-topic-topicArea" }, this.state.data.map(coverFocusPost)),
                    React.createElement("div", { className: "focus-topic-loading", id: "focus-topic-loading" },
                        React.createElement("img", { src: "http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif" })),
                    React.createElement("div", { className: "focus-topic-loaddone displaynone", id: "focus-topic-loaddone" }, "\u6CA1\u6709\u66F4\u591A\u5E16\u5B50\u5566~")))));
    };
    return AllNewTopic;
}(React.Component));
exports.AllNewTopic = AllNewTopic;
/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item) {
    return React.createElement(FocusTopicSingle_1.FocusTopicSingle, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, userId: item.userId, userName: item.userName, portraitUrl: item.portraitUrl, time: item.time, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var FocusBoardArea_1 = __webpack_require__(108);
var FocusTopicArea_1 = __webpack_require__(109);
var FocusBoardTopicArea_1 = __webpack_require__(110);
var Utility = __webpack_require__(1);
var Focus = /** @class */ (function (_super) {
    __extends(Focus, _super);
    function Focus(props) {
        var _this = _super.call(this, props) || this;
        _this.changeFocusBoard = function () {
            var currentFocusBoard = Utility.getStorage("currentFocusBoard");
            if (currentFocusBoard) {
                _this.setState({ id: currentFocusBoard.boardId, name: currentFocusBoard.boardName });
            }
            else {
                _this.setState({ id: null, name: null });
            }
        };
        _this.state = {
            id: null,
            name: null
        };
        return _this;
    }
    /**
     * 从上往下分别为：页面标题、关注版面列表区域、关注版面的主题列表区域，分别用三个组件表示
     */
    Focus.prototype.render = function () {
        if (!this.state.id) {
            return (React.createElement("div", { className: "focus-root" },
                React.createElement("div", { className: "focus" },
                    React.createElement("div", { className: "focus-title" }, "\u6211\u7684\u5173\u6CE8"),
                    React.createElement(FocusBoardArea_1.FocusBoardArea, { onChange: this.changeFocusBoard }),
                    React.createElement(FocusTopicArea_1.FocusTopicArea, null))));
        }
        else {
            return (React.createElement("div", { className: "focus-root" },
                React.createElement("div", { className: "focus" },
                    React.createElement("div", { className: "focus-title" }, "\u6211\u7684\u5173\u6CE8"),
                    React.createElement(FocusBoardArea_1.FocusBoardArea, { onChange: this.changeFocusBoard }),
                    React.createElement(FocusBoardTopicArea_1.FocusBoardTopicArea, { boardId: this.state.id, boardNme: this.state.name }))));
        }
    };
    return Focus;
}(React.Component));
exports.Focus = Focus;
var FocusState = /** @class */ (function () {
    function FocusState() {
    }
    return FocusState;
}());
exports.FocusState = FocusState;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var $ = __webpack_require__(7);
var react_redux_1 = __webpack_require__(6);
var Actions_1 = __webpack_require__(8);
/*declare global {
    interface JQuery {
        connection: SignalR;
    }
}*/
var DropDownConnect = /** @class */ (function (_super) {
    __extends(DropDownConnect, _super);
    function DropDownConnect(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = ({
            userName: "载入中……",
            userImgUrl: "/images/unLoggedOn.png"
        });
        return _this;
    }
    DropDownConnect.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userName, response, data, userImgUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Utility.getLocalStorage("accessToken")) return [3 /*break*/, 3];
                        console.log("token未过期");
                        userName = Utility.getLocalStorage("userName");
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/User/Name/" + userName)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        userImgUrl = data.portraitUrl;
                        this.setState({ userName: userName, userImgUrl: userImgUrl });
                        return [3 /*break*/, 4];
                    case 3:
                        if (Utility.getLocalStorage("userName")) {
                            console.log("token已过期，正在重新获取");
                            this.reLogOn();
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DropDownConnect.prototype.reLogOn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, requestBody, headers, reLogOnResponse, reLogOnData, token, userName, response, data, userImgUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://openid.cc98.org/connect/token';
                        requestBody = {
                            'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
                            'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
                            'grant_type': 'password',
                            'username': Utility.getLocalStorage("userName"),
                            'password': Utility.getLocalStorage("password"),
                            'scope': "cc98-api openid"
                        };
                        headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: headers,
                                body: $.param(requestBody)
                            })];
                    case 1:
                        reLogOnResponse = _a.sent();
                        //请求是否成功
                        if (reLogOnResponse.status !== 200) {
                            console.log('自动刷新token失败，请重新登录'); //因为logOff会刷新页面，所以这里可能看不到
                            this.logOff();
                        }
                        return [4 /*yield*/, reLogOnResponse.json()];
                    case 2:
                        reLogOnData = _a.sent();
                        token = "Bearer " + encodeURIComponent(reLogOnData.access_token);
                        Utility.setLocalStorage("accessToken", token, reLogOnData.expires_in);
                        console.log("刷新token成功");
                        userName = Utility.getLocalStorage("userName");
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/User/Name/" + userName)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        userImgUrl = data.portraitUrl;
                        this.setState({ userName: userName, userImgUrl: userImgUrl });
                        return [2 /*return*/];
                }
            });
        });
    };
    DropDownConnect.prototype.catch = function (e) {
        console.log("Oops, error", e);
        console.log('自动刷新token失败，请重新登录'); //因为logOff会刷新页面，所以这里可能看不到
        this.logOff();
    };
    DropDownConnect.prototype.logOff = function () {
        Utility.removeLocalStorage("accessToken");
        console.log("after remove token=" + Utility.getLocalStorage("accessToken"));
        Utility.removeLocalStorage("userName");
        Utility.removeLocalStorage("password");
        Utility.removeLocalStorage("userInfo");
        Utility.removeStorage("all");
        this.props.logOff(); //更新redux中的状态
        location = window.location; //刷新当前页面
    };
    DropDownConnect.prototype.render = function () {
        if (Utility.getLocalStorage("accessToken") && Utility.getLocalStorage("userName")) {
            $(document).ready(function () {
                var userInfo = $('.userInfo').eq(0);
                var userMessage = $('#userMessage');
                var dropDownSub = $('.dropDownSub').eq(0);
                var dropDownSubMessage = $('.dropDownSubMessage').eq(0);
                var dropDownLi = dropDownSub.find('li');
                var dropDownLiMessage = dropDownSubMessage.find('li');
                //点击名字之后出现的下拉列表
                userInfo.hover(function () {
                    dropDownSub.slideDown("fast");
                }, function () {
                    dropDownSub.css('display', 'none');
                });
                dropDownSub.hover(function () {
                    dropDownSub.css('display', 'block');
                }, function () {
                    dropDownSub.slideUp("fast");
                });
                dropDownLi.mouseover(function () {
                    this.className = 'hover';
                });
                dropDownLi.mouseout(function () {
                    this.className = '';
                });
                //点击消息之后出现的下拉列表
                userMessage.hover(function () {
                    dropDownSubMessage.slideDown("fast");
                }, function () {
                    dropDownSubMessage.css('display', 'none');
                });
                dropDownSubMessage.hover(function () {
                    dropDownSubMessage.css('display', 'block');
                }, function () {
                    dropDownSubMessage.slideUp("fast");
                });
                dropDownLiMessage.mouseover(function () {
                    this.className = 'hover';
                });
                dropDownLiMessage.mouseout(function () {
                    this.className = '';
                });
            });
            return React.createElement("div", { id: "dropdown" },
                React.createElement("div", { className: "box" },
                    React.createElement("div", { className: "userInfo" },
                        React.createElement("div", { className: "userImg" },
                            React.createElement("img", { src: this.props.userImgUrl || this.state.userImgUrl })),
                        React.createElement("div", { className: "userName" }, this.state.userName)),
                    React.createElement("div", { className: "topBarText" },
                        React.createElement("a", { href: "/", style: { color: '#fff' } }, "\u9996\u9875")),
                    React.createElement("div", { className: "topBarText", id: "userMessage" },
                        React.createElement("a", { href: "/message", style: { color: '#fff' } }, "\u6D88\u606F")),
                    React.createElement("div", { className: "topBarText" },
                        React.createElement("a", { href: "/focus", style: { color: '#fff' } }, "\u5173\u6CE8")),
                    React.createElement("div", { className: "topBarText" },
                        React.createElement("a", { href: "/newTopics", style: { color: '#fff' } }, "\u65B0\u5E16")),
                    React.createElement("a", { href: "/boardList" },
                        React.createElement("div", { className: "boardListLink", style: { margin: '0 0 0 10px' } },
                            React.createElement("div", { style: { marginTop: '16px', color: '#fff' } }, "\u7248\u9762")))),
                React.createElement("div", { className: "dropDownSubBox" },
                    React.createElement("ul", { className: "dropDownSub" },
                        React.createElement("a", { href: "/userCenter" },
                            " ",
                            React.createElement("li", null, "\u4E2A\u4EBA\u4E2D\u5FC3")),
                        React.createElement("a", { href: "/" },
                            React.createElement("li", null, "\u7B7E\u5230\uFF08\u6682\u65E0\uFF09")),
                        React.createElement("li", { onClick: this.logOff.bind(this) }, "\u6CE8\u9500"))),
                React.createElement("div", { className: "dropDownSubBox" },
                    React.createElement("ul", { className: "dropDownSubMessage" },
                        React.createElement("a", { href: "/message/response" },
                            " ",
                            React.createElement("li", null, "\u56DE\u590D\u6211\u7684")),
                        React.createElement("a", { href: "/message/attme" },
                            React.createElement("li", null, "@ \u6211\u7684")),
                        React.createElement("a", { href: "/message/system" },
                            React.createElement("li", null, "\u7CFB\u7EDF\u901A\u77E5")),
                        React.createElement("a", { href: "/message/message" },
                            React.createElement("li", null, "\u6211\u7684\u79C1\u4FE1")))));
        }
        else {
            return React.createElement("div", { id: "dropdown" },
                React.createElement("div", { className: "box" },
                    React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                        React.createElement("a", { href: "/", style: { color: '#fff' } }, "\u9996\u9875")),
                    React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                        React.createElement("a", { href: "/logOn", style: { color: '#fff' } }, "\u767B\u5F55")),
                    React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                        React.createElement("a", { href: "/newTopics", style: { color: '#fff' } }, "\u65B0\u5E16")),
                    React.createElement("a", { href: "/boardList" },
                        React.createElement("div", { className: "boardListLink", style: { margin: '0 0 0 10px' } },
                            React.createElement("div", { style: { marginTop: '16px', color: '#fff' } }, "\u7248\u9762")))));
        }
    };
    return DropDownConnect;
}(React.Component));
// 这里是董松松的修改，加了redux
function mapState(state) {
    return {
        userImgUrl: state.userInfo.currentUserInfo.portraitUrl
    };
}
function mapDispatch(dispatch) {
    return {
        logOff: function () {
            dispatch(Actions_1.userLogOff());
        }
    };
}
var DropDown = react_redux_1.connect(mapState, mapDispatch)(DropDownConnect);
//到此结束
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Search.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchBoxSelect, downArrow, searchBoxSub, searchIco, searchBoxLi, url1, url2, url3, boardId, boardName, topicId, response, searchInfo, self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchBoxSelect = $('.searchBoxSelect');
                        downArrow = $('.downArrow');
                        searchBoxSub = $('.searchBoxSub');
                        searchIco = $('.searchIco');
                        searchBoxLi = searchBoxSub.find('li');
                        url1 = location.href.match(/\/topic\/(\S+)\/+?/);
                        url2 = location.href.match(/\/list\/(\S+)\/+?/);
                        url3 = location.href.match(/\/(search)/);
                        boardId = 0;
                        boardName = '全站';
                        if (!url1) return [3 /*break*/, 2];
                        topicId = url1[1];
                        return [4 /*yield*/, Utility.getCategory(topicId, this.context.router)];
                    case 1:
                        response = _a.sent();
                        boardId = response.boardId;
                        boardName = response.boardName;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!url2) return [3 /*break*/, 4];
                        boardId = parseInt(url2[1]);
                        return [4 /*yield*/, Utility.getBoardName(boardId, this.context.router)];
                    case 3:
                        boardName = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (url3) {
                            searchInfo = Utility.getStorage("searchInfo");
                            if (searchInfo) {
                                boardId = searchInfo.boardId;
                                boardName = searchInfo.boardName;
                            }
                        }
                        _a.label = 5;
                    case 5:
                        $(document).click(function () {
                            searchBoxSub.css('display', 'none');
                        });
                        searchBoxSelect.click(function () {
                            if (searchBoxSub.css('display') === 'block')
                                searchBoxSub.css('display', 'none');
                            else
                                searchBoxSub.css('display', 'block');
                            return false; //阻止事件冒泡
                        });
                        downArrow.click(function () {
                            if (searchBoxSub.css('display') === 'block')
                                searchBoxSub.css('display', 'none');
                            else
                                searchBoxSub.css('display', 'block');
                            return false; //阻止事件冒泡
                        });
                        /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
                        如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
                        或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/
                        searchBoxLi.click(function () {
                            searchBoxSelect.text($(this).text());
                        });
                        searchBoxLi.mouseover(function () {
                            this.className = 'hover';
                        });
                        searchBoxLi.mouseout(function () {
                            this.className = '';
                        });
                        self = this;
                        searchIco.click(function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var val, words, searchInfo, host, words, searchInfo, host, body, host, host, boardResult;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            val = $('#searchText').val();
                                            if (!(val && val != '')) return [3 /*break*/, 5];
                                            if (!(searchBoxSelect.text() == '主题' || searchBoxSelect.text() == '全站')) return [3 /*break*/, 1];
                                            words = val.split(' ');
                                            if (words) {
                                                if (words.length > 5) {
                                                    alert("关键词过多，请不要超过5个！");
                                                }
                                                else {
                                                    searchInfo = { boardId: 0, boardName: '全站', words: words };
                                                    Utility.setStorage('searchInfo', searchInfo);
                                                    host = window.location.host;
                                                    window.location.href = "http://" + host + "/search";
                                                }
                                            }
                                            return [3 /*break*/, 5];
                                        case 1:
                                            if (!(searchBoxSelect.text() == '版内')) return [3 /*break*/, 2];
                                            words = val.split(' ');
                                            if (words) {
                                                if (words.length > 5) {
                                                    alert("关键词过多，请不要超过5个！");
                                                }
                                                else {
                                                    searchInfo = { boardId: boardId, boardName: boardName, words: words };
                                                    Utility.setStorage('searchInfo', searchInfo);
                                                    host = window.location.host;
                                                    window.location.href = "http://" + host + "/search";
                                                }
                                            }
                                            return [3 /*break*/, 5];
                                        case 2:
                                            if (!(searchBoxSelect.text() == '用户')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, Utility.getUserDetails(val, self.context.router)];
                                        case 3:
                                            body = _a.sent();
                                            host = window.location.host;
                                            if (body) {
                                                window.location.href = "http://" + host + "/user/name/" + val;
                                            }
                                            else {
                                                Utility.removeStorage('searchInfo');
                                                window.location.href = "http://" + host + "/search";
                                            }
                                            return [3 /*break*/, 5];
                                        case 4:
                                            if (searchBoxSelect.text() == '版面') {
                                                host = window.location.host;
                                                boardResult = Utility.getBoardId(val);
                                                if (boardResult) {
                                                    if (boardResult == []) {
                                                        Utility.removeStorage('searchInfo');
                                                        window.location.href = "http://" + host + "/search";
                                                    }
                                                    else if (boardResult.length == 1) {
                                                        window.location.href = "http://" + host + "/list/" + boardResult[0].id + "/normal/";
                                                    }
                                                    else if (boardResult.length > 1) {
                                                        Utility.setStorage("searchBoardInfo", boardResult);
                                                        window.location.href = "http://" + host + "/searchBoard";
                                                    }
                                                    else {
                                                        Utility.removeStorage('searchInfo');
                                                        window.location.href = "http://" + host + "/search";
                                                    }
                                                }
                                                else {
                                                    Utility.removeStorage('searchInfo');
                                                    window.location.href = "http://" + host + "/search";
                                                }
                                            }
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Search.prototype.render = function () {
        //查看当前是全站还是某版
        var url1 = location.href.match(/\/topic\/(\S+)\/+?/);
        var url2 = location.href.match(/\/list\/(\S+)\/+?/);
        var url3 = location.href.match(/\/(search)/);
        var flag = 1;
        if (url1) {
            console.log(url1[1]);
            flag = 0;
        }
        else if (url2) {
            console.log(url2[1]);
            flag = 0;
        }
        else if (url3) {
            var searchInfo = Utility.getStorage("searchInfo");
            if (searchInfo) {
                if (searchInfo.boardId != 0) {
                    flag = 0;
                }
            }
        }
        if (flag) {
            return React.createElement("div", { id: "search" },
                React.createElement("div", { className: "box" },
                    React.createElement("div", { className: "searchBoxSelect" }, "\u4E3B\u9898"),
                    React.createElement("div", { className: "downArrow" },
                        React.createElement("img", { src: "/images/downArrow.png", width: "12", height: "12" })),
                    React.createElement("input", { id: "searchText", type: "text", placeholder: "猜猜能搜到什么..." }),
                    React.createElement("div", { className: "searchIco" },
                        React.createElement("img", { src: "/images/searchIco.ico", width: "15", height: "15" }))),
                React.createElement("ul", { className: "searchBoxSub" },
                    React.createElement("li", null, "\u4E3B\u9898"),
                    React.createElement("li", null, "\u7528\u6237"),
                    React.createElement("li", null, "\u7248\u9762")));
        }
        else {
            return React.createElement("div", { id: "search" },
                React.createElement("div", { className: "box" },
                    React.createElement("div", { className: "searchBoxSelect" }, "\u7248\u5185"),
                    React.createElement("div", { className: "downArrow" },
                        React.createElement("img", { src: "/images/downArrow.png", width: "12", height: "12" })),
                    React.createElement("input", { id: "searchText", type: "text", placeholder: "猜猜能搜到什么..." }),
                    React.createElement("div", { className: "searchIco" },
                        React.createElement("img", { src: "/images/searchIco.ico", width: "15", height: "15" }))),
                React.createElement("ul", { className: "searchBoxSub" },
                    React.createElement("li", null, "\u7248\u5185"),
                    React.createElement("li", null, "\u5168\u7AD9"),
                    React.createElement("li", null, "\u7528\u6237"),
                    React.createElement("li", null, "\u7248\u9762")));
        }
    };
    return Search;
}(React.Component));
exports.Search = Search;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return React.createElement("div", { className: "header" },
            React.createElement("div", { className: "topBar" },
                React.createElement("div", { className: "topBarRow" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { style: { margin: '10px 0 0 0' } },
                            React.createElement("a", { href: "/" },
                                React.createElement("img", { src: "/images/矢量智能对象.ico" }))),
                        React.createElement("div", { style: { margin: '15px 0 0 5px' } },
                            React.createElement("a", { href: "/" },
                                React.createElement("img", { src: "/images/CC98.ico" })))),
                    React.createElement(DropDown, null))),
            React.createElement("div", { className: "headerContent" },
                React.createElement("div", { className: "headerRow" },
                    React.createElement("div", { className: "linkBar" },
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/网盘.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://share.cc98.org/", className: "linkText" }, "\u7F51\u76D8"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/游戏.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.cc98.org/game.asp", className: "linkText" }, "\u6E38\u620F"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/勋章.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://v2.cc98.org/app/medalmanager.aspx", className: "linkText" }, "\u52CB\u7AE0"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/抽卡.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://card.cc98.org/", className: "linkText" }, "\u62BD\u5361"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/gamble.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://gaming.cc98.org", className: "linkText" }, "\u7ADE\u731C"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/NexusHD.jpg", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.nexushd.org", className: "linkText" }, "NexusHD")))),
                    React.createElement(Search, null))));
    };
    return Header;
}(React.Component));
exports.Header = Header;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return React.createElement("div", { className: "footer" },
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "footerRow" },
                    React.createElement("div", { style: { marginRight: "15px", color: "#000" } }, "\u53CB\u60C5\u94FE\u63A5"),
                    React.createElement("a", { href: "http://www.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66"),
                    "|",
                    React.createElement("a", { href: "http://www.cs.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66\u8BA1\u7B97\u673A\u5B66\u9662"),
                    "|",
                    React.createElement("a", { href: "http://www.zju88.org/agent/index.do" }, "\u98D8\u6E3A\u6C34\u4E91\u95F4"),
                    "|",
                    React.createElement("a", { href: "http://www.qsc.zju.edu.cn/" }, "\u6C42\u662F\u6F6E"),
                    "|",
                    React.createElement("a", { href: "http://luckweb.057101.com/bt2/index.asp" }, "\u7F18\u7F51"),
                    "|",
                    React.createElement("a", { href: "http://www.nexushd.org/login.php" }, "NexusHD"),
                    "|",
                    React.createElement("a", { href: "https://www.zdgd.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66\u5E7F\u64AD\u7535\u89C6\u7F51"),
                    "|",
                    React.createElement("a", { href: "http://zy.zju.edu.cn/" }, "\u6D59\u5927\u641C\u7D22")),
                React.createElement("div", { className: "footerRow" },
                    "Copyright \u00A9 2003-2017 CC98 Network Association. Email: contact@cc98.org",
                    React.createElement("a", { href: "http://www.cc98.org/onlineshow.asp" }, " \u8BBA\u575B\u7EDF\u8BA1"))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var $ = __webpack_require__(7);
var Utility = __webpack_require__(1);
var UbbContainer_1 = __webpack_require__(4);
/**
 * 全站公告组件
 **/
var Announcement = /** @class */ (function (_super) {
    __extends(Announcement, _super);
    function Announcement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            announcementContent: '加载中……'
        };
        return _this;
    }
    Announcement.prototype.getAnnouncement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, announcement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://apitest.niconi.cc/config/global')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        announcement = data.announcement;
                        return [2 /*return*/, announcement];
                }
            });
        });
    };
    Announcement.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAnnouncement()];
                    case 1:
                        x = _a.sent();
                        this.setState({
                            announcementContent: x,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Announcement.prototype.render = function () {
        return React.createElement("div", { className: "announcementContent" },
            React.createElement(UbbContainer_1.UbbContainer, { code: this.state.announcementContent }));
    };
    return Announcement;
}(React.Component));
exports.Announcement = Announcement;
/**
 * 推荐阅读组件
 **/
var Recommended1 = /** @class */ (function (_super) {
    __extends(Recommended1, _super);
    function Recommended1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Recommended1.prototype.render = function () {
        $(document).ready(function () {
            var button = $('.recommended1Button');
            var content = $('.recommended1Content');
            var randomNum = Math.floor(Math.random() * 5); //生成0-4的随机数
            content.eq(randomNum).css('display', 'flex');
            button.eq(randomNum).css('background-color', 'rgb(53,177,255)');
            button.mouseover(function () {
                var index = $(this).index(); //获取当前元素下标
                content.css('display', 'none');
                content.eq(index).css('display', 'flex');
                button.css('background-color', 'rgb(255,255,255)');
                button.eq(index).css('background-color', 'rgb(53,177,255)');
            });
        });
        return React.createElement("div", { className: "recommended1" },
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98981"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89811"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98982"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89812"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98983"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89813"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98984"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89814"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98985"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89815")))),
            React.createElement("div", { className: "buttonRow" },
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" })));
    };
    return Recommended1;
}(React.Component));
exports.Recommended1 = Recommended1;
/**
 * 首页话题类
 * 用于首页左侧的几个信息栏，该类的对象（一条主题)需要标题，id，所在版面，及所在版面id等几个属性
 **/
var MainPageTopic = /** @class */ (function () {
    //构造方法
    function MainPageTopic(title, id, boardName, boardid) {
        this.title = title;
        this.id = id;
        this.boardName = boardName;
        this.boardid = boardid;
    }
    return MainPageTopic;
}());
exports.MainPageTopic = MainPageTopic;
/**
 * 热门话题组件
 **/
var HotTopicComponent = /** @class */ (function (_super) {
    __extends(HotTopicComponent, _super);
    function HotTopicComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mainPageTopicState: new Array(),
        };
        return _this;
    }
    HotTopicComponent.prototype.getTopicInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainPageTopics, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainPageTopics = [];
                        return [4 /*yield*/, fetch('http://apitest.niconi.cc/Topic/Hot')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 10; i++) {
                            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].id, data[i].boardName, data[i].boardId);
                        }
                        return [2 /*return*/, mainPageTopics];
                }
            });
        });
    };
    HotTopicComponent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopicInfo()];
                    case 1:
                        x = _a.sent();
                        this.setState({
                            mainPageTopicState: x,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HotTopicComponent.prototype.convertMainPageTopic = function (item) {
        var boardUrl = "/list/" + item.boardid + "/normal/";
        var topicUrl = "/topic/" + item.id;
        return React.createElement("div", { className: "listRow" },
            React.createElement("div", { className: "boardName" },
                " ",
                React.createElement("a", { href: boardUrl },
                    "[",
                    item.boardName,
                    "]")),
            React.createElement("div", { className: "topicTitle" },
                React.createElement("a", { href: topicUrl }, item.title)));
    };
    HotTopicComponent.prototype.render = function () {
        return React.createElement("div", null, this.state.mainPageTopicState.map(this.convertMainPageTopic));
    };
    return HotTopicComponent;
}(React.Component));
exports.HotTopicComponent = HotTopicComponent;
/**
 * 实习兼职组件，注意组件类名开头需大写!
 **/
var Shixijianzhi = /** @class */ (function (_super) {
    __extends(Shixijianzhi, _super);
    function Shixijianzhi(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mainPageTopicState: new Array(),
        };
        return _this;
    }
    Shixijianzhi.prototype.getTopicInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainPageTopics, url, headers, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainPageTopics = [];
                        url = 'http://apitest.niconi.cc/Topic/Board/459?from=0&size=10';
                        headers = new Headers();
                        headers.append('Range', 'bytes=0-9');
                        return [4 /*yield*/, fetch(url, { headers: headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 10; i++) {
                            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].id, data[i].boardName, data[i].boardId);
                        }
                        return [2 /*return*/, mainPageTopics];
                }
            });
        });
    };
    Shixijianzhi.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopicInfo()];
                    case 1:
                        x = _a.sent();
                        this.setState({
                            mainPageTopicState: x,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Shixijianzhi.prototype.convertMainPageTopic = function (item) {
        var topicUrl = "/topic/" + item.id;
        return React.createElement("div", { className: "listRow" },
            React.createElement("div", { className: "topicTitle" },
                React.createElement("a", { href: topicUrl }, item.title)));
    };
    Shixijianzhi.prototype.render = function () {
        return React.createElement("div", null, this.state.mainPageTopicState.map(this.convertMainPageTopic));
    };
    return Shixijianzhi;
}(React.Component));
exports.Shixijianzhi = Shixijianzhi;
/*
 测试用组件~
 */
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Test.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, token, myHeaders, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'http://apitest.niconi.cc/me/unreadcount';
                        token = Utility.getLocalStorage("accessToken");
                        console.log(token);
                        myHeaders = new Headers();
                        myHeaders.append("Content-Type", 'application/x-www-form-urlencoded');
                        myHeaders.append("Authorization", token);
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                headers: myHeaders,
                                body: { 'token': token }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.render = function () {
        return React.createElement("div", { onClick: this.test }, "\u8FD9\u91CC\u662F\u840C\u840C\u7684adddna\u6D4B\u8BD5\u7684\u5730\u65B9~");
    };
    return Test;
}(React.Component));
exports.Test = Test;
/**
 * 网站的主页面对象。
 */
var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainPage.prototype.render = function () {
        return React.createElement("div", { className: "mainPage" },
            React.createElement("div", { className: "leftPart" },
                React.createElement("div", { className: "announcement" },
                    React.createElement("div", { className: "blueBar1" },
                        React.createElement("div", { className: "listName" }, "\u8BBA\u575B\u516C\u544A")),
                    React.createElement(Announcement, null)),
                React.createElement(Recommended1, null),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u70ED\u95E8\u8BDD\u9898"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement(HotTopicComponent, null))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6821\u56ED\u6D3B\u52A8"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u2605-----------------------------\u2605")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u9996\u9875\u9664\u4E86\u5341\u5927\u4E4B\u5916\u7684\u90E8\u5206\u8FD8\u6CA1\u65BD\u5DE5\u597D\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5176\u4ED6\u90E8\u5206\u7684\u5185\u5BB9\u90FD\u662F\u4E71\u586B\u54D2")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5982\u679C\u524D\u8F88\u4F60\u770B\u4E0D\u5230\u5341\u5927\u7684\u5185\u5BB9")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u90A3\u4E48\u53EF\u80FD\u662F\u4F60\u5FD8\u4E86\u6302RVPN\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u2605-----------------------------\u2605")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u9996\u9875\u9664\u4E86\u5341\u5927\u4E4B\u5916\u7684\u90E8\u5206\u8FD8\u6CA1\u65BD\u5DE5\u597D\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5176\u4ED6\u90E8\u5206\u7684\u5185\u5BB9\u90FD\u662F\u4E71\u586B\u54D2")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5982\u679C\u524D\u8F88\u4F60\u770B\u4E0D\u5230\u5341\u5927\u7684\u5185\u5BB9")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u90A3\u4E48\u53EF\u80FD\u662F\u4F60\u5FD8\u4E86\u6302RVPN\u54E6"))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5B66\u672F\u4FE1\u606F"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement(Test, null)),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6700\u70ED\u56DE\u590D"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6700\u65B0\u52A8\u6001"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A"))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6C42\u804C\u5E7F\u573A"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5B9E\u4E60\u517C\u804C"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement(Shixijianzhi, null))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5931\u7269\u62DB\u9886"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A"))))),
            React.createElement("div", { className: "rightPart" },
                React.createElement("div", { className: "recommended2" },
                    React.createElement("div", { className: "dashedBorder" },
                        React.createElement("div", { className: "heading" }, "\u63A8\u8350")),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u5E7F\u64AD\u53F0\u70B9\u6B4C\u901A\u9053")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "CC98\u62BD\u5361\u6E38\u620F")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "CC98 share")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u63A8\u8350\u9605\u8BFB\u6295\u7A3F")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u793E\u56E2\u53CA\u5B66\u751F\u7EC4\u7EC7\u7528\u6237\u8BA4\u8BC1\u7533\u8BF7")))),
                React.createElement("div", { className: "ad" },
                    React.createElement("img", { src: "/images/ad.jpg" })),
                React.createElement("div", { className: "news" },
                    React.createElement("div", { className: "dashedBorder" },
                        React.createElement("div", { className: "heading" }, "\u6821\u56ED\u65B0\u95FB")),
                    React.createElement("div", { className: "newsContent" },
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"))),
                React.createElement("div", { className: "boardRecommended" },
                    React.createElement("div", { className: "heading" }, "\u7248\u9762\u63A8\u8350"),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }))));
    };
    return MainPage;
}(React.Component));
exports.MainPage = MainPage;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var UserNavigation_1 = __webpack_require__(111);
var UserRouter_1 = __webpack_require__(112);
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.render = function () {
        return (React.createElement("div", { className: "user-center" },
            React.createElement("div", { className: "user-center-content" },
                React.createElement("div", { className: "user-center-head" },
                    React.createElement("p", null, "\u7528\u6237\u8BE6\u60C5")),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: "user-center-body" },
                        React.createElement(UserNavigation_1.UserNavigation, null),
                        React.createElement(UserRouter_1.UserRouter, null))))));
    };
    return User;
}(React.Component));
exports.User = User;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UbbEditor_1 = __webpack_require__(21);
var Constants;
(function (Constants) {
})(Constants = exports.Constants || (exports.Constants = {}));
/*
*拥有权限的账号发帖类型中增加一项校园活动
*拥有权限的账号才可以选择回复仅楼主可见
*只有特定的版面才可以选择回复仅特定用户可见
*/
/*
*react中用户在表单填入的内容，属于用户跟组件的互动，所以不能用this.props读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值
*这里单选框设置默认选中也有些bug未修复，可能是出于以上原因
*/
/*
*编辑器基本复制了回帖的，很多功能尚未实现
*另外这个编辑器还没做好
*/
/*
*不明白handleChange是做什么的QAQ
*/
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var CreateTopic = /** @class */ (function (_super) {
    __extends(CreateTopic, _super);
    function CreateTopic(props) {
        var _this = _super.call(this, props) || this;
        _this.update = _this.update.bind(_this);
        _this.changeEditor = _this.changeEditor.bind(_this);
        _this.state = ({ topicId: null, title: '', content: '', ready: false, mode: 0, boardName: "" });
        return _this;
    }
    CreateTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, url, headers, response, data, boardName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = Utility.getLocalStorage("accessToken");
                        url = "http://apitest.niconi.cc/Board/" + this.match.params.boardId;
                        headers = new Headers();
                        headers.append("Authorization", token);
                        return [4 /*yield*/, fetch(url, { headers: headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        boardName = data.name;
                        this.setState({ boardName: boardName });
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTopic.prototype.ready = function () {
        this.setState({ ready: true });
    };
    CreateTopic.prototype.changeEditor = function () {
        if (this.state.mode === 0) {
            this.setState({ mode: 1 });
        }
        else {
            this.setState({ mode: 0 });
        }
    };
    CreateTopic.prototype.update = function (value) {
        this.setState({ content: value });
    };
    CreateTopic.prototype.sendMdTopic = function (content1) {
        return __awaiter(this, void 0, void 0, function () {
            var url, content, contentJson, token, myHeaders, mes, topicId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = "http://apitest.niconi.cc/topic/board/" + this.match.params.boardId;
                        content = {
                            content: content1,
                            contentType: 1,
                            title: this.state.title
                        };
                        contentJson = JSON.stringify(content);
                        token = Utility.getLocalStorage("accessToken");
                        myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", 'application/json');
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: myHeaders,
                                body: contentJson
                            })];
                    case 1:
                        mes = _a.sent();
                        if (mes.status === 402) {
                            alert("请输入内容");
                        }
                        return [4 /*yield*/, mes.text()];
                    case 2:
                        topicId = _a.sent();
                        window.location.href = "/topic/" + topicId;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("Error");
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateTopic.prototype.sendUbbTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, content, contentJson, token, myHeaders, mes, topicId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://apitest.niconi.cc/topic/board/" + this.match.params.boardId;
                        content = {
                            content: this.state.content,
                            contentType: 0,
                            title: this.state.title
                        };
                        contentJson = JSON.stringify(content);
                        token = Utility.getLocalStorage("accessToken");
                        myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", 'application/json');
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: myHeaders,
                                body: contentJson
                            })];
                    case 1:
                        mes = _a.sent();
                        return [4 /*yield*/, mes.text()];
                    case 2:
                        topicId = _a.sent();
                        window.location.href = "/topic/" + topicId;
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTopic.prototype.onTitleChange = function (title) {
        this.setState({ title: title });
    };
    CreateTopic.prototype.onUbbChange = function (content) {
        this.setState({ content: content });
    };
    CreateTopic.prototype.render = function () {
        var mode = this.state.mode;
        var url = "/list/" + this.match.params.boardId;
        if (mode === 0) {
            return React.createElement("div", { className: "createTopic" },
                React.createElement("div", { className: "createTopicBoardName" },
                    " ",
                    React.createElement("a", { href: url },
                        this.state.boardName,
                        " >"),
                    "> \u53D1\u8868\u4E3B\u9898"),
                React.createElement(InputTitle, { boardId: this.match.params.boardId, onChange: this.onTitleChange.bind(this) }),
                React.createElement("div", { className: "createTopicType" },
                    React.createElement("div", { className: "createTopicListName" }, "\u53D1\u5E16\u7C7B\u578B"),
                    React.createElement("input", { type: "radio", checked: true, name: "type", value: "normal" }),
                    " \u666E\u901A",
                    React.createElement("input", { type: "radio", name: "type", value: "academic" }),
                    " \u5B66\u672F\u4FE1\u606F",
                    React.createElement("div", { style: { color: 'rgb(255,0,0)' } }, "\uFF08\u6D3B\u52A8\u5E16\u548C\u5B66\u672F\u8D34\u8BF7\u9009\u62E9\u6B63\u786E\u7684\u53D1\u5E16\u7C7B\u578B\uFF09")),
                React.createElement("div", { className: "createTopicOption" },
                    React.createElement("div", { className: "createTopicListName" }, "\u9009\u9879"),
                    React.createElement("input", { type: "radio", checked: true, name: "option", value: "all" }),
                    "\u56DE\u590D\u6240\u6709\u4EBA\u53EF\u89C1",
                    React.createElement("input", { type: "radio", name: "option", value: "host" }),
                    "\u56DE\u590D\u4EC5\u697C\u4E3B\u53EF\u89C1",
                    React.createElement("input", { type: "radio", name: "option", value: "special" }),
                    "\u56DE\u590D\u4EC5\u7279\u5B9A\u7528\u6237\u53EF\u89C1"),
                React.createElement("div", { className: "createTopicContent" },
                    React.createElement("div", { className: "createTopicListName" }, "\u4E3B\u9898\u5185\u5BB9"),
                    React.createElement("div", { id: "post-topic-changeMode", onClick: this.changeEditor, className: "button blue", style: { width: "13.5rem" } }, "\u5207\u6362\u5230Markdown\u7F16\u8F91\u5668")),
                React.createElement(UbbEditor_1.UbbEditor, { update: this.update }),
                React.createElement("div", { className: "row", style: { justifyContent: "center" } },
                    React.createElement("div", { id: "post-topic-button", onClick: this.sendUbbTopic.bind(this), className: "button blue", style: { marginTop: "1.25rem", marginBottom: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" } }, "\u53D1\u5E16")));
        }
        else {
            return React.createElement("div", { className: "createTopic" },
                React.createElement("div", { className: "createTopicBoardName" },
                    " ",
                    React.createElement("a", { href: url },
                        this.state.boardName,
                        " >"),
                    "> \u53D1\u8868\u4E3B\u9898"),
                React.createElement(InputTitle, { boardId: this.match.params.boardId, onChange: this.onTitleChange.bind(this) }),
                React.createElement("div", { className: "createTopicType" },
                    React.createElement("div", { className: "createTopicListName" }, "\u53D1\u5E16\u7C7B\u578B"),
                    React.createElement("input", { type: "radio", checked: true, name: "type", value: "normal" }),
                    " \u666E\u901A",
                    React.createElement("input", { type: "radio", name: "type", value: "academic" }),
                    " \u5B66\u672F\u4FE1\u606F",
                    React.createElement("div", { style: { color: 'rgb(255,0,0)' } }, "\uFF08\u6D3B\u52A8\u5E16\u548C\u5B66\u672F\u8D34\u8BF7\u9009\u62E9\u6B63\u786E\u7684\u53D1\u5E16\u7C7B\u578B\uFF09")),
                React.createElement("div", { className: "createTopicOption" },
                    React.createElement("div", { className: "createTopicListName" }, "\u9009\u9879"),
                    React.createElement("input", { type: "radio", checked: true, name: "option", value: "all" }),
                    "\u56DE\u590D\u6240\u6709\u4EBA\u53EF\u89C1",
                    React.createElement("input", { type: "radio", name: "option", value: "host" }),
                    "\u56DE\u590D\u4EC5\u697C\u4E3B\u53EF\u89C1",
                    React.createElement("input", { type: "radio", name: "option", value: "special" }),
                    "\u56DE\u590D\u4EC5\u7279\u5B9A\u7528\u6237\u53EF\u89C1"),
                React.createElement("div", { className: "createTopicContent" },
                    React.createElement("div", { className: "createTopicListName" }, "\u4E3B\u9898\u5185\u5BB9"),
                    React.createElement("div", { id: "post-topic-changeMode", onClick: this.changeEditor, className: "button blue", style: { width: "13.5rem", letterSpacing: "0.3125rem" } }, "\u5207\u6362\u5230UBB\u7F16\u8F91\u5668")),
                React.createElement(InputMdContent, { onChange: this.sendMdTopic.bind(this), ready: this.state.ready }));
        }
    };
    return CreateTopic;
}(RouteComponent));
exports.CreateTopic = CreateTopic;
//  <div id="post-topic-button" onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
var InputTitle = /** @class */ (function (_super) {
    __extends(InputTitle, _super);
    function InputTitle(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ title: "" });
        return _this;
    }
    InputTitle.prototype.handleTitleChange = function (event) {
        this.props.onChange(event.target.value);
        this.setState({ title: event.target.value });
    };
    InputTitle.prototype.render = function () {
        return React.createElement("div", { className: "createTopicTitle" },
            React.createElement("div", { className: "createTopicListName" }, "\u4E3B\u9898\u6807\u9898"),
            React.createElement("div", { className: "createTopicListName" }, "\u6807\u7B7E1"),
            React.createElement("div", { className: "createTopicListName" }, "\u6807\u7B7E2"),
            React.createElement("input", { value: this.state.title, placeholder: "请输入新主题的标题", onChange: this.handleTitleChange.bind(this) }));
    };
    return InputTitle;
}(React.Component));
exports.InputTitle = InputTitle;
var InputMdContent = /** @class */ (function (_super) {
    __extends(InputMdContent, _super);
    function InputMdContent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ content: "" });
        return _this;
    }
    InputMdContent.prototype.componentDidMount = function () {
        Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 680,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false
        });
    };
    InputMdContent.prototype.send = function () {
        var content = Constants.testEditor.getMarkdown();
        this.props.onChange(content);
    };
    InputMdContent.prototype.render = function () {
        return React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column" } },
            React.createElement("div", { id: "sendTopic" },
                React.createElement("form", null,
                    React.createElement("div", { id: "test-editormd", className: "editormd" },
                        React.createElement("textarea", { className: "editormd-markdown-textarea", name: "test-editormd-markdown-doc" }))),
                React.createElement("div", { className: "row", style: { justifyContent: "center", marginBottom: "1.25rem " } },
                    React.createElement("div", { id: "post-topic-button", className: "button blue", style: { marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }, onClick: this.send.bind(this) }, "\u53D1\u5E16"))));
    };
    return InputMdContent;
}(React.Component));
exports.InputMdContent = InputMdContent;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var LogOn_1 = __webpack_require__(18);
var Utility = __webpack_require__(1);
var LogOut = /** @class */ (function (_super) {
    __extends(LogOut, _super);
    function LogOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogOut.prototype.render = function () {
        return React.createElement("div", { style: {
                display: "flex", flexDirection: "column"
            } },
            React.createElement("div", null, "\u60A8\u5F53\u524D\u672A\u767B\u5F55"),
            React.createElement(LogOn_1.LogOn, null));
    };
    return LogOut;
}(React.Component));
exports.LogOut = LogOut;
var TopicDeleted = /** @class */ (function (_super) {
    __extends(TopicDeleted, _super);
    function TopicDeleted() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopicDeleted.prototype.render = function () {
        return React.createElement("div", null, "\u5E16\u5B50\u88AB\u5220\u9664");
    };
    return TopicDeleted;
}(React.Component));
exports.TopicDeleted = TopicDeleted;
var Disconnected = /** @class */ (function (_super) {
    __extends(Disconnected, _super);
    function Disconnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Disconnected.prototype.render = function () {
        return React.createElement("div", null, "\u7F51\u7EDC\u8FDE\u63A5\u4E2D\u65AD");
    };
    return Disconnected;
}(React.Component));
exports.Disconnected = Disconnected;
var UnauthorizedBoard = /** @class */ (function (_super) {
    __extends(UnauthorizedBoard, _super);
    function UnauthorizedBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnauthorizedBoard.prototype.render = function () {
        return React.createElement("div", null, "401\u60A8\u6CA1\u6709\u6743\u9650\u8FDB\u5165\u8FD9\u4E2A\u7248\u9762");
    };
    return UnauthorizedBoard;
}(React.Component));
exports.UnauthorizedBoard = UnauthorizedBoard;
var UnauthorizedTopic = /** @class */ (function (_super) {
    __extends(UnauthorizedTopic, _super);
    function UnauthorizedTopic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnauthorizedTopic.prototype.render = function () {
        return React.createElement("div", null, "401\u60A8\u6CA1\u6709\u6743\u9650\u8FDB\u5165\u8FD9\u4E2A\u5E16\u5B50");
    };
    return UnauthorizedTopic;
}(React.Component));
exports.UnauthorizedTopic = UnauthorizedTopic;
var NotFoundBoard = /** @class */ (function (_super) {
    __extends(NotFoundBoard, _super);
    function NotFoundBoard(props, context) {
        return _super.call(this, props, context) || this;
    }
    NotFoundBoard.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, headers, content, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append("Authorization", token);
                        headers.append("Content-Type", "application/json");
                        content = "test";
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/topic/deletetop?topicid=4739872&boardid=753", {
                                method: "DELETE",
                                headers: headers,
                                body: JSON.stringify(content)
                            })];
                    case 1:
                        response = _a.sent();
                        console.log("finished");
                        return [2 /*return*/];
                }
            });
        });
    };
    NotFoundBoard.prototype.render = function () {
        return React.createElement("div", null, "404\u7248\u9762\u4E0D\u5B58\u5728");
    };
    return NotFoundBoard;
}(React.Component));
exports.NotFoundBoard = NotFoundBoard;
var NotFoundTopic = /** @class */ (function (_super) {
    __extends(NotFoundTopic, _super);
    function NotFoundTopic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, headers, body, str, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append("Authorization", token);
                        headers.append("Content-Type", "application/json");
                        body = {
                            isCanceling: false,
                            isBold: true,
                            isItalic: true,
                            color: "red",
                            duration: null
                        };
                        str = JSON.stringify(body);
                        url = 'http://apitest.niconi.cc/topic/sethighlight?boardid=753&topicid=4740298';
                        return [4 /*yield*/, fetch(url, { method: "PUT", headers: headers, body: str })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotFoundTopic.prototype.render = function () {
        return React.createElement("div", null, "404\u5E16\u5B50\u4E0D\u5B58\u5728");
    };
    return NotFoundTopic;
}(React.Component));
exports.NotFoundTopic = NotFoundTopic;
var NotFoundUser = /** @class */ (function (_super) {
    __extends(NotFoundUser, _super);
    function NotFoundUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundUser.prototype.render = function () {
        return React.createElement("div", null, "404\u7528\u6237\u4E0D\u5B58\u5728");
    };
    return NotFoundUser;
}(React.Component));
exports.NotFoundUser = NotFoundUser;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerError.prototype.render = function () {
        return React.createElement("div", null, "500\u670D\u52A1\u5668\u9519\u8BEF");
    };
    return ServerError;
}(React.Component));
exports.ServerError = ServerError;
var ContentNeeded = /** @class */ (function (_super) {
    __extends(ContentNeeded, _super);
    function ContentNeeded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentNeeded.prototype.render = function () {
        return React.createElement("div", null, "402\u9700\u8981\u8F93\u5165\u5185\u5BB9");
    };
    return ContentNeeded;
}(React.Component));
exports.ContentNeeded = ContentNeeded;
var OperationForbidden = /** @class */ (function (_super) {
    __extends(OperationForbidden, _super);
    function OperationForbidden() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationForbidden.prototype.render = function () {
        return React.createElement("div", null, "403\u64CD\u4F5C\u88AB\u62D2\u7EDD");
    };
    return OperationForbidden;
}(React.Component));
exports.OperationForbidden = OperationForbidden;
/*
class student {
    private:
        long id;
        string name;
        double averageGrade;
        string major;
        int gradeClass;
        string majorClass;
        double totalGradePoint;
        enum studentType;
public:
    showAllCourseGrade(){
    //在表四中通过学号找到学生选的所有课程
    courseNumber[] = search in database4
   //对于每一门课程，在表二中找到这个学号的成绩并存起来
    loop
    foreach course in courseNumber search grade in database 2
    save in grade[]
    return grade;
}
    //计算平均成绩
    getAverageGrade(grade[]){
    double gpa = average(sum of grade[]);
    return gpa;
}
}
class Course {
    private:
        string courseId;
        string courseName;
        string teachers;
        string student;
        double grade;
    public:
    //对某个课程号，找到所有选这门课学生的成绩信息
    showAllGradesInCourse(){
    message: { student, grade } [] = search courseId in database2
    return message[];
    }
    //对某个课程、老师，找到所有选这个老师这门课学生的成绩信息
    showGradeOfTeacher(string teacher){
    message: { student, grade } [] = search { couseId, teacher }in database 2;
    return message[];
    }
    //对于某个老师的某节课的所有学生找出他们的成绩
    showGradeOfTeacherClass(string teacher,string time){
    message: { student, grade } [] = search { couseId, teacher, time }in database 2;
    return message[];
}
    //录入成绩
    setGrade(courseId,student,grade){
    add { courseId, student, grade } in database 4;
    }
    //修改成绩
    alterGrade(courseId, student, grade){
    update { courseId, student, grade } in database 4;
}
    //删除成绩
    deleteGrade(courseId, student, grade){
    delete { courseId, student, grade } in database 4;
}
}
class CourseAndStudentRelationship {
    //数据库表4，,记录课程——学生的关系
    private:
        string courseId;
        string courseName;
        string studentName;
        long studentId;
        string teacher;
    public:
    //找到一个学生选的所有课
    getAllStudentCourses(studentId){
    courses[] = search studentId in database 2 for his or her courses;
    }
    //找到一个课所有的学生
    getAllStudentsInCourse(courseId){
    students[] = search courseId in database 3 for all students;
    }
}
class Teacher {
    private:
        string courses[];
    public:
        //找到一个老师打出的所有成绩
        getGrade(teacher){
            messages: { student, grade } [] = search teacher in database2 for all grades;
                 return messages[];
        }
        //找到一个老师一门课程打出的所有成绩
        getGrade(teacher, courseId) {
            messages: { student, grade } [] = search { teacher, courseId } in database2 for all grades;
             return messages[];
    }
        //找到一个老师某节课全班的成绩
     getGrade(teacher, courseId,time) {
         messages: { student, grade }[] = search { teacher, courseId, time } in database2 for all grades;
            return messages[];
    }
}
class Major {
    private:
        string majorName;
    public:
        //通过专业名字找到这个专业所有的学生
        getAllStudents(majorName){
            students[] = search majorName in database1 for all students in this major;
            return students[];
        }
        //通过学生ID找到所有的平均成绩并组成键值对
    getGrade(students[]) {
        messages{ student, grade }[] = search students[] in database1 for all grades in this major;
        return messages[];
    }
}
class majorClass {
    private:
        string className;
    public:
        //通过班级名字找到班内所有同学
        getStudents(className){
            students[] = search className in database1 for all students in this class;
            return students[];
        }
          //通过学生ID找到所有的平均成绩并组成键值对
    getGrade(students[]) {
        messages{ student, grade } [] = search student in database1 for all grades;
            return messages[];
    }
}
class gradeClass {
    private:
        int gradeClass;
    public:
        //通过年级找到本年级所有学生
        getStudent(gradeClass){
            students[] = search gradeClass in database1 for all students in this gradeClass;
            return students[];
        }
        //通过学生ID找到他们成绩的键值对
        getGrade() {
        messages{ student, grade } [] = search students in database1 for grades;
            return messages[];
    }
}
*/


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var FocusTopicSingle_1 = __webpack_require__(13);
var Utility = __webpack_require__(1);
/**
 * 表示搜索结果的帖子列表
 */
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            boardId: 0,
            boardName: '全站',
            words: [],
            data: [],
            from: 0,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    Search.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchInfo, newTopic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchInfo = Utility.getStorage("searchInfo");
                        if (!!searchInfo) return [3 /*break*/, 1];
                        this.showNoResult();
                        this.setState({ loading: false });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Utility.getSearchTopic(searchInfo.boardId, searchInfo.words, this.state.from, this.context.router)];
                    case 2:
                        newTopic = _a.sent();
                        //搜索结果为0
                        if (newTopic == 0) {
                            console.log("没有搜索结果");
                            this.showNoResult();
                            this.setState({ loading: false });
                        }
                        else {
                            //搜索结果小于20条，无法再获取新的了
                            if (newTopic.length < 20) {
                                this.setState({ boardId: searchInfo.boardId, boardName: searchInfo.boardName, words: searchInfo.words, data: newTopic, from: newTopic.length, loading: false });
                                $('#focus-topic-loading').addClass('displaynone');
                                $('#focus-topic-loaddone').removeClass('displaynone');
                            }
                            else {
                                this.setState({ boardId: searchInfo.boardId, boardName: searchInfo.boardName, words: searchInfo.words, data: newTopic, from: newTopic.length, loading: true });
                            }
                        }
                        _a.label = 3;
                    case 3:
                        //滚动条监听
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    Search.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1, data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utility.isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getSearchTopic(this.state.boardId, this.state.words, this.state.from, this.context.router)];
                    case 2:
                        newData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        /**
                        *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ loading: true });
                        return [2 /*return*/];
                    case 4:
                        if (!newData) {
                            $('#focus-topic-loading').addClass('displaynone');
                            $('#focus-topic-loaddone').removeClass('displaynone');
                            this.setState({ loading: false });
                            return [2 /*return*/];
                        }
                        else {
                            //搜索结果小于20条，无法再获取新的了,添加新数据，this.state.loading设置为false，后续不可以再次发送fetch请求
                            if (newData.length < 20) {
                                $('#focus-topic-loading').addClass('displaynone');
                                $('#focus-topic-loaddone').removeClass('displaynone');
                                data = this.state.data.concat(newData);
                                this.setState({ data: data, from: data.length, loading: false });
                            }
                            else {
                                data = this.state.data.concat(newData);
                                this.setState({ data: data, from: data.length, loading: true });
                            }
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Search.prototype.showNoResult = function () {
        $('#focus-topic-area').addClass('displaynone');
        $('#noResult').removeClass('displaynone');
    };
    Search.prototype.render = function () {
        return (React.createElement("div", { className: "focus-root" },
            React.createElement("div", { className: "focus" },
                React.createElement("div", { className: "focus-allNewTopic" },
                    React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                    "\u641C\u7D22/",
                    this.state.boardName),
                React.createElement("div", { className: "focus-topic-area", id: "focus-topic-area" },
                    React.createElement("div", { className: "focus-topic-topicArea" }, this.state.data.map(coverFocusPost)),
                    React.createElement("div", { className: "focus-topic-loading", id: "focus-topic-loading" },
                        React.createElement("img", { src: "http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif" })),
                    React.createElement("div", { className: "focus-topic-loaddone displaynone", id: "focus-topic-loaddone" }, " \u6CA1\u6709\u66F4\u591A\u5E16\u5B50\u5566~")),
                React.createElement("div", { id: "noResult", className: "noResult displaynone" }, "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u641C\u7D22\u7ED3\u679C"))));
    };
    return Search;
}(React.Component));
exports.Search = Search;
function coverFocusPost(item) {
    return React.createElement(FocusTopicSingle_1.FocusTopicSingle, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, userId: item.userId, userName: item.userName, portraitUrl: item.portraitUrl, time: item.time, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
/**
 * 表示我搜索到的版面列表区域
 */
var SearchBoard = /** @class */ (function (_super) {
    __extends(SearchBoard, _super);
    function SearchBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchBoard.prototype.render = function () {
        var data = Utility.getStorage("searchBoardInfo");
        return (React.createElement("div", { className: "focus-root" },
            React.createElement("div", { className: "focus" },
                React.createElement("div", { className: "focus-title" },
                    React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                    "\u641C\u7D22/\u7248\u9762"),
                React.createElement("div", { className: "focus-board-area" }, data.map(coverFocusBoard)))));
    };
    return SearchBoard;
}(React.Component));
exports.SearchBoard = SearchBoard;
function coverFocusBoard(item) {
    //点击版面名称会显示相应版面的帖子
    var boardUrl = "/list/" + item.id + "/normal/";
    return React.createElement("a", { href: boardUrl, target: "_blank" },
        React.createElement("div", { className: "focus-board" }, item.name));
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
//用户中心我的关注&我的粉丝用户通用组件
var UserCenterMyFollowingsUser = /** @class */ (function (_super) {
    __extends(UserCenterMyFollowingsUser, _super);
    function UserCenterMyFollowingsUser(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            buttonInfo: '已关注',
            buttonIsDisabled: false,
            isFollowing: true
        };
        _this.unfollow = _this.unfollow.bind(_this);
        _this.follow = _this.follow.bind(_this);
        return _this;
    }
    UserCenterMyFollowingsUser.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                this.setState({
                    buttonIsDisabled: true,
                    buttonInfo: '取关中'
                });
                res = Utility.unfollowUser(this.props.userFanInfo.id);
                if (res) {
                    this.setState({
                        buttonIsDisabled: false,
                        buttonInfo: '重新关注',
                        isFollowing: false
                    });
                }
                else {
                    this.setState({
                        buttonIsDisabled: false,
                        buttonInfo: '取关失败',
                        isFollowing: true
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    UserCenterMyFollowingsUser.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '关注中'
                        });
                        return [4 /*yield*/, Utility.followUser(this.props.userFanInfo.id)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '已关注',
                                isFollowing: true
                            });
                        }
                        else {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '关注失败',
                                isFollowing: false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFollowingsUser.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "user-center-myfollowings-user" },
            React.createElement("img", { src: this.props.userFanInfo.avatarImgURL }),
            React.createElement("p", null,
                React.createElement("span", { className: "user-center-myfollowings-user-id" },
                    React.createElement("a", { href: "/user/" + this.props.userFanInfo.id }, this.props.userFanInfo.name)),
                "\u4E3B\u9898",
                React.createElement("span", { className: "user-center-myfollowings-user-posts" }, this.props.userFanInfo.posts),
                "\u7C89\u4E1D",
                React.createElement("span", { className: "user-center-myfollowings-user-fans" }, this.props.userFanInfo.fans)),
            React.createElement("button", { type: "button", id: this.state.isFollowing ? '' : 'follow', onMouseOver: function () {
                    if (_this.state.isFollowing && !_this.state.buttonIsDisabled) {
                        _this.setState({
                            buttonInfo: '取消关注'
                        });
                    }
                }, onMouseLeave: function () {
                    if (_this.state.isFollowing && !_this.state.buttonIsDisabled) {
                        _this.setState({
                            buttonInfo: '已关注'
                        });
                    }
                }, onClick: this.state.isFollowing ? this.unfollow : this.follow, disabled: this.state.buttonIsDisabled }, this.state.buttonInfo)));
    };
    return UserCenterMyFollowingsUser;
}(React.Component));
exports.UserCenterMyFollowingsUser = UserCenterMyFollowingsUser;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
module.exports = __webpack_require__(128);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(45);
var Store_1 = __webpack_require__(46);
var react_redux_1 = __webpack_require__(6);
var App_1 = __webpack_require__(79);
// 显示应用程序核心内容
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: Store_1.default },
    React.createElement(App_1.App, null)), document.getElementById('root'));


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(47);
var Error_1 = __webpack_require__(48);
var Post_1 = __webpack_require__(49);
var UserInfo_1 = __webpack_require__(50);
/**
 * 合并reducer
 * 在组件中使用相应的Store时带上这里的前缀
 */
var reducer = redux_1.combineReducers({
    error: Error_1.default,
    post: Post_1.default,
    userInfo: UserInfo_1.default
});
exports.default = redux_1.createStore(reducer);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes = __webpack_require__(10);
/**
 * 错误用的Store
 */
var ErrorStore = /** @class */ (function () {
    function ErrorStore() {
        /**
        * 表示是否有错误
        */
        this.isError = false;
        /**
        * 表示错误信息
        */
        this.errorMessage = '';
    }
    return ErrorStore;
}());
/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
exports.default = function (state, action) {
    if (state === void 0) { state = new ErrorStore(); }
    switch (action.type) {
        case ActionTypes.ERROR:
            return __assign({}, state, { isError: true, errorMessage: action.errorMessage });
        default:
            return state;
    }
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

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
var ActionTypes = __webpack_require__(10);
/**
 * 帖子store
 */
var TopicState = /** @class */ (function () {
    function TopicState() {
    }
    return TopicState;
}());
/**
 * 奖赏store
 */
var AwardState = /** @class */ (function () {
    function AwardState() {
    }
    return AwardState;
}());
/**
 * 作者信息store
 */
var UserState = /** @class */ (function () {
    function UserState() {
    }
    return UserState;
}());
/**
 * 主题信息store
 */
var PostTopicState = /** @class */ (function () {
    function PostTopicState() {
    }
    return PostTopicState;
}());
/**
 * 帖子信息store
 */
var PostState = /** @class */ (function () {
    function PostState() {
    }
    return PostState;
}());
/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
function post(state, action) {
    if (state === void 0) { state = new TopicState(); }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (action.type) {
                case ActionTypes.ADD_AWARD:
                    return [2 /*return*/, {
                            post: state.post, postTopic: state.postTopic, user: state.user, award: { updateTime: Date.now() }
                        }];
                default:
                    return [2 /*return*/, state];
            }
            return [2 /*return*/];
        });
    });
}
exports.default = post;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes = __webpack_require__(10);
var Utility = __webpack_require__(1);
var Appstate = __webpack_require__(5);
/**
 * 用户中心用Store
 */
var UserInfo = /** @class */ (function () {
    function UserInfo() {
        /**
        * 表示用户是否登录
        */
        this.isLogOn = Utility.isLogOn();
        /**
        * 表示当前登录用户的用户信息
        */
        this.currentUserInfo = Utility.getLocalStorage('userInfo') || new Appstate.UserInfo();
        /**
        * 帖子数据包括帖子本身的数据以及所属版面的数据
        */
    }
    return UserInfo;
}());
;
/**
 * reducer接收到undefined的state时一定要初始化state
 * 这里用ES6方法，在函数定义中初始化state
 */
exports.default = function (state, action) {
    if (state === void 0) { state = new UserInfo; }
    switch (action.type) {
        case ActionTypes.USER_LOG_ON:
            return __assign({}, state, { isLogOn: true });
        case ActionTypes.USER_LOG_OFF:
            return __assign({}, state, { isLogOn: false });
        case ActionTypes.CHANGE_USERINFO:
            Utility.setLocalStorage("userInfo", action.newInfo);
            return __assign({}, state, { currentUserInfo: action.newInfo });
        default:
            return state;
    }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Ubb = __webpack_require__(2);
var BTagHandler_1 = __webpack_require__(52);
var ImageTagHandler_1 = __webpack_require__(19);
var ITagHandler_1 = __webpack_require__(53);
var SizeTagHandler_1 = __webpack_require__(54);
var QuoteTagHandler_1 = __webpack_require__(55);
var ColorTagHandler_1 = __webpack_require__(56);
var URLTagHandler_1 = __webpack_require__(57);
var UTagHandler_1 = __webpack_require__(58);
var DelTagHandler_1 = __webpack_require__(59);
var MP3TagHandler_1 = __webpack_require__(60);
var CursorTagHandler_1 = __webpack_require__(61);
var EnglishTagHandler_1 = __webpack_require__(62);
var UserTagHandler_1 = __webpack_require__(63);
var CodeTagHandler_1 = __webpack_require__(64);
var UnresolvedTagHandler_1 = __webpack_require__(65);
var FontTagHandler_1 = __webpack_require__(66);
var AlignTagHandler_1 = __webpack_require__(67);
var UploadTagHandler_1 = __webpack_require__(68);
var LeftTagHandler_1 = __webpack_require__(69);
var CenterTagHandler_1 = __webpack_require__(70);
var RightTagHandler_1 = __webpack_require__(71);
var TableTagHandler_1 = __webpack_require__(72);
var TdTagHandler_1 = __webpack_require__(73);
var ThTagHandler_1 = __webpack_require__(74);
var TrTagHandler_1 = __webpack_require__(75);
var TopicTagHandler_1 = __webpack_require__(76);
var MdTagHandler_1 = __webpack_require__(77);
var EmTagHandler_1 = __webpack_require__(78);
/**
 * 创建一个具有所有功能的默认引擎。
 */
function createEngine() {
    var engine = new Ubb.UbbCodeEngine();
    // 在此处添加引擎所支持的所有标签处理器
    engine.tagHandlers.register(BTagHandler_1.BTagHandler);
    engine.tagHandlers.register(ImageTagHandler_1.ImageTagHandler);
    engine.tagHandlers.register(ITagHandler_1.ITagHandler);
    engine.tagHandlers.register(SizeTagHandler_1.SizeTagHandler);
    engine.tagHandlers.register(QuoteTagHandler_1.QuoteTagHandler);
    engine.tagHandlers.register(ColorTagHandler_1.ColorTagHandler);
    engine.tagHandlers.register(URLTagHandler_1.UrlTagHandler);
    engine.tagHandlers.register(UTagHandler_1.UTagHandler);
    engine.tagHandlers.register(DelTagHandler_1.DelTagHandler);
    engine.tagHandlers.register(MP3TagHandler_1.MP3TagHandler);
    engine.tagHandlers.register(CursorTagHandler_1.CursorTagHandler);
    engine.tagHandlers.register(EnglishTagHandler_1.EnglishTagHandler);
    engine.tagHandlers.register(UserTagHandler_1.UserTagHandler);
    engine.tagHandlers.register(CodeTagHandler_1.CodeTagHandler);
    engine.tagHandlers.register(FontTagHandler_1.FontTagHandler);
    engine.tagHandlers.register(AlignTagHandler_1.AlignTagHandler);
    engine.tagHandlers.register(UploadTagHandler_1.UploadTagHandler);
    engine.tagHandlers.register(LeftTagHandler_1.LeftTagHandler);
    engine.tagHandlers.register(CenterTagHandler_1.CenterTagHandler);
    engine.tagHandlers.register(RightTagHandler_1.RightTagHandler);
    engine.tagHandlers.register(TableTagHandler_1.TableTagHandler);
    engine.tagHandlers.register(TdTagHandler_1.TdTagHandler);
    engine.tagHandlers.register(ThTagHandler_1.ThTagHandler);
    engine.tagHandlers.register(TrTagHandler_1.TrTagHandler);
    engine.tagHandlers.register(TopicTagHandler_1.TopicTagHandler);
    engine.tagHandlers.register(MdTagHandler_1.MdTagHandler);
    engine.tagHandlers.register(EmTagHandler_1.EmTagHandler);
    // 以下是未命名标签处理程序，注意未命名标签处理程序的命中和注册顺序有关
    engine.tagHandlers.register(UnresolvedTagHandler_1.UnresolvedTagHandler);
    return engine;
}
exports.createEngine = createEngine;
// 重新导出核心功能
__export(__webpack_require__(2));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [b] 标签的处理器。
 */
var BTagHandler = /** @class */ (function (_super) {
    __extends(BTagHandler, _super);
    function BTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'b';
        },
        enumerable: true,
        configurable: true
    });
    BTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        /*
        // HTML5 标准建议不再使用 b 标签
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return <strong>{innerContent}</strong>;
        } else {
            return <b>{innerContent}</b>;
        }
        */
        return React.createElement("span", { style: { fontWeight: "bold" } }, innerContent);
    };
    return BTagHandler;
}(Ubb.RecursiveTagHandler));
exports.BTagHandler = BTagHandler;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [i] 标签的处理器。
 */
var ITagHandler = /** @class */ (function (_super) {
    __extends(ITagHandler, _super);
    function ITagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ITagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'i';
        },
        enumerable: true,
        configurable: true
    });
    ITagHandler.prototype.execCore = function (innerContent, tagData, context) {
        return React.createElement("i", null, innerContent);
    };
    return ITagHandler;
}(Ubb.RecursiveTagHandler));
exports.ITagHandler = ITagHandler;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [size] 标签的处理器。
 */
var SizeTagHandler = /** @class */ (function (_super) {
    __extends(SizeTagHandler, _super);
    function SizeTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SizeTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'size';
        },
        enumerable: true,
        configurable: true
    });
    SizeTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var size = parseInt(tagData.value('size'));
        if (isNaN(size) || size <= 0) {
            return innerContent;
        }
        size = size > 7 ? 3.5 : (size / 2);
        size /= 1.5; //这里可能需要调整
        var style = {
            fontSize: size + "rem"
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return SizeTagHandler;
}(Ubb.RecursiveTagHandler));
exports.SizeTagHandler = SizeTagHandler;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [quote] 标签的处理器。
 */
var QuoteTagHandler = /** @class */ (function (_super) {
    __extends(QuoteTagHandler, _super);
    function QuoteTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(QuoteTagHandler.prototype, "supportedTagNames", {
        get: function () { return ['quote', 'quotex']; },
        enumerable: true,
        configurable: true
    });
    ;
    QuoteTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            padding: '13px 19px 13px 17px',
            backgroundColor: '#F5FAFF',
            border: '1px solid rgb(204,204,204)',
            margin: '30px',
            maxHeight: '800px',
            overflowY: 'auto'
        };
        return React.createElement("div", { style: style }, innerContent);
    };
    return QuoteTagHandler;
}(Ubb.RecursiveTagHandler));
exports.QuoteTagHandler = QuoteTagHandler;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [color] 标签的处理器。
 */
var ColorTagHandler = /** @class */ (function (_super) {
    __extends(ColorTagHandler, _super);
    function ColorTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ColorTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'color';
        },
        enumerable: true,
        configurable: true
    });
    ColorTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var color = tagData.value('color');
        var style = {
            color: color
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return ColorTagHandler;
}(Ubb.RecursiveTagHandler));
exports.ColorTagHandler = ColorTagHandler;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [url] 标签的处理器。
 */
var UrlTagHandler = /** @class */ (function (_super) {
    __extends(UrlTagHandler, _super);
    function UrlTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UrlTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'url';
        },
        enumerable: true,
        configurable: true
    });
    UrlTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var url = tagData.value('url');
        if (!url) {
            url = innerContent;
        }
        //不允许显示外部链接
        if (context.options.allowExternalUrl === false) {
            //判断是否为外部链接
            if (url.indexOf('http') === 0 && url.split('/').length > 1 && url.split('/')[2] !== 'www.cc98.org') {
                return innerContent;
            }
        }
        return React.createElement("a", { href: url, target: "_blank" }, innerContent);
    };
    return UrlTagHandler;
}(Ubb.RecursiveTagHandler));
exports.UrlTagHandler = UrlTagHandler;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [u] 标签的处理器。
 */
var UTagHandler = /** @class */ (function (_super) {
    __extends(UTagHandler, _super);
    function UTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'u';
        },
        enumerable: true,
        configurable: true
    });
    UTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textDecoration: 'underline'
        };
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return React.createElement("span", { style: style }, innerContent);
        }
        else {
            return React.createElement("u", null, innerContent);
        }
    };
    return UTagHandler;
}(Ubb.RecursiveTagHandler));
exports.UTagHandler = UTagHandler;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [del] 标签的处理器。
 */
var DelTagHandler = /** @class */ (function (_super) {
    __extends(DelTagHandler, _super);
    function DelTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DelTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'del';
        },
        enumerable: true,
        configurable: true
    });
    DelTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textDecoration: 'line-through'
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return DelTagHandler;
}(Ubb.RecursiveTagHandler));
exports.DelTagHandler = DelTagHandler;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [mp3] 标签的处理器。
 */
var MP3TagHandler = /** @class */ (function (_super) {
    __extends(MP3TagHandler, _super);
    function MP3TagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MP3TagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'mp3';
        },
        enumerable: true,
        configurable: true
    });
    MP3TagHandler.prototype.execCore = function (innerContent, tagData, context) {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        }
        //是否自动播放
        var autoPlay = false;
        if (tagData.value('mp3') === '1' && context.options.allowAutoPlay === true) {
            autoPlay = true;
        }
        return (React.createElement("audio", { src: innerContent, controls: true, autoPlay: autoPlay }));
    };
    return MP3TagHandler;
}(Ubb.TextTagHandler));
exports.MP3TagHandler = MP3TagHandler;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [cursor] 标签的处理器。
 */
var CursorTagHandler = /** @class */ (function (_super) {
    __extends(CursorTagHandler, _super);
    function CursorTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CursorTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'cursor'; },
        enumerable: true,
        configurable: true
    });
    ;
    CursorTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var cursor = tagData.value('cursor');
        var style = {
            cursor: cursor
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return CursorTagHandler;
}(Ubb.RecursiveTagHandler));
exports.CursorTagHandler = CursorTagHandler;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [english] 标签的处理器。
 */
var EnglishTagHandler = /** @class */ (function (_super) {
    __extends(EnglishTagHandler, _super);
    function EnglishTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EnglishTagHandler.prototype, "supportedTagNames", {
        get: function () {
            return 'english';
        },
        enumerable: true,
        configurable: true
    });
    EnglishTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            fontFamily: 'Arial'
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return EnglishTagHandler;
}(Ubb.RecursiveTagHandler));
exports.EnglishTagHandler = EnglishTagHandler;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [user] 标签的处理器。
 */
var UserTagHandler = /** @class */ (function (_super) {
    __extends(UserTagHandler, _super);
    function UserTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'user'; },
        enumerable: true,
        configurable: true
    });
    ;
    UserTagHandler.prototype.execCore = function (content, tagData, context) {
        var userName = content;
        var style = {
            cursor: 'pointer'
        };
        return React.createElement("a", { href: "/user/name" + encodeURI(userName), style: style }, userName);
    };
    return UserTagHandler;
}(Ubb.TextTagHandler));
exports.UserTagHandler = UserTagHandler;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [code] 标签的处理器。
 */
var CodeTagHandler = /** @class */ (function (_super) {
    __extends(CodeTagHandler, _super);
    function CodeTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CodeTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'code'; },
        enumerable: true,
        configurable: true
    });
    ;
    CodeTagHandler.prototype.execCore = function (content, tagData, context) {
        var element = content.split('\n').map(function (item, index) {
            return React.createElement("li", null, item);
        });
        return (React.createElement("div", { className: 'ubb-code' },
            React.createElement("ol", null, element)));
    };
    return CodeTagHandler;
}(Ubb.TextTagHandler));
exports.CodeTagHandler = CodeTagHandler;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Ubb = __webpack_require__(2);
/**
 * 为所有未解析的标签提供通用处理。
 */
var UnresolvedTagHandler = /** @class */ (function (_super) {
    __extends(UnresolvedTagHandler, _super);
    function UnresolvedTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnresolvedTagHandler.prototype, "supportedTagNames", {
        get: function () { return /.*/i; },
        enumerable: true,
        configurable: true
    });
    UnresolvedTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        // 警告提示
        console.warn('检测到未处理的标签 %s，该标签将被当做一般文字。', tagData.tagName);
        return Ubb.UbbTagHandler.renderTagAsString(tagData, innerContent);
    };
    return UnresolvedTagHandler;
}(Ubb.RecursiveTagHandler));
exports.UnresolvedTagHandler = UnresolvedTagHandler;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [font] 标签的处理器。
 */
var FontTagHandler = /** @class */ (function (_super) {
    __extends(FontTagHandler, _super);
    function FontTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FontTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'font'; },
        enumerable: true,
        configurable: true
    });
    ;
    FontTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var font = tagData.value('font');
        var style = {
            fontFamily: font
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return FontTagHandler;
}(Ubb.RecursiveTagHandler));
exports.FontTagHandler = FontTagHandler;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [align] 标签的处理器。
 */
var AlignTagHandler = /** @class */ (function (_super) {
    __extends(AlignTagHandler, _super);
    function AlignTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AlignTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'align'; },
        enumerable: true,
        configurable: true
    });
    ;
    AlignTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var align = tagData.value('align');
        var style = {
            textAlign: align
        };
        return React.createElement("span", { style: style },
            React.createElement("div", null, innerContent));
    };
    return AlignTagHandler;
}(Ubb.RecursiveTagHandler));
exports.AlignTagHandler = AlignTagHandler;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
var ImageTagHandler_1 = __webpack_require__(19);
//暂时完成 目前可以区分支持格式的图片和其他格式的文件 
//对于支持格式的图片，会根据第二个参数的值决定是否默认显示
//对于其他格式的文件，是否填写第二个参数没有影响（与原版98相同）
//与原版98不同之处之一是，现在upload标签不写参数也可以解析，但是这时不能区分图片与非图片
var UploadTagHandler = /** @class */ (function (_super) {
    __extends(UploadTagHandler, _super);
    function UploadTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UploadTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'upload'; },
        enumerable: true,
        configurable: true
    });
    ;
    UploadTagHandler.prototype.execCore = function (content, tagData, context) {
        var uploadUri = content;
        var uploadType = tagData.value(0);
        var uploadValue;
        if (tagData.parameterCount === 1)
            uploadValue = 0;
        if (tagData.parameterCount === 2)
            uploadValue = parseInt(tagData.value(1));
        switch (uploadType) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "webp":
                // 不允许显示图像
                if (!context.options.allowImage) {
                    return React.createElement(ImageTagHandler_1.Image, { imageUri: uploadUri, title: "upload图片", isShowed: false });
                }
                //第二个参数值为1默认不显示图片，为0或没有则默认显示图片
                // HTML5 模式下，使用 figure 表示插图
                if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
                    if (uploadValue === 1) {
                        return React.createElement(ImageTagHandler_1.Image, { imageUri: uploadUri, title: "upload图片", isShowed: false });
                    }
                    else {
                        return React.createElement("figure", null,
                            React.createElement(ImageTagHandler_1.Image, { imageUri: uploadUri, title: "upload图片", isShowed: true }),
                            React.createElement("figcaption", null, "upload图片"));
                    }
                }
                else {
                    if (uploadValue === 1) {
                        return React.createElement(ImageTagHandler_1.Image, { imageUri: uploadUri, title: "upload图片", isShowed: false });
                    }
                    else {
                        return React.createElement(ImageTagHandler_1.Image, { imageUri: uploadUri, title: "upload图片", isShowed: true });
                    }
                }
            default:
                return React.createElement("a", { href: uploadUri }, "\u70B9\u51FB\u6D4F\u89C8\u8BE5\u6587\u4EF6");
        }
    };
    return UploadTagHandler;
}(Ubb.TextTagHandler));
exports.UploadTagHandler = UploadTagHandler;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [left] 标签的处理器。
 */
var LeftTagHandler = /** @class */ (function (_super) {
    __extends(LeftTagHandler, _super);
    function LeftTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LeftTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'left'; },
        enumerable: true,
        configurable: true
    });
    ;
    LeftTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textAlign: 'left'
        };
        return React.createElement("span", { style: style },
            React.createElement("div", null, innerContent));
    };
    return LeftTagHandler;
}(Ubb.RecursiveTagHandler));
exports.LeftTagHandler = LeftTagHandler;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [center] 标签的处理器。
 */
var CenterTagHandler = /** @class */ (function (_super) {
    __extends(CenterTagHandler, _super);
    function CenterTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CenterTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'center'; },
        enumerable: true,
        configurable: true
    });
    ;
    CenterTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textAlign: 'center'
        };
        return React.createElement("span", { style: style },
            React.createElement("div", null, innerContent));
    };
    return CenterTagHandler;
}(Ubb.RecursiveTagHandler));
exports.CenterTagHandler = CenterTagHandler;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [right] 标签的处理器。
 */
var RightTagHandler = /** @class */ (function (_super) {
    __extends(RightTagHandler, _super);
    function RightTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RightTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'right'; },
        enumerable: true,
        configurable: true
    });
    ;
    RightTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textAlign: 'right'
        };
        return React.createElement("span", { style: style },
            React.createElement("div", null, innerContent));
    };
    return RightTagHandler;
}(Ubb.RecursiveTagHandler));
exports.RightTagHandler = RightTagHandler;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [table] 标签的处理器。
 */
var TableTagHandler = /** @class */ (function (_super) {
    __extends(TableTagHandler, _super);
    function TableTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TableTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'table'; },
        enumerable: true,
        configurable: true
    });
    ;
    TableTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        return React.createElement("table", { className: "UBBTableTag" }, innerContent);
    };
    return TableTagHandler;
}(Ubb.RecursiveTagHandler));
exports.TableTagHandler = TableTagHandler;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [td] 标签的处理器。
 */
var TdTagHandler = /** @class */ (function (_super) {
    __extends(TdTagHandler, _super);
    function TdTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TdTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'td'; },
        enumerable: true,
        configurable: true
    });
    ;
    TdTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var rowspanValue = 1;
        var colspanValue = 1;
        if (tagData.parameterCount === 2) {
            rowspanValue = parseInt(tagData.value(0));
            colspanValue = parseInt(tagData.value(1));
        }
        return React.createElement("td", { rowSpan: rowspanValue, colSpan: colspanValue }, innerContent);
    };
    return TdTagHandler;
}(Ubb.RecursiveTagHandler));
exports.TdTagHandler = TdTagHandler;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [th] 标签的处理器。
 */
var ThTagHandler = /** @class */ (function (_super) {
    __extends(ThTagHandler, _super);
    function ThTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ThTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'th'; },
        enumerable: true,
        configurable: true
    });
    ;
    ThTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var rowspanValue = 1;
        var colspanValue = 1;
        if (tagData.parameterCount === 2) {
            rowspanValue = parseInt(tagData.value(0));
            colspanValue = parseInt(tagData.value(1));
        }
        return React.createElement("th", { rowSpan: rowspanValue, colSpan: colspanValue }, innerContent);
    };
    return ThTagHandler;
}(Ubb.RecursiveTagHandler));
exports.ThTagHandler = ThTagHandler;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
/**
 * 处理 [tr] 标签的处理器。
 */
var TrTagHandler = /** @class */ (function (_super) {
    __extends(TrTagHandler, _super);
    function TrTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TrTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'tr'; },
        enumerable: true,
        configurable: true
    });
    ;
    TrTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        return React.createElement("tr", null, innerContent);
    };
    return TrTagHandler;
}(Ubb.RecursiveTagHandler));
exports.TrTagHandler = TrTagHandler;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
var react_router_dom_1 = __webpack_require__(3);
var TopicTagHandler = /** @class */ (function (_super) {
    __extends(TopicTagHandler, _super);
    function TopicTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TopicTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'topic'; },
        enumerable: true,
        configurable: true
    });
    ;
    TopicTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var topicTagContent = innerContent;
        var boardID = tagData.value(0); //因为现在帖子的url不需要boardid，所以这里其实是无意义的
        var topicID;
        if (tagData.parameterCount === 1)
            topicID = parseInt(tagData.value(0)); //如果只有一个参数,则认为它是topicid
        if (tagData.parameterCount === 2)
            topicID = parseInt(tagData.value(1)); //如果有2个参数,则认为第2个是topicid
        var url = "/topic/" + topicID;
        //return <a href={url}>{topicTagContent}</ a> 
        return React.createElement(react_router_dom_1.Link, { to: url }, topicTagContent);
    };
    return TopicTagHandler;
}(Ubb.RecursiveTagHandler));
exports.TopicTagHandler = TopicTagHandler;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
var MdTagHandler = /** @class */ (function (_super) {
    __extends(MdTagHandler, _super);
    function MdTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MdTagHandler.prototype, "supportedTagNames", {
        get: function () { return 'md'; },
        enumerable: true,
        configurable: true
    });
    ;
    MdTagHandler.prototype.execCore = function (content, tagData, context) {
        var mdContent = content;
        return React.createElement(MarkdownParser, { content: mdContent });
    };
    return MdTagHandler;
}(Ubb.TextTagHandler));
exports.MdTagHandler = MdTagHandler;
var MarkdownParser = /** @class */ (function (_super) {
    __extends(MarkdownParser, _super);
    function MarkdownParser(props, context) {
        var _this = _super.call(this, props, context) || this;
        var randomNum = Math.floor(Math.random() * 1000000); //生成一个0-999999的随机数
        _this.state = ({
            divid: "Markdown" + randomNum
        });
        return _this;
    }
    MarkdownParser.prototype.componentDidMount = function () {
        editormd.markdownToHTML(this.state.divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    };
    MarkdownParser.prototype.render = function () {
        return React.createElement("div", { id: this.state.divid, style: { maxWidth: "80%" } },
            React.createElement("textarea", { name: "editormd-markdown-doc", style: { display: 'none' } }, this.props.content));
    };
    return MarkdownParser;
}(React.Component));
exports.MarkdownParser = MarkdownParser;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Ubb = __webpack_require__(2);
var EmTagHandler = /** @class */ (function (_super) {
    __extends(EmTagHandler, _super);
    function EmTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EmTagHandler.prototype, "supportedTagNames", {
        get: function () { return /em\d{2}/i; } //正则表达式，意为em+两位数字,i表示区分大小写
        ,
        enumerable: true,
        configurable: true
    });
    EmTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var tagName = tagData.tagName;
        var emoticonID = tagName.match(/\d{2}/).toString();
        var emoticonNum = parseInt(emoticonID) + 1;
        var url = "http://www.cc98.org/emot/em" + emoticonNum + ".gif";
        return React.createElement("div", null,
            React.createElement("img", { src: url }),
            innerContent);
    };
    return EmTagHandler;
}(Ubb.RecursiveTagHandler));
exports.EmTagHandler = EmTagHandler;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(6);
var react_router_dom_1 = __webpack_require__(3);
var Topic_1 = __webpack_require__(16);
var Board_1 = __webpack_require__(15);
var Topic_Trace_1 = __webpack_require__(27);
var BoardList_1 = __webpack_require__(28);
var UserCenter_1 = __webpack_require__(29);
var Message_1 = __webpack_require__(31);
var Topic_New_1 = __webpack_require__(32);
var Focus_1 = __webpack_require__(33);
var Header_1 = __webpack_require__(34);
var Footer_1 = __webpack_require__(35);
var MainPage_1 = __webpack_require__(36);
var User_1 = __webpack_require__(37);
var LogOn_1 = __webpack_require__(18);
var Topic_CreateTopic_1 = __webpack_require__(38);
var Status = __webpack_require__(39);
var Search_1 = __webpack_require__(40);
var SearchBoard_1 = __webpack_require__(41);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.match = props.match;
        return _this;
    }
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var AppBeforeConnect = /** @class */ (function (_super) {
    __extends(AppBeforeConnect, _super);
    function AppBeforeConnect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBeforeConnect.prototype.render = function () {
        var errorElement;
        if (this.props.isError) {
            switch (this.props.errorMessage) {
                case 'LogOut':
                    errorElement = React.createElement(Status.LogOut, null);
                    break;
                case 'UnauthorizedBoard':
                    errorElement = React.createElement(Status.UnauthorizedBoard, null);
                    break;
                case 'UnauthorizedTopic':
                    errorElement = React.createElement(Status.UnauthorizedTopic, null);
                    break;
                case 'NotFoundTopic':
                    errorElement = React.createElement(Status.NotFoundTopic, null);
                    break;
                case 'NotFoundBoard':
                    errorElement = React.createElement(Status.NotFoundBoard, null);
                    break;
                case 'NotFoundUser':
                    errorElement = React.createElement(Status.NotFoundUser, null);
                    break;
                case 'ServerError':
                    errorElement = React.createElement(Status.ServerError, null);
                    break;
                case 'OperationForbidden':
                    errorElement = React.createElement(Status.OperationForbidden, null);
                    break;
                case 'Disconnected':
                    errorElement = React.createElement(Status.Disconnected, null);
                    break;
                case 'TopicDeleted':
                    errorElement = React.createElement(Status.TopicDeleted, null);
                    break;
            }
        }
        return React.createElement("div", { style: { width: "100%" } },
            React.createElement(react_router_dom_1.BrowserRouter, null, !this.props.isError ? (React.createElement("div", { style: { backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" } },
                React.createElement(Header_1.Header, null),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: MainPage_1.MainPage }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/:page?", component: Topic_1.Post }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/user/:userId/:page?", component: Topic_Trace_1.CurUserPost }),
                React.createElement(react_router_dom_1.Route, { path: "/list/:boardId/:type?/:page?", component: Board_1.List }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/boardlist", component: BoardList_1.BoardList }),
                React.createElement(react_router_dom_1.Route, { path: "/usercenter", component: UserCenter_1.UserCenter }),
                React.createElement(react_router_dom_1.Route, { path: "/message", component: Message_1.Message }),
                React.createElement(react_router_dom_1.Route, { path: "/focus", component: Focus_1.Focus }),
                React.createElement(react_router_dom_1.Route, { path: "/newtopics", component: Topic_New_1.AllNewTopic }),
                React.createElement(react_router_dom_1.Route, { path: "/user", component: User_1.User }),
                React.createElement(react_router_dom_1.Route, { path: "/logon", component: LogOn_1.LogOn }),
                React.createElement(react_router_dom_1.Route, { path: "/search", component: Search_1.Search }),
                React.createElement(react_router_dom_1.Route, { path: "/searchBoard", component: SearchBoard_1.SearchBoard }),
                React.createElement(react_router_dom_1.Route, { path: "/createtopic/:boardId", component: Topic_CreateTopic_1.CreateTopic }),
                React.createElement(Footer_1.Footer, null))) : React.createElement("div", { style: { backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" } },
                React.createElement(Header_1.Header, null),
                errorElement,
                React.createElement(Footer_1.Footer, null))));
    };
    return AppBeforeConnect;
}(React.Component));
function mapState(state) {
    return {
        isError: state.error.isError,
        errorMessage: state.error.errorMessage
    };
}
exports.App = react_redux_1.connect(mapState, function () { return (null); })(AppBeforeConnect);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var RouteComponent_1 = __webpack_require__(9);
var Topic_HotReplier_1 = __webpack_require__(81);
var Topic_ReplyContent_1 = __webpack_require__(17);
var HotReply = /** @class */ (function (_super) {
    __extends(HotReply, _super);
    function HotReply(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.update = _this.update.bind(_this);
        _this.state = {
            contents: [],
            masters: []
        };
        return _this;
    }
    HotReply.prototype.update = function () {
        this.setState({});
    };
    HotReply.prototype.getMasters = function (topicId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Utility.getMasters(topicId)];
            });
        });
    };
    HotReply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, realContents, masters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page || 1;
                        if (!(page == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.getHotReplyContent(newProps.match.params.topicid, this.context.router)];
                    case 1:
                        realContents = _a.sent();
                        masters = this.getMasters(newProps.match.params.topicid);
                        this.setState({ contents: realContents, masters: masters });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    HotReply.prototype.generateContents = function (item) {
        var floor = (item.floor % 10).toString();
        return React.createElement("div", { className: "reply", id: floor },
            React.createElement("div", { style: { marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin" } },
                React.createElement(Topic_HotReplier_1.HotReplier, { key: item.id, userId: item.userId, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber, privilege: item.privilege, isAnonymous: item.isAnonymous }),
                React.createElement(Topic_ReplyContent_1.ReplyContent, { key: item.content, masters: this.state.masters, userId: item.userId, content: item.content, signature: item.signature, topicid: item.topicId, postid: item.id, contentType: item.contentType })));
    };
    HotReply.prototype.render = function () {
        $(".header").scrollTop();
        return React.createElement("div", { className: "center", style: { width: "100%" } }, this.state.contents.map(this.generateContents));
    };
    return HotReply;
}(RouteComponent_1.RouteComponent));
exports.HotReply = HotReply;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState() {
    }
    return ContentState;
}());
exports.ContentState = ContentState;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var RouteComponent_1 = __webpack_require__(9);
var Topic_UserDetails_1 = __webpack_require__(20);
var HotReplier = /** @class */ (function (_super) {
    __extends(HotReplier, _super);
    function HotReplier(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {};
        return _this;
    }
    HotReplier.prototype.render = function () {
        var url = "/user/" + this.props.userId;
        var realUrl = encodeURI(url);
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId;
        var email = "/message/message?id=" + this.props.userId;
        $(document).ready(function () {
            $(".authorImg").mouseenter(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).next(".userDetails").show();
            });
            $(".mouse-userDetails").mouseleave(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).find(".userDetails").hide();
            });
        });
        var topicNumber = '帖数';
        if (!this.props.userId) {
            topicNumber = '';
        }
        var userDetails;
        if (this.props.isAnonymous != true) {
            userDetails = React.createElement(Topic_UserDetails_1.UserDetails, { userName: this.props.userName, userId: this.props.userId });
        }
        else {
            userDetails = null;
        }
        var userName;
        if (this.props.privilege === "超级版主") {
            userName = React.createElement("a", { style: { color: "pink" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege === "全站贵宾") {
            userName = React.createElement("a", { style: { color: "blue" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege === "注册用户" || this.props.privilege == "匿名" || this.props.privilege === "匿名用户") {
            userName = React.createElement("a", { style: { color: "black" }, href: url }, this.props.userName);
        }
        else if (this.props.privilege === "管理员") {
            userName = React.createElement("a", { style: { color: "red" }, href: url }, this.props.userName);
        }
        return React.createElement("div", { className: "replyRoot" },
            React.createElement("div", { className: "row", style: { width: "100%", display: "flex", marginBottom: "0.625rem" } },
                React.createElement("div", { className: "row mouse-userDetails", style: { height: "15.625rem" } },
                    React.createElement("div", { className: "authorImg" },
                        React.createElement("a", { href: realUrl },
                            React.createElement("img", { src: this.props.userImgUrl }))),
                    React.createElement("div", { className: "userDetails", style: { display: "none", position: "absolute", zindedx: "1" } }, userDetails)),
                React.createElement("div", { className: "column", id: "rpymes" },
                    React.createElement("div", { className: "row", id: "replierMes" },
                        React.createElement("div", { style: { color: "red", marginLeft: "1rem" } },
                            React.createElement("span", null, "\u6700\u70ED\u56DE\u590D"),
                            React.createElement("span", null, "(\u7B2C"),
                            React.createElement("span", null, this.props.floor),
                            React.createElement("span", null, "\u697C)")),
                        React.createElement("div", { className: "rpyClr", style: { marginLeft: "0.625rem" } }, userName),
                        React.createElement("div", { id: "topicsNumber", style: { marginLeft: "0.625rem", display: "flex", flexWrap: "nowrap", wordBreak: "keepAll", marginRight: "0.75rem" } },
                            topicNumber,
                            "\u00A0",
                            React.createElement("span", { style: { color: "red" } }, this.props.sendTopicNumber),
                            " ")),
                    React.createElement("div", { className: "row", style: { display: "flex", flexWrap: "nowrap" } },
                        React.createElement("div", { id: "clockimg", style: { marginLeft: "0.375rem" } },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "timeProp" }, moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss'))))),
                React.createElement("div", { id: "operation" },
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u5F15\u7528"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u7F16\u8F91"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: email }, "\u79C1\u4FE1"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: "" }, "\u4E3E\u62A5"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"))));
    };
    return HotReplier;
}(RouteComponent_1.RouteComponent));
exports.HotReplier = HotReplier;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var Topic_1 = __webpack_require__(16);
var UbbEditor_1 = __webpack_require__(21);
var SendTopic = /** @class */ (function (_super) {
    __extends(SendTopic, _super);
    function SendTopic(props) {
        var _this = _super.call(this, props) || this;
        _this.sendUbbTopic = _this.sendUbbTopic.bind(_this);
        _this.changeEditor = _this.changeEditor.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.state = ({ content: '', mode: 1 });
        return _this;
    }
    SendTopic.prototype.update = function (value) {
        this.setState({ content: value });
    };
    SendTopic.prototype.componentDidMount = function () {
        Topic_1.Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
        });
    };
    SendTopic.prototype.componentDidUpdate = function () {
        Topic_1.Constants.testEditor = editormd("test-editormd", {
            width: "100%",
            height: 640,
            path: "/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            imageUpload: false,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://apitest.niconi.cc/file/",
        });
    };
    SendTopic.prototype.sendUbbTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, content, contentJson, token, myHeaders, mes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://apitest.niconi.cc/post/topic/" + this.props.topicid;
                        content = {
                            content: this.state.content,
                            contentType: 0,
                            title: ""
                        };
                        contentJson = JSON.stringify(content);
                        token = Utility.getLocalStorage("accessToken");
                        myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", 'application/json');
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: myHeaders,
                                body: contentJson
                            })];
                    case 1:
                        mes = _a.sent();
                        this.props.onChange();
                        this.setState({ content: "" });
                        return [2 /*return*/];
                }
            });
        });
    };
    SendTopic.prototype.sendMdTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, c, content, contentJson, token, myHeaders, mes, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "http://apitest.niconi.cc/post/topic/" + this.props.topicid;
                        c = Topic_1.Constants.testEditor.getMarkdown();
                        content = {
                            content: c,
                            contentType: 1,
                            title: ""
                        };
                        contentJson = JSON.stringify(content);
                        token = Utility.getLocalStorage("accessToken");
                        myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        myHeaders.append("Content-Type", 'application/json');
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: myHeaders,
                                body: contentJson
                            })];
                    case 1:
                        mes = _a.sent();
                        if (mes.status === 402) {
                            alert("请输入内容");
                        }
                        Topic_1.Constants.testEditor.setMarkdown("");
                        this.props.onChange();
                        this.setState({ content: "" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("Error");
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SendTopic.prototype.changeEditor = function () {
        if (this.state.mode === 0) {
            this.setState({ mode: 1 });
        }
        else {
            this.setState({ mode: 0 });
        }
    };
    SendTopic.prototype.upload = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var files, res, url, str, str, ex, cur;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = e.target.files;
                        return [4 /*yield*/, Utility.uploadFile(files[0])];
                    case 1:
                        res = _a.sent();
                        url = res.content;
                        if (this.state.mode === 1) {
                            str = "![](http://apitest.niconi.cc" + url + ")";
                            Topic_1.Constants.testEditor.appendMarkdown(str);
                        }
                        else {
                            str = "[img]http://apitest.niconi.cc" + url + "[/img]";
                            ex = this.state.content;
                            cur = ex + str;
                            this.setState({ content: cur });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SendTopic.prototype.getInitialState = function () {
        return { value: '' };
    };
    SendTopic.prototype.handleChange = function (event) {
        this.setState({ content: event.target.value });
    };
    SendTopic.prototype.render = function () {
        var mode, editor;
        if (this.state.mode === 0) {
            mode = '使用UBB模式编辑';
            editor = React.createElement("div", null,
                React.createElement(UbbEditor_1.UbbEditor, { update: this.update }),
                React.createElement("div", { className: "row", style: { justifyContent: "center", marginBottom: "1.25rem " } },
                    React.createElement("div", { id: "post-topic-button", onClick: this.sendUbbTopic, className: "button blue", style: { marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" } }, "\u56DE\u590D"),
                    React.createElement("div", { id: "post-topic-changeMode", onClick: this.changeEditor.bind(this), className: "button blue", style: { marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" } }, "\u5207\u6362\u5230Markdown\u7F16\u8F91\u5668            "),
                    " "));
        }
        else {
            mode = '使用Markdown编辑';
            editor = React.createElement("div", { id: "sendTopic" },
                React.createElement("form", null,
                    React.createElement("div", { id: "test-editormd", className: "editormd" },
                        React.createElement("textarea", { className: "editormd-markdown-textarea", name: "test-editormd-markdown-doc", value: this.state.content }))),
                React.createElement("div", { className: "row", style: { justifyContent: "center", marginBottom: "1.25rem " } },
                    React.createElement("div", { id: "post-topic-button", onClick: this.sendMdTopic.bind(this), className: "button blue", style: { marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" } }, "\u56DE\u590D"),
                    React.createElement("div", { id: "post-topic-changeMode", onClick: this.changeEditor, className: "button blue", style: { marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" } }, "\u5207\u6362\u5230UBB\u7F16\u8F91\u5668")));
        }
        return React.createElement("div", { style: { width: "100%", display: "flex", flexDirection: "column" } },
            React.createElement("form", { method: "post", encType: "multipart/form-data" },
                React.createElement("input", { type: "file", id: "upload-files", onChange: this.upload.bind(this) })),
            editor);
    };
    return SendTopic;
}(React.Component));
exports.SendTopic = SendTopic;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ boardId: "", topicId: "", boardName: "", title: "" });
        return _this;
    }
    Category.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getCategory(this.props.topicId, this.context.router)];
                    case 1:
                        body = _a.sent();
                        this.setState({ boardId: body.boardId, topicId: body.topicId, boardName: body.boardName, title: body.title });
                        return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.render = function () {
        var listUrl = "/list/" + this.state.boardId + "/normal";
        var topicUrl = "/topic/" + this.state.topicId;
        return React.createElement("div", { style: { color: "grey", fontSize: "1rem", display: "flex" } },
            React.createElement("i", { className: "fa fa-window-maximize fa-lg" }),
            React.createElement("a", { style: { color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }, href: "/" }, "\u9996\u9875"),
            React.createElement("i", { className: "fa fa-arrow-right fa-lg" }),
            React.createElement("a", { style: { color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }, href: listUrl }, this.state.boardName),
            React.createElement("i", { className: "fa fa-arrow-right fa-lg" }),
            React.createElement("a", { style: { color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }, href: topicUrl },
                React.createElement("div", { style: { overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15rem", whiteSpace: "nowrap" } }, this.state.title)));
    };
    return Category;
}(React.Component));
exports.Category = Category;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var react_router_dom_1 = __webpack_require__(3);
var TopicPager = /** @class */ (function (_super) {
    __extends(TopicPager, _super);
    function TopicPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.render = function () {
        return React.createElement("div", { id: "pager" },
            React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this))));
    };
    return TopicPager;
}(React.Component));
exports.TopicPager = TopicPager;
var TopicPagerDown = /** @class */ (function (_super) {
    __extends(TopicPagerDown, _super);
    function TopicPagerDown(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPagerDown.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPagerDown.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPagerDown;
}(React.Component));
exports.TopicPagerDown = TopicPagerDown;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var pageUrl;
        if (this.props.pageNumber > 0) {
            pageUrl = "/topic/" + this.props.topicid + "/" + this.props.pageNumber;
            if (this.props.pageNumber != this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            pageUrl = "/topic/" + this.props.topicid + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039"));
        }
        else if (this.props.pageNumber == -2) {
            pageUrl = "/topic/" + this.props.topicid + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A"));
        }
        else if (this.props.pageNumber == -3) {
            pageUrl = "/topic/" + this.props.topicid;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039\u2039"));
        }
        else {
            pageUrl = "/topic/" + this.props.topicid + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A\u203A"));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
/**
 * 作者信息状态
 */
var AuthorMessageState = /** @class */ (function () {
    function AuthorMessageState() {
    }
    return AuthorMessageState;
}());
exports.AuthorMessageState = AuthorMessageState;
var AuthorMessage = /** @class */ (function (_super) {
    __extends(AuthorMessage, _super);
    function AuthorMessage(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.follow = _this.follow.bind(_this);
        _this.unfollow = _this.unfollow.bind(_this);
        _this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: _this.props.authorImgUrl,
            buttonInfo: '关注',
            isFollowing: false,
            buttonIsDisabled: false
        };
        return _this;
    }
    AuthorMessage.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, url, headers, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '取关中'
                        });
                        token = Utility.getLocalStorage("accessToken");
                        userId = this.props.authorId;
                        url = "http://apitest.niconi.cc/user/unfollow/" + userId;
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'DELETE',
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '重新关注',
                                isFollowing: false
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '取关失败',
                            isFollowing: true
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorMessage.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, url, headers, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '关注中'
                        });
                        token = Utility.getLocalStorage("accessToken");
                        userId = this.props.authorId;
                        url = "http://apitest.niconi.cc/user/follow/" + userId;
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '取消关注',
                                isFollowing: true
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '关注失败',
                            isFollowing: false
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorMessage.prototype.componenDidMount = function () {
        if (this.state.isFollowing === true) {
            this.setState({ buttonInfo: "取消关注", isFollowing: true });
        }
        else {
            this.setState({ buttonInfo: "关注", isFollowing: false });
        }
    };
    AuthorMessage.prototype.render = function () {
        var email = "/message/message?id=" + this.props.authorId;
        var url = "/user/" + this.props.authorId;
        var urlHtml = React.createElement("a", { href: url },
            React.createElement("img", { src: this.props.authorImgUrl }));
        var userHtml = React.createElement("div", { id: "authorName" },
            React.createElement("p", null,
                React.createElement("a", { href: url }, this.props.authorName)));
        if (this.props.isAnonymous == true) {
            urlHtml = React.createElement("img", { src: this.props.authorImgUrl });
            userHtml = React.createElement("div", { id: "authorName" },
                React.createElement("p", null, this.props.authorName));
        }
        if (this.props.isAnonymous === true) {
            $(".email").css("display", "none");
            $(".follow").css("display", "none");
            $(".authorFans").css("margin-top", "1rem");
            $("#fans").css("display", "none");
            $("#authorMes").css("width", "14rem");
        }
        return React.createElement("div", { className: "row", id: "authormes" },
            React.createElement("div", { className: "authorImg" }, urlHtml),
            React.createElement("div", { className: "column", style: { marginRight: "1rem" } },
                React.createElement("div", { className: "row authorFans", style: { justifyContent: "space-between" } },
                    userHtml,
                    React.createElement("div", { id: "fans", className: "row" },
                        React.createElement("div", { style: { marginRight: "0.1875rem" } }, "\u7C89\u4E1D"),
                        React.createElement("div", { style: { color: "#EE0000" } }, this.props.fanCount))),
                React.createElement("div", { className: "row" },
                    React.createElement("button", { className: "follow", id: this.state.isFollowing ? '' : 'follow', onClick: this.state.isFollowing ? this.unfollow : this.follow, disabled: this.state.buttonIsDisabled }, this.state.buttonInfo),
                    React.createElement("button", { className: "email" },
                        React.createElement("a", { href: email }, "\u79C1\u4FE1")))));
    };
    return AuthorMessage;
}(React.Component));
exports.AuthorMessage = AuthorMessage;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
/**
 * 题目信息状态
 */
var TopicTitleState = /** @class */ (function () {
    function TopicTitleState() {
    }
    return TopicTitleState;
}());
exports.TopicTitleState = TopicTitleState;
var TopicTitle = /** @class */ (function (_super) {
    __extends(TopicTitle, _super);
    function TopicTitle(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            isNotice: true,
            isTop: true,
            title: "这是一个长长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊的标题",
            tag: "女装/开车",
            time: "2017.8.12",
            likeNumber: 1,
            dislikeNumber: 1,
            viewTimes: 2366
        };
        return _this;
    }
    TopicTitle.prototype.returnProps = function (isTop, isNotice, title) {
        if (isTop == true && isNotice == false) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else if (isTop == false && isNotice == true) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else if (isTop == true && isNotice == true) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
    };
    TopicTitle.prototype.render = function () {
        return React.createElement("div", { id: "title" },
            React.createElement("div", { className: "column", id: "topicTitleProp" },
                React.createElement("div", { id: "essay1", className: "row" }, this.returnProps(this.state.isTop, this.state.isNotice, this.props.Title)),
                React.createElement("div", { className: "row", id: "essayProp" },
                    React.createElement("div", { id: "tags" },
                        React.createElement("div", { className: "tagProp tagSize" },
                            "\u6807\u7B7E\uFF1A ",
                            this.state.tag),
                        React.createElement("div", { className: "tagProp" })),
                    React.createElement("div", { id: "time" },
                        React.createElement("div", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        " ",
                        React.createElement("div", { className: "timeProp tagSize" }, moment(this.props.Time).format('YYYY-MM-DD HH:mm:ss'))),
                    React.createElement("div", { id: "viewtimes" },
                        React.createElement("div", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-eye fa-lg fa-fw" }),
                            "  "),
                        " ",
                        React.createElement("div", { className: "timeProp tagSize" }, this.props.HitCount)))));
    };
    return TopicTitle;
}(React.Component));
exports.TopicTitle = TopicTitle;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UbbContainer_1 = __webpack_require__(4);
var react_router_dom_1 = __webpack_require__(3);
var TopicContent = /** @class */ (function (_super) {
    __extends(TopicContent, _super);
    function TopicContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.showManageUI = _this.showManageUI.bind(_this);
        _this.showJudgeUI = _this.showJudgeUI.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
            likeState: 0
        };
        return _this;
    }
    TopicContent.prototype.update = function () {
        this.props.update();
    };
    TopicContent.prototype.componentDidUpdate = function () {
        var divid = "doc-content" + this.props.postid;
        editormd.markdownToHTML(divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    };
    TopicContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, divid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getLikeState(this.props.topicid, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data.likeState === 1) {
                            $("#commentliked").css("color", "red");
                        }
                        else if (data.likeState === 2) {
                            $("#commentdisliked").css("color", "red");
                        }
                        divid = "doc-content" + this.props.postid;
                        editormd.markdownToHTML(divid, {
                            htmlDecode: "style,script,iframe",
                            emoji: true,
                            taskList: true,
                            tex: true,
                            flowChart: true,
                            sequenceDiagram: true,
                            codeFold: true,
                        });
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    TopicContent.prototype.like = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.likeState === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 1:
                        _a.sent();
                        $("#commentliked").css("color", "black");
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.state.likeState === 2)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 4:
                        _a.sent();
                        $("#commentliked").css("color", "red");
                        $("#commentdisliked").css("color", "black");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 6:
                        _a.sent();
                        $("#commentliked").css("color", "red");
                        _a.label = 7;
                    case 7: return [4 /*yield*/, Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router)];
                    case 8:
                        data = _a.sent();
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    TopicContent.prototype.dislike = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.likeState === 2)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 1:
                        _a.sent();
                        $("#commentdisliked").css("color", "black");
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(this.state.likeState === 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Utility.like(this.props.topicid, this.props.postid, this.context.router)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 4:
                        _a.sent();
                        $("#commentliked").css("color", "black");
                        $("#commentdisliked").css("color", "red");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Utility.dislike(this.props.topicid, this.props.postid, this.context.router)];
                    case 6:
                        _a.sent();
                        $("#commentdisliked").css("color", "red");
                        _a.label = 7;
                    case 7: return [4 /*yield*/, Utility.refreshLikeState(this.props.topicid, this.props.postid, this.context.router)];
                    case 8:
                        data = _a.sent();
                        this.setState({ likeNumber: data.likeCount, dislikeNumber: data.dislikeCount, likeState: data.likeState });
                        return [2 /*return*/];
                }
            });
        });
    };
    TopicContent.prototype.showManageUI = function () {
        var UIId = "#manage" + this.props.postid;
        $(UIId).css("display", "");
    };
    TopicContent.prototype.showJudgeUI = function () {
        var UIId = "#judge" + this.props.postid;
        $(UIId).css("display", "");
    };
    TopicContent.prototype.render = function () {
        var divid = "doc-content" + this.props.postid;
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userId;
        var ubbMode = React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content });
        var mdMode = React.createElement("div", { id: divid },
            React.createElement("textarea", { name: "editormd-markdown-doc", style: { display: 'none' } }, this.props.content));
        var content = ubbMode;
        //ubb
        if (this.props.contentType === 1) {
            content = mdMode;
        }
        if (Utility.getLocalStorage("userInfo")) {
            var privilege = Utility.getLocalStorage("userInfo").privilege;
            var myName = Utility.getLocalStorage("userInfo").name;
            var myId = Utility.getLocalStorage("userInfo").id;
            if (privilege === '管理员' || privilege === '超级版主' || (privilege === '全站贵宾' && myId === this.props.userId)) {
                $("#postTopicManage").css("display", "");
            }
            if (this.props.masters) {
                for (var i = 0; i < this.props.masters.length; i++) {
                    if (myName === this.props.masters[i]) {
                        $("#postTopicManage").css("display", "");
                    }
                }
            }
        }
        if (this.props.signature == "") {
            return React.createElement("div", { className: "content" },
                React.createElement("div", { className: "substance replySubstance" }, content),
                React.createElement("div", { className: "comment1" },
                    React.createElement("div", { id: "commentlike", className: "buttonFont" },
                        React.createElement("button", { className: "commentbutton" },
                            React.createElement("i", { className: "fa fa-star-o fa-lg" })),
                        "   \u6536\u85CF\u6587\u7AE0 "),
                    React.createElement("div", { id: "commentliked", className: "upup", style: { marginRight: "0.7rem" } },
                        React.createElement("i", { title: "赞", onClick: this.like.bind(this), className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: "commentdisliked", className: "downdown" },
                        React.createElement("i", { title: "踩", onClick: this.dislike.bind(this), className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike", className: "buttonFont row" },
                        " ",
                        React.createElement("div", { className: "commentbutton", style: { cursor: "pointer" }, onClick: this.showJudgeUI }, "   \u8BC4\u5206"),
                        React.createElement("div", { className: "commentbutton" }, "   \u7F16\u8F91")),
                    React.createElement("div", { className: "operation1" }, "\u5F15\u7528"),
                    React.createElement(react_router_dom_1.Link, { className: "operation1", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"),
                    React.createElement("div", { className: "operation1", id: "postTopicManage", onClick: this.showManageUI, style: { display: "none", cursor: "pointer" } }, "\u7BA1\u7406")));
        }
        else {
            return React.createElement("div", { className: "content" },
                React.createElement("div", { className: "substance" },
                    content,
                    " "),
                React.createElement("div", { className: "signature", style: { borderTop: "#eaeaea solid thin", paddingTop: "1rem" } },
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.signature })),
                React.createElement("div", { className: "comment" },
                    React.createElement("div", { id: "commentlike", style: { marginRight: "0.7rem" }, className: "buttonFont" },
                        React.createElement("button", { className: "commentbutton" },
                            React.createElement("i", { className: "fa fa-star-o fa-lg" })),
                        "   \u6536\u85CF\u6587\u7AE0 "),
                    React.createElement("div", { id: "commentliked", className: "upup", style: { marginRight: "0.7rem" } },
                        React.createElement("i", { title: "赞", onClick: this.like.bind(this), className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: "commentdisliked", className: "downdown" },
                        React.createElement("i", { title: "踩", onClick: this.dislike.bind(this), className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike", className: "buttonFont row" },
                        " ",
                        React.createElement("div", { className: "commentbutton", style: { cursor: "pointer" }, onClick: this.showJudgeUI }, "   \u8BC4\u5206"),
                        React.createElement("div", { className: "commentbutton" }, "   \u7F16\u8F91")),
                    React.createElement("div", { className: "operation1" }, "\u5F15\u7528"),
                    React.createElement(react_router_dom_1.Link, { className: "operation1", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"),
                    React.createElement("div", { className: "operation1", id: "postTopicManage", onClick: this.showManageUI, style: { display: "none", cursor: "pointer" } }, "\u7BA1\u7406")));
        }
    };
    return TopicContent;
}(React.Component));
exports.TopicContent = TopicContent;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var AwardInfo = /** @class */ (function (_super) {
    __extends(AwardInfo, _super);
    function AwardInfo(props, content) {
        return _super.call(this, props, content) || this;
    }
    AwardInfo.prototype.render = function () {
        return React.createElement("div", { className: "good tagSize" },
            React.createElement("div", { className: "userImage" },
                React.createElement("img", { src: this.props.userImgUrl }),
                " "),
            React.createElement("div", { className: "userName" }, this.props.userName),
            React.createElement("div", { className: "grades" }, this.props.content),
            React.createElement("div", { className: "credit" },
                React.createElement("span", null, this.props.reason)));
    };
    return AwardInfo;
}(React.Component));
exports.AwardInfo = AwardInfo;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var RouteComponent_1 = __webpack_require__(9);
var Topic_Replier_1 = __webpack_require__(26);
var Topic_ReplyContent_1 = __webpack_require__(17);
var Topic_Award_1 = __webpack_require__(23);
var Post_Management_1 = __webpack_require__(24);
var Topic_Judge_1 = __webpack_require__(25);
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.update = _this.update.bind(_this);
        _this.state = {
            contents: [],
            masters: [],
        };
        return _this;
    }
    Reply.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, storageId, realContents, masters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("reply update");
                        page = this.match.params.page || 1;
                        storageId = "TopicContent_" + this.match.params.topicid + "_" + page;
                        return [4 /*yield*/, Utility.getTopicContent(this.match.params.topicid, page, this.context.router)];
                    case 1:
                        realContents = _a.sent();
                        return [4 /*yield*/, this.getMasters(this.match.params.topicid)];
                    case 2:
                        masters = _a.sent();
                        console.log("reply setstate");
                        this.setState({ contents: realContents, masters: masters });
                        console.log("reply setstate finished");
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.getMasters = function (topicId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Utility.getMasters(topicId)];
            });
        });
    };
    Reply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, storageId, realContents, masters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page || 1;
                        storageId = "TopicContent_" + newProps.match.params.topicid + "_" + page;
                        return [4 /*yield*/, Utility.getTopicContent(newProps.match.params.topicid, page, this.context.router)];
                    case 1:
                        /* if (!Utility.getStorage(storageId)) {
                             realContents = await Utility.getTopicContent(newProps.match.params.topicid, page);
                             Utility.setStorage(storageId, realContents);
                         }
                         else {
                             realContents = Utility.getStorage(storageId);
                         }*/
                        realContents = _a.sent();
                        return [4 /*yield*/, this.getMasters(newProps.match.params.topicid)];
                    case 2:
                        masters = _a.sent();
                        this.setState({ contents: realContents, masters: masters });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.generateContents = function (item) {
        if (item.isDeleted) {
            return React.createElement("div", { className: "reply" },
                React.createElement("div", { style: { marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin", backgroundColor: "#fff" } },
                    React.createElement(Topic_Replier_1.Replier, { key: item.postId, isAnonymous: item.isAnonymous, userId: null, topicid: item.topicId, userName: '98Deleter', replyTime: item.time, floor: item.floor, userImgUrl: 'http://www.cc98.org/images/policeM.png', sendTopicNumber: 9898, privilege: 9898 }),
                    React.createElement(Topic_ReplyContent_1.ReplyContent, { key: item.content, masters: this.state.masters, userId: item.userId, content: '该回复已被my cc98, my home', signature: null, topicid: item.topicId, postid: item.postId, contentType: item.contentType })));
        }
        return React.createElement("div", { className: "reply" },
            React.createElement("div", { style: { marginTop: "1rem", marginBotton: "0.3125rem", border: "#EAEAEA solid thin", backgroundColor: "#fff" } },
                React.createElement(Topic_Replier_1.Replier, { key: item.postId, isAnonymous: item.isAnonymous, userId: item.userId, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber, privilege: item.privilege }),
                React.createElement(Topic_Judge_1.Judge, { userId: item.userId, postId: item.postId, update: this.update, topicId: item.topicId }),
                React.createElement(Post_Management_1.PostManagement, { topicId: item.topicId, postId: item.postId, userId: item.userId, update: this.update }),
                React.createElement(Topic_ReplyContent_1.ReplyContent, { key: item.content, masters: this.state.masters, userId: item.userId, content: item.content, signature: item.signature, topicid: item.topicId, postid: item.postId, contentType: item.contentType }),
                React.createElement(Topic_Award_1.Award, { postId: item.postId, updateTime: Date.now() })));
    };
    Reply.prototype.render = function () {
        return React.createElement("div", { className: "center", style: { width: "100%" } }, this.state.contents.map(this.generateContents.bind(this)));
    };
    return Reply;
}(RouteComponent_1.RouteComponent));
exports.Reply = Reply;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState() {
    }
    return ContentState;
}());
exports.ContentState = ContentState;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var $ = __webpack_require__(7);
/**
 * 用户中心侧边栏导航组件
 */
var UserCenterNavigation = /** @class */ (function (_super) {
    __extends(UserCenterNavigation, _super);
    function UserCenterNavigation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isScroll: false,
            buttonClassName: '',
            navigationClassName: 'user-center-navigation'
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    UserCenterNavigation.prototype.handleScroll = function (e) {
        if (window.pageYOffset > 234 && !this.state.isScroll) {
            this.setState({
                isScroll: true,
                buttonClassName: 'btn-show',
                navigationClassName: 'user-center-navigation'
            });
        }
        if (window.pageYOffset < 234 && this.state.isScroll) {
            this.setState(function (prevState) {
                if (prevState.buttonClassName === '') {
                    return {
                        isScroll: false
                    };
                }
                else {
                    return {
                        isScroll: false,
                        buttonClassName: 'btn-disappare',
                        navigationClassName: 'user-center-navigation'
                    };
                }
            });
        }
    };
    UserCenterNavigation.prototype.componentDidMount = function () {
        document.addEventListener('scroll', this.handleScroll);
    };
    UserCenterNavigation.prototype.componentWillUnmount = function () {
        document.removeEventListener('scroll', this.handleScroll);
    };
    UserCenterNavigation.prototype.scrollToTop = function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
    };
    UserCenterNavigation.prototype.render = function () {
        return (React.createElement("div", { className: this.state.navigationClassName, id: "userCenterNavigation" },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: "/usercenter", label: "主页", activeOnlyWhenExact: true, myClassName: "fa-home" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/config", label: "修改个人资料", myClassName: "fa-cog" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myposts", label: "我的主题", myClassName: "fa-pencil-square-o" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfavorites", label: "我的收藏", myClassName: "fa-star" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfollowings", label: "我的关注", myClassName: "fa-heart" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfans", label: "我的粉丝", myClassName: "fa-users" })),
            React.createElement("button", { type: "button", id: "scrollToTop", className: this.state.buttonClassName, onClick: this.scrollToTop }, "\u56DE\u5230\u9876\u90E8")));
    };
    return UserCenterNavigation;
}(React.Component));
exports.UserCenterNavigation = UserCenterNavigation;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, _b = _a.activeOnlyWhenExact, activeOnlyWhenExact = _b === void 0 ? false : _b, myClassName = _a.myClassName;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement("li", { className: match ? "user-center-navigation-active" : "" },
                React.createElement(react_router_dom_1.Link, { className: "" + myClassName, to: to },
                    React.createElement("p", null, label))));
        } }));
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var UserCenterExact_1 = __webpack_require__(92);
var UserCenterMyFollowings_1 = __webpack_require__(96);
var UserCenterMyFans_1 = __webpack_require__(117);
var UserCenterMyPostsExact_1 = __webpack_require__(118);
var UserCenterMyFavorites_1 = __webpack_require__(119);
var UserCenterConfig_1 = __webpack_require__(123);
/**
 * 用户中心主体
 */
var UserCenterRouter = /** @class */ (function (_super) {
    __extends(UserCenterRouter, _super);
    function UserCenterRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterRouter.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-router" },
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/usercenter/", component: UserCenterExact_1.default }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfollowings/:page?", component: UserCenterMyFollowings_1.UserCenterMyFollowings }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfans/:page?", component: UserCenterMyFans_1.UserCenterMyFans }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myposts/:page?", component: UserCenterMyPostsExact_1.UserCenterMyPostsExact }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfavorites", component: UserCenterMyFavorites_1.UserCenterMyFavorites }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/config", component: UserCenterConfig_1.UserCenterConfig })));
    };
    return UserCenterRouter;
}(React.Component));
exports.UserCenterRouter = UserCenterRouter;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UserCenterExactProfile_1 = __webpack_require__(93);
var UserCenterExactActivities_1 = __webpack_require__(94);
var UserCenterExactAvatar_1 = __webpack_require__(30);
var Utility = __webpack_require__(1);
var Actions_1 = __webpack_require__(8);
var react_redux_1 = __webpack_require__(6);
/**
 * 用户中心主页
 */
var UserCenterExact = /** @class */ (function (_super) {
    __extends(UserCenterExact, _super);
    function UserCenterExact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, headers1, response1, userInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = Utility.getLocalStorage('accessToken');
                        headers1 = new Headers();
                        headers1.append("Authorization", token);
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/" + this.props.userInfo.id, {
                                headers: headers1
                            })];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        userInfo = _a.sent();
                        Utility.setLocalStorage("userInfo", userInfo);
                        this.props.changeUserInfo(userInfo);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('用户中心错误');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterExact.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-exact" },
            React.createElement(UserCenterExactAvatar_1.UserCenterExactAvatar, { userAvatarImgURL: this.props.userInfo.portraitUrl }),
            React.createElement(UserCenterExactProfile_1.UserCenterExactProfile, { userInfo: this.props.userInfo }),
            React.createElement(UserCenterExactActivities_1.UserCenterExactActivities, null)));
    };
    return UserCenterExact;
}(React.Component));
function mapState(state) {
    return {
        userInfo: state.userinfo.currentUserInfo
    };
}
function mapDispatch(dispatch) {
    return {
        changeUserInfo: function (newInfo) {
            dispatch(Actions_1.changeUserInfo(newInfo));
        }
    };
}
exports.default = react_redux_1.connect(mapState, mapDispatch)(UserCenterExact);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
/**
 * 用户中心主页个人资料组件
 */
var UserCenterExactProfile = /** @class */ (function (_super) {
    __extends(UserCenterExactProfile, _super);
    function UserCenterExactProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactProfile.prototype.getPrivilegeColor = function () {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    };
    UserCenterExactProfile.prototype.render = function () {
        return (React.createElement("div", { className: "user-profile" },
            React.createElement("div", { id: "userId" },
                React.createElement("p", null,
                    this.props.userInfo.name,
                    "      ",
                    React.createElement("span", { style: { fontSize: '12px', color: this.getPrivilegeColor() } }, this.props.userInfo.privilege)),
                React.createElement("button", { type: "button", onClick: function () { location.pathname = '/message/message'; } }, "\u79C1\u4FE1")),
            React.createElement("div", { id: "userIntroducion" }, this.props.userInfo.introduction),
            React.createElement("div", { id: "userGenderAndBirthday" },
                React.createElement("p", null,
                    "\u6027\u522B\uFF1A  ",
                    (this.props.userInfo.gender === 1) ? '男' : '女',
                    " "),
                this.props.userInfo.birthday === null ? null : React.createElement("p", null,
                    "\u751F\u65E5\uFF1A  ",
                    this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T')).replace('9999-', '')),
                this.props.userInfo.emailAddress ? React.createElement("p", null,
                    "\u90AE\u7BB1\uFF1A  ",
                    this.props.userInfo.emailAddress) : null,
                this.props.userInfo.qq ? React.createElement("p", null,
                    "QQ\uFF1A  ",
                    this.props.userInfo.qq) : null,
                React.createElement("p", null,
                    "\u53D1\u5E16\u6570\uFF1A  ",
                    this.props.userInfo.postCount),
                this.props.userInfo.displayTitle ? React.createElement("p", null,
                    "\u7528\u6237\u7EC4\uFF1A  ",
                    this.props.userInfo.displayTitle) : null,
                React.createElement("p", null,
                    "\u5A01\u671B\uFF1A  ",
                    this.props.userInfo.prestige),
                React.createElement("div", null,
                    this.props.userInfo.registerTime ? React.createElement("p", null,
                        "\u6CE8\u518C\u65F6\u95F4\uFF1A  ",
                        this.props.userInfo.registerTime.replace('T', ' ')) : null,
                    this.props.userInfo.lastLogOnTime ? React.createElement("p", null,
                        "\u6700\u540E\u767B\u5F55\uFF1A  ",
                        this.props.userInfo.lastLogOnTime.replace('T', ' ')) : null)),
            this.props.userInfo.signatureCode ?
                React.createElement("div", { className: "user-description" },
                    React.createElement("p", null, "\u4E2A\u6027\u7B7E\u540D"),
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.userInfo.signatureCode })) : null));
    };
    return UserCenterExactProfile;
}(React.Component));
exports.UserCenterExactProfile = UserCenterExactProfile;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UserCenterExactActivitiesPosts_1 = __webpack_require__(95);
/**
 * 用户中心主页近期动态组件
 */
var UserCenterExactActivities = /** @class */ (function (_super) {
    __extends(UserCenterExactActivities, _super);
    function UserCenterExactActivities() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivities.prototype.render = function () {
        return (React.createElement("div", { className: "user-activities" },
            React.createElement("p", null, "\u8FD1\u671F\u52A8\u6001"),
            React.createElement(UserCenterExactActivitiesPosts_1.UserCenterExactActivitiesPosts, null)));
    };
    return UserCenterExactActivities;
}(React.Component));
exports.UserCenterExactActivities = UserCenterExactActivities;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(11);
var AppState_1 = __webpack_require__(5);
var Utility = __webpack_require__(1);
//用户中心主页帖子动态组件
var UserCenterExactActivitiesPosts = /** @class */ (function (_super) {
    __extends(UserCenterExactActivitiesPosts, _super);
    function UserCenterExactActivitiesPosts(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = {
            userRecentPosts: [],
            isLoading: false
        };
        _this.scrollHandler = _this.scrollHandler.bind(_this);
        return _this;
    }
    UserCenterExactActivitiesPosts.prototype.scrollHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var pageYLeft, url, token, headers, res, data, posts, i, post, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageYLeft = document.body.scrollHeight - window.pageYOffset;
                        if (!(pageYLeft < 1500 && this.state.isLoading === false)) return [3 /*break*/, 10];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        this.setState({ isLoading: true });
                        url = "http://apitest.niconi.cc/me/recenttopics?from=" + this.state.userRecentPosts.length + "&size=10";
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 2:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 7];
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (data.length < 10) {
                            window.removeEventListener('scroll', this.scrollHandler);
                        }
                        posts = this.state.userRecentPosts;
                        i = data.length;
                        _a.label = 4;
                    case 4:
                        if (!i--) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.item2post(data[i])];
                    case 5:
                        post = _a.sent();
                        posts.push(post);
                        return [3 /*break*/, 4];
                    case 6:
                        this.setState({
                            userRecentPosts: posts,
                            isLoading: false
                        });
                        return [3 /*break*/, 8];
                    case 7: throw {};
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        this.setState({
                            isLoading: false
                        });
                        console.log('用户中心滚动加载失败');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterExactActivitiesPosts.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, token, headers, res, data, posts, i, post, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        url = "http://apitest.niconi.cc/me/recenttopics?from=0&size=10";
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 6];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        posts = [], i = data.length;
                        _a.label = 3;
                    case 3:
                        if (!i--) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.item2post(data[i])];
                    case 4:
                        post = _a.sent();
                        posts.unshift(post);
                        return [3 /*break*/, 3];
                    case 5:
                        this.setState({
                            userRecentPosts: posts
                        });
                        if (data.length === 10) {
                            window.addEventListener('scroll', this.scrollHandler);
                        }
                        return [3 /*break*/, 7];
                    case 6: throw {};
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        console.log('用户中心帖子加载失败');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterExactActivitiesPosts.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.scrollHandler);
    };
    UserCenterExactActivitiesPosts.prototype.item2post = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var userRecentPost, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRecentPost = new AppState_1.UserRecentPost();
                        userRecentPost.approval = item.likeCount;
                        _a = userRecentPost;
                        return [4 /*yield*/, Utility.getBoardName(item.boardId, this.context.router)];
                    case 1:
                        _a.board = _b.sent();
                        userRecentPost.date = item.time.replace('T', ' ').slice(0, 19);
                        userRecentPost.disapproval = item.dislikeCount;
                        userRecentPost.content = item.title;
                        userRecentPost.id = item.id;
                        userRecentPost.boardId = item.boardId;
                        userRecentPost.name = item.userName;
                        userRecentPost.isAnonymous = item.isAnonymous;
                        return [2 /*return*/, userRecentPost];
                }
            });
        });
    };
    UserCenterExactActivitiesPosts.prototype.render = function () {
        //console.log(this.state.userRecentPosts);
        if (this.state.userRecentPosts.length === 0) {
            var style = {
                marginLeft: '2rem'
            };
            return (React.createElement("div", { className: "user-posts", style: style }, "\u6CA1\u6709\u4E3B\u9898"));
        }
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterExactActivitiesPosts;
}(React.Component));
exports.UserCenterExactActivitiesPosts = UserCenterExactActivitiesPosts;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(5);
var app_1 = __webpack_require__(12);
var UserCenterMyFollowingsUser_1 = __webpack_require__(42);
var UserCenterPageCount_1 = __webpack_require__(14);
var Utility = __webpack_require__(1);
//用户中心我的关注组件
var UserCenterMyFollowings = /** @class */ (function (_super) {
    __extends(UserCenterMyFollowings, _super);
    function UserCenterMyFollowings(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            userFollowings: [],
            totalPage: 2,
            info: '加载中'
        };
        return _this;
    }
    UserCenterMyFollowings.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, page, url, headers, res, data, fans, i, data2, userid_1, userFanInfo, userid, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        token = Utility.getLocalStorage("accessToken");
                        page = this.match.params.page || 1;
                        url = "http://apitest.niconi.cc/user/follow/follower?from=" + (page - 1) * 10 + "&size=10";
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        //没有关注
                        if (!data || !data.length) {
                            this.setState({
                                info: '没有关注'
                            });
                            return [2 /*return*/, false];
                        }
                        fans = [];
                        i = data.length, data2 = void 0;
                        _a.label = 3;
                    case 3:
                        if (!i--) return [3 /*break*/, 6];
                        userid_1 = data[i];
                        userFanInfo = new AppState_1.UserFanInfo();
                        url = "http://apitest.niconi.cc/user/" + userid_1;
                        return [4 /*yield*/, fetch(url)];
                    case 4:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 5:
                        data2 = _a.sent();
                        userFanInfo.name = data2.name;
                        userFanInfo.avatarImgURL = data2.portraitUrl;
                        userFanInfo.posts = data2.postCount;
                        userFanInfo.id = userid_1;
                        userFanInfo.fans = data2.fanCount;
                        fans.push(userFanInfo);
                        return [3 /*break*/, 3];
                    case 6:
                        userid = Utility.getLocalStorage('userInfo').id;
                        url = "http://apitest.niconi.cc/user/follow/followcount?userid=" + userid;
                        return [4 /*yield*/, fetch(url)];
                    case 7:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 8:
                        data2 = _a.sent();
                        this.setState({
                            userFollowings: fans,
                            totalPage: data2 % 10 === 0 ? data2 / 10 : Math.floor((data2 / 10)) + 1
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        console.log('我的关注加载失败');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFollowings.prototype.render = function () {
        if (this.state.userFollowings.length === 0) {
            return (React.createElement("div", { className: "user-center-myfollowings" }, this.state.info));
        }
        //state转换为JSX
        var userFollowings = this.state.userFollowings.map(function (item) { return (React.createElement(UserCenterMyFollowingsUser_1.UserCenterMyFollowingsUser, { userFanInfo: item })); });
        //添加分隔线
        for (var i = 1; i < userFollowings.length; i += 2) {
            userFollowings.splice(i, 0, React.createElement("hr", null));
        }
        var page = this.match.params.page || 1;
        return (React.createElement("div", { className: "user-center-myfollowings" },
            React.createElement("div", { className: "user-center-myfollowings-exact" }, userFollowings),
            React.createElement(UserCenterPageCount_1.UserCenterPageCount, { currentPage: page, totalPage: this.state.totalPage, href: "/usercenter/myfollowings/" })));
    };
    return UserCenterMyFollowings;
}(app_1.RouteComponent));
exports.UserCenterMyFollowings = UserCenterMyFollowings;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MessagePerson_1 = __webpack_require__(98);
var MessageWindow_1 = __webpack_require__(99);
var Utility = __webpack_require__(1);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MessageMessage = /** @class */ (function (_super) {
    __extends(MessageMessage, _super);
    function MessageMessage(props) {
        var _this = _super.call(this, props) || this;
        //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
        _this.coverMessagePerson = function (item) {
            var changeChatName = function () {
                _this.setState({ chatObj: item });
                //给选中的聊天对象添加选中效果
                $('.message-message-pList > div').removeClass('message-message-pFocus');
                $("#" + item.name).addClass('message-message-pFocus');
            };
            return React.createElement("div", { onClick: changeChatName, id: "" + item.name },
                React.createElement(MessagePerson_1.MessagePerson, { data: item }));
        };
        _this.state = {
            data: null,
            chatObj: null
        };
        //如果没有设置默认的state，render第一次渲染的时候state为空，MessageWindow组件会报错
        _this.getMoreContact = _this.getMoreContact.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    MessageMessage.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, myInfo, recentContact, chatObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = Utility.getLocalStorage("accessToken");
                        console.log("\u8FDB\u5165\u6D88\u606F\u5F00\u59CB\u65F6\u7684token");
                        myInfo = Utility.getLocalStorage("userInfo");
                        recentContact = Utility.getStorage("recentContact");
                        if (!!recentContact) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.getRecentContact(0, 7, this.context.router)];
                    case 1:
                        recentContact = _a.sent();
                        Utility.setStorage("recentContact", recentContact);
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Utility.sortContactList(recentContact, this.context.router)];
                    case 3:
                        //对联系人列表重新排序，看是否有从其他页面发起的聊天
                        recentContact = _a.sent();
                        console.log("走远第一步");
                        console.log(recentContact);
                        if (recentContact) {
                            //默认第一个人为聊天对象
                            this.setState({ data: recentContact, chatObj: recentContact[0] });
                        }
                        chatObj = this.state.chatObj;
                        $("#" + chatObj.name).addClass('message-message-pFocus');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    *点击获取更多联系人
    */
    MessageMessage.prototype.getMoreContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentContact, newContact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!($('#moreDone').css('display') == 'none')) return [3 /*break*/, 2];
                        $('#moreImg').removeClass('displaynone');
                        $('#moreDot').addClass('displaynone');
                        $('#moreShow').addClass('displaynone');
                        recentContact = Utility.getStorage("recentContact");
                        return [4 /*yield*/, Utility.getRecentContact(recentContact.length, 7, this.context.router)];
                    case 1:
                        newContact = _a.sent();
                        recentContact = recentContact.concat(newContact);
                        this.setState({ data: recentContact });
                        Utility.setStorage("recentContact", recentContact);
                        if (newContact.length < 7) {
                            $('#moreImg').addClass('displaynone');
                            $('#moreDone').removeClass('displaynone');
                        }
                        else {
                            $('#moreImg').addClass('displaynone');
                            $('#moreDot').removeClass('displaynone');
                            $('#moreShow').removeClass('displaynone');
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //传递到MessageWindow里的方法，在MessageWindow里控制MessageMessage刷新界面
    MessageMessage.prototype.onChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentContact;
            return __generator(this, function (_a) {
                recentContact = Utility.getStorage("recentContact");
                this.setState({ data: recentContact, chatObj: recentContact[0] });
                //选中第一个联系人
                $('.message-message-pList > div').removeClass('message-message-pFocus');
                $("#" + this.state.chatObj.name).addClass('message-message-pFocus');
                return [2 /*return*/];
            });
        });
    };
    MessageMessage.prototype.render = function () {
        //给我的私信添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#message').addClass('message-nav-focus');
        //先看state里有没有数组，防止报错
        var data = this.state.data;
        var chatObj = this.state.chatObj;
        if (!chatObj) {
            chatObj = {
                id: 9898,
                name: '系统',
                portraitUrl: 'http://file.cc98.org/uploadfile/2017/11/24/024368341.gif',
                message: [{
                        id: 9898,
                        senderId: 9898,
                        receiverId: 9898,
                        content: "",
                        isRead: true,
                        time: new Date(),
                        showTime: true
                    }],
                lastContent: ''
            };
        }
        if (!data) {
            data = [chatObj];
        }
        console.log("正式开始数据填充的时候");
        console.log(data);
        console.log(chatObj);
        //创建联系人列表和聊天窗口
        return (React.createElement("div", { className: "message-message" },
            React.createElement("div", { className: "message-message-people" },
                React.createElement("div", { className: "message-message-pTitle" }, "\u8FD1\u671F\u79C1\u4FE1"),
                React.createElement("div", { className: "message-message-pList" },
                    data.map(this.coverMessagePerson),
                    React.createElement("div", { className: "message-message-plMore", onClick: this.getMoreContact },
                        React.createElement("img", { id: "moreImg", src: "http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif", className: "displaynone" }),
                        React.createElement("div", { id: "moreDot" }, "..."),
                        React.createElement("div", { id: "moreShow" }, "\u663E\u793A\u66F4\u591A\u5C0F\u4F19\u4F34~"),
                        React.createElement("div", { id: "moreDone", className: "displaynone" }, "\u5C0F\u4F19\u4F34\u4EEC\u90FD\u51FA\u6765\u4E86~")))),
            React.createElement(MessageWindow_1.MessageWindow, { data: chatObj, onChange: this.onChange })));
    };
    return MessageMessage;
}(React.Component));
exports.MessageMessage = MessageMessage;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessagePerson = /** @class */ (function (_super) {
    __extends(MessagePerson, _super);
    function MessagePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessagePerson.prototype.render = function () {
        var data = this.props.data;
        if (!data.lastContent) {
            data.lastContent = '';
        }
        return (React.createElement("div", { className: "message-message-person" },
            React.createElement("img", { className: "message-message-pPortraitUrl", src: data.portraitUrl }),
            React.createElement("div", { className: "message-message-pInfo" },
                React.createElement("div", { className: "message-message-pName" }, data.name),
                React.createElement("div", { className: "message-message-pMessage" },
                    React.createElement(UbbContainer_1.UbbContainer, { code: data.lastContent })))));
    };
    return MessagePerson;
}(React.Component));
exports.MessagePerson = MessagePerson;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MessageSender_1 = __webpack_require__(100);
var MessageReceiver_1 = __webpack_require__(101);
var Utility = __webpack_require__(1);
var MessageWindow = /** @class */ (function (_super) {
    __extends(MessageWindow, _super);
    function MessageWindow(props) {
        var _this = _super.call(this, props) || this;
        /**
        *单条私信的的样式
        */
        _this.coverMessageProps = function (item) {
            var userInfo = Utility.getLocalStorage("userInfo");
            var data = _this.props.data;
            if (item.receiverId == userInfo.id) {
                //如果我是接收者调用这个样式，处于左边
                return React.createElement(MessageReceiver_1.MessageReceiver, { id: item.id, senderName: data.name, receiverName: userInfo.name, senderPortraitUrl: data.portraitUrl, receiverPortraitUrl: userInfo.portraitUrl, content: item.content, isRead: item.isRead, time: item.time, showTime: item.showTime });
            }
            else if (item.senderId == userInfo.id) {
                //如果我是发送者调用这个样式，处于右边
                return React.createElement(MessageSender_1.MessageSender, { id: item.id, senderName: userInfo.name, receiverName: data.name, senderPortraitUrl: userInfo.portraitUrl, receiverPortraitUrl: data.portraitUrl, content: item.content, isRead: item.isRead, time: item.time, showTime: item.showTime });
            }
        };
        /*
        *举报按钮
        */
        _this.report = function () {
            alert('举报他人恶意私信请到【论坛事务】按照格式发帖投诉，记得截图保留证据，管理员会及时进行处理！感谢您对CC98的支持！');
        };
        _this.state = { data: [] };
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.getNewMessage = _this.getNewMessage.bind(_this);
        _this.postMessage = _this.postMessage.bind(_this);
        return _this;
    }
    MessageWindow.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getData(this.props);
                return [2 /*return*/];
            });
        });
    };
    MessageWindow.prototype.getData = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var data, oldData, i, recentContact, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getRecentMessage(props.data.id, 0, 10, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data && data.length > 0) {
                            oldData = props.data.message;
                            if (oldData && oldData.length > 0) {
                                for (i in data) {
                                    if (data[i].id == oldData[0].id) {
                                        data = data.slice(0, i).concat(oldData);
                                        data = Utility.sortRecentMessage(data);
                                        break;
                                    }
                                }
                            }
                            recentContact = Utility.getStorage("recentContact");
                            if (recentContact) {
                                for (i in recentContact) {
                                    if (recentContact[i].id == props.data.id) {
                                        recentContact[i].message = data;
                                        break;
                                    }
                                }
                                Utility.setStorage("recentContact", recentContact);
                            }
                            this.setState({ data: data });
                        }
                        document.getElementById('messageContent').addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 父控件props刷新后调用这个展现新的联系人的私信内容
     * @param nextProps
     */
    MessageWindow.prototype.componentWillReceiveProps = function (nextProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //把聊天窗口滚动栏拉到最底部
                document.getElementById("quickToTheBottom").scrollIntoView();
                this.getData(nextProps);
                return [2 /*return*/];
            });
        });
    };
    /*
    *处理聊天窗口滚动栏的函数，滚到顶部继续加载私信内容
    */
    MessageWindow.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scrollTop, oldData, newData, data, recentContact, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scrollTop = $('#messageContent')[0].scrollTop;
                        if (!(scrollTop == 0)) return [3 /*break*/, 2];
                        console.log("到顶啦");
                        $('#wcLoadingImg').removeClass("displaynone");
                        oldData = this.state.data;
                        return [4 /*yield*/, Utility.getRecentMessage(this.props.data.id, oldData.length, 10, this.context.router)];
                    case 1:
                        newData = _a.sent();
                        //跟之前的拼接一下
                        if (newData && newData.length > 0) {
                            data = oldData.concat(newData);
                            data = Utility.sortRecentMessage(data);
                            this.setState({ data: data });
                            recentContact = Utility.getStorage("recentContact");
                            if (recentContact) {
                                for (i in recentContact) {
                                    if (recentContact[i].id == this.props.data.id) {
                                        recentContact[i].message = data;
                                        break;
                                    }
                                }
                                Utility.setStorage("recentContact", recentContact);
                            }
                        }
                        else {
                            $('#wcLoadingImg').addClass("displaynone");
                            $('#wcLoadingText').removeClass("displaynone");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
    *点击发送私信后，获取私信内容并刷新聊天界面
    */
    MessageWindow.prototype.getNewMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, oldData, recentContact, i, j, chatMan, indexData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //把聊天窗口滚动栏拉到最底部
                        document.getElementById("quickToTheBottom").scrollIntoView();
                        return [4 /*yield*/, Utility.getRecentMessage(this.props.data.id, 0, 10, this.context.router)];
                    case 1:
                        data = _a.sent();
                        oldData = [];
                        recentContact = Utility.getStorage("recentContact");
                        if (recentContact) {
                            for (i = 0; i < recentContact.length; i++) {
                                if (recentContact[i].id == this.props.data.id) {
                                    oldData = recentContact[i].message;
                                    //新旧私信信息拼接一下
                                    if (oldData != []) {
                                        for (j = 0; j < data.length; j++) {
                                            if (data[j].id == oldData[0].id) {
                                                data = data.slice(0, j).concat(oldData);
                                                data = Utility.sortRecentMessage(data);
                                                break;
                                            }
                                        }
                                    }
                                    //更新与该聊天对象的message
                                    recentContact[i].message = data;
                                    break;
                                }
                            }
                            //联系对象不在联系人列表里，说明是从别的页面发起的私信聊天，聊天对象已经在联系人列表最上面了，只需存缓存并刷新聊天窗口
                            if (i == recentContact.length) {
                                chatMan = [this.props.data];
                                chatMan[0].message = data;
                                recentContact = chatMan.concat(recentContact);
                                //刷新状态
                                Utility.setStorage("recentContact", recentContact);
                                this.setState({ data: data });
                            }
                            else if (i == 0) {
                                //刷新状态
                                Utility.setStorage("recentContact", recentContact);
                                this.setState({ data: data });
                            }
                            else {
                                indexData = recentContact[i];
                                recentContact.splice(i, 1);
                                recentContact.unshift(indexData);
                                //刷新状态
                                Utility.setStorage("recentContact", recentContact);
                                this.props.onChange();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    *处理文本输入框聚焦的函数，聚焦时移除提示文字
    */
    MessageWindow.prototype.handleFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                $('#wPostNotice').addClass('displaynone');
                $('#wPostError').addClass('displaynone');
                $('#postContent')[0].focus();
                return [2 /*return*/];
            });
        });
    };
    /**
    *处理鼠标移出文本输入框的函数，移出时显示文字提示
    */
    MessageWindow.prototype.handleBlur = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ($('#postContent').val() == '') {
                    if ($('#wPostNotice').css('display') == 'none') {
                        $('#wPostNotice').removeClass('displaynone');
                    }
                    else {
                        $('#wPostNotice').addClass('displaynone');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    *发送私信内容的函数
    */
    MessageWindow.prototype.postMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bodyObj, bodyContent, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ($('#postContent').val() == '') {
                            return [2 /*return*/];
                        }
                        bodyObj = { receiverId: this.props.data.id, content: $('#postContent').val() };
                        bodyContent = JSON.stringify(bodyObj);
                        return [4 /*yield*/, Utility.sendMessage(bodyContent, this.context.router)];
                    case 1:
                        response = _a.sent();
                        if (response.status == 403) {
                            $('#postContent').val('');
                            $('#wPostError').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        //暂停0.2秒再执行
                        setTimeout(this.getNewMessage, 200);
                        //清空输入框
                        $('#postContent').val('');
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    MessageWindow.prototype.render = function () {
        var data = this.props.data;
        console.log(this.state.data);
        return (React.createElement("div", { className: "message-message-window" },
            React.createElement("div", { className: "message-message-wHeader" },
                React.createElement("div", { className: "message-message-wReport" }),
                React.createElement("div", { className: "message-message-wTitle" },
                    "\u4E0E ",
                    data.name,
                    " \u7684\u79C1\u4FE1"),
                React.createElement("div", { className: "message-message-wReport" },
                    React.createElement("button", { onClick: this.report }, "\u4E3E\u62A5"))),
            React.createElement("div", { className: "message-message-wContent", id: "messageContent" },
                React.createElement("div", { id: "quickToTheBottom", className: "quickToTheBottom" }),
                this.state.data.map(this.coverMessageProps),
                React.createElement("div", { className: "message-message-wcLoading" },
                    React.createElement("img", { src: "http://file.cc98.org/uploadfile/2017/11/19/2348481046.gif", id: "wcLoadingImg", className: "displaynone" }),
                    React.createElement("div", { id: "wcLoadingText", className: "message-message-wcLoadingText displaynone" }, "\u6CA1\u6709\u66F4\u591A\u6D88\u606F\u4E86~"))),
            React.createElement("div", { className: "message-message-wPost" },
                React.createElement("textarea", { className: "message-message-wPostArea", id: "postContent", onFocus: this.handleFocus, onBlur: this.handleBlur }),
                React.createElement("div", { id: "wPostNotice", className: "message-message-wPostNotice", onClick: this.handleFocus }, "\u8BF7\u5728\u8FD9\u91CC\u586B\u5165\u60A8\u8981\u53D1\u9001\u7684\u79C1\u4FE1\u5185\u5BB9"),
                React.createElement("div", { id: "wPostError", className: "message-message-wPostError displaynone", onClick: this.handleFocus }, "\u60A8\u7684\u53D1\u9001\u8FC7\u5FEB\uFF0C\u8BF7\u7A0D\u4F5C\u6B47\u606F~"),
                React.createElement("button", { className: "message-message-wPostBtn", onClick: this.postMessage }, "\u53D1\u9001"))));
    };
    return MessageWindow;
}(React.Component));
exports.MessageWindow = MessageWindow;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessageSender = /** @class */ (function (_super) {
    __extends(MessageSender, _super);
    function MessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageSender.prototype.render = function () {
        var userUrl = "/user/name/" + this.props.senderName;
        var timeClassName;
        if (this.props.showTime) {
            timeClassName = "message-message-wcTime";
        }
        else {
            timeClassName = "displaynone";
        }
        return (React.createElement("div", { className: "message-message-wc" },
            React.createElement("div", { className: timeClassName }, moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')),
            React.createElement("div", { className: "message-message-wcSender" },
                React.createElement("a", { href: userUrl, target: "_blank" },
                    React.createElement("img", { className: "message-message-wcPortraitUrl", src: this.props.senderPortraitUrl })),
                React.createElement("div", { className: "message-message-wcContent" },
                    React.createElement("div", { id: String(this.props.id), className: "message-message-wcText" },
                        React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content }))),
                React.createElement("div", { className: "message-message-wcRead1" },
                    React.createElement("div", { className: "message-message-wcRead2" }, this.props.isRead ? '已读' : '未读')))));
    };
    return MessageSender;
}(React.Component));
exports.MessageSender = MessageSender;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessageReceiver = /** @class */ (function (_super) {
    __extends(MessageReceiver, _super);
    function MessageReceiver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageReceiver.prototype.render = function () {
        var userUrl = "/user/name/" + this.props.senderName;
        var timeClassName;
        if (this.props.showTime) {
            timeClassName = "message-message-wcTime";
        }
        else {
            timeClassName = "displaynone";
        }
        return (React.createElement("div", { className: "message-message-wc" },
            React.createElement("div", { className: timeClassName }, moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')),
            React.createElement("div", { className: "message-message-wcReceiver" },
                React.createElement("a", { href: userUrl, target: "_blank" },
                    React.createElement("img", { className: "message-message-wcPortraitUrl", src: this.props.senderPortraitUrl })),
                React.createElement("div", { className: "message-message-wcContent" },
                    React.createElement("div", { className: "message-message-wcText", id: String(this.props.id) },
                        React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content }))))));
    };
    return MessageReceiver;
}(React.Component));
exports.MessageReceiver = MessageReceiver;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MessageResponsebox_1 = __webpack_require__(103);
var Utility = __webpack_require__(1);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MessageResponse = /** @class */ (function (_super) {
    __extends(MessageResponse, _super);
    function MessageResponse(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageResponse = function (item) {
            return React.createElement(MessageResponsebox_1.MessageResponsebox, { id: item.id, type: item.type, time: item.time, topicId: item.topicId, topicTitle: item.topicTitle, postId: item.postId, boardId: item.boardId, boardName: item.boardName, isRead: item.isRead });
        };
        _this.state = {
            data: [],
            from: 0,
            loading: true
        };
        return _this;
    }
    MessageResponse.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getMessageResponse(0, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.setState({ data: data, from: data.length });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageResponse.prototype.render = function () {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#response').addClass('message-nav-focus');
        return React.createElement("div", { className: "message-response" }, this.state.data.map(this.coverMessageResponse));
    };
    return MessageResponse;
}(React.Component));
exports.MessageResponse = MessageResponse;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessageResponsebox = /** @class */ (function (_super) {
    __extends(MessageResponsebox, _super);
    function MessageResponsebox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageResponsebox.prototype.render = function () {
        var host = window.location.host;
        var a = this.props.postId / 10;
        var b = parseInt(a);
        var c = this.props.postId - b * 10;
        var content;
        var view;
        if (this.props.isRead) {
            content = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=gray]\u6709\u4EBA\u5728\u300A" + this.props.topicTitle + "\u300B\u4E2D\u56DE\u590D\u4E86\u4F60[/color][/url]";
            view = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=gary]\u67E5\u770B[/color][/url]";
        }
        else {
            content = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=black][b]\u6709\u4EBA\u5728\u300A" + this.props.topicTitle + "\u300B\u4E2D\u56DE\u590D\u4E86\u4F60[/b][/color][/url]";
            view = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=black][b]\u67E5\u770B[/b][/color][/url]";
        }
        return (React.createElement("div", { className: "message-response-box" },
            React.createElement("div", { className: "message-response-box-middle" },
                React.createElement("div", { className: "message-response-box-middle1" },
                    React.createElement("div", { className: "message-response-box-middle-title" }, this.props.boardName),
                    React.createElement("div", { className: "message-response-box-middle-date" }, moment(this.props.time).format('YYYY-MM-DD HH:mm:ss'))),
                React.createElement("div", { className: "message-response-box-middle-content" },
                    React.createElement(UbbContainer_1.UbbContainer, { code: content }))),
            React.createElement("div", { className: "message-response-box-right" },
                " ",
                React.createElement(UbbContainer_1.UbbContainer, { code: view }))));
    };
    return MessageResponsebox;
}(React.Component));
exports.MessageResponsebox = MessageResponsebox;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MessageAttmebox_1 = __webpack_require__(105);
var Utility = __webpack_require__(1);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MessageAttme = /** @class */ (function (_super) {
    __extends(MessageAttme, _super);
    function MessageAttme(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageAttme = function (item) {
            return React.createElement(MessageAttmebox_1.MessageAttmebox, { id: item.id, type: item.type, time: item.time, topicId: item.topicId, topicTitle: item.topicTitle, postId: item.postId, boardId: item.boardId, boardName: item.boardName, isRead: item.isRead });
        };
        _this.state = {
            data: [],
            from: 0,
            loading: true
        };
        return _this;
    }
    MessageAttme.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getMessageAttme(0, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.setState({ data: data, from: data.length });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageAttme.prototype.render = function () {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#attme').addClass('message-nav-focus');
        return React.createElement("div", { className: "message-response" }, this.state.data.map(this.coverMessageAttme));
    };
    return MessageAttme;
}(React.Component));
exports.MessageAttme = MessageAttme;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessageAttmebox = /** @class */ (function (_super) {
    __extends(MessageAttmebox, _super);
    function MessageAttmebox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageAttmebox.prototype.render = function () {
        var host = window.location.host;
        var a = this.props.postId / 10;
        var b = parseInt(a);
        var c = this.props.postId - b * 10;
        var content;
        var view;
        if (this.props.isRead) {
            content = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=gray]\u6709\u4EBA\u5728\u300A" + this.props.topicTitle + "\u300B\u4E2D@\u4E86\u4F60[/color][/url]";
            view = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=gary]\u67E5\u770B[/color][/url]";
        }
        else {
            content = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=black][b]\u6709\u4EBA\u5728\u300A" + this.props.topicTitle + "\u300B\u4E2D@\u4E86\u4F60[/b][/color][/url]";
            view = "[url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=black][b]\u67E5\u770B[/b][/color][/url]";
        }
        return (React.createElement("div", { className: "message-response-box" },
            React.createElement("div", { className: "message-response-box-middle" },
                React.createElement("div", { className: "message-response-box-middle1" },
                    React.createElement("div", { className: "message-response-box-middle-title" }, this.props.boardName),
                    React.createElement("div", { className: "message-response-box-middle-date" }, moment(this.props.time).format('YYYY-MM-DD HH:mm:ss'))),
                React.createElement("div", { className: "message-response-box-middle-content" },
                    React.createElement(UbbContainer_1.UbbContainer, { code: content }))),
            React.createElement("div", { className: "message-response-box-right" },
                " ",
                React.createElement(UbbContainer_1.UbbContainer, { code: view }))));
    };
    return MessageAttmebox;
}(React.Component));
exports.MessageAttmebox = MessageAttmebox;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MessageSystembox_1 = __webpack_require__(107);
var Utility = __webpack_require__(1);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MessageSystem = /** @class */ (function (_super) {
    __extends(MessageSystem, _super);
    function MessageSystem(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageSystem = function (item) {
            return React.createElement(MessageSystembox_1.MessageSystembox, { id: item.id, type: item.type, title: item.title, content: item.content, time: item.time, topicId: item.topicId, postId: item.postId, isRead: item.isRead });
        };
        _this.state = {
            data: [],
            from: 0,
            loading: true
        };
        return _this;
    }
    MessageSystem.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getMessageSystem(0, this.context.router)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.setState({ data: data, from: data.length });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageSystem.prototype.render = function () {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#system').addClass('message-nav-focus');
        return React.createElement("div", { className: "message-system" }, this.state.data.map(this.coverMessageSystem));
    };
    return MessageSystem;
}(React.Component));
exports.MessageSystem = MessageSystem;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var MessageSystembox = /** @class */ (function (_super) {
    __extends(MessageSystembox, _super);
    function MessageSystembox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageSystembox.prototype.render = function () {
        var content;
        if (this.props.topicId) {
            var host = window.location.host;
            if (this.props.postId) {
                var a = this.props.postId / 10;
                var b = parseInt(a);
                var c = this.props.postId - b * 10;
                if (this.props.isRead) {
                    content = "[color=gray]" + this.props.content + "[/color][url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=blue]http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "[/color][/url]";
                }
                else {
                    content = "[color=black][b]" + this.props.content + "[/b][/color][url=http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "][color=blue]http://" + host + "/topic/" + this.props.topicId + "/" + b + "#" + c + "[/color][/url]";
                }
            }
            else {
                if (this.props.isRead) {
                    content = "[color=gray]" + this.props.content + "[/color][url=http://" + host + "/topic/" + this.props.topicId + "][color=blue]http://" + host + "/topic/" + this.props.topicId + "[/color][/url]";
                }
                else {
                    content = "[color=black][b]" + this.props.content + "[/b][/color][url=http://" + host + "/topic/" + this.props.topicId + "][color=blue]http://" + host + "/topic/" + this.props.topicId + "[/color][/url]";
                }
            }
        }
        else {
            if (this.props.isRead) {
                content = "[color=gray]" + this.props.content + "[/color]";
            }
            else {
                content = "[color=black][b]" + this.props.content + "[/b][/color]";
            }
        }
        console.log(content);
        return (React.createElement("div", { className: "message-system-box" },
            React.createElement("div", { className: "message-system-box-bar" },
                React.createElement("div", { className: "message-system-box-title" }, this.props.title),
                React.createElement("div", { className: "message-system-box-date" }, moment(this.props.time).format('YYYY-MM-DD HH:mm:ss'))),
            React.createElement("div", { className: "message-system-box-content" },
                React.createElement(UbbContainer_1.UbbContainer, { code: content }))));
    };
    return MessageSystembox;
}(React.Component));
exports.MessageSystembox = MessageSystembox;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
/**
 * 表示我关注的版面列表区域
 */
var FocusBoardArea = /** @class */ (function (_super) {
    __extends(FocusBoardArea, _super);
    /**
     * 构造函数
     * @param props
     */
    function FocusBoardArea(props) {
        var _this = _super.call(this, props) || this;
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardList");
        console.log(data);
        if (!data) {
            data = [];
        }
        _this.state = {
            data: data
        };
        return _this;
    }
    /**
     * 将我关注的版面排列好
     */
    FocusBoardArea.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, token, userInfo, boardid, headers, _a, _b, _i, i, response, boardInfo, currentFocusBoard, self;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = Utility.getStorage("focusBoardList");
                        if (!data) return [3 /*break*/, 1];
                        this.setState({ data: data });
                        return [3 /*break*/, 7];
                    case 1:
                        data = [];
                        token = Utility.getLocalStorage("accessToken");
                        userInfo = Utility.getLocalStorage("userInfo");
                        boardid = userInfo.customBoards;
                        console.log(boardid);
                        headers = new Headers();
                        headers.append('Authorization', token);
                        _a = [];
                        for (_b in boardid)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/board/" + boardid[i], {
                                headers: headers
                            })];
                    case 3:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        boardInfo = _c.sent();
                        data.push({ id: boardid[i], name: boardInfo.name });
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        this.setState({ data: data });
                        //存到缓存里
                        Utility.setStorage("focusBoardList", data);
                        _c.label = 7;
                    case 7:
                        currentFocusBoard = Utility.getStorage("currentFocusBoard");
                        if (currentFocusBoard) {
                            $(".focus-board").removeClass("focus-hover");
                            $("boardId_" + currentFocusBoard.id).addClass("focus-hover");
                        }
                        self = this;
                        $('.focus-board').click(function () {
                            //如果没被点击过，就设为选中，并更新下方帖子列表
                            if (this.className == "focus-board") {
                                var currentFocusBoard_1 = { boardId: this.id, boardName: this.innerHTML };
                                Utility.setStorage("currentFocusBoard", currentFocusBoard_1);
                                $(".focus-board").removeClass("focus-hover");
                                $(this).addClass("focus-hover");
                                self.props.onChange();
                            }
                            else if (this.className == "focus-board focus-hover") {
                                Utility.removeStorage("currentFocusBoard");
                                $(".focus-board").removeClass("focus-hover");
                                self.props.onChange();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FocusBoardArea.prototype.render = function () {
        return React.createElement("div", { className: "focus-board-area" },
            React.createElement("div", { className: "focus-board", id: "0" }, "\u5173\u6CE8\u7528\u6237"),
            this.state.data.map(coverFocusBoard));
    };
    return FocusBoardArea;
}(React.Component));
exports.FocusBoardArea = FocusBoardArea;
function coverFocusBoard(item) {
    //点击版面名称会显示相应版面的帖子
    return React.createElement("div", { className: "focus-board", id: "" + item.id }, item.name);
}
var FocusProps = /** @class */ (function () {
    function FocusProps() {
    }
    return FocusProps;
}());
exports.FocusProps = FocusProps;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var FocusTopicSingle_1 = __webpack_require__(13);
var Utility = __webpack_require__(1);
/**
 * 表示我关注的版面的主题列表
 */
var FocusTopicArea = /** @class */ (function (_super) {
    __extends(FocusTopicArea, _super);
    /**
     * 构造函数
     * @param props
     */
    function FocusTopicArea(props) {
        var _this = _super.call(this, props) || this;
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardTopic");
        if (!data) {
            data = [];
        }
        _this.state = {
            data: data,
            from: 0,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    FocusTopicArea.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, oldData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getFocusTopic(this.state.from, this.context.router)];
                    case 1:
                        data = _a.sent();
                        oldData = Utility.getStorage("focusBoardTopic");
                        if (oldData) {
                            for (i = 0; i < data.length; i++) {
                                // 最新的20 条数据跟之前的有重合就组合起来
                                if (data[i].id == oldData[0].id) {
                                    data = data.slice(0, i).concat(oldData);
                                    break;
                                }
                            }
                        }
                        //最多100条新帖
                        if (data.length > 100) {
                            data = data.slice(0, 100);
                        }
                        this.setState({ data: data, from: data.length });
                        //缓存获取到的数据
                        Utility.setStorage("focusBoardTopic", data);
                        //滚动条监听
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    FocusTopicArea.prototype.componentWillUnmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.removeEventListener('scroll', this.handleScroll);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 处理滚动的函数
     */
    FocusTopicArea.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utility.isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *查看新帖数目大于100条时不再继续加载
                        */
                        if (this.state.from >= 99) {
                            $('#focus-topic-loading').addClass('displaynone');
                            $('#focus-topic-loaddone').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getFocusTopic(this.state.from, this.context.router)];
                    case 2:
                        newData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        /**
                        *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ loading: true });
                        return [2 /*return*/];
                    case 4:
                        data = this.state.data.concat(newData);
                        this.setState({ data: data, from: data.length, loading: true });
                        Utility.setStorage("focusBoardTopic", data);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将主题排列好
     */
    FocusTopicArea.prototype.render = function () {
        return React.createElement("div", { className: "focus-topic-area" },
            React.createElement("div", { className: "focus-topic-topicArea" }, this.state.data.map(coverFocusPost)),
            React.createElement("div", { className: "focus-topic-loading", id: "focus-topic-loading" },
                React.createElement("img", { src: "http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif" })),
            React.createElement("div", { className: "focus-topic-loaddone displaynone", id: "focus-topic-loaddone" }, "\u5DF2\u52A0\u8F7D100\u6761\u65B0\u5E16\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u66F4\u591A\u4E86~"));
    };
    return FocusTopicArea;
}(React.Component));
exports.FocusTopicArea = FocusTopicArea;
/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item) {
    return React.createElement(FocusTopicSingle_1.FocusTopicSingle, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, userId: item.userId, userName: item.userName, portraitUrl: item.portraitUrl, time: item.time, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var FocusTopicSingle_1 = __webpack_require__(13);
var Utility = __webpack_require__(1);
/**
 * 表示我关注的版面的主题列表
 */
var FocusBoardTopicArea = /** @class */ (function (_super) {
    __extends(FocusBoardTopicArea, _super);
    /**
     * 构造函数
     * @param props
     */
    function FocusBoardTopicArea(props) {
        var _this = _super.call(this, props) || this;
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoard_" + _this.props.boardId);
        if (!data) {
            data = [];
        }
        _this.state = {
            data: data,
            from: 0,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    FocusBoardTopicArea.prototype.componentWillReceiveProps = function (nextProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getData(nextProps);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    FocusBoardTopicArea.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getData(this.props);
                return [2 /*return*/];
            });
        });
    };
    FocusBoardTopicArea.prototype.getData = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var data, oldData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getFocusBoardTopic(props.boardId, props.boardNme, 0, this.context.router)];
                    case 1:
                        data = _a.sent();
                        oldData = Utility.getStorage("focusBoard_" + props.boardId);
                        if (oldData) {
                            for (i = 0; i < data.length; i++) {
                                // 最新的20 条数据跟之前的有重合就组合起来
                                if (data[i].id == oldData[0].id) {
                                    data = data.slice(0, i).concat(oldData);
                                    break;
                                }
                            }
                        }
                        //最多100条新帖
                        if (data.length > 100) {
                            data = data.slice(0, 100);
                        }
                        this.setState({ data: data, from: data.length });
                        //缓存获取到的数据
                        Utility.setStorage("focusBoard_" + props.boardId, data);
                        //滚动条监听
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    FocusBoardTopicArea.prototype.componentWillUnmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.removeEventListener('scroll', this.handleScroll);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 处理滚动的函数
     */
    FocusBoardTopicArea.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utility.isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *查看新帖数目大于100条时不再继续加载
                        */
                        if (this.state.from >= 99) {
                            $('#focus-topic-loading').addClass('displaynone');
                            $('#focus-topic-loaddone').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getFocusBoardTopic(this.props.boardId, this.props.boardNme, this.state.from, this.context.router)];
                    case 2:
                        newData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        /**
                        *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ loading: true });
                        return [2 /*return*/];
                    case 4:
                        data = this.state.data.concat(newData);
                        this.setState({ data: data, from: data.length, loading: true });
                        Utility.setStorage("focusBoard_" + this.props.boardId, data);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将主题排列好
     */
    FocusBoardTopicArea.prototype.render = function () {
        return React.createElement("div", { className: "focus-topic-area" },
            React.createElement("div", { className: "focus-topic-topicArea" }, this.state.data.map(coverFocusPost)),
            React.createElement("div", { className: "focus-topic-loading", id: "focus-topic-loading" },
                React.createElement("img", { src: "http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif" })),
            React.createElement("div", { className: "focus-topic-loaddone displaynone", id: "focus-topic-loaddone" }, "\u5DF2\u52A0\u8F7D100\u6761\u65B0\u5E16\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u66F4\u591A\u4E86~"));
    };
    return FocusBoardTopicArea;
}(React.Component));
exports.FocusBoardTopicArea = FocusBoardTopicArea;
/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item) {
    return React.createElement(FocusTopicSingle_1.FocusTopicSingle, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, userId: item.userId, userName: item.userName, portraitUrl: item.portraitUrl, time: item.time, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}
var FocusBoardTopicProps = /** @class */ (function () {
    function FocusBoardTopicProps() {
    }
    return FocusBoardTopicProps;
}());
exports.FocusBoardTopicProps = FocusBoardTopicProps;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var UserNavigation = /** @class */ (function (_super) {
    __extends(UserNavigation, _super);
    function UserNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserNavigation.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-navigation", id: "userCenterNavigation" },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: "" + location.pathname, label: "主页", activeOnlyWhenExact: true, myClassName: "fa-home" }),
                React.createElement("hr", null))));
    };
    return UserNavigation;
}(React.Component));
exports.UserNavigation = UserNavigation;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, _b = _a.activeOnlyWhenExact, activeOnlyWhenExact = _b === void 0 ? false : _b, myClassName = _a.myClassName;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement("li", { className: match ? "user-center-navigation-active" : "" },
                React.createElement(react_router_dom_1.Link, { className: "" + myClassName, to: to },
                    React.createElement("p", null, label))));
        } }));
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var UserExactProfile_1 = __webpack_require__(113);
var UserRouterActivities_1 = __webpack_require__(114);
var UserCenterExactAvatar_1 = __webpack_require__(30);
var Utility = __webpack_require__(1);
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRouter.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-router" },
            React.createElement(react_router_dom_1.Route, { path: "/user/", component: UserExact })));
    };
    return UserRouter;
}(React.Component));
exports.UserRouter = UserRouter;
var UserExact = /** @class */ (function (_super) {
    __extends(UserExact, _super);
    function UserExact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myHeaders, response, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        myHeaders = void 0;
                        if (Utility.isLogOn()) {
                            myHeaders = {
                                'Authorization': Utility.getLocalStorage("accessToken")
                            };
                        }
                        response = void 0;
                        if (!location.pathname.split('/')[2]) {
                            return [2 /*return*/, 0];
                        }
                        if (!(location.pathname.split('/')[2] === 'name')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/User/Name/" + location.pathname.split('/')[3], {
                                headers: myHeaders
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetch("http://apitest.niconi.cc/User/" + location.pathname.split('/')[2], {
                            headers: myHeaders
                        })];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (response.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, response.json()];
                    case 5:
                        data = _a.sent();
                        console.log(data);
                        this.setState({
                            userInfo: data,
                            userAvatarImgURL: data.portraitUrl,
                            responseState: response.status
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.log('加载失败');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserExact.prototype.render = function () {
        var element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (React.createElement("div", { className: "user-center-exact" },
                React.createElement(UserCenterExactAvatar_1.UserCenterExactAvatar, { userAvatarImgURL: this.state.userAvatarImgURL }),
                React.createElement(UserExactProfile_1.UserExactProfile, { userInfo: this.state.userInfo }),
                React.createElement(UserRouterActivities_1.UserRouterActivities, { id: this.state.userInfo.id })));
        }
        else {
            element = React.createElement("p", null, "\u52A0\u8F7D\u4E2D");
        }
        return element;
    };
    return UserExact;
}(React.Component));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(4);
var Utility = __webpack_require__(1);
/**
 * 用户中心主页个人资料组件
 */
var UserExactProfile = /** @class */ (function (_super) {
    __extends(UserExactProfile, _super);
    function UserExactProfile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isFollowing: _this.props.userInfo.isFollowing,
            buttonIsDisabled: false,
            buttonInfo: _this.props.userInfo.isFollowing ? '已关注' : '关注'
        };
        _this.unfollow = _this.unfollow.bind(_this);
        _this.follow = _this.follow.bind(_this);
        return _this;
    }
    UserExactProfile.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '关注中'
                        });
                        return [4 /*yield*/, Utility.followUser(Number.parseInt(this.props.userInfo.id))];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '已关注',
                                isFollowing: true
                            });
                        }
                        else {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '关注失败',
                                isFollowing: false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserExactProfile.prototype.getPrivilegeColor = function () {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    };
    UserExactProfile.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '取关中'
                        });
                        return [4 /*yield*/, Utility.unfollowUser(Number.parseInt(this.props.userInfo.id))];
                    case 1:
                        state = _a.sent();
                        if (state === true) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '重新关注',
                                isFollowing: false
                            });
                        }
                        else {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '取关失败',
                                isFollowing: true
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserExactProfile.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "user-profile" },
            React.createElement("div", { id: "userId" },
                React.createElement("div", { id: "userId" },
                    React.createElement("p", null,
                        this.props.userInfo.name,
                        React.createElement("span", { style: { fontSize: '12px', color: this.getPrivilegeColor() } }, this.props.userInfo.privilege)),
                    React.createElement("button", { type: "button", onClick: function () { location.href = "/message/message?id=" + _this.props.userInfo.id; } }, "\u79C1\u4FE1"),
                    React.createElement("button", { type: "button", id: this.state.isFollowing ? 'unfollow' : '', onClick: this.state.isFollowing ? this.unfollow : this.follow, disabled: this.state.buttonIsDisabled, onMouseOver: function () {
                            if (_this.state.isFollowing && !_this.state.buttonIsDisabled) {
                                _this.setState({
                                    buttonInfo: '取消关注'
                                });
                            }
                        }, onMouseLeave: function () {
                            if (_this.state.isFollowing && !_this.state.buttonIsDisabled) {
                                _this.setState({
                                    buttonInfo: '已关注'
                                });
                            }
                        } }, this.state.buttonInfo))),
            React.createElement("div", { id: "userGenderAndBirthday" },
                React.createElement("p", null,
                    "\u6027\u522B\uFF1A  ",
                    (this.props.userInfo.gender === 1) ? '男' : '女',
                    " "),
                this.props.userInfo.birthday === null ? null : React.createElement("p", null,
                    "\u751F\u65E5\uFF1A  ",
                    this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T'))),
                this.props.userInfo.emailAddress ? React.createElement("p", null,
                    "\u90AE\u7BB1\uFF1A  ",
                    this.props.userInfo.emailAddress) : null,
                this.props.userInfo.qq ? React.createElement("p", null,
                    "QQ\uFF1A  ",
                    this.props.userInfo.qq) : null,
                this.props.userInfo.postCount ? React.createElement("p", null,
                    "\u53D1\u5E16\u6570\uFF1A  ",
                    this.props.userInfo.postCount) : null,
                this.props.userInfo.prestige ? React.createElement("p", null,
                    "\u5A01\u671B\uFF1A  ",
                    this.props.userInfo.prestige) : null,
                this.props.userInfo.displayTitle ? React.createElement("p", null,
                    "\u7528\u6237\u7EC4\uFF1A  ",
                    this.props.userInfo.displayTitle) : null,
                this.props.userInfo.registerTime ? React.createElement("p", null,
                    "\u6CE8\u518C\u65F6\u95F4\uFF1A  ",
                    this.props.userInfo.registerTime.replace('T', ' ')) : null,
                this.props.userInfo.lastLogOnTime ? React.createElement("p", null,
                    "\u6700\u540E\u767B\u5F55\u65F6\u95F4\uFF1A  ",
                    this.props.userInfo.lastLogOnTime.replace('T', ' ')) : null),
            this.props.userInfo.signatureCode ?
                React.createElement("div", { className: "user-description" },
                    React.createElement("p", null, "\u4E2A\u6027\u7B7E\u540D"),
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.userInfo.signatureCode })) : null));
    };
    return UserExactProfile;
}(React.Component));
exports.UserExactProfile = UserExactProfile;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(11);
var AppState_1 = __webpack_require__(5);
var Utility = __webpack_require__(1);
//用户中心主页帖子动态组件
var UserRouterActivities = /** @class */ (function (_super) {
    __extends(UserRouterActivities, _super);
    function UserRouterActivities(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = {
            userRecentPosts: [],
            isLoading: false
        };
        _this.scrollHandler = _this.scrollHandler.bind(_this);
        return _this;
    }
    UserRouterActivities.prototype.scrollHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var pageYLeft, url, token, headers, res, data, posts, i, post, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageYLeft = document.body.scrollHeight - window.pageYOffset;
                        if (!(pageYLeft < 1500 && this.state.isLoading === false)) return [3 /*break*/, 10];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        this.setState({ isLoading: true });
                        url = "http://apitest.niconi.cc/topic/userrecent?userid=" + this.props.id + "&from=" + this.state.userRecentPosts.length + "&size=10";
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 2:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 7];
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
                        if (data.length < 10) {
                            window.removeEventListener('scroll', this.scrollHandler);
                        }
                        posts = this.state.userRecentPosts;
                        i = data.length;
                        _a.label = 4;
                    case 4:
                        if (!i--) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.item2post(data[i])];
                    case 5:
                        post = _a.sent();
                        posts.push(post);
                        return [3 /*break*/, 4];
                    case 6:
                        this.setState({
                            userRecentPosts: posts,
                            isLoading: false
                        });
                        return [3 /*break*/, 8];
                    case 7: throw {};
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        this.setState({
                            isLoading: false
                        });
                        console.log('用户中心滚动加载失败');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterActivities.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, token, headers, res, data, posts, i, post, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        url = "http://apitest.niconi.cc/topic/userrecent?userid=" + this.props.id + "&from=0&size=10";
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 6];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        posts = [], i = data.length;
                        _a.label = 3;
                    case 3:
                        if (!i--) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.item2post(data[i])];
                    case 4:
                        post = _a.sent();
                        posts.unshift(post);
                        return [3 /*break*/, 3];
                    case 5:
                        this.setState({
                            userRecentPosts: posts
                        });
                        if (data.length === 10) {
                            window.addEventListener('scroll', this.scrollHandler);
                        }
                        return [3 /*break*/, 7];
                    case 6: throw {};
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        console.log('用户中心帖子加载失败');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserRouterActivities.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.scrollHandler);
    };
    UserRouterActivities.prototype.item2post = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var userRecentPost, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRecentPost = new AppState_1.UserRecentPost();
                        userRecentPost.approval = item.likeCount;
                        _a = userRecentPost;
                        return [4 /*yield*/, Utility.getBoardName(item.boardId, this.context.router)];
                    case 1:
                        _a.board = _b.sent();
                        userRecentPost.date = item.time.replace('T', ' ').slice(0, 19);
                        userRecentPost.disapproval = item.dislikeCount;
                        userRecentPost.content = item.title;
                        userRecentPost.id = item.id;
                        userRecentPost.boardId = item.boardId;
                        userRecentPost.name = item.userName;
                        userRecentPost.isAnonymous = item.isAnonymous;
                        return [2 /*return*/, userRecentPost];
                }
            });
        });
    };
    UserRouterActivities.prototype.render = function () {
        //console.log(this.state.userRecentPosts);
        if (this.state.userRecentPosts.length === 0) {
            var style = {
                marginLeft: '2rem'
            };
            return (React.createElement("div", { className: "user-posts", style: style }, "\u6CA1\u6709\u4E3B\u9898"));
        }
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-activities" },
            React.createElement("p", null, "\u8FD1\u671F\u52A8\u6001"),
            React.createElement("div", { className: "user-posts" }, userRecentPosts)));
    };
    return UserRouterActivities;
}(React.Component));
exports.UserRouterActivities = UserRouterActivities;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var $ = __webpack_require__(7);
var Utility = __webpack_require__(1);
var Actions = __webpack_require__(8);
var react_redux_1 = __webpack_require__(6);
var LogOnExact = /** @class */ (function (_super) {
    __extends(LogOnExact, _super);
    function LogOnExact(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: ''
        };
        _this.handleNameChange = _this.handleNameChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleLogin = _this.handleLogin.bind(_this);
        return _this;
    }
    LogOnExact.prototype.shake = function (element) {
        element.classList.add('shake');
        setTimeout(function () { element.classList.remove('shake'); }, 500);
        return element;
    };
    LogOnExact.prototype.handleNameChange = function (e) {
        this.setState({
            loginName: e.target.value
        });
    };
    LogOnExact.prototype.handlePasswordChange = function (e) {
        this.setState({
            loginPassword: e.target.value
        });
    };
    LogOnExact.prototype.handleLogin = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var url, requestBody, headers, response, data, token, headers1, response1, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //阻止表单提交
                        e.preventDefault();
                        //如果在登录中则无视提交
                        if (this.props.isLogOn) {
                            return [2 /*return*/, false];
                        }
                        //缺少用户名或者密码
                        if (!this.state.loginName) {
                            this.setState({
                                loginMessage: '请输入用户名'
                            });
                            this.shake(document.getElementById('loginName')).focus();
                            return [2 /*return*/, false];
                        }
                        else if (!this.state.loginPassword) {
                            this.setState({
                                loginMessage: '请输入密码'
                            });
                            this.shake(document.getElementById('loginPassword')).focus();
                            return [2 /*return*/, false];
                        }
                        //登录
                        this.setState({
                            loginMessage: '登录中'
                        });
                        this.props.logOff();
                        url = 'https://openid.cc98.org/connect/token';
                        requestBody = {
                            'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
                            'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
                            'grant_type': 'password',
                            'username': this.state.loginName,
                            'password': this.state.loginPassword,
                            'scope': "cc98-api openid"
                        };
                        headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: headers,
                                body: $.param(requestBody)
                            })];
                    case 1:
                        response = _a.sent();
                        //请求是否成功
                        if (response.status !== 200) {
                            this.setState({
                                loginMessage: "\u767B\u5F55\u5931\u8D25 " + response.status
                            });
                            this.props.logOff();
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        token = "Bearer " + encodeURIComponent(data.access_token);
                        //缓存数据
                        Utility.setLocalStorage("accessToken", token, data.expires_in);
                        Utility.setLocalStorage("userName", this.state.loginName);
                        Utility.setLocalStorage("password", this.state.loginPassword);
                        headers1 = new Headers();
                        headers1.append("Authorization", token);
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + this.state.loginName, {
                                headers: headers1
                            })];
                    case 3:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 4:
                        userInfo = _a.sent();
                        Utility.setLocalStorage("userInfo", userInfo);
                        this.setState({
                            loginMessage: '登录成功 正在返回首页'
                        });
                        this.props.logOn();
                        //跳转至首页
                        setTimeout(function () {
                            location.pathname = "/";
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    LogOnExact.prototype.catch = function (e) {
        //alert(e.error);     这行好像没什么用……暂时还不会处理不同的error……
        console.log("Oops, error", e);
        this.setState({
            loginMessage: "\u767B\u5F55\u5931\u8D25"
        });
        this.props.logOff();
    };
    LogOnExact.prototype.render = function () {
        return (React.createElement("div", { className: "login" },
            React.createElement("div", null,
                React.createElement("img", { src: "/images/login.png" }),
                React.createElement("div", null,
                    React.createElement("img", { src: "/images/login_welcome.png" }),
                    React.createElement("form", { onSubmit: this.handleLogin },
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u7528\u6237\u540D"),
                            React.createElement("input", { type: "text", id: "loginName", onChange: this.handleNameChange, value: this.state.loginName })),
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u5BC6\u7801"),
                            React.createElement("input", { type: "password", id: "loginPassword", onChange: this.handlePasswordChange })),
                        React.createElement("p", { id: "loginMessage" }, this.state.loginMessage),
                        React.createElement("button", { type: "submit", disabled: this.props.isLogOn }, "\u767B\u5F55\u8D26\u53F7")),
                    React.createElement("p", null,
                        React.createElement("span", null,
                            "\u8FD8\u6CA1\u8D26\u53F7\uFF1F\u6211\u8981 ",
                            React.createElement("a", { href: "" }, "\u6CE8\u518C")))))));
    };
    return LogOnExact;
}(React.Component));
/**
 * 登录页状态
 */
var LogOnState = /** @class */ (function () {
    function LogOnState() {
    }
    return LogOnState;
}());
function mapState(state) {
    return {
        isLogOn: state.userInfo.isLogOn
    };
}
function mapDispatch(disPatch) {
    return {
        logOn: function () {
            disPatch(Actions.userLogIn());
        },
        logOff: function () {
            disPatch(Actions.userLogOff());
        }
    };
}
exports.default = react_redux_1.connect(mapState, mapDispatch)(LogOnExact);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(6);
var Actions_1 = __webpack_require__(8);
var LogOffBefore = /** @class */ (function (_super) {
    __extends(LogOffBefore, _super);
    function LogOffBefore(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            logOffInfo: '登出中'
        };
        return _this;
    }
    LogOffBefore.prototype.componentDidMount = function () {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        this.setState({
            logOffInfo: '登出成功 正在前往登录页'
        });
        setTimeout(function () {
            location.pathname = "/logon";
        }, 2000);
    };
    LogOffBefore.prototype.render = function () {
        return (React.createElement("div", { className: "login" },
            React.createElement("div", null,
                React.createElement("img", { src: "/images/login.png" }),
                React.createElement("div", null,
                    React.createElement("p", { className: "LogOffInfo" }, this.state.logOffInfo)))));
    };
    return LogOffBefore;
}(React.Component));
function mapDispatch(dispatch) {
    return {
        logOff: function () {
            dispatch(Actions_1.userLogOff());
        }
    };
}
exports.LogOff = react_redux_1.connect(function () { return null; }, mapDispatch)(LogOffBefore);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(5);
var UserCenterMyFollowingsUser_1 = __webpack_require__(42);
var app_1 = __webpack_require__(12);
var UserCenterPageCount_1 = __webpack_require__(14);
var Utility = __webpack_require__(1);
//用户中心我的粉丝组件
var UserCenterMyFans = /** @class */ (function (_super) {
    __extends(UserCenterMyFans, _super);
    function UserCenterMyFans(props, contest) {
        var _this = _super.call(this, props, contest) || this;
        _this.state = {
            userFans: [],
            totalPage: 2,
            info: '加载中'
        };
        return _this;
    }
    UserCenterMyFans.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, page, url, headers, res, data, fans, i, data2, userid_1, userFanInfo, userid, fanCounts, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        token = Utility.getLocalStorage("accessToken");
                        page = this.match.params.page || 1;
                        url = "http://apitest.niconi.cc/user/follow/fan?from=" + (page - 1) * 10 + "&size=10";
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 9];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        //没有粉丝
                        if (!data || !data.length) {
                            this.setState({
                                info: '没有粉丝'
                            });
                            return [2 /*return*/, false];
                        }
                        fans = [];
                        i = data.length, data2 = void 0;
                        _a.label = 3;
                    case 3:
                        if (!i--) return [3 /*break*/, 6];
                        userid_1 = data[i];
                        userFanInfo = new AppState_1.UserFanInfo();
                        url = "http://apitest.niconi.cc/user/" + userid_1;
                        return [4 /*yield*/, fetch(url)];
                    case 4:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 5:
                        data2 = _a.sent();
                        userFanInfo.name = data2.name;
                        userFanInfo.avatarImgURL = data2.portraitUrl;
                        userFanInfo.posts = data2.postCount;
                        userFanInfo.id = userid_1;
                        userFanInfo.fans = data2.fanCount;
                        fans.push(userFanInfo);
                        return [3 /*break*/, 3];
                    case 6:
                        userid = Utility.getLocalStorage('userInfo').id;
                        url = "http://apitest.niconi.cc/user/follow/fancount?userid=" + userid;
                        return [4 /*yield*/, fetch(url)];
                    case 7:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 8:
                        fanCounts = _a.sent();
                        this.setState({
                            userFans: fans,
                            totalPage: fanCounts % 10 === 0 ? fanCounts / 10 : Math.floor((fanCounts / 10)) + 1
                        });
                        return [3 /*break*/, 10];
                    case 9: throw {};
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_1 = _a.sent();
                        console.log('我的粉丝加载失败');
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFans.prototype.render = function () {
        var page = this.match.params.page || 1;
        if (this.state.userFans.length === 0) {
            return (React.createElement("div", { className: "user-center-myfans" }, this.state.info));
        }
        //state转换为JSX
        var userFans = this.state.userFans.map(function (item) { return (React.createElement(UserCenterMyFollowingsUser_1.UserCenterMyFollowingsUser, { userFanInfo: item })); });
        //添加分隔线
        for (var i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-center-myfans" },
            React.createElement("div", { className: "user-center-myfans-exact" }, userFans),
            React.createElement(UserCenterPageCount_1.UserCenterPageCount, { currentPage: parseInt(page), totalPage: this.state.totalPage, href: "/usercenter/myfans/" })));
    };
    return UserCenterMyFans;
}(app_1.RouteComponent));
exports.UserCenterMyFans = UserCenterMyFans;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(11);
var AppState_1 = __webpack_require__(5);
var app_1 = __webpack_require__(12);
var UserCenterPageCount_1 = __webpack_require__(14);
var Utility = __webpack_require__(1);
/**
 * 用户中心我的主题组件
 */
var UserCenterMyPostsExact = /** @class */ (function (_super) {
    __extends(UserCenterMyPostsExact, _super);
    function UserCenterMyPostsExact(props, contest) {
        var _this = _super.call(this, props, contest) || this;
        var postCount = Utility.getLocalStorage('userInfo').postCount;
        _this.state = {
            userRecentPosts: [],
            totalPage: _this.match.params.page || 1
        };
        return _this;
    }
    UserCenterMyPostsExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, url, token, headers, res, data, posts, i, post, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        page = this.match.params.page || 1;
                        url = "http://apitest.niconi.cc/me/recenttopics?from=" + (page - 1) * 10 + "&size=11";
                        token = Utility.getLocalStorage("accessToken");
                        headers = new Headers();
                        headers.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: headers
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        posts = [], i = data.length;
                        if (i <= 10) {
                            this.setState({
                                totalPage: Number.parseInt(page)
                            });
                        }
                        else {
                            this.setState({
                                totalPage: Number.parseInt(page) + 1
                            });
                            i = 10;
                        }
                        _a.label = 3;
                    case 3:
                        if (!i--) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.item2post(data[i])];
                    case 4:
                        post = _a.sent();
                        posts.unshift(post);
                        return [3 /*break*/, 3];
                    case 5:
                        this.setState({
                            userRecentPosts: posts
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.log('我的主题加载失败');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyPostsExact.prototype.item2post = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var userRecentPost, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRecentPost = new AppState_1.UserRecentPost();
                        userRecentPost.approval = item.likeCount;
                        _a = userRecentPost;
                        return [4 /*yield*/, Utility.getBoardName(item.boardId, this.context.router)];
                    case 1:
                        _a.board = _b.sent();
                        userRecentPost.date = item.time.replace('T', ' ').slice(0, 19);
                        userRecentPost.disapproval = item.dislikeCount;
                        userRecentPost.content = item.title;
                        userRecentPost.id = item.id;
                        userRecentPost.boardId = item.boardId;
                        userRecentPost.name = item.userName;
                        userRecentPost.isAnonymous = item.isAnonymous;
                        return [2 /*return*/, userRecentPost];
                }
            });
        });
    };
    UserCenterMyPostsExact.prototype.render = function () {
        if (this.state.userRecentPosts.length === 0) {
            return (React.createElement("div", { className: "user-posts" }, "\u6CA1\u6709\u4E3B\u9898"));
        }
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" },
            userRecentPosts,
            React.createElement(UserCenterPageCount_1.UserCenterPageCount, { currentPage: this.match.params.page || 1, totalPage: this.state.totalPage, href: "/usercenter/myposts/" })));
    };
    return UserCenterMyPostsExact;
}(app_1.RouteComponent));
exports.UserCenterMyPostsExact = UserCenterMyPostsExact;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(3);
var UserCenterMyFavoritesPosts_1 = __webpack_require__(120);
var UserCenterMyFavoritesBoards_1 = __webpack_require__(121);
//import { UserCenterMyFavoritesPostsBoards } from './UserCenterMyFavoritesPostsBoards';
//<Route path='/usercenter/myfavorites/boards' component={UserCenterMyFavoritesPostsBoards} />
/**
 * 用户中心主页近期动态组件
 */
var UserCenterMyFavorites = /** @class */ (function (_super) {
    __extends(UserCenterMyFavorites, _super);
    function UserCenterMyFavorites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyFavorites.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { className: "user-center-myfavorites" },
                React.createElement(CustomLink, { to: "/usercenter/myfavorites", label: "文章", activeOnlyWhenExact: true }),
                " | ",
                React.createElement(CustomLink, { to: "/usercenter/myfavorites/boards/1", label: "版面", activeOnlyWhenExact: false }),
                React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfavorites/boards/1", component: UserCenterMyFavoritesBoards_1.UserCenterMyFavoritesBoards }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/usercenter/myfavorites/:page?", component: UserCenterMyFavoritesPosts_1.UserCenterMyFavoritesPosts }))));
    };
    return UserCenterMyFavorites;
}(React.Component));
exports.UserCenterMyFavorites = UserCenterMyFavorites;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(11);
var AppState_1 = __webpack_require__(5);
var Utility = __webpack_require__(1);
var UserCenterPageCount_1 = __webpack_require__(14);
var app_1 = __webpack_require__(12);
/**
 * 用户中心我收藏的帖子组件
 */
var UserCenterMyFavoritesPosts = /** @class */ (function (_super) {
    __extends(UserCenterMyFavoritesPosts, _super);
    function UserCenterMyFavoritesPosts(props, c) {
        var _this = _super.call(this, props, c) || this;
        //临时填充数据
        _this.state = {
            userRecentPosts: [],
            info: '加载中',
            totalPage: (Number.parseInt(_this.match.params.page) || 1) + 1
        };
        return _this;
    }
    UserCenterMyFavoritesPosts.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, page, url, myHeaders, res, data, posts, i, post, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = Utility.getLocalStorage('accessToken');
                        page = this.match.params.page || 1;
                        url = "http://apitest.niconi.cc/topic/favorite?from=" + (page - 1) * 10 + "&size=11";
                        myHeaders = new Headers();
                        myHeaders.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: myHeaders
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        if (data.length === 0) {
                            this.setState({
                                info: '没有主题'
                            });
                            return [2 /*return*/];
                        }
                        posts = [];
                        i = data.length;
                        if (i < 10) {
                            this.setState({
                                totalPage: Number.parseInt(this.match.params.page) || 1
                            });
                        }
                        else {
                            i = 10;
                            this.setState({
                                totalPage: (Number.parseInt(this.match.params.page) || 1) + 1
                            });
                        }
                        while (i--) {
                            post = new AppState_1.UserRecentPost();
                            post.board = data[i].boardName;
                            post.boardId = data[i].boardId;
                            post.content = data[i].title;
                            post.date = data[i].time.replace('T', ' ').slice(0, 19);
                            post.id = data[i].id;
                            posts.unshift(post);
                        }
                        this.setState({
                            userRecentPosts: posts
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('加载收藏失败');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFavoritesPosts.prototype.render = function () {
        if (!this.state.userRecentPosts || this.state.userRecentPosts.length === 0) {
            return (React.createElement("div", { className: "user-posts" }, this.state.info));
        }
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" },
            userRecentPosts,
            React.createElement(UserCenterPageCount_1.UserCenterPageCount, { currentPage: this.match.params.page || 1, totalPage: this.state.totalPage, href: "/usercenter/myfavorites/" })));
    };
    return UserCenterMyFavoritesPosts;
}(app_1.RouteComponent));
exports.UserCenterMyFavoritesPosts = UserCenterMyFavoritesPosts;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UserCenterMyFavoritesBoard_1 = __webpack_require__(122);
var UserCenterMyFavoritesBoards = /** @class */ (function (_super) {
    __extends(UserCenterMyFavoritesBoards, _super);
    function UserCenterMyFavoritesBoards(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            boards: [],
            info: '加载中'
        };
        return _this;
    }
    UserCenterMyFavoritesBoards.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, loginName, myHeaders, response1, userInfo, customBoardsId, query, url, res, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        token = Utility.getLocalStorage('accessToken');
                        loginName = Utility.getLocalStorage('userName');
                        myHeaders = new Headers();
                        myHeaders.append("Authorization", token);
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/name/" + loginName, {
                                headers: myHeaders
                            })];
                    case 1:
                        response1 = _a.sent();
                        if (response1.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        userInfo = _a.sent();
                        customBoardsId = userInfo.customBoards;
                        if (!customBoardsId || customBoardsId.length === 0) {
                            this.setState({
                                info: '没有关注'
                            });
                            return [2 /*return*/];
                        }
                        query = customBoardsId.join('&id=');
                        url = "http://apitest.niconi.cc/board/?id=" + query;
                        myHeaders = new Headers();
                        myHeaders.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                headers: myHeaders
                            })];
                    case 3:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw {};
                        }
                        return [4 /*yield*/, res.json()];
                    case 4:
                        data = _a.sent();
                        this.setState({
                            boards: data
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log('版面加载失败');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFavoritesBoards.prototype.render = function () {
        var style = {
            marginTop: '2rem'
        };
        if (this.state.boards.length === 0) {
            return (React.createElement("div", { style: style }, this.state.info));
        }
        var elements = this.state.boards.map(function (item) { return (React.createElement(UserCenterMyFavoritesBoard_1.UserCenterMyFavoritesBoard, { UserFavoritesBoard: item })); });
        for (var i = 1; i < elements.length; i += 2) {
            elements.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", null, elements));
    };
    return UserCenterMyFavoritesBoards;
}(React.Component));
exports.UserCenterMyFavoritesBoards = UserCenterMyFavoritesBoards;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var UserCenterMyFavoritesBoard = /** @class */ (function (_super) {
    __extends(UserCenterMyFavoritesBoard, _super);
    function UserCenterMyFavoritesBoard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            buttonInfo: '取消关注',
            buttonIsDisabled: false,
            isFollowing: true
        };
        _this.unfollow = _this.unfollow.bind(_this);
        _this.follow = _this.follow.bind(_this);
        return _this;
    }
    UserCenterMyFavoritesBoard.prototype.unfollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, boardId, url, myHeaders, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '取关中'
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        token = Utility.getLocalStorage("accessToken");
                        boardId = this.props.UserFavoritesBoard.id;
                        url = "http://apitest.niconi.cc/me/removecustomboard/" + boardId + "/normal";
                        myHeaders = new Headers();
                        myHeaders.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'DELETE',
                                headers: myHeaders
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '重新关注',
                                isFollowing: false
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '取关失败',
                            isFollowing: true
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFavoritesBoard.prototype.follow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, boardId, url, myHeaders, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            buttonIsDisabled: true,
                            buttonInfo: '关注中'
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        token = Utility.getLocalStorage("accessToken");
                        boardId = this.props.UserFavoritesBoard.id;
                        url = "http://apitest.niconi.cc/me/addcustomboard/" + boardId;
                        myHeaders = new Headers();
                        myHeaders.append('Authorization', token);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: myHeaders
                            })];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        if (res.status === 200) {
                            this.setState({
                                buttonIsDisabled: false,
                                buttonInfo: '取消关注',
                                isFollowing: true
                            });
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.setState({
                            buttonIsDisabled: false,
                            buttonInfo: '关注失败',
                            isFollowing: false
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterMyFavoritesBoard.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-myfavorite-board' },
            React.createElement("a", { href: "/list/" + this.props.UserFavoritesBoard.id, title: this.props.UserFavoritesBoard.name },
                React.createElement("img", null)),
            React.createElement("div", { className: 'user-center-myfavorite-board-info' },
                React.createElement("p", null,
                    "\u7248\u4E3B\uFF1A",
                    this.props.UserFavoritesBoard.boardMasters.join(' ')),
                React.createElement("p", null,
                    "\u4ECA\u65E5\u4E3B\u9898 ",
                    this.props.UserFavoritesBoard.todayCount,
                    " / \u603B\u4E3B\u9898 ",
                    this.props.UserFavoritesBoard.topicCount)),
            React.createElement("button", { type: "button", className: this.state.isFollowing ? '' : 'follow', onClick: this.state.isFollowing ? this.unfollow : this.follow, disabled: this.state.buttonIsDisabled }, this.state.buttonInfo)));
    };
    return UserCenterMyFavoritesBoard;
}(React.Component));
exports.UserCenterMyFavoritesBoard = UserCenterMyFavoritesBoard;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var AppState_1 = __webpack_require__(5);
var UserCenterConfigAvatar_1 = __webpack_require__(124);
var UserCenterConfigSignature_1 = __webpack_require__(125);
var UserCenterConfigOthers_1 = __webpack_require__(126);
var UserCenterConfig = /** @class */ (function (_super) {
    __extends(UserCenterConfig, _super);
    function UserCenterConfig(props) {
        var _this = _super.call(this, props) || this;
        var info = Utility.getLocalStorage('userInfo');
        var myInfo = {
            EmailAddress: info.emailAddress,
            Gender: info.gender,
            Introduction: info.introduction,
            QQ: info.qq,
            SignatureCode: info.signatureCode,
            Birthday: info.birthday,
            birthdayYear: Number.parseInt(info.birthday.slice(0, 4)),
            birthdayMouth: Number.parseInt(info.birthday.slice(5, 7)),
            birthdayDay: Number.parseInt(info.birthday.slice(8, 10)),
        };
        _this.state = {
            userInfo: myInfo,
            info: '',
            isLoading: false
        };
        _this.handleSignatureChange = _this.handleSignatureChange.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    UserCenterConfig.prototype.handleSignatureChange = function (str) {
        this.setState(function (prevState) { return ({
            userInfo: __assign({}, prevState.userInfo, { SignatureCode: str })
        }); });
    };
    UserCenterConfig.prototype.handleChange = function (key, value) {
        this.setState(function (prevState) {
            return ({
                userInfo: __assign({}, prevState.userInfo, (_a = {}, _a[key] = value, _a))
            });
            var _a;
        });
    };
    UserCenterConfig.prototype.handleSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newInfo, token, url, myHeaders, res, headers1, response1, userInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            isLoading: true,
                            info: '修改中'
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        newInfo = {
                            Birthday: this.state.userInfo.birthdayYear !== 0 ? this.state.userInfo.birthdayYear + "-" + this.state.userInfo.birthdayMouth + "-" + this.state.userInfo.birthdayDay : '',
                            EmailAddress: this.state.userInfo.EmailAddress,
                            Gender: this.state.userInfo.Gender,
                            Introduction: this.state.userInfo.Introduction,
                            QQ: this.state.userInfo.QQ,
                            SignatureCode: this.state.userInfo.SignatureCode
                        };
                        if (newInfo.EmailAddress && !newInfo.EmailAddress.match(/[\S]+@[\S]+\.[\S]+/)) {
                            throw new Error('请检查邮箱地址');
                        }
                        token = Utility.getLocalStorage('accessToken');
                        url = "http://apitest.niconi.cc/user";
                        myHeaders = new Headers();
                        myHeaders.append('Authorization', token);
                        myHeaders.append('Content-Type', 'application/json');
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: myHeaders,
                                body: JSON.stringify(newInfo)
                            })];
                    case 2:
                        res = _a.sent();
                        if (!(res.status === 200)) return [3 /*break*/, 5];
                        headers1 = new Headers();
                        headers1.append("Authorization", token);
                        return [4 /*yield*/, fetch("http://apitest.niconi.cc/user/" + Utility.getLocalStorage('userInfo').id, {
                                headers: headers1
                            })];
                    case 3:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 4:
                        userInfo = _a.sent();
                        Utility.setLocalStorage("userInfo", userInfo);
                        this.setState({
                            info: '修改成功',
                            isLoading: false
                        });
                        setTimeout((function () {
                            _this.setState({
                                info: ''
                            });
                        }), 1000);
                        return [3 /*break*/, 6];
                    case 5: throw new Error(res.status.toString());
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        this.setState({
                            info: e_1.message,
                            isLoading: false
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserCenterConfig.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-config" },
            React.createElement(UserCenterConfigAvatar_1.default, null),
            React.createElement("hr", null),
            React.createElement(UserCenterConfigSignature_1.UserCenterConfigSignature, { signature: this.state.userInfo.SignatureCode, onchange: this.handleSignatureChange }),
            React.createElement("hr", null),
            React.createElement(UserCenterConfigOthers_1.UserCenterConfigOthers, { userinfo: this.state.userInfo, handleChange: this.handleChange }),
            React.createElement("hr", null),
            React.createElement("div", { className: "config-submit" },
                React.createElement("h2", null, "\u63D0\u4EA4\u4FEE\u6539"),
                React.createElement("button", { type: "button", disabled: this.state.isLoading, onClick: this.handleSubmit }, "\u63D0\u4EA4"),
                React.createElement("p", { style: { height: this.state.info === '' ? '0' : '1rem' } }, this.state.info))));
    };
    return UserCenterConfig;
}(React.Component));
exports.UserCenterConfig = UserCenterConfig;
var UserInfo = /** @class */ (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserInfo;
}(AppState_1.ChangeUserInfo));


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __webpack_require__(0);
var Utility = __webpack_require__(1);
var Actions_1 = __webpack_require__(8);
var react_redux_1 = __webpack_require__(6);
var UserCenterConfigAvatar = /** @class */ (function (_super) {
    __extends(UserCenterConfigAvatar, _super);
    function UserCenterConfigAvatar(props) {
        var _this = _super.call(this, props) || this;
        var userInfo = Utility.getLocalStorage('userInfo');
        _this.state = {
            avatarURL: '',
            info: '',
            isShown: false,
            divheight: 0,
            divWidth: 0,
            selectorWidth: 160,
            selectorLeft: 0,
            selectorTop: 0,
            avatarNow: userInfo.portraitUrl,
            isLoading: false,
            naturalWidth: 0,
            naturalHeight: 0,
            img: null,
            NUM_MAX: 0
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleIMGLoad = _this.handleIMGLoad.bind(_this);
        _this.handleSelectorMove = _this.handleSelectorMove.bind(_this);
        _this.handleResizeMove = _this.handleResizeMove.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleCoverMouseMove = _this.handleCoverMouseMove.bind(_this);
        _this.handleMouseUp = _this.handleMouseUp.bind(_this);
        return _this;
    }
    UserCenterConfigAvatar.prototype.handleChange = function (e) {
        var _this = this;
        var file = e.target.files[0];
        if (!file.type.match('image.*')) {
            this.setState({
                info: '请选择图片文件',
                isShown: false,
                divheight: 0
            });
            return false;
        }
        var render = new FileReader();
        render.readAsDataURL(file);
        render.addEventListener('load', function (e) {
            _this.setState({
                isShown: true,
                avatarURL: e.target.result
            });
        });
    };
    UserCenterConfigAvatar.prototype.handleIMGLoad = function (width, height, img) {
        if (width < 160 || height < 160) {
            this.setState({
                info: '图片至少为 160*160',
                isShown: false,
                divheight: 0
            });
            return;
        }
        else if (width > 800) {
            this.setState({
                info: '图片宽度至多为 800',
                isShown: false,
                divheight: 0
            });
            return;
        }
        var ctx = this.myCanvas.getContext('2d');
        this.myCanvas.width = width;
        this.myCanvas.height = height;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        this.setState({
            divheight: height + 50,
            divWidth: width + 50,
            isShown: true,
            info: '请选择要显示的区域',
            selectorLeft: width / 4,
            selectorTop: height / 4,
            selectorWidth: Math.min(height, width) / 2,
            naturalWidth: width,
            naturalHeight: height,
            img: img,
            NUM_MAX: Math.min(500, width, height)
        });
    };
    UserCenterConfigAvatar.prototype.handleMouseUp = function () {
        this.dragging = null;
    };
    UserCenterConfigAvatar.prototype.componentDidMount = function () {
        this.selector.addEventListener('mousedown', this.handleSelectorMove);
        this.selector.addEventListener('mousemove', this.handleSelectorMove);
        this.selector.addEventListener('mouseup', this.handleSelectorMove);
        this.resize.addEventListener('mousedown', this.handleResizeMove);
        this.resize.addEventListener('mousemove', this.handleResizeMove);
        this.resize.addEventListener('mouseup', this.handleResizeMove);
        this.cover.addEventListener('mousemove', this.handleCoverMouseMove);
        this.cover.addEventListener('mouseup', this.handleCoverMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };
    UserCenterConfigAvatar.prototype.componentWillUnmount = function () {
        this.selector.removeEventListener('mousedown', this.handleSelectorMove);
        this.selector.removeEventListener('mousemove', this.handleSelectorMove);
        this.selector.removeEventListener('mouseup', this.handleSelectorMove);
        this.resize.removeEventListener('mousedown', this.handleResizeMove);
        this.resize.removeEventListener('mousemove', this.handleResizeMove);
        this.resize.removeEventListener('mouseup', this.handleResizeMove);
        this.cover.removeEventListener('mousemove', this.handleCoverMouseMove);
        this.cover.removeEventListener('mouseup', this.handleCoverMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    };
    UserCenterConfigAvatar.prototype.handleSelectorMove = function (event) {
        var _this = this;
        if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
            this.handleCoverMouseMove(event);
        }
        else {
            switch (event.type) {
                case 'mousedown':
                    this.diffX = event.clientX - event.target.offsetLeft;
                    this.diffY = event.clientY - event.target.offsetTop;
                    this.dragging = event.target;
                    break;
                case 'mousemove':
                    if (this.dragging !== null) {
                        var y_1 = event.clientY - this.diffY, x_1 = event.clientX - this.diffX;
                        this.setState(function (prevState) {
                            if (y_1 < 0) {
                                y_1 = 0;
                            }
                            if (x_1 < 0) {
                                x_1 = 0;
                            }
                            if (y_1 > prevState.naturalHeight - _this.state.selectorWidth) {
                                y_1 = prevState.naturalHeight - _this.state.selectorWidth;
                            }
                            if (x_1 > prevState.naturalWidth - _this.state.selectorWidth) {
                                x_1 = prevState.naturalWidth - _this.state.selectorWidth;
                            }
                            return {
                                selectorTop: y_1,
                                selectorLeft: x_1
                            };
                        });
                    }
                    break;
                case 'mouseup':
                    this.dragging = null;
                    break;
                case 'mouseleave':
                    this.dragging = null;
                    break;
            }
        }
    };
    UserCenterConfigAvatar.prototype.handleSubmit = function () {
        var _this = this;
        var canvas = this.newAvatar;
        var ctx = canvas.getContext('2d');
        var x = this.state.selectorLeft, y = this.state.selectorTop, width = this.state.selectorWidth;
        canvas.width = width;
        canvas.height = width;
        ctx.drawImage(this.state.img, x, y, width, width, 0, 0, width, width);
        canvas.toBlob(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var file, avatar, token, url, myHeaders, data, res, userInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = new File([result], '头像.jpg', { type: 'image/jpeg', lastModified: Date.now() });
                        return [4 /*yield*/, Utility.uploadFile(file)];
                    case 1:
                        avatar = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.setState({
                            isLoading: true
                        });
                        token = Utility.getLocalStorage('accessToken');
                        url = 'http://apitest.niconi.cc/user/portrait';
                        myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', token);
                        data = "http://apitest.niconi.cc" + avatar.content;
                        return [4 /*yield*/, fetch(url, {
                                method: 'PUT',
                                headers: myHeaders,
                                body: JSON.stringify(data)
                            })];
                    case 3:
                        res = _a.sent();
                        if (res.status === 200) {
                            this.setState({
                                info: '修改成功',
                                avatarNow: data,
                                isLoading: false,
                                isShown: false,
                                divheight: 0
                            });
                            userInfo = Utility.getLocalStorage('userInfo');
                            userInfo.portraitUrl = data;
                            this.props.changeUserInfo(userInfo);
                        }
                        else {
                            throw {};
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.setState({
                            info: '修改失败',
                            isLoading: false,
                            isShown: false,
                            divheight: 0
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); }, 'image/jpeg', 0.75);
    };
    UserCenterConfigAvatar.prototype.handleResizeMove = function (event) {
        var _this = this;
        switch (event.type) {
            case 'mousedown':
                this.diffX = event.clientX - event.target.offsetLeft;
                this.dragging = event.target;
                break;
            case 'mousemove':
                if (this.dragging !== null) {
                    this.diffY = event.clientX - event.target.offsetLeft;
                    this.setState(function (prevState) {
                        var num = prevState.selectorWidth + _this.diffY - _this.diffX;
                        var max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
                        if (!isNaN(num)) {
                            if (num < 100) {
                                num = 100;
                            }
                            if (num > max) {
                                num = max;
                            }
                        }
                        return {
                            selectorWidth: isNaN(num) ? prevState.selectorWidth : num
                        };
                    });
                }
                break;
            case 'mouseup':
                this.dragging = null;
                break;
            case 'mouseleave':
                this.dragging = null;
                break;
        }
    };
    UserCenterConfigAvatar.prototype.handleCoverMouseMove = function (e) {
        var _this = this;
        switch (e.type) {
            case 'mouseup':
                this.dragging = null;
                break;
            case 'mousemove':
                if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
                    this.diffY = e.clientX - this.dragging.offsetLeft;
                    this.setState(function (prevState) {
                        var num = prevState.selectorWidth + _this.diffY - _this.diffX;
                        if (!isNaN(num)) {
                            var max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
                            if (num < 100) {
                                num = 100;
                            }
                            if (num > max) {
                                num = max;
                            }
                        }
                        return {
                            selectorWidth: isNaN(num) ? prevState.selectorWidth : num
                        };
                    });
                }
                else if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'selector') {
                    var y_2 = e.clientY - this.diffY, x_2 = e.clientX - this.diffX;
                    this.setState(function (prevState) {
                        if (y_2 < 0) {
                            y_2 = 0;
                        }
                        if (x_2 < 0) {
                            x_2 = 0;
                        }
                        if (y_2 > prevState.naturalHeight - _this.state.selectorWidth) {
                            y_2 = prevState.naturalHeight - _this.state.selectorWidth;
                        }
                        if (x_2 > prevState.naturalWidth - _this.state.selectorWidth) {
                            x_2 = prevState.naturalWidth - _this.state.selectorWidth;
                        }
                        return {
                            selectorTop: y_2,
                            selectorLeft: x_2
                        };
                    });
                }
                break;
        }
    };
    UserCenterConfigAvatar.prototype.render = function () {
        var _this = this;
        var style = {
            display: 'none'
        };
        var userInfo = Utility.getLocalStorage('userInfo');
        return (React.createElement("div", null,
            React.createElement("h2", null, "\u4FEE\u6539\u5934\u50CF"),
            React.createElement("div", { className: "user-center-config-avatar" },
                React.createElement("img", { src: this.state.avatarNow }),
                React.createElement("div", null,
                    React.createElement("button", { id: "chooseDefaultAvatar", type: "button" }, "\u9009\u62E9\u8BBA\u575B\u5934\u50CF"),
                    React.createElement("div", null,
                        React.createElement("input", { onChange: this.handleChange, id: "uploadAvatar", type: "file", style: style }),
                        React.createElement("label", { htmlFor: "uploadAvatar" },
                            React.createElement("p", null, "\u9009\u62E9\u672C\u5730\u56FE\u7247")),
                        React.createElement("p", { style: { color: 'red' } }, this.state.info),
                        React.createElement("button", { type: "button", style: this.state.isShown ? {} : style, onClick: this.handleSubmit, disabled: this.state.isLoading }, "\u63D0\u4EA4"))),
                React.createElement("div", { className: "user-center-config-avatar-preview", style: this.state.isShown ? { opacity: 1, marginTop: '2rem' } : { zIndex: -1 } },
                    React.createElement("hr", null),
                    React.createElement("div", { style: { position: 'absolute', width: '824px', overflow: 'hidden', paddingBottom: '50px' } },
                        React.createElement("canvas", { id: "newAvatar", style: style, ref: function (a) { _this.newAvatar = a; } }),
                        React.createElement("canvas", { ref: function (canvas) { _this.myCanvas = canvas; }, style: { position: 'relative' } }),
                        React.createElement("div", { id: "cover", ref: function (div) { _this.cover = div; }, style: { width: this.state.divWidth + "px", height: this.state.divheight + "px", top: 0 } }),
                        React.createElement("div", { className: "imgdata", ref: function (div) { _this.selector = div; }, style: this.state.isShown ? { width: this.state.selectorWidth + "px", height: this.state.selectorWidth + "px", borderRadius: this.state.selectorWidth / 2 + "px", top: this.state.selectorTop + "px", left: this.state.selectorLeft + "px" } : style },
                            React.createElement("img", { src: this.state.avatarURL, style: { position: 'relative', top: "-" + this.state.selectorTop + "px", left: "-" + this.state.selectorLeft + "px" } })),
                        React.createElement("div", { id: "selector", ref: function (div) { _this.selector = div; }, style: this.state.isShown ? { width: this.state.selectorWidth + "px", height: this.state.selectorWidth + "px", borderRadius: this.state.selectorWidth / 2 + "px", top: this.state.selectorTop + "px", left: this.state.selectorLeft + "px" } : style }),
                        React.createElement("span", { id: "resize", ref: function (span) { _this.resize = span; }, style: { top: this.state.selectorWidth + this.state.selectorTop + "px", left: this.state.selectorWidth + this.state.selectorLeft + "px" } })),
                    React.createElement("img", { onLoad: function (e) { _this.handleIMGLoad(e.target.naturalWidth, e.target.naturalHeight, e.target); }, style: style, src: this.state.avatarURL })),
                React.createElement("div", { style: { width: '100%', height: this.state.divheight + "px", transitionDuration: '.5s' } }))));
    };
    return UserCenterConfigAvatar;
}(React.Component));
function mapDispatch(dispatch) {
    return {
        changeUserInfo: function (newInfo) {
            dispatch(Actions_1.changeUserInfo(newInfo));
        }
    };
}
exports.default = react_redux_1.connect(function () { return (null); }, mapDispatch)(UserCenterConfigAvatar);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UserCenterConfigSignature = /** @class */ (function (_super) {
    __extends(UserCenterConfigSignature, _super);
    function UserCenterConfigSignature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterConfigSignature.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("h2", null, "\u4FEE\u6539\u7B7E\u540D\u6863"),
            React.createElement("div", { className: "user-center-config-signature" },
                React.createElement("textarea", { id: "signature", onChange: function (e) { _this.props.onchange(e.target.value); }, value: this.props.signature }),
                React.createElement("div", null,
                    React.createElement("p", null, "\u6CE8* \u4E2A\u6027\u7B7E\u540D\u5C06\u5728\u4E2A\u4EBA\u4E3B\u9875\u3001\u53D1\u5E03\u6587\u7AE0\u3001\u56DE\u590D\u6587\u7AE0\u4E2D\u663E\u793A")))));
    };
    return UserCenterConfigSignature;
}(React.Component));
exports.UserCenterConfigSignature = UserCenterConfigSignature;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(127);
var UserCenterConfigOthers = /** @class */ (function (_super) {
    __extends(UserCenterConfigOthers, _super);
    function UserCenterConfigOthers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterConfigOthers.prototype.render = function () {
        var _this = this;
        var array = [], i = 0;
        //年
        i = 100;
        while (i--) {
            array.unshift(i + 1920);
        }
        var yearsOption = array.map(function (item) { return (React.createElement("option", { value: item }, item)); });
        yearsOption.unshift(React.createElement("option", { value: 9999 }, "\u4FDD\u5BC6"));
        yearsOption.unshift(React.createElement("option", { value: 0 }, "\u672A\u9009\u62E9"));
        array = [];
        //月
        i = 12;
        while (i--) {
            array.unshift(i + 1);
        }
        var mouthsOption = array.map(function (item) { return (React.createElement("option", { value: item }, item)); });
        mouthsOption.unshift(React.createElement("option", { value: 0 }, "\u672A\u9009\u62E9"));
        array = [];
        //日
        i = 31;
        while (i--) {
            array.unshift(i + 1);
        }
        var daysOption = array.map(function (item) { return (React.createElement("option", { value: item }, item)); });
        daysOption.unshift(React.createElement("option", { value: 0 }, "\u672A\u9009\u62E9"));
        return (React.createElement("div", { className: "user-center-config-others" },
            React.createElement("h2", null, "\u5176\u4ED6\u8BBE\u7F6E"),
            React.createElement("div", { className: "config-gender" },
                React.createElement("p", null, "\u6027\u522B\uFF1A"),
                React.createElement("select", { id: "genderSelect", name: "Gender", value: this.props.userinfo.Gender, onChange: function (e) { _this.props.handleChange(e.target.name, Number.parseInt(e.target.value)); } },
                    React.createElement("option", { value: 1 }, "\u7537"),
                    React.createElement("option", { value: 0 }, "\u5973"))),
            React.createElement("div", { className: "config-birthday" },
                React.createElement("p", null, "\u751F\u65E5\uFF1A"),
                React.createElement("select", { id: "birthdayYear", name: "birthdayYear", value: this.props.userinfo.birthdayYear, onChange: function (e) { _this.props.handleChange(e.target.name, Number.parseInt(e.target.value)); } }, yearsOption),
                React.createElement("p", null, "\u5E74"),
                React.createElement("select", { id: "birthdayMouth", name: "birthdayMouth", value: this.props.userinfo.birthdayMouth, disabled: this.props.userinfo.birthdayYear === 0, onChange: function (e) { _this.props.handleChange(e.target.name, Number.parseInt(e.target.value)); } }, mouthsOption),
                React.createElement("p", null, "\u6708"),
                React.createElement("select", { id: "birthdayDay", name: "birthdayDay", value: this.props.userinfo.birthdayDay, disabled: this.props.userinfo.birthdayYear === 0, onChange: function (e) { _this.props.handleChange(e.target.name, Number.parseInt(e.target.value)); } }, daysOption),
                React.createElement("p", null, "\u65E5")),
            React.createElement("div", { className: "config-text" },
                React.createElement("p", null, "QQ\uFF1A"),
                React.createElement("input", { type: "number", name: "QQ", value: this.props.userinfo.QQ, maxLength: 20, onChange: function (e) { _this.props.handleChange(e.target.name, e.target.value); } })),
            React.createElement("div", { className: "config-text" },
                React.createElement("p", null, "\u90AE\u7BB1\uFF1A"),
                React.createElement("input", { type: "email", name: "EmailAddress", value: this.props.userinfo.EmailAddress, maxLength: 150, onChange: function (e) { _this.props.handleChange(e.target.name, e.target.value); } })),
            React.createElement("div", { className: "config-introduction" },
                React.createElement("p", null, "\u4E2A\u4EBA\u7B80\u4ECB\uFF1A"),
                React.createElement("div", null,
                    React.createElement("textarea", { name: "Introduction", value: this.props.userinfo.Introduction, maxLength: 100, onChange: function (e) { _this.props.handleChange(e.target.name, e.target.value); } }),
                    React.createElement("p", null, "*\u4E0D\u8D85\u8FC7100\u5B57")))));
    };
    return UserCenterConfigOthers;
}(React.Component));
exports.UserCenterConfigOthers = UserCenterConfigOthers;
var UserInfo = /** @class */ (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserInfo;
}(AppState_1.ChangeUserInfo));


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表示应用程序的状态。
 */
var AppState = /** @class */ (function () {
    function AppState() {
    }
    return AppState;
}());
exports.AppState = AppState;
/**
 * 投票状态
 */
var TopicVoteState = /** @class */ (function () {
    function TopicVoteState() {
    }
    return TopicVoteState;
}());
exports.TopicVoteState = TopicVoteState;
/**
 * 发帖内容状态
 */
var PostTopicState = /** @class */ (function () {
    function PostTopicState() {
    }
    return PostTopicState;
}());
exports.PostTopicState = PostTopicState;
/**
 * 作者信息状态
 */
var AuthorMessageState = /** @class */ (function () {
    function AuthorMessageState() {
    }
    return AuthorMessageState;
}());
exports.AuthorMessageState = AuthorMessageState;
/**
 * 题目信息状态
 */
var TopicTitleState = /** @class */ (function () {
    function TopicTitleState() {
    }
    return TopicTitleState;
}());
exports.TopicTitleState = TopicTitleState;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState() {
    }
    return ContentState;
}());
exports.ContentState = ContentState;
/**
 * 点赞信息状态
 */
var TopicGoodState = /** @class */ (function () {
    function TopicGoodState() {
    }
    return TopicGoodState;
}());
exports.TopicGoodState = TopicGoodState;
/**
 * 回复者状态
 */
var ReplierState = /** @class */ (function () {
    function ReplierState() {
    }
    return ReplierState;
}());
exports.ReplierState = ReplierState;
/**
 * 首页话题信息状态
 * 拥有一个属性mainPageTopicState，为MainPageTopic类数组，用于存放组件所需的主题信息（一般为10条）
 **/
var MainPageTopicState = /** @class */ (function () {
    function MainPageTopicState() {
    }
    return MainPageTopicState;
}());
exports.MainPageTopicState = MainPageTopicState;
var ListHeadState = /** @class */ (function () {
    function ListHeadState() {
    }
    return ListHeadState;
}());
exports.ListHeadState = ListHeadState;
var ListNoticeState = /** @class */ (function () {
    function ListNoticeState() {
    }
    return ListNoticeState;
}());
exports.ListNoticeState = ListNoticeState;
var ListTagState = /** @class */ (function () {
    function ListTagState() {
    }
    return ListTagState;
}());
exports.ListTagState = ListTagState;
/**
 * 内容列表页面的状态。
 */
var ListContentState = /** @class */ (function () {
    function ListContentState() {
    }
    return ListContentState;
}());
exports.ListContentState = ListContentState;
var TopicTitleAndContentState = /** @class */ (function () {
    /*  constructor(title, authorName, lastReply) {
          this.authorName = authorName;
          this.lastReply = lastReply;
            this.title = title;
      }*/
    function TopicTitleAndContentState() {
        //this.userName = userName;
        //this.title = title;
        //this.id = topicid;
        //this.userId = userId;
        //this.lastPostUser = lastPostUser;
        //this.lastPostTime = lastPostTime;
        //this.likeCount = likeCount;
        //this.dislikeCount = dislikeCount;
        //this.replyCount = replyCount;
        //this.highlightInfo = highlightInfo;
        //this.topState = topState;
        //this.state = state;
    }
    return TopicTitleAndContentState;
}());
exports.TopicTitleAndContentState = TopicTitleAndContentState;
/**
 * 定义页码列表组件的状态。
 */
var ListPagerState = /** @class */ (function () {
    function ListPagerState() {
    }
    return ListPagerState;
}());
exports.ListPagerState = ListPagerState;
var PagerState = /** @class */ (function () {
    function PagerState(page) {
        this.pageNumber = page;
    }
    return PagerState;
}());
exports.PagerState = PagerState;
var TopicState = /** @class */ (function () {
    function TopicState(userName, title, content, time, signature, userImgUrl, hitCount, userId, likeNumber, dislikeNumber, postId, isAnonymous, contentType, isFollowing, fanCount, masters) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.hitCount = hitCount;
        this.userId = userId;
        this.likeNumber = likeNumber;
        this.dislikeNumber = dislikeNumber;
        this.postId = postId;
        this.isAnonymous = isAnonymous;
        this.contentType = contentType;
        this.isFollowing = isFollowing;
        this.fanCount = fanCount;
        this.masters = masters;
    }
    return TopicState;
}());
exports.TopicState = TopicState;
/**
 * 登录状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());
exports.LoginState = LoginState;
/**
 * 已登录状态
 */
var AlreadyLoginState = /** @class */ (function () {
    function AlreadyLoginState() {
    }
    return AlreadyLoginState;
}());
exports.AlreadyLoginState = AlreadyLoginState;
/**
 * 版面类
 */
var Board = /** @class */ (function () {
    //构造方法
    function Board(name, todayPostCount, totalPostCount, boardID, master) {
        this.name = name;
        this.todayPostCount = todayPostCount;
        this.totalPostCount = totalPostCount;
        this.id = boardID;
        this.masters = master;
    }
    return Board;
}());
exports.Board = Board;
var BoardState = /** @class */ (function () {
    function BoardState() {
    }
    return BoardState;
}());
exports.BoardState = BoardState;
/**
* 用户信息
*/
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
* 表示用户最近帖子
*/
var UserRecentPost = /** @class */ (function () {
    function UserRecentPost() {
    }
    return UserRecentPost;
}());
exports.UserRecentPost = UserRecentPost;
/**
 * 表示用户粉丝信息
 */
var UserFanInfo = /** @class */ (function () {
    function UserFanInfo() {
    }
    return UserFanInfo;
}());
exports.UserFanInfo = UserFanInfo;
/**
* 用户收藏的版面信息
*/
var UserFavoritesBoardInfo = /** @class */ (function () {
    function UserFavoritesBoardInfo() {
    }
    return UserFavoritesBoardInfo;
}());
exports.UserFavoritesBoardInfo = UserFavoritesBoardInfo;
/**
* 修改用户信息所要提交的body
*/
var ChangeUserInfo = /** @class */ (function () {
    function ChangeUserInfo() {
    }
    return ChangeUserInfo;
}());
exports.ChangeUserInfo = ChangeUserInfo;


/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);