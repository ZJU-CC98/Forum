﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import * as Utility from '../../Utility';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../Actions/UserCenter';

interface OwnProps {
    userFanInfo: UserInfo;
}
interface Props extends OwnProps {
    follow: (id: number) => void;
    unfollow: (id: number) => void;
}

interface State {
    buttonIsDisabled: boolean;
    buttonInfo: string;
    isFollowing: boolean;
}

//用户中心我的关注&我的粉丝用户通用组件
class Fan extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            buttonInfo: this.props.userFanInfo.isFollowing ? '已关注' : '关注',
            buttonIsDisabled: false,
            isFollowing: this.props.userFanInfo.isFollowing
        }
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if(nextProps.userFanInfo.id !== this.props.userFanInfo.id) {
            this.setState({
                buttonInfo: nextProps.userFanInfo.isFollowing ? '已关注' : '关注',
                buttonIsDisabled: false,
                isFollowing: nextProps.userFanInfo.isFollowing
            });
        }
    }

    async unfollow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '取关中'
        });
        let res = Utility.unfollowUser(this.props.userFanInfo.id);
        if (res) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '重新关注',
                isFollowing: false
            });
            this.props.unfollow(this.props.userFanInfo.id);
        } else {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    async follow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '关注中'
        });
        let res = await Utility.followUser(this.props.userFanInfo.id);
        if (res === true) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '已关注',
                isFollowing: true
            });
            this.props.follow(this.props.userFanInfo.id);
        } else if (res === 'follow_count_limited') {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '已达上限',
                isFollowing: false
            });
        } else {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }

    render() {
        return (
            <div className="user-center-myfollowings-user">
                <img src={this.props.userFanInfo.portraitUrl} />
                <p>
                    <span className="user-center-myfollowings-user-id"><Link to={`/user/id/${this.props.userFanInfo.id}`}>{this.props.userFanInfo.name}</Link></span>
                    帖数
                    <span className="user-center-myfollowings-user-posts">{this.props.userFanInfo.postCount}</span>
                    粉丝
                    <span className="user-center-myfollowings-user-fans">{this.props.userFanInfo.fanCount}</span>
                </p>
                <button
                    key={this.props.userFanInfo.id}
                    type="button"
                    className={this.state.isFollowing ? '' : 'user-follow'}
                    onMouseOver={() => {
                        if (this.state.isFollowing && !this.state.buttonIsDisabled) {
                            this.setState({
                                buttonInfo: '取消关注'
                            });
                        }
                    }}
                    onMouseLeave={() => {
                        if (this.state.isFollowing && !this.state.buttonIsDisabled) {
                            this.setState({
                                buttonInfo: '已关注'
                            });
                        }
                    }}
                    onClick={this.state.isFollowing ? this.unfollow : this.follow}
                    disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}
                </button>
                <Link to={`/message/message?id=${this.props.userFanInfo.id}`}><button
                    className="user-message"
                    type="button"
                >私信</button></Link>                    
            </div>
        );
    }
}

function mapState(state, ownProps:OwnProps) {
    return {
        userFanInfo: ownProps.userFanInfo
    };
}

function mapDispatch(dispatch) {
    return {
        follow: (id: number) => {
            dispatch(Actions.followUser(id));
        },
        unfollow: (id: number) => {
            dispatch(Actions.unfollowUser(id));
        }
    };
}

export default connect(mapState, mapDispatch)(Fan);