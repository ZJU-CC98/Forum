// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [del] 标签的处理器。
 */
export class DelTagHandler extends Ubb.RecursiveTagHandler {
	get tagName(): string {
		return 'del';
	}

	execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const style = {
            textDecoration: 'line-through'
        };

        return <span style={style}>{innerContent}</span>;
	}
}