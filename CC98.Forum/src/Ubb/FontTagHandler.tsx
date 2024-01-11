// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [font] 标签的处理器。
 */
export class FontTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'font' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const font = tagData.value('font');

        const style = {
            fontFamily: font
        };

        return <span style={style}>{innerContent}</span>;
    }
}