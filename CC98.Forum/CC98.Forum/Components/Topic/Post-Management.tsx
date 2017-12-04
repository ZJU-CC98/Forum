import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { match } from "react-router";

export class PostManagement extends React.Component<{ userId, postId, update, topicId }, { wealth, prestige, reason, tpdays, UI, tips }>{

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

        this.close = this.close.bind(this);

        this.state = { wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award", tips: "" }

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
        switch (this.state.UI) {
            case 'Award':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                        Utility.awardWealth($("input[name='reason']:checked").val(), this.state.wealth, this.props.postId);
                        if (this.state.prestige!==0)
                        Utility.addPrestige(this.props.postId, this.state.prestige, $("input[name='reason']:checked").val());
                    } else {
                        Utility.awardWealth(this.state.reason, this.state.wealth, this.props.postId);
                        if (this.state.prestige !== 0)
                        Utility.addPrestige(this.props.postId, this.state.prestige, this.state.reason);
                    }
                    const UIId = `#manage${this.props.postId}`;
                    $(UIId).css("display", "none");
                    this.props.update();
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'Punish':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                       
                    } else {
                        if (this.state.reason) {
                           
                        } else {
                            this.setState({ tips: "请输入原因！" });
                        }
                    }
                    const UIId = `#manage${this.props.postId}`;
                    $(UIId).css("display", "none");
                    this.props.update();
                } else {
                    this.setState({ tips: "请选一个选项！" });
                }
                break;
            case 'Delete':
                if (this.state.reason) {
                    Utility.deletePost(this.props.topicId, this.props.postId, this.state.reason);
                    const UIId = `#manage${this.props.postId}`;
                    $(UIId).css("display", "none");
                    this.props.update();
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
        }

    }

    wealthInput(e) {

        this.setState({ wealth: e.target.value });

    }

    prestigeInput(e) {

        this.setState({ prestige: e.target.value });

    }

    reasonInput(e) {

        this.setState({ reason: e.target.value });

    }

    tpdaysInput(e) {

        this.setState({ tpdays: e.target.value });

    }
    close() {
        const UIId = `#manage${this.props.postId}`;
        $(UIId).css("display", "none");
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

            <div className="column manageOperation">

                <div className="manageObject">原因</div>

                <div className="row" style={{ justifyContent:"space-around" }}>

                    <div className="row">

                        <input type="radio" name="reason" value="好文章" /><div>好文章</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="有用资源" /><div>有用资源</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="热心回复" /><div>热心回复</div></div>

                </div>
                <div className="row">
                    <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                    <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                </div>
                <div>{this.state.tips}</div>

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

                <div>{this.state.tips}</div>

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
            <div className="row">
                <button onClick={this.confirm} className="confirmManagement">确认</button>
                <button onClick={this.close} style={{ marginRight: "2rem" }} className="confirmManagement">关闭</button>
            </div>
        </div>;

    }

}