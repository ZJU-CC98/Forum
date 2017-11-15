// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoardArea } from './FocusBoardArea';
import { FocusTopicArea } from './FocusTopicArea';
import { FocusBoardProps } from '../Props/FocusBoardProps';
import { FocusBoard } from '../Props/FocusBoard';
import * as Utility from '../Utility';

export class Focus extends React.Component<{}, FocusBoardProps> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        //先看缓存里有没有关注版面列表的数据
        let data: FocusBoard[] = Utility.getStorage("focusBoard");
        if(data) {
            this.setState({ data: data });
        }
        //没有就自己去服务器获取
        else { 
            data = [];
            let token = Utility.getLocalStorage("accessToken");
            //获取关注版面的id列表
            let userInfo = Utility.getLocalStorage("userInfo");
            let boardid = userInfo.customBoards;
            for (var i in boardid) {
                let response = await fetch(`http://apitest.niconi.cc/board/${boardid[i]}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                let boardInfo = await response.json();
                data.push({ id: boardid[i], name: boardInfo.name });
            }
            this.setState({ data: data });
            //存到缓存里
            Utility.setStorage("focusBoard", data);
        }
    }

    /**
     * 从上往下分别为：页面标题、关注版面列表区域、选中版面的主题列表区域，分别用三个组件表示
     */
    render() {
        return (<div className="focus-root">
                    <div className="focus">
                         <div className="focus-title">我的关注版面</div>
                         <FocusBoardArea data={this.state.data}/>
                         <FocusTopicArea />
                    </div>
                </div>);
    }
}
