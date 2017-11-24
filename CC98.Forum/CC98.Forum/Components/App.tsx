import * as React from 'react';
import { AppState } from '../States/AppState';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { Post } from './post';
import { List } from './List';
import { CurUserPost } from './CurUserPost';
import { BoardList } from './BoardList';
import { UserCenter } from './UserCenter/UserCenter';
import { Message } from './Message';
import { AllNewTopic } from './AllNewTopic';
import { Focus } from './Focus';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { User } from './UserCenter/User';
import { LogOn } from './LogOn';
import { CreateTopic } from './CreateTopic';
import * as Status from './Status';
import { UbbContainer } from './UbbContainer';


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}

export class App extends React.Component<{}, AppState> {

	render() {
		return <div style={{ width: "100%" }}>
			<Router>
				<div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", width: "100%", minWidth: "1140px" }}>
					<Header />
					<Route exact path="/" component={MainPage}></Route>          
					<Route exact path="/topic/:topicid/:page?" component={Post} />
					<Route exact path="/topic/:topicid/user/:userId/:page?" component={CurUserPost} />
					<Route path="/list/:boardId/:page?" component={List} />
					<Route exact path="/boardlist" component={BoardList} />
					<Route path="/usercenter" component={UserCenter} />
					<Route path="/message" component={Message} />
					<Route path="/focus" component={Focus} />
					<Route path="/newtopics" component={AllNewTopic} />
					<Route path="/user" component={User} />
					<Route path="/logon" component={LogOn} />
					<Route path="/createtopic/:boardId" component={CreateTopic} />
					<Route path="/status/logout" component={Status.LogOut} />
					<Route path="/status/UnauthorizedBoard" component={Status.UnauthorizedBoard} />
					<Route path="/status/UnauthorizedTopic" component={Status.UnauthorizedTopic} />
					<Route path="/status/NotFoundTopic" component={Status.NotFoundTopic} />
					<Route path="/status/NotFoundBoard" component={Status.NotFoundBoard} />
                    <Route path="/status/NotFoundUser" component={Status.NotFoundUser} />
                    <Route path="/status/ServerError" component={Status.ServerError} />
                    <Route path="/status/OperationForbidden" component={Status.OperationForbidden} />
                    <Route path="/status/Disconnected" component={Status.Disconnected} />
                    <Route path="/status/TopicDeleted" component={Status.TopicDeleted} />
					<Footer />
				</div>
			</Router></div>;
	}
}
