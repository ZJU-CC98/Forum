// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import LazyLoad from 'react-lazyload';
import * as parse from 'url-parse';

export class ImageTagHandler extends Ubb.TextTagHandler {
    get supportedTagNames(): string { return 'img' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const imageUri = content;
        const title = tagData.value('title');
        let isShowedValue = parseInt(tagData.value('img'));

        let { allowImage, allowExternalImage, allowLightbox } = context.options;
        if (!allowExternalImage && !parse(imageUri).hostname.includes('cc98.org')) {
            allowImage = false;
        }

        // 不允许显示图像
        if (!allowImage) {
            return <a href={imageUri}>{imageUri}</a>
        }

        //[img=1]默认不显示图片，[img]或[img=0]默认显示图片
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            if (isShowedValue === 1) {
                return <Image imageUri={imageUri} title={title} isShowed={false} allowLightbox={allowLightbox} />
            } else {
                return <figure>
                    <Image imageUri={imageUri} title={title} isShowed={true} allowLightbox={allowLightbox} />
                    <figcaption>{title}</figcaption>
                </figure>;
            }
        } else {
            if (isShowedValue === 1) {
                return <Image imageUri={imageUri} title={title} isShowed={false} allowLightbox={allowLightbox} />
            } else {
                return <Image imageUri={imageUri} title={title} isShowed={true} allowLightbox={allowLightbox} />
            }
        }
    }
}

/*
 *图片组件
 *用于控制图片是否默认显示
 */
export class Image extends React.Component<{ imageUri, title, isShowed: boolean, allowLightbox: boolean }, { isShowed: boolean, isLightboxOn: boolean }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            isShowed: this.props.isShowed,
            isLightboxOn: false
        };
        this.toggleIsShowed = this.toggleIsShowed.bind(this);
        this.toggleLightbox = this.toggleLightbox.bind(this);
    }

    toggleIsShowed() {
        this.setState(prevState => ({
            isShowed: !prevState.isShowed   //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }));
    }

    toggleLightbox() {
        this.setState(prevState => ({
            isLightboxOn: !prevState.isLightboxOn
        }));
    }

    render() {
        const props = {
            height: 300,
            once: true,
            offset: 100,
        };

        if (this.state.isShowed) {
            if (this.props.allowLightbox) {
                if (this.state.isLightboxOn) {
                    return <div className="lightbox" onClick={this.toggleLightbox}>
                        <div className="lightbox-image">
                            <img src={this.props.imageUri} alt={this.props.title} />
                        </div>
                    </div>
                }
                else {
                    return <LazyLoad {...props} >
                        <img style={{ maxWidth: '100%', cursor: 'pointer' }} src={this.props.imageUri} alt={this.props.title} onClick={this.toggleLightbox} />
                    </LazyLoad>
                }
            }
            else {
                return <LazyLoad {...props} >
                    <img style={{ maxWidth: '100%' }} src={this.props.imageUri} alt={this.props.title} />
                </LazyLoad>
            }
        } else {
            return <div className="hiddenImage" onClick={this.toggleIsShowed}>点击查看图片</div>
        }
    }
}