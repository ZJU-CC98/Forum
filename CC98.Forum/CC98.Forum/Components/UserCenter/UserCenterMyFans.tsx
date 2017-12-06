// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../../States/AppState';
import { UserCenterMyFollowingsUser } from './UserCenterMyFollowingsUser';
import { RouteComponent } from '../app';
import { UserCenterPageCount } from './UserCenterPageCount';

import * as Utility from '../../Utility';

//用户中心我的粉丝组件
export class UserCenterMyFans extends RouteComponent<null, UserCenterMyFansState, {page}> {
    constructor(props, contest) {
        super(props, contest);
        this.state = {
            userFans: [],
            totalPage: 2,
            info: '加载中'
        };
    }

    async componentDidMount() {
        try {
            const token = Utility.getLocalStorage("accessToken");
            const page = this.match.params.page || 1;
            let url = `http://apitest.niconi.cc/user/follow/fan?from=${(page - 1) * 10}&size=10`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                headers
            });
            if (res.status === 200) {
                let data = await res.json();


                //没有粉丝

                if (!data || !data.length) {
                    this.setState({
                        info: '没有粉丝'
                    });
                    return false;
                }

                let fans: UserFanInfo[] = [];

                let i = data.length, data2;

                while (i--) {
                    let userid = data[i];
                    let userFanInfo = new UserFanInfo();
                    url = `http://apitest.niconi.cc/user/${userid}`;
                    res = await fetch(url, { headers });
                    data2 = await res.json();
                    console.log(data2);
                    userFanInfo.name = data2.name;
                    userFanInfo.avatarImgURL = data2.portraitUrl;
                    userFanInfo.posts = data2.postCount;
                    userFanInfo.id = userid;
                    userFanInfo.fans = data2.fanCount;
                    userFanInfo.isFollowing = data2.isFollowing;
                    fans.unshift(userFanInfo);
                }


                const userid = Utility.getLocalStorage('userInfo').id;

                url = `http://apitest.niconi.cc/user/follow/fancount?userid=${userid}`
                res = await fetch(url);
                let fanCounts: number = await res.json();
                this.setState({
                    userFans: fans,
                    totalPage: fanCounts % 10 === 0 ? fanCounts / 10 : Math.floor((fanCounts / 10)) + 1
                });
            } else {
                throw {};
            }
        } catch (e) {
            console.log('我的粉丝加载失败');
        }
    }

    render() {
        let page = this.match.params.page || 1;

        if (this.state.userFans.length === 0) {
            return (<div className="user-center-myfans">
                {this.state.info}
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
    info: string;
}
