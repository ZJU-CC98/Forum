import * as React from 'react'
import * as Ubb from './Core'

export class BiliTagHandler extends Ubb.TextTagHandler {
	get supportedTagNames(): string {
		return 'bili';
	}

	/** 根据B站url，获取分p数
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

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
		//不允许显示媒体内容
		if (context.options.allowMediaContent === false) {
			return innerContent;
		}

		// 分P数，默认为1
		let partNumber = parseInt(tagData.value('bili')) || 1;

		let src = "";
		const isPureNumber = /^\d+$/.test(innerContent);
		const isBVString = /^BV[A-Za-z0-9]+/.test(innerContent);
		const isUrl = /(https?:\/\/)?www.bilibili.com\/video\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(innerContent);

		//纯数字依然解析成aid
		if (isPureNumber) {
			src = `https://player.bilibili.com/player.html?aid=${innerContent}&page=${partNumber}`;
		}
		//BV开头的字符串，解析成bvid
		else if (isBVString) {
			src = `https://player.bilibili.com/player.html?bvid=${innerContent}&page=${partNumber}`;
		}
		//bili标签内直接复制b站url，根据具体情况做不同的解析
		else if (isUrl) {
			//判断是否是av号
			const isAv = /^(https?:\/\/)?www\.bilibili\.com\/video\/av[0-9]+/.test(innerContent);
			//判断是否是BV号
			const isBV = /^(https?:\/\/)?www\.bilibili\.com\/video\/BV[0-9A-Za-z]+/.test(innerContent);
			//获取url中分P数
			const page = this.getBiliPage(innerContent);

			if (isAv) {
				let av = innerContent.split("bilibili.com/video/av")[1].split("?")[0].split("/")[0];
				src = `https://player.bilibili.com/player.html?aid=${av}&page=${page}`;
			}
			else if (isBV) {
				let BV = innerContent.split("bilibili.com/video/")[1].split("?")[0].split("/")[0];
				src = `https://player.bilibili.com/player.html?bvid=${BV}&page=${page}`;
			}
			//错误的url，不解析
			else {
				return innerContent;
			}
		}
		//bili标签内输入错误内容，不解析
		else {
			return innerContent;
		}

		const style: React.CSSProperties = {
			border: 'none'
		};

		const props = {
			border: "0",
			frameborder: "no",
			framespacing: "0",
			allowfullscreen: "true"
		} as any;

		return <div>
			<iframe {...props} src={src} allowfullscreen="allowfullscreen" style={style} width="640" height="480" scrolling="no">
			</iframe>
		</div >;
	}
}