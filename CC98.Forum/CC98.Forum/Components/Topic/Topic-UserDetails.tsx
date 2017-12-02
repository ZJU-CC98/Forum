import * as React from 'react';
import * as Utility from '../../Utility';
declare let moment: any;
export class UserDetails extends React.Component<{ userName, userId }, { portraitUrl, userName, fanCount, displayTitle, birthday, gender, prestige, levelTitle, buttonIsDisabled, buttonInfo, isFollowing }>{
    constructor(props) {
        super(props);
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
        this.state = ({
            portraitUrl: null, userName: null, fanCount: null, displayTitle: null, birthday: null, gender: null, prestige: null, levelTitle: null, buttonInfo: '关注',
            buttonIsDisabled: false,
            isFollowing: false
        });
    }
    async unfollow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '取关中'
            });
            const token = Utility.getLocalStorage("accessToken");
            const userId = this.props.userId;
            const url = `http://apitest.niconi.cc/user/unfollow/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'DELETE',
                headers
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '重新关注',
                    isFollowing: false
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    async follow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '关注中'
            });
            const token = Utility.getLocalStorage("accessToken");

            const userId = this.props.userId;
            const url = `http://apitest.niconi.cc/user/follow/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'POST',
                headers
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '取消关注',
                    isFollowing: true
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }

    async componentDidMount() {
        const data = await Utility.getUserDetails(this.props.userName, this.context.router);
        this.setState({ portraitUrl: data.portraitUrl, userName: data.userName, fanCount: data.fanCount, displayTitle: data.displayTitle, birthday: data.birthday, prestige: data.prestige, gender: data.gender, levelTitle: data.levelTitle, isFollowing: data.isFollowing, buttonInfo: data.isFollowing ? '取消关注' : '关注' });
    }
    render() {
        let title = this.state.displayTitle;
        if (this.state.displayTitle === null) {
            title = this.state.levelTitle;
        }
        const year = moment(this.state.birthday).format("YYYY");
        let birthday;
        if (year === "9999") {
            birthday = moment(this.state.birthday).format("MM-DD");
        } else {
            birthday = moment(this.state.birthday).format("YYYY-MM-DD");
        }
        if (this.state.birthday == null) {
            birthday = '保密';
        }
        let gender;
        if (this.state.gender === 0) {
            gender = <i style={{ color: "pink" }} className="fa fa-venus fa-lg fa-fw"></i>;
        } else {
            gender = <i style={{ color: "blue" }} className="fa fa-mars fa-lg fa-fw"></i>;
        }
        const url = `/user/name/${this.props.userName}`;
        const userUrl = encodeURI(url);
        const urlHtml = <a href={userUrl}> <img src={this.state.portraitUrl}></img></a>;
        return <div className='popup'>
            <div className='popup_title'>
                <div className="row">
                    <div className="row authorImg" style={{ marginLeft: "10px", marginTop: "10px" }}>
                        {urlHtml}
                    </div>
                    <div className="column" style={{ marginLeft: "1.6rem", marginTop: "2rem" }}>
                        <div className="row">
                            <div style={{ fontFamily: "微软雅黑", color: "blue", marginRight: "0.63rem", width: "8rem" }}> {this.state.userName}</div>
                            <div style={{ marginRight: "0.63rem", fontSize: "1rem" }}>   粉丝  </div>
                            <div style={{ color: "red", fontSize: "1rem" }}>{this.state.fanCount}</div>
                        </div>
                        <div className="row" style={{ marginTop: "0.63rem", fontSize: "0.87rem" }}>
                            {title}
                        </div>

                    </div>

                    <div>
                        <button className="followuser" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>

                    </div>
                </div>
                <div className="row" style={{ fontSize: "0.87rem" }}>
                    <div style={{ marginLeft: "7.2rem" }}>威望&nbsp;{this.state.prestige}</div><div style={{ marginLeft: "1rem" }}>生日&nbsp;{birthday}</div>
                    <div style={{ marginLeft: "1rem" }}>{gender}</div>
                </div>
            </div>
        </div>;
    }
}
