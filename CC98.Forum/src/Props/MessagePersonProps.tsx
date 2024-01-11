// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessagePersonInfo } from './MessagePersonInfo';
/**
*私信聊天时显示的单个用户信息
*/
export class MessagePersonProps {
    data: MessagePersonInfo;
}