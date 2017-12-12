// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../../States/AppState';
import * as Utility from '../../Utility';
import { UserCenterPageCount } from './UserCenterPageCount';
import { RouteComponent } from '../app';

/**
 * 用户中心我收藏的帖子组件
 */
export class UserCenterMyFavoritesPosts extends React.Component<{match}, UserCenterMyFavoritesPostsState> {
    constructor(props) {
        super(props);
        this.state = {
            userRecentPosts: [],
            info: '加载中',
            totalPage: (Number.parseInt(this.props.match.params.page) || 1) + 1,
            currentPage: this.props.match.params.page,
            hasTotal: false,
            isLoading: true
        };
    }

    componentDidUpdate() {
        if (this.state.currentPage !== this.props.match.params.page) {
            this.setState({ currentPage: this.props.match.params.page });
            this.getInfo(this.props.match.params.page);
        }
    }

    componentDidMount() {
        this.getInfo(this.props.match.params.page);
    }

    getInfo = async (page = 1) => {
        try {
            window.scroll(0, 0);
            this.setState({ isLoading: true });
            const token = await Utility.getToken();
            const url = `http://apitest.niconi.cc/topic/me/favorite?from=${(page - 1) * 10}&size=11`;

            let myHeaders = new Headers();
            myHeaders.append('Authorization', token);

            let res = await fetch(url, {
                headers: myHeaders
            });
            if (res.status !== 200) {
                throw new Error(res.status.toString());
            }
            let data = await res.json();
            if (data.length === 0) {
                this.setState({
                    info: '没有主题',
                    isLoading: false
                });
                return;
            }

            let userRecentPosts: UserRecentPost[] = [],
                i = data.length,
                totalPage: number;

            if (i <= 10) {
                totalPage = Number.parseInt(this.props.match.params.page) || 1;
                this.setState({hasTotal: true});
            } else {
                i = 10;
                totalPage = Math.max((Number.parseInt(this.props.match.params.page) || 1) + 1, this.state.totalPage);
            }

            while (i--) {
                let post = new UserRecentPost();
                post.board = data[i].boardName;
                post.boardId = data[i].boardId;
                post.content = data[i].title;
                post.date = data[i].time.replace('T', ' ').slice(0, 19);
                post.id = data[i].id;
                userRecentPosts.unshift(post);
            }

            this.setState({
                userRecentPosts,
                totalPage,
                isLoading: false
            });
        } catch (e) {
            console.log('加载收藏失败');
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
        if (!this.state.userRecentPosts || this.state.userRecentPosts.length === 0) {
            return (<div className="user-posts">
                {this.state.info}
            </div>);
        }
        //state转换为JSX
        const userRecentPosts = this.state.userRecentPosts.map((item) => (<UserCenterExactActivitiesPost userRecentPost={item} />));
        //添加分隔线
        for (let i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, <hr />);
        }
        return (
            <div className="user-posts">
                {userRecentPosts}
                <UserCenterPageCount currentPage={this.props.match.params.page || 1} totalPage={this.state.totalPage} href="/usercenter/myfavorites/posts/" hasTotal={this.state.hasTotal}/>
            </div>

        );
    }
}

interface UserCenterMyFavoritesPostsState {
    userRecentPosts: UserRecentPost[];
    info: string;
    totalPage: number;
    currentPage: number;
    hasTotal: boolean;
    isLoading: boolean;
}
