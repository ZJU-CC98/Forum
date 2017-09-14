// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 提供对 [noubb] 标签的解析。
 */
export class NoUbbTagHandler extends Ubb.TextTagHandler {
	get tagName(): string { return 'noubb' };

	execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
		if (context.options.compatibility !== Ubb.UbbCompatiblityMode.Transitional) {
			return <code>{content}</code>;
		} else {
			return <span>{content}</span>;
		}
	}
} 