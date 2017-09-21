// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [quote] 标签的处理器。
 */
export class QuoteTagHandler extends Ubb.RecursiveTagHandler {

	get tagName(): string { return 'quote' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const style = {
            width: '60%',
            padding: '13px 19px 13px 17px',
            backgroundColor: '#F5FAFF',
            border: '1px solid rgb(204,204,204)'
        };
        
        return <div style={style}>{innerContent}</div>;
	}
}

export class QuotexTagHandler extends QuoteTagHandler {
    get tagName() {
        return 'quotex';
    }
}