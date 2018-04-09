// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseState } from '../../States/MessageResponseState';
import { MessageResponseProps } from '../../Props/MessageResponseProps';
import { MessageResponsebox } from './MessageResponsebox';
import * as Utility from '../../Utility';
import { Pager } from '../Pager';
import DocumentTitle from '../DocumentTitle';

/**
 * 回复我的消息
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
        const num = 10;
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#response').addClass('message-nav-focus');
        let totalCount = await Utility.getTotalPage(1);
        let index: any = (totalCount-0.5) / num;
        let totalPage = parseInt(index) + 1;
        let curPage = props.match.params.page - 1;
        if (!curPage || curPage < 0) {
            curPage = 0;
        }
        let data = await Utility.getMessageResponse(curPage * num, num, this.context.router);
        if (data) {
            this.setState({ data: data, from: curPage+1, totalPage: totalPage });
        }
        //如果是第一页数据的话就存一下缓存
        if (curPage == 0) {
            let responseState = { data: data, from: curPage + 1, totalPage: totalPage };
            Utility.setStorage("responseState", responseState);
        }
        //更新消息数量
        await Utility.refreshUnReadCount();
    }

    async componentDidMount() {
        //如果没有新消息而且第一页有缓存就用缓存数据
        let unreadCount = Utility.getStorage("unreadCount");
        let responseState = Utility.getStorage("responseState");
        if (unreadCount.replyCount === 0 && responseState) {
            this.setState(responseState);
        }
        else {
            this.getData(this.props);
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }
    
    coverMessageResponse = (item: MessageResponseProps) => {
        return <MessageResponsebox id={item.id} type={item.type} time={item.time} topicId={item.topicId} topicTitle={item.topicTitle} floor={item.floor} userId={item.userId} userName={item.userName} boardId={item.boardId} boardName={item.boardName} isRead={item.isRead} />;
    };

    render() {
        return (<div className="message-right">
            <DocumentTitle title={`回复我的-CC98论坛`} />
            <div className="message-response">{this.state.data.map(this.coverMessageResponse)}</div>
            <div className="message-pager"><Pager url="/message/response/" page={this.state.from} totalPage={this.state.totalPage} /></div>
                </div>);
    }
}