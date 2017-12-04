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
    
    render() {
        return (<div className="message-root">
                    <div className="message">
                            <div className="message-title">我的消息</div>
                            <Router>
                                <div className="message-content">
                                    <div className="message-nav">
                                        <div id="response"><NavLink to={`/message/response`}>回复我的</NavLink></div>
                                        <div id="attme"><NavLink to={`/message/attme`}>@ 我的</NavLink></div>
                                        <div id="system"><NavLink to={`/message/system`}>系统通知</NavLink></div>
                                        <div id="message"><NavLink to={`/message/message`}>我的私信</NavLink></div>
                                    </div>
                                    <Route path="/message/response" component={MessageResponse} />
                                    <Route path="/message/attme" component={MessageAttme} />
                                    <Route path="/message/system" component={MessageSystem} />
                                    <Route path="/message/message" component={MessageMessage} />
                                </div>
                            </Router>
                    </div>
                </div>
            );
	}
}