import * as React from 'react';
interface Props {
    postId;
    portraitUrl;
    content;
    userName;
    reason;
}
export class AwardInfo extends React.Component<Props> {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return <div className="good tagSize" >
            <div className="userImage"><img src={this.props.portraitUrl}></img> </div>
            <div className="userName">{this.props.userName}</div>
            <div className="grades">{this.props.content}</div>
            <div className="credit"><span>{this.props.reason}</span></div>
        </div>;
    }
}
