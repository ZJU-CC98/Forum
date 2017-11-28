/*import * as React from 'react';
import * as State from '../States/AppState';
import * as Utility from '../Utility';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { match } from "react-router";
import { UbbContainer } from './UbbContainer';
declare let moment: any;

declare let editormd: any;

export module Constants {
    export var testEditor;
}






export class TopicVote extends RouteComponent<{}, State.TopicVoteState, {}> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            option: "我认为他说的很对",
            votes: 60,
            totalVotes: 220,
            voted: false,
        }
    }
    render() {
        return <div className="vote" >
            <div className="row"><input id="checkbox" type="checkbox" /> <span id="option1" style={{ marginLeft: "0.9375rem" }}>{this.state.option} </span></div>
            <div className="row" style={{ alignItems: "center" }}>
                <div className="progress">
                    <div className="voteResult"></div>
                </div>
                <span style={{ marginLeft: "0.9375rem" }}>{this.state.votes}</span>
                <span> ({this.state.votes / this.state.totalVotes * 100}%)</span>
            </div>
            <div style={{ marginLeft: "1.25rem" }}>{this.state.voted ? <span>你已经投过票啦</span> : <button className="operation">投票</button>}</div>
        </div>;
    }
}

export class UserMessageBox extends React.Component<{ userName, userFans }, {}>{
    render() {
        return <div id="userMessageBox">{this.props.userName}</div>;
    }
}
*/
