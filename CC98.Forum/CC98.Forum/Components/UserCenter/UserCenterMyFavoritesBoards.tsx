// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { UserCenterMyFavoritesBoard } from './UserCenterMyFavoritesBoard';
import { UserFavoritesBoardInfo } from '../../states/AppState';


export class UserCenterMyFavoritesBoards extends React.Component<null, UserCenterMyFavoritesBoardsState> {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            info: '加载中'
        };
    }

    async componentDidMount() {
        try {
            const token = Utility.getLocalStorage('accessToken');
            const loginName = Utility.getLocalStorage('userName');
            let myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            let response1 = await fetch(`http://apitest.niconi.cc/user/name/${loginName}`, {
                headers: myHeaders
            });
            if (response1.status !== 200) {
                throw {};
            }
            let userInfo = await response1.json();
            const customBoardsId: number[] = userInfo.customBoards;
            if (!customBoardsId || customBoardsId.length === 0) {
                this.setState({
                    info: '没有关注'
                });
                return;
            }

            const query = customBoardsId.join('&id=');
            const url = `http://apitest.niconi.cc/board/?id=${query}`;

            myHeaders = new Headers();
            myHeaders.append('Authorization', token);

            let res = await fetch(url, {
                headers: myHeaders
            });
            if (res.status !== 200) {
                throw {};
            }
            let data = await res.json();
            this.setState({
                boards: data
            });
        } catch (e) {
            console.log('版面加载失败');
        }
    }

    render() {
        const style = {
            marginTop: '2rem'
        };
        if (this.state.boards.length === 0) {
            return (<div style={style}>{this.state.info}</div>);
        }

        let elements = this.state.boards.map((item) => (<UserCenterMyFavoritesBoard UserFavoritesBoard={item} />));
        for (let i = 1; i < elements.length; i += 2) {
            elements.splice(i, 0, <hr />);
        }
        return (<div>{elements}</div>);
    }
}

interface UserCenterMyFavoritesBoardsState {
    boards: UserFavoritesBoardInfo[];
    info: string;
}
