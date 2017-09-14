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
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var UserNavigation = /** @class */ (function (_super) {
    __extends(UserNavigation, _super);
    function UserNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserNavigation.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-navigation' },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: "" + location.pathname, label: '主页', activeOnlyWhenExact: true, myClassName: 'fa-home' }))));
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
//# sourceMappingURL=UserNavigation.js.map