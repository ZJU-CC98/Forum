// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';
import { UserCenterMyFavoritesPosts } from './UserCenterMyFavoritesPosts';
import { UserCenterMyFavoritesBoards } from './UserCenterMyFavoritesBoards';
//import { UserCenterMyFavoritesPostsBoards } from './UserCenterMyFavoritesPostsBoards';

//<Route path='/usercenter/myfavorites/boards' component={UserCenterMyFavoritesPostsBoards} />
/**
 * 用户中心主页近期动态组件
 */
export class UserCenterMyFavorites extends React.Component {
    render() {
        return (
            <Router>
                <div className="user-center-myfavorites">
                    <CustomLink to="/usercenter/myfavorites" label="文章" activeOnlyWhenExact={true} /> | <CustomLink to="/usercenter/myfavorites/boards/1" label="版面" activeOnlyWhenExact={false} />
                    <Route path="/usercenter/myfavorites/boards/1" component={UserCenterMyFavoritesBoards} />
                    <Route exact path="/usercenter/myfavorites/:page?" component={UserCenterMyFavoritesPosts} />
                </div>
            </Router>
        );
    }
}

const CustomLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <Link className={match ? 'user-activities-active' : ''} to={to}>{label}</Link>
    )} />
);