import * as React from 'react';
import { AppState } from '../States/AppState';
import { MessageMessage } from './MessageMessage';
import { MessageResponse } from './MessageResponse';
import { MessageAttme } from './MessageAttme';
import { MessageSystem } from './MessageSystem';
import * as Utility from '../Utility';
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
        let unreadCount = Utility.getStorage("unreadCount");
        if (!unreadCount) {
            Utility.refreshUnReadCount();
            unreadCount = Utility.getStorage("unreadCount");
        }
        return (<div className="message-root">
                    <div className="message">
                            <div className="message-title">我的消息</div>
                            <Router>
                                <div className="message-content">
                        <div className="message-nav">
                            <NavLink to="/message/response"><div id="response" className="nav-div">回复我的<div className="message-counterNav displaynone" id="unreadCount-replyCount1">{unreadCount.replyCount}</div></div></NavLink>
                            <NavLink to="/message/attme"><div id="attme" className="nav-div">@ 我的<div className="message-counterNav displaynone" id="unreadCount-atCount1">{unreadCount.atCount}</div></div></NavLink>
                            <NavLink to="/message/system"><div id="system" className="nav-div">系统通知<div className="message-counterNav displaynone" id="unreadCount-systemCount1">{unreadCount.systemCount}</div></div></NavLink>
                            <NavLink to="/message/message"><div id="message" className="nav-div">我的私信<div className="message-counterNav displaynone" id="unreadCount-messageCount1">{unreadCount.messageCount}</div></div></NavLink>
                                    </div>
                                    <Route path="/message/response/:page?" component={MessageResponse} />
                                    <Route path="/message/attme/:page?" component={MessageAttme} />
                                    <Route path="/message/system/:page?" component={MessageSystem} />
                                    <Route path="/message/message/:page?" component={MessageMessage} />
                                </div>
                            </Router>
                    </div>
                </div>
            );
	}
}