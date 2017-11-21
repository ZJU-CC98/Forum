import * as React from 'react';
import { AppState } from '../States/AppState';
import { MessageMessage } from './MessageMessage';
import { MessageResponse } from './MessageResponse';
import { MessageAttme } from './MessageAttme';
import { MessageSystem } from './MessageSystem';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

/**
 * 网站的主页面对象。
 */
export class Message extends React.Component<{}, AppState> {

    compontDidMount() {
        
    }
    
    render() {
        return (<div className="message-root">
                    <div className="message">
                            <div className="message-title">我的消息</div>
                            <Router>
                                <div className="message-content">
                                    <div className="message-nav">
                                        <div id="response"><NavLink to={`/message/response`}>回复我的</NavLink></div>
                                        <div id="attme"><NavLink to={`/message/attme`}>@我的</NavLink></div>
                                        <div id="likes"><NavLink to={`/message/likes`}>收到的赞</NavLink></div>
                                        <div id="system"><NavLink to={`/message/system`}>系统通知</NavLink></div>
                                        <div id="message"><NavLink to={`/message/message`}>我的私信</NavLink></div>
                                    </div>
                                    <Route path="/message/response" component={MessageResponse} />
                                    <Route path="/message/attme" component={MessageAttme} />
                                    <Route path="/message/likes" component={Likes} />
                                    <Route path="/message/system" component={MessageSystem} />
                                    <Route path="/message/message" component={MessageMessage} />
                                </div>
                            </Router>
                    </div>
                </div>
            );
	}

}

//选中效果
export function changeNav(id) {
    $('.message-nav > div').removeClass('message-nav-focus');
    $(id).addClass('message-nav-focus'); 
}

export class Likes extends React.Component {
    render() {
        changeNav('#likes');
        return <div>这里是我收到的赞</div>;
    }
}