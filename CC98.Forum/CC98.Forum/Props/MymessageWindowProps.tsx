// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/**
 * 聊天窗口的状态信息，我和对方的用户名及头像
 */
export class MyMessageWindowProps {
    chatName: string;
    chatPortraitUrl: string;
    myName: string;
    myPortraitUrl: string;
    token: string;
}