// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export class UserCenterPageCount extends React.Component<UserCenterPageCountProps> {
    render() {
        let elements = [], i;
        const currentStyle = {
            backgroundColor: '#ccc',
            cursor: 'default'
        };

        if (this.props.totalPage <= 7) {
            i = this.props.totalPage;
            while (i--) {
                elements.unshift(i + 1);
            }
            elements = elements.map((item, index) => {
                return <li><a href={`${this.props.href}${item}`}><button type="button" disabled={item == this.props.currentPage} style={(item == this.props.currentPage) ? currentStyle : {}}>{item}</button></a></li>
            });
        } else if (this.props.currentPage - 1 <= 3) {
            i = 7;
            while (i--) {
                elements.unshift(i + 1);
            }
            elements = elements.map((item, index) => (
                <li><a href={`${this.props.href}${item}`}><button type="button" disabled={item == this.props.currentPage} style={(item == this.props.currentPage) ? currentStyle : {}}>{item}</button></a></li>
            ));

            elements.push(<li><button disabled>···</button></li>);
            elements.push(<li><a href={`${this.props.href}${this.props.totalPage}`}><button type="button">{this.props.totalPage}</button></a></li>);
        } else if (this.props.totalPage - this.props.currentPage <= 3) {
            i = 7;
            while (i--) {
                elements.unshift(i - 6 + this.props.totalPage);
            }
            elements = elements.map((item, index) => (
                <li><a href={`${this.props.href}${item}`}><button type="button" disabled={item == this.props.currentPage} style={(item == this.props.currentPage) ? currentStyle : {}}>{item}</button></a></li>
            ));

            elements.unshift(<li><button disabled>···</button></li>);
            elements.unshift(<li><a href={`${this.props.href}1`}><button type="button">{1}</button></a></li>);
        } else {
            i = 7;
            while (i--) {
                elements.unshift(i - 3 + this.props.currentPage);
            }

            elements = elements.map((item, index) => (
                <li><a href={`${this.props.href}${item}`}><button type="button" disabled={item == this.props.currentPage} style={(item == this.props.currentPage) ? currentStyle : {}}>{item}</button></a></li>
            ));

            elements.push(<li><button disabled>···</button></li>);
            elements.push(<li><a href={`${this.props.href}${this.props.totalPage}`}><button type="button">{this.props.totalPage}</button></a></li>);
            elements.unshift(<li><button disabled>···</button></li>);
            elements.unshift(<li><a href={`${this.props.href}1`}><button type="button">{1}</button></a></li>);
        }

        return (<div id="userCenterPageCount"><ul>
            {elements}
        </ul></div>);
    }
}

class UserCenterPageCountProps {
    currentPage: number;
    totalPage: number;
    href: string;
}