// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../States/AppState';

//用户中心我的关注&我的粉丝用户通用组件
export class UserCenterMyFollowingsUser extends React.Component<UserCenterMyFollowingsUserProps> {
    render() {
        return (
            <div className='user-center-myfollowings-user'>
                <img src={this.props.userFanInfo.avatarImgURL} />
                <p>
                    <span className='user-center-myfollowings-user-id'>{this.props.userFanInfo.name}</span>
                    主题
                    <span className='user-center-myfollowings-user-posts'>{this.props.userFanInfo.posts}</span>
                    粉丝
                    <span className='user-center-myfollowings-user-fans'>{this.props.userFanInfo.fans}</span>
                </p>
                <button type='button'>取消关注</button>
            </div>
        );
    }
}

interface UserCenterMyFollowingsUserProps {
    userFanInfo: UserFanInfo;
}