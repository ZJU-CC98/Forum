import * as React from 'react';
import * as Utility from '../Utility';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';

export class DropDown extends React.Component<{}, { userName, userImgUrl }> {   //顶部条的下拉菜单组件
    constructor(props?, context?) {
        super(props, context);
        this.state = ({
            userName:'null',
            userImgUrl: "/images/userImg.png"
        });
    }
    async componentDidMount() {
        if (Utility.getLocalStorage("accessToken") && Utility.getLocalStorage("userName")) {
            let userName = Utility.getLocalStorage("userName");
            let response = await fetch(`http://api.cc98.org/User/Name/${userName}`);
            let data = await response.json();
            let userImgUrl = data.portraitUrl;
            this.setState({ userName: userName, userImgUrl: userImgUrl });
        }
    }
    render() {
        $(document).ready(function () {

            const userInfo = $('.userInfo').eq(0);
            const subA = $('ul').eq(0);
            const liA = subA.find('li');

            userInfo.hover(function () {
                subA.css('display', 'block');
            }, function () {
                subA.css('display', 'none');
            });

            subA.hover(function () {
                $(this).css('display', 'block');;
            }, function () {
                $(this).css('display', 'none');
            });
            /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
            如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
            或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

            liA.mouseover(function () {
                this.className = 'hover';
            });

            liA.mouseout(function () {
                this.className = '';
            });
        });

        return <div id="dropdown">
            <div className="box">
                <div className="userInfo">
                    <div className="userImg"><img src={this.state.userImgUrl}></img></div>
                    <div className="select">{this.state.userName}</div>
                </div>
                <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/" style={{ color: '#fff' }}>首页</a></div>
                <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/focus" style={{ color: '#fff' }}>关注</a></div>
                <div className="topBarText" style={{ margin: '0 10px 0 10px' }}><a href="/newTopics" style={{ color: '#fff' }}>新帖</a></div>
                <a href="/boardList"><div className="boardListLink" style={{ margin: '0 0 0 10px' }}><div style={{ marginTop: '16px', color: '#fff' }}>版面</div></div></a>
            </div>
            <ul className="sub">
                <li>个人中心</li>
                <li>消息</li>
                <li>注销</li>
            </ul>
        </div>;
    }
}

export class Search extends React.Component<{}, AppState> {     //搜索框组件
    render() {

        $(document).ready(function () {

            const selectB = $('.select').eq(1);
            const downArrow = $('.downArrow');
            const subB = $('ul').eq(1);
            const liB = subB.find('li');

            $(document).click(function () {
                subB.css('display', 'none');
            });

            selectB.click(function () {
                if (subB.css('display') === 'block') subB.css('display', 'none');
                else subB.css('display', 'block');
                return false;   //阻止事件冒泡
            });

            downArrow.click(function () {
                if (subB.css('display') === 'block') subB.css('display', 'none');
                else subB.css('display', 'block');
                return false;   //阻止事件冒泡
            });

            /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
            如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
            或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

            liB.click(function () {
                selectB.text($(this).text());
            });

            liB.mouseover(function () {
                this.className = 'hover';
            });

            liB.mouseout(function () {
                this.className = '';
            });
        });

        return <div id="search">
            <div className="box">
                <form>
                    <div className="select">主题</div>
                    <div className="downArrow"><img src="/images/downArrow.png" width="12" height="12" /></div>
                    <input name="searchText" type="text" placeholder="猜猜能搜到什么..." />
                    <div className="fangdajing"><img src="/images/fangdajing.ico" width="15" height="15" /></div>
                </form>
            </div>
            <ul className="sub">
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