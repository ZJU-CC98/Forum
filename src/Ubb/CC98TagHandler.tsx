// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class CC98TagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /CC98\d{2}/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const reg = /CC98/gi;
        const tagName = tagData.tagName;
        const id = tagName.replace(reg, "");
        let url = `/images/CC98/CC98${id}.gif`;
        //CC9815 - CC9830 为PNG格式
        if (Number(id) > 14 && Number(id) < 31) {
	        url = `/images/CC98/CC98${id}.png`;
        }
        //CC9836 - CC9837 为PNG格式
        if (Number(id) > 35) {
	        url = `/images/CC98/CC98${id}.png`;
        }

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}
