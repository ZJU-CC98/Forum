import { MessageType } from "../Components/Common/MessageBar";
import MessageBarTagHandlerBase, { IMessageSetting } from "./MessageBarTagHandlerBase";

/**
 * 显示“仅主题帖作者可见”功能的相关提示消息。
 */
export class PosterOnlyTagHanlder extends MessageBarTagHandlerBase {
    supportedTagNames: string = 'posteronly';
    messageSettings: IMessageSetting[] = [{
        message: '该主题启用了“仅主题帖作者可见”功能。只有主题帖作者可以看到其他人的发言。',
        messageType: MessageType.Warning
    }, {
        message: '该主题启用了“仅主题帖作者可见”功能，您是主题帖作者因此可以看到其他人的发言。',
        messageType: MessageType.Info,
    }, {
        message: '该主题启用了“仅主题帖作者可见”功能，您可以看到主题帖作者的发言。',
        messageType: MessageType.Info,
    }, {
        message: '该主题启用了“仅主题帖作者可见”功能，但您可以看到自己的发言。',
        messageType: MessageType.Info
    }]
}