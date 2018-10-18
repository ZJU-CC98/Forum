import * as React from 'react';
import { cc98Fetch, getToken } from '../../Utility';
import Button from 'antd/es/button';
import Table from 'antd/es/table';
import Checkbox from 'antd/es/checkbox';
import Input from 'antd/es/input';
import * as moment from 'moment';
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

interface State {
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

type props = {

}



export default class extends React.Component<props, State> {
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
            //console.log(data);
            this.setState({ data });
        });
    }

    async putCurData(index: number) {
        let url: string, method: string;
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
            newData.id = prevState.data[0].id + 1;
            return {
                data: [newData, ...prevState.data]
            };
        });
    }

    render() {
        const Columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width:60,
            },
            {
                title: 'type',
                dataIndex: 'type',
                key: 'type',
                width:100,
                render:text=>PostForumIndexColumnInfoType[text - 1]
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
                width:200,
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('title', e.target.value, index)} value={text} />
            },
            this.state.type === 1 ? {
                title: 'content',
                dataIndex: 'content',
                key: 'content',
                width:200,
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('content', e.target.value, index)} value={text} />

            } : null,
            {
                title: 'url',
                dataIndex: 'url',
                key: 'url',
                width:140,
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('url', e.target.value, index)} value={text} />
            },
            this.state.type !== 3 ? {
                title: 'imageUrl',
                dataIndex: 'imageUrl',
                key: 'imageUrl',
                width:200,
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('imageUrl', e.target.value, index)} value={text} />

            } : null, this.state.type === 1 || this.state.type === 2 ? {
                title: 'orderWeight',
                dataIndex: 'orderWeight',
                key: 'orderWeight',
                width:150,
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('orderWeight', e.target.value, index)} value={text} />
            } : null,
            {
                title: 'enable',
                dataIndex: 'enable',
                key: 'enable',
                width:80,
                render:(text,record,index)=><Checkbox checked={text} onChange={e=>this.handleTdChange('enable', (e.target as HTMLInputElement).checked, index)} />
            },
            this.state.type === 4 ? {
                title: 'days',
                dataIndex: 'days',
                key: 'days',
                render:(text,record,index)=><Input type="text" onChange={e => this.handleTdChange('days', e.target.value, index)} value={text} />
            } : null,
            this.state.type === 4 ? {
                title: 'expiredTime',
                dataIndex: 'expiredTime',
                key: 'expiredTime',
                render :text=>moment(text).format('YYYY-MM-DD HH:mm:ss')
            } : null,
            {
                title: 'save',
                dataIndex: 'save',
                key: 'save',
                width:100,
                render: (text,record,index)=><Button type="primary" onClick={e => this.putCurData(index)}>保存</Button>
            },
        ].filter((v)=>{if(v)return v});

        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "1rem", borderTop: "#eaeaea solid thin", paddingTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", marginBottom: "1rem" }}>
                    <div style={{ marginTop: "10px" }}>自定义栏目</div>
                    <div><Button type="primary" disabled={this.state.type === 1} onClick={() => this.getInfo(urls[0])} >推荐阅读</Button></div>
                    <div><Button type="primary" disabled={this.state.type === 2} onClick={() => this.getInfo(urls[1])} >推荐功能</Button></div>
                    <div><Button type="primary" disabled={this.state.type === 3} onClick={() => this.getInfo(urls[2])} >校园新闻</Button></div>
                    <div><Button type="primary" disabled={this.state.type === 4} onClick={() => this.getInfo(urls[3])} >广告</Button></div>
                    {this.state.type > 0 ? <div><Button type="primary" onClick={() => this.add()} >添加</Button></div> : null}
                </div>
                <div>
                   <Table  bordered columns={Columns} dataSource={this.state.data} />
                    <p>{this.state.info}</p>
                </div>
            </div>
        );
    }
}

// {this.state.data.length > 0 ?
//     <table>
//         <tbody>
//             <tr>
//                 <th>id</th>
//                 <th>type</th>
//                 <th>title</th>
//                 {this.state.type === 1 ? <th>content</th> : null}
//                 <th>url</th>
//                 {this.state.type !== 3 ? <th>imageUrl</th> : null}
//                 {this.state.type === 1 || this.state.type === 2 ? <th>orderWeight</th> : null}
//                 <th>enable</th>
//                 {this.state.type === 4 ? <th>days</th> : null}
//                 {this.state.type === 4 ? <th>expiredTime</th> : null}
//                 <th>save</th></tr>
//             {this.state.data.map((item, index) => (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{PostForumIndexColumnInfoType[item.type - 1]}</td>
//                     <td><input type="text" onChange={e => this.handleTdChange('title', e.target.value, index)} value={item.title} /></td>
//                     {this.state.type === 1 ? <td><input type="text" onChange={e => this.handleTdChange('content', e.target.value, index)} value={item.content} /></td> : null}
//                     <td><input type="text" onChange={e => this.handleTdChange('url', e.target.value, index)} value={item.url} /></td>
//                     {this.state.type !== 3 ? <td><input type="text" onChange={e => this.handleTdChange('imageUrl', e.target.value, index)} value={item.imageUrl} /></td> : null}
//                     {this.state.type === 1 || this.state.type === 2 ? <td><input type="number" onChange={e => this.handleTdChange('orderWeight', Number.parseInt(e.target.value), index)} value={item.orderWeight} /></td> : null}
//                     <td><input onChange={e => this.handleTdChange('enable', (e.target as HTMLInputElement).checked, index)} type="checkbox" checked={item.enable} /></td>
//                     {this.state.type === 4 ? <td><input type="number" onChange={e => this.handleTdChange('days', Number.parseInt(e.target.value), index)} value={item.days} /></td> : null}
//                     {this.state.type === 4 && item.expiredTime ? <td>{item.expiredTime.slice(0, 19).replace('T', ' ')}</td> : null}
//                     <td><button type="button" onClick={e => this.putCurData(index)}>保存</button></td>
//                 </tr>
//             ))}
//         </tbody>
//     </table> : null}