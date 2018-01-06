// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import Post from './ExactActivitiesPost';
import { UserRecentPost } from '../../States/AppState';
import Pager from './Pager';
import { connect } from 'react-redux';
import { withRouter, match } from 'react-router-dom';
import { getRecentPosts } from '../../AsyncActions/UserCenter';
import * as Actions from '../../Actions/UserCenter';
import { RootState } from '../../Store';

interface Props {
    userRecentPosts: UserRecentPost[];
    totalPage: number;
    hasTotal: boolean;
    isLoading: boolean;
    match: match<Match>;
    getInfo: (page: number) => void;
    changePage: () => void;
}

interface Match {
    page: string;
}

/**
 * 用户中心我的主题组件
 */
class MyPosts extends React.Component<Props> {
    
    componentWillReceiveProps(newProps: Props){
        if(this.props.match.params.page !== newProps.match.params.page) {
            const curPage = parseInt(newProps.match.params.page) || 1;
            this.props.getInfo(curPage);
            window.scroll(0, 0);
        }
    }

    componentDidMount() {
        const curPage = parseInt(this.props.match.params.page) || 1;
        this.props.getInfo(curPage);
        this.props.changePage();
    }

    render() {
        if(this.props.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>;
        } else if(this.props.userRecentPosts.length === 0) {
            return <div className="user-posts" style={{ textAlign: 'center' }}>没有主题</div>;
        }
        const curPage = parseInt(this.props.match.params.page) || 1;
        const totalPage = this.props.hasTotal ? this.props.totalPage : curPage + 1;
        //state转换为JSX
        let userRecentPosts = this.props.userRecentPosts.slice((curPage - 1) * 10, curPage * 10 - 1).map((item) => (<Post key={item.id} userRecentPost={item} />));
        //添加分隔线
        for (let i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, <hr key={i} />);
        }
        return (
            <div className="user-posts">
                {userRecentPosts}
                <Pager currentPage={curPage} totalPage={totalPage} href="/usercenter/myposts/" hasTotal={this.props.hasTotal}/>
            </div>
        );
    }
}


function mapState(store: RootState) {
    return {
        userRecentPosts: store.userInfo.recentPosts,
        totalPage: store.userInfo.totalPage.myposts,
        hasTotal: store.userInfo.hasTotal.myposts,
        isLoading: store.userInfo.isLoading
    };
}

function mapDispatch(dispatch) {
    return {
        getInfo: (page:number) => {
            dispatch(getRecentPosts(page));
        },
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('myposts'));
        }
    };
}

export default withRouter(connect(mapState, mapDispatch)(MyPosts));