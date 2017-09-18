import * as React from 'react';
import { AppState } from '../States/AppState';
import * as ReactDOM from 'react-dom';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { Post } from './post';
import { List } from './List';
import { CurUserPost } from './CurUserPost';
import { BoardList } from './BoardList';
import { UserCenter } from './UserCenter';
import { MyMessage } from './MyMessage';
import { AllNewPost } from './AllNewPost';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { UbbContainer } from './UbbContainer';
import * as Ubb from '../Ubb/UbbCodeExtension';


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}
export class App extends React.Component<{}, AppState> {

	render() {
		const data = '[b]Test[/b] [img]http://file.cc98.org/uploadface/5298.png[/img] [noubb][b]Test No UBB[/b][/noubb]';
        //<UbbContainer code={data} />
		return <div><Router>
			<div style={{ backgroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
				<Header />		
				<Route exact path="/" component={MainPage}></Route>
				<Route exact path="/topic/:topicid/:page?" component={Post} />
				<Route exact path="/topic/:topicid/user/:userName/:page?" component={CurUserPost} />
				<Route path="/list/:boardid/:page?" component={List} />
				<Route exact path="/boardlist" component={BoardList} />
				<Route path="/usercenter" component={UserCenter} />
				<Route path="/messagebox" component={MyMessage} />
				<Route path="/newtopics" component={AllNewPost} />
			</div>
		</Router></div>;
	}
}
