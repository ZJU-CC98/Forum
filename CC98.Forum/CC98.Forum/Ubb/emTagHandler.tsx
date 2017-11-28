// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export class EmTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp { return /em\d{2}/i }   //正则表达式，意为em+两位数字,i表示区分大小写

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const tagName = tagData.tagName;
        const emoticonID = tagName.match(/\d{2}/).toString();
        const emoticonNum = parseInt(emoticonID) + 1;
        const url = `http://www.cc98.org/emot/em${emoticonNum}.gif`;

        return <div><img src={url} />{innerContent}</div>
    }
}