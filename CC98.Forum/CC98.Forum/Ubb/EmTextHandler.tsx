// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as Ubb from './Core';

export default class EmTextHandler extends Ubb.UbbTextHandler {

	/**
	 * 用来匹配的正则表达式对象。
	 * TODO：修改为更合适的版本
	 */
    private _pattern = /\[em\d{2}\]/i;


    get supportedContent() {
        return this._pattern;
    }

    exec(match: RegExpMatchArray, context: Ubb.UbbCodeContext): React.ReactNode {
        const content = match[0];
        const emoticonID = content.match(/\d{2}/).toString();
        const emoticonNum = parseInt(emoticonID) + 1;
        const url = `http://www.cc98.org/emot/em${emoticonNum}.gif`; 
        console.log("EmTextHandler被调用了！");
        return <img src={url} />
    }
}