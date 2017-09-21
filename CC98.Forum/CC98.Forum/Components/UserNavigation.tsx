import * as React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';

export class UserNavigation extends React.Component {
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
                <CustomLink to={`${location.pathname}`} label="主页" activeOnlyWhenExact={true} myClassName="fa-home" />
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
