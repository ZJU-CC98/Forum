// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { FocusTopic } from '../Props/FocusTopic';

export class SearchState {
    boardId: number;
    boardName: string;
    words: string[];
    data: FocusTopic[];
    from: number;
    //buttonClassName: string;
}