// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [left] 标签的处理器。
 */
export class LeftTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'left' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const style = {
            textAlign: 'left'
        };

        return <span style={style}><div>{innerContent}</div></span>;
    }
}