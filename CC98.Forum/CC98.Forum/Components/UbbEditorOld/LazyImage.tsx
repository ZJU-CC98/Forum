import * as React from 'react';

interface LazyImageProps {
    /**
     * 鼠标点击事件
     */
    onClick: ()=>void;
    /**
     * 图片地址
     */
    src: string;
    /**
     * CSS类名
     */
    className?: string;
}

interface LazyImageState {
    /**
     * 是否加载完成
     */
    loaded: boolean;
}

/**
 * 异步加载图片的组件
 */
export default class extends React.Component<LazyImageProps, LazyImageState> {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    //首次渲染后加载图片
    componentDidMount() {
        const img = new Image();
        img.onload = () => {
            this.setState({
                loaded: true
            });
        };
        img.src = this.props.src;
    }

    //图片地址更换后重新加载图片
    componentWillReceiveProps(nextProps){
        if(nextProps.src !== this.props.src){
            this.setState({
                loaded: false
            });
            const img = new Image();
            img.onload = () => {
                this.setState({
                    loaded: true
                });
            };
            img.src = nextProps.src;
        }
    }

    render() {
        if (!this.state.loaded) {
            return <img
                className={this.props.className}/>
        }
        return <img
            className={this.props.className}
            src={this.props.src}
            onClick={this.props.onClick} />
    }
}
