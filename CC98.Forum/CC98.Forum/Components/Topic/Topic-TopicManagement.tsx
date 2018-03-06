import * as React from 'react';
import * as Utility from '../../Utility';
declare global {
    interface JQuery { spectrum: any}
}
interface Props {
    update;
    boardId;
    updateTime;
    topicInfo;
}
export class TopicManagement extends React.Component<Props, { state, reason, tips, days, board, topicInfo,fetchState ,color}>{
    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.close = this.close.bind(this);
        this.showHighlight = this.showHighlight.bind(this);
        this.showNormal = this.showNormal.bind(this);
        this.showNoReason = this.showNoReason.bind(this);
        this.showDays = this.showDays.bind(this);
        this.showBoard = this.showBoard.bind(this);
        this.reasonInput = this.reasonInput.bind(this);
        this.daysInput = this.daysInput.bind(this);
        this.boardInput = this.boardInput.bind(this);
        this.state = {
            state: "normal", reason: "", tips: "", days: 0, board: null, topicInfo: this.props.topicInfo, fetchState: 'ok', color: "#fff"
        };
    }
    showIP() {
        
    }
    showNormal() {
        this.setState({ state: 'normal' });
    }
    showNoReason() {
        this.setState({ state: 'noReason' });
    }
    showDays() {
        this.setState({ state: 'days' });
    }
    showHighlight() {
        this.setState({ state: 'highlight' });
    }
    showBoard() {
        this.setState({ state: 'board' });
    }
    async confirm() {
        let status = 'ok';
  
        switch (this.state.state) {
     
            case 'normal':
                if (this.state.reason !== "") {
                    switch ($("input[name='option']:checked").val()) {

                        case '取消固顶':
                            status = await Utility.removeBoardTopTopic(this.props.topicInfo.id, this.props.boardId, this.state.reason);
                            this.setState({ fetchState: status });
                        case '取消全站固顶':
                            status = await Utility.removeBoardTopTopic(this.props.topicInfo.id, this.props.boardId, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '删除':
                            status =  await Utility.deleteTopic(this.props.topicInfo.id, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '加精':
                            status = await Utility.setBestTopic(this.props.topicInfo.id, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '解除精华':
                            status =  await Utility.cancelBestTopic(this.props.topicInfo.id,  this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '解锁':
                            status =  await Utility.unLockTopic(this.props.topicInfo.id, this.props.boardId, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '禁止热门':
                            status =  await Utility.setDisableHot(this.props.topicInfo.id, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '允许热门':
                            status =   await Utility.cancelDisableHot(this.props.topicInfo.id, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                    }
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'highlight':
                const color = $("#custom").spectrum("get").toHexString($("#custom").spectrum("get"));
                if (this.state.reason !== "") {
                
                   
                    const bold = $("input[name='bold']:checked") ? true : false;
                    const italic = $("input[name='italic']:checked") ? true : false;
                    await Utility.setHighlight(this.props.topicInfo.id, bold, italic, color, this.state.days, this.state.reason);
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'days':
            
                if (this.state.reason ) {
                    switch ($("input[name='option']:checked").val()) {
                        case '固顶':
                           status =  await Utility.addBoardTopTopic(this.props.topicInfo.id, this.props.boardId, 2, this.state.days, this.state.reason);
                            this.setState({ fetchState: status });
                            break;
                        case '全站固顶':
                          
                            status = await Utility.addBoardTopTopic(this.props.topicInfo.id, this.props.boardId, 4, this.state.days, this.state.reason);
                        
                            this.setState({ fetchState: status });
                            break;
                        case '锁定':
                        
                           status =  await Utility.lockTopic(this.props.topicInfo.id, this.props.boardId, this.state.reason, this.state.days);
                            this.setState({ fetchState: status });
                            break;
                    }           
                } else {
                    this.setState({ tips: "请输入原因！" });
                }
                break;
            case 'board':
                if (this.state.reason) {
                    status = await Utility.moveTopic(this.props.topicInfo.id, this.state.board, this.state.reason);
                    if (status === 'ok') {
                        this.setState({ fetchState: status });
                        break;
                    } else {
                        this.setState({ tips: "输入有误！" });
                    }
                } else{
                    this.setState({ tips: "请输入原因！" });
                }
        }
        if (status === 'ok') {
            this.setState({ tips: "操作成功" });
            const UIId = `#manage${this.props.topicInfo.id}`;
            $(UIId).css("display", "none");
            const data = await Utility.getTopicInfo(this.props.topicInfo.id);
            this.setState({ topicInfo: data });
            this.props.update();
        }
    }
    close() {
        const UIId = `#manage${this.props.topicInfo.id}`;
        $(UIId).css("display", "none");
    }
    reasonInput(e) {

        this.setState({ reason: e.target.value });

    }
    daysInput(e) {

        this.setState({ days: e.target.value });

    }
    boardInput(e) {

        this.setState({ board: e.target.value });

    }

   async componentDidUpdate() {
        
        $("#custom").spectrum({
            color: "#f00"
        });
    }
    async componentWillReceiveProps(newProps) {
        const data = await Utility.getTopicInfo(newProps.topicInfo.id);
        this.setState({ topicInfo: data });
    }
    render() {
      
        //console.log(this.props.topicInfo);
        let info;

        const normalInfo = <div className="column">
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />

            </div>
            <div>{this.state.tips}</div>
        </div>;
        const noReasonInfo = null;
        const daysInfo = <div className="column">
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >天数</div>
                <input type="text" value={this.state.days} onChange={this.daysInput} />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />

            </div>
            <div>{this.state.tips}</div>
        </div>;
        const boardInfo = <div className="column">
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >版面</div>
                <input type="text" value={this.state.board} onChange={this.boardInput} />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />

            </div>
            <div>{this.state.tips}</div>
        </div>;
        const highlightInfo = <div className="column">
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >加粗</div>
                <input type="radio" value='加粗' name='bold' />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >斜体</div>
                <input type="radio" value='斜体' name='italic' />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >颜色</div>
                <input type='text' id="custom" />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
            <div >天数</div>
                <input type="text" value={this.state.days} onChange={this.daysInput} />
            </div>
            <div className="row manageOperation" style={{ justifyContent: "space-around", marginTop: "1rem" }}>
                <div >原因</div>
                <input type="text" value={this.state.reason} onChange={this.reasonInput} />

            </div>
            <div>{this.state.tips}</div>
        </div>;
        switch (this.state.state) {
            case 'normal':
                info = normalInfo; break;
            case 'noReason':
                info = noReasonInfo; break;
            case 'days':
                info = daysInfo; break;
            case 'board':
                info = boardInfo; break;
            case 'highlight':
                info = highlightInfo; break;
        }
        const UI = <div className="column manageInfo" id="award">

            <div className="column" style={{ alignItems: 'center' }}>

                <div className="row">


                    <div className="row">
                        <input type="radio" name="option" value={this.props.topicInfo.state === 1 ? '解锁' : "锁定"} onClick={this.props.topicInfo.state === 1 ? this.showNormal:this.showDays} />
                        <div>{this.props.topicInfo.state === 1 ? '解锁' : "锁定"}</div>
                    </div>


                    <div className="row">
                        <input type="radio" name="option" value={this.props.topicInfo.disableHot ? "允许热门" : "禁止热门"} onClick={this.showNormal} />
                        <div>{this.props.topicInfo.disableHot ? "允许热门" : "禁止热门"}</div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="row">
                        <input type="radio" name="option" value="删除" onClick={this.showNormal} />
                        <div>删除</div>
                    </div>



                    <div className="row">
                        <input type="radio" name="option" value="移动" onClick={this.showBoard} />
                        <div>移动</div>
                    </div>
                </div>

                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="row">
                        <input type="radio" name="option" value={this.props.topicInfo.topState === 2 ? '取消固顶' : '固顶'} onClick={this.props.topicInfo.topState === 2 ? this.showNormal : this.showDays} />
                        <div>{this.props.topicInfo.topState === 2 ? '取消固顶' : '固顶'}</div>
                    </div>

                    <div className="row">
                        <input type="radio" name="option" value={this.props.topicInfo.topState === 4 ? '取消全站固顶' : '全站固顶'} onClick={this.props.topicInfo.topState === 4 ? this.showNormal : this.showDays} />
                        <div>{this.props.topicInfo.topState === 4 ? '取消全站固顶' : '全站固顶'}</div>
                    </div>

                    <div className="row">
                        <input type="radio" name="option" value={this.props.topicInfo.bestState === 1 ? "解除精华" : "加精"} onClick={this.showNormal} />
                        <div>{this.props.topicInfo.bestState === 1 ? "解除精华" : "加精"}</div>
                    </div>

                    <div className="row">
                        <input type="radio" name="option" value="高亮" onClick={this.showHighlight} />
                        <div>高亮</div>
                    </div>
                </div>
            </div>
            {info}

        </div>;
        const UIId = `manage${this.props.topicInfo.id}`;
        const highlightOptionId = `manage${this.props.topicInfo.id}`;
        return <div style={{ display: "none" }} id={UIId} className="topicManagement" >
            {UI}
            < div className="row" style={{ justifyContent: "space-around", marginTop:"1rem" }}>
                <button onClick={this.confirm} className="confirmManagement">确认</button>
                <button onClick={this.close} className="confirmManagement">关闭</button>
            </div >
        </div >;
    }
}