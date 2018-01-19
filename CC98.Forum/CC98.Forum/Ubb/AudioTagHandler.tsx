// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
declare var APlayer: any;

/**
 * 处理 [mp3] 标签的处理器。
 */
export class AudioTagHandler extends Ubb.TextTagHandler {
	get supportedTagNames(): string[] {
		return ['mp3', 'audio'];
	}

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        } 

        //是否自动播放
        let autoPlay = false;
        if ((tagData.value('mp3') === '1' || tagData.value('audio') === '1') && context.options.allowAutoPlay === true) {
            autoPlay = true;
        }
        
        return <AudioComponent src={innerContent} autoPlay={autoPlay} />;
	}
}

interface IProps {
    /**
     * 音频文件地址
     */
    src: string;
    /**
     * 是否自动播放
     */
    autoPlay: boolean;
}
class AudioComponent extends React.Component<IProps> {
    /**
     * 对div的引用
     */
    div: HTMLDivElement;

    /**
     * 组件加载后初始化播放器
     */
    componentDidMount() {
        var ap = new APlayer({
            element: this.div,
            autoplay: this.props.autoPlay,
            narrow: false,
            showlrc: 0,
            music: {
                url: this.props.src,
                title: this.props.src,
                author: ''
            }
        });
        //去掉文件名后面的横杠
        this.div.getElementsByClassName('aplayer-author')[0].innerHTML = '';
    }
    
    render() {
        //重置继承自article的whiteSpace
        return <div className="aplayer" style={{ whiteSpace: 'normal' }} ref={it => this.div = it}></div>;
    }
}
