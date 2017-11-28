// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardArea } from './FocusBoardArea';
import { FocusTopicArea } from './FocusTopicArea';
import { FocusBoardTopicArea } from './FocusBoardTopicArea';
import * as Utility from '../Utility';

export class Focus extends React.Component<{}, FocusState> {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null
        }
    }

    changeFocusBoard = () => {
        let currentFocusBoard = Utility.getStorage("currentFocusBoard");
        if (currentFocusBoard) {
            this.setState({ id: currentFocusBoard.boardId, name: currentFocusBoard.boardName });
        }
        else {
            this.setState({ id: null, name: null });
        }
    }

    /**
     * 从上往下分别为：页面标题、关注版面列表区域、关注版面的主题列表区域，分别用三个组件表示
     */
    render() {
        if (!this.state.id) {
            return (<div className="focus-root">
                <div className="focus">
                    <div className="focus-title">我的关注版面</div>
                    <FocusBoardArea onChange={this.changeFocusBoard} />
                    <FocusTopicArea />
                </div>
            </div>);
        }
        else {
            return (<div className="focus-root">
                <div className="focus">
                    <div className="focus-title">我的关注版面</div>
                    <FocusBoardArea onChange={this.changeFocusBoard} />
                    <FocusBoardTopicArea boardId={this.state.id} boardNme={this.state.name} />
                </div>
            </div>);
        }
    }
}

export class FocusState {
    id: number;
    name: string;
}
