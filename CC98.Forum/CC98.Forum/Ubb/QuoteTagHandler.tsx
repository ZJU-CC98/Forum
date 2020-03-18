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
    exec(tagSegment: Ubb.UbbTagSegment, context: Ubb.UbbCodeContext) {

        // 处理已经 flatQuote 之后的 [quote] 标签
        if (context.data.isInQuote) {
            return super.exec(tagSegment, context);
        }

        // 进入了一个 [quote] 标签
        context.data.isInQuote = true;

        const isQuoteTag = (segment: Ubb.UbbSegment): boolean => {
            if (segment.type === Ubb.UbbSegmentType.Tag) {
                const tagName = (segment as Ubb.UbbTagSegment).tagData.tagName
                return this.supportedTagNames.indexOf(tagName) !== -1
            }
            return false
        }

        const isPureQuote = (segments: Ubb.UbbSegment[]): boolean => {
            //如果没有内容，则不认为是纯引用。（用于解决[quote][quote]xxx[/quote][/quote]这类ubb报错的问题） 
            if (!segments[0]) return false

            return (
                segments[0].type === Ubb.UbbSegmentType.Tag &&
                (segments[0] as Ubb.UbbTagSegment).subSegments[0] &&
                (segments[0] as Ubb.UbbTagSegment).subSegments[0].type === Ubb.UbbSegmentType.Text &&
                ((segments[0] as Ubb.UbbTagSegment).subSegments[0] as Ubb.UbbTextSegment).text.indexOf('以下是引用') === 0 &&
                segments.slice(1, segments.length).every(item => item.type === Ubb.UbbSegmentType.Text &&
                    !(item as Ubb.UbbTextSegment).text.match(/\S/)
                )
            )
        }

        // flatQuote, 把嵌套的 [quote] 抹平
        const queue: Ubb.UbbTagSegment[] = [tagSegment]
        let hasNest: boolean
        let rootSegment = tagSegment

        do {
            hasNest = false
            const subSegments = rootSegment.subSegments
            for (const segment of subSegments) {
                if (isQuoteTag(segment)) {
                    // 把下一层的 [quote] 标签移除
                    const [quoteSegment] = subSegments.splice(subSegments.indexOf(segment), 1)
                    rootSegment = quoteSegment as Ubb.UbbTagSegment
                    // 放入处于同一层级的 [quote] 队列
                    queue.push(rootSegment)
                    hasNest = true
                }
            }
        } while (hasNest)

        if (queue.length > 1) {
            queue.reverse()
            // 给原本最内层的 [quote] 补上一个空行
            queue[0].subSegments.splice(1, 0, new Ubb.UbbTextSegment('\n', queue[0]))
            // 处理纯引用
            for (let i = 1; i < queue.length; i++) {
                if (isPureQuote(queue[i].subSegments)) {
                    let info = (queue[i].subSegments.shift() as Ubb.UbbTagSegment).clone(queue[i - 1])
                    queue[i - 1].subSegments.unshift(info)
                    queue[i - 1].subSegments.splice(1, 0, new Ubb.UbbTextSegment('\n', queue[i - 1]))
                    queue.splice(i, 1)
                    i--
                }
            }
        }

        const quoteItems = queue.map((segment, index) => {
            if (index === queue.length - 1) {
                context.data.islastQuote = true;
            } else {
                context.data.islastQuote = false;
            }
            return context.engine.execSegment(segment, context)
        })
        context.data.isInQuote = false;

        return <Quote quoteItems={quoteItems} />
    }

    execCore(innerContent: React.ReactNode[], tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const style: React.CSSProperties = {
            boxSizing: 'border-box',
            width: '100%',
            padding: '10px 0 10px 0',
            borderBottom: '1px solid rgb(204,204,204)',
            overflowY: 'hidden',
        }

        // 最后一层引用不现实下边框
        if (context.data.islastQuote) style.borderBottom = null;

        return <div style={style}>{innerContent}</div>
    }
}

interface State {
    /**
     * 过多的引用内容是否显示
     */
    isShowed: boolean;
}

interface Props {
    quoteItems: React.ReactNode[]
}

class Quote extends React.PureComponent<Props, State> {
    state: State = {
        isShowed: this.props.quoteItems.length <= 2
    }

    showButtonClick() {
        this.setState({
            isShowed: true
        })
    }

    render() {

        const wrapperStyle: React.CSSProperties = {
            backgroundColor: '#F5FAFF',
            border: '1px solid rgb(204,204,204)',
            padding: '0 17px 0 17px',
            maxHeight: '800px',
            overflowY: 'auto',
        }

        const buttonStyle: React.CSSProperties = {
            width: 'auto',
            marginTop: 0,
            alignSelf: 'center',
        }

        const buttonWrapperStyle: React.CSSProperties = {
            display: 'flex',
            justifyContent: 'center',
            padding: '14px 0',
            borderBottom: '1px solid rgb(204,204,204)',
        }

        const showButton = <div style={buttonWrapperStyle}>
            <button style={buttonStyle}
                className="hiddenImage"
                type="button"
                onClick={this.showButtonClick.bind(this)}
            >
                展开剩余引用
                </button>
        </div>

        const { isShowed } = this.state
        const { quoteItems } = this.props
        const showQuotes = isShowed ? quoteItems : quoteItems.slice(quoteItems.length - 2)

        return (
            <div style={wrapperStyle}>
                {!isShowed && showButton}
                {showQuotes}
            </div>
        )
    }
}