
import * as React from 'react';
import * as Ubb from './Core';

import {MathJaxContext, MathJax, MathJax3Config} from 'better-react-mathjax';

/**
 * 提供对 [math] 和 [m] 的解析
 */
export class MathTagHandler extends Ubb.TextTagHandler {
	
    get supportedTagNames(): string[] {
         return ['math', 'm'] 
    }

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
       
        // m 为内联模式，math 为完整模式
        const inlineMode = tagData.tagName === 'm';

        // 内置的 tex 标记开始符号
        const beginMark = ['\\(', '\\[', '$$'];
        
        // 是否带有内置开始符号
        const hasDelimiter = beginMark.some(mark => innerContent.startsWith(mark));

        // 如果未带有开始符号，则手动添加
        if (!hasDelimiter) {
        
            innerContent = 
                inlineMode ? `\\(${innerContent}\\)` : `\\[${innerContent}\\]`;
        }

        return <MathJaxContext src='/static/scripts/lib/mathjax-full/es5/tex-mml-chtml.js'>
            <MathJax inline={inlineMode}>{innerContent}</MathJax>
        </MathJaxContext>
    }
} 