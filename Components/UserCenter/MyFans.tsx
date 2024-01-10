﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserInfo } from '../../States/AppState';
import MyFollowingsUser from './MyFollowingsUser';
import Pager from './Pager';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { connect } from 'react-redux';
import { RootState, RootAction, RootThunkAction } from '../../Store';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { getUserFansInfo } from '../../AsyncActions/UserCenter';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


type ownProps = {
    changePage: () => void;
    getInfo: (page: number) => void;
    userFans: UserInfo[];
    totalPage: number;
    isLoading: boolean;
    hasTotal: boolean;
}

type ownMatch = {
    page: string;
}

type Props = RouteComponentProps<ownMatch> & ownProps;

//用户中心我的粉丝组件
class Fans extends React.Component<Props> {

    componentWillMount() {
        const curPage = parseInt(this.props.match.params.page) || 1;
        this.props.changePage();
        this.props.getInfo(curPage);
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
        } else if (this.props.userFans.length === 0 ) {
            return (<div className="user-center-myfans" style={{textAlign: 'center'}}>没有粉丝</div>);
        }
        const curPage = parseInt(this.props.match.params.page) || 1;
        //state转换为JSX
        const userFans = this.props.userFans.slice((curPage - 1) * 10, curPage * 10).map((item) => (<MyFollowingsUser key={item.id} userFanInfo={item} />));
        //添加分隔线
        for (let i = 1; i < userFans.length; i += 2) {
            userFans.splice(i, 0, <hr key={i}/>);
        }

        return (<div className="user-center-myfans">
            <div className="user-center-myfans-exact">
                {userFans}
            </div>
            <Pager currentPage={curPage} totalPage={this.props.totalPage} href="/usercenter/myfans/" hasTotal={true}/>
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

function mapDispatch(dispatch: ThunkDispatch<RootState, void, RootAction>) {
    return {
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('myfans'));
        },
        getInfo: (page: number) => {
            dispatch(getUserFansInfo(page));
        }
    };
}

export default connect(mapState, mapDispatch)(withRouter(Fans));