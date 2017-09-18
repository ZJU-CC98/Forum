// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { ReactNode } from 'react';

// 重新导出 ReactNode
export { ReactNode } from 'react';

/**
 * 提供 UBB 处理上下文所需要的相关数据。
 */
export class UbbCodeContextData {

}

/**
 * 处理 UBB 编码时可用于存储相关信息的上下文对象。
 */
export class UbbCodeContext {

	/**
	 * 关联到本次处理上下文的处理引擎对象。
	 */
	private _engine: UbbCodeEngine;

	/**
	 * 获取关联到本次处理上下文的处理引擎对象。
	 * @returns {UbbCodeEngine} 关联到本次处理上下文的处理引擎对象。
	 */
	get engine(): UbbCodeEngine {
		return this._engine;
	}

	/**
	 * 处理 UBB 需要注意的选项。
	 */
	private _options: UbbCodeOptions;

	/**
	 * 获取处理 UBB 需要注意的选项。
	 * @returns {UbbCodeOptions} 处理 UBB 需要注意的选项。
	 */
	get options(): UbbCodeOptions {
		return this._options;
	}

	/**
	 * 初始化一个上下文对象的新实例。
	 * @param engine 引擎对象。
	 * @param options 处理选项。
	 */
	constructor(engine: UbbCodeEngine, options: UbbCodeOptions) {
		this._engine = engine;
		this._options = options;
	}

	/**
	 * 获取上下文相关的数据。
	 * @returns {UbbCodeContextData} 上下文相关的数据。
	 */
	get data(): UbbCodeContextData {
		return this._engine.data;
	}

}

/**
 * 控制 UBB 编码的选项。在 UBB 编码过程中，需要考虑这些选项。
 */
export class UbbCodeOptions {

	/**
	 * 是否自动检测 URL 并添加链接效果。
	 */
	autoDetectUrl = true;
	/**
	 * 是否允许外部链接。
	 */
	allowExternalUrl = true;
	/**
	 * 是否允许显示图像。
	 */
	allowImage = true;
	/**
	 * 是否允许多媒体资源，如视频，音频，Flash 等。
	 */
	allowMediaContent = true;
	/**
	 * 是否允许自动播放多媒体资源。
	 */
	allowAutoPlay = true;
	/**
	 * UBB 处理中的兼容性控制选项。
	 */
	compatibility = UbbCompatiblityMode.Recommended;
}

/**
 * 定义 UBB 呈现时使用的兼容性模式。
 */
export enum UbbCompatiblityMode {
	/**
	 * 使用最低级别兼容性，尽可能保持 UBB 代码的原始含义，即使可能会带来显示效果问题。
	 */
	Transitional,
	/**
	 * 如果能在不改变语义的情况下使用较新的呈现技术，则使用新技术；如果不能保证语义一致则不进行更改。
	 */
	Recommended,
	/**
	 * 强制使用对现代浏览器更友好的新技术呈现，即使可能在一定程度上改变语义。
	 */
	EnforceMorden
}

/**
		 * 定义符号的类型。
		 */
enum TokenType {
	/**
	 * 一串文本。
	 */
	String,
	/**
	 * 项目之间的分隔符。
	 */
	ItemSeperator,
	/**
	 * 单个项目内名称和值的分隔符。
	 */
	NameValueSeperator
}

/**
 * 表示一个符号。
 */
class Token {
	/**
	 * 获取或设置符号的类型。
	 */
	type: TokenType;
	/**
	 * 获取或设置符号的值。
	 */
	value: string;

	/**
	 * 初始化一个符号对象的新实例。
	 * @param type 符号的类型。
	 * @param value 符号的值。
	 */
	constructor(type: TokenType, value: string) {
		this.type = type;
		this.value = value;
	}

	/**
	 * 获取表示项目分隔符的符号。
	 */
	static itemSeperator = new Token(TokenType.ItemSeperator, null);
	/**
	 * 获取表示值分隔符的符号。
	 */
	static nameValueSeperator = new Token(TokenType.NameValueSeperator, null);

