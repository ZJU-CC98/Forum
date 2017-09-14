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
var moment = require('moment');
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
        _this.state = { page: 1, topicid: _this.match.params.topicid, totalPage: 1, userName: null };
        return _this;
    }
    CurUserPost.prototype.componentWillReceiveProps = function (newProps) {
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
    CurUserPost.prototype.componentDidMount = function () {
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
    CurUserPost.prototype.getTotalPage = function (topicid) {
        return __awaiter(this, void 0, void 0, function () {
            var replyCountResponse, replyCountJson, replyCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                    case 1:
                        replyCountResponse = _a.sent();
                        return [4 /*yield*/, replyCountResponse.json()];
                    case 2:
                        replyCountJson = _a.sent();
                        replyCount = replyCountJson.replyCount;
                        if (replyCount > 10) {
                            return [2 /*return*/, (replyCount - replyCount % 10) / 10 + 1];
                        }
                        else {
                            return [2 /*return*/, 1];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.render = function () {
        var topic = null;
        if (this.state.page == 1) {
            topic = React.createElement(PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid, userName: this.state.userName });
        }
        return React.createElement("div", { className: "center", style: { overflowX: "scroll", minWidth: "1140px" } },
            React.createElement(TopicPager, { userName: this.state.userName, page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            topic,
            React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/user/:userName/:page?", component: Reply }));
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
        };
        return _this;
    }
    Reply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, realContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page;
                        if (newProps.match.params.page == undefined) {
                            page = 1;
                        }
                        this.Contents = Utility.getCurUserTopicContent(newProps.match.params.topicid, page, newProps.match.params.userName);
                        return [4 /*yield*/, this.Contents];
                    case 1:
                        realContents = _a.sent();
                        this.setState({ contents: realContents });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.generateContents = function (item) {
        return React.createElement("div", { id: "reply" },
            React.createElement(Replier, { key: item.id, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber }),
            React.createElement(ReplyContent, { key: item.content, content: item.content, signature: item.signature }));
    };
    Reply.prototype.render = function () {
        return React.createElement("div", { className: "center", style: { width: "1140px" } }, this.state.contents.map(this.generateContents));
    };
    return Reply;
}(RouteComponent));
exports.Reply = Reply;
var Replier = /** @class */ (function (_super) {
    __extends(Replier, _super);
    function Replier(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            imgUrl: "/images/authorImg.jpg",
            timeImgUrl: "/images/clock.jpg",
            userName: "VayneTian",
            replyTime: Date(),
            topicsNumber: 999,
            level: 2,
        };
        return _this;
    }
    Replier.prototype.render = function () {
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName;
        return React.createElement("div", { className: "replyRoot" },
            React.createElement("div", { className: "row", style: { width: "1140px", display: "flex", marginBottom: "10px" } },
                React.createElement("div", { id: "authorImg" },
                    React.createElement("img", { src: this.props.userImgUrl })),
                React.createElement("div", { className: "column", id: "rpymes" },
                    React.createElement("div", { className: "row", id: "replierMes" },
                        React.createElement("div", { style: { marginLeft: "10px" } },
                            React.createElement("span", null,
                                this.props.floor,
                                "L")),
                        React.createElement("div", { className: "rpyClr", style: { marginLeft: "10px" } }, this.props.userName),
                        React.createElement("div", { id: "topicsNumber", style: { marginLeft: "10px" } },
                            "\u8D34\u6570   ",
                            React.createElement("span", { className: "rpyClrodd" }, this.props.sendTopicNumber),
                            " ")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { id: "clockimg", style: { marginLeft: "6px" } },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "timeProp" }, moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss'))))),
                React.createElement("div", { id: "operation" },
                    React.createElement("button", { className: "operation" }, "\u5F15\u7528"),
                    React.createElement("button", { className: "operation" }, "\u7F16\u8F91"),
                    React.createElement("button", { className: "operation" }, "\u79C1\u4FE1"),
                    React.createElement("button", { className: "operation" }, "\u4E3E\u62A5"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"))));
    };
    return Replier;
}(RouteComponent));
exports.Replier = Replier;
var PostTopic = /** @class */ (function (_super) {
    __extends(PostTopic, _super);
    function PostTopic(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            topicMessage: { title: "ss", time: "2017" }
        };
        return _this;
    }
    PostTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topicMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getTopic(this.props.topicid)];
                    case 1:
                        topicMessage = _a.sent();
                        this.setState({ topicMessage: topicMessage });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostTopic.prototype.render = function () {
        if (this.props.userName == this.state.topicMessage.userName) {
            return React.createElement("div", { className: "root" },
                React.createElement("div", { className: "essay" },
                    React.createElement(AuthorMessage, { AuthorName: this.state.topicMessage.userName, authorImgUrl: this.state.topicMessage.userImgUrl }),
                    React.createElement(TopicTitle, { Title: this.state.topicMessage.title, Time: this.state.topicMessage.time, HitCount: this.state.topicMessage.hitCount }),
                    React.createElement("div", { id: "ads" },
                        React.createElement("img", { src: this.props.imgUrl }))),
                React.createElement(TopicContent, { content: this.state.topicMessage.content, signature: this.state.topicMessage.signature }),
                React.createElement(TopicGood, null),
                React.createElement(TopicVote, null));
        }
        else {
            return null;
        }
    };
    return PostTopic;
}(RouteComponent));
exports.PostTopic = PostTopic;
var AuthorMessage = /** @class */ (function (_super) {
    __extends(AuthorMessage, _super);
    function AuthorMessage(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: "Mana",
            fansNumber: 233,
            imgUrl: _this.props.authorImgUrl
        };
        return _this;
    }
    AuthorMessage.prototype.render = function () {
        return React.createElement("div", { className: "row", id: "authormes" },
            React.createElement("div", { id: "authorImg" },
                React.createElement("img", { src: this.props.authorImgUrl })),
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "row authorFans", style: { justifyContent: "space-between" } },
                    React.createElement("div", { id: "authorName" },
                        React.createElement("p", null, this.props.AuthorName)),
                    React.createElement("div", { id: "fans", className: "row" },
                        React.createElement("div", { style: { marginRight: "3px" } }, "\u7C89\u4E1D"),
                        React.createElement("div", { style: { color: "#EE0000" } }, this.state.fansNumber))),
                React.createElement("div", { className: "row" },
                    React.createElement("button", { id: "watch" }, "\u5173\u6CE8"),
                    React.createElement("button", { id: "email" }, "\u79C1\u4FE1"))));
    };
    return AuthorMessage;
}(RouteComponent));
exports.AuthorMessage = AuthorMessage;
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
            likeNumber: 666,
            unlikeNumber: 233,
            viewTimes: 2366
        };
        return _this;
    }
    TopicTitle.prototype.render = function () {
        return React.createElement("div", { id: "title" },
            React.createElement("div", { className: "column", id: "topicTitleProp" },
                React.createElement("div", { id: "essay1", className: "row" },
                    React.createElement("div", { id: "title1", className: "row" },
                        " ",
                        React.createElement("span", { className: "titleProp" }, this.state.isTop ? "【置顶】" : ""),
                        React.createElement("span", { className: "titleProp" },
                            this.state.isNotice ? "【公告】" : "",
                            " "),
                        React.createElement("span", { id: "essayTitle" }, this.props.Title))),
                React.createElement("div", { className: "row", id: "essayProp" },
                    React.createElement("div", { id: "tags" },
                        React.createElement("span", { className: "tagProp tagSize" },
                            "\u6807\u7B7E\uFF1A ",
                            this.state.tag),
                        React.createElement("span", { className: "tagProp" })),
                    React.createElement("div", { id: "time" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" }, moment(this.props.Time).format('YYYY-MM-DD HH:mm:ss'))),
                    React.createElement("div", { id: "viewtimes" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-eye fa-lg fa-fw" }),
                            "  "),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" },
                            this.props.HitCount,
                            "\u6B21")))),
            React.createElement("div", { className: "column", style: { width: "100px" } },
                React.createElement("div", { className: "row", style: { marginTop: "10px" } },
                    React.createElement("div", { id: "like", className: "tagSize" },
                        React.createElement("i", { className: "fa fa-star-o fa-lg" }),
                        React.createElement("span", { style: { marginLeft: "10px" } }, "\u6536\u85CF\u6587\u7AE0"))),
                React.createElement("div", { className: "row", style: { marginTop: "35px" } },
                    React.createElement("div", { id: "liked", className: "row tagSize" },
                        React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg fa-fw" }),
                        this.state.likeNumber),
                    React.createElement("div", { id: "disliked", className: "row tagSize" },
                        React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg fa-fw" }),
                        this.state.unlikeNumber))));
    };
    return TopicTitle;
}(RouteComponent));
exports.TopicTitle = TopicTitle;
var TopicContent = /** @class */ (function (_super) {
    __extends(TopicContent, _super);
    function TopicContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
        };
        return _this;
    }
    //<div className="signature">{this.state.Signature}</div>
    TopicContent.prototype.render = function () {
        return React.createElement("div", { className: "content" },
            React.createElement("div", { className: "substance" }, this.props.content),
            React.createElement("div", { className: "signature" }, this.props.signature),
            React.createElement("div", { className: "comment" },
                React.createElement("div", { id: "commentlike", className: "buttonFont" },
                    React.createElement("button", { className: "commentbutton" },
                        React.createElement("i", { className: "fa fa-star-o fa-lg" })),
                    "   \u6536\u85CF\u6587\u7AE0 "),
                React.createElement("div", { id: "commentliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.likeNumber)),
                React.createElement("div", { id: "commentunliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.dislikeNumber)),
                React.createElement("div", { id: "commentlike", className: "buttonFont row" },
                    " ",
                    React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206"),
                    React.createElement("div", { className: "commentbutton" }, "   \u7F16\u8F91"))));
    };
    return TopicContent;
}(RouteComponent));
exports.TopicContent = TopicContent;
var ReplyContent = /** @class */ (function (_super) {
    __extends(ReplyContent, _super);
    function ReplyContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 2424,
            dislikeNumber: 4433,
        };
        return _this;
    }
    //content: "央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。</p><p>央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。",
    //
    ReplyContent.prototype.render = function () {
        return React.createElement("div", { className: "root" },
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "substance" },
                    React.createElement("span", { style: { maxWidth: "1100px" } }, this.props.content)),
                React.createElement("div", { className: "signature" }, this.props.signature),
                React.createElement("div", { className: "comment" },
                    React.createElement("div", { id: "commentliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: "commentunliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike" },
                        " ",
                        React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206")))));
    };
    return ReplyContent;
}(RouteComponent));
exports.ReplyContent = ReplyContent;
var TopicGood = /** @class */ (function (_super) {
    __extends(TopicGood, _super);
    function TopicGood(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: "Mana",
            grade: 10,
            reward: 20,
            credit: "6666炒鸡赞",
            imgUrl: "/images/authorImg.jpg"
        };
        return _this;
    }
    TopicGood.prototype.render = function () {
        return React.createElement("div", { className: "good tagSize", style: { marginLeft: "2px" } },
            React.createElement("div", { id: "userImage" },
                React.createElement("img", { src: this.state.imgUrl }),
                " "),
            React.createElement("div", { id: "userName" },
                React.createElement("span", null, this.state.userName)),
            React.createElement("div", { id: "grades" },
                React.createElement("span", null, "\u8BC4\u5206 "),
                React.createElement("span", { id: "grade" },
                    "+",
                    this.state.grade)),
            React.createElement("div", { id: "reward" },
                React.createElement("span", null, "\u8D4F\u91D1 "),
                React.createElement("span", { id: "money" }, this.state.reward),
                React.createElement("span", null, "\u8BBA\u575B\u5E01")),
            React.createElement("div", { id: "credit" },
                React.createElement("span", null, this.state.credit)));
    };
    return TopicGood;
}(RouteComponent));
exports.TopicGood = TopicGood;
var TopicVote = /** @class */ (function (_super) {
    __extends(TopicVote, _super);
    function TopicVote(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            option: "我认为他说的很对",
            votes: 60,
            totalVotes: 220,
            voted: false,
        };
        return _this;
    }
    TopicVote.prototype.render = function () {
        return React.createElement("div", { className: "vote", style: { marginLeft: "2px" } },
            React.createElement("div", { className: "row" },
                React.createElement("input", { id: "checkbox", type: "checkbox" }),
                " ",
                React.createElement("span", { id: "option", style: { marginLeft: "15px" } },
                    this.state.option,
                    " ")),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "progress" },
                    React.createElement("div", { className: "voteResult" })),
                React.createElement("span", { style: { marginLeft: "15px" } }, this.state.votes),
                React.createElement("span", null,
                    " (",
                    this.state.votes / this.state.totalVotes * 100,
                    "%)")),
            React.createElement("div", { style: { marginLeft: "20px" } }, this.state.voted ? React.createElement("span", null, "\u4F60\u5DF2\u7ECF\u6295\u8FC7\u7968\u5566") : React.createElement("button", { className: "operation" }, "\u6295\u7968")));
    };
    return TopicVote;
}(RouteComponent));
exports.TopicVote = TopicVote;
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
        return React.createElement(PageModel, { userName: this.props.userName, pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                console.log("new=" + pages);
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
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPager;
}(RouteComponent));
exports.TopicPager = TopicPager;
var PageModel = /** @class */ (function (_super) {
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
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + this.props.pageNumber;
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
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, last));
        }
        else if (this.props.pageNumber == -2) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, next));
        }
        else if (this.props.pageNumber == -3) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/1";
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, start));
        }
        else {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, end));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
//# sourceMappingURL=CurUserPost.js.map