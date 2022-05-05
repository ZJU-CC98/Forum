// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class TbTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /tb\d{2}/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const tagName = tagData.tagName;
        const emoticonId = tagName.match(/\d{2}/).toString();
        const url = `/images/tb/tb${emoticonId}.png`;

        return <div style={{ display: "inline" }}>
            <img src={url} alt="" />{innerContent}
        </div>;
    }
}
