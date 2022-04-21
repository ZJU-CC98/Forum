import * as React from 'react';
import * as Utility from '../Utility';
import { connect } from 'react-redux';
import { RootState } from '../Store';
import { CC98SignalR } from '../SignalR';
import { MessageInfo } from '../Reducers/Message';
import { refreshCurrentMessageCount } from '../AsyncActions/Message';
import { changeMessageCount } from '../Actions/Message';
import { BlinkTitle } from '../Utility/blinkTitle';
import { history } from '../Store';

type props = {
    isLogOn: boolean,
    messageCount: MessageInfo,
    refreshCurrentMessageCount: () => void,
    changeMessageCount: (data: MessageInfo) => void
};

class NotificationController extends React.PureComponent<props> {
    render() {
        return null;
    }

    constructor(props) {
        super(props);
        this.handleNotifyMessageReceive = this.handleNotifyMessageReceive.bind(this);
    }
    /**
     * 这里是signalR的部分
     */
    async componentDidMount() {
        /**
         * 第一次加载的时候刷新未读消息
         */
        if(this.props.isLogOn) {
            this.props.refreshCurrentMessageCount();
            await CC98SignalR.start();
            Utility.setLocalStorage('signalr', Date.now());
            CC98SignalR.connection.on('NotifyMessageReceive', this.handleNotifyMessageReceive);
            CC98SignalR.connection.on('NotifyNotificationReceive', this.handleNotifyMessageReceive);
        }

        window.addEventListener('storage', (e) => {
            if(e.key === 'signalr') { // 其他页面开始SignalR时，关闭当前页面的连接
                if(e.oldValue === e.newValue) return;
                if(e.newValue) {
                    CC98SignalR.connection.off('NotifyMessageReceive');
                    CC98SignalR.connection.off('NotifyNotificationReceive');
                    CC98SignalR.stop();
                }
            } else if(e.key === 'messageCount') { // 同步不同窗口的未读信息
                if(e.oldValue === e.newValue) return;
                if(e.newValue){
                    this.props.changeMessageCount(JSON.parse(e.newValue.slice(4)));
                }
            }
        });

        // 用户聚焦时开始SignalR连接
        window.addEventListener('focus', async e => {
            if(this.props.isLogOn && !CC98SignalR.isConnecting) {
                Utility.setLocalStorage('signalr', Date.now());
                await CC98SignalR.start();
                CC98SignalR.connection.on('NotifyMessageReceive', this.handleNotifyMessageReceive);
                CC98SignalR.connection.on('NotifyNotificationReceive', this.handleNotifyMessageReceive);
            }
        });

        // 请求允许显示通知
        if(Notification){
            Notification.requestPermission();
        }
    }

    handleNotifyMessageReceive() {
        // 刷新未读数量
        this.props.refreshCurrentMessageCount();
        // 浏览器通知
        // @ts-ignore for Notification.permission
        if(Notification && Notification.permission === 'granted') {
            new Notification('您有一条新的消息', {
                icon: '/static/98icon.ico',
                onClick: () => {
                    window.focus();
                    history.push('/message/response');
                }
            } as any);
        }
    }

    async componentWillReceiveProps(nextProps: props) {
        if (!this.props.isLogOn && nextProps.isLogOn) {
            //如果用户重新登录则开始signalR链接
            this.props.refreshCurrentMessageCount();
            await CC98SignalR.start();
            CC98SignalR.connection.on('NotifyMessageReceive', this.handleNotifyMessageReceive);
            CC98SignalR.connection.on('NotifyNotificationReceive', this.handleNotifyMessageReceive);
        } else if (!nextProps.isLogOn) {
            //如果用户注销则关闭signalR链接
            CC98SignalR.connection.off('NotifyMessageReceive');
            CC98SignalR.connection.off('NotifyNotificationReceive');
            CC98SignalR.stop();
        }

        // 如果有未读消息
        if(BlinkTitle.haveUnreadCount(nextProps.messageCount)) {
            BlinkTitle.start();
        }
    }
}

function mapState(state: RootState) {
    return {
        isLogOn: state.userInfo.isLogOn,
        messageCount: state.message
    }
}

function mapDispatch(dispatch) {
    return {
        refreshCurrentMessageCount: () => {
            dispatch(refreshCurrentMessageCount());
        },
        changeMessageCount: (data: MessageInfo) => {
            dispatch(changeMessageCount(data));
        }
    }
}

export default connect(mapState, mapDispatch)(NotificationController);
