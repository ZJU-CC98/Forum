import * as React from 'react';
import * as Utility from '../../Utility';
import  AwardInfo  from './Topic-AwardInfo';
import { connect } from 'react-redux';
interface Props {
    postId;
    updateTime;
    awardInfo;
}
export class Award extends React.Component<Props, {info,shortInfo,count,showAll }>{
    constructor(props, content) {
        super(props, content);
        this.showAll = this.showAll.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.generateAwardInfo = this.generateAwardInfo.bind(this);
        this.state = { info: [],shortInfo:[],count:0 ,showAll:false}
    }
    hideAll() {
        this.setState({ showAll: false});
    }
    showAll(){
        this.setState({ showAll: true });
    }
    async componentDidMount() {
        let shortInfo = [];
        let award = this.props.awardInfo;
        if (!award) { award = []; }
        const usersName = [];
        let usersInfo = [];
        for (let i in award) {
            usersName[i] = award[i].operatorName;
        }
       if (award.length>0)
        usersInfo = await Utility.getUsersInfobyNames(usersName);
      
        for (let i in award) {
            
            let thisUserInfo = Utility.getThisUserInfobyName(award[i].operatorName, usersInfo);
            //console.log("find");
            //console.log(thisUserInfo);
            award[i].portraitUrl = thisUserInfo.portraitUrl;
            //console.log("award0");
           // console.log(award[i]);
        }
        if (award.length > 10) {
            for (let i = 0; i < 10; i++) {
                shortInfo[i] =this.generateAwardInfo(award[i]);
             }
        }
        const info = award.map(this.generateAwardInfo.bind(this));
        this.setState({ info: info,shortInfo:shortInfo,count:award.length})
    }
    async componentWillReceiveProps(newProps) {
        let shortInfo = [];
        let award = newProps.awardInfo;
        if (!award) { award = []; }
        const usersName = [];
        let usersInfo = [];
        for (let i in award) {
            usersName[i] = award[i].operatorName;
        }
        usersInfo = await Utility.getUsersInfobyNames(usersName);
        if (award.length > 10) {
            for (let i = 0; i < 10; i++) {
                let thisUserInfo = Utility.getThisUserInfobyName(award[i].operatorName, usersInfo);
                award[i].portraitUrl = thisUserInfo.portraitUrl;
                console.log(award[i]);
                shortInfo[i] = this.generateAwardInfo(award[i]);
            }
        }
        const info = award.map(this.generateAwardInfo.bind(this));
        this.setState({ info: info, shortInfo: shortInfo, count: award.length });
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
        return <div className="column awardInfo" id={awardInfoID} >
            <div className="row" style={{ width: "25rem", fontSize: "0.8rem", marginBottom:"0.2rem" }}>
                <div style={{ marginLeft:"3.1rem" }}>用户</div>
                <div style={{ marginLeft: "4.7rem" }}>操作</div>
                <div style={{ marginLeft: "8.9rem" }}>理由</div>
            </div>
            {this.state.count > 10 ? (this.state.showAll ? this.state.info : this.state.shortInfo) : this.state.info}
            {this.state.count>10?btn:null}
        </div>;
    }
}
