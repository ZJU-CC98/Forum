// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/**
 * 一条站短消息
 */
export class MymessageProps {
    /**
    * 消息的标识
    */
    id: number;
    /**
    * 消息的发送者的用户名。如果是系统消息，则该属性为 null
    */
    senderName: string;
    /**
    * 消息的接收者的用户名
    */
    receiverName: string;
    /**
    * 消息的标题
    */
    title: string;
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
    sendTime: Date;
    /**
   * 正在聊天者的头像的图片地址
   */
    chatPortraitUrl: string;
    /**
    * 我的头像的图片地址
    */
    myPortraitUrl: string;
}
