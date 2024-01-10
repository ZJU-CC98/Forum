import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../Store';
import * as Actions from '../Actions/Error';

type ownProps = {
    isError: boolean;
    solveError: () => void;
};

type ErrorControlProps = RouteComponentProps<null> & ownProps;

class ErrorControl extends React.Component<ErrorControlProps> {
    componentWillReceiveProps(newProps: ErrorControlProps) {
        if(this.props.location.pathname !== newProps.location.pathname) {
            console.log('location changed')
            this.props.solveError();
        }
    }

    render() {
        return null;
    }
}

function mapState(state: RootState) {
    return {
        isError: state.error.isError
    };
}

function mapDispatch(dispatch) {
    return {
        solveError: () => {
            dispatch(Actions.solveError())
        }
    };
}

export default connect(mapState, mapDispatch)(ErrorControl);