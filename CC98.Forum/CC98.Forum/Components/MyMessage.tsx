import * as React from 'react';
import { AppState } from '../States/AppState';
import { MyMessageMessage } from './MyMessageMessage';
import { MyMessageResponse } from './MyMessageResponse';
import { MyMessageAttme } from './MyMessageAttme';
import { MyMessageSystem } from './MyMessageSystem';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

/**
 * 网站的主页面对象。
 */
export class MyMessage extends React.Component<{}, AppState> {
    
    render() {
        return (<div className="mymessage-root">
                    <div className="mymessage">
                            <div className="mymessage-title">我的消息</div>
                            <Router>
                                <div className="mymessage-content">
                                    <div className="mymessage-nav">
                                        <div id="response"><NavLink to={`/mymessage/response`}>回复我的</NavLink></div>
                                        <div id="attme"><NavLink to={`/mymessage/attme`}>@我的</NavLink></div>
                                        <div id="likes"><NavLink to={`/mymessage/likes`}>收到的赞</NavLink></div>
                                        <div id="system"><NavLink to={`/mymessage/system`}>系统通知</NavLink></div>
                                        <div id="message"><NavLink to={`/mymessage/message`}>我的私信</NavLink></div>
                                    </div>
                                    <Route path="/mymessage/response" component={MyMessageResponse} />
                                    <Route path="/mymessage/attme" component={MyMessageAttme} />
                                    <Route path="/mymessage/likes" component={Likes} />
                                    <Route path="/mymessage/system" component={MyMessageSystem} />
                                    <Route path="/mymessage/message" component={MyMessageMessage} />
                                </div>
                            </Router>
                    </div>
                </div>
            );
	}

}

//选中效果
export function changeNav(id) {
    $('.mymessage-nav > div').removeClass('mymessage-nav-focus');
    $(id).addClass('mymessage-nav-focus'); 
}

export class Likes extends React.Component {
    render() {
        changeNav('#likes');
        return <div>这里是我收到的赞</div>;
    }
}