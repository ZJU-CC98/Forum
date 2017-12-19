// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

export default class MahjongTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /[acf]:/i;
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    getAnimalUrl(mahjongId: string) {
        return `/images/mahjong/animal2017/${mahjongId}.png`
    }

    getCartoonUrl(mahjongId: string) {
        switch (mahjongId) {
            case "018": case "049": case "096": return `/images/mahjong/carton2017/${mahjongId}.gif`;
            default: return `/images/mahjong/carton2017/${mahjongId}.png`
        }
    }

    getFaceUrl(mahjongId: string) {
        switch (mahjongId) {
            case "004": case "009": case "056": case "061": case "062": case "087": case "115": case "120": case "137": case "168": case "169": case "175": case "206": return `/images/mahjong/face2017/${mahjongId}.gif`
            default: return `/images/mahjong/face2017/${mahjongId}.png`
        }
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const reg = /[acf]/g;
        const tagName = tagData.tagName;
        const type = tagName.match(reg)[0];
        const mahjongId = tagName.replace(type + ":", "");
        let url: string = "";

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
