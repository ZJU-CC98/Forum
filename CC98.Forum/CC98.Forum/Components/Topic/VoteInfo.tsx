import * as Utility from '../../Utility';
import * as React from 'react';
import { Link } from 'react-router-dom';
declare var moment: any;

type voteItem = {
    id: number;
    description: string;
    count: number;
};

type voteRecord = {
    userId: number;
    userName: string;
    items: number[];
    ip: string;
    time: string;
};

export type voteInfo = {
    topicId: number;
    voteItems: voteItem[];
    voteRecords: voteRecord[];
    expiredTime: string;
    isAvailable: boolean;
    maxVoteCount: number;
    canVote: boolean;
    myRecord: voteRecord;
    needVote: boolean;
    voteUserCount: number;
}

type props = {
    voteInfo: voteInfo;
}

type state = {
    items: number[];
    message: string;
    messageOpacity: 0 | 1;
}

export class VoteContent extends React.PureComponent<props, state> {
    constructor(props: props) {
        super(props);
        if(props.voteInfo.myRecord) {
            this.state = {
                items: props.voteInfo.myRecord.items,
                message: '',
                messageOpacity: 0
            };
        } else {
            this.state = {
                items: [],
                message: '',
                messageOpacity: 0
            };
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    handleInputChange(id: number) {
        this.setState((prevState: state) => {
            const index = prevState.items.indexOf(id);
            if(index === -1) {
                return {
                    items: prevState.items.concat([id])
                };
            } else {
                const { items } = prevState;
                items.splice(index, 1);
                return {
                    items
                };
            }
        })
    }

    async submit() {
        try {
            let headers = await Utility.formAuthorizeHeader();
            headers.append('Content-Type', 'application/json');
            let res = await Utility.cc98Fetch(`/topic/${this.props.voteInfo.topicId}/vote`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    items: this.state.items
                })
            });
            if(res.ok) throw new Error('投票成功');
        } catch(e) {
            this.setState({
                message: e.message,
                messageOpacity: 1
            });
            setTimeout(() => {
                this.setState({
                    messageOpacity: 0
                })
            }, 1000);
            setTimeout(() => {
                this.setState({
                    message: ''
                })
            }, 1500);
        }
    }

    getMessage() {
        switch(true) {
            case !Utility.isLogOn(): return <p>你还未登录，请先<Link to="/logOn">登陆</Link>。</p>;
            case this.props.voteInfo.canVote && this.props.voteInfo.needVote: return <p>该投票在过期前，只有完成投票才能查看结果。你还未投过票，请先投票。</p>;
            case !!this.props.voteInfo.myRecord: return <p>你已经投过票了，你的投票选项是：{this.props.voteInfo.myRecord.items.join('，')}。</p>
            default: return null;
        }
    }

    render() {
        return (
            <div className="vote-content" >
                <div className="vote-message">{this.state.message}</div>
                {this.props.voteInfo.voteItems.map(item => (
                    <div className="vote-items" key={item.id}>
                        <p>
                            <input 
                                disabled={
                                    !this.props.voteInfo.canVote || // 不能投票    
                                    (this.state.items.indexOf(item.id) === -1 && this.state.items.length === this.props.voteInfo.maxVoteCount) // 或者已经选中最多的选项
                                }
                                checked={this.state.items.indexOf(item.id) !== -1} 
                                type="checkbox" 
                                id={`vote${item.id}`} 
                                onChange={() => this.handleInputChange(item.id)}
                            />
                            <label htmlFor={`vote${item.id}`}>{item.description}</label>
                        </p>
                        <p>
                            <span></span>
                        </p>
                    </div>
                ))}
                <div className="vote-info" >
                    <p>投票过期时间：{moment(this.props.voteInfo.expiredTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                    <p>每人最多允许投{this.props.voteInfo.maxVoteCount}票，已有{this.props.voteInfo.voteUserCount}人参与投票。</p>
                    {this.getMessage()}
                </div>
                {!this.props.voteInfo.canVote ? null : <div className="vote-buttons" >
                    <button type="button" onClick={this.submit} disabled={!this.state.items.length}>投票</button>
                    <button type="button" onClick={() => this.setState({ items: [] })}>重置</button>
                </div>}
            </div>
        );
    }
}