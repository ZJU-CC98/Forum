// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../Props/FocusBoard';
import { FocusBoardProps } from '../Props/FocusBoardProps';
import { FocusBoardAreaState } from '../States/FocusBoardAreaState';
import { FocusBoardSingle } from './FocusBoardSingle';
/**
 * 表示我关注的版面列表区域
 */
export class FocusBoardArea extends React.Component<FocusBoardProps> {

    /**
     * 将我关注的版面排列好
     */
    render() {
        return <div className="focus-board-area">{this.props.data.map(coverFocusBoard)}</div>;
    }
}

function coverFocusBoard(item: FocusBoard) {
    return <FocusBoardSingle id={item.id} name={item.name} />;
}
