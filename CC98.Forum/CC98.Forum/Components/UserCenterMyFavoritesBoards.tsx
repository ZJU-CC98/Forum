// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../Utility';

export class UserCenterMyFavoritesBoards extends React.Component {
    async componentDidMount() {
        const token = Utility.getLocalStorage('accessToken');
        const customBoardsId: number[] = Utility.getLocalStorage('userInfo').customBoards;
        if (customBoardsId.length === 0) {
            return;
        }

        const query = customBoardsId.join('&id=');
        const url = `http://apitest.niconi.cc/board/?id=${query}`;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);

        let res = await fetch(url, {
            headers: myHeaders
        });
        let data = await res.json();
        console.log(data);
    }

    render() {
        return(<div></div>);
    }
}