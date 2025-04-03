/**
 * @author dongyansong
 * @date 2018-11-19
 */
import * as React from 'react';
import * as Ubb from './Core';

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /^ms\d{2}$/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        const tagName = tagData.tagName;
        const msId = tagName.replace("ms", "");
        const msNum = parseInt(msId, 10);
        if (isNaN(msNum) || !(msNum >= 1 && msNum <= 54)) {
            console.warn(`Invalid msId: ${msId}`); // 如果msId不在范围内，打印警告
            return <>{"["+tagName+"]"}</>; // 返回原始内容
        }
        const url = `/static/images/ms/ms${msId}.png`;

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}