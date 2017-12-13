import * as React from 'react';
import * as Utility from '../../Utility';
import { changeCurrentVisitingUserPage, userNotFound } from '../../Actions';
import { connect } from 'react-redux';

class UserManage extends React.Component<{id,  changePage, match, notFoundUser }> {
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
            const data = await response.json();
        } catch (e) {
            this.props.notFoundUser();
        }
    }
    render() {
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