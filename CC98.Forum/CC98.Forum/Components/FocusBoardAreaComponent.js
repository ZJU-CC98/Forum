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
var FocusBoardComponent_1 = require("./FocusBoardComponent");
/**
 * 表示我关注的版面列表区域
 */
var FocusBoardAreaComponent = /** @class */ (function (_super) {
    __extends(FocusBoardAreaComponent, _super);
    /**
     * 构造函数，同时构造假的版面列表数据
     * @param props
     */
    function FocusBoardAreaComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [{ id: 100, name: '校园信息' }, { id: 459, name: '实习兼职' }, { id: 135, name: '开怀一笑' }, { id: 758, name: '似水流年' }]
        };
        return _this;
    }
    /**
     * 将我关注的版面排列好
     */
    FocusBoardAreaComponent.prototype.render = function () {
        return React.createElement("div", { className: 'focus-board-area' }, this.state.data.map(coverFocusBoard));
    };
    return FocusBoardAreaComponent;
}(React.Component));
exports.FocusBoardAreaComponent = FocusBoardAreaComponent;
function coverFocusBoard(item) {
    return React.createElement(FocusBoardComponent_1.FocusBoardComponent, { id: item.id, name: item.name });
}
//# sourceMappingURL=FocusBoardAreaComponent.js.map