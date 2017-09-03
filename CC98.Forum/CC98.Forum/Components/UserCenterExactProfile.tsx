// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../States/AppState';

/**
 * 用户中心主页个人资料组件
 */
export class UserCenterExactProfile extends React.Component<UserCenterExactProfileProps> {
    render() {
        return (
            <div className="user-profile">
                <button type='button'>私信</button>
                <div id='userId'><p>{this.props.userInfo.name}</p></div>
                <div id='userGenderAndBirthday'>
                    <p>性别  {(this.props.userInfo.gender === 0) ? '男' : '女'} </p>{this.props.userInfo.birthday === null ? '' : <p>生日  {this.props.userInfo.birthday.slice(0, this.props.userInfo.birthday.indexOf('T'))}</p>}
                </div>
                {this.props.userInfo.personalDescription ?
                    <div className='user-description'>
                        <p>个人说明</p>
                        <img src={this.props.userInfo.photourl} />
                        <p>{this.props.userInfo.personalDescription}</p>
                    </div> : null
                }
                {this.props.userInfo.signatureCode ?
                    <div className='user-description'>
                        <p>个性签名</p>
                        <p>{this.props.userInfo.signatureCode}</p>
                    </div> : null
                }
            </div>
        );
    }
}

interface UserCenterExactProfileProps {
    userInfo: UserInfo
}