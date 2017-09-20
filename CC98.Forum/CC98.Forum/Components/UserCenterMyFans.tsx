// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../States/AppState';
import { UserCenterMyFollowingsUser } from './UserCenterMyFollowingsUser';

//用户中心我的粉丝组件
export class UserCenterMyFans extends React.Component<null, UserCenterMyFansState> {
    constructor(props) {
        super(props);
        this.state = {
            //临时填充信息
            userFans: [userFanInfo, userFanInfo, userFanInfo]
        };
    }
    render() {
        //state转换为JSX
        const userFans = this.state.userFans.map((item) => (<UserCenterMyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, <hr />);
        }

        return (<div className="user-center-myfans">
            {userFans}
        </div>);
    }
}

interface UserCenterMyFansState {
    userFans: UserFanInfo[];
}

//临时填充信息
let userFanInfo = new UserFanInfo();
userFanInfo.avatarImgURL = '../img/001.jpg';
userFanInfo.fans = 666;
userFanInfo.posts = 233;
userFanInfo.name = '董松松松';