// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { FocusPost } from '../Props/FocusPost';
/**
 * 表示我关注的版面列表区域的State，这里充当数据源的容器
 */
export class FocusPostAreaState {
    data: FocusPost[];
    curPage: number;
    loading: boolean; 
}