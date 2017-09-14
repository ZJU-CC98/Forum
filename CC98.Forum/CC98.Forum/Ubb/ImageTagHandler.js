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
var ImageTagHandler = /** @class */ (function (_super) {
    __extends(ImageTagHandler, _super);
    function ImageTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageTagHandler.prototype, "tagName", {
        get: function () { return 'img'; },
        enumerable: true,
        configurable: true
    });
    ;
    ImageTagHandler.prototype.execCore = function (content, tagData, context) {
        var imageUri = content;
        var title = tagData.value('title');
        // 不允许显示图像
        if (!context.options.allowImage) {
            return content;
        }
        var imageTag = React.createElement("img", { src: imageUri, alt: title });
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return React.createElement("figure", null,
                imageTag,
                React.createElement("figcaption", null, title));
        }
        else {
            return imageTag;
        }
    };
    return ImageTagHandler;
}(Ubb.TextTagHandler));
exports.ImageTagHandler = ImageTagHandler;
//# sourceMappingURL=ImageTagHandler.js.map