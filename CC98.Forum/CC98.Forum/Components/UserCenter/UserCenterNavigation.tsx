// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import * as $ from 'jquery';

/**
 * 用户中心侧边栏导航组件
 */
export class UserCenterNavigation extends React.Component<null, UserCenterNavigationState> {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false,
            buttonClassName: '',
            navigationClassName: 'user-center-navigation'
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        if (window.pageYOffset > 234 && !this.state.isScroll) {
            this.setState({
                isScroll: true,
                buttonClassName: 'btn-show',
                navigationClassName: 'user-center-navigation'
            });
        }

        if (window.pageYOffset < 234 && this.state.isScroll) {
            this.setState((prevState) => {
                if (prevState.buttonClassName === '') {
                    return {
                        isScroll: false
                    }
                } else {
                    return {
                        isScroll: false,
                        buttonClassName: 'btn-disappare',
                        navigationClassName: 'user-center-navigation'
                    }
                }
            });
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
        return (<div className={this.state.navigationClassName} id="userCenterNavigation" >
            <ul>
                <CustomLink to="/usercenter" label="主页" activeOnlyWhenExact={true} myClassName="fa-home" />
                <hr />
                <CustomLink to="/usercenter/config" label="修改个人资料" myClassName="fa-cog" />
                <hr />
                <CustomLink to="/usercenter/myposts" label="我的主题" myClassName="fa-pencil-square-o"/>
                <hr />
                <CustomLink to="/usercenter/myfavorites" label="我的收藏" myClassName="fa-star" />
                <hr />
                <CustomLink to="/usercenter/myfollowings" label="我的关注" myClassName="fa-heart" />
                <hr />
                <CustomLink to="/usercenter/myfans" label="我的粉丝" myClassName="fa-users" />
            </ul>
            <button type="button" id="scrollToTop" className={this.state.buttonClassName} onClick={this.scrollToTop}>回到顶部</button>
        </div>);
    }
}

const CustomLink = ({ label, to, activeOnlyWhenExact = false, myClassName }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <li className={match ? `user-center-navigation-active` : ``}>
            <Link className={`${myClassName}`} to={to}><p>{label}</p></Link>
        </li>
    )} />
);

interface UserCenterNavigationState {
    isScroll: boolean;
    buttonClassName: string;
    navigationClassName: string;
}