	/**
	 * 创建一个表示一串文本的符号。
	 * @param value 文本的值内容。
	 */
	static stringValue(value: string) {
		return new Token(TokenType.String, value);
	}
}

/**
 * 定义 UBB 片段的类型。
 */
enum UbbSegmentType {
	/**
	 * 纯文字片段。
	 */
	Text,
	/**
	 * 标签片段。
	 */
	Tag
}

/**
 * 表示 UBB 内容的一个片段。
 */
abstract class UbbSegment {
	/**
	 * 获取该 UBB 片段的类型。
	 * @returns {UbbSegmentType} 该 UBB 片段的类型。
	 */
	abstract get type(): UbbSegmentType;

	/**
	 * 该对象的上级片段。
	 */
	private _parent: UbbTagSegment;

	/**
	 * 获取该对象的上级片段。
	 * @returns {UbbSegment} 该对象的上级片段。
	 */
	get parent(): UbbTagSegment { return this._parent };

	/**
	 * 初始化一个 UBB 片段的新实例。
	 * @param parent 新片段的上级。
	 */
	constructor(parent: UbbTagSegment) {
		this._parent = parent;
	}

	/**
	 * 复制一个节点并更换新上级。
	 * @param newParent 新的上级。
	 */
	abstract clone(newParent: UbbTagSegment): UbbSegment;
}

/**
 * 表示 UBB 的文字片段。
 */
class UbbTextSegment extends UbbSegment {
	get type(): UbbSegmentType { return UbbSegmentType.Text };

	/**
	 * 片段中包含的文字。
	 */
	private _text: string;

	/**
	 * 获取片段中包含的文字。
	 * @returns {string} 片段中包含的文字。
	 */
	get text() { return this._text };

	/**
	 * 创建一个新的 UbbTextSegment 对象。
	 * @param text 新片段包含的文字。
	 */
	constructor(text: string, parent: UbbTagSegment) {
		super(parent);
		this._text = text;
	}

	clone(newParent: UbbTagSegment): UbbSegment {
		return new UbbTextSegment(this._text, newParent);
	}
}

/**
 * 表示 UBB 的标签片段。
 */
class UbbTagSegment extends UbbSegment {

	get type(): UbbSegmentType { return UbbSegmentType.Tag; }

	/**
	 * 标签片段是否关闭。
	 */
	private _isClosed = false;

	/**
	 * 获取一个值，指示标签是否关闭。
	 * @returns {boolean} 
	 */
	get isClosed() { return this._isClosed };

	/**
	 * 标签的数据类型。
	 */
	private _tagData: UbbTagData;
	/**
	 * 标签中包含的子标签数据。
	 */
	private _subSegments: UbbSegment[] = [];
	/**
	 * 标签中包含的子标签。
	 */
	private _content: string;


	get tagData(): UbbTagData { return this._tagData };
	get subSegments(): UbbSegment[] { return this._subSegments; };

	constructor(tagData: UbbTagData, parent: UbbTagSegment) {
		super(parent);
		this._tagData = tagData;
	}

	/**
	 * 强制关闭一个标签，并将标签挂接到新的上级标签。
	 * @param segment 要关闭的标签。
	 * @param newParent 新的上级标签。
	 * @returns {UbbSegment[]} 产生的新的标签的集合。
	 */
	private static forceClose(segment: UbbSegment, newParent: UbbTagSegment): void {

		// 文字标签无需关闭
		if (segment.type === UbbSegmentType.Text) {
			newParent._subSegments.push(segment.clone(newParent));
		} else {
			// 已经关闭的标签也无需关闭
			const seg = segment as UbbTagSegment;
			if (seg.isClosed) {
				newParent._subSegments.push(segment.clone(newParent));
			} else {

				console.warn('标签 %s 没有正确关闭，已经被转换为纯文字。', seg.tagData.tagName);

				// 未关闭标签，自己将被转换为纯文字
				newParent._subSegments.push(new UbbTextSegment(`[${seg._tagData.orignalString}]`, segment.parent));

				// 自己的下级将被递归强制关闭，并提升为和自己同级
				for (const sub of seg._subSegments) {
					UbbTagSegment.forceClose(sub, newParent);
				}
			}
		}

	}

