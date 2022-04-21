// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from '../../States/AppState';
import { UbbContainer } from '../UbbContainer'
import { UbbCodeOptions } from '../../Ubb/Core';
import { Tag } from 'antd'

/**
 * 用户中心主页个人资料组件
 */
export default class extends React.Component<UserCenterExactProfileProps> {
    getPrivilegeColor() {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    }
    render() {
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
                    <p>{this.props.userInfo.name}<span style={{ fontSize: '12px', color: this.getPrivilegeColor(), marginLeft: '2rem' }}>{this.props.userInfo.privilege}</span></p>

                    <div className="row" style={{ marginRight: '2rem' }}>
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

                    <Link to="/message/message"><button type="button">私信</button></Link>
                </div>
                <div id="userIntroducion">{this.props.userInfo.introduction}</div>
                <div id="userGenderAndBirthday">
                    <p><span className="user-profile-info">性别</span>{(this.props.userInfo.gender === 1) ? '男' : '女'} </p>
                    <p><span className="user-profile-info">发帖数</span>{this.props.userInfo.postCount}</p>
                    <p><span className="user-profile-info">财富值</span>{this.props.userInfo.wealth}</p>
                    <p><span className="user-profile-info">粉丝数</span>{this.props.userInfo.fanCount}</p>
                    <p><span className="user-profile-info">威望</span>{this.props.userInfo.prestige}</p>
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

interface UserCenterExactProfileProps {
    userInfo: UserInfo
}