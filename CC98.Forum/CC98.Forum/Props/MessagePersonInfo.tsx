// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessageProps } from './MessageProps';
/**
*私信聊天时显示的单个用户信息
*/
export class MessagePersonInfo {
    /**
    *当前私信用户id
    */
    id: number;
    /**
    *当前私信用户名
    */
    name: string;
    /**
    *当前私信用户头像地址
    */
    portraitUrl: string;
    /**
    *最近消息列表
    */
    message: MessageProps[];
}