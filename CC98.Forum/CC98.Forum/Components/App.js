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
var post_1 = require("./post");
var List_1 = require("./List");
var CurUserPost_1 = require("./CurUserPost");
var BoardList_1 = require("./BoardList");
var UserCenter_1 = require("./UserCenter");
var MyMessage_1 = require("./MyMessage");
var AllNewPost_1 = require("./AllNewPost");
var Header_1 = require("./Header");
var RouteComponent = (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.match = props.match;
        return _this;
    }
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
/* <h1>Ashida Mana~</h1>
                <li><Link to="/topic/4723305">moe</Link></li>
                <li><Link to="/boardlist">meow</Link></li>
                <li><a href={`https://login.cc98.org/OAuth/Authorize?scope=getuserinfo*&response_type=token&client_id=9428333a-a0e3-486b-b375-7904f1bceba9&redirect_uri=http%3A%2F%2Flocalhost%3A${location.port}%2Fusercenter`} > 登陆</a></li>
                <li><Link to="/usercenter">个人中心</Link></li>
                <li><Link to="/messagebox">信箱</Link></li>
                <li><Link to="newtopics">新帖 </Link></li>
                 <hr />*/
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { style: { backgroundColor: '#F5FAFD', justifyContent: "center", display: "flex", flexDirection: "column" } },
                    React.createElement(Header_1.Header, null),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/:page?", component: post_1.Post }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/user/:userName/:page?", component: CurUserPost_1.CurUserPost }),
                    React.createElement(react_router_dom_1.Route, { path: "/list/:boardid/:page?", component: List_1.List }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/boardlist", component: BoardList_1.BoardList }),
                    React.createElement(react_router_dom_1.Route, { path: "/usercenter", component: UserCenter_1.UserCenter }),
                    React.createElement(react_router_dom_1.Route, { path: "/messagebox", component: MyMessage_1.MyMessage }),
                    React.createElement(react_router_dom_1.Route, { path: "/newtopics", component: AllNewPost_1.AllNewPost }))));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=App.js.map