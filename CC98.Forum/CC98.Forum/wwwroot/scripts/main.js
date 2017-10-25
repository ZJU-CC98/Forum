/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * 提供 UBB 处理上下文所需要的相关数据。
 */
var UbbCodeContextData = /** @class */ (function () {
    function UbbCodeContextData() {
    }
    return UbbCodeContextData;
}());
exports.UbbCodeContextData = UbbCodeContextData;
/**
 * 处理 UBB 编码时可用于存储相关信息的上下文对象。
 */
var UbbCodeContext = /** @class */ (function () {
    /**
     * 初始化一个上下文对象的新实例。
     * @param engine 引擎对象。
     * @param options 处理选项。
     */
    function UbbCodeContext(engine, options) {
        this._engine = engine;
        this._options = options;
    }
    Object.defineProperty(UbbCodeContext.prototype, "engine", {
        /**
         * 获取关联到本次处理上下文的处理引擎对象。
         * @returns {UbbCodeEngine} 关联到本次处理上下文的处理引擎对象。
         */
        get: function () {
            return this._engine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeContext.prototype, "options", {
        /**
         * 获取处理 UBB 需要注意的选项。
         * @returns {UbbCodeOptions} 处理 UBB 需要注意的选项。
         */
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeContext.prototype, "data", {
        /**
         * 获取上下文相关的数据。
         * @returns {UbbCodeContextData} 上下文相关的数据。
         */
        get: function () {
            return this._engine.data;
        },
        enumerable: true,
        configurable: true
    });
    return UbbCodeContext;
}());
exports.UbbCodeContext = UbbCodeContext;
/**
 * 控制 UBB 编码的选项。在 UBB 编码过程中，需要考虑这些选项。
 */
var UbbCodeOptions = /** @class */ (function () {
    function UbbCodeOptions() {
        /**
         * 是否自动检测 URL 并添加链接效果。
         */
        this.autoDetectUrl = true;
        /**
         * 是否允许外部链接。
         */
        this.allowExternalUrl = true;
        /**
         * 是否允许显示图像。
         */
        this.allowImage = true;
        /**
         * 是否允许多媒体资源，如视频，音频，Flash 等。
         */
        this.allowMediaContent = true;
        /**
         * 是否允许自动播放多媒体资源。
         */
        this.allowAutoPlay = true;
        /**
         * UBB 处理中的兼容性控制选项。
         */
        this.compatibility = UbbCompatiblityMode.Recommended;
    }
    return UbbCodeOptions;
}());
exports.UbbCodeOptions = UbbCodeOptions;
/**
 * 定义 UBB 呈现时使用的兼容性模式。
 */
var UbbCompatiblityMode;
(function (UbbCompatiblityMode) {
    /**
     * 使用最低级别兼容性，尽可能保持 UBB 代码的原始含义，即使可能会带来显示效果问题。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["Transitional"] = 0] = "Transitional";
    /**
     * 如果能在不改变语义的情况下使用较新的呈现技术，则使用新技术；如果不能保证语义一致则不进行更改。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["Recommended"] = 1] = "Recommended";
    /**
     * 强制使用对现代浏览器更友好的新技术呈现，即使可能在一定程度上改变语义。
     */
    UbbCompatiblityMode[UbbCompatiblityMode["EnforceMorden"] = 2] = "EnforceMorden";
})(UbbCompatiblityMode = exports.UbbCompatiblityMode || (exports.UbbCompatiblityMode = {}));
/**
         * 定义符号的类型。
         */
var TokenType;
(function (TokenType) {
    /**
     * 一串文本。
     */
    TokenType[TokenType["String"] = 0] = "String";
    /**
     * 项目之间的分隔符。
     */
    TokenType[TokenType["ItemSeperator"] = 1] = "ItemSeperator";
    /**
     * 单个项目内名称和值的分隔符。
     */
    TokenType[TokenType["NameValueSeperator"] = 2] = "NameValueSeperator";
})(TokenType || (TokenType = {}));
/**
 * 表示一个符号。
 */
var Token = /** @class */ (function () {
    /**
     * 初始化一个符号对象的新实例。
     * @param type 符号的类型。
     * @param value 符号的值。
     */
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    /**
     * 创建一个表示一串文本的符号。
     * @param value 文本的值内容。
     */
    Token.stringValue = function (value) {
        return new Token(TokenType.String, value);
    };
    /**
     * 获取表示项目分隔符的符号。
     */
    Token.itemSeperator = new Token(TokenType.ItemSeperator, null);
    /**
     * 获取表示值分隔符的符号。
     */
    Token.nameValueSeperator = new Token(TokenType.NameValueSeperator, null);
    return Token;
}());
/**
 * 定义 UBB 片段的类型。
 */
var UbbSegmentType;
(function (UbbSegmentType) {
    /**
     * 纯文字片段。
     */
    UbbSegmentType[UbbSegmentType["Text"] = 0] = "Text";
    /**
     * 标签片段。
     */
    UbbSegmentType[UbbSegmentType["Tag"] = 1] = "Tag";
})(UbbSegmentType || (UbbSegmentType = {}));
/**
 * 表示 UBB 内容的一个片段。
 */
var UbbSegment = /** @class */ (function () {
    /**
     * 初始化一个 UBB 片段的新实例。
     * @param parent 新片段的上级。
     */
    function UbbSegment(parent) {
        this._parent = parent;
    }
    Object.defineProperty(UbbSegment.prototype, "parent", {
        /**
         * 获取该对象的上级片段。
         * @returns {UbbSegment} 该对象的上级片段。
         */
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    ;
    return UbbSegment;
}());
/**
 * 表示 UBB 的文字片段。
 */
var UbbTextSegment = /** @class */ (function (_super) {
    __extends(UbbTextSegment, _super);
    /**
     * 创建一个新的 UbbTextSegment 对象。
     * @param text 新片段包含的文字。
     */
    function UbbTextSegment(text, parent) {
        var _this = _super.call(this, parent) || this;
        _this._text = text;
        return _this;
    }
    Object.defineProperty(UbbTextSegment.prototype, "type", {
        get: function () { return UbbSegmentType.Text; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTextSegment.prototype, "text", {
        /**
         * 获取片段中包含的文字。
         * @returns {string} 片段中包含的文字。
         */
        get: function () { return this._text; },
        enumerable: true,
        configurable: true
    });
    ;
    UbbTextSegment.prototype.clone = function (newParent) {
        return new UbbTextSegment(this._text, newParent);
    };
    return UbbTextSegment;
}(UbbSegment));
/**
 * 表示 UBB 的标签片段。
 */
var UbbTagSegment = /** @class */ (function (_super) {
    __extends(UbbTagSegment, _super);
    function UbbTagSegment(tagData, parent) {
        var _this = _super.call(this, parent) || this;
        /**
         * 标签片段是否关闭。
         */
        _this._isClosed = false;
        /**
         * 标签中包含的子标签数据。
         */
        _this._subSegments = [];
        _this._tagData = tagData;
        return _this;
    }
    Object.defineProperty(UbbTagSegment.prototype, "type", {
        get: function () { return UbbSegmentType.Tag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagSegment.prototype, "isClosed", {
        /**
         * 获取一个值，指示标签是否关闭。
         * @returns {boolean}
         */
        get: function () { return this._isClosed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTagSegment.prototype, "tagData", {
        get: function () { return this._tagData; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UbbTagSegment.prototype, "subSegments", {
        get: function () { return this._subSegments; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * 强制关闭一个标签，并将标签挂接到新的上级标签。
     * @param segment 要关闭的标签。
     * @param newParent 新的上级标签。
     * @returns {UbbSegment[]} 产生的新的标签的集合。
     */
    UbbTagSegment.forceClose = function (segment, newParent) {
        // 文字标签无需关闭
        if (segment.type === UbbSegmentType.Text) {
            newParent._subSegments.push(segment.clone(newParent));
        }
        else {
            // 已经关闭的标签也无需关闭
            var seg = segment;
            if (seg.isClosed) {
                newParent._subSegments.push(segment.clone(newParent));
            }
            else {
                console.warn('标签 %s 没有正确关闭，已经被转换为纯文字。', seg.tagData.tagName);
                // 未关闭标签，自己将被转换为纯文字
                newParent._subSegments.push(new UbbTextSegment("[" + seg._tagData.orignalString + "]", segment.parent));
                // 自己的下级将被递归强制关闭，并提升为和自己同级
                for (var _i = 0, _a = seg._subSegments; _i < _a.length; _i++) {
                    var sub = _a[_i];
                    UbbTagSegment.forceClose(sub, newParent);
                }
            }
        }
    };
    /**
     * 关闭该标签，并强制处理所有未关闭的下级标签。
     */
    UbbTagSegment.prototype.close = function () {
        // 复制自己的下级并清空数组。
        var subs = this._subSegments;
        this._subSegments = [];
        for (var _i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
            var item = subs_1[_i];
            UbbTagSegment.forceClose(item, this);
        }
        // 设置关闭状态
        this._isClosed = true;
    };
    UbbTagSegment.prototype.clone = function (newParent) {
        var result = new UbbTagSegment(this._tagData, newParent);
        result._content = this._content;
        result._isClosed = this._isClosed;
        for (var _i = 0, _a = this._subSegments; _i < _a.length; _i++) {
            var item = _a[_i];
            result._subSegments.push(item.clone(result));
        }
        return result;
    };
    /**
     * 获取标签的内部内容，不包括标签自身。
     */
    UbbTagSegment.prototype.getContentText = function () {
        var subContents = [];
        for (var _i = 0, _a = this._subSegments; _i < _a.length; _i++) {
            var subItem = _a[_i];
            if (subItem.type === UbbSegmentType.Text) {
                subContents.push(subItem.text);
            }
            else {
                subContents.push(subItem.getFullText());
            }
        }
        return subContents.join('');
    };
    /**
     * 获取标签的全部文字内容。
     */
    UbbTagSegment.prototype.getFullText = function () {
        return "[" + this._tagData.orignalString + "]" + this.getContentText() + "[/" + this._tagData.tagName + "]";
    };
    return UbbTagSegment;
}(UbbSegment));
/**
 * 定义 UBB 标签中包含的数据。
 */
var UbbTagData = /** @class */ (function () {
    function UbbTagData(orignalString, parameters) {
        if (!parameters) {
            throw new Error('参数不能为空。');
        }
        this._originalString = orignalString;
        this._parameters = parameters;
        // 填充命名参数
        this._namedParameters = {};
        for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
            var item = parameters_1[_i];
            if (item.name) {
                this._namedParameters[item.name] = item.value;
            }
        }
    }
    Object.defineProperty(UbbTagData.prototype, "orignalString", {
        /**
         * 获取标签包含的原始文字。
         * @returns {string} 标签包含的原始文字。
         */
        get: function () { return this._originalString; },
        enumerable: true,
        configurable: true
    });
    ;
    UbbTagData.parse = function (tagString) {
        // 空字符串处理
        if (!tagString) {
            return null;
        }
        var tokens = getAllTokens(tagString);
        // 无法分割标签
        if (tokens.length === 0) {
            return null;
        }
        var result = convertTokens(tokens);
        return new UbbTagData(tagString, result);
        /**
         * 提取字符串中的所有符号。
         */
        function getAllTokens(tokenString) {
            var index = 0;
            /**
             * 从字符串中扫描获得下一个完整的语义符号。
             * @returns {string} 下一个完整的语义符号。
             */
            function scanToken(lastTokenType) {
                /**
                 * 从当前位置开始扫描字符串，直到找到对应的结束字符。
                 * @returns {string} 从当前位置开始到相同字符结束的字符串。
                 */
                function scanQuoted() {
                    // 开始字符串。
                    var quoteMark = tokenString[index];
                    var endMarkLocation = tokenString.indexOf('"', index + 1);
                    // 找不到结束符号
                    if (endMarkLocation < 0) {
                        console.error('UBB: 解析标签字符串 %s 时无法找到位置 %d 处 %s 对应的结束字符串。', tokenString, index, quoteMark);
                        endMarkLocation = tokenString.length;
                    }
                    var start = index + 1;
                    index = endMarkLocation + 1;
                    return tokenString.substring(start, endMarkLocation);
                }
                while (true) {
                    // 超过范围。
                    if (index >= tokenString.length) {
                        return null;
                    }
                    var c = tokenString[index];
                    if (/\s/i.test(c)) {
                        index++;
                        continue;
                    }
                    else if (c === ',') {
                        index++;
                        return Token.itemSeperator;
                    }
                    else if (c === '=') {
                        index++;
                        return Token.nameValueSeperator;
                    }
                    else if (c === '"' || c === '\'') {
                        return Token.stringValue(scanQuoted());
                    }
                    else {
                        var start = index;
                        // 根据最后一个标记的类型，本次标记的终止符会有所变化
                        var matchExp = lastTokenType === TokenType.ItemSeperator ? /[=,]/i : /,/i;
                        // 寻找下个分隔符
                        var nextSeperator = tokenString.substring(index + 1).match(matchExp);
                        if (nextSeperator) {
                            // 结束位置
                            var endMarkLocation = nextSeperator.index + index + 1;
                            index = endMarkLocation;
                            return Token.stringValue(tokenString.substring(start, endMarkLocation));
                        }
                        else {
                            index = tokenString.length;
                            return Token.stringValue(tokenString.substring(start));
                        }
                    }
                }
            }
            var allTokens = [];
            var lastTokenType = TokenType.ItemSeperator;
            while (true) {
                var newToken = scanToken(lastTokenType);
                if (newToken) {
                    allTokens.push(newToken);
                    lastTokenType = newToken.type;
                }
                else {
                    break;
                }
            }
            return allTokens;
        }
        /**
         * 将令牌转换为参数集合。
         * @param tokens 要转换的令牌的数组。
         */
        function convertTokens(tokens) {
            var parameters = [];
            if (!tokens || tokens.length === 0) {
                console.error('UBB: 无法将标签字符串 %s 解析为参数的集合。', tagString);
                return parameters;
            }
            var lastName = null;
            var lastValue = null;
            var lastTokenType = TokenType.ItemSeperator;
            for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                var token = tokens_1[_i];
                switch (token.type) {
                    case TokenType.ItemSeperator:
                        parameters.push(new UbbTagParameter(lastName, lastValue));
                        lastName = null;
                        lastValue = null;
                        lastTokenType = TokenType.ItemSeperator;
                        break;
                    case TokenType.NameValueSeperator:
                        if (lastTokenType !== TokenType.String) {
                            throw new Error('名称值分隔符只能出现在值之后。');
                        }
                        lastName = lastValue;
                        lastValue = null;
                        lastTokenType = TokenType.NameValueSeperator;
                        break;
                    default:
                        if (lastTokenType === TokenType.String) {
                            throw new Error('不能连续出现多个值。');
                        }
                        lastValue = token.value;
                        lastTokenType = TokenType.String;
                        break;
                }
            }
            // 添加最后一个值
            parameters.push(new UbbTagParameter(lastName, lastValue));
            // 第一个项目需要特殊处理，默认是名称而非值
            if (!parameters[0].name) {
                parameters[0] = new UbbTagParameter(parameters[0].value, null);
            }
            return parameters;
        }
    };
    Object.defineProperty(UbbTagData.prototype, "tagName", {
        /**
         * 获取标签的名称。
         * @returns {string} 标签的名称。
         */
        get: function () {
            return this._parameters[0].name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagData.prototype, "mainValue", {
        /**
         * 获取标签的主要值，也即紧跟在标签名称和等号后的值。
         * @returns {string} 标签的主要值。
         */
        get: function () {
            return this._parameters[0].value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取给定参数的值。
     * @param indexOrName 要获取的参数的索引或者名称。
     * @returns {string} 给定位置参数的值。
     */
    UbbTagData.prototype.value = function (indexOrName) {
        if (typeof indexOrName === 'number') {
            return this._parameters[indexOrName].value;
        }
        else if (typeof indexOrName === 'string') {
            return this._namedParameters[indexOrName];
        }
        else {
            throw new Error('参数必须是字符串或者数字。');
        }
    };
    /**
     * 获取给定参数的名称。
     * @param index 要获取的参数的索引。
     * @returns {string} 给定位置参数的名称。
     */
    UbbTagData.prototype.name = function (index) {
        return this._parameters[index].name;
    };
    /**
     * 获取给定的参数。
     * @param index 要获取的参数的索引。
     * @returns {UbbTagParameter} 给定位置的参数。
     */
    UbbTagData.prototype.parameter = function (index) {
        return this._parameters[index];
    };
    return UbbTagData;
}());
exports.UbbTagData = UbbTagData;
/**
 * 表示 UBB 标签中单个参数的内容。
 */
var UbbTagParameter = /** @class */ (function () {
    /**
     * 初始化一个对象的新实例。
     * @param name 新参数的名称。
     * @param value 新参数的值。
     */
    function UbbTagParameter(name, value) {
        this._name = name;
        this._value = value;
    }
    Object.defineProperty(UbbTagParameter.prototype, "name", {
        /**
         * 获取参数的名称。如果参数没有名称，则该属性为 null。
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbTagParameter.prototype, "value", {
        /**
         * 获取参数的值。如果该参数没有值，则该属性为 null。
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return UbbTagParameter;
}());
/**
 * 定义 UBB 处理程序的基类。
 */
var UbbTagHandler = /** @class */ (function () {
    function UbbTagHandler() {
    }
    /**
     * 在解析完成处理标签内部的内容后，将标签本身作为文本处理。
     * @param tagData 标签相关的数据。
     * @param content 标签的内容。
     */
    UbbTagHandler.renderTagAsString = function (tagData, content) {
        return [
            "[" + tagData.orignalString + "]",
            content,
            "[/" + tagData.tagName + "]"
        ];
    };
    return UbbTagHandler;
}());
exports.UbbTagHandler = UbbTagHandler;
/**
 * 定义基于文字的 UBB 标签处理程序的基类。
 */
var TextTagHandler = /** @class */ (function (_super) {
    __extends(TextTagHandler, _super);
    function TextTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextTagHandler.prototype.exec = function (tagSegment, context) {
        return this.execCore(tagSegment.getContentText(), tagSegment.tagData, context);
    };
    return TextTagHandler;
}(UbbTagHandler));
exports.TextTagHandler = TextTagHandler;
/**
 * 定义递归处理内容的标签处理程序的基类。
 */
var RecursiveTagHandler = /** @class */ (function (_super) {
    __extends(RecursiveTagHandler, _super);
    function RecursiveTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecursiveTagHandler.prototype.exec = function (tagSegment, context) {
        var result = [];
        for (var _i = 0, _a = tagSegment.subSegments; _i < _a.length; _i++) {
            var subSeg = _a[_i];
            result.push(context.engine.execSegment(subSeg, context));
        }
        return this.execCore(result, tagSegment.tagData, context);
    };
    return RecursiveTagHandler;
}(UbbTagHandler));
exports.RecursiveTagHandler = RecursiveTagHandler;
/**
 * 定义 UBB 处理程序列表。
 */
var UbbHandlerList = /** @class */ (function () {
    function UbbHandlerList() {
        /**
         * 内部的标签处理器列表。
         */
        this._tagHandlerList = {};
    }
    /**
     * 获取给定标签名称的处理程序。
     * @param tagName 标签名称。
     * @returns {UbbTagHandler} 标签处理程序。
     */
    UbbHandlerList.prototype.getHandler = function (tagName) {
        return this._tagHandlerList[tagName] || null;
    };
    /**
     * 注册解析器标签的核心函数。
     * @param tagHandler 要注册的标签处理器。
     */
    UbbHandlerList.prototype.register = function (tagHandler) {
        if (!tagHandler || !tagHandler.tagName) {
            throw new Error('参数 tagHandler 无效，或者未提供正确的标签名称。');
        }
        // 检查是否已经注册
        if (tagHandler.tagName in this._tagHandlerList) {
            throw new Error("\u6807\u7B7E " + tagHandler.tagName + " \u5DF2\u7ECF\u88AB\u6CE8\u518C\u3002");
        }
        // 添加新项目
        this._tagHandlerList[tagHandler.tagName] = tagHandler;
    };
    return UbbHandlerList;
}());
/**
 * 注册所有处理程序。
 */
function registerAllHandlers() {
}
// 注册所有预置方法。
registerAllHandlers();
/**
 * 提供处理 UBB 程序的核心方法。
 */
var UbbCodeEngine = /** @class */ (function () {
    function UbbCodeEngine() {
        /**
         * 获取该引擎中注册的处理程序。
         */
        this._tagHandlers = new UbbHandlerList();
        /**
         * 引擎保存的上下文数据。
         */
        this._data = new UbbCodeContextData();
    }
    Object.defineProperty(UbbCodeEngine.prototype, "tagHandlers", {
        /**
         * 该引擎中注册的处理程序。
         */
        get: function () {
            return this._tagHandlers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UbbCodeEngine.prototype, "data", {
        /**
         * 获取引擎保存的上下文数据。
         * @returns {UbbCodeContextData} 引擎保存的上下文数据。
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * 获取给定标签名称的处理程序。
     * @param tagName 给定的标签名称。
     * @returns {UbbTagHandler} 给定标签名称的处理程序。
     */
    UbbCodeEngine.prototype.getHandler = function (tagName) {
        return this._tagHandlers.getHandler(tagName);
    };
    /**
     * 执行 UBB 解析的核心函数。
     * @param content 要解析的内容。
     * @param options 解析使用的相关选项。
     * @returns {string} 解析后的 HTML 代码。
     */
    UbbCodeEngine.prototype.exec = function (content, options) {
        var context = new UbbCodeContext(this, options);
        return this.execCore(content, context);
    };
    /**
     * 尝试找到关闭标记对应的开始标记，并关闭该标记。
     * @param tagName 标记名称。
     * @param parent 该标记的第一个上级。
     * @returns {UbbTagSegment} 新的上级标签。
     */
    UbbCodeEngine.tryHandleEndTag = function (tagName, parent) {
        var p = parent;
        // 循环找到合适的上级，并关闭上级
        while (p && p.tagData) {
            if (p.tagData.tagName === tagName) {
                p.close();
                return p.parent;
            }
            p = p.parent;
        }
        // 没有找到任何上级
        console.warn('UBB: 找不到结束标签 %s 的开始标签，该标签将被作为一般文字处理。', tagName);
        parent.subSegments.push(new UbbTextSegment("[/" + tagName + "]", parent));
        return parent;
    };
    /**
     * 构建标签的核心方法。
     * @param content 包含多个标签的字符串。
     * @param parent 字符串的上级容器。
     */
    UbbCodeEngine.buildSegmentsCore = function (content, parent) {
        var regExp = /([\s\S]*?)\[(.*?)]/gi;
        while (true) {
            var startIndex = regExp.lastIndex;
            var tagMatch = regExp.exec(content);
            // 未找到标记，则这是最后一个标签。
            if (!tagMatch) {
                // 提取最后一段内容，如果找到，附加到最后
                var remainContent = content.substring(startIndex);
                if (remainContent) {
                    parent.subSegments.push(new UbbTextSegment(remainContent, parent));
                }
                return;
            }
            var beforeText = tagMatch[1], tagString = tagMatch[2];
            // 添加前面的文字。
            if (beforeText) {
                parent.subSegments.push(new UbbTextSegment(beforeText, parent));
            }
            // 检测是否是结束标记
            var endTagMatch = tagString.match(/^\/(.*)$/i);
            if (endTagMatch) {
                var endTagName = endTagMatch[1];
                parent = UbbCodeEngine.tryHandleEndTag(endTagName, parent);
            }
            else {
                try {
                    // 提取新的标签数据
                    var tagData = UbbTagData.parse(tagString);
                    var newTag = new UbbTagSegment(tagData, parent);
                    parent.subSegments.push(newTag);
                    // 新上级
                    parent = newTag;
                    continue;
                }
                catch (error) {
                    // 提取数据失败，则视为没有匹配
                    console.warn('标签字符串 %s 解析失败，将被视为普通文字。', tagString);
                    parent.subSegments.push(new UbbTextSegment("[" + tagString + "]", parent));
                }
            }
        }
    };
    /**
     * 执行 UBB 处理的核心函数。
     * @param content 要处理的内容。
     * @param context UBB 处理上下文。
     * @returns {JSX.Element} 处理完成的 HTML 内容。
     */
    UbbCodeEngine.prototype.execCore = function (content, context) {
        var root = new UbbTagSegment(null, null);
        UbbCodeEngine.buildSegmentsCore(content, root);
        var result = [];
        for (var _i = 0, _a = root.subSegments; _i < _a.length; _i++) {
            var item = _a[_i];
            result.push(this.execSegment(item, context));
        }
        return result;
    };
    UbbCodeEngine.prototype.execSegment = function (segment, context) {
        if (segment.type === UbbSegmentType.Text) {
            return segment.text;
        }
        else {
            var tag = segment;
            var handler = this.getHandler(tag.tagData.tagName);
            if (!handler) {
                console.warn('没有找到标签 %s 的处理程序，将被视为一般文字。', tag.tagData.tagName);
                return tag.getFullText();
            }
            return handler.exec(tag, context);
        }
    };
    return UbbCodeEngine;
}());
exports.UbbCodeEngine = UbbCodeEngine;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactRouterDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表示应用程序的状态。
 */
var AppState = /** @class */ (function () {
    function AppState() {
    }
    return AppState;
}());
exports.AppState = AppState;
/**
 * 投票状态
 */
var TopicVoteState = /** @class */ (function () {
    function TopicVoteState() {
    }
    return TopicVoteState;
}());
exports.TopicVoteState = TopicVoteState;
/**
 * 发帖内容状态
 */
var PostTopicState = /** @class */ (function () {
    function PostTopicState() {
    }
    return PostTopicState;
}());
exports.PostTopicState = PostTopicState;
/**
 * 作者信息状态
 */
var AuthorMessageState = /** @class */ (function () {
    function AuthorMessageState() {
    }
    return AuthorMessageState;
}());
exports.AuthorMessageState = AuthorMessageState;
/**
 * 题目信息状态
 */
var TopicTitleState = /** @class */ (function () {
    function TopicTitleState() {
    }
    return TopicTitleState;
}());
exports.TopicTitleState = TopicTitleState;
/**
 * 文章内容
 */
var ContentState = /** @class */ (function () {
    function ContentState(id, content, time, isDelete, floor, isAnonymous, lastUpdateAuthor, lastUpdateTime, topicId, userName, sendTopicNumber, userImgUrl, signature, userId) {
        this.userName = userName;
        this.id = id;
        this.content = content;
        this.time = time;
        this.isAnonymous = isAnonymous;
        this.isDelete = isDelete;
        this.floor = floor;
        this.lastUpdateAuthor = lastUpdateAuthor;
        this.lastUpdateTime = lastUpdateTime;
        this.topicId = topicId;
        this.sendTopicNumber = sendTopicNumber;
        this.userImgUrl = userImgUrl;
        this.signature = signature;
        this.userId = userId;
    }
    return ContentState;
}());
exports.ContentState = ContentState;
/**
 * 点赞信息状态
 */
var TopicGoodState = /** @class */ (function () {
    function TopicGoodState() {
    }
    return TopicGoodState;
}());
exports.TopicGoodState = TopicGoodState;
/**
 * 回复者状态
 */
var ReplierState = /** @class */ (function () {
    function ReplierState() {
    }
    return ReplierState;
}());
exports.ReplierState = ReplierState;
/**
 * 首页话题信息状态
 * 拥有一个属性mainPageTopicState，为MainPageTopic类数组，用于存放组件所需的主题信息（一般为10条）
 **/
var MainPageTopicState = /** @class */ (function () {
    function MainPageTopicState() {
    }
    return MainPageTopicState;
}());
exports.MainPageTopicState = MainPageTopicState;
var ListHeadState = /** @class */ (function () {
    function ListHeadState() {
    }
    return ListHeadState;
}());
exports.ListHeadState = ListHeadState;
var ListNoticeState = /** @class */ (function () {
    function ListNoticeState() {
    }
    return ListNoticeState;
}());
exports.ListNoticeState = ListNoticeState;
var ListTagState = /** @class */ (function () {
    function ListTagState() {
    }
    return ListTagState;
}());
exports.ListTagState = ListTagState;
/**
 * 内容列表页面的状态。
 */
var ListContentState = /** @class */ (function () {
    function ListContentState() {
    }
    return ListContentState;
}());
exports.ListContentState = ListContentState;
var TopicTitleAndContentState = /** @class */ (function () {
    /*  constructor(title, authorName, lastReply) {
          this.authorName = authorName;
          this.lastReply = lastReply;
          this.title = title;
      }*/
    function TopicTitleAndContentState(title, authorName, topicid, authorId, lastPostInfo) {
        this.authorName = authorName;
        this.title = title;
        this.id = topicid;
        this.authorId = authorId;
        this.lastPostInfo = lastPostInfo;
    }
    return TopicTitleAndContentState;
}());
exports.TopicTitleAndContentState = TopicTitleAndContentState;
/**
 * 定义页码列表组件的状态。
 */
var ListPagerState = /** @class */ (function () {
    function ListPagerState() {
    }
    return ListPagerState;
}());
exports.ListPagerState = ListPagerState;
var PagerState = /** @class */ (function () {
    function PagerState(page) {
        this.pageNumber = page;
    }
    return PagerState;
}());
exports.PagerState = PagerState;
var TopicState = /** @class */ (function () {
    function TopicState(userName, title, content, time, signature, userImgUrl, hitCount, userId) {
        this.userName = userName;
        this.time = time;
        this.title = title;
        this.content = content;
        this.signature = signature;
        this.userImgUrl = userImgUrl;
        this.hitCount = hitCount;
        this.userId = userId;
    }
    return TopicState;
}());
exports.TopicState = TopicState;
/**
 * 登录状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());
exports.LoginState = LoginState;
/**
 * 已登录状态
 */
var AlreadyLoginState = /** @class */ (function () {
    function AlreadyLoginState() {
    }
    return AlreadyLoginState;
}());
exports.AlreadyLoginState = AlreadyLoginState;
/**
 * 版面类
 */
var Board = /** @class */ (function () {
    //构造方法
    function Board(name, todayPostCount, totalPostCount, boardID, master) {
        this.name = name;
        this.todayPostCount = todayPostCount;
        this.totalPostCount = totalPostCount;
        this.id = boardID;
        this.masters = master;
    }
    return Board;
}());
exports.Board = Board;
var BoardState = /** @class */ (function () {
    function BoardState() {
    }
    return BoardState;
}());
exports.BoardState = BoardState;
/**
* 用户信息
*/
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
/**
* 表示用户最近帖子
*/
var UserRecentPost = /** @class */ (function () {
    function UserRecentPost() {
    }
    return UserRecentPost;
}());
exports.UserRecentPost = UserRecentPost;
/**
 * 表示用户粉丝信息
 */
var UserFanInfo = /** @class */ (function () {
    function UserFanInfo() {
    }
    return UserFanInfo;
}());
exports.UserFanInfo = UserFanInfo;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var State = __webpack_require__(3);
var React = __webpack_require__(0);
var List_1 = __webpack_require__(9);
var $ = __webpack_require__(5);
function getBoardTopicAsync(curPage, boardid) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, boardtopics, url, response, data, totalTopicCountResponse, totalTopicCountJson, totalTopicCount, topicNumberInPage, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startPage = (curPage - 1) * 20;
                    endPage = curPage * 20 - 1;
                    boardtopics = [];
                    url = "http://api.cc98.org/Topic/Board/" + boardid;
                    return [4 /*yield*/, fetch(url, { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + boardid)];
                case 3:
                    totalTopicCountResponse = _a.sent();
                    return [4 /*yield*/, totalTopicCountResponse.json()];
                case 4:
                    totalTopicCountJson = _a.sent();
                    totalTopicCount = totalTopicCountJson.totalTopicCount;
                    if (curPage * 20 <= totalTopicCount) {
                        topicNumberInPage = 20;
                    }
                    else if (curPage === 1 && totalTopicCount < 19) {
                        topicNumberInPage = totalTopicCount;
                    }
                    else {
                        topicNumberInPage = (totalTopicCount - (curPage - 1) * 20);
                    }
                    for (i = 0; i < topicNumberInPage; i++) {
                        boardtopics[i] = new State.TopicTitleAndContentState(data[i].title, data[i].authorName || '匿名', data[i].id, data[i].authorId, data[i].lastPostInfo);
                    }
                    return [2 /*return*/, boardtopics];
            }
        });
    });
}
exports.getBoardTopicAsync = getBoardTopicAsync;
function getTopic(topicid) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, hitCountResponse, hitCountJson, hitCount, topicMessage, userMesResponse, userMesJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 0 + "-" + 0 } })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 3:
                    hitCountResponse = _a.sent();
                    return [4 /*yield*/, hitCountResponse.json()];
                case 4:
                    hitCountJson = _a.sent();
                    hitCount = hitCountJson.hitCount;
                    topicMessage = null;
                    if (!(data[0].userId != null)) return [3 /*break*/, 7];
                    return [4 /*yield*/, fetch("http://api.cc98.org/User/" + data[0].userId)];
                case 5:
                    userMesResponse = _a.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 6:
                    userMesJson = _a.sent();
                    topicMessage = new State.TopicState(data[0].userName, data[0].title, data[0].content, data[0].time, userMesJson.signatureCode, userMesJson.portraitUrl || 'https://www.cc98.org/pic/anonymous.gif', hitCount, data[0].userId);
                    return [3 /*break*/, 8];
                case 7:
                    topicMessage = new State.TopicState('匿名', data[0].title, data[0].content, data[0].time, '', 'https://www.cc98.org/pic/anonymous.gif', hitCount, null);
                    _a.label = 8;
                case 8: return [2 /*return*/, topicMessage];
            }
        });
    });
}
exports.getTopic = getTopic;
function getTopicContent(topicid, curPage) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, topic, _a, replyCountResponse, replyCountJson, replyCount, content, post, topicNumberInPage, i, userMesResponse, userMesJson, purl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    startPage = (curPage - 1) * 10;
                    endPage = curPage * 10 - 1;
                    if (!(curPage !== 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 1 + "-" + 9 } })];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    topic = _a;
                    return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 5:
                    replyCountResponse = _b.sent();
                    return [4 /*yield*/, replyCountResponse.json()];
                case 6:
                    replyCountJson = _b.sent();
                    replyCount = replyCountJson.replyCount;
                    return [4 /*yield*/, topic.json()];
                case 7:
                    content = _b.sent();
                    post = [];
                    if (curPage !== 1 && curPage * 10 <= replyCount) {
                        topicNumberInPage = 10;
                    }
                    else if (curPage === 1 && replyCount >= 9) {
                        topicNumberInPage = 9;
                    }
                    else if (curPage === 1 && replyCount < 9) {
                        topicNumberInPage = replyCount;
                    }
                    else {
                        topicNumberInPage = (replyCount - (curPage - 1) * 10);
                    }
                    i = 0;
                    _b.label = 8;
                case 8:
                    if (!(i < topicNumberInPage)) return [3 /*break*/, 13];
                    if (!(content[i].userName != null)) return [3 /*break*/, 11];
                    console.log("111");
                    return [4 /*yield*/, fetch("http://api.cc98.org/user/name/" + content[i].userName)];
                case 9:
                    userMesResponse = _b.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 10:
                    userMesJson = _b.sent();
                    post[i] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName, userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId);
                    return [3 /*break*/, 12];
                case 11:
                    purl = 'https://www.cc98.org/pic/anonymous.gif';
                    post[i] = new State.ContentState(null, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, null, content[i].lastUpdateTime, content[i].topicId, '匿名', null, purl, '', null);
                    _b.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 8];
                case 13: return [2 /*return*/, post];
            }
        });
    });
}
exports.getTopicContent = getTopicContent;
function convertHotTopic(item) {
    return React.createElement(List_1.TopicTitleAndContent, { title: item.title, authorName: item.authorName, id: item.id, authorId: item.authorId, lastPostTime: item.lastPostInfo.time, lastPostUserName: item.lastPostInfo.userName });
}
exports.convertHotTopic = convertHotTopic;
function getPager(curPage, totalPage) {
    if (curPage == undefined) {
        curPage = 1;
    }
    var pages = [];
    if (totalPage == 1) {
        pages = [1];
    }
    else if (totalPage < 10 && totalPage > 1) {
        if (curPage == undefined || curPage == 1) {
            var i = void 0;
            for (i = 0; i < totalPage; i++) {
                pages[i] = i + 1;
            }
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else if (curPage == 2) {
            var i = void 0;
            for (i = 1; i <= totalPage; i++) {
                pages[i] = i;
            }
            pages[0] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
        else {
            var i = void 0;
            for (i = 2; i <= totalPage + 1; i++) {
                pages[i] = i - 1;
            }
            pages[0] = -3;
            pages[1] = -1;
            pages[i] = -2;
            pages[i + 1] = -4;
        }
    }
    else {
        if (curPage + 5 <= totalPage) {
            if (curPage == undefined || curPage == 1) {
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -4];
            }
            else if (curPage > 1 && curPage < 6) {
                pages = [-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -4];
            }
            else {
                pages = [-3, -1, curPage - 4, curPage - 3, curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2, curPage + 3, curPage + 4, curPage + 5, -2, -4];
            }
        }
        else if (curPage + 5 > totalPage && curPage != totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage, -2, -4];
        }
        else if (curPage == totalPage) {
            return [-3, -1, totalPage - 9, totalPage - 8, totalPage - 7, totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
        }
    }
    return pages;
}
exports.getPager = getPager;
function getCurUserTopicContent(topicid, curPage, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var replyCountResponse, replyCountJson, replyCount, topic, content, post, i, j, userMesResponse, userMesJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                case 1:
                    replyCountResponse = _a.sent();
                    return [4 /*yield*/, replyCountResponse.json()];
                case 2:
                    replyCountJson = _a.sent();
                    replyCount = replyCountJson.replyCount;
                    return [4 /*yield*/, fetch("http://api.cc98.org/Post/Topic/" + topicid, { headers: { Range: "bytes=" + 1 + "-" + replyCount } })];
                case 3:
                    topic = _a.sent();
                    return [4 /*yield*/, topic.json()];
                case 4:
                    content = _a.sent();
                    post = [];
                    i = 0, j = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < replyCount)) return [3 /*break*/, 9];
                    if (!(content[i].userName == userName)) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetch("http://api.cc98.org/User/Name/" + content[i].userName)];
                case 6:
                    userMesResponse = _a.sent();
                    return [4 /*yield*/, userMesResponse.json()];
                case 7:
                    userMesJson = _a.sent();
                    post[j] = new State.ContentState(content[i].id, content[i].content, content[i].time, content[i].isDelete, content[i].floor, content[i].isAnonymous, content[i].lastUpdateAuthor, content[i].lastUpdateTime, content[i].topicId, content[i].userName || '匿名', userMesJson.postCount, userMesJson.portraitUrl, userMesJson.signatureCode, content[i].userId);
                    j++;
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 5];
                case 9: return [2 /*return*/, post];
            }
        });
    });
}
exports.getCurUserTopicContent = getCurUserTopicContent;
function sendRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/message';
    var redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ["client_id=" + appId, 'response_type=token', 'scope=all', "redirect_uri=" + redirectUri];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.sendRequest = sendRequest;
function systemRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/system';
    var redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ["client_id=" + appId, 'response_type=token', 'scope=all', "redirect_uri=" + redirectUri];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.systemRequest = systemRequest;
function responseRequest() {
    //申请到的appID
    var appId = '89084063-b0b2-45a3-87c5-a19db2ac3038';
    //申请后的回调地址
    var c = 'http://localhost:58187/messagebox/response';
    var redirectUri = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ["client_id=" + appId, 'response_type=token', 'scope=all', "redirect_uri=" + redirectUri];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}
exports.responseRequest = responseRequest;
function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus');
}
exports.changeNav = changeNav;
/**
 * 获取全站新帖
 * @param curPage
 */
function getAllNewPost(curPage) {
    return __awaiter(this, void 0, void 0, function () {
        var startPage, endPage, newTopics0, newTopics1, _a, _b, _i, i, userInfo0, userInfo1, boardInfo0, boardInfo1, newTopics;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    startPage = (curPage - 1) * 20 + 1;
                    endPage = curPage * 20;
                    return [4 /*yield*/, fetch('https://api.cc98.org/Topic/New', { headers: { Range: "bytes=" + startPage + "-" + endPage } })];
                case 1:
                    newTopics0 = _c.sent();
                    return [4 /*yield*/, newTopics0.json()];
                case 2:
                    newTopics1 = _c.sent();
                    _a = [];
                    for (_b in newTopics1)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    i = _a[_i];
                    if (!(newTopics1[i].authorName == null)) return [3 /*break*/, 4];
                    newTopics1[i].authorName = '匿名';
                    newTopics1[i].portraitUrl = 'https://www.cc98.org/pic/anonymous.gif';
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, fetch("https://api.cc98.org/User/" + newTopics1[i].authorId)];
                case 5:
                    userInfo0 = _c.sent();
                    return [4 /*yield*/, userInfo0.json()];
                case 6:
                    userInfo1 = _c.sent();
                    newTopics1[i].portraitUrl = userInfo1.portraitUrl;
                    _c.label = 7;
                case 7: return [4 /*yield*/, fetch("https://api.cc98.org/Board/" + newTopics1[i].boardId)];
                case 8:
                    boardInfo0 = _c.sent();
                    return [4 /*yield*/, boardInfo0.json()];
                case 9:
                    boardInfo1 = _c.sent();
                    newTopics1[i].boardName = boardInfo1.name;
                    /**
                    *这些数据是伪造的
                    */
                    newTopics1[i].likeCount = 6;
                    newTopics1[i].dislikeCount = 3;
                    newTopics1[i].fanCount = 28;
                    _c.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 3];
                case 11:
                    newTopics = newTopics1;
                    return [2 /*return*/, newTopics];
            }
        });
    });
}
exports.getAllNewPost = getAllNewPost;
function setStorage(key, value) {
    var v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = "obj-" + v;
    }
    else {
        v = "str-" + v;
    }
    sessionStorage.setItem(key, v);
}
exports.setStorage = setStorage;
function getStorage(key) {
    var v = sessionStorage.getItem(key);
    if (!v) {
        return;
    }
    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        return JSON.parse(v);
    }
    else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}
exports.getStorage = getStorage;
function setLocalStorage(key, value) {
    var v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = "obj-" + v;
    }
    else {
        v = "str-" + v;
    }
    localStorage.setItem(key, v);
}
exports.setLocalStorage = setLocalStorage;
function getLocalStorage(key) {
    var v = localStorage.getItem(key);
    if (!v) {
        return;
    }
    if (v.indexOf('obj-') === 0) {
        v = v.slice(4);
        return JSON.parse(v);
    }
    else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
}
exports.getLocalStorage = getLocalStorage;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
/**
 * 用户最近单个帖子组件
 */
var UserCenterExactActivitiesPost = /** @class */ (function (_super) {
    __extends(UserCenterExactActivitiesPost, _super);
    function UserCenterExactActivitiesPost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivitiesPost.prototype.render = function () {
        return (React.createElement("div", { className: "user-post" },
            React.createElement("div", { className: "user-post-info" },
                React.createElement("a", { className: "user-post-board" }, this.props.userRecentPost.board),
                React.createElement("a", { className: "user-post-date" }, this.props.userRecentPost.date),
                React.createElement("a", { className: "user-post-title" }, this.props.userRecentPost.title)),
            React.createElement("div", { className: "user-post-content" },
                React.createElement("a", null, this.props.userRecentPost.content),
                React.createElement("a", { className: "fa-thumbs-o-up" }, " " + this.props.userRecentPost.approval),
                React.createElement("a", { className: "fa-thumbs-o-down" }, " " + this.props.userRecentPost.disapproval))));
    };
    return UserCenterExactActivitiesPost;
}(React.Component));
exports.UserCenterExactActivitiesPost = UserCenterExactActivitiesPost;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(21);
/**
 * 定义 UBBContainer 组件需要使用的属性。
 */
