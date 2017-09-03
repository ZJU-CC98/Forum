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
var UserCenterMyFavoritesPosts_1 = require("./UserCenterMyFavoritesPosts");
//import { UserCenterMyFavoritesPostsBoards } from './UserCenterMyFavoritesPostsBoards';
//<Route path='/usercenter/myfavorites/boards' component={UserCenterMyFavoritesPostsBoards} />
/**
 * 用户中心主页近期动态组件
 */
var UserCenterMyFavorites = (function (_super) {
    __extends(UserCenterMyFavorites, _super);
    function UserCenterMyFavorites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyFavorites.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { className: 'user-center-myfavorites' },
                React.createElement(CustomLink, { to: '/usercenter/myfavorites', label: '文章', activeOnlyWhenExact: true }),
                " | ",
                React.createElement(CustomLink, { to: '/usercenter/myfavorites/boards', label: '版面', activeOnlyWhenExact: false }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: '/usercenter/myfavorites', component: UserCenterMyFavoritesPosts_1.UserCenterMyFavoritesPosts }))));
    };
    return UserCenterMyFavorites;
}(React.Component));
exports.UserCenterMyFavorites = UserCenterMyFavorites;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};
//# sourceMappingURL=UserCenterMyFavorites.js.map