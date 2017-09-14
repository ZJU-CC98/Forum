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
var UserCenterMyPostsExact_1 = require("./UserCenterMyPostsExact");
var UserCenterMyPostsReplies_1 = require("./UserCenterMyPostsReplies");
/**
 * 用户中心我的主题组件
 */
var UserCenterMyPosts = /** @class */ (function (_super) {
    __extends(UserCenterMyPosts, _super);
    function UserCenterMyPosts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyPosts.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { className: 'user-center-myposts' },
                React.createElement(CustomLink, { to: '/usercenter/myposts', label: '主题', activeOnlyWhenExact: true }),
                " | ",
                React.createElement(CustomLink, { to: '/usercenter/myposts/replies', label: '回复', activeOnlyWhenExact: false }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: '/usercenter/myposts', component: UserCenterMyPostsExact_1.UserCenterMyPostsExact }),
                React.createElement(react_router_dom_1.Route, { path: '/usercenter/myposts/replies', component: UserCenterMyPostsReplies_1.UserCenterMyPostsReplies }))));
    };
    return UserCenterMyPosts;
}(React.Component));
exports.UserCenterMyPosts = UserCenterMyPosts;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};
//# sourceMappingURL=UserCenterMyPosts.js.map