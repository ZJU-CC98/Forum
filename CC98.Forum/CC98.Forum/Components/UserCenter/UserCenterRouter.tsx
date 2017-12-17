// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route
} from 'react-router-dom';

import UserCenterExact from './UserCenterExact';
import { UserCenterMyFollowings } from './UserCenterMyFollowings';
import { UserCenterMyFans } from './UserCenterMyFans';
import { UserCenterMyPostsExact } from './UserCenterMyPostsExact';
import { UserCenterConfig } from './UserCenterConfig';
import { UserCenterMyFavoritesBoards } from './UserCenterMyFavoritesBoards';
import { UserCenterMyFavoritesPosts } from './UserCenterMyFavoritesPosts';


/**
 * 用户中心主体
 */
export class UserCenterRouter extends React.Component {
    render() {      
        return (<div className="user-center-router">
            <Route exact path="/usercenter/" component={UserCenterExact} />
            <Route path="/usercenter/myfollowings/:page?" component={UserCenterMyFollowings} />
            <Route path="/usercenter/myfans/:page?" component={UserCenterMyFans} />
            <Route path="/usercenter/myposts/:page?" component={UserCenterMyPostsExact} />
            <Route path="/usercenter/myfavorites/:page?" component={UserCenterMyFavoritesPosts} />
            <Route path="/usercenter/config" component={UserCenterConfig} />
            <Route path="/usercenter/mycustomboards" component={UserCenterMyFavoritesBoards} />
        </div>);
    }
}
