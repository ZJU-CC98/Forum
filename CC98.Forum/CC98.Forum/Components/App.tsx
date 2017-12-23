import * as React from 'react';
import { AppState } from '../States/AppState';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
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
import { LogOff } from './Logoff'
import { CreateTopic } from './Topic/Topic-CreateTopic';
import * as Status from './Status';
import { UbbContainer } from './UbbContainer';
import { Search } from './Search/Search';
import { SearchBoard } from './Search/SearchBoard';
import { Signin } from './Signin';
import { SiteManage } from './SiteManage/Index';
import { SignalRComponent } from './SignalR';
import { ShowEdit } from './Edit';

import { Constants } from './Constant';

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}



export class App extends React.Component<null, AppState> {

	render() {
		return (<div style={{ width: "100%" }}>
			<Router>
				<div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px", background: "linear-gradient(to top,rgba(121,184,202,0.3),rgba(121,184,202,0.02))" }}>
					<Header />
					<Switch>
						<Route exact path="/" component={MainPage}></Route>
						<Route exact path="/topic/:topicid/:page?" component={ShowTopic} />
						<Route exact path="/topic/:topicid/user/:userId/:page?" component={CurUserPost} />
						<Route path="/list/:boardId/:type?/:page?" component={List} />
						<Route exact path="/boardlist" component={BoardList} />
						<Route path="/usercenter" component={UserCenter} />
						<Route path="/message" component={Message} />
						<Route path="/focus" component={Focus} />
						<Route path="/newtopics" component={AllNewTopic} />
						<Route path="/user/:method/:id" component={User} />
						<Route path="/logon" exact component={LogOn} />
						<Route path="/logon/logoff" component={LogOff} />
						<Route path="/search" component={Search} />
						<Route path="/searchBoard" component={SearchBoard} />
						<Route path="/createtopic/:boardId" component={CreateTopic} />
						<Route path="/signin" component={Signin} />
						<Route path="/sitemanage" component={SiteManage} />
						<Route path="/signalr" component={SignalRComponent} />
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
						<Route component={Status.PageNotFound} />
					</Switch>
					<Footer />
				</div>
			</Router>
		</div>);
	}
}