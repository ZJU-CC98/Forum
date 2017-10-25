import * as React from 'react';
import { AppState } from '../States/AppState';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route } from 'react-router-dom';
import { Post } from './post';
import { List } from './List';
import { CurUserPost } from './CurUserPost';
import { BoardList } from './BoardList';
import { UserCenter } from './UserCenter';
import { MyMessage } from './MyMessage';
import { AllNewPost } from './AllNewPost';
import { MyFocusBoard } from './MyFocusBoard';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainPage } from './MainPage';
import { User } from './User';
import { LogOn } from './LogOn';

import { UbbContainer } from './UbbContainer';


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}
/* <h1>Ashida Mana~</h1>
				<li><Link to="/topic/4723305">moe</Link></li>
                <li><Link to="/boardlist">meow</Link></li>
                <li><a href={`https://login.cc98.org/OAuth/Authorize?scope=getuserinfo*&response_type=token&client_id=9428333a-a0e3-486b-b375-7904f1bceba9&redirect_uri=http%3A%2F%2Flocalhost%3A${location.port}%2Fusercenter`} > 登陆</a></li>
                <li><Link to="/usercenter">个人中心</Link></li>
                <li><Link to="/messagebox">信箱</Link></li>
                <li><Link to="/newtopics">新帖 </Link></li>
                 <hr />*/
export class App extends React.Component<{}, AppState> {

    render() {
		return <div>
			<Router>
				    <div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Header />
					<Route exact path="/" component={MainPage}></Route>
					<Route exact path="/topic/:topicid/:page?" component={Post} />
					<Route exact path="/topic/:topicid/user/:userName/:page?" component={CurUserPost} />
					<Route path="/list/:boardid/:page?" component={List} />
					<Route exact path="/boardlist" component={BoardList} />
					<Route path="/usercenter" component={UserCenter} />
                    <Route path="/mymessage" component={MyMessage} />
                    <Route path="/focus" component={MyFocusBoard} />
					<Route path="/newtopics" component={AllNewPost} />
					<Route path="/user" component={User} />
                    <Route path="/logon" component={LogOn} />
                    <Footer />
				</div>
			</Router></div>;
	}
}
