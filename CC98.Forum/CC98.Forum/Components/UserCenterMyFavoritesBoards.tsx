// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';
import { UserCenterMyFavoritesBoard } from './UserCenterMyFavoritesBoard';
import { UserFavoritesBoardInfo } from '../states/AppState';


export class UserCenterMyFavoritesBoards extends React.Component {
    async componentDidMount() {
        const token = Utility.getLocalStorage('accessToken');
        console.log(Utility.getLocalStorage('userInfo'));
        const customBoardsId: number[] = Utility.getLocalStorage('userInfo').customBoards;
        //if (!customBoardsId || customBoardsId.length === 0) {
        //    return;
        //}

        //const query = customBoardsId.join('&id=');
        //const url = `http://apitest.niconi.cc/board/?id=${query}`;
        
        //const url = `http://apitest.niconi.cc/me/addcustomboard/100`;
        const url = `http://apitest.niconi.cc/board/100`;
        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);

        let res = await fetch(url, {
            headers: myHeaders
        });
        let data = await res.json();
        console.log(data);
    }

    render() {
        return (<div>
            <UserCenterMyFavoritesBoard UserFavoritesBoard={boardInfo} />
            <hr />
            <UserCenterMyFavoritesBoard UserFavoritesBoard={boardInfo} />
            <hr />
            <UserCenterMyFavoritesBoard UserFavoritesBoard={boardInfo} />
            <hr />
            <UserCenterMyFavoritesBoard UserFavoritesBoard={boardInfo} />
            <hr />
            <UserCenterMyFavoritesBoard UserFavoritesBoard={boardInfo} />
        </div>);
    }
}

let boardInfo = new UserFavoritesBoardInfo();
boardInfo.boardMasters = ['aaa', 'bbbbb'];
boardInfo.id = 100;
boardInfo.name = '名字';
boardInfo.todayCount = 233;
boardInfo.topicCount = 666;