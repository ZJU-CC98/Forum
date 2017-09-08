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
/**
 * 用户中心侧边栏导航组件
 */
var UserCenterNavigation = (function (_super) {
    __extends(UserCenterNavigation, _super);
    function UserCenterNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterNavigation.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-navigation' },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: '/usercenter', label: '主页', activeOnlyWhenExact: true, myClassName: 'fa-home' }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: '/usercenter/myposts', label: '我的主题', myClassName: 'fa-pencil-square-o' }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: '/usercenter/myfavorites', label: '我的收藏', myClassName: 'fa-star' }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: '/usercenter/myfollowings', label: '我的关注', myClassName: 'fa-heart' }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: '/usercenter/myfans', label: '我的粉丝', myClassName: 'fa-users' }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: '/usercenter/myconfig', label: '功能设置', myClassName: 'fa-cog' }))));
    };
    return UserCenterNavigation;
}(React.Component));
exports.UserCenterNavigation = UserCenterNavigation;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, _b = _a.activeOnlyWhenExact, activeOnlyWhenExact = _b === void 0 ? false : _b, myClassName = _a.myClassName;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement("li", { className: match ? "user-center-navigation-active" : "" },
                React.createElement(react_router_dom_1.Link, { className: "" + myClassName, to: to },
                    React.createElement("p", null, label))));
        } }));
};
//# sourceMappingURL=UserCenterNavigation.js.map