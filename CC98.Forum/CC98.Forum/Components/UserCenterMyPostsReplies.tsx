// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserCenterExactActivitiesPost } from './UserCenterExactActivitiesPost';
import { UserRecentPost } from '../States/AppState';

//用户中心主页最近回复组件
export class UserCenterMyPostsReplies extends React.Component<null, UserCenterMyPostsRepliesState> {
    constructor(props) {
        super(props);
        //临时填充数据
        this.state = { userRecentPosts: [userRecentPost, userRecentPost, userRecentPost] };
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

interface UserCenterMyPostsRepliesState {
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