import * as React from 'react';
import * as State from '../../States/AppState';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { match } from "react-router";
import { UbbContainer } from '.././UbbContainer';
declare let moment: any;
declare let editormd: any;

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
        return <div style={{ color: "blue", fontSize: "1rem" }}>&rsaquo;&rsaquo;<a style={{ color: "blue", fontSize: "1rem" }} href="/">首页</a>&nbsp;→&nbsp;<a style={{ color: "blue", fontSize: "1rem" }} href={listUrl} >{this.state.boardName}</a>&nbsp;→&nbsp;<a style={{ color: "blue", fontSize: "1rem" }} href={topicUrl}>{this.state.title}</a></div>;
    }
}