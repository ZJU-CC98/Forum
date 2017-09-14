// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [b] 标签的处理器。
 */
export class BTagHandler extends Ubb.RecursiveTagHandler {
	get tagName(): string {
		return 'b';
	}

	execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		// HTML5 标准建议不再使用 b 标签
		if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
			return <strong>{innerContent}</strong>;
		} else {
			return <b>{innerContent}</b>;
		}
	}
}