import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { match } from "react-router";

export class PostManagement extends React.Component<{ userId, postId, update, topicId, privilege }, { wealth: number, prestige: number, reason: string, tpdays: number, UI, tips: string, fetchState }>{

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

        this.showOtherUI = this.showOtherUI.bind(this);

        this.close = this.close.bind(this);

        this.state = { wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award", tips: "", fetchState: 'ok' }

    }

    showAwardUI() {

        this.setState({ UI: "Award", wealth: 1000 });

    }

    showPunishUI() {

        this.setState({ UI: "Punish", wealth: 0 });

    }

    showDeleteUI() {

        this.setState({ UI: "Delete" });

    }

    showOtherUI() {
        this.setState({ UI: "Other" });
    }
    async  confirm() {
        let status = 'ok';
        let status1 = 'ok';
        let status2 = 'ok';
        switch (this.state.UI) {
            case 'Award':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                        if (this.state.wealth !== 0) {
                            status = await Utility.awardWealth($("input[name='reason']:checked").val(), this.state.wealth, this.props.postId);
                        }
                        if (this.state.prestige !== 0) {
                            status1 = await Utility.addPrestige(this.props.postId, this.state.prestige, $("input[name='reason']:checked").val());
                        }

                    } else {
                        if (this.state.wealth !== 0) {
                            status = await Utility.awardWealth(this.state.reason, this.state.wealth, this.props.postId);

                        }

                        if (this.state.prestige !== 0) {
                            status1 = await Utility.addPrestige(this.props.postId, this.state.prestige, this.state.reason);

                        }

                    }
                    if ( status === 'ok' && status1 ==='ok') {
                        const UIId = `#manage${this.props.postId}`;
                        $(UIId).css("display", "none");
                        this.props.update();
                    }
                  
                    else {
                        switch (status) {
                            case 'wrong input':
                                this.setState({ tips: "输入错误" });
                            case 'unauthorized':
                                this.setState({ tips: "你没有权限进行此操作" });
                        }
                        switch (status1) {
                            case 'wrong input':
                                this.setState({ tips: "输入错误" });
                            case 'unauthorized':
                                this.setState({ tips: "你没有权限进行此操作" });
                        }

                    }
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'Punish':
                if ($("input[name='reason']:checked").val()) {
                    if ($("input[name='reason']:checked").val() !== '自定义') {
                        if (this.state.wealth!==0)
                        status = await Utility.deductWealth($("input[name='reason']:checked").val(), this.state.wealth, this.props.postId);

                        if (this.state.prestige !== 0)
                            status1 = await Utility.deductPrestige(this.props.postId, this.state.prestige, $("input[name='reason']:checked").val());


                        if (this.state.tpdays !== 0)

                            status2 = await Utility.stopBoardPost(this.props.postId, $("input[name='reason']:checked").val(), this.state.tpdays);
                    }

                    else {
                        if (this.state.reason) {
                            if (this.state.wealth!==0)
                            status = await Utility.deductWealth(this.state.reason, this.state.wealth, this.props.postId);
                            if (this.state.prestige !== 0)
                                status1 = await Utility.deductPrestige(this.props.postId, this.state.prestige, this.state.reason);
                            if (this.state.tpdays !== 0)

                                status2 = await Utility.stopBoardPost(this.props.postId, this.state.reason, this.state.tpdays);
                        } else {
                            this.setState({ tips: "请输入原因！" });
                        }
                       
                    }
                    console.log("status");
                    console.log(status); console.log(status1); console.log(status2);
                    if (status === 'ok' && status1 === 'ok' && status2 === 'ok') {
                        const UIId = `#manage${this.props.postId}`;
                        $(UIId).css("display", "none");
                        this.props.update();
                    }

                    else {
                        switch (status) {
                            case 'wrong input':
                                this.setState({ tips: "输入错误" });
                            case 'unauthorized':
                                this.setState({ tips: "你没有权限进行此操作" });
                        }
                        switch (status1) {
                            case 'wrong input':
                                this.setState({ tips: "输入错误" });
                            case 'unauthorized':
                                this.setState({ tips: "你没有权限进行此操作" });
                        }

                    }
                } else {
                    this.setState({ tips: "请选一个选项！" });
                }
                break;
            case 'Delete':
                if (this.state.reason) {
                    status = await Utility.deletePost(this.props.topicId, this.props.postId, this.state.reason);
                    if (status ==='ok') {
                        const UIId = `#manage${this.props.postId}`;
                        $(UIId).css("display", "none");
                        this.props.update();
                    } else {
                        switch (status) {
                            case 'wrong input':
                                this.setState({ tips: "输入错误" });
                            case 'unauthorized':
                                this.setState({ tips: "你没有权限进行此操作" });
                        }

                    }
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
    componentDidMount() {
        const awardOptionId = `manageOptions-award${this.props.postId}`;
        const awardOptionJQId = `#manageOptions-award${this.props.postId}`;
        const punishOptionId = `manageOptions-punish${this.props.postId}`;
        const punishOptionJQId = `#manageOptions-punish${this.props.postId}`;
        const deleteOptionId = `manageOptions-delete${this.props.postId}`;
        const deleteOptionJQId = `#manageOptions-delete${this.props.postId}`;
        const otherOptionId = `manageOptions-other${this.props.postId}`;
        const otherOptionJQId = `#manageOptions-other${this.props.postId}`;

        if (this.state.UI === "Award") {
            $(awardOptionJQId).css("background-color", "#b9d3ee");
            $(punishOptionJQId).css("background-color", "#fffacd");
            $(deleteOptionJQId).css("background-color", "#fffacd");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }

        if (this.state.UI === "Punish") {

            $(awardOptionJQId).css("background-color", "#fffacd");
            $(punishOptionJQId).css("background-color", "#b9d3ee");
            $(deleteOptionJQId).css("background-color", "#fffacd");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }

        if (this.state.UI === "Delete") {

            $(awardOptionJQId).css("background-color", "#fffacd");
            $(punishOptionJQId).css("background-color", "#fffacd");
            $(deleteOptionJQId).css("background-color", "#b9d3ee");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }
        if (this.props.privilege !== '管理员') {
            $(".managePrestige").css("display", "none");
        } else {
            $(".managePrestige").css("display", "");
        }
    }
    componentDidUpdate() {
        if (this.props.privilege !== '管理员') {
            $(".managePrestige").css("display", "none");
        } else {
            $(".managePrestige").css("display", "");
        }
    }
    render() {

        let UI;

        const awardUI = <div className="column manageInfo" id="award">

            <div className="row manageOperation">

                <div className="manageObject">财富值</div>

                <input type="text" value={this.state.wealth} onChange={this.wealthInput} />

            </div>

            <div className="row manageOperation managePrestige" >

                <div className="manageObject">威望</div>

                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />

            </div>

            <div className="column manageOperation">



                <div className="row" style={{ justifyContent: "flex-start", marginLeft: "3rem", marginTop: "1rem", color: "#fff" }}>
                    <div >原因</div>
                    <div className="row" >

                        <input type="radio" name="reason" value="好文章" /><div>好文章</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="有用资源" /><div>有用资源</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="热心回复" /><div>热心回复</div></div>

                </div>
                <div className="row" style={{ justifyContent: "flex-start", marginLeft:"3rem",color:"#fff", marginTop: "1rem" }}>
                    <div className="row">
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                    </div>
                    <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                </div>
                <div>{this.state.tips}</div>

            </div>

        </div>;

        const punishUI = <div className="column manageInfo" id="punish" >
            <div className="row manageOperation">

                <div className="manageObject">扣财富值</div>

                <input type="text" value={this.state.wealth} onChange={this.wealthInput} />

            </div>
            <div className="row manageOperation">

                <div className="manageObject">扣威望</div>

                <input type="text" value={this.state.prestige} onChange={this.prestigeInput} />

            </div>

            <div className="row manageOperation">

                <div className="manageObject">禁止发言(天)</div>

                <input type="text" value={this.state.tpdays} onChange={this.tpdaysInput} />

            </div>

            <div className="column manageOperation">


                <div className="row" style={{
                    justifyContent: "flex-start", marginLeft: "3rem", color:"#fff", marginTop: "1rem"
                }}>
                    <div >原因</div>
                    <div className="row" >

                        <input type="radio" name="reason" value="人身攻击" /><div>人身攻击</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="恶意灌水" /><div>恶意灌水</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="违反版规" /><div>违反版规</div></div>

                </div>
                <div className="row" style={{ justifyContent: "flex-start", marginLeft: "3rem",color:"#fff", marginTop: "1rem" }}>
                    <div className="row">
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                    </div>
                    <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                </div>
                <div>{this.state.tips}</div>

            </div>

        </div>;

        const deleteUI = <div className="column manageInfo" id="punish" >

            <div className="row manageOperation">

                <div className="manageObject">删除原因</div>

                <input type="text" value={this.state.reason} onChange={this.reasonInput} />

            </div>

        </div>;
        const otherUI = <div className="column manageInfo" id="other" >
            

        </div>;
        const UIId = `manage${this.props.postId}`;

        UI = awardUI;
        const awardOptionId = `manageOptions-award${this.props.postId}`;
        const awardOptionJQId = `#manageOptions-award${this.props.postId}`;
        const punishOptionId = `manageOptions-punish${this.props.postId}`;
        const punishOptionJQId = `#manageOptions-punish${this.props.postId}`;
        const deleteOptionId = `manageOptions-delete${this.props.postId}`;
        const deleteOptionJQId = `#manageOptions-delete${this.props.postId}`;
        const otherOptionId = `manageOptions-other${this.props.postId}`;
        const otherOptionJQId = `#manageOptions-other${this.props.postId}`;

        if (this.state.UI === "Award") {
            UI = awardUI;
            $(awardOptionJQId).css("background-color", "#b9d3ee");
            $(punishOptionJQId).css("background-color", "#fffacd");
            $(deleteOptionJQId).css("background-color", "#fffacd");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }

        if (this.state.UI === "Punish") {
            UI = punishUI;
            $(awardOptionJQId).css("background-color", "#fffacd");
            $(punishOptionJQId).css("background-color", "#b9d3ee");
            $(deleteOptionJQId).css("background-color", "#fffacd");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }

        if (this.state.UI === "Delete") {
            UI = deleteUI;
            $(awardOptionJQId).css("background-color", "#fffacd");
            $(punishOptionJQId).css("background-color", "#fffacd");
            $(deleteOptionJQId).css("background-color", "#b9d3ee");
            $(otherOptionJQId).css("background-color", "#fffacd");
        }

        if (this.state.UI === 'Other') {
            UI = otherUI;
            $(awardOptionJQId).css("background-color", "#fffacd");
            $(punishOptionJQId).css("background-color", "#fffacd");
            $(deleteOptionJQId).css("background-color", "#fffacd");
            $(otherOptionJQId).css("background-color", "#b9d3ee");
        }
        return <div style={{ display: "none" }} id={UIId} className="postManagement">

            <div className="manageUI">

                <div className="row manageOptions">

                    <div className="manageOptions-icon" id={awardOptionId} onClick={this.showAwardUI} style={{ color: "#FF7F00" }}>奖励</div>

                    <div className="manageOptions-icon" id={punishOptionId} onClick={this.showPunishUI} style={{ color: "red" }}>惩罚</div>

                    <div className="manageOptions-icon" id={deleteOptionId} onClick={this.showDeleteUI}>删除</div>
                    <div className="manageOptions-icon" id={otherOptionId} onClick={this.showOtherUI}>其他</div>
                </div>

            </div>

            {UI}
            <div className="row" style={{ justifyContent: "space-around" }}>
                <button onClick={this.confirm} className="confirmManagement">确认</button>
                <button onClick={this.close} className="confirmManagement">关闭</button>
            </div>
        </div>;

    }

}