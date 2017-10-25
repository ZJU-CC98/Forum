// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route,
    BrowserRouter as Router
} from 'react-router-dom';

import { LogOnExact } from './LogOnExact';
import { LogOff } from './Logoff'

/**
 * 用户中心页面
 */
export class LogOn extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/logon" exact component={LogOnExact} />
                    <Route path="/logon/logoff" component={LogOff} />
                </div>
            </Router>
        );
    }
}