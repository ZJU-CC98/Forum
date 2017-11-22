// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';

export class UserCenterConfigSignature extends React.Component<null, UserCenterConfigSignatureState> {
    constructor(props) {
        super(props);
        const userInfo = Utility.getLocalStorage('userInfo');
        console.log(userInfo);
        this.state = {
            signature: userInfo.signatureCode,
            signatureExtends: null
        };

	    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ signature: event.target.value });
    }

    render() {
        return (<div className="user-center-config-signature">
            <div className="signature-buttons">
                <button id="signatureImg" type="button">图片</button>
                <button id="signatureVideo" type="button">视频</button>
                <button id="signatureAudio" type="button">音乐</button>
                <button id="signatureColor" type="button">A</button>
                <button id="signatureStrong" type="button">B</button>
            </div>
            <div className="signature-extends"></div>
            <textarea id="signature" onChange={this.handleChange} value={this.state.signature} />
            <div>
                <p>注* 个性签名将在个人主页、发布文章、回复文章中显示</p>
                <button id="signatureUpload" type="button">保存签名档</button>
            </div>
        </div>);
    }
}

class UserCenterConfigSignatureState {
    signature: string;
    signatureExtends: JSX.Element;
}