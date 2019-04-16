// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

var remark = require('remark');
var reactRenderer = require('remark-react');

export class MdTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'md' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const { allowMarkDown } = context.options;
        const mdContent = content;
        if (!allowMarkDown) return <div>{mdContent}</div>
        return <MarkdownParser content={mdContent} />

    }
}

export class MarkdownParser extends React.Component<{ content }, { divid: string }> {
    constructor(props?, context?) {
        super(props, context);
        const randomNum = Math.floor(Math.random() * 1000000); //生成一个0-999999的随机数
        this.state = ({
            divid: `Markdown${randomNum}`
        });
    }
    render() {
        // 鬼畜正则代码  兼容老版本md语法解析问题
        let parseContent = this.props.content.replace(/\n>[\s\S]*?\n\n/g, (v) => v.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')));
        if (parseContent[0] === '>') {
            const index = parseContent.indexOf('\n\n');
            if (index === -1) {
                parseContent = parseContent.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>'));
            } else {
                const substr = parseContent.substr(0, index);
                parseContent = substr.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')) + parseContent.substr(index + 1, parseContent.length);
            }
        }
        parseContent = parseContent.replace(/发言：\*\*\n/g, "发言：**\n\n");
        return <div id={this.state.divid} style={{ maxWidth: "80%", overflow: "hidden" }}>
            {remark().use(reactRenderer).processSync(parseContent).contents}
        </div>;
    }
}