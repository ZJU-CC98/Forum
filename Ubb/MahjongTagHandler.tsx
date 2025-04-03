﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class MahjongTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /^([acf]):(\d{3})$/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    getAnimalUrl(mahjongId: string) {
        return `/static/images/mahjong/animal2017/${mahjongId}.png`
    }

    getCartoonUrl(mahjongId: string) {
        switch (mahjongId) {
            case "018": case "049": case "096": return `/static/images/mahjong/carton2017/${mahjongId}.gif`;
            default: return `/static/images/mahjong/carton2017/${mahjongId}.png`
        }
    }

    getFaceUrl(mahjongId: string) {
        switch (mahjongId) {
            case "004": case "009": case "056": case "061": case "062": case "087": case "115": case "120": case "137": case "168": case "169": case "175": case "206": return `/static/images/mahjong/face2017/${mahjongId}.gif`
            default: return `/static/images/mahjong/face2017/${mahjongId}.png`
        }
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        // const reg = /[acf]/gi;
        // const tagName = tagData.tagName;
        // const type = tagName.match(reg)[0];
        // const mahjongId = tagName.replace(type + ":", "");
        const reg = /^([acf]):(\d{3})$/i; 
        const match = tagData.tagName.match(reg); 
        const type = match ? match[1] : ""; 
        const mahjongId = match ? match[2] : ""; 
        let url: string = "";
        const mahjongNum = parseInt(mahjongId,10)
        let isValid = true;
        if(type === "a" && !(mahjongNum>=1 && mahjongNum<=16)){
            isValid = false;
        }
        if(type === "c" && !(mahjongNum === 3 || mahjongNum === 18 || mahjongNum === 19 || mahjongNum === 46 || mahjongNum === 49 || mahjongNum === 59 || mahjongNum === 96 || mahjongNum === 134 || mahjongNum === 189 || mahjongNum === 217)){
            isValid = false;
        }

        if(type === "f" && !(mahjongNum>=1 && mahjongNum<=208)){
            isValid = false;
        }
        if(!isValid) {
            console.warn(`Invalid mahjongId: ${mahjongId}`); // 如果mahjongId不在范围内，打印警告
            return <>{"["+tagData.tagName+"]"}</>; // 返回原始内容
        }

        switch (type) {
            case "a": url = this.getAnimalUrl(mahjongId); break
            case "c": url = this.getCartoonUrl(mahjongId); break
            case "f": url = this.getFaceUrl(mahjongId); break
        }

        return <div style={{ display: "inline" }}>
            <img src={url} alt="" />{innerContent}
        </div>;
    }
}
