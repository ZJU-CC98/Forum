﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
/**
 * 处理 [code] 标签的处理器。
 */
export class CodeTagHandler extends Ubb.TextTagHandler {

	get supportedTagNames(): string { return 'code' };

	execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        let codes = content.split('\n');
        while(!codes[0] && codes.length > 0) codes.shift();
        while(!codes[codes.length - 1] && codes.length > 0) codes.pop();
        let element = codes.map((item, index) => {
            return <li>{item}</li>
        });
        return (<div className='ubb-code'>
            <ol>
                {element}
            </ol>
        </div>);
	}
}