var UbbContainerProps = /** @class */ (function () {
    function UbbContainerProps() {
    }
    return UbbContainerProps;
}());
exports.UbbContainerProps = UbbContainerProps;
/**
 * 提供用于解析 UBB 的核心组件。
 */
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
        var ubbHtml = engine.exec(this.props.code || '', options);
        //打开回车与空格00
        var style = {
            whiteSpace: 'pre-line',
            width: "100%"
        };
        // 注意兼容性设置， HTML4 不支持 article 标签
        if (options.compatibility === Ubb.UbbCompatiblityMode.Transitional) {
            return React.createElement("blockquote", { style: style }, ubbHtml);
        }
        else {
            return React.createElement("article", { style: style }, ubbHtml);
        }
    };
    return UbbContainer;
}(React.Component));
exports.UbbContainer = UbbContainer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var moment = __webpack_require__(7);
var react_router_dom_1 = __webpack_require__(2);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props, context) {
        var _this = _super.call(this, props, context) || this;
        // 默认页码
        _this.state = { page: 1, totalPage: 1, boardid: _this.match.params.boardid };
        return _this;
    }
    List.prototype.getTotalListPage = function (boardid) {
        return __awaiter(this, void 0, void 0, function () {
            var totalTopicCountResponse, totalTopicCountJson, totalTopicCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + boardid)];
                    case 1:
                        totalTopicCountResponse = _a.sent();
                        return [4 /*yield*/, totalTopicCountResponse.json()];
                    case 2:
                        totalTopicCountJson = _a.sent();
                        totalTopicCount = totalTopicCountJson.totalTopicCount;
                        return [2 /*return*/, (totalTopicCount - totalTopicCount % 20) / 20 + 1];
                }
            });
        });
    };
    List.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, boardid, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 未提供页码，防止出错不进行后续处理
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        boardid = this.match.params.boardid;
                        return [4 /*yield*/, this.getTotalListPage(boardid)];
                    case 1:
                        totalPage = _a.sent();
                        // 设置状态
                        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, boardid, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 未提供页码，防止出错不进行后续处理
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        boardid = this.match.params.boardid;
                        return [4 /*yield*/, this.getTotalListPage(boardid)];
                    case 1:
                        totalPage = _a.sent();
                        // 设置状态
                        this.setState({ page: page, totalPage: totalPage, boardid: boardid });
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.render = function () {
        return React.createElement("div", { id: "listRoot", style: { marginTop: '40px' } },
            React.createElement(ListHead, { key: this.state.page, boardid: this.state.boardid }),
            React.createElement(ListNotice, null),
            React.createElement(ListButtonAndPager, { page: this.state.page, totalPage: this.state.totalPage, boardid: this.state.boardid }),
            React.createElement(ListTag, null),
            React.createElement(react_router_dom_1.Route, { path: "/list/:boardid/:page?", component: ListContent }),
            React.createElement(PagerDown, { page: this.state.page, totalPage: this.state.totalPage, boardid: this.state.boardid }));
    };
    return List;
}(RouteComponent));
exports.List = List;
var ListHead = /** @class */ (function (_super) {
    __extends(ListHead, _super);
    function ListHead(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            imgUrl: '/images/ListImg.jpg',
            listName: '学术信息',
            todayTopics: 210,
            totalTopics: 12000,
            adsUrl: '/images/ads.jpg',
            listManager: [],
            isAnomynous: false,
            isEncrypted: false,
            isHidden: false,
            isLocked: false
        };
        return _this;
    }
    ListHead.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, managersResponse, managerJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://api.cc98.org/Board/" + this.props.boardid;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        managersResponse = _a.sent();
                        return [4 /*yield*/, managersResponse.json()];
                    case 2:
                        managerJson = _a.sent();
                        this.setState({
                            listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.componentWillRecieveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var url, managersResponse, managerJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://api.cc98.org/Board/" + newProps.boardid;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        managersResponse = _a.sent();
                        return [4 /*yield*/, managersResponse.json()];
                    case 2:
                        managerJson = _a.sent();
                        this.setState({ listName: managerJson.name, todayTopics: managerJson.todayPostCount, totalTopics: managerJson.totalTopicCount, listManager: managerJson.masters });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListHead.prototype.generateMasters = function (item) {
        var name = item.toString();
        var userName = encodeURIComponent(item.toString());
        var webUrl = "/user/name/" + userName;
        return React.createElement("div", { style: { marginRight: '10px' } },
            React.createElement("a", { href: webUrl }, name));
    };
    ListHead.prototype.render = function () {
        return React.createElement("div", { className: "column", style: { minWidth: '1140px', } },
            React.createElement("div", { className: "row", style: { flexDirection: 'row', justifyContent: 'space-between', width: '1140px' } },
                React.createElement("div", { style: { flexgrow: '1', flexDirection: 'row', display: 'flex' } },
                    React.createElement("div", { id: "ListImg" },
                        React.createElement("img", { src: this.state.imgUrl })),
                    React.createElement("div", { className: "column", style: { marginTop: '20px', marginLeft: '10px' } },
                        React.createElement("div", { className: "row", style: { marginTop: '10px' } },
                            React.createElement("div", null, "\u4ECA\u65E5\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: '10px' } }, this.state.todayTopics)),
                        React.createElement("div", { className: "row", style: { marginTop: '10px' } },
                            React.createElement("div", null, "\u603B\u4E3B\u9898"),
                            React.createElement("div", { style: { marginLeft: '20px' } }, this.state.totalTopics)))),
                React.createElement("div", { className: "column", style: { flexgrow: '0' } },
                    React.createElement("div", { id: "like" },
                        React.createElement("button", { style: { border: 'none', color: '#F5FAFC' } }, "\u2730"),
                        "  \u6536\u85CF\u7248\u9762"),
                    React.createElement("div", null,
                        React.createElement("img", { src: this.state.adsUrl, style: { width: '250px', height: '60px' } })))),
            React.createElement("div", { className: "row", style: { marginTop: '5px' } },
                React.createElement("span", null, "\u7248\u4E3B : "),
                React.createElement("div", { className: "row", style: { marginLeft: '5px' } }, this.state.listManager.map(this.generateMasters))));
    };
    return ListHead;
}(RouteComponent));
exports.ListHead = ListHead;
var ListNotice = /** @class */ (function (_super) {
    __extends(ListNotice, _super);
    function ListNotice(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            notice: '1. 请大家首先阅读心灵之约版规再发帖，如有违规不接受pm卖萌求情；2. 诚征新版主，请去论坛事务版搜之前的版面负责人申请帖并遵循格式发帖，如有不明可以站短站务组组长咨询。3. 不要留联系方式！不要留联系方式！不要留联系方式！重要的事说三遍！，留任何联系方式tp1000天。 4. 更新了版规，增加了tp规则：成功诱导对方留联系方式的，tp1000天；修订了锁沉规则：有意义言之有物、希望继续讨论的长篇读后感将给予保留。5. 请理性讨论，不要人身攻击。违者tp1天起，累犯或严重的，上不封顶。',
        };
        return _this;
    }
    ListNotice.prototype.render = function () {
        return React.createElement("div", { className: "notice", style: { marginTop: '10px' } },
            React.createElement("div", { id: "noticeName" },
                React.createElement("span", { style: { marginLeft: '15px', marginTop: '7px', color: '#FFFFFF' } }, "\u672C\u7248\u516C\u544A")),
            React.createElement("span", { style: { marginLeft: '15px', marginTop: '15px', marginRight: '15px' } }, this.state.notice));
    };
    return ListNotice;
}(RouteComponent));
exports.ListNotice = ListNotice;
/**
 * 提供显示连续页码的交互效果。
 */
var ListButtonAndPager = /** @class */ (function (_super) {
    __extends(ListButtonAndPager, _super);
    function ListButtonAndPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    ListButtonAndPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, boardid: this.props.boardid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    ListButtonAndPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    ListButtonAndPager.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    ListButtonAndPager.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { style: { marginBottom: '20px' } },
                React.createElement("button", { className: "button orange" }, "\u53D1\u4E3B\u9898"),
                React.createElement("button", { className: "button green", style: { marginLeft: '20px' } }, "\u53D1\u6295\u7968")),
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return ListButtonAndPager;
}(React.Component));
exports.ListButtonAndPager = ListButtonAndPager;
var PagerDown = /** @class */ (function (_super) {
    __extends(PagerDown, _super);
    function PagerDown(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    PagerDown.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, boardid: this.props.boardid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    PagerDown.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    PagerDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    PagerDown.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return PagerDown;
}(React.Component));
exports.PagerDown = PagerDown;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var pageUrl;
        if (this.props.pageNumber > 0) {
            pageUrl = "/list/" + this.props.boardid + "/" + this.props.pageNumber;
            if (this.props.pageNumber !== this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link" }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { to: pageUrl, className: "page-link " }, this.props
                        .pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            pageUrl = "/list/" + this.props.boardid + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039"));
        }
        else if (this.props.pageNumber == -2) {
            pageUrl = "/list/" + this.props.boardid + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A"));
        }
        else if (this.props.pageNumber == -3) {
            pageUrl = "/list/" + this.props.boardid + "/1";
            return React.createElement("li", { className: "page-item" },
                " ",
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u00AB"));
        }
        else if (this.props.pageNumber == -4) {
            pageUrl = "/list/" + this.props.boardid + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u00BB"));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
var ListTag = /** @class */ (function (_super) {
    __extends(ListTag, _super);
    function ListTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListTag.prototype.render = function () {
        return React.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '1140px', borderTop: 'dashed #EAEAEA thin', marginTop: '25px', marginBottom: '25px' } },
            React.createElement("div", { className: "row" },
                "  ",
                React.createElement("button", { id: "tagButton" }, "\u5168\u90E8"),
                React.createElement("button", { className: "chooseTag" },
                    "dota ",
                    React.createElement("span", { className: "tagNumber" }, "1234")),
                React.createElement("button", { className: "chooseTag" },
                    "csgo ",
                    React.createElement("span", { className: "tagNumber" }, "5687"))));
    };
    return ListTag;
}(React.Component));
exports.ListTag = ListTag;
var ListContent = /** @class */ (function (_super) {
    __extends(ListContent, _super);
    function ListContent() {
        var _this = _super.call(this) || this;
        _this.state = { items: [] };
        return _this;
    }
    ListContent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getBoardTopicAsync(1, this.match.params.boardid)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.convertTopicToElement = function (item) {
        return React.createElement(TopicTitleAndContent, { key: item.title, title: item.title, authorName: item.authorName, id: item.id, authorId: item.authorId, lastPostTime: item.lastPostInfo.time, lastPostUserName: item.lastPostInfo.userName });
    };
    ListContent.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, p, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = newProps.match.params.page;
                        // 未提供页码，防止出错不进行后续处理
                        if (!p) {
                            page = 1;
                        }
                        else {
                            page = parseInt(p);
                        }
                        return [4 /*yield*/, Utility.getBoardTopicAsync(page, this.match.params.boardid)];
                    case 1:
                        data = _a.sent();
                        this.setState({ items: data });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListContent.prototype.render = function () {
        return React.createElement("div", { className: "listContent " },
            React.createElement("div", { className: "row", style: { justifyContent: 'space-between', } },
                React.createElement("div", { className: "row", style: { height: '40px', marginTop: '5px' } },
                    React.createElement("div", null,
                        React.createElement("button", { className: "listContentTag" }, "\u5168\u90E8"),
                        React.createElement("button", { className: "listContentTag" }, "\u7CBE\u534E"),
                        React.createElement("button", { className: "listContentTag" }, "\u6700\u70ED"))),
                React.createElement("div", { className: "row", style: { height: '40px', alignItems: 'center' } },
                    React.createElement("div", { style: { marginRight: '52px', marginLeft: '15px' } },
                        React.createElement("span", null, "\u4F5C\u8005")),
                    React.createElement("div", { style: { marginRight: '85px', marginLeft: '15px' } },
                        React.createElement("span", null, "\u6700\u540E\u53D1\u8868")))),
            React.createElement("div", null, this.state.items.map(this.convertTopicToElement)));
    };
    return ListContent;
}(RouteComponent));
exports.ListContent = ListContent;
var TopicTitleAndContent = /** @class */ (function (_super) {
    __extends(TopicTitleAndContent, _super);
    function TopicTitleAndContent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            title: _this.props.title,
            authorName: _this.props.authorName,
            likeNumber: 123,
            dislikeNumber: 11,
            commentNumber: 214,
            lastPostUserName: _this.props.lastPostUserName,
            lastPostTime: _this.props.lastPostTime,
            id: _this.props.id,
            authorId: _this.props.authorId
        };
        return _this;
    }
    TopicTitleAndContent.prototype.render = function () {
        var url = "/topic/" + this.state.id;
        return React.createElement("div", { id: "changeColor" },
            React.createElement("div", { className: "row topicInList" },
                React.createElement(react_router_dom_1.Link, { to: url },
                    React.createElement("div", { style: { marginLeft: '20px', } },
                        " ",
                        React.createElement("span", null, this.state.title))),
                React.createElement("div", { className: "row", style: { width: "500px", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" } },
                    React.createElement("div", { style: { width: "100px", marginRight: '10px', marginLeft: '15px' } },
                        " ",
                        React.createElement("span", null,
                            React.createElement("a", null, this.state.authorName))),
                    React.createElement("div", { className: "row", style: { width: "150px", flexDirection: 'row', alignItems: 'flex-end', justifyContent: "space-between" } },
                        React.createElement("div", { id: "liked", style: { display: "flex" } },
                            React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.likeNumber)),
                        React.createElement("div", { id: "disliked", style: { display: "flex" } },
                            React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.dislikeNumber)),
                        React.createElement("div", { id: "commentsAmount", style: { display: "flex" } },
                            React.createElement("i", { className: "fa fa-commenting-o fa-lg" }),
                            React.createElement("span", { className: "timeProp tagSize" }, this.state.commentNumber))),
                    React.createElement("div", { id: "lastReply", style: { width: "100px" } },
                        React.createElement("span", null,
                            this.state.lastPostUserName,
                            " ")),
                    React.createElement("div", { style: { width: "150px", marginRight: "20px" } },
                        React.createElement("span", null, moment(this.state.lastPostTime).format('YYYY-MM-DD HH:mm:ss'))))));
    };
    return TopicTitleAndContent;
}(React.Component));
exports.TopicTitleAndContent = TopicTitleAndContent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(8);
/**
 * 用户中心主页个人资料组件
 */
var UserCenterExactProfile = /** @class */ (function (_super) {
    __extends(UserCenterExactProfile, _super);
    function UserCenterExactProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactProfile.prototype.render = function () {
        console.log(this.props.userInfo.signatureCode);
        return (React.createElement("div", { className: "user-profile" },
            React.createElement("div", { id: "userId" },
                React.createElement("p", null, this.props.userInfo.name),
                React.createElement("button", { type: "button" }, "\u79C1\u4FE1")),
            React.createElement("div", { id: "userGenderAndBirthday" },
                React.createElement("p", null,
                    "\u6027\u522B  ",
                    (this.props.userInfo.gender === 0) ? '男' : '女',
                    " "),
                this.props.userInfo.birthday === null ? '' : React.createElement("p", null,
                    "\u751F\u65E5  ",
                    this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T')))),
            this.props.userInfo.personalDescription ?
                React.createElement("div", { className: "user-description" },
                    React.createElement("p", null, "\u4E2A\u4EBA\u8BF4\u660E"),
                    React.createElement("img", { src: this.props.userInfo.photourl }),
                    React.createElement("p", null, this.props.userInfo.personalDescription)) : null,
            this.props.userInfo.signatureCode ?
                React.createElement("div", { className: "user-description" },
                    React.createElement("p", null, "\u4E2A\u6027\u7B7E\u540D"),
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.userInfo.signatureCode })) : null));
    };
    return UserCenterExactProfile;
}(React.Component));
exports.UserCenterExactProfile = UserCenterExactProfile;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterExactActivitiesPosts_1 = __webpack_require__(43);
var UserCenterExactActivitiesReplies_1 = __webpack_require__(44);
/**
 * 用户中心主页近期动态组件
 */
var UserCenterExactActivities = /** @class */ (function (_super) {
    __extends(UserCenterExactActivities, _super);
    function UserCenterExactActivities() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactActivities.prototype.render = function () {
        return (React.createElement("div", { className: "user-activities" },
            React.createElement("p", null, "\u8FD1\u671F\u52A8\u6001"),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(CustomLink, { to: "" + location.pathname, label: "主题", activeOnlyWhenExact: true }),
                    " | ",
                    React.createElement(CustomLink, { to: location.pathname + "/replies", label: "回复", activeOnlyWhenExact: false }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "" + location.pathname, component: UserCenterExactActivitiesPosts_1.UserCenterExactActivitiesPosts }),
                    React.createElement(react_router_dom_1.Route, { path: location.pathname + "/replies", component: UserCenterExactActivitiesReplies_1.UserCenterExactActivitiesReplies }))),
            React.createElement("hr", null),
            React.createElement("div", { className: "user-activities-nomore" },
                React.createElement("p", null, "\u6CA1\u6709\u66F4\u591A\u5566"))));
    };
    return UserCenterExactActivities;
}(React.Component));
exports.UserCenterExactActivities = UserCenterExactActivities;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
//用户中心主页用户头像与徽章组件
var UserCenterExactAvatar = /** @class */ (function (_super) {
    __extends(UserCenterExactAvatar, _super);
    function UserCenterExactAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExactAvatar.prototype.render = function () {
        return (React.createElement("div", { className: "user-avatar" },
            React.createElement("img", { className: "user-avatar-img", src: this.props.userAvatarImgURL }),
            React.createElement("div", { className: "user-badge" })));
    };
    return UserCenterExactAvatar;
}(React.Component));
exports.UserCenterExactAvatar = UserCenterExactAvatar;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
//用户中心我的关注&我的粉丝用户通用组件
var UserCenterMyFollowingsUser = /** @class */ (function (_super) {
    __extends(UserCenterMyFollowingsUser, _super);
    function UserCenterMyFollowingsUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyFollowingsUser.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-myfollowings-user" },
            React.createElement("img", { src: this.props.userFanInfo.avatarImgURL }),
            React.createElement("p", null,
                React.createElement("span", { className: "user-center-myfollowings-user-id" }, this.props.userFanInfo.name),
                "\u4E3B\u9898",
                React.createElement("span", { className: "user-center-myfollowings-user-posts" }, this.props.userFanInfo.posts),
                "\u7C89\u4E1D",
                React.createElement("span", { className: "user-center-myfollowings-user-fans" }, this.props.userFanInfo.fans)),
            React.createElement("button", { type: "button" }, "\u53D6\u6D88\u5173\u6CE8")));
    };
    return UserCenterMyFollowingsUser;
}(React.Component));
exports.UserCenterMyFollowingsUser = UserCenterMyFollowingsUser;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var MyMessageResponsebox = /** @class */ (function (_super) {
    __extends(MyMessageResponsebox, _super);
    function MyMessageResponsebox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */
    MyMessageResponsebox.prototype.render = function () {
        return (React.createElement("div", { className: "mymessage-response-box" },
            React.createElement("div", { className: "mymessage-response-box-left" },
                React.createElement("img", { className: "mymessage-response-img", src: this.props.chatPortraitUrl })),
            React.createElement("div", { className: "mymessage-response-box-middle" },
                React.createElement("div", { className: "mymessage-response-box-middle-name" }, this.props.senderName),
                React.createElement("div", { className: "mymessage-response-box-middle-title" }, this.props.title),
                React.createElement("div", { className: "mymessage-response-box-middle-date" }, this.props.sendTime),
                React.createElement("div", { className: "mymessage-response-box-middle-content" }, this.props.content)),
            React.createElement("div", { className: "mymessage-response-box-right" }, "\u67E5\u770B")));
    };
    return MyMessageResponsebox;
}(React.Component));
exports.MyMessageResponsebox = MyMessageResponsebox;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var FocusPostComponent_1 = __webpack_require__(67);
var Utility = __webpack_require__(4);
/**
 * 表示我关注的某个版面的主题列表
 */
