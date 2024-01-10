// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

export class PageModelProps {
    //当前要被渲染的页码
    pageNumber: number;
    //消息类型，回复，@和系统
    messageType: string;
    //当前页码
    curPage: number;
    //总页码
    totalPage: number;
}