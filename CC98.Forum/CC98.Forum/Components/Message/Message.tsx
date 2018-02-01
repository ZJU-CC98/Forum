import * as React from 'react';
import { AppState } from '../../States/AppState';
import { MessageMessage } from './MessageMessage';
import { MessageResponse } from './MessageResponse';
import { MessageAttme } from './MessageAttme';
import { MessageSystem } from './MessageSystem';
import { MessageSetting } from './MessageSetting';
import * as Utility from '../../Utility';
import DocumentTitle from '../DocumentTitle';
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
        let unreadCount = { totalCount: 0, replyCount: 0, atCount: 0, systemCount: 0, messageCount: 0 };
        if (Utility.getStorage("unreadCount")) {
            unreadCount = Utility.getStorage("unreadCount")
        }
        return (<div className="message-root">
                    <DocumentTitle title={`CC98论坛-我的消息`} />
            <div className="message">
                <div className="readAllMessage">
                    <button className="message-message-wPostBtn" onClick={Utility.readAll}>全部标为已读</button>
                </div>
                            <div className="message-title">我的消息</div>
                            <Router>
                                <div className="message-content">
                                    <div className="message-nav">
                            <NavLink to="/message/response"><div id="response" className="nav-div">回复我的<div className="message-counterNav displaynone" id="unreadCount-replyCount1">{unreadCount.replyCount}</div></div></NavLink>
                            <hr/>
                            <NavLink to="/message/attme"><div id="attme" className="nav-div">@ 我的<div className="message-counterNav displaynone" id="unreadCount-atCount1">{unreadCount.atCount}</div></div></NavLink>
                            <hr/>
                            <NavLink to="/message/system"><div id="system" className="nav-div">系统通知<div className="message-counterNav displaynone" id="unreadCount-systemCount1">{unreadCount.systemCount}</div></div></NavLink>
                            <hr/>
                            <NavLink to="/message/message"><div id="message" className="nav-div">我的私信<div className="message-counterNav displaynone" id="unreadCount-messageCount1">{unreadCount.messageCount}</div></div></NavLink>
                            <hr />
                            <NavLink to="/message/setting"><div id="setting" className="nav-div">消息设置</div></NavLink>
                        </div>
                                    <Route exact path="/message" component={MessageResponse}></Route>
                                    <Route path="/message/response/:page?" component={MessageResponse} />
                                    <Route path="/message/attme/:page?" component={MessageAttme} />
                                    <Route path="/message/system/:page?" component={MessageSystem} />
                                    <Route path="/message/message/:page?" component={MessageMessage} />
                                    <Route path="/message/setting" component={MessageSetting} />
                                </div>
                            </Router>
                    </div>
                </div>
            );
	}
}