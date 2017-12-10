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
export class UserCenterMyFavoritesPosts extends RouteComponent<null, UserCenterMyFavoritesPostsState, {page}> {
    constructor(props,c) {
        super(props,c);
        //临时填充数据
        this.state = {
            userRecentPosts: [],
            info: '加载中',
            totalPage: (Number.parseInt(this.match.params.page) || 1) + 1
        };
    }

    async componentDidMount() {
        try {
            const token = Utility.getLocalStorage('accessToken');
            const page = this.match.params.page || 1;
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
                    info: '没有主题'
                });
                return;
            }

            let posts: UserRecentPost[] = [];
            let i = data.length;

            if (i < 10) {
                this.setState({
                    totalPage: Number.parseInt(this.match.params.page) || 1
                });
            } else {
                i = 10;
                this.setState({
                    totalPage: (Number.parseInt(this.match.params.page) || 1) + 1
                });
            }

            while (i--) {
                let post = new UserRecentPost();
                post.board = data[i].boardName;
                post.boardId = data[i].boardId;
                post.content = data[i].title;
                post.date = data[i].time.replace('T', ' ').slice(0, 19);
                post.id = data[i].id;
                posts.unshift(post);
            }

            this.setState({
                userRecentPosts: posts
            });
        } catch (e) {
            console.log('加载收藏失败');
        }
    }

    render() {
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
                <UserCenterPageCount currentPage={this.match.params.page || 1} totalPage={this.state.totalPage} href="/usercenter/myfavorites/" hasTotal={false}/>
            </div>

        );
    }
}

interface UserCenterMyFavoritesPostsState {
    userRecentPosts: UserRecentPost[];
    info: string;
    totalPage: number;
}
