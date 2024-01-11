// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

export class MessageResponseProps {
    //通知Id
    id: number;
    //Type通知类型（0 = 全站系统通知，1 = 个人系统通知）
    type: number;
    //（int?类型， 有值表示这个通知超链接到具体的某个帖，null表示不连接），
    topicId: number;
    //帖子标题
    topicTitle: string;
    //回复楼层
    floor: number;
    //回复者id
    userId: number;
    //回复者姓名
    userName: string;
    //版面id
    boardId: number;
    //版面名称
    boardName: string;
    //时间
    time: Date;
    //是否已读
    isRead: boolean;
}