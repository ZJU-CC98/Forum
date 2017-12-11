import * as React from 'react';
import * as Utility from '../../Utility';
/**
 * 作者信息状态
 */
export class AuthorMessageState {
    imgUrl: string;
    userName: string;
    fansNumber: number;
    isFollowing:boolean;
    buttonInfo;
    buttonIsDisabled:boolean;
}
export class AuthorMessage extends React.Component<{ isAnonymous: boolean, authorName: string, authorId: number, authorImgUrl: string, isFollowing: boolean, fanCount }, AuthorMessageState> {
    constructor(props, content) {
        super(props, content);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.state = {
            userName: 'Mana',
            fansNumber: 233,
            imgUrl: this.props.authorImgUrl,
            buttonInfo: '关注',
            isFollowing: false,
            buttonIsDisabled: false
        };
    }
    async unfollow() {
        try {
            this.setState({
                buttonIsDisabled: true,
                buttonInfo: '取关中'
            });
            const token = Utility.getLocalStorage("accessToken");
            const userId = this.props.authorId;
            const url = `http://apitest.niconi.cc/me/followee/${userId}`;
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

            const userId = this.props.authorId;
            const url = `http://apitest.niconi.cc/me/followee/${userId}`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                method: 'PUT',
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
    componenDidMount() {


        if (this.state.isFollowing === true) {
            this.setState({ buttonInfo: "取消关注", isFollowing: true });
        } else {
            this.setState({ buttonInfo: "关注", isFollowing: false });
        }
    }
    render() {
        const email = `/message/message?id=${this.props.authorId}`;
        const url = `/user/${this.props.authorId}`;
        let urlHtml = <a href={url}><img src={this.props.authorImgUrl}></img></a>;
        let userHtml = <div id="authorName"><p><a href={url}>{this.props.authorName}</a></p></div>;
        if (this.props.isAnonymous == true) {
            urlHtml = <img src={this.props.authorImgUrl}></img>;
            userHtml = <div id="authorName"><p>{this.props.authorName}</p></div>
        }
        if (this.props.isAnonymous === true) {
            $(".email").css("display", "none");
            $(".follow").css("display", "none");
            $(".authorFans").css("margin-top", "1rem");
            $("#fans").css("display", "none");
            $("#authorMes").css("width", "14rem");
        }
        return <div className="row" id="authormes">

            <div className="authorImg" >{urlHtml}</div>
            <div className="column" style={{ marginRight: "1rem" }}>
                <div className="row authorFans" style={{ justifyContent: "space-between" }}>
                    {userHtml}

                    <div id="fans" className="row"><div style={{ marginRight: "0.1875rem" }}>粉丝</div><div style={{ color: "#EE0000" }}>{this.props.fanCount}</div></div>
                </div>

                <div className="row">
                    <button className="follow" id={this.state.isFollowing ? '' : 'follow'} onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>
                    <a href={email}><button className="email">私信</button></a>
                </div>
            </div>
        </div>;
    }
}