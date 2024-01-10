import * as React from 'react';
import {withRouter} from 'react-router'
interface Props {
    postId;
    portraitUrl;
    content;
    userName;
    reason;
    topicId;
}
 class AwardInfo extends React.Component<Props&{history}> {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        //console.log("props");
        console.log(this.props);
        return <div className="good tagSize" >
            <div className="userImage"><img style={{cursor: 'pointer'}} onClick={()=>this.props.history.push(`/user/name/${this.props.userName}`)} src={this.props.portraitUrl}></img> </div>
            <div className="userName" style={{cursor: 'pointer'}} onClick={()=>this.props.history.push(`/user/name/${this.props.userName}`)}>{this.props.userName}</div>
            <div className="grades">{this.props.content}</div>
            <div className="credit"><span>{this.props.reason}</span></div>
        </div>;
    }
}

export default withRouter(AwardInfo)