// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/**
*表示消息翻页器的props
*/
export class MessagePagerProps {
    //当前页码
    page: number;
    //消息类型，回复，@，系统
    messageType: string;
    //总页码
    totalPage: number;
}
