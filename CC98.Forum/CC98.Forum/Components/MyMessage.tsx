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
        let url = sendRequest();
        let token = location.href.match(/access_token=(\S+)&token_type/);
        let accessToken: string;
        if (token) {
            accessToken = token[1];
        }
        return (<div className='mymessage-root'>
                    <div className='mymessage'>
                            <div className='mymessage-login'><a href={url}>登陆</a></div>
                            <div className='mymessage-title'>我的消息</div>
                            <Router>
                                <div className='mymessage-content'>
                                    <div className='mymessage-nav'>
                                        <div id='response'><NavLink to={`/mymessage/response?access_token=${accessToken}`}>回复我的</NavLink></div>
                                        <div id='attme'><NavLink to={`/mymessage/attme?access_token=${accessToken}`}>@我的</NavLink></div>
                                        <div id='likes'><NavLink to={`/mymessage/likes?access_token=${accessToken}`}>收到的赞</NavLink></div>
                                        <div id='system'><NavLink to={`/mymessage/system?access_token=${accessToken}`}>系统通知</NavLink></div>
                                        <div id='message'><NavLink to={`/mymessage/message?access_token=${accessToken}`}>我的私信</NavLink></div>
                                    </div>
                                    <Route path='/mymessage/response' component={MyMessageResponse} />
                                    <Route path='/mymessage/attme' component={MyMessageAttme} />
                                    <Route path='/mymessage/likes' component={Likes} />
                                    <Route path='/mymessage/system' component={MyMessageSystem} />
                                    <Route path='/mymessage/message' component={MyMessageMessage} />
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

function sendRequest() {
    //申请到的appID
    let appId = '457bfed1-ab0b-4606-a346-05afac262d5a';
    //申请后的回调地址
    let c = `${location.origin}/mymessage`;
    let redirectURI = encodeURI(c);
    //构造请求，请求网址为授权地址，响应类型为token，请求所有操作信息根据98api为all，重定向地址即为回调地址
    let path = 'https://login.cc98.org/OAuth/Authorize?'
    let queryParams = ['client_id=' + appId, 'response_type=token', 'scope=all', 'redirect_uri=' + redirectURI];
    let query = queryParams.join('&');
    let url = path + query;
    return url;
}