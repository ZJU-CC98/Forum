// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import LazyLoad from 'react-lazyload';

export class ImageTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'img' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const imageUri = content;
        const title = tagData.value('title');
        const isShowedValue = parseInt(tagData.value('img'));

        // 不允许显示图像
        if (!context.options.allowImage) {
            return <Image imageUri={imageUri} title={title} isShowed={false} />
        }

        //[img=1]默认不显示图片，[img]或[img=0]默认显示图片
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            if (isShowedValue === 1) {
                return <Image imageUri={imageUri} title={title} isShowed={false} />
            } else {
                return <figure>
                    <Image imageUri={imageUri} title={title} isShowed={true} />
                    <figcaption>{title}</figcaption>
                </figure>;
            }
        } else {
            if (isShowedValue === 1) {
                return <Image imageUri={imageUri} title={title} isShowed={false} />
            } else {
                return <Image imageUri={imageUri} title={title} isShowed={true} />
            }
        }
    }
}

/*
 *图片组件
 *用于控制图片是否默认显示
 */
export class Image extends React.Component<{ imageUri, title, isShowed: boolean }, { isShowed: boolean }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            isShowed: this.props.isShowed
        };
        this.toggleIsShowed = this.toggleIsShowed.bind(this);//别再忘了bind了！！  “bind一般放在构造过程中” ——樱桃
    }

    toggleIsShowed() {
        console.log("显示图片！")
        this.setState(prevState => ({
            isShowed: !prevState.isShowed   //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }));
    }

    render() {
        let props = {
            height: 300,
            once: true,
            offset: 100,
        };

        if (this.state.isShowed) {
            return <LazyLoad {...props} ><img style={{maxWidth:'100%'}}src={this.props.imageUri} alt={this.props.title} /></LazyLoad>
        } else {
            return <div className="hiddenImage" onClick={this.toggleIsShowed}>点击查看图片</div>
        }
    }
}