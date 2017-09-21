// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../States/AppState';
import { UserCenterMyFollowingsUser } from './UserCenterMyFollowingsUser';

//用户中心我的关注组件
export class UserCenterMyFollowings extends React.Component<null, UserCenterMyFollowingsState> {
    constructor(props) {
        super(props);
        this.state = {
            //临时填充信息
            userFollowings: [userFanInfo, userFanInfo, userFanInfo, userFanInfo]
        };
    }
    render() {
        //state转换为JSX
        const userFollowings = this.state.userFollowings.map((item) => (<UserCenterMyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFollowings.length; i += 2) {
            userFollowings.splice(i, 0, <hr />);
        }

        return (<div className="user-center-myfollowings">
            {userFollowings}
        </div>);
    }
}

interface UserCenterMyFollowingsState {
    userFollowings: UserFanInfo[];
}

//临时填充信息
let userFanInfo = new UserFanInfo();
userFanInfo.avatarImgURL = '../img/001.jpg';
userFanInfo.fans = 666;
userFanInfo.posts = 233;
userFanInfo.name = '董松松松';