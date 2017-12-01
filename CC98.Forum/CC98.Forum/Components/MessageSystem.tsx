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
        if (data && data != []) {
            //先看一下有没有缓存的数据，如果有的话新数据跟缓存数据组合一下
            let oldData = Utility.getLocalStorage("SystemMessage");
            if (oldData) {
                for (var i = 0; i < data.length; i++) {
                    //最新的20条数据跟之前的有重合就组合起来
                    if (data[i].id == oldData[0].id) {
                        data = data.slice(0, i).concat(oldData);
                        break;
                    }
                }
            }
            //缓存获取到的数据                      
            Utility.setLocalStorage("SystemMessage", data);
            this.setState({ data: data, from: data.length });
        }

        //滚动条监听
        //document.addEventListener('scroll', this.handleScroll);
    }

    /**
     * 移除DOM时，为滚动条移除监听事件
     */
    /*async componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * 处理滚动的函数
     */
    /*async handleScroll() {
        if (Utility.isBottom() && this.state.loading) {
            //发出第一条fetch请求前将this.state.loading设置为false，防止后面重复发送fetch请求
            this.setState({ loading: false });
            try {
                var newData = await Utility.getMessageSystem(this.state.from, this.context.router);
            } catch (err) {
                //如果出错，直接结束这次请求，同时将this.state.loading设置为true，后续才可以再次发送fetch请求
                this.setState({ loading: true });
                return;
            }
            //如果正确获取到数据，则添加新数据，翻页+1，同时this.state.loading设置为true，后续才可以再次发送fetch请求
            if (newData && newData != []) {
                let data = this.state.data.concat(newData);
                this.setState({ data: data, from: data.length, loading: true });
                Utility.setLocalStorage("SystemMessage", data);
            }
        }
    }*/

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
