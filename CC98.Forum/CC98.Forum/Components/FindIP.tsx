import * as React from 'react'
export class FindIP extends React.Component<{ data }>{
    generateIPInfo(item) {
        return <tr>
            <td>{item.ip}</td>
            <div className="column" >{item.posts.map(this.generatePostInfo)}</div>
        </tr>;
    }
    generatePostInfo(item) {
        return <div className="column">
            <div className="row">
                <div>用户名 {item.userName}</div><div> 楼层 {item.floor}</div>
            </div>
            <div className="IPContent">{item.content}</div>
        </div>;
    }
    render() {

        return <div className="findID">{this.props.data.map(this.generateIPInfo.bind(this))}</div>;
    }
}