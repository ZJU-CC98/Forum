
import * as React from 'react';
import * as Ubb from './Core';
import { element } from 'prop-types';

// import {MathJaxContext, MathJax, MathJax3Config} from 'better-react-mathjax';

declare const MathJax;

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
        return <MathComponent math={innerContent} inline={inlineMode} />;
    }
}

export class MathTextHandler extends Ubb.UbbTextHandler {

    override get supportedContent(): string | RegExp {
        return /(\$\$(.+)\$\$|\$(.+)\$)/i;
    }

    override exec(match: RegExpMatchArray, context: Ubb.UbbCodeContext): React.ReactNode {
        
        let content: string;
        let inline: boolean;
        
        if (match[2]) {
            content = match[2];
            inline = false;
        } else {
            content = match[3];
            inline = true;
        }

        return <MathComponent math={content} inline={inline} />
    }
}

interface Props {
    math: string;
    inline: boolean;
}

interface States{
    element: React.ReactNode | null;
}

/**
 * 将 HTML 元素转换为 React 元素。
 * @param element HTML 元素对象。
 * @param inline 是否为行内模式。
 * @returns 创建后的 React 元素。
 */
function createNodeFromElement(element: HTMLElement, inline: boolean) : React.ReactNode {
    
    const container = document.createElement('div');
    container.appendChild(element);

    const htmlObject = {
        __html: container.innerHTML
    };

    return inline ? <span dangerouslySetInnerHTML={htmlObject}  /> : <div dangerouslySetInnerHTML={htmlObject} />;
}

class MathComponent extends React.Component<Props, States>{
    
    constructor(props) {
        super(props);
        this.state = {
            element: null
        }
    }

    override async componentDidMount(): Promise<void> {

        MathJax.startup.defaultReady();
        await MathJax.startup.promise;

        MathJax.texReset();
        const mathElement: HTMLElement = await MathJax.tex2chtmlPromise(this.props.math, { display: !this.props.inline});
        const element = createNodeFromElement(mathElement, this.props.inline);
        this.setState({element});
    }

    override async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any): Promise<void> {
        if (element == null) {
            return;
        }

        // 重新排版
        await MathJax.typesetPromise();
    }

    render() {

        if (!this.state.element === null) {
            return <></>;
        }    
        
        return this.state.element;
    }
}