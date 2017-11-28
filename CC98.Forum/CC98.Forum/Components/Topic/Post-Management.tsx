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
export class PostManagement extends React.Component<{ userId, postId }, { wealth, prestige, reason, tpdays, UI }>{
    constructor(props) {
        super(props);
        this.wealthInput = this.wealthInput.bind(this);
        this.prestigeInput = this.prestigeInput.bind(this);
        this.reasonInput = this.reasonInput.bind(this);
        this.tpdaysInput = this.tpdaysInput.bind(this);
        this.confirm = this.confirm.bind(this);
        this.showAwardUI = this.showAwardUI.bind(this);
        this.showPunishUI = this.showPunishUI.bind(this);
        this.showDeleteUI = this.showDeleteUI.bind(this);
        this.state = { wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award" }
    }
    showAwardUI() {
        this.setState({ UI: "Award" });
    }
    showPunishUI() {
        this.setState({ UI: "Punish" });
    }
    showDeleteUI() {
        this.setState({ UI: "Delete" });
    }
    confirm() {
        Utility.awardWealth(this.state.reason, this.state.wealth, this.props.postId);
        const UIId = `#manage${this.props.postId}`;
        $(UIId).css("display", "none");
    }
    wealthInput(e) {
        console.log(this.state);
        this.setState({ wealth: e.target.value });
    }
    prestigeInput(e) {
        console.log(this.state);
        this.setState({ prestige: e.target.value });
    }
    reasonInput(e) {
        console.log(this.state);
        this.setState({ reason: e.target.value });
    }
    tpdaysInput(e) {
        console.log(this.state);
        this.setState({ tpdays: e.target.value });
    }
    render() {
        let UI;
        const awardUI = <div className="column" id="award">
            <div className="row manageOperation">
                <div className="manageObject">财富值</div>
                <input type="text" value={this.state.wealth} onChange={this.wealthInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">威望</div>
                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
            </div>
        </div>;
        const punishUI = <div className="column" id="punish" >
            <div className="row manageOperation">
                <div className="manageObject">扣威望</div>
                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">禁止发言(天)</div>
                <input type="text" value={this.state.tpdays} onChange={this.tpdaysInput} />
            </div>
            <div className="row manageOperation">
                <div className="manageObject">原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
            </div>
        </div>;
        const deleteUI = <div className="column" id="punish" >
            <div className="row manageOperation">
                <div className="manageObject">删除原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />
            </div>
        </div>;
        const UIId = `manage${this.props.postId}`;
        UI = awardUI;
        if (this.state.UI === "Award") UI = awardUI;
        if (this.state.UI === "Punish") UI = punishUI;
        if (this.state.UI === "Delete") UI = deleteUI;
        return <div style={{ display: "none" }} id={UIId} className="postManagement">
            <div className="manageUI">
                <div className="row manageOptions">
                    <div className="manageOptions-icon" onClick={this.showAwardUI} style={{ color: "#FF7F00" }}>奖励</div>
                    <div className="manageOptions-icon" onClick={this.showPunishUI} style={{ color: "red" }}>惩罚</div>
                    <div className="manageOptions-icon" onClick={this.showDeleteUI}>删除</div>
                </div>
            </div>
            {UI}
            <button onClick={this.confirm} className="confirmManagement">确认</button>
        </div>;
    }
}