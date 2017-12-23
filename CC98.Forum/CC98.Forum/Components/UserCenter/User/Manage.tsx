import * as React from 'react';
import * as Utility from '../../../Utility';
import { changeCurrentVisitingUserPage, userNotFound } from '../../../Actions';
import { UserInfo } from '../../../States/AppState';
import { connect } from 'react-redux';
import Operation from '../Manage/Operation';
import Delete from '../Manage/DeleteTopicsAndPosts';
import Post from '../Manage/ShowPost';

class UserManageState {
    /**
     * 当前访问用户的用户信息
     */
    userInfo: UserInfo;
}

class UserManage extends React.Component<{ id, changePage, match, notFoundUser }, UserManageState> {
    async componentDidMount() {
        const id = this.props.id === 0 ? this.props.match.params.id : this.props.id;
        this.props.changePage('manage', id);
        try {
            const url = `/User/${id}`;
            let myHeaders = new Headers();
            myHeaders.append('Authorization', await Utility.getToken());
            let response = await Utility.cc98Fetch(url, {
                headers: myHeaders
            });
            const data: UserInfo = await response.json();
            this.setState({
                userInfo: data
            });
        } catch (e) {
            this.props.notFoundUser();
        }
    }
    render() {
        return this.state ? (<div className="user-manage">
            <div className="user-manage-infos">
                <h2>用户信息</h2>
                <div className="user-manage-info">
                    <p>id:{this.state.userInfo.id}</p>
                    <p>name: {this.state.userInfo.name}</p>
                </div>
            </div>
            <Operation id={this.props.id} />
            <Delete id={this.props.id} />
            <Post id={this.props.id} />
        </div>) : 
        <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        ;
    }
}

function mapState(state) {
    return {
        id: state.userInfo.currentVisitingUserId
    };
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

export default connect(mapState, mapDispatch)((UserManage));