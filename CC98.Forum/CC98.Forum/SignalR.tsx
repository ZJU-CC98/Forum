import * as SignalR from './SignalRClient/index';
import { getToken } from './Utility';
let connection = new SignalR.HubConnection('');
/**
 * EventListenerType
 */
interface EventListener {
    /**
     * 事件类型，由服务器定义
     */
    type: 'NotifyMessageReceive' | 'NotifyTopicChange' | 'NotifyNotificationChange';
    /**
     * 事件对应的回掉函数
     * @param message 服务器返回的信息
     */
    handler: (message: any)=>any
}
/**
 * 为SignalR链接注册事件回掉函数
 * @param listener object, 需要type属性与handler方法
 */
export const addSignalRListener = (listener: EventListener) => {
    connection.on(listener.type, listener.handler);
}
/**
 * 为SignalR链接删除事件回掉函数
 * @param listener object, 需要type属性与handler方法
 */
export const removeSignalRListener = (listener: EventListener) => {
    connection.off(listener.type, listener.handler);
}
/**
 * 开始SignalR链接
 */
export const startSignalRConnection = async () => {
    const token = await getToken();
    const url = 'http://apitest.niconi.cc/signalr/notification';
    connection = new SignalR.HubConnection(url, { jwtBearer: () => (token) });
    connection.on('NotifyMessageReceive', (message) => {
        console.log('NotifyMessageReceive');
        console.log(message);
    });
    connection.on('NotifyTopicChange', (message) => {
        console.log('NotifyTopicChange');
        console.log(message);
    });
    connection.on('NotifyNotificationChange', (message) => {
        console.log('NotifyNotificationChange');
        console.log(message);
    });
    connection.start()//.then(() => connection.invoke('SubscribeNotice', 569380).then(() => (connection.invoke('NotifyMessageReceive', 'message'))));
}
/**
 * 关闭SignalR链接
 */
export const stopSignalRConnection = () => {
    connection.stop();
}