// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';

export class UserCenterConfigAvatar extends React.Component<null, UserCenterConfigAvatarState> {
    myCanvas: HTMLCanvasElement;
    myIMG: HTMLImageElement;
    constructor(props) {
        super(props);
        const userInfo = Utility.getLocalStorage('userInfo');
        this.state = {
            avatarURL: '',
            info: '图片长宽为160×160像素的图片',
            isShown: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleIMGLoad = this.handleIMGLoad.bind(this);
    }

    handleChange(e) {
        let file = e.target.files[0];

        if (!file.type.match('image.*')) {
            this.setState({
                info: '请选择图片文件'
            });
            return false;
        }

        let render = new FileReader();

        render.readAsDataURL(file);

        render.addEventListener('load', (arg: any) => {
            this.setState({
                avatarURL: arg.target.result
            });
            console.log(arg);
        });
    }

    handleIMGLoad() {
        let ctx = this.myCanvas.getContext('2d');
        console.log(`${this.myIMG.naturalWidth}, ${this.myIMG.naturalHeight}`);
        ctx.drawImage(this.myIMG, 0, 0, this.myIMG.naturalWidth, this.myIMG.naturalHeight, 0, 0, this.myIMG.naturalWidth, this.myIMG.naturalHeight);
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
                    <label htmlFor="uploadAvatar"><p>上传头像</p></label>
                    <p>{this.state.info}</p>
                </div>
            </div>
            <div className="user-center-config-avatar-preview" style={this.state.isShown ? null : style}>
                <canvas ref={(canvas) => { this.myCanvas = canvas }} />
                <img ref={(img) => { this.myIMG = img; }} onLoad={this.handleIMGLoad} style={style} src={this.state.avatarURL} />
            </div>
        </div>);
    }
}

interface UserCenterConfigAvatarState {
    info: string;
    avatarURL: string;
    isShown: boolean;
}