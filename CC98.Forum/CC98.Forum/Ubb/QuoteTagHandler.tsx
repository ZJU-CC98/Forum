// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export class QuoteTagHandler extends Ubb.RecursiveTagHandler {

	get tagName(): string { return 'quote' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const style = {
            width: '100%',
            padding: '13px 19px 13px 17px',
            backgroundColor: '#F5FAFF'
        };
        
        return <div style={style}>{innerContent}</div>;
	}
}