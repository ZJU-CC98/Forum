// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [th] 标签的处理器。
 */
export class ThTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'th' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        return <th>{innerContent}</th>;
    }
}