// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessageResponseProps } from '../Props/MessageResponseProps';

export class MessageResponseState {
    data: MessageResponseProps[];
    from: number;
    loading: boolean;
    totalPage: number;
}
