// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from '../../../States/AppState';
import { UbbContainer } from '../../UbbContainer';
import * as Utility from '../../../Utility';
import { UbbCodeOptions } from '../../../Ubb/Core';
import { Tag } from 'antd'

interface Props {
    /**
     * 用户信息
     */
    userInfo: UserInfo
}

/**
 * 判断关注状态用
 * 需要一些state
 */
interface States {
    /**
     * 当前用户是否关注该用户
     */
    isFollowing: boolean;
    /**
     * 在发起请求时用来禁用按钮
     * 防止多次提交
     */
    buttonIsDisabled: boolean;
    /**
     * 在按钮上显示的信息
     */
    buttonInfo: string;
}

/**
 * 用户详情页
 * 个人资料组件
 */
export default class extends React.Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: props.userInfo.isFollowing,
            buttonIsDisabled: false,
            buttonInfo: props.userInfo.isFollowing ? '已关注' : '关注'
        }
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    /**
     * 不同的头衔显示不同的颜色
     */
    getPrivilegeColor() {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    }

    async follow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '关注中'
        });
        let res = await Utility.followUser(this.props.userInfo.id);
        if (res === true) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '已关注',
                isFollowing: true
            });
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
    async unfollow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '取关中'
        });
        let state = await Utility.unfollowUser(this.props.userInfo.id);

        if (state === true) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '重新关注',
                isFollowing: false
            });
        } else {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    render() {
        //一个彩蛋，若当天为用户生日则显示一个生日蛋糕
        let isBirthDay = false;
        if (!!this.props.userInfo.birthday) {
            const match = this.props.userInfo.birthday.match(/\d+-(\d+)-(\d+)/);
            const now = new Date();
            if (Number.parseInt(match[1]) === (now.getMonth() + 1) && Number.parseInt(match[2]) === now.getDate()) {
                isBirthDay = true;
            }
        }

        return (
            <div className="user-profile">
                <div id="userId">
                    <div id="userId"><p>{this.props.userInfo.name}
                        <span style={{ fontSize: '12px', color: this.getPrivilegeColor(), marginLeft: '2rem' }}>{this.props.userInfo.privilege}</span></p>

                        <div className="row">
                            <Tag
                                color="grey"
                                style={{
                                    width: '5rem',
                                    textAlign: 'center',
                                    marginRight: 0,
                                    height: '2rem',
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    fontSize: 16,
                                    lineHeight: '2rem'
                                }}
                            >
                                收到的赞
              </Tag>
                            <Tag
                                className="board-head-information"
                                style={{
                                    width: '5rem',
                                    height: '2rem',
                                    textAlign: 'center',
                                    marginRight: 0,
                                    borderLeft: 0,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    fontSize: 16,
                                    lineHeight: '2rem'
                                }}
                            >
                                {this.props.userInfo.receivedLikeCount}
                            </Tag>
                        </div>

                        <Link to={`/message/message?id=${this.props.userInfo.id}`}><button type="button">私信</button></Link>
                        <button type="button"
                            id={this.state.isFollowing ? 'unfollow' : ''}
                            onClick={this.state.isFollowing ? this.unfollow : this.follow}
                            disabled={this.state.buttonIsDisabled}
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
                        >{this.state.buttonInfo}</button>
                    </div>
                </div>
                <div id="userIntroducion">{this.props.userInfo.introduction}</div>
                <div id="userGenderAndBirthday">
                    <p><span className="user-profile-info">性别</span>{(this.props.userInfo.gender === 1) ? '男' : '女'} </p>
                    <p><span className="user-profile-info">发帖数</span>{this.props.userInfo.postCount}</p>
                    <p><span className="user-profile-info">威望</span>{this.props.userInfo.prestige}</p>
                    <p><span className="user-profile-info">粉丝数</span>{this.props.userInfo.fanCount}</p>
                    <p><span className="user-profile-info">风评</span>{this.props.userInfo.popularity}</p>
                    <p><span className="user-profile-info">注册时间</span>{this.props.userInfo.registerTime.replace('T', ' ')}</p>
                    <p><span className="user-profile-info">最后登录</span>{this.props.userInfo.lastLogOnTime.replace('T', ' ')}</p>
                    {this.props.userInfo.birthday === null ? null : <p><span className="user-profile-info">生日</span>{this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T')).replace('9999-', '')}{isBirthDay ? <span style={{ fontFamily: 'FontAwesome', marginLeft: '1rem' }} className="fa-birthday-cake" title="生日快乐~"></span> : null}</p>}
                    {this.props.userInfo.displayTitle ? <p><span className="user-profile-info">用户组</span>{this.props.userInfo.displayTitle}</p> : null}
                    {this.props.userInfo.emailAddress ? <p><span className="user-profile-info">邮箱</span>{this.props.userInfo.emailAddress}</p> : null}
                    {this.props.userInfo.qq ? <p><span className="user-profile-info">QQ</span>{this.props.userInfo.qq}</p> : null}
                    <p><span className="user-profile-info">被删帖数</span>{-this.props.userInfo.deleteCount}</p>
                </div>
                {this.props.userInfo.signatureCode ?
                    <div className="user-description">
                        <p>个性签名</p>
                        <UbbContainer code={this.props.userInfo.signatureCode} options={{ ...new UbbCodeOptions(), allowExternalImage: false }} />
                    </div> : null
                }
            </div>
        );
    }
}
