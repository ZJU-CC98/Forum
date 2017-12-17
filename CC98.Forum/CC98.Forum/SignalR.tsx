import * as SignalR from './SignalRClient/index';
import { getToken } from './Utility';
/**
* 客户端事件类型，由服务器定义
*/
type EventListenerType = 'NotifyMessageReceive' | 'NotifyTopicChange' | 'NotifyNotificationChange';
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
    handler: (message: any)=>any
}
class SignalRConnection {
    /**
     * SignalR服务器地址
     */
    private readonly _url = 'http://apitest.niconi.cc/signalr/notification';
    /**
     * 当前connection所用的token
     */
    private _currentToken: string;
    /**
     * 当前正在进行的connection对象
     */
    private _connection = new SignalR.HubConnection(this._url);
    /**
     * 当前注册在connection上的事件监听
     */
    private _eventListeners: EventListener[] = [];

    /**
     * 为SignalR链接注册事件回掉函数
     */
    public addSignalRListener(listenerType: EventListenerType, listenerHandler: (message: any) => void);
    /**
     * 为SignalR链接注册多个事件回掉函数
     */
    public addSignalRListener(listeners: EventListener[]): void;
    public addSignalRListener(x: EventListenerType | EventListener[], y?: (message: any) => void):void {
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
    public removeSignalRListener(listenerType: EventListenerType, listenerHandler: (message: any) => void);
    /**
     * 为SignalR链接删除事件多个回掉函数
     */
    public removeSignalRListener(listeners: EventListener[]): void;
    public removeSignalRListener(x: EventListenerType | EventListener[], y?: (message: any) => void): void {
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
    public sendMessage(methodName: string, ...message:string[]) {
        this._connection.invoke(methodName, ...message);
    }

    /**
     * 开始SignalR链接
     */
    public startSignalRConnection = async () => {
        const token = await getToken();
        /**
         * token更换过就创建一个新的
         * 然后把注册在旧的上的事件监听移到新的上
         */
        if (this._currentToken !== token) {
            this._connection = new SignalR.HubConnection(this._url, { jwtBearer: ()=> token, logging: new SignalR.ConsoleLogger(SignalR.LogLevel.Trace) });
            this.addSignalRListener(this._eventListeners);
        }

        this._connection.start()
    }

    /**
     * 关闭SignalR链接
     */
    public stopSignalRConnection = () => {
        this._connection.stop();
    }
}
/**
 * 创建一个实例并默认导出
 */
export default new SignalRConnection();