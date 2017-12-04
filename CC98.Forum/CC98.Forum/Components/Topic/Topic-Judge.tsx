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
        if ($("input[name='option']:checked").val() === 'plus1' || $("input[name='option']:checked").val() === 'minus1') {
            switch (this.state.UI) {

                case 'plus1':
                    if ($("input[name='reason']:checked").val()) {

                        const UIId = `#judge${this.props.postId}`;
                        if ($("input[name='reason']:checked").val() !== '自定义') {
                            console.log($("input[name='reason']:checked").val());
                            await Utility.plus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val());
                        } else {
                            await Utility.plus1(this.props.topicId, this.props.postId, this.state.reason);
                        }
                        $(UIId).css("display", "none");
                        this.props.update();
                    } else {
                        this.setState({ tips: "请输入原因！" });
                    }
                    break;
                case 'minus1':
                    if ($("input[name='reason']:checked").val()) {
                        const UIId = `#judge${this.props.postId}`;
                        if ($("input[name='reason']:checked").val() !== '自定义') {
                            await Utility.minus1(this.props.topicId, this.props.postId, $("input[name='reason']:checked").val());
                        } else {
                            await Utility.minus1(this.props.topicId, this.props.postId, this.state.reason);
                        }
                        $(UIId).css("display", "none");
                        this.props.update();
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
             
                <div className="manageObject">原因</div>

                <div className="row"  style={{  justifyContent: "space-around", marginTop: "2rem"  }}> 

                    <div className="row">

                        <input type="radio" name="reason" value="所言极是" /><div>所言极是</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="momo" /><div>momo</div>

                    </div>

                    <div className="row">

                        <input type="radio" name="reason" value="好人一生平安" /><div>好人一生平安</div></div>

                </div>
                <div className="row" style={{ marginTop: "1rem", justifyContent: "space-around" }}>
                    <div className="judgeOption">
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                        </div>
                    <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                </div>
                <div>{this.state.tips}</div>

            </div>

        </div>;
        const minus1UI = <div className="column" id="award">

            <div className="column manageOperation">

                <div className="manageObject">原因</div>

                <div className="row" style={{ marginTop: "1rem", justifyContent: "space-around" }}>

                    <div className="row">

                        <input type="radio" name="reason" value="太不求是" /><div>太不求是</div>

                    </div>

                    <div className="row">

                        <input type="radio"  name="reason" value="呵呵" /><div>呵呵</div>

                    </div>

                    <div className="row" >
                        
                        <input type="radio" name="reason" value="被你暴击" /><div>被你暴击</div></div>

                </div>
                <div className="row" style={{ marginTop: "1rem", justifyContent: "space-around" }}>
                    <div className="judgeOption">
                        <input type="radio" name="reason" value="自定义" /><div>自定义</div>
                        </div>
                    <input type="text" value={this.state.reason} onChange={this.reasonInput} />
                </div>
                <div>{this.state.tips}</div>

            </div>

        </div>;
        let UI;
        if (this.state.UI === "minus1") UI = minus1UI;
        else UI = plus1UI;
        const UIId = `judge${this.props.postId}`;  
        return <div style={{ display: "none" }} id={UIId} className="postManagement">
            <div className="judgeUI column">
                <div className="row judgeName">
                      风评值
                </div>
                <div className="row judgeOptions">
                    <div className="judgeOption">
                        <input type="radio" name="option" value="plus1" onClick={this.showPlus1UI} /><div>风评+1</div>
                    </div>
                    <div className="judgeOption">
                        <input type="radio" name="option" value="minus1" onClick={this.showMinus1UI} /><div>风评-1</div>
                        </div>
                </div>
            </div>
            {UI}
            <div className="row" style={{ justifyContent: "space-around" }}>
                <button onClick={this.confirm} className="confirmManagement">确认</button>
                <button onClick={this.close} style={{ marginRight: "2rem" }} className="confirmManagement">关闭</button>
            </div>
        </div>;

    }

}
