import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { match } from "react-router";

export class Judge extends React.Component<{ topicId,userId, postId, update }, { reason,tips,UI }>{

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
        if ($("input[name='option']:checked").val() === 'plus1' || $("input[name='option']:checked").val() === 'minus1') {
            switch (this.state.UI) {

                case 'plus1':
                    if ($("input[name='reason']:checked").val()) {

                        const UIId = `#judge${this.props.postId}`;
                        if ($("input[name='reason']:checked").val() !== '自定义') {
                           
                            status=await Utility.plus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val());
                        } else {
                            status =await Utility.plus1(this.props.topicId, this.props.postId, this.state.reason);
                        }
                        if (status === 'ok') {
                            $(UIId).css("display", "none");
                            this.props.update();
                        } else if (status === 'already') {
                            this.setState({ tips: '您今天已经评分过啦~' });
                        } else if(status ==='not allowed'){
                            this.setState({ tips: '您还没有资格评分哦~' });
                        }
                       
                    } else {
                        this.setState({ tips: "请输入原因！" });
                    }
                    break;
                case 'minus1':
                    if ($("input[name='reason']:checked").val()) {
                        const UIId = `#judge${this.props.postId}`;
                        if ($("input[name='reason']:checked").val() !== '自定义') {
                            status= await Utility.minus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val());
                        } else {
                            status=await Utility.minus1(this.props.topicId, this.props.postId, this.state.reason);
                        }
                        if (status === 'ok') {
                            $(UIId).css("display", "none");
                            this.props.update();
                        } else if (status === 'already') {
                            this.setState({ tips: '您今天已经评分过啦~' });
                        } else if (status === 'not allowed') {
                            this.setState({ tips: '您还没有资格评分哦~' });
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
    render() {
       
        const plus1UI = <div className="column" id="award">

            <div className="column manageOperation">

                <div className="manageObject"><div className="judgeName">原因</div></div>

                <div className="row" style={{ justifyContent: "space-between", marginTop: "2rem", marginLeft: "3rem", marginRight: "3rem",color:"#fff"  }}> 

                    <div className="row">

                        <input type="radio" name="reason" value="所言极是" /><div>所言极是</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="momo" /><div>momo</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="好人一生平安" /><div>好人一生平安</div></div>

                </div>
                <div className="row" style={{ marginTop: "1rem", justifyContent: "flex-start", marginLeft: "3rem", marginRight: "3rem", color: "#fff" }}>
                    <div className="judgeOption" style={{ marginRight: '2rem' }}>
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                        </div>
                    <input type="text" style={{ borderRadius: "1rem", backgroundColor: '#8bc9db', border: 'solid 1.6px #ffffff', color: 'white', paddingLeft: '0.5rem' }} value={this.state.reason} onChange={this.reasonInput} /><div style={{ color: "#fff", fontSize: "0.75rem" }}>{this.state.tips}</div>
                </div>
              

            </div>

        </div>;
        const minus1UI = <div className="column" id="award">

            <div className="column manageOperation">

                <div className="manageObject"><div className="judgeName">原因</div></div>

                <div className="row" style={{ marginTop: "2rem", marginLeft: "2rem", marginRight:"2rem", justifyContent: "space-between",color:"#fff" }}>

                    <div className="row">

                        <input type="radio" name="reason" value="太不求是" /><div>太不求是</div>

                    </div>

                    <div className="row">

                        <input type="radio"  name="reason" value="呵呵" /><div>呵呵</div>

                    </div>

                    <div className="row" >
                        
                        <input type="radio" name="reason" value="被你暴击" /><div>被你暴击</div></div>

                </div>
                <div className="row" style={{ marginTop: "1rem", justifyContent: "flex-start", marginLeft:"2rem" }}>
                    <div className="judgeOption" style={{marginRight: '2rem'}}>
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                    </div>
                    <input type="text" style={{ borderRadius: "1rem", backgroundColor: '#8bc9db', border: 'solid 1.6px #ffffff', color: 'white', paddingLeft: '0.5rem' }} value={this.state.reason} onChange={this.reasonInput} /><div style={{ color: "#fff", fontSize:"0.75rem" }}>{this.state.tips}</div>
                </div>
        

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
