// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import  { UserInfo } from '../../States/AppState';
import { Link } from 'react-router-dom';

//用户中心主页用户头像与徽章组件
export default class extends React.Component<UserCenterExactAvatarProps> {
    render() {
        return (
            <div className="user-avatar">
                <img className="user-avatar-img" src={this.props.userInfo.portraitUrl} />
                <div className="user-badge">
                    {this.props.userInfo.boardMasterTitles.map(item => item.boardMasterLevel === 10 ?
                        <p key={item.boardId}> {/* 站务主管*/}
                            <Link to={`/boardList#${item.boardName}`}>{item.boardName}</Link>
                            <span style={{ color: 'red'}}>{item.title}</span>
                        </p> : 
                        <p key={item.boardId}> {/* 站务主管*/}
                            <Link to={`/list/${item.boardId}`}>{item.boardName}</Link>
                            <span>{item.title}</span>
                        </p>
                    )}
                </div>
            </div>    
        );
    }
}

interface UserCenterExactAvatarProps {
    /**
    * 用户信息
    */
    userInfo: UserInfo;
}