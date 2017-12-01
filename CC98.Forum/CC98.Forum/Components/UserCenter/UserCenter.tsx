// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { connect } from 'react-redux';
import { throwError } from '../../Actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserCenterNavigation } from './UserCenterNavigation';
import { UserCenterRouter } from './UserCenterRouter';

/**
 * 用户中心页面
 */
export class UserCenterBefore extends React.Component<{ isLogOn, throwError }> {
    render() {
        if (!this.props.isLogOn) {
            this.props.throwError('LogOut');
            return <div></div>;
        }
        return (
            <div className="user-center">
                <div className="user-center-content">
                    <div className="user-center-head">
                        <p>个人中心</p>
                    </div>
                    <Router>
                        <div className="user-center-body">
                            <UserCenterNavigation />
                            <UserCenterRouter />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        isLogOn: state.isLogOn
    };
}

function mapDispatch(dispatch) {
    return {
        throwError: (errorMessage) => {
            console.log(errorMessage);
            dispatch(throwError(errorMessage));
        }
    };
}

export const UserCenter = connect(mapState, mapDispatch)(UserCenterBefore);