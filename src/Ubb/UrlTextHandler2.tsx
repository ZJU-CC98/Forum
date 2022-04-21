import * as React from 'react';
import * as Ubb from './Core';

export default class UrlTextHandler2 extends Ubb.UbbTextHandler {

	/**
	 * 用来匹配的正则表达式对象。
	 * TODO：修改为更合适的版本
	 */
    private _pattern = /[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]\.(com|org|cn|net|cc|xyz|top|club|shop|xin|wang|vip|ink|link|tv|work|me|info|mobi|online|site|tech|ren|pro|ltd|fun|kim|red|group|store|biz|name|wiki|game|help|co|so|hk|tel|asia|lol|studio|design|live|lawyer|software|band|press|space|website|date|trade|party|win|video|news|pw|photo|pub|click|loan|bid|moe)/i;


    get supportedContent() {
        return this._pattern;
    }

    exec(match: RegExpMatchArray, context: Ubb.UbbCodeContext): React.ReactNode {
        const content = match[0];
        return context.options.autoDetectUrl ? <a href={`http://${content}`} target="_blank" className="urlStyle">{content}</a> : content;
    }
}