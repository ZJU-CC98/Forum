// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFanInfo } from '../../States/AppState';
import { RouteComponent } from '../app';
import { UserCenterMyFollowingsUser } from './UserCenterMyFollowingsUser';
import { UserCenterPageCount } from './UserCenterPageCount';
import * as Utility from '../../Utility';

//用户中心我的关注组件
export class UserCenterMyFollowings extends React.Component<{match}, UserCenterMyFollowingsState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userFollowings: [],
            totalPage: 2,
            info: '加载中',
            currentPage: this.props.match.params.page,
            isLoading: true
        };
    }

    componentDidUpdate() {
        if (this.state.currentPage !== this.props.match.params.page) {
            this.setState({ currentPage: this.props.match.params.page });
            this.getInfo(this.props.match.params.page);
        }
    }

    async componentDidMount() {
        this.getInfo(this.props.match.params.page);
        try {            
            const userid = Utility.getLocalStorage('userInfo').id;
            const url = `http://apitest.niconi.cc/user/followee/count?userid=${userid}`
            let res = await fetch(url);

            if (res.status !== 200) {
                throw new Error();
            }
            let data = await res.json();

            this.setState({
                totalPage: data % 10 === 0 ? data / 10 : Math.floor((data / 10)) + 1
            });
        } catch (e) {
            console.log('我的关注加载失败');
        }
    }

    getInfo = async (page = 1) => {
        try {
            window.scroll(0, 0);
            this.setState({ isLoading: true });
            const token = await Utility.getToken();
            let url = `http://apitest.niconi.cc/me/followee?from=${(page - 1) * 10}&size=10`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                headers
            });
            if (res.status !== 200) {
                throw {};
            }
            let data = await res.json();

            //没有关注

            if (!data || !data.length) {
                this.setState({
                    info: '没有关注',
                    isLoading: false
                });
                return false;
            }

            let fans: UserFanInfo[] = [];

            let i = data.length, data2;

            while (i--) {
                let userid = data[i];
                let userFanInfo = new UserFanInfo();
                url = `http://apitest.niconi.cc/user/${userid}`;
                res = await fetch(url);
                if (res.status !== 200) {
                    throw {};
                }
                data2 = await res.json();
                userFanInfo.name = data2.name;
                userFanInfo.avatarImgURL = data2.portraitUrl;
                userFanInfo.posts = data2.postCount;
                userFanInfo.id = userid;
                userFanInfo.fans = data2.fanCount;
                userFanInfo.isFollowing = true;
                fans.unshift(userFanInfo);
            }

            this.setState({
                userFollowings: fans,
                isLoading: false
            });
        } catch (e) {

        }
    }

    render() {
        if (this.state.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
        if (this.state.userFollowings.length === 0) {
            return (
                <div className="user-center-myfollowings">
                    {this.state.info}
                </div>
                );
        }
        //state转换为JSX
        const userFollowings = this.state.userFollowings.map((item) => (<UserCenterMyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFollowings.length; i += 2) {
            userFollowings.splice(i, 0, <hr />);
        }
        const page = this.props.match.params.page || 1;

        return (<div className="user-center-myfollowings">
            <div className="user-center-myfollowings-exact">
                {userFollowings}
            </div>
            <UserCenterPageCount currentPage={page} totalPage={this.state.totalPage} href="/usercenter/myfollowings/" hasTotal={true}/>
        </div>);
    }
}

interface UserCenterMyFollowingsState {
    userFollowings: UserFanInfo[];
    totalPage: number;
    info: string;
    currentPage: number;
    isLoading: boolean;
}
