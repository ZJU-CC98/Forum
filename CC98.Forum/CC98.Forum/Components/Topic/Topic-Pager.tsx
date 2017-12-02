import * as React from 'react';
import * as Utility from '../../Utility';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
export class TopicPager extends React.Component<{ page, topicid, totalPage }, { pager }> {
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
        return <PageModel pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
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
export class TopicPagerDown extends React.Component<{ page, topicid, totalPage }, { pager }> {
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

        return <PageModel pageNumber={pageNumber} topicid={this.props.topicid} curPage={this.props.page} totalPage={this.props.totalPage} />;
    }
    async componentWillReceiveProps(newProps) {
        const pages = Utility.getPager(newProps.page, newProps.totalPage);
        this.setState({ pager: pages });
    }
    async componentDidMount() {
        const pages = Utility.getPager(this.props.page, this.props.totalPage);
        this.setState({ pager: pages });
    } t
    render() {
        return <div className="row" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div id="pager" >
                <div className="row pagination">{this.state.pager.map(this.generatePageLink.bind(this))}</div>
            </div>
        </div>;
    }
}
export class PageModel extends React.Component<{ pageNumber, topicid, curPage, totalPage }, {}> {

    render() {
        let pageUrl: string;
        if (this.props.pageNumber > 0) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.pageNumber}`;
            if (this.props.pageNumber != this.props.curPage) {
                return <li className="page-item"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;
            } else {
                return <li className="page-item active"><Link className="page-link" to={pageUrl}>{this.props.pageNumber}</Link></li>;

            }

        } else if (this.props.pageNumber == -1) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.curPage - 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            pageUrl = `/topic/${this.props.topicid}/${this.props.curPage + 1}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -3) {
            pageUrl = `/topic/${this.props.topicid}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&lsaquo;&lsaquo;</Link></li>
                ;
        } else {
            pageUrl = `/topic/${this.props.topicid}/${this.props.totalPage}`;

            return <li className="page-item"><Link className="page-link" to={pageUrl}>&rsaquo;&rsaquo;</Link></li>
                ;
        }
    }
}