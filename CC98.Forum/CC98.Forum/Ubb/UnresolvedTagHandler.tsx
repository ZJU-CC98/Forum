// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 为所有未解析的标签提供通用处理。
 */
export class UnresolvedTagHandler extends Ubb.RecursiveTagHandler {

	get supportedTagNames(): RegExp { return /.*/i; }

	execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		// 警告提示
		console.warn('检测到未处理的标签 %s，该标签将被当做一般文字。', tagData.tagName);

		return Ubb.UbbTagHandler.renderTagAsString(tagData, innerContent);
	}
}