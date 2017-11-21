import * as React from 'react';
import * as Utility from '../Utility';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';

export class DropDown extends React.Component<{}, { userName, userImgUrl }> {   //顶部条的下拉菜单组件
    constructor(props?, context?) {
        super(props, context);
        this.state = ({
            userName: "载入中……",
            userImgUrl: "/images/unLoggedOn.png"
        });
    }
    async componentDidMount() {
        if (Utility.getLocalStorage("accessToken")) {
            let userName = Utility.getLocalStorage("userName");
            let response = await fetch(`http://apitest.niconi.cc/User/Name/${userName}`);
            let data = await response.json();
            let userImgUrl = data.portraitUrl;
            this.setState({ userName: userName, userImgUrl: userImgUrl });
        } else if (Utility.getLocalStorage("userName")) {   //如果缓存中没有token但是存在userName，说明token已过期，尝试自动刷新token
            this.reLogOn();
            //刷新token成功，改变state
            let userName = Utility.getLocalStorage("userName");
            let response = await fetch(`http://apitest.niconi.cc/User/Name/${userName}`);
            let data = await response.json();
            let userImgUrl = data.portraitUrl;
            this.setState({ userName: userName, userImgUrl: userImgUrl });
        }
    }

    async reLogOn() {
        let url = 'https://openid.cc98.org/connect/token';
        const requestBody = {
            'client_id': '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
            'client_secret': '8b53f727-08e2-4509-8857-e34bf92b27f2',
            'grant_type': 'password',
            'username': Utility.getLocalStorage("userName"),
            'password': Utility.getLocalStorage("password"),
            'scope': "cc98-api openid"
        }

        let reLogOnResponse = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',//在fetch API里这不是默认值，需要手动添加
            },
            body: $.param(requestBody)

        });
        //请求是否成功
        if (reLogOnResponse.status !== 200) {
            console.log('自动刷新token失败，请重新登录');//因为logOff会刷新页面，所以这里可能看不到
            this.logOff();
        }

        //缓存数据
        let reLogOnData = await reLogOnResponse.json();
        const token = "Bearer " + encodeURIComponent(reLogOnData.access_token);
        Utility.setLocalStorage("accessToken", token, reLogOnData.expires_in);
        console.log("刷新token成功");

    } catch(e) {    //捕捉到例外，开始执行catch语句，否则跳过
        console.log("Oops, error", e);
        console.log('自动刷新token失败，请重新登录');//因为logOff会刷新页面，所以这里可能看不到
        this.logOff();
    }

    logOff() {
        Utility.removeLocalStorage("accessToken");
        console.log("after remove token=" + Utility.getLocalStorage("accessToken"));
        Utility.removeLocalStorage("userName");
        Utility.removeLocalStorage("password");
        Utility.removeLocalStorage("userInfo");
        Utility.removeLocalStorage("recentContact");
        Utility.removeStorage("focusBoardList");
        Utility.removeStorage("focusBoardTopic");
        Utility.removeStorage("recentContact");
        location = window.location;     //刷新当前页面
    }

    render() {
        if (Utility.getLocalStorage("accessToken") && Utility.getLocalStorage("userName")) {
            $(document).ready(function () {

                const userInfo = $('.userInfo').eq(0);
                const dropDownSub = $('.dropDownSub').eq(0);
                const dropDownLi = dropDownSub.find('li');

                userInfo.hover(function () {
                    dropDownSub.slideDown("fast");
                }, function () {
                    dropDownSub.css('display', 'none');
                });
                dropDownSub.hover(function () {
                    dropDownSub.css('display', 'block');
                }, function () {
                    dropDownSub.slideUp("fast");
                });
                /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
                如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
                或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

                dropDownLi.mouseover(function () {
                    this.className = 'hover';
                });

                dropDownLi.mouseout(function () {
                    this.className = '';
                });
            });
            return <div id="dropdown">
                <div className="box">
                    <div className="userInfo">
                        <div className="userImg"><img src={this.state.userImgUrl}></img></div>
                        <div className="userName">{this.state.userName}</div>
                    </div>
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/" style={{ color: '#fff' }}>首页</a></div>
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/focus" style={{ color: '#fff' }}>关注</a></div>
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/newTopics" style={{ color: '#fff' }}>新帖</a></div>
                    <a href="/boardList"><div className="boardListLink" style={{ margin: '0 0 0 10px' }}><div style={{ marginTop: '16px', color: '#fff' }}>版面</div></div></a>
                </div>
                <div className="dropDownSubBox">
                    <ul className="dropDownSub">
                        <a href="/userCenter"> <li>个人中心</li></a>
                        <a href="/message"><li>消息</li></a>
                        <li onClick={this.logOff}>注销</li>
                    </ul>
                </div>
            </div>;
        }
        else {
            return <div id="dropdown">
                <div className="box">
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/" style={{ color: '#fff' }}>首页</a></div>
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/logOn" style={{ color: '#fff' }}>登录</a></div>
                    <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/newTopics" style={{ color: '#fff' }}>新帖</a></div>
                    <a href="/boardList"><div className="boardListLink" style={{ margin: '0 0 0 10px' }}><div style={{ marginTop: '16px', color: '#fff' }}>版面</div></div></a>
                </div>
            </div>
        }
    }
}

export class Search extends React.Component<{}, AppState> {     //搜索框组件
    render() {

        $(document).ready(function () {

            const searchBoxSelect = $('.searchBoxSelect');
            const downArrow = $('.downArrow');
            const searchBoxSub = $('.searchBoxSub');
            const searchBoxLi = searchBoxSub.find('li');

            $(document).click(function () {
                searchBoxSub.css('display', 'none');
            });

            searchBoxSelect.click(function () {
                if (searchBoxSub.css('display') === 'block') searchBoxSub.css('display', 'none');
                else searchBoxSub.css('display', 'block');
                return false;   //阻止事件冒泡
            });

            downArrow.click(function () {
                if (searchBoxSub.css('display') === 'block') searchBoxSub.css('display', 'none');
                else searchBoxSub.css('display', 'block');
                return false;   //阻止事件冒泡
            });

            /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
            如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
            或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

            searchBoxLi.click(function () {
                searchBoxSelect.text($(this).text());
            });

            searchBoxLi.mouseover(function () {
                this.className = 'hover';
            });

            searchBoxLi.mouseout(function () {
                this.className = '';
            });
        });

        return <div id="search">
            <div className="box">
                <div className="searchBoxSelect">主题</div>
                <div className="downArrow"><img src="/images/downArrow.png" width="12" height="12" /></div>
                <input name="searchText" type="text" placeholder="猜猜能搜到什么..." />
                <div className="fangdajing"><img src="/images/fangdajing.ico" width="15" height="15" /></div>
            </div>
            <ul className="searchBoxSub">
                <li>版面</li>
                <li>主题</li>
                <li>用户</li>
            </ul>
        </div>;
    }
}

export class Header extends React.Component<{}, AppState> {
    render() {
        return <div className="header">
            <div className="topBar">
                <div className="topBarRow">
                    <div className="row"><div style={{ margin: '10px 0 0 0' }}><a href="/"><img src="/images/矢量智能对象.ico" /></a></div><div style={{ margin: '15px 0 0 5px' }}><a href="/"><img src="/images/CC98.ico" /></a></div></div>
                    <DropDown />
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
                    <Search />
                </div>
            </div>
        </div>;

    }
}