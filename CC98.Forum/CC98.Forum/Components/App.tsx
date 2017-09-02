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
               
                 <hr />
                 <Route exact path="/topic/:topicid/:page?" component={Post} />
                 <Route exact path="/topic/:topicid/user/:userName/:page?" component={CurUserPost} />
                 <Route path="/list/:boardid/:page?" component={List} />
                 <Route exact path="/boardlist" component={BoardList}/>
			</div>
		</Router></div>;
	}

}

