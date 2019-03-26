// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
declare var require: any;
var APlayer = require('aplayer');

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
    const title = tagData.value('title');
    const author = tagData.value('author');
    return <AudioComponent src={innerContent} title={title} author={author} />;
  }
}

interface IProps {
  /**
   * 音频文件地址
   */
  src: string;
  /**
  * 音频文件标题
  */
  title: string | null;
  author:string | null;
}
class AudioComponent extends React.Component<IProps> {
  /**
   * 对div的引用
   */
  div: HTMLDivElement;
  /**
   * 对播放器的引用
   */
  ap: any;
  /**
   * 组件加载后初始化播放器
   */
  componentDidMount() {
    try {
      this.ap = new APlayer({
        element: this.div,
        autoplay: false,
        preload: 'metadata',
        music: {
          url: encodeURI(this.props.src),
          title: this.props.title ? this.props.title : encodeURI(this.props.src),
          author: this.prps.author ? this.props.author : '',
          pic: '/static/images/audio_cover.png'
        }
      });
      //去掉文件名后面的横杠
      this.div.getElementsByClassName('aplayer-author')[0].innerHTML = '';

    } catch (e) {
      // IE 11 下会抛一个 InvalidStateError 的错误，忽略
    }
  }

  componentWillUnmount() {
    this.ap && this.ap.destroy();
  }

  render() {
    //重置继承自article的whiteSpace
    return <div className="aplayer"
      style={{ whiteSpace: 'normal', width: '30rem' }}
      ref={it => this.div = it}>
    </div>;
  }
}
