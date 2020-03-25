import * as React from 'react'
import * as Ubb from './Core'

export class BiliTagHandler extends Ubb.TextTagHandler {
	get supportedTagNames(): string {
		return 'bili';
	}

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
		//不允许显示媒体内容
		if (context.options.allowMediaContent === false) {
			return innerContent;
		}

		// 分P数，默认为1
		const partNumber = parseInt(tagData.value('bili')) || 1;

		let src = "";
		const isPureNumber = /^\d+$/.test(innerContent);
		const isBV = /^BV/.test(innerContent);
		//纯数字依然解析成aid
		if (isPureNumber) {
			src = `https://player.bilibili.com/player.html?aid=${innerContent}&page=${partNumber}`;
		}
		//BV开头的字符串，解析成bvid
		else if (isBV) {
			src = `https://player.bilibili.com/player.html?bvid=${innerContent}&page=${partNumber}`;
		}
		//输入错误的字符串，不解析
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