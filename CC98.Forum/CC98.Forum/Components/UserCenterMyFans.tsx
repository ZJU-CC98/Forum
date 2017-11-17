// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../States/AppState';
import { UserCenterMyFollowingsUser } from './UserCenterMyFollowingsUser';
import { RouteComponent } from './app'
import { UserCenterPageCount } from './UserCenterPageCount'

import * as Utility from '../Utility';

//用户中心我的粉丝组件
export class UserCenterMyFans extends RouteComponent<null, UserCenterMyFansState, {page}> {
    constructor(props, contest) {
        super(props, contest);
        this.state = {
            userFans: [],
            totalPage: 2
        };
    }

    async componentDidMount() {
        // bugtest 550524
        // 董松松松 569380

        const token = window.localStorage.accessToken.slice(4);
        const page = this.match.params.page || 1;
        let url = `http://apitest.niconi.cc/user/follow/fan?from=${(page-1)*10}&size=10`;

        let res = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });

        let data = await res.json();
        

        //没有粉丝

        if (!data || !data.length) {
            return false;
        }

        let fans: UserFanInfo[] = [];
        let userFanInfo = new UserFanInfo();
        let i = data.length, data2;

        while (i--) {
            let userid = data[i];

            url = `http://apitest.niconi.cc/user/${userid}`;
            res = await fetch(url);
            data2 = await res.json();

            userFanInfo.name = data2.name;
            userFanInfo.avatarImgURL = data2.portraitUrl;
            userFanInfo.posts = data2.postCount;

            url = `http://apitest.niconi.cc/user/follow/fancount?userid=${userid}`
            res = await fetch(url);
            data2 = await res.json();

            userFanInfo.fans = data2;

            fans.push(userFanInfo);
        }


        const userid = Utility.getLocalStorage('userInfo').id;

        url = `http://apitest.niconi.cc/user/follow/fancount?userid=${userid}`
        res = await fetch(url);
        data2 = await res.json();

        this.setState({
            userFans: fans,
            totalPage: Math.floor((data2 / 10)) + 1
        });
    }

    render() {
        let page = this.match.params.page || 1;

        if (this.state.userFans.length === 0) {
            return (<div className="user-center-myfans">
                没有粉丝
            </div>);
        }

        //state转换为JSX
        const userFans = this.state.userFans.map((item) => (<UserCenterMyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, <hr />);
        }

        return (<div className="user-center-myfans">
            <div className="user-center-myfans-exact">
                {userFans}
            </div>
            <UserCenterPageCount currentPage={parseInt(page)} totalPage={this.state.totalPage} href="/usercenter/myfans/" />
        </div>);
    }
}

interface UserCenterMyFansState {
    userFans: UserFanInfo[];
    totalPage: number;
}
