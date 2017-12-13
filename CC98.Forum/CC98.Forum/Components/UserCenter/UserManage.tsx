import * as React from 'react';
import { changeCurrentVisitingUserPage } from '../../Actions';
import { connect } from 'react-redux';

class UserManage extends React.Component<{id,  changePage, match }> {
    componentDidMount() {
        const id = this.props.id === 0 ? this.props.match.params.id : this.props.id;
        this.props.changePage('manage', id);
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
        }
    };
}

export default connect(mapState, mapDispatch)((UserManage));