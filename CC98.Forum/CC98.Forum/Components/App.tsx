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
import ErrorControl from './ErrorControl';

import { Constants } from './Constant';
import * as Utility from '../Utility';
import { RootState } from '../Store';
import { errorKeys } from '../Reducers/Error';
import { connect } from 'react-redux';

type Props = {
    isError: boolean,
    errorMessage: errorKeys
};

class App extends React.Component<Props> {
    render() {
        let router = (
        <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/topic/hot-monthly" component={MonthlyHotTopic} />
            <Route exact path="/topic/hot-weekly" component={WeeklyHotTopic} />
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
            <Route component={Status.PageNotFound} />
        </Switch>);


        return (<div style={{ width: "100%" }}>
            <ConnectedRouter history={history}>
                <div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px", backgroundColor: "#e6e7ec" }}>
                    <Header />
                    <Route component={ErrorControl} />
                    {!this.props.isError ? router : <Route component={Status[this.props.errorMessage]} />}
                    <Footer />
                </div>
            </ConnectedRouter>
        </div>);
    }
}

function mapState(state: RootState) {
    return {
        isError: state.error.isError,
        errorMessage: state.error.errorMessage
    };
}

export default connect(mapState)(App);