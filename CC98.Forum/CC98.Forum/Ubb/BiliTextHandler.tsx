import * as React from 'react';
import * as Ubb from './Core';

export default class BiliTextHandler extends Ubb.UbbTextHandler {

	/**
	 * 用来匹配的正则表达式对象。
	 * TODO：修改为更合适的版本
	 */
    private _pattern = /(https?:\/\/)?www.bilibili.com\/video\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;


    get supportedContent() {
        return this._pattern;
    }

    /** 获取B站url的分p数
      * @param  {[string]} url B站url 
      * @return {[string]} 分p数，默认为1
      */
    private getBiliPage(url: string): string {
        let paramstr = url.split("?")[1];
        let params = paramstr ? paramstr.split("&") : "";
        for (let i = 0; i < params.length; i++) {
            let pair = params[i].split("=");
            if (pair[0] == "p") {
                return pair[1];
            }
        }
        return "1";
    }

    exec(match: RegExpMatchArray, context: Ubb.UbbCodeContext): React.ReactNode {
        const content = match[0];

        if (context.options.allowMediaContent === false) {
			return context.options.autoDetectUrl ? <a href={content} target="_blank" className="urlStyle">{content}</a> : content;
		}

        //判断是否是av号
        const isAv = /^(https?:\/\/)?www\.bilibili\.com\/video\/av[0-9]+/.test(content);
        //判断是否是BV号
        const isBV = /^(https?:\/\/)?www\.bilibili\.com\/video\/BV[0-9A-Za-z]+/.test(content);
        //获取url中分P数
        const page = this.getBiliPage(content);

        //iframe的样式
        const style: React.CSSProperties = {
            border: 'none'
        };
        //iframe的其他参数
        const props = {
            border: "0",
            frameborder: "no",
            framespacing: "0",
            allowfullscreen: "true"
        } as any;

        if (isAv) {
            let av = content.split("bilibili.com/video/av")[1].split("?")[0].split("/")[0];
            let src = `https://player.bilibili.com/player.html?aid=${av}&page=${page}`;
            return <iframe {...props} src={src} allowfullscreen="allowfullscreen" style={style} width="640" height="480" scrolling="no">
            </iframe>
        }
        else if (isBV) {
            let BV = content.split("bilibili.com/video/")[1].split("?")[0].split("/")[0];
            let src = `https://player.bilibili.com/player.html?bvid=${BV}&page=${page}`;
            return <iframe {...props} src={src} allowfullscreen="allowfullscreen" style={style} width="640" height="480" scrolling="no">
            </iframe>
        }
        else {
            return context.options.autoDetectUrl ? <a href={content} target="_blank" className="urlStyle">{content}</a> : content;
        }
    }
}