import * as React from 'react';
import * as Utility from '../../Utility';
import * as Actions from '../../Actions/UserCenter';
import { UserInfo } from '../../States/AppState';
import { connect } from 'react-redux';
import { RootState } from '../../Store';

const themeList = ['蓝', '绿', '红'];

interface Props {
    userInfo: UserInfo;
    changeUserInfo: (userInfo: UserInfo) => void;
}

interface State {
    theme: Number;
    info: string;
}

class Theme extends React.Component<Props, State> {
    state = {
        theme: this.props.userInfo.theme || 1,
        info: ''
    };

    handleSubmit = async () => {
        try{
            if(this.props.userInfo.theme === this.state.theme) {
                this.setState({ info: '修改成功' });
            }
            let headers = await Utility.formAuthorizeHeader();
            const url = `/me/theme?id=${this.state.theme}`;
            let res = await Utility.cc98Fetch(url, {
                headers,
                method: 'PUT'
            });
            if(!res.ok) {
                throw new Error(res.statusText);
            } else {
                this.props.changeUserInfo({ ...this.props.userInfo, theme: this.state.theme });
                this.setState({ info: '修改成功' });
            }
        } catch(e) {
            this.setState({ info: `修改失败 ${e.message}` });
        }
    }

    render() {
        return (
        <div className="user-theme">
            <div className="user-theme-config">
                <select value={this.state.theme} onChange={e => this.setState({ theme: Number.parseInt(e.target.value) })}>
                    <option value={0} disabled>未选择</option>
                    {themeList.map((item, index) => <option key={item} value={index + 1}>{item}</option>)}
                </select>
            </div>
            <div className="user-theme-preview"></div>
            <div className="user-theme-submit">
                <button type="button" onClick={this.handleSubmit}>保存</button>
                <p>{this.state.info}</p>
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