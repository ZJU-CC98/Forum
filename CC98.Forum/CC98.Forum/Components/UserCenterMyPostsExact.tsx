// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../States/AppState';
import { RouteComponent } from './app';
import { UserCenterPageCount } from './UserCenterPageCount';

import * as Utility from '../Utility';


export class UserCenterMyPostsExact extends RouteComponent<null, UserCenterMyPostsExactState, {page}> {
    constructor(props, contest) {
        super(props, contest);
        console.log(Utility.getLocalStorage('userInfo'));
        const postCount = Utility.getLocalStorage('userInfo').postCount;
        console.log(Math.floor((postCount / 10)) + 1);
        this.state = {
            userRecentPosts: [],
            totalPage: Math.floor((postCount / 10)) + 1
        };
    }

    async componentDidMount() {
        const page = this.match.params.page || 1;
        const url = `http://apitest.niconi.cc/me/recenttopics?from=${(page-1)*10}&size=10`
        const token = window.localStorage.accessToken.slice(4);
        let res = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });
        let data = await res.json();
        let posts: UserRecentPost[] = [],
            i = data.length;
        while (i--) {
            let post = await this.item2post(data[i]);
            posts.unshift(post);
        }

        this.setState({
            userRecentPosts: posts
        });
    }

    async item2post(item: itemType) {
        let userRecentPost = new UserRecentPost();
        userRecentPost.approval = item.likeCount;
        userRecentPost.board = await Utility.getBoardName(item.boardId);
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
                <UserCenterPageCount currentPage={this.match.params.page || 1} totalPage={this.state.totalPage} href="/usercenter/myposts/" />
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