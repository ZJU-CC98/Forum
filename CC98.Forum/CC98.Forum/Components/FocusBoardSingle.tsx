// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../Props/FocusBoard';

/**
 * 我关注的版面（单个版面的样式）
 */
export class FocusBoardSingle extends React.Component<FocusBoard>{

    render() {

        //点击版面名称会进入相应版面
        let boardUrl = `/list/${this.props.id}`;
        return <a href={boardUrl}><div className="focus-board">{this.props.name}</div></a>;
    }
}