import * as React from 'react';
import * as Utility from '../../../Utility';
import { getToken } from '../../../Utility';
/**
 * 全站TP需提交的BODY类型
 */
class ForumUserOperation {
    /**
     * 1=锁定，2=屏蔽，3=tp
     */
    PunishmentType: 1 | 2 | 3;
    /**
     * 0=取消，1=执行
     */
    OperationType: 0 | 1;
    /**
     * -1表示永久，其余7<Days<1000
     */
    Days?: number;
    /**
     * 理由
     */
    Reason: string
}
/**
 * TP组件的状态
 */
class OperationState {
    /**
     * TP的选项
     */
    ForumUserOperation: ForumUserOperation;
    /**
     * 反馈信息
     */
    info: string;
}
/**
 * TP组件的属性
 */
class OperationProps {
    /**
     * 用户的ID
     */
    id: number;
}
export default class Operation extends React.Component<OperationProps, OperationState> {
    constructor(props) {
        super(props);
        this.state = {
            ForumUserOperation: new ForumUserOperation(),
            info: ''
        };
    }

    handleForumUserOperationChange(key, value) {
        this.setState((prevState: OperationState) => ({
            ForumUserOperation: {
                ...prevState.ForumUserOperation,
                [key]: value
            }
        }));
    }

    async handleSubmit(isCancle: boolean) {
        let { Days, PunishmentType } = this.state.ForumUserOperation;
        try {
            if (!this.state.ForumUserOperation.Reason) {
                throw new Error('请填写理由');
            } else if (!isCancle && PunishmentType === 3 && (Days < -1 || Days > 1000 || (Days < 7 && Days > -1))) {
                throw new Error('不合法的TP天数');
            }
            const url = `/user/${this.props.id}/operation`;
            const token = await getToken();
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            let res = await Utility.cc98Fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    ...this.state.ForumUserOperation,
                    OperationType: isCancle ? 0 : 1
                })
            });
            this.setState({
                info: '操作成功'
            });
        } catch (e) {
            this.setState({
                info: e.message
            });
        }
    }

    render() {
        return (<div>
            <h2>TP</h2>
            <div className="user-manager">
                <p>OperationType: </p>
                <select onChange={(e) => { this.handleForumUserOperationChange('PunishmentType', Number.parseInt(e.target.value)) }}>
                    <option value={0} disabled>未选择</option>
                    <option value={1}>锁定</option>
                    <option value={2}>屏蔽</option>
                    <option value={3}>TP</option>
                </select>
                <p>Reason: </p><input type="text" onChange={(e) => { this.handleForumUserOperationChange('Reason', e.target.value) }} value={this.state.ForumUserOperation.Reason}/>
                <p>Days: </p><input type="number" onChange={(e) => { this.handleForumUserOperationChange('Days', Number.parseInt(e.target.value)) }} value={this.state.ForumUserOperation.Days} />
                <button type="button" onClick={() => {this.handleSubmit(false) }}>提交</button>
                <button type="button" onClick={() => { this.handleSubmit(true) }}>解除</button>
            </div>
            <p className="user-manage-return">{this.state.info}</p>
        </div>);
    }
}