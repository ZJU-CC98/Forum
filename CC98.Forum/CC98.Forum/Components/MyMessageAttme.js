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
var MyMessageResponsebox_1 = require("./MyMessageResponsebox");
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MyMessageAttme = (function (_super) {
    __extends(MyMessageAttme, _super);
    function MyMessageAttme(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageResponse = function (item) {
            return React.createElement(MyMessageResponsebox_1.MyMessageResponsebox, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
        };
        _this.state = {
            data: [],
        };
        return _this;
    }
    MyMessageAttme.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, accessToken, people, data, startPage, response, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = location.href.match(/access_token=(\S+)/);
                        if (token) {
                            accessToken = token[1];
                        }
                        ;
                        people = [];
                        data = [];
                        startPage = -49;
                        _c.label = 1;
                    case 1:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=receive', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _c.sent();
                        //从最近50条消息中获取回复信息，并存储在people中
                        for (i in data) {
                            //系统消息统统筛掉
                            if (data[i].title == '@提示') {
                                people.push({ id: data[i].id, senderName: data[i].senderName, receiverName: data[i].receiverName, title: data[i].title, content: data[i].content, isRead: data[i].isRead, sendTime: data[i].sendTime, chatPortraitUrl: '', myPortraitUrl: '' });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        if (data.length % 50 == 0) return [3 /*break*/, 1];
                        _c.label = 5;
                    case 5:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].senderName)];
                    case 7:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 8:
                        person = _c.sent();
                        people[i].chatPortraitUrl = person.portraitUrl;
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.setState({ data: people });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMessageAttme.prototype.render = function () {
        //给我的回复添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#attme').addClass('mymessage-nav-focus');
        return React.createElement("div", { className: 'mymessage-response' }, this.state.data.map(this.coverMessageResponse));
    };
    return MyMessageAttme;
}(React.Component));
exports.MyMessageAttme = MyMessageAttme;
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
//# sourceMappingURL=MyMessageAttme.js.map