// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import MyFollowingsUser from './MyFollowingsUser';
import { RouteComponent } from '../RouteComponent';
import Pager from './Pager';
import * as Utility from '../../Utility';

//用户中心我的粉丝组件
export default class extends React.Component<{match}, UserCenterMyFansState> {
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
            const url = `/user/follower/count?userid=${userid}`
            let res = await Utility.cc98Fetch(url);
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
            let url = `/me/follower?from=${(page - 1) * 10}&size=10`;
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, {
                headers
            });
            let data: number[] = await res.json();

            //没有粉丝
            if (!data || !data.length) {
                this.setState({
                    info: '没有粉丝',
                    isLoading: false
                });
                return false;
            }
            const query = data.join('&id=');
            url = `/user?id=${query}`;
            res = await Utility.cc98Fetch(url, {
                headers
            });
            let fanData: UserInfo[] = await res.json();

            this.setState({
                userFans: fanData,
                isLoading: false
            });
        } catch (e) {
            console.log('我的粉丝加载失败');
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
        if (this.state.userFans.length === 0) {
            return (<div className="user-center-myfans" style={{textAlign: 'center'}}>
                {this.state.info}
            </div>);
        }        
        //state转换为JSX
        const userFans = this.state.userFans.map((item) => (<MyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, <hr />);
        }

        return (<div className="user-center-myfans">
            <div className="user-center-myfans-exact">
                {userFans}
            </div>
            <Pager currentPage={parseInt(this.props.match.params.page || 1)} totalPage={this.state.totalPage} href="/usercenter/myfans/" hasTotal={true}/>
        </div>);
    }
}

interface UserCenterMyFansState {
    userFans: UserInfo[];
    totalPage: number;
    info: string;
    currentPage: number;
    isLoading: boolean;
}
