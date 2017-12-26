﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import Post from '../ExactActivitiesPost';
import { UserRecentPost } from '../../../States/AppState';
import * as Utility from '../../../Utility';

/**
 * 用户详情页
 * 用户最近所发主题组件
 */
export default class extends React.Component<{id: number}, UserCenterExactActivitiesPostsState> {
    constructor(props) {
        super(props);
        this.state = {
            userRecentPosts: [],
            isLoading: false
        };
        this.scrollHandler = this.scrollHandler.bind(this);
    }
    /**
     * 当用户滚动时
     * 判断滚动条位置
     * 按需加载新帖
     * @param e 滚动事件
     */
    async scrollHandler(e) {
        let pageYLeft = document.body.scrollHeight - window.pageYOffset;

        if (pageYLeft < 1500 && this.state.isLoading === false) {
            try {
                this.setState({ isLoading: true });
                const url = `/user/${this.props.id}/recent-topic?userid=${this.props.id}&from=${this.state.userRecentPosts.length}&size=11`;
                const token = await Utility.getToken();
                const headers = new Headers();
                headers.append('Authorization', token);
                let res = await Utility.cc98Fetch(url, {
                    headers
                });

                if (res.status === 200) {
                    let data: itemType[] = await res.json();

                    if (data.length < 10) {
                        window.removeEventListener('scroll', this.scrollHandler);
                    } else {
                        data.pop();
                    }

                    let posts = await Promise.all(data.map((item) => (this.item2post(item))));

                    this.setState((prevState)=>({
                        userRecentPosts: prevState.userRecentPosts.concat(posts),
                        isLoading: false
                    }));
                } else {
                    throw {};
                }
            } catch (e) {
                this.setState({
                    isLoading: false
                });
                console.log('用户中心滚动加载失败');
            }
        }
    }

    async componentDidMount() {
        try {
            const url = `/user/${this.props.id}/recent-topic?userid=${this.props.id}&from=${this.state.userRecentPosts.length}&size=11`;
            const token = await Utility.getToken();
            const headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, {
                headers
            });

            if (res.status === 200) {
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
                if (data.length === 10) {
                    window.addEventListener('scroll', this.scrollHandler);
                }
            } else {
                throw new Error();
            }
        } catch (e) {
            console.log('用户中心帖子加载失败');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
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
            const style = {
                marginLeft: '2rem'
            }

            return (
                <div className="user-activities">
                    <p>发表的主题</p>
                    <div className="user-posts" style={style}>
                        没有主题
                    </div>
                </div>          
            );
        }

        //state转换为JSX
        const userRecentPosts = this.state.userRecentPosts.map((item) => (<Post userRecentPost={item} />));
        //添加分隔线
        for (let i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, <hr />);
        }
        return (
            <div className="user-activities">
                <p>发表的主题</p>
                <div className="user-posts">
                    {userRecentPosts}
                </div>
            </div>          
        );
    }
}

interface UserCenterExactActivitiesPostsState {
    userRecentPosts: UserRecentPost[];
    isLoading: boolean;
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