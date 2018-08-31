// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import MyFollowingsUser from './MyFollowingsUser';
import Pager from './Pager';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { connect } from 'react-redux';
import { RootState, RootAction } from '../../Store';
import { Dispatch } from 'redux';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { getUserFollowingsInfo } from '../../AsyncActions/UserCenter';
import { ThunkDispatch } from 'redux-thunk';


type ownProps = {
    changePage: () => void;
    getInfo: (page: number) => void;
    userFollowings: UserInfo[];
    totalPage: number;
    isLoading: boolean;
    hasTotal: boolean;
}

type ownMatch = {
    page: string;
}

type Props = RouteComponentProps<ownMatch> & ownProps;

//用户中心我的关注组件
class Following extends React.Component<Props> {

    componentWillMount() {
        const curPage = parseInt(this.props.match.params.page) || 1;
        this.props.getInfo(curPage);
        this.props.changePage();
    }

    componentWillReceiveProps(newProps: Props){
        if(this.props.match.params.page !== newProps.match.params.page) {
            window.scroll(0, 0);
            const curPage = parseInt(newProps.match.params.page) || 1;
            this.props.getInfo(curPage);
        }
    }

    render() {
        if (this.props.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        } else if (this.props.userFollowings.length === 0 ) {
            return (<div className="user-center-myfans" style={{textAlign: 'center'}}>没有关注</div>);
        }
        const curPage = parseInt(this.props.match.params.page) || 1;
        //state转换为JSX
        const userFollowings = this.props.userFollowings.slice((curPage - 1) * 10, curPage * 10).map((item) => (<MyFollowingsUser key={item.id} userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFollowings.length; i += 2) {
            userFollowings.splice(i, 0, <hr key={i} />);
        }

        return (<div className="user-center-myfans">
            <div className="user-center-myfans-exact">
                {userFollowings}
            </div>
            <Pager currentPage={curPage} totalPage={this.props.totalPage} href="/usercenter/myfollowings/" hasTotal={true}/>
        </div>);
    }
}

function mapState(state: RootState) {
    return {
        userFollowings: state.userInfo.currentUserFollowingInfo,
        totalPage: state.userInfo.totalPage.myfollowings,
        isLoading: state.userInfo.isLoading,
        hasTotal: state.userInfo.hasTotal.myfollowings
    };
}

function mapDispatch(dispatch: ThunkDispatch<RootState, void, RootAction>) {
    return {
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('myfollowings'));
        },
        getInfo: (page: number) => {
            dispatch(getUserFollowingsInfo(page));
        }
    };
}

export default connect(mapState, mapDispatch)(withRouter(Following));