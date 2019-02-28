import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { match } from "react-router";
interface Props {
    topicId;
    userId;
    postId;
    update; 
}
export class Judge extends React.Component<Props, { reason,tips,UI }>{

    constructor(props) {
        super(props);
        this.showMinus1UI = this.showMinus1UI.bind(this);
        this.showPlus1UI = this.showPlus1UI.bind(this);
        this.reasonInput = this.reasonInput.bind(this);
        this.confirm = this.confirm.bind(this);
        this.close = this.close.bind(this);
        this.state = { reason: "", tips: "" ,UI:"plus1"}

    }
    async confirm() {
        let status = 'ok';
        let id = `#opReason_${this.props.postId}`
        let id1 = `#hideReason_${this.props.postId}`
        console.log($(id1).val())
        if ($("input[name='option']:checked").val() === 'plus1' || $("input[name='option']:checked").val() === 'minus1') {
            switch (this.state.UI) {

                case 'plus1':
                    if ($(id).val()) {

                        const UIId = `#judge${this.props.postId}`;
                        let value = $(id).val();
                        if (value == "自定义") {
                            value = $(id1).val();
                        }
                           
                            status=await Utility.plus1(this.props.topicId, this.props.postId, value);
                        
                        if (status === 'ok') {
                            $(UIId).css("display", "none");
                            this.props.update();
                        } else if (status === 'already') {
                            this.setState({ tips: '您今天已经评分过啦~' });
                        } else if (status === 'not allowed') {
                            this.setState({ tips: '您还没有资格评分哦~' });
                        } else if (status === 'rateself') {
                            this.setState({ tips: '您不能给自己评分哦~' });
                        }
                       
                    } else {
                        this.setState({ tips: "请输入原因！" });
                    }
                    break;
                case 'minus1':
                    if ($(id).val()) {
                        const UIId = `#judge${this.props.postId}`;
                        let value = $(id).val();
                        if (value == "自定义") {
                            value = $(id1).val();
                        }
                            status= await Utility.minus1(this.props.topicId, this.props.postId, value);
                       
                        if (status === 'ok') {
                            $(UIId).css("display", "none");
                            this.props.update();
                        } else if (status === 'already') {
                            this.setState({ tips: '您今天已经评分过啦~' });
                        } else if (status === 'not allowed') {
                            this.setState({ tips: '您还没有资格评分哦~' });
                        } else if (status === 'rateself') {
                            this.setState({ tips: '您不能给自己评分哦~' });
                        }
                    } else {
                        this.setState({ tips: "请输入原因！" });
                    }
                    break;
            }
        } else {
            this.setState({ tips: "请选择+1或-1" });
        }
    }
    reasonInput(e) {

        this.setState({ reason: e.target.value });

    }
    close() {
        const UIId = `#judge${this.props.postId}`;
        $(UIId).css("display", "none");
    }
    showPlus1UI() {
        this.setState({ UI: "plus1" });
    }
    showMinus1UI() {
        this.setState({ UI: "minus1" });
    }
    changeReason() {
        let id = `#opReason_${this.props.postId}`
        let id1 = `#hideReason_${this.props.postId}`
        let value = $(id).val();
        console.log(value);
        if (value == "自定义") {
            $(id1).css("display", "");
        } else {
            $(id1).css("display", "none");
        }
    }
    render() {
        let id = `opReason_${this.props.postId}`
        let id1 = `hideReason_${this.props.postId}`
        const plus1UI = <div className="column" id="award">

            <div className="column manageOperation">

                <div className="manageObject"><div className="judgeName">原因</div></div>

                <div className="row" style={{ justifyContent: "space-between", marginTop: "2rem", marginLeft: "3rem", marginRight: "3rem",color:"#fff"  }}> 

                    <div className="row">
                 
                        <select id={id} onChange={this.changeReason.bind(this)} className="react-bootstrap-select" >

                                <option className="react-bootstrap-option" value="所言极是">所言极是</option>
                                <option className="react-bootstrap-option" value="momo">momo</option>
                                <option className="react-bootstrap-option" value="好人一生平安">好人一生平安</option>
                                <option className="react-bootstrap-option" value="自定义">自定义</option>
                            </select>
                        <input id={id1} className="react-bootstrap-smalltext" style={{ display: "none" }} /></div>
                <div style={{ color: "#fff", fontSize: "0.75rem", textAlign: "center", marginTop:"0.1rem" }}>{this.state.tips}
                        </div>
            </div>
                </div>
        </div>;
        const minus1UI = <div className="column" id="award">

            <div className="column manageOperation">

                <div className="manageObject"><div className="judgeName">原因</div></div>

                <div className="row" style={{ marginTop: "2rem", marginLeft: "2rem", marginRight:"2rem", justifyContent: "space-between",color:"#fff" }}>

                    <div className="row">

                        <select id={id} onChange={this.changeReason.bind(this)} className="react-bootstrap-select" >

                            <option className="react-bootstrap-option" value="太不求是">太不求是</option>
                            <option className="react-bootstrap-option" value="呵呵">呵呵</option>
                            <option className="react-bootstrap-option" value="被你暴击">被你暴击</option>
                            <option className="react-bootstrap-option" value="自定义">自定义</option>
                        </select>
                        <input id={id1} className="react-bootstrap-smalltext" style={{ display: "none" }} /></div>
                </div>
                <div style={{ color: "#fff", fontSize: "0.75rem", textAlign: "center", marginTop: "0.1rem"}}>{this.state.tips}</div>

            </div>

        </div>;
        let UI;
        if (this.state.UI === "minus1") UI = minus1UI;
        else UI = plus1UI;
        const UIId = `judge${this.props.postId}`;  
        return <div style={{ display: "none" }} id={UIId} className="judgeManagement">
            <div className="judgeUI column">
                <div className="row judgeName">
                      评分
                </div>
                <div className="row" style={{ fontSize:"0.75rem",color:"#fff" }}>500贴以上的用户可以进行评分（每日一次）</div>
                <div className="row judgeOptions" style={{ marginTop: "2rem", paddingLeft: "3rem", paddingRight: "3rem", justifyContent: "space-between", boxSizing: 'border-box', color: "#fff" }}>
                    <div className="judgeOption">
                        <input type="radio" name="option" value="plus1" onClick={this.showPlus1UI} /><div>风评+1</div>
                    </div>
                    <div className="judgeOption">
                        <input type="radio" name="option" value="minus1" onClick={this.showMinus1UI} /><div>风评-1</div>
                        </div>
                </div>
            </div>
            {UI}
            <div className="row" style={{ justifyContent: "space-around", padding: '0 3rem'}}>
                <button style={{ border: 'none', backgroundColor: '#8bc9db', color: 'white', textDecoration: 'underline', fontSize: '1.25rem'}} onClick={this.confirm} className="confirmManagement">确认</button>
                <button onClick={this.close} style={{ border: 'none', backgroundColor: '#8bc9db', color: 'white', textDecoration: 'underline', fontSize: '1.25rem' }} className="confirmManagement">关闭</button>
            </div>
        </div>;

    }

}
