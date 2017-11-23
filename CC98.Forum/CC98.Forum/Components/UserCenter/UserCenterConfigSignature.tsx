// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { ChangeUserInfo, UserInfo } from '../../States/AppState';

export class UserCenterConfigSignature extends React.Component<null, UserCenterConfigSignatureState> {
    constructor(props) {
        super(props);
        const userInfo = Utility.getLocalStorage('userInfo');
        console.log(userInfo);
        this.state = {
            signature: userInfo.signatureCode,
            signatureExtends: null,
            isLoading: false,
            buttonInfo: '保存签名档'
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({ signature: event.target.value });
    }

    async submit() {
        const signature = this.state.signature;
        const token = Utility.getLocalStorage('accessToken');
        const url = `http://apitest.niconi.cc/user`;

        //获取旧的个人信息
        const userInfo: UserInfo = Utility.getLocalStorage('userInfo');
        let newInfo = new ChangeUserInfo();
        newInfo.CustomTitle = userInfo.customTitle;
        newInfo.EmailAddress = userInfo.emailAddress;
        newInfo.Gender = (userInfo.gender === 1) ? 1 :0;
        newInfo.Introduction = userInfo.introduction;
        newInfo.QQ = userInfo.qq;
        newInfo.SignatureCode = userInfo.signatureCode;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);
        myHeaders.append('Content-Type', 'application/json');
        let res = await fetch(url, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                ...newInfo,
                SignatureCode: signature
            })
        });

        if (res.status === 200) {
            this.setState({
                buttonInfo: '保存成功',
                isLoading: false
            });
        } else {
            this.setState({
                buttonInfo: '保存失败',
                isLoading: false
            });
        }
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
            <div className="signature-extends">{this.state.signatureExtends}</div>
            <textarea id="signature" onChange={this.handleChange} value={this.state.signature} />
            <div>
                <p>注* 个性签名将在个人主页、发布文章、回复文章中显示</p>
                <button id="signatureUpload" type="button" onClick={this.submit} disabled={this.state.isLoading}>{this.state.buttonInfo}</button>
            </div>
        </div>);
    }
}

class UserCenterConfigSignatureState {
    signature: string;
    signatureExtends: JSX.Element;
    isLoading: boolean;
    buttonInfo: string;
}

