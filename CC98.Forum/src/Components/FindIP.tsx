import * as React from 'react'
export class FindIP extends React.Component<{ data }>{
    generateIPInfo(item) {
        return <table className="UBBTableTag" style={{ backgroundColor:"#66CCFF" }}>
            <tr><th style={{ width: "15rem" }}>IP</th>
                <th style={{ width: "10rem" }}>userName</th>
                <th style={{ width: "5rem" }}>楼层</th>
                <th style={{ width: "35rem" }}>回复</th>
            </tr>
            <tr>
                <th rowSpan={item.posts.length}>{item.ip}</th>
                <td> {item.posts[0].userName}</td >
                <td>{item.posts[0].floor}</td>
                <td>{item.posts[0].content}</td>
            </tr>
            {item.posts.map(this.generatePostInfo)}
        </table>
    }

    generatePostInfo(item, index) {
        if (index) {
            return <tr>
                <td>{item.userName}</td>
                <td>{item.floor}</td>
                <td>{item.content}</td>
            </tr>;
        }
    }

    render() {
        return <div className="findIP">{this.props.data.map(this.generateIPInfo.bind(this))}</div>

    }
}