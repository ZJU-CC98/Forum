// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';

/**
 * 用户中心侧边栏导航组件
 */
export class UserCenterNavigation extends React.Component {
    handleScroll(e) {
        let navigation = document.getElementById('userCenterNavigation');

        if (window.pageYOffset > 234 && navigation.style.position !== 'fixed') {
            navigation.style.position = 'fixed';
        }

        if (window.pageYOffset < 234 && navigation.style.position && navigation.style.position !== 'inherit') {
            navigation.style.position = 'inherit';
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (<div className="user-center-navigation" id="userCenterNavigation">
            <ul>
                <CustomLink to="/usercenter" label="主页" activeOnlyWhenExact={true} myClassName="fa-home" />
                <hr />
                <CustomLink to="/usercenter/myposts" label="我的主题" myClassName="fa-pencil-square-o"/>
                <hr />
                <CustomLink to="/usercenter/myfavorites" label="我的收藏" myClassName="fa-star" />
                <hr />
                <CustomLink to="/usercenter/myfollowings" label="我的关注" myClassName="fa-heart" />
                <hr />
                <CustomLink to="/usercenter/myfans" label="我的粉丝" myClassName="fa-users" />
                <hr />
                <CustomLink to="/usercenter/config" label="功能设置" myClassName="fa-cog" />
            </ul>
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
