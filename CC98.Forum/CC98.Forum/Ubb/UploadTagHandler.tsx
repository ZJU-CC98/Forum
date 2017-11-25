// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
//尚未完成 目前仅和ImageHandler功能相同 不能区分是否显示图像 也不能处理非图片格式的upload
export class UploadTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'upload' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        //tagData.value(0,1,2,……)
        const uploadUri = content;
        const uploadType = tagData.value(0);
        let uploadValue;
        if (tagData.parameterCount === 1) uploadValue = 0;
        if (tagData.parameterCount === 2) uploadValue = tagData.value(1);
        console.log("uploadType=" + uploadType);
        console.log("uploadValue=" + uploadValue);
        console.log(Ubb.UbbTagHandler.renderTagAsString(tagData, content));

        // 不允许显示图像
        if (!context.options.allowImage) {
            return <Image imageUri={uploadUri} title={""} isShowed={false} />
        }

        //[img=1]默认不显示图片，[img]或[img=0]默认显示图片
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            return <figure>
                <Image imageUri={uploadUri} title={""} isShowed={true} />
                <figcaption>{""}</figcaption>
            </figure>;
        } else {
            return <Image imageUri={uploadUri} title={""} isShowed={true} />
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
        if (this.state.isShowed) {
            return <img maxWidth="100%" src={this.props.imageUri} alt={this.props.title} />
        } else {
            return <div className="hiddenImage" onClick={this.toggleIsShowed}>点击查看图片</div>
        }
    }
}