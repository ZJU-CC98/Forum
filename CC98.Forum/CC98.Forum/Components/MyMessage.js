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
var Utility = require("../Utility");
var MymessageMessage_1 = require("./MymessageMessage");
var MymessageSystem_1 = require("./MymessageSystem");
var MymessageResponse_1 = require("./MymessageResponse");
var react_router_dom_1 = require("react-router-dom");
var MyMessage = (function (_super) {
    __extends(MyMessage, _super);
    function MyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyMessage.prototype.render = function () {
        return (React.createElement("div", { className: 'mymessage' },
            React.createElement("div", { className: 'mymessage-title' }, "\u6211\u7684\u6D88\u606F"),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: 'mymessage-content' },
                    React.createElement("div", { className: 'mymessage-nav' },
                        React.createElement("div", { id: 'myresponse' },
                            React.createElement(react_router_dom_1.NavLink, { to: '/responselogin' }, "\u56DE\u590D\u6211\u7684")),
                        React.createElement("div", { id: 'myattme' },
                            React.createElement(react_router_dom_1.NavLink, { to: '/attme' }, "@\u6211\u7684")),
                        React.createElement("div", { id: 'mylikes' },
                            React.createElement(react_router_dom_1.NavLink, { to: '/likes' }, "\u6536\u5230\u7684\u8D5E")),
                        React.createElement("div", { id: 'mysystem' },
                            React.createElement(react_router_dom_1.NavLink, { to: '/systemlogin' }, "\u7CFB\u7EDF\u901A\u77E5")),
                        React.createElement("div", { id: 'mymessage' },
                            React.createElement(react_router_dom_1.NavLink, { to: '/login' }, "\u6211\u7684\u79C1\u4FE1"))),
                    React.createElement(react_router_dom_1.Route, { path: '/response', component: MymessageResponse_1.MymessageResponse }),
                    React.createElement(react_router_dom_1.Route, { path: '/attme', component: Attme }),
                    React.createElement(react_router_dom_1.Route, { path: '/likes', component: Likes }),
                    React.createElement(react_router_dom_1.Route, { path: '/systemlogin', component: Systemlogin }),
                    React.createElement(react_router_dom_1.Route, { path: '/responselogin', component: Responselogin }),
                    React.createElement(react_router_dom_1.Route, { path: '/system', component: MymessageSystem_1.MymessageSystem }),
                    React.createElement(react_router_dom_1.Route, { path: '/login', component: login }),
                    React.createElement(react_router_dom_1.Route, { path: "/message", component: MymessageMessage_1.MymessageMessage })))));
    };
    return MyMessage;
}(React.Component));
exports.MyMessage = MyMessage;
var Responselogin = (function (_super) {
    __extends(Responselogin, _super);
    function Responselogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Responselogin.prototype.render = function () {
        Utility.changeNav('#myresponse');
        var url = Utility.responseRequest();
        return React.createElement("div", { className: 'test' },
            React.createElement("a", { href: url }, "\u56DE\u590D\u767B\u9646"));
    };
    return Responselogin;
}(React.Component));
exports.Responselogin = Responselogin;
var Attme = (function (_super) {
    __extends(Attme, _super);
    function Attme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attme.prototype.render = function () {
        Utility.changeNav('#myattme');
        return React.createElement("div", { className: 'test' }, "\u8FD9\u91CC\u6709\u4EBA@\u6211");
    };
    return Attme;
}(React.Component));
exports.Attme = Attme;
var Likes = (function (_super) {
    __extends(Likes, _super);
    function Likes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Likes.prototype.render = function () {
        Utility.changeNav('#mylikes');
        return React.createElement("div", { className: 'test' }, "\u8FD9\u91CC\u662F\u6211\u6536\u5230\u7684\u8D5E");
    };
    return Likes;
}(React.Component));
exports.Likes = Likes;
var Systemlogin = (function (_super) {
    __extends(Systemlogin, _super);
    function Systemlogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Systemlogin.prototype.render = function () {
        Utility.changeNav('#mysystem');
        var url = Utility.systemRequest();
        return React.createElement("div", { className: 'test' },
            React.createElement("a", { href: url }, "\u7CFB\u7EDF\u767B\u9646"));
    };
    return Systemlogin;
}(React.Component));
exports.Systemlogin = Systemlogin;
var login = (function (_super) {
    __extends(login, _super);
    function login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    login.prototype.render = function () {
        Utility.changeNav('#mymessage');
        var url = Utility.sendRequest();
        return React.createElement("div", { className: 'test' },
            React.createElement("a", { href: url }, "\u767B\u9646"));
    };
    return login;
}(React.Component));
exports.login = login;
//# sourceMappingURL=MyMessage.js.map