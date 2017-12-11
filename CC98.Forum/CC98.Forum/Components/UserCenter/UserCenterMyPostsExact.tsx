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
export class UserCenterMyPostsExact extends React.Component<{match}, UserCenterMyPostsExactState> {
    constructor(props, contest) {
        super(props, contest);
        const postCount = Utility.getLocalStorage('userInfo').postCount;
        this.state = {
            userRecentPosts: [],
            totalPage: (this.props.match.params.page || 1) + 1,
            currentPage: this.props.match.params.page,
            hasTotal: false
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
            const url = `http://apitest.niconi.cc/me/recent-topic?from=${(page - 1) * 10}&size=11`
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
            let userRecentPosts: UserRecentPost[] = [],
                i = data.length,
                totalPage: number;

            if (i <= 10) {
                totalPage = Number.parseInt(this.props.match.params.page);
                this.setState({ hasTotal: true });
            } else {
                totalPage = Math.max(Number.parseInt(this.props.match.params.page || 1) + 1, this.state.totalPage);
                i = 10;
            }

            while (i--) {
                let post = await this.item2post(data[i]);
                userRecentPosts.unshift(post);
            }

            this.setState({
                userRecentPosts,
                totalPage
            });
            window.scroll(0,0);
        } catch (e) {
            console.log('我的主题加载失败');
        }
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
                <UserCenterPageCount currentPage={this.props.match.params.page || 1} totalPage={this.state.totalPage} href="/usercenter/myposts/" hasTotal={this.state.hasTotal}/>
            </div>
        );
    }
}

interface UserCenterMyPostsExactState {
    userRecentPosts: UserRecentPost[];
    totalPage: number;
    currentPage: number;
    hasTotal: boolean;
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