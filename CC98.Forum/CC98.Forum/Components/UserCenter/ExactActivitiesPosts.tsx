// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import Post from './ExactActivitiesPost';
import { UserRecentPost } from '../../States/AppState';
import * as Utility from '../../Utility';
import { connect } from 'react-redux';
import { getRecentPosts } from '../../AsyncActions/UserCenter';
import { changeUserRecentPosts, usercenterPageLoadUnfinish } from '../../Actions';

interface Props {
    userRecentPosts: UserRecentPost[];
    isLoading: boolean;
    hasTotal: boolean;
    getInfo: (page: number) => void;
    clearPosts: () => void;
}

//用户中心主页帖子动态组件
class Activities extends React.Component<Props> {
    _i = 1;
    get i() { return this._i++; }

    scrollHandler = async (e) => {
        let pageYLeft = document.body.scrollHeight - window.pageYOffset;
        
        if (pageYLeft < 1500 && this.props.isLoading === false) {
            this.props.getInfo(this.i);
        }
    }

    componentDidMount() {
        let shouldLoad = !this.props.hasTotal;
        for(let i = 0; i < this.props.userRecentPosts.length; i ++){
            if(!this.props.userRecentPosts[i]){
                this.props.clearPosts();
                shouldLoad = true;
                break;
            }
        }
        if(shouldLoad) {
            this.props.getInfo(this.i);
            window.addEventListener('scroll', this.scrollHandler);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    componentWillReceiveProps(newProps: Props) {
        if(newProps.hasTotal) {
            window.removeEventListener('scroll', this.scrollHandler);
        } 
    }

    render() {
        if (this.props.userRecentPosts.length === 0 && this.props.hasTotal) {
            return <div className="user-posts" style={{marginLeft: '2rem'}}>没有主题</div>;
        }

        //state转换为JSX
        const userRecentPosts = this.props.userRecentPosts.map((item) => (<Post userRecentPost={item} />));
        //添加分隔线
        for (let i = 1; i < userRecentPosts.length; i += 2) {
            userRecentPosts.splice(i, 0, <hr />);
        }
        return (
            <div className="user-posts">
                {userRecentPosts}
                {this.props.isLoading ? <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div> : null}
            </div>
        );
    }
}


function mapState(store) {
    return {
        userRecentPosts: store.userInfo.recentPosts,
        hasTotal: store.userInfo.hasTotal,
        isLoading: store.userInfo.isLoading
    };
}

function mapDispatch(dispatch) {
    return {
        getInfo: (page:number) => {
            dispatch(getRecentPosts(page));
        },
        clearPosts: () => {
            dispatch(changeUserRecentPosts([]));
            dispatch(usercenterPageLoadUnfinish());
        }
    };
}

export default connect(mapState, mapDispatch)(Activities);
