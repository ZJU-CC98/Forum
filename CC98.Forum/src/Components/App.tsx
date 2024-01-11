import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { history } from "../Store";
import { ShowTopic } from "./Topic/Topic";
import { BList } from "./Board/Board";
import { CurUserPost } from "./Topic/Topic-Trace";
import { BoardList } from "./Board/BoardList";
import UserCenter from "./UserCenter/UserCenter";
import { Message } from "./Message/Message";
import { AllNewTopic } from "./Topic/Topic-New";
import { AllRecommendedTopic } from "./Topic/Topic-Recommended"
import Focus from "./Focus/Focus";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MainPage } from "./MainPage";
import User from "./UserCenter/User/User";
import LogOn from "./LogOn";
import * as Status from "./Status";
import { Search } from "./Search/Search";
import { SearchBoard } from "./Search/SearchBoard";
import { Signin } from "./Signin";
import { SiteManage } from "./SiteManage/Index";
import { ShowEdit } from "./Edit";
import { MonthlyHotTopic } from "./Topic/Topic-Hot-Monthly";
import { WeeklyHotTopic } from "./Topic/Topic-Hot-Weekly";
import { HistoryHotTopic } from "./Topic/Topic-Hot-History";
import ErrorControl from "./ErrorControl";

import { RootState } from "../Store";
import { errorKeys } from "../Reducers/Error";
import { connect } from "react-redux";

import AnnualReview from "../Pages/AnnualReview";
import { Index } from "../Pages/Index/Index";

// 重构
import RBoard from "../Pages/Board/index";

type Props = {
  isError: boolean;
  errorMessage: errorKeys;
};

class App extends React.Component<Props> {
  render() {
    let router = (
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/topic/hot-monthly" Component={MonthlyHotTopic} />
        <Route path="/topic/hot-weekly" Component={WeeklyHotTopic} />
        <Route path="/topic/hot-history" Component={HistoryHotTopic} />
        <Route path="/topic/:topicid/:page?" Component={ShowTopic} />
        <Route path="/topic/:topicId/postid/:postId/:page?" Component={CurUserPost} />
        <Route path="/list/:boardId/:type?/:page?" Component={BList} />
        <Route path="/boardlist" Component={BoardList} />
        <Route path="/usercenter" Component={UserCenter} />
        <Route path="/message" Component={Message} />
        <Route path="/focus" Component={Focus} />
        <Route path="/newtopics" Component={AllNewTopic} />
        <Route path="/recommendedtopics" Component={AllRecommendedTopic} />
        <Route path="/user/:method/:id" Component={User} />
        <Route path="/logon" Component={LogOn} />
        <Route path="/search" Component={Search} />
        <Route path="/searchBoard" Component={SearchBoard} />
        <Route path="/signin" Component={Signin} />
        <Route path="/sitemanage" Component={SiteManage} />
        <Route path="/editor/:mode/:id?" Component={ShowEdit} />

        <Route path="/board/:id/:page?" Component={RBoard} />
        <Route path="/annual-review-2022" Component={AnnualReview} />
        <Route path="/error/401" Component={Status.UnauthorizedBoard} />
        <Route path="/index" Component={Index} />

        <Route Component={Status.PageNotFound} />
      </Routes>
    );

    return (
      <>
        <ConnectedRouter history={history}>
          <div className="main-container">
            <Header />
            <Route Component={ErrorControl} />
            {!this.props.isError ? router : <Route Component={Status[this.props.errorMessage]} />}
            <Footer />
            {/* <NotificationController />*/}
          </div>
        </ConnectedRouter>
      </>
    );
  }
}

function mapState(state: RootState) {
  return {
    isError: state.error.isError,
    errorMessage: state.error.errorMessage,
  };
}

export default connect(mapState)(App);
