// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { FocusBoard } from '../Props/FocusBoard';
/**
 * 表示我关注的版面列表区域的State，这里充当数据源的容器
 */
export class FocusBoardAreaState {
    data: FocusBoard[];
}