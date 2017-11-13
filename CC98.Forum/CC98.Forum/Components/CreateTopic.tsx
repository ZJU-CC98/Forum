import * as React from 'react';
import * as Utility from '../Utility';
import { AppState } from '../States/AppState';
import { SendTopic } from './SendTopic';
import * as $ from 'jquery';

/*
*拥有权限的账号发帖类型中增加一项校园活动
*拥有权限的账号才可以选择回复仅楼主可见
*只有特定的版面才可以选择回复仅特定用户可见
*/

/*
*react中用户在表单填入的内容，属于用户跟组件的互动，所以不能用this.props读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值
*这里单选框设置默认选中也有些bug未修复，可能是出于以上原因
*/

/*
*编辑器直接引用了回帖的，下面的按钮需要改
*另外这个编辑器还没做好
*/

export class CreateTopic extends React.Component<{}, AppState> {   //发帖
    render() {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div className="createTopic">
                <div className="createTopicBoardName"> 版面名称 > 发表主题</div>
                <div className="createTopicTitle">
                    <div className="createTopicListName">主题标题</div>
                    <div className="createTopicListName">标签1</div>
                    <div className="createTopicListName">标签2</div>
                    <input type="text" placeholder="请输入主题的标题" />
                </div>
                <div className="createTopicType">
                    <div className="createTopicListName">发帖类型</div>
                    <input type="radio" checked={true} name="type" value="normal" /> 普通
                    <input type="radio" name="type" value="academic" /> 学术信息
                    <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型）</div>
                </div>
                <div className="createTopicOption">
                    <div className="createTopicListName">选项</div>
                    <input type="radio" checked={true} name="option" value="all" />回复所有人可见
                    <input type="radio" name="option" value="host" />回复仅楼主可见
                    <input type="radio" name="option" value="special" />回复仅特定用户可见
            </div>
                <SendTopic />
                <div className="createTopicContent">这里与快速回复相同</div>
            </div>
        </div>
    }
}