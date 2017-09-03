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
/**
 * 用户最近单个帖子组件
 */
var UserCenterExactActivitiesPost = (function (_super) {
    __extends(UserCenterExactActivitiesPost, _super);
    function UserCenterExactActivitiesPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivitiesPost.prototype.render = function () {
        return (React.createElement("div", { className: 'user-post' },
            React.createElement("p", null,
                React.createElement("span", { className: 'user-post-board' }, this.props.userRecentPost.board),
                React.createElement("span", { className: 'user-post-date' }, this.props.userRecentPost.date),
                React.createElement("samp", { className: 'user-post-title' }, this.props.userRecentPost.title)),
            React.createElement("p", { className: 'user-post-approval' },
                React.createElement("span", { className: 'fa-thumbs-o-up' }, " " + this.props.userRecentPost.approval),
                React.createElement("span", { className: 'fa-thumbs-o-down' }, " " + this.props.userRecentPost.disapproval)),
            React.createElement("p", { className: 'user-post-content' }, this.props.userRecentPost.content)));
    };
    return UserCenterExactActivitiesPost;
}(React.Component));
exports.UserCenterExactActivitiesPost = UserCenterExactActivitiesPost;
//# sourceMappingURL=UserCenterExactActivitiesPost.js.map