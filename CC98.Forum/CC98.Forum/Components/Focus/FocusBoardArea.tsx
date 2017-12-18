// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../../Props/FocusBoard';
import { FocusBoardProps } from '../../Props/FocusBoardProps';
import { FocusBoardAreaState } from '../../States/FocusBoardAreaState';
import * as Utility from '../../Utility';
/**
 * 表示我关注的版面列表区域
 */
export class FocusBoardArea extends React.Component<FocusProps, FocusBoardProps> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardList");
        console.log(data);
        if (!data) {
            data = [];
        }
        this.state = {
            data: data
        };
    }

    /**
     * 将我关注的版面排列好
     */
    async componentDidMount() {
        //先看缓存里有没有关注版面列表的数据
        let data: FocusBoard[] = Utility.getStorage("focusBoardList");
        if (data) {
            this.setState({ data: data });
        }
        //没有就自己去服务器获取
        else {
            data = [];
            let token = Utility.getLocalStorage("accessToken");
            //获取关注版面的id列表
            let userInfo = Utility.getLocalStorage("userInfo");
            let boardid = userInfo.customBoards;
            console.log(boardid);
            const headers = new Headers();
            headers.append('Authorization', token);
            for (let i in boardid) {
                let response = await fetch(`http://apitest.niconi.cc/board/${boardid[i]}`, {
                    headers
                });
                let boardInfo = await response.json();
                data.push({ id: boardid[i], name: boardInfo.name });
            }
            this.setState({ data: data });
            //存到缓存里
            Utility.setStorage("focusBoardList", data);
        }

        let currentFocusBoard = Utility.getStorage("currentFocusBoard");
        if (currentFocusBoard) {
            $(".focus-board").removeClass("focus-hover");
            $(`boardId_${currentFocusBoard.id}`).addClass("focus-hover");
        }

        //给每个版的按钮添加点击事件
        let self = this;
        $('.focus-board').click(function () {
            //如果没被点击过，就设为选中，并更新下方帖子列表
            if (this.className == "focus-board") {
                let currentFocusBoard = { boardId: this.id, boardName: this.innerHTML };
                Utility.setStorage("currentFocusBoard", currentFocusBoard);
                $(".focus-board").removeClass("focus-hover");
                $(this).addClass("focus-hover");
                self.props.onChange();
            }
            //如果被点击过，就设为取消，并更新下方帖子列表
            else if (this.className == "focus-board focus-hover") {
                Utility.removeStorage("currentFocusBoard");
                $(".focus-board").removeClass("focus-hover");
                self.props.onChange();
            }
        });

    }
    
    render() {
        return <div className="focus-board-area">
                   <div className="focus-board" id="0">关注用户</div>
                   {this.state.data.map(coverFocusBoard)}
               </div>;
    }
}

function coverFocusBoard(item: FocusBoard) {
    //点击版面名称会显示相应版面的帖子
    return <div className="focus-board" id={`${item.id}`}>{item.name}</div>;
}

export class FocusProps {
    onChange: any;
}