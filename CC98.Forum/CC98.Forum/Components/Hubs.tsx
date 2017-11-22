// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/**
 * 表示强类型的集线器代理对象。
 */
interface ITypedHubProxy<TServer, TClient> extends SignalR.Hub.Proxy {
    /**
     * 提供集线器服务器端功能。
     */
    server: TServer;
    /**
     * 提供集线器客户端功能。
     */
    client: TClient;
}

/**
 * 定义消息服务的服务器端功能。
 */
// ReSharper disable once InconsistentNaming
interface MessageHub {
}

/**
 * 定义消息服务的客户端功能。
 */
// ReSharper disable once InconsistentNaming
interface MessageHubClient {
}

/**
 * 扩展 SignalR 集线器功能。
 */
interface SignalR {
    messageHub: ITypedHubProxy<MessageHub, MessageHubClient>;
}

/*declare global {
    interface JQuery {
     export var connection: 类型;
}
}
*/