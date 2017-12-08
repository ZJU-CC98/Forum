// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageSystemState } from '../States/MessageSystemState';
import { MessageSystemProps } from '../Props/MessageSystemProps';
import { MessageSystembox } from './MessageSystembox';
import * as Utility from '../Utility';
import { Pager } from './Pager';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
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
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#system').addClass('message-nav-focus');
        let totalCount = await Utility.getTotalPage(3);
        let index: any = totalCount / 7;
        let totalPage = parseInt(index)+1;
        let curPage = props.match.params.page - 1;
        if (!curPage || curPage < 0) {
            curPage = 0;
        }
        let data = await Utility.getMessageSystem(curPage * 7, 7, this.context.router);
        console.log("这是获取到的处理后系统消息");
        console.log(data);
        if (data) {
            this.setState({ data: data, from: curPage + 1, totalPage: totalPage });
        }
    }

    async componentDidMount() {
        this.getData(this.props);
    }

    async componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    coverMessageSystem = (item: MessageSystemProps) => {
        return <MessageSystembox id={item.id} type={item.type} title={item.title} content={item.content} time={item.time} topicId={item.topicId} floor={item.floor} isRead={item.isRead} />;
    };

    render() {
        return (<div className="message-right">
            <div className="message-system">{this.state.data.map(this.coverMessageSystem)}</div>
            <div className="message-pager"><Pager url="/message/system/" page={this.state.from} totalPage={this.state.totalPage} /></div>
        </div>);
    }
}
