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
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var UserCenterExactProfile_1 = require("./UserCenterExactProfile");
var UserCenterExactActivities_1 = require("./UserCenterExactActivities");
var UserCenterExactAvatar_1 = require("./UserCenterExactAvatar");
var UserRouter = (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRouter.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-router' },
            React.createElement(react_router_dom_1.Route, { path: '/user/', component: UserExact })));
    };
    return UserRouter;
}(React.Component));
exports.UserRouter = UserRouter;
var UserExact = (function (_super) {
    __extends(UserExact, _super);
    function UserExact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!location.pathname.split('/')[2]) {
                            return [2 /*return*/, 0];
                        }
                        if (!(location.pathname.split('/')[2] === 'name')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + location.pathname.split('/')[3])];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetch("https://api.cc98.org/User/" + location.pathname.split('/')[2])];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _a.sent();
                        this.setState({
                            userInfo: data,
                            userAvatarImgURL: data.portraitUrl,
                            responseState: response.status
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserExact.prototype.render = function () {
        var element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (React.createElement("div", { className: 'user-center-exact' },
                React.createElement(UserCenterExactAvatar_1.UserCenterExactAvatar, { userAvatarImgURL: this.state.userAvatarImgURL }),
                React.createElement(UserCenterExactProfile_1.UserCenterExactProfile, { userInfo: this.state.userInfo }),
                React.createElement(UserCenterExactActivities_1.UserCenterExactActivities, null)));
        }
        else {
            element = React.createElement("p", null, "\u52A0\u8F7D\u4E2D");
        }
        return element;
    };
    return UserExact;
}(React.Component));
//# sourceMappingURL=UserRouter.js.map