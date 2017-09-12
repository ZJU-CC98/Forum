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
var FocusBoardAreaComponent_1 = require("./FocusBoardAreaComponent");
var FocusPostAreaComponent_1 = require("./FocusPostAreaComponent");
var MyFocusBoard = (function (_super) {
    __extends(MyFocusBoard, _super);
    function MyFocusBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 从上往下分别为：页面标题、关注版面列表区域、选中版面的主题列表区域，分别用三个组件表示
     */
    MyFocusBoard.prototype.render = function () {
        return (React.createElement("div", { className: 'focus-root' },
            React.createElement("div", { className: 'focus' },
                React.createElement("div", { className: 'focus-title' }, "\u6211\u7684\u5173\u6CE8\u7248\u9762"),
                React.createElement(FocusBoardAreaComponent_1.FocusBoardAreaComponent, null),
                React.createElement(FocusPostAreaComponent_1.FocusPostAreaComponent, null))));
    };
    return MyFocusBoard;
}(React.Component));
exports.MyFocusBoard = MyFocusBoard;
//# sourceMappingURL=MyFocusBoard.js.map