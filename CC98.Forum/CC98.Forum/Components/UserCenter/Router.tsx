// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Route
} from 'react-router-dom';

import Exact from './Exact';
import MyFollowings from './MyFollowings';
import MyFans from './MyFans';
import MyPostsExact from './MyPostsExact';
import Config from './Config';
import MyFavoritesBoards from './MyFavoritesBoards';
import MyFavoritesPosts from './MyFavoritesPosts';
import Wealth from './TransferWealth';
import Theme from './Theme';

/**
 * 用户中心主体
 */
export default class extends React.Component {
    render() {      
        return (
            <div className="user-center-router">
                <Route exact path="/usercenter/" component={Exact} />
                <Route path="/usercenter/myfollowings/:page?" component={MyFollowings} />
                <Route path="/usercenter/myfans/:page?" component={MyFans} />
                <Route path="/usercenter/myposts/:page?" component={MyPostsExact} />
                <Route path="/usercenter/myfavorites/order/:order/:page?" component={MyFavoritesPosts} />
                <Route path="/usercenter/config" component={Config} />
                <Route path="/usercenter/mycustomboards" component={MyFavoritesBoards} />
                <Route path="/usercenter/transferwealth" component={Wealth} />
                <Route path="/usercenter/theme" component={Theme} />
            </div>
        );
    }
}
