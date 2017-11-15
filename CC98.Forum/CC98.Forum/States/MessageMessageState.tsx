// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MessagePersonProps } from '../Props/MessagePersonProps';

/**
*我的私信的用户列表
*/
export class MessageMessageState {
    data: MessagePersonProps[];
    chatName: string;
    chatPortraitUrl: string;
    myName: string;
    myPortraitUrl: string;
    token: string;
}