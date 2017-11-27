// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';

export class UserCenterConfigAvatar extends React.Component<null, UserCenterConfigAvatarState> {
    myCanvas: HTMLCanvasElement;
    selector: HTMLDivElement;
    resize: HTMLSpanElement;
    newAvatar: HTMLCanvasElement;
    cover: HTMLDivElement;
    dragging: HTMLElement;
    diffX: number;
    diffY: number;
    constructor(props) {
        super(props);
        const userInfo = Utility.getLocalStorage('userInfo');
        this.state = {
            avatarURL: '',
            info: '',
            isShown: false,
            divheight: 0,
            divWidth: 0,
            selectorWidth: 160,
            selectorLeft: 0,
            selectorTop: 0,
            avatarNow: userInfo.portraitUrl,
            isLoading: false,
            naturalWidth: 0,
            naturalHeight: 0,
            img: null,
            NUM_MAX: 0
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleIMGLoad = this.handleIMGLoad.bind(this);
        this.handleSelectorMove = this.handleSelectorMove.bind(this);
        this.handleResizeMove = this.handleResizeMove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoverMouseMove = this.handleCoverMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    
    handleChange(e) {
        let file = e.target.files[0];
        if (!file.type.match('image.*')) {
            this.setState({
                info: '请选择图片文件',
                isShown: false,
                divheight: 0
            });
            return false;
        }
        
        let render = new FileReader();

        render.readAsDataURL(file);
        render.addEventListener('load', (e) => {
            this.setState({
                isShown: true,
                avatarURL: (e as any).target.result
            });
        });
    }
    
    handleIMGLoad(width, height, img) {
        if (width < 160 || height < 160) {
            this.setState({
                info: '图片至少为 160*160',
                isShown: false,
                divheight: 0
            });
            return;
        } else if (width > 800) {
            this.setState({
                info: '图片宽度至多为 800',
                isShown: false,
                divheight: 0
            });
            return;
        }
        let ctx = this.myCanvas.getContext('2d');
        this.myCanvas.width = width;
        this.myCanvas.height = height;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        this.setState({
            divheight: height + 50,
            divWidth: width + 50,
            isShown: true,
            info: '请选择要显示的区域',
            selectorLeft: width / 4,
            selectorTop: height / 4,
            selectorWidth: Math.min(height, width) / 2,
            naturalWidth: width,
            naturalHeight: height,
            img: img,
            NUM_MAX: Math.min(500, width, height)
        });
    }

    handleMouseUp() {
        this.dragging = null;
    }

    componentDidMount() {
        this.selector.addEventListener('mousedown', this.handleSelectorMove);
        this.selector.addEventListener('mousemove', this.handleSelectorMove);
        this.selector.addEventListener('mouseup', this.handleSelectorMove);
        this.resize.addEventListener('mousedown', this.handleResizeMove);
        this.resize.addEventListener('mousemove', this.handleResizeMove);
        this.resize.addEventListener('mouseup', this.handleResizeMove);
        this.cover.addEventListener('mousemove', this.handleCoverMouseMove);
        this.cover.addEventListener('mouseup', this.handleCoverMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        this.selector.removeEventListener('mousedown', this.handleSelectorMove);
        this.selector.removeEventListener('mousemove', this.handleSelectorMove);
        this.selector.removeEventListener('mouseup', this.handleSelectorMove);
        this.resize.removeEventListener('mousedown', this.handleResizeMove);
        this.resize.removeEventListener('mousemove', this.handleResizeMove);
        this.resize.removeEventListener('mouseup', this.handleResizeMove);
        this.cover.removeEventListener('mousemove', this.handleCoverMouseMove);
        this.cover.removeEventListener('mouseup', this.handleCoverMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
        
    handleSelectorMove(event) {
        if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
            this.handleCoverMouseMove(event);
        } else {
            switch (event.type) {
                case 'mousedown':
                    this.diffX = event.clientX - event.target.offsetLeft;
                    this.diffY = event.clientY - event.target.offsetTop;
                    this.dragging = event.target;
                    break;
                case 'mousemove':
                    if (this.dragging !== null) {
                        let y = event.clientY - this.diffY,
                            x = event.clientX - this.diffX;
                        this.setState((prevState) => {
                            if (y < 0) { y = 0; }
                            if (x < 0) { x = 0; }
                            if (y > prevState.naturalHeight - this.state.selectorWidth) { y = prevState.naturalHeight - this.state.selectorWidth; }
                            if (x > prevState.naturalWidth - this.state.selectorWidth) { x = prevState.naturalWidth - this.state.selectorWidth; }
                            return {
                                selectorTop: y,
                                selectorLeft: x
                            }
                        });
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
    }

    handleSubmit() {
        let canvas = this.newAvatar;
        let ctx = canvas.getContext('2d');
        const x = this.state.selectorLeft,
            y = this.state.selectorTop,
            width = this.state.selectorWidth;
        canvas.width = width;
        canvas.height = width;
        ctx.drawImage(this.state.img, x, y, width, width, 0, 0, width, width);
        canvas.toBlob(async (result) => {
            let file = new File([result], '头像.jpg', { type: 'image/jpeg', lastModified: Date.now() });
            const avatar = await Utility.uploadFile(file);
            try {
                this.setState({
                    isLoading: true
                });
                const token = Utility.getLocalStorage('accessToken');
                const url = 'http://apitest.niconi.cc/user/portrait';
                let myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', token);
                let data = `http://apitest.niconi.cc${avatar.content}`;
                let res = await fetch(url, {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(data)
                });
                if (res.status === 200) {
                    this.setState({
                        info: '修改成功',
                        avatarNow: data,
                        isLoading: false,
                        isShown: false,
                        divheight: 0
                    });
                    let userInfo = Utility.getLocalStorage('userInfo');
                    userInfo.portraitUrl = data;
                    Utility.setLocalStorage('userInfo', userInfo);
                } else {
                    throw {};
                }
                
            } catch (e) {
                this.setState({
                    info: '修改失败',
                    isLoading: false,
                    isShown: false,
                    divheight: 0
                });
            }
        },'image/jpeg',0.75);
    }

    handleResizeMove(event) {
        switch (event.type) {
            case 'mousedown':
                this.diffX = event.clientX - event.target.offsetLeft;
                this.dragging = event.target;
                break;
            case 'mousemove':
                if (this.dragging !== null) {
                    this.diffY = event.clientX - event.target.offsetLeft;
                    this.setState((prevState) => {
                        let num = prevState.selectorWidth + this.diffY - this.diffX;
                        let max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
                        if (!isNaN(num)) {
                            if (num < 100) { num = 100 }
                            if (num > max) { num = max }
                        }
                        return {
                            selectorWidth: isNaN(num) ? prevState.selectorWidth : num
                        };
                    });
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

    handleCoverMouseMove(e) {
        switch (e.type) {
            case 'mouseup':
                this.dragging = null;
                break;
            case 'mousemove':
                if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
                    this.diffY = e.clientX - this.dragging.offsetLeft;
                    this.setState((prevState) => {
                        let num = prevState.selectorWidth + this.diffY - this.diffX;
                        if (!isNaN(num)) {
                            let max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
                            if (num < 100) { num = 100 }
                            if (num > max) { num = max }
                        }
                        return {
                            selectorWidth: isNaN(num) ? prevState.selectorWidth : num
                        };
                    });
                } else if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'selector') {
                    let y = e.clientY - this.diffY,
                        x = e.clientX - this.diffX;
                    this.setState((prevState) => {
                        if (y < 0) { y = 0; }
                        if (x < 0) { x = 0; }
                        if (y > prevState.naturalHeight - this.state.selectorWidth) { y = prevState.naturalHeight - this.state.selectorWidth; }
                        if (x > prevState.naturalWidth - this.state.selectorWidth) { x = prevState.naturalWidth - this.state.selectorWidth; }
                        return {
                            selectorTop: y,
                            selectorLeft: x
                        }
                    });
                }
                break;

        }
    }

    render() {
        const style = {
            display: 'none'
        };
        const userInfo = Utility.getLocalStorage('userInfo');
        return (
            <div>
                <h2>修改头像</h2>
                <div className="user-center-config-avatar">
                    <img src={this.state.avatarNow}></img>
                    <div>
                        <button id="chooseDefaultAvatar" type="button" >选择论坛头像</button>
                        <div>
                            <input onChange={this.handleChange} id="uploadAvatar" type="file" style={style} />
                            <label htmlFor="uploadAvatar"><p>选择本地图片</p></label>
                            <p>{this.state.info}</p>
                            <button type="button" style={this.state.isShown ? {} : style} onClick={this.handleSubmit} disabled={this.state.isLoading}>提交</button>
                        </div>
                    </div>
                    <div className="user-center-config-avatar-preview" style={this.state.isShown ? { opacity: 1, marginTop: '2rem' } : { zIndex: -1 }}>
                        <hr />
                        <div style={{ position: 'absolute', width: '824px', overflow: 'hidden', paddingBottom: '50px' }}>
                            <canvas id="newAvatar" style={style} ref={(a) => { this.newAvatar = a;}}></canvas>
                            <canvas ref={(canvas) => { this.myCanvas = canvas }} style={{ position: 'relative' }} />
                            <div id="cover" ref={(div) => { this.cover = div; }} style={{ width: `${this.state.divWidth}px`, height: `${this.state.divheight}px`, top: 0 }}></div>
                            <div className="imgdata" ref={(div) => { this.selector = div; }} style={this.state.isShown ? { width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` }: style}>
                                <img src={this.state.avatarURL} style={{ position: 'relative', top: `-${this.state.selectorTop}px`, left: `-${this.state.selectorLeft}px` }} />
                            </div>
                            <div id="selector" ref={(div) => { this.selector = div; }} style={this.state.isShown ? {width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` } : style}></div>
                            <span id="resize" ref={(span) => { this.resize = span; }} style={{ top: `${this.state.selectorWidth + this.state.selectorTop}px`, left: `${this.state.selectorWidth + this.state.selectorLeft}px` }}></span>
                        </div>
                        <img onLoad={(e) => { this.handleIMGLoad((e as any).target.naturalWidth, (e as any).target.naturalHeight, (e as any).target); }} style={style} src={this.state.avatarURL} />
                    </div>
                    <div style={{ width: '100%', height: `${this.state.divheight}px`, transitionDuration: '.5s' }}></div>
                </div>
            </div>
        );
    }
}

interface UserCenterConfigAvatarState {
    info: string;
    avatarURL: string;
    isShown: boolean;
    divheight: number;
    divWidth: number;
    selectorWidth: number;
    selectorTop: number;
    selectorLeft: number;
    avatarNow: string;
    isLoading: boolean;
    naturalWidth: number;
    naturalHeight: number;
    img: HTMLImageElement;
    NUM_MAX: number;
}