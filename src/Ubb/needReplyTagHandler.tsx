// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class NeedReplyTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): string {
        return "needreply";
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const wrapperStyle: React.CSSProperties = {
            backgroundColor: '#F5FAFF',
            border: '1px solid rgb(204,204,204)',
            padding: '10px 17px',
            color: 'red',
            margin: '6px 0'
        }
        return <div>
            <hr />
            <div style={wrapperStyle}>该内容回复后才可浏览</div>
            <hr />
        </div>
    }
}