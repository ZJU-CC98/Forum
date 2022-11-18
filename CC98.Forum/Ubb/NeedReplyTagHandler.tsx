// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { MessageType } from '../Components/Common/MessageBar';
import MessageBarTagHandlerBase, { IMessageSetting } from './MessageBarTagHandlerBase';

export default class NeedReplyTagHandler extends MessageBarTagHandlerBase {
    supportedTagNames: string = 'needreply';
    messageSettings: IMessageSetting[] = [{
            message: '该内容需要回复后才能浏览',
            messageType: MessageType.Warning,
        }
    ]
}