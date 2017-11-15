// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { FocusBoard } from './FocusBoard';

export class FocusBoardProps {
    //关注版面列表数据
    data: FocusBoard[];
}