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

        context.data.quoteDepth --;

        return this.execCore(result, tagSegment.tagData, context);
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		let style: React.CSSProperties = {
            borderBottom: '1px solid rgb(204,204,204)',
            marginBottom: '10px',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            order: -1,
            overflowY: 'hidden',
            alignItems: 'baseline',
            width: '100%'
        };

        // 对最外层引用的处理
        if(context.data.quoteDepth === 0) {
            // 隐藏下边框
            style.borderBottom = null;
            
            // 最外层的样式
            let outStyle: React.CSSProperties = {
                backgroundColor: '#F5FAFF',
                border: '1px solid rgb(204,204,204)',
                padding: '10px 19px 3px 17px',
                maxHeight: '800px',
                overflowY: 'auto'
            }

            return <div style={outStyle}><div style={style}>{innerContent}</div></div>;
        } else if(context.data.quoteDepth === 2) {
            return <Quote style={style} innerContent={innerContent} />;
        }
        
		return <div style={style}>{innerContent}</div>;
	}
}

interface State {
    /**
     * 引用内容是否显示
     */
    isShowed: boolean;
}

interface Props {
    innerContent: React.ReactNode;
    style: React.CSSProperties;
}

class Quote extends React.PureComponent<Props, State> {
    state: State = {
        isShowed: false
    }

    render() {
        if(!this.state.isShowed) {
            let buttonStyle:React.CSSProperties = {
                width: 'auto',
                marginTop: 0,
                alignSelf: 'center'
            }

            return (
                <div style={{ ...this.props.style, alignItems: 'center', transitionDuration: '2s', maxHeight: '36px'}}>
                    <button style={ buttonStyle } className="hiddenImage" type="button" onClick={() => this.setState({ isShowed: true })}>展开剩余引用</button>
                </div>
            );
        } else {
            return <div style={{ ...this.props.style, transitionDuration: '2s', maxHeight: '10000px', overflowY: 'hidden'}}>{this.props.innerContent}</div>;
        }
    }
}