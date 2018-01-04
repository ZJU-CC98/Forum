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
var AppState_1 = require("../States/AppState");
//链接到的地址是  /list/boardid
var BoardID = (function (_super) {
    __extends(BoardID, _super);
    function BoardID(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            board: [],
            view1: false, view2: false, view3: false, view4: false,
        };
        return _this;
    }
    BoardID.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, board, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Board/Root")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        board = [];
                        for (i = 0; i < 20; i++) {
                            board[i] = new AppState_1.Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
                        }
                        console.log(board);
                        this.setState({
                            board: board,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardID.prototype.generateRootBoard = function (boards) {
        if (boards.id == 2) {
            if (this.state.view1 == true) {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" }, boards.name),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters),
                            React.createElement("button", { className: "hideBoard", onClick: this.view1.bind(this) }, "-")),
                        React.createElement(ChildBoard, { boardid: boards.id })),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
            else {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" }, boards.name),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters),
                            React.createElement("button", { className: "viewBoard", onClick: this.view1.bind(this) }, "+"))),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
        }
        else if (boards.id == 29) {
            if (this.state.view2 == true) {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "hideBoard", onClick: this.view2.bind(this) }, "-")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters)),
                        React.createElement(ChildBoard, { boardid: boards.id })),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
            else {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "viewBoard", onClick: this.view2.bind(this) }, "+")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters))),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
        }
        else if (boards.id == 35) {
            if (this.state.view3 == true) {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "hideBoard", onClick: this.view3.bind(this) }, "-")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters)),
                        React.createElement(ChildBoard, { boardid: boards.id })),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
            else {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "viewBoard", onClick: this.view3.bind(this) }, "+")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters))),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
        }
        else if (boards.id == 37) {
            if (this.state.view4 == true) {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "hideBoard", onClick: this.view4.bind(this) }, "-")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters)),
                        React.createElement(ChildBoard, { boardid: boards.id })),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
            else {
                return React.createElement("div", { className: "column" },
                    React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                        React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                            React.createElement("div", { className: "areaName" },
                                boards.name,
                                React.createElement("button", { className: "viewBoard", onClick: this.view4.bind(this) }, "+")),
                            React.createElement("div", { className: "areaName" },
                                "\u4E3B\u7BA1\uFF1A",
                                boards.masters))),
                    React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
            }
        }
        else if (boards.id == 758) {
            return React.createElement("div", { className: "column" },
                React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                    React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                        React.createElement("div", { className: "areaName" },
                            React.createElement("a", { href: "/list/758" }, boards.name)),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters))),
                React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
        }
        else {
            return React.createElement("div", { className: "column" },
                React.createElement("div", { className: "column", style: { border: "2px solid #e9e9e9" } },
                    React.createElement("div", { className: "row", style: { marginTop: "15px", marginBottom: "15px" } },
                        React.createElement("div", { className: "areaName" }, boards.name),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters)),
                    React.createElement(ChildBoard, { boardid: boards.id })),
                React.createElement("div", { style: { height: "30px", backgroundColor: "#F5FAFD" } }));
        }
    };
    BoardID.prototype.view1 = function () {
        if (this.state.view1 == false) {
            this.setState({ view1: true });
        }
        else {
            this.setState({ view1: false });
        }
    };
    BoardID.prototype.view2 = function () {
        if (this.state.view2 == false) {
            this.setState({ view2: true });
        }
        else {
            this.setState({ view2: false });
        }
    };
    BoardID.prototype.view3 = function () {
        if (this.state.view3 == false) {
            this.setState({ view3: true });
        }
        else {
            this.setState({ view3: false });
        }
    };
    BoardID.prototype.view4 = function () {
        if (this.state.view4 == false) {
            this.setState({ view4: true });
        }
        else {
            this.setState({ view4: false });
        }
    };
    BoardID.prototype.render = function () {
        return React.createElement("div", { className: "anArea" }, this.state.board.map(this.generateRootBoard.bind(this)));
    };
    return BoardID;
}(React.Component));
exports.BoardID = BoardID;
var ChildBoard = (function (_super) {
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
                        return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + this.props.boardid + "/Subs")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < data.length; i++) {
                            boards[i] = new AppState_1.Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
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
        return React.createElement("div", { id: "kk", className: "boardContent" },
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "greenBackdrop" })),
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "boardName2" }, item.name)),
            React.createElement("div", { className: "boardInfo" },
                "\u4ECA\u65E5\u53D1\u5E16 ",
                item.todayPostCount,
                " / \u603B\u4E3B\u9898\u6570 ",
                item.totalPostCount));
    };
    ChildBoard.prototype.convertNoImgChildBoard = function (item) {
        return React.createElement("div", { className: "noImgBoardContent" },
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "boardName2" }, item.name)));
    };
    ChildBoard.prototype.render = function () {
        var cid = "Board" + this.props.boardid;
        if (this.props.boardid == 2 || this.props.boardid == 29 || this.props.boardid == 35 || this.props.boardid == 37) {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertNoImgChildBoard));
        }
        else {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertChildBoard));
        }
    };
    return ChildBoard;
}(React.Component));
exports.ChildBoard = ChildBoard;
var BoardList = (function (_super) {
    __extends(BoardList, _super);
    function BoardList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoardList.prototype.render = function () {
        return React.createElement("div", { className: "boardList" },
            React.createElement(BoardID, null));
    };
    return BoardList;
}(React.Component));
exports.BoardList = BoardList;
//# sourceMappingURL=BoardList.js.map