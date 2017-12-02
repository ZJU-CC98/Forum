import * as React from 'react';
import * as Utility from '../../Utility';


export class Category extends React.Component<{ topicId }, { boardId, topicId, boardName, title }>{
    constructor(props) {
        super(props);
        this.state = ({ boardId: "", topicId: "", boardName: "", title: "" });
    }
    async componentDidMount() {
        const body = await Utility.getCategory(this.props.topicId, this.context.router);
        this.setState({ boardId: body.boardId, topicId: body.topicId, boardName: body.boardName, title: body.title });
    }
    render() {
        const listUrl = `/list/${this.state.boardId}/normal`;
        const topicUrl = `/topic/${this.state.topicId}`;
        return <div style={{ color: "grey", fontSize: "1rem", display: "flex" }}><i className="fa fa-window-maximize fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href="/">首页</a><i className="fa fa-arrow-right fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href={listUrl} >{this.state.boardName}</a><i className="fa fa-arrow-right fa-lg"></i><a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.3rem", marginRight: "0.3rem" }} href={topicUrl}><div style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15rem", whiteSpace: "nowrap" }}>{this.state.title}</div></a></div>;
    }
}