	/**
	 * 关闭该标签，并强制处理所有未关闭的下级标签。
	 */
	close() {

		// 复制自己的下级并清空数组。
		const subs = this._subSegments;
		this._subSegments = [];
		for (const item of subs) {
			UbbTagSegment.forceClose(item, this);
		}

		// 设置关闭状态
		this._isClosed = true;
	}

	clone(newParent: UbbTagSegment): UbbSegment {

		const result = new UbbTagSegment(this._tagData, newParent);

		result._content = this._content;
		result._isClosed = this._isClosed;

		for (const item of this._subSegments) {
			result._subSegments.push(item.clone(result));
		}

		return result;
	}

	/**
	 * 获取标签的内部内容，不包括标签自身。
	 */
	getContentText() {

		const subContents: string[] = [];

		for (const subItem of this._subSegments) {
			if (subItem.type === UbbSegmentType.Text) {
				subContents.push((subItem as UbbTextSegment).text);
			} else {
				subContents.push((subItem as UbbTagSegment).getFullText());
			}
		}
		return subContents.join('');
	}

	/**
	 * 获取标签的全部文字内容。
	 */
	getFullText(): string {
		return `[${this._tagData.orignalString}]${this.getContentText()}[/${this._tagData.tagName}]`;
	}
}

/**
 * 定义 UBB 标签中包含的数据。
 */
export class UbbTagData {

	/**
	 * 标签包含的所有原始文字。
	 */
	private _originalString: string;

	/**
	 * 获取标签包含的原始文字。
	 * @returns {string} 标签包含的原始文字。
	 */
	get orignalString() { return this._originalString };

	constructor(orignalString: string, parameters: UbbTagParameter[]) {

		if (!parameters) {
			throw new Error('参数不能为空。');
		}

		this._originalString = orignalString;
		this._parameters = parameters;

		// 填充命名参数
		this._namedParameters = {};
		for (let item of parameters) {
			if (item.name) {
				this._namedParameters[item.name] = item.value;
			}
		}
	}

