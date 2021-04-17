// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Exact from "./Exact";
import MyFollowings from "./MyFollowings";
import MyFans from "./MyFans";
import MyTopics from "./MyTopics";
import MyPosts from "./MyPosts";
import Config from "./Config";
import MyFavoritesBoards from "./MyFavoritesBoards";
import MyFavoritesPosts from "./MyFavoritesPosts";
import Wealth from "./TransferWealth";
import Theme from "./Theme";

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
        <Route path="/usercenter/mytopics/:page?" component={MyTopics} />
        <Switch>
          <Route path="/usercenter/myposts/ishot/:ishot/:page?" component={MyPosts} />
          <Route path="/usercenter/myposts">
            <Redirect to="/usercenter/myposts/ishot/0" />
          </Route>
        </Switch>
        <Switch>
          <Route path="/usercenter/myfavorites/order/:order/:page?" exact component={MyFavoritesPosts} />
          <Route path="/usercenter/myfavorites">
            <Redirect to="/usercenter/myfavorites/order/0" />
          </Route>
        </Switch>
        <Route path="/usercenter/config" component={Config} />
        <Route path="/usercenter/mycustomboards" component={MyFavoritesBoards} />
        <Route path="/usercenter/transferwealth" component={Wealth} />
        <Route path="/usercenter/theme" component={Theme} />
      </div>
    );
  }
}
