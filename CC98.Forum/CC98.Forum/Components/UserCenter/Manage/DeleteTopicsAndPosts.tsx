import * as React from 'react';
import * as Utility from '../../../Utility'
import { getToken } from '../../../Utility';

interface State {
    /**
     * 删除最近x天的帖子或主题
     */
    days: number;
    /**
     * 反馈信息
     */
    info: string;
}

interface Props {
    /**
     * 用户ID
     */
    id: number;
}
/**
 * 只有管理员能看到
 * 用来删除用户的最近X日内的主题和帖子
 */
export default class Delete extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            info: ''
        };
    }
    /**
     * isPost为true 时删除主题
     * isPost为false时删除帖子
     */
    async handleSubmit(isPost: boolean) {
        try {
            const item = isPost ? 'post' : 'topic';
            const { id } = this.props;
            const { days } = this.state;
            if (days < 1 || days > 365) {
                throw new Error('请检查日期');
            }
            const url = `/user/${id}/${item}?days=${days}`;
            const token = await getToken();
            let headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, {
                method: 'DELETE',
                headers
            });
            let data = await res.json();
            this.setState({
                info: `删掉了${data}条${item}`
            });
        } catch (e) {
            this.setState({
                info: e.message
            });
        }
    }

    render() {
        return (<div>
            <h2>删除用户最近主题与回帖</h2>
            <div className="user-manager">
                <p>天数：</p>
                <input type="number" onChange={(e) => { this.setState({ days: Number.parseInt(e.target.value) }); }} value={this.state.days} />
                <button type="button" onClick={() => { this.handleSubmit(false); }}>删主题</button>
                <button type="button" onClick={() => { this.handleSubmit(true); }}>删回复</button>
            </div>
            <p className="user-manage-return">{this.state.info}</p>
        </div>);
    }
}