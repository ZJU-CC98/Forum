// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import * as parse from 'url-parse';

// 默认URL类型和导入的有微妙的差别
type URL = ReturnType<typeof parse>;

/**
 * 处理 [url] 标签的处理器。
 * TODO:对于外链的判断
 */
export class UrlTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): string {
        return 'url';
    }

    /**
     * 检测一个url是否存在xss问题
     * @param url 要检测的url
     * @return {boolean} 是否是安全的
     * @author AsukaSong
     */
    static isSafe(url: URL): boolean {

        // ' ' for ' javascript:'
        // based on https://medium.com/javascript-security/avoiding-xss-in-react-is-still-hard-d2b5c7ad9412
        const dangerousProtocols = [' ', 'javascript:', 'data:'];

        if(dangerousProtocols.indexOf(url.protocol) !== -1) {
            return false;
        } else {
            return true;
        }
    }

    execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        

        const url = parse(tagData.value('url') || innerContent, {});

        // 是否存在xss问题
        if(!UrlTagHandler.isSafe(url)) {
            return innerContent;
        }

        //不允许显示外部链接
        if (context.options.allowExternalUrl === false) {
            //判断是否为外部链接
            if (url.host !== 'www.cc98.org') {
                return innerContent;
            }
        }

        return <a href={url.href} target="_blank" className="urlStyle">{innerContent}</a>;
    }
}