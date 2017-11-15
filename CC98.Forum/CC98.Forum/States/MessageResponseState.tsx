// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessageProps } from '../Props/MessageProps';

/**
*我的回复的消息列表
*/
export class MessageResponseState {
    data: MessageProps[];
}