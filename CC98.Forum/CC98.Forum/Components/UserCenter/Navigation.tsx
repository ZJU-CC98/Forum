// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    NavLink
} from 'react-router-dom';
import * as $ from 'jquery';

type props = {

}

/**
 * 用户中心侧边栏导航组件
 */
export default class extends React.Component<props, UserCenterNavigationState> {
    constructor(props) {
        super(props);
        this.state = {
            buttonClassName: ''
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        if (window.pageYOffset > 234) {
            this.setState({
                buttonClassName: 'btn-show'
            });
        }

        if (window.pageYOffset < 234) {
            this.setState(prevState => ({
                    buttonClassName: prevState.buttonClassName === '' ? '' : 'btn-disappare'
                })
            );
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    scrollToTop() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    }

    render() {
        return (<div className='user-center-navigation' id="userCenterNavigation" >
            <ul>
                <li><NavLink to="/usercenter" exact activeClassName="user-center-navigation-active" className="fa-home"><div className="center-nav-item">个人主页</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/config" activeClassName="user-center-navigation-active" className="fa-cog"><div className="center-nav-item">修改资料</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myposts" activeClassName="user-center-navigation-active" className="fa-pencil-square-o"><div className="center-nav-item">我的主题</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfavorites/order/0" activeClassName="user-center-navigation-active" className="fa-star"><div className="center-nav-item">我的收藏</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/mycustomboards" activeClassName="user-center-navigation-active" className="fa-rss"><div className="center-nav-item">关注版面</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfollowings" activeClassName="user-center-navigation-active" className="fa-heart"><div className="center-nav-item">关注用户</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/myfans" activeClassName="user-center-navigation-active" className="fa-users"><div className="center-nav-item">我的粉丝</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/transferwealth" activeClassName="user-center-navigation-active" className="fa-credit-card"><div className="center-nav-item">转账系统</div></NavLink></li>
                <hr />
                <li><NavLink to="/usercenter/theme" activeClassName="user-center-navigation-active" className="fa-magic"><div className="center-nav-item">切换皮肤</div></NavLink></li> 
            </ul>
            <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
        </div>);
    }
}

interface UserCenterNavigationState {
    buttonClassName: string;
}