import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppState } from '../States/AppState';
import { BoardState } from '../States/AppState';
import { Board } from '../States/AppState';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
//链接到的地址是  /list/boardid

export class BoardID extends React.Component<{}, { board: Board[], view1, view2, view3, view4 }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            board: [],
            view1: false, view2: false, view3: false, view4: false,
        }
    }
    async componentDidMount() {
        let response = await fetch("http://api.cc98.org/Board/Root");
        let data = await response.json();
        let board: Board[] = [];
        for (var i = 0; i < 20; i++) {
            board[i] = new Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
        }
        this.setState({
            board: board,
        })
    }
    generateRootBoard(boards: Board) {
        if (boards.id == 2) {
            if (this.state.view1 == true) {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}</div>
                        <div className="areaName">主管：{boards.masters}</div><button className="hideBoard" onClick={this.view1.bind(this)} >-</button></div>
                    <ChildBoard boardid={boards.id} />

                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            } else {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}</div>
                        <div className="areaName">主管：{boards.masters}</div><button className="viewBoard" onClick={this.view1.bind(this)}>+</button></div>
                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            }

        } else if (boards.id == 29) {
            if (this.state.view2 == true) {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="hideBoard"onClick={this.view2.bind(this)}>-</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                    <ChildBoard boardid={boards.id} />

                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            } else {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="viewBoard"onClick={this.view2.bind(this)}>+</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            }

        } else if (boards.id == 35) {
            if (this.state.view3 == true) {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="hideBoard"onClick={this.view3.bind(this)}>-</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                    <ChildBoard boardid={boards.id} />

                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            } else {

                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="viewBoard"onClick={this.view3.bind(this)}>+</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            }

        } else if (boards.id == 37) {
            if (this.state.view4 == true) {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="hideBoard" onClick={this.view4.bind(this)}>-</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                    <ChildBoard boardid={boards.id} />

                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            } else {
                return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                    <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName" >{boards.name}<button className="viewBoard"onClick={this.view4.bind(this)}>+</button></div>
                        <div className="areaName">主管：{boards.masters}</div></div>
                </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
            }

        } else if (boards.id == 758) {
            return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName"><a href="/list/758">{boards.name}</a></div>
                    <div className="areaName">主管：{boards.masters}</div></div>
            </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
        }
        else {
            return <div className="column"><div className="column" style={{ border: "2px solid #e9e9e9" }}>
                <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}><div className="areaName">{boards.name}</div>
                    <div className="areaName">主管：{boards.masters}</div></div>
                <ChildBoard boardid={boards.id} />

            </div><div style={{ height: "30px", backgroundColor: "#F5FAFD" }}></div></div>;
        }

    }
    view1() {
        if (this.state.view1 == false) {
            this.setState({ view1: true });
        } else {
            this.setState({ view1: false });
        }

    }
    view2() {
        if (this.state.view2 == false) {
            this.setState({ view2: true });
        } else {
            this.setState({ view2: false});
        }
    }
    view3() {
        if (this.state.view3 == false) {
            this.setState({ view3: true });
        } else {
            this.setState({ view3: false });
        }
    }
    view4() {
        if (this.state.view4 == false) {
            this.setState({ view4: true });
        } else {
            this.setState({ view4: false });
        }
    }

    render() {
        return <div className="anArea">
            {this.state.board.map(this.generateRootBoard.bind(this))}
        </div>
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
    convertChildBoard(item: Board) {
        return <div id="kk" className="boardContent">
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
        let cid = `Board${this.props.boardid}`;
        if (this.props.boardid == 2 || this.props.boardid == 29 || this.props.boardid == 35 || this.props.boardid == 37) {
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
export class BoardList extends React.Component<{}, AppState> {
    render() {
        return <div className="boardList" style={{ marginTop:"40px" }}>
            <BoardID />
        </div>
    }
}