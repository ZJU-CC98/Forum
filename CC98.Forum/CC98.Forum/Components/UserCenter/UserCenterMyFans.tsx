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
export class UserCenterMyFans extends React.Component<{match}, UserCenterMyFansState> {
    constructor(props, contest) {
        super(props, contest);
        this.state = {
            userFans: [],
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
        const userid = Utility.getLocalStorage('userInfo').id;
        try {
            const url = `http://apitest.niconi.cc/user/follower/count?userid=${userid}`
            let res = await fetch(url);
            let fanCounts: number = await res.json();
            this.setState({
                totalPage: fanCounts % 10 === 0 ? fanCounts / 10 : Math.floor((fanCounts / 10)) + 1
            });
        } catch (e) {

        }
    }

    getInfo = async (page = 1) => {
        try {
            window.scroll(0, 0);
            this.setState({ isLoading: true });
            const token = await Utility.getToken();
            let url = `http://apitest.niconi.cc/me/follower?from=${(page - 1) * 10}&size=10`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                headers
            });
            if (res.status === 200) {
                let data: number[] = await res.json();
                
                //没有粉丝
                if (!data || !data.length) {
                    this.setState({
                        info: '没有粉丝',
                        isLoading: false
                    });
                    return false;
                }
                
                let fanData = data.map((item) => {
                    url = `http://apitest.niconi.cc/user/${item}`;
                    return fetch(url, { headers }).then((value) => {
                        return value.json();
                    });
                });

                Promise.all(fanData).then((value) => {
                    let fans = value.map((item) => {
                        let userFanInfo = new UserFanInfo();
                        userFanInfo.name = item.name;
                        userFanInfo.avatarImgURL = item.portraitUrl;
                        userFanInfo.posts = item.postCount;
                        userFanInfo.id = item.id;
                        userFanInfo.fans = item.fanCount;
                        userFanInfo.isFollowing = item.isFollowing;
                        return userFanInfo;
                        
                    });
                    this.setState({
                        userFans: fans,
                        isLoading: false
                    });
                });
                
            } else {
                throw {};
            }
        } catch (e) {
            console.log('我的粉丝加载失败');
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
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
            <UserCenterPageCount currentPage={parseInt(this.props.match.params.page || 1)} totalPage={this.state.totalPage} href="/usercenter/myfans/" hasTotal={true}/>
        </div>);
    }
}

interface UserCenterMyFansState {
    userFans: UserFanInfo[];
    totalPage: number;
    info: string;
    currentPage: number;
    isLoading: boolean;
}
