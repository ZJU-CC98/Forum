import * as React from 'react';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';


export class Category extends React.Component<{ topicInfo,topicId,boardInfo }, { boardId, topicId, boardName, title }>{
    constructor(props) {
        super(props);
        this.state = ({
            boardId: "",
            topicId: "", boardName: "", title: ""
        });
    }
    componentDidMount() {
        console.log(this.props.boardInfo);
        this.setState({ boardId: this.props.topicInfo.boardId, topicId: this.props.topicId, boardName: this.props.boardInfo.name, title: this.props.topicInfo.title });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ boardId: newProps.topicInfo.boardId, topicId: newProps.topicId, boardName: newProps.boardInfo.name, title: newProps.topicInfo.title });
    }
    render() {
        console.log("boardname");
        console.log(this.state.boardName);
        const listUrl = `/list/${this.state.boardId}`;
        const topicUrl = `/topic/${this.state.topicId}`;
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to="/">首页</Link>
            <i className="fa fa-chevron-right"></i>
            <Link style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} to={listUrl} >{this.state.boardName}</Link>
            <i className="fa fa-chevron-right"></i>
            <Link style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} to={topicUrl}><div style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15rem", whiteSpace: "nowrap" }}>{this.state.title}</div> </Link>
        </div>;
    }
}