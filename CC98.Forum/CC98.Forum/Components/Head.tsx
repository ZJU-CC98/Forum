import * as React from 'react';
/**
 * 网站的主页面对象。
 */
import * as State from "../States/AppState"
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
export class Head extends React.Component<{}, State.LoginState> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            loginOrNot: true
        }
    }
    render() {
        return <div className="headRoot"><div id="backgroundimg"> <img src="images/模板图片.jpg" /></div>
            <div className="shadow"> </div>
            <div className="beijingtiao"> </div>
            <div id="logo"><img src="images/矢量智能对象.ico" /></div>
            <div id="cc98"><img src="images/CC98论坛.ico" /></div>
            <div id="search"><div id="option">
                    <div id="theme">主题</div>
                    <div id="down"></div>
                </div>
                <div style={{ left: '50px', top: '0px', position: 'absolute' }}>
                    <input id="searchbar" type="text" placeholder="猜猜能搜到什么..."></input>
                </div>
                <button id="searchbutton">
                    <img src="images/fangdajing.ico" width="15" height="15" />
                </button>
            </div>
            <div id="BBScolumn">
                <div style={{ position: 'absolute', left: '12px', top: '10px' }}>
                    <img src="images/网盘.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '37px', top: '8px' }}>
                    <a href="" className="ziti1">网盘</a>
                </div>
                <div style={{ position: 'absolute', left: '84px', top: '10px' }}>
                    <img src="images/游戏.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '109px', top: '8px' }}>
                    <a href="http://www.cc98.org/game.asp" className="ziti1">游戏</a>
                </div>
                <div style={{ position: 'absolute', left: '156px', top: '10px' }}>
                    <img src="images/勋章.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '181px', top: '8px' }}>
                    <a href="http://v2.cc98.org/app/medalmanager.aspx" className="ziti1">勋章中心</a>
                </div>
                <div style={{ position: 'absolute', left: '253px', top: '10px' }}>
                    <img src="images/卡片.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '278px', top: '8px' }}>
                    <a href="http://card.cc98.org/" className="ziti1">抽卡</a>
                </div>
                <div style={{ position: 'absolute', left: '325px', top: '10px' }}>
                    <img src="images/猜猜.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '350px', top: '8px' }}>
                    <a href="http://gaming.cc98.org/Game" className="ziti1">竞猜</a>
                </div>
                <div style={{ position: 'absolute', left: '397px', top: '10px' }}>
                    <img src="images/直播.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '422px', top: '8px' }}>
                    <a href="http://live.cc98.org/" className="ziti1">直播</a>
                </div>
                <div style={{ position: 'absolute', left: '469px', top: '10px' }}>
                    <img src="images/应用.ico" width="15" height="15" />
                </div>
                <div style={{ position: 'absolute', left: '494px', top: '8px' }}>
                    <a href="" className="ziti1">应用</a>
                </div>
            </div>
            <div className="banquantiao"></div>
            <div id="banquanwenzi">
                <p>Copyright © 2003-2017 CC98 Network Association. Email: contact@cc98.org</p></div></div>;
    }
}