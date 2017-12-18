import * as React from 'react';
import * as Utility from '../../../Utility';
import { getToken, getBoardName } from '../../../Utility';
import { Link } from 'react-router-dom';

interface State {
    /**
     * 最近X日
     */
    days: number;
    /**
     * 反馈信息
     */
    info: string;
    /**
     * 用户发言总数
     */
    count: number;
    /**
     * 分页信息
     */
    from: number;
    /**
     * 是否在加载
     */
    isLoading: boolean;
    /**
     * 回帖信息
     */
    posts: Post[];
}

interface Props {
    /**
     * 用户id
     */
    id: number;
}

interface Post {
    /**
     * 版面ID
     */
    boardId: number;
    /**
     * 回复内容
     */
    content: string;
    /**
     * 回复楼层
     */
    floor: number;
    /**
     * IP地址
     */
    ip: string;
    /**
     * 回复时间
     */
    time: string;
    /**
     * 主题id
     */
    topicId: number;
    /**
     * 版面名
     */
    boardName: string;
}

export default class ShowTopic extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            info: '',
            count: 0,
            from: 0,
            isLoading: false,
            days: 1,
            posts: []
        };
    }

    async handleSubmit(from: number) {
        try {
            this.setState({
                isLoading: true
            });
            const token = await getToken();
            const { id } = this.props;
            const { days } = this.state;
            const url = `/User/${id}/post?days=${days}&from=${from}&size=10`;
            let headers = new Headers();
            headers.append('Authorization', token);
            let res = await Utility.cc98Fetch(url, { headers });
            let data = await res.json();
            let posts = data.postInfos.map(async (item) => ({ ...item, boardName: await getBoardName(item.boardId) }));
            posts = await Promise.all(posts);
            this.setState({
                posts,
                isLoading: false,
                count: data.count,
                info: posts.length === 0 ? '啥也没有' : '',
                from: from
            });
        } catch (e) {
            this.setState({
                info: e.message,
                isLoading: false
            });
        }
    }

    render() {
        return (<div>
            <h2>查看用户最近发言</h2>
            <div className="user-manager">
                <p>天数：</p>
                <input type="number" onChange={(e) => { this.setState({ days: Number.parseInt(e.target.value) }); }} value={this.state.days} />
                <button type="button" onClick={() => { this.handleSubmit(0); }}>查看</button>
                <button type="button" disabled={this.state.from === 0} onClick={() => { this.handleSubmit(this.state.from - 10) }}>上一页</button>
                <button type="button" disabled={(this.state.from + this.state.posts.length) === this.state.count} onClick={() => { this.handleSubmit(this.state.from + 10) }}>下一页</button>
            </div>
            <div className="user-manage-return"><p>{this.state.info}</p></div>
            {(!this.state.isLoading) ? (<div>
                {this.state.posts.map((item) => (<div className="user-manage-post">
                    <p className="user-manage-post-date">{item.time.slice(0,19).replace('T', ' ')}</p>
                    {item.floor === -1 ?
                        <p className="user-manage-post-content">{item.content}</p> :
                        <Link
                            className="user-manage-post-content"
                            to={`/topic/${item.topicId}/${Math.floor((item.floor - 1) / 10) + 1}#${item.floor % 10 === 0 ? 10 : item.floor % 10}`}
                            target="_blank"
                        >{item.content}</Link>}
                    <Link className="user-manage-post-board" to={`/list/${item.boardId}`} target="_blank">{item.boardName}</Link>
                    <p className="user-manage-post-floor">{item.floor === -1 ? '已删除' : item.floor}</p>
                    <p className="user-manage-post-ip">{item.ip}</p>
                </div>))}
                {this.state.posts.length > 0 ?
                    <p style={{textAlign: 'right'}}>总共有{this.state.count}条帖子，当前显示第{Math.floor(this.state.from / 10) + 1}页，共{Math.floor(this.state.count / 10) + 1}页</p>
                    : null
                }
            </div>) : <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>}
        </div>);
    }
}