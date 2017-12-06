// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseState } from '../States/MessageResponseState';
import { MessageResponseProps } from '../Props/MessageResponseProps';
import { MessageAttmebox } from './MessageAttmebox';
import * as Utility from '../Utility';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageAttme extends React.Component<{match}, MessageResponseState> {

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
        //给@我的添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#attme').addClass('message-nav-focus');
        let totalCount = await Utility.getTotalPage(2);
        let index: any = totalCount / 7;
        let totalPage = parseInt(index);
        let curPage = props.match.params.page - 1;
        if (!curPage) {
            curPage = 0;
        }
        let data = await Utility.getMessageAttme(curPage * 7, 7, this.context.router);
        console.log("显示获取到的@消息", data);
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

    coverMessageAttme = (item: MessageResponseProps) => {
        return <MessageAttmebox id={item.id} type={item.type} time={item.time} topicId={item.topicId} topicTitle={item.topicTitle} floor={item.floor} userId={item.userId} userName={item.userName} boardId={item.boardId} boardName={item.boardName} isRead={item.isRead} />;
    };

	render() {
        return (<div className="message-right">
                    <div className="message-response">{this.state.data.map(this.coverMessageAttme)}</div>
                    <div className="message-pager"></div>
                </div>);
    }
}
