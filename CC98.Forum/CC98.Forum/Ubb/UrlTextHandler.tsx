import * as React from 'react';
import * as Ubb from './Core';

export default class UrlTextHandler extends Ubb.UbbTextHandler {

	/**
	 * 用来匹配的正则表达式对象。
	 * TODO：修改为更合适的版本
	 */
	private _pattern = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/i;


	get supportedContent() {
		return this._pattern;
	}

	exec(match: RegExpMatchArray, context: Ubb.UbbCodeContext): React.ReactNode {
		const content = match[0];
		return context.options.autoDetectUrl ? <a href={content}>{content}</a> : content;
	}
}