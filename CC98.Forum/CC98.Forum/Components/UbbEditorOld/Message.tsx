import * as React from 'react';

interface UbbMessageProps {
    /**
     * 要显示的信息
     */
    message: string;
}

interface UbbMessageState {
    /**
     * 是否在显示
     */
    isShown: boolean;
    /**
     * 显示的信息
     */
    message: string;
}

/**
 * UBB编辑器显示消息用组件
 */
export default class extends React.Component<UbbMessageProps, UbbMessageState> {
    constructor(props){
        super(props);
        this.state = {
            isShown: false,
            message: props.message
        };
    }

    //接到消息时显示2s，之后隐藏
    componentWillReceiveProps(nextProps){
        if(nextProps.message !== ""){
            this.setState({
                isShown: true,
                message: nextProps.message
            });
            setTimeout(()=>{
                this.setState({
                    isShown: false
                })
            }, 2000);
        }
    }

    render() {
        return (
        <div className="ubb-editor-info" style={this.state.isShown  ?  {opacity: 1} : {opacity: 0}}>
            <p>{this.state.message}</p>
        </div>
        );
    }
}