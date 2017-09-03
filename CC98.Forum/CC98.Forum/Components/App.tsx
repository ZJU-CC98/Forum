import * as React from 'react';
import { AppState } from '../States/AppState';
import * as ReactDOM from 'react-dom';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { Post } from './post'
import { List } from './List'
import { CurUserPost } from './CurUserPost'
import { Head } from './Head'
import { BoardList } from './BoardList'
import { UserCenter } from './UserCenter'
import { MyMessage } from './MyMessage'
import { AllNewPost } from './AllNewPost'

export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}

export class App extends React.Component<{}, AppState> {

	render() {
        return <div><Router>
            <div style={{ backgroundColor: '#F5FAFD', justifyContent: "center", display: "flex", flexDirection:"column" }}>
              
                <h1>Ashida Mana~</h1>
				<li><Link to="/topic/4723305">moe</Link></li>
                <li><Link to="/boardlist">meow</Link></li>
                <li><a href={`https://login.cc98.org/OAuth/Authorize?scope=getuserinfo*&response_type=token&client_id=9428333a-a0e3-486b-b375-7904f1bceba9&redirect_uri=http%3A%2F%2Flocalhost%3A${location.port}%2Fusercenter`} > 登陆</a></li>
                <li><Link to="/usercenter">个人中心</Link></li>
                <li><Link to="/messagebox">信箱</Link></li>
                <li><Link to="newtopics">新帖 </Link></li>
                 <hr />
                 <Route exact path="/topic/:topicid/:page?" component={Post} />
                 <Route exact path="/topic/:topicid/user/:userName/:page?" component={CurUserPost} />
                 <Route path="/list/:boardid/:page?" component={List} />
                 <Route exact path="/boardlist" component={BoardList} />
                 <Route path="/usercenter" component={UserCenter} />
                 <Route  path="/messagebox" component={MyMessage} />
                 <Route path="/newtopics" component={AllNewPost} />
			</div>
		</Router></div>;
	}

}

