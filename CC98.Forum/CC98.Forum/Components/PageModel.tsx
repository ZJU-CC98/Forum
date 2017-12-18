import * as React from "react";
import { Link } from "react-router-dom";

export class PageModel extends React.Component<{ url: string, pageNumber: number, curPage: number, totalPage: number }, {}> {
    cancelFocus(e) {
        const ele = e.target;
        ele.blur();
    }
    render() {
        let pageUrl: string;
        if (this.props.pageNumber > 0) {
            pageUrl = `${this.props.url}${this.props.pageNumber}#1`;
            if (this.props.pageNumber !== this.props.curPage) {
                return <li className="page-item" ><Link to={pageUrl} className="page-link" onClick={this.cancelFocus}>{this.props.pageNumber}</Link></li>
                    ;
            } else {
                return <li className="page-item active"><Link to={pageUrl} onClick={this.cancelFocus} className="page-link " >{this.props
                    .pageNumber}</Link></li>
                    ;
            }
        } else if (this.props.pageNumber == -1) {
            pageUrl = `${this.props.url}${this.props.curPage - 1}#1`;
            return <li className="page-item"><Link onClick={this.cancelFocus} className="page-link" to={pageUrl}>&lsaquo;</Link></li>
                ;
        } else if (this.props.pageNumber == -2) {
            pageUrl = `${this.props.url}${this.props.curPage + 1}#1`;
            return <li className="page-item"><Link onClick={this.cancelFocus} className="page-link" to={pageUrl}>&rsaquo;</Link></li>
                ;
        }
        else if (this.props.pageNumber == -3) {
            pageUrl = `${this.props.url}1#1`;
            return <li className="page-item"> <Link onClick={this.cancelFocus} className="page-link" to={pageUrl}>&laquo;</Link></li>
                ;
        }
        else if (this.props.pageNumber == -4) {
            pageUrl = `${this.props.url}${this.props.totalPage}#1`;
            return <li className="page-item"><Link onClick={this.cancelFocus} className="page-link" to={pageUrl}>&raquo;</Link></li>
                ;
        }
        else {
            return null;
        }
    }
}