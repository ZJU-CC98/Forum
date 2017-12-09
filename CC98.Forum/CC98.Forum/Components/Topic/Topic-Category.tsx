import * as React from 'react';
import * as Utility from '../../Utility';


export class Category extends React.Component<{ topicInfo,topicId }, { boardId, topicId, boardName, title }>{
    constructor(props) {
        super(props);
        this.state = ({
            boardId: "",
            topicId: "", boardName: "", title: ""
        });
    }
    async componentDidMount() {
        const boardName = await Utility.getBoardName(this.props.topicInfo.boardId);
        this.setState({ boardId: this.props.topicInfo.boardId, topicId: this.props.topicId, boardName: boardName, title: this.props.topicInfo.title });
    }
    render() {
        const listUrl = `/list/${this.state.boardId}/normal`;
        const topicUrl = `/topic/${this.state.topicId}`;
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <a style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} href="/">首页</a>
            <i className="fa fa-chevron-right"></i>
            <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} href={listUrl} >{this.state.boardName}</a>
            <i className="fa fa-chevron-right"></i>
            <a style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} href={topicUrl}><div style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "15rem", whiteSpace: "nowrap" }}>{this.state.title}</div> </a>
        </div>;
    }
}