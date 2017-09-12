// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MyMessageProps } from '../Props/MyMessageProps';

/**
*我的回复的消息列表
*/
export class MyMessageResponseState {
    data: MyMessageProps[];
}