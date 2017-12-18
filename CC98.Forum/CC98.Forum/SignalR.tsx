import * as SignalR from './SignalRClient/index';
import { getToken } from './Utility';
import * as Utility from './Utility';
/**
* 客户端事件类型，由服务器定义
*/
type EventListenerType = 'NotifyMessageReceive' | 'NotifyTopicChange' | 'NotifyNotificationChange' | 'NotifyTest';

/**
 * EventListenerType
 */
interface EventListener {
    /**
     * 事件类型
     */
    type: EventListenerType;
    /**
     * 事件对应的回掉函数
     * @param message 服务器返回的信息
     */
    handler: (message: any) => void;
}

class SignalRConnection {
    /**
     * SignalR服务器地址
     */
    private readonly _url = `${Utility.getApiUrl()}/signalr/notification`;

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
    private _eventListeners: EventListener[] = [];

    /**
     * 为SignalR链接注册事件回掉函数
     */
    public addListener(type: EventListenerType, handler: (message: any) => void):void;

    /**
     * 为SignalR链接注册多个事件回掉函数
     */
    public addListener(listeners: EventListener[]): void;
    
    public addListener(x: EventListenerType | EventListener[], y?: (message: any) => void):void {
        if (Array.isArray(x)) {
            x.map((item) => {
                this._eventListeners.push(item);
                this._connection.on(item.type, item.handler);
            });
        } else {
            this._eventListeners.push({type: x, handler: y});
            this._connection.on(x, y);
        }
    }

    /**
     * 为SignalR链接删除事件回掉函数
     */
    public removeListener(type: EventListenerType, handler: (message: any) => void): void;

    /**
     * 为SignalR链接删除事件多个回掉函数
     */
    public removeListener(listeners: EventListener[]): void;
    public removeListener(x: EventListenerType | EventListener[], y?: (message: any) => void): void {
        if (Array.isArray(x)) {
            x.map((listener) => {
                if (this._eventListeners.indexOf(listener) !== -1) {
                    this._eventListeners.splice(this._eventListeners.indexOf(listener), 1)
                }
                this._connection.off(listener.type, listener.handler);
            });
        } else {
            if (this._eventListeners.indexOf({ type: x, handler: y }) !== -1) {
                this._eventListeners.splice(this._eventListeners.indexOf({ type: x, handler: y }), 1)
            }
            this._connection.off(x, y);
        }
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
            this._connection = new SignalR.HubConnection(this._url, { jwtBearer: () => token, logging: new SignalR.ConsoleLogger(SignalR.LogLevel.Trace) });
            this.addListener(this._eventListeners);
        }
        /**
            * 自动重新开始链接
            */
        this._connection.onclose(() => {
            if (this._isConneting) {
                this.start();
                console.log('restarting...');
            }
        });

        await this._connection.start();
        console.log('starting...');
        //this.sendMessage('TestNotify', "569380");
        
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
