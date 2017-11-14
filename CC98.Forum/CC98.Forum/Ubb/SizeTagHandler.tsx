// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [size] 标签的处理器。
 */
export class SizeTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): string {
        return 'size';
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        let size = parseInt(tagData.value('size'));
        if (isNaN(size) || size <= 0) {
            return innerContent;
        }

        size = size > 7 ? 3.5 : (size / 2);

        const style = {
            fontSize: `${size}rem`
        };

        return <span style={style}>{innerContent}</span>;
    }
}