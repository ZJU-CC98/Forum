// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseState } from '../States/MessageResponseState';
import { MessageResponseProps } from '../Props/MessageResponseProps';
import { MessageResponsebox } from './MessageResponsebox';
import * as Utility from '../Utility';
import { MessagePager } from './MessagePager';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageResponse extends React.Component<{match}, MessageResponseState> {

    
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            from: 0,
            loading: true,
            totalPage: 1
        };
    }

    async getData(props) {
        //给我的回复添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#response').addClass('message-nav-focus');
        let totalCount = await Utility.getTotalPage(1);
        let index: any = totalCount / 7;
        let totalPage = parseInt(index) + 1;
        let curPage = props.match.params.page - 1;
        if (!curPage || curPage < 0) {
            curPage = 0;
        }
        let data = await Utility.getMessageResponse(curPage * 7, 7, this.context.router);
        console.log("获取到了回复消息", data);
        if (data) {
            this.setState({ data: data, from: curPage+1, totalPage: totalPage });
        }
    }

    async componentDidMount() {
        this.getData(this.props);
    }

    async componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }
    
    coverMessageResponse = (item: MessageResponseProps) => {
        return <MessageResponsebox id={item.id} type={item.type} time={item.time} topicId={item.topicId} topicTitle={item.topicTitle} floor={item.floor} userId={item.userId} userName={item.userName} boardId={item.boardId} boardName={item.boardName} isRead={item.isRead} />;
    };

    render() {
        return (<div className="message-right">
            <div className="message-response">{this.state.data.map(this.coverMessageResponse)}</div>
            <div className="message-pager"><MessagePager url="/message/response/" page={this.state.from} totalPage={this.state.totalPage} /></div>
                </div>);
    }
}