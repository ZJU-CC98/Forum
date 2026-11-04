import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { sendWealthTo } from '../../AsyncActions/UserCenter';
import { UserInfo } from '../../States/AppState';
import { List, Select } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as Utility from '../../Utility';

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

/** 单条转账记录（接口 /me/recent-wealth-transfer） */
interface WealthTransferRecord {
    id: number;
    fromUserId: number;
    toUserId: number;
    fromUserName: string;
    toUserName: string;
    time: string;
    /** 付款方实付 */
    payAmount: number;
    /** 收款方实收 */
    getAmount: number;
}

/** 转账记录每页条数，须与请求的 size 一致 */
const TRANSFER_RECORD_PAGE_SIZE = 20;

interface State {
    userNames: string;
    wealth: string;
    reason: string;
    /**
     * 提示信息
     */
    info: string;
    /** 转账记录筛选类型：0-全部 1-转入 2-转出 */
    recordType: number;
    /** 转账记录的用户名筛选，空表示全部 */
    recordUsername: string;
    /** 转账记录列表数据 */
    records: WealthTransferRecord[];
    /** 转账记录总数 */
    recordCount: number;
    /** 当前页码（从 0 开始的偏移页） */
    recordPage: number;
    /** 转账记录加载中 */
    recordLoading: boolean;
    /** 转账记录加载错误信息 */
    recordError: string;
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
            info: '',
            recordType: 0,
            recordUsername: '',
            records: [],
            recordCount: 0,
            recordPage: 0,
            recordLoading: false,
            recordError: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWealthChange = this.handleWealthChange.bind(this);
        this.loadRecords = this.loadRecords.bind(this);
        this.handleRecordTypeChange = this.handleRecordTypeChange.bind(this);
        this.handleRecordUsernameChange = this.handleRecordUsernameChange.bind(this);
        this.handleRecordPageChange = this.handleRecordPageChange.bind(this);
    }

    componentDidMount() {
        this.loadRecords(0, this.state.recordType, this.state.recordUsername);
    }

    /**
     * 加载转账记录列表（只读接口）
     * @param page 页码，从 0 开始
     * @param type 覆盖筛选类型（筛选变化后回第一页时传入）
     * @param username 覆盖用户名筛选
     */
    async loadRecords(page: number, type?: number, username?: string) {
        if (!Utility.getMyInfo()) {
            this.setState({ recordError: '登录后可查看转账记录' });
            return;
        }
        const recordType = type !== undefined ? type : this.state.recordType;
        const recordUsername = username !== undefined ? username : this.state.recordUsername;
        this.setState({ recordLoading: true, recordError: '' });
        try {
            const res = await Utility.getRecentWealthTransfers(
                page * TRANSFER_RECORD_PAGE_SIZE,
                TRANSFER_RECORD_PAGE_SIZE,
                recordType,
                recordUsername
            );
            const list: WealthTransferRecord[] = Array.isArray(res && res.data) ? res.data : [];
            this.setState({
                records: list,
                recordCount: res && typeof res.count === 'number' ? res.count : list.length,
                recordPage: page,
                recordLoading: false
            });
        } catch (e) {
            this.setState({ recordLoading: false, recordError: '转账记录加载失败' });
        }
    }

    /** 切换转入/转出筛选后回到第一页 */
    handleRecordTypeChange(value: number) {
        this.setState({ recordType: value });
        this.loadRecords(0, value);
    }

    handleRecordUsernameChange(e) {
        this.setState({ recordUsername: e.target.value });
    }

    /** 回车或点击查询按钮时按当前筛选回到第一页 */
    handleRecordSearch = () => {
        this.loadRecords(0);
    }

    handleRecordPageChange(page: number) {
        this.loadRecords(page - 1);
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
                    <div className="transfer-wealth-input transfer-wealth-tips"><p>说明</p>
                        <ul>
                            <li>转账需要收取一定的手续费，手续费金额为<strong>10% 或者 10 中的较大值</strong>。</li>
                            <li>转账手续费从转账金额中收取，因此对方实际收到的金额会少于您输入的金额。</li>
                            <li>转账的最小金额不能小于 <strong>10</strong></li>
                            <li>可以对多人转账，请在收款人一栏用空格隔开每个用户。多人转账时每个用户都会收到您指定的金额并单独扣除手续费。您最多可以同时向 <strong>10</strong> 个用户进行转账。</li>
                        </ul>
                    </div>
                    <button type="submit" disabled={this.props.isLoading}>转账</button>
                </form>
                {this.state.info && <p className="transfer-wealth-info">{this.state.info}</p>}
                {this.renderRecords()}
            </div>
        );
    }

    /**
     * 转账记录列表：置于转账表单下方，含类型/用户名筛选与分页。
     * 接口与筛选语义与小程序版转账记录页一致（0-全部 1-转入 2-转出）。
     */
    renderRecords() {
        const { records, recordCount, recordPage, recordLoading, recordError, recordType, recordUsername } = this.state;
        const myInfo = Utility.getMyInfo();
        //请求失败且没有旧数据时只显示提示，避免「加载失败 + 暂无转账记录 + 页码 0」三连
        const showList = !recordError || records.length > 0;
        return (
            <div className="transfer-records">
                <h2>转账记录</h2>
                <div className="transfer-record-filter">
                    <Select className="transfer-record-type" value={recordType} onChange={this.handleRecordTypeChange}>
                        <Select.Option value={0}>全部</Select.Option>
                        <Select.Option value={1}>转入</Select.Option>
                        <Select.Option value={2}>转出</Select.Option>
                    </Select>
                    <input
                        className="transfer-record-username"
                        type="text"
                        name="record-username"
                        placeholder="按对方用户名筛选（可空）"
                        value={recordUsername}
                        onChange={this.handleRecordUsernameChange}
                        onKeyPress={e => { if (e.key === 'Enter') this.handleRecordSearch(); }}
                    />
                    <button
                        className="transfer-record-search"
                        type="button"
                        onClick={this.handleRecordSearch}
                    >
                        查询
                    </button>
                </div>
                {recordError && <p className="transfer-record-tip">{recordError}</p>}
                {showList && (
                    <List
                        className="transfer-record-list"
                        dataSource={records}
                        rowKey={item => item.id.toString()}
                        loading={recordLoading}
                        locale={{ emptyText: (recordType !== 0 || recordUsername) ? '没有相关记录' : '暂无转账记录' }}
                        pagination={{
                            pageSize: TRANSFER_RECORD_PAGE_SIZE,
                            total: recordCount,
                            current: recordPage + 1,
                            onChange: this.handleRecordPageChange,
                            //只有一页（含无记录）时不显示页码
                            hideOnSinglePage: true
                        }}
                        renderItem={(item: WealthTransferRecord) => {
                            //转入显示我实收的 getAmount，转出显示我实付的 payAmount
                            const isIn = !!myInfo && item.toUserId === myInfo.id;
                            const otherId = isIn ? item.fromUserId : item.toUserId;
                            const otherName = isIn ? item.fromUserName : item.toUserName;
                            const amount = isIn ? item.getAmount : item.payAmount;
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<Link className="transfer-record-user" to={`/user/id/${otherId}`} title={otherName}>{otherName}</Link>}
                                        description={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                                    />
                                    <div className={'transfer-record-amount' + (isIn ? ' transfer-record-amount-in' : '')}>
                                        {isIn ? '+' : '-'}{amount}
                                    </div>
                                </List.Item>
                            );
                        }}
                    />
                )}
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