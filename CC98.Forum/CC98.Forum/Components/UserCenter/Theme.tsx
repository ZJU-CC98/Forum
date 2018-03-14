import * as React from 'react';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { UserInfo } from '../../States/AppState';
import { connect } from 'react-redux';
import { RootState } from '../../Store';

const themeList = ['系统默认', '蓝', '绿', '比绿更绿'];

interface Props {
    userInfo: UserInfo;
    changeUserInfo: (userInfo: UserInfo) => void;
}

class Theme extends React.Component<Props> {
    handleSubmit = async (theme: number) => {
        try{
            let headers = await Utility.formAuthorizeHeader();
            const url = `/me/theme?id=${theme}`;
            let res = await Utility.cc98Fetch(url, {
                headers,
                method: 'PUT'
            });
            if(!res.ok) {
                throw new Error(res.statusText);
            } else {
                this.props.changeUserInfo({ ...this.props.userInfo, theme: theme });
                Utility.changeTheme(theme);
            }
        } catch(e) {
        }
    }

    render() {
        return (
        <div className="user-theme">
            <h2>切换主题</h2>
            <div className="user-theme-config">
                {themeList.map((item, index) => <button key={index} onClick={() => this.handleSubmit(index)} disabled={this.props.userInfo.theme === index}>{item}</button>)}
            </div>
            <div className="user-theme-preview">
            
            </div>
        </div>
        );
    }
}

function mapState(state: RootState) {
    return {
        userInfo: state.userInfo.currentUserInfo
    };
}

function mapDispatch(dispatch) {
    return {
        changeUserInfo: (userInfo: UserInfo) => {
            dispatch(Actions.changeUserInfo(userInfo));
        }
    };
}

export default connect(mapState, mapDispatch)(Theme);