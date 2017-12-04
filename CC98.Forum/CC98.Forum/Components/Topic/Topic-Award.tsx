import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { connect } from 'react-redux';
export class Award extends React.Component<{ postId ,updateTime}, {info }>{
    constructor(props, content) {
        super(props, content);
        this.state = { info: [] }
    }

    async componentDidMount() {

        const award = await Utility.getAwardInfo(this.props.postId);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ info: awardInfo})
    }
    async componentWillReceiveProps(newProps) {
        const award = await Utility.getAwardInfo(newProps.postId);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({  info: awardInfo})
    }
    async generateAwardInfo(item) {
        const url = await Utility.getPortraitUrl(item.operatorName);
        return <AwardInfo postId={this.props.postId} userImgUrl={url} content={item.content} reason={item.reason} userName={item.operatorName} />;

    }
    render() {
        const awardInfoJQID = `#awardInfo${this.props.postId}`;
        const awardInfoID = `awardInfo${this.props.postId}`;
        $(awardInfoJQID).css("display", "");
        if (this.state.info.length !== 0) {
            if (this.state.info.length < 10) {
                $(awardInfoJQID).css("display", "");
        } 
        } else{
            $(awardInfoJQID).css("display", "none");
        }
        return <div className="column awardInfo" id={awardInfoID} >
            <div className="row" style={{ width: "20rem", fontSize:"0.8rem" }}>
                <div style={{ marginLeft:"3.1rem" }}>用户</div>
                <div style={{ marginLeft: "4.7rem" }}>操作</div>
                <div style={{ marginLeft: "5.9rem" }}>理由</div>
            </div>
            {this.state.info}
        </div>;
    }
}
