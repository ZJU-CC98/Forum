// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as Utility from '../Utility';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { PageModel } from './PageModel';

export class MessagePager extends React.Component<{ page, url, totalPage }, { pager }> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pager: [1, 2, 3, 4, 5]
        };
    }
	/**
	 * 将页码转换为 UI 界面。
	 * @param pageNumber 要转换的页码。
	 * @returns {JSX.Element} 页码对应的 UI 元素。
	 */
    generatePageLink(pageNumber: number) {
        return <PageModel pageNumber={pageNumber} url={this.props.url} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    }
    render() {
        return <div id="pager" >
            <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
        </div>
            ;
    }
}