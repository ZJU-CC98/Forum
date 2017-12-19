// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class SandBoxTagHandler extends Ubb.RecursiveTagHandler {
	get supportedTagNames(): string {
		return 'sandbox';
	}

	/**
	 * 获取一个值，指示当前浏览器是否支持 sandbox 功能。
	 * @returns {boolean} 如果浏览器支持 sandbox 功能，返回 true；否则返回 false。 
	 */
	private static get supportSandBox(): boolean {
		return 'sandbox' in document.createElement('iframe');
	}

	execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		// 不支持则直接返回内容
		if (!SandBoxTagHandler.supportSandBox) {
			return innerContent;
		}

		const url = tagData.mainValue;
		const width = tagData.value('width');
		const height = tagData.value('height');

		return <iframe sandbox="allow-scripts allow-forms allow-same-origin" src={url} style={{ border: 'none', width: width, height: height, }}>{innerContent}</iframe>;
	}
}