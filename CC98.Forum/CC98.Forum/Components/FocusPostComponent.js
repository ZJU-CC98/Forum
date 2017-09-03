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
/**
 * 我关注的某个版面的单个主题
 */
var FocusPostComponent = (function (_super) {
    __extends(FocusPostComponent, _super);
    function FocusPostComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusPostComponent.prototype.render = function () {
        return (React.createElement("div", { className: 'focus-post' },
            React.createElement("img", { className: 'focus-post-portraitUrl', src: this.props.portraitUrl }),
            React.createElement("div", { className: 'focus-post-info1' },
                React.createElement("div", { className: 'focus-post-authorInfo' },
                    React.createElement("div", { className: 'focus-post-blackText' }, this.props.authorName),
                    React.createElement("div", { className: 'focus-post-redText' }, this.props.fanCount),
                    React.createElement("div", { className: 'focus-post-blackText' }, "\u7C89\u4E1D")),
                React.createElement("div", { className: 'focus-post-title' }, this.props.title)),
            React.createElement("div", { className: 'focus-post-info2' },
                React.createElement("div", { className: 'focus-post-board' },
                    this.props.boardName,
                    " / ",
                    this.props.createTime),
                React.createElement("div", { className: 'focus-post-response' },
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-thumbs-o-up", "aria-hidden": "true" }),
                        this.props.likeCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-thumbs-o-down", "aria-hidden": "true" }),
                        this.props.dislikeCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-eye", "aria-hidden": "true" }),
                        this.props.hitCount),
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-commenting-o", "aria-hidden": "true" }),
                        this.props.replyCount)))));
    };
    return FocusPostComponent;
}(React.Component));
exports.FocusPostComponent = FocusPostComponent;
//# sourceMappingURL=FocusPostComponent.js.map