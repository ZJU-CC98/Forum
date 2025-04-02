// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /ac\d{2}/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        // debugger
        // const reg = /ac/gi;
        // const tagName = tagData.tagName;
        // const acId = tagName.replace(reg, "");
        // const url = `/static/images/ac/${acId}.png`;
        const reg = /^ac(\d{2,})/i; 
        const match = tagData.tagName.match(reg); 
        const acId = match ? match[1] : ""; 
        const url = `/static/images/ac/${acId}.png`;

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}