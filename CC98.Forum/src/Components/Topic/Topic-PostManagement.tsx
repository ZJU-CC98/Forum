import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { match } from "react-router";
import { BoardState } from '../../States/AppState';
interface Props {
    userId;
    postId;
    update;
    topicId;
    privilege;
    boardId;
    floor;
    d_wealth;
    m_wealth;
    boardName;
}
export class PostManagement extends React.Component<Props, {wealth: number, prestige: number, reason: string, tpdays: number, UI, tips: string, fetchState }>{

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

        this.state = {wealth: 1000, prestige: 0, reason: "", tpdays: 0, UI: "Award", tips: "", fetchState: 'ok' }

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
        let id = `#opPostReason_${this.props.postId}`
        let id1 = `#hidePostReason_${this.props.postId}`
        let status = 'ok';
        let status1 = 'ok';
        let status2 = 'ok';
        switch (this.state.UI) {
            case 'Award':
                if ($(id).val()) {
                    let value = $(id).val();
                    if (value == "自定义") {
                        value = $(id1).val();
                    }
                        if (this.state.wealth != 0) {
                            status = await Utility.awardWealth(value, this.state.wealth, this.props.postId);
                        }
                        if (this.state.prestige != 0) {
                            status1 = await Utility.addPrestige(this.props.postId, this.state.prestige, value);
                        }

                    
                    if (status === 'ok' && status1 === 'ok') {
                        this.setState({ tips: "操作成功" });
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
                            case 'limited':
                                this.setState({ tips: "今天发米已经超过限制" });
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
                if ($(id).val()) {
                    let value = $(id).val();
                    if (value == "自定义") {
                        value = $(id1).val();
                    }
                        if (this.state.wealth!==0)
                        status = await Utility.deductWealth(value, this.state.wealth, this.props.postId);

                        if (this.state.prestige !== 0)
                            status1 = await Utility.deductPrestige(this.props.postId, this.state.prestige,value);


                        if (this.state.tpdays !== 0)

                            status2 = await Utility.stopBoardPost(this.props.postId,value, this.state.tpdays);
                   
                    if (status === 'ok' && status1 === 'ok' && status2 === 'ok') {
                        this.setState({ tips: "操作成功" });
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
                    if (status === 'ok') {
                        this.setState({ tips: "操作成功" });
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
                break;
            case 'Other':
                await Utility.cancelStopBoardPost(this.props.userId, this.props.boardId);
                const UIId = `#manage${this.props.postId}`;
                $(UIId).css("display", "none");
                this.props.update();
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
    async componentDidMount() {
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
    changeReason() {
        let id = `#opPostReason_${this.props.postId}`
        let id1 = `#hidePostReason_${this.props.postId}`
        let value = $(id).val();
        console.log(value);
        if (value == "自定义") {
            $(id1).css("display", "");
        } else {
            $(id1).css("display", "none");
        }
    }
    render() {
        let id = `opPostReason_${this.props.postId}`
        let id1 = `hidePostReason_${this.props.postId}`
        let UI;
        let m_wealth:any = 0;
        if (!this.props.m_wealth) m_wealth = '不限';
        else m_wealth = this.props.m_wealth;
        const awardUI = <div className="column manageInfo" id="award">

            <div className="row manageOperation">

                <div className="manageObject">财富值</div>

                <input className="react-bootstrap-smalltext" type="text" value={this.state.wealth} onChange={this.wealthInput} />

            </div>
            <div className="row" style={{color:"white"}}>您今天在{this.props.boardName}已经发了{this.props.d_wealth}财富值，最多可发{m_wealth}</div>

            <div className="row manageOperation managePrestige" >

                <div className="manageObject">威望</div>

                <input type="text" className="react-bootstrap-smalltext" value={this.state.prestige} onChange={this.prestigeInput} />

            </div>

            <div className="column manageOperation">



                <div className="row" style={{ justifyContent: "flex-start", marginLeft: "3rem", marginTop: "1rem", color: "#fff" }}>
                    <div >原因</div>
                    
                </div>
                <div>{this.state.tips}</div>
                <select id={id} onChange={this.changeReason.bind(this)} className="react-bootstrap-select" >

                    <option className="react-bootstrap-option" value="好文章">好文章</option>
                    <option className="react-bootstrap-option" value="有用资源">有用资源</option>
                    <option className="react-bootstrap-option" value="热心回复">热心回复</option>
                    <option className="react-bootstrap-option" value="自定义">自定义</option>
                </select>
                <input id={id1} className="react-bootstrap-smalltext" style={{ display: "none" }} />
            </div>

        </div>;

        const punishUI = <div className="column manageInfo" id="punish" >
            <div className="row manageOperation">

                <div className="manageObject">扣财富值</div>

                <input type="text" className="react-bootstrap-smalltext" value={this.state.wealth} onChange={this.wealthInput} />

            </div>
            <div className="row manageOperation managePrestige">

                <div className="manageObject">扣威望</div>

                <input type="text" className="react-bootstrap-smalltext" value={this.state.prestige} onChange={this.prestigeInput} />

            </div>

            <div className="row manageOperation" style={{ display:"" }}>

                <div className="manageObject">禁止发言(天)</div>

                <input type="text" className="react-bootstrap-smalltext" value={this.state.tpdays} onChange={this.tpdaysInput} />

            </div>

            <div className="column manageOperation">


                <div className="row" style={{
                    justifyContent: "flex-start", marginLeft: "3rem", color:"#fff", marginTop: "1rem"
                }}>
                    <div >原因</div>
                    <select id={id} onChange={this.changeReason.bind(this)} className="react-bootstrap-select" >

                        <option className="react-bootstrap-option" value="人身攻击">人身攻击</option>
                        <option className="react-bootstrap-option" value="违反版规">违反版规</option>
                        <option className="react-bootstrap-option" value="恶意灌水">恶意灌水</option>
                        <option className="react-bootstrap-option" value="自定义">自定义</option>
                    </select>
                    <input id={id1} className="react-bootstrap-smalltext" style={{ display: "none" }} />
                </div>
                <div>{this.state.tips}</div>

            </div>

        </div>;
        let deleteAllow = <div className="row manageOperation">

            <div className="manageObject">删除原因</div>

            <input type="text" className="react-bootstrap-smalltext" value={this.state.reason} onChange={this.reasonInput} />

        </div>;
        if (this.props.floor === 1) deleteAllow = <div>删除主题帖请在底部进行操作</div>;
        const deleteUI = <div className="column manageInfo" id="punish" >

            {deleteAllow}

        </div>;
        const otherUI = <div className="column manageInfo" id="other" >
            
            <div>解除此用户版面tp</div>
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