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
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var UserCenterNavigation_1 = require("./UserCenterNavigation");
var UserCenterRouter_1 = require("./UserCenterRouter");
/**
 * 用户中心页面
 */
var UserCenter = /** @class */ (function (_super) {
    __extends(UserCenter, _super);
    function UserCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenter.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center' },
            React.createElement("div", { className: 'user-center-head' },
                React.createElement("p", null, "\u4E2A\u4EBA\u4E2D\u5FC3")),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: 'user-center-body' },
                    React.createElement(UserCenterNavigation_1.UserCenterNavigation, null),
                    React.createElement(UserCenterRouter_1.UserCenterRouter, null)))));
    };
    return UserCenter;
}(React.Component));
exports.UserCenter = UserCenter;
//# sourceMappingURL=UserCenter.js.map