"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Ubb = require("./Core");
var BTagHandler_1 = require("./BTagHandler");
var ImageTagHandler_1 = require("./ImageTagHandler");
/**
 * 创建一个具有所有功能的默认引擎。
 */
function createEngine() {
    var engine = new Ubb.UbbCodeEngine();
    // 在此处添加引擎所支持的所有标签处理器
    engine.tagHandlers.register(new BTagHandler_1.BTagHandler());
    engine.tagHandlers.register(new ImageTagHandler_1.ImageTagHandler());
    return engine;
}
exports.createEngine = createEngine;
// 重新导出核心功能
__export(require("./Core"));
//# sourceMappingURL=UbbCodeExtension.js.map