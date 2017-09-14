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
var UserNavigation_1 = require("./UserNavigation");
var UserRouter_1 = require("./UserRouter");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center' },
            React.createElement("div", { className: 'user-center-head' },
                React.createElement("p", null, "\u7528\u6237\u8BE6\u60C5")),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: 'user-center-body' },
                    React.createElement(UserNavigation_1.UserNavigation, null),
                    React.createElement(UserRouter_1.UserRouter, null)))));
    };
    return User;
}(React.Component));
exports.User = User;
//# sourceMappingURL=User.js.map