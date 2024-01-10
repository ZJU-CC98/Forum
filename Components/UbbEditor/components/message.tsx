import * as React from 'react'

interface Props {
    message: string;
}

interface State {
    isShown: boolean
    message: string
}

/**
 * UBB编辑器显示消息用组件
 */
export class Message extends React.Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            isShown: false,
            message: props.message
        }
    }

    //接到消息时显示2s，之后隐藏
    componentWillReceiveProps(nextProps){
        if(nextProps.message !== ""){
            this.setState({
                isShown: true,
                message: nextProps.message
            })
            setTimeout(()=>{
                this.setState({
                    isShown: false
                })
            }, 2000)
        }
    }

    render() {
        return (
        <div className="ubb-editor-info" style={this.state.isShown  ?  {opacity: 1} : {opacity: 0}}>
            <p>{this.state.message}</p>
        </div>
        )
    }
}