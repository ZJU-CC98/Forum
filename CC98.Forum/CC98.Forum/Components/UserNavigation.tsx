import * as React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';

export class UserNavigation extends React.Component {    
    render() {
        return (<div className="user-center-navigation" id="userCenterNavigation">
            <ul>
                <CustomLink to={`${location.pathname}`} label="主页" activeOnlyWhenExact={true} myClassName="fa-home" />
                <hr />
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
