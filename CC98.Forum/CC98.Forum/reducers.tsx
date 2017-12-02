import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as Topic from './Components/Topic/Topic';
import * as Utility from './Utility';
import * as React from 'react';
//定义数据
//定义顶级数据 1.帖子数据
class AppState {
    post: ReplyContentState;
}
//定义部分数据 帖子数据包括帖子本身的数据以及所属版面的数据
class ReplyContentState {
    postId; likeNumber; dislikeNumber; likeState; awardInfo; info; awardPage;

    // newPost: () => void;
}
//定义action，dispatch时将广播这个type的action
class AddAwardAction implements Redux.Action {
    type: 'add-award';
}
//子reducer 通过接收action的type来进行对state的修改，必须返回一个全新的state
async function post(state: ReplyContentState, action: Redux.Action) {
    switch (action.type) {
        case 'add-award':
            const award = await Utility.getAwardInfo(state.postId, 1);
            const info = award.map(this.generateAwardInfo.bind(this));
            const awardInfo = await Promise.all(info);
            return {
                ...state, info: awardInfo, awardInfo: award
            };
        default:
            return state;
    }
}

//组合子reducer形成最大的reducer
export const app = Redux.combineReducers({
    post
});

//用最大的reducer创建store store在Main.tsx的provider组件中被引用
export const store = Redux.createStore(app);

//redux不存在state，将state全部复制到props中，ownProps是关于router路由的参数
function mapStateToProps(state, ownProps) {
    return state;
}

class A extends React.Component {
    render() {
        return <div>11</div>;
    }
}
export const ReduxReplyContent = connect(mapStateToProps)(A);
//把操作封装到props中
/*function mapDispatchToProps(dispatch) {

    return {
        newAward: function () {
            dispatch({ 'type': 'add-award' });
        }
    }
}
export const ReduxReplyContent = connect(mapStateToProps, mapDispatchToProps)(Topic.Reply);
*/