import * as React from 'react';
import * as Utility from '../Utility';
import { UbbEditor } from './UbbEditor';
export class Signin extends React.Component<{}, { signinInfo ,content}>{
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.signin = this.signin.bind(this);
        this.state = {
            signinInfo: {lastSignInCount:0,lastSignInTime:0},content:"" }
    }
    async componentDidMount() {
        const signinInfo = await Utility.getSigninInfo();
        this.setState({ signinInfo: signinInfo });
    }
    update(value) {
        this.setState({ content: value });
    }
    async signin() {
        Utility.signin(this.state.content);
        const signInMes = await Utility.getGlobalConfig();
        const signInTopicId = signInMes.signInTopicId;
        const topicInfo = await Utility.getTopicInfo(signInTopicId);
        const count = topicInfo.replyCount;
        const page = Utility.getTotalPageof10(count);
        window.location.href = `/topic/${signInTopicId}#${page}`;
        this.setState({ content: "" });
    }
    render() {
        return <div className="column" style={{width:"100%"}}>
            <div>
                {this.state.signinInfo.lastSignInCount}
            </div>
            <div>
                <UbbEditor update={this.update} value={this.state.content} />
                <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                    <div id="post-topic-button" onClick={this.signin} className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }}>签到
                    </div>
                </div>
            </div>
        </div>;
    }
}
