// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

//用户中心主页用户头像与徽章组件
export class UserCenterExactAvatar extends React.Component<UserCenterExactAvatarProps> {
    render() {
        return (
            <div className='user-avatar'>
                <img className='user-avatar-img' src={this.props.userAvatarImgURL} />
                <div className='user-badge'></div>
            </div>    
        );
    }
}

interface UserCenterExactAvatarProps {
    /**
    * 用户头像地址
    */
    userAvatarImgURL: string;
}