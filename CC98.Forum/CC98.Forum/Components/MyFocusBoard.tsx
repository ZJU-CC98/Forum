// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardAreaComponent } from './FocusBoardAreaComponent';
import { FocusPostAreaComponent } from './FocusPostAreaComponent';
import { match } from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export class MyFocusBoard extends React.Component {

    /**
     * 从上往下分别为：页面标题、关注版面列表区域、选中版面的主题列表区域，分别用三个组件表示
     */
    render() {
        return (<div className='focus-root'>
                    <div className='focus'>
                            <div className='focus-title'>我的关注版面</div>
                            <FocusBoardAreaComponent />
                            <FocusPostAreaComponent />
                    </div>
                </div>);
    }

}
