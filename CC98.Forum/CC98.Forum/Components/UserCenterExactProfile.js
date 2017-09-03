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
 * 用户中心主页个人资料组件
 */
var UserCenterExactProfile = (function (_super) {
    __extends(UserCenterExactProfile, _super);
    function UserCenterExactProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactProfile.prototype.render = function () {
        return (React.createElement("div", { className: "user-profile" },
            React.createElement("button", { type: 'button' }, "\u79C1\u4FE1"),
            React.createElement("div", { id: 'userId' },
                React.createElement("p", null, this.props.userInfo.name)),
            React.createElement("div", { id: 'userGenderAndBirthday' },
                React.createElement("p", null,
                    "\u6027\u522B  ",
                    (this.props.userInfo.gender === 0) ? '男' : '女',
                    " "),
                this.props.userInfo.birthday === null ? '' : React.createElement("p", null,
                    "\u751F\u65E5  ",
                    this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T')))),
            this.props.userInfo.personalDescription ?
                React.createElement("div", { className: 'user-description' },
                    React.createElement("p", null, "\u4E2A\u4EBA\u8BF4\u660E"),
                    React.createElement("img", { src: this.props.userInfo.photourl }),
                    React.createElement("p", null, this.props.userInfo.personalDescription)) : null,
            this.props.userInfo.signatureCode ?
                React.createElement("div", { className: 'user-description' },
                    React.createElement("p", null, "\u4E2A\u6027\u7B7E\u540D"),
                    React.createElement("p", null, this.props.userInfo.signatureCode)) : null));
    };
    return UserCenterExactProfile;
}(React.Component));
exports.UserCenterExactProfile = UserCenterExactProfile;
//# sourceMappingURL=UserCenterExactProfile.js.map