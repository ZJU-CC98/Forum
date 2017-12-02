// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseState } from '../States/MessageResponseState';
import { MessageResponseProps } from '../Props/MessageResponseProps';
import { MessageResponsebox } from './MessageResponsebox';
import * as Utility from '../Utility';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageResponse extends React.Component<{}, MessageResponseState> {

    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            from: 0,
            loading: true
        };
    }

    async componentDidMount() {
        let data = await Utility.getMessageResponse(0, this.context.router);
        if (data) {
            this.setState({ data: data, from: data.length });
        }
    }
    
    coverMessageResponse = (item: MessageResponseProps) => {
        return <MessageResponsebox id={item.id} type={item.type} time={item.time} topicId={item.topicId} topicTitle={item.topicTitle} postId={item.postId} boardId={item.boardId} boardName={item.boardName} isRead={item.isRead} />;
    };

	render() {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#response').addClass('message-nav-focus');
        return <div className="message-response">{this.state.data.map(this.coverMessageResponse)}</div>;
    }
}