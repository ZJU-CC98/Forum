// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../States/AppState';

//用户中心主页帖子动态组件
export class UserCenterExactActivitiesPosts extends React.Component<null, UserCenterExactActivitiesPostsState> {
    constructor(props) {
        super(props);
        //临时填充数据
        this.state = {
            userRecentPosts: [],
            isLoading: false
        };
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    scrollHandler(e) {
        let pageYLeft = document.body.scrollHeight - window.pageYOffset;
        
        if (pageYLeft < 1500 && this.state.isLoading === false) {
            this.setState(async (prevState) => {
                this.setState({isLoading: true});

                const url = `http://apitest.niconi.cc/me/recenttopics?from=0&size=10`
                const token = window.localStorage.accessToken.slice(4);

                let res = await fetch(url, {
                    headers: {
                        'Authorization': token
                    }
                });

                let data = await res.json();
                console.log(data);

                let posts = prevState.userRecentPosts;
                posts = posts.concat(new Array(10).fill(userRecentPost));
                return {
                    userRecentPosts: posts,
                    isLoading: false
                };
            });
        }
    }

    async componentDidMount() {
        const url = `http://apitest.niconi.cc/me/recenttopics?from=0&size=10`
        const token = window.localStorage.accessToken.slice(4);

        let res = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });

        let data = await res.json();

        this.setState({
            userRecentPosts: data
        });

        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {

        //state转换为JSX
        const userRecentPosts = this.state.userRecentPosts.map((item) => (<UserCenterExactActivitiesPost userRecentPost={item} />));
        //添加分隔线
        for (let i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, <hr />);
        }
        return (
            <div className="user-posts">
                {userRecentPosts}
            </div>
        );
    }
}

interface UserCenterExactActivitiesPostsState {
    userRecentPosts: UserRecentPost[];
    isLoading: boolean;
}

//临时填充数据
let userRecentPost = new UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';