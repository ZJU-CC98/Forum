﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [right] 标签的处理器。
 */
export class RightTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string { return 'right' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const style = {
            textAlign: 'right'
        } as React.CSSProperties;

        return <span style={style}><div>{innerContent}</div></span>;
    }
}