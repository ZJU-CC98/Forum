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
export class SearchBoard extends React.Component<{}, {data}> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async getData() {
        let keyword = location.href.match(/\/searchBoard\?keyword=(.*)/);
        let searchBoardInfo = [];
        if (!keyword) {
            this.showNoResult();
        }
        else {
            let keyword1 = decodeURI(decodeURI(keyword[1]));
            searchBoardInfo = await Utility.getSearchBoard(keyword1, this.context.router);
            if (!searchBoardInfo) {
                this.showNoResult();
            }
            else {
                this.setState({ data: searchBoardInfo });
            }
        }
    }
    
    async componentDidMount() {
        this.getData();
    }

    async componentWillReceiveProps(nextProps) {
        this.getData();
    }

    showNoResult() {
        $('#noResultBoard').removeClass('displaynone');
    }

   
    render() {
        return (<div className="focus-root">
            <DocumentTitle title={`搜索结果 - CC98论坛`} />
                    <div className="focus">
                        <Category />
                <div className="focus-board-area">
                    {this.state.data.map(coverFocusBoard)}
                        </div>
            </div>
            <div id="noResultBoard" className="noResult displaynone">
                <img src="/static/images/searchNone.png" className="noResultPic"></img>
                <div className="noResultText">-----------------------抱歉呢前辈，没有找到你想要的版面哦~----------------------</div>
            </div>
                </div>);
    }
}

function coverFocusBoard(item: FocusBoard) {
    //点击版面名称会进入相应的版面
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
