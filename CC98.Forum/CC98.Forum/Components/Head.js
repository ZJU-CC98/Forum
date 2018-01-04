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
var Head = (function (_super) {
    __extends(Head, _super);
    function Head(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            loginOrNot: true
        };
        return _this;
    }
    Head.prototype.render = function () {
        return React.createElement("div", { className: "headRoot" },
            React.createElement("div", { id: "backgroundimg" },
                " ",
                React.createElement("img", { src: "images/模板图片.jpg" })),
            React.createElement("div", { className: "shadow" }, " "),
            React.createElement("div", { className: "beijingtiao" }, " "),
            React.createElement("div", { id: "logo" },
                React.createElement("img", { src: "images/矢量智能对象.ico" })),
            React.createElement("div", { id: "cc98" },
                React.createElement("img", { src: "images/CC98论坛.ico" })),
            React.createElement("div", { id: "search" },
                React.createElement("div", { id: "option" },
                    React.createElement("div", { id: "theme" }, "\u4E3B\u9898"),
                    React.createElement("div", { id: "down" })),
                React.createElement("div", { style: { left: '50px', top: '0px', position: 'absolute' } },
                    React.createElement("input", { id: "searchbar", type: "text", placeholder: "猜猜能搜到什么..." })),
                React.createElement("button", { id: "searchbutton" },
                    React.createElement("img", { src: "images/fangdajing.ico", width: "15", height: "15" }))),
            React.createElement("div", { id: "BBScolumn" },
                React.createElement("div", { style: { position: 'absolute', left: '12px', top: '10px' } },
                    React.createElement("img", { src: "images/网盘.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '37px', top: '8px' } },
                    React.createElement("a", { href: "", className: "ziti1" }, "\u7F51\u76D8")),
                React.createElement("div", { style: { position: 'absolute', left: '84px', top: '10px' } },
                    React.createElement("img", { src: "images/游戏.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '109px', top: '8px' } },
                    React.createElement("a", { href: "http://www.cc98.org/game.asp", className: "ziti1" }, "\u6E38\u620F")),
                React.createElement("div", { style: { position: 'absolute', left: '156px', top: '10px' } },
                    React.createElement("img", { src: "images/勋章.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '181px', top: '8px' } },
                    React.createElement("a", { href: "http://v2.cc98.org/app/medalmanager.aspx", className: "ziti1" }, "\u52CB\u7AE0\u4E2D\u5FC3")),
                React.createElement("div", { style: { position: 'absolute', left: '253px', top: '10px' } },
                    React.createElement("img", { src: "images/卡片.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '278px', top: '8px' } },
                    React.createElement("a", { href: "http://card.cc98.org/", className: "ziti1" }, "\u62BD\u5361")),
                React.createElement("div", { style: { position: 'absolute', left: '325px', top: '10px' } },
                    React.createElement("img", { src: "images/猜猜.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '350px', top: '8px' } },
                    React.createElement("a", { href: "http://gaming.cc98.org/Game", className: "ziti1" }, "\u7ADE\u731C")),
                React.createElement("div", { style: { position: 'absolute', left: '397px', top: '10px' } },
                    React.createElement("img", { src: "images/直播.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '422px', top: '8px' } },
                    React.createElement("a", { href: "http://live.cc98.org/", className: "ziti1" }, "\u76F4\u64AD")),
                React.createElement("div", { style: { position: 'absolute', left: '469px', top: '10px' } },
                    React.createElement("img", { src: "images/应用.ico", width: "15", height: "15" })),
                React.createElement("div", { style: { position: 'absolute', left: '494px', top: '8px' } },
                    React.createElement("a", { href: "", className: "ziti1" }, "\u5E94\u7528"))),
            React.createElement("div", { className: "banquantiao" }),
            React.createElement("div", { id: "banquanwenzi" },
                React.createElement("p", null, "Copyright \u00A9 2003-2017 CC98 Network Association. Email: contact@cc98.org")));
    };
    return Head;
}(React.Component));
exports.Head = Head;
//# sourceMappingURL=Head.js.map