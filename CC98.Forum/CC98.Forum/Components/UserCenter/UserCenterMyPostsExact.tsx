// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../../States/AppState';
import { RouteComponent } from '../app';
import { UserCenterPageCount } from './UserCenterPageCount';
import * as Utility from '../../Utility';

/**
 * 用户中心我的主题组件
 */
export class UserCenterMyPostsExact extends RouteComponent<null, UserCenterMyPostsExactState, {page}> {
    constructor(props, contest) {
        super(props, contest);
        const postCount = Utility.getLocalStorage('userInfo').postCount;
        this.state = {
            userRecentPosts: [],
            totalPage: this.match.params.page || 1
        };
    }

    async componentDidMount() {
        try {
            const page = this.match.params.page || 1;
            const url = `http://apitest.niconi.cc/me/recenttopics?from=${(page - 1) * 10}&size=11`
            const token = Utility.getLocalStorage("accessToken");
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await fetch(url, {
                headers
            });
            if (res.status !== 200) {
                throw {};
            }
            let data = await res.json();
            let posts: UserRecentPost[] = [],
                i = data.length;

            if (i <= 10) {
                this.setState({
                    totalPage: Number.parseInt(page)
                });
            } else {
                this.setState({
                    totalPage: Number.parseInt(page) + 1
                });
                i = 10;
            }

            while (i--) {
                let post = await this.item2post(data[i]);
                posts.unshift(post);
            }

            this.setState({
                userRecentPosts: posts
            });
        } catch (e) {
            console.log('我的主题加载失败');
        }
    }

    async item2post(item: itemType) {
        let userRecentPost = new UserRecentPost();
        userRecentPost.approval = item.likeCount;
        userRecentPost.board = await Utility.getBoardName(item.boardId, this.context.router);
        userRecentPost.date = item.time.replace('T', ' ').slice(0, 19);
        userRecentPost.disapproval = item.dislikeCount;
        userRecentPost.content = item.title;
        userRecentPost.id = item.id;
        userRecentPost.boardId = item.boardId;
        userRecentPost.name = item.userName;
        userRecentPost.isAnonymous = item.isAnonymous;

        return userRecentPost;
    }

    render() {
        if (this.state.userRecentPosts.length === 0) {
            return (<div className="user-posts">
                没有主题
            </div>
                );
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
                <UserCenterPageCount currentPage={this.match.params.page || 1} totalPage={this.state.totalPage} href="/usercenter/myposts/" hasTotal={false}/>
            </div>
        );
    }
}

interface UserCenterMyPostsExactState {
    userRecentPosts: UserRecentPost[];
    totalPage: number;
}

interface itemType {
    boardId: number;
    dislikeCount: number;
    likeCount: number;
    title: string;
    id: number;
    time: string;
    userName: string;
    isAnonymous: boolean;
}