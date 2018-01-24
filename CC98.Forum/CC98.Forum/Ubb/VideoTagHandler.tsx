import * as React from 'react';
import * as Ubb from './Core';
declare var DPlayer: any;

/**
 * 处理 [video] 标签的处理器。
 */
export class VideoTagHandler extends Ubb.TextTagHandler {
	get supportedTagNames(): string {
		return 'video';
	}

	execCore(innerContent: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        //不允许显示媒体内容
        if (context.options.allowMediaContent === false) {
            return innerContent;
        } 

        return <VideoComponent src={innerContent} />;
	}
}

interface IProps {
    /**
     * 音频文件地址
     */
    src: string;
}
class VideoComponent extends React.Component<IProps> {
    /**
     * 对div的引用
     */
    div: HTMLDivElement;
    /**
     * 对播放器的引用
     */
    dp: any;

    /**
     * 组件加载后初始化播放器
     */
    componentDidMount() {
        this.dp = new DPlayer({
            element: this.div,
            autoplay: false,
            preload: 'metadata',
            video: {
                url: encodeURI(this.props.src)
            }
        });

        this.dp.on('abort', e => null);

        this.div.getElementsByClassName('dplayer-menu')[0].innerHTML = '<div class="dplayer-menu-item"><a target="_blank" href="https://github.com/MoePlayer/DPlayer">关于 DPlayer 播放器</a></div>';
    }

    componentWillUnmount() {
        this.div.innerHTML = '';
    }
    
    render() {
        //重置继承自article的whiteSpace
        return <div style={{ display: 'flex' }}><div className="aplayer" style={{ whiteSpace: 'normal', height: '28.8984375rem' }} ref={it => this.div = it}></div></div>;
    }
}
