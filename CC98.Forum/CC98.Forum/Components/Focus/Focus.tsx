// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardArea } from './FocusBoardArea';
import { FocusUserArea } from './FocusUserArea';
import { FocusFavoriteArea } from './FocusFavoriteArea';
import * as Utility from '../../Utility';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import DocumentTitle from '../DocumentTitle';

export default class Focus extends React.Component {

    /**
     * 从上往下分别为：页面标题(关注版面或者关注用户)、关注版面列表区域、主题列表区域，分别用三个组件表示
     */
    
    render() {
        return (<div className="focus-root">
            <DocumentTitle title={`我的关注 - CC98论坛`} />
            <Router>
                <div className="focus">
                    <div className="focus-nav">
                        <Link style={{ textDecoration: 'none' }} to='/focus/board'> <div className="focus-title" id="myFocusBoard">关注版面</div></Link>
                        <Link style={{ textDecoration: 'none' }} to='/focus/user'> <div className="focus-title" id="myFocusUser">关注用户</div></Link>
                        <Link style={{ textDecoration: 'none' }} to='/focus/favorite'> <div className="focus-title" id="myFocusFavorite">收藏更新</div></Link>
                    </div>
                    <Route exact path="/focus" component={FocusBoardArea}></Route>
                    <Route path='/focus/board' component={FocusBoardArea} />
                    <Route path='/focus/user' component={FocusUserArea} />
                    <Route path='/focus/favorite' component={FocusFavoriteArea} />
                </div>
            </Router>
        </div>);
    }
}