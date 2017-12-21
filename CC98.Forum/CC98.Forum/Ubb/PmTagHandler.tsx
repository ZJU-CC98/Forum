// /message/message ? name = Dearkano

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export class PmTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): string { return 'pm' };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const pmUserName = tagData.value(0);    //要私信的用户昵称
        const url = `/message/message?name=${pmUserName}`;
        return <Link to={url}>{innerContent}</Link>
    }
}