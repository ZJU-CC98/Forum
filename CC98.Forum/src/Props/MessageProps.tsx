// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/**
 * 一条站短消息
 */
export class MessageProps {
    /**
    * 消息的标识
    */
    id: number;
    /**
    * 消息的发送者的id
    */
    senderId: number;
    /**
    * 消息的接收者的id
    */
    receiverId: number;
    /**
    * 消息的正文
    */
    content: string;
    /**
    *消息是否已经被阅读。true 表示消息已经阅读，false 表示消息尚未阅读
    */
    isRead: boolean;
    /**
    * 消息的发送时间
    */
    time: Date;
    /**
    * 是否显示发送时间
    */
    showTime: boolean;
}
