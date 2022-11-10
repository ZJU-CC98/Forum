import { MessageType } from "../Components/Common/MessageBar";
import MessageBarTagHandlerBase, { IMessageSetting } from "./MessageBarTagHandlerBase";

/**
 * 显示“仅特定用户可见”功能的相关提示消息。
 */
export class AllowViewerTagHanlder extends MessageBarTagHandlerBase{
    supportedTagNames: string = 'allowviewer';
    messageSettings: IMessageSetting[] = [{
        message: '该主题启用了“仅特定用户可见”功能。您不在该内容的可见用户列表中。',
        messageType: MessageType.Warning
    }, {
        message: '该主题启用了“仅发帖用户可见”功能，您在该内容的可见用户列表中。',
        messageType: MessageType.Info,
    },{ 
        message: '该主题启用了“仅发帖用户可见”功能，但您始终可以看到自己的发言。',
        messageType: MessageType.Info,
    }]
}