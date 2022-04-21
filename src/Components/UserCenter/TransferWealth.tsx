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
    /**
     * 转账成功时服务器返回的用户名数组
     */
    successNames: string[];
    sendWealthTo: (userNames: string[], wealth: number, reason: string) => void;
    /**
     * 清除store中的错误状态
     */
    solveError: () => void;
}

interface State {
    userNames: string;
    wealth: string;
    reason: string;
    /**
     * 提示信息
     */
    info: string;
}

/**
 * 用户中心转账用组件
 */
class Wealth extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            userNames: '',
            wealth: '',
            reason: '',
            info: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWealthChange = this.handleWealthChange.bind(this);
    }

    //提交时调用的函数
    handleSubmit(e) {
        //阻止form提交时的刷新页面
        e.preventDefault();
        //如果在转账过程中则无视提交
        if(this.props.isLoading) return;
        try {
            //清理store中可能存在的上一次的错误
            this.props.solveError();
            //判断用户输入是否合法
            const wealth = Number.parseFloat(this.state.wealth);
            if(!this.state.userNames) throw new Error('请输入收款人信息');
            if(this.state.wealth.match(/[^\d\.]/) || wealth < 10) throw new Error('请输入合法的金额');
            if(!this.state.reason) throw new Error('请输入理由');
            //以空白字符打断用户名信息
            let userNames = this.state.userNames.split(/\s+/);
            //处理掉最后一项的空字符串
            if(userNames[userNames.length -1] === '')  userNames.pop();
            //去重
            userNames = Array.from(new Set(userNames));
            //判断余额
            if(this.props.userInfo.wealth < wealth * userNames.length) throw new Error('财富值不足');
            //转账
            this.setState({ info: '转账中'});
            this.props.sendWealthTo(userNames, wealth, this.state.reason);
        } catch(e) {
            this.setState({
                info: e.message
            });
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        //如果当前在加载中且下一个状态为未加载中则转账成功
        if(!nextProps.isLoading && this.props.isLoading) {
            this.setState({ info: `成功给${nextProps.successNames.join(' ')}转账了总计${Number.parseFloat(this.state.wealth) * nextProps.successNames.length}个财富值` });
        }
        //同理判断是否出错
        if (nextProps.isError && !this.props.isError) {
            this.setState({ info: nextProps.errorMessage });
        }
    }

    /**
     * 对用户输入的内容进行处理
     * @param value 财富值input的内容
     * @param userNames 用户名input的内容
     */
    handleWealthChange(value: string, userNames: string) {
        const wealth = Number.parseFloat(value);
        //如果其中有一栏为空则说明用户输入未完成，不提示信息
        if(userNames === '' || value === '') {
            this.setState({
                userNames,
                wealth: value,
                info: ''
            });
            return;
        }
        //value不是数值
        if(value.match(/[^\d\.]/)) {
            this.setState({ wealth: value, info: '请输入数值', userNames});
            return;
        }
        if(wealth < 10) {
            this.setState({ wealth: value, info: '请输入大于10的金额', userNames});
        } else {
            //以空白字符打断用户名信息
            let names = userNames.split(/\s+/);
            //处理掉最后一项的空字符串
            if(names[names.length -1] === '')  names.pop();
            //去重
            names = Array.from(new Set(names));
            //构造提示信息
            let info = `你总共有${this.props.userInfo.wealth}个财富值，`;
            info += `共将扣除${wealth * names.length}个财富值，`;
            if(names.length > 1) {//如果只输入了一个用户名
                info += `${names.join('与')}将各收到`
            } else {//如果输入了多个用户名
                info += `${names}将收到`;
            }
            //扣除手续费
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
        sendWealthTo: (...args) => {
            dispatch(sendWealthTo(...args));
        },
        solveError: () => {
            dispatch(Actions.userCenterSolveError());
        }
    };
}

export default connect(mapState, mapDispatch)(Wealth);