// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserCenterNavigation } from './UserCenterNavigation';
import { UserCenterRouter } from './UserCenterRouter';

/**
 * 用户中心页面
 */
export class UserCenter extends React.Component {
    render() {
        return (
            <div className='user-center'>
                <div className='user-center-head'>
                    <p>个人中心</p>
                </div>
                <Router>
                    <div className='user-center-body'>
                        <UserCenterNavigation />
                        <UserCenterRouter />
                    </div>
                </Router>
            </div>
        );
    }
}