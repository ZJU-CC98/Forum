import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as Utility from '../Utility';
import { Breadcrumb, router } from './Breadcrumb';

export type props = {
    voteInfo: {
        voteItems: string[];
        expiredDays: number;
        maxVoteCount: number;
        needVote: boolean;
    };

    onVoteInfoChange: (voteInfo: props["voteInfo"]) => void;
};


export class Vote extends React.PureComponent<props> {
    constructor(props) {
        super(props);
        this.addVoteItem = this.addVoteItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    static isFormIllegal(voteInfo: props['voteInfo']) {
        if(voteInfo.expiredDays > 1000 || voteInfo.expiredDays < 0) return '请输入合法的过期天数';
        if(voteInfo.maxVoteCount > voteInfo.voteItems.length || voteInfo.maxVoteCount < 0) return '请输入合法的最大投票数';
        for(let i = 0; i < voteInfo.voteItems.length; i++) {
            if(!voteInfo.voteItems[i]) return '投票选项不能为空';
        }
        return false;
    }

    addVoteItem() {
        if(this.props.voteInfo.voteItems.length > 19) {
            return null;
        } else {
            this.props.onVoteInfoChange({
                ...this.props.voteInfo,
                voteItems: [
                    ...this.props.voteInfo.voteItems,
                    ''
                ]
            });
        }
    }

    removeItem(index: number) {
        if(this.props.voteInfo.voteItems.length < 3) {
            return null;
        } else {
            let newItems = [...this.props.voteInfo.voteItems];
            newItems.splice(index, 1);
            this.props.onVoteInfoChange({
                ...this.props.voteInfo,
                voteItems: newItems
            });
        }
    }

    changeValue(key: string, value: any) {
        this.props.onVoteInfoChange({
            ...this.props.voteInfo,
            [key]: value
        });
    }

    changeItemValue(index: number, value: string) {
        let newItems = [...this.props.voteInfo.voteItems];
        newItems[index] = value;
        this.props.onVoteInfoChange({
            ...this.props.voteInfo,
            voteItems: newItems
        });
    }

    render() {
        const { voteInfo } = this.props;
        const expiredDays = voteInfo.expiredDays === 0 ? '' : voteInfo.expiredDays;
        const maxVoteCount = voteInfo.maxVoteCount === 0 ? '' : voteInfo.maxVoteCount;

        return (
            <>
                <div className="createTopicTitle">
                    <span className="createTopicListName" >投票设置</span>
                    <span style={{ paddingLeft: '1rem' }} >有效天数（至少1天，最多1000天）</span>
                    <input 
                        style={{ 
                            width: '8.5rem',
                            borderWidth: '0 1px 0 0',
                            borderStyle: 'solid',
                            borderColor: '#e9e9e9',
                            boxSizing: 'border-box',
                            margin: '1rem'
                        }}
                        name="expiredDays" 
                        type="number" 
                        min={1} 
                        max={1000} 
                        placeholder="请输入有效天数" 
                        value={expiredDays} 
                        onChange={e => {
                            const newValue = parseInt(e.target.value || '0');
                            if(newValue > 1000 || newValue < 0) return null;
                            this.changeValue(e.target.name, newValue);
                        }}
                    />
                    <span>最多可投数量（至少1项，最多不超过选项数）</span>
                    <input 
                        style={{ 
                            width: '10rem',
                            borderWidth: '0 1px 0 0',
                            borderStyle: 'solid',
                            borderColor: '#e9e9e9',
                            boxSizing: 'border-box',
                            margin: '1rem'
                        }}
                        name="maxVoteCount" 
                        type="number" 
                        min={1} 
                        max={this.props.voteInfo.voteItems.length} 
                        placeholder="请输入最多可投数量" 
                        value={maxVoteCount}
                        onChange={e => {
                            const newValue = parseInt(e.target.value || '0');
                            if(newValue > this.props.voteInfo.voteItems.length || newValue < 0) return null;
                            this.changeValue(e.target.name, newValue);
                        }}
                    />
                    <input 
                        style={{ width: '1rem' }}
                        id="needVote" 
                        name="needVote" 
                        type="checkbox" 
                        checked={this.props.voteInfo.needVote}
                        onChange={e => {
                            this.changeValue(e.target.name, e.target.checked)
                        }}
                    />
                    <label htmlFor="needVote" >投票后结果可见</label>
                </div>
                {this.props.voteInfo.voteItems.map((item, index) => (
                    <div className="createTopicTitle" >
                        <span className="createTopicListName">投票选项{index + 1}</span>
                        <input 
                            name="voteItem" 
                            type="text" 
                            value={item} 
                            placeholder="请输入选项内容，不能为空，最多50个字符" 
                            maxLength={50} 
                            onChange={e => {
                                if(e.target.value.length > 50) return null;
                                this.changeItemValue(index, e.target.value);
                            }}
                        />
                        {this.props.voteInfo.voteItems.length > 2 ? <button type="button" className="fa fa-times" onClick={() => this.removeItem(index)}></button> : null}
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={this.addVoteItem}
                    className="hiddenImage"
                    style={{
                        width: '16rem',
                        margin: '0 auto 1rem'
                    }}
                >添加选项（最少2项，最多20项）</button>
            </>
        );
    }
}
