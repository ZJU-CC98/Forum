// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../Props/FocusBoard';
import { FocusBoardAreaState } from '../States/FocusBoardAreaState';
import { FocusBoardSingle } from './FocusBoardSingle';
/**
 * 表示我关注的版面列表区域
 */
export class FocusBoardArea extends React.Component<{}, FocusBoardAreaState> {
    /**
     * 构造函数，同时构造假的版面列表数据
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [{ id:100, name: '校园信息' }, { id:459, name: '实习兼职' }, { id:135, name: '开怀一笑' }, { id:758, name: '似水流年' }]
        };
    }
    /**
     * 将我关注的版面排列好
     */
    render() {
        return <div className="focus-board-area">{this.state.data.map(coverFocusBoard)}</div>;
    }
}

function coverFocusBoard(item: FocusBoard) {
    return <FocusBoardSingle id={item.id} name={item.name} />;
}
