import { MessageType } from "../Components/Common/MessageBar";
import MessageBarTagHandlerBase, { IMessageSetting } from "./MessageBarTagHandlerBase";

/**
 * 显示“仅发帖用户可见”功能的相关提示消息。
 */
export class PosterOnlyTagHanlder extends MessageBarTagHandlerBase{
    supportedTagNames: string = 'posteronly';
    messageSettings: IMessageSetting[] = [{
        message: '该主题启用了“仅发帖用户可见”功能。只有发帖者可以看到其他人的发言。',
        messageType: MessageType.Warning
    }, {
        message: '该主题启用了“仅发帖用户可见”功能，您是发帖者因此可以看到其他人的发言。',
        messageType: MessageType.Info,
    },{ 
        message: '该主题启用了“仅发帖用户可见”功能，您可以看到发帖者的发言。',
        messageType: MessageType.Info,
    }, {
        message: '该主题启用了“仅发帖用户可见”功能，但您可以看到自己的发言。',
        messageType: MessageType.Info
    }]
}