// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessagePersonInfo } from '../Props/MessagePersonInfo';
import { MessageProps } from '../Props/MessageProps';
/**
*我的私信的用户列表
*/
export class MessageMessageState {
    /**
    *最新联系人数据
    */
    data: MessagePersonInfo[];
    /**
   *当前聊天用户数据
   */
    chatObj: MessagePersonInfo;
}