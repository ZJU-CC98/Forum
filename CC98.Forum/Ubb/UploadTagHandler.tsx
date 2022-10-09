// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import { Image } from './ImageTagHandler'

//暂时完成 目前可以区分支持格式的图片和其他格式的文件 
//对于支持格式的图片，会根据第二个参数的值决定是否默认显示
//对于其他格式的文件，是否填写第二个参数没有影响（与原版98相同）
//与原版98不同之处之一是，现在upload标签不写参数也可以解析，但是这时不能区分图片与非图片

export class UploadTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element;

    get supportedTagNames(): string { return 'upload' };

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const uploadUrl = content;
        const uploadType = tagData.value(0);
        const allowToolbox = context.options.allowToolbox;
        let uploadValue;
        if (tagData.parameterCount === 1) uploadValue = 0;
        if (tagData.parameterCount === 2) uploadValue = parseInt(tagData.value(1));

        switch (uploadType) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "webp":
                // 不允许显示图像
                if (!context.options.allowImage) {
                    return <a href={uploadUrl}>{uploadUrl}</a>
                }
                //第二个参数值为1默认不显示图片，为0或没有则默认显示图片
                // HTML5 模式下，使用 figure 表示插图
                if (context.options.compatibility === Ubb.UbbCompatiblityMode.EnforceMorden) {
                    if (uploadValue === 1) {
                        return <Image imageUri={uploadUrl} title={"upload图片"} isShowed={false} allowToolbox={allowToolbox} />
                    } else {
                        return <figure>
                            <Image imageUri={uploadUrl} title={"upload图片"} isShowed={true} allowToolbox={allowToolbox} />
                            <figcaption>{"upload图片"}</figcaption>
                        </figure>;
                    }
                } else {
                    if (uploadValue === 1) {
                        return <Image imageUri={uploadUrl} title={"upload图片"} isShowed={false} allowToolbox={allowToolbox} />
                    } else {
                        return <Image imageUri={uploadUrl} title={"upload图片"} isShowed={true} allowToolbox={allowToolbox} />
                    }
                }
            default:
                return <a className="download-file" href={uploadUrl}>点击下载文件</a>
        }

    }
}