// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../../Props/FocusBoard';
import { FocusBoardAreaState } from '../../States/FocusBoardAreaState';
import { FocusTopicArea } from './FocusTopicArea';
import * as Utility from '../../Utility';
/**
 * 表示我关注的版面列表区域
 */
export class FocusBoardArea extends React.Component<{history}, FocusBoardAreaState> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardList");
        if (!data) {
            data = [];
        }
        let currentFocusBoard = Utility.getStorage("currentFocusBoard");
        let currentBoardId = 0;
        let currentBoardName = "全站帖子";
        if (currentFocusBoard) {
            currentBoardId = currentFocusBoard.boardId;
            currentBoardName = currentFocusBoard.boardName;
        }
        this.state = {
            data: data,
            currentBoardId: currentBoardId,
            currentBoardName: currentBoardName
        };
    }

    /**
     * 将我关注的版面排列好
     */
    async componentDidMount() {
        //给关注版面添加选中效果
  

        let data = [];
        let token = Utility.getLocalStorage("accessToken");
        //获取关注版面的id列表
        let userInfo = Utility.getLocalStorage("userInfo");
        let boardid = userInfo.customBoards;

        const headers = new Headers();
        headers.append('Authorization', token);
        for (let item of boardid) {
            let boardName = await Utility.getBoardName(item);
            data.push({ id: item, name: boardName });
        }
        this.setState({ data: data });
        //存到缓存里
        Utility.setStorage("focusBoardList", data);

        //给初始选中版面添加选中效果
        $(`#focusBoard_${this.state.currentBoardId}`).addClass('focus-hover');

        //给每个版的按钮添加点击事件，单击显示相应版面帖子，双击直接进入版面
        let self = this;
        $('.focus-board').click(function () {
            //单击事件的执行代码
            let boardId = this.id.slice(11);
            let currentFocusBoard = { boardId: boardId, boardName: this.innerHTML };
            Utility.setStorage("currentFocusBoard", currentFocusBoard);
            $('.focus-board').removeClass('focus-hover');
            $(this).addClass('focus-hover');
            self.setState({ currentBoardId: parseInt(boardId), currentBoardName: this.innerHTML });
        });
        $('.focus-board').dblclick(function () {
            //双击事件的执行代码
            let boardId = this.id.slice(11);
            window.location.href=`/board/${boardId}`;
        });

        $('#myFocusUser').removeClass('focus-title-hover');
        $("#myFocusFavorite").removeClass("focus-title-hover");
        $('#myFocusBoard').addClass('focus-title-hover');
    }

    
    coverFocusBoard = (item: FocusBoard) => {
        //点击版面名称会显示相应版面的帖子
        return <div className="focus-board" id={`focusBoard_${item.id}`}>{item.name}</div>;
    }
    
    render() {

        return <div>
                    <div className="focus-board-area">
                        <div className="focus-board" id="focusBoard_0">全部帖子</div>
                {this.state.data.map(this.coverFocusBoard)}
                <div className="focus-boardTip">提示：单击版面标签可切换下方展示内容，双击可直接进入版面</div>
                    </div>
                    <FocusTopicArea id={this.state.currentBoardId} name={this.state.currentBoardName} />
                </div>;
        }
}