import { ReactElement } from 'react';
import * as React from 'react';
import store from '../Store';
import { push } from 'react-router-redux';
import {} from 'historyjs'

interface Props {
    /**
     * 要显示的标题内容
     */
    title: string;
}

/**
 * 修改文档标题组件
 */
export default class extends React.Component<Props> {
    /**
     * 初始化时根据props中的title修改标题
     */
    componentDidMount() {
        const title = this.props.title || 'CC98论坛';
        document.title = title;
    }

    /**
     * props中标题改变时，根据nextProps中的title修改标题
     * @param nextProps 下一个props
     */
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.title !== this.props.title) {
            const title = nextProps.title || 'CC98论坛';
            document.title = title;
        }
    }
    
    render() {
        if (this.props.children) {
            //如果标签之间有内容则显示内容
            return React.Children.only(this.props.children);
        } else {
            //没有则什么也不显示
            return null;
        }
    }
}