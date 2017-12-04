// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';

/*
 *导航器组件所用的props
 */
interface CategoryProps {
    names: string[];
    urls: string[];
}

/*
 *导航器组件所用的state
 */
interface CategoryState {
}

/*
 *部分页面用到的导航器组件
 */
export class Category extends React.Component<CategoryProps, CategoryState>{
    constructor(props) {
        super(props);
        this.state = ({});
    }

    convertLevels(s) {
        const levels = this.props.names.length;
        for (let i = 0; i < levels; i++) {
            return <div>
                <i className="fa fa-chevron-right"></i>
                <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} href={this.props.urls[i]}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15rem", whiteSpace: "nowrap" }}>{this.props.names[i]}</div>
                </a>
            </div>
        }
    }

    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <a style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} href="/">首页</a>
            {this.convertLevels}
        </div>;
    }
}

export class Test extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({});
    }
    atHanderler(content: string) {
        const reg = new RegExp("@.+[ /n]", "gm")
        let ats: string[] = new Array();
        for (let i = 0; i < 10; i++) {
            ats.push(reg.exec(content).toString());
        }
        for (let i = 0; i <= 10; i++) {
            console.log(ats[i]);
        }
    }
}