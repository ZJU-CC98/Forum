// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import MyFavoritesBoard from './MyFavoritesBoard';
import { UserFavoritesBoardInfo } from '../../States/AppState';
import { getCurrentUserFavoriteBoards } from '../../AsyncActions/UserCenter';
import { connect } from 'react-redux';
import * as Actions from '../../Actions/UserCenter';

interface Props {
    /**
     * 用户关注的版面信息
     */
    boards: UserFavoritesBoardInfo[];
    /**
     * 是否在加载中
     */
    isLoading: boolean;
    /**
     * dispatch获取版面信息的action
     */
    getInfo: () => void;
    changePage: () => void;
}

class Boards extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        props.getInfo();
        props.changePage();
    }

    render() {
        const style = {
            marginTop: '2rem',
            textAlign: 'center'
        };
        if (this.props.isLoading) {
            return <div className="user-center-loading"><p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p></div>
        }
        if (this.props.boards.length === 0) {
            return (<div style={style}>没有关注</div>);
        }
        let elements = this.props.boards.map((item) => (<MyFavoritesBoard key={item.id} UserFavoritesBoard={item} />));
        for (let i = 1; i < elements.length; i += 2) {
            elements.splice(i, 0, <hr key={i} />);
        }
        return (<div>{elements}</div>);
    }
}

function mapState(store) {
    return {
        boards: store.userInfo.currentUserFavoriteBoards,
        isLoading: store.userInfo.isLoading
    };
}

function mapDispatch(dispatch) {
    return {
        getInfo: () => {
            dispatch(getCurrentUserFavoriteBoards());
        },
        changePage: () => {
            dispatch(Actions.changeUserCenterPage('myfavoriteboards'));
        }
    };
}

export default connect(mapState, mapDispatch)(Boards);