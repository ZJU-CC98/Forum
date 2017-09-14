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
            function scanToken() {
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
                        // 寻找下个分隔符
                        var nextSeperator = tokenString.substring(index + 1).match(/[=,]/i);
                        if (nextSeperator) {
                            // 结束位置
                            var endMarkLocation = nextSeperator.index;
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
            while (true) {
                var newToken = scanToken();
                if (newToken) {
                    allTokens.push(newToken);
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
                console.warn('没有找到标签 %s 的处理程序，将被视为一般文字。');
                return tag.getFullText();
            }
            return handler.exec(tag, context);
        }
    };
    return UbbCodeEngine;
}());
exports.UbbCodeEngine = UbbCodeEngine;
//# sourceMappingURL=Core.js.map