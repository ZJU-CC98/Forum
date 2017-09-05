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
var React = require("react");
var Utility = require("../Utility");
var react_router_dom_1 = require("react-router-dom");
var RouteComponent = (function (_super) {
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
var List = (function (_super) {
    __extends(List, _super);
    function List(props, context) {
        var _this = _super.call(this, props, context) || this;
        // 默认页码
        _this.state = { page: 1, totalPage: 1, boardid: _this.match.params.boardid };
        return _this;
    }
    List.prototype.getTotalListPage = function (boardid) {
        return __awaiter(this, void 0, void 0, function () {
            var totalTopicCountResponse, totalTopicCountJson, totalTopicCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + boardid)];
                    case 1:
                        totalTopicCountResponse = _a.sent();
                        return [4 /*yield*/, totalTopicCountResponse.json()];
                    case 2:
                        totalTopicCountJson = _a.sent();
                        totalTopicCount = totalTopicCountJson.totalTopicCount;
                        return [2 /*return*/, (totalTopicCount - totalTopicCount % 20) / 20 + 1];
                }
            });
        });
    };
    List.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, boardid, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 未提供页码，防止出错不进行后续处理
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        boardid = this.match.params.boardid;
                        return [4 /*yield*/, this.getTotalListPage(boardid)];
                    case 1:
                        totalPage = _a.sent();
                        // 设置状态
                        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, boardid, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 未提供页码，防止出错不进行后续处理
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        boardid = this.match.params.boardid;
                        return [4 /*yield*/, this.getTotalListPage(boardid)];
                    case 1:
                        totalPage = _a.sent();
                        // 设置状态
                        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.render = function () {
        return React.createElement("div", { id: "listRoot", style: { marginTop: "40px" } },
            React.createElement(ListHead, { key: this.state.page, boardid: this.state.boardid }),
            React.createElement(ListNotice, null),
            React.createElement(ListButtonAndPager, { page: this.state.page, totalPage: this.state.totalPage, boardid: this.state.boardid }),
            React.createElement(ListTag, null),
            React.createElement(react_router_dom_1.Route, { path: "/list/:boardid/:page?", component: ListContent }));
    };
    return List;
}(RouteComponent));
exports.List = List;
var ListHead = (function (_super) {
    __extends(ListHead, _super);
    function ListHead(props, content) {
        var _this = _super.call(this, props, content) || this;
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
            isLocked: false
        };
        return _this;
    }
    ListHead.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, managersResponse, managerJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://api.cc98.org/Board/" + this.props.boardid;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        managersResponse = _a.sent();
                        return [4 /*yield*/, managersResponse.json()];
                    case 2:
                        managerJson = _a.sent();
                        this.setState({ listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.componentWillRecieveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var url, managersResponse, managerJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://api.cc98.org/Board/" + newProps.boardid;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        managersResponse = _a.sent();
                        return [4 /*yield*/, managersResponse.json()];
                    case 2:
                        managerJson = _a.sent();
                        this.setState({ listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.generateMasters = function (item) {
        var name = item.toString();
        var userName = encodeURIComponent(item.toString());
        var webUrl = "/user/name/" + userName;
        return React.createElement("div", { style: { marginRight: "10px" } },
            React.createElement("a", { href: webUrl }, name));
    };
    ListHead.prototype.render = function () {
        return React.createElement("div", { className: "column", style: { width: '1140px', } },
            React.createElement("div", { className: "row", style: { flexDirection: 'row', justifyContent: 'space-between', width: '1140px' } },
                React.createElement("div", { style: { flexgrow: '1', flexDirection: 'row', display: 'flex' } },
                    React.createElement("div", { id: "ListImg" },
                        React.createElement("img", { src: this.state.imgUrl })),
                    React.createElement("div", { className: "column", style: { marginTop: '20px', marginLeft: '10px' } },
                        React.createElement("div", { className: "row", style: { marginTop: '10px' } },
                            React.createElement("div", null, "\u4ECA\u65E5\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: "10px" } }, this.state.todayTopics)),
                        React.createElement("div", { className: "row", style: { marginTop: '10px' } },
                            React.createElement("div", null, "\u603B\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: "20px" } }, this.state.totalTopics)))),
                React.createElement("div", { className: "column", style: { flexgrow: '0' } },
                    React.createElement("div", { id: "like" },
                        React.createElement("button", { style: { border: 'none', color: '#F5FAFC' } }, "\u2730"),
                        "  \u6536\u85CF\u7248\u9762"),
                    React.createElement("div", null,
                        React.createElement("img", { src: this.state.adsUrl, style: { width: '250px', height: '60px' } })))),
            React.createElement("div", { className: "row", style: { marginTop: '5px' } },
                React.createElement("span", null, "\u7248\u4E3B : "),
                React.createElement("div", { className: "row", style: { marginLeft: '5px' } }, this.state.listManager.map(this.generateMasters))));
    };
    return ListHead;
}(RouteComponent));
exports.ListHead = ListHead;
var ListNotice = (function (_super) {
    __extends(ListNotice, _super);
    function ListNotice(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
        };
        return _this;
    }
    ListNotice.prototype.render = function () {
        return React.createElement("div", { className: "notice", style: { marginTop: '10px' } },
            React.createElement("div", { id: "noticeName" },
                React.createElement("span", { style: { marginLeft: '15px', marginTop: '7px', color: '#FFFFFF' } }, "\u672C\u7248\u516C\u544A")),
            React.createElement("span", { style: { marginLeft: '15px', marginTop: '15px', marginRight: '15px' } }, this.state.notice));
    };
    return ListNotice;
}(RouteComponent));
exports.ListNotice = ListNotice;
/**
 * 提供显示连续页码的交互效果。
 */
var ListButtonAndPager = (function (_super) {
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
        return React.createElement(PageModel, { pageNumber: pageNumber, boardid: this.props.boardid, curPage: this.props.page, totalPage: this.props.totalPage });
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
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { style: { marginBottom: "20px" } },
                React.createElement("button", { className: "button orange" }, "\u53D1\u4E3B\u9898"),
                React.createElement("button", { className: "button green", style: { marginLeft: "20px" } }, "\u53D1\u6295\u7968")),
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return ListButtonAndPager;
}(React.Component));
exports.ListButtonAndPager = ListButtonAndPager;
var PageModel = (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var last = '<';
        var next = '>';
        var start = '<<';
        var end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = "/list/" + this.props.boardid + "/" + this.props.pageNumber;
            if (this.props.pageNumber != this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link" }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link " }, this.props.pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            var pageUrl = "/list/" + this.props.boardid + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, last));
        }
        else if (this.props.pageNumber == -2) {
            var pageUrl = "/list/" + this.props.boardid + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, next));
        }
        else if (this.props.pageNumber == -3) {
            var pageUrl = "/list/" + this.props.boardid + "/1";
            return React.createElement("li", { className: "page-item" },
                " ",
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, start));
        }
        else if (this.props.pageNumber == -4) {
            var pageUrl = "/list/" + this.props.boardid + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, end));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
var ListTag = (function (_super) {
    __extends(ListTag, _super);
    function ListTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListTag.prototype.render = function () {
        return React.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '1140px', borderTop: 'dashed #EAEAEA thin', marginTop: '25px', marginBottom: '25px' } },
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
var ListContent = (function (_super) {
    __extends(ListContent, _super);
    function ListContent() {
        var _this = _super.call(this) || this;
        _this.state = { items: [] };
        return _this;
    }
    ListContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBoardTopicAsync(1, this.match.params.boardid)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.title, title: item.title, authorName: item.authorName, id: item.id, authorId: item.authorId });
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
                        return [4 /*yield*/, Utility.getBoardTopicAsync(page, this.match.params.boardid)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.render = function () {
        return React.createElement("div", { className: "listContent " },
            React.createElement("div", { className: "row", style: { justifyContent: 'space-between', } },
                React.createElement("div", { className: "row", style: { height: '40px', marginTop: "5px", alignItems: "center" } },
                    React.createElement("button", { className: "listContentTag" }, "\u5168\u90E8"),
                    React.createElement("button", { className: "listContentTag" }, "\u7CBE\u534E"),
                    React.createElement("button", { className: "listContentTag" }, "\u6700\u70ED")),
                React.createElement("div", { className: "row", style: { height: '40px', alignItems: 'center' } },
                    React.createElement("div", { style: { marginRight: '152px', marginLeft: '15px' } },
                        React.createElement("span", null, "\u4F5C\u8005")),
                    React.createElement("div", { style: { marginRight: '85px', marginLeft: '15px' } },
                        React.createElement("span", null, "\u6700\u540E\u53D1\u8868")))),
            React.createElement("div", null, this.state.items.map(this.convertTopicToElement)));
    };
    return ListContent;
}(RouteComponent));
exports.ListContent = ListContent;
var TopicTitleAndContent = (function (_super) {
    __extends(TopicTitleAndContent, _super);
    function TopicTitleAndContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            title: _this.props.title,
            authorName: _this.props.authorName,
            likeNumber: 123,
            unlikeNumber: 11,
            commentNumber: 214,
            lastReply: 'Dearkano 2017-2-2',
            id: _this.props.id,
            authorId: _this.props.authorId
        };
        return _this;
    }
    TopicTitleAndContent.prototype.render = function () {
        var url = "/topic/" + this.state.id;
        return React.createElement("div", { id: "changeColor" },
            React.createElement("div", { className: "row topicInList" },
                React.createElement(react_router_dom_1.Link, { to: url },
                    React.createElement("div", { style: { marginLeft: '20px', } },
                        " ",
                        React.createElement("span", null, this.state.title))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { style: { marginRight: '10px', marginLeft: '15px', width: '80px' } },
                        " ",
                        React.createElement("span", null,
                            React.createElement("a", null, this.state.authorName))),
                    React.createElement("div", { className: "row", style: { flexDirection: 'row', alignItems: 'flex-end' } },
                        React.createElement("div", { id: "liked" },
                            React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.likeNumber)),
                        React.createElement("div", { id: "disliked" },
                            React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.unlikeNumber)),
                        React.createElement("div", { id: "commentsAmount" },
                            React.createElement("i", { className: "fa fa-commenting-o fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.commentNumber))),
                    React.createElement("div", { id: "lastReply" },
                        React.createElement("span", null, this.state.lastReply)))));
    };
    return TopicTitleAndContent;
}(React.Component));
exports.TopicTitleAndContent = TopicTitleAndContent;
//# sourceMappingURL=List.js.map