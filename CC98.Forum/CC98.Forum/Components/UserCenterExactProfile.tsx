// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../States/AppState';
import { UbbContainer } from './UbbContainer'

/**
 * 用户中心主页个人资料组件
 */
export class UserCenterExactProfile extends React.Component<UserCenterExactProfileProps> {
    getPrivilegeColor() {
        switch (this.props.userInfo.privilege) {
            case '注册用户': return 'grey';
            case '超级版主': return 'pink';
            case '全站贵宾': return 'blue';
            case '管理员': return 'red';
        }
    }
    render() {
        return (
            <div className="user-profile">
                <div id="userId"><p>{this.props.userInfo.name}      <span style={{ fontSize: '12px', color: this.getPrivilegeColor() }}>{this.props.userInfo.privilege}</span></p><button type="button" onClick={() => { location.pathname = '/message/message' }}>私信</button></div>
                <div id="userGenderAndBirthday">
                    <p>性别：  {(this.props.userInfo.gender === 1) ? '男' : '女'} </p>
                    {this.props.userInfo.birthday === null ? null : <p>生日：  {this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T'))}</p>}
                    {this.props.userInfo.emailAddress ? <p>邮箱：  {this.props.userInfo.emailAddress}</p> : null}
                    {this.props.userInfo.qq ? <p>QQ：  {this.props.userInfo.qq}</p> : null}
                    {this.props.userInfo.postCount ? <p>发帖数：  {this.props.userInfo.postCount}</p> : null}
                    {this.props.userInfo.prestige ? <p>威望：  {this.props.userInfo.prestige}</p> : null}
                    {this.props.userInfo.displayTitle ? <p>用户组：  {this.props.userInfo.displayTitle}</p> : null}
                    {this.props.userInfo.registerTime ? <p>注册时间：  {this.props.userInfo.registerTime.replace('T', ' ')}</p> : null}
                    {this.props.userInfo.lastLogOnTime ? <p>最后登录时间：  {this.props.userInfo.lastLogOnTime.replace('T', ' ')}</p> : null}
                </div>
                {this.props.userInfo.signatureCode ?
                    <div className="user-description">
                        <p>个性签名</p>
                        <UbbContainer code={this.props.userInfo.signatureCode} />
                    </div> : null
                }
            </div>
        );
    }
}

interface UserCenterExactProfileProps {
    userInfo: UserInfo
}