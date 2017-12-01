// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessageSystemProps } from '../Props/MessageSystemProps';

export class MessageSystemState {
    data: MessageSystemProps[];
    from: number;
    loading: boolean;
}
