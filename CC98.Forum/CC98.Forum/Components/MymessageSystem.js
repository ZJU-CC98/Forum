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
var React = require("react");
var MymessagePerson_1 = require("./MymessagePerson");
var MymessageSystemwindow_1 = require("./MymessageSystemwindow");
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MymessageSystem = /** @class */ (function (_super) {
    __extends(MymessageSystem, _super);
    function MymessageSystem(props) {
        var _this = _super.call(this, props) || this;
        //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
        _this.coverMessagePerson = function (item) {
            var changeChatName = function () {
                _this.setState({ chatName: item.name, chatPortraitUrl: item.portraitUrl });
                //给选中的聊天对象添加选中效果
                $('.mymessage-message-pList > div').removeClass('mymessage-message-pFocus');
                $("#" + item.name).addClass('mymessage-message-pFocus');
            };
            return React.createElement("div", { onClick: changeChatName, id: "" + item.name },
                React.createElement(MymessagePerson_1.MymessagePerson, { name: item.name, portraitUrl: item.portraitUrl, title: item.title, content: item.content }));
        };
        _this.state = {
            data: [],
            chatName: '系统',
            chatPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            myName: '系统',
            myPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            token: 'testAccessToken'
        };
        return _this;
        //如果没有设置默认的state，render第一次渲染的时候state为空，MymessageWindow组件会报错
    }
    MymessageSystem.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var personNumber, accessToken, response1, myInfo, people, startPage, response2, data, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        personNumber = 40;
                        accessToken = location.href.match(/access_token=(\S+)&token_type/)[1];
                        return [4 /*yield*/, fetch('https://api.cc98.org/me', {
                                headers: {
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 1:
                        response1 = _c.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        myInfo = _c.sent();
                        people = [];
                        startPage = -49;
                        _c.label = 3;
                    case 3:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=both', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 4:
                        response2 = _c.sent();
                        return [4 /*yield*/, response2.json()];
                    case 5:
                        data = _c.sent();
                        //从最近50条收发短信中获取最多n位联系人，并存储在people中
                        for (i in data) {
                            //系统消息统统筛掉
                            if (data[i].title == '回复提示' || data[i].title == '@提示' || data[i].title == '转账通知' || data[i].title == '系统消息' || data[i].title == "\u7528\u6237\uFF1A" + myInfo.name + " \u5728\u5E16\u5B50\u4E2D\u56DE\u590D\u4E86\u4F60") {
                            }
                            else if (data[i].senderName == myInfo.name) {
                                if (!contains(people, data[i].receiverName)) {
                                    people.push({ name: data[i].receiverName, portraitUrl: '', title: data[i].title, content: data[i].content });
                                }
                            }
                            else if (data[i].senderName) {
                                if (!contains(people, data[i].senderName)) {
                                    people.push({ name: data[i].senderName, portraitUrl: '', title: data[i].title, content: data[i].content });
                                }
                            }
                            if (people.length >= personNumber) {
                                break;
                            }
                        }
                        _c.label = 6;
                    case 6:
                        if (people.length < personNumber) return [3 /*break*/, 3];
                        _c.label = 7;
                    case 7:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 8;
                    case 8:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].name)];
                    case 9:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 10:
                        person = _c.sent();
                        people[i].portraitUrl = person.portraitUrl;
                        _c.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 8];
                    case 12:
                        this.setState({ data: people, chatName: people[0].name, chatPortraitUrl: people[0].portraitUrl, myName: myInfo.name, myPortraitUrl: myInfo.portraitUrl, token: accessToken });
                        //默认选中第一个联系人
                        $("#" + people[0].name).addClass('mymessage-message-pFocus');
                        return [2 /*return*/];
                }
            });
        });
    };
    MymessageSystem.prototype.render = function () {
        //给我的私信添加选中样式
        $('.mysystem-nav > div').removeClass('mysystem-nav-focus');
        $('#mysystem').addClass('mysystem-nav-focus');
        return (React.createElement("div", { className: 'mymessage-system' },
            React.createElement(MymessageSystemwindow_1.MymessageSystemwindow, { chatName: this.state.chatName, chatPortraitUrl: this.state.chatPortraitUrl, myName: this.state.myName, myPortraitUrl: this.state.myPortraitUrl, token: this.state.token })));
    };
    return MymessageSystem;
}(React.Component));
exports.MymessageSystem = MymessageSystem;
//查找数组arr中是否存在元素的名字为obj
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=MymessageSystem.js.map