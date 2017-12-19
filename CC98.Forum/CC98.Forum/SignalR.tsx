import * as SignalR from './SignalRClient/index';
import { getToken, getApiUrl } from './Utility';

/**
* 客户端事件类型，由服务器定义
*/
type EventListenerType = 'NotifyMessageReceive' | 'NotifyTopicChange' | 'NotifyNotificationChange';

/**
* 事件对应的回掉函数
* @param message 服务器返回的信息
*/
type EventListenerhandler = (message: any) => void;

class EventListener {
    NotifyMessageReceive: EventListenerhandler[] = [];
    NotifyTopicChange: EventListenerhandler[] = [];
    NotifyNotificationChange: EventListenerhandler[] = [];
}

class SignalRConnection {
    /**
     * SignalR服务器地址
     */
    private readonly _url = `${getApiUrl()}/signalr/notification`;

    /**
     * 当前connection所用的token
     */
    private _currentToken: string;

    /**
     * 当前正在进行的connection对象
     */
    private _connection = new SignalR.HubConnection(this._url);

    /**
     * 是否在链接状态
     */
    private _isConneting: boolean;

    /**
     * 当前注册在connection上的事件监听
     */
    private _eventListeners = new EventListener();

    /**
     * 为SignalR链接注册事件回掉函数
     */
    public addListener(type: EventListenerType, handler: EventListenerhandler): void {
        this._eventListeners[type].push(handler);
        this._connection.on(type, handler);
    }

    /**
     * 为SignalR链接删除事件回掉函数
     */
    public removeListener(type: EventListenerType, handler: EventListenerhandler): void {
        if (this._eventListeners[type].indexOf(handler) !== -1) {
            this._eventListeners[type].splice(this._eventListeners[type].indexOf(handler), 1)
        }
        this._connection.off(type, handler);
    }

    /**
     * 向SignalR服务器发送信息
     */
    public sendMessage(methodName: string, ...message:any[]) {
        this._connection.invoke(methodName, ...message);
    }

    /**
     * 开始SignalR链接
     */
    public async start() {
        const token = await getToken();
        /**
        * token更换过就创建一个新的
        * 然后把注册在旧的上的事件监听移到新的上
        */
        if (this._currentToken !== token) {
            this._connection = new SignalR.HubConnection(this._url, { jwtBearer: () => token, logging: new SignalR.NullLogger() });
            let key: EventListenerType;
            for (key in this._eventListeners) {
                this._eventListeners[key].map(item => this._connection.on(key, item));
            }
        }
        /**
        * 自动重新开始链接
        */
        this._connection.onclose((e) => {
            if (this._isConneting) {
                this.start();
            }
        });

        await this._connection.start();
        this._isConneting = true;
        
    }

    /**
     * 关闭SignalR链接
     */
    public stop() {
        this._isConneting = false;
        this._connection.stop();
    }

    /**
     * 
     */
    public get status() {
        return this._isConneting;
    }
}

export default new SignalRConnection();
