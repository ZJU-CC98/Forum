// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { UserFavoritesBoardInfo } from '../states/AppState';

export class UserCenterMyFavoritesBoard extends React.Component<UserCenterMyFavoritesBoardProps> {
    render() {
        return (
            <div className='user-center-myfavorite-board'>
                <img></img>
                <div className='user-center-myfavorite-board-info'>
                    <p>版主：{this.props.UserFavoritesBoard.boardMasters.join(' ')}</p>
                    <p>今日主题 {this.props.UserFavoritesBoard.todayCount} / 总主题 {this.props.UserFavoritesBoard.topicCount}</p>
                </div>
                <button type="button" >取消关注</button>
            </div>
            );
    }
}

interface UserCenterMyFavoritesBoardProps {
    UserFavoritesBoard: UserFavoritesBoardInfo
}