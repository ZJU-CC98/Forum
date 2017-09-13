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
var MyMessageMessage_1 = require("./MyMessageMessage");
var MyMessageResponse_1 = require("./MyMessageResponse");
var MyMessageAttme_1 = require("./MyMessageAttme");
var MyMessageSystem_1 = require("./MyMessageSystem");
var react_router_dom_1 = require("react-router-dom");
/**
 * 网站的主页面对象。
 */
var MyMessage = (function (_super) {
    __extends(MyMessage, _super);
    function MyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyMessage.prototype.render = function () {
        var url = sendRequest();
        var token = location.href.match(/access_token=(\S+)&token_type/);
        var accessToken;
        if (token) {
            accessToken = token[1];
        }
        return (React.createElement("div", { className: 'mymessage-root' },
            React.createElement("div", { className: 'mymessage' },
                React.createElement("div", { className: 'mymessage-login' },
                    React.createElement("a", { href: url }, "\u767B\u9646")),
                React.createElement("div", { className: 'mymessage-title' }, "\u6211\u7684\u6D88\u606F"),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: 'mymessage-content' },
                        React.createElement("div", { className: 'mymessage-nav' },
                            React.createElement("div", { id: 'response' },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/response?access_token=" + accessToken }, "\u56DE\u590D\u6211\u7684")),
                            React.createElement("div", { id: 'attme' },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/attme?access_token=" + accessToken }, "@\u6211\u7684")),
                            React.createElement("div", { id: 'likes' },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/likes?access_token=" + accessToken }, "\u6536\u5230\u7684\u8D5E")),
                            React.createElement("div", { id: 'system' },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/system?access_token=" + accessToken }, "\u7CFB\u7EDF\u901A\u77E5")),
                            React.createElement("div", { id: 'message' },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/message?access_token=" + accessToken }, "\u6211\u7684\u79C1\u4FE1"))),
                        React.createElement(react_router_dom_1.Route, { path: '/mymessage/response', component: MyMessageResponse_1.MyMessageResponse }),
                        React.createElement(react_router_dom_1.Route, { path: '/mymessage/attme', component: MyMessageAttme_1.MyMessageAttme }),
                        React.createElement(react_router_dom_1.Route, { path: '/mymessage/likes', component: Likes }),
                        React.createElement(react_router_dom_1.Route, { path: '/mymessage/system', component: MyMessageSystem_1.MyMessageSystem }),
                        React.createElement(react_router_dom_1.Route, { path: '/mymessage/message', component: MyMessageMessage_1.MyMessageMessage }))))));
    };
    return MyMessage;
}(React.Component));
exports.MyMessage = MyMessage;
//选中效果
function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus');
}
exports.changeNav = changeNav;
var Likes = (function (_super) {
    __extends(Likes, _super);
    function Likes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Likes.prototype.render = function () {
        changeNav('#likes');
        return React.createElement("div", null, "\u8FD9\u91CC\u662F\u6211\u6536\u5230\u7684\u8D5E");
    };
    return Likes;
}(React.Component));
exports.Likes = Likes;
function sendRequest() {
    //申请到的appID
    var appId = '457bfed1-ab0b-4606-a346-05afac262d5a';
    //申请后的回调地址
    var c = location.origin + "/mymessage";
    var redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
//# sourceMappingURL=MyMessage.js.map