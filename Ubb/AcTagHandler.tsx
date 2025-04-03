// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /^ac(\d{2}|\d{4})$/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const tagName = tagData.tagName;
        const acId = tagName.replace("ac", "");
        const acNum = parseInt(acId, 10);
        if (isNaN(acNum) || !(acNum >= 1 && acNum <= 54 || (acNum >= 1001 && acNum <= 1040) || (acNum >= 2001 && acNum <= 2055))) {
            console.warn(`Invalid acId: ${acId}`); // 如果acId不在范围内，打印警告
            return <>{"["+tagName+"]"}</>; // 返回原始内容
        }
        const url = `/static/images/ac/${acId}.png`;

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}