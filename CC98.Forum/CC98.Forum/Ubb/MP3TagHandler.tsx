// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [mp3] 标签的处理器。
 */
export class MP3TagHandler extends Ubb.TextTagHandler {
	get tagName(): string {
		return 'mp3';
	}

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        } 

        //是否自动播放
        let autoPlay = false;
        if (tagData.value('mp3') === '1' && context.options.allowAutoPlay === true) {
            autoPlay = true;
        }
        
        return (
            <audio src={innerContent} controls={true} autoPlay={autoPlay}></audio>
        );
	}
}