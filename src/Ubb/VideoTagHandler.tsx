import * as React from 'react';
import * as Ubb from './Core';

const DPlayer = require('dplayer');

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

interface IState {
    /**
     * 播放器高度
     */
    height: string;
}

declare const Hls: any

class VideoComponent extends React.Component<IProps, IState> {
    /**
     * 对div的引用
     */
    div: HTMLDivElement;
    /**
     * 对播放器的引用
     */
    dp: any = null;

    state: IState = {
        height: '28.8984375rem'
    };

    /**
     * 组件加载后初始化播放器
     */
    componentDidMount() {
        if (this.props.src.match(/\.m3u8$/)) {
            try {
                new Hls()
                this.initPlayer('hls')
            } catch(e) {
                const script = document.createElement('script')
                script.src = '/content/hls.min.js'
                document.getElementsByTagName('head')[0].appendChild(script)
                script.onload = () => {
                    this.initPlayer('hls')
                }
            }
        } else {
            this.initPlayer()
        }

    }

    initPlayer = (type?: string) => {
        try {
            this.dp = new DPlayer({
                element: this.div,
                autoplay: false,
                preload: 'metadata',
                video: {
                    url: encodeURI(this.props.src),
                    type,
                },
            });
        } catch(e) {
            console.log(e, 'new Dplayer Error.')
        }

        if(!this.dp) {
            return
        }

        this.dp.on('abort', e => null);

        // 对全屏下高度的调整
        this.dp.on('fullscreen', e => this.setState({ height: 'auto' }));
        this.dp.on('fullscreen_cancel', e => this.setState({ height: '28.8984375rem' }));
        this.dp.on('webfullscreen', e => this.setState({ height: '100%' }));
        this.dp.on('webfullscreen_cancel', e => this.setState({ height: '28.8984375rem' }));
        this.div.getElementsByClassName('dplayer-menu')[0].innerHTML = '<div class="dplayer-menu-item"><a target="_blank" href="https://github.com/MoePlayer/DPlayer">关于 DPlayer 播放器</a></div>';
    }

    componentWillUnmount() {
        if(!this.dp) {
            return
        }

        this.dp.destroy();
        this.div.innerHTML = '';
    }

    render() {
        //重置继承自article的whiteSpace
        return <div style={{ display: 'flex' }}><div className="dplayer" style={{ whiteSpace: 'normal', height: this.state.height }} ref={it => this.div = it}></div></div>;
    }
}
