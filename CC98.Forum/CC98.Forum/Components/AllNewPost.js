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
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = require("react");
var FocusPostAreaComponent_1 = require("./FocusPostAreaComponent");
/**
 * 网站的主页面对象。
 */
var AllNewPost = /** @class */ (function (_super) {
    __extends(AllNewPost, _super);
    function AllNewPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 全站新帖列表
     */
    AllNewPost.prototype.render = function () {
        return (React.createElement("div", { className: 'focus' },
            React.createElement("div", { className: 'focus-allNewPost' },
                React.createElement("i", { className: 'fa fa-home', "aria-hidden": 'true' }),
                "\u9996\u9875/\u5168\u7AD9\u65B0\u5E16"),
            React.createElement(FocusPostAreaComponent_1.FocusPostAreaComponent, null)));
    };
    return AllNewPost;
}(React.Component));
exports.AllNewPost = AllNewPost;
//# sourceMappingURL=AllNewPost.js.map