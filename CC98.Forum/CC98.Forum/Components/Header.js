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
/*
<div className="root">
            <div className="headerBackground">
                <img src="/images/headerBackground.jpg"></img>
            </div>
        </div>
*/
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return React.createElement("div", { className: "header" },
            React.createElement("div", { className: "topBar" },
                React.createElement("div", { className: "topBarRow" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", null,
                            React.createElement("img", { src: "images/矢量智能对象.ico" })),
                        React.createElement("div", { style: { margin: '5px 0 0 5px' } },
                            React.createElement("img", { src: "images/CC98.ico" }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } }, "\u9996\u9875"),
                        React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } }, "\u5173\u6CE8"),
                        React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                            React.createElement("a", { href: "/newTopics", style: { color: "#fff" } }, "\u65B0\u5E16")),
                        React.createElement("div", { className: "topBarText", style: { margin: '0 0 0 10px' } },
                            React.createElement("a", { href: "/boardList", style: { color: "#fff" } }, "\u7248\u9762"))))),
            React.createElement("div", { className: "headerContent" },
                React.createElement("div", { className: "headerRow" },
                    React.createElement("div", { className: "linkBar" },
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/网盘.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://share.cc98.org/", className: "linkText" }, "\u7F51\u76D8"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/游戏.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.cc98.org/game.asp", className: "linkText" }, "\u6E38\u620F"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/勋章.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://v2.cc98.org/app/medalmanager.aspx", className: "linkText" }, "\u52CB\u7AE0"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/抽卡.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://card.cc98.org/", className: "linkText" }, "\u62BD\u5361"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/gamble.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://gaming.cc98.org", className: "linkText" }, "\u7ADE\u731C"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "images/NexusHD.jpg", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.nexushd.org", className: "linkText" }, "NexusHD")))),
                    React.createElement("form", { name: "search", action: "", method: "get" },
                        React.createElement("div", { className: "searchBar" },
                            React.createElement("div", null,
                                React.createElement("select", { name: "options" },
                                    React.createElement("option", { value: "board" }, "\u7248\u9762"),
                                    React.createElement("option", { value: "theme" }, "\u4E3B\u9898"),
                                    React.createElement("option", { value: "user" }, "\u7528\u6237"))),
                            React.createElement("div", null,
                                React.createElement("input", { name: "searchText", type: "text", placeholder: "猜猜能搜到什么...", style: { border: '0', height: '30px', width: '260px', margin: '0 3px 0 3px' } })),
                            React.createElement("div", null,
                                React.createElement("input", { type: "image", name: "searchButton", height: "15", width: "15", src: "images/fangdajing.ico", style: { margin: '3px 10px 0 0' } })))))));
    };
    return Header;
}(React.Component));
exports.Header = Header;
/*

<img src="/images/headerBackground.jpg"></img>
            <div id="backgroundimg"> <img src="images/模板图片.jpg" /> </div>
            <div className="shadow"> </div>
            <div className="beijingtiao"> </div>
            <div id="logo"><img src="images/矢量智能对象.ico" /></div>
            <div id="cc98"><img src="images/CC98论坛.ico" /></div>

            <div id="search">
                <div id="option">
                    <div id="theme">主题</div>
                    <div id="down"></div>
                </div>
                <div style={{ left: '50px', top: '0px', position: 'absolute' }}>
                    <input id="searchbar" type="text" placeholder="猜猜能搜到什么..."></input>
                </div>
                <button id="searchbutton">
                    <img src="images/fangdajing.ico" width="15" height="15" />
                </button>
            </div>

            <div id="BBScolumn">
                <div style={{ position: 'absolute', left: '12px', top: '10px' }}>
                    <img src="images/网盘.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '37px', top: '8px' }}>
                    <a href="" className="ziti1">网盘</a>
                </div>
                <div style={{ position: 'absolute', left: '84px', top: '10px' }}>
                    <img src="images/游戏.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '109px', top: '8px' }}>
                    <a href="http://www.cc98.org/game.asp" className="ziti1">游戏</a>
                </div>
                <div style={{ position: 'absolute', left: '156px', top: '10px' }}>
                    <img src="images/勋章.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '181px', top: '8px' }}>
                    <a href="http://v2.cc98.org/app/medalmanager.aspx" className="ziti1">勋章中心</a>
                </div>
                <div style={{ position: 'absolute', left: '253px', top: '10px' }}>
                    <img src="images/卡片.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '278px', top: '8px' }}>
                    <a href="http://card.cc98.org/" className="ziti1">抽卡</a>
                </div>
                <div style={{ position: 'absolute', left: '325px', top: '10px' }}>
                    <img src="images/猜猜.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '350px', top: '8px' }}>
                    <a href="http://gaming.cc98.org/Game" className="ziti1">竞猜</a>
                </div>
                <div style={{ position: 'absolute', left: '397px', top: '10px' }}>
                    <img src="images/直播.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '422px', top: '8px' }}>
                    <a href="http://live.cc98.org/" className="ziti1">直播</a>
                </div>
                <div style={{ position: 'absolute', left: '469px', top: '10px' }}>
                    <img src="images/应用.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '494px', top: '8px' }}>
                    <a href="" className="ziti1">应用</a>
                </div>
            </div>

            <div className="banquantiao"></div>
            <div id="banquanwenzi">

                <p>Copyright © 2003-2017 CC98 Network Association. Email: contact@cc98.org</p></div>

        </div>
    }
}
*/ 
//# sourceMappingURL=Header.js.map