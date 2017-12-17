// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [url] 标签的处理器。
 * TODO:对于外链的判断
 */
export class UrlTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): string {
        return 'url';
    }

    execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        let url = tagData.value('url');
        if (!url) {
            url = innerContent;
        }

        //不允许显示外部链接
        if (context.options.allowExternalUrl === false) {
            //判断是否为外部链接
            if (url.indexOf('http') === 0 && url.split('/').length > 1 && url.split('/')[2] !== 'www.cc98.org') {
                return innerContent;
            }
        }

        return <a href={url} target="_blank">{innerContent}</a>;
    }
}