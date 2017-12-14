// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
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
            <div className="user-center-myfavorites">
                <CustomLink to="/usercenter/myfavorites/posts" label="文章" /> | <CustomLink to="/usercenter/myfavorites/boards" label="版面" />
                <Switch>
                    <Route path="/usercenter/myfavorites/boards" component={UserCenterMyFavoritesBoards} />
                    <Route path="/usercenter/myfavorites/posts/:page?" component={UserCenterMyFavoritesPosts} />
                    <Redirect to="/usercenter/myfavorites/posts" />
                </Switch>
            </div>
        );
    }
}

const CustomLink = ({ label, to }) => (
    <Route path={to} children={({ match }) => (
        <Link className={match ? 'user-activities-active' : ''} to={to}>{label}</Link>
    )} />
);