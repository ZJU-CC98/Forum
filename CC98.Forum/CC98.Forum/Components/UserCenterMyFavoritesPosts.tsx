// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../States/AppState';
import * as Utility from '../Utility';


export class UserCenterMyFavoritesPosts extends React.Component<null, UserCenterMyFavoritesPostsState> {
    constructor(props) {
        super(props);
        //临时填充数据
        this.state = { userRecentPosts: [userRecentPost, userRecentPost, userRecentPost, userRecentPost] };
    }

    async componentDidMount() {
        const token = Utility.getLocalStorage('accessToken');
        const userName = Utility.getLocalStorage('userName');
        const url = `http://apitest.niconi.cc/topic/customboards/new?from=0&size=10`;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);

        let res = await fetch(url, {
            headers: myHeaders
        });
        let data = await res.json();

        console.log(data);
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

interface UserCenterMyFavoritesPostsState {
    userRecentPosts: UserRecentPost[];
}

//临时填充数据
let userRecentPost = new UserRecentPost();
userRecentPost.approval = 666;
userRecentPost.board = '学术信息';
userRecentPost.content = '这是帖子内容';
userRecentPost.date = '2017-8-18';
userRecentPost.disapproval = 233;
userRecentPost.title = '这是帖子标题';