	static parse(tagString: string): UbbTagData {

		// 空字符串处理
		if (!tagString) {
			return null;
		}

		const tokens = getAllTokens(tagString);

		// 无法分割标签
		if (tokens.length === 0) {
			return null;
		}


		const result = convertTokens(tokens);
		return new UbbTagData(tagString, result);

		/**
		 * 提取字符串中的所有符号。
		 */
		function getAllTokens(tokenString): Token[] {

			let index = 0;

			/**
			 * 从字符串中扫描获得下一个完整的语义符号。
			 * @returns {string} 下一个完整的语义符号。
			 */
			function scanToken(lastTokenType: TokenType): Token {

				/**
				 * 从当前位置开始扫描字符串，直到找到对应的结束字符。
				 * @returns {string} 从当前位置开始到相同字符结束的字符串。
				 */
				function scanQuoted() {

					// 开始字符串。
					const quoteMark = tokenString[index];
					let endMarkLocation = tokenString.indexOf('"', index + 1);

					// 找不到结束符号
					if (endMarkLocation < 0) {
						console.error('UBB: 解析标签字符串 %s 时无法找到位置 %d 处 %s 对应的结束字符串。', tokenString, index, quoteMark);
						endMarkLocation = tokenString.length;
					}

					const start = index + 1;
					index = endMarkLocation + 1;
					return tokenString.substring(start, endMarkLocation);
				}

				while (true) {

					// 超过范围。
					if (index >= tokenString.length) {
						return null;
					}

					const c = tokenString[index];

					if (/\s/i.test(c)) { // 空白字符，直接忽略
						index++;
						continue;
					}
					else if (c === ',') { // 项目分隔符
						index++;
						return Token.itemSeperator;
					} else if (c === '=') { // 名称值分隔符
						index++;
						return Token.nameValueSeperator;
					} else if (c === '"' || c === '\'') { // 引号开始，找到结束为止
						return Token.stringValue(scanQuoted());
					} else {

						const start = index;

						// 根据最后一个标记的类型，本次标记的终止符会有所变化
						const matchExp = lastTokenType === TokenType.ItemSeperator ? /[=,]/i : /,/i;

						// 寻找下个分隔符
						const nextSeperator = tokenString.substring(index + 1).match(matchExp);

						if (nextSeperator) {

							// 结束位置
							const endMarkLocation = nextSeperator.index + index + 1;
							index = endMarkLocation;
							return Token.stringValue(tokenString.substring(start, endMarkLocation));

						} else { // 找不到下一个符号，说明这是最后一个符号

							index = tokenString.length;
							return Token.stringValue(tokenString.substring(start));
						}
					}
				}
			}


			const allTokens: Token[] = [];
			let lastTokenType = TokenType.ItemSeperator;

			while (true) {
				const newToken = scanToken(lastTokenType);
				if (newToken) {
					allTokens.push(newToken);
					lastTokenType = newToken.type;
				} else {
					break;
				}
			}

			return allTokens;
		}

		/**
		 * 将令牌转换为参数集合。
		 * @param tokens 要转换的令牌的数组。
		 */
		function convertTokens(tokens: Token[]) {

			const parameters: UbbTagParameter[] = [];

			if (!tokens || tokens.length === 0) {
				console.error('UBB: 无法将标签字符串 %s 解析为参数的集合。', tagString);
				return parameters;
			}

			let lastName: string = null;
			let lastValue: string = null;

			let lastTokenType = TokenType.ItemSeperator;

			for (let token of tokens) {
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
	}

	/**
	 * 保存 UBB 所有参数数据的内部数组。
	 */
	private _parameters: UbbTagParameter[];

	/**
	 * 保存所有命名参数的内部数据。
	 */
	private _namedParameters: {
		[name: string]: string
	};

	/**
	 * 获取标签的名称。
	 * @returns {string} 标签的名称。
	 */
	get tagName() {
		return this._parameters[0].name;
	}

	/**
	 * 获取标签的主要值，也即紧跟在标签名称和等号后的值。
	 * @returns {string} 标签的主要值。 
	 */
	get mainValue() {
		return this._parameters[0].value;
	}

	/**
	 * 获取给定参数的值。
	 * @param indexOrName 要获取的参数的索引或者名称。
	 * @returns {string} 给定位置参数的值。
	 */
	value(indexOrName: number | string): string {

		if (typeof indexOrName === 'number') {
			return this._parameters[indexOrName].value;
		} else if (typeof indexOrName === 'string') {
			return this._namedParameters[indexOrName];
		} else {
			throw new Error('参数必须是字符串或者数字。');
		}
	}

	/**
	 * 获取给定参数的名称。
	 * @param index 要获取的参数的索引。
	 * @returns {string} 给定位置参数的名称。
	 */
	name(index: number) {
		return this._parameters[index].name;
	}

	/**
	 * 获取给定的参数。
	 * @param index 要获取的参数的索引。
	 * @returns {UbbTagParameter} 给定位置的参数。
	 */
	parameter(index: number) {
		return this._parameters[index];
	}
}

/**
 * 表示 UBB 标签中单个参数的内容。
 */
class UbbTagParameter {

	/**
	 * 初始化一个对象的新实例。
	 * @param name 新参数的名称。
	 * @param value 新参数的值。
	 */
	constructor(name: string, value: string) {
		this._name = name;
		this._value = value;
	}

	/**
	 * 参数的名称。
	 */
	private _name: string;
	/**
	 * 参数的值。
	 */
	private _value: string;

	/**
	 * 获取参数的名称。如果参数没有名称，则该属性为 null。
	 */
	get name() {
		return this._name;
	}
	/**
	 * 获取参数的值。如果该参数没有值，则该属性为 null。
	 */
	get value() {
		return this._value;
	}
}

/**
 * 定义 UBB 处理程序的基类。
 */
export abstract class UbbTagHandler {

	/**
	 * 获取该处理程序处理的标签的名称。
	 * @returns {string} 该处理程序能处理的标签的名称。 
	 */
	abstract get tagName(): string;

	/**
	 * 调用该处理程序处理给定的 UBB 内容。
	 * @param tagSegment UBB 标签相关内容。
	 * @param context UBB 处理上下文。
	 */
	abstract exec(tagSegment: UbbTagSegment, context: UbbCodeContext): ReactNode;

	/**
	 * 在解析完成处理标签内部的内容后，将标签本身作为文本处理。
	 * @param tagData 标签相关的数据。
	 * @param content 标签的内容。
	 */
	protected static renderTagAsString(tagData: UbbTagData, content: ReactNode): ReactNode {
		return [
			`[${tagData.orignalString}]`,
			content,
			`[/${tagData.tagName}]`
		];
	}
}

/**
 * 定义基于文字的 UBB 标签处理程序的基类。
 */
export abstract class TextTagHandler extends UbbTagHandler {

	exec(tagSegment: UbbTagSegment, context: UbbCodeContext) {
		return this.execCore(tagSegment.getContentText(), tagSegment.tagData, context);
	}

	/**
	 * 递归处理的核心方法。
	 * @param innerContent 已经处理完毕的内部内容。
	 * @param RecursiveTagHandler 标签相关的数据。
	 * @param context 处理上下文对象。
	 */
	protected abstract execCore(innerContent: string, tagData: UbbTagData, context: UbbCodeContext): ReactNode;
}


/**
 * 定义递归处理内容的标签处理程序的基类。
 */
export abstract class RecursiveTagHandler extends UbbTagHandler {

	exec(tagSegment: UbbTagSegment, context: UbbCodeContext) {

		const result: ReactNode[] = [];

		for (const subSeg of tagSegment.subSegments) {
			result.push(context.engine.execSegment(subSeg, context));
		}

		return this.execCore(result, tagSegment.tagData, context);
	}

	/**
	 * 递归处理的核心方法。
	 * @param innerContent 已经处理完毕的内部内容。
	 * @param RecursiveTagHandler 标签相关的数据。
	 * @param context 处理上下文对象。
	 */
	protected abstract execCore(innerContent: ReactNode, tagData: UbbTagData, context: UbbCodeContext): ReactNode;
}

/**
 * 定义 UBB 处理程序列表。
 */
class UbbHandlerList {

	/**
	 * 内部的标签处理器列表。
	 */
	private _tagHandlerList: {
		[tagName: string]: UbbTagHandler;
	} = {};

	/**
	 * 获取给定标签名称的处理程序。
	 * @param tagName 标签名称。
	 * @returns {UbbTagHandler} 标签处理程序。
	 */
	getHandler(tagName: string): UbbTagHandler {
		return this._tagHandlerList[tagName] || null;
	}


	/**
	 * 注册解析器标签的核心函数。
	 * @param tagHandler 要注册的标签处理器。
	 */
	register(tagHandler: UbbTagHandler): void {

		if (!tagHandler || !tagHandler.tagName) {
			throw new Error('参数 tagHandler 无效，或者未提供正确的标签名称。');
		}

		// 检查是否已经注册
		if (tagHandler.tagName in this._tagHandlerList) {
			throw new Error(`标签 ${tagHandler.tagName} 已经被注册。`);
		}

		// 添加新项目
		this._tagHandlerList[tagHandler.tagName] = tagHandler;
	}

}

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
export class UbbCodeEngine {

	/**
	 * 获取该引擎中注册的处理程序。
	 */
	private _tagHandlers = new UbbHandlerList();

	/**
	 * 该引擎中注册的处理程序。
	 */
	get tagHandlers() {
		return this._tagHandlers;
	}

	/**
	 * 引擎保存的上下文数据。
	 */
	private _data = new UbbCodeContextData();

	/**
	 * 获取引擎保存的上下文数据。
	 * @returns {UbbCodeContextData} 引擎保存的上下文数据。
	 */
	get data(): UbbCodeContextData {
		return this._data;
	};

	/**
	 * 获取给定标签名称的处理程序。
	 * @param tagName 给定的标签名称。
	 * @returns {UbbTagHandler} 给定标签名称的处理程序。
	 */
	getHandler(tagName: string): UbbTagHandler {
		return this._tagHandlers.getHandler(tagName);
	}

	/**
	 * 执行 UBB 解析的核心函数。
	 * @param content 要解析的内容。
	 * @param options 解析使用的相关选项。
	 * @returns {string} 解析后的 HTML 代码。
	 */
	exec(content: string, options: UbbCodeOptions): ReactNode {

		const context = new UbbCodeContext(this, options);
		return this.execCore(content, context);
	}

	/**
	 * 尝试找到关闭标记对应的开始标记，并关闭该标记。
	 * @param tagName 标记名称。
	 * @param parent 该标记的第一个上级。
	 * @returns {UbbTagSegment} 新的上级标签。
	 */
	private static tryHandleEndTag(tagName: string, parent: UbbTagSegment): UbbTagSegment {

		let p = parent;

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
		parent.subSegments.push(new UbbTextSegment(`[/${tagName}]`, parent));
		return parent;
	}

	/**
	 * 构建标签的核心方法。
	 * @param content 包含多个标签的字符串。
	 * @param parent 字符串的上级容器。
	 */
	private static buildSegmentsCore(content: string, parent: UbbTagSegment) {

		const regExp = /([\s\S]*?)\[(.*?)]/gi;

		while (true) {

			const startIndex = regExp.lastIndex;
			const tagMatch = regExp.exec(content);

			// 未找到标记，则这是最后一个标签。
			if (!tagMatch) {

				// 提取最后一段内容，如果找到，附加到最后
				const remainContent = content.substring(startIndex);

				if (remainContent) {
					parent.subSegments.push(new UbbTextSegment(remainContent, parent));
				}
				return;
			}
			const [, beforeText, tagString] = tagMatch;

			// 添加前面的文字。
			if (beforeText) {
				parent.subSegments.push(new UbbTextSegment(beforeText, parent));
			}

			// 检测是否是结束标记
			const endTagMatch = tagString.match(/^\/(.*)$/i);
			if (endTagMatch) {
				const endTagName = endTagMatch[1];
				parent = UbbCodeEngine.tryHandleEndTag(endTagName, parent);
			} else {
				try {

					// 提取新的标签数据
					const tagData = UbbTagData.parse(tagString);
					const newTag = new UbbTagSegment(tagData, parent);
					parent.subSegments.push(newTag);

					// 新上级
					parent = newTag;
					continue;

				} catch (error) {

					// 提取数据失败，则视为没有匹配
					console.warn('标签字符串 %s 解析失败，将被视为普通文字。', tagString);
					parent.subSegments.push(new UbbTextSegment(`[${tagString}]`, parent));
				}
			}
		}
	}

	/**
	 * 执行 UBB 处理的核心函数。
	 * @param content 要处理的内容。
	 * @param context UBB 处理上下文。
	 * @returns {JSX.Element} 处理完成的 HTML 内容。
	 */
	private execCore(content: string, context: UbbCodeContext): ReactNode {

		const root = new UbbTagSegment(null, null);
		UbbCodeEngine.buildSegmentsCore(content, root);

		const result: ReactNode[] = [];

		for (const item of root.subSegments) {
			result.push(this.execSegment(item, context));
		}

		return result;
	}

	execSegment(segment: UbbSegment, context: UbbCodeContext): ReactNode {

		if (segment.type === UbbSegmentType.Text) {
			return (segment as UbbTextSegment).text;
		} else {
			const tag = segment as UbbTagSegment;
			const handler = this.getHandler(tag.tagData.tagName);

			if (!handler) {
				console.warn('没有找到标签 %s 的处理程序，将被视为一般文字。');
				return tag.getFullText();
			}

			return handler.exec(tag, context);
		}
	}
}