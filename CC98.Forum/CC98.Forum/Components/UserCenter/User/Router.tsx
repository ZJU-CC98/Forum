// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route,
    withRouter, 
    RouteComponentProps
} from 'react-router-dom';
import { connect } from 'react-redux';
import { UserInfo } from '../../../States/AppState';
import UserManage from './Manage';
import Profile from './Profile';
import Activities from './Activities';
import Avatar from '../ExactAvatar';
import * as Actions from '../../../Actions/UserCenter';
import * as Utility from '../../../Utility';
import DocumentTitle from '../../DocumentTitle';
import { getUserInfo } from '../../../Utility/Fetch/getUserInfo';

/**
 * 用户详情页用的Route
 */
export default class extends React.Component {
    render() {
        return (<div className="user-center-router">
            <Route path="/user/:method/:id?" exact component={UserExactWithRouter} />
            <Route path="/user/:method/:id/manage" component={UserManage} />
        </div>);
    }
}


interface States {
    /**
    * 用户信息
    */
    userInfo: UserInfo;
}

type ownMatch = {
    id: string,
    page: string,
    method: string;
}

type ownProps = { 
    changePage: (page, id) => void,
    notFoundUser: () => void
}

type Props = RouteComponentProps<ownMatch> & ownProps;

/**
 * 用户详情主页
 */
class UserExact extends React.Component<Props, States> {
    //组件加载时获取当前访问的用户信息
    async componentDidMount() {
        this.getInfo(this.props);
    }

    componentWillReceiveProps(nextProps){
        //如果url变过则重新获取用户信息
        if(this.props.match.params.id !== nextProps.match.params.id){
            this.getInfo(nextProps);
        }
    }

    async getInfo(props: Props){
        try {
            let url: string,
                { id, method } = props.match.params,
                myHeaders = new Headers();
            let key;
            //判断是通过name还是id来到用户详情页
            //不同的方法对应不同url
            if (!id) {
                throw new Error();
            } else if (method === 'name') {
                key = id;
                //console.log(key);
            }
            else if (method === 'id') {
                key = Number.parseInt(id);
            }
            myHeaders.append('Authorization', await Utility.getToken());
            url = typeof key === 'number' ? `/user/${key}` : `/user/name/${key}`;
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch(url, { headers });
            let userInfo = await res.json();
            //默认导航到以id表示的用户详情页
            this.props.history.replace(`/user/id/${userInfo.id}`);
            //改变store中当前访问位置与当前访问用户id
            this.props.changePage('exact', userInfo.id);
            this.setState({
                userInfo
            });
        } catch (e) {
            //未找到用户的处理
            this.props.notFoundUser();
        }
    }

    render() {
        return this.state ? 
        <div className="user-center-exact">
            <DocumentTitle title={`${this.state.userInfo.name} - 用户详情 - CC98论坛`} />
            <Avatar userInfo={this.state.userInfo} />
            <Profile userInfo={this.state.userInfo} />
            <Activities id={this.state.userInfo.id} />
        </div> : 
        <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        ;
    }
}

function mapDispatch(dispatch) {
    return {
        changePage: (page, id) => {
            dispatch(Actions.changeCurrentVisitingUserPage(page, id));
        },
        notFoundUser: () => {
            dispatch(Actions.userNotFound());
        }
    };
}

const UserExactWithRouter = connect(null, mapDispatch)(withRouter(UserExact));