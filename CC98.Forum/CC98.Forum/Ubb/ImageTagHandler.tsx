import * as React from 'react';
import * as Ubb from './Core';
import LazyLoad from 'react-lazyload';
import * as parse from 'url-parse';

export class ImageTagHandler extends Ubb.TextTagHandler {
  get supportedTagNames(): string { return 'img' };

  execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
    /** 图片的Uri */
    const imageUri = content;
    /** 图片的title */
    const title = tagData.value('title');
    /** 控制图片是否默认显示的值 */
    let isShowedValue = parseInt(tagData.value('img'));

    let { allowImage, allowExternalImage, allowToolbox } = context.options;

    //不允许外链图片
    if (!allowExternalImage && !parse(imageUri).hostname.includes('cc98.org')) {
      allowImage = false;
    }

    // 不允许显示图像
    if (!allowImage || context.data.imageCount >= context.options.maxImageCount) {
      return <p>签名档禁止使用外链图片</p>
    }

    //图片计数+1
    context.data.imageCount += 1;

    //[img=1]默认不显示图片，[img]或[img=0]默认显示图片

    // HTML5 模式下，使用 figure 表示插图
    if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
      if (isShowedValue === 1) {
        return <Image
          imageUri={imageUri}
          title={title}
          isShowed={false}
          allowToolbox={allowToolbox}
        />
      }
      else {
        return <figure>
          <Image
            imageUri={imageUri}
            title={title}
            isShowed={true}
            allowToolbox={allowToolbox}
          />
          <figcaption>{title}</figcaption>
        </figure>
      }
    }
    // 非 HTML5 模式
    else {
      if (isShowedValue === 1) {
        return <Image
          imageUri={imageUri}
          title={title}
          isShowed={false}
          allowToolbox={allowToolbox}
        />
      }
      else {
        return <Image
          imageUri={imageUri}
          title={title}
          isShowed={true}
          allowToolbox={allowToolbox}
        />
      }
    }
  }
}

/*
 *图片组件
 *用于控制图片是否默认显示
 */
export class Image extends React.Component<{ imageUri, title, isShowed: boolean, allowToolbox: boolean }, { isShowed: boolean, isToolboxOn: boolean, neverShowToolbox: boolean, rotate: number }> {

  constructor(props) {
    super(props);
    this.state = {
      isShowed: this.props.isShowed,
      isToolboxOn: false,
      neverShowToolbox: false,
      rotate: 0,
    };
  }
  /** 切换展示状态 */
  toggleIsShowed = () => {
    this.setState(prevState => ({
      isShowed: !prevState.isShowed
    }));
  }
  /** 开关工具箱 */
  toggleToolbox = (isOpen: boolean) => {
    this.setState(() => ({
      isToolboxOn: isOpen
    }));
  }
  /** 图片旋转一定角度 */
  rotateImage(deg: number) {
    this.setState(prevState => ({
      rotate: prevState.rotate + deg
    }));
  }

  render() {
    /** LazyLoad用参数 */
    const props = {
      height: 300,
      once: true,
      offset: 100,
    };

    if (this.state.isShowed) {
      //允许显示图片工具箱。
      if (this.props.allowToolbox === true && this.state.neverShowToolbox === false) {
        let toolbox = null;
        //鼠标移至图片上，显示工具箱。
        if (this.state.isToolboxOn) {
          toolbox = (
            <div className="ubb-image-toolbox">
              <button onClick={() => this.rotateImage(90)}>
                <i className="fa fa-rotate-right"></i>
              </button>
              <button onClick={() => this.rotateImage(-90)}>
                <i className="fa fa-rotate-left"></i>
              </button>
              <button onClick={() => window.open(this.props.imageUri)}>
                <i className="fa fa-search-plus"></i>
              </button>
              <button onClick={this.toggleIsShowed}>
                <i className="fa fa-eye-slash"></i>
              </button>
              <button onClick={() => this.setState({ neverShowToolbox: true })}>
                <i className="fa fa-close"></i>
              </button>
            </div >
          )
        }
        //工具箱关闭，正常显示图片。
        else {
          toolbox = null;
        }
        return (
          <div
            onMouseLeave={() => this.toggleToolbox(false)}
            onMouseEnter={() => this.toggleToolbox(true)}
          >
            {toolbox}
            <LazyLoad {...props} >
              <img
                style={{ maxWidth: '100%', transform: `rotate(${this.state.rotate}deg)` }}
                src={this.props.imageUri}
                alt={this.props.title}
              />
            </LazyLoad >
          </div>
        )
      }
      //不允许显示工具箱，只显示图片。
      else {
        return (
          <LazyLoad {...props} >
            <img
              style={{ maxWidth: '100%' }}
              src={this.props.imageUri}
              alt={this.props.title}
            />
          </LazyLoad>
        )
      }
    }
    //不显示图片，即返回点击查看图片按钮。
    else {
      return <div className="hiddenImage" onClick={this.toggleIsShowed}>点击查看图片</div>
    }
  }
}