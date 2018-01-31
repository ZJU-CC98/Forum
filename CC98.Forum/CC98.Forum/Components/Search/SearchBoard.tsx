// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../../Props/FocusBoard';
import * as Utility from '../../Utility';
import DocumentTitle from '../DocumentTitle';
import {
    BrowserRouter as Router,
    Route,
    Link,

    withRouter
} from 'react-router-dom';
/**
 * 表示我搜索到的版面列表区域
 */
export class SearchBoard extends React.Component {

   
    render() {
        let data = Utility.getStorage("searchBoardInfo");
        return (<div className="focus-root">
            <DocumentTitle title={`搜索结果 - CC98论坛`} />
                    <div className="focus">
                        <Category />
                        <div className="focus-board-area">
                            {data.map(coverFocusBoard)}
                        </div>
                    </div>
                </div>);
    }
}

function coverFocusBoard(item: FocusBoard) {
    //点击版面名称会显示相应版面的帖子
    let boardUrl = `/list/${item.id}`;
    return <a href={boardUrl} target="_blank"><div className="focus-board">{item.name}</div></a>;
}

export class Category extends React.Component {

    render() {
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to={"/"}>首页</Link>
            <i className="fa fa-chevron-right"></i>
            <Link style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} to={"/boardList"}>版面列表</Link>
            <i className="fa fa-chevron-right"></i>
            <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>搜索版面</div>
        </div>;
    }
}
