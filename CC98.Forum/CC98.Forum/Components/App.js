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
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { style: { backgroundColor: '#F5FAFD', justifyContent: "center", display: "flex", flexDirection: "column" } },
                    React.createElement("h1", null, "Ashida Mana~"),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/topic/4723305" }, "moe")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/boardlist" }, "meow")),
                    React.createElement("hr", null),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/:page?", component: post_1.Post }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/user/:userName/:page?", component: CurUserPost_1.CurUserPost }),
                    React.createElement(react_router_dom_1.Route, { path: "/list/:boardid/:page?", component: List_1.List }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/boardlist", component: BoardList_1.BoardList }))));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=App.js.map