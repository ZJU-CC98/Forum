import * as React from 'react';
import * as Utility from '../Utility';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { MessagePagerProps } from '../Props/MessagePagerProps';
import { MessagePagerState } from '../States/MessagePagerState';
import { PageModelProps } from '../Props/PageModelProps';

export class MessagePager extends React.Component<MessagePagerProps, MessagePagerState> {
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
        return <PageModel pageNumber={pageNumber} messageType={this.props.messageType} curPage={this.props.page} totalPage={this.props.totalPage} />;
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
        return <div id="messagePager" >
            <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
        </div>;
    }
}

export class PageModel extends React.Component<PageModelProps> {

    render() {
        let pageUrl: string;
        if (this.props.pageNumber > 0) {
            pageUrl = `/message/${this.props.messageType}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;
            } else {
                return <li className="page-item active"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;

            }

        } else if (this.props.pageNumber == -1) {
            pageUrl = `/message/${this.props.messageType}/${this.props.curPage - 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            pageUrl = `/message/${this.props.messageType}/${this.props.curPage + 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -3) {
            pageUrl = `/message/${this.props.messageType}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;&lsaquo;</Link></li>
                ;
        } else {
            pageUrl = `/message/${this.props.messageType}/${this.props.totalPage}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;&rsaquo;</Link></li>;
        }
    }
}