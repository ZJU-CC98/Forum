// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusPostAreaComponent } from './FocusPostAreaComponent';

/**
 * 网站的主页面对象。
 */
export class AllNewPost extends React.Component {

    /**
     * 全站新帖列表
     */
    render() {
        return (<div className='focus-root'>
                    <div className='focus' >
                            <div className='focus-allNewPost'><i className='fa fa-home' aria-hidden='true'></i>首页/全站新帖</div>
                            <FocusPostAreaComponent />
                    </div>
                </div>);
    }

}