import * as React from 'react';
import {
    withRouter, 
    RouteComponentProps
} from 'react-router-dom';
import * as Utility from '../../../Utility';
import * as Actions from '../../../Actions/UserCenter';
import { UserInfo } from '../../../States/AppState';
import { connect } from 'react-redux';
import Operation from '../Manage/Operation';
import Delete from '../Manage/DeleteTopicsAndPosts';
import Post from '../Manage/ShowPost';
import { getUserInfo } from '../../../Utility/Fetch/getUserInfo';
import { NotFoundUser } from '../../Status';

interface UserManageState {
    /**
     * 当前访问用户的用户信息
     */
    userInfo: UserInfo;
}

type ownProps = {
    id: number,
    changePage: (page: string, id: number) => void,
    notFoundUser: () => void
}

type match = {
    id: string
}

type Props = ownProps & RouteComponentProps<match>;

class UserManage extends React.Component<Props, UserManageState> {
    async componentDidMount() {
        const id = this.props.id === 0 ? Number.parseInt(this.props.match.params.id) : this.props.id;
        this.props.changePage('manage', id);
        try {
            let userInfo = await getUserInfo(id);
            this.setState({
                userInfo
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
            dispatch(Actions.changeCurrentVisitingUserPage(page, id));
        },
        notFoundUser: () => {
            dispatch(Actions.userNotFound());
        }
    };
}

export default connect(mapState, mapDispatch)(withRouter(UserManage));