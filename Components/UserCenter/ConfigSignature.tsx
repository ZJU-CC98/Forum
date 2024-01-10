﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { ChangeUserInfo, UserInfo } from '../../States/AppState';

export default class extends React.Component<{ signature: string, onchange: Function }> {
    render() {
        return (
            <div>
                <h2>修改签名档</h2>
                <div className="user-center-config-signature">
                    <textarea id="signature" onChange={(e) => { this.props.onchange('SignatureCode', e.target.value) }} value={this.props.signature} spellCheck={false}/>
                    <div>
                        <p>注* 个性签名将在个人主页、发布文章、回复文章中显示，允许使用UBB代码</p>
                    </div>
                </div>
            </div>);
    }
}

