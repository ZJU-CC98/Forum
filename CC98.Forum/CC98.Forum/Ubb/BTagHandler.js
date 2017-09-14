"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
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
var Ubb = require("./Core");
/**
 * 处理 [b] 标签的处理器。
 */
var BTagHandler = /** @class */ (function (_super) {
    __extends(BTagHandler, _super);
    function BTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BTagHandler.prototype, "tagName", {
        get: function () {
            return 'b';
        },
        enumerable: true,
        configurable: true
    });
    BTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        // HTML5 标准建议不再使用 b 标签
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return React.createElement("strong", null, innerContent);
        }
        else {
            return React.createElement("b", null, innerContent);
        }
    };
    return BTagHandler;
}(Ubb.RecursiveTagHandler));
exports.BTagHandler = BTagHandler;
//# sourceMappingURL=BTagHandler.js.map