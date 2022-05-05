﻿// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class EmTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /em\d{2}/i;
    }   //正则表达式，意为em+两位数字,i表示区分大小写

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const tagName = tagData.tagName;
        const emoticonId = tagName.match(/\d{2}/).toString();
        const url = `/images/em/em${emoticonId}.gif`;

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}
