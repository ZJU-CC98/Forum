// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [cursor] 标签的处理器。
 */
export class CursorTagHandler extends Ubb.RecursiveTagHandler {

	get supportedTagNames(): string { return 'cursor' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const cursor = tagData.value('cursor');

        const style = {
            cursor: cursor
        };
        
        return <span style={style}>{innerContent}</span>;
	}
}