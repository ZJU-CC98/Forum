// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';

export class UserCenterConfigAvatar extends React.Component<null, UserCenterConfigAvatarState> {
    myCanvas: HTMLCanvasElement;
    myIMG: HTMLImageElement;
    selector: HTMLDivElement;
    resize: HTMLSpanElement;

    constructor(props) {
        super(props);
        const userInfo = Utility.getLocalStorage('userInfo');
        this.state = {
            avatarURL: '',
            info: '图片长宽为160×160像素的图片',
            isShown: false,
            divheight: '0px',
            selectorWidth: 160,
            selectorLeft: 0,
            selectorTop: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleIMGLoad = this.handleIMGLoad.bind(this);
        this.handleSelectorMove = this.handleSelectorMove.bind(this);
        this.handleResizeMove = this.handleResizeMove.bind(this);
    }
    
    handleChange(e) {
        let file = e.target.files[0];

        if (!file.type.match('image.*')) {
            this.setState({
                info: '请选择图片文件',
                isShown: false,
                divheight: '0px'
            });
            return false;
        }

        let render = new FileReader();

        render.readAsDataURL(file);

        render.addEventListener('load', (arg: any) => {
            this.setState({
                avatarURL: arg.target.result
            });            
        });
    }

    handleIMGLoad() {
        console.log(this.myIMG.naturalWidth);
        console.log(this.myIMG.naturalHeight);
        if (this.myIMG.naturalWidth < 160 || this.myIMG.naturalHeight < 160) {
            this.setState({
                info: '图片至少为 160*160',
                isShown: false
            });
            return;
        }
        let ctx = this.myCanvas.getContext('2d');
        this.myCanvas.width = this.myIMG.naturalWidth+40;
        this.myCanvas.height = this.myIMG.naturalHeight+40;
        ctx.drawImage(this.myIMG, 0, 0, this.myIMG.naturalWidth, this.myIMG.naturalHeight, 20, 20, this.myIMG.naturalWidth, this.myIMG.naturalHeight);
        this.setState({
            divheight: `${this.myIMG.naturalHeight + 50}px`,
            isShown: true,
            info: '请选择要显示的区域'
        });
    }

    componentDidMount() {
        this.selector.addEventListener('mousedown', this.handleSelectorMove);
        this.selector.addEventListener('mousemove', this.handleSelectorMove);
        this.selector.addEventListener('mouseup', this.handleSelectorMove);
        this.selector.addEventListener('mouseleave', this.handleSelectorMove);
        this.resize.addEventListener('mousedown', this.handleResizeMove);
        this.resize.addEventListener('mousemove', this.handleResizeMove);
        this.resize.addEventListener('mouseup', this.handleResizeMove);
        this.resize.addEventListener('mouseleave', this.handleResizeMove);
    }

    componentWillUnmount() {
        this.selector.removeEventListener('mousedown', this.handleSelectorMove);
        this.selector.removeEventListener('mousemove', this.handleSelectorMove);
        this.selector.removeEventListener('mouseup', this.handleSelectorMove);
        this.selector.removeEventListener('mouseleave', this.handleSelectorMove);
        this.resize.removeEventListener('mousedown', this.handleResizeMove);
        this.resize.removeEventListener('mousemove', this.handleResizeMove);
        this.resize.removeEventListener('mouseup', this.handleResizeMove);
        this.resize.removeEventListener('mouseleave', this.handleResizeMove);
    }

    dragging: null;
    diffX: number;
    diffY: number;
    handleSelectorMove(event) {
        switch (event.type) {
            case 'mousedown':
                this.diffX = event.clientX - event.target.offsetLeft;
                this.diffY = event.clientY - event.target.offsetTop;
                this.dragging = event.target;
                //console.log(event);
                break;
            case 'mousemove':
                //console.log(this.dragging);
                if (this.dragging !== null) {
                    let y = event.clientY - this.diffY,
                        x = event.clientX - this.diffX;
                    if (y < 0) { y = 0; }
                    if (y > this.myIMG.naturalHeight - this.state.selectorWidth) { y = this.myIMG.naturalHeight - this.state.selectorWidth; }
                    if (x < 0) { x = 0; }
                    if (x > 800 - this.state.selectorWidth) { x = 800 - this.state.selectorWidth; }
                    this.setState({
                        selectorTop: y,
                        selectorLeft: x
                    });

                    //console.log('mousemove');
                }
                break;
            case 'mouseup':
                this.dragging = null;
                break;
            case 'mouseleave':
                this.dragging = null;
                break;
        }
    }
    handleResizeMove(event) {
        switch (event.type) {
            case 'mousedown':
                this.diffX = event.clientX - event.target.offsetLeft;
                this.dragging = event.target;
                console.log(event);
                break;
            case 'mousemove':
                //console.log(this.dragging);
                this.diffY = event.clientX - event.target.offsetLeft;
                if (this.dragging !== null) {
                    this.setState((prevState) => {
                        let num = prevState.selectorWidth + this.diffY - this.diffX;
                        if (!isNaN(num)) {
                            if (num < 80) { num = 80 }
                            if (num > 500) { num = 500 }
                        }
                        return {
                            selectorWidth: isNaN(num) ? prevState.selectorWidth : num
                        };
                    });

                    //console.log('mousemove');
                }
                break;
            case 'mouseup':
                this.dragging = null;
                break;
            case 'mouseleave':
                this.dragging = null;
                break;
        }
    }
    render() {
        const style = {
            display: 'none'
        };
        const userInfo = Utility.getLocalStorage('userInfo');
        return (<div className="user-center-config-avatar">
            <img src={userInfo.portraitUrl}></img>
            <div>
                <button id="chooseDefaultAvatar" type="button" >选择论坛头像</button>
                <div>
                    <input onChange={this.handleChange} id="uploadAvatar" type="file" style={style} />
                    <label htmlFor="uploadAvatar"><p>选择本地图片</p></label>
                    <p>{this.state.info}</p>
                </div>
            </div>
            <div className="user-center-config-avatar-preview" style={this.state.isShown ? { opacity: 1, marginTop: '2rem' } : { zIndex: -1 }}>
                <hr />
                <div style={{ position: 'absolute', width: '824px', overflow: 'hidden' }}>
                    <canvas ref={(canvas) => { this.myCanvas = canvas }} style={{ position: 'relative'}} />
                    <div id="cover"></div>
                    <div className="imgdata" ref={(div) => { this.selector = div; }} style={{ width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` }}>
                        <img src={this.state.avatarURL} style={{ position: 'relative', top: `${20-this.state.selectorTop}px`, left: `${20-this.state.selectorLeft}px` }} />
                    </div>
                    <div id="selector" ref={(div) => { this.selector = div; }} style={{ width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` }}></div>
                    <span id="resize" ref={(span) => { this.resize = span; }} style={{ top: `${this.state.selectorTop + this.state.selectorWidth}px`, left: `${this.state.selectorLeft + this.state.selectorWidth}px` }}></span>
                </div>
                <img ref={(img) => { this.myIMG = img; }} onLoad={this.handleIMGLoad} style={style} src={this.state.avatarURL} />
            </div>
            <div style={{ width: '100%', height: this.state.divheight, transitionDuration: '.5s' }}></div>
        </div>);
    }
}

interface UserCenterConfigAvatarState {
    info: string;
    avatarURL: string;
    isShown: boolean;
    divheight: string;
    selectorWidth: number;
    selectorTop: number;
    selectorLeft: number;
}