import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { sendWealthTo } from '../../AsyncActions/UserCenter';
import { UserInfo } from '../../States/AppState';

interface Props {
    userInfo: Appstate.UserInfo;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    successNames: string[];
    sendWealthTo: (userNames: string[], wealth: number, reason: string) => void;
    changeUserInfo: (newInfo: UserInfo) => void;
    solveError: () => void;
}

interface State {
    userNames: string;
    wealth: string;
    reason: string;
    info: string;
}

class Wealth extends React.Component<Props, State> {
    constructor(...args: any[]){
        super(...args);
        this.state = {
            userNames: '',
            wealth: '',
            reason: '',
            info: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWealthChange = this.handleWealthChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.props.isLoading) return;
        try {
            this.props.solveError();
            const wealth = Number.parseFloat(this.state.wealth);
            if(!this.state.userNames) throw new Error('请输入收款人信息');
            if(this.state.wealth.match(/[^\d\.]/) || wealth < 10) throw new Error('请输入合法的金额');
            if(!this.state.reason) throw new Error('请输入理由');
            let userNames = this.state.userNames.split(/\s+/);
            if(userNames[userNames.length -1] === '')  userNames.pop();
            userNames = Array.from(new Set(userNames));
            if(this.props.userInfo.wealth < wealth * userNames.length) throw new Error('财富值不足');
            this.setState({ info: '转账中'});
            this.props.sendWealthTo(userNames, wealth, this.state.reason);
        } catch(e) {
            this.setState({
                info: e.message
            });
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if(!nextProps.isLoading && this.props.isLoading) {
            this.setState({ info: `成功给${nextProps.successNames.join(' ')}转账了总计${Number.parseFloat(this.state.wealth) * nextProps.successNames.length}个财富值` });
        }
        if (nextProps.isError && !this.props.isError) {
            this.setState({ info: nextProps.errorMessage });
        }
    }

    handleWealthChange(value: string, userNames: string) {
        const wealth = Number.parseFloat(value);
        if(userNames === '' || value === '') {
            this.setState({
                userNames,
                wealth: value,
                info: ''
            });
            return;
        }
        if(value.match(/[^\d\.]/)) {
            this.setState({ wealth: value, info: '请输入数值', userNames});
            return;
        }
        if(wealth < 10) {
            this.setState({ wealth: value, info: '请输入大于10的金额', userNames});
        } else {
            let names = userNames.split(/\s+/);
            if(names[names.length -1] === '')  names.pop();
            names = Array.from(new Set(names));
            let info = `你总共有${this.props.userInfo.wealth}个财富值，`;
            info += `共将扣除${wealth * names.length}个财富值，`;
            if(names.length > 1) {
                info += `${names.join('与')}将各收到`
            } else {
                info += `${names}将收到`;
            }
            info += `${wealth - Math.max(Math.floor(wealth * 0.1), 10)}个财富值`
            this.setState({ 
                wealth: value, 
                info,
                userNames
            });
        }
    }

    render() {
        return (
            <div className="user-center-transfer-wealth">
                <h2>转账</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="transfer-wealth-input"><p>收款人</p><input style={{ width: '30rem'}} type="text" name="user-names" value={this.state.userNames} onChange={e => this.handleWealthChange(this.state.wealth, e.target.value)} /></div>
                    <div className="transfer-wealth-input"><p>金额</p><input type="text" name="wealth" value={this.state.wealth} onChange={e => this.handleWealthChange(e.target.value, this.state.userNames)}/></div>
                    <div className="transfer-wealth-input"><p>理由</p><input style={{ width: '30rem'}} type="text" name="reason" value={this.state.reason} onChange={e => this.setState({ reason: e.target.value })}></input></div>
                    <div className="transfer-wealth-input">
                        <p>说明</p>
                        <ul style={{marginLeft: '2.5rem'}}>
                            <li>转账需要收取一定的手续费，手续费金额为<strong>10% 或者 10 中的较大值</strong>。</li>
                            <li>转账手续费从转账金额中收取，因此对方实际收到的金额会少于您输入的金额。</li>
                            <li>转账的最小金额不能小于 <strong>10</strong></li>
                            <li>可以对多人转账，请在收款人一栏用空格隔开每个用户。多人转账时每个用户都会收到您指定的金额并单独扣除手续费。您最多可以同时向 <strong>10</strong> 个用户进行转账。</li>
                        </ul>
                    </div>
                    <button type="submit" disabled={this.props.isLoading}>转账</button>
                </form>
                <p className="transfer-wealth-info">{this.state.info}</p>
            </div>
        );
    }
}

function mapState(state: RootState) {
    return {
        userInfo: state.userInfo.currentUserInfo,
        isLoading: state.userInfo.isLoading,
        isError: state.userInfo.isError,
        errorMessage: state.userInfo.errorMessage,
        successNames: state.userInfo.transferSuccessUsers
    };
}

function mapDispatch(dispatch) {
    return {
        changeUserInfo: (newInfo) => {
            dispatch(Actions.changeUserInfo(newInfo));
        },
        sendWealthTo: (...args) => {
            dispatch(sendWealthTo(...args));
        },
        solveError: () => {
            dispatch(Actions.userCenterSolveError());
        }
    };
}

export default connect(mapState, mapDispatch)(Wealth);