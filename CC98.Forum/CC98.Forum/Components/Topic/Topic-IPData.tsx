import * as React from 'react'
import { Modal, Collapse } from 'antd'
const Panel = Collapse.Panel;
interface Post {
    userName: string
    userId: number
    content: string
    floor: number
}
interface IP {
    ip: string
    posts: Array<Post>
}


interface Props {
    IPData: Array<IP>
    changeStatus: ()=>void
}

interface State {
    visible: boolean
}
export default class extends React.Component<Props, State>{
    state: State = {
        visible: true
    }
    onClick = () => this.props.changeStatus()
    render() {
        const { IPData } = this.props
        const { visible } = this.state
        return <>
            <Modal
                visible={visible}
                title="查看IP"
                okText="确认"
                cancelText="取消"
                onOk={this.onClick}
                onCancel={this.onClick}
                width={"50rem"}
                style={{ height: "50rem", overflow: 'scroll' }}
            >
                <Collapse defaultActiveKey={[]}
                >
                    {IPData.map((item: IP, index) => <Panel
                        key={`${index}`} header={`${item.ip} 共${item.posts.length}条`}
                    >
                        {item.posts.map(post => <><p>用户名:{post.userName} 楼层:{post.floor}</p><p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.content}</p></>)}
                    </Panel>)}
                </Collapse>
            </Modal>
        </>
    }
}