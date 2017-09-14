// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { MyMessagePersonProps } from '../Props/MyMessagePersonProps';

/**
*我的私信的用户列表
*/
export class MyMessageMessageState {
    data: MyMessagePersonProps[];
    chatName: string;
    chatPortraitUrl: string;
    myName: string;
    myPortraitUrl: string;
    token: string;
}