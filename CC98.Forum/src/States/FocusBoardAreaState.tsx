// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { FocusBoard } from '../Props/FocusBoard';

export class FocusBoardAreaState {
    //关注版面列表数据
    data: FocusBoard[];
    currentBoardId: number;
    currentBoardName: string;
}