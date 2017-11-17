// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export class ImageTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'img' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const imageUri = content;
        const title = tagData.value('title');
        const isShowed = parseInt(tagData.value('img'));

        // 不允许显示图像
        if (!context.options.allowImage) {
            return content;
        }

        const imageTag = <img src={imageUri} alt={title} />;

        //[img=1]默认不显示图片，[img]或[img=0]默认显示图片
        // HTML5 模式下，使用 figure 表示插图
        if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
            if (isShowed === 1) {
                return content;
            } else {
                return <figure>
                    {imageTag}
                    <figcaption>{title}</figcaption>
                </figure>;
            }
        } else {
            if (isShowed === 1) {
                return content;
            } else {
                return imageTag;
            }
        }
    }
}