import * as React from 'react';
import * as Utility from '../../Utility';
import { AwardInfo } from './Topic-AwardInfo';
import { connect } from 'react-redux';
export class Award extends React.Component<{ postId ,updateTime}, {info, awardPage }>{
    constructor(props, content) {
        super(props, content);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.state = { info: [], awardPage:1 }
    }

    async componentDidMount() {

        const award = await Utility.getAwardInfo(this.props.postId, 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({ info: awardInfo})
    }
    async componentWillReceiveProps(newProps) {


        const award = await Utility.getAwardInfo(newProps.postId, 1);

        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
        this.setState({  info: awardInfo, awardPage: 1 })
    }
    async generateAwardInfo(item) {
        const url = await Utility.getPortraitUrl(item.operatorName);
        return <AwardInfo postId={this.props.postId} userImgUrl={url} content={item.content} reason={item.reason} userName={item.operatorName} />;

    }
    async nextPage() {
        const page = this.state.awardPage;
        const award = await Utility.getAwardInfo(this.props.postId, page + 1);

        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);

        this.setState({ info: awardInfo, awardPage: page + 1 });
    }
    async lastPage() {
        const id = `#awardPager${this.props.postId}`;
        const page = this.state.awardPage;
        if (this.state.awardPage === 1) {
            $(id).css("disabled", "true");
            return;
        }
        const award = await Utility.getAwardInfo(this.props.postId, page - 1);
        const info = award.map(this.generateAwardInfo.bind(this));
        const awardInfo = await Promise.all(info);
     
        this.setState({ info: awardInfo, awardPage: page - 1 });
    }
    render() {
        const lastPageId = `lastPage${this.props.postId}`;
        const awardPagerId = `awardPager${this.props.postId}`;
        const awardPagerJQID = `#awardPager${this.props.postId}`;
        const awardInfoJQID = `#awardInfo${this.props.postId}`;
        const awardInfoID = `awardInfo${this.props.postId}`;
        let awardPager = null;
        $(awardInfoJQID).css("display", "");
        if (this.state.info.length !== 0) {
            awardPager = < div className="awardPager" id={awardPagerId}>
                <button className="awardPage" id={lastPageId} onClick={this.lastPage}>上一页</button>
                <button className="awardPage" onClick={this.nextPage}>下一页</button>
            </div>;
            if (this.state.info.length < 10) {
                $(awardPagerJQID).css("display", "none");
                $(awardInfoJQID).css("display", "");
        } 
        } else{
            $(awardInfoJQID).css("display", "none");
        }
        return <div className="column awardInfo" id={awardInfoID} >
            {this.state.info}
            {awardPager}
        </div>;
    }
}
