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
//用户中心主页用户头像与徽章组件
var UserCenterExactAvatar = (function (_super) {
    __extends(UserCenterExactAvatar, _super);
    function UserCenterExactAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactAvatar.prototype.render = function () {
        return (React.createElement("div", { className: 'user-avatar' },
            React.createElement("img", { className: 'user-avatar-img', src: this.props.userAvatarImgURL }),
            React.createElement("div", { className: 'user-badge' })));
    };
    return UserCenterExactAvatar;
}(React.Component));
exports.UserCenterExactAvatar = UserCenterExactAvatar;
//# sourceMappingURL=UserCenterExactAvatar.js.map