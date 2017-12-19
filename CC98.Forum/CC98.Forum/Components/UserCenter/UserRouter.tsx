// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { UserInfo } from '../../States/AppState';
import UserManage from './UserManage';
import { UserExactProfile } from './UserExactProfile';
import { UserRouterActivities } from './UserRouterActivities';
import { UserCenterExactAvatar } from './UserCenterExactAvatar';
import { changeCurrentVisitingUserPage, userNotFound } from '../../Actions';
import * as Utility from '../../Utility';

export class UserRouter extends React.Component {
    render() {
        return (<div className="user-center-router">
            <Route path="/user/:method/:id?" exact component={UserExactWithRouter} />
            <Route path="/user/:method/:id/manage" component={UserManage} />
        </div>);
    }
}

class UserExact extends React.Component<{ match, history, changePage, notFoundUser}, UserCenterExactState> {

    async componentDidMount() {
        try {
            let url: string,
                { id, method } = this.props.match.params,
                myHeaders = new Headers();
            if (!id) {
                throw new Error();
            } else if (method === 'name') {
                console.log(id);
                console.log(encodeURIComponent(id));
                url = `/User/Name/${encodeURIComponent(id)}`;
            }
            else if (method === 'id') {
                url = `/User/${id}`;
            }
            myHeaders.append('Authorization', await Utility.getToken());
            let response = await Utility.cc98Fetch(url ,{
                headers: myHeaders
            });
            const data = await response.json();
            this.props.history.replace(`/user/id/${data.id}`);
            this.props.changePage('exact', data.id);
            this.setState({
                userInfo: data,
                userAvatarImgURL: data.portraitUrl,
                responseState: response.status
            });
        } catch (e) {
            this.props.notFoundUser();
        }
    }

    render() {
        let element;
        if (this.state !== null && this.state.responseState === 200) {
            element = (<div className="user-center-exact">
                <UserCenterExactAvatar userAvatarImgURL={this.state.userAvatarImgURL} />
                <UserExactProfile userInfo={this.state.userInfo} />
                <UserRouterActivities id={this.state.userInfo.id} />
            </div>);
        } else {
            element = <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>;
        }
        return element;
    }
}

interface UserCenterExactState {
    /**
    * 用户信息
    */
    userInfo: UserInfo;
    /**
    * 用户头像链接地址
    */
    userAvatarImgURL: string;
    /**
    * 加载状态
    */
    responseState: number;
}

function mapDispatch(dispatch) {
    return {
        changePage: (page, id) => {
            dispatch(changeCurrentVisitingUserPage(page, id));
        },
        notFoundUser: () => {
            dispatch(userNotFound());
        }
    };
}

const UserExactWithRouter = withRouter(connect(null, mapDispatch)(UserExact));