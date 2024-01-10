// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [td] 标签的处理器。
 */
export class TdTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'td' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        let rowspanValue = 1;
        let colspanValue = 1;
        if (tagData.parameterCount === 2) {
            rowspanValue = parseInt(tagData.value(0));
            colspanValue = parseInt(tagData.value(1));
        }
        return <td rowSpan={rowspanValue} colSpan={colspanValue}>{innerContent}</td>;
    }
}