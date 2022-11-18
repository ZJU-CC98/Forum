import * as React from 'react';

/**
 * 定义组件需要使用的数据接口。
 */
interface IProps {
    /**
     * 要显示的组件消息。
     */
    message: string;
    /**
     * 消息的类型。
     */
    messageType? : MessageType;
}

/**
 * 定义消息的类型。
 */
export enum MessageType {
    /**
     * 提示性消息。
     */
    Info,
    /**
     * 表示操作成功或者状态正确的消息。
     */
    Success,
    /**
     * 表示警告的消息。
     */
    Warning,
    /**
     * 表示发生错误的消息。
     */
    Error,
}

/**
 * 显示一条具有特定样式的消息提示。
 */
export class MessageBar extends React.Component<IProps> {
    render() {
        
        let wrapperStyle: React.CSSProperties;
        
        switch (this.props.messageType) {
            default:
                wrapperStyle = {
                    backgroundColor: '#F5FAFF',
                    border: '1px solid rgb(204,204,204)',
                    padding: '10px 17px',
                    color: 'red',
                    margin: '6px 0'
                };
                break;
        }
       
        return <div>
            <hr />
            <div style={wrapperStyle}>{this.props.message}</div>
            <hr />
        </div>;
    }
}