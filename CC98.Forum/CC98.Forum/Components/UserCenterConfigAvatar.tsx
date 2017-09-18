// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';

export class UserCenterConfigAvatar extends React.Component {
    render() {
        return (<div className="user-center-config-avatar">
            <img src=''></img>
            <div>
                <button id="chooseDefaultAvatar" type="button" >选择论坛头像</button>
                <button id="uploadAvatar" type="button" >上传头像</button>
                <p>图片长宽为160×160像素的图片</p>
            </div>
        </div>);
    }
}