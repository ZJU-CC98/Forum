import * as React from 'react';
import { AppState } from '../States/AppState';
import { match } from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../Store';
import { Post, ShowTopic } from './Topic/Topic';
import { List } from './Board/Board';
import { CurUserPost } from './Topic/Topic-Trace';
import { BoardList } from './Board/BoardList';
import UserCenter from './UserCenter/UserCenter';
import { Message } from './Message/Message';
import { AllNewTopic } from './Topic/Topic-New';
import { Focus } from './Focus/Focus';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import User from './UserCenter/User/User';
import LogOn from './LogOn';
import * as Status from './Status';
import { UbbContainer } from './UbbContainer';
import { Search } from './Search/Search';
import { SearchBoard } from './Search/SearchBoard';
import { Signin } from './Signin';
import { SiteManage } from './SiteManage/Index';
import { ShowEdit } from './Edit';
import { MonthlyHotTopic } from './Topic/Topic-Hot-Monthly';
import { WeeklyHotTopic } from './Topic/Topic-Hot-Weekly';
import { HistoryHotTopic } from './Topic/Topic-Hot-History';

import { Constants } from './Constant';
import * as Utility from '../Utility';
export class App extends React.Component {
    render() {
        return (<div style={{ width: "100%" }}>
            <ConnectedRouter history={history}>
                <div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px", backgroundColor: "#e6e7ec" }}>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={MainPage}></Route>
                        <Route exact path="/topic/hot-monthly" component={MonthlyHotTopic} />
                        <Route exact path="/topic/hot-weekly" component={WeeklyHotTopic} />
                        <Route exact path="/topic/hot-history" component={HistoryHotTopic} />
                        <Route exact path="/topic/:topicid/:page?" component={ShowTopic} />                
                        <Route exact path="/topic/:topicId/postid/:postId/:page?" component={CurUserPost} />
                        <Route path="/list/:boardId/:type?/:page?" component={List} />
                        <Route exact path="/boardlist" component={BoardList} />
                        <Route path="/usercenter" component={UserCenter} />
                        <Route path="/message" component={Message} />
                        <Route path="/focus" component={Focus} />
                        <Route path="/newtopics" component={AllNewTopic} />
                        <Route path="/user/:method/:id" component={User} />
                        <Route path="/logon" exact component={LogOn} />
                        <Route path="/search" component={Search} />
                        <Route path="/searchBoard" component={SearchBoard} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/sitemanage" component={SiteManage} />
                        <Route path="/editor/:mode/:id?" component={ShowEdit} />
                        <Route path="/status/notfoundtopic" component={Status.NotFoundTopic} />
                        <Route path="/status/notfoundboard" component={Status.NotFoundBoard} />
                        <Route path="/status/logout" component={Status.LogOut} />
                        <Route path="/status/topicdeleted" component={Status.TopicDeleted} />
                        <Route path="/status/unauthorizedtopic" component={Status.UnauthorizedTopic} />
                        <Route path="/status/unauthorizedboard" component={Status.UnauthorizedBoard} />
                        <Route path="/status/unauthorizedoperation" component={Status.UnauthorizedOperation} />
                        <Route path="/status/notfounduser" component={Status.NotFoundUser} />
                        <Route path="/status/servererror" component={Status.ServerError} />
                        <Route path="/status/contentneeded" component={Status.ContentNeeded} />
                        <Route path="/status/operationforbidden" component={Status.OperationForbidden} />
                        <Route path="/status/cannotpost" component={Status.CannotPost} />
                        <Route component={Status.PageNotFound} />
                    </Switch>
                    <Footer />
                </div>
            </ConnectedRouter>
        </div>);
    }
}