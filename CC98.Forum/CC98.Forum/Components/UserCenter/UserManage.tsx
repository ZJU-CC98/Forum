import * as React from 'react';
import * as Utility from '../../Utility';
import { changeCurrentVisitingUserPage, userNotFound } from '../../Actions';
import { UserInfo } from '../../States/AppState';
import { connect } from 'react-redux';

class UserManageState {
    /**
     * 当前访问用户的用户信息
     */
    userInfo: UserInfo;
    /**
     * 页面加载状态
     */
    isLoading: boolean;
}

class UserManage extends React.Component<{ id, changePage, match, notFoundUser }, UserManageState> {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            isLoading: true
        };
    }
    async componentDidMount() {
        const id = this.props.id === 0 ? this.props.match.params.id : this.props.id;
        this.props.changePage('manage', id);
        try {
            const url = `http://apitest.niconi.cc/User/${id}`;
            let myHeaders = new Headers();
            myHeaders.append('Authorization', await Utility.getToken());
            let response = await fetch(url, {
                headers: myHeaders
            });
            const data: UserInfo = await response.json();
            this.setState({
                userInfo: data,
                isLoading: false
            });
        } catch (e) {
            this.props.notFoundUser();
        }
    }
    render() {
        if (this.state.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
        return (<div></div>);
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