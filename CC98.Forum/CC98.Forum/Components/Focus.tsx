// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardArea } from './FocusBoardArea';
import { FocusTopicArea } from './FocusTopicArea';

export class Focus extends React.Component {

    /**
     * 从上往下分别为：页面标题、关注版面列表区域、选中版面的主题列表区域，分别用三个组件表示
     */
    render() {
        return (<div className="focus-root">
                    <div className="focus">
                            <div className="focus-title">我的关注版面</div>
                            <FocusBoardArea />
                            <FocusTopicArea />
                    </div>
                </div>);
    }

}
