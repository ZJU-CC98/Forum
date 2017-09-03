import * as React from 'react';
import * as Utility from '../Utility'
import { AppState } from '../States/AppState';
import { MymessageMessage } from './MymessageMessage';
import { MymessageSystem } from './MymessageSystem';
import { MymessageResponse } from './MymessageResponse';

import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
export class MyMessage extends React.Component<{}, AppState> {


    render() {
        return (<div className='mymessage'>
            <div className='mymessage-title'>我的消息</div>
            <Router>
                <div className='mymessage-content'>
                    <div className='mymessage-nav'>
                        <div id='myresponse'><NavLink to='/messagebox/responselogin'>回复我的</NavLink></div>
                        <div id='myattme'><NavLink to='/messagebox/attme'>@我的</NavLink></div>
                        <div id='mylikes'><NavLink to='/messagebox/likes'>收到的赞</NavLink></div>
                        <div id='mysystem'><NavLink to='/messagebox/systemlogin'>系统通知</NavLink></div>
                        <div id='mymessage'><NavLink to='/messagebox/login'>我的私信</NavLink></div>
                    </div>
                    <Route path='/messagebox/response' component={MymessageResponse} />
                    <Route path='/messagebox/attme' component={Attme} />
                    <Route path='/messagebox/likes' component={Likes} />
                    <Route path='/messagebox/systemlogin' component={Systemlogin} />
                    <Route path='/messagebox/responselogin' component={Responselogin} />
                    <Route path='/messagebox/system' component={MymessageSystem} />
                    <Route exact path='/messagebox/login' component={login} />
                    <Route path="/messagebox/message" component={MymessageMessage} />
                </div>
                </Router>
        </div>
        );
    }

}
export class Responselogin extends React.Component {
    render() {
        Utility.changeNav('#myresponse');
        let url = Utility.responseRequest();
        return <div className='test'><a href={url}>回复登陆</a></div>;
    }
}

export class Attme extends React.Component {
    render() {
        Utility. changeNav('#myattme');
        return <div className='test'>这里有人@我</div>;
    }
}

export class Likes extends React.Component {
    render() {
        Utility.changeNav('#mylikes');
        return <div className='test'>这里是我收到的赞</div>;
    }
}

export class Systemlogin extends React.Component {
    render() {
        Utility. changeNav('#mysystem');
        let url = Utility.systemRequest();
        return <div className='test'><a href={url}>系统登陆</a></div>;
    }
}

export class login extends React.Component {
    render() {
        Utility.changeNav('#mymessage');
        let url = Utility.sendRequest();
        return <div className='test'><a href={url}>登陆</a></div>;
    }
}