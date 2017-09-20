// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { UserNavigation } from './UserNavigation';
import { UserRouter } from './UserRouter';

export class User extends React.Component {
    render() {
        return (<div className="user-center">
            <div className="user-center-head">
                <p>用户详情</p>
            </div>
            <Router>
                <div className="user-center-body">
                    <UserNavigation />
                    <UserRouter />
                </div>
            </Router>
        </div>);
    }
}