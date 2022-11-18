// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';
import { MessageBar, MessageType } from '../Components/Common/MessageBar';

/**
 * 定义要显示的消息内容和样式、
 */
export interface IMessageSetting {
    /**
     * 消息内容。
     */
    readonly message: string;
    /**
     * 消息样式。
     */
    readonly messageType?: MessageType;
}

/**
 * 为所有生成消息框的标签提供抽象基础类型。
 */
export default abstract class MessageBarTagHandlerBase extends Ubb.RecursiveTagHandler {

    /**
     * 在派生类中重写时，用于返回支持的标签名称。
     */
    abstract readonly supportedTagNames: string;
    /**
     * 在派生类中重写时，用于返回支持的消息内容的集合。
     */
    abstract readonly messageSettings: IMessageSetting[];

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty;
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        if (!this.messageSettings) {
            throw new Error(`没有为标签 ${tagData.tagName} 配置必要的消息信息。`);
        }

        let messageIndex = parseInt(tagData.mainValue);

        // 解析失败则使用默认样式
        if (isNaN(messageIndex)) {
            messageIndex = 0;
        }
      
        if (messageIndex >=  this.messageSettings.length || messageIndex < 0) {
            throw new Error(`标签 ${tagData.tagName} 配置的消息参数 ${messageIndex} 无效，该标签最多支持 ${this.messageSettings.length} 种消息模式。`);
        }

        // 实际使用的消息样式
        const actualMessageSetting = this.messageSettings[messageIndex];

        return <MessageBar message={actualMessageSetting.message} messageType={actualMessageSetting.messageType} />
    }
}