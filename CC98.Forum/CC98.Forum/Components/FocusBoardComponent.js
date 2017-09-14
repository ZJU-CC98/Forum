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
 * 我关注的版面（单个版面的样式）
 */
var FocusBoardComponent = /** @class */ (function (_super) {
    __extends(FocusBoardComponent, _super);
    function FocusBoardComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusBoardComponent.prototype.render = function () {
        return React.createElement("div", { className: 'focus-board' }, this.props.name);
    };
    return FocusBoardComponent;
}(React.Component));
exports.FocusBoardComponent = FocusBoardComponent;
//# sourceMappingURL=FocusBoardComponent.js.map