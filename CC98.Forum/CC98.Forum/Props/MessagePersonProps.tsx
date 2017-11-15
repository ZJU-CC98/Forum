// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/**
*私信聊天时显示的单个用户信息
*/
export class MessagePersonProps {
    /**
    *用户名
    */
    name: string;
    /**
    *用户头像地址
    */
    portraitUrl: string;
    /**
    *最近一条消息标题
    */
    title: string;
    /**
    *最近一条消息内容
    */
    content: string;
}