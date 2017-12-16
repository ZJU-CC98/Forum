import * as React from 'react';
import { Board } from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
//链接到的地址是  /list/boardid

export class BoardList extends React.Component<{}, { thisBoardState: Board[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            thisBoardState: [],
        }
    }

    async componentDidMount() {
        let boardNameList = [];
        const board: Board[] = [];
        if (!Utility.getStorage('board_2')) {   //缓存
            const response = await fetch('http://apitest.niconi.cc/Board/Root');
            const data = await response.json();
            for (let i = 0; i < 20; i++) {
                board[i] = new Board(data[i].name, data[i].todayCount, data[i].postCount, data[i].id, data[i].boardMastersString);
                Utility.setStorage(`board_${data[i].id.toString()}`, board[i]);
                boardNameList[i] = `board_${data[i].id.toString()}`;
            }
            Utility.setStorage('boardList', boardNameList);
        } else {
            boardNameList = Utility.getStorage('boardList');
            for (let i = 0; i < 20; i++) {
                board[i] = Utility.getStorage(boardNameList[i]);
            }
        }

        this.setState({
            thisBoardState: board,
        })
    }
    scroll(id) {
        document.getElementById(id).scrollIntoView();
    }
    generateRootBoard(item: Board) {    //返回一条父版信息
        return <RootBoard board={item} />;
    }
    generateBoardGuide(item) {
        const name = `${item.name}`;
        return <div onClick={() => this.scroll(name)} className="row boardOption">{item.name}</div>;
    }
   
    render() {

        return <div className="row" style={{ width:"1140px" }}>
            <div className="boardList">
                {this.state.thisBoardState.map(this.generateRootBoard)}
            </div>
            <div className="boardGuide">
                {this.state.thisBoardState.map(this.generateBoardGuide.bind(this))}
            </div>
        </div>;
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

    toggleIsExpanded() {
        this.setState(prevState => ({    // 定义一个方法修改展开状态
            isExpanded: !prevState.isExpanded   //setState() 可以接收一个函数，这个函数接受两个参数，第一个参数prevState表示上一个状态值，第二个参数props表示当前的props
        }));
    }

    render() {
        let display = this.state.isExpanded ? "flex" : "none";    //根据 isExpanded 状态定义样式
        let buttonContent = this.state.isExpanded ? <div >收起</div> : <div>展开</div>;      //根据 isExpanded 状态定义按钮内容
        let boards = this.props.board;

        if (boards.id === 758) {    //似水流年版 没有子版
            return <div className="anArea" id="似水流年">
                <div className="column" style={{ border: '2px solid #e9e9e9' }}>
                    <div className="row" style={{ marginTop: '15px', marginBottom: '15px', justifyContent:"space-around" }}>
                        <div className="areaName"><Link to="/list/758">{boards.name}</Link></div>
                        <div className="areaName">主管：{boards.masters}</div>
                    </div>
                </div>
            </div>;
        }
        else {  //其他版
            return <div className="anArea" id={boards.name}>
                <div className="column" style={{ border: '2px solid #e9e9e9' }}>
                    <div className="row" style={{ marginTop: '15px', marginBottom: '15px', justifyContent:"space-between" }}>
                        <div className="areaName">{boards.name}</div>
                        <div className="row" style={{ marginRight:"1rem" }}>
                        <div className="areaName">主管：{boards.masters}</div>
                            <div onClick={this.toggleIsExpanded} style={{ marginLeft: "1rem", cursor: "pointer" }}> {buttonContent}</div>
                            </div>
                    </div>
                    <div className="hiddenContent" style={{ display: display }}> <ChildBoard boardid={boards.id} /></div>
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
        };
    }

    async componentDidMount() {
        const token = Utility.getLocalStorage("accessToken");
        const headers = new Headers();
        headers.append("Authorization", token);
        const boards: Board[] = [];
        const response = await fetch(`http://apitest.niconi.cc/Board/${this.props.boardid}/Sub`, {headers});
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            boards[i] = new Board(data[i].name, data[i].todayCount, data[i].postCount, data[i].id, data[i].masters);
        }
        this.setState({
            thisBoardState: boards,
        });
    }
    convertChildBoard(item: Board) {   
        const url =`url(/images/_${item.name}.png)`
        return <div className="boardContent">
            <Link to={`/list/${item.id}`}><div className="greenBackdrop" style={{ backgroundImage: url}}></div></Link>
            <div className="column boardBlock" >
                <Link to={`/list/${item.id}`}><div className="boardName2" style={{ fontSize:"1.2rem", fontWeight:"bold" }}>{item.name}</div></Link>
                <div className="boardInfo">
                    {item.todayPostCount} / {item.totalPostCount}</div> 
                
                </div>
        </div>;
    }
    convertNoImgChildBoard(item: Board) {
        return <div className="noImgBoardContent">
            <Link to={`/list/${item.id}`}><div className="boardName2">{item.name}</div></Link>
        </div>;
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