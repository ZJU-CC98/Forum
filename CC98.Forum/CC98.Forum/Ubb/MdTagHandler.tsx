// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
declare let editormd: any;

export class MdTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'md' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const mdContent = content;
        return <MarkDown content={mdContent} />

    }
}

export class MarkDown extends React.Component<{ content }, { divid: string }> {
    constructor(props?, context?) {
        super(props, context);
        const randomNum = Math.floor(Math.random() * 1000000); //生成一个0-999999的随机数
        this.state = ({
            divid: `Markdown${randomNum}`
        });
    }
    componentDidMount() {
        editormd.markdownToHTML(this.state.divid, {
            htmlDecode: "style,script,iframe",
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true,
            codeFold: true,
        });
    }
    render() {
        return <div id={this.state.divid}>
            <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{this.props.content}</textarea>
        </div>;
    }
}