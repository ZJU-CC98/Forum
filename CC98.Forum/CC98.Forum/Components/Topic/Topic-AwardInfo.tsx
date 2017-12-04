import * as React from 'react';
export class AwardInfo extends React.Component<{ postId, userImgUrl, content, userName, reason }> {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return <div className="good tagSize" >
            <div className="userImage"><img src={this.props.userImgUrl}></img> </div>
            <div className="userName">{this.props.userName}</div>
            <div className="grades">{this.props.content}</div>
            <div className="credit"><span>{this.props.reason}</span></div>
        </div>;
    }
}
