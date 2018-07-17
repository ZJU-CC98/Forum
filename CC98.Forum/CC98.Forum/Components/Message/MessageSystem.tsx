// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSystemState } from '../../States/MessageSystemState';
import { MessageSystemProps } from '../../Props/MessageSystemProps';
import { MessageSystembox } from './MessageSystembox';
import * as Utility from '../../Utility';
import { Pager } from '../Pager';
import DocumentTitle from '../DocumentTitle';
import Store from '../../Store';

/**
 * 系统消息
 */
export class MessageSystem extends React.Component<{}, MessageSystemState> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            from: 0,
            loading: true,
            totalPage: 1
        };
    }

    async getData(props) {
        //给系统消息添加选中样式
        const num = 10;
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#system').addClass('message-nav-focus');
        let totalCount = await Utility.getTotalPage(3);
        let index: any = (totalCount-0.5) / num;
        let totalPage = parseInt(index)+1;
        let curPage = props.match.params.page - 1;
        if (!curPage || curPage < 0) {
            curPage = 0;
        }
        let data = await Utility.getMessageSystem(curPage * num, num, this.context.router);
        //console.log(data);
        if (data) {
            this.setState({ data: data, from: curPage + 1, totalPage: totalPage });
        }
        //如果是第一页数据的话就存一下缓存
        if (curPage == 0) {
            let systemState = { data: data, from: curPage + 1, totalPage: totalPage };
            Utility.setStorage("systemState", systemState);
        }
    }

    async componentDidMount() {
        //如果没有新消息而且第一页有缓存就用缓存数据
        let unreadCount = Store.getState().message
        let systemState = Utility.getStorage("systemState");
        if (unreadCount.systemCount === 0 && systemState) {
            this.setState(systemState);
        }
        else {
            this.getData(this.props);
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    coverMessageSystem = (item: MessageSystemProps) => {
        return <MessageSystembox id={item.id} type={item.type} title={item.title} content={item.content} time={item.time} topicId={item.topicId} floor={item.floor} isRead={item.isRead} />;
    };

    render() {
        return (<div className="message-right">
            <DocumentTitle title={`系统通知-CC98论坛`} />
            <div className="message-system">{this.state.data.map(this.coverMessageSystem)}</div>
            <div className="message-pager"><Pager url="/message/system/" page={this.state.from} totalPage={this.state.totalPage} /></div>
        </div>);
    }
}