var FocusPostAreaComponent = /** @class */ (function (_super) {
    __extends(FocusPostAreaComponent, _super);
    /**
     * 构造函数
     * @param props
     */
    function FocusPostAreaComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            curPage: 1,
            loading: true
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    /**
     * 进入立即获取20条新帖的数据，同时为滚动条添加监听事件
     */
    FocusPostAreaComponent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getAllNewPost(this.state.curPage)];
                    case 1:
                        data = _a.sent();
                        this.setState({ data: data });
                        document.addEventListener('scroll', this.handleScroll);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    FocusPostAreaComponent.prototype.componentWillUnmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.removeEventListener('scroll', this.handleScroll);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 处理滚动的函数
     */
    FocusPostAreaComponent.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isBottom() && this.state.loading)) return [3 /*break*/, 5];
                        /**
                        *查看新帖数目大于100条时不再继续加载
                        */
                        if (this.state.curPage >= 5) {
                            $('#focus-post-loading').addClass('displaynone');
                            $('#focus-post-loaddone').removeClass('displaynone');
                            return [2 /*return*/];
                        }
                        /**
                        *发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
                        */
                        this.setState({ loading: false });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utility.getAllNewPost(this.state.curPage + 1)];
                    case 2:
                        newData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        /**
                        *如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ loading: true });
                        return [2 /*return*/];
                    case 4:
                        /**
                        *如果正确获取到数据，则添加新数据，翻页+1，同时this.state.loading设置为true，后续才可以再次发送fetch请求
                        */
                        this.setState({ data: this.state.data.concat(newData), curPage: this.state.curPage + 1, loading: true });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 将主题排列好
     */
    FocusPostAreaComponent.prototype.render = function () {
        return React.createElement("div", { className: "focus-post-area" },
            React.createElement("div", { className: "focus-post-topicArea" }, this.state.data.map(coverFocusPost)),
            React.createElement("div", { className: "focus-post-loading", id: "focus-post-loading" },
                React.createElement("img", { src: "http://ww3.sinaimg.cn/large/0060lm7Tgy1fitwrd6yv0g302s0093y9.gif" })),
            React.createElement("div", { className: "focus-post-loaddone displaynone", id: "focus-post-loaddone" }, "---------------------- \u5DF2\u52A0\u8F7D100\u6761\u65B0\u5E16\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u66F4\u591A ----------------------"));
    };
    return FocusPostAreaComponent;
}(React.Component));
exports.FocusPostAreaComponent = FocusPostAreaComponent;
/**
* 单个主题数据转换成单个主题组件
*/
function coverFocusPost(item) {
    return React.createElement(FocusPostComponent_1.FocusPostComponent, { title: item.title, hitCount: item.hitCount, id: item.id, boardId: item.boardId, boardName: item.boardName, replyCount: item.replyCount, authorName: item.authorName, portraitUrl: item.portraitUrl, createTime: item.createTime, likeCount: item.likeCount, dislikeCount: item.dislikeCount, fanCount: item.fanCount });
}
/**
*滚动条在Y轴上的滚动距离
*/
function getScrollTop() {
    var scrollTop = 0;
    var bodyScrollTop = 0;
    var documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
/**
*文档的总高度
*/
function getScrollHeight() {
    var scrollHeight = 0;
    var bodyScrollHeight = 0;
    var documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
/**
*浏览器视口的高度
*/
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    }
    else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
/**
*判断滚动条是否滚动到底部
*/
function isBottom() {
    /*
    *预留100px给“正在加载”的提示标志
    */
    if (getScrollTop() + getWindowHeight() + 100 > getScrollHeight()) {
        return true;
    }
    else {
        return false;
    }
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(79);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(18);
var App_1 = __webpack_require__(19);
// 显示应用程序核心内容
ReactDOM.render(React.createElement(App_1.App, null), document.getElementById('root'));


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var post_1 = __webpack_require__(20);
var List_1 = __webpack_require__(9);
var CurUserPost_1 = __webpack_require__(37);
var BoardList_1 = __webpack_require__(38);
var UserCenter_1 = __webpack_require__(39);
var MyMessage_1 = __webpack_require__(56);
var AllNewPost_1 = __webpack_require__(66);
var MyFocusBoard_1 = __webpack_require__(68);
var Header_1 = __webpack_require__(71);
var Footer_1 = __webpack_require__(72);
var MainPage_1 = __webpack_require__(73);
var User_1 = __webpack_require__(74);
var Login_1 = __webpack_require__(77);
var LoginTest_1 = __webpack_require__(78);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.match = props.match;
        return _this;
    }
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
/* <h1>Ashida Mana~</h1>
                <li><Link to="/topic/4723305">moe</Link></li>
                <li><Link to="/boardlist">meow</Link></li>
                <li><a href={`https://login.cc98.org/OAuth/Authorize?scope=getuserinfo*&response_type=token&client_id=9428333a-a0e3-486b-b375-7904f1bceba9&redirect_uri=http%3A%2F%2Flocalhost%3A${location.port}%2Fusercenter`} > 登陆</a></li>
                <li><Link to="/usercenter">个人中心</Link></li>
                <li><Link to="/messagebox">信箱</Link></li>
                <li><Link to="/newtopics">新帖 </Link></li>
                 <hr />*/
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        /*
        const data =
            '妹子是河南人 96年的 双鱼座 现在是浙江大学传媒学院研一新生 坐标：西溪 身高162 颜值见照片啦 喜欢健身 吃吃喝喝 追剧（传媒学子的基本素养） 性格随和 非常好相处 有一点点“傻白甜” 厨艺也很棒，吃过她做的大盘鸡，超级美味！ 之前有过一次恋爱经历，但因为对方没有“男友力”，缺乏安全感就分手了 和小姐姐一起做室友很偶然也很有缘分，觉得她就是那种比较单纯，性格非常温和，虽然比我小，但是非常会照顾人，希望她能够早日在浙大找到对的人！ 所以希望你~ 有一个强壮的体魄，身高在178左右（可以约健身房哦！） 有一颗温暖的心灵，让妹子有所依靠 诚恳、踏实、爱奋斗~ QQ：2577047698 （希望你加QQ时能够介绍一下自己，也能分享一张自己的照片~） 之前妹子qq验证出了点问题，现在ok了哦，所以有意的小哥哥们就上吧！ 当当当当~王道时间： [upload=jpg,1]http://file.cc98.org/uploadfile/2017/9/18/2344641658.jpg[/upload]（昨天刚刚新鲜出炉的开学典礼照片哟~） [upload=jpg,1]http://file.cc98.org/uploadfile/2017/9/18/2351342848.jpg[/upload]（还有美腻的自拍！） 非诚勿扰哦！ [em07]';*/
        return React.createElement("div", null,
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { style: { backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column' } },
                    React.createElement(Header_1.Header, null),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: MainPage_1.MainPage }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/:page?", component: post_1.Post }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/topic/:topicid/user/:userName/:page?", component: CurUserPost_1.CurUserPost }),
                    React.createElement(react_router_dom_1.Route, { path: "/list/:boardid/:page?", component: List_1.List }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/boardlist", component: BoardList_1.BoardList }),
                    React.createElement(react_router_dom_1.Route, { path: "/usercenter", component: UserCenter_1.UserCenter }),
                    React.createElement(react_router_dom_1.Route, { path: "/mymessage", component: MyMessage_1.MyMessage }),
                    React.createElement(react_router_dom_1.Route, { path: "/focus", component: MyFocusBoard_1.MyFocusBoard }),
                    React.createElement(react_router_dom_1.Route, { path: "/newtopics", component: AllNewPost_1.AllNewPost }),
                    React.createElement(react_router_dom_1.Route, { path: "/user", component: User_1.User }),
                    React.createElement(react_router_dom_1.Route, { path: "/login", component: Login_1.Login }),
                    React.createElement(react_router_dom_1.Route, { path: "/logintest", component: LoginTest_1.LoginTest }),
                    React.createElement(Footer_1.Footer, null))));
    };
    return App;
}(React.Component));
exports.App = App;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var $ = __webpack_require__(5);
var react_router_dom_1 = __webpack_require__(2);
var UbbContainer_1 = __webpack_require__(8);
var SendTopic_1 = __webpack_require__(36);
var moment = __webpack_require__(7);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { page: 1, topicid: _this.match.params.topicid, totalPage: 1, userName: null };
        return _this;
    }
    Post.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, userName, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        userName = newProps.match.params.userName;
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, totalPage, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        userName = this.match.params.userName;
                        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.getTotalPage = function (topicid) {
        return __awaiter(this, void 0, void 0, function () {
            var replyCountResponse, replyCountJson, replyCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                    case 1:
                        replyCountResponse = _a.sent();
                        return [4 /*yield*/, replyCountResponse.json()];
                    case 2:
                        replyCountJson = _a.sent();
                        replyCount = replyCountJson.replyCount;
                        if (replyCount > 10) {
                            return [2 /*return*/, (replyCount - replyCount % 10) / 10 + 1];
                        }
                        else {
                            return [2 /*return*/, 1];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.returnTopic = function () {
        return React.createElement(PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid });
    };
    Post.prototype.render = function () {
        var topic = null;
        if (this.state.page == 1) {
            topic = React.createElement(PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid });
        }
        return React.createElement("div", { className: "center", style: { minWidth: "1140px" } },
            React.createElement(TopicPager, { page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            topic,
            React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/:page?", component: Reply }),
            React.createElement(TopicPagerDown, { page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            React.createElement(SendTopic_1.SendTopic, { topicid: this.state.topicid }));
    };
    return Post;
}(RouteComponent));
exports.Post = Post;
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            contents: [],
        };
        return _this;
    }
    Reply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, storageId, realContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page || 1;
                        storageId = "TopicContent_" + newProps.match.params.topicid + "_" + page;
                        if (!!Utility.getStorage(storageId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utility.getTopicContent(newProps.match.params.topicid, page)];
                    case 1:
                        realContents = _a.sent();
                        Utility.setStorage(storageId, realContents);
                        return [3 /*break*/, 3];
                    case 2:
                        realContents = Utility.getStorage(storageId);
                        _a.label = 3;
                    case 3:
                        this.setState({ contents: realContents });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.generateContents = function (item) {
        return React.createElement("div", { className: "reply" },
            React.createElement("div", { style: { marginTop: "15px", marginBotton: "5px", border: "#EAEAEA solid thin" } },
                React.createElement(Replier, { key: item.id, userId: item.userId, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber }),
                React.createElement(ReplyContent, { key: item.content, content: item.content, signature: item.signature })));
    };
    Reply.prototype.render = function () {
        return React.createElement("div", { className: "center", style: { width: "1140px" } }, this.state.contents.map(this.generateContents));
    };
    return Reply;
}(RouteComponent));
exports.Reply = Reply;
var Replier = /** @class */ (function (_super) {
    __extends(Replier, _super);
    function Replier(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            imgUrl: "/images/authorImg.jpg",
            timeImgUrl: "/images/clock.jpg",
            userName: "VayneTian",
            replyTime: Date(),
            topicsNumber: 999,
            level: 2,
        };
        return _this;
    }
    Replier.prototype.render = function () {
        var url = "/user/" + this.props.userId;
        var realUrl = encodeURIComponent(url);
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName;
        $(document).ready(function () {
            $(".authorImg").mouseenter(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).next(".userDetails").show();
            });
            $(".mouse-userDetails").mouseleave(function (event) {
                var currentImage = event.currentTarget;
                $(currentImage).find(".userDetails").hide();
            });
        });
        var topicNumber = '帖数';
        if (!this.props.userId) {
            topicNumber = '';
        }
        var userDetails;
        if (this.props.userName != '匿名') {
            userDetails = React.createElement(UserDetails, { userName: this.props.userName });
        }
        else {
            userDetails = null;
        }
        return React.createElement("div", { className: "replyRoot" },
            React.createElement("div", { className: "row", style: { width: "1140px", display: "flex", marginBottom: "10px" } },
                React.createElement("div", { className: "row mouse-userDetails", style: { height: "250px", width: "380px" } },
                    React.createElement("div", { className: "authorImg" },
                        React.createElement("a", { href: realUrl },
                            React.createElement("img", { src: this.props.userImgUrl }))),
                    React.createElement("div", { className: "userDetails", style: { display: "none", position: "absolute", zindedx: "1" } }, userDetails)),
                React.createElement("div", { className: "column", id: "rpymes", style: { marginLeft: "-300px" } },
                    React.createElement("div", { className: "row", id: "replierMes" },
                        React.createElement("div", { style: { marginLeft: "10px" } },
                            React.createElement("span", null,
                                this.props.floor,
                                "L")),
                        React.createElement("div", { className: "rpyClr", style: { marginLeft: "10px" } },
                            React.createElement("a", { href: url }, this.props.userName)),
                        React.createElement("div", { id: "topicsNumber", style: { marginLeft: "10px" } },
                            topicNumber,
                            "   ",
                            React.createElement("span", { className: "rpyClrodd" }, this.props.sendTopicNumber),
                            " ")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { id: "clockimg", style: { marginLeft: "6px" } },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "timeProp" }, moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss'))))),
                React.createElement("div", { id: "operation" },
                    React.createElement("button", { className: "operation" }, "\u5F15\u7528"),
                    React.createElement("button", { className: "operation" }, "\u7F16\u8F91"),
                    React.createElement("button", { className: "operation" }, "\u79C1\u4FE1"),
                    React.createElement("button", { className: "operation" }, "\u4E3E\u62A5"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"))));
    };
    return Replier;
}(RouteComponent));
exports.Replier = Replier;
var UserDetails = /** @class */ (function (_super) {
    __extends(UserDetails, _super);
    function UserDetails(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ portraitUrl: null, userName: null });
        return _this;
    }
    UserDetails.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, message, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.props.userName != '匿名')) return [3 /*break*/, 3];
                        url = "http://api.cc98.org/user/name/" + this.props.userName;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        message = _a.sent();
                        return [4 /*yield*/, message.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({ portraitUrl: data.portraitUrl, userName: data.name });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDetails.prototype.render = function () {
        var url = "/user/name/" + this.props.userName;
        var userUrl = encodeURIComponent(url);
        if (this.props.userName != '匿名') {
            return React.createElement("div", { className: 'popup' },
                React.createElement("div", { className: 'popup_title' },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "row authorImg", style: { marginLeft: "10px", marginTop: "10px" } },
                            React.createElement("a", { href: userUrl },
                                " ",
                                React.createElement("img", { src: this.state.portraitUrl }))),
                        React.createElement("div", { className: "column", style: { marginLeft: "25px", marginTop: "30px" } },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { style: { fontFamily: "微软雅黑", color: "blue", marginRight: "10px" } },
                                    " ",
                                    this.state.userName),
                                "   ",
                                React.createElement("div", { style: { marginRight: "10px", fontSize: "14px" } }, "   \u7C89\u4E1D  "),
                                React.createElement("div", { style: { color: "red", fontSize: "12px" } }, "2333")),
                            React.createElement("div", { className: "row", style: { marginTop: "10px", fontSize: "14px" } }, "\u6280\u672F\u7EC4\u7EC4\u957F")),
                        React.createElement("div", null,
                            React.createElement("button", { id: "watch", style: { width: "80px", backgroundColor: "#FF6A6A", marginRight: "10px", marginLeft: "25px", marginTop: "50px", height: "30px" } }, "\u5173\u6CE8")))));
        }
        else {
            return;
        }
    };
    return UserDetails;
}(RouteComponent));
exports.UserDetails = UserDetails;
var PostTopic = /** @class */ (function (_super) {
    __extends(PostTopic, _super);
    function PostTopic(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            topicMessage: { title: "加载中...", time: "", content: "", signature: "" }
        };
        return _this;
    }
    PostTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topicMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getTopic(this.props.topicid)];
                    case 1:
                        topicMessage = _a.sent();
                        this.setState({ topicMessage: topicMessage });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostTopic.prototype.render = function () {
        return React.createElement("div", { className: "root" },
            React.createElement("div", { className: "essay" },
                React.createElement(AuthorMessage, { authorId: this.state.topicMessage.userId, authorName: this.state.topicMessage.userName, authorImgUrl: this.state.topicMessage.userImgUrl }),
                React.createElement(TopicTitle, { Title: this.state.topicMessage.title, Time: this.state.topicMessage.time, HitCount: this.state.topicMessage.hitCount }),
                React.createElement("div", { id: "ads" },
                    React.createElement("img", { src: this.props.imgUrl }))),
            React.createElement(TopicContent, { content: this.state.topicMessage.content, signature: this.state.topicMessage.signature }),
            React.createElement(TopicGood, null),
            React.createElement(TopicVote, null));
    };
    return PostTopic;
}(RouteComponent));
exports.PostTopic = PostTopic;
var AuthorMessage = /** @class */ (function (_super) {
    __extends(AuthorMessage, _super);
    function AuthorMessage(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: _this.props.authorImgUrl
        };
        return _this;
    }
    AuthorMessage.prototype.render = function () {
        var url = "/user/" + this.props.authorId;
        return React.createElement("div", { className: "row", id: "authormes" },
            React.createElement("div", { className: "authorImg" },
                React.createElement("a", { href: url },
                    React.createElement("img", { src: this.props.authorImgUrl }))),
            React.createElement("div", { className: "column", style: { marginLeft: "20px" } },
                React.createElement("div", { className: "row authorFans", style: { justifyContent: "space-between" } },
                    React.createElement("div", { id: "authorName" },
                        React.createElement("p", null,
                            React.createElement("a", { href: url }, this.props.authorName))),
                    React.createElement("div", { id: "fans", className: "row" },
                        React.createElement("div", { style: { marginRight: "3px" } }, "\u7C89\u4E1D"),
                        React.createElement("div", { style: { color: "#EE0000" } }, this.state.fansNumber))),
                React.createElement("div", { className: "row" },
                    React.createElement("button", { id: "watch" }, "\u5173\u6CE8"),
                    React.createElement("button", { id: "email" }, "\u79C1\u4FE1"))));
    };
    return AuthorMessage;
}(RouteComponent));
exports.AuthorMessage = AuthorMessage;
var TopicTitle = /** @class */ (function (_super) {
    __extends(TopicTitle, _super);
    function TopicTitle(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            isNotice: true,
            isTop: true,
            title: "这是一个长长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊的标题",
            tag: "女装/开车",
            time: "2017.8.12",
            likeNumber: 666,
            unlikeNumber: 233,
            viewTimes: 2366
        };
        return _this;
    }
    TopicTitle.prototype.returnProps = function (isTop, isNotice, title) {
        if (isTop == true && isNotice == false) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else if (isTop == false && isNotice == true) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else if (isTop == true && isNotice == true) {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
        else {
            return React.createElement("div", { id: "title1", className: "row", style: { justifyContent: "flex-start" } },
                React.createElement("div", { id: "essayTitle" }, title));
        }
    };
    TopicTitle.prototype.render = function () {
        return React.createElement("div", { id: "title" },
            React.createElement("div", { className: "column", id: "topicTitleProp" },
                React.createElement("div", { id: "essay1", className: "row" }, this.returnProps(this.state.isTop, this.state.isNotice, this.props.Title)),
                React.createElement("div", { className: "row", id: "essayProp" },
                    React.createElement("div", { id: "tags" },
                        React.createElement("span", { className: "tagProp tagSize" },
                            "\u6807\u7B7E\uFF1A ",
                            this.state.tag),
                        React.createElement("span", { className: "tagProp" })),
                    React.createElement("div", { id: "time" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" }, moment(this.props.Time).format('YYYY-MM-DD HH:mm:ss'))),
                    React.createElement("div", { id: "viewtimes" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-eye fa-lg fa-fw" }),
                            "  "),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" },
                            this.props.HitCount,
                            "\u6B21")))));
    };
    return TopicTitle;
}(RouteComponent));
exports.TopicTitle = TopicTitle;
var TopicContent = /** @class */ (function (_super) {
    __extends(TopicContent, _super);
    function TopicContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
        };
        return _this;
    }
    //<div className="signature">{this.state.Signature}</div>
    TopicContent.prototype.render = function () {
        return React.createElement("div", { className: "content" },
            React.createElement("div", { className: "substance" },
                React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content }),
                " "),
            React.createElement("div", { className: "signature" },
                React.createElement(UbbContainer_1.UbbContainer, { code: this.props.signature })),
            React.createElement("div", { className: "comment" },
                React.createElement("div", { id: "commentlike", className: "buttonFont" },
                    React.createElement("button", { className: "commentbutton" },
                        React.createElement("i", { className: "fa fa-star-o fa-lg" })),
                    "   \u6536\u85CF\u6587\u7AE0 "),
                React.createElement("div", { id: "commentliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.likeNumber)),
                React.createElement("div", { id: "commentunliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.dislikeNumber)),
                React.createElement("div", { id: "commentlike", className: "buttonFont row" },
                    " ",
                    React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206"),
                    React.createElement("div", { className: "commentbutton" }, "   \u7F16\u8F91"))));
    };
    return TopicContent;
}(RouteComponent));
exports.TopicContent = TopicContent;
var ReplyContent = /** @class */ (function (_super) {
    __extends(ReplyContent, _super);
    function ReplyContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 2424,
            dislikeNumber: 4433,
        };
        return _this;
    }
    //content: "央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。</p><p>央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。",
    //
    ReplyContent.prototype.render = function () {
        return React.createElement("div", { className: "root", style: { marginTop: "-170px" } },
            React.createElement("div", { className: "reply-content" },
                React.createElement("div", { className: "substance" },
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content })),
                React.createElement("div", { className: "signature" },
                    React.createElement(UbbContainer_1.UbbContainer, { code: this.props.signature })),
                React.createElement("div", { className: "comment" },
                    React.createElement("div", { id: "commentliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: "commentunliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike" },
                        " ",
                        React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206")))));
    };
    return ReplyContent;
}(RouteComponent));
exports.ReplyContent = ReplyContent;
var TopicGood = /** @class */ (function (_super) {
    __extends(TopicGood, _super);
    function TopicGood(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: "Mana",
            grade: 10,
            reward: 20,
            credit: "6666炒鸡赞",
            imgUrl: "/images/authorImg.jpg"
        };
        return _this;
    }
    TopicGood.prototype.render = function () {
        return React.createElement("div", { className: "good tagSize" },
            React.createElement("div", { id: "userImage" },
                React.createElement("img", { src: this.state.imgUrl }),
                " "),
            React.createElement("div", { id: "userName" },
                React.createElement("span", null, this.state.userName)),
            React.createElement("div", { id: "grades" },
                React.createElement("span", null, "\u8BC4\u5206 "),
                React.createElement("span", { id: "grade" },
                    "+",
                    this.state.grade)),
            React.createElement("div", { id: "reward" },
                React.createElement("span", null, "\u8D4F\u91D1 "),
                React.createElement("span", { id: "money" }, this.state.reward),
                React.createElement("span", null, "\u8BBA\u575B\u5E01")),
            React.createElement("div", { id: "credit" },
                React.createElement("span", null, this.state.credit)));
    };
    return TopicGood;
}(RouteComponent));
exports.TopicGood = TopicGood;
var TopicVote = /** @class */ (function (_super) {
    __extends(TopicVote, _super);
    function TopicVote(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            option: "我认为他说的很对",
            votes: 60,
            totalVotes: 220,
            voted: false,
        };
        return _this;
    }
    TopicVote.prototype.render = function () {
        return React.createElement("div", { className: "vote" },
            React.createElement("div", { className: "row" },
                React.createElement("input", { id: "checkbox", type: "checkbox" }),
                " ",
                React.createElement("span", { id: "option1", style: { marginLeft: "15px" } },
                    this.state.option,
                    " ")),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "progress" },
                    React.createElement("div", { className: "voteResult" })),
                React.createElement("span", { style: { marginLeft: "15px" } }, this.state.votes),
                React.createElement("span", null,
                    " (",
                    this.state.votes / this.state.totalVotes * 100,
                    "%)")),
            React.createElement("div", { style: { marginLeft: "20px" } }, this.state.voted ? React.createElement("span", null, "\u4F60\u5DF2\u7ECF\u6295\u8FC7\u7968\u5566") : React.createElement("button", { className: "operation" }, "\u6295\u7968")));
    };
    return TopicVote;
}(RouteComponent));
exports.TopicVote = TopicVote;
var TopicPager = /** @class */ (function (_super) {
    __extends(TopicPager, _super);
    function TopicPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { minWidth: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end', flexDirection: "row-reverse" } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPager;
}(RouteComponent));
exports.TopicPager = TopicPager;
var TopicPagerDown = /** @class */ (function (_super) {
    __extends(TopicPagerDown, _super);
    function TopicPagerDown(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPagerDown.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPagerDown.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPagerDown.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '35px', justifyContent: 'space-between', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPagerDown;
}(RouteComponent));
exports.TopicPagerDown = TopicPagerDown;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var pageUrl;
        if (this.props.pageNumber > 0) {
            pageUrl = "/topic/" + this.props.topicid + "/" + this.props.pageNumber;
            if (this.props.pageNumber != this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            pageUrl = "/topic/" + this.props.topicid + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039"));
        }
        else if (this.props.pageNumber == -2) {
            pageUrl = "/topic/" + this.props.topicid + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A"));
        }
        else if (this.props.pageNumber == -3) {
            pageUrl = "/topic/" + this.props.topicid + "/1";
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u2039\u2039"));
        }
        else {
            pageUrl = "/topic/" + this.props.topicid + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, "\u203A\u203A"));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;
var UserMessageBox = /** @class */ (function (_super) {
    __extends(UserMessageBox, _super);
    function UserMessageBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserMessageBox.prototype.render = function () {
        return React.createElement("div", { id: "userMessageBox" }, this.props.userName);
    };
    return UserMessageBox;
}(React.Component));
exports.UserMessageBox = UserMessageBox;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Ubb = __webpack_require__(1);
var BTagHandler_1 = __webpack_require__(22);
var ImageTagHandler_1 = __webpack_require__(23);
var ITagHandler_1 = __webpack_require__(24);
var SizeTagHandler_1 = __webpack_require__(25);
var QuoteTagHandler_1 = __webpack_require__(26);
var ColorTagHandler_1 = __webpack_require__(27);
var URLTagHandler_1 = __webpack_require__(28);
var UTagHandler_1 = __webpack_require__(29);
var DelTagHandler_1 = __webpack_require__(30);
var MP3TagHandler_1 = __webpack_require__(31);
var CursorTagHandler_1 = __webpack_require__(32);
var EnglishTagHandler_1 = __webpack_require__(33);
var UserTagHandler_1 = __webpack_require__(34);
var CodeTagHandler_1 = __webpack_require__(35);
/**
 * 创建一个具有所有功能的默认引擎。
 */
function createEngine() {
    var engine = new Ubb.UbbCodeEngine();
    // 在此处添加引擎所支持的所有标签处理器
    engine.tagHandlers.register(new BTagHandler_1.BTagHandler());
    engine.tagHandlers.register(new ImageTagHandler_1.ImageTagHandler());
    engine.tagHandlers.register(new ITagHandler_1.ITagHandler());
    engine.tagHandlers.register(new SizeTagHandler_1.SizeTagHandler());
    engine.tagHandlers.register(new QuoteTagHandler_1.QuoteTagHandler());
    engine.tagHandlers.register(new QuoteTagHandler_1.QuotexTagHandler());
    engine.tagHandlers.register(new ColorTagHandler_1.ColorTagHandler());
    engine.tagHandlers.register(new URLTagHandler_1.UrlTagHandler());
    engine.tagHandlers.register(new UTagHandler_1.UTagHandler());
    engine.tagHandlers.register(new DelTagHandler_1.DelTagHandler());
    engine.tagHandlers.register(new MP3TagHandler_1.MP3TagHandler());
    engine.tagHandlers.register(new CursorTagHandler_1.CursorTagHandler());
    engine.tagHandlers.register(new EnglishTagHandler_1.EnglishTagHandler());
    engine.tagHandlers.register(new UserTagHandler_1.UserTagHandler());
    engine.tagHandlers.register(new CodeTagHandler_1.CodeTagHandler());
    return engine;
}
exports.createEngine = createEngine;
// 重新导出核心功能
__export(__webpack_require__(1));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
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


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
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


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [i] 标签的处理器。
 */
var ITagHandler = /** @class */ (function (_super) {
    __extends(ITagHandler, _super);
    function ITagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ITagHandler.prototype, "tagName", {
        get: function () {
            return 'i';
        },
        enumerable: true,
        configurable: true
    });
    ITagHandler.prototype.execCore = function (innerContent, tagData, context) {
        return React.createElement("i", null, innerContent);
    };
    return ITagHandler;
}(Ubb.RecursiveTagHandler));
exports.ITagHandler = ITagHandler;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [size] 标签的处理器。
 */
var SizeTagHandler = /** @class */ (function (_super) {
    __extends(SizeTagHandler, _super);
    function SizeTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SizeTagHandler.prototype, "tagName", {
        get: function () {
            return 'size';
        },
        enumerable: true,
        configurable: true
    });
    SizeTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var size = parseInt(tagData.value('size'));
        if (isNaN(size) || size <= 0) {
            return innerContent;
        }
        size = size > 7 ? 3.5 : (size / 2);
        var style = {
            fontSize: size + "rem"
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return SizeTagHandler;
}(Ubb.RecursiveTagHandler));
exports.SizeTagHandler = SizeTagHandler;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [quote] 标签的处理器。
 */
var QuoteTagHandler = /** @class */ (function (_super) {
    __extends(QuoteTagHandler, _super);
    function QuoteTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(QuoteTagHandler.prototype, "tagName", {
        get: function () { return 'quote'; },
        enumerable: true,
        configurable: true
    });
    ;
    QuoteTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            padding: '13px 19px 13px 17px',
            backgroundColor: '#F5FAFF',
            border: '1px solid rgb(204,204,204)',
            margin: '30px',
            maxHeight: '800px'
        };
        return React.createElement("div", { style: style }, innerContent);
    };
    return QuoteTagHandler;
}(Ubb.RecursiveTagHandler));
exports.QuoteTagHandler = QuoteTagHandler;
var QuotexTagHandler = /** @class */ (function (_super) {
    __extends(QuotexTagHandler, _super);
    function QuotexTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(QuotexTagHandler.prototype, "tagName", {
        get: function () {
            return 'quotex';
        },
        enumerable: true,
        configurable: true
    });
    return QuotexTagHandler;
}(QuoteTagHandler));
exports.QuotexTagHandler = QuotexTagHandler;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [color] 标签的处理器。
 */
var ColorTagHandler = /** @class */ (function (_super) {
    __extends(ColorTagHandler, _super);
    function ColorTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ColorTagHandler.prototype, "tagName", {
        get: function () {
            return 'color';
        },
        enumerable: true,
        configurable: true
    });
    ColorTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var color = tagData.value('color');
        var style = {
            color: color
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return ColorTagHandler;
}(Ubb.RecursiveTagHandler));
exports.ColorTagHandler = ColorTagHandler;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [url] 标签的处理器。
 */
var UrlTagHandler = /** @class */ (function (_super) {
    __extends(UrlTagHandler, _super);
    function UrlTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UrlTagHandler.prototype, "tagName", {
        get: function () {
            return 'url';
        },
        enumerable: true,
        configurable: true
    });
    UrlTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var url = tagData.value('url');
        if (!url) {
            url = innerContent;
        }
        //不允许显示外部链接
        if (context.options.allowExternalUrl === false) {
            //判断是否为外部链接
            if (url.indexOf('http') === 0 && url.split('/').length > 1 && url.split('/')[2] !== 'www.cc98.org') {
                return innerContent;
            }
        }
        return React.createElement("a", { href: url }, innerContent);
    };
    return UrlTagHandler;
}(Ubb.TextTagHandler));
exports.UrlTagHandler = UrlTagHandler;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [u] 标签的处理器。
 */
var UTagHandler = /** @class */ (function (_super) {
    __extends(UTagHandler, _super);
    function UTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UTagHandler.prototype, "tagName", {
        get: function () {
            return 'u';
        },
        enumerable: true,
        configurable: true
    });
    UTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textDecoration: 'underline'
        };
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return React.createElement("span", { style: style }, innerContent);
        }
        else {
            return React.createElement("u", null, innerContent);
        }
    };
    return UTagHandler;
}(Ubb.RecursiveTagHandler));
exports.UTagHandler = UTagHandler;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [del] 标签的处理器。
 */
var DelTagHandler = /** @class */ (function (_super) {
    __extends(DelTagHandler, _super);
    function DelTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DelTagHandler.prototype, "tagName", {
        get: function () {
            return 'del';
        },
        enumerable: true,
        configurable: true
    });
    DelTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            textDecoration: 'line-through'
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return DelTagHandler;
}(Ubb.RecursiveTagHandler));
exports.DelTagHandler = DelTagHandler;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [mp3] 标签的处理器。
 */
var MP3TagHandler = /** @class */ (function (_super) {
    __extends(MP3TagHandler, _super);
    function MP3TagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MP3TagHandler.prototype, "tagName", {
        get: function () {
            return 'mp3';
        },
        enumerable: true,
        configurable: true
    });
    MP3TagHandler.prototype.execCore = function (innerContent, tagData, context) {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        }
        //是否自动播放
        var autoPlay = false;
        if (tagData.value('mp3') === '1' && context.options.allowAutoPlay === true) {
            autoPlay = true;
        }
        return (React.createElement("audio", { src: innerContent, controls: true, autoPlay: autoPlay }));
    };
    return MP3TagHandler;
}(Ubb.TextTagHandler));
exports.MP3TagHandler = MP3TagHandler;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [cursor] 标签的处理器。
 */
var CursorTagHandler = /** @class */ (function (_super) {
    __extends(CursorTagHandler, _super);
    function CursorTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CursorTagHandler.prototype, "tagName", {
        get: function () { return 'cursor'; },
        enumerable: true,
        configurable: true
    });
    ;
    CursorTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var cursor = tagData.value('cursor');
        var style = {
            cursor: cursor
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return CursorTagHandler;
}(Ubb.RecursiveTagHandler));
exports.CursorTagHandler = CursorTagHandler;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [english] 标签的处理器。
 */
var EnglishTagHandler = /** @class */ (function (_super) {
    __extends(EnglishTagHandler, _super);
    function EnglishTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EnglishTagHandler.prototype, "tagName", {
        get: function () {
            return 'english';
        },
        enumerable: true,
        configurable: true
    });
    EnglishTagHandler.prototype.execCore = function (innerContent, tagData, context) {
        var style = {
            fontFamily: 'Arial'
        };
        return React.createElement("span", { style: style }, innerContent);
    };
    return EnglishTagHandler;
}(Ubb.RecursiveTagHandler));
exports.EnglishTagHandler = EnglishTagHandler;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [user] 标签的处理器。
 */
var UserTagHandler = /** @class */ (function (_super) {
    __extends(UserTagHandler, _super);
    function UserTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserTagHandler.prototype, "tagName", {
        get: function () { return 'user'; },
        enumerable: true,
        configurable: true
    });
    ;
    UserTagHandler.prototype.execCore = function (content, tagData, context) {
        var userName = content;
        var style = {
            cursor: 'pointer'
        };
        return React.createElement("a", { href: "/user/name" + encodeURI(userName), style: style }, userName);
    };
    return UserTagHandler;
}(Ubb.TextTagHandler));
exports.UserTagHandler = UserTagHandler;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Ubb = __webpack_require__(1);
/**
 * 处理 [code] 标签的处理器。
 */
var CodeTagHandler = /** @class */ (function (_super) {
    __extends(CodeTagHandler, _super);
    function CodeTagHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CodeTagHandler.prototype, "tagName", {
        get: function () { return 'code'; },
        enumerable: true,
        configurable: true
    });
    ;
    CodeTagHandler.prototype.execCore = function (content, tagData, context) {
        var element = content.split('\n').map(function (item, index) {
            return React.createElement("li", null, item);
        });
        return (React.createElement("div", { className: 'ubb-code' },
            React.createElement("ol", null, element)));
    };
    return CodeTagHandler;
}(Ubb.TextTagHandler));
exports.CodeTagHandler = CodeTagHandler;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var SendTopic = /** @class */ (function (_super) {
    __extends(SendTopic, _super);
    function SendTopic(props) {
        var _this = _super.call(this, props) || this;
        _this.state = ({ content: '' });
        return _this;
    }
    SendTopic.prototype.sendTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, content, token, mes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.cc98.org/Post/Topic/" + this.props.topicid;
                        content = "Content=" + this.state.content + "&ContentType=Markdown&Title=";
                        token = Utility.getLocalStorage("accessToken");
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': token,
                                },
                                body: content
                            })];
                    case 1:
                        mes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SendTopic.prototype.getInitialState = function () {
        return { value: '' };
    };
    SendTopic.prototype.handleChange = function (event) {
        this.setState({ content: event.target.value });
    };
    SendTopic.prototype.render = function () {
        return React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("div", { id: "sendTopic" },
                React.createElement("div", { id: "sendTopic-options" },
                    React.createElement("ul", { className: "editor__menu clearfix", id: "wmd-button-row" },
                        React.createElement("li", { title: "加粗 <strong> Ctrl+B", className: "wmd-button", id: "wmd-bold-button" },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "0px 0px" } })),
                        React.createElement("li", { title: "斜体 <em> Ctrl+I", className: "wmd-button", id: "wmd-italic-button", style: { left: " 25px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: " -20px 0px" } })),
                        React.createElement("li", { className: "editor__menu--divider wmd-spacer1", id: "wmd-spacer1" }),
                        React.createElement("li", { title: "链接 <a> Ctrl+L", className: "wmd-button", id: "wmd-link-button", style: { left: "75px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-40px 0px" } })),
                        React.createElement("li", { title: "引用 <blockquote> Ctrl+Q", className: "wmd-button", id: "wmd-quote-button", style: { left: " 100px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-60px 0px" } })),
                        React.createElement("li", { title: "代码 <pre><code> Ctrl+K", className: "wmd-button", id: "wmd-code-button", style: { left: " 125px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-80px 0px" } })),
                        React.createElement("li", { className: "editor__menu--divider wmd-spacer1", id: "wmd-spacer2" }),
                        React.createElement("li", { title: "图片 <img> Ctrl+G", className: "wmd-button", id: "wmd-image-button", style: { left: "150px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-100px 0px" } })),
                        React.createElement("li", { className: "editor__menu--divider wmd-spacer1", id: "wmd-spacer2" }),
                        React.createElement("li", { title: "数字列表 <ol> Ctrl+O", className: "wmd-button", id: "wmd-olist-button", style: { left: " 200px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-120px 0px" } })),
                        React.createElement("li", { title: "普通列表 <ul> Ctrl+U", className: "wmd-button", id: "wmd-ulist-button", style: { left: "225px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: " -140px 0px" } })),
                        React.createElement("li", { title: "标题 <h1>/<h2> Ctrl+H", className: "wmd-button", id: "wmd-heading-button", style: { left: "250px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-160px 0px" } })),
                        React.createElement("li", { title: "分割线 <hr> Ctrl+R", className: "wmd-button", id: "wmd-hr-button", style: { left: "275px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-180px 0px" } })),
                        React.createElement("li", { className: "editor__menu--divider wmd-spacer1", id: "wmd-spacer3" }),
                        React.createElement("li", { title: "撤销 - Ctrl+Z", className: "wmd-button", id: "wmd-undo-button", style: { left: "325px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-200px 0px" } })),
                        React.createElement("li", { title: "重做 - Ctrl+Y", className: "wmd-button", id: "wmd-redo-button", style: { left: "350px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-220px -20px" } })),
                        React.createElement("li", { className: "editor__menu--divider wmd-spacer1", id: "wmd-spacer4" }),
                        React.createElement("li", { title: "Markdown 语法", className: "wmd-button", id: "wmd-help-button", style: { left: " 400px" } },
                            React.createElement("a", { className: "editor__menu--bold", style: { backgroundPosition: "-300px 0px" } })))),
                React.createElement("form", null,
                    React.createElement("div", null,
                        React.createElement("textarea", { id: "sendTopic-input", name: "sendTopic-input", value: this.state.content, onChange: this.handleChange.bind(this) })))),
            React.createElement("div", { className: "row", style: { justifyContent: "center", marginBottom: "20px " } },
                React.createElement("div", { id: "post-topic-button", onClick: this.sendTopic.bind(this), className: "button blue", style: { marginTop: "20px", width: "70px", letterSpacing: "5px" } }, "\u56DE\u590D")));
    };
    return SendTopic;
}(RouteComponent));
exports.SendTopic = SendTopic;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var react_router_dom_1 = __webpack_require__(2);
var moment = __webpack_require__(7);
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    Object.defineProperty(RouteComponent.prototype, "match", {
        get: function () {
            return this.props.match;
        },
        enumerable: true,
        configurable: true
    });
    return RouteComponent;
}(React.Component));
exports.RouteComponent = RouteComponent;
var CurUserPost = /** @class */ (function (_super) {
    __extends(CurUserPost, _super);
    function CurUserPost(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { page: 1, topicid: _this.match.params.topicid, totalPage: 1, userName: null };
        return _this;
    }
    CurUserPost.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, userName, totalPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!newProps.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(newProps.match.params.page);
                        }
                        userName = newProps.match.params.userName;
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        this.setState({ page: page, topicid: newProps.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, totalPage, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.match.params.page) {
                            page = 1;
                        }
                        else {
                            page = parseInt(this.match.params.page);
                        }
                        return [4 /*yield*/, this.getTotalPage(this.match.params.topicid)];
                    case 1:
                        totalPage = _a.sent();
                        userName = this.match.params.userName;
                        this.setState({ page: page, topicid: this.match.params.topicid, totalPage: totalPage, userName: userName });
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.getTotalPage = function (topicid) {
        return __awaiter(this, void 0, void 0, function () {
            var replyCountResponse, replyCountJson, replyCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://api.cc98.org/Topic/" + topicid)];
                    case 1:
                        replyCountResponse = _a.sent();
                        return [4 /*yield*/, replyCountResponse.json()];
                    case 2:
                        replyCountJson = _a.sent();
                        replyCount = replyCountJson.replyCount;
                        if (replyCount > 10) {
                            return [2 /*return*/, (replyCount - replyCount % 10) / 10 + 1];
                        }
                        else {
                            return [2 /*return*/, 1];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CurUserPost.prototype.render = function () {
        var topic = null;
        if (this.state.page == 1) {
            topic = React.createElement(PostTopic, { imgUrl: "/images/ads.jpg", page: this.state.page, topicid: this.state.topicid, userName: this.state.userName });
        }
        return React.createElement("div", { className: "center", style: { overflowX: 'scroll', minWidth: '1140px' } },
            React.createElement(TopicPager, { userName: this.state.userName, page: this.state.page, topicid: this.state.topicid, totalPage: this.state.totalPage }),
            topic,
            React.createElement(react_router_dom_1.Route, { path: "/topic/:topicid/user/:userName/:page?", component: Reply }));
    };
    return CurUserPost;
}(RouteComponent));
exports.CurUserPost = CurUserPost;
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            contents: [],
        };
        return _this;
    }
    Reply.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var page, realContents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = newProps.match.params.page;
                        if (newProps.match.params.page == undefined) {
                            page = 1;
                        }
                        this.Contents = Utility.getCurUserTopicContent(newProps.match.params.topicid, page, newProps.match.params.userName);
                        return [4 /*yield*/, this.Contents];
                    case 1:
                        realContents = _a.sent();
                        this.setState({ contents: realContents });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reply.prototype.generateContents = function (item) {
        return React.createElement("div", { id: "reply" },
            React.createElement(Replier, { key: item.id, topicid: item.topicId, userName: item.userName, replyTime: item.time, floor: item.floor, userImgUrl: item.userImgUrl, sendTopicNumber: item.sendTopicNumber }),
            React.createElement(ReplyContent, { key: item.content, content: item.content, signature: item.signature }));
    };
    Reply.prototype.render = function () {
        return React.createElement("div", { className: "center", style: { width: '1140px' } }, this.state.contents.map(this.generateContents));
    };
    return Reply;
}(RouteComponent));
exports.Reply = Reply;
var Replier = /** @class */ (function (_super) {
    __extends(Replier, _super);
    function Replier(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            imgUrl: '/images/authorImg.jpg',
            timeImgUrl: '/images/clock.jpg',
            userName: 'VayneTian',
            replyTime: Date(),
            topicsNumber: 999,
            level: 2,
        };
        return _this;
    }
    Replier.prototype.render = function () {
        var curUserPostUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName;
        return React.createElement("div", { className: "replyRoot" },
            React.createElement("div", { className: "row", style: { width: '1140px', display: 'flex', marginBottom: '10px' } },
                React.createElement("div", { id: "authorImg" },
                    React.createElement("img", { src: this.props.userImgUrl })),
                React.createElement("div", { className: "column", id: "rpymes" },
                    React.createElement("div", { className: "row", id: "replierMes" },
                        React.createElement("div", { style: { marginLeft: '10px' } },
                            React.createElement("span", null,
                                this.props.floor,
                                "L")),
                        React.createElement("div", { className: "rpyClr", style: { marginLeft: '10px' } }, this.props.userName),
                        React.createElement("div", { id: "topicsNumber", style: { marginLeft: '10px' } },
                            "\u8D34\u6570   ",
                            React.createElement("span", { className: "rpyClrodd" }, this.props
                                .sendTopicNumber),
                            " ")),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { id: "clockimg", style: { marginLeft: '6px' } },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        React.createElement("div", null,
                            React.createElement("span", { className: "timeProp" }, moment(this.props.replyTime).format('YYYY-MM-DD HH:mm:ss'))))),
                React.createElement("div", { id: "operation" },
                    React.createElement("button", { className: "operation" }, "\u5F15\u7528"),
                    React.createElement("button", { className: "operation" }, "\u7F16\u8F91"),
                    React.createElement("button", { className: "operation" }, "\u79C1\u4FE1"),
                    React.createElement("button", { className: "operation" }, "\u4E3E\u62A5"),
                    React.createElement(react_router_dom_1.Link, { className: "operation", to: curUserPostUrl }, "\u53EA\u770B\u6B64\u7528\u6237"))));
    };
    return Replier;
}(RouteComponent));
exports.Replier = Replier;
var PostTopic = /** @class */ (function (_super) {
    __extends(PostTopic, _super);
    function PostTopic(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            topicMessage: { title: 'ss', time: '2017' }
        };
        return _this;
    }
    PostTopic.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topicMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utility.getTopic(this.props.topicid)];
                    case 1:
                        topicMessage = _a.sent();
                        this.setState({ topicMessage: topicMessage });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostTopic.prototype.render = function () {
        if (this.props.userName == this.state.topicMessage.userName) {
            return React.createElement("div", { className: "root" },
                React.createElement("div", { className: "essay" },
                    React.createElement(AuthorMessage, { AuthorName: this.state.topicMessage.userName, authorImgUrl: this.state.topicMessage.userImgUrl }),
                    React.createElement(TopicTitle, { Title: this.state.topicMessage.title, Time: this.state.topicMessage.time, HitCount: this.state.topicMessage.hitCount }),
                    React.createElement("div", { id: "ads" },
                        React.createElement("img", { src: this.props.imgUrl }))),
                React.createElement(TopicContent, { content: this.state.topicMessage.content, signature: this.state.topicMessage.signature }),
                React.createElement(TopicGood, null),
                React.createElement(TopicVote, null));
        }
        else {
            return null;
        }
    };
    return PostTopic;
}(RouteComponent));
exports.PostTopic = PostTopic;
var AuthorMessage = /** @class */ (function (_super) {
    __extends(AuthorMessage, _super);
    function AuthorMessage(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: _this.props.authorImgUrl
        };
        return _this;
    }
    AuthorMessage.prototype.render = function () {
        return React.createElement("div", { className: "row", id: "authormes" },
            React.createElement("div", { id: "authorImg" },
                React.createElement("img", { src: this.props.authorImgUrl })),
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "row authorFans", style: { justifyContent: 'space-between' } },
                    React.createElement("div", { id: "authorName" },
                        React.createElement("p", null, this.props.AuthorName)),
                    React.createElement("div", { id: "fans", className: "row" },
                        React.createElement("div", { style: { marginRight: '3px' } }, "\u7C89\u4E1D"),
                        React.createElement("div", { style: { color: '#EE0000' } }, this.state.fansNumber))),
                React.createElement("div", { className: "row" },
                    React.createElement("button", { id: "watch" }, "\u5173\u6CE8"),
                    React.createElement("button", { id: "email" }, "\u79C1\u4FE1"))));
    };
    return AuthorMessage;
}(RouteComponent));
exports.AuthorMessage = AuthorMessage;
var TopicTitle = /** @class */ (function (_super) {
    __extends(TopicTitle, _super);
    function TopicTitle(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            isNotice: true,
            isTop: true,
            title: '这是一个长长啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊的标题',
            tag: '女装/开车',
            time: '2017.8.12',
            likeNumber: 666,
            unlikeNumber: 233,
            viewTimes: 2366
        };
        return _this;
    }
    TopicTitle.prototype.render = function () {
        return React.createElement("div", { id: "title" },
            React.createElement("div", { className: "column", id: "topicTitleProp" },
                React.createElement("div", { id: "essay1", className: "row" },
                    React.createElement("div", { id: "title1", className: "row" },
                        " ",
                        React.createElement("span", { className: "titleProp" }, this.state.isTop ? '【置顶】' : ''),
                        React.createElement("span", { className: "titleProp" },
                            this.state.isNotice ? '【公告】' : '',
                            " "),
                        React.createElement("span", { id: "essayTitle" }, this.props.Title))),
                React.createElement("div", { className: "row", id: "essayProp" },
                    React.createElement("div", { id: "tags" },
                        React.createElement("span", { className: "tagProp tagSize" },
                            "\u6807\u7B7E\uFF1A ",
                            this.state.tag),
                        React.createElement("span", { className: "tagProp" })),
                    React.createElement("div", { id: "time" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-clock-o fa-lg fa-fw" })),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" }, moment(this.props.Time).format('YYYY-MM-DD HH:mm:ss'))),
                    React.createElement("div", { id: "viewtimes" },
                        React.createElement("span", { className: "viewProp" },
                            React.createElement("i", { className: "fa fa-eye fa-lg fa-fw" }),
                            "  "),
                        " ",
                        React.createElement("span", { className: "timeProp tagSize" },
                            this.props.HitCount,
                            "\u6B21")))),
            React.createElement("div", { className: "column", style: { width: '100px' } },
                React.createElement("div", { className: "row", style: { marginTop: '10px' } },
                    React.createElement("div", { id: "like", className: "tagSize" },
                        React.createElement("i", { className: "fa fa-star-o fa-lg" }),
                        React.createElement("span", { style: { marginLeft: '10px' } }, "\u6536\u85CF\u6587\u7AE0"))),
                React.createElement("div", { className: "row", style: { marginTop: '35px' } },
                    React.createElement("div", { id: "liked", className: "row tagSize" },
                        React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg fa-fw" }),
                        this.state.likeNumber),
                    React.createElement("div", { id: "disliked", className: "row tagSize" },
                        React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg fa-fw" }),
                        this.state.unlikeNumber))));
    };
    return TopicTitle;
}(RouteComponent));
exports.TopicTitle = TopicTitle;
var TopicContent = /** @class */ (function (_super) {
    __extends(TopicContent, _super);
    function TopicContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 666,
            dislikeNumber: 233,
        };
        return _this;
    }
    //<div className="signature">{this.state.Signature}</div>
    TopicContent.prototype.render = function () {
        return React.createElement("div", { className: "content" },
            React.createElement("div", { className: "substance" }, this.props.content),
            React.createElement("div", { className: "signature" }, this.props.signature),
            React.createElement("div", { className: "comment" },
                React.createElement("div", { id: "commentlike", className: "buttonFont" },
                    React.createElement("button", { className: "commentbutton" },
                        React.createElement("i", { className: "fa fa-star-o fa-lg" })),
                    "   \u6536\u85CF\u6587\u7AE0 "),
                React.createElement("div", { id: "commentliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.likeNumber)),
                React.createElement("div", { id: "commentunliked" },
                    React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                    React.createElement("span", { className: "commentProp" },
                        " ",
                        this.state.dislikeNumber)),
                React.createElement("div", { id: "commentlike", className: "buttonFont row" },
                    " ",
                    React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206"),
                    React.createElement("div", { className: "commentbutton" }, "   \u7F16\u8F91"))));
    };
    return TopicContent;
}(RouteComponent));
exports.TopicContent = TopicContent;
var ReplyContent = /** @class */ (function (_super) {
    __extends(ReplyContent, _super);
    function ReplyContent(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            likeNumber: 2424,
            dislikeNumber: 4433,
        };
        return _this;
    }
    //content: "央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。</p><p>央视网消息：7月26日至27日，习近平在省部级主要领导干部专题研讨班开班式上强调，党的十八大以来的5年，是党和国家发展进程中很不平凡的5年。我们加强党对意识形态工作的领导，巩固了全党全社会思想上的团结统一。党的十八大以来，面对意识形态领域日益错综复杂的形势，习总书记发表了一系列重要讲话，深刻阐述了意识形态工作的重大理论和现实问题。本图解梳理了相关重要论述以及十八大以来各领域工作成绩，以飨读者。",
    //
    ReplyContent.prototype.render = function () {
        return React.createElement("div", { className: "root" },
            React.createElement("div", { className: "content" },
                React.createElement("div", { className: "substance" },
                    React.createElement("span", { style: { maxWidth: '1100px' } }, this.props.content)),
                React.createElement("div", { className: "signature" }, this.props.signature),
                React.createElement("div", { className: "comment" },
                    React.createElement("div", { id: "commentliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-up fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.likeNumber)),
                    React.createElement("div", { id: "commentunliked" },
                        React.createElement("i", { className: "fa fa-thumbs-o-down fa-lg" }),
                        React.createElement("span", { className: "commentProp" },
                            " ",
                            this.state.dislikeNumber)),
                    React.createElement("div", { id: "commentlike" },
                        " ",
                        React.createElement("div", { className: "commentbutton" }, "   \u8BC4\u5206")))));
    };
    return ReplyContent;
}(RouteComponent));
exports.ReplyContent = ReplyContent;
var TopicGood = /** @class */ (function (_super) {
    __extends(TopicGood, _super);
    function TopicGood(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            userName: 'Mana',
            grade: 10,
            reward: 20,
            credit: '6666炒鸡赞',
            imgUrl: '/images/authorImg.jpg'
        };
        return _this;
    }
    TopicGood.prototype.render = function () {
        return React.createElement("div", { className: "good tagSize", style: { marginLeft: '2px' } },
            React.createElement("div", { id: "userImage" },
                React.createElement("img", { src: this.state.imgUrl }),
                " "),
            React.createElement("div", { id: "userName" },
                React.createElement("span", null, this.state.userName)),
            React.createElement("div", { id: "grades" },
                React.createElement("span", null, "\u8BC4\u5206 "),
                React.createElement("span", { id: "grade" },
                    "+",
                    this.state.grade)),
            React.createElement("div", { id: "reward" },
                React.createElement("span", null, "\u8D4F\u91D1 "),
                React.createElement("span", { id: "money" }, this.state.reward),
                React.createElement("span", null, "\u8BBA\u575B\u5E01")),
            React.createElement("div", { id: "credit" },
                React.createElement("span", null, this.state.credit)));
    };
    return TopicGood;
}(RouteComponent));
exports.TopicGood = TopicGood;
var TopicVote = /** @class */ (function (_super) {
    __extends(TopicVote, _super);
    function TopicVote(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            option: '我认为他说的很对',
            votes: 60,
            totalVotes: 220,
            voted: false,
        };
        return _this;
    }
    TopicVote.prototype.render = function () {
        return React.createElement("div", { className: "vote", style: { marginLeft: '2px' } },
            React.createElement("div", { className: "row" },
                React.createElement("input", { id: "checkbox", type: "checkbox" }),
                " ",
                React.createElement("span", { id: "option", style: { marginLeft: '15px' } },
                    this.state.option,
                    " ")),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "progress" },
                    React.createElement("div", { className: "voteResult" })),
                React.createElement("span", { style: { marginLeft: '15px' } }, this.state.votes),
                React.createElement("span", null,
                    " (",
                    this.state.votes / this.state.totalVotes * 100,
                    "%)")),
            React.createElement("div", { style: { marginLeft: '20px' } }, this.state.voted ? React.createElement("span", null, "\u4F60\u5DF2\u7ECF\u6295\u8FC7\u7968\u5566") : React.createElement("button", { className: "operation" }, "\u6295\u7968")));
    };
    return TopicVote;
}(RouteComponent));
exports.TopicVote = TopicVote;
var TopicPager = /** @class */ (function (_super) {
    __extends(TopicPager, _super);
    function TopicPager(props, content) {
        var _this = _super.call(this, props, content) || this;
        _this.state = {
            pager: [1, 2, 3, 4, 5]
        };
        return _this;
    }
    /**
     * 将页码转换为 UI 界面。
     * @param pageNumber 要转换的页码。
     * @returns {JSX.Element} 页码对应的 UI 元素。
     */
    TopicPager.prototype.generatePageLink = function (pageNumber) {
        return React.createElement(PageModel, { userName: this.props.userName, pageNumber: pageNumber, topicid: this.props.topicid, curPage: this.props.page, totalPage: this.props.totalPage });
    };
    TopicPager.prototype.componentWillReceiveProps = function (newProps) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(newProps.page, newProps.totalPage);
                console.log('new=' + pages);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = Utility.getPager(this.props.page, this.props.totalPage);
                this.setState({ pager: pages });
                return [2 /*return*/];
            });
        });
    };
    TopicPager.prototype.render = function () {
        return React.createElement("div", { className: "row", style: { width: '1140px', height: '50px', marginTop: '15px', justifyContent: 'space-between', borderBottom: ' #EAEAEA solid thin', alignItems: 'flex-end' } },
            React.createElement("div", { id: "pager" },
                React.createElement("div", { className: "row pagination" }, this.state.pager.map(this.generatePageLink.bind(this)))));
    };
    return TopicPager;
}(RouteComponent));
exports.TopicPager = TopicPager;
var PageModel = /** @class */ (function (_super) {
    __extends(PageModel, _super);
    function PageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageModel.prototype.render = function () {
        var last = '<';
        var next = '>';
        var start = '<<';
        var end = '>>';
        if (this.props.pageNumber > 0) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + this.props.pageNumber;
            if (this.props.pageNumber != this.props.curPage) {
                return React.createElement("li", { className: "page-item" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
            else {
                return React.createElement("li", { className: "page-item active" },
                    React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, this.props.pageNumber));
            }
        }
        else if (this.props.pageNumber == -1) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + (this.props.curPage - 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, last));
        }
        else if (this.props.pageNumber == -2) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + (this.props.curPage + 1);
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, next));
        }
        else if (this.props.pageNumber == -3) {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/1";
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, start));
        }
        else {
            var pageUrl = "/topic/" + this.props.topicid + "/user/" + this.props.userName + "/" + this.props.totalPage;
            return React.createElement("li", { className: "page-item" },
                React.createElement(react_router_dom_1.Link, { className: "page-link", to: pageUrl }, end));
        }
    };
    return PageModel;
}(React.Component));
exports.PageModel = PageModel;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(3);
var Utility = __webpack_require__(4);
//链接到的地址是  /list/boardid
var BoardList = /** @class */ (function (_super) {
    __extends(BoardList, _super);
    function BoardList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            thisBoardState: [],
        };
        return _this;
    }
    BoardList.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boardNameList, board, response, data, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardNameList = [];
                        board = [];
                        if (!!Utility.getStorage('board_2')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch('http://api.cc98.org/Board/Root')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 20; i++) {
                            board[i] = new AppState_1.Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
                            Utility.setStorage("board_" + data[i].id.toString(), board[i]);
                            boardNameList[i] = "board_" + data[i].id.toString();
                        }
                        Utility.setStorage('boardList', boardNameList);
                        return [3 /*break*/, 4];
                    case 3:
                        for (i = 0; i < 20; i++) {
                            boardNameList = Utility.getStorage('boardList');
                            board[i] = Utility.getStorage(boardNameList[i]);
                        }
                        _a.label = 4;
                    case 4:
                        this.setState({
                            thisBoardState: board,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardList.prototype.generateRootBoard = function (item) {
        return React.createElement(RootBoard, { board: item });
    };
    BoardList.prototype.render = function () {
        return React.createElement("div", { className: "boardList" }, this.state.thisBoardState.map(this.generateRootBoard));
    };
    return BoardList;
}(React.Component));
exports.BoardList = BoardList;
var RootBoard = /** @class */ (function (_super) {
    __extends(RootBoard, _super);
    function RootBoard(props) {
        var _this = _super.call(this, props) || this;
        var boards = _this.props.board;
        if (boards.id === 2 || boards.id === 29 || boards.id === 35 || boards.id === 37) {
            _this.state = { isExpanded: false, };
        } //四个民工版默认状态为折叠
        else {
            _this.state = { isExpanded: true, };
        } //其他版默认状态为展开
        _this.toggleIsExpanded = _this.toggleIsExpanded.bind(_this); //JS的this是可变的，取决于调用方法的地方，bind方法用于此刻的this值
        return _this;
    }
    RootBoard.prototype.toggleIsExpanded = function () {
        this.setState(function (prevState) { return ({
            isExpanded: !prevState.isExpanded //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }); });
    };
    RootBoard.prototype.render = function () {
        var display = this.state.isExpanded ? "flex" : "none"; //根据 isExpanded 状态定义样式
        var buttonContent = this.state.isExpanded ? "-" : "+"; //根据 isExpanded 状态定义按钮内容
        var boards = this.props.board;
        if (boards.id === 758) {
            return React.createElement("div", { className: "anArea" },
                React.createElement("div", { className: "column", style: { border: '2px solid #e9e9e9' } },
                    React.createElement("div", { className: "row", style: { marginTop: '15px', marginBottom: '15px' } },
                        React.createElement("div", { className: "areaName" },
                            React.createElement("a", { href: "/list/758" }, boards.name)),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters))));
        }
        else {
            return React.createElement("div", { className: "anArea" },
                React.createElement("div", { className: "column", style: { border: '2px solid #e9e9e9' } },
                    React.createElement("div", { className: "row", style: { marginTop: '15px', marginBottom: '15px' } },
                        React.createElement("div", { className: "areaName" }, boards.name),
                        React.createElement("div", { className: "areaName" },
                            "\u4E3B\u7BA1\uFF1A",
                            boards.masters),
                        React.createElement("div", { className: "hideBoard", onClick: this.toggleIsExpanded },
                            " ",
                            buttonContent)),
                    React.createElement("div", { className: "hiddenContent", style: { display: display } },
                        " ",
                        React.createElement(ChildBoard, { boardid: boards.id }))));
        }
    };
    return RootBoard;
}(React.Component));
exports.RootBoard = RootBoard;
var ChildBoard = /** @class */ (function (_super) {
    __extends(ChildBoard, _super);
    function ChildBoard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            thisBoardState: []
        };
        return _this;
    }
    ChildBoard.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var boards, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boards = [];
                        return [4 /*yield*/, fetch("http://api.cc98.org/Board/" + this.props.boardid + "/Subs")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < data.length; i++) {
                            boards[i] = new AppState_1.Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
                        }
                        this.setState({
                            thisBoardState: boards,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChildBoard.prototype.convertChildBoard = function (item) {
        return React.createElement("div", { className: "boardContent" },
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "greenBackdrop" })),
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "boardName2" }, item.name)),
            React.createElement("div", { className: "boardInfo" },
                "\u4ECA\u65E5\u53D1\u5E16 ",
                item.todayPostCount,
                " / \u603B\u4E3B\u9898\u6570 ",
                item.totalPostCount));
    };
    ChildBoard.prototype.convertNoImgChildBoard = function (item) {
        return React.createElement("div", { className: "noImgBoardContent" },
            React.createElement("a", { href: "/list/" + item.id },
                React.createElement("div", { className: "boardName2" }, item.name)));
    };
    ChildBoard.prototype.render = function () {
        if (this.props.boardid === 2 || this.props.boardid === 29 || this.props.boardid === 35 || this.props.boardid === 37) {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertNoImgChildBoard));
        }
        else {
            return React.createElement("div", { className: "areaContent" }, this.state.thisBoardState.map(this.convertChildBoard));
        }
    };
    return ChildBoard;
}(React.Component));
exports.ChildBoard = ChildBoard;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterNavigation_1 = __webpack_require__(40);
var UserCenterRouter_1 = __webpack_require__(41);
/**
 * 用户中心页面
 */
var UserCenter = /** @class */ (function (_super) {
    __extends(UserCenter, _super);
    function UserCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenter.prototype.render = function () {
        return (React.createElement("div", { className: "user-center" },
            React.createElement("div", { className: "user-center-content" },
                React.createElement("div", { className: "user-center-head" },
                    React.createElement("p", null, "\u4E2A\u4EBA\u4E2D\u5FC3")),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: "user-center-body" },
                        React.createElement(UserCenterNavigation_1.UserCenterNavigation, null),
                        React.createElement(UserCenterRouter_1.UserCenterRouter, null))))));
    };
    return UserCenter;
}(React.Component));
exports.UserCenter = UserCenter;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var $ = __webpack_require__(5);
/**
 * 用户中心侧边栏导航组件
 */
var UserCenterNavigation = /** @class */ (function (_super) {
    __extends(UserCenterNavigation, _super);
    function UserCenterNavigation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isScroll: false,
            buttonClassName: ''
        };
        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }
    UserCenterNavigation.prototype.handleScroll = function (e) {
        if (window.pageYOffset > 234 && !this.state.isScroll) {
            this.setState({
                isScroll: true,
                buttonClassName: 'btn-show'
            });
        }
        if (window.pageYOffset < 234 && this.state.isScroll) {
            this.setState(function (prevState) {
                if (prevState.buttonClassName === '') {
                    return {
                        isScroll: false
                    };
                }
                else {
                    return {
                        isScroll: false,
                        buttonClassName: 'btn-disappare'
                    };
                }
            });
        }
    };
    UserCenterNavigation.prototype.componentDidMount = function () {
        document.addEventListener('scroll', this.handleScroll);
    };
    UserCenterNavigation.prototype.componentWillUnmount = function () {
        document.removeEventListener('scroll', this.handleScroll);
    };
    UserCenterNavigation.prototype.scrollToTop = function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
    };
    UserCenterNavigation.prototype.render = function () {
        return (React.createElement("div", { className: this.state.isScroll ? 'user-center-navigation user-center-navigation-fixed' : 'user-center-navigation', id: "userCenterNavigation" },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: "/usercenter", label: "主页", activeOnlyWhenExact: true, myClassName: "fa-home" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myposts", label: "我的主题", myClassName: "fa-pencil-square-o" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfavorites", label: "我的收藏", myClassName: "fa-star" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfollowings", label: "我的关注", myClassName: "fa-heart" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/myfans", label: "我的粉丝", myClassName: "fa-users" }),
                React.createElement("hr", null),
                React.createElement(CustomLink, { to: "/usercenter/config", label: "功能设置", myClassName: "fa-cog" })),
            React.createElement("button", { type: "button", id: "scrollToTop", className: this.state.buttonClassName, onClick: this.scrollToTop }, "\u56DE\u5230\u9876\u90E8")));
    };
    return UserCenterNavigation;
}(React.Component));
exports.UserCenterNavigation = UserCenterNavigation;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, _b = _a.activeOnlyWhenExact, activeOnlyWhenExact = _b === void 0 ? false : _b, myClassName = _a.myClassName;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement("li", { className: match ? "user-center-navigation-active" : "" },
                React.createElement(react_router_dom_1.Link, { className: "" + myClassName, to: to },
                    React.createElement("p", null, label))));
        } }));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterExact_1 = __webpack_require__(42);
var UserCenterMyFollowings_1 = __webpack_require__(45);
var UserCenterMyFans_1 = __webpack_require__(46);
var UserCenterMyPosts_1 = __webpack_require__(47);
var UserCenterMyFavorites_1 = __webpack_require__(50);
var UserCenterConfig_1 = __webpack_require__(52);
/**
 * 用户中心主体
 */
var UserCenterRouter = /** @class */ (function (_super) {
    __extends(UserCenterRouter, _super);
    function UserCenterRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterRouter.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-router" },
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/usercenter/", component: UserCenterExact_1.UserCenterExact }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfollowings", component: UserCenterMyFollowings_1.UserCenterMyFollowings }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfans", component: UserCenterMyFans_1.UserCenterMyFans }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myposts", component: UserCenterMyPosts_1.UserCenterMyPosts }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/myfavorites", component: UserCenterMyFavorites_1.UserCenterMyFavorites }),
            React.createElement(react_router_dom_1.Route, { path: "/usercenter/config", component: UserCenterConfig_1.UserCenterConfig })));
    };
    return UserCenterRouter;
}(React.Component));
exports.UserCenterRouter = UserCenterRouter;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UserCenterExactProfile_1 = __webpack_require__(10);
var UserCenterExactActivities_1 = __webpack_require__(11);
var UserCenterExactAvatar_1 = __webpack_require__(12);
/**
 * 用户中心主页
 */
var UserCenterExact = /** @class */ (function (_super) {
    __extends(UserCenterExact, _super);
    function UserCenterExact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash_1, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(location);
                        console.log(location.hash !== '' && location.hash.indexOf('access_token') !== -1);
                        if (location.hash !== '' && location.hash.indexOf('access_token') !== -1) {
                            hash_1 = {};
                            location.hash.slice(1).split('&').map(function (item) { return item.split('='); }).forEach(function (item) {
                                hash_1[item[0]] = item[1];
                            });
                            window.localStorage.token = hash_1['access_token'];
                        }
                        return [4 /*yield*/, fetch('https://api.cc98.org/Me/', {
                                headers: {
                                    'Authorization': 'bearer' + ' ' + window.localStorage.token
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({
                            userInfo: data,
                            userAvatarImgURL: data.portraitUrl,
                            responseState: response.status
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserCenterExact.prototype.render = function () {
        var element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (React.createElement("div", { className: "user-center-exact" },
                React.createElement(UserCenterExactAvatar_1.UserCenterExactAvatar, { userAvatarImgURL: this.state.userAvatarImgURL }),
                React.createElement(UserCenterExactProfile_1.UserCenterExactProfile, { userInfo: this.state.userInfo }),
                React.createElement(UserCenterExactActivities_1.UserCenterExactActivities, null)));
        }
        else if (this.state !== null && this.state.responseState === 401) {
            element = React.createElement("p", null, "\u8BF7\u91CD\u65B0\u767B\u9646");
        }
        else {
            element = React.createElement("p", null, "\u52A0\u8F7D\u4E2D");
        }
        return element;
    };
    return UserCenterExact;
}(React.Component));
exports.UserCenterExact = UserCenterExact;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(6);
var AppState_1 = __webpack_require__(3);
//用户中心主页帖子动态组件
var UserCenterExactActivitiesPosts = /** @class */ (function (_super) {
    __extends(UserCenterExactActivitiesPosts, _super);
    function UserCenterExactActivitiesPosts(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = {
            userRecentPosts: new Array(10).fill(userRecentPost),
            isLoading: false
        };
        _this.scrollHandler = _this.scrollHandler.bind(_this);
        return _this;
    }
    UserCenterExactActivitiesPosts.prototype.scrollHandler = function (e) {
        var _this = this;
        var pageYLeft = document.body.scrollHeight - window.pageYOffset;
        if (pageYLeft < 1500 && this.state.isLoading === false) {
            this.setState(function (prevState) {
                _this.setState({ isLoading: true });
                var posts = prevState.userRecentPosts;
                posts = posts.concat(new Array(10).fill(userRecentPost));
                return {
                    userRecentPosts: posts,
                    isLoading: false
                };
            });
        }
    };
    UserCenterExactActivitiesPosts.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                window.addEventListener('scroll', this.scrollHandler);
                return [2 /*return*/];
            });
        });
    };
    UserCenterExactActivitiesPosts.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.scrollHandler);
    };
    UserCenterExactActivitiesPosts.prototype.render = function () {
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterExactActivitiesPosts;
}(React.Component));
exports.UserCenterExactActivitiesPosts = UserCenterExactActivitiesPosts;
//临时填充数据
var userRecentPost = new AppState_1.UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(6);
var AppState_1 = __webpack_require__(3);
//用户中心主页最近回复组件
var UserCenterExactActivitiesReplies = /** @class */ (function (_super) {
    __extends(UserCenterExactActivitiesReplies, _super);
    function UserCenterExactActivitiesReplies(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = { userRecentPosts: [userRecentPost, userRecentPost, userRecentPost] };
        return _this;
    }
    UserCenterExactActivitiesReplies.prototype.render = function () {
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterExactActivitiesReplies;
}(React.Component));
exports.UserCenterExactActivitiesReplies = UserCenterExactActivitiesReplies;
//临时填充数据
var userRecentPost = new AppState_1.UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(3);
var UserCenterMyFollowingsUser_1 = __webpack_require__(13);
//用户中心我的关注组件
var UserCenterMyFollowings = /** @class */ (function (_super) {
    __extends(UserCenterMyFollowings, _super);
    function UserCenterMyFollowings(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            //临时填充信息
            userFollowings: [userFanInfo, userFanInfo, userFanInfo, userFanInfo]
        };
        return _this;
    }
    UserCenterMyFollowings.prototype.render = function () {
        //state转换为JSX
        var userFollowings = this.state.userFollowings.map(function (item) { return (React.createElement(UserCenterMyFollowingsUser_1.UserCenterMyFollowingsUser, { userFanInfo: item })); });
        //添加分隔线
        for (var i = 1; i < userFollowings.length; i += 2) {
            userFollowings.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-center-myfollowings" }, userFollowings));
    };
    return UserCenterMyFollowings;
}(React.Component));
exports.UserCenterMyFollowings = UserCenterMyFollowings;
//临时填充信息
var userFanInfo = new AppState_1.UserFanInfo();
userFanInfo.avatarImgURL = '../img/001.jpg';
userFanInfo.fans = 666;
userFanInfo.posts = 233;
userFanInfo.name = '董松松松';


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var AppState_1 = __webpack_require__(3);
var UserCenterMyFollowingsUser_1 = __webpack_require__(13);
//用户中心我的粉丝组件
var UserCenterMyFans = /** @class */ (function (_super) {
    __extends(UserCenterMyFans, _super);
    function UserCenterMyFans(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            //临时填充信息
            userFans: [userFanInfo, userFanInfo, userFanInfo]
        };
        return _this;
    }
    UserCenterMyFans.prototype.render = function () {
        //state转换为JSX
        var userFans = this.state.userFans.map(function (item) { return (React.createElement(UserCenterMyFollowingsUser_1.UserCenterMyFollowingsUser, { userFanInfo: item })); });
        //添加分隔线
        for (var i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-center-myfans" }, userFans));
    };
    return UserCenterMyFans;
}(React.Component));
exports.UserCenterMyFans = UserCenterMyFans;
//临时填充信息
var userFanInfo = new AppState_1.UserFanInfo();
userFanInfo.avatarImgURL = '../img/001.jpg';
userFanInfo.fans = 666;
userFanInfo.posts = 233;
userFanInfo.name = '董松松松';


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterMyPostsExact_1 = __webpack_require__(48);
var UserCenterMyPostsReplies_1 = __webpack_require__(49);
/**
 * 用户中心我的主题组件
 */
var UserCenterMyPosts = /** @class */ (function (_super) {
    __extends(UserCenterMyPosts, _super);
    function UserCenterMyPosts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyPosts.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { className: "user-center-myposts" },
                React.createElement(CustomLink, { to: "/usercenter/myposts", label: "主题", activeOnlyWhenExact: true }),
                " | ",
                React.createElement(CustomLink, { to: "/usercenter/myposts/replies", label: "回复", activeOnlyWhenExact: false }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/usercenter/myposts", component: UserCenterMyPostsExact_1.UserCenterMyPostsExact }),
                React.createElement(react_router_dom_1.Route, { path: "/usercenter/myposts/replies", component: UserCenterMyPostsReplies_1.UserCenterMyPostsReplies }))));
    };
    return UserCenterMyPosts;
}(React.Component));
exports.UserCenterMyPosts = UserCenterMyPosts;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(6);
var AppState_1 = __webpack_require__(3);
var UserCenterMyPostsExact = /** @class */ (function (_super) {
    __extends(UserCenterMyPostsExact, _super);
    function UserCenterMyPostsExact(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = { userRecentPosts: new Array(50).fill(userRecentPost) };
        return _this;
    }
    UserCenterMyPostsExact.prototype.render = function () {
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterMyPostsExact;
}(React.Component));
exports.UserCenterMyPostsExact = UserCenterMyPostsExact;
//临时填充数据
var userRecentPost = new AppState_1.UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(6);
var AppState_1 = __webpack_require__(3);
//用户中心主页最近回复组件
var UserCenterMyPostsReplies = /** @class */ (function (_super) {
    __extends(UserCenterMyPostsReplies, _super);
    function UserCenterMyPostsReplies(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = { userRecentPosts: [userRecentPost, userRecentPost, userRecentPost] };
        return _this;
    }
    UserCenterMyPostsReplies.prototype.render = function () {
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterMyPostsReplies;
}(React.Component));
exports.UserCenterMyPostsReplies = UserCenterMyPostsReplies;
//临时填充数据
var userRecentPost = new AppState_1.UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterMyFavoritesPosts_1 = __webpack_require__(51);
//import { UserCenterMyFavoritesPostsBoards } from './UserCenterMyFavoritesPostsBoards';
//<Route path='/usercenter/myfavorites/boards' component={UserCenterMyFavoritesPostsBoards} />
/**
 * 用户中心主页近期动态组件
 */
var UserCenterMyFavorites = /** @class */ (function (_super) {
    __extends(UserCenterMyFavorites, _super);
    function UserCenterMyFavorites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterMyFavorites.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { className: "user-center-myfavorites" },
                React.createElement(CustomLink, { to: "/usercenter/myfavorites", label: "文章", activeOnlyWhenExact: true }),
                " | ",
                React.createElement(CustomLink, { to: "/usercenter/myfavorites/boards", label: "版面", activeOnlyWhenExact: false }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/usercenter/myfavorites", component: UserCenterMyFavoritesPosts_1.UserCenterMyFavoritesPosts }))));
    };
    return UserCenterMyFavorites;
}(React.Component));
exports.UserCenterMyFavorites = UserCenterMyFavorites;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, activeOnlyWhenExact = _a.activeOnlyWhenExact;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement(react_router_dom_1.Link, { className: match ? 'user-activities-active' : '', to: to }, label));
        } }));
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterExactActivitiesPost_1 = __webpack_require__(6);
var AppState_1 = __webpack_require__(3);
var UserCenterMyFavoritesPosts = /** @class */ (function (_super) {
    __extends(UserCenterMyFavoritesPosts, _super);
    function UserCenterMyFavoritesPosts(props) {
        var _this = _super.call(this, props) || this;
        //临时填充数据
        _this.state = { userRecentPosts: [userRecentPost, userRecentPost, userRecentPost, userRecentPost] };
        return _this;
    }
    UserCenterMyFavoritesPosts.prototype.render = function () {
        //state转换为JSX
        var userRecentPosts = this.state.userRecentPosts.map(function (item) { return (React.createElement(UserCenterExactActivitiesPost_1.UserCenterExactActivitiesPost, { userRecentPost: item })); });
        //添加分隔线
        for (var i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, React.createElement("hr", null));
        }
        return (React.createElement("div", { className: "user-posts" }, userRecentPosts));
    };
    return UserCenterMyFavoritesPosts;
}(React.Component));
exports.UserCenterMyFavoritesPosts = UserCenterMyFavoritesPosts;
//临时填充数据
var userRecentPost = new AppState_1.UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterConfigAvatar_1 = __webpack_require__(53);
var UserCenterConfigSignature_1 = __webpack_require__(54);
var UsercenterConfigPassword_1 = __webpack_require__(55);
var UserCenterConfig = /** @class */ (function (_super) {
    __extends(UserCenterConfig, _super);
    function UserCenterConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterConfig.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-config" },
            React.createElement(UserCenterConfigAvatar_1.UserCenterConfigAvatar, null),
            React.createElement("hr", null),
            React.createElement(UserCenterConfigSignature_1.UserCenterConfigSignature, null),
            React.createElement("hr", null),
            React.createElement(UsercenterConfigPassword_1.UserCenterConfigPassword, null)));
    };
    return UserCenterConfig;
}(React.Component));
exports.UserCenterConfig = UserCenterConfig;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterConfigAvatar = /** @class */ (function (_super) {
    __extends(UserCenterConfigAvatar, _super);
    function UserCenterConfigAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterConfigAvatar.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-config-avatar" },
            React.createElement("img", { src: "http://file.cc98.org/uploadface/5298.png" }),
            React.createElement("div", null,
                React.createElement("button", { id: "chooseDefaultAvatar", type: "button" }, "\u9009\u62E9\u8BBA\u575B\u5934\u50CF"),
                React.createElement("div", null,
                    React.createElement("button", { id: "uploadAvatar", type: "button" }, "\u4E0A\u4F20\u5934\u50CF"),
                    React.createElement("p", null, "\u56FE\u7247\u957F\u5BBD\u4E3A160\u00D7160\u50CF\u7D20\u7684\u56FE\u7247")))));
    };
    return UserCenterConfigAvatar;
}(React.Component));
exports.UserCenterConfigAvatar = UserCenterConfigAvatar;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterConfigSignature = /** @class */ (function (_super) {
    __extends(UserCenterConfigSignature, _super);
    function UserCenterConfigSignature(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            signature: '你还没有个性签名',
            signatureExtends: null
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    UserCenterConfigSignature.prototype.handleChange = function (event) {
        this.setState({ signature: event.target.value });
        console.log(this.state.signature);
    };
    UserCenterConfigSignature.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-config-signature" },
            React.createElement("div", { className: "signature-buttons" },
                React.createElement("button", { id: "signatureImg", type: "button" }, "\u56FE\u7247"),
                React.createElement("button", { id: "signatureVideo", type: "button" }, "\u89C6\u9891"),
                React.createElement("button", { id: "signatureAudio", type: "button" }, "\u97F3\u4E50"),
                React.createElement("button", { id: "signatureColor", type: "button" }, "A"),
                React.createElement("button", { id: "signatureStrong", type: "button" }, "B")),
            React.createElement("div", { className: "signature-extends" }),
            React.createElement("textarea", { id: "signature", onChange: this.handleChange, value: this.state.signature }),
            React.createElement("div", null,
                React.createElement("p", null, "\u6CE8* \u4E2A\u6027\u7B7E\u540D\u5C06\u5728\u4E2A\u4EBA\u4E3B\u9875\u3001\u53D1\u5E03\u6587\u7AE0\u3001\u56DE\u590D\u6587\u7AE0\u4E2D\u663E\u793A"),
                React.createElement("button", { id: "signatureUpload", type: "button" }, "\u4FDD\u5B58\u7B7E\u540D\u6863"))));
    };
    return UserCenterConfigSignature;
}(React.Component));
exports.UserCenterConfigSignature = UserCenterConfigSignature;
var UserCenterConfigSignatureState = /** @class */ (function () {
    function UserCenterConfigSignatureState() {
    }
    return UserCenterConfigSignatureState;
}());


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UserCenterConfigPassword = /** @class */ (function (_super) {
    __extends(UserCenterConfigPassword, _super);
    function UserCenterConfigPassword() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCenterConfigPassword.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-config-password" },
            React.createElement("p", null, "\u4FEE\u6539\u5BC6\u7801"),
            React.createElement("div", { className: "password-inputs" },
                React.createElement("p", null, "\u539F\u5BC6\u7801"),
                React.createElement("input", { type: "password", id: "oldPassword" }),
                React.createElement("p", null, "\u65B0\u5BC6\u7801"),
                React.createElement("input", { type: "password", id: "newPassword" }),
                React.createElement("p", null, "\u786E\u8BA4\u5BC6\u7801"),
                React.createElement("input", { type: "password", id: "confirmPassword" }),
                React.createElement("button", { type: "button" }, "\u63D0\u4EA4\u5BC6\u7801")),
            React.createElement("p", { id: "passwordChangeMesssage" })));
    };
    return UserCenterConfigPassword;
}(React.Component));
exports.UserCenterConfigPassword = UserCenterConfigPassword;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var MyMessageMessage_1 = __webpack_require__(57);
var MyMessageResponse_1 = __webpack_require__(62);
var MyMessageAttme_1 = __webpack_require__(63);
var MyMessageSystem_1 = __webpack_require__(64);
var react_router_dom_1 = __webpack_require__(2);
/**
 * 网站的主页面对象。
 */
var MyMessage = /** @class */ (function (_super) {
    __extends(MyMessage, _super);
    function MyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyMessage.prototype.render = function () {
        var url = sendRequest();
        var token = location.href.match(/access_token=(\S+)&token_type/);
        var accessToken;
        if (token) {
            accessToken = token[1];
        }
        return (React.createElement("div", { className: "mymessage-root" },
            React.createElement("div", { className: "mymessage" },
                React.createElement("div", { className: "mymessage-login" },
                    React.createElement("a", { href: url }, "\u767B\u9646")),
                React.createElement("div", { className: "mymessage-title" }, "\u6211\u7684\u6D88\u606F"),
                React.createElement(react_router_dom_1.BrowserRouter, null,
                    React.createElement("div", { className: "mymessage-content" },
                        React.createElement("div", { className: "mymessage-nav" },
                            React.createElement("div", { id: "response" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/response?access_token=" + accessToken }, "\u56DE\u590D\u6211\u7684")),
                            React.createElement("div", { id: "attme" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/attme?access_token=" + accessToken }, "@\u6211\u7684")),
                            React.createElement("div", { id: "likes" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/likes?access_token=" + accessToken }, "\u6536\u5230\u7684\u8D5E")),
                            React.createElement("div", { id: "system" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/system?access_token=" + accessToken }, "\u7CFB\u7EDF\u901A\u77E5")),
                            React.createElement("div", { id: "message" },
                                React.createElement(react_router_dom_1.NavLink, { to: "/mymessage/message?access_token=" + accessToken }, "\u6211\u7684\u79C1\u4FE1"))),
                        React.createElement(react_router_dom_1.Route, { path: "/mymessage/response", component: MyMessageResponse_1.MyMessageResponse }),
                        React.createElement(react_router_dom_1.Route, { path: "/mymessage/attme", component: MyMessageAttme_1.MyMessageAttme }),
                        React.createElement(react_router_dom_1.Route, { path: "/mymessage/likes", component: Likes }),
                        React.createElement(react_router_dom_1.Route, { path: "/mymessage/system", component: MyMessageSystem_1.MyMessageSystem }),
                        React.createElement(react_router_dom_1.Route, { path: "/mymessage/message", component: MyMessageMessage_1.MyMessageMessage }))))));
    };
    return MyMessage;
}(React.Component));
exports.MyMessage = MyMessage;
//选中效果
function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus');
}
exports.changeNav = changeNav;
var Likes = /** @class */ (function (_super) {
    __extends(Likes, _super);
    function Likes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Likes.prototype.render = function () {
        changeNav('#likes');
        return React.createElement("div", null, "\u8FD9\u91CC\u662F\u6211\u6536\u5230\u7684\u8D5E");
    };
    return Likes;
}(React.Component));
exports.Likes = Likes;
function sendRequest() {
    //申请到的appID
    var appId = '457bfed1-ab0b-4606-a346-05afac262d5a';
    //申请后的回调地址
    var c = location.origin + "/mymessage";
    var redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    var path = 'https://login.cc98.org/OAuth/Authorize?';
    var queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    var query = queryParams.join('&');
    var url = path + query;
    return url;
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MyMessagePerson_1 = __webpack_require__(58);
var MyMessageWindow_1 = __webpack_require__(59);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MyMessageMessage = /** @class */ (function (_super) {
    __extends(MyMessageMessage, _super);
    function MyMessageMessage(props) {
        var _this = _super.call(this, props) || this;
        //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
        _this.coverMessagePerson = function (item) {
            var changeChatName = function () {
                _this.setState({ chatName: item.name, chatPortraitUrl: item.portraitUrl });
                //给选中的聊天对象添加选中效果
                $('.mymessage-message-pList > div').removeClass('mymessage-message-pFocus');
                $("#" + item.name).addClass('mymessage-message-pFocus');
            };
            return React.createElement("div", { onClick: changeChatName, id: "" + item.name },
                React.createElement(MyMessagePerson_1.MyMessagePerson, { name: item.name, portraitUrl: item.portraitUrl, title: item.title, content: item.content }));
        };
        _this.state = {
            data: [],
            chatName: '系统',
            chatPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            myName: '系统',
            myPortraitUrl: 'http://file.cc98.org/uploadface/40994.gif',
            token: 'testAccessToken'
        };
        return _this;
        //如果没有设置默认的state，render第一次渲染的时候state为空，MyMessageWindow组件会报错
    }
    MyMessageMessage.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var personNumber, token, accessToken, response1, myInfo, people, startPage, response2, data, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        personNumber = 40;
                        token = location.href.match(/access_token=(\S+)/);
                        if (token) {
                            accessToken = token[1];
                        }
                        ;
                        return [4 /*yield*/, fetch('https://api.cc98.org/me', {
                                headers: {
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 1:
                        response1 = _c.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        myInfo = _c.sent();
                        people = [];
                        startPage = -49;
                        _c.label = 3;
                    case 3:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=both', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 4:
                        response2 = _c.sent();
                        return [4 /*yield*/, response2.json()];
                    case 5:
                        data = _c.sent();
                        //从最近50条收发短信中获取最多n位联系人，并存储在people中
                        for (i in data) {
                            //系统消息统统筛掉
                            if (data[i].title == '回复提示' || data[i].title == '@提示' || data[i].title == '转账通知' || data[i].title == '系统消息' || data[i].title == "\u7528\u6237\uFF1A" + myInfo.name + " \u5728\u5E16\u5B50\u4E2D\u56DE\u590D\u4E86\u4F60") {
                            }
                            else if (data[i].senderName == myInfo.name) {
                                if (!contains(people, data[i].receiverName)) {
                                    people.push({ name: data[i].receiverName, portraitUrl: '', title: data[i].title, content: data[i].content });
                                }
                            }
                            else if (data[i].senderName) {
                                if (!contains(people, data[i].senderName)) {
                                    people.push({ name: data[i].senderName, portraitUrl: '', title: data[i].title, content: data[i].content });
                                }
                            }
                            if (people.length >= personNumber) {
                                break;
                            }
                        }
                        _c.label = 6;
                    case 6:
                        if (people.length < personNumber) return [3 /*break*/, 3];
                        _c.label = 7;
                    case 7:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 8;
                    case 8:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].name)];
                    case 9:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 10:
                        person = _c.sent();
                        people[i].portraitUrl = person.portraitUrl;
                        _c.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 8];
                    case 12:
                        this.setState({ data: people, chatName: people[0].name, chatPortraitUrl: people[0].portraitUrl, myName: myInfo.name, myPortraitUrl: myInfo.portraitUrl, token: accessToken });
                        //默认选中第一个联系人
                        $("#" + people[0].name).addClass('mymessage-message-pFocus');
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMessageMessage.prototype.render = function () {
        //给我的私信添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#message').addClass('mymessage-nav-focus');
        return (React.createElement("div", { className: "mymessage-message" },
            React.createElement("div", { className: "mymessage-message-people" },
                React.createElement("div", { className: "mymessage-message-pTitle" }, "\u8FD1\u671F\u79C1\u4FE1"),
                React.createElement("div", { className: "mymessage-message-pList" }, this.state.data.map(this.coverMessagePerson))),
            React.createElement(MyMessageWindow_1.MyMessageWindow, { chatName: this.state.chatName, chatPortraitUrl: this.state.chatPortraitUrl, myName: this.state.myName, myPortraitUrl: this.state.myPortraitUrl, token: this.state.token })));
    };
    return MyMessageMessage;
}(React.Component));
exports.MyMessageMessage = MyMessageMessage;
//查找数组arr中是否存在元素的名字为obj
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var MyMessagePerson = /** @class */ (function (_super) {
    __extends(MyMessagePerson, _super);
    function MyMessagePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyMessagePerson.prototype.render = function () {
        return (React.createElement("div", { className: "mymessage-message-person" },
            React.createElement("img", { className: "mymessage-message-pPortraitUrl", src: this.props.portraitUrl }),
            React.createElement("div", { className: "mymessage-message-pInfo" },
                React.createElement("div", { className: "mymessage-message-pName" }, this.props.name),
                React.createElement("div", { className: "mymessage-message-pMessage" },
                    "[",
                    this.props.title,
                    "]",
                    this.props.content))));
    };
    return MyMessagePerson;
}(React.Component));
exports.MyMessagePerson = MyMessagePerson;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MyMessageSender_1 = __webpack_require__(60);
var MyMessageReceiver_1 = __webpack_require__(61);
var MyMessageWindow = /** @class */ (function (_super) {
    __extends(MyMessageWindow, _super);
    function MyMessageWindow(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMyMessageProps = function (item) {
            if (item.title == '回复提示' || item.title == '@提示' || item.title == '转账通知' || item.title == '系统消息' || item.title == "\u7528\u6237\uFF1A" + _this.props.myName + " \u5728\u5E16\u5B50\u4E2D\u56DE\u590D\u4E86\u4F60") {
            }
            else if (item.senderName == _this.props.chatName) {
                return React.createElement(MyMessageReceiver_1.MyMessageReceiver, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
            }
            else {
                return React.createElement(MyMessageSender_1.MyMessageSender, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
            }
        };
        _this.postMessage = function () {
            var bodyObj = { receiverName: _this.props.chatName, title: '你好', content: $('#myMessageContent').val() };
            var bodyContent = JSON.stringify(bodyObj);
            var messageId = fetch('https://api.cc98.org/Message', {
                method: 'POST',
                headers: { Authorization: "Bearer " + _this.props.token, 'content-type': 'application/json' },
                body: bodyContent
            });
            //重新获取数据并渲染
            console.log($('#myMessageContent').val());
            //这里写法有点奇怪，但是这样写才能暂停0.2秒再执行this.getMessageData，不能在setTimeout的第一个函数里直接调用this.getMessageData,那样会立即执行
            var self = _this;
            setTimeout(function () { self.getMessageData(self.props); }, 200);
            //清空输入框
            $('#myMessageContent').val('');
        };
        _this.report = function () {
            alert('举报他人恶意私信请到【论坛事务】按照格式发帖投诉，记得截图保留证据，管理员会及时进行处理！感谢您对CC98的支持！');
        };
        _this.state = { data: [] };
        _this.getMessageData = _this.getMessageData.bind(_this);
        return _this;
    }
    MyMessageWindow.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getMessageData(this.props);
                return [2 /*return*/];
            });
        });
    };
    MyMessageWindow.prototype.componentWillReceiveProps = function (nextProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getMessageData(nextProps);
                return [2 /*return*/];
            });
        });
    };
    MyMessageWindow.prototype.getMessageData = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var data, startPage, response, nowData, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(item.chatName != '系统')) return [3 /*break*/, 6];
                        data = [];
                        startPage = -50;
                        _a.label = 1;
                    case 1:
                        startPage += 50;
                        return [4 /*yield*/, fetch("https://api.cc98.org/Message?userName=" + item.chatName + "&filter=both", {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + item.token
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        nowData = _a.sent();
                        for (i in nowData) {
                            data.push(nowData[i]);
                        }
                        _a.label = 4;
                    case 4:
                        if (data.length % 50 == 0) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        //给每个数据都加上我和正在聊天者的头像的图片地址
                        for (i in data) {
                            data[i].chatPortraitUrl = item.chatPortraitUrl;
                            data[i].myPortraitUrl = item.myPortraitUrl;
                        }
                        //因为服务器上存储每条消息的时间只精确到分，所以同一分钟内的所有消息顺序正好是反的，所以需要重新排一下顺序，等樱桃把服务器上消息发送时间精确到秒之后就可以把这个步骤去掉了
                        sortArr(data);
                        this.setState({ data: data });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MyMessageWindow.prototype.render = function () {
        console.log('开始render');
        return (React.createElement("div", { className: "mymessage-message-window" },
            React.createElement("div", { className: "mymessage-message-wHeader" },
                React.createElement("div", { className: "mymessage-message-wReport" }),
                React.createElement("div", { className: "mymessage-message-wTitle" },
                    "\u4E0E ",
                    this.props.chatName,
                    " \u7684\u79C1\u4FE1"),
                React.createElement("div", { className: "mymessage-message-wReport" },
                    React.createElement("button", { onClick: this.report }, "\u4E3E\u62A5"))),
            React.createElement("div", { className: "mymessage-message-wContent" }, this.state.data.map(this.coverMyMessageProps)),
            React.createElement("div", { className: "mymessage-message-wPost" },
                React.createElement("textarea", { className: "mymessage-message-wPostArea", id: "myMessageContent" }),
                React.createElement("button", { className: "mymessage-message-wPostBtn", onClick: this.postMessage }, "\u56DE\u590D"))));
    };
    return MyMessageWindow;
}(React.Component));
exports.MyMessageWindow = MyMessageWindow;
function sortArr(arr) {
    var s = -1;
    var e = -1;
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].sendTime == arr[i + 1].sendTime && s == -1) {
            s = i;
        }
        else if (arr[i].sendTime != arr[i + 1].sendTime && s != -1) {
            e = i;
        }
        if (s != -1 && e != -1) {
            reverseArr(arr, s, e);
            s = -1;
            e = -1;
        }
    }
}
function reverseArr(arr, s, e) {
    for (var i = s; i < e; i++) {
        _a = [arr[e], arr[i]], arr[i] = _a[0], arr[e] = _a[1];
        e--;
    }
    var _a;
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(8);
var MyMessageSender = /** @class */ (function (_super) {
    __extends(MyMessageSender, _super);
    function MyMessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyMessageSender.prototype.render = function () {
        return (React.createElement("div", { className: "mymessage-message-wc" },
            React.createElement("div", { className: "mymessage-message-wcTime" }, this.props.sendTime),
            React.createElement("div", { className: "mymessage-message-wcSender" },
                React.createElement("img", { className: "mymessage-message-wcPortraitUrl", src: this.props.myPortraitUrl }),
                React.createElement("div", { className: "mymessage-message-wcContent" },
                    React.createElement("div", { id: String(this.props.id), className: "mymessage-message-wcText" },
                        "\u3010",
                        this.props.title,
                        "\u3011",
                        React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content }))),
                React.createElement("div", { className: "mymessage-message-wcRead1" },
                    React.createElement("div", { className: "mymessage-message-wcRead2" }, this.props.isRead ? '已读' : '未读')))));
    };
    return MyMessageSender;
}(React.Component));
exports.MyMessageSender = MyMessageSender;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var UbbContainer_1 = __webpack_require__(8);
var MyMessageReceiver = /** @class */ (function (_super) {
    __extends(MyMessageReceiver, _super);
    function MyMessageReceiver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */
    MyMessageReceiver.prototype.render = function () {
        return (React.createElement("div", { className: "mymessage-message-wc" },
            React.createElement("div", { className: "mymessage-message-wcTime" }, this.props.sendTime),
            React.createElement("div", { className: "mymessage-message-wcReceiver" },
                React.createElement("img", { className: "mymessage-message-wcPortraitUrl", src: this.props.chatPortraitUrl }),
                React.createElement("div", { className: "mymessage-message-wcContent" },
                    React.createElement("div", { className: "mymessage-message-wcText", id: String(this.props.id) },
                        "\u3010",
                        this.props.title,
                        "\u3011",
                        React.createElement(UbbContainer_1.UbbContainer, { code: this.props.content }))),
                React.createElement("div", { className: "mymessage-message-wcRead1" },
                    React.createElement("div", { className: "mymessage-message-wcRead2" }, this.props.isRead ? '已读' : '未读')))));
    };
    return MyMessageReceiver;
}(React.Component));
exports.MyMessageReceiver = MyMessageReceiver;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MyMessageResponsebox_1 = __webpack_require__(14);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MyMessageResponse = /** @class */ (function (_super) {
    __extends(MyMessageResponse, _super);
    function MyMessageResponse(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageResponse = function (item) {
            return React.createElement(MyMessageResponsebox_1.MyMessageResponsebox, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
        };
        _this.state = {
            data: [],
        };
        return _this;
    }
    MyMessageResponse.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, accessToken, people, data, startPage, response, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = location.href.match(/access_token=(\S+)/);
                        if (token) {
                            accessToken = token[1];
                        }
                        ;
                        people = [];
                        data = [];
                        startPage = -49;
                        _c.label = 1;
                    case 1:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=receive', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _c.sent();
                        //从最近50条消息中获取回复信息，并存储在people中
                        for (i in data) {
                            //系统消息统统筛掉
                            if (data[i].title == '回复提示') {
                                people.push({ id: data[i].id, senderName: data[i].senderName, receiverName: data[i].receiverName, title: data[i].title, content: data[i].content, isRead: data[i].isRead, sendTime: data[i].sendTime, chatPortraitUrl: '', myPortraitUrl: '' });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        if (data.length % 50 == 0) return [3 /*break*/, 1];
                        _c.label = 5;
                    case 5:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].senderName)];
                    case 7:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 8:
                        person = _c.sent();
                        people[i].chatPortraitUrl = person.portraitUrl;
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.setState({ data: people });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMessageResponse.prototype.render = function () {
        //给我的回复添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#response').addClass('mymessage-nav-focus');
        return React.createElement("div", { className: "mymessage-response" }, this.state.data.map(this.coverMessageResponse));
    };
    return MyMessageResponse;
}(React.Component));
exports.MyMessageResponse = MyMessageResponse;
//查找数组arr中是否存在元素的名字为obj
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MyMessageResponsebox_1 = __webpack_require__(14);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MyMessageAttme = /** @class */ (function (_super) {
    __extends(MyMessageAttme, _super);
    function MyMessageAttme(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageResponse = function (item) {
            return React.createElement(MyMessageResponsebox_1.MyMessageResponsebox, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
        };
        _this.state = {
            data: [],
        };
        return _this;
    }
    MyMessageAttme.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, accessToken, people, data, startPage, response, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = location.href.match(/access_token=(\S+)/);
                        if (token) {
                            accessToken = token[1];
                        }
                        ;
                        people = [];
                        data = [];
                        startPage = -49;
                        _c.label = 1;
                    case 1:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=receive', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _c.sent();
                        //从最近50条消息中获取回复信息，并存储在people中
                        for (i in data) {
                            //系统消息统统筛掉
                            if (data[i].title == '@提示') {
                                people.push({ id: data[i].id, senderName: data[i].senderName, receiverName: data[i].receiverName, title: data[i].title, content: data[i].content, isRead: data[i].isRead, sendTime: data[i].sendTime, chatPortraitUrl: '', myPortraitUrl: '' });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        if (data.length % 50 == 0) return [3 /*break*/, 1];
                        _c.label = 5;
                    case 5:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].senderName)];
                    case 7:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 8:
                        person = _c.sent();
                        people[i].chatPortraitUrl = person.portraitUrl;
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.setState({ data: people });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMessageAttme.prototype.render = function () {
        //给我的回复添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#attme').addClass('mymessage-nav-focus');
        return React.createElement("div", { className: "mymessage-response" }, this.state.data.map(this.coverMessageResponse));
    };
    return MyMessageAttme;
}(React.Component));
exports.MyMessageAttme = MyMessageAttme;
//查找数组arr中是否存在元素的名字为obj
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = __webpack_require__(0);
var MyMessageSystembox_1 = __webpack_require__(65);
/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
var MyMessageSystem = /** @class */ (function (_super) {
    __extends(MyMessageSystem, _super);
    function MyMessageSystem(props) {
        var _this = _super.call(this, props) || this;
        _this.coverMessageSystem = function (item) {
            return React.createElement(MyMessageSystembox_1.MyMessageSystembox, { id: item.id, senderName: item.senderName, receiverName: item.receiverName, title: item.title, content: item.content, isRead: item.isRead, sendTime: item.sendTime, chatPortraitUrl: item.chatPortraitUrl, myPortraitUrl: item.myPortraitUrl });
        };
        _this.state = {
            data: [],
        };
        return _this;
    }
    MyMessageSystem.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, accessToken, people, data, startPage, response, i, _a, _b, _i, i, response, person;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = location.href.match(/access_token=(\S+)/);
                        if (token) {
                            accessToken = token[1];
                        }
                        ;
                        people = [];
                        data = [];
                        startPage = -49;
                        _c.label = 1;
                    case 1:
                        startPage += 49;
                        return [4 /*yield*/, fetch('https://api.cc98.org/Message?filter=receive', {
                                headers: {
                                    Range: "bytes=" + startPage + "-" + (startPage + 49),
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 2:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _c.sent();
                        //从最近50条消息中获取回复信息，并存储在people中
                        for (i in data) {
                            if (data[i].title == '系统消息' || (!data[i].senderName)) {
                                people.push({ id: data[i].id, senderName: data[i].senderName, receiverName: data[i].receiverName, title: data[i].title, content: data[i].content, isRead: data[i].isRead, sendTime: data[i].sendTime, chatPortraitUrl: '', myPortraitUrl: '' });
                            }
                        }
                        _c.label = 4;
                    case 4:
                        if (data.length % 50 == 0) return [3 /*break*/, 1];
                        _c.label = 5;
                    case 5:
                        _a = [];
                        for (_b in people)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        i = _a[_i];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + people[i].senderName)];
                    case 7:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 8:
                        person = _c.sent();
                        people[i].chatPortraitUrl = person.portraitUrl;
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.setState({ data: people });
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMessageSystem.prototype.render = function () {
        //给我的回复添加选中样式
        $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
        $('#system').addClass('mymessage-nav-focus');
        return React.createElement("div", { className: "mymessage-system" }, this.state.data.map(this.coverMessageSystem));
    };
    return MyMessageSystem;
}(React.Component));
exports.MyMessageSystem = MyMessageSystem;
//查找数组arr中是否存在元素的名字为obj
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var MyMessageSystembox = /** @class */ (function (_super) {
    __extends(MyMessageSystembox, _super);
    function MyMessageSystembox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */
    MyMessageSystembox.prototype.render = function () {
        return (React.createElement("div", { className: "mymessage-system-box" },
            React.createElement("div", { className: "mymessage-system-box-title" }, this.props.title),
            React.createElement("div", { className: "mymessage-system-box-date" }, this.props.sendTime),
            React.createElement("div", { className: "mymessage-system-box-content" }, this.props.content)));
    };
    return MyMessageSystembox;
}(React.Component));
exports.MyMessageSystembox = MyMessageSystembox;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var FocusPostAreaComponent_1 = __webpack_require__(15);
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
        return (React.createElement("div", { className: "focus-root" },
            React.createElement("div", { className: "focus" },
                React.createElement("div", { className: "focus-allNewPost" },
                    React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                    "\u9996\u9875/\u5168\u7AD9\u65B0\u5E16"),
                React.createElement(FocusPostAreaComponent_1.FocusPostAreaComponent, null))));
    };
    return AllNewPost;
}(React.Component));
exports.AllNewPost = AllNewPost;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var moment = __webpack_require__(7);
/**
 * 我关注的某个版面的单个主题
 */
var FocusPostComponent = /** @class */ (function (_super) {
    __extends(FocusPostComponent, _super);
    function FocusPostComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusPostComponent.prototype.render = function () {
        var topicUrl = "/topic/" + this.props.id;
        return (React.createElement("div", { className: "focus-post" },
            React.createElement("img", { className: "focus-post-portraitUrl", src: this.props.portraitUrl }),
            React.createElement("div", { className: "focus-post-info1" },
                React.createElement("div", { className: "focus-post-authorInfo" },
                    React.createElement("div", { className: "focus-post-blackText" }, this.props.authorName),
                    React.createElement("div", { className: "focus-post-redText" }, this.props.fanCount),
                    React.createElement("div", { className: "focus-post-blackText" }, "\u7C89\u4E1D")),
                React.createElement("div", { className: "focus-post-title" },
                    React.createElement("a", { href: topicUrl }, this.props.title))),
            React.createElement("div", { className: "focus-post-info2" },
                React.createElement("div", { className: "focus-post-board" },
                    this.props.boardName,
                    " / ",
                    moment(this.props.createTime).format('YYYY-MM-DD HH:mm:ss')),
                React.createElement("div", { className: "focus-post-response" },
                    React.createElement("div", null,
                        React.createElement("i", { className: "fa fa-thumbs-o-up", "aria-hidden": "true" }),
                        this.props.likeCount),
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


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var FocusBoardAreaComponent_1 = __webpack_require__(69);
var FocusPostAreaComponent_1 = __webpack_require__(15);
var MyFocusBoard = /** @class */ (function (_super) {
    __extends(MyFocusBoard, _super);
    function MyFocusBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 从上往下分别为：页面标题、关注版面列表区域、选中版面的主题列表区域，分别用三个组件表示
     */
    MyFocusBoard.prototype.render = function () {
        return (React.createElement("div", { className: "focus-root" },
            React.createElement("div", { className: "focus" },
                React.createElement("div", { className: "focus-title" }, "\u6211\u7684\u5173\u6CE8\u7248\u9762"),
                React.createElement(FocusBoardAreaComponent_1.FocusBoardAreaComponent, null),
                React.createElement(FocusPostAreaComponent_1.FocusPostAreaComponent, null))));
    };
    return MyFocusBoard;
}(React.Component));
exports.MyFocusBoard = MyFocusBoard;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var FocusBoardComponent_1 = __webpack_require__(70);
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
        return React.createElement("div", { className: "focus-board-area" }, this.state.data.map(coverFocusBoard));
    };
    return FocusBoardAreaComponent;
}(React.Component));
exports.FocusBoardAreaComponent = FocusBoardAreaComponent;
function coverFocusBoard(item) {
    return React.createElement(FocusBoardComponent_1.FocusBoardComponent, { id: item.id, name: item.name });
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
/**
 * 我关注的版面（单个版面的样式）
 */
var FocusBoardComponent = /** @class */ (function (_super) {
    __extends(FocusBoardComponent, _super);
    function FocusBoardComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusBoardComponent.prototype.render = function () {
        return React.createElement("div", { className: "focus-board" }, this.props.name);
    };
    return FocusBoardComponent;
}(React.Component));
exports.FocusBoardComponent = FocusBoardComponent;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var $ = __webpack_require__(5);
var DropDown = /** @class */ (function (_super) {
    __extends(DropDown, _super);
    function DropDown(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = ({
            userName: 'null',
            userImgUrl: "/images/userImg.png"
        });
        return _this;
    }
    DropDown.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userName, response, data, userImgUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utility.getLocalStorage("accessToken") && Utility.getLocalStorage("userName"))) return [3 /*break*/, 3];
                        userName = Utility.getLocalStorage("userName");
                        return [4 /*yield*/, fetch("http://api.cc98.org/User/Name/" + userName)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        userImgUrl = data.portraitUrl;
                        this.setState({ userName: userName, userImgUrl: userImgUrl });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DropDown.prototype.render = function () {
        $(document).ready(function () {
            var userInfo = $('.userInfo').eq(0);
            var subA = $('ul').eq(0);
            var liA = subA.find('li');
            userInfo.hover(function () {
                subA.css('display', 'block');
            }, function () {
                subA.css('display', 'none');
            });
            subA.hover(function () {
                $(this).css('display', 'block');
                ;
            }, function () {
                $(this).css('display', 'none');
            });
            /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
            如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
            或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/
            liA.mouseover(function () {
                this.className = 'hover';
            });
            liA.mouseout(function () {
                this.className = '';
            });
        });
        return React.createElement("div", { id: "dropdown" },
            React.createElement("div", { className: "box" },
                React.createElement("div", { className: "userInfo" },
                    React.createElement("div", { className: "userImg" },
                        React.createElement("img", { src: this.state.userImgUrl })),
                    React.createElement("div", { className: "select" }, this.state.userName)),
                React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                    React.createElement("a", { href: "/", style: { color: '#fff' } }, "\u9996\u9875")),
                React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                    React.createElement("a", { href: "/focus", style: { color: '#fff' } }, "\u5173\u6CE8")),
                React.createElement("div", { className: "topBarText", style: { margin: '0 10px 0 10px' } },
                    React.createElement("a", { href: "/newTopics", style: { color: '#fff' } }, "\u65B0\u5E16")),
                React.createElement("div", { className: "boardListLink", style: { margin: '0 0 0 10px' } },
                    React.createElement("a", { href: "/boardList", style: { marginTop: '16px', color: '#fff' } }, "\u7248\u9762"))),
            React.createElement("ul", { className: "sub" },
                React.createElement("li", null, "\u4E2A\u4EBA\u4E2D\u5FC3"),
                React.createElement("li", null, "\u6D88\u606F")));
    };
    return DropDown;
}(React.Component));
exports.DropDown = DropDown;
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Search.prototype.render = function () {
        $(document).ready(function () {
            var selectB = $('.select').eq(1);
            var downArrow = $('.downArrow');
            var subB = $('ul').eq(1);
            var liB = subB.find('li');
            $(document).click(function () {
                subB.css('display', 'none');
            });
            selectB.click(function () {
                if (subB.css('display') === 'block')
                    subB.css('display', 'none');
                else
                    subB.css('display', 'block');
                return false; //阻止事件冒泡
            });
            downArrow.click(function () {
                if (subB.css('display') === 'block')
                    subB.css('display', 'none');
                else
                    subB.css('display', 'block');
                return false; //阻止事件冒泡
            });
            /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
            如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
            或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/
            liB.click(function () {
                selectB.text($(this).text());
            });
            liB.mouseover(function () {
                this.className = 'hover';
            });
            liB.mouseout(function () {
                this.className = '';
            });
        });
        return React.createElement("div", { id: "search" },
            React.createElement("div", { className: "box" },
                React.createElement("form", null,
                    React.createElement("div", { className: "select" }, "\u4E3B\u9898"),
                    React.createElement("div", { className: "downArrow" },
                        React.createElement("img", { src: "/images/downArrow.png", width: "12", height: "12" })),
                    React.createElement("input", { name: "searchText", type: "text", placeholder: "猜猜能搜到什么..." }),
                    React.createElement("div", { className: "fangdajing" },
                        React.createElement("img", { src: "/images/fangdajing.ico", width: "15", height: "15" })))),
            React.createElement("ul", { className: "sub" },
                React.createElement("li", null, "\u7248\u9762"),
                React.createElement("li", null, "\u4E3B\u9898"),
                React.createElement("li", null, "\u7528\u6237")));
    };
    return Search;
}(React.Component));
exports.Search = Search;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return React.createElement("div", { className: "header" },
            React.createElement("div", { className: "topBar" },
                React.createElement("div", { className: "topBarRow" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { style: { margin: '10px 0 0 0' } },
                            React.createElement("a", { href: "/" },
                                React.createElement("img", { src: "/images/矢量智能对象.ico" }))),
                        React.createElement("div", { style: { margin: '15px 0 0 5px' } },
                            React.createElement("a", { href: "/" },
                                React.createElement("img", { src: "/images/CC98.ico" })))),
                    React.createElement(DropDown, null))),
            React.createElement("div", { className: "headerContent" },
                React.createElement("div", { className: "headerRow" },
                    React.createElement("div", { className: "linkBar" },
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/网盘.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://share.cc98.org/", className: "linkText" }, "\u7F51\u76D8"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/游戏.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.cc98.org/game.asp", className: "linkText" }, "\u6E38\u620F"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/勋章.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://v2.cc98.org/app/medalmanager.aspx", className: "linkText" }, "\u52CB\u7AE0"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/抽卡.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://card.cc98.org/", className: "linkText" }, "\u62BD\u5361"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/gamble.ico", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://gaming.cc98.org", className: "linkText" }, "\u7ADE\u731C"))),
                        React.createElement("div", { className: "row", style: { margin: '0 10px 0 10px' } },
                            React.createElement("div", { style: { margin: '3px 10px 0 0' } },
                                React.createElement("img", { src: "/images/NexusHD.jpg", width: "15", height: "15" })),
                            React.createElement("div", null,
                                React.createElement("a", { href: "http://www.nexushd.org", className: "linkText" }, "NexusHD")))),
                    React.createElement(Search, null))));
    };
    return Header;
}(React.Component));
exports.Header = Header;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return React.createElement("div", { className: "footer" },
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "footerRow" },
                    React.createElement("div", { style: { marginRight: "15px", color: "#000" } }, "\u53CB\u60C5\u94FE\u63A5"),
                    React.createElement("a", { href: "http://www.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66"),
                    "|",
                    React.createElement("a", { href: "http://www.cs.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66\u8BA1\u7B97\u673A\u5B66\u9662"),
                    "|",
                    React.createElement("a", { href: "http://www.zju88.org/agent/index.do" }, "\u98D8\u6E3A\u6C34\u4E91\u95F4"),
                    "|",
                    React.createElement("a", { href: "http://www.qsc.zju.edu.cn/" }, "\u6C42\u662F\u6F6E"),
                    "|",
                    React.createElement("a", { href: "http://luckweb.057101.com/bt2/index.asp" }, "\u7F18\u7F51"),
                    "|",
                    React.createElement("a", { href: "http://www.nexushd.org/login.php" }, "NexusHD"),
                    "|",
                    React.createElement("a", { href: "https://www.zdgd.zju.edu.cn/" }, "\u6D59\u6C5F\u5927\u5B66\u5E7F\u64AD\u7535\u89C6\u7F51"),
                    "|",
                    React.createElement("a", { href: "http://zy.zju.edu.cn/" }, "\u6D59\u5927\u641C\u7D22")),
                React.createElement("div", { className: "footerRow" },
                    "Copyright \u00A9 2003-2017 CC98 Network Association. Email: contact@cc98.org",
                    React.createElement("a", { href: "http://www.cc98.org/onlineshow.asp" }, " \u8BBA\u575B\u7EDF\u8BA1"))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var $ = __webpack_require__(5);
/**
 * 推荐阅读组件
 **/
var Recommended1 = /** @class */ (function (_super) {
    __extends(Recommended1, _super);
    function Recommended1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Recommended1.prototype.render = function () {
        $(document).ready(function () {
            var button = $('.recommended1Button');
            var content = $('.recommended1Content');
            var randomNum = Math.floor(Math.random() * 5); //生成0-4的随机数
            content.eq(randomNum).css('display', 'flex');
            button.eq(randomNum).css('background-color', 'rgb(53,177,255)');
            button.mouseover(function () {
                var index = $(this).index(); //获取当前元素下标
                content.css('display', 'none');
                content.eq(index).css('display', 'flex');
                button.css('background-color', 'rgb(255,255,255)');
                button.eq(index).css('background-color', 'rgb(53,177,255)');
            });
        });
        return React.createElement("div", { className: "recommended1" },
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98981"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89811"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98982"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89812"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98983"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89813"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98984"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89814"))),
                React.createElement("div", { className: "recommended1Content" },
                    React.createElement("div", { className: "recommended1Img" },
                        React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "recommended1Title" }, "\u63A8\u8350\u9605\u8BFB\u6807\u98985"),
                        React.createElement("div", { className: "recommended1Abstract" }, "\u63A8\u8350\u9605\u8BFB\u6458\u89815")))),
            React.createElement("div", { className: "buttonRow" },
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" }),
                React.createElement("div", { className: "recommended1Button" })));
    };
    return Recommended1;
}(React.Component));
exports.Recommended1 = Recommended1;
/**
 * 首页话题类
 * 用于首页左侧的几个信息栏，该类的对象（一条主题)需要标题，id，所在版面，及所在版面id等几个属性
 **/
var MainPageTopic = /** @class */ (function () {
    //构造方法
    function MainPageTopic(title, id, boardName, boardid) {
        this.title = title;
        this.id = id;
        this.boardName = boardName;
        this.boardid = boardid;
    }
    return MainPageTopic;
}());
exports.MainPageTopic = MainPageTopic;
/**
 * 热门话题组件
 **/
var HotTopicComponent = /** @class */ (function (_super) {
    __extends(HotTopicComponent, _super);
    function HotTopicComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mainPageTopicState: new Array(),
        };
        return _this;
    }
    HotTopicComponent.prototype.getTopicInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainPageTopics, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainPageTopics = [];
                        return [4 /*yield*/, fetch('http://api.cc98.org/Topic/Hot')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 10; i++) {
                            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].boardName, data[i].id, data[i].boardId);
                        }
                        return [2 /*return*/, mainPageTopics];
                }
            });
        });
    };
    HotTopicComponent.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopicInfo()];
                    case 1:
                        x = _a.sent();
                        this.setState({
                            mainPageTopicState: x,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HotTopicComponent.prototype.convertMainPageTopic = function (item) {
        var boardUrl = "/list/" + item.boardid;
        var topicUrl = "/topic/" + item.id;
        return React.createElement("div", { className: "listRow" },
            React.createElement("div", { className: "boardName" },
                " ",
                React.createElement("a", { href: boardUrl },
                    "[",
                    item.boardName,
                    "]")),
            React.createElement("div", { className: "topicTitle" },
                React.createElement("a", { href: topicUrl }, item.title)));
    };
    HotTopicComponent.prototype.render = function () {
        return React.createElement("div", null, this.state.mainPageTopicState.map(this.convertMainPageTopic));
    };
    return HotTopicComponent;
}(React.Component));
exports.HotTopicComponent = HotTopicComponent;
/**
 * 实习兼职组件，注意组件类名开头需大写!
 **/
var Shixijianzhi = /** @class */ (function (_super) {
    __extends(Shixijianzhi, _super);
    function Shixijianzhi(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mainPageTopicState: new Array(),
        };
        return _this;
    }
    Shixijianzhi.prototype.getTopicInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainPageTopics, url, response, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainPageTopics = [];
                        url = 'http://api.cc98.org/Topic/Board/459';
                        return [4 /*yield*/, fetch(url, { headers: { Range: 'bytes=0-9' } })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        for (i = 0; i < 10; i++) {
                            mainPageTopics[i] = new MainPageTopic(data[i].title, data[i].boardName, data[i].id, data[i].boardId);
                        }
                        return [2 /*return*/, mainPageTopics];
                }
            });
        });
    };
    Shixijianzhi.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopicInfo()];
                    case 1:
                        x = _a.sent();
                        this.setState({
                            mainPageTopicState: x,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Shixijianzhi.prototype.convertMainPageTopic = function (item) {
        var topicUrl = "/topic/" + item.id;
        return React.createElement("div", { className: "listRow" },
            React.createElement("div", { className: "topicTitle" },
                React.createElement("a", { href: topicUrl }, item.title)));
    };
    Shixijianzhi.prototype.render = function () {
        return React.createElement("div", null, this.state.mainPageTopicState.map(this.convertMainPageTopic));
    };
    return Shixijianzhi;
}(React.Component));
exports.Shixijianzhi = Shixijianzhi;
/**
 * 网站的主页面对象。
 */
var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainPage.prototype.render = function () {
        return React.createElement("div", { className: "mainPage" },
            React.createElement("div", { className: "leftPart" },
                React.createElement("div", { className: "announcement" },
                    React.createElement("div", { className: "blueBar1" },
                        React.createElement("div", { className: "listName" }, "\u8BBA\u575B\u516C\u544A")),
                    React.createElement("div", { className: "announcementContent" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "announcementDate" }, "[2017.08.17]"),
                            React.createElement("div", { className: "announcementText" }, "\u516C\u544A1"),
                            React.createElement("div", { className: "announcementLink1" }, "\u2605\u8BE6\u60C5\u70B9\u51FB\u2605")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "announcementDate" }, "[2017.08.17]"),
                            React.createElement("div", { className: "announcementText" }, "\u516C\u544A2"),
                            React.createElement("div", { className: "announcementLink1" }, "\u2605\u8BE6\u60C5\u70B9\u51FB\u2605")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "announcementDate" }, "[2017.08.17]"),
                            React.createElement("div", { className: "announcementText" }, "\u516C\u544A3"),
                            React.createElement("div", { className: "announcementLink1" }, "\u2605\u8BE6\u60C5\u70B9\u51FB\u2605")),
                        React.createElement("div", { className: "row" }))),
                React.createElement(Recommended1, null),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u70ED\u95E8\u8BDD\u9898"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement(HotTopicComponent, null))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6821\u56ED\u6D3B\u52A8"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u2605-----------------------------\u2605")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u9996\u9875\u9664\u4E86\u5341\u5927\u4E4B\u5916\u7684\u90E8\u5206\u8FD8\u6CA1\u65BD\u5DE5\u597D\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5176\u4ED6\u90E8\u5206\u7684\u5185\u5BB9\u90FD\u662F\u4E71\u586B\u54D2")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5982\u679C\u524D\u8F88\u4F60\u770B\u4E0D\u5230\u5341\u5927\u7684\u5185\u5BB9")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u90A3\u4E48\u53EF\u80FD\u662F\u4F60\u5FD8\u4E86\u6302RVPN\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u2605-----------------------------\u2605")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u9996\u9875\u9664\u4E86\u5341\u5927\u4E4B\u5916\u7684\u90E8\u5206\u8FD8\u6CA1\u65BD\u5DE5\u597D\u54E6")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5176\u4ED6\u90E8\u5206\u7684\u5185\u5BB9\u90FD\u662F\u4E71\u586B\u54D2")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u5982\u679C\u524D\u8F88\u4F60\u770B\u4E0D\u5230\u5341\u5927\u7684\u5185\u5BB9")),
                            React.createElement("div", { className: "row" },
                                " ",
                                React.createElement("div", { className: "boardName" }, "[\u63D0\u793A]"),
                                React.createElement("div", { className: "topicTitle" }, "\u90A3\u4E48\u53EF\u80FD\u662F\u4F60\u5FD8\u4E86\u6302RVPN\u54E6"))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5B66\u672F\u4FE1\u606F"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A"))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6700\u70ED\u56DE\u590D"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6700\u65B0\u52A8\u6001"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A"))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u6C42\u804C\u5E7F\u573A"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "list1" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5B9E\u4E60\u517C\u804C"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A")),
                        React.createElement("div", { className: "listContent1" },
                            React.createElement(Shixijianzhi, null))),
                    React.createElement("div", { className: "list2" },
                        React.createElement("div", { className: "blueBar2" },
                            React.createElement("div", { className: "listName" }, "\u5931\u7269\u62DB\u9886"),
                            React.createElement("div", { className: "more" }, "\u66F4\u591A"))))),
            React.createElement("div", { className: "rightPart" },
                React.createElement("div", { className: "recommended2" },
                    React.createElement("div", { className: "dashedBorder" },
                        React.createElement("div", { className: "heading" }, "\u63A8\u8350")),
                    React.createElement("div", { className: "column" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u5E7F\u64AD\u53F0\u70B9\u6B4C\u901A\u9053")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "CC98\u62BD\u5361\u6E38\u620F")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "CC98 share")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u63A8\u8350\u9605\u8BFB\u6295\u7A3F")),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "recommended2Img" },
                                React.createElement("img", { src: "/images/recommended2Img.jpg" })),
                            React.createElement("div", { className: "recommended2Title" }, "\u793E\u56E2\u53CA\u5B66\u751F\u7EC4\u7EC7\u7528\u6237\u8BA4\u8BC1\u7533\u8BF7")))),
                React.createElement("div", { className: "ad" },
                    React.createElement("img", { src: "/images/ad.jpg" })),
                React.createElement("div", { className: "news" },
                    React.createElement("div", { className: "dashedBorder" },
                        React.createElement("div", { className: "heading" }, "\u6821\u56ED\u65B0\u95FB")),
                    React.createElement("div", { className: "newsContent" },
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"),
                        React.createElement("div", { className: "newsText" }, "\u6821\u8BBA\u575BCC98\u5012\u95ED\u5566"))),
                React.createElement("div", { className: "boardRecommended" },
                    React.createElement("div", { className: "heading" }, "\u7248\u9762\u63A8\u8350"),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }),
                    React.createElement("div", { className: "blueBackdrop" }))));
    };
    return MainPage;
}(React.Component));
exports.MainPage = MainPage;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserNavigation_1 = __webpack_require__(75);
var UserRouter_1 = __webpack_require__(76);
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.render = function () {
        return (React.createElement("div", { className: "user-center" },
            React.createElement("div", { className: "user-center-head" },
                React.createElement("p", null, "\u7528\u6237\u8BE6\u60C5")),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: "user-center-body" },
                    React.createElement(UserNavigation_1.UserNavigation, null),
                    React.createElement(UserRouter_1.UserRouter, null)))));
    };
    return User;
}(React.Component));
exports.User = User;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

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
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserNavigation = /** @class */ (function (_super) {
    __extends(UserNavigation, _super);
    function UserNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserNavigation.prototype.handleScroll = function (e) {
        var navigation = document.getElementById('userCenterNavigation');
        if (window.pageYOffset > 234 && navigation.style.position !== 'fixed') {
            navigation.style.position = 'fixed';
        }
        if (window.pageYOffset < 234 && navigation.style.position && navigation.style.position !== 'inherit') {
            navigation.style.position = 'inherit';
        }
    };
    UserNavigation.prototype.componentDidMount = function () {
        document.addEventListener('scroll', this.handleScroll);
    };
    UserNavigation.prototype.componentWillUnmount = function () {
        document.removeEventListener('scroll', this.handleScroll);
    };
    UserNavigation.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-navigation", id: "userCenterNavigation" },
            React.createElement("ul", null,
                React.createElement(CustomLink, { to: "" + location.pathname, label: "主页", activeOnlyWhenExact: true, myClassName: "fa-home" }))));
    };
    return UserNavigation;
}(React.Component));
exports.UserNavigation = UserNavigation;
var CustomLink = function (_a) {
    var label = _a.label, to = _a.to, _b = _a.activeOnlyWhenExact, activeOnlyWhenExact = _b === void 0 ? false : _b, myClassName = _a.myClassName;
    return (React.createElement(react_router_dom_1.Route, { path: to, exact: activeOnlyWhenExact, children: function (_a) {
            var match = _a.match;
            return (React.createElement("li", { className: match ? "user-center-navigation-active" : "" },
                React.createElement(react_router_dom_1.Link, { className: "" + myClassName, to: to },
                    React.createElement("p", null, label))));
        } }));
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var react_router_dom_1 = __webpack_require__(2);
var UserCenterExactProfile_1 = __webpack_require__(10);
var UserCenterExactActivities_1 = __webpack_require__(11);
var UserCenterExactAvatar_1 = __webpack_require__(12);
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRouter.prototype.render = function () {
        return (React.createElement("div", { className: "user-center-router" },
            React.createElement(react_router_dom_1.Route, { path: "/user/", component: UserExact })));
    };
    return UserRouter;
}(React.Component));
exports.UserRouter = UserRouter;
var UserExact = /** @class */ (function (_super) {
    __extends(UserExact, _super);
    function UserExact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserExact.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!location.pathname.split('/')[2]) {
                            return [2 /*return*/, 0];
                        }
                        if (!(location.pathname.split('/')[2] === 'name')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch("https://api.cc98.org/User/Name/" + location.pathname.split('/')[3])];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetch("https://api.cc98.org/User/" + location.pathname.split('/')[2])];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        data = _a.sent();
                        this.setState({
                            userInfo: data,
                            userAvatarImgURL: data.portraitUrl,
                            responseState: response.status
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserExact.prototype.render = function () {
        var element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (React.createElement("div", { className: "user-center-exact" },
                React.createElement(UserCenterExactAvatar_1.UserCenterExactAvatar, { userAvatarImgURL: this.state.userAvatarImgURL }),
                React.createElement(UserCenterExactProfile_1.UserCenterExactProfile, { userInfo: this.state.userInfo }),
                React.createElement(UserCenterExactActivities_1.UserCenterExactActivities, null)));
        }
        else {
            element = React.createElement("p", null, "\u52A0\u8F7D\u4E2D");
        }
        return element;
    };
    return UserExact;
}(React.Component));


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: '',
            isLogining: false
        };
        _this.handleNameChange = _this.handleNameChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleLogin = _this.handleLogin.bind(_this);
        return _this;
    }
    Login.prototype.shake = function (element) {
        element.classList.add('shake');
        setTimeout(function () { element.classList.remove('shake'); }, 500);
        return element;
    };
    Login.prototype.handleNameChange = function (e) {
        this.setState({
            loginName: e.target.value
        });
    };
    Login.prototype.handlePasswordChange = function (e) {
        this.setState({
            loginPassword: e.target.value
        });
    };
    Login.prototype.handleLogin = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.preventDefault();
                //如果在登陆中则无视提交
                if (this.state.isLogining) {
                    return [2 /*return*/, false];
                }
                if (!(this.state.loginName || this.state.loginPassword)) {
                    this.setState({
                        loginMessage: '请输入用户名和密码'
                    });
                    this.shake(document.getElementById('loginName')).focus();
                    this.shake(document.getElementById('loginPassword'));
                    return [2 /*return*/, false];
                }
                else if (!this.state.loginName) {
                    this.setState({
                        loginMessage: '请输入用户名'
                    });
                    this.shake(document.getElementById('loginName')).focus();
                    return [2 /*return*/, false];
                }
                else if (!this.state.loginPassword) {
                    this.setState({
                        loginMessage: '请输入密码'
                    });
                    this.shake(document.getElementById('loginPassword')).focus();
                    return [2 /*return*/, false];
                }
                else {
                    this.setState({
                        loginMessage: '登陆中',
                        isLogining: true
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Login.prototype.render = function () {
        return (React.createElement("div", { className: "login" },
            React.createElement("div", null,
                React.createElement("img", { src: "/images/login.png" }),
                React.createElement("div", null,
                    React.createElement("img", { src: "/images/login_welcome.png" }),
                    React.createElement("form", { onSubmit: this.handleLogin },
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u7528\u6237\u540D"),
                            React.createElement("input", { type: "text", id: "loginName", onChange: this.handleNameChange, value: this.state.loginName })),
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u5BC6\u7801"),
                            React.createElement("input", { type: "password", id: "loginPassword", onChange: this.handlePasswordChange })),
                        React.createElement("p", { id: "loginMessage" }, this.state.loginMessage),
                        React.createElement("button", { type: "submit", disabled: this.state.isLogining }, "\u767B\u9646\u8D26\u53F7")),
                    React.createElement("p", null,
                        React.createElement("span", null,
                            "\u8FD8\u6CA1\u8D26\u53F7\uFF1F\u6211\u8981 ",
                            React.createElement("a", { href: "" }, "\u6CE8\u518C")))))));
    };
    return Login;
}(React.Component));
exports.Login = Login;
/**
 * 登陆页状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Utility = __webpack_require__(4);
var $ = __webpack_require__(5);
var LoginTest = /** @class */ (function (_super) {
    __extends(LoginTest, _super);
    function LoginTest(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loginName: '',
            loginPassword: '',
            loginMessage: ''
        };
        _this.handleNameChange = _this.handleNameChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleLogin = _this.handleLogin.bind(_this);
        return _this;
    }
    LoginTest.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, requestBody, response, data, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'http://openid.cc98.org/connect/token';
                        requestBody = {
                            'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
                            'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
                            'grant_type': 'password',
                            'username': this.state.loginName,
                            'password': this.state.loginPassword
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: $.param(requestBody)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        token = "Bearer " + data.access_token;
                        console.log(token);
                        Utility.setLocalStorage("accessToken", token);
                        Utility.setLocalStorage("userName", this.state.loginName);
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginTest.prototype.catch = function (e) {
        alert(e.error); //这行好像没什么用……暂时还不会处理不同的error……
        console.log("Oops, error", e);
    };
    LoginTest.prototype.shake = function (element) {
        element.classList.add('shake');
        setTimeout(function () { element.classList.remove('shake'); }, 500);
        return element;
    };
    LoginTest.prototype.handleNameChange = function (e) {
        this.setState({
            loginName: e.target.value
        });
    };
    LoginTest.prototype.handlePasswordChange = function (e) {
        this.setState({
            loginPassword: e.target.value
        });
    };
    LoginTest.prototype.handleLogin = function (e) {
        e.preventDefault();
        if (!(this.state.loginName || this.state.loginPassword)) {
            this.setState({
                loginMessage: '请输入用户名和密码'
            });
            this.shake(document.getElementById('loginName')).focus();
            this.shake(document.getElementById('loginPassword'));
            return false;
        }
        else if (!this.state.loginName) {
            this.setState({
                loginMessage: '请输入用户名'
            });
            this.shake(document.getElementById('loginName')).focus();
            return false;
        }
        else if (!this.state.loginPassword) {
            this.setState({
                loginMessage: '请输入密码'
            });
            this.shake(document.getElementById('loginPassword')).focus();
            return false;
        }
        else {
            this.setState({
                loginMessage: '登陆中'
            });
        }
    };
    LoginTest.prototype.render = function () {
        return (React.createElement("div", { className: "login" },
            React.createElement("div", null,
                React.createElement("img", { src: "/images/login.png" }),
                React.createElement("div", null,
                    React.createElement("img", { src: "/images/login_welcome.png" }),
                    React.createElement("form", { onSubmit: this.handleLogin },
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u7528\u6237\u540D"),
                            React.createElement("input", { type: "text", id: "loginName", onChange: this.handleNameChange, value: this.state.loginName })),
                        React.createElement("div", { className: "login-form" },
                            React.createElement("p", null, "\u5BC6\u7801"),
                            React.createElement("input", { type: "password", id: "loginPassword", onChange: this.handlePasswordChange })),
                        React.createElement("p", { id: "loginMessage" }, this.state.loginMessage),
                        React.createElement("button", { type: "submit", onClick: this.login.bind(this) }, "\u767B\u9646\u8D26\u53F7")),
                    React.createElement("p", null,
                        React.createElement("span", null,
                            "\u8FD8\u6CA1\u8D26\u53F7\uFF1F\u6211\u8981 ",
                            React.createElement("a", { href: "" }, "\u6CE8\u518C")))))));
    };
    return LoginTest;
}(React.Component));
exports.LoginTest = LoginTest;
/**
 * 登陆页状态
 */
var LoginState = /** @class */ (function () {
    function LoginState() {
    }
    return LoginState;
}());


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);