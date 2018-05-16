import * as React from 'react'
import * as Ubb from './Core'

export class BiliTagHandler extends Ubb.TextTagHandler {
    get supportedTagNames(): string {
		return 'bili'
	}

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        } 

        const partNumber = parseInt(tagData.value('bili')) || 1

        return <div><iframe src={`https://player.bilibili.com/player.html?aid=${innerContent}&page=${partNumber}`} width="640" height="480" scrolling="no"></iframe></div>
	}
}