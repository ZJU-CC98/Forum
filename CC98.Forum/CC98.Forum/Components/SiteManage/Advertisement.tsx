import * as React from 'react';
import { cc98Fetch, getToken } from '../../Utility';

const PostForumIndexColumnInfoType = [
    '推荐阅读',
    '推荐功能',
    '校园新闻',
    '广告'
]

const urls = [
    '/index/column/recommandationreading',
    '/index/column/recommandationfunction',
    '/index/column/schoolnews',
    '/config/global/advertisement'
];

class PostForumIndexColumnInfo {
    id: number;
    /**
     * 1=推荐阅读，2=推荐功能，3=校园新闻，4=广告
     */
    type: number;
    /**
     * 必须，广告表示对广告的简单描述
     */
    title: string;
    /**
     * 只有推荐阅读需要
     */
    content: string;
    /**
     * 校园新闻不需要
     */
    url: string;
    /**
     * 校园新闻不需要
     */
    imageUrl: string;
    /**
     * 排序权重，只有推荐阅读和推荐功能需要
     */
    orderWeight: number;
    /**
     * 是否显示
     */
    enable: boolean;
    /**
     * 只有广告需要，大于0的整数
     */
    days: number;
    /**
     * 
     */
    isNew: boolean;
    /**
     * 
     */
    expiredTime: string;
}

class State {
    /**
     * 反馈信息
     */
    info: string;
    /**
     * 请求时返回的数据
     */
    data: PostForumIndexColumnInfo[]
    /**
     * 1=推荐阅读，2=推荐功能，3=校园新闻，4=广告
     */
    type: number;
}


export default class extends React.Component<null, State > {
    constructor(props) {
        super(props);
        this.state = {
            info: '',
            data: [],
            type: 0
        };
        this.getInfo = this.getInfo.bind(this);
        this.putCurData = this.putCurData.bind(this);
        this.handleTdChange = this.handleTdChange.bind(this);
        this.add = this.add.bind(this);
    }
    
    async getInfo(url) {
        this.setState({
            type: urls.indexOf(url) + 1,
            data: []
        });
        try {
            const token: string = await getToken();
            let headers = new Headers();
            headers.append('Authorization', token);
            let res = await cc98Fetch(url + '/all', { headers });
            let data = await res.json();
            this.setState({ data });
        } catch (e) {
            this.setState({
                info: e.message
            });
        }
    }

    handleTdChange(key, value, index: number) {
        this.setState(prevState => {
            let { data } = prevState as State; 
            data[index] = { ...data[index], [key]: value };
            console.log(data);
            this.setState({ data });
        });
    }

    async putCurData(index: number) {
        let url: string, method:string;
        if (this.state.data[index].isNew) {
            url = '/index/column/';
            method = 'POST'
        } else {
            url = '/index/column/' + this.state.data[index].id;
            method = 'PUT';
        }
        try {
            const token: string = await getToken();
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            let res = await cc98Fetch(url, {
                method: method,
                headers,
                body: JSON.stringify(this.state.data[index])
            });
            if (res.status === 200) {
                this.setState({
                    info: '修改成功'
                });
            } else {
                throw new Error(res.status.toString());
            }

        } catch (e) {
            this.setState({
                info: e.message
            });
        }
    }

    add() {
        this.setState((prevState) => {
            let newData = new PostForumIndexColumnInfo();
            newData.enable = true;
            newData.isNew = true;
            newData.type = prevState.type;
            return {
                data: [...prevState.data, newData]
            };
        });
    }

    render() {
        return (
            <div>
                <p>自定义栏目</p>
                <button type="button" disabled={this.state.type === 1} onClick={() => this.getInfo(urls[0])} >推荐阅读</button>
                <button type="button" disabled={this.state.type === 2} onClick={() => this.getInfo(urls[1])} >推荐功能</button>
                <button type="button" disabled={this.state.type === 3} onClick={() => this.getInfo(urls[2])} >校园新闻</button>
                <button type="button" disabled={this.state.type === 4} onClick={() => this.getInfo(urls[3])} >广告</button>
                {this.state.type > 0 ? <button type="button" onClick={() => this.add()} >添加</button> : null}
                {this.state.data.length > 0 ?
                    <table>
                        <tr>
                            <th>id</th>
                            <th>type</th>
                            <th>title</th>
                            {this.state.type === 1 ? <th>content</th> : null}
                            <th>url</th>
                            {this.state.type !== 3 ? <th>imageUrl</th> : null}
                            {this.state.type === 1 || this.state.type === 2 ? <th>orderWeight</th> : null}
                            <th>enable</th>
                            {this.state.type === 4 ? <th>days</th> : null}
                            {this.state.type === 4 ? <th>expiredTime</th> : null}
                            <th>save</th></tr>
                        {this.state.data.map((item, index) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{PostForumIndexColumnInfoType[item.type - 1]}</td>
                                <td><input type="text" onChange={e => this.handleTdChange('title', e.target.value, index)} value={item.title} /></td>
                                {this.state.type === 1 ? <td><input type="text" onChange={e => this.handleTdChange('content', e.target.value, index)} value={item.content} /></td> : null}
                                <td><input type="text" onChange={e => this.handleTdChange('url', e.target.value, index)} value={item.url} /></td>
                                {this.state.type !== 3 ? <td><input type="text" onChange={e => this.handleTdChange('imageUrl', e.target.value, index)} value={item.imageUrl} /></td> : null}
                                {this.state.type === 1 || this.state.type === 2 ? <td><input type="number" onChange={e => this.handleTdChange('orderWeight', Number.parseInt(e.target.value), index)} value={item.orderWeight} /></td> : null}
                                <td><input onClick={e => this.handleTdChange('enable', (e.target as HTMLInputElement).checked, index)} type="checkbox" checked={item.enable} /></td>
                                {this.state.type === 4 ? <td><input type="number" onChange={e => this.handleTdChange('days', Number.parseInt(e.target.value), index)} value={item.days} /></td> : null}
                                {this.state.type === 4 && item.expiredTime ? <td>{item.expiredTime.slice(0,19).replace('T', ' ')}</td> : null}
                                <td><button type="button" onClick={e => this.putCurData(index)}>保存</button></td>
                            </tr>
                        ))}
                    </table> : null}
                <p>{this.state.info}</p>
            </div>
        );
    }
}