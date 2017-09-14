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
var Ubb = require("../Ubb/UbbCodeExtension");
var UbbContainerProps = /** @class */ (function () {
    function UbbContainerProps() {
    }
    return UbbContainerProps;
}());
exports.UbbContainerProps = UbbContainerProps;
var UbbContainer = /** @class */ (function (_super) {
    __extends(UbbContainer, _super);
    function UbbContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UbbContainer.prototype.render = function () {
        // 获取引擎对象，如果不使用引擎对象则创建一个默认的
        var engine = this.props.engine || Ubb.createEngine();
        // 获取选项，如果不设置选项则创建一个默认的
        var options = this.props.options || new Ubb.UbbCodeOptions();
        var ubbHtml = engine.exec(this.props.code, options);
        // 注意兼容性设置， HTML4 不支持 article 标签
        if (options.compatibility === Ubb.UbbCompatiblityMode.Transitional) {
            return React.createElement("blockquote", null, ubbHtml);
        }
        else {
            return React.createElement("article", null, ubbHtml);
        }
    };
    return UbbContainer;
}(React.Component));
exports.UbbContainer = UbbContainer;
//# sourceMappingURL=UbbContainer.js.map