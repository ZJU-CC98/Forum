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
//用户中心我的关注&我的粉丝用户通用组件
var UserCenterMyFollowingsUser = /** @class */ (function (_super) {
    __extends(UserCenterMyFollowingsUser, _super);
    function UserCenterMyFollowingsUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyFollowingsUser.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-myfollowings-user' },
            React.createElement("img", { src: this.props.userFanInfo.avatarImgURL }),
            React.createElement("p", null,
                React.createElement("span", { className: 'user-center-myfollowings-user-id' }, this.props.userFanInfo.name),
                "\u4E3B\u9898",
                React.createElement("span", { className: 'user-center-myfollowings-user-posts' }, this.props.userFanInfo.posts),
                "\u7C89\u4E1D",
                React.createElement("span", { className: 'user-center-myfollowings-user-fans' }, this.props.userFanInfo.fans)),
            React.createElement("button", { type: 'button' }, "\u53D6\u6D88\u5173\u6CE8")));
    };
    return UserCenterMyFollowingsUser;
}(React.Component));
exports.UserCenterMyFollowingsUser = UserCenterMyFollowingsUser;
//# sourceMappingURL=UserCenterMyFollowingsUser.js.map