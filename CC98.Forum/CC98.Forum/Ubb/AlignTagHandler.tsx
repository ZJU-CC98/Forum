// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [align] 标签的处理器。
 */
export class AlignTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'align' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const align = tagData.value('align');

        const style = {
            textAlign: align
        };

        return <span style={style}><div>{innerContent}</div></span>;
    }
}