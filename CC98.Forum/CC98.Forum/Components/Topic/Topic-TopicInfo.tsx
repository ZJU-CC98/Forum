import * as React from 'react';
import { Link } from 'react-router-dom';
declare let moment: any;
export class TopicInfo extends React.Component<{topicInfo,boardInfo,tag,adsUrl}>{
    render() {
        const url = `/images/_${this.props.boardInfo.name}.png`;
        const boardUrl = `/list/${this.props.boardInfo.id}`;
        return <div className="topicInfo-info">
            <div className="topicInfo-boardInfo">
                <Link to={boardUrl}><div className="topicInfo-boardImage"><img className="topicInfo-boardImage" src={url} /></div></Link>
                <div className="topicInfo-boardMessage">
                    <Link to={boardUrl}><div style={{color:"#fff"}}>{this.props.boardInfo.name}</div></Link>
                    <div style={{ marginTop: "0.5rem", fontSize:"0.75rem" }}>{this.props.boardInfo.todayCount} / {this.props.boardInfo.topicCount}</div>
                </div>
            </div>
            <div className="topicInfo-title">
                    <div className="column" id="topicTitleProp" >
                        <div id="essay1" className="row">
                            {this.props.topicInfo.title}

                        </div>
                        <div className="row" id="essayProp">
                            <div id="tags"><div className="tagProp tagSize">标签： {this.props.tag}</div><div className="tagProp"></div></div>
                            <div id="time"><div className="viewProp"><i className="fa fa-clock-o fa-lg fa-fw"></i></div> <div className="timeProp tagSize">{moment(this.props.topicInfo.time).format('YYYY-MM-DD HH:mm:ss')}</div></div>
                            <div id="viewtimes"><div className="viewProp"><i className="fa fa-eye fa-lg fa-fw"></i>  </div> <div className="timeProp tagSize">{this.props.topicInfo.hitCount}</div></div>
                        </div>
                    </div>             
            </div>
            <div className="topicInfo-ads">
                <img className="topicInfo-ads" src={this.props.adsUrl} />
            </div>
                </div>;
    }
}