// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

export class MessageSystemProps {
    //通知Id
    id: number;
    //Type通知类型（0 = 全站系统通知，1 = 个人系统通知）
    type: number;
    //标题
    title: string;
    //内容
    content: string;
    //（int?类型， 有值表示这个通知超链接到具体的某个帖，null表示不连接），
    topicId: number;
    //回复楼层
    floor: number;
    //时间
    time: Date;
    //是否已读
    isRead: boolean;
}