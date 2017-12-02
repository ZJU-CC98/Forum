import * as React from 'react';
export class AwardInfo extends React.Component<{ postId, userImgUrl, content, userName, reason }, {}> {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return <div className="good tagSize" >
            <div id="userImage"><img src={this.props.userImgUrl}></img> </div>
            <div id="userName"><span>{this.props.userName}</span></div>
            <div id="grades"><span id="grade">{this.props.content}</span></div>
            <div id="credit"><span>{this.props.reason}</span></div>
        </div>;
    }
}