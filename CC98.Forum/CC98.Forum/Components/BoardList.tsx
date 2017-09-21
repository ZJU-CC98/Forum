import * as React from 'react';
import { Board } from '../States/AppState';
import * as Utility from '../Utility';
import * as $ from 'jquery';
//链接到的地址是  /list/boardid

export class BoardList extends React.Component<{}, { board: Board[] }> {

    constructor(props) {    //为组件定义构造方法，其中设置 this.state = 初始状态
        super(props);       //super 表示调用基类（Component系统类型）构造方法
        this.state = {
            board: [],
		};

		this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    async componentDidMount() {
        let boardNameList = [];
        const board: Board[] = [];
        if (!Utility.getStorage('board_2')) {   //缓存
            const response = await fetch('http://api.cc98.org/Board/Root');
            const data = await response.json();
            for (let i = 0; i < 20; i++) {
                board[i] = new Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
                Utility.setStorage(`board_${data[i].id.toString()}`, board[i]);
                boardNameList[i] = `board_${data[i].id.toString()}`;
            }
            Utility.setStorage('boardList', boardNameList);
        } else {
            for (let i = 0; i < 20; i++) {
                boardNameList = Utility.getStorage('boardList');
                board[i] = Utility.getStorage(boardNameList[i]);
            }
        }

        this.setState({
            board: board,
        });
	}

	toggleCollapse() {
		
	}

    generateRootBoard(boards: Board) {
        if (boards.id === 2 || boards.id === 29 || boards.id === 35 || boards.id === 37) {  //四个民工版 带折叠功能
            return <div className="anArea">
                <div className="column" style={{ border: '2px solid #e9e9e9' }}>
                    <div className="row" style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <div className="areaName" >{boards.name}</div>
                        <div className="areaName">主管：{boards.masters}</div>
                        <div className="hideBoard" onClick={this.toggleCollapse}>+</div>
                    </div>
                    <ChildBoard boardid={boards.id} />
                </div>
            </div>;
        }
        else if (boards.id === 758) {    //似水流年版 没有子版
            return <div className="anArea">
                <div className="column" style={{ border: '2px solid #e9e9e9' }}>
                    <div className="row" style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <div className="areaName"><a href="/list/758">{boards.name}</a></div>
                        <div className="areaName">主管：{boards.masters}</div>
                    </div>
                </div>
            </div>;
        }
        else {  //其他版
            return <div className="anArea">
                <div className="column" style={{ border: '2px solid #e9e9e9' }}>
                    <div className="row" style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <div className="areaName">{boards.name}</div>
                        <div className="areaName">主管：{boards.masters}</div>
                    </div>
                    <ChildBoard boardid={boards.id} />
                </div>
            </div>;
        }
    }

	render() {

        $(() => {

	        const button = $('.hideBoard');
	        button.click(function () {
		        if ($(this).text() === '+') {
			        $(this).parent().next().css('display', 'flex');
			        $(this).text('-');
		        } else {
			        $(this).parent().next().css('display', 'none');
			        $(this).text('+');
		        };
		        return false;   //阻止事件冒泡
	        });
        });

        return <div className="boardList">
            {this.state.board.map(this.generateRootBoard)}
        </div>;
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
        const boards: Board[] = [];
        const response = await fetch(`http://api.cc98.org/Board/${this.props.boardid}/Subs`);
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            boards[i] = new Board(data[i].name, data[i].todayPostCount, data[i].totalPostCount, data[i].id, data[i].masters);
        }
        this.setState({
            thisBoardState: boards,
        });
    }
    convertChildBoard(item: Board) {    //暂无各版面图片，以绿色背景方块替代
        return <div className="boardContent">
            <a href={`/list/${item.id}`}><div className="greenBackdrop"></div></a>
            <a href={`/list/${item.id}`}><div className="boardName2">{item.name}</div></a>
            <div className="boardInfo">今日发帖 {item.todayPostCount} / 总主题数 {item.totalPostCount}</div>
        </div>;
    }
    convertNoImgChildBoard(item: Board) {
        return <div className="noImgBoardContent">
            <a href={`/list/${item.id}`}><div className="boardName2">{item.name}</div></a>
        </div>;
    }
    render() {
	    const cid = `Board${this.props.boardid}`;
	    if (this.props.boardid == 2 || this.props.boardid == 29 || this.props.boardid == 35 || this.props.boardid == 37) {
            return <div className="noImgAreaContent" >
                {this.state.thisBoardState.map(this.convertNoImgChildBoard)}
            </div>;
        } else {
            return <div className="areaContent">
                {this.state.thisBoardState.map(this.convertChildBoard)}
            </div>;
        }

	}
}