// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [quote] 标签的处理器。
 */
export class QuoteTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string[] { return ['quote', 'quotex'] };
    
    // 重写exec方法
    exec(tagSegment, context: Ubb.UbbCodeContext) {

        // 记录引用深度
        context.data.quoteDepth ++;

        const result = [];

        for (const subSeg of tagSegment.subSegments) {
            result.push(context.engine.execSegment(subSeg, context));
        }

        return this.execCore(result, tagSegment.tagData, context);
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        context.data.curQuoteDepth ++;
 
		let style: React.CSSProperties = {
            borderBottom: '1px solid rgb(204,204,204)',
            marginBottom: '10px',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            order: -1
        };

        // 对最外层引用的处理
        if(context.data.curQuoteDepth === context.data.quoteDepth) {
            // 隐藏下边框
            style.borderBottom = null;
            
            // 最外层的样式
            let outStyle: React.CSSProperties = {
                backgroundColor: '#F5FAFF',
                border: '1px solid rgb(204,204,204)',
                padding: '13px 19px 3px 17px',
                maxHeight: '800px',
                overflowY: 'auto'
            }

            return <div style={outStyle}><div style={style}>{innerContent}</div></div>;
        }
        
		return <div style={style}>{innerContent}</div>;
	}
}