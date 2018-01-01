// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import MyFollowingsUser from './MyFollowingsUser';
import Pager from './Pager';
import * as Utility from '../../Utility';
import { Actions } from '../../Actions/UserCenter';
import { connect } from 'react-redux';
import { RootState } from '../../Store';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { getUserFansInfo } from '../../AsyncActions/UserCenter';


interface Props {
    changePage: () => void;
    getInfo: (page: number) => void;
    match: any;
    userFans: UserInfo[];
    totalPage: number;
    isLoading: boolean;
    hasTotal: boolean;
}

//用户中心我的粉丝组件
class Fans extends React.Component<Props> {
    componentWillMount() {
        this.props.changePage();
    }
    render() {
        if (this.props.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        } else if (this.props.hasTotal && this.props.totalPage === 0 ) {
            return (<div className="user-center-myfans" style={{textAlign: 'center'}}>没有粉丝</div>);
        }
        const curPage = parseInt(this.props.match.params.page) || 1;
        //如果未请求完所有帖子并且帖子总数小于请求的页数
        //换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = this.props.userFans.length < (curPage - 1) * 10 + 1;
        for(let i = (curPage - 1) * 10; i <  Math.min(curPage * 10, this.props.userFans.length); i++ ){
            if(!this.props.userFans[i]){
                shouldLoad = true;
                break;
            }
        }
        
        if(shouldLoad) {
            this.props.getInfo(curPage);
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>;
        }
        //state转换为JSX
        const userFans = this.props.userFans.slice((curPage - 1) * 10, curPage * 10 - 1).map((item) => (<MyFollowingsUser userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, <hr />);
        }

        return (<div className="user-center-myfans">
            <div className="user-center-myfans-exact">
                {userFans}
            </div>
            <Pager currentPage={parseInt(this.props.match.params.page || 1)} totalPage={this.props.totalPage} href="/usercenter/myfans/" hasTotal={true}/>
        </div>);
    }
}

function mapState(state: RootState) {
    return {
        userFans: state.userInfo.currentUserFansInfo,
        totalPage: state.userInfo.totalPage.myfans,
        isLoading: state.userInfo.isLoading,
        hasTotal: state.userInfo.hasTotal.myfans
    };
}

function mapDispatch(dispatch: Dispatch<RootState>) {
    return {
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('myfans'));
        },
        getInfo: (page: number) => {
            dispatch(getUserFansInfo(page));
        }
    };
}

export default withRouter(connect(mapState, mapDispatch)(Fans));