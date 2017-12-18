// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardArea } from './FocusBoardArea';
import { FocusUserArea } from './FocusUserArea';
import * as Utility from '../../Utility';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export class Focus extends React.Component {
    
    /**
     * 从上往下分别为：页面标题(关注版面或者关注用户)、关注版面列表区域、主题列表区域，分别用三个组件表示
     */
    render() {
        return (<div className="focus-root">
                    <Router>
                        <div className="focus">
                                <div className="focus-nav">
                                    <Link to='/focus/board'> <div className="focus-title">关注版面</div></Link>
                                    <Link to='/focus/user'> <div className="focus-title">关注用户</div></Link>
                        </div>
                                <Route exact path="/focus" component={FocusBoardArea}></Route>
                                <Route path='/focus/board' component={FocusBoardArea} />
                                <Route path='/focus/user' component={FocusUserArea} />
                        </div>
                    </Router>
                    </div>);
        }
}