/**
 * @author dongyansong
 * @date 2018-11-19
 */
import * as React from 'react';
import * as Ubb from './Core';

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /ms\d{2}/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const reg = /ms/gi;
        const tagName = tagData.tagName;
        const id = tagName.replace(reg, "");
        const url = `/static/images/ms/ms${id}.png`;

        return context.options.allowEmotion ? <div style={{ display: "inline" }}><img src={url} alt="" />{innerContent}</div> : <div style={{ display: "inline" }}>{innerContent}</div>;
    }
}