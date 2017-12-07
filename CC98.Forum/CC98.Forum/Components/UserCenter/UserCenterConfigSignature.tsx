// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { ChangeUserInfo, UserInfo } from '../../States/AppState';
import { UbbEditor } from '../UbbEditor';

export class UserCenterConfigSignature extends React.Component<{ signature: string, onchange: Function }> {
    render() {
        return (
            <div>
                <h2>修改签名档</h2>
                <div className="user-center-config-signature">
                    <UbbEditor update={this.props.onchange} value={this.props.signature} />
                    <div>
                        <p>注* 个性签名将在个人主页、发布文章、回复文章中显示</p>
                    </div>
                </div>
            </div>);
    }
}

