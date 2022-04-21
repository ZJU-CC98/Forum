import * as React from 'react';
import { Board } from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import DocumentTitle from '../DocumentTitle';
/**
 *根版面（区）的状态
 *需要版面名称，id，主管，以及子版面
 */
export class RootBoardState {
  name: string;
  id: number;
  masters: string[];
  boards: ChildBoardState[];

  constructor(name: string, id: number, masters: string[], boards: ChildBoardState[]) {
    this.name = name;
    this.id = id;
    this.masters = masters;
    this.boards = boards;
  }
}

/**
 *子版面的状态
 *需要版面名称，id，主管，今日回帖数，总主题数，总回帖数
 */
export class ChildBoardState {
  name: string;
  id: number;
  masters: string[];
  todayCount: number;
  topicCount: number;
  postCount: number;

  constructor(name: string, id: number, masters: string[], todayCount: number, topicCount: number, postCount: number) {
    this.name = name;
    this.id = id;
    this.masters = masters;
    this.todayCount = todayCount;
    this.topicCount = topicCount;
    this.postCount = postCount;
  }
}

export class BoardList extends React.Component<{}, { data: RootBoardState[] }> {

  constructor(props) {
    super(props);
    this.state = {
      data: new Array<RootBoardState>()
    }
  }

  async getData() {
    let data;
    const response = await Utility.cc98Fetch('/Board/all');
    data = await response.json();
    return data;
  }

  async componentDidMount() {
    let x = await this.getData();
    this.setState({
      data: x,
    })
  }
  scroll(id) {
    document.getElementById(id).scrollIntoView();
  }
  generateRootBoard(data: RootBoardState) {    //返回一条父版信息
    return <RootBoard data={data} />;
  }
  generateBoardGuide(item) {
    const name = `${item.name}`;
    return <div onClick={() => this.scroll(name)} className="row boardOption">{item.name}</div>;
  }

  render() {

    return <div className="row" style={{ width: "1140px" }}>
      <DocumentTitle title={`版面列表 - CC98论坛`} />
      <div className="boardList">
        {this.state.data.map(this.generateRootBoard)}
      </div>
      <div className="boardGuide">
        {this.state.data.map(this.generateBoardGuide.bind(this))}
      </div>
    </div>;
  }
}
export class RootBoard extends React.Component<{ data: RootBoardState }, { isExpanded: boolean }>{

  constructor(props) {
    super(props);
    let boards = this.props.data;

    //默认状态为展开
    this.state = { isExpanded: true, };
    //bind this
    this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
  }

  toggleIsExpanded() {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }));
  }

  convertMasters(name: string, index: number, masters: string[]) {
    let length = masters.length;
    let masterUrl = `/user/name/${encodeURIComponent(name)}`;
    if (index === length - 1) {
      return <Link to={masterUrl}>{name}</Link>
    }
    else {
      return <div style={{ marginRight: "1rem" }}><Link to={masterUrl}>{name}</Link></div>
    }
  }

  render() {

    let display = this.state.isExpanded ? "flex" : "none";    //根据 isExpanded 状态定义样式
    let buttonContent = this.state.isExpanded ? "收起" : "展开";      //根据 isExpanded 状态定义按钮内容
    let data = this.props.data;
    const boardUrl = `/board/${data.id}`;
    const masters = data.masters;
    let mastersText = (data.masters.length) ? "主管：" : "";

    return <div className="anArea" id={data.name}>
      <div className="column" style={{ border: '2px solid #e9e9e9' }}>
        <div className="row boardListHead" onClick={this.toggleIsExpanded}>
          <div className="row" style={{ marginRight: "1rem", alignItems: "center" }}>
            <div className="areaName">{data.name}</div>
            <div className="areaName">{mastersText}{data.masters.map(this.convertMasters)}</div>
          </div>
          <div className="expendBoardList"> {buttonContent}</div>
        </div>
        <div className="hiddenContent" style={{ display: display }}>
          <ChildBoard id={data.id} boards={data.boards} />
        </div>
      </div>
    </div>;
  }
}
export class ChildBoard extends React.Component<{ id: number, boards: ChildBoardState[] }, {}>{
  constructor(props) {
    super(props);
    this.state = {
      thisBoardState: []
    };
  }

  onError(e) {
    e.preventDefault();
    e.target.src = `/static/images/_CC98.png`;

  }

  convertChildBoard(item: ChildBoardState) {
    const url = `/static/images/_${item.name}.png`
    return <div className="boardContent">
      <Link to={`/board/${item.id}`}><div className="greenBackdrop" >
        <img style={{ width: "6rem", height: "6rem" }} src={url} onError={this.onError}></img>
      </div></Link>
      <div className="column boardBlock" >
        <Link to={`/board/${item.id}`}><div className="boardName2" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{item.name}</div></Link>
        <div className="boardInfo">
          <div className="row">今日  {item.todayCount} </div>
          <div className="row">总数  {item.postCount}</div>
        </div>

      </div>
    </div>;
  }

  convertNoImgChildBoard(item: ChildBoardState) {
    return <div className="noImgBoardContent">
      <Link to={`/board/${item.id}`}><div className="boardName2">{item.name}</div></Link>
    </div>;
  }

  render() {
    let boards = [];
    let id = 0;
    if (this.props.boards && this.props.id) {
      boards = this.props.boards;
      id = this.props.id
    }

    if (id === 2 || id === 29 || id === 35 || id === 37 || id === 33 || id === 604) {
      return <div className="areaContent" >
        {boards.map(this.convertNoImgChildBoard)}
      </div>;
    } else {
      return <div className="areaContent">
        {boards.map(this.convertChildBoard.bind(this))}
      </div>;
    }
  }
}