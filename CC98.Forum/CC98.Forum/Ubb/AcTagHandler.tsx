// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /ac\d{2}/i;
    }   //正则表达式，意为em+两位数字,i表示区分大小写

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const reg = /ac/g;
        const tagName = tagData.tagName;
        const acId = tagName.replace(reg, "");
        const url = `/images/ac/${acId}.png`;

        return <div>
            <img src={url} alt="" />{innerContent}
        </div>;
    }
}