// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFavoritesBoardInfo } from '../../states/AppState';
import * as Utility from '../../Utility';

export class UserCenterMyFavoritesBoard extends React.Component<UserCenterMyFavoritesBoardProps, UserCenterMyFavoritesBoardState> {
    constructor(props) {
        super(props);
        this.state = {
            buttonInfo: '取消关注',
            buttonIsDisabled: false,
            isFollowing: true
        }
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
    }

    async unfollow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '取关中'
        });
        try {
            const token = Utility.getLocalStorage("accessToken");
            const boardId = this.props.UserFavoritesBoard.id;
            const url = `http://apitest.niconi.cc/me/custom-board/${boardId}`;
            let myHeaders = new Headers();
            myHeaders.append('Authorization', token);

            let res = await fetch(url, {
                method: 'DELETE',
                headers: myHeaders
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '重新关注',
                    isFollowing: false
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '取关失败',
                isFollowing: true
            });
        }
    }

    async follow() {
        this.setState({
            buttonIsDisabled: true,
            buttonInfo: '关注中'
        });
        try {
            const token = Utility.getLocalStorage("accessToken");

            const boardId = this.props.UserFavoritesBoard.id;
            const url = `http://apitest.niconi.cc/me/custom-board/${boardId}`;
            let myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            let res = await fetch(url, {
                method: 'PUT',
                headers: myHeaders
            });
            if (res.status === 200) {
                this.setState({
                    buttonIsDisabled: false,
                    buttonInfo: '取消关注',
                    isFollowing: true
                });
            } else {
                throw {};
            }
        } catch (e) {
            this.setState({
                buttonIsDisabled: false,
                buttonInfo: '关注失败',
                isFollowing: false
            });
        }
    }

    render() {
        return (
            <div className='user-center-myfavorite-board'>
                <a href={`/list/${this.props.UserFavoritesBoard.id}`} title={this.props.UserFavoritesBoard.name}><img></img></a>
                <div className='user-center-myfavorite-board-info'>
                    <p>版主：{this.props.UserFavoritesBoard.boardMasters.join(' ')}</p>
                    <p>今日主题 {this.props.UserFavoritesBoard.todayCount} / 总主题 {this.props.UserFavoritesBoard.topicCount}</p>
                </div>
                <button type="button" className={this.state.isFollowing ? '' : 'user-follow-board'}  onClick={this.state.isFollowing ? this.unfollow : this.follow} disabled={this.state.buttonIsDisabled}>{this.state.buttonInfo}</button>
            </div>
            );
    }
}

interface UserCenterMyFavoritesBoardProps {
    UserFavoritesBoard: UserFavoritesBoardInfo
}

interface UserCenterMyFavoritesBoardState {
    buttonIsDisabled: boolean;
    buttonInfo: string;
    isFollowing: boolean;
}