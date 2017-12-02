// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSystemState } from '../States/MessageSystemState';
import { MessageSystemProps } from '../Props/MessageSystemProps';
import { MessageSystembox } from './MessageSystembox';
import * as Utility from '../Utility';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageSystem extends React.Component<{}, MessageSystemState> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            from: 0,
            loading: true
        };
    }

    async componentWillMount() {
        let data = await Utility.getMessageSystem(0, this.context.router);
        if (data) {
            this.setState({ data: data, from: data.length });
        }
    }
    
    coverMessageSystem = (item: MessageSystemProps) => {
        return <MessageSystembox id={item.id} type={item.type} title={item.title} content={item.content} time={item.time} topicId={item.topicId} postId={item.postId} isRead={item.isRead} />;
    };

    render() {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#system').addClass('message-nav-focus');
        return <div className="message-system">{this.state.data.map(this.coverMessageSystem)}</div>;
    }
}
