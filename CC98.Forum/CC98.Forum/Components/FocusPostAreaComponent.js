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
var FocusPostComponent_1 = require("./FocusPostComponent");
var Utility = require("../Utility");
/**
 * 表示我关注的某个版面的主题列表
 */
var FocusPostAreaComponent = (function (_super) {
    __extends(FocusPostAreaComponent, _super);
    /**
     * 构造函数
     * @param props
     */
    function FocusPostAreaComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            curPage: 1,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    FocusPostAreaComponent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getAllNewPost(this.state.curPage)];
                    case 1:
                        data = _a.sent();
                        this.setState({ data: data });
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    FocusPostAreaComponent.prototype.componentWillUnmount = function () {
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
    FocusPostAreaComponent.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *查看新帖数目大于100条时不再继续加载
                        */
                        if (this.state.curPage >= 5) {
                            $('#focus-post-loading').addClass('displaynone');
                            $('#focus-post-loaddone').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getAllNewPost(this.state.curPage + 1)];
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
                        /**
                        *如果正确获取到数据，则添加新数据，翻页+1，同时this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ data: this.state.data.concat(newData), curPage: this.state.curPage + 1, loading: true });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将主题排列好
     */
    FocusPostAreaComponent.prototype.render = function () {
        return React.createElement("div", { className: 'focus-post-area' },
            React.createElement("div", { className: 'focus-post-topicArea' }, this.state.data.map(coverFocusPost)),
            React.createElement("div", { className: 'focus-post-loading', id: 'focus-post-loading' },
                React.createElement("img", { src: 'http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif' })),
            React.createElement("div", { className: 'focus-post-loaddone displaynone', id: 'focus-post-loaddone' }, "---------------------- \u5DF2\u52A0\u8F7D100\u6761\u65B0\u5E16\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u66F4\u591A ----------------------"));
    };
    return FocusPostAreaComponent;
}(React.Component));
exports.FocusPostAreaComponent = FocusPostAreaComponent;
/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item) {
    return React.createElement(FocusPostComponent_1.FocusPostComponent, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, authorName: item.authorName, portraitUrl: item.portraitUrl, createTime: item.createTime, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}
/**
*滚动条在Y轴上的滚动距离
*/
function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
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
*文档的总高度
*/
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
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
*浏览器视口的高度
*/
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    }
    else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
/**
*判断滚动条是否滚动到底部
*/
function isBottom() {
    /*
    *预留100px给“正在加载”的提示标志
    */
    if (getScrollTop() + getWindowHeight() + 100 > getScrollHeight()) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=FocusPostAreaComponent.js.map