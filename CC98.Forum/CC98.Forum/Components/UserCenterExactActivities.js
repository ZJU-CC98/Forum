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
var UserCenterExactActivitiesPosts_1 = require("./UserCenterExactActivitiesPosts");
var UserCenterExactActivitiesReplies_1 = require("./UserCenterExactActivitiesReplies");
/**
 * 用户中心主页近期动态组件
 */
var UserCenterExactActivities = (function (_super) {
    __extends(UserCenterExactActivities, _super);
    function UserCenterExactActivities() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivities.prototype.render = function () {
        return (React.createElement("div", { className: "user-activities" },
            React.createElement("p", null, "\u8FD1\u671F\u52A8\u6001"),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(CustomLink, { to: "" + location.pathname, label: '主题', activeOnlyWhenExact: true }),
                    " | ",
                    React.createElement(CustomLink, { to: location.pathname + "/replies", label: '回复', activeOnlyWhenExact: false }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "" + location.pathname, component: UserCenterExactActivitiesPosts_1.UserCenterExactActivitiesPosts }),
                    React.createElement(react_router_dom_1.Route, { path: location.pathname + "/replies", component: UserCenterExactActivitiesReplies_1.UserCenterExactActivitiesReplies })))));
    };
    return UserCenterExactActivities;
}(React.Component));
exports.UserCenterExactActivities = UserCenterExactActivities;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};
//# sourceMappingURL=UserCenterExactActivities.js.map