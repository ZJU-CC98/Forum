import * as React from 'react';
import * as Utility from '../../Utility';
import  AwardInfo  from './Topic-AwardInfo';
import { connect } from 'react-redux';
interface Props {
    postId;
    updateTime;
    awardInfo;
}
export class Award extends React.Component<Props, { info, shortInfo, count, showAll, popularity_count, popularity_sum }>{
    constructor(props, content) {
        super(props, content);
        this.showAll = this.showAll.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.generateAwardInfo = this.generateAwardInfo.bind(this);
        this.state = { info: [], shortInfo: [], count: 0, showAll: false, popularity_count: 0, popularity_sum: 0 }
    }
    hideAll() {
        this.setState({ showAll: false});
    }
    showAll(){
        this.setState({ showAll: true });
    }
    async update_award(first_ten = false) {
        let award = this.props.awardInfo;
        if (!award) { award = []; }
        const usersName = [];
        for (let i in award) {
            usersName[i] = award[i].operatorName;
        }
        let usersInfo = await Utility.getUsersInfobyNames(usersName);
        let popularity_cnt = 0, popularity_sum = 0;
        for (let i = 0; i < award.length; i++) {
            let thisUserInfo = Utility.getThisUserInfobyName(award[i].operatorName, usersInfo);
            award[i].portraitUrl = thisUserInfo.portraitUrl;
            if (first_ten && i >= 10) break;
            if (award[i].content.startsWith("风评值")) {
                popularity_cnt += 1;
                if (award[i].content.endsWith("+1")) {
                    popularity_sum += 1;
                } else {
                    popularity_sum -= 1;
                }
            }
        }

        let shortInfo = [];
        if (award.length > 10) {
            for (let i = 0; i < 10; i++) {
                shortInfo[i] = this.generateAwardInfo(award[i]);
            }
        }

        const info = award.map(this.generateAwardInfo.bind(this));
        this.setState({
            info: info, shortInfo: shortInfo, count: award.length,
            popularity_count: popularity_cnt, popularity_sum: popularity_sum,
        })
    }
    async componentDidMount() {
        await this.update_award(false);
    }
    async componentWillReceiveProps(newProps) {
        await this.update_award(true);
    }
    
    generateAwardInfo(item) {
        return <AwardInfo
            postId={this.props.postId} 
            topicId={item.id}
            portraitUrl={item.portraitUrl} 
            content={item.content} 
            reason={item.reason} 
            userName={item.operatorName} 
        />;
    }
    render() {
        const awardInfoJQID = `#awardInfo${this.props.postId}`;
        const awardInfoID = `awardInfo${this.props.postId}`;
        $(awardInfoJQID).css("display", "");
        if (this.state.info && this.state.info.length !== 0) {
            if (this.state.info.length < 10) {
                $(awardInfoJQID).css("display", "");
            } 
        } else{
            $(awardInfoJQID).css("display", "none");
        }
        const btn = <button style={{ border: "#eaeaea solid thin", cursor:"pointer" }} onClick={this.state.showAll ? this.hideAll : this.showAll}>{this.state.showAll ? '收起' : '显示全部'}</button>;
        const popularity_result = <div className="good tagSize">
            <div>风评总数：{this.state.popularity_count}</div>
            <div style={{ marginLeft: "3rem" }}>风评值：{this.state.popularity_sum}</div>
        </div>;
        const show_popularity_result = this.state.count ? (this.state.count > 10 ? this.state.showAll : true) : false;
        return <div className="column awardInfo" id={awardInfoID} >
            <div className="row" style={{ width: "25rem", fontSize: "0.8rem", marginBottom:"0.2rem" }}>
                <div style={{ marginLeft:"3.1rem" }}>用户</div>
                <div style={{ marginLeft: "4.7rem" }}>操作</div>
                <div style={{ marginLeft: "8.9rem" }}>理由</div>
            </div>
            {this.state.count > 10 ? (this.state.showAll ? this.state.info : this.state.shortInfo) : this.state.info}
            {show_popularity_result ? popularity_result : null}
            {this.state.count > 10 ? btn : null}
        </div>;
    }
}
