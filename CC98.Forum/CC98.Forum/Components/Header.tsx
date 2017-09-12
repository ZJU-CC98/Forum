import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppState } from '../States/AppState';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
/*
<div className="root">
            <div className="headerBackground">
                <img src="/images/headerBackground.jpg"></img>
            </div>
        </div>
*/
export class Header extends React.Component<{}, AppState> {
    render() {
        return <div className="header">
            <div className="topBar">
                <div className="topBarRow">
                    <div className="row"><div style={{ margin: '10px 0 0 0' }}><a  href="/"><img src="images/矢量智能对象.ico" /></a></div><div style={{ margin: '15px 0 0 5px' }}><a href="/"><img  src="/images/CC98.ico" /></a></div></div>
                    <div id="dropdown">
                        <div className="box">
                            <div className="userImg"><img src="/images/userImg.png"></img></div>
                            <div className="select">userName</div>
                            <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/mymessage" style={{ color: "#fff" }}>消息</a></div>
                            <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/" style={{ color:"#fff" }}>首页</a></div>
                            <div className="topBarText" style={{ margin: '0 10px 0 10px' }}>关注</div>
                            <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/newTopics" style={{ color:"#fff" }}>新帖</a></div>
                            <div className="topBarText" style={{ margin: '0 0 0 10px' }}><a href="/boardList" style={{ color: "#fff" }}>版面</a></div>
                        </div>
                        <ul className="sub">
                            <li>个人中心</li>
                            <li>设置</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="headerContent">
                <div className="headerRow">
                    <div className="linkBar">
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/网盘.ico" width="15" height="15" /></div>
                            <div><a href="http://share.cc98.org/" className="linkText">网盘</a></div>
                        </div>
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/游戏.ico" width="15" height="15" /></div>
                            <div><a href="http://www.cc98.org/game.asp" className="linkText">游戏</a></div>
                        </div>
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/勋章.ico" width="15" height="15" /></div>
                            <div><a href="http://v2.cc98.org/app/medalmanager.aspx" className="linkText">勋章</a></div>
                        </div>
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/抽卡.ico" width="15" height="15" /></div>
                            <div><a href="http://card.cc98.org/" className="linkText">抽卡</a></div>
                        </div>
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/gamble.ico" width="15" height="15" /></div>
                            <div><a href="http://gaming.cc98.org" className="linkText">竞猜</a></div>
                        </div>
                        <div className="row" style={{ margin: '0 10px 0 10px' }}>
                            <div style={{ margin: '3px 10px 0 0' }}><img src="/images/NexusHD.jpg" width="15" height="15" /></div>
                            <div><a href="http://www.nexushd.org" className="linkText">NexusHD</a></div>
                        </div>
                    </div>

                    <div id="search">
                        <div className="box">
                            <form>
                                <div className="select">主题</div>
                                <div className="downArrow"><img src="images/downArrow.png" width="12" height="12" /></div>
                                <input name="searchText" type="text" placeholder="猜猜能搜到什么..." />
                                <div className="fangdajing"><img src="images/fangdajing.ico" width="15" height="15" /></div>
                            </form>
                        </div>
                        <ul className="sub">
                            <li>版面</li>
                            <li>主题</li>
                            <li>用户</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    }
}

/*

<img src="/images/headerBackground.jpg"></img>
            <div id="backgroundimg"> <img src="images/模板图片.jpg" /> </div>
            <div className="shadow"> </div>
            <div className="beijingtiao"> </div>
            <div id="logo"><img src="images/矢量智能对象.ico" /></div>
            <div id="cc98"><img src="images/CC98论坛.ico" /></div>

            <div id="search">
                <div id="option">
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

                <p>Copyright © 2003-2017 CC98 Network Association. Email: contact@cc98.org</p></div>

        </div>
    }
}
*/