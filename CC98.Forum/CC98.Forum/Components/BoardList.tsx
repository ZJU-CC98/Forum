import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppState } from '../States/AppState';
import { BoardState } from '../States/AppState';
import { Board } from '../States/AppState';
import * as Utility from '../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
//链接到的地址是  /list/boardid

export class BoardList extends React.Component<{}, { thisBoardState }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            thisBoardState: [],
        }
    }

    async componentDidMount() {
        var boardNameList = [];
        let board: Board[] = [];
        if (!Utility.getStorage('board_2')) {   //缓存
            let response = await fetch("http://api.cc98.org/Board/Root");
            let data = await response.json();
            for (var i = 0; i < 20; i++) {
                board[i] = new Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
                Utility.setStorage('board_' + data[i].id.toString(), board[i]);
                boardNameList[i] = 'board_' + data[i].id.toString();
            }
            Utility.setStorage('boardList', boardNameList);
        } else {
            for (var i = 0; i < 20; i++) {
                boardNameList = Utility.getStorage('boardList');
                board[i] = Utility.getStorage(boardNameList[i]);
            }
        }

        this.setState({
            thisBoardState: board,
        })
    }

    generateRootBoard(item: Board) {    //返回一条父版信息
        return <RootBoard board={item} />;
    }

    render() {

        return <div className="boardList">
            {this.state.thisBoardState.map(this.generateRootBoard)}
        </div>
    }
}
export class RootBoard extends React.Component<{ board }, { isExpanded: boolean }>{

    constructor(props) {
        super(props);
        let boards = this.props.board;
        if (boards.id === 2 || boards.id === 29 || boards.id === 35 || boards.id === 37) { this.state = { isExpanded: false, }; }//四个民工版默认状态为折叠
        else { this.state = { isExpanded: true, }; }//其他版默认状态为展开
        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);//JS的this是可变的，取决于调用方法的地方，bind方法用于此刻的this值
    }

    toggleIsExpanded() {     // 定义一个方法修改展开状态
        if (this.state.isExpanded) this.setState({ isExpanded: false, });
        else this.setState({ isExpanded: true, });
    }

    render() {
        let display = this.state.isExpanded ? "flex" : "none";    //根据 isExpanded 状态定义样式
        let buttonContent = this.state.isExpanded ? "-" : "+";      //根据 isExpanded 状态定义按钮内容
        let boards = this.props.board;

        if (boards.id === 758) {    //似水流年版 没有子版
            return <div className="anArea">
                <div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <div className="areaName"><a href="/list/758">{boards.name}</a></div>
                        <div className="areaName">主管：{boards.masters}</div>
                    </div>
                </div>
            </div>;
        }
        else {  //其他版
            return <div className="anArea">
                <div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <div className="areaName">{boards.name}</div>
                        <div className="areaName">主管：{boards.masters}</div>
                        <div className="hideBoard" onClick={this.toggleIsExpanded} > {buttonContent}</div>
                    </div>
                    <div className="hiddenContent" style={{ display }}> <ChildBoard boardid={boards.id} /></div>
                </div>
            </div>;
        }
    }

}
export class ChildBoard extends React.Component<{ boardid }, { thisBoardState }>{
    constructor(props) {
        super(props);
        this.state = {
            thisBoardState: []
        }
    }

    async componentDidMount() {
        let boards: Board[] = [];
        var response = await fetch(`http://api.cc98.org/Board/${this.props.boardid}/Subs`);
        var data = await response.json();
        for (let i = 0; i < data.length; i++) {
            boards[i] = new Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters)
        }
        this.setState({
            thisBoardState: boards,
        })
    }
    convertChildBoard(item: Board) {    //暂无各版面图片，以绿色背景方块替代
        return <div className="boardContent">
            <a href={`/list/${item.id}`}><div className="greenBackdrop"></div></a>
            <a href={`/list/${item.id}`}><div className="boardName2">{item.name}</div></a>
            <div className="boardInfo">今日发帖 {item.todayPostCount} / 总主题数 {item.totalPostCount}</div>
        </div>
    }
    convertNoImgChildBoard(item: Board) {
        return <div className="noImgBoardContent">
            <a href={`/list/${item.id}`}><div className="boardName2">{item.name}</div></a>
        </div>
    }
    render() {
        if (this.props.boardid === 2 || this.props.boardid === 29 || this.props.boardid === 35 || this.props.boardid === 37) {
            return <div className="areaContent" >
                {this.state.thisBoardState.map(this.convertNoImgChildBoard)}
            </div>;
        } else {
            return <div className="areaContent">
                {this.state.thisBoardState.map(this.convertChildBoard)}
            </div>;
        }
    }
}