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
var UserCenterExact_1 = require("./UserCenterExact");
var UserCenterMyFollowings_1 = require("./UserCenterMyFollowings");
var UserCenterMyFans_1 = require("./UserCenterMyFans");
var UserCenterMyPosts_1 = require("./UserCenterMyPosts");
var UserCenterMyFavorites_1 = require("./UserCenterMyFavorites");
/**
 * 用户中心主体
 */
var UserCenterRouter = /** @class */ (function (_super) {
    __extends(UserCenterRouter, _super);
    function UserCenterRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterRouter.prototype.render = function () {
        return (React.createElement("div", { className: 'user-center-router' },
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/usercenter/', component: UserCenterExact_1.UserCenterExact }),
            React.createElement(react_router_dom_1.Route, { path: '/usercenter/myfollowings', component: UserCenterMyFollowings_1.UserCenterMyFollowings }),
            React.createElement(react_router_dom_1.Route, { path: '/usercenter/myfans', component: UserCenterMyFans_1.UserCenterMyFans }),
            React.createElement(react_router_dom_1.Route, { path: '/usercenter/myposts', component: UserCenterMyPosts_1.UserCenterMyPosts }),
            React.createElement(react_router_dom_1.Route, { path: '/usercenter/myfavorites', component: UserCenterMyFavorites_1.UserCenterMyFavorites })));
    };
    return UserCenterRouter;
}(React.Component));
exports.UserCenterRouter = UserCenterRouter;
//# sourceMappingURL=UserCenterRouter